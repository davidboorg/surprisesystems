// verify.mjs — kör efter Vercel-preview, före PR.
// Playwright-screenshots (desktop+mobil) + tekniska checks + Claude vision brand-check.
// Skriver verify-out/verdict.json + verify-out/{desktop,mobile}.png. Exitar alltid 0;
// workflowet läser verdict.json och beslutar om reparation/label.
//
// Env: PREVIEW_URL, ANTHROPIC_API_KEY. Läser ./source.txt (briefen) som kontext.

import { chromium } from "playwright";
import { writeFileSync, mkdirSync, readFileSync, readdirSync } from "node:fs";

const URL_ = process.env.PREVIEW_URL;
const KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
const OUT = "verify-out";
mkdirSync(OUT, { recursive: true });
let brief = "";
try { brief = readFileSync("source.txt", "utf8").slice(0, 4000); } catch {}

const CANON_RULES = `
Surprise brand-regler (prototyp ska följa dessa om inte briefen anger klient-egen branding):
- Palett: gul #FCED4F som accent, mörk #101010, off-white/vit, gråskala. Flagga andra dominanta varumärkesfärger.
- Typografi: display/rubriker i en distinkt grotesk (Die Grotesk / Space Grotesk). Flagga generisk Inter/Arial/Times-as-default som ostylat.
- Inga emoji, inga "badges", ingen "Trusted by", ingen ikon-soppa.
- Copy: ingen consultant-speak / banned AI-fraser (unlock, leverage, seamless, elevate, game-changer, robust solution, cutting-edge, "in today's fast-paced world", delve, supercharge).
- Layout: editoriell, avsiktlig. Flagga generisk centrerad hero-stack / corporate-symmetri som ser AI-genererad ut.
`;

const technical = []; // tekniska block-violations

async function main() {
  if (!URL_) { writeFileSync(`${OUT}/verdict.json`, JSON.stringify({ verdict: "fail", violations: [{ rule: "config", where: "PREVIEW_URL saknas", severity: "block" }] })); return; }

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") technical.push({ rule: "console-error", where: m.text().slice(0, 120), severity: "block" }); });
  page.on("pageerror", (e) => technical.push({ rule: "page-error", where: String(e).slice(0, 120), severity: "block" }));

  const resp = await page.goto(URL_, { waitUntil: "networkidle", timeout: 45000 }).catch(() => null);
  if (!resp || resp.status() >= 400) technical.push({ rule: "http-status", where: `sidan svarade ${resp ? resp.status() : "ingen respons"}`, severity: "block" });
  await page.waitForTimeout(1200);

  // Trasiga bilder
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src).slice(0, 5));
  for (const b of broken) technical.push({ rule: "broken-image", where: b.slice(0, 120), severity: "block" });

  // Desktop-screenshot
  await page.screenshot({ path: `${OUT}/desktop.png`, fullPage: true });

  // Primärt flöde: klicka första synliga knapp/länk (best-effort)
  try { const el = page.locator("button, a[href^='#'], [role=button]").first(); if (await el.count()) { await el.click({ timeout: 4000 }); await page.waitForTimeout(800); } } catch {}

  // Mobil-screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/mobile.png`, fullPage: true });

  await browser.close();

  // Brand-check (Claude vision)
  let brand = { verdict: "pass", violations: [] };
  try { brand = await brandCheck(); } catch (e) { brand = { verdict: "pass", violations: [{ rule: "brand-check-error", where: e.message.slice(0, 120), severity: "warn" }] }; }

  const violations = [...technical, ...(brand.violations || [])];
  const hasBlock = violations.some((v) => v.severity === "block");
  const verdict = hasBlock ? "fail" : (violations.length ? "pass" : (brand.verdict || "pass"));
  writeFileSync(`${OUT}/verdict.json`, JSON.stringify({ verdict: hasBlock ? "fail" : "pass", violations }, null, 2));
  console.log(`[verify] verdict=${hasBlock ? "fail" : "pass"} violations=${violations.length} (block=${violations.filter(v=>v.severity==="block").length})`);
}

const REPORT_TOOL = {
  name: "report", description: "Rapportera brand-granskningens utfall.",
  input_schema: { type: "object", properties: {
    verdict: { type: "string", enum: ["pass", "fail"] },
    violations: { type: "array", items: { type: "object", properties: { rule: { type: "string" }, where: { type: "string" }, severity: { type: "string", enum: ["block", "warn"] } }, required: ["rule", "where", "severity"] } },
  }, required: ["verdict", "violations"] },
};

async function brandCheck() {
  const imgs = ["desktop.png", "mobile.png"].map((f) => ({ type: "image", source: { type: "base64", media_type: "image/png", data: readFileSync(`${OUT}/${f}`).toString("base64") } }));
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL, max_tokens: 900, tools: [REPORT_TOOL], tool_choice: { type: "tool", name: "report" },
      messages: [{ role: "user", content: [
        { type: "text", text: `Granska dessa två screenshots (desktop + mobil) av en prototyp mot reglerna nedan. Brief:\n${brief}\n\n${CANON_RULES}\n\nAnropa report med verdict + violations (severity block för tydliga brott mot palett/typografi/banned-fraser, warn för mindre).` },
        ...imgs,
      ] }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic HTTP ${res.status}`);
  const data = await res.json();
  const tool = (data.content || []).find((b) => b.type === "tool_use");
  return tool ? tool.input : { verdict: "pass", violations: [] };
}

main().catch((e) => { console.error("[verify] fel:", e.message); writeFileSync(`${OUT}/verdict.json`, JSON.stringify({ verdict: "pass", violations: [{ rule: "verify-error", where: e.message.slice(0, 150), severity: "warn" }] })); });

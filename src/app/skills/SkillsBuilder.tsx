"use client";

import { useMemo, useState } from "react";
import {
  I18N,
  DIRECTIVES,
  initialState,
  buildSkillMd,
  computeStrength,
  currentSlug,
  type BuilderState,
  type Lang,
} from "./skill-engine";

const TOTAL = 6;
type Tab = "ai" | "desktop" | "code";

/* CTA copy (live page — not part of the verbatim engine) */
const CTA = {
  sv: {
    head: "Vill du ha skills byggda för hela ert team?",
    body: "Vi designar och rullar ut skräddarsydda Claude-skills för hela organisationen — röst, arbetsflöden och kvalitetskrav inbyggda.",
    link: "Prata med oss om EXPLORE →",
  },
  en: {
    head: "Want skills built for your whole team?",
    body: "We design and roll out tailored Claude skills across your organization — voice, workflows and quality bars baked in.",
    link: "Talk to us about EXPLORE →",
  },
};
const CONTACT_HREF =
  "mailto:david@surpriseventures.io?subject=Skills%20f%C3%B6r%20teamet";

/* Live-preview syntax coloring — ported from updatePreview() */
function renderPreview(md: string): string {
  const esc = md.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return esc
    .replace(/^---\n([\s\S]*?)\n---/, (m) => `<span class="fm">${m}</span>`)
    .replace(/^(## .*)$/gm, '<span class="h">$1</span>');
}

export default function SkillsBuilder() {
  const [lang, setLang] = useState<Lang>("sv");
  const [step, setStep] = useState(1);
  const [onIntro, setOnIntro] = useState(true);
  const [tab, setTab] = useState<Tab>("ai");
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState<BuilderState>({ ...initialState, tasks: [], dislikes: [] });

  const t = I18N[lang];
  const D = DIRECTIVES[lang];

  const md = useMemo(() => buildSkillMd(state, lang), [state, lang]);
  const strength = useMemo(() => computeStrength(state, lang), [state, lang]);
  const slug = useMemo(() => currentSlug(state, lang), [state, lang]);

  /* ── state helpers ── */
  function setField<K extends keyof BuilderState>(key: K, val: BuilderState[K]) {
    setState((s) => ({ ...s, [key]: val }));
  }
  function toggleSingle(key: "use" | "profChip" | "tone" | "format" | "language", i: number) {
    setState((s) => ({ ...s, [key]: s[key] === i ? null : i }));
  }
  function toggleMulti(key: "tasks" | "dislikes", i: number) {
    setState((s) => {
      const arr = s[key];
      const pos = arr.indexOf(i);
      const next = pos >= 0 ? arr.filter((x) => x !== i) : [...arr, i];
      return { ...s, [key]: next };
    });
  }

  /* ── navigation ── */
  function showStep(n: number) {
    setStep(Math.max(1, Math.min(TOTAL, n)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function startWizard() {
    setOnIntro(false);
    showStep(1);
  }
  function back() {
    if (step === 1) {
      setOnIntro(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else showStep(step - 1);
  }

  /* ── download / copy ── */
  function download() {
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(md);
      } else {
        const ta = document.createElement("textarea");
        ta.value = md;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* no-op */
    }
  }

  /* ── chip primitives ── */
  const chipBase =
    "border px-[18px] py-[10px] text-[13.5px] leading-none transition-colors text-left";
  function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${chipBase} ${
          selected
            ? "bg-[#101010] text-white border-[#101010]"
            : "bg-transparent text-[#101010] border-[#B8B6B2] hover:border-[#101010]"
        }`}
      >
        {label}
      </button>
    );
  }

  const fieldLabel =
    "block text-[11px] font-bold tracking-[0.12em] uppercase text-[#807E7C] mt-7 mb-[10px]";
  const inputCls =
    "w-full bg-transparent border border-[#B8B6B2] text-[#101010] text-[15px] px-4 py-[14px] leading-[1.5] transition-colors focus:outline-none focus:border-[#101010] placeholder:text-[#B8B6B2]";

  const nextLabel = step === 5 ? t.generate : t.next;

  return (
    <div className="sb-root">
      {/* scoped rich-text + preview styling */}
      <style>{`
        .sb-root .verdict{display:block;margin-top:12px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#807E7C}
        .sb-root .cmp-with .verdict{color:#8a7400}
        .sb-root .install-body ol{padding-left:20px;margin:0}
        .sb-root .install-body li{margin-bottom:10px}
        .sb-root .install-body code{font-family:var(--font-mono);font-size:12.5px;background:#1A1919;color:#fff;padding:2px 7px}
        .sb-root .install-body b{font-weight:600;color:#101010}
        .sb-root .sb-title em{font-style:italic}
        .sb-root .preview-md{font-family:var(--font-mono);font-size:12.5px;line-height:1.75;color:#c9c9c9;white-space:pre-wrap;word-break:break-word}
        .sb-root .preview-md .fm{color:#807E7C}
        .sb-root .preview-md .h{color:#fff;font-weight:700}
      `}</style>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* builder toolbar */}
        <div className="flex items-center justify-between border-b border-[#DEDCD7] py-4">
          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#807E7C]">
            {t.headerTitle}
          </span>
          <div className="flex items-center gap-6">
            <div className="flex border border-[#DEDCD7]">
              {(["sv", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-3 py-[5px] text-[11px] tracking-[0.1em] uppercase transition-colors ${
                    lang === l ? "bg-[#101010] text-white" : "text-[#807E7C]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <span className="text-[11px] tabular-nums text-[#807E7C]">
              {onIntro ? "01" : String(step).padStart(2, "0")} / 06
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0 lg:gap-px lg:bg-[#DEDCD7] border-x border-b border-[#DEDCD7]">
          {/* ── WIZARD ── */}
          <main className="bg-white px-5 py-12 md:px-10 md:py-16">
            {onIntro ? (
              <section>
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#807E7C] mb-[18px]">
                  {t.introLabel}
                </div>
                <h1
                  className="sb-title text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] mb-[14px]"
                  dangerouslySetInnerHTML={{ __html: t.introTitle }}
                />
                <p className="text-[15px] leading-[1.6] text-[#403F3E] mb-9 max-w-[56ch]">
                  {t.introLead}
                </p>

                {/* compare */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#DEDCD7] border border-[#DEDCD7] mb-8">
                  <div className="bg-white px-6 py-[22px]">
                    <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#807E7C] mb-[14px]">
                      {t.cmpWithoutH}
                    </div>
                    <p className="text-[12px] italic text-[#807E7C] mb-3 leading-[1.5]">{t.cmpQ}</p>
                    <p
                      className="text-[13.5px] leading-[1.6] text-[#403F3E]"
                      dangerouslySetInnerHTML={{ __html: t.cmpWithout }}
                    />
                  </div>
                  <div className="cmp-with bg-[#FEFBE3] px-6 py-[22px]">
                    <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#8a7400] mb-[14px]">
                      {t.cmpWithH}
                    </div>
                    <p className="text-[12px] italic text-[#807E7C] mb-3 leading-[1.5]">{t.cmpQ}</p>
                    <p
                      className="text-[13.5px] leading-[1.6] text-[#403F3E]"
                      dangerouslySetInnerHTML={{ __html: t.cmpWith }}
                    />
                  </div>
                </div>

                {/* intro points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7 mb-10">
                  {[
                    [t.ip1H, t.ip1],
                    [t.ip2H, t.ip2],
                    [t.ip3H, t.ip3],
                  ].map(([h, b], i) => (
                    <div key={i}>
                      <b className="block text-[13px] font-semibold mb-[6px]">{h}</b>
                      <span className="text-[12.5px] leading-[1.55] text-[#807E7C]">{b}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={startWizard}
                  className="inline-flex items-center justify-center font-semibold px-8 py-[14px] text-[13px] tracking-[0.08em] uppercase bg-[#FCED4F] text-[#101010] transition-all hover:brightness-95"
                >
                  {t.introCta}
                </button>
                <span className="block mt-[14px] text-[11.5px] text-[#807E7C]">{t.introNote}</span>
              </section>
            ) : (
              <>
                {/* progress */}
                <div className="flex gap-[6px] mb-12">
                  {Array.from({ length: TOTAL }, (_, idx) => {
                    const i = idx + 1;
                    return (
                      <span
                        key={i}
                        className={`h-[3px] flex-1 transition-colors ${
                          i < step ? "bg-[#FCED4F]" : i === step ? "bg-[#101010]" : "bg-[#DEDCD7]"
                        }`}
                      />
                    );
                  })}
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <section>
                    <StepLabel n="01" label={t.s1Label} />
                    <Title html={t.s1Title} />
                    <Sub text={t.s1Sub} />
                    <div className="flex flex-wrap gap-[10px] mb-7">
                      {t.useChips.map((c, i) => (
                        <Chip key={i} label={c} selected={state.use === i} onClick={() => toggleSingle("use", i)} />
                      ))}
                    </div>
                    <label className={fieldLabel}>{t.s1Field}</label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder={t.s1Ph}
                      value={state.profession}
                      onChange={(e) => setField("profession", e.target.value)}
                    />
                    <div className="flex flex-wrap gap-[10px] mt-[14px]">
                      {t.profChips.map((c, i) => (
                        <Chip key={i} label={c} selected={state.profChip === i} onClick={() => toggleSingle("profChip", i)} />
                      ))}
                    </div>
                  </section>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <section>
                    <StepLabel n="02" label={t.s2Label} />
                    <Title html={t.s2Title} />
                    <Sub text={t.s2Sub} />
                    <div className="flex flex-wrap gap-[10px] mb-7">
                      {t.taskChips.map((c, i) => (
                        <Chip key={i} label={c} selected={state.tasks.includes(i)} onClick={() => toggleMulti("tasks", i)} />
                      ))}
                    </div>
                    <label className={fieldLabel}>{t.s2Field}</label>
                    <textarea
                      className={`${inputCls} resize-y min-h-[96px]`}
                      placeholder={t.s2Ph}
                      value={state.tasksFree}
                      onChange={(e) => setField("tasksFree", e.target.value)}
                    />
                  </section>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <section>
                    <StepLabel n="03" label={t.s3Label} />
                    <Title html={t.s3Title} />
                    <Sub text={t.s3Sub} />
                    <label className={fieldLabel}>{t.s3Tone}</label>
                    <div className="flex flex-wrap gap-[10px]">
                      {t.toneChips.map((c, i) => (
                        <Chip key={i} label={c} selected={state.tone === i} onClick={() => toggleSingle("tone", i)} />
                      ))}
                    </div>
                    <label className={fieldLabel}>{t.s3Format}</label>
                    <div className="flex flex-wrap gap-[10px]">
                      {t.formatChips.map((c, i) => (
                        <Chip key={i} label={c} selected={state.format === i} onClick={() => toggleSingle("format", i)} />
                      ))}
                    </div>
                    <label className={fieldLabel}>{t.s3Lang}</label>
                    <div className="flex flex-wrap gap-[10px]">
                      {t.langChips.map((c, i) => (
                        <Chip key={i} label={c} selected={state.language === i} onClick={() => toggleSingle("language", i)} />
                      ))}
                    </div>
                  </section>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <section>
                    <StepLabel n="04" label={t.s4Label} />
                    <Title html={t.s4Title} />
                    <Sub text={t.s4Sub} />
                    <label className={fieldLabel}>{t.s4Dislikes}</label>
                    <div className="flex flex-wrap gap-[10px] mb-[14px]">
                      {t.dislikeChips.map((c, i) => (
                        <Chip key={i} label={c} selected={state.dislikes.includes(i)} onClick={() => toggleMulti("dislikes", i)} />
                      ))}
                    </div>
                    <textarea
                      className={`${inputCls} resize-y min-h-[96px]`}
                      placeholder={t.s4DisPh}
                      value={state.dislikesFree}
                      onChange={(e) => setField("dislikesFree", e.target.value)}
                    />
                    <label className={fieldLabel}>{t.s4Likes}</label>
                    <textarea
                      className={`${inputCls} resize-y min-h-[96px]`}
                      placeholder={t.s4LikePh}
                      value={state.likesFree}
                      onChange={(e) => setField("likesFree", e.target.value)}
                    />
                  </section>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <section>
                    <StepLabel n="05" label={t.s5Label} />
                    <Title html={t.s5Title} />
                    <Sub text={t.s5Sub} />
                    <textarea
                      rows={7}
                      className={`${inputCls} resize-y min-h-[96px]`}
                      placeholder={t.s5Ph}
                      value={state.example}
                      onChange={(e) => setField("example", e.target.value)}
                    />
                  </section>
                )}

                {/* STEP 6 */}
                {step === 6 && (
                  <section>
                    <StepLabel n="06" label={t.s6Label} />
                    <Title html={t.s6Title} />
                    <Sub text={t.s6Sub} />
                    <div className="flex flex-wrap gap-[14px] mt-9 mb-14">
                      <button
                        type="button"
                        onClick={download}
                        className="inline-flex items-center justify-center font-semibold px-8 py-[14px] text-[13px] tracking-[0.08em] uppercase bg-[#FCED4F] text-[#101010] transition-all hover:brightness-95"
                      >
                        {t.s6Download}
                      </button>
                      <button
                        type="button"
                        onClick={copy}
                        className="inline-flex items-center justify-center font-semibold px-8 py-[14px] text-[13px] tracking-[0.08em] uppercase border border-[#B8B6B2] text-[#101010] transition-colors hover:border-[#101010]"
                      >
                        {copied ? t.copied : t.s6Copy}
                      </button>
                    </div>

                    <div className="flex border-b border-[#DEDCD7] mb-6">
                      {(
                        [
                          ["ai", "Claude.ai"],
                          ["desktop", "Claude Desktop"],
                          ["code", "Claude Code"],
                        ] as [Tab, string][]
                      ).map(([k, lbl]) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setTab(k)}
                          className={`px-[22px] py-3 text-[12px] tracking-[0.1em] uppercase border-b-2 transition-colors ${
                            tab === k
                              ? "text-[#101010] border-[#FCED4F]"
                              : "text-[#807E7C] border-transparent"
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                    <div
                      className="install-body text-[14.5px] leading-[1.8] text-[#403F3E] max-w-[560px]"
                      dangerouslySetInnerHTML={{ __html: t.install[tab] }}
                    />

                    {/* team CTA */}
                    <div className="mt-12 border-t border-[#DEDCD7] pt-8 max-w-[560px]">
                      <h3 className="text-[20px] font-semibold leading-tight mb-2">{CTA[lang].head}</h3>
                      <p className="text-[14px] leading-relaxed text-[#807E7C] mb-4">{CTA[lang].body}</p>
                      <a
                        href={CONTACT_HREF}
                        className="text-[14px] font-semibold text-[#101010] highlight"
                      >
                        {CTA[lang].link}
                      </a>
                    </div>
                  </section>
                )}

                {/* nav */}
                <div className="flex gap-[14px] mt-14 items-center">
                  <button
                    type="button"
                    onClick={back}
                    className="text-[13px] tracking-[0.08em] uppercase text-[#807E7C] px-2 py-[14px] transition-colors hover:text-[#101010]"
                  >
                    {t.back}
                  </button>
                  {step !== TOTAL && (
                    <button
                      type="button"
                      onClick={() => showStep(step + 1)}
                      className="inline-flex items-center justify-center font-semibold px-8 py-[14px] text-[13px] tracking-[0.08em] uppercase bg-[#FCED4F] text-[#101010] transition-all hover:brightness-95"
                    >
                      {nextLabel}
                    </button>
                  )}
                  {step === 5 && (
                    <span className="text-[12px] text-[#B8B6B2] ml-auto">{t.optional}</span>
                  )}
                </div>
              </>
            )}
          </main>

          {/* ── PREVIEW PANE ── */}
          <aside className="bg-[#101010] flex flex-col lg:sticky lg:top-0 lg:h-screen">
            <div className="flex justify-between items-center px-7 py-[14px] border-b border-[#2a2a2a] text-[10px] tracking-[0.14em] uppercase text-[#807E7C]">
              <span>
                <span className="inline-block w-[7px] h-[7px] bg-[#FCED4F] mr-2 align-middle" />
                {t.previewLabel}
              </span>
              <span className="font-[family-name:var(--font-mono)] normal-case tracking-normal">
                {slug}/SKILL.md
              </span>
            </div>
            <div className="px-7 py-4 border-b border-[#2a2a2a]">
              <div className="flex justify-between items-baseline text-[10px] tracking-[0.14em] uppercase text-[#807E7C] mb-[10px]">
                <span>{D.strengthLabel}</span>
                <b className="text-white font-bold text-[11px]">
                  {strength.score}% — {D.levels[strength.level]}
                </b>
              </div>
              <div className="h-1 bg-[#222] relative overflow-hidden">
                <span
                  className="absolute left-0 top-0 bottom-0 bg-[#FCED4F] transition-[width] duration-300"
                  style={{ width: `${strength.score}%` }}
                />
              </div>
              <div className="mt-[10px] text-[12px] leading-[1.5] text-[#999]">{strength.hint}</div>
            </div>
            <div
              className="preview-md flex-1 overflow-y-auto px-7 py-7 max-h-[420px] lg:max-h-none"
              dangerouslySetInnerHTML={{ __html: renderPreview(md) }}
            />
          </aside>
        </div>

        <div className="flex justify-between py-5 text-[10px] tracking-[0.12em] uppercase text-[#807E7C]">
          <span>SURPRISE SYSTEMS</span>
          <span>{t.footerNote}</span>
        </div>
      </div>
    </div>
  );
}

/* ── small presentational helpers ── */
function StepLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-[11px] tracking-[0.14em] uppercase text-[#807E7C] mb-[18px]">
      <b className="text-[#101010] font-normal">{n}</b> {label}
    </div>
  );
}
function Title({ html }: { html: string }) {
  return (
    <h1
      className="sb-title text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.08] tracking-[-0.02em] mb-[14px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
function Sub({ text }: { text: string }) {
  return <p className="text-[15px] leading-[1.6] text-[#403F3E] mb-10 max-w-[480px]">{text}</p>;
}

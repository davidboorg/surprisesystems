import { NextResponse } from "next/server";
import crypto from "crypto";

// MeetGeek-webhook → triggar autobuild-pipelinen.
//
// Flöde: möte klart i MeetGeek → POST hit (3 ggr, vi svarar 200 snabbt) →
// vi verifierar HMAC → triggar GitHub repository_dispatch → GitHub Action
// hämtar transkript, kör /new-build, deployar preview, öppnar PR med /lab-kort.
//
// Env som krävs (Vercel + .env.local):
//   MEETGEEK_WEBHOOK_SECRET  – delad secret för HMAC-verifiering (sätts i MeetGeek + här)
//   GITHUB_DISPATCH_TOKEN    – GitHub PAT med 'repo'-scope, triggar Action
//   GITHUB_DISPATCH_REPO     – t.ex. "davidboorg/surprisesystems" (default nedan)

// OBS: bekräfta exakt header-namn mot docs.meetgeek.ai. MeetGeek skickar HMAC
// SHA-256 av råa request-bodyn i ett signatur-header. Vi kollar de troliga.
const SIGNATURE_HEADERS = ["x-meetgeek-signature", "x-signature", "x-hub-signature-256"];

function verifySignature(rawBody: string, headers: Headers, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  for (const h of SIGNATURE_HEADERS) {
    const got = headers.get(h);
    if (!got) continue;
    // tål "sha256=" prefix
    const sig = got.startsWith("sha256=") ? got.slice(7) : got;
    try {
      if (
        sig.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
      ) {
        return true;
      }
    } catch {
      // fel längd/format → ignorera, prova nästa header
    }
  }
  return false;
}

export async function POST(request: Request) {
  const secret = process.env.MEETGEEK_WEBHOOK_SECRET;
  const token = process.env.GITHUB_DISPATCH_TOKEN;
  const repo = process.env.GITHUB_DISPATCH_REPO || "davidboorg/surprisesystems";

  if (!secret || !token) {
    // Konfig saknas → svara 200 (så MeetGeek inte retryar i evighet) men logga.
    console.error("meetgeek-webhook: saknar MEETGEEK_WEBHOOK_SECRET eller GITHUB_DISPATCH_TOKEN");
    return new NextResponse(null, { status: 200 });
  }

  const rawBody = await request.text();

  if (!verifySignature(rawBody, request.headers, secret)) {
    console.warn("meetgeek-webhook: ogiltig signatur, avvisar");
    return new NextResponse(null, { status: 401 });
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  // MeetGeek-payloaden innehåller mötes-id (fältnamn kan variera — täck de troliga).
  const meetingId =
    (payload.meeting_id as string) ||
    (payload.meetingId as string) ||
    ((payload.meeting as Record<string, unknown>)?.id as string) ||
    "";

  if (!meetingId) {
    console.warn("meetgeek-webhook: inget meeting_id i payload");
    return new NextResponse(null, { status: 200 });
  }

  // Trigga GitHub Action (gör inte det tunga jobbet här — håll svaret snabbt).
  try {
    await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        event_type: "meetgeek-meeting",
        client_payload: { meeting_id: meetingId },
      }),
    });
  } catch (e) {
    console.error("meetgeek-webhook: kunde inte trigga GitHub dispatch", e);
    // Svara ändå 200 — MeetGeek-retry hjälper inte om GitHub är nere.
  }

  return new NextResponse(null, { status: 200 });
}

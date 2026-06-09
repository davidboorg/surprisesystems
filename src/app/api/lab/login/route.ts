import { NextResponse } from "next/server";

const COOKIE_NAME = "lab_session";

// POST /api/lab/login  { password }  → sätter session-cookie vid rätt lösenord
export async function POST(request: Request) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Ogiltig förfrågan" }, { status: 400 });
  }

  const expectedPassword = process.env.LAB_PASSWORD;
  const sessionToken = process.env.LAB_SESSION_TOKEN;

  if (!expectedPassword || !sessionToken) {
    return NextResponse.json(
      { ok: false, error: "Servern saknar konfiguration (LAB_PASSWORD / LAB_SESSION_TOKEN)" },
      { status: 500 }
    );
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ ok: false, error: "Fel lösenord" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dagar
  });
  return res;
}

// DELETE /api/lab/login → loggar ut
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}

"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/lab";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/lab/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(from);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Något gick fel");
        setLoading(false);
      }
    } catch {
      setError("Kunde inte nå servern");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#101010] px-4">
      <div className="w-full max-w-[360px]">
        <p className="text-[11px] font-bold tracking-wide text-[#FCED4F] mb-2">
          SURPRISE.SYSTEMS™ — LAB
        </p>
        <h1 className="text-white text-[28px] leading-tight mb-8">
          Intern projekthubb
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            className="w-full bg-transparent border border-[#403F3E] text-white px-4 py-3 outline-none focus:border-[#FCED4F] transition-colors placeholder:text-[#807E7C]"
          />
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#FCED4F] text-[#101010] font-semibold px-4 py-3 disabled:opacity-40 transition-opacity"
          >
            {loading ? "Loggar in…" : "Logga in"}
          </button>
          {error && (
            <p className="text-[#FCED4F] text-sm mt-1" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

export default function LabLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

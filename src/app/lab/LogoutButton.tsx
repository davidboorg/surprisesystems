"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/lab/login", { method: "DELETE" });
    router.replace("/lab/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="text-[11px] font-bold tracking-wide text-[#afafaf] hover:text-[#282828] transition-colors"
    >
      LOGGA UT
    </button>
  );
}

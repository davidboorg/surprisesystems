import type { Metadata } from "next";
import { projects, type ProjectStatus } from "@/lib/projects";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Lab — Surprise Systems",
  robots: { index: false, follow: false },
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  wip: "Pågår",
  concept: "Koncept",
  archived: "Arkiverad",
};

const STATUS_CLASS: Record<ProjectStatus, string> = {
  live: "bg-[#FCED4F] text-[#101010]",
  wip: "bg-[#101010] text-white",
  concept: "bg-[#DEDCD7] text-[#101010]",
  archived: "border border-[#B8B6B2] text-[#807E7C]",
};

const STATUS_ORDER: ProjectStatus[] = ["live", "wip", "concept", "archived"];

export default function LabPage() {
  const sorted = [...projects].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#F3F3F1]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px] py-[17px] md:py-[22px] flex justify-between items-center">
          <div className="w-12 h-[29px]">
            <img
              src="/images/symbol-black.png"
              alt="Surprise Systems"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-[11px] font-bold tracking-wide text-[#282828]">
            SURPRISE.SYSTEMS™ — LAB
          </p>
          <LogoutButton />
        </div>
      </header>

      <section className="max-w-[1440px] mx-auto px-4 md:px-[23px] pt-[140px] md:pt-[160px] pb-24">
        <div className="mb-12">
          <h1 className="text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] font-semibold">
            Projekt
          </h1>
          <p className="text-[#807E7C] mt-2 max-w-[640px]">
            Allt vi bygger, på ett ställe. Internt — bara för teamet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#DEDCD7] border border-[#DEDCD7]">
          {sorted.map((p) => {
            const hasUrl = p.url && p.url !== "#";
            const Card = (
              <div className="group h-full bg-white p-6 flex flex-col transition-colors hover:bg-[#F3F3F1]">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-bold tracking-wide uppercase px-2 py-1 ${STATUS_CLASS[p.status]}`}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                  {p.year && (
                    <span className="text-[11px] text-[#B8B6B2] tabular-nums">
                      {p.year}
                    </span>
                  )}
                </div>

                <h2 className="text-[22px] leading-tight font-semibold mb-2">
                  {p.title}
                </h2>
                <p className="text-[#807E7C] text-[15px] leading-relaxed flex-1">
                  {p.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.client && (
                      <span className="text-[11px] text-[#403F3E] border border-[#DEDCD7] px-2 py-0.5">
                        {p.client}
                      </span>
                    )}
                    {p.tags?.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] text-[#807E7C] border border-[#F3F3F1] px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {hasUrl ? (
                    <span className="text-[13px] font-semibold whitespace-nowrap group-hover:underline underline-offset-4">
                      Öppna →
                    </span>
                  ) : (
                    <span className="text-[13px] text-[#B8B6B2] whitespace-nowrap">
                      Snart
                    </span>
                  )}
                </div>
              </div>
            );

            return hasUrl ? (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Card}
              </a>
            ) : (
              <div key={p.title}>{Card}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

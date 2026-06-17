import type { Metadata } from "next";
import Link from "next/link";
import SkillsBuilder from "./SkillsBuilder";

export const metadata: Metadata = {
  title: "Bygg din egen Claude Skill — gratis | Surprise Systems",
  description:
    "Skapa en skräddarsydd AI-skill på 2 minuter. Sex enkla frågor — Claude lär sig vem du är, ditt språk och hur du vill ha dina svar. Gratis, ingen registrering, allt i din webbläsare.",
  alternates: { canonical: "https://surprisesystems.io/skills" },
  openGraph: {
    title: "Bygg din egen Claude Skill — gratis | Surprise Systems",
    description:
      "Skapa en skräddarsydd AI-skill på 2 minuter. Gratis, ingen registrering, allt i din webbläsare.",
    url: "https://surprisesystems.io/skills",
    siteName: "Surprise Systems",
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bygg din egen Claude Skill — gratis | Surprise Systems",
    description: "Skapa en skräddarsydd AI-skill på 2 minuter — gratis, helt i din webbläsare.",
  },
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header — matches the site's inline header pattern */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px] py-[17px] md:py-[22px] flex justify-between items-center">
          <Link href="/" className="w-12 h-[29px]">
            <img
              src="/images/symbol-black.png"
              alt="Surprise Systems"
              className="w-full h-full object-contain"
            />
          </Link>
          <p className="text-[11px] font-bold tracking-wide text-[#282828]">
            SURPRISE.SYSTEMS™
          </p>
          <a
            href="mailto:david@surprisesystems.io"
            className="text-[11px] font-bold tracking-wide text-[#afafaf] hover:text-[#282828] transition-colors"
          >
            CONTACT
          </a>
        </div>
      </header>

      <div className="pt-[80px] md:pt-[96px]">
        <SkillsBuilder />
      </div>
    </main>
  );
}

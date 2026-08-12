// Surprise Systems — internal project hub data.
// Add / edit projects here, then commit + push (Vercel auto-deploys).
//
// status: "live" | "wip" | "concept" | "archived"
//   live     = deployad och i bruk
//   wip      = under aktiv produktion
//   concept  = prototyp / utforskande
//   archived = vilande
//
// url: länk till projektets egen deploy. Sätt "#" tills den finns.

export type ProjectStatus = "live" | "wip" | "concept" | "archived";

export type Project = {
  title: string;
  description: string;
  status: ProjectStatus;
  url: string;
  client?: string; // klient, om uppdrag — utelämna för egna ventures
  tags?: string[];
  year?: number;
};

export const projects: Project[] = [
  {
    title: "Valet 2026",
    description: "Verktyg inför valet 2026.",
    status: "wip",
    url: "#", // TODO: fyll i live-URL
    tags: ["venture", "civic"],
    year: 2026,
  },
  {
    title: "Castle AI",
    description: "AI-produkt.",
    status: "wip",
    url: "#",
    tags: ["venture", "ai"],
    year: 2026,
  },
  {
    title: "Sentimental Protect",
    description:
      "Skydd för affektionsvärda objekt — AI läser repor och slitage på smycken, vaser, arvegods.",
    status: "concept",
    url: "#",
    tags: ["venture", "ai", "insurance"],
    year: 2026,
  },
  {
    title: "Explore Companion",
    description: "Följeslagare för EXPLORE-uppdrag.",
    status: "concept",
    url: "#",
    tags: ["internal", "tooling"],
    year: 2026,
  },
  {
    title: "Surprise Meeting AI",
    description: "AI-stöd för möten.",
    status: "concept",
    url: "#",
    tags: ["internal", "ai"],
    year: 2026,
  },
  {
    title: "Vattenfall Life Demo",
    description: "Demo för Vattenfall.",
    status: "concept",
    url: "#",
    client: "Vattenfall",
    tags: ["client", "demo"],
    year: 2026,
  },
  {
    title: "sentimental-protect",
    description: "AI:n läser slitaget på dina mest älskade ägodelar och skapar ett tidsstämplat skick-bevis — för försäkring, arv eller minne.",
    status: "concept",
    url: "https://generated-3qhjm36tl-reportflow1.vercel.app",
    tags: ["prototype","autobuild"],
  },
];

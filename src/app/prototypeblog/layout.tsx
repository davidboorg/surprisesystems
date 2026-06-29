import type { Metadata } from "next";
import { ScrollReveal } from "@/components/prototypeblog/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.surprisesystems.io"),
  title: {
    default: "The Prototype Blog · Surprise Systems",
    template: "%s · The Prototype Blog",
  },
  description:
    "Early ideas, published before they are safe. Essays, prototypes you can click, and code you are free to take.",
  alternates: {
    types: {
      "application/rss+xml": "/prototypeblog/rss.xml",
    },
  },
};

export default function PrototypeBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-black">
      {children}
      <ScrollReveal />
    </div>
  );
}

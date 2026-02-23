"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function PressRelease() {
  const [language, setLanguage] = useState<"en" | "sv">("en");
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const contentEn = {
    title: "SURPRISE SYSTEMS launches, an innovation studio focused on product-led growth backed by NORD DDB",
    subtitle: "Surprise Systems is a newly launched innovation studio working at the intersection of product development, creativity and business strategy.",
    paragraphs: [
      "Founded by David Borg and Johan Pihl, the studio helps companies identify what is worth building in an increasingly product-driven economy — before scale makes mistakes expensive.",
      "Surprise Systems is launching together with NORD as founding partner, creating a close collaboration between creative product development and some of the Nordics' largest brands. The studio is also backed by Robert Falck, founder of Einride, who serves on its advisory board.",
      "Rather than focusing on campaigns, advertising or predefined formats, Surprise Systems works early in the decision-making process, where creativity can shape products, services and systems that people actually use. The studio applies a non-linear approach to product innovation, combining creative methodology, rapid prototyping and emerging technologies such as AI to reduce uncertainty and accelerate meaningful results.",
      "Surprise Systems collaborates closely with founders, leadership teams and boards, supporting everything from digital services and physical products to new platforms, business models and category entries.",
      "Co-founder Johan Pihl adds that recent technological shifts have fundamentally changed the conditions for product innovation.",
    ],
    quotes: [
      { text: "It's no longer difficult to build things. The real challenge today is deciding what's worth building.", author: "Johan Pihl" },
      { text: "By combining creative thinking with early validation, AI and rapid prototyping, ideas that once felt too risky can now be tested against real strategic value. That changes how decisions are made and value created.", author: null },
      { text: "Creativity has been pushed too far down the process in many organizations.", author: "David Borg, co-founder of Surprise Systems" },
      { text: "It's often used to package or promote decisions that are already made. We believe creativity creates the most value when it's applied earlier — when you can still influence what something actually becomes.", author: null },
    ],
    closing: "Surprise Systems is already working with its first clients and the studio plans to develop its own products and venture initiatives together with entrepreneurs in its network.",
    aboutTitle: "About Surprise Systems",
    about: "Surprise Systems is an innovation studio built for a product-led economy. Founded by David Borg and Johan Pihl, the studio works at the intersection of product development, creativity and business strategy to help organizations build products, services and systems that drive real behavior change.",
  };

  const contentSv = {
    title: "Kommunikationsprofiler startar en innovationsstudio tillsammans med Nord DDB. Backas av unicorn-grundare.",
    subtitle: "",
    paragraphs: [
      "Surprise Systems är en ny innovationsstudio som arbetar i gränslandet mellan produktutveckling, kreativitet och affärsstrategi. Bolaget grundas av David Borg och Johan Pihl och hjälper företag att identifiera vad som är värt att bygga i en allt mer produktdriven ekonomi – innan skala gör felbeslut dyra.",
      "Surprise Systems lanseras tillsammans med Nord som founding partner, vilket skapar ett nära samarbete mellan kreativ produktutveckling och några av Nordens största varumärken. Bolaget backas även av Robert Falck, grundare av Einride, som sitter i Surprise Systems advisory board.",
      "Till skillnad från traditionella byråmodeller fokuserar Surprise Systems inte på kampanjer, annonser eller färdiga briefar. I stället arbetar studion tidigt i beslutsprocessen, där kreativitet kan forma produkter, tjänster och system som människor faktiskt använder. Arbetet bygger på en icke-linjär metodik där kreativitet, prototyper och ny teknik – inklusive AI – kombineras för att minska osäkerhet och accelerera meningsfull produktutveckling.",
      "Surprise Systems samarbetar nära grundare, ledningsgrupper och styrelser och arbetar med allt från digitala tjänster och fysiska produkter till nya plattformar, affärsmodeller och kategorier.",
      "Johan Pihl, medgrundare, menar att den tekniska utvecklingen har förändrat förutsättningarna för innovation i grunden.",
    ],
    quotes: [
      { text: "Det är inte längre svårt att bygga saker. Den verkliga utmaningen i dag är att veta vad som är värt att bygga.", author: "Johan Pihl" },
      { text: "Genom att kombinera kreativt tänkande med tidig validering, AI och effektiva prototyper kan idéer som tidigare upplevdes som för riskfyllda nu prövas mot konkret affärsstrategiskt värde. Det förändrar hur beslut tas och värde skapas.", author: null },
      { text: "Kreativitet har hamnat alldeles för långt ner i processen i många organisationer.", author: "David Borg, medgrundare av Surprise Systems" },
      { text: "Den används ofta för att paketera eller sälja beslut som redan är fattade. Vi menar att kreativitet skapar som störst värde när den kommer in tidigare – när man fortfarande kan påverka vad något faktiskt blir.", author: null },
    ],
    closing: "Surprise Systems är redan i gång med sina första kunder. Parallellt med kunduppdrag planerar bolaget att utveckla egna produkter och venture-initiativ tillsammans med entreprenörer i sitt nätverk.",
    aboutTitle: "Om Surprise Systems",
    about: "Surprise Systems är en innovationsstudio byggd för en produktledd ekonomi. Bolaget grundas av David Borg och Johan Pihl och arbetar i skärningspunkten mellan produktutveckling, kreativitet och affärsstrategi för att hjälpa organisationer att bygga produkter, tjänster och system som löser komplexa problem och driver verklig beteendeförändring.",
  };

  const content = language === "en" ? contentEn : contentSv;

  return (
    <main className="min-h-screen bg-white text-[22px] leading-[23px] tracking-[0.01em]">
      {/* Header */}
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

      {/* Language Toggle - Mobile Only */}
      <div className="md:hidden fixed top-[70px] left-0 right-0 z-40 bg-white px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("en")}
            className={`px-6 py-2 rounded-full text-[16px] font-bold tracking-[0.01em] transition-colors ${
              language === "en"
                ? "bg-[#faee6c] text-black"
                : "bg-[#cacaca] text-white"
            }`}
          >
            ENGLISH
          </button>
          <button
            onClick={() => setLanguage("sv")}
            className={`px-6 py-2 rounded-full text-[16px] font-bold tracking-[0.01em] transition-colors ${
              language === "sv"
                ? "bg-[#faee6c] text-black"
                : "bg-[#cacaca] text-white"
            }`}
          >
            SWEDISH
          </button>
        </div>
      </div>

      {/* Content */}
      <section className="pt-[140px] md:pt-[159px] pb-[80px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          {/* Desktop: Two columns */}
          <div className="hidden md:grid md:grid-cols-2 gap-16">
            {/* Swedish Column */}
            <div ref={addToRefs} className="reveal max-w-[515px] ml-[101px]">
              <ArticleContent content={contentSv} />
            </div>

            {/* English Column */}
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <ArticleContent content={contentEn} />
            </div>
          </div>

          {/* Mobile: Single column with language toggle */}
          <div className="md:hidden">
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <ArticleContent content={content} />
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <p className="text-[10px] text-[#7b7575] uppercase tracking-[0.1px] leading-[10px] max-w-[360px] md:max-w-[504px] md:pl-[101px]">
            <span className="font-medium">© Surprise SYSTEMS</span>. All content, software, and
            outputs are provided "as is" for informational purposes only; no warranties are
            given, all intellectual property remains with Surprise SYSTEMS, and we accept no
            liability for any direct or indirect use of the services.
          </p>
        </div>
      </section>
    </main>
  );
}

interface ArticleContentProps {
  content: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    quotes: { text: string; author: string | null }[];
    closing: string;
    aboutTitle: string;
    about: string;
  };
}

function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="space-y-0">
      {/* Title */}
      <h1 className="font-bold uppercase tracking-[0.01em] mb-4">
        {content.title}
      </h1>

      {content.subtitle && (
        <p className="font-bold uppercase tracking-[0.01em] mb-6">
          {content.subtitle}
        </p>
      )}

      {/* Main paragraphs */}
      <div className="space-y-4">
        {content.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Quotes */}
      <div className="space-y-4 mt-4">
        {content.quotes.map((quote, index) => (
          <p key={index}>
            – {quote.text}
            {quote.author && `, säger ${quote.author}.`}
          </p>
        ))}
      </div>

      {/* Closing */}
      <p className="mt-4">{content.closing}</p>

      {/* About section */}
      <div className="mt-8">
        <h2 className="font-bold uppercase tracking-[0.01em] mb-4">
          {content.aboutTitle}
        </h2>
        <p>{content.about}</p>
      </div>

    </div>
  );
}

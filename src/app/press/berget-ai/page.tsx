"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function BergetAIPressRelease() {
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

  return (
    <main className="min-h-screen bg-white text-[22px] leading-[28px] tracking-[0.01em]">
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

      {/* Hero Image */}
      <section className="pt-[80px] md:pt-[100px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div ref={addToRefs} className="reveal">
            <img
              src="/images/berget-ai-partnership.jpg"
              alt="Surprise Systems och Berget AI partnerskap"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pt-[40px] md:pt-[60px] pb-[80px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div className="max-w-[720px] md:ml-[101px]">
            {/* Label */}
            <p
              ref={addToRefs}
              className="reveal text-[12px] font-bold tracking-[0.1em] text-[#7b7575] uppercase mb-6"
            >
              Pressmeddelande
            </p>

            {/* Title */}
            <h1
              ref={addToRefs}
              className="reveal font-bold text-[28px] md:text-[36px] leading-[1.15] tracking-[0.01em] mb-8"
            >
              Surprise Systems och Berget AI ingår strategiskt samarbete för svensk AI-suveränitet
            </h1>

            {/* Intro */}
            <p ref={addToRefs} className="reveal font-medium mb-8">
              Surprise Systems och Berget AI inleder ett samarbete för den kraftigt växande
              efterfrågan av AI-tjänster och ingår partnerskap för att erbjuda svenska företag,
              myndigheter och kultursektorn ett komplett alternativ till de amerikanska jättarna.
            </p>

            {/* Body */}
            <div ref={addToRefs} className="reveal space-y-6">
              <p>
                Surprise Systems och Berget AI meddelar att bolagen ingår ett strategiskt samarbete.
                Samarbetet kombinerar Surprise Systems erbjudande med kreativ produktutveckling och
                kulturell relevans med Bergets svenska, suveräna infrastruktur.
              </p>

              {/* Quote 1 */}
              <blockquote className="border-l-2 border-[#faee6c] pl-6 py-2">
                <p className="italic">
                  "Vi har en stor efterfrågan på tjänster kopplat till AI. Med Berget AI som strategisk
                  partner och garant för svensk datasuveränitet kan vi nu försäkra våra kunder att ingen
                  data lämnar landet utan att vi behöver kompromissa på vare sig hantverket eller den
                  kreativa ambitionen."
                </p>
                <footer className="mt-3 text-[16px] font-medium text-[#7b7575]">
                  — David Borg, partner, Surprise Systems
                </footer>
              </blockquote>

              <p>
                Partnerskapet innebär att Surprise Systems kunder får direkt tillgång till Berget AI:s
                suveräna inferens- och plattformstjänster, med data som aldrig lämnar Sverige.
              </p>

              {/* Quote 2 */}
              <blockquote className="border-l-2 border-[#faee6c] pl-6 py-2">
                <p className="italic">
                  "En allt mer geopolitiskt spänd marknad och nya regleringar gör att svensk data inte
                  längre tryggt kan hanteras hos amerikanska molnleverantörer. Samtidigt har många svenska
                  organisationer tvingats bromsa sina AI-satsningar i brist på suveräna alternativ. Nu finns
                  det ett som levererar både juridisk kontroll och kreativ kvalitet."
                </p>
                <footer className="mt-3 text-[16px] font-medium text-[#7b7575]">
                  — Christian Landgren, medgrundare, Berget AI
                </footer>
              </blockquote>
            </div>

            {/* About sections */}
            <div ref={addToRefs} className="reveal mt-12 space-y-8">
              <div>
                <h2 className="font-bold text-[18px] uppercase tracking-[0.05em] mb-3">
                  Om Surprise Systems
                </h2>
                <p className="text-[18px] leading-[26px]">
                  Surprise Systems är en svensk innovationsstudio som jobbar med kreativ produktutveckling
                  och kulturell relevans. Surprise Systems grundades av David Borg och Johan Pihl, har det
                  nordiska kreativa nätverket NORD DDB som founding partner och Robert Falck, grundare av
                  Einride, som rådgivare. Tidigare arbeten har prisats internationellt med bland annat
                  Cannes Lions, Fast Company World Changing Ideas och D&AD.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-[18px] uppercase tracking-[0.05em] mb-3">
                  Om Berget AI
                </h2>
                <p className="text-[18px] leading-[26px]">
                  Berget AI grundades 2024 av Christian Landgren och Andreas Lundmark och driver Sveriges
                  första suveräna AI-moln. Plattformen erbjuder serverless och dedikerad inferens på öppna
                  språkmodeller, byggd på 100 % fossilfri energi och cirkulär hårdvara. Bland kunderna finns
                  myndigheter, kommuner, större företag såväl som startups — totalt över 600 organisationer.
                  I februari 2026 reste Berget AI 24 MSEK i en runda ledd av Luminar Ventures tillsammans
                  med Wellstreet och Norrsken Evolve.
                </p>
              </div>
            </div>

            {/* Press Contact */}
            <div ref={addToRefs} className="reveal mt-12 pt-8 border-t border-[#e5e5e5]">
              <h2 className="font-bold text-[14px] uppercase tracking-[0.05em] mb-4">
                Presskontakt
              </h2>
              <div className="space-y-2 text-[16px]">
                <p>
                  <span className="font-medium">Surprise Systems:</span>{" "}
                  <a href="mailto:david@surprisesystems.io" className="underline">
                    david@surprisesystems.io
                  </a>
                </p>
                <p>
                  <span className="font-medium">Berget AI:</span>{" "}
                  <a href="mailto:christian@berget.ai" className="underline">
                    christian@berget.ai
                  </a>
                </p>
              </div>
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

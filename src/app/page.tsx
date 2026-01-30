"use client";

import { useEffect, useRef } from "react";

export default function Home() {
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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-5 flex justify-between items-center">
          <div className="w-12 h-7">
            <img
              src="/images/symbol-black.png"
              alt="Surprise Systems"
              className="w-full h-full object-contain"
            />
          </div>
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

      {/* Hero Section */}
      <section className="pt-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          {/* White bordered container */}
          <div className="border border-[#bcbcbc] bg-white relative">
            <div className="flex justify-center py-20">
              <img
                src="/images/hero-eye-new.png"
                alt="Surprise Systems Logo"
                className="w-full max-w-[659px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Intro Text */}
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <h1 className="text-[16px] font-bold uppercase tracking-wide leading-relaxed mb-6">
                Surprise Systems™, a creative innovation studio for the product-led economy.
              </h1>
              <div className="space-y-4 text-[16px] leading-relaxed">
                <p>
                  We help organizations discover new opportunities, turn them into testable products,
                  and decide what to build - before scale makes mistakes expensive. In a product-led
                  economy, direction is proven through use.
                </p>
                <p>We help teams find that direction early.</p>
              </div>
              <div className="mt-8 space-y-2">
                <a href="#how" className="block text-[16px] underline">
                  → Explore how we work
                </a>
                <a href="mailto:david@surprisesystems.io" className="block text-[16px] underline">
                  → Start a conversation
                </a>
              </div>
            </div>

            {/* Right - Empty for balance */}
            <div />
          </div>
        </div>
      </section>

      {/* Hidden Cost Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Image */}
            <div ref={addToRefs} className="reveal">
              <img
                src="/images/image-hidden-cost.png"
                alt="Innovation"
                className="w-full max-w-[718px] h-auto object-cover"
              />
            </div>

            {/* Right - Text */}
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <h2 className="text-[16px] font-bold uppercase tracking-wide mb-6">
                The hidden cost of playing it safe.
              </h2>
              <div className="space-y-4 text-[16px] leading-relaxed">
                <p>For a long time, playing it safe worked.</p>
                <p>Predictable markets rewarded optimization, efficiency, and control.</p>
                <p>
                  Today, that same logic often slows progress. Organizations optimize what can be
                  measured, while behavior stays the same.
                </p>
                <p>Assumptions harden early. Learning comes late. Relevance fades quietly.</p>
              </div>
              <div className="mt-6 space-y-1 text-[16px] font-medium">
                <p>The risk is rarely moving too fast.</p>
                <p>It's locking into the wrong direction too early.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Changing Behavior Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-[515px]">
            <div ref={addToRefs} className="reveal">
              <h2 className="text-[16px] font-bold uppercase tracking-wide mb-6">
                Changing behavior through real usage.
              </h2>
              <div className="space-y-4 text-[16px] leading-relaxed">
                <p>
                  Real change doesn't come from strategy decks. It comes from behavior. We design
                  products, services, and formats that people actually use — and we measure what
                  happens. Creativity is not decoration.
                </p>
                <p>It is the mechanism that makes new behavior possible.</p>
              </div>
              <div className="mt-6 space-y-1 text-[16px] italic font-medium">
                <p>No usage change.</p>
                <p>No real impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* David Borg Section */}
      <section className="px-6 py-16" id="who">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Image */}
            <div ref={addToRefs} className="reveal">
              <img
                src="/images/david-borg-new.png"
                alt="David Borg"
                className="w-full max-w-[658px] h-auto object-cover"
              />
            </div>

            {/* Right - Text */}
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <h3 className="text-[16px] font-bold uppercase tracking-wide mb-6">David Borg</h3>
              <div className="space-y-4 text-[16px] leading-relaxed">
                <p>
                  A strategist and entrepreneur with the ability to connect business, culture, and
                  technology in ways that create new opportunities.
                </p>
                <p>
                  His work has shaped some of Sweden's most successful communication concepts,
                  defined by clarity and cultural relevance. As the founder of Borg Owilli, he built
                  one of the country's leading content agencies and developed it into a widely
                  respected creative organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Johan Pihl Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Text */}
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <h3 className="text-[16px] font-bold uppercase tracking-wide mb-6">Johan Pihl</h3>
              <div className="space-y-4 text-[16px] leading-relaxed">
                <p>
                  A creative entrepreneur and innovation specialist working at the intersection of
                  communication, design, and technology to solve complex challenges. Over more than
                  two decades, he has built a career that connects marketing, innovation, and fintech.
                </p>
                <p>
                  His projects span from global sustainability initiatives to financial technology
                  platforms, earning him recognition as one of Sweden's most prominent creative
                  leaders.
                </p>
              </div>
            </div>

            {/* Right - Image */}
            <div ref={addToRefs} className="reveal">
              <img
                src="/images/johan-pihl-new.png"
                alt="Johan Pihl"
                className="w-full max-w-[567px] h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* From Uncertainty to Momentum Section */}
      <section className="px-6 py-16" id="how">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Text */}
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <h2 className="text-[16px] font-bold uppercase tracking-wide mb-6">
                From uncertainty to momentum
              </h2>
              <div className="space-y-4 text-[16px] leading-relaxed">
                <p>
                  We work where complexity is high and clarity is missing — where better decisions
                  matter most.
                </p>
                <p>
                  Our work moves through three tempos, each designed to turn uncertainty into action.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="font-medium uppercase">→ Sprint</p>
                  <p className="text-[16px]">Test direction before committing.</p>
                </div>
                <div>
                  <p className="font-medium uppercase">→ Leap</p>
                  <p className="text-[16px]">Turn validated direction into something worth investing in.</p>
                </div>
                <div>
                  <p className="font-medium uppercase">→ Blitz</p>
                  <p className="text-[16px]">Scale what works. Create measurable market impact.</p>
                </div>
              </div>

              <p className="mt-8 text-[16px]">
                Each tempo turns uncertainty into something you can actually act on.
              </p>
            </div>

            {/* Right - Awards */}
            <div ref={addToRefs} className="reveal space-y-4">
              <img
                src="/images/awards-1.png"
                alt="Awards"
                className="w-full max-w-[701px]"
              />
              <img
                src="/images/awards-2.png"
                alt="Awards"
                className="w-full max-w-[656px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Venn Diagram Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="border border-black bg-white p-12">
            <div ref={addToRefs} className="reveal flex justify-center">
              <img
                src="/images/venn-diagram-new.png"
                alt="Service Design Process"
                className="w-full max-w-[1158px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-[515px]">
            <div ref={addToRefs} className="reveal">
              <h2 className="text-[16px] font-bold uppercase tracking-wide mb-6">
                The ROI of better decisions
              </h2>
              <div className="space-y-4 text-[16px] leading-relaxed">
                <p>We don't promise vague innovation outcomes.</p>
                <p>We promise better decisions, earlier.</p>
              </div>

              <div className="mt-6 space-y-4 text-[16px]">
                <p>→ Reach strategic clarity faster</p>
                <p>→ Test bold directions before committing at scale</p>
                <p>→ Align around evidence instead of opinion</p>
                <p>→ Reduce the cost of being wrong</p>
              </div>

              <div className="mt-6 space-y-1 text-[16px]">
                <p>The biggest hidden cost isn't failure.</p>
                <p>It's being wrong too late.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Image */}
      <section className="px-6 py-8">
        <div className="max-w-[1440px] mx-auto">
          <div ref={addToRefs} className="reveal">
            <img
              src="/images/footer-image.png"
              alt="Surprise Systems Team"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - CTA */}
            <div ref={addToRefs} className="reveal max-w-[515px]">
              <p className="text-[16px] font-bold uppercase tracking-wide leading-relaxed">
                Innovation is not about taking bigger risks. It's about reducing the cost of being
                wrong — and knowing where to move before others do.
              </p>
              <a
                href="mailto:david@surprisesystems.io"
                className="block mt-6 text-[16px] font-bold uppercase underline"
              >
                → Start with a conversation
              </a>
            </div>

            {/* Right - Copyright */}
            <div className="text-right">
              <p className="text-[10px] text-[#7b7575] uppercase tracking-wide">
                <span className="font-medium">© Surprise SYSTEMS</span>. All content, software, and
                outputs are provided "as is" for informational purposes only; no warranties are
                given, all intellectual property remains with Surprise SYSTEMS, and we accept no
                liability for any direct or indirect use of the services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

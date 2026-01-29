"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRevealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Intersection Observer for reveal animations
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

    // Observer for text reveal highlights
    const textRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.5 }
    );

    textRevealRefs.current.forEach((el) => {
      if (el) textRevealObserver.observe(el);
    });

    // Parallax effect on hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.3;
        heroRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      textRevealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const addToTextRevealRefs = (el: HTMLElement | null) => {
    if (el && !textRevealRefs.current.includes(el)) {
      textRevealRefs.current.push(el);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[288px] py-4 md:py-6 flex justify-between items-center">
          <div className="text-sm md:text-lg font-bold tracking-wide">SURPRISE SYSTEMS</div>
          <a
            href="mailto:hello@surprisesystems.com"
            className="text-sm md:text-lg font-bold text-gray-400 hover:text-gray-900 transition-all"
          >
            Call now
          </a>
        </div>
      </header>

      {/* Hero Section - Eye Logo */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-16 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex justify-center">
          <div ref={heroRef} className="w-full max-w-[825px] animate-fade-in parallax-hero">
            <img
              src="/images/hero-eye.png"
              alt="Surprise Systems Logo"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Main Content with Center Line */}
      <section className="relative px-6">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px center-line-gradient hidden md:block" style={{ marginLeft: '-10px' }} />

          {/* Row 1: Intro (left) + Navigation (right) */}
          <div className="grid md:grid-cols-2 gap-0 py-8 md:py-0">
            <div className="md:pr-16">
              <div ref={addToRefs} className="reveal reveal-stagger max-w-full md:max-w-[397px] md:ml-auto">
                <p className="text-lg leading-relaxed text-black mb-4 font-bold">
                  A creative innovation studio for the product-led economy.
                </p>
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    We help organizations discover new opportunities, turn them into testable products,
                    and decide what to build — <span ref={addToTextRevealRefs} className="text-reveal-highlight">before scale makes mistakes expensive.</span>
                  </p>
                  <p>
                    In a product-led economy, direction is proven through use.
                    We help teams find that direction early.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:pl-16">
              <div ref={addToRefs} className="reveal max-w-full md:max-w-[397px]">
                <nav className="space-y-1 text-xl font-bold">
                  <a href="#why" className="block underline-accent">Why</a>
                  <a href="#who" className="block text-gray-400 hover:text-gray-900 transition-colors">Who</a>
                  <a href="#what" className="block text-gray-400 hover:text-gray-900 transition-colors">What</a>
                </nav>
              </div>
            </div>
          </div>

          {/* Row 2: Empty (left) + Changing behavior (right) */}
          <div className="grid md:grid-cols-2 gap-0 mt-8 md:mt-16">
            <div className="hidden md:block md:pr-16" />
            <div className="md:pl-16">
              <div ref={addToRefs} className="reveal reveal-stagger max-w-full md:max-w-[397px]" id="why">
                <h2 className="text-xl font-bold mb-4 leading-relaxed">
                  Changing behavior through real usage
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    Real change doesn&apos;t come from strategy decks.
                    It comes from behavior.
                  </p>
                  <p>
                    We design products, services, and formats that people actually use — and we measure what happens.
                  </p>
                  <p>
                    Creativity is not decoration.
                    It is the mechanism that <span ref={addToTextRevealRefs} className="text-reveal-highlight">makes new behavior possible.</span>
                  </p>
                  <p className="font-medium">
                    <span ref={addToTextRevealRefs} className="text-reveal-highlight">No usage change. No real impact.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Hidden cost (left) + Empty (right) */}
          <div className="grid md:grid-cols-2 gap-0 mt-8 md:mt-16">
            <div className="md:pr-16">
              <div ref={addToRefs} className="reveal reveal-stagger max-w-full md:max-w-[387px] md:ml-auto">
                <h2 className="text-xl font-bold mb-4 leading-relaxed">
                  The hidden cost of playing it safe
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    For a long time, playing it safe worked.
                    Predictable markets rewarded optimization, efficiency, and control.
                    Today, that same logic often slows progress.
                  </p>
                  <p>
                    Organizations optimize what can be measured, while behavior stays the same.
                    Assumptions harden early. Learning comes late. <span ref={addToTextRevealRefs} className="text-reveal-highlight">Relevance fades quietly.</span>
                  </p>
                  <p>
                    The risk is rarely moving too fast.
                    It&apos;s <span ref={addToTextRevealRefs} className="text-reveal-highlight">locking into the wrong direction too early.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:pl-16" />
          </div>

          {/* Row 4: Empty (left) + Child with Toy Image (right) */}
          <div className="grid md:grid-cols-2 gap-0 mt-8 md:mt-16">
            <div className="hidden md:block md:pr-16" />
            <div className="md:pl-16">
              <div ref={addToRefs} className="reveal overflow-hidden">
                <img
                  src="/images/child-with-toy.png"
                  alt="Creative Innovation"
                  className="w-full max-w-[384px] h-[256px] object-cover img-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section - Cross layout like Figma */}
      <section className="relative px-6 py-8 md:py-16" id="who">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px center-line-gradient hidden md:block" style={{ marginLeft: '-10px' }} />

          {/* Row 1: Johan image | David text */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-0">
            {/* Left - Johan Pihl Image */}
            <div className="md:pr-16">
              <div ref={addToRefs} className="reveal max-w-full md:max-w-[387px] md:ml-auto">
                <img
                  src="/images/johan-pihl.png"
                  alt="Johan Pihl"
                  className="w-full max-w-[300px] aspect-[4/6] object-cover img-hover"
                />
              </div>
            </div>

            {/* Right - David Borg Text */}
            <div className="md:pl-16">
              <div ref={addToRefs} className="reveal max-w-full md:max-w-[387px]">
                <h3 className="text-xl font-bold mb-2">David Borg</h3>
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    A strategist and entrepreneur with the ability to connect business, culture, and
                    technology in ways that create new opportunities.
                  </p>
                  <p>
                    His work has shaped some of Sweden&apos;s most successful communication concepts,
                    defined by clarity and cultural relevance. As the founder of Borg Owilli, he built
                    one of the country&apos;s leading content agencies and developed it into a widely
                    respected creative organization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Johan text | David image */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-0 mt-8 md:mt-16">
            {/* Left - Johan Pihl Text */}
            <div className="md:pr-16">
              <div ref={addToRefs} className="reveal max-w-full md:max-w-[387px] md:ml-auto">
                <h3 className="text-xl font-bold mb-2">Johan Pihl</h3>
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    A creative entrepreneur and innovation specialist working at the intersection of
                    communication, design, and technology to solve complex challenges. Over more than
                    two decades, he has built a career that connects marketing, innovation, and fintech.
                  </p>
                  <p>
                    His projects span from global sustainability initiatives to financial technology
                    platforms, earning him recognition as one of Sweden&apos;s most prominent creative leaders.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - David Borg Image */}
            <div className="md:pl-16">
              <div ref={addToRefs} className="reveal max-w-full md:max-w-[387px]">
                <img
                  src="/images/david-borg.png"
                  alt="David Borg"
                  className="w-full max-w-[263px] aspect-[3/4] object-cover img-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From uncertainty to momentum - Sprint, Leap, Blitz */}
      <section className="relative px-6 py-8 md:py-16" id="what">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px center-line-gradient hidden md:block" style={{ marginLeft: '-10px' }} />

          <div className="grid md:grid-cols-2 gap-8 md:gap-0">
            <div className="md:pr-16">
              <div ref={addToRefs} className="reveal max-w-full md:max-w-[387px] md:ml-auto">
                <h2 className="text-xl font-bold mb-4 leading-relaxed">
                  From uncertainty to momentum
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    We work where complexity is high and clarity is missing — where better decisions matter most.
                  </p>
                  <p>
                    Our work moves through three tempos, each designed to turn uncertainty into action.
                  </p>
                </div>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg"><span className="highlight font-bold">Sprint</span></h3>
                    <p className="text-lg leading-relaxed">
                      Test direction before committing.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg"><span className="highlight font-bold">Leap</span></h3>
                    <p className="text-lg leading-relaxed">
                      Turn validated direction into something worth investing in.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg"><span className="highlight font-bold">Blitz</span></h3>
                    <p className="text-lg leading-relaxed">
                      Scale what works. Create measurable market impact.
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-lg leading-relaxed font-medium">
                  Each tempo turns uncertainty into something you can actually act on.
                </p>
              </div>
            </div>
            <div className="hidden md:block md:pl-16" />
          </div>
        </div>
      </section>

      {/* Venn Diagram Section */}
      <section className="relative py-8 md:py-16 px-6">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px center-line-gradient hidden md:block" style={{ marginLeft: '-10px' }} />

          <div className="max-w-[865px] mx-auto">
            <div ref={addToRefs} className="reveal">
              <img
                src="/images/venn-diagram.png"
                alt="Service Design Process"
                className="w-full max-w-[681px] mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The ROI of Better Decisions */}
      <section className="relative px-6 py-8 md:py-16">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px center-line-gradient hidden md:block" style={{ marginLeft: '-10px' }} />

          <div className="grid md:grid-cols-2 gap-8 md:gap-0">
            {/* Left - ROI Text */}
            <div className="md:pr-16">
              <div ref={addToRefs} className="reveal reveal-stagger max-w-full md:max-w-[387px] md:ml-auto">
                <h2 className="text-xl font-bold mb-4 leading-relaxed">
                  The ROI of better decisions
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    We don&apos;t promise vague innovation outcomes.
                    We promise <span ref={addToTextRevealRefs} className="text-reveal-highlight">better decisions, earlier.</span>
                  </p>
                  <ul className="space-y-2">
                    <li>• Reach strategic clarity faster</li>
                    <li>• Test bold directions before committing at scale</li>
                    <li>• Align around evidence instead of opinion</li>
                    <li>• Reduce the cost of being wrong</li>
                  </ul>
                  <p className="font-medium">
                    The biggest hidden cost isn&apos;t failure.
                    <span ref={addToTextRevealRefs} className="text-reveal-highlight"> It&apos;s being wrong too late.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Award Images */}
            <div className="md:pl-16">
              <div ref={addToRefs} className="reveal space-y-6">
                <img
                  src="/images/awards-bottom.png"
                  alt="Awards"
                  className="w-full max-w-[511px]"
                />
                <img
                  src="/images/awards-top.png"
                  alt="Awards"
                  className="w-full max-w-[478px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative px-6 py-8 md:py-16">
        <div className="max-w-[1440px] mx-auto relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px center-line-gradient hidden md:block" style={{ marginLeft: '-10px' }} />

          <div className="grid md:grid-cols-2 gap-0">
            <div className="hidden md:block md:pr-16" />
            <div className="md:pl-16">
              <div ref={addToRefs} className="reveal max-w-full md:max-w-[387px]">
                <div className="space-y-4 text-lg leading-relaxed text-black">
                  <p>
                    Innovation is not about taking bigger risks.
                    It&apos;s about reducing the cost of being wrong — and knowing where to move before others do.
                  </p>
                </div>
                <div className="mt-8">
                  <a href="mailto:hello@surprisesystems.com" className="text-lg font-bold underline-accent">
                    Start with a conversation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Surprise Systems. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="mailto:hello@surprisesystems.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Contact
            </a>
            <a href="https://linkedin.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

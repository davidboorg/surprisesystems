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
    <main className="min-h-screen bg-white text-[22px] leading-[23px] tracking-[0.01em]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px] py-[17px] md:py-[22px] flex justify-between items-center">
          <div className="w-12 h-[29px]">
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
      <section className="pt-[180px] md:pt-[170px]">
        <div className="max-w-[1440px] mx-auto flex justify-center px-4 md:px-0">
          <div className="w-full max-w-[360px] md:max-w-[1200px] relative">
            <video
              src="/images/logga_film.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-auto block"
            />
            <div className="hidden md:block absolute top-0 left-0 right-0 h-[4px] bg-white pointer-events-none" />
            <div className="hidden md:block absolute top-0 right-0 bottom-0 w-[4px] bg-white pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[4px] bg-white pointer-events-none" />
            <div className="hidden md:block absolute top-0 left-0 bottom-0 w-[4px] bg-white pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-[200px] pb-[40px] md:pt-[150px] md:pb-[80px]">
        <div className="max-w-[1440px] mx-auto px-4 md:pl-[124px] md:pr-6">
          <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px]">
            <h1 className="font-bold uppercase tracking-[0.01em] mb-6">
              Surprise Systems™
              <br />
              an innovation studio for the product-led&nbsp;economy.
            </h1>
            <div className="space-y-4">
              <p>
                We help organizations discover new opportunities, turn them into testable products,
                and decide what to build - before scale makes mistakes expensive. In a product-led
                economy, direction is proven through behavioral change with real-world&nbsp;impact.
              </p>
              <p>We help find direction&nbsp;early.</p>
            </div>
            <div className="mt-8 space-y-2">
              <a href="#how" className="flex underline">
                <span className="mr-2">→</span>
                <span>Explore how we work</span>
              </a>
              <a href="mailto:david@surprisesystems.io" className="flex underline">
                <span className="mr-2">→</span>
                <span>Start a conversation</span>
              </a>
              <a href="/press" className="flex underline">
                <span className="mr-2">→</span>
                <span>Read our press release</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Cost Section */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16">
            {/* Left - Image 718x479 */}
            <div ref={addToRefs} className="reveal order-2 md:order-1">
              <img
                src="/images/image-hidden-cost.png"
                alt="Innovation"
                className="w-full max-w-[718px] h-auto aspect-[366/244] md:aspect-[718/479] object-cover"
              />
            </div>

            {/* Right - Text */}
            <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px] order-1 md:order-2">
              <h2 className="font-bold uppercase tracking-[0.01em] mb-6">
                The hidden cost of playing it safe.
              </h2>
              <div className="space-y-4">
                <p>For a long time, playing it safe&nbsp;worked.</p>
                <p>Predictable markets rewarded optimization, efficiency, and&nbsp;control.</p>
                <p>
                  Today, that same logic often slows progress. Organizations optimize what can be
                  measured, while behavior stays the&nbsp;same.
                </p>
                <p>Assumptions harden early. Learning comes late. Relevance fades&nbsp;quietly.</p>
              </div>
              <div className="mt-6 space-y-1 font-medium">
                <p>The risk is rarely moving too&nbsp;fast.</p>
                <p>It's locking into the wrong direction too&nbsp;early.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Changing Behavior Section */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:pl-[124px] md:pr-6">
          <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px]">
            <h2 className="font-bold uppercase tracking-[0.01em] mb-6">
              Behavioral change as a method.
            </h2>
            <div className="space-y-4">
              <p>
                Real change doesn't come from strategy decks. It comes from behavioral change. We design
                products, services, and formats that drive real behavioral change, and we measure what
                happens. Creativity is not&nbsp;decoration.
              </p>
              <p>It is the mechanism that makes new behavior&nbsp;possible.</p>
            </div>
            <div className="mt-6 space-y-1 italic font-medium">
              <p>No behavioral&nbsp;change.</p>
              <p>No real&nbsp;impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* David Borg Section */}
      <section className="py-5 md:py-[50px]" id="who">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16">
            {/* Left - Image */}
            <div ref={addToRefs} className="reveal">
              <img
                src="/images/david-borg-new.png"
                alt="David Borg"
                className="w-full md:max-w-[658px] h-auto"
              />
            </div>

            {/* Right - Text */}
            <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px]">
              <h3 className="font-bold uppercase tracking-[0.01em] mb-6">David Borg</h3>
              <div className="space-y-4">
                <p>
                  A strategist and entrepreneur with the ability to connect business, culture, and
                  technology in ways that create new&nbsp;opportunities.
                </p>
                <p>
                  His work has shaped some of Sweden's most successful communication concepts,
                  defined by clarity and cultural&nbsp;relevance.
                </p>
                <p>
                  As the founder of Borg Owilli, he built one of the country's leading content
                  agencies and developed it into a widely respected creative&nbsp;organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Johan Pihl Section */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16">
            {/* Left - Text */}
            <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px] md:ml-auto order-2 md:order-1">
              <h3 className="font-bold uppercase tracking-[0.01em] mb-6">Johan Pihl</h3>
              <div className="space-y-4">
                <p>
                  A creative entrepreneur and innovation specialist working at the intersection of
                  communication, design, and technology to solve complex challenges. Over more than
                  two decades, he has built a career that connects marketing, innovation, and&nbsp;fintech.
                </p>
                <p>
                  His projects span from global sustainability initiatives to financial technology
                  platforms, earning him recognition as one of Sweden's most prominent creative&nbsp;leaders.
                </p>
              </div>
            </div>

            {/* Right - Image */}
            <div ref={addToRefs} className="reveal order-1 md:order-2">
              <img
                src="/images/johan-pihl-new.png?v=2"
                alt="Johan Pihl"
                className="w-full max-w-[567px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* From Uncertainty to Momentum Section */}
      <section className="py-5 md:py-[50px]" id="how">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16">
            {/* Left - Text (order-2 on mobile, order-1 on desktop) */}
            <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px] md:pl-[101px] order-2 md:order-1">
              <h2 className="font-bold uppercase tracking-[0.01em] mb-6">
                From uncertainty to momentum
              </h2>
              <div className="space-y-4">
                <p>
                  We work where complexity is high and clarity is missing - where better decisions matter&nbsp;most.
                </p>
                <p>
                  Our work moves through three tempos, each designed to turn uncertainty into&nbsp;action.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="font-medium uppercase flex"><span className="mr-2">→</span><span>Sprint</span></p>
                  <p className="pl-5">Test direction before&nbsp;committing.</p>
                </div>
                <div>
                  <p className="font-medium uppercase flex"><span className="mr-2">→</span><span>Leap</span></p>
                  <p className="pl-5">Turn validated direction into something worth investing&nbsp;in.</p>
                </div>
                <div>
                  <p className="font-medium uppercase flex"><span className="mr-2">→</span><span>Blitz</span></p>
                  <p className="pl-5">Scale what works. Create measurable market&nbsp;impact.</p>
                </div>
              </div>

              <p className="mt-8">
                Each tempo turns uncertainty into something you can actually act&nbsp;on.
              </p>
            </div>

            {/* Right - Awards Grid (order-1 on mobile, order-2 on desktop) */}
            <div ref={addToRefs} className="reveal order-1 md:order-2">
              {/* Description - shown first on desktop, after grid on mobile */}
              <p className="hidden md:block text-[10px] text-[#7b7575] uppercase tracking-[0.1px] leading-[12px] mb-4 max-w-[567px]">
                Historically, we've had the privilege of working on projects that have been awarded and internationally recognized for their creative excellence and real-world impact.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <img src="/images/award-1.svg" alt="Fast Company World Changing Ideas" className="w-full h-auto" />
                <img src="/images/award-2.svg" alt="Cannes Lions Grand Prix" className="w-full h-auto" />
                <img src="/images/award-3.svg" alt="Time Magazine Invention of the Year" className="w-full h-auto" />
                <img src="/images/award-4.svg" alt="Fast Company Most Innovative Companies" className="w-full h-auto" />
                <img src="/images/award-5.svg?v=2" alt="D&AD Yellow Pencil Winner" className="w-full h-auto" />
                <img src="/images/award-6.svg" alt="Red Dot Award Gold Winner" className="w-full h-auto" />
              </div>
              {/* Description - shown after grid on mobile only */}
              <p className="md:hidden text-[10px] text-[#7b7575] uppercase tracking-[0.1px] leading-[12px] mt-4 max-w-[370px]">
                Historically, we've had the privilege of working on projects that have been awarded and internationally recognized for their creative excellence and real-world impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venn Diagram Section */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div className="border-[0.5px] border-black bg-white p-4 md:p-12 md:mx-[23px]">
            <div ref={addToRefs} className="reveal flex justify-center">
              {/* Mobile: vertical image */}
              <img
                src="/images/venn-diagram-mobile.png?v=2"
                alt="Service Design Process"
                className="w-full md:hidden"
              />
              {/* Desktop: horizontal image */}
              <img
                src="/images/venn-diagram-new-feb.png?v=2"
                alt="Service Design Process"
                className="hidden md:block w-full max-w-[993px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:pl-[124px] md:pr-6">
          <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px]">
            <h2 className="font-bold uppercase tracking-[0.01em] mb-6">
              The ROI of better decisions
            </h2>
            <div className="space-y-4">
              <p>We don't promise vague innovation&nbsp;outcomes.</p>
              <p>We promise better decisions,&nbsp;earlier.</p>
            </div>

            <div className="mt-6 space-y-6">
              <p className="font-medium flex"><span className="mr-2">→</span><span>Reach strategic clarity&nbsp;faster</span></p>
              <p className="font-medium flex"><span className="mr-2">→</span><span>Test bold directions before committing at&nbsp;scale</span></p>
              <p className="font-medium flex"><span className="mr-2">→</span><span>Align around evidence instead of&nbsp;opinion</span></p>
              <p className="font-medium flex"><span className="mr-2">→</span><span>Reduce the cost of being&nbsp;wrong</span></p>
            </div>

            <div className="mt-6 space-y-1">
              <p>The biggest hidden cost isn't&nbsp;failure.</p>
              <p>It's being wrong too&nbsp;late.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Image */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div ref={addToRefs} className="reveal">
            <img
              src="/images/footer-new.png"
              alt="Surprise Systems Team"
              className="w-full max-w-none md:max-w-[1356px] h-auto mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-5 md:py-[50px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[23px]">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16">
            {/* Left - CTA */}
            <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px] md:pl-[101px]">
              <p className="font-bold uppercase tracking-[0.01em]">
                Innovation is not about taking bigger risks. It's about reducing the cost of being
                wrong - and knowing where to move before others&nbsp;do.
              </p>
              <a
                href="mailto:david@surprisesystems.io"
                className="flex mt-6 font-bold uppercase underline"
              >
                <span className="mr-2">→</span>
                <span>Start with a conversation</span>
              </a>
            </div>

            {/* Right - Partners & Advisors */}
            <div ref={addToRefs} className="reveal max-w-[367px] md:max-w-[515px]">
              <h3 className="font-bold uppercase tracking-[0.01em] mb-6">Partners & advisors</h3>
              <p>
                We're proud to have the leading Nordic creative network{" "}
                <a
                  href="https://nordddb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  NORD
                </a>
                {" "}as our founding partner, and to be backed by visionary leader{" "}
                <a
                  href="https://www.linkedin.com/in/robert-falck-4a65262/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Robert Falck
                </a>
                , founder of the Swedish unicorn{" "}
                <a
                  href="https://einride.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Einride
                </a>
                , who also serves as our&nbsp;advisor.
              </p>
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

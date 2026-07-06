import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoSection from "@/components/DemoSection";
import Reveal from "@/components/Reveal";
import { BRAND, seeItInAction } from "@/lib/site";

export const metadata: Metadata = {
  title: `See it in action — ${BRAND}`,
  description:
    "Watch short walkthroughs of our website, inbox, review funnel, marketing campaigns, and automated lead follow-up.",
};

export default function SeeItInActionPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative px-5 pb-8 pt-32 text-center sm:px-6 md:pb-12 md:pt-40">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{seeItInAction.eyebrow}</span>
            <h1 className="display mt-5 text-[clamp(2.4rem,6.5vw,4.8rem)] leading-[1.02]">
              <span className="text-ink">{seeItInAction.heading[0]}</span>
              <br />
              <span className="text-gradient">{seeItInAction.heading[1]}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
              {seeItInAction.sub}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="hairline mx-auto max-w-7xl border-t" />

      {seeItInAction.sections.map((section, i) => (
        <div key={section.id}>
          {i > 0 && (
            <div className="hairline mx-auto max-w-7xl border-t" />
          )}
          <DemoSection
            id={section.id}
            title={section.title}
            stats={section.stats}
            videoSrc={section.videoSrc}
            poster={section.poster}
            reverse={i % 2 === 1}
          />
        </div>
      ))}

      <section className="pb-24 pt-8 md:pb-32">
        <div className="container-x">
          <Reveal>
            <div className="glass relative px-5 py-12 text-center sm:px-8 sm:py-14 md:px-14">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(196,98,63,0.12),transparent_60%)]" />
              </div>
              <div className="relative mx-auto max-w-xl">
                <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-ink">
                  Like what you see?
                </h2>
                <p className="mt-4 text-ink-muted">
                  Book a free 30-minute call and we&apos;ll walk through exactly
                  what this would look like for your business.
                </p>
                <a
                  href={seeItInAction.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-8 inline-flex justify-center !px-10 !py-4 !text-base"
                >
                  {seeItInAction.cta.label}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

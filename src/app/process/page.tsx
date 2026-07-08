import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { BRAND, cta, process as processData } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND} — Our process`,
  description:
    "How working with HDA Systems works: a demo call, we build your system within 7 working days, then a launch call. Simple.",
};

export default function ProcessPage() {
  return (
    <main className="relative">
      <Navbar />

      <PageHero
        eyebrow={processData.eyebrow}
        headline={["What working with us", "looks like."]}
        sub="No mystery, no endless meetings. Three short steps and you're live — most clients are up and running within 7 working days."
      />

      {/* Steps */}
      <section className="relative pb-16 pt-4 md:pb-24">
        <div className="container-x flex flex-col gap-5">
          {processData.steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08}>
              <div className="card flex flex-col gap-5 p-7 md:flex-row md:items-center md:gap-10 md:p-10">
                <div className="display text-5xl text-accent-coral md:text-7xl">
                  {s.k}
                </div>
                <div className="hidden h-16 w-0.5 bg-ink/15 md:block" />
                <div>
                  <h2 className="display text-2xl text-ink md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBlock
        eyebrow={cta.eyebrow}
        headline={cta.heading as [string, string]}
        sub={cta.sub}
        cta={cta.primary}
      />

      <Footer />
      <StickyCta />
    </main>
  );
}

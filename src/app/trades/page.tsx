import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { BRAND, cta, trades } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND} — Trades we serve`,
  description:
    "From roofers and plumbers to landscapers and general contractors — HDA Systems builds websites and lead systems for trade and home-service businesses.",
};

export default function TradesPage() {
  return (
    <main className="relative">
      <Navbar />

      <PageHero
        eyebrow="Who it's for"
        headline={["Serving all these trades", "and more."]}
        sub="If you run a trade or home-service business and rely on local customers finding you, we build the website and systems to get you more of them."
      />

      {/* Trades grid */}
      <section className="relative pb-16 pt-4 md:pb-24">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {trades.map((t, i) => (
              <Reveal key={t} delay={(i % 4) * 0.05}>
                <div className="card flex items-center gap-3 p-5 transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-lg">
                  <span className="h-2.5 w-2.5 flex-none rounded-full border border-ink bg-accent-coral" />
                  <span className="text-sm font-medium text-ink">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-ink-muted">
              Not on the list? If you serve local customers, we can almost
              certainly help.
            </p>
          </Reveal>
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

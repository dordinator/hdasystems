import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { BRAND, careers, EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND} — Careers`,
  description: careers.sub,
};

export default function CareersPage() {
  return (
    <main className="relative">
      <Navbar />

      <PageHero
        eyebrow={careers.eyebrow}
        headline={careers.heading as [string, string]}
        sub={careers.sub}
      />

      {/* Perks */}
      <section className="relative pb-8 pt-4">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {careers.perks.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.07}>
                <div className="card h-full p-7">
                  <h3 className="display text-lg text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="section-alt relative py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <span className="sticker">Open roles</span>
            <h2 className="display mt-6 max-w-2xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] text-ink">
              Come build with us.
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4">
            {careers.roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                    `Application: ${r.title}`
                  )}`}
                  className="card group flex flex-col gap-4 p-6 transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-lg md:flex-row md:items-center md:justify-between md:p-7"
                >
                  <div>
                    <h3 className="display text-xl text-ink">{r.title}</h3>
                    <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                      {r.type} · {r.location}
                    </p>
                  </div>
                  <span className="btn-ghost !px-6">
                    Apply
                    <span aria-hidden>→</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-ink-muted">{careers.note}</p>
          </Reveal>
        </div>
      </section>

      <CtaBlock
        eyebrow="Get in touch"
        headline={["Think you'd", "be a fit?"]}
        sub="Send us a note and tell us what you're great at."
        cta={{
          label: "Email us",
          href: `mailto:${EMAIL}?subject=${encodeURIComponent(
            "Working at HDA Systems"
          )}`,
        }}
        external={false}
      />

      <Footer />
      <StickyCta />
    </main>
  );
}

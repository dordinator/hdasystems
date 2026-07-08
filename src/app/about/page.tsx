import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { about, aboutNav, BRAND, cta } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND} — About us`,
  description: about.sub,
};

export default function AboutPage() {
  const explore = aboutNav.filter((item) => item.href !== "/about");

  return (
    <main className="relative">
      <Navbar />

      <PageHero
        eyebrow={about.eyebrow}
        headline={about.heading as [string, string]}
        sub={about.sub}
      />

      {/* Quick facts */}
      <section className="relative pb-12 pt-2 md:pb-16">
        <div className="container-x">
          <Reveal>
            <div className="grid overflow-hidden rounded-2xl border-2 border-ink bg-base-50 shadow-card sm:grid-cols-3">
              {about.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-2 p-6 md:p-8 ${
                    i < about.stats.length - 1
                      ? "border-b-2 border-ink sm:border-b-0 sm:border-r-2"
                      : ""
                  }`}
                >
                  <div className="display text-4xl text-accent-coral md:text-5xl">
                    {s.value}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="relative pb-16 md:pb-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <span className="sticker">Our take</span>
              <p className="display mt-6 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] text-ink">
                {about.story[0]}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                {about.story[1]}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-alt relative py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <span className="sticker">Why work with us</span>
            <h2 className="display mt-6 max-w-2xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] text-ink">
              Just like everyone else{" "}
              <span className="italic text-accent-coral">— apparently.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <div className="card flex h-full gap-5 p-7 md:gap-6 md:p-8">
                  <span className="display flex-none text-4xl text-accent-coral md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-xl text-ink">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {v.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore more */}
      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <span className="sticker">Keep exploring</span>
            <h2 className="display mt-6 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.02] text-ink">
              There&apos;s more to see.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {explore.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.06}>
                <Link
                  href={item.href}
                  className="group card flex h-full flex-col p-6 transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-lg md:p-7"
                >
                  <h3 className="display text-lg text-ink">{item.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {item.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-coral">
                    Learn more <span aria-hidden>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
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

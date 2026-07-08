import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Reveal from "@/components/Reveal";
import DemoFrame from "@/components/DemoFrame";
import PlanBadge from "@/components/PlanBadge";
import CtaBlock from "@/components/CtaBlock";
import {
  BRAND,
  CAL_URL,
  products,
  productsPage,
  process as processData,
  trades,
  cta,
  hasDemo,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND} — Systems that win contractors more work`,
  description:
    "A website, review funnel, missed-call text-back, one-click campaigns and local SEO — simple systems built to get contractors more customers.",
};

export default function ProductsPage() {
  // Products with a video demo lead the list; stable sort keeps the
  // original order within each group.
  const orderedProducts = [...products].sort(
    (a, b) => Number(Boolean(b.demoVideo)) - Number(Boolean(a.demoVideo))
  );

  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-x">
          <Reveal>
            <span className="sticker">{productsPage.eyebrow}</span>
            <h1 className="display mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.0] text-ink">
              {productsPage.heading[0]}{" "}
              <span className="italic text-accent-coral">
                {productsPage.heading[1]}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              {productsPage.sub}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-8 !py-3.5 !text-[1rem]"
              >
                Book a call
                <span aria-hidden>↗</span>
              </a>
              <a href="#systems" className="btn-ghost !px-8 !py-3.5 !text-[1rem]">
                See the systems
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products / systems */}
      <section id="systems" className="relative pb-8 pt-8">
        <div className="container-x flex flex-col gap-24 md:gap-36">
          {orderedProducts.map((p, i) => {
            const demo = hasDemo(p);
            return (
            <Reveal key={p.slug}>
              <div
                className={`grid items-center gap-10 md:gap-14 ${
                  demo ? "md:grid-cols-2" : "md:grid-cols-1"
                }`}
              >
                {/* text */}
                <div className={demo && i % 2 === 1 ? "md:order-2" : ""}>
                  <span
                    className="inline-flex -rotate-1 items-center gap-2 rounded-lg border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-card-sm"
                    style={{ background: p.accent }}
                  >
                    {p.eyebrow}
                  </span>
                  <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02] text-ink">
                    {p.name}
                  </h2>
                  <p className="mt-4 max-w-lg text-lg text-ink-muted">
                    {p.tagline}
                  </p>

                  <div className="mt-5">
                    <PlanBadge plan={p.plan} />
                  </div>

                  <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <div key={f.title}>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="h-2 w-2 flex-none rounded-full border border-ink"
                            style={{ background: p.accent }}
                          />
                          <h3 className="text-sm font-semibold text-ink">
                            {f.title}
                          </h3>
                        </div>
                        <p className="mt-1.5 pl-[18px] text-sm leading-relaxed text-ink-muted">
                          {f.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/products/${p.slug}`}
                    className="btn-ghost mt-9 !px-6"
                  >
                    {demo ? "See the demo" : "Learn more"}
                    <span aria-hidden>→</span>
                  </Link>
                </div>

                {/* demo cutout — only when there's something to show */}
                {demo && (
                  <div className={i % 2 === 1 ? "md:order-1" : ""}>
                    <Link href={`/products/${p.slug}`} className="block">
                      <DemoFrame
                        label={p.slug}
                        note={p.demoNote}
                        accent={p.accent}
                        src={p.demoUrl}
                        video={p.demoVideo}
                        pdf={p.demoPdf}
                      />
                    </Link>
                  </div>
                )}
              </div>
            </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="section-alt relative py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <span className="sticker">{processData.eyebrow}</span>
            <h2 className="display mt-6 max-w-2xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] text-ink">
              {processData.heading}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {processData.steps.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.08}>
                <div className="card h-full p-7">
                  <div className="font-mono text-sm font-bold text-accent-coral">
                    {s.k}
                  </div>
                  <h3 className="display mt-4 text-xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trades */}
      <section className="relative py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="card px-7 py-10 md:px-12 md:py-14">
              <span className="sticker">Who it&apos;s for</span>
              <h2 className="display mt-6 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-[1.02] text-ink">
                Serving all these trades{" "}
                <span className="italic text-accent-coral">and more.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {trades.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border-2 border-ink bg-base-100 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-coral hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
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

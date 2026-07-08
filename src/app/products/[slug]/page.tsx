import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Reveal from "@/components/Reveal";
import DemoFrame from "@/components/DemoFrame";
import PlanBadge from "@/components/PlanBadge";
import CtaBlock from "@/components/CtaBlock";
import { BRAND, cta, getProduct, products, hasDemo } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: `${BRAND} — Systems` };
  return {
    title: `${BRAND} — ${product.name}`,
    description: product.summary,
  };
}

export default async function ProductDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const demo = hasDemo(product);
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero: title + stats + demo, all on the first screen */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="min-w-0">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-accent-coral"
                >
                  <span aria-hidden>←</span> All systems
                </Link>
                <div className="mt-4">
                  <span
                    className="inline-flex -rotate-1 items-center gap-2 rounded-lg border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-card-sm"
                    style={{ background: product.accent }}
                  >
                    {product.eyebrow}
                  </span>
                  <h1 className="display mt-4 max-w-3xl break-words text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02] text-ink">
                    {product.name}
                  </h1>
                  <div className="mt-4">
                    <PlanBadge plan={product.plan} />
                  </div>
                </div>
              </div>
              <p className="max-w-md text-ink-muted md:shrink-0 md:text-right md:text-lg">
                {product.tagline}
              </p>
            </div>
          </Reveal>

          {/* stats + demo cutout (Stone-Systems style) */}
          <Reveal delay={0.1}>
            {demo ? (
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {/* stats */}
                <div className="flex flex-col gap-4">
                  {product.stats.map((s) => (
                    <div key={s.label} className="card-soft flex-1 p-6">
                      <div
                        className="display text-4xl md:text-5xl"
                        style={{ color: product.accent }}
                      >
                        {s.value}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* demo */}
                <div className="lg:col-span-2">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span
                      className="h-2 w-2 rounded-full border border-ink"
                      style={{ background: product.accent }}
                    />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      {product.demoPdf
                        ? "Scroll through the roadmap below"
                        : "See a short demo below"}
                    </span>
                  </div>
                  <DemoFrame
                    label={product.slug}
                    note={product.demoNote}
                    accent={product.accent}
                    src={product.demoUrl}
                    video={product.demoVideo}
                    pdf={product.demoPdf}
                  />
                </div>
              </div>
            ) : (
              // No demo — show stats as a full-width row, no empty cutout.
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {product.stats.map((s) => (
                  <div key={s.label} className="card-soft p-6">
                    <div
                      className="display text-4xl md:text-5xl"
                      style={{ color: product.accent }}
                    >
                      {s.value}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Feature breakdown */}
      <section className="section-alt relative py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <h2 className="display max-w-2xl text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.02] text-ink">
              What{" "}
              <span className="italic text-accent-coral">{product.name}</span>{" "}
              does for you.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="card h-full p-7">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 flex-none rounded-full border border-ink"
                      style={{ background: product.accent }}
                    />
                    <h3 className="display text-lg text-ink">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore other systems */}
      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <span className="sticker">Keep exploring</span>
            <h2 className="display mt-6 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.02] text-ink">
              The other systems.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group card flex h-full flex-col p-6 transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-lg"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-ink"
                    style={{ background: p.accent }}
                  />
                  <h3 className="display mt-4 text-lg text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {p.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-coral">
                    See demo <span aria-hidden>→</span>
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

import Link from "next/link";
import { capabilities, products } from "@/lib/site";
import Reveal from "./Reveal";

const icons: Record<string, React.ReactNode> = {
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  magnet: <path d="M6 3v6a6 6 0 1 0 12 0V3M6 7h4M14 7h4" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  star: (
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V6L6 11H4a1 1 0 0 0-1 1z" />
      <path d="M18 8a4 4 0 0 1 0 8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 12h5l2 3h4l2-3h5" />
      <path d="M5 6h14l2 6v6H3v-6z" />
    </>
  ),
};

export default function Capabilities() {
  const items = products.filter((p) => p.slug !== "website");
  return (
    <section id="capabilities" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="sticker">{capabilities.eyebrow}</span>
            <h2 className="display mt-6 text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.0]">
              <span className="text-ink">{capabilities.heading[0]}</span>{" "}
              <span className="italic text-accent-coral">
                {capabilities.heading[1]}
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted">{capabilities.sub}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/products/${p.slug}`}
                className="group card flex h-full flex-col p-7 transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-lg"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink text-white shadow-card-sm"
                    style={{ background: p.accent }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icons[p.icon]}
                    </svg>
                  </span>
                  <span className="font-mono text-sm font-bold text-ink-faint">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">
                  {p.name}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink-muted">
                  {p.menuDesc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-coral">
                  See demo <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Link href="/products" className="btn-ghost !px-7">
              View all systems
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

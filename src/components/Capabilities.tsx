import { capabilities } from "@/lib/site";
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
  chat: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
};

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="eyebrow">{capabilities.eyebrow}</span>
            <h2 className="display mt-4 text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.98]">
              <span className="text-ink">{capabilities.heading[0]}</span>
              <br />
              <span className="text-gradient">{capabilities.heading[1]}</span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted">{capabilities.sub}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <div className="group glass h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-terra/30 hover:shadow-[0_30px_50px_-30px_rgba(44,38,32,0.4)] sm:p-6 md:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-accent-terra/[0.08] text-accent-terra transition-colors group-hover:border-accent-terra/40">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[item.icon]}
                  </svg>
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

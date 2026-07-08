import { cta } from "@/lib/site";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-accent-coral px-8 py-16 text-center shadow-card-lg md:px-14 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_0%,rgba(255,255,255,0.25),transparent_65%)]" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
              <span className="sticker !border-white !bg-white !text-ink">
                {cta.eyebrow}
              </span>
              <h2 className="display mt-6 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] text-white">
                {cta.heading[0]}{" "}
                <span className="italic text-white/95">{cta.heading[1]}</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-white/90">{cta.sub}</p>
              <a
                href={cta.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-9 !border-ink !bg-white !px-12 !py-4 !text-lg"
              >
                {cta.primary.label}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { cta, SEE_IT_IN_ACTION_PATH } from "@/lib/site";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="glass relative px-5 py-12 text-center sm:px-8 sm:py-16 md:px-14 md:py-24">
            {/* soft inner glow — clipped separately so heading glyphs aren't trimmed */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(196,98,63,0.12),transparent_60%)]" />
            </div>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
              <span className="eyebrow">{cta.eyebrow}</span>
              <h2 className="display mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02]">
                <span className="text-ink">{cta.heading[0]}</span>
                <br />
                <span className="text-gradient">{cta.heading[1]}</span>
                <br />
                <span className="text-gradient">{cta.heading[2]}</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-ink-muted">{cta.sub}</p>

              <a
                href={cta.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full justify-center !px-8 !py-3.5 !text-base sm:mt-9 sm:w-auto sm:!px-12 sm:!py-4 sm:!text-lg"
              >
                {cta.primary.label}
                <span aria-hidden>↗</span>
              </a>
              <a
                href={SEE_IT_IN_ACTION_PATH}
                className="btn-ghost mt-4 w-full justify-center !px-8 !py-3.5 !text-base sm:w-auto sm:!px-10 sm:!py-3.5"
              >
                See it in action
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

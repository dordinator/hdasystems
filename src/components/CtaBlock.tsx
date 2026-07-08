import Reveal from "./Reveal";

type CtaBlockProps = {
  eyebrow: string;
  headline: [string, string];
  sub: string;
  cta: { label: string; href: string };
  external?: boolean;
};

/* Shared final call-to-action panel used across pages. */
export default function CtaBlock({
  eyebrow,
  headline,
  sub,
  cta,
  external = true,
}: CtaBlockProps) {
  return (
    <section className="relative pb-24 md:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-accent-coral px-8 py-16 text-center shadow-card-lg md:px-14 md:py-24">
            {/* warm inner tint */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_0%,rgba(255,255,255,0.25),transparent_65%)]" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
              <span className="sticker !border-white !bg-white !text-ink">
                {eyebrow}
              </span>
              <h2 className="display mt-6 text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] text-white">
                {headline[0]}{" "}
                <span className="italic text-white/95">{headline[1]}</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-white/90">{sub}</p>
              <a
                href={cta.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="btn-ghost mt-9 !border-ink !bg-white !px-10 !py-4 !text-[1rem] !text-ink md:!text-lg"
              >
                {cta.label}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

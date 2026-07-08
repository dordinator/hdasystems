import type { ReactNode } from "react";
import Reveal from "./Reveal";

/* Compact hero for inner pages. Sticker eyebrow + display headline
   (second segment italic coral) + sub. */
export default function PageHero({
  eyebrow,
  headline,
  sub,
  children,
}: {
  eyebrow: string;
  headline: [string, string];
  sub: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="container-x">
        <Reveal>
          <span className="sticker">{eyebrow}</span>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.0] text-ink">
            {headline[0]}{" "}
            <span className="italic text-accent-coral">{headline[1]}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">{sub}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

import { plans, pricing } from "@/lib/site";
import Reveal from "./Reveal";

function Check({ highlight }: { highlight: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 border-ink text-[11px] font-bold ${
        highlight ? "bg-white text-ink" : "bg-accent-coral text-white"
      }`}
    >
      ✓
    </span>
  );
}

export default function PricingTiers() {
  return (
    <section id="pricing" className="section-alt relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="sticker">{pricing.eyebrow}</span>
            <h2 className="display mt-6 text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] text-ink">
              {pricing.heading[0]}{" "}
              <span className="italic text-accent-coral">
                {pricing.heading[1]}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-muted">
              {pricing.sub}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border-2 border-ink p-7 md:p-9 ${
                  plan.highlight
                    ? "bg-accent-coral text-white shadow-card-lg"
                    : "bg-base-50 text-ink shadow-card"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 right-6 -rotate-1 rounded-lg border-2 border-ink bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-card-sm">
                    Most popular
                  </span>
                )}

                <h3
                  className={`display text-2xl ${
                    plan.highlight ? "text-white" : "text-ink"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    plan.highlight ? "text-white/85" : "text-ink-muted"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="display text-6xl leading-none">
                    £{plan.price}
                  </span>
                  <span
                    className={`mb-2 text-[1rem] ${
                      plan.highlight ? "text-white/85" : "text-ink-muted"
                    }`}
                  >
                    /mo
                  </span>
                </div>

                <ul className="mt-7 flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check highlight={plan.highlight} />
                      <span
                        className={
                          plan.highlight ? "text-white" : "text-ink"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.addonNote && (
                  <p
                    className={`mt-4 font-mono text-[11px] uppercase tracking-[0.1em] ${
                      plan.highlight ? "text-white/75" : "text-ink-faint"
                    }`}
                  >
                    {plan.addonNote}
                  </p>
                )}

                <a
                  href={plan.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 w-full ${
                    plan.highlight
                      ? "btn-ghost !border-ink !bg-white"
                      : "btn-primary"
                  }`}
                >
                  {plan.cta.label}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-lg text-center text-sm text-ink-muted">
            {pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

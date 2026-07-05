"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { calculator } from "@/lib/site";
import Reveal from "./Reveal";

export default function PricingCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setSelected((s) => ({ ...s, [id]: !s[id] }));

  const { monthly, oneoff } = useMemo(() => {
    let monthly = calculator.base.price;
    let oneoff = 0;
    for (const a of calculator.addons) {
      if (!selected[a.id]) continue;
      if (a.type === "mo") monthly += a.price;
      else oneoff += a.price;
    }
    return { monthly, oneoff };
  }, [selected]);

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 text-center">
            <span className="eyebrow">{calculator.eyebrow}</span>
            <h2 className="display mt-4 text-[clamp(2.2rem,6vw,4.5rem)] text-ink">
              Pay for exactly{" "}
              <span className="text-gradient">what you need.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass mx-auto grid max-w-5xl gap-0 overflow-hidden md:grid-cols-[1.2fr_1fr]">
            {/* options */}
            <div className="border-b border-line p-5 md:border-b-0 md:border-r md:p-10">
              <div className="flex flex-col gap-3 rounded-2xl border border-accent-terra/30 bg-accent-terra/[0.07] p-4 md:flex-row md:items-center md:justify-between md:p-5">
                <div className="min-w-0">
                  <div className="font-semibold text-ink">
                    {calculator.base.label}
                  </div>
                  <div className="text-sm text-ink-muted">
                    Website + the full lead system
                  </div>
                </div>
                <div className="display shrink-0 text-xl text-ink">
                  £{calculator.base.price}
                  <span className="text-sm text-ink-muted">/mo</span>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {calculator.addons.map((a) => {
                  const on = !!selected[a.id];
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggle(a.id)}
                      className={`flex w-full flex-col gap-2 rounded-2xl border p-4 text-left transition-all duration-200 md:flex-row md:items-center md:justify-between md:gap-4 ${
                        on
                          ? "border-accent-terra/50 bg-accent-terra/[0.09]"
                          : "border-line bg-ink/[0.02] hover:border-ink/20"
                      }`}
                    >
                      <div className="flex min-w-0 items-start gap-3 md:items-center">
                        <span
                          className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border transition-colors md:mt-0 ${
                            on
                              ? "border-accent-terra bg-accent-terra text-[#fbf5ec]"
                              : "border-ink/20 text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                        <span className="min-w-0 text-sm leading-snug text-ink">
                          {a.label}
                        </span>
                      </div>
                      <span className="shrink-0 pl-9 font-mono text-xs text-ink-muted md:pl-0">
                        +£{a.price}
                        {a.type === "mo" ? "/mo" : " once"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* total */}
            <div className="flex flex-col justify-between p-5 md:p-10">
              <div>
                <div className="eyebrow">Your estimate</div>
                <div className="mt-5 flex items-end gap-1">
                  <motion.span
                    key={monthly}
                    initial={{ opacity: 0.4, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="display text-5xl text-gradient-accent md:text-7xl"
                  >
                    £{monthly}
                  </motion.span>
                  <span className="mb-3 text-lg text-ink-muted">/mo</span>
                </div>
                {oneoff > 0 && (
                  <div className="mt-2 text-sm text-ink-muted">
                    + £{oneoff} one-off setup
                  </div>
                )}
                <p className="mt-5 text-xs leading-relaxed text-ink-faint">
                  {calculator.note}
                </p>
              </div>

              <a
                href={calculator.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full justify-center"
              >
                {calculator.cta.label}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

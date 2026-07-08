"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/site";
import SystemFlow from "./SystemFlow";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* copy */}
          <div className="flex flex-col items-start text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sticker !text-[12px] md:!text-[13px]"
            >
              {hero.eyebrow}
            </motion.span>

            <h1 className="display mt-6 text-[clamp(2.6rem,6.5vw,5.2rem)] leading-[0.98]">
              {hero.headline.map((line, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease }}
                    className={`inline-block ${
                      i === 1 ? "italic text-accent-coral whitespace-nowrap" : "text-ink"
                    }`}
                  >
                    {i === 0 ? `${line} ` : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className="mt-6 max-w-md text-balance text-lg text-ink-muted"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href={hero.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-8 !py-4 !text-[1rem] md:!text-lg"
              >
                {hero.primaryCta.label}
                <span aria-hidden>↗</span>
              </a>
              <a
                href={hero.secondaryCta.href}
                className="btn-ghost !px-8 !py-4 !text-[1rem] md:!text-lg"
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>
          </div>

          {/* system flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="w-full"
          >
            <SystemFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

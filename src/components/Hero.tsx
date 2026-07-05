"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero } from "@/lib/site";
import { scrollToAnchor } from "@/lib/scroll";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 text-center sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="mask-fade-edges absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-70 md:h-[115%] md:w-[95%]">
          <Scene3D />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="chip eyebrow max-w-[calc(100vw-3rem)] whitespace-nowrap !text-[11px] !tracking-[0.16em] px-4 py-2 sm:!text-[13px] sm:!tracking-[0.22em] sm:px-6 sm:py-2.5 md:!text-sm md:whitespace-normal"
        >
          <span className="h-2 w-2 flex-none rounded-full bg-accent-terra" />
          <span className="md:hidden">{hero.eyebrowMobile}</span>
          <span className="hidden md:inline">{hero.eyebrow}</span>
        </motion.span>

        <h1 className="display mt-7 text-[clamp(2.9rem,8vw,6.5rem)] font-medium leading-[1.02]">
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.95, delay: 0.1 + i * 0.12, ease }}
                className={`inline-block ${i === 1 ? "text-gradient" : "text-ink"}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-7 max-w-xl text-balance text-lg text-ink-muted"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease }}
          className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <a
            href={hero.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center !px-8 !py-3.5 !text-base sm:!px-10 sm:!py-4 sm:!text-lg md:!px-12"
          >
            {hero.primaryCta.label}
            <span aria-hidden>↗</span>
          </a>
          <a
            href={hero.secondaryCta.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToAnchor(hero.secondaryCta.href);
            }}
            className="btn-ghost justify-center !px-8 !py-3.5 !text-base !text-ink max-md:hover:!bg-transparent max-md:hover:!text-ink sm:!px-10 sm:!py-4 sm:!text-lg md:!px-12"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <span className="block h-12 w-px animate-pulse bg-gradient-to-b from-accent-terra to-transparent" />
      </div>
    </section>
  );
}

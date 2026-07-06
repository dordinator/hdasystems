"use client";

import Image from "next/image";
import { caseStudies } from "@/lib/site";
import Reveal from "./Reveal";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* Static screenshot — click through to the live site. */
function ScreenshotPreview({
  url,
  title,
  screenshot,
  accent,
}: {
  url: string;
  title: string;
  screenshot: string;
  accent: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/shot relative block min-w-0 overflow-hidden rounded-2xl border border-line bg-base-800 transition-all duration-300 active:scale-[0.99]"
      style={{
        boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.5)",
      }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={screenshot}
          alt={`${title} website`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
          className="object-cover object-top transition-transform duration-500 group-hover/shot:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-ink/5 to-transparent" />
        <span
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-line bg-base-800/90 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur-md"
          style={{ boxShadow: `0 12px 28px -12px ${accent}55` }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
          View site ↗
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-line px-3 py-2.5">
        <span className="truncate font-mono text-[10px] text-ink-faint">
          {hostOf(url)}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent-terra">
          Live
        </span>
      </div>
    </a>
  );
}

function ComingSoon({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-line bg-base-800 md:h-[380px]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(120% 90% at 80% 0%, ${accent}2e, transparent 55%), linear-gradient(160deg,#fffaf3,#efe6d8)`,
        }}
      />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {title}
        </span>
        <span className="rounded-full border border-line bg-base-900/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted backdrop-blur">
          Live preview coming soon
        </span>
      </div>
    </div>
  );
}

function CaseCard({
  cs,
  index,
}: {
  cs: (typeof caseStudies)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <Reveal delay={0.05}>
      <div className="glass min-w-0 p-4 sm:p-5 md:p-7">
        <div className="grid min-w-0 items-center gap-5 sm:gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
          {/* meta */}
          <div className={`min-w-0 ${reversed ? "md:order-2" : "md:order-1"}`}>
            <div className="eyebrow">{cs.sector}</div>
            <h3 className="display mt-3 text-balance text-2xl text-ink md:text-3xl lg:text-4xl">
              {cs.title}
            </h3>
            <p className="mt-4 max-w-md text-balance text-ink-muted">{cs.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2 md:mt-6">
              {cs.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-ink/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* site preview */}
          <div className={`min-w-0 ${reversed ? "md:order-1" : "md:order-2"}`}>
            {cs.url ? (
              <ScreenshotPreview
                url={cs.url}
                title={cs.title}
                screenshot={cs.screenshot}
                accent={cs.accent}
              />
            ) : (
              <ComingSoon title={cs.title} accent={cs.accent} />
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseStudies() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Gallery</span>
              <h2 className="display mt-4 text-[clamp(2.2rem,6vw,4.5rem)] text-ink">
                Proof, not <span className="text-gradient">promises.</span>
              </h2>
            </div>
            <p className="max-w-xs text-balance text-ink-muted">
              Real, live client sites — click any preview to visit.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-7 md:gap-12">
          {caseStudies.map((cs, i) => (
            <CaseCard key={cs.title} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

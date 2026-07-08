"use client";

import { useState } from "react";
import { caseStudies } from "@/lib/site";
import Reveal from "./Reveal";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* Live site preview with a URL bar, LIVE badge and "View site" button.
   Scrollable on hover; lifts toward the viewer when active. */
function Preview({ url, title }: { url: string; title: string }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-ink bg-base-50 shadow-card transition-all duration-300 ease-out will-change-transform ${
        active
          ? "-translate-x-1 -translate-y-2 scale-[1.04] shadow-card-lg"
          : ""
      }`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onWheel={(e) => {
        if (!active) return;
        e.stopPropagation();
      }}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-white">
        <iframe
          src={url}
          title={title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          className="h-full w-full bg-white"
          style={{ pointerEvents: active ? "auto" : "none" }}
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border-2 border-ink bg-base-50 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink shadow-card-sm transition-colors hover:bg-accent-coral hover:text-white"
        >
          View site ↗
        </a>
      </div>

      <div className="flex items-center justify-between border-t-2 border-ink bg-base-100 px-4 py-2.5">
        <span className="truncate font-mono text-[11px] text-ink-faint">
          {hostOf(url)}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
          <span className="h-2 w-2 rounded-full border border-ink bg-accent-coral" />
          Live
        </span>
      </div>
    </div>
  );
}

function ComingSoon({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-base-100 shadow-card transition-all duration-300 ease-out will-change-transform hover:-translate-x-1 hover:-translate-y-2 hover:scale-[1.04] hover:shadow-card-lg">
      <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,25,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,23,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative flex flex-col items-center gap-4 px-6 text-center">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink shadow-card-sm"
            style={{ background: accent }}
          >
            <span className="h-3 w-3 rounded-full border-2 border-ink bg-white" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-2 border-ink bg-base-50 px-4 py-2.5">
        <span className="font-mono text-[11px] text-ink-faint">
          coming soon
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">
          Soon
        </span>
      </div>
    </div>
  );
}

function CaseCard({ cs, i }: { cs: (typeof caseStudies)[number]; i: number }) {
  const flip = i % 2 === 1;
  return (
    <Reveal delay={0.05}>
      <div className="card p-5 md:p-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* text */}
          <div className={flip ? "md:order-2" : ""}>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-coral">
              {cs.sector}
            </span>
            <h3 className="display mt-3 text-3xl text-ink md:text-4xl">
              {cs.title}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
              {cs.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {cs.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border-2 border-ink bg-base-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* preview */}
          <div className={flip ? "md:order-1" : ""}>
            {cs.url ? (
              <Preview url={cs.url} title={cs.title} />
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
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="sticker">Selected work</span>
              <h2 className="display mt-6 text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] text-ink">
                Proof, not{" "}
                <span className="italic text-accent-coral">promises.</span>
              </h2>
            </div>
            <p className="max-w-xs text-ink-muted">
              These are real, live sites. Hover to scroll, or click
              &ldquo;View site&rdquo; to open the full thing.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-7">
          {caseStudies.map((cs, i) => (
            <CaseCard key={cs.title} cs={cs} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

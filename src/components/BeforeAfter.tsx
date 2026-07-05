"use client";

import { useCallback, useRef, useState } from "react";
import { transform } from "@/lib/site";
import Reveal from "./Reveal";

const serif = { fontFamily: '"Times New Roman", Times, serif' } as const;
const linkBlue = "#1a4ca3";

function Check({ ok }: { ok: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] ${
        ok ? "bg-accent-terra text-[#fbf5ec]" : "bg-ink/10 text-ink-faint"
      }`}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

export default function BeforeAfter() {
  const [pct, setPct] = useState(52);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPct(Math.min(94, Math.max(6, p)));
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="eyebrow">{transform.eyebrow}</span>
            <h2 className="display mt-4 text-[clamp(2rem,5.5vw,4rem)] text-ink">
              From forgettable to{" "}
              <span className="text-gradient">unforgettable.</span>
            </h2>
            <p className="mt-4 text-ink-muted">
              Drag the handle to compare — and hover either side to scroll it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={ref}
            className="glass relative aspect-[16/10] select-none overflow-hidden rounded-3xl md:aspect-[2/1]"
          >
            {/* AFTER — real live site, scrollable on hover (underneath) */}
            <div className="absolute inset-0 bg-white">
              <iframe
                src={transform.afterUrl}
                title="Built by HDA Solutions — Ashcombe Kitchens & Bathrooms"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                className="h-full w-full"
                style={{ border: 0, pointerEvents: dragging ? "none" : "auto" }}
              />
            </div>

            {/* BEFORE — dated page, scrollable on hover (clipped on top) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pct}%` }}
            >
              <div
                className="h-full w-full overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ pointerEvents: dragging ? "none" : "auto" }}
              >
                <LegacySite />
              </div>
            </div>

            {/* drag handle — pointer-capture so it works over the live iframe */}
            <div
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                draggingRef.current = true;
                setDragging(true);
                setFromClientX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (draggingRef.current) setFromClientX(e.clientX);
              }}
              onPointerUp={(e) => {
                draggingRef.current = false;
                setDragging(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
              }}
              onPointerCancel={() => {
                draggingRef.current = false;
                setDragging(false);
              }}
              className="absolute inset-y-0 z-20 flex w-6 cursor-ew-resize touch-none items-center justify-center"
              style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
            >
              <div className="pointer-events-none h-full w-px bg-ink/30" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-base-800/90 text-ink shadow-lg backdrop-blur-md">
                ⇄
              </div>
            </div>

            <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-line bg-base-800/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted backdrop-blur">
              {transform.before.label}
            </span>
            <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-accent-terra/40 bg-accent-terra/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-terra backdrop-blur">
              {transform.after.label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="glass-soft p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                {transform.before.name}
              </div>
              <ul className="space-y-2.5">
                {transform.before.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 text-sm text-ink-muted"
                  >
                    <Check ok={false} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-soft p-5">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-terra">
                {transform.after.name}
              </div>
              <ul className="space-y-2.5">
                {transform.after.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-ink">
                    <Check ok />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Genuinely nice interior photos — the bad site, good photography.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;
const heroPhoto = img("1556912167-f556f1f39fdf");
const galleryPhotos = [
  img("1604709177225-055f99402ea3"),
  img("1584622650111-993a426fbf0a"),
  img("1581858726788-75bc0f6a952d"),
  img("1600489000022-c2086d79f9d4"),
  img("1565183997392-2f6f122e5912"),
  img("1620626011761-996317b8d101"),
];

/* A dated, bare "default HTML" builder site — calm neutral palette, but
   amateur and forgettable. Long enough to scroll, centred on its side. */
function LegacySite() {
  const Link = ({ children }: { children: React.ReactNode }) => (
    <span className="underline" style={{ color: linkBlue }}>
      {children}
    </span>
  );
  const Photo = ({ src, h = "h-24" }: { src: string; h?: string }) => (
    <div className={`${h} overflow-hidden border border-[#999] bg-[#e9e9e9]`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Previous work"
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );

  return (
    <div className="min-h-full w-full bg-white text-black" style={serif}>
      <div className="mx-auto max-w-[600px] px-6 py-5 text-center">
        <h1 className="text-2xl font-bold leading-tight md:text-3xl">
          Dave&apos;s Kitchens &amp; Building
        </h1>
        <p className="mt-0.5 text-[12px] text-black/70 md:text-sm">
          Kitchens, Bathrooms &amp; Extensions — Durham &amp; the North East
        </p>

        <hr className="my-3 border-black/25" />
        <p className="text-[12px] md:text-sm">
          <Link>Home</Link>
          <span className="text-black/50"> | </span>
          <Link>About Us</Link>
          <span className="text-black/50"> | </span>
          <Link>Services</Link>
          <span className="text-black/50"> | </span>
          <Link>Gallery</Link>
          <span className="text-black/50"> | </span>
          <Link>Contact</Link>
        </p>
        <hr className="my-3 border-black/25" />

        <h2 className="text-lg font-bold md:text-xl">Welcome to our website</h2>
        <p className="mt-2 text-[12px] leading-relaxed md:text-sm">
          We are a family-run building firm with over 20 years of experience
          fitting kitchens and bathrooms across the local area. We offer a
          friendly, reliable service and free, no-obligation quotes.
        </p>

        <div className="mt-3 flex flex-col items-center gap-3">
          <div className="w-full max-w-[320px]">
            <Photo src={heroPhoto} h="h-36" />
          </div>
          <ul className="inline-block list-disc pl-5 text-left text-[12px] leading-relaxed md:text-sm">
            <li>Free quotes</li>
            <li>Fully insured</li>
            <li>20+ years experience</li>
            <li>Local, reliable team</li>
          </ul>
        </div>

        <hr className="my-4 border-black/25" />
        <h2 className="text-lg font-bold md:text-xl">Our Services</h2>
        <div className="mt-2 space-y-2.5 text-[12px] leading-relaxed md:text-sm">
          <p>
            <b>Kitchens.</b> Full kitchen fitting and refurbishment, including
            units, worktops, tiling and appliances. <Link>Read more</Link>
          </p>
          <p>
            <b>Bathrooms.</b> Bathroom installations, showers, tiling and
            plumbing. <Link>Read more</Link>
          </p>
          <p>
            <b>Extensions.</b> Single and double-storey extensions and
            knock-throughs. <Link>Read more</Link>
          </p>
          <p>
            <b>General building.</b> Brickwork, plastering, groundwork and
            general repairs. <Link>Read more</Link>
          </p>
        </div>

        <hr className="my-4 border-black/25" />
        <h2 className="text-lg font-bold md:text-xl">Gallery</h2>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {galleryPhotos.map((src, i) => (
            <Photo key={i} src={src} h="h-20" />
          ))}
        </div>
        <p className="mt-2 text-[12px] md:text-sm">
          <Link>See more photos &raquo;</Link>
        </p>

        <hr className="my-4 border-black/25" />
        <h2 className="text-lg font-bold md:text-xl">About Us</h2>
        <p className="mt-2 text-[12px] leading-relaxed md:text-sm">
          Established in 1998, we have built a strong reputation across the
          region for quality workmanship and tidy, professional service. No job
          is too big or too small. All work is fully guaranteed.
        </p>

        <hr className="my-4 border-black/25" />
        <h2 className="text-lg font-bold md:text-xl">Contact Us</h2>
        <p className="mt-2 text-[12px] leading-relaxed md:text-sm">
          For a free quote, call <b>07XXX 123456</b> or email{" "}
          <Link>info@daveskitchens.co.uk</Link>.
          <br />
          11 Example Road, Durham, DH1 5LJ
        </p>
        <button className="mt-2 border border-[#999] bg-[#eee] px-3 py-1 text-[12px] md:text-sm">
          Contact us
        </button>

        <hr className="my-4 border-black/25" />
        <p className="pb-2 text-[10px] text-black/45 md:text-[11px]">
          © 2024 Dave&apos;s Kitchens &amp; Building. All rights reserved.
        </p>
      </div>
    </div>
  );
}

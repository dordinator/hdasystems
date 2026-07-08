"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProduct, heroMoments } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

const icons: Record<string, ReactNode> = {
  "local-seo": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  website: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  "lead-followup": (
    <>
      <path d="M4 5h16v11H8l-4 4z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  "missed-call": (
    <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2a13 13 0 0 1-5-5l2-2-1-4z" />
  ),
  inbox: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </>
  ),
  reviews: (
    <path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.2l5.9-.9z" />
  ),
  campaigns: (
    <>
      <path d="M4 11v2a2 2 0 0 0 2 2h12" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <path d="M12 15v3" />
    </>
  ),
};

export default function SystemFlow() {
  return (
    <div className="relative w-full rounded-3xl border-2 border-ink bg-base-50 p-5 shadow-card-lg sm:p-7">
      <div className="mb-5">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
          When they…
        </span>
      </div>

      <div className="flex flex-col">
        {heroMoments.map((moment, i) => {
          const product = getProduct(moment.slug);
          if (!product) return null;

          return (
            <motion.div
              key={moment.slug}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.07, ease }}
            >
              <Link
                href={`/products/${moment.slug}`}
                className="group flex items-center gap-3.5 rounded-xl px-1 py-1 transition-colors hover:bg-base-100"
                title={product.name}
              >
                <span
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border-2 border-ink text-white shadow-card-sm"
                  style={{ background: product.accent }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[moment.slug]}
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold leading-tight text-ink">
                    {moment.trigger}
                  </div>
                  <div className="text-xs text-ink-muted">{moment.outcome}</div>
                </div>
                <span className="ml-2 max-w-[6.5rem] shrink-0 text-right text-[10px] leading-snug text-ink-faint sm:max-w-[7.5rem]">
                  with{" "}
                  <span
                    className="font-semibold text-ink"
                    style={{ color: product.accent }}
                  >
                    {product.name}
                  </span>
                </span>
              </Link>

              {i < heroMoments.length - 1 && (
                <div className="ml-[19px] flex h-4 items-center">
                  <span className="h-full w-0.5 bg-ink/25" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 border-t-2 border-ink/10 pt-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-coral transition-colors hover:text-ink"
        >
          See all systems <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

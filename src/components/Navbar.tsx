"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND, CAL_URL, aboutNav, products } from "@/lib/site";

function NavIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "layout":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M9 9v11" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2a13 13 0 0 1-5-5l2-2-1-4z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L4.5 9.7l5.9-.9z" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V6L6 11H4a1 1 0 0 0-1 1z" />
          <path d="M18 8a4 4 0 0 1 0 8" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M3 12h5l2 3h4l2-3h5" />
          <path d="M5 6h14l2 6v6H3v-6z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M16 5.2a3 3 0 0 1 0 5.6" />
          <path d="M18.5 19a5 5 0 0 0-3-4.6" />
        </svg>
      );
    case "activity":
      return (
        <svg {...common}>
          <path d="M3 13l4-4 4 4 5-6 5 5" />
        </svg>
      );
    case "tools":
      return (
        <svg {...common}>
          <path d="M4 16a8 8 0 0 1 16 0" />
          <path d="M2.5 16h19" />
          <path d="M12 4.5V8" />
          <path d="M9 8a3 3 0 0 1 6 0" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M5 4a1 1 0 0 1 1-1h13v16H6a1 1 0 0 0-1 1z" />
          <path d="M9 3v14" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

type MenuItem = {
  href: string;
  name: string;
  desc: string;
  icon: string;
  accent?: string;
};

function NavDropdown({
  label,
  eyebrow,
  items,
  footer,
  columns = 2,
}: {
  label: string;
  eyebrow: string;
  items: MenuItem[];
  footer?: { href: string; label: string };
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-medium text-ink-muted transition-colors hover:bg-base-100 hover:text-ink"
        aria-expanded={open}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ${
          columns === 2 ? "w-[min(92vw,640px)]" : "w-[min(92vw,340px)]"
        } ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border-2 border-ink bg-base-50 p-3 shadow-card-lg">
          <div className="mb-1 px-3 pt-2 pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            {eyebrow}
          </div>
          <div
            className={`grid grid-cols-1 gap-1 ${
              columns === 2 ? "sm:grid-cols-2" : ""
            }`}
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-base-100"
              >
                <span
                  className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg border-2 border-ink bg-base-100 text-ink transition-colors"
                  style={item.accent ? { color: item.accent } : undefined}
                >
                  <NavIcon name={item.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">
                    {item.name}
                  </span>
                  <span className="block text-[12px] leading-snug text-ink-muted">
                    {item.desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          {footer && (
            <Link
              href={footer.href}
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-base-100 hover:text-ink"
            >
              <span>{footer.label}</span>
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const productItems: MenuItem[] = products.map((p) => ({
  href: `/products/${p.slug}`,
  name: p.name,
  desc: p.menuDesc,
  icon: p.icon,
  accent: p.accent,
}));

const aboutItems: MenuItem[] = aboutNav.map((a) => ({
  href: a.href,
  name: a.label,
  desc: a.desc,
  icon: a.icon,
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b-2 border-ink bg-base/95 backdrop-blur-sm"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-accent-coral" />
          <span className="text-lg font-semibold tracking-tight text-ink md:text-xl">
            {BRAND}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <a
            href="/#work"
            className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink-muted transition-colors hover:bg-base-100 hover:text-ink"
          >
            Work
          </a>
          <NavDropdown
            label="Products"
            eyebrow="Systems &amp; features"
            items={productItems}
            footer={{ href: "/products", label: "View all systems" }}
          />
          <NavDropdown
            label="About"
            eyebrow="Company"
            items={aboutItems}
            columns={1}
          />
          <a
            href="/#pricing"
            className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink-muted transition-colors hover:bg-base-100 hover:text-ink"
          >
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden md:inline-flex"
          >
            Book a call
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-base-50 text-ink md:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mb-3 mt-1 flex max-h-[80vh] flex-col gap-1 overflow-y-auto rounded-2xl border-2 border-ink bg-base-50 p-4 shadow-card md:hidden">
          <a
            href="/#work"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-3 text-[1rem] font-medium text-ink-muted hover:bg-base-100 hover:text-ink"
          >
            Work
          </a>

          <div className="mt-1 px-3 pt-2 pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            Products
          </div>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-base-100"
            >
              <span
                className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border-2 border-ink bg-base-100"
                style={{ color: p.accent }}
              >
                <NavIcon name={p.icon} />
              </span>
              <span className="text-sm font-medium text-ink">{p.name}</span>
            </Link>
          ))}
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-base-100 hover:text-ink"
          >
            View all systems →
          </Link>

          <div className="mt-1 px-3 pt-2 pb-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            Company
          </div>
          {aboutNav.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-base-100"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border-2 border-ink bg-base-100 text-ink">
                <NavIcon name={a.icon} />
              </span>
              <span className="text-sm font-medium text-ink">{a.label}</span>
            </Link>
          ))}

          <a
            href="/#pricing"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl px-3 py-3 text-[1rem] font-medium text-ink-muted hover:bg-base-100 hover:text-ink"
          >
            Pricing
          </a>

          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 justify-center"
          >
            Book a call
          </a>
        </div>
      )}
    </header>
  );
}

import { BRAND, BRAND_TAGLINE, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-terra" />
              <span className="font-serif text-lg font-semibold tracking-tight text-ink">
                {BRAND}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {BRAND_TAGLINE}. Websites plus the lead engine behind them — one
              flat fee, 90-day minimum term.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-4">Explore</div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent-terra"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND}
          </span>
          <span>Designed &amp; engineered with depth</span>
        </div>
      </div>
    </footer>
  );
}

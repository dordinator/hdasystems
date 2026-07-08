import { BRAND, BRAND_TAGLINE, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-ink bg-ink text-base-50">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full border-2 border-base-50 bg-accent-coral" />
              <span className="text-[15px] font-semibold tracking-tight text-base-50">
                {BRAND}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-base-50/70">
              {BRAND_TAGLINE}. Websites plus the lead engine behind them — with
              simple monthly pricing and no upfront fees.
            </p>
          </div>

          <div>
            <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-base-50/50">
              Explore
            </div>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-base-50/70 transition-colors hover:text-accent-orange"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-base-50/15 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-base-50/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND}
          </span>
          <span>Websites &amp; growth systems for local business</span>
        </div>
      </div>
    </footer>
  );
}

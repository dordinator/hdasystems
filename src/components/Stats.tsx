import { stats } from "@/lib/site";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border-2 border-ink bg-base-50 shadow-card md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-2 p-6 md:p-8 ${
                  i % 2 === 0 ? "border-r-2 border-ink" : ""
                } ${i < 2 ? "border-b-2 border-ink md:border-b-0" : ""} ${
                  i === 2 ? "md:border-r-2 md:border-ink" : ""
                }`}
              >
                <div className="display text-4xl text-accent-coral md:text-5xl">
                  {s.display ? (
                    s.display
                  ) : (
                    <Counter
                      value={s.value ?? 0}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  )}
                </div>
                <div className="text-sm text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

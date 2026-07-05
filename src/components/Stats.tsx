import { stats } from "@/lib/site";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="glass grid grid-cols-1 gap-px overflow-hidden rounded-3xl min-[420px]:grid-cols-2 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex min-w-0 flex-col gap-1.5 p-5 min-[420px]:p-6 md:gap-2 md:p-9"
              >
                <div className="display text-3xl text-gradient-accent min-[420px]:text-4xl md:text-5xl">
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
                <div className="text-balance text-sm leading-snug text-ink-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import DemoVideo from "./DemoVideo";
import DemoPdf from "./DemoPdf";

/* A framed "browser" cutout for a product demo. Priority:
   1. `video` → demo video with custom controls
   2. `pdf`   → scrollable embedded PDF (taller frame)
   3. `src`   → live embedded site
   4. none    → on-brand placeholder */
export default function DemoFrame({
  src,
  video,
  pdf,
  label,
  note,
  accent = "#E86A4A",
}: {
  src?: string | null;
  video?: string | null;
  pdf?: string | null;
  label: string;
  note: string;
  accent?: string;
}) {
  const isPdf = Boolean(pdf);

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-base-50 shadow-card ${
        isPdf
          ? "h-[min(80vh,900px)]"
          : "aspect-[16/10] md:aspect-[16/9]"
      }`}
    >
      {/* browser chrome */}
      <div className="relative z-10 flex flex-none items-center gap-1.5 border-b-2 border-ink bg-base-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-accent-coral" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-accent-sand" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink bg-base-50" />
        <span className="ml-3 flex-1 truncate rounded-md border border-ink/15 bg-base-50 px-3 py-1 font-mono text-[11px] text-ink-faint">
          demo.hdasystems.com/{label}
        </span>
      </div>

      <div className="min-h-0 flex-1 w-full">
        {video ? (
          <DemoVideo src={video} title={note} />
        ) : pdf ? (
          <DemoPdf src={pdf} title={note} />
        ) : src ? (
          <iframe
            src={src}
            title={note}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="h-full w-full bg-white"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-base-100">
            {/* faint grid */}
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
              <div className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {note}
              </div>
              <span className="rounded-lg border-2 border-ink bg-base-50 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Live demo loading soon
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

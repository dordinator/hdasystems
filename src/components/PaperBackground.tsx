// Calm warm-paper background. Flat cream with a faint dot grid and very
// soft, static warm washes in the corners — no animation, no ombre.
export default function PaperBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-base">
      {/* faint dot grid for subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(28,25,23,0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* soft warm corner washes — very low opacity, static */}
      <div className="absolute -left-[10%] -top-[10%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,rgba(232,106,74,0.07),transparent_70%)]" />
      <div className="absolute -right-[10%] top-[20%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(233,185,73,0.07),transparent_70%)]" />
    </div>
  );
}

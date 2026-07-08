import { getPlan, type Plan } from "@/lib/site";

/* Shows which plan a system is included in, e.g.
   "Included in Website Plan · £99/mo". */
export default function PlanBadge({
  plan,
  className = "",
}: {
  plan: Plan["id"];
  className?: string;
}) {
  const p = getPlan(plan);
  return (
    <span className={`plan-badge ${className}`}>
      <span
        className="h-2 w-2 rounded-full border border-ink"
        style={{ background: plan === "website" ? "#E86A4A" : "#1C1917" }}
      />
      Included in {p.name} · £{p.price}/mo
    </span>
  );
}

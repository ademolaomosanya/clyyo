import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  tone: "blue" | "orange" | "green" | "navy";
  icon: LucideIcon;
};

export function MetricCard({ label, value, delta, tone, icon: Icon }: MetricCardProps) {
  return (
    <article className={`metricCard ${tone}`}>
      <div className="metricIcon">
        <Icon size={19} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{delta}</small>
    </article>
  );
}

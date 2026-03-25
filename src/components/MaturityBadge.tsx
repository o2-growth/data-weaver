import { cn } from "@/lib/utils";
import { getMaturityInfo } from "@/lib/calculations";

interface MaturityBadgeProps {
  level: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const levelStyles: Record<number, string> = {
  1: "bg-[hsl(var(--maturity-1)/0.15)] text-[hsl(var(--maturity-1))] border-[hsl(var(--maturity-1)/0.3)]",
  2: "bg-[hsl(var(--maturity-2)/0.15)] text-[hsl(var(--maturity-2))] border-[hsl(var(--maturity-2)/0.3)]",
  3: "bg-[hsl(var(--maturity-3)/0.15)] text-[hsl(var(--maturity-3))] border-[hsl(var(--maturity-3)/0.3)]",
  4: "bg-[hsl(var(--maturity-4)/0.15)] text-[hsl(var(--maturity-4))] border-[hsl(var(--maturity-4)/0.3)]",
  5: "bg-[hsl(var(--maturity-5)/0.15)] text-[hsl(var(--maturity-5))] border-[hsl(var(--maturity-5)/0.3)]",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5 font-semibold",
};

export function MaturityBadge({ level, label, size = "md", className }: MaturityBadgeProps) {
  const info = getMaturityInfo(level);
  const displayLabel = label || info.label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
        levelStyles[level] || levelStyles[1],
        sizeStyles[size],
        className
      )}
    >
      <span className="font-bold">Grau {level}</span>
      <span>·</span>
      <span>{displayLabel}</span>
    </span>
  );
}

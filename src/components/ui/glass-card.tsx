import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds neon green hover border. */
  interactive?: boolean;
}

/**
 * Translucent card aligned with the Landing Page design system.
 * - bg white/2, border white/6, backdrop-blur
 * - On `interactive`, hover shifts border + bg toward the brand sage.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "lp-glass",
        interactive && "lp-glass-hover",
        className,
      )}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";

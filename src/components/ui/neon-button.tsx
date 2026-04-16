import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Adds the animated glow halo (primary only). */
  glow?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-neon-primary",
  outline: "btn-neon-outline",
  ghost: "btn-neon-ghost",
};

/**
 * Button styled to match the Landing Page CTA system.
 * Use `variant="primary"` for the dominant gradient action,
 * `outline` for secondary, `ghost` for sage-green pills.
 */
export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", glow = false, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        variantClass[variant],
        glow && variant === "primary" && "animate-glow-pulse",
        className,
      )}
      {...props}
    />
  ),
);
NeonButton.displayName = "NeonButton";

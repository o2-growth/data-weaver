import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element when it enters the viewport. Returns a ref + visible flag.
 * Honors prefers-reduced-motion (returns visible=true immediately).
 */
export function useScrollReveal<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 },
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      options,
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, visible };
}

/**
 * Same as useScrollReveal but encodes a slide direction (left/right/up).
 */
export function useScrollRevealSlide<T extends HTMLElement>(
  direction: "left" | "right" | "up" = "up",
) {
  const { ref, visible } = useScrollReveal<T>();
  const offsetClass = visible
    ? "opacity-100 translate-x-0 translate-y-0"
    : direction === "left"
      ? "opacity-0 -translate-x-8"
      : direction === "right"
        ? "opacity-0 translate-x-8"
        : "opacity-0 translate-y-6";
  return { ref, visible, className: `transition-all duration-700 ease-out ${offsetClass}` };
}

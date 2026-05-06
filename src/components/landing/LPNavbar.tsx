import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoWhite from "@/assets/o2-logo-white.png";

const links = [
  { id: "como-funciona", label: "Como funciona" },
  { id: "areas", label: "Áreas" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "faq", label: "FAQ" },
];

export function LPNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smoothTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 h-16 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto h-full px-5 md:px-12 flex items-center justify-between gap-3">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 min-w-0"
          aria-label="O2 Inc — Grau de Maturidade"
        >
          <img src={logoWhite} alt="O2 Inc" className="h-7 w-auto" />
          <span className="hidden sm:block w-px h-5 bg-foreground/20" />
          <span className="hidden sm:block font-mono text-[11px] tracking-[0.1em] uppercase text-foreground/70 whitespace-nowrap">
            Grau de Maturidade
          </span>
        </button>

        {/* Center */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => smoothTo(l.id)}
              className="px-3 py-2 rounded-full text-[13px] text-foreground/70 hover:text-ink-900 hover:bg-lima-500 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/login")} className="btn btn-ghost btn-sm">
            ENTRAR
          </button>
          <button onClick={() => navigate("/login")} className="btn btn-primary btn-sm">
            FAZER DIAGNÓSTICO
          </button>
        </div>
      </div>
    </nav>
  );
}

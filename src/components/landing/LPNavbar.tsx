import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";

const links = [
  { id: "como-funciona", label: "Como funciona" },
  { id: "areas", label: "Áreas" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "faq", label: "FAQ" },
];

export function LPNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { startCheckout, CheckoutDialog } = useCheckout();

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
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
          aria-label="Grau de Maturidade"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center text-[#0A0A0A] font-black text-xs">
            O2
          </span>
          <span className="font-display font-bold text-white text-base tracking-tight">
            Grau de <span className="text-[#00E676]">Maturidade</span>
          </span>
        </button>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => smoothTo(l.id)}
              className="text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="hidden sm:inline-flex px-5 py-2 rounded-full border border-[#7EBF8E]/40 text-[#7EBF8E] text-sm font-medium hover:bg-[#7EBF8E]/10 hover:border-[#7EBF8E]/60 transition-all"
          >
            Já comprei
          </button>
          <button
            onClick={startCheckout}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#00E676] text-[#0A0A0A] text-sm font-bold hover:scale-[1.03] transition-transform shadow-lg shadow-[#4CAF50]/20"
          >
            Obter Grau de Maturidade
          </button>
        </div>
      </div>
      {CheckoutDialog}
    </nav>
  );
}

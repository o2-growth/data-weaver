import { ChevronDown } from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useCheckout } from "@/hooks/useCheckout";

function Stat({ value, suffix = "", prefix = "", label }: { value: number; suffix?: string; prefix?: string; label: string }) {
  const { ref, value: v } = useCountUp(value, 2000);
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span ref={ref} className="font-display text-2xl md:text-3xl font-black text-white tabular-nums">
        {prefix}
        {v.toLocaleString("pt-BR")}
        {suffix}
      </span>
      <span className="text-sm text-[#A0A0A0] mt-1">{label}</span>
    </div>
  );
}

export function LPHero() {
  const { startCheckout, CheckoutDialog } = useCheckout();
  const { ref: glowRef, pos } = useMouseGlow<HTMLElement>();
  const { ref: contentRef, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0 });

  return (
    <section
      ref={glowRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(126,191,142,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(126,191,142,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Mouse-reactive radial glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          width: 700,
          height: 500,
          left: `calc(${pos.x * 100}% - 350px)`,
          top: `calc(${pos.y * 100}% - 250px)`,
          background:
            "radial-gradient(circle, rgba(76,175,80,0.10) 0%, transparent 70%)",
        }}
      />

      <FloatingParticles />

      {/* Content */}
      <div
        ref={contentRef}
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7EBF8E]/30 bg-[#7EBF8E]/[0.08] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E]">
            Grau de Maturidade · O2 Inc
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-white">
          Descubra o{" "}
          <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
            grau de maturidade
          </span>{" "}
          financeira da sua empresa.
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-lg md:text-xl text-[#A0A0A0] leading-relaxed max-w-2xl mx-auto">
          Avaliação estruturada em{" "}
          <strong className="text-white">6 áreas estratégicas</strong> —
          Contabilidade, Controladoria, Financeiro, Fiscal, Planejamento e
          Comercial — com relatório executivo pronto para a próxima reunião.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={startCheckout}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#00E676] text-[#0A0A0A] font-black text-lg shadow-xl shadow-[#4CAF50]/30 hover:shadow-[#00E676]/50 hover:scale-[1.03] transition-all animate-glow-pulse"
          >
            Obter Grau de Maturidade →
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("como-funciona");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-2xl border border-white/12 text-white font-medium hover:border-white/25 hover:bg-white/[0.04] transition-all"
          >
            Ver como funciona ↓
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          <Stat value={6} label="áreas estratégicas" />
          <Stat value={54} label="perguntas especializadas" />
          <Stat value={270} label="análises de risco" />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          const el = document.getElementById("como-funciona");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Rolar para baixo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#7EBF8E] animate-bounce-gentle"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
      {CheckoutDialog}
    </section>
  );
}

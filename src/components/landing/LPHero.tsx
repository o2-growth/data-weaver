import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FloatingParticles } from "./FloatingParticles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import o2Icon from "@/assets/o2-icon.png";

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const { ref, value: v } = useCountUp(value, 2000);
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span ref={ref} className="font-display text-3xl md:text-4xl font-bold text-foreground tabular-nums">
        {v.toLocaleString("pt-BR")}
        {suffix}
      </span>
      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/55 mt-2">
        {label}
      </span>
    </div>
  );
}

export function LPHero() {
  const navigate = useNavigate();
  const { ref: contentRef, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0 });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 md:px-12 pt-24 pb-16 overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 lp-grid-bg pointer-events-none opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none hero-gradient"
      />

      <FloatingParticles />

      {/* O2 symbol */}
      <div className="relative z-10 mb-8">
        <img
          src={o2Icon}
          alt=""
          aria-hidden
          className="w-20 h-20 md:w-24 md:h-24 animate-breathe"
        />
      </div>

      <div
        ref={contentRef}
        className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="eyebrow eyebrow-accent justify-center mb-8">
          Diagnóstico O2 Inc.
        </div>

        <h1 className="font-display font-bold text-foreground"
          style={{ fontSize: "clamp(44px, 9vw, 132px)", lineHeight: 0.92, letterSpacing: "0.005em" }}
        >
          Descubra o grau de{" "}
          <span className="gradient-text-neon">maturidade financeira</span>{" "}
          da sua empresa
        </h1>

        <p className="mt-8 text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto normal-case">
          Avaliação estruturada em <strong className="text-foreground">6 áreas estratégicas</strong> —
          Contabilidade, Controladoria, Financeiro, Fiscal, Planejamento e Comercial.
          Em ~30 minutos você recebe um relatório executivo pronto para a próxima reunião.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => navigate("/login")} className="btn btn-primary">
            COMEÇAR DIAGNÓSTICO →
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("como-funciona");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-ghost"
          >
            VER COMO FUNCIONA ↓
          </button>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          <Stat value={6} label="áreas estratégicas" />
          <Stat value={54} label="perguntas" />
          <Stat value={270} label="análises de risco" />
        </div>
      </div>

      <button
        onClick={() => {
          const el = document.getElementById("como-funciona");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Rolar para baixo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-accent animate-bounce-gentle"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}

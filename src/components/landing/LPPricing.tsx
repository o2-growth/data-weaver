import { Check, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  "Avaliação completa das 6 áreas estratégicas (54 perguntas)",
  "Relatório PDF executivo com identidade O2 Inc",
  "PowerPoint editável pronto para apresentar",
  "Modo apresentação para a reunião de devolutiva",
  "Mapa de risco com 270 análises + quick wins priorizados",
  "Suporte por e-mail durante o preenchimento",
];

export function LPPricing() {
  const navigate = useNavigate();
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="relative py-24 px-6 bg-[#0A0A0A]">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E] mb-3">
            Comece agora
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white">
            Um diagnóstico que{" "}
            <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
              paga sozinho.
            </span>
          </h2>
        </div>

        <div className="relative p-8 md:p-10 rounded-3xl border border-[#7EBF8E]/20 bg-gradient-to-b from-white/[0.03] to-white/[0.01] animate-glow-pulse">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#00E676] text-[#0A0A0A] text-xs font-black uppercase tracking-wider">
            Plano Único
          </div>

          <ul className="space-y-3 mb-8 mt-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-[#A0A0A0]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4CAF50]/15 border border-[#7EBF8E]/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-[#7EBF8E]" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/login")}
            className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#00E676] text-[#0A0A0A] font-black text-lg shadow-xl shadow-[#4CAF50]/30 hover:shadow-[#00E676]/50 hover:scale-[1.02] transition-all"
          >
            Começar agora →
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-[#606060] text-xs">
            <Shield className="w-3.5 h-3.5 text-[#7EBF8E]" />
            <span>Acesso completo após cadastro</span>
          </div>
        </div>
      </div>
    </section>
  );
}

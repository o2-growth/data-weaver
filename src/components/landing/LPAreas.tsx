import {
  BookOpen,
  PieChart,
  DollarSign,
  Receipt,
  Target,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "./TiltCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const areas: { icon: LucideIcon; title: string; weight: string; body: string }[] = [
  {
    icon: BookOpen,
    title: "Contabilidade",
    weight: "15%",
    body: "Estrutura contábil, fechamento mensal e confiabilidade dos demonstrativos.",
  },
  {
    icon: PieChart,
    title: "Controladoria",
    weight: "25%",
    body: "Margens, capital de giro, endividamento e estrutura de custos.",
  },
  {
    icon: DollarSign,
    title: "Financeiro",
    weight: "25%",
    body: "Controle de caixa e maturidade dos processos financeiros.",
  },
  {
    icon: Receipt,
    title: "Fiscal",
    weight: "15%",
    body: "Conformidade tributária e estratégia de planejamento fiscal.",
  },
  {
    icon: Target,
    title: "Planejamento",
    weight: "10%",
    body: "Indicadores de performance, orçamento e forecast.",
  },
  {
    icon: ShoppingCart,
    title: "Comercial",
    weight: "10%",
    body: "Gestão de pipeline, funil de vendas e precificação rentável.",
  },
];

export function LPAreas() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <section id="areas" className="relative py-24 px-6 bg-[#0D0D0D]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E] mb-3">
            6 áreas avaliadas
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white">
            Um raio-X{" "}
            <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
              financeiro do negócio.
            </span>
          </h2>
          <p className="mt-4 text-[#A0A0A0] max-w-2xl mx-auto">
            Cada área recebe um grau de maturidade de 1 a 5, com riscos
            mapeados e quick wins recomendados — pesos baseados no impacto real
            da área na saúde financeira.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className={`transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <TiltCard className="h-full">
                  <div className="h-full p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#7EBF8E]/30 hover:bg-[#7EBF8E]/[0.04] transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex w-11 h-11 rounded-xl bg-[#4CAF50]/10 items-center justify-center">
                        <Icon className="w-5 h-5 text-[#7EBF8E]" strokeWidth={2.2} />
                      </span>
                      <span className="px-2.5 py-1 rounded-full border border-[#7EBF8E]/25 bg-[#7EBF8E]/[0.06] text-[#7EBF8E] text-[10px] font-bold tracking-wider uppercase">
                        Peso {a.weight}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-1.5">{a.title}</h3>
                    <p className="text-[#606060] text-sm leading-relaxed">{a.body}</p>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

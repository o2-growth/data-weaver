import {
  Building2,
  Cpu,
  ShoppingCart,
  Megaphone,
  DollarSign,
  PieChart,
  Receipt,
  BookOpen,
  Users,
  Target,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "./TiltCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const areas: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Building2, title: "Societário", body: "Estrutura jurídica, governança e participações." },
  { icon: Cpu, title: "Tecnologia", body: "Sistemas, integrações e maturidade digital." },
  { icon: ShoppingCart, title: "Comercial", body: "Funil, pricing, performance da equipe de vendas." },
  { icon: Megaphone, title: "Marketing", body: "Posicionamento, geração de demanda e métricas." },
  { icon: DollarSign, title: "Financeiro", body: "Caixa, capital de giro e saúde financeira." },
  { icon: PieChart, title: "Controladoria", body: "Indicadores, orçamento e análise de resultado." },
  { icon: Receipt, title: "Fiscal", body: "Tributação, créditos e conformidade." },
  { icon: BookOpen, title: "Contábil", body: "Demonstrações, fechamento e auditoria." },
  { icon: Users, title: "Capital Humano", body: "Talentos, clima, retenção e remuneração." },
  { icon: Target, title: "Planejamento", body: "Estratégia, metas e gestão de OKRs." },
];

export function LPAreas() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <section id="areas" className="relative py-24 px-6 bg-[#0D0D0D]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E] mb-3">
            10 áreas avaliadas
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white">
            Um raio-X{" "}
            <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
              360° do negócio.
            </span>
          </h2>
          <p className="mt-4 text-[#A0A0A0] max-w-2xl mx-auto">
            Cada área recebe um score de maturidade de 1 a 5, com riscos
            mapeados e quick wins recomendados.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                  <div className="h-full p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#7EBF8E]/30 hover:bg-[#7EBF8E]/[0.04] transition-colors">
                    <span className="inline-flex w-10 h-10 rounded-xl bg-[#4CAF50]/10 items-center justify-center mb-4">
                      <Icon className="w-4.5 h-4.5 text-[#7EBF8E]" strokeWidth={2.2} />
                    </span>
                    <h3 className="text-white font-bold text-sm mb-1.5">{a.title}</h3>
                    <p className="text-[#606060] text-xs leading-relaxed">{a.body}</p>
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

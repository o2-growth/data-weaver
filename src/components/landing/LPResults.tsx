import { Check } from "lucide-react";
import { useScrollRevealSlide } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const deliverables = [
  "Grau de maturidade de 1 a 5 em cada uma das 6 áreas",
  "Mapa de risco com 270 análises pré-configuradas, ordenadas por criticidade",
  "Lista de quick wins prontos para execução por área",
  "Relatório executivo em PDF com identidade da O2 Inc",
  "Apresentação PowerPoint editável para o board",
  "Modo apresentação interativo para a reunião de devolutiva",
];

function ScoreNumber({ end }: { end: number }) {
  const { ref, value } = useCountUp(end, 1800);
  return (
    <span ref={ref} className="font-display text-6xl md:text-7xl font-black text-white tabular-nums">
      {value}
      <span className="text-[#7EBF8E]">.{Math.round((end * 10) % 10)}</span>
    </span>
  );
}

export function LPResults() {
  const left = useScrollRevealSlide<HTMLDivElement>("left");
  const right = useScrollRevealSlide<HTMLDivElement>("right");

  return (
    <section className="relative py-24 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Mockup */}
        <div ref={left.ref} className={left.className}>
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#7EBF8E] mb-1">
                  Score Global
                </p>
                <ScoreNumber end={3} />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#4CAF50]/10 border border-[#7EBF8E]/30 text-[#7EBF8E] text-xs font-bold">
                Em evolução
              </span>
            </div>

            <div className="space-y-3">
              {[
                { label: "Contabilidade", v: 72, color: "#7EBF8E" },
                { label: "Controladoria", v: 58, color: "#F59E0B" },
                { label: "Financeiro", v: 80, color: "#00E676" },
                { label: "Fiscal", v: 44, color: "#EF4444" },
                { label: "Planejamento", v: 50, color: "#8989DE" },
                { label: "Comercial", v: 66, color: "#61AAF2" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#A0A0A0]">{row.label}</span>
                    <span className="text-white font-bold tabular-nums">{row.v}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${row.v}%`, background: row.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div ref={right.ref} className={right.className}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E] mb-3">
            O que você recebe
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white mb-6">
            Material{" "}
            <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
              pronto para a próxima reunião.
            </span>
          </h2>
          <p className="text-[#A0A0A0] mb-8 leading-relaxed">
            Você sai do diagnóstico com entregáveis prontos para acionar
            sócios, board, banco ou investidor. Sem PDF genérico, sem planilha
            bagunçada.
          </p>
          <ul className="space-y-3">
            {deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm text-[#A0A0A0]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4CAF50]/15 border border-[#7EBF8E]/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-[#7EBF8E]" strokeWidth={3} />
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

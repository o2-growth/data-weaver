import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ClipboardList, Cpu, FileBarChart } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Responda o questionário",
    body: "10 áreas, perguntas objetivas. Em ~30 minutos você completa o panorama da empresa.",
  },
  {
    n: "02",
    icon: Cpu,
    title: "Análise automática",
    body: "Nossa engine cruza respostas com a matriz de risco e calcula o score de maturidade por área.",
  },
  {
    n: "03",
    icon: FileBarChart,
    title: "Relatório executivo",
    body: "Receba um PDF e PowerPoint prontos para apresentar ao board, com quick wins priorizados.",
  },
];

export function LPHowItWorks() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="como-funciona" className="relative py-24 px-6 bg-[#0A0A0A]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E] mb-3">
            Como funciona
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white">
            Do questionário ao plano de ação
            <br />
            <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
              em três passos.
            </span>
          </h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Connector line */}
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#7EBF8E]/30 to-transparent"
          />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className={`relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#7EBF8E]/30 hover:bg-[#7EBF8E]/[0.04] transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-xl bg-[#4CAF50]/10 border border-[#7EBF8E]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#7EBF8E]" />
                  </span>
                  <span className="font-display text-3xl font-black text-[#7EBF8E]/30">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-white font-bold text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

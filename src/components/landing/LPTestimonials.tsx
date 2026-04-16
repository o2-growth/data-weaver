import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote:
      "Em três semanas saímos de 'achismos' para um plano de 90 dias com priorização clara. O relatório virou tese de board.",
    name: "Mariana Costa",
    role: "CFO · Indústria de embalagens",
    initials: "MC",
  },
  {
    quote:
      "O diagnóstico expôs gargalos que a equipe interna não via há anos. ROI pago no primeiro quick win.",
    name: "Rafael Mendonça",
    role: "CEO · Rede de varejo",
    initials: "RM",
  },
  {
    quote:
      "Nunca vi um material tão direto. Apresentei para o investidor sem precisar adaptar uma vírgula.",
    name: "Juliana Prado",
    role: "Founder · SaaS B2B",
    initials: "JP",
  },
];

export function LPTestimonials() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <section id="depoimentos" className="relative py-24 px-6 bg-[#0D0D0D]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E] mb-3">
            Depoimentos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white">
            Quem fez,{" "}
            <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
              recomenda.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 text-[#00E676] fill-[#00E676]" />
                ))}
              </div>
              <blockquote className="text-[#A0A0A0] leading-relaxed text-sm mb-6">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center text-[#0A0A0A] font-black text-sm">
                  {t.initials}
                </span>
                <span className="flex flex-col">
                  <span className="text-white font-bold text-sm">{t.name}</span>
                  <span className="text-[#606060] text-xs">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

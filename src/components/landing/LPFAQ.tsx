import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "Quanto tempo leva para responder a avaliação?",
    a: "Em média 25 a 35 minutos para as 54 perguntas. Você pode pausar e retomar a qualquer momento — suas respostas ficam salvas.",
  },
  {
    q: "Quem deve responder o questionário?",
    a: "Idealmente o CFO, controller ou sócio com visão financeira da operação. Quanto mais sênior, mais preciso o resultado.",
  },
  {
    q: "Os dados ficam seguros?",
    a: "Sim. Os dados são privados, não compartilhamos nada com terceiros e você pode solicitar exclusão completa quando quiser.",
  },
  {
    q: "Como recebo o relatório?",
    a: "Assim que finalizar o questionário você acessa o painel de resultados, exporta o PDF e o PowerPoint, e pode usar o modo apresentação ao vivo.",
  },
  {
    q: "Serve para empresas pequenas?",
    a: "Sim. A avaliação se adapta ao porte: as perguntas são as mesmas, mas a leitura de maturidade é contextualizada para o estágio do negócio.",
  },
];

export function LPFAQ() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <section id="faq" className="relative py-24 px-6 bg-[#0D0D0D]">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E] mb-3">
            Perguntas frequentes
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white">
            Tudo que você precisa{" "}
            <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
              saber.
            </span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="border-white/[0.08]"
            >
              <AccordionTrigger className="text-white text-left font-bold hover:text-[#7EBF8E] hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#A0A0A0] leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lightbulb, ShieldAlert, Info } from "lucide-react";
import type { RiskMatrixEntry } from "@/data/riskMatrix";

interface AnswerSuggestionProps {
  entry: RiskMatrixEntry;
}

const categoryStyles: Record<string, string> = {
  Alto: "bg-red-500/12 text-red-400 border-red-500/30",
  Médio: "bg-yellow-500/12 text-yellow-400 border-yellow-500/30",
  Baixo: "bg-[#00E676]/12 text-[#00E676] border-[#00E676]/30",
};

export function AnswerSuggestion({ entry }: AnswerSuggestionProps) {
  const actionItems = entry.actionPlan
    ? entry.actionPlan.split("|").map((s) => s.trim()).filter(Boolean)
    : [];

  const catStyle = categoryStyles[entry.riskCategory] ?? categoryStyles["Baixo"];

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={`border rounded-full text-[10px] ${catStyle}`}>
          Risco {entry.riskCategory}
        </Badge>
        <Badge variant="outline" className="text-[10px] rounded-full border-white/15 text-[#A0A0A0]">
          IxP: {entry.impact} × {entry.probability} = {entry.riskScore}
        </Badge>
      </div>

      {entry.riskNarrative && (
        <div className="flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-[#7EBF8E] mt-0.5 shrink-0" />
          <p className="text-xs text-[#A0A0A0] leading-relaxed">{entry.riskNarrative}</p>
        </div>
      )}

      {(entry.controls || actionItems.length > 0) && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="sug" className="border-white/8 border-t">
            <AccordionTrigger className="py-2 text-xs hover:no-underline text-white">
              <span className="flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-[#00E676]" />
                Sugestões e plano de ação
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3 space-y-3">
              {entry.controls && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#7EBF8E]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7EBF8E]">
                      Controles recomendados
                    </span>
                  </div>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed">{entry.controls}</p>
                </div>
              )}

              {actionItems.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7EBF8E]">
                    Plano de ação
                  </span>
                  <ol className="space-y-2 text-xs text-[#A0A0A0]">
                    {actionItems.map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00E676]/10 border border-[#7EBF8E]/30 text-[#00E676] text-[10px] font-bold flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}

import type { IdentifiedRisk } from "@/types/diagnostic";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, ShieldAlert, Info } from "lucide-react";

interface RiskCardProps {
  risk: IdentifiedRisk;
  index?: number;
}

const riskCategoryStyles: Record<string, { bg: string; text: string; border: string; leftBorder: string }> = {
  "Alto":  { bg: "bg-red-500/12", text: "text-red-400", border: "border-red-500/30", leftBorder: "border-l-red-500" },
  "Médio": { bg: "bg-yellow-500/12", text: "text-yellow-400", border: "border-yellow-500/30", leftBorder: "border-l-yellow-500" },
  "Baixo": { bg: "bg-[#00E676]/12", text: "text-[#00E676]", border: "border-[#00E676]/30", leftBorder: "border-l-[#00E676]" },
};

export function RiskCard({ risk, index }: RiskCardProps) {
  const style = riskCategoryStyles[risk.riskCategory] ?? riskCategoryStyles["Baixo"];

  const actionItems = risk.actionPlan
    ? risk.actionPlan.split("|").map((item) => item.trim()).filter(Boolean)
    : [];

  return (
    <div
      className={`lp-glass lp-glass-hover p-5 space-y-4 border-l-4 ${style.leftBorder}`}
      style={index !== undefined ? { animationDelay: `${Math.min(index * 0.05, 0.3)}s` } : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Badge className={`${style.bg} ${style.text} border ${style.border} rounded-full`}>
            <AlertTriangle className="w-3 h-3 mr-1" />
            {risk.riskCategory}
          </Badge>
          <Badge variant="outline" className="text-xs rounded-full border-white/15 text-[#A0A0A0]">
            IxP: {risk.impact} x {risk.probability} = {risk.riskScore}
          </Badge>
        </div>
        <Badge className="text-xs rounded-full bg-white/5 text-[#A0A0A0] border-white/10">
          Nota: {risk.grade}/5
        </Badge>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium leading-snug text-white">{risk.questionText}</p>
        <p className="text-xs text-[#7EBF8E]">
          {risk.areaName} &middot; {risk.subAreaName}
        </p>
      </div>

      <div className="rounded-xl bg-white/[0.02] p-3 border border-white/8">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-[#7EBF8E] mt-0.5 shrink-0" />
          <p className="text-sm text-[#A0A0A0] leading-relaxed">
            {risk.riskNarrative}
          </p>
        </div>
      </div>

      <Accordion type="multiple" className="w-full">
        {risk.controls && (
          <AccordionItem value="controls" className="border-white/8">
            <AccordionTrigger className="py-2 text-sm hover:no-underline text-white">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#7EBF8E]" />
                Controles Recomendados
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-[#A0A0A0] leading-relaxed pt-1 pb-3">
              {risk.controls}
            </AccordionContent>
          </AccordionItem>
        )}

        {actionItems.length > 0 && (
          <AccordionItem value="action-plan" className="border-white/8">
            <AccordionTrigger className="py-2 text-sm hover:no-underline text-white">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#7EBF8E]" />
                Plano de Ação ({actionItems.length} itens)
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-3">
              <ol className="space-y-2.5 text-sm text-[#A0A0A0]">
                {actionItems.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00E676]/10 border border-[#7EBF8E]/30 text-[#00E676] text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}

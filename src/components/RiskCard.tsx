import type { IdentifiedRisk } from "@/types/diagnostic";
import { Card, CardContent } from "@/components/ui/card";
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
  "Alto": { bg: "bg-[hsl(var(--maturity-1)/0.12)]", text: "text-[hsl(var(--maturity-1))]", border: "border-[hsl(var(--maturity-1)/0.3)]", leftBorder: "border-l-[hsl(var(--maturity-1))]" },
  "Médio": { bg: "bg-[hsl(var(--maturity-3)/0.12)]", text: "text-[hsl(var(--maturity-3))]", border: "border-[hsl(var(--maturity-3)/0.3)]", leftBorder: "border-l-[hsl(var(--maturity-3))]" },
  "Baixo": { bg: "bg-[hsl(var(--maturity-5)/0.12)]", text: "text-[hsl(var(--maturity-5))]", border: "border-[hsl(var(--maturity-5)/0.3)]", leftBorder: "border-l-[hsl(var(--maturity-5))]" },
};

export function RiskCard({ risk, index }: RiskCardProps) {
  const style = riskCategoryStyles[risk.riskCategory] ?? riskCategoryStyles["Baixo"];

  const actionItems = risk.actionPlan
    ? risk.actionPlan.split("|").map((item) => item.trim()).filter(Boolean)
    : [];

  return (
    <Card
      className={`border-border/40 ${style.leftBorder} border-l-4 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl`}
      style={index !== undefined ? { animationDelay: `${Math.min(index * 0.05, 0.3)}s` } : undefined}
    >
      <CardContent className="p-5 space-y-4">
        {/* Header: Category badge + Risk Score */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Badge
              className={`${style.bg} ${style.text} border ${style.border} rounded-full hover:${style.bg}`}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              {risk.riskCategory}
            </Badge>
            <Badge variant="outline" className="text-xs rounded-full border-border/50">
              IxP: {risk.impact} x {risk.probability} = {risk.riskScore}
            </Badge>
          </div>
          <Badge variant="secondary" className="text-xs rounded-full">
            Nota: {risk.grade}/5
          </Badge>
        </div>

        {/* Question + Area Info */}
        <div className="space-y-1">
          <p className="text-sm font-medium leading-snug">{risk.questionText}</p>
          <p className="text-xs text-muted-foreground">
            {risk.areaName} &middot; {risk.subAreaName}
          </p>
        </div>

        {/* Risk Narrative */}
        <div className="rounded-lg bg-muted/30 p-3 border border-border/30">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {risk.riskNarrative}
            </p>
          </div>
        </div>

        {/* Collapsible: Controls + Action Plan */}
        <Accordion type="multiple" className="w-full">
          {risk.controls && (
            <AccordionItem value="controls" className="border-border/30">
              <AccordionTrigger className="py-2 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-primary/60" />
                  Controles Recomendados
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-3">
                {risk.controls}
              </AccordionContent>
            </AccordionItem>
          )}

          {actionItems.length > 0 && (
            <AccordionItem value="action-plan" className="border-border/30">
              <AccordionTrigger className="py-2 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary/60" />
                  Plano de Ação ({actionItems.length} itens)
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-3">
                <ol className="space-y-2.5 text-sm text-muted-foreground">
                  {actionItems.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5 ring-2 ring-primary/5">
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
      </CardContent>
    </Card>
  );
}

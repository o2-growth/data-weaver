import type { QuickWin } from "@/types/diagnostic";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Gauge, ArrowRight } from "lucide-react";

interface QuickWinCardProps {
  quickWin: QuickWin;
  rank?: number;
}

const priorityStyles: Record<number, { bg: string; text: string; circleBg: string }> = {
  3: { bg: "bg-[hsl(var(--maturity-5)/0.12)]", text: "text-[hsl(var(--maturity-5))]", circleBg: "bg-[hsl(var(--maturity-5))]" },
  2: { bg: "bg-[hsl(var(--maturity-4)/0.12)]", text: "text-[hsl(var(--maturity-4))]", circleBg: "bg-[hsl(var(--maturity-4))]" },
  1: { bg: "bg-muted", text: "text-muted-foreground", circleBg: "bg-muted-foreground" },
};

const effortStyles: Record<string, { bg: string; text: string; border: string }> = {
  baixo: { bg: "bg-[hsl(var(--maturity-5)/0.12)]", text: "text-[hsl(var(--maturity-5))]", border: "border-[hsl(var(--maturity-5)/0.3)]" },
  "médio": { bg: "bg-[hsl(var(--maturity-3)/0.12)]", text: "text-[hsl(var(--maturity-3))]", border: "border-[hsl(var(--maturity-3)/0.3)]" },
  alto: { bg: "bg-[hsl(var(--maturity-1)/0.12)]", text: "text-[hsl(var(--maturity-1))]", border: "border-[hsl(var(--maturity-1)/0.3)]" },
};

const impactStyles: Record<string, { bg: string; text: string; border: string }> = {
  baixo: { bg: "bg-muted/50", text: "text-muted-foreground", border: "border-border/40" },
  "médio": { bg: "bg-[hsl(var(--maturity-4)/0.12)]", text: "text-[hsl(var(--maturity-4))]", border: "border-[hsl(var(--maturity-4)/0.3)]" },
  alto: { bg: "bg-[hsl(var(--maturity-5)/0.12)]", text: "text-[hsl(var(--maturity-5))]", border: "border-[hsl(var(--maturity-5)/0.3)]" },
};

function getPriorityLabel(priority: number): string {
  if (priority >= 3) return "Alta";
  if (priority >= 1.5) return "Média";
  return "Padrão";
}

function getPriorityRank(priority: number): number {
  if (priority >= 3) return 3;
  if (priority >= 1.5) return 2;
  return 1;
}

export function QuickWinCard({ quickWin, rank }: QuickWinCardProps) {
  const priorityRank = getPriorityRank(quickWin.priority);
  const pStyle = priorityStyles[priorityRank] ?? priorityStyles[1];
  const eStyle = effortStyles[quickWin.estimatedEffort] ?? effortStyles["baixo"];
  const iStyle = impactStyles[quickWin.estimatedImpact] ?? impactStyles["baixo"];
  const targetGrade = Math.min(quickWin.currentGrade + 1, 5);

  return (
    <Card className="border-border/40 border-l-4 border-l-primary/60 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {/* Ranking badge */}
            <span className={`flex-shrink-0 w-7 h-7 rounded-full ${pStyle.circleBg} text-white text-xs font-bold flex items-center justify-center shadow-sm`}>
              {rank ?? priorityRank}
            </span>
            <Badge className={`${pStyle.bg} ${pStyle.text} border-transparent rounded-full hover:${pStyle.bg}`}>
              <Zap className="w-3 h-3 mr-1" />
              Prioridade {getPriorityLabel(quickWin.priority)}
            </Badge>
          </div>
          {/* Grade evolution arrow */}
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="text-xs rounded-full tabular-nums">
              {quickWin.currentGrade}
            </Badge>
            <ArrowRight className="w-3.5 h-3.5 text-primary" />
            <Badge className="text-xs rounded-full bg-primary/15 text-primary border-transparent hover:bg-primary/15 tabular-nums">
              {targetGrade}
            </Badge>
          </div>
        </div>

        {/* Question + Area */}
        <div className="space-y-1">
          <p className="text-sm font-medium leading-snug">{quickWin.questionText}</p>
          <p className="text-xs text-muted-foreground">{quickWin.areaName}</p>
        </div>

        {/* Action Plan */}
        <div className="rounded-lg bg-muted/20 p-3 border border-border/30">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {quickWin.actionPlan}
          </p>
        </div>

        {/* Effort / Impact Badges */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Esforço:</span>
            <Badge
              className={`text-xs ${eStyle.bg} ${eStyle.text} border ${eStyle.border} rounded-full hover:${eStyle.bg}`}
            >
              {quickWin.estimatedEffort}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Impacto:</span>
            <Badge
              className={`text-xs ${iStyle.bg} ${iStyle.text} border ${iStyle.border} rounded-full hover:${iStyle.bg}`}
            >
              {quickWin.estimatedImpact}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

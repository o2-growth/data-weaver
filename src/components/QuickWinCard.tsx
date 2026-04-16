import type { QuickWin } from "@/types/diagnostic";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Gauge, ArrowRight } from "lucide-react";

interface QuickWinCardProps {
  quickWin: QuickWin;
  rank?: number;
}

const priorityStyles: Record<number, { bg: string; text: string; circleBg: string }> = {
  3: { bg: "bg-[#00E676]/12", text: "text-[#00E676]", circleBg: "bg-gradient-to-br from-[#4CAF50] to-[#00E676]" },
  2: { bg: "bg-yellow-500/12", text: "text-yellow-400", circleBg: "bg-yellow-500" },
  1: { bg: "bg-white/5", text: "text-[#A0A0A0]", circleBg: "bg-white/20" },
};

const effortStyles: Record<string, string> = {
  baixo: "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/30",
  "médio": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  alto: "bg-red-500/10 text-red-400 border-red-500/30",
};

const impactStyles: Record<string, string> = {
  baixo: "bg-white/5 text-[#A0A0A0] border-white/10",
  "médio": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  alto: "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/30",
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
  const eClass = effortStyles[quickWin.estimatedEffort] ?? effortStyles["baixo"];
  const iClass = impactStyles[quickWin.estimatedImpact] ?? impactStyles["baixo"];
  const targetGrade = Math.min(quickWin.currentGrade + 1, 5);

  return (
    <div className="lp-glass lp-glass-hover p-5 space-y-4 border-l-2 border-l-[#00E676]/60">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={`flex-shrink-0 w-7 h-7 rounded-full ${pStyle.circleBg} text-[#0A0A0A] text-xs font-black flex items-center justify-center shadow-lg shadow-[#4CAF50]/30`}>
            {rank ?? priorityRank}
          </span>
          <Badge className={`${pStyle.bg} ${pStyle.text} border-transparent rounded-full`}>
            <Zap className="w-3 h-3 mr-1" />
            Prioridade {getPriorityLabel(quickWin.priority)}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-xs rounded-full border-white/15 text-[#A0A0A0] tabular-nums">
            {quickWin.currentGrade}
          </Badge>
          <ArrowRight className="w-3.5 h-3.5 text-[#00E676]" />
          <Badge className="text-xs rounded-full bg-[#00E676]/15 text-[#00E676] border-transparent tabular-nums">
            {targetGrade}
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium leading-snug text-white">{quickWin.questionText}</p>
        <p className="text-xs text-[#7EBF8E]">{quickWin.areaName}</p>
      </div>

      <div className="rounded-xl bg-white/[0.02] p-3 border border-white/8">
        <p className="text-sm text-[#A0A0A0] leading-relaxed">{quickWin.actionPlan}</p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-[#606060]" />
          <span className="text-xs text-[#606060]">Esforço:</span>
          <Badge className={`text-xs rounded-full border ${eClass}`}>
            {quickWin.estimatedEffort}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#606060]" />
          <span className="text-xs text-[#606060]">Impacto:</span>
          <Badge className={`text-xs rounded-full border ${iClass}`}>
            {quickWin.estimatedImpact}
          </Badge>
        </div>
      </div>
    </div>
  );
}

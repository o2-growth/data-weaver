import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check, MessageSquarePlus, ChevronDown } from "lucide-react";
import type { Question } from "@/data/questions";
import type { Answer } from "@/types/diagnostic";
import type { RiskMatrixEntry } from "@/data/riskMatrix";

interface QuestionCardProps {
  question: Question;
  answer: Answer | undefined;
  onAnswer: (questionId: string, grade: number, observation?: string) => void;
  getRiskPreview: (questionId: string, grade: number) => RiskMatrixEntry | undefined;
  subAreaLabel: string;
  /** ID do próximo QuestionCard para auto-scroll */
  nextQuestionId?: string;
}

const maturityColors: Record<number, string> = {
  1: "hsl(var(--maturity-1))",
  2: "hsl(var(--maturity-2))",
  3: "hsl(var(--maturity-3))",
  4: "hsl(var(--maturity-4))",
  5: "hsl(var(--maturity-5))",
};

function getRiskBadgeStyle(category: string): string {
  switch (category) {
    case "Baixo":
      return "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/30";
    case "Médio":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    case "Alto":
      return "bg-red-500/10 text-red-400 border-red-500/30";
    default:
      return "bg-white/5 text-[#A0A0A0] border-white/10";
  }
}

function getRiskBarColor(category: string): string {
  switch (category) {
    case "Baixo": return "bg-[#00E676]";
    case "Médio": return "bg-yellow-500";
    case "Alto":  return "bg-red-500";
    default:      return "bg-white/30";
  }
}

export function QuestionCard({
  question,
  answer,
  onAnswer,
  getRiskPreview,
  subAreaLabel,
  nextQuestionId,
}: QuestionCardProps) {
  const [showObservation, setShowObservation] = useState(!!answer?.observation);
  const selectedGrade = answer?.grade;
  const observation = answer?.observation ?? "";

  const riskEntry = selectedGrade
    ? getRiskPreview(question.id, selectedGrade)
    : undefined;

  const handleGradeSelect = (grade: number) => {
    onAnswer(question.id, grade, observation || undefined);
    if (nextQuestionId) {
      setTimeout(() => {
        const nextEl = document.getElementById(`question-${nextQuestionId}`);
        if (nextEl) nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  };

  const handleObservationChange = (obs: string) => {
    if (selectedGrade) onAnswer(question.id, selectedGrade, obs || undefined);
  };

  const truncateText = (text: string, maxLen: number) =>
    text.length <= maxLen ? text : text.slice(0, maxLen).trimEnd() + "...";

  return (
    <div
      id={`question-${question.id}`}
      className="lp-glass lp-glass-hover p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex gap-3">
        <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#4CAF50]/10 border border-[#7EBF8E]/30 text-[#00E676] text-sm font-black">
          {question.number}
        </span>
        <div className="space-y-1 flex-1 min-w-0">
          <span className="text-[10px] font-bold text-[#7EBF8E] uppercase tracking-widest">
            {subAreaLabel}
          </span>
          <p className="text-sm font-medium leading-relaxed text-white">{question.text}</p>
        </div>
      </div>

      {/* Grade Options */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-[#606060] uppercase tracking-widest">
          Selecione o grau de maturidade
        </span>
        <div className="grid gap-2">
          {question.options.map((option) => {
            const isSelected = selectedGrade === option.grade;
            const color = maturityColors[option.grade];

            return (
              <button
                key={option.grade}
                type="button"
                onClick={() => handleGradeSelect(option.grade)}
                className={cn(
                  "relative flex items-start gap-3 rounded-xl p-3 text-left cursor-pointer transition-all duration-200 w-full",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]/50",
                  isSelected
                    ? "border-2"
                    : "border border-white/8 hover:border-white/20 bg-white/[0.015] hover:bg-white/[0.03]"
                )}
                style={
                  isSelected
                    ? {
                        borderColor: color,
                        backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                      }
                    : undefined
                }
              >
                <span
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all mt-0.5",
                    isSelected ? "text-[#0A0A0A]" : "ring-2 ring-inset"
                  )}
                  style={
                    isSelected
                      ? { backgroundColor: color }
                      : { "--tw-ring-color": `color-mix(in srgb, ${color} 50%, transparent)` } as React.CSSProperties
                  }
                >
                  {isSelected ? (
                    <Check className="w-4 h-4" strokeWidth={3} />
                  ) : (
                    <span className="text-xs font-bold" style={{ color }}>
                      {option.grade}
                    </span>
                  )}
                </span>

                <div className="flex-1 min-w-0">
                  <span
                    className="text-sm font-bold"
                    style={isSelected ? { color } : { color: "#A0A0A0" }}
                  >
                    {option.grade}
                  </span>
                  <p
                    className={cn(
                      "text-sm leading-relaxed mt-0.5 break-words",
                      isSelected ? "text-white font-medium" : "text-[#A0A0A0]"
                    )}
                  >
                    {option.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Risk Preview */}
      {riskEntry && (
        <div className="flex rounded-xl overflow-hidden border border-white/8 bg-white/[0.02] animate-fade-in">
          <div className={cn("w-1 flex-shrink-0", getRiskBarColor(riskEntry.riskCategory))} />
          <div className="flex-1 px-3 py-2.5 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#606060] uppercase tracking-widest">
                Risco
              </span>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-2 py-0 h-5 rounded-full font-semibold",
                  getRiskBadgeStyle(riskEntry.riskCategory)
                )}
              >
                {riskEntry.riskCategory}
              </Badge>
            </div>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              {truncateText(riskEntry.riskNarrative, 120)}
            </p>
          </div>
        </div>
      )}

      {/* Observation */}
      <div className="space-y-1.5">
        {!showObservation ? (
          <button
            type="button"
            onClick={() => setShowObservation(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-[#606060] hover:text-[#7EBF8E] transition-colors"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            Adicionar observação
            <ChevronDown className="w-3 h-3" />
          </button>
        ) : (
          <div className="animate-fade-in space-y-1.5">
            <button
              type="button"
              onClick={() => { if (!observation) setShowObservation(false); }}
              className="flex items-center gap-1.5 text-xs font-medium text-[#7EBF8E]"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              Observação
            </button>
            <Textarea
              placeholder="Observações do CFO (opcional)"
              value={observation}
              onChange={(e) => handleObservationChange(e.target.value)}
              className="min-h-[60px] text-sm resize-none lp-input rounded-xl"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}

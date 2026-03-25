import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

/** Inline styles com cores HSL para uso dinâmico (Tailwind não faz JIT com variáveis dinâmicas) */
const maturityColors: Record<number, string> = {
  1: "hsl(var(--maturity-1))",
  2: "hsl(var(--maturity-2))",
  3: "hsl(var(--maturity-3))",
  4: "hsl(var(--maturity-4))",
  5: "hsl(var(--maturity-5))",
};

/** Cor do badge de risco */
function getRiskBadgeStyle(category: string): string {
  switch (category) {
    case "Baixo":
      return "bg-green-500/15 text-green-700 border-green-500/30 dark:text-green-400";
    case "Médio":
      return "bg-yellow-500/15 text-yellow-700 border-yellow-500/30 dark:text-yellow-400";
    case "Alto":
      return "bg-orange-500/15 text-orange-700 border-orange-500/30 dark:text-orange-400";
    case "Alto Crítico":
      return "bg-red-500/15 text-red-700 border-red-500/30 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/** Cor da barra lateral do risco */
function getRiskBarColor(category: string): string {
  switch (category) {
    case "Baixo":
      return "bg-green-500";
    case "Médio":
      return "bg-yellow-500";
    case "Alto":
      return "bg-orange-500";
    case "Alto Crítico":
      return "bg-red-500";
    default:
      return "bg-muted-foreground";
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

  // Risk preview para a opção selecionada
  const riskEntry = selectedGrade
    ? getRiskPreview(question.id, selectedGrade)
    : undefined;

  const handleGradeSelect = (grade: number) => {
    onAnswer(question.id, grade, observation || undefined);

    // Auto-scroll para a próxima pergunta
    if (nextQuestionId) {
      setTimeout(() => {
        const nextEl = document.getElementById(`question-${nextQuestionId}`);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }
  };

  const handleObservationChange = (obs: string) => {
    if (selectedGrade) {
      onAnswer(question.id, selectedGrade, obs || undefined);
    }
  };

  const truncateText = (text: string, maxLen: number) => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).trimEnd() + "...";
  };

  return (
    <Card id={`question-${question.id}`} className="border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
      <CardContent className="p-5 space-y-4">
        {/* Header: Número + SubArea + Texto da pergunta */}
        <div className="flex gap-3">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
            {question.number}
          </span>
          <div className="space-y-1 flex-1 min-w-0">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {subAreaLabel}
            </span>
            <p className="text-sm font-medium leading-relaxed">{question.text}</p>
          </div>
        </div>

        {/* Grade Selection — Visual Cards */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">
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
                    "relative flex items-start gap-3 rounded-lg p-3 text-left cursor-pointer transition-all duration-200 w-full",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isSelected
                      ? "border-2 shadow-sm"
                      : "border border-border/50 hover:border-border"
                  )}
                  style={
                    isSelected
                      ? {
                          borderColor: color,
                          backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`,
                        }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = `color-mix(in srgb, ${color} 40%, transparent)`;
                      e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${color} 4%, transparent)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.backgroundColor = "";
                    }
                  }}
                >
                  {/* Indicador de seleção — círculo colorido ou check */}
                  <span
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 mt-0.5",
                      isSelected ? "text-white" : "ring-2 ring-inset"
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
                      <span
                        className="text-xs font-bold"
                        style={{ color }}
                      >
                        {option.grade}
                      </span>
                    )}
                  </span>

                  {/* Conteúdo: Número do grau + texto descritivo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-sm font-bold"
                        style={isSelected ? { color } : undefined}
                      >
                        {option.grade}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-sm leading-relaxed mt-0.5 break-words",
                        isSelected
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
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

        {/* Risk Preview — barra lateral colorida + info */}
        {riskEntry && (
          <div
            className="flex rounded-lg overflow-hidden border border-border/40 animate-fade-in"
          >
            {/* Barra lateral fina colorida */}
            <div
              className={cn(
                "w-1 flex-shrink-0",
                getRiskBarColor(riskEntry.riskCategory)
              )}
            />
            <div className="flex-1 px-3 py-2.5 bg-muted/15 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
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
              <p className="text-xs text-muted-foreground leading-relaxed">
                {truncateText(riskEntry.riskNarrative, 120)}
                {riskEntry.riskNarrative.length > 120 && (
                  <button
                    type="button"
                    onClick={() => {
                      /* toggle inline — não usado com truncate simplificado */
                    }}
                    className="ml-1 text-primary text-xs font-medium hover:underline transition-colors"
                  >
                    ver mais
                  </button>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Observações — colapsável */}
        <div className="space-y-1.5">
          {!showObservation ? (
            <button
              type="button"
              onClick={() => setShowObservation(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              Adicionar observação
              <ChevronDown className="w-3 h-3" />
            </button>
          ) : (
            <div className="animate-fade-in space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  if (!observation) setShowObservation(false);
                }}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                Observação
              </button>
              <Textarea
                placeholder="Observações do CFO (opcional)"
                value={observation}
                onChange={(e) => handleObservationChange(e.target.value)}
                className="min-h-[60px] text-sm resize-none border-border/40 focus:border-primary/50 transition-all duration-200"
                autoFocus
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

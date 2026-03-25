import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { areas } from "@/data/areas";
import { subAreas } from "@/data/subareas";
import { questions } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Shield,
  ChevronLeft,
  ChevronRight,
  Check,
  MessageSquarePlus,
  Trophy,
  BarChart3,
  X,
} from "lucide-react";

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

interface SlideItem {
  type: "area-transition" | "question";
  areaId: string;
  areaName: string;
  areaWeight: number;
  subAreaName?: string;
  questionIndex?: number; // global question index (0-based)
  question?: (typeof questions)[number];
  areaQuestionCount?: number;
  areaSubAreas?: string[];
}

// ────────────────────────────────────────────────────────────
// Maturity Colors (same as QuestionCard)
// ────────────────────────────────────────────────────────────

const maturityColors: Record<number, string> = {
  1: "hsl(var(--maturity-1))",
  2: "hsl(var(--maturity-2))",
  3: "hsl(var(--maturity-3))",
  4: "hsl(var(--maturity-4))",
  5: "hsl(var(--maturity-5))",
};

/** Risk badge style (same as QuestionCard) */
function getRiskBadgeStyle(category: string): string {
  switch (category) {
    case "Baixo":
      return "bg-green-500/15 text-green-400 border-green-500/30";
    case "Médio":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
    case "Alto":
      return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    case "Alto Crítico":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// ────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────

export default function PresentationMode() {
  const location = useLocation();
  const navigate = useNavigate();
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get company name from router state
  const stateCompanyName =
    (location.state as Record<string, unknown>)?.companyName as
      | string
      | undefined;

  // Diagnostic hook
  const {
    session,
    isStarted,
    start,
    answerQuestion,
    getProgress,
    completeDiagnostic,
    getRiskPreview,
  } = useDiagnostic();

  // Start session
  useEffect(() => {
    if (stateCompanyName && !isStarted) {
      start(stateCompanyName);
    }
  }, [stateCompanyName, isStarted, start]);

  // Redirect if no company name
  useEffect(() => {
    if (!stateCompanyName) {
      navigate("/", { replace: true });
    }
  }, [stateCompanyName, navigate]);

  // ── Build slide deck ───────────────────────────────────────

  const sortedAreas = useMemo(
    () => [...areas].sort((a, b) => a.order - b.order),
    []
  );

  const slides: SlideItem[] = useMemo(() => {
    const result: SlideItem[] = [];
    let globalIdx = 0;

    for (const area of sortedAreas) {
      const areaSubAreas = subAreas
        .filter((sa) => sa.areaId === area.id)
        .sort((a, b) => a.order - b.order);

      const areaQuestions = questions
        .filter((q) => q.areaId === area.id)
        .sort((a, b) => a.order - b.order);

      // Area transition slide
      result.push({
        type: "area-transition",
        areaId: area.id,
        areaName: area.name,
        areaWeight: area.weight,
        areaQuestionCount: areaQuestions.length,
        areaSubAreas: areaSubAreas.map((sa) => sa.name),
      });

      // Question slides
      for (const q of areaQuestions) {
        const sa = subAreas.find((s) => s.id === q.subAreaId);
        result.push({
          type: "question",
          areaId: area.id,
          areaName: area.name,
          areaWeight: area.weight,
          subAreaName: sa?.name ?? "",
          questionIndex: globalIdx,
          question: q,
        });
        globalIdx++;
      }
    }

    return result;
  }, [sortedAreas]);

  // ── Slide navigation state ─────────────────────────────────

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showObservation, setShowObservation] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const currentSlide = slides[currentSlideIndex];
  const progress = getProgress();
  const totalQuestions = progress.total;

  // Count only question slides answered so far
  const questionNumber = useMemo(() => {
    if (!currentSlide || currentSlide.type !== "question") return 0;
    return (currentSlide.questionIndex ?? 0) + 1;
  }, [currentSlide]);

  // ── Auto-advance for area transition slides ────────────────

  useEffect(() => {
    if (currentSlide?.type === "area-transition") {
      autoAdvanceTimerRef.current = setTimeout(() => {
        goToNext();
      }, 2500);

      return () => {
        if (autoAdvanceTimerRef.current) {
          clearTimeout(autoAdvanceTimerRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideIndex, currentSlide?.type]);

  // ── Navigation ─────────────────────────────────────────────

  const goToNext = useCallback(() => {
    if (isAnimating) return;

    // Cancel auto-advance timer if it exists
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (currentSlideIndex < slides.length - 1) {
      setSlideDirection("right");
      setIsAnimating(true);
      setShowObservation(false);
      setTimeout(() => {
        setCurrentSlideIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      // Last slide - check if all answered
      if (progress.answered === progress.total && progress.total > 0) {
        setShowCompletion(true);
      }
    }
  }, [currentSlideIndex, slides.length, isAnimating, progress]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;

    // Cancel auto-advance timer if it exists
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (currentSlideIndex > 0) {
      setSlideDirection("left");
      setIsAnimating(true);
      setShowObservation(false);
      setTimeout(() => {
        setCurrentSlideIndex((prev) => prev - 1);
        setIsAnimating(false);
      }, 200);
    }
  }, [currentSlideIndex, isAnimating]);

  // ── Grade selection ────────────────────────────────────────

  const handleGradeSelect = useCallback(
    (grade: number) => {
      if (!currentSlide || currentSlide.type !== "question" || !currentSlide.question)
        return;

      const qId = currentSlide.question.id;
      const existingObs = session?.answers[qId]?.observation;
      answerQuestion(qId, grade, existingObs);
    },
    [currentSlide, session, answerQuestion]
  );

  // ── Observation ────────────────────────────────────────────

  const handleObservationChange = useCallback(
    (obs: string) => {
      if (!currentSlide || currentSlide.type !== "question" || !currentSlide.question)
        return;

      const qId = currentSlide.question.id;
      const existingGrade = session?.answers[qId]?.grade;
      if (existingGrade) {
        answerQuestion(qId, existingGrade, obs || undefined);
      }
    },
    [currentSlide, session, answerQuestion]
  );

  // ── Keyboard navigation ───────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in textarea
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      ) {
        if (e.key === "Escape") {
          (e.target as HTMLElement).blur();
          setShowObservation(false);
        }
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          goToNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          e.preventDefault();
          handleGradeSelect(parseInt(e.key));
          break;
        case "Escape":
          e.preventDefault();
          if (showCompletion) {
            setShowCompletion(false);
          } else if (showObservation) {
            setShowObservation(false);
          }
          break;
        case "o":
        case "O":
          e.preventDefault();
          if (currentSlide?.type === "question") {
            setShowObservation((prev) => !prev);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, handleGradeSelect, showCompletion, showObservation, currentSlide]);

  // ── Complete diagnostic ────────────────────────────────────

  const handleComplete = useCallback(() => {
    const result = completeDiagnostic();
    if (result) {
      navigate("/resultados", { state: { result } });
    }
  }, [completeDiagnostic, navigate]);

  // ── Compute global score preview ───────────────────────────

  const globalScorePreview = useMemo(() => {
    if (progress.answered === 0) return 0;
    let totalWeightedScore = 0;

    for (const area of sortedAreas) {
      const areaQuestions = questions.filter((q) => q.areaId === area.id);
      const answeredGrades = areaQuestions
        .map((q) => session?.answers[q.id]?.grade)
        .filter((g): g is number => g !== undefined);

      if (answeredGrades.length > 0) {
        const avg =
          answeredGrades.reduce((s, g) => s + g, 0) / answeredGrades.length;
        totalWeightedScore += avg * area.weight;
      }
    }

    return Math.round(totalWeightedScore * 100) / 100;
  }, [session, progress.answered, sortedAreas]);

  // ── Guard ──────────────────────────────────────────────────

  if (!session || !currentSlide) {
    return (
      <div className="min-h-screen bg-[hsl(222,30%,8%)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Completion Screen ──────────────────────────────────────

  if (showCompletion) {
    return (
      <div className="fixed inset-0 z-50 bg-[hsl(222,30%,8%)] flex items-center justify-center">
        <div className="text-center space-y-8 animate-fade-in max-w-lg px-6">
          {/* Trophy icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Diagnostico Completo
            </h1>
            <p className="text-lg text-[hsl(215,15%,60%)]">
              {session.companyName}
            </p>
          </div>

          {/* Score preview */}
          <div className="inline-flex flex-col items-center gap-2 px-8 py-5 rounded-2xl bg-[hsl(222,25%,12%)] border border-[hsl(220,20%,18%)]">
            <span className="text-sm font-semibold text-[hsl(215,15%,60%)] uppercase tracking-wider">
              Score Global
            </span>
            <span className="text-5xl font-extrabold text-white tabular-nums">
              {globalScorePreview.toFixed(2)}
            </span>
            <span className="text-sm text-[hsl(215,15%,60%)]">de 5.00</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={handleComplete}
              size="lg"
              className="h-14 px-10 text-lg font-bold btn-glow"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Ver Resultados
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowCompletion(false)}
              className="h-14 px-8 text-lg border-[hsl(220,20%,18%)] text-[hsl(215,15%,60%)] hover:text-white hover:bg-[hsl(222,25%,15%)]"
            >
              Revisar Respostas
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Current question data ──────────────────────────────────

  const isQuestionSlide = currentSlide.type === "question";
  const currentQuestion = isQuestionSlide ? currentSlide.question : null;
  const currentAnswer =
    currentQuestion && session ? session.answers[currentQuestion.id] : undefined;
  const currentRisk =
    currentAnswer && currentQuestion
      ? getRiskPreview(currentQuestion.id, currentAnswer.grade)
      : undefined;

  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === slides.length - 1;

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 bg-[hsl(222,30%,8%)] text-[hsl(210,40%,95%)] flex flex-col overflow-hidden select-none">
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-[hsl(220,20%,14%)]">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold tracking-tight">O2 Inc</span>
          <span className="text-xs text-[hsl(215,15%,60%)] hidden sm:inline">
            — {session.companyName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress indicator */}
          {isQuestionSlide && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[hsl(215,15%,60%)] tabular-nums">
                Pergunta {questionNumber} de {totalQuestions}
              </span>
              <div className="w-32 hidden sm:block">
                <Progress
                  value={progress.percentage}
                  className="h-1.5 bg-[hsl(220,20%,16%)]"
                />
              </div>
              <span className="text-xs font-bold text-primary tabular-nums">
                {progress.percentage}%
              </span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-[hsl(215,15%,60%)] hover:text-white hover:bg-[hsl(222,25%,15%)] h-8 px-2"
            title="Sair do modo apresentação (voltar)"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* ── Main Content Area ───────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Left arrow */}
        {!isFirstSlide && (
          <button
            onClick={goToPrev}
            className="absolute left-2 md:left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[hsl(222,25%,14%)] hover:bg-[hsl(222,25%,18%)] text-[hsl(215,15%,60%)] hover:text-white transition-all duration-200 border border-[hsl(220,20%,18%)]"
            title="Anterior (seta esquerda)"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* Right arrow */}
        {!isLastSlide && (
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[hsl(222,25%,14%)] hover:bg-[hsl(222,25%,18%)] text-[hsl(215,15%,60%)] hover:text-white transition-all duration-200 border border-[hsl(220,20%,18%)]"
            title="Próxima (seta direita)"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
        {isLastSlide && progress.answered === progress.total && progress.total > 0 && (
          <button
            onClick={() => setShowCompletion(true)}
            className="absolute right-2 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-primary hover:bg-primary/90 text-white transition-all duration-200"
            title="Concluir diagnostico"
          >
            <Check className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* Slide content with animation */}
        <div
          key={currentSlideIndex}
          className={cn(
            "w-full max-w-4xl mx-auto px-8 md:px-16",
            "transition-all duration-300 ease-out",
            isAnimating
              ? slideDirection === "right"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          )}
          style={{
            animation: !isAnimating
              ? `pres-slide-in 0.35s ease-out forwards`
              : undefined,
          }}
        >
          {/* ── Area Transition Slide ─────────────────────── */}
          {currentSlide.type === "area-transition" && (
            <div className="text-center space-y-8">
              {/* Area icon / number */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-3xl font-extrabold text-primary">
                    {sortedAreas.findIndex((a) => a.id === currentSlide.areaId) + 1}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  {currentSlide.areaName}
                </h1>
                <div className="flex items-center justify-center gap-4 text-[hsl(215,15%,60%)]">
                  <span className="text-lg font-semibold">
                    Peso: {Math.round(currentSlide.areaWeight * 100)}%
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[hsl(215,15%,40%)]" />
                  <span className="text-lg">
                    {currentSlide.areaQuestionCount} perguntas
                  </span>
                </div>
              </div>

              {/* SubAreas list */}
              {currentSlide.areaSubAreas && currentSlide.areaSubAreas.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                  {currentSlide.areaSubAreas.map((sa) => (
                    <Badge
                      key={sa}
                      variant="outline"
                      className="text-sm px-4 py-1.5 rounded-full border-[hsl(220,20%,22%)] text-[hsl(215,15%,70%)] bg-[hsl(222,25%,12%)]"
                    >
                      {sa}
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-sm text-[hsl(215,15%,45%)] animate-pulse-subtle">
                Avancando automaticamente...
              </p>
            </div>
          )}

          {/* ── Question Slide ────────────────────────────── */}
          {isQuestionSlide && currentQuestion && (
            <div className="space-y-6">
              {/* Area / SubArea breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary font-semibold">
                  {currentSlide.areaName}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[hsl(215,15%,40%)]" />
                <span className="text-[hsl(215,15%,60%)]">
                  {currentSlide.subAreaName}
                </span>
              </div>

              {/* Question number + text */}
              <div className="space-y-3">
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-lg font-bold">
                  {currentQuestion.number}
                </span>
                <h2 className="text-2xl md:text-[28px] font-bold leading-snug text-white">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Answer options */}
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentAnswer?.grade === option.grade;
                  const color = maturityColors[option.grade];

                  return (
                    <button
                      key={option.grade}
                      type="button"
                      onClick={() => handleGradeSelect(option.grade)}
                      className={cn(
                        "w-full flex items-center gap-4 rounded-xl p-4 md:p-5 text-left transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        isSelected
                          ? "border-2 shadow-lg"
                          : "border border-[hsl(220,20%,18%)] hover:border-[hsl(220,20%,25%)] bg-[hsl(222,25%,11%)] hover:bg-[hsl(222,25%,13%)]"
                      )}
                      style={
                        isSelected
                          ? {
                              borderColor: color,
                              backgroundColor: `color-mix(in srgb, ${color} 10%, hsl(222, 25%, 11%))`,
                            }
                          : undefined
                      }
                    >
                      {/* Grade circle */}
                      <span
                        className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200",
                          isSelected ? "text-white" : "ring-2 ring-inset"
                        )}
                        style={
                          isSelected
                            ? { backgroundColor: color }
                            : ({
                                "--tw-ring-color": `color-mix(in srgb, ${color} 50%, transparent)`,
                                color,
                              } as React.CSSProperties)
                        }
                      >
                        {isSelected ? (
                          <Check className="w-5 h-5" strokeWidth={3} />
                        ) : (
                          option.grade
                        )}
                      </span>

                      {/* Option text */}
                      <span
                        className={cn(
                          "flex-1 text-base md:text-lg leading-relaxed transition-colors duration-200",
                          isSelected
                            ? "text-white font-semibold"
                            : "text-[hsl(215,15%,65%)]"
                        )}
                      >
                        {option.text}
                      </span>

                      {/* Keyboard hint */}
                      <span className="flex-shrink-0 w-7 h-7 rounded-md bg-[hsl(222,25%,14%)] border border-[hsl(220,20%,20%)] flex items-center justify-center text-xs font-mono text-[hsl(215,15%,40%)]">
                        {option.grade}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom section: Risk preview + Observation */}
              <div className="flex flex-col md:flex-row items-start gap-4 pt-2">
                {/* Risk preview */}
                {currentRisk && (
                  <div className="flex-1 flex items-start gap-3 rounded-lg px-4 py-3 bg-[hsl(222,25%,11%)] border border-[hsl(220,20%,18%)] animate-fade-in">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[hsl(215,15%,45%)] uppercase tracking-wider">
                          Risco
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] px-2 py-0 h-5 rounded-full font-semibold",
                            getRiskBadgeStyle(currentRisk.riskCategory)
                          )}
                        >
                          {currentRisk.riskCategory}
                        </Badge>
                      </div>
                      <p className="text-xs text-[hsl(215,15%,55%)] leading-relaxed line-clamp-2">
                        {currentRisk.riskNarrative}
                      </p>
                    </div>
                  </div>
                )}

                {/* Observation toggle */}
                {isQuestionSlide && (
                  <div className="flex-shrink-0">
                    {!showObservation ? (
                      <button
                        type="button"
                        onClick={() => setShowObservation(true)}
                        className="flex items-center gap-1.5 text-xs font-medium text-[hsl(215,15%,50%)] hover:text-white transition-colors"
                        title="Adicionar observacao (tecla O)"
                      >
                        <MessageSquarePlus className="w-4 h-4" />
                        <span className="hidden md:inline">Adicionar observacao</span>
                      </button>
                    ) : (
                      <div className="w-72 space-y-1.5 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[hsl(215,15%,50%)]">
                            Observacao
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowObservation(false)}
                            className="text-[hsl(215,15%,50%)] hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <Textarea
                          placeholder="Notas do CFO..."
                          value={currentAnswer?.observation ?? ""}
                          onChange={(e) =>
                            handleObservationChange(e.target.value)
                          }
                          className="min-h-[70px] text-sm resize-none bg-[hsl(222,25%,11%)] border-[hsl(220,20%,18%)] text-white placeholder:text-[hsl(215,15%,35%)] focus:border-primary/50"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Bottom Navigation Bar ───────────────────────────── */}
      <footer className="flex-shrink-0 border-t border-[hsl(220,20%,14%)] px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={goToPrev}
            disabled={isFirstSlide}
            className="gap-2 text-[hsl(215,15%,60%)] hover:text-white hover:bg-[hsl(222,25%,15%)] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          {/* Progress dots - show area segments */}
          <div className="hidden md:flex items-center gap-1">
            {sortedAreas.map((area) => {
              const ap = progress.byArea.find((p) => p.areaId === area.id);
              const isCurrent = currentSlide.areaId === area.id;
              const pct = ap && ap.total > 0 ? (ap.answered / ap.total) * 100 : 0;

              return (
                <div
                  key={area.id}
                  className="relative w-16 h-1.5 rounded-full bg-[hsl(220,20%,16%)] overflow-hidden"
                  title={`${area.name}: ${ap?.answered ?? 0}/${ap?.total ?? 0}`}
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      isCurrent ? "bg-primary" : "bg-primary/40"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full ring-1 ring-primary/40" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile progress */}
          <span className="md:hidden text-xs text-[hsl(215,15%,50%)] tabular-nums">
            {progress.answered}/{progress.total}
          </span>

          {isLastSlide && progress.answered === progress.total && progress.total > 0 ? (
            <Button
              onClick={() => setShowCompletion(true)}
              className="gap-2 bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white font-semibold"
            >
              Concluir
              <Check className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={goToNext}
              disabled={isLastSlide}
              className="gap-2 text-[hsl(215,15%,60%)] hover:text-white hover:bg-[hsl(222,25%,15%)] disabled:opacity-30"
            >
              Proxima
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </footer>

      {/* Inline animation keyframes */}
      <style>{`
        @keyframes pres-slide-in {
          from {
            opacity: 0;
            transform: translateX(${slideDirection === "right" ? "20px" : "-20px"});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

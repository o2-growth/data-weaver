import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { areas } from "@/data/areas";
import { subAreas } from "@/data/subareas";
import { questions } from "@/data/questions";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  MessageSquarePlus,
  Trophy,
  BarChart3,
  X,
  Wrench,
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
  questionIndex?: number;
  question?: (typeof questions)[number];
  areaQuestionCount?: number;
  areaSubAreas?: string[];
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
    case "Baixo": return "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/30";
    case "Médio": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    case "Alto":  return "bg-red-500/10 text-red-400 border-red-500/30";
    default:      return "bg-white/5 text-[#A0A0A0] border-white/10";
  }
}

export default function PresentationMode() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stateCompanyName =
    (location.state as Record<string, unknown>)?.companyName as string | undefined;
  const companyName = stateCompanyName || (isAdmin ? "Empresa Teste (Admin)" : undefined);

  const {
    session,
    isStarted,
    start,
    answerQuestion,
    getProgress,
    completeDiagnostic,
    getRiskPreview,
  } = useDiagnostic();

  useEffect(() => {
    if (companyName && !isStarted) start(companyName);
  }, [companyName, isStarted, start]);

  useEffect(() => {
    if (!companyName) navigate("/app", { replace: true });
  }, [companyName, navigate]);

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

      result.push({
        type: "area-transition",
        areaId: area.id,
        areaName: area.name,
        areaWeight: area.weight,
        areaQuestionCount: areaQuestions.length,
        areaSubAreas: areaSubAreas.map((sa) => sa.name),
      });

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

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showObservation, setShowObservation] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const currentSlide = slides[currentSlideIndex];
  const progress = getProgress();
  const totalQuestions = progress.total;

  const questionNumber = useMemo(() => {
    if (!currentSlide || currentSlide.type !== "question") return 0;
    return (currentSlide.questionIndex ?? 0) + 1;
  }, [currentSlide]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
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
      if (progress.answered === progress.total && progress.total > 0) {
        setShowCompletion(true);
      }
    }
  }, [currentSlideIndex, slides.length, isAnimating, progress]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
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

  useEffect(() => {
    if (currentSlide?.type === "area-transition") {
      autoAdvanceTimerRef.current = setTimeout(() => {
        goToNext();
      }, 2500);
      return () => {
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideIndex, currentSlide?.type]);

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

  const handleObservationChange = useCallback(
    (obs: string) => {
      if (!currentSlide || currentSlide.type !== "question" || !currentSlide.question)
        return;
      const qId = currentSlide.question.id;
      const existingGrade = session?.answers[qId]?.grade;
      if (existingGrade) answerQuestion(qId, existingGrade, obs || undefined);
    },
    [currentSlide, session, answerQuestion]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) {
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
        case "1": case "2": case "3": case "4": case "5":
          e.preventDefault();
          handleGradeSelect(parseInt(e.key));
          break;
        case "Escape":
          e.preventDefault();
          if (showCompletion) setShowCompletion(false);
          else if (showObservation) setShowObservation(false);
          break;
        case "o":
        case "O":
          e.preventDefault();
          if (currentSlide?.type === "question") setShowObservation((prev) => !prev);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, handleGradeSelect, showCompletion, showObservation, currentSlide]);

  const handleAutoFill = useCallback(() => {
    if (!isStarted) return;
    for (const q of questions) {
      const randomGrade = Math.floor(Math.random() * 5) + 1;
      answerQuestion(q.id, randomGrade);
    }
  }, [isStarted, answerQuestion]);

  const handleComplete = useCallback(() => {
    const result = completeDiagnostic();
    if (result) navigate("/resultados", { state: { result } });
  }, [completeDiagnostic, navigate]);

  const globalScorePreview = useMemo(() => {
    if (progress.answered === 0) return 0;
    let totalWeightedScore = 0;
    for (const area of sortedAreas) {
      const areaQuestions = questions.filter((q) => q.areaId === area.id);
      const answeredGrades = areaQuestions
        .map((q) => session?.answers[q.id]?.grade)
        .filter((g): g is number => g !== undefined);
      if (answeredGrades.length > 0) {
        const avg = answeredGrades.reduce((s, g) => s + g, 0) / answeredGrades.length;
        totalWeightedScore += avg * area.weight;
      }
    }
    return Math.round(totalWeightedScore * 100) / 100;
  }, [session, progress.answered, sortedAreas]);

  if (!session || !currentSlide) {
    return (
      <div className="min-h-screen lp-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00E676] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Completion Screen ──────────────────────────────────────
  if (showCompletion) {
    return (
      <div className="fixed inset-0 z-50 lp-bg text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,230,118,0.15) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 text-center space-y-8 animate-fade-in max-w-lg px-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-[#4CAF50]/10 border border-[#7EBF8E]/30 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-[#00E676]" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="eyebrow-pill">Diagnóstico Completo</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight font-display">
              <span className="gradient-text-neon">Concluído</span>
            </h1>
            <p className="text-lg text-[#A0A0A0]">{session.companyName}</p>
          </div>

          <div className="inline-flex flex-col items-center gap-2 px-10 py-6 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-[#7EBF8E] uppercase tracking-widest">
              Score Global
            </span>
            <span className="text-6xl font-black text-white tabular-nums font-display">
              {globalScorePreview.toFixed(2)}
            </span>
            <span className="text-sm text-[#606060]">de 5.00</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleComplete}
              className="btn-neon-primary animate-glow-pulse text-base"
            >
              <BarChart3 className="w-5 h-5" />
              Ver Resultados
            </button>
            <button
              type="button"
              onClick={() => setShowCompletion(false)}
              className="btn-neon-outline text-base"
            >
              Revisar Respostas
            </button>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="fixed inset-0 z-50 lp-bg text-white flex flex-col overflow-hidden select-none">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-40" />

      {/* Top Bar */}
      <header className="relative z-10 flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-white/8 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center">
            <span className="text-[#0A0A0A] font-black text-[10px]">O2</span>
          </div>
          <span className="text-sm font-bold tracking-tight">
            Grau de <span className="gradient-text-neon">Maturidade</span>
          </span>
          <span className="text-xs text-[#7EBF8E] hidden sm:inline">
            — {session.companyName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {isQuestionSlide && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#A0A0A0] tabular-nums">
                {questionNumber} / {totalQuestions}
              </span>
              <div className="w-32 h-1.5 hidden sm:block rounded-full bg-white/8 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4CAF50] to-[#00E676] transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#00E676] tabular-nums">
                {progress.percentage}%
              </span>
            </div>
          )}

          {isAdmin && (
            <button
              type="button"
              onClick={handleAutoFill}
              className="inline-flex items-center gap-1.5 h-8 px-2 rounded-md text-[#A0A0A0] hover:text-white hover:bg-white/5 transition-colors"
              title="Preencher (Admin)"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs">Preencher</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#A0A0A0] hover:text-white hover:bg-white/5 transition-colors"
            title="Sair"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
        {/* Left arrow */}
        {!isFirstSlide && (
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-2 md:left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.08] border border-white/12 hover:border-white/25 text-[#A0A0A0] hover:text-white transition-all"
            title="Anterior (← )"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {!isLastSlide && (
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.08] border border-white/12 hover:border-white/25 text-[#A0A0A0] hover:text-white transition-all"
            title="Próxima (→)"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
        {isLastSlide && progress.answered === progress.total && progress.total > 0 && (
          <button
            type="button"
            onClick={() => setShowCompletion(true)}
            className="absolute right-2 md:right-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#4CAF50] to-[#00E676] text-[#0A0A0A] shadow-xl shadow-[#4CAF50]/40 animate-glow-pulse hover:scale-105 transition-transform"
            title="Concluir"
          >
            <Check className="w-6 h-6" strokeWidth={3} />
          </button>
        )}

        {/* Slide content */}
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
            animation: !isAnimating ? `pres-slide-in 0.35s ease-out forwards` : undefined,
          }}
        >
          {/* Area Transition */}
          {currentSlide.type === "area-transition" && (
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-[#4CAF50]/10 border border-[#7EBF8E]/30 flex items-center justify-center">
                  <span className="text-3xl font-black text-[#00E676] font-display">
                    {sortedAreas.findIndex((a) => a.id === currentSlide.areaId) + 1}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="eyebrow-pill">Próxima Área</span>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white font-display">
                  {currentSlide.areaName}
                </h1>
                <div className="flex items-center justify-center gap-4 text-[#A0A0A0]">
                  <span className="text-base font-semibold">
                    Peso: <span className="text-[#7EBF8E]">{Math.round(currentSlide.areaWeight * 100)}%</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#606060]" />
                  <span className="text-base">{currentSlide.areaQuestionCount} perguntas</span>
                </div>
              </div>

              {currentSlide.areaSubAreas && currentSlide.areaSubAreas.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                  {currentSlide.areaSubAreas.map((sa) => (
                    <span
                      key={sa}
                      className="text-sm px-4 py-1.5 rounded-full border border-white/12 text-[#A0A0A0] bg-white/[0.02]"
                    >
                      {sa}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-[#606060] animate-pulse-subtle">
                Avançando automaticamente...
              </p>
            </div>
          )}

          {/* Question Slide */}
          {isQuestionSlide && currentQuestion && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#00E676] font-bold uppercase tracking-wider text-xs">
                  {currentSlide.areaName}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#606060]" />
                <span className="text-[#A0A0A0]">{currentSlide.subAreaName}</span>
              </div>

              <div className="space-y-3">
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#4CAF50]/10 border border-[#7EBF8E]/30 text-[#00E676] text-lg font-black">
                  {currentQuestion.number}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white font-display">
                  {currentQuestion.text}
                </h2>
              </div>

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
                        "w-full flex items-center gap-4 rounded-2xl p-4 md:p-5 text-left transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]/50",
                        isSelected
                          ? "border-2 shadow-xl"
                          : "border border-white/8 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
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
                          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all",
                          isSelected ? "text-[#0A0A0A]" : "ring-2 ring-inset"
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
                        {isSelected ? <Check className="w-5 h-5" strokeWidth={3} /> : option.grade}
                      </span>

                      <span
                        className={cn(
                          "flex-1 text-base md:text-lg leading-relaxed transition-colors",
                          isSelected ? "text-white font-semibold" : "text-[#A0A0A0]"
                        )}
                      >
                        {option.text}
                      </span>

                      <span className="flex-shrink-0 w-7 h-7 rounded-md bg-white/[0.03] border border-white/12 flex items-center justify-center text-xs font-mono text-[#606060]">
                        {option.grade}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col md:flex-row items-start gap-4 pt-2">
                {currentRisk && (
                  <div className="flex-1 flex items-start gap-3 rounded-xl px-4 py-3 bg-white/[0.02] border border-white/8 animate-fade-in">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#7EBF8E] uppercase tracking-widest">
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
                      <p className="text-xs text-[#A0A0A0] leading-relaxed line-clamp-2">
                        {currentRisk.riskNarrative}
                      </p>
                    </div>
                  </div>
                )}

                {isQuestionSlide && (
                  <div className="flex-shrink-0">
                    {!showObservation ? (
                      <button
                        type="button"
                        onClick={() => setShowObservation(true)}
                        className="flex items-center gap-1.5 text-xs font-medium text-[#A0A0A0] hover:text-[#7EBF8E] transition-colors"
                        title="Adicionar observação (O)"
                      >
                        <MessageSquarePlus className="w-4 h-4" />
                        <span className="hidden md:inline">Adicionar observação</span>
                      </button>
                    ) : (
                      <div className="w-72 space-y-1.5 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#7EBF8E] uppercase tracking-widest">
                            Observação
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowObservation(false)}
                            className="text-[#606060] hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <Textarea
                          placeholder="Notas do CFO..."
                          value={currentAnswer?.observation ?? ""}
                          onChange={(e) => handleObservationChange(e.target.value)}
                          className="min-h-[70px] text-sm resize-none lp-input rounded-xl"
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

      {/* Bottom Bar */}
      <footer className="relative z-10 flex-shrink-0 border-t border-white/8 bg-[#0A0A0A]/80 backdrop-blur-md px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={goToPrev}
            disabled={isFirstSlide}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[#A0A0A0] hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <div className="hidden md:flex items-center gap-1">
            {sortedAreas.map((area) => {
              const ap = progress.byArea.find((p) => p.areaId === area.id);
              const isCurrent = currentSlide.areaId === area.id;
              const pct = ap && ap.total > 0 ? (ap.answered / ap.total) * 100 : 0;
              return (
                <div
                  key={area.id}
                  className="relative w-16 h-1.5 rounded-full bg-white/8 overflow-hidden"
                  title={`${area.name}: ${ap?.answered ?? 0}/${ap?.total ?? 0}`}
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      isCurrent ? "bg-gradient-to-r from-[#4CAF50] to-[#00E676]" : "bg-[#7EBF8E]/40"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full ring-1 ring-[#00E676]/40" />
                  )}
                </div>
              );
            })}
          </div>

          <span className="md:hidden text-xs text-[#606060] tabular-nums">
            {progress.answered}/{progress.total}
          </span>

          {isLastSlide && progress.answered === progress.total && progress.total > 0 ? (
            <button
              type="button"
              onClick={() => setShowCompletion(true)}
              className="btn-neon-primary text-sm py-2 px-4 rounded-xl"
            >
              Concluir
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNext}
              disabled={isLastSlide}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[#A0A0A0] hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Próxima
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>

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

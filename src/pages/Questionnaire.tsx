import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { areas } from "@/data/areas";
import { subAreas } from "@/data/subareas";
import { questions } from "@/data/questions";
import { QuestionCard } from "@/components/QuestionCard";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Wrench,
  Building2,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Questionnaire() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";

  const stateCompanyName = (location.state as Record<string, unknown>)?.companyName as string | undefined;
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [companyNameConfirmed, setCompanyNameConfirmed] = useState(!!stateCompanyName);
  const companyName = stateCompanyName || inputCompanyName;

  const mainRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);

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
    if (companyNameConfirmed && companyName && !isStarted) {
      start(companyName);
    }
  }, [companyNameConfirmed, companyName, isStarted, start]);

  const sortedAreas = useMemo(
    () => [...areas].sort((a, b) => a.order - b.order),
    []
  );

  const [activeAreaId, setActiveAreaId] = useState(sortedAreas[0]?.id ?? "");

  const questionsByArea = useMemo(() => {
    const map: Record<string, typeof questions> = {};
    for (const area of sortedAreas) {
      map[area.id] = questions
        .filter((q) => q.areaId === area.id)
        .sort((a, b) => a.order - b.order);
    }
    return map;
  }, [sortedAreas]);

  const subAreasByArea = useMemo(() => {
    const map: Record<string, typeof subAreas> = {};
    for (const area of sortedAreas) {
      map[area.id] = subAreas
        .filter((sa) => sa.areaId === area.id)
        .sort((a, b) => a.order - b.order);
    }
    return map;
  }, [sortedAreas]);

  const progress = getProgress();
  const activeAreaIndex = sortedAreas.findIndex((a) => a.id === activeAreaId);
  const isLastArea = activeAreaIndex === sortedAreas.length - 1;
  const isFirstArea = activeAreaIndex === 0;
  const allAnswered = progress.answered === progress.total && progress.total > 0;

  const activeAreaProgress = progress.byArea.find((p) => p.areaId === activeAreaId);
  const isActiveAreaComplete =
    activeAreaProgress &&
    activeAreaProgress.answered === activeAreaProgress.total &&
    activeAreaProgress.total > 0;

  const handleAreaChange = useCallback(
    (areaId: string) => {
      setActiveAreaId(areaId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  useEffect(() => {
    if (tabsListRef.current) {
      const activeTab = tabsListRef.current.querySelector(
        '[data-state="active"]'
      ) as HTMLElement | null;
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeAreaId]);

  const handleAutoFill = () => {
    if (!isStarted) return;
    for (const q of questions) {
      const randomGrade = Math.floor(Math.random() * 5) + 1;
      answerQuestion(q.id, randomGrade);
    }
  };

  const goToNextArea = () => {
    if (activeAreaIndex < sortedAreas.length - 1) {
      handleAreaChange(sortedAreas[activeAreaIndex + 1].id);
    }
  };
  const goToPrevArea = () => {
    if (activeAreaIndex > 0) {
      handleAreaChange(sortedAreas[activeAreaIndex - 1].id);
    }
  };

  const handleFinish = () => {
    const result = completeDiagnostic();
    if (result) {
      navigate("/resultados", { state: { result } });
    }
  };

  const subAreaLabelMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const sa of subAreas) {
      map[sa.id] = sa.name;
    }
    return map;
  }, []);

  // ── Company name input screen ──────────────────────────────
  if (!companyNameConfirmed) {
    return (
      <div className="min-h-screen lp-bg text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,230,118,0.10) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 w-full max-w-md mx-auto px-6 space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4CAF50]/10 border border-[#7EBF8E]/30">
                <Building2 className="w-8 h-8 text-[#00E676]" />
              </div>
            </div>
            <span className="eyebrow-pill">Iniciar Avaliação</span>
            <h1 className="text-3xl font-black tracking-tight font-display">
              Grau de <span className="gradient-text-neon">Maturidade</span>
            </h1>
            <p className="text-sm text-[#A0A0A0]">
              Informe o nome da empresa para iniciar
            </p>
          </div>
          <div className="space-y-3">
            <Input
              placeholder="Nome da empresa"
              value={inputCompanyName}
              onChange={(e) => setInputCompanyName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputCompanyName.trim()) {
                  setCompanyNameConfirmed(true);
                }
              }}
              className="text-center h-12 text-base lp-input rounded-xl"
              autoFocus
            />
            <button
              type="button"
              className="btn-neon-primary w-full"
              disabled={!inputCompanyName.trim()}
              onClick={() => setCompanyNameConfirmed(true)}
            >
              Iniciar Diagnóstico
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // ── Main questionnaire screen ──────────────────────────────
  return (
    <div className="min-h-screen lp-bg text-white flex flex-col">
      {/* ── Sticky Header ───────────────────────────────────── */}
      <header className="sticky top-0 z-10 lp-header">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A0A0A] font-black text-[10px]">O2</span>
              </div>
              <span className="text-sm font-bold tracking-tight truncate">
                Grau de <span className="gradient-text-neon">Maturidade</span>
              </span>
              <span className="hidden sm:inline text-xs text-[#7EBF8E] truncate">— {companyName}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-[#A0A0A0] font-medium tabular-nums whitespace-nowrap">
                {progress.answered}/{progress.total} ({progress.percentage}%)
              </span>
              <button
                type="button"
                onClick={() => navigate("/apresentacao", { state: { companyName } })}
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-white/12 text-white text-xs hover:border-white/25 hover:bg-white/5 transition-all"
                title="Modo Apresentação"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Apresentação</span>
              </button>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-white/12 text-white text-xs hover:border-white/25 hover:bg-white/5 transition-all"
                >
                  <Wrench className="w-3.5 h-3.5" /> Preencher
                </button>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4CAF50] to-[#00E676] transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <div className="flex gap-1">
              {sortedAreas.map((area) => {
                const ap = progress.byArea.find((p) => p.areaId === area.id);
                const pct = ap && ap.total > 0 ? (ap.answered / ap.total) * 100 : 0;
                const isActive = area.id === activeAreaId;
                return (
                  <div
                    key={area.id}
                    className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden"
                    title={`${area.name}: ${ap?.answered ?? 0}/${ap?.total ?? 0}`}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isActive ? "bg-[#00E676]" : "bg-[#7EBF8E]/50"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ── Body with Tabs ──────────────────────────────────── */}
      <main ref={mainRef} className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <Tabs value={activeAreaId} onValueChange={handleAreaChange}>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none" ref={tabsListRef}>
            <TabsList className="w-full flex h-auto p-1 bg-white/[0.03] border border-white/8 rounded-xl gap-1 min-w-max sm:min-w-0">
              {sortedAreas.map((area) => {
                const areaProgress = progress.byArea.find((p) => p.areaId === area.id);
                const areaLabel = area.name.length > 16
                  ? area.name.split(" ").slice(0, 2).join(" ")
                  : area.name;
                const isComplete = areaProgress && areaProgress.answered === areaProgress.total && areaProgress.total > 0;
                return (
                  <TabsTrigger
                    key={area.id}
                    value={area.id}
                    className="flex-1 text-xs relative py-2 px-2 sm:px-3 rounded-lg text-[#A0A0A0] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4CAF50] data-[state=active]:to-[#00E676] data-[state=active]:text-[#0A0A0A] data-[state=active]:shadow-lg data-[state=active]:shadow-[#4CAF50]/30 transition-all whitespace-nowrap"
                  >
                    <span className="flex flex-col items-center gap-0.5">
                      <span className="flex items-center gap-1 font-semibold">
                        {areaLabel}
                        {isComplete && (
                          <CheckCircle2 className="w-3 h-3 text-current opacity-80" />
                        )}
                      </span>
                      <span className="text-[10px] opacity-70 font-semibold tabular-nums">
                        {areaProgress?.answered ?? 0} de {areaProgress?.total ?? 0}
                      </span>
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {sortedAreas.map((area) => {
            const areaProgress = progress.byArea.find((p) => p.areaId === area.id);
            const areaSubAreas = subAreasByArea[area.id] || [];
            const areaQuestions = questionsByArea[area.id] || [];

            return (
              <TabsContent key={area.id} value={area.id} className="animate-fade-in">
                <div className="mb-6 mt-4 pb-4 border-b border-white/8">
                  <span className="eyebrow-pill mb-2">Área</span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display mt-2 text-white">
                    {area.name}
                  </h2>
                  <p className="text-sm text-[#A0A0A0] mt-1">
                    Peso: <span className="text-white font-semibold">{Math.round(area.weight * 100)}%</span> · {areaQuestions.length} perguntas ·{" "}
                    <span className="font-semibold text-[#7EBF8E]">
                      {areaProgress?.answered ?? 0} respondidas
                    </span>
                  </p>
                </div>

                <div className="space-y-8">
                  {areaSubAreas.map((subArea, saIndex) => {
                    const saQuestions = areaQuestions.filter(
                      (q) => q.subAreaId === subArea.id
                    );
                    if (saQuestions.length === 0) return null;

                    return (
                      <div key={subArea.id}>
                        {saIndex > 0 && <Separator className="mb-8 bg-white/8" />}
                        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#7EBF8E] to-[#00E676]" />
                          {subArea.name}
                        </h3>
                        <div className="space-y-4 animate-stagger">
                          {saQuestions.map((q, qIdx) => {
                            let nextQId: string | undefined;
                            if (qIdx < saQuestions.length - 1) {
                              nextQId = saQuestions[qIdx + 1].id;
                            } else {
                              const currentSaIdx = areaSubAreas.findIndex((sa) => sa.id === subArea.id);
                              for (let i = currentSaIdx + 1; i < areaSubAreas.length; i++) {
                                const nextSaQ = areaQuestions.filter((aq) => aq.subAreaId === areaSubAreas[i].id);
                                if (nextSaQ.length > 0) {
                                  nextQId = nextSaQ[0].id;
                                  break;
                                }
                              }
                            }
                            return (
                              <QuestionCard
                                key={q.id}
                                question={q}
                                answer={session.answers[q.id]}
                                onAnswer={answerQuestion}
                                getRiskPreview={getRiskPreview}
                                subAreaLabel={subAreaLabelMap[q.subAreaId] || ""}
                                nextQuestionId={nextQId}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </main>

      {/* ── Bottom Navigation Bar ───────────────────────────── */}
      <div className="sticky bottom-0 z-10 lp-header border-t border-white/8 border-b-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-2">
          <button
            type="button"
            onClick={goToPrevArea}
            disabled={isFirstArea}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 h-10 rounded-xl border border-white/12 text-white text-sm font-semibold hover:border-white/25 hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <span className="text-xs text-[#A0A0A0] font-medium tabular-nums sm:hidden">
            {activeAreaIndex + 1}/{sortedAreas.length}
          </span>

          <div className="flex gap-2">
            {!isLastArea && (
              <button
                type="button"
                onClick={goToNextArea}
                className={cn(
                  "btn-neon-primary text-sm py-2.5 px-5 rounded-xl",
                  isActiveAreaComplete && "animate-glow-pulse"
                )}
              >
                <span className="hidden sm:inline">Próxima Área</span>
                <span className="sm:hidden">Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {isLastArea && (
              <button
                type="button"
                onClick={handleFinish}
                disabled={!allAnswered}
                className="btn-neon-primary text-sm py-2.5 px-5 rounded-xl animate-glow-pulse"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">Concluir Diagnóstico</span>
                <span className="sm:hidden">Concluir</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

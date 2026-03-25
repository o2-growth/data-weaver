import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDiagnostic } from "@/hooks/useDiagnostic";
import { areas } from "@/data/areas";
import { subAreas } from "@/data/subareas";
import { questions } from "@/data/questions";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
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

  // Company name: from router state or user input
  const stateCompanyName = (location.state as Record<string, unknown>)?.companyName as string | undefined;
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [companyNameConfirmed, setCompanyNameConfirmed] = useState(!!stateCompanyName);
  const companyName = stateCompanyName || inputCompanyName;

  // Ref para scroll
  const mainRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);

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

  // Start session when company name is confirmed
  useEffect(() => {
    if (companyNameConfirmed && companyName && !isStarted) {
      start(companyName);
    }
  }, [companyNameConfirmed, companyName, isStarted, start]);

  // Sorted areas
  const sortedAreas = useMemo(
    () => [...areas].sort((a, b) => a.order - b.order),
    []
  );

  // Active tab state
  const [activeAreaId, setActiveAreaId] = useState(sortedAreas[0]?.id ?? "");

  // Questions grouped by area > subArea
  const questionsByArea = useMemo(() => {
    const map: Record<string, typeof questions> = {};
    for (const area of sortedAreas) {
      map[area.id] = questions
        .filter((q) => q.areaId === area.id)
        .sort((a, b) => a.order - b.order);
    }
    return map;
  }, [sortedAreas]);

  // SubAreas grouped by area
  const subAreasByArea = useMemo(() => {
    const map: Record<string, typeof subAreas> = {};
    for (const area of sortedAreas) {
      map[area.id] = subAreas
        .filter((sa) => sa.areaId === area.id)
        .sort((a, b) => a.order - b.order);
    }
    return map;
  }, [sortedAreas]);

  // Progress
  const progress = getProgress();
  const activeAreaIndex = sortedAreas.findIndex((a) => a.id === activeAreaId);
  const isLastArea = activeAreaIndex === sortedAreas.length - 1;
  const isFirstArea = activeAreaIndex === 0;
  const allAnswered = progress.answered === progress.total && progress.total > 0;

  // Verificar se a área ativa está 100% completa
  const activeAreaProgress = progress.byArea.find((p) => p.areaId === activeAreaId);
  const isActiveAreaComplete =
    activeAreaProgress &&
    activeAreaProgress.answered === activeAreaProgress.total &&
    activeAreaProgress.total > 0;

  // Smooth scroll ao trocar de aba
  const handleAreaChange = useCallback(
    (areaId: string) => {
      setActiveAreaId(areaId);
      // Scroll suave para o topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  // Scroll a tab ativa para visibilidade no mobile
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

  // Admin auto-fill
  const handleAutoFill = () => {
    if (!isStarted) return;
    for (const q of questions) {
      const randomGrade = Math.floor(Math.random() * 5) + 1;
      answerQuestion(q.id, randomGrade);
    }
  };

  // Navigate areas
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

  // Finish diagnostic
  const handleFinish = () => {
    const result = completeDiagnostic();
    if (result) {
      navigate("/resultados", { state: { result } });
    }
  };

  // SubArea label lookup
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6 space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 shadow-sm">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Diagnóstico 360°</h1>
            <p className="text-sm text-muted-foreground">
              Informe o nome da empresa para iniciar o diagnóstico
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
              className="text-center h-12 text-base border-border/60"
              autoFocus
            />
            <Button
              className="w-full h-12 text-base font-semibold"
              disabled={!inputCompanyName.trim()}
              onClick={() => setCompanyNameConfirmed(true)}
            >
              Iniciar Diagnóstico
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Wait for session to initialize
  if (!session) {
    return null;
  }

  // ── Main questionnaire screen ──────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Sticky Header ───────────────────────────────────── */}
      <header className="sticky top-0 z-10 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-semibold tracking-tight truncate">Diagnóstico 360°</span>
              <span className="hidden sm:inline text-xs text-muted-foreground truncate">— {companyName}</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-muted-foreground font-medium tabular-nums whitespace-nowrap">
                {progress.answered}/{progress.total} ({progress.percentage}%)
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/apresentacao", { state: { companyName } })}
                className="gap-1.5 text-xs"
                title="Modo Apresentação"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Apresentação</span>
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAutoFill}
                  className="gap-1.5 text-xs"
                >
                  <Wrench className="w-3.5 h-3.5" /> Preencher
                </Button>
              )}
            </div>
          </div>
          {/* Barra de progresso global + mini dots por área */}
          <div className="space-y-1.5">
            <Progress value={progress.percentage} className="h-2" />
            {/* Indicadores de progresso por área — mini segmentos */}
            <div className="flex gap-1">
              {sortedAreas.map((area) => {
                const ap = progress.byArea.find((p) => p.areaId === area.id);
                const pct = ap && ap.total > 0 ? (ap.answered / ap.total) * 100 : 0;
                const isActive = area.id === activeAreaId;
                return (
                  <div
                    key={area.id}
                    className="flex-1 h-1 rounded-full bg-muted/60 overflow-hidden"
                    title={`${area.name}: ${ap?.answered ?? 0}/${ap?.total ?? 0}`}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isActive ? "bg-primary" : "bg-primary/40"
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
          {/* Tabs — scrollável no mobile */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none" ref={tabsListRef}>
            <TabsList className="w-full flex h-auto p-1 bg-muted/50 rounded-xl gap-1 min-w-max sm:min-w-0">
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
                    className="flex-1 text-xs relative py-2 px-2 sm:px-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all whitespace-nowrap"
                  >
                    <span className="flex flex-col items-center gap-0.5">
                      <span className="flex items-center gap-1">
                        {areaLabel}
                        {isComplete && (
                          <CheckCircle2 className="w-3 h-3 text-current opacity-70" />
                        )}
                      </span>
                      <span className="text-[10px] opacity-60 font-semibold tabular-nums">
                        {areaProgress?.answered ?? 0} de {areaProgress?.total ?? 0}
                      </span>
                    </span>
                    {/* Indicador de conclusão: dot verde embaixo */}
                    {isComplete && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(var(--maturity-5))]" />
                    )}
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
                {/* Area header */}
                <div className="mb-6 mt-4 pb-4 border-b border-border/40">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{area.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Peso: {Math.round(area.weight * 100)}% · {areaQuestions.length} perguntas ·{" "}
                    <span className="font-semibold text-foreground/80">
                      {areaProgress?.answered ?? 0} respondidas
                    </span>
                  </p>
                </div>

                {/* SubArea sections com stagger */}
                <div className="space-y-8">
                  {areaSubAreas.map((subArea, saIndex) => {
                    const saQuestions = areaQuestions.filter(
                      (q) => q.subAreaId === subArea.id
                    );
                    if (saQuestions.length === 0) return null;

                    return (
                      <div key={subArea.id}>
                        {saIndex > 0 && <Separator className="mb-8" />}
                        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 rounded-full bg-primary/60" />
                          {subArea.name}
                        </h3>
                        <div className="space-y-4 animate-stagger">
                          {saQuestions.map((q, qIdx) => {
                            // Descobrir próxima pergunta (pode ser da mesma subárea ou da próxima)
                            let nextQId: string | undefined;
                            if (qIdx < saQuestions.length - 1) {
                              nextQId = saQuestions[qIdx + 1].id;
                            } else {
                              // Próxima subárea da mesma área
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

      {/* ── Bottom Navigation Bar (fixed no mobile) ────────── */}
      <div className="sticky sm:sticky bottom-0 z-10 border-t border-border/50 bg-card/80 backdrop-blur-sm shadow-[0_-2px_10px_-3px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-2">
          <Button
            variant="outline"
            onClick={goToPrevArea}
            disabled={isFirstArea}
            className="gap-1.5 sm:gap-2 h-10 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          {/* Indicador de posição mobile */}
          <span className="text-xs text-muted-foreground font-medium tabular-nums sm:hidden">
            {activeAreaIndex + 1}/{sortedAreas.length}
          </span>

          <div className="flex gap-2">
            {!isLastArea && (
              <Button
                onClick={goToNextArea}
                className={cn(
                  "gap-1.5 sm:gap-2 h-10 text-sm transition-all duration-300",
                  isActiveAreaComplete && "animate-pulse-subtle ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                )}
              >
                <span className="hidden sm:inline">Próxima Área</span>
                <span className="sm:hidden">Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
            {isLastArea && (
              <Button
                onClick={handleFinish}
                disabled={!allAnswered}
                className="gap-1.5 sm:gap-2 h-10 bg-[hsl(var(--maturity-5))] hover:bg-[hsl(var(--maturity-5))]/90 font-semibold text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">Concluir Diagnóstico</span>
                <span className="sm:hidden">Concluir</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

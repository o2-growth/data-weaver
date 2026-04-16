import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { DiagnosticResult, IdentifiedRisk } from "@/types/diagnostic";
import { questions } from "@/data/questions";
import { RadarChart } from "@/components/RadarChart";
import { MaturityBadge } from "@/components/MaturityBadge";
import { RiskCard } from "@/components/RiskCard";
import { QuickWinCard } from "@/components/QuickWinCard";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  RotateCcw,
  BarChart3,
  AlertTriangle,
  Zap,
  Info,
  MessageSquare,
} from "lucide-react";
import { getMaturityInfo, getMaturityColor } from "@/lib/calculations";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { PptxDownloadButton } from "@/components/PptxDownloadButton";

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────

function getMaturityDescription(level: number): string {
  const descriptions: Record<number, string> = {
    1: "A empresa se encontra em estágio crítico de maturidade financeira. Os processos são inexistentes ou altamente informais, apresentando riscos significativos.",
    2: "A empresa possui uma estrutura básica de gestão financeira. Processos iniciais existem, porém ainda são pouco formalizados e dependem de controles manuais.",
    3: "A empresa está em estágio intermediário de maturidade financeira. Processos estão parcialmente estruturados, com oportunidades claras de evolução.",
    4: "A empresa apresenta uma estrutura gerencial sólida. Processos são bem definidos, com controles adequados e bom nível de governança.",
    5: "A empresa atingiu o nível estratégico de maturidade financeira. Processos são plenamente integrados, com análise preditiva e visão de longo prazo.",
  };
  return descriptions[level] || descriptions[1];
}

function getGradeBadgeStyle(grade: number): string {
  if (grade <= 1) return "bg-red-500/15 text-red-400 border-red-500/30";
  if (grade <= 2) return "bg-orange-500/15 text-orange-400 border-orange-500/30";
  if (grade <= 3) return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
  if (grade <= 4) return "bg-blue-500/15 text-blue-400 border-blue-500/30";
  return "bg-[#00E676]/15 text-[#00E676] border-[#00E676]/40";
}

const RISK_FILTER_OPTIONS = ["Todos", "Alto", "Médio", "Baixo"] as const;
type RiskFilter = (typeof RISK_FILTER_OPTIONS)[number];

const maturityScale = [
  { level: 1, label: "Crítica", range: "1.00 - 1.80", description: "Estrutura Crítica" },
  { level: 2, label: "Básica", range: "1.81 - 2.60", description: "Estrutura Básica" },
  { level: 3, label: "Intermediária", range: "2.61 - 3.40", description: "Estrutura Intermediária" },
  { level: 4, label: "Gerencial", range: "3.41 - 4.20", description: "Estrutura Gerencial" },
  { level: 5, label: "Estratégica", range: "4.21 - 5.00", description: "Estrutura Estratégica" },
];

// ────────────────────────────────────────────────────────────
// Gauge — adapted to neon palette
// ────────────────────────────────────────────────────────────

const GAUGE_COLORS = [
  { offset: "0%",   color: "hsl(0, 84%, 60%)" },
  { offset: "25%",  color: "hsl(25, 95%, 53%)" },
  { offset: "50%",  color: "hsl(48, 96%, 53%)" },
  { offset: "75%",  color: "hsl(217, 91%, 60%)" },
  { offset: "100%", color: "#00E676" },
];

function ScoreGauge({ score, maturityLevel, maturityLabel }: { score: number; maturityLevel: number; maturityLabel: string }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const width = 240;
  const height = 140;
  const cx = width / 2;
  const cy = 130;
  const radius = 100;
  const strokeWidth = 16;

  const arcLength = Math.PI * radius;
  const normalizedScore = Math.max(0, Math.min(1, (score - 1) / 4));
  const filledLength = arcLength * normalizedScore;
  const dashOffset = arcLength - filledLength;
  const needleAngle = -90 + normalizedScore * 180;
  const arcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {GAUGE_COLORS.map((c) => (
              <stop key={c.offset} offset={c.offset} stopColor={c.color} />
            ))}
          </linearGradient>
        </defs>

        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <path
          d={arcPath}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={animated ? dashOffset : arcLength}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.34, 1.15, 0.64, 1)" }}
        />

        <g
          style={{
            transform: `rotate(${animated ? needleAngle : -90}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
            transition: "transform 1.2s cubic-bezier(0.34, 1.15, 0.64, 1)",
          }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - radius + strokeWidth / 2 + 4}
            stroke="#FFFFFF"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r={5} fill="#FFFFFF" />
        </g>

        <text x={cx - radius - 4} y={cy + 18} textAnchor="middle" fill="#606060" fontSize="11" fontWeight="500">1.0</text>
        <text x={cx + radius + 4} y={cy + 18} textAnchor="middle" fill="#606060" fontSize="11" fontWeight="500">5.0</text>
      </svg>

      <div className="text-center -mt-14">
        <div className="text-5xl font-black tabular-nums text-white font-display">{score.toFixed(2)}</div>
        <div className="text-xs text-[#606060] mb-2">de 5.00</div>
        <MaturityBadge level={maturityLevel} label={maturityLabel} size="lg" />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Risk Distribution Bar
// ────────────────────────────────────────────────────────────

const RISK_CAT_COLORS: Record<string, string> = {
  "Alto":  "hsl(0, 72%, 50%)",
  "Médio": "hsl(48, 96%, 53%)",
  "Baixo": "#00E676",
};

function RiskDistributionBar({ risks }: { risks: IdentifiedRisk[] }) {
  const counts = useMemo(() => {
    const map: Record<string, number> = { "Alto": 0, "Médio": 0, "Baixo": 0 };
    for (const r of risks) {
      if (map[r.riskCategory] !== undefined) map[r.riskCategory]++;
    }
    return map;
  }, [risks]);

  const total = risks.length;
  if (total === 0) return null;
  const categories = ["Alto", "Médio", "Baixo"].filter((cat) => counts[cat] > 0);

  return (
    <div className="space-y-3">
      <div className="flex h-8 rounded-xl overflow-hidden border border-white/8">
        {categories.map((cat) => {
          const pct = (counts[cat] / total) * 100;
          return (
            <div
              key={cat}
              className="risk-bar-segment flex items-center justify-center text-xs font-bold text-[#0A0A0A]"
              style={{
                width: `${pct}%`,
                backgroundColor: RISK_CAT_COLORS[cat],
                minWidth: pct > 0 ? "2rem" : 0,
              }}
              title={`${cat}: ${counts[cat]}`}
            >
              {counts[cat]}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-[#A0A0A0]">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: RISK_CAT_COLORS[cat] }} />
            <span>{cat}</span>
            <span className="font-semibold text-white">{counts[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AreaMiniBar({ score, maturityLevel }: { score: number; maturityLevel: number }) {
  const widthPct = Math.max(2, (score / 5) * 100);
  const color = getMaturityColor(maturityLevel);
  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${widthPct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums w-9 text-right text-white">{score.toFixed(2)}</span>
    </div>
  );
}

function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.05 }
    );

    const mutationObs = new MutationObserver(() => {
      const sections = el.querySelectorAll(".scroll-fade-in:not(.is-visible)");
      sections.forEach((s) => observer.observe(s));
    });
    mutationObs.observe(el, { childList: true, subtree: true });

    const sections = el.querySelectorAll(".scroll-fade-in");
    sections.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      mutationObs.disconnect();
    };
  }, []);

  return ref;
}

// ────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = (location.state as { result?: DiagnosticResult } | null)?.result;

  const [riskFilter, setRiskFilter] = useState<RiskFilter>("Todos");
  const containerRef = useScrollFadeIn();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const filteredRisks = useMemo(() => {
    if (!result) return [];
    const sorted = [...result.identifiedRisks].sort((a, b) => b.riskScore - a.riskScore);
    if (riskFilter === "Todos") return sorted;
    return sorted.filter((r) => r.riskCategory === riskFilter);
  }, [result, riskFilter]);

  const questionsByArea = useMemo(() => {
    const map: Record<string, typeof questions> = {};
    if (!result) return map;
    for (const area of result.areaScores) {
      map[area.areaId] = questions.filter((q) => q.areaId === area.areaId);
    }
    return map;
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen lp-bg text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[#A0A0A0]">Nenhum resultado encontrado.</p>
          <button onClick={() => navigate("/")} className="btn-neon-primary">Voltar ao Início</button>
        </div>
      </div>
    );
  }

  const radarData = result.areaScores.map((a) => ({
    name: a.areaName.length > 18 ? a.areaName.substring(0, 18) + "..." : a.areaName,
    score: a.score,
    fullMark: 5,
  }));

  const formattedDate = new Date(result.datePerformed).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen lp-bg text-white flex flex-col" ref={containerRef}>
      {/* Header */}
      <header className="sticky top-0 z-10 lp-header">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center flex-shrink-0">
              <span className="text-[#0A0A0A] font-black text-xs">O2</span>
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold tracking-tight block truncate">
                Grau de <span className="gradient-text-neon">Maturidade</span>
              </span>
              <p className="text-[10px] text-[#A0A0A0] truncate">{result.companyName} &middot; {formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <PdfDownloadButton result={result} />
            <PptxDownloadButton result={result} />
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-3 h-9 rounded-xl border border-white/12 text-white text-xs font-semibold hover:border-white/25 hover:bg-white/5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Novo
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 space-y-12">
        {/* SECTION 1: Hero with global score */}
        <section className="space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <span className="eyebrow-pill">Resultado Final</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight font-display">
              {result.companyName}
            </h1>
            <p className="text-[#A0A0A0]">
              <span className="gradient-text-neon font-semibold">Grau de Maturidade</span> Financeira &middot;{" "}
              {result.answeredQuestions}/{result.totalQuestions} perguntas respondidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <GlassCard className="md:col-span-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <ScoreGauge
                score={result.globalScore}
                maturityLevel={result.maturityLevel}
                maturityLabel={result.maturityLabel}
              />
              <div className="h-px w-full bg-white/8" />
              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                {getMaturityDescription(result.maturityLevel)}
              </p>
            </GlassCard>

            {/* Radar */}
            <GlassCard className="md:col-span-2 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00E676]" />
                <span className="eyebrow-pill text-[10px]">Visão por Área</span>
              </div>
              <RadarChart data={radarData} />
              <div className="space-y-2">
                {result.areaScores.map((area) => (
                  <div key={area.areaId} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#A0A0A0] w-40 truncate shrink-0" title={area.areaName}>
                      {area.areaName}
                    </span>
                    <AreaMiniBar score={area.score} maturityLevel={area.maturityLevel} />
                    <Badge variant="outline" className="text-[10px] rounded-full border-white/15 text-[#A0A0A0] shrink-0">
                      {(area.weight * 100).toFixed(0)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* SECTION 2: Detailed by Area */}
        <section className="space-y-5 scroll-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-white/8">
            <BarChart3 className="w-5 h-5 text-[#00E676]" />
            <h2 className="text-2xl font-black tracking-tight font-display">Detalhamento por Área</h2>
          </div>

          <Tabs defaultValue={result.areaScores[0]?.areaId ?? ""} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 p-1 bg-white/[0.03] border border-white/8 rounded-xl">
              {result.areaScores.map((area) => (
                <TabsTrigger
                  key={area.areaId}
                  value={area.areaId}
                  className="text-xs rounded-lg text-[#A0A0A0] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4CAF50] data-[state=active]:to-[#00E676] data-[state=active]:text-[#0A0A0A] data-[state=active]:font-bold transition-all"
                >
                  {area.areaName}
                </TabsTrigger>
              ))}
            </TabsList>

            {result.areaScores.map((area) => {
              const info = getMaturityInfo(area.score);
              const areaQuestions = questionsByArea[area.areaId] ?? [];

              return (
                <TabsContent key={area.areaId} value={area.areaId} className="space-y-4 animate-tab-enter">
                  <GlassCard className="p-5 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold tracking-tight text-white">{area.areaName}</h3>
                        <p className="text-xs text-[#A0A0A0]">
                          Peso no score global: <span className="text-[#7EBF8E] font-semibold">{(area.weight * 100).toFixed(0)}%</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black tabular-nums text-white">{area.score.toFixed(2)}</span>
                        <MaturityBadge level={info.level} label={info.label} size="md" />
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#4CAF50] to-[#00E676] transition-all duration-700"
                        style={{ width: `${(area.score / 5) * 100}%` }}
                      />
                    </div>
                  </GlassCard>

                  {area.subAreaScores.length > 0 && (
                    <GlassCard className="overflow-hidden">
                      <div className="px-5 py-3 border-b border-white/8">
                        <span className="eyebrow-pill text-[10px]">Subáreas</span>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/8 hover:bg-transparent">
                            <TableHead className="text-[#A0A0A0]">Subárea</TableHead>
                            <TableHead className="text-center w-24 text-[#A0A0A0]">Score</TableHead>
                            <TableHead className="text-center w-36 text-[#A0A0A0]">Nível</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {area.subAreaScores.map((sub) => {
                            const subInfo = getMaturityInfo(sub.score);
                            return (
                              <TableRow key={sub.subAreaId} className="border-white/8 hover:bg-white/[0.02]">
                                <TableCell className="font-medium text-white">{sub.subAreaName}</TableCell>
                                <TableCell className="text-center font-bold text-white tabular-nums">
                                  {sub.score.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center">
                                  <MaturityBadge level={subInfo.level} label={subInfo.label} size="sm" />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </GlassCard>
                  )}

                  {areaQuestions.length > 0 && (
                    <GlassCard className="overflow-hidden">
                      <div className="px-5 py-3 border-b border-white/8">
                        <span className="eyebrow-pill text-[10px]">Perguntas Respondidas</span>
                      </div>
                      <div className="divide-y divide-white/8">
                        {areaQuestions.map((q) => {
                          const answer = result.answers[q.id];
                          if (!answer) return null;
                          return (
                            <div key={q.id} className="p-4 space-y-2">
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 flex-1">
                                  <p className="text-sm font-medium text-white">
                                    <span className="text-[#7EBF8E] mr-2 font-bold">{q.number}</span>
                                    {q.text}
                                  </p>
                                  <p className="text-xs text-[#A0A0A0]">{answer.optionText}</p>
                                </div>
                                <Badge className={`shrink-0 border ${getGradeBadgeStyle(answer.grade)}`}>
                                  {answer.grade}/5
                                </Badge>
                              </div>
                              {answer.observation && (
                                <div className="flex items-start gap-2 bg-white/[0.02] border border-white/8 rounded-lg p-2">
                                  <MessageSquare className="w-3.5 h-3.5 text-[#7EBF8E] mt-0.5 shrink-0" />
                                  <p className="text-xs text-[#A0A0A0] italic">{answer.observation}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </GlassCard>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        {/* SECTION 3: Risks */}
        <section className="space-y-4 scroll-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-white/8">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-2xl font-black tracking-tight font-display">Matriz de Riscos Identificados</h2>
            <Badge className="ml-auto text-xs rounded-full bg-white/5 text-[#A0A0A0] border-white/10">
              {result.identifiedRisks.length} risco(s)
            </Badge>
          </div>
          <p className="text-sm text-[#A0A0A0]">
            {result.identifiedRisks.length > 0
              ? `${result.identifiedRisks.length} risco(s) identificado(s) no diagnóstico, ordenados por criticidade.`
              : "Nenhum risco identificado — todas as áreas estão com boa maturidade."}
          </p>

          <GlassCard className="p-4">
            <p className="text-[10px] font-bold text-[#7EBF8E] uppercase tracking-widest mb-3">
              Distribuição de Riscos
            </p>
            <RiskDistributionBar risks={result.identifiedRisks} />
          </GlassCard>

          <div className="flex flex-wrap gap-2">
            {RISK_FILTER_OPTIONS.map((filter) => {
              const count = filter === "Todos"
                ? result.identifiedRisks.length
                : result.identifiedRisks.filter((r) => r.riskCategory === filter).length;
              const isActive = riskFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setRiskFilter(filter)}
                  className={`inline-flex items-center gap-1.5 h-8 px-4 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#4CAF50] to-[#00E676] text-[#0A0A0A] shadow-lg shadow-[#4CAF50]/30"
                      : "border border-white/12 text-white hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  {filter}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-[#0A0A0A]/20" : "bg-white/10"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filteredRisks.length === 0 ? (
              <GlassCard className="p-6 text-center">
                <p className="text-sm text-[#A0A0A0]">Nenhum risco encontrado para o filtro selecionado.</p>
              </GlassCard>
            ) : (
              filteredRisks.map((risk, idx) => (
                <RiskCard key={`${risk.questionId}-${risk.grade}`} risk={risk} index={idx} />
              ))
            )}
          </div>
        </section>

        {/* SECTION 4: Quick Wins */}
        <section className="space-y-4 scroll-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-white/8">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h2 className="text-2xl font-black tracking-tight font-display">Quick Wins</h2>
            <Badge className="ml-auto text-xs rounded-full bg-white/5 text-[#A0A0A0] border-white/10">
              {result.quickWins.length} ação(ões)
            </Badge>
          </div>
          {result.quickWins.length > 0 ? (
            <>
              <p className="text-sm text-[#A0A0A0]">
                {result.quickWins.length} ação(ões) de alto impacto identificada(s) com base nas respostas de maior criticidade.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {result.quickWins.map((qw, idx) => (
                  <QuickWinCard key={qw.questionId} quickWin={qw} rank={idx + 1} />
                ))}
              </div>
            </>
          ) : (
            <GlassCard className="p-6 text-center">
              <p className="text-sm text-[#A0A0A0]">
                Nenhum quick win identificado — a empresa não possui áreas com maturidade crítica e risco alto simultâneo.
              </p>
            </GlassCard>
          )}
        </section>

        {/* SECTION 5: Maturity Scale */}
        <section className="space-y-4 scroll-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-white/8">
            <Info className="w-5 h-5 text-[#00E676]" />
            <h2 className="text-2xl font-black tracking-tight font-display">Escala de Maturidade</h2>
          </div>

          <GlassCard className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {maturityScale.map((item) => {
                const isCurrentLevel = item.level === result.maturityLevel;
                return (
                  <div
                    key={item.level}
                    className={`text-center p-4 rounded-xl border transition-all duration-300 ${
                      isCurrentLevel
                        ? "border-[#00E676]/60 bg-[#00E676]/8 ring-2 ring-[#00E676]/20 scale-[1.03]"
                        : "border-white/8 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-[#0A0A0A] text-sm font-black shadow-lg"
                      style={{ backgroundColor: getMaturityColor(item.level) }}
                    >
                      {item.level}
                    </div>
                    <div className={`text-xs font-bold ${isCurrentLevel ? "text-[#00E676]" : "text-white"}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-[#A0A0A0] mt-0.5">{item.description}</div>
                    <div className="text-[10px] text-[#606060] tabular-nums">{item.range}</div>
                    {isCurrentLevel && (
                      <Badge className="mt-2 text-[10px] bg-[#00E676]/15 text-[#00E676] border-transparent">
                        Nivel Atual
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </section>

        <div className="pb-8" />
      </main>
    </div>
  );
}

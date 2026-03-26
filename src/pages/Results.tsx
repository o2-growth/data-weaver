import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { DiagnosticResult, IdentifiedRisk } from "@/types/diagnostic";
import { questions } from "@/data/questions";
import { RadarChart } from "@/components/RadarChart";
import { MaturityBadge } from "@/components/MaturityBadge";
import { RiskCard } from "@/components/RiskCard";
import { QuickWinCard } from "@/components/QuickWinCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
// Helpers locais
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
  if (grade <= 1) return "bg-red-900/20 text-red-400 border-red-500/40";
  if (grade <= 2) return "bg-orange-900/20 text-orange-400 border-orange-500/40";
  if (grade <= 3) return "bg-yellow-900/20 text-yellow-400 border-yellow-500/40";
  if (grade <= 4) return "bg-blue-900/20 text-blue-400 border-blue-500/40";
  return "bg-green-900/20 text-green-400 border-green-500/40";
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
// Gauge SVG semicircular
// ────────────────────────────────────────────────────────────

const GAUGE_COLORS = [
  { offset: "0%", color: "hsl(0, 84%, 60%)" },    // vermelho
  { offset: "25%", color: "hsl(25, 95%, 53%)" },   // laranja
  { offset: "50%", color: "hsl(48, 96%, 53%)" },   // amarelo
  { offset: "75%", color: "hsl(217, 91%, 60%)" },  // azul
  { offset: "100%", color: "hsl(142, 71%, 45%)" }, // verde
];

function ScoreGauge({ score, maturityLevel, maturityLabel }: { score: number; maturityLevel: number; maturityLabel: string }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parametros do arco
  const width = 240;
  const height = 140;
  const cx = width / 2;
  const cy = 130;
  const radius = 100;
  const strokeWidth = 16;

  // Arco semicircular (180 graus, da esquerda para a direita)
  const arcLength = Math.PI * radius; // comprimento do semicirculo
  const normalizedScore = Math.max(0, Math.min(1, (score - 1) / 4)); // 1-5 mapeado para 0-1
  const filledLength = arcLength * normalizedScore;
  const dashOffset = arcLength - filledLength;

  // Angulo da agulha: -90 (esquerda, score=1) ate 90 (direita, score=5)
  const needleAngle = -90 + normalizedScore * 180;

  // Path do semicirculo
  const arcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  const maturityColor = getMaturityColor(maturityLevel);

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

        {/* Trilha de fundo */}
        <path
          d={arcPath}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Arco preenchido com gradiente */}
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

        {/* Agulha / Marcador */}
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
            stroke="hsl(var(--foreground))"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r={5} fill="hsl(var(--foreground))" />
        </g>

        {/* Labels 1.0 e 5.0 */}
        <text
          x={cx - radius - 4}
          y={cy + 18}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="11"
          fontWeight="500"
        >
          1.0
        </text>
        <text
          x={cx + radius + 4}
          y={cy + 18}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="11"
          fontWeight="500"
        >
          5.0
        </text>
      </svg>

      {/* Score centralizado */}
      <div className="text-center -mt-14">
        <div className="text-4xl font-extrabold tabular-nums">{score.toFixed(2)}</div>
        <div className="text-xs text-muted-foreground mb-2">de 5.00</div>
        <MaturityBadge level={maturityLevel} label={maturityLabel} size="lg" />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Risk Distribution Bar
// ────────────────────────────────────────────────────────────

const RISK_CAT_COLORS: Record<string, string> = {
  "Alto": "hsl(0, 72%, 40%)",
  "Médio": "hsl(48, 96%, 53%)",
  "Baixo": "hsl(142, 71%, 45%)",
};

function RiskDistributionBar({ risks }: { risks: IdentifiedRisk[] }) {
  const counts = useMemo(() => {
    const map: Record<string, number> = { "Alto": 0, "Médio": 0, "Baixo": 0 };
    for (const r of risks) {
      if (map[r.riskCategory] !== undefined) {
        map[r.riskCategory]++;
      }
    }
    return map;
  }, [risks]);

  const total = risks.length;
  if (total === 0) return null;

  const categories = ["Alto", "Médio", "Baixo"].filter(
    (cat) => counts[cat] > 0
  );

  return (
    <div className="space-y-3">
      {/* Barra empilhada */}
      <div className="flex h-8 rounded-lg overflow-hidden border border-border/40">
        {categories.map((cat) => {
          const pct = (counts[cat] / total) * 100;
          return (
            <div
              key={cat}
              className="risk-bar-segment flex items-center justify-center text-xs font-bold text-white"
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

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ backgroundColor: RISK_CAT_COLORS[cat] }}
            />
            <span>{cat}</span>
            <span className="font-semibold text-foreground">{counts[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Area Score Mini Bar
// ────────────────────────────────────────────────────────────

function AreaMiniBar({ score, maturityLevel }: { score: number; maturityLevel: number }) {
  const widthPct = Math.max(2, (score / 5) * 100);
  const color = getMaturityColor(maturityLevel);
  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className="flex-1 h-2 rounded-full bg-muted/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${widthPct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums w-9 text-right">{score.toFixed(2)}</span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Hook para animar seções ao scroll (IntersectionObserver)
// ────────────────────────────────────────────────────────────

function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.05 }
    );

    // MutationObserver para detectar novas seções renderizadas condicionalmente
    const mutationObs = new MutationObserver(() => {
      const sections = el.querySelectorAll(".scroll-fade-in:not(.is-visible)");
      sections.forEach((s) => observer.observe(s));
    });
    mutationObs.observe(el, { childList: true, subtree: true });

    // Observar seções existentes
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
// Componente principal
// ────────────────────────────────────────────────────────────

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = (location.state as { result?: DiagnosticResult } | null)?.result;

  const [riskFilter, setRiskFilter] = useState<RiskFilter>("Todos");
  const containerRef = useScrollFadeIn();

  // Scroll to top ao montar a página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  // Redirecionar se não houver resultado
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Nenhum resultado encontrado.</p>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  // Dados para o radar
  const radarData = result.areaScores.map((a) => ({
    name: a.areaName.length > 18 ? a.areaName.substring(0, 18) + "..." : a.areaName,
    score: a.score,
    fullMark: 5,
  }));

  // Riscos filtrados
  const filteredRisks = useMemo(() => {
    const sorted = [...result.identifiedRisks].sort((a, b) => b.riskScore - a.riskScore);
    if (riskFilter === "Todos") return sorted;
    return sorted.filter((r) => r.riskCategory === riskFilter);
  }, [result.identifiedRisks, riskFilter]);

  // Questões por área (memoizado)
  const questionsByArea = useMemo(() => {
    const map: Record<string, typeof questions> = {};
    for (const area of result.areaScores) {
      map[area.areaId] = questions.filter((q) => q.areaId === area.areaId);
    }
    return map;
  }, [result.areaScores]);

  // Formatar data
  const formattedDate = new Date(result.datePerformed).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col" ref={containerRef}>
      {/* ──────────────────────────────────────────── */}
      {/* SECTION 1: Header */}
      {/* ──────────────────────────────────────────── */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <span className="text-lg font-bold">Diagnóstico 360° — CFO</span>
              <p className="text-xs text-muted-foreground">{result.companyName} &middot; {formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PdfDownloadButton result={result} />
            <PptxDownloadButton result={result} />
            <Button variant="outline" size="sm" onClick={() => navigate("/")} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Novo Diagnóstico
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 space-y-8">
        {/* ──────────────────────────────────────────── */}
        {/* SECTION 2: Global Score Card */}
        {/* ──────────────────────────────────────────── */}
        <section className="space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">{result.companyName}</h1>
            <p className="text-muted-foreground">
              Resultado do Diagnóstico Financeiro{" "}
              <span className="font-semibold text-primary">360°</span> &middot;{" "}
              {result.answeredQuestions}/{result.totalQuestions} perguntas respondidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Score Gauge semicircular */}
            <Card className="md:col-span-1 border-border/40 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <ScoreGauge
                  score={result.globalScore}
                  maturityLevel={result.maturityLevel}
                  maturityLabel={result.maturityLabel}
                />
                <Separator className="bg-border/40" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getMaturityDescription(result.maturityLevel)}
                </p>
              </CardContent>
            </Card>

            {/* ──────────────────────────────────────────── */}
            {/* SECTION 3: Radar Chart */}
            {/* ──────────────────────────────────────────── */}
            <Card className="md:col-span-2 border-border/40 shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Visão Geral por Área
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <RadarChart data={radarData} />
                {/* Area scores com mini-bars */}
                <div className="space-y-2">
                  {result.areaScores.map((area) => (
                    <div key={area.areaId} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground w-40 truncate shrink-0" title={area.areaName}>
                        {area.areaName}
                      </span>
                      <AreaMiniBar score={area.score} maturityLevel={area.maturityLevel} />
                      <Badge variant="outline" className="text-[10px] rounded-full border-border/50 shrink-0">
                        {(area.weight * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ──────────────────────────────────────────── */}
        {/* SECTION 4: Detailed Scores by Area (Tabs) */}
        {/* ──────────────────────────────────────────── */}
        <section className="space-y-4 scroll-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-border/40">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Detalhamento por Área</h2>
          </div>

          <Tabs defaultValue={result.areaScores[0]?.areaId ?? ""} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 p-1 bg-muted/50 rounded-xl">
              {result.areaScores.map((area) => (
                <TabsTrigger
                  key={area.areaId}
                  value={area.areaId}
                  className="text-xs rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
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
                  {/* Area Overview Card */}
                  <Card className="border-border/40 shadow-sm">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold tracking-tight">{area.areaName}</h3>
                          <p className="text-xs text-muted-foreground">
                            Peso no score global: {(area.weight * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold tabular-nums">{area.score.toFixed(2)}</span>
                          <MaturityBadge level={info.level} label={info.label} size="md" />
                        </div>
                      </div>
                      <Progress value={(area.score / 5) * 100} className="h-2" />
                    </CardContent>
                  </Card>

                  {/* SubArea Table */}
                  {area.subAreaScores.length > 0 && (
                    <Card className="border-border/40 shadow-sm overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">Subáreas</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subárea</TableHead>
                              <TableHead className="text-center w-24">Score</TableHead>
                              <TableHead className="text-center w-36">Nível</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {area.subAreaScores.map((sub) => {
                              const subInfo = getMaturityInfo(sub.score);
                              return (
                                <TableRow key={sub.subAreaId}>
                                  <TableCell className="font-medium">{sub.subAreaName}</TableCell>
                                  <TableCell className="text-center font-semibold">
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
                      </CardContent>
                    </Card>
                  )}

                  {/* Questions Detail */}
                  {areaQuestions.length > 0 && (
                    <Card className="border-border/40 shadow-sm overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">Perguntas Respondidas</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                          {areaQuestions.map((q) => {
                            const answer = result.answers[q.id];
                            if (!answer) return null;

                            return (
                              <div key={q.id} className="p-4 space-y-2">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="space-y-1 flex-1">
                                    <p className="text-sm font-medium">
                                      <span className="text-muted-foreground mr-2">{q.number}</span>
                                      {q.text}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{answer.optionText}</p>
                                  </div>
                                  <Badge
                                    className={`shrink-0 border ${getGradeBadgeStyle(answer.grade)}`}
                                  >
                                    {answer.grade}/5
                                  </Badge>
                                </div>
                                {answer.observation && (
                                  <div className="flex items-start gap-2 bg-muted/30 rounded-md p-2">
                                    <MessageSquare className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                                    <p className="text-xs text-muted-foreground italic">
                                      {answer.observation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        {/* ──────────────────────────────────────────── */}
        {/* SECTION 5: Risk Matrix Panel */}
        {/* ──────────────────────────────────────────── */}
        <section className="space-y-4 scroll-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-bold tracking-tight">Matriz de Riscos Identificados</h2>
              <Badge variant="outline" className="ml-auto text-xs rounded-full">
                {result.identifiedRisks.length} risco(s)
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {result.identifiedRisks.length > 0
                ? `${result.identifiedRisks.length} risco(s) identificado(s) no diagnóstico, ordenados por criticidade.`
                : "Nenhum risco identificado — todas as áreas estão com boa maturidade."}
            </p>

            {/* Risk Distribution Bar */}
            <Card className="border-border/40 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Distribuição de Riscos
                </p>
                <RiskDistributionBar risks={result.identifiedRisks} />
              </CardContent>
            </Card>

            {/* Filter tabs - pill style */}
            <div className="flex flex-wrap gap-2">
              {RISK_FILTER_OPTIONS.map((filter) => {
                const count = filter === "Todos"
                  ? result.identifiedRisks.length
                  : result.identifiedRisks.filter((r) => r.riskCategory === filter).length;
                return (
                  <Button
                    key={filter}
                    variant={riskFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRiskFilter(filter)}
                    className="text-xs rounded-full gap-1.5 h-8"
                  >
                    {filter}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${riskFilter === filter ? "bg-primary-foreground/20" : "bg-muted"}`}>
                      {count}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Risk cards */}
            <div className="space-y-3">
              {filteredRisks.length === 0 ? (
                <Card className="border-border/40 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Nenhum risco encontrado para o filtro selecionado.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredRisks.map((risk, idx) => (
                  <RiskCard key={`${risk.questionId}-${risk.grade}`} risk={risk} index={idx} />
                ))
              )}
            </div>
          </section>

        {/* ──────────────────────────────────────────── */}
        {/* SECTION 6: Quick Wins Panel */}
        {/* ──────────────────────────────────────────── */}
        <section className="space-y-4 scroll-fade-in">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-bold tracking-tight">Quick Wins — Ações de Impacto Rápido</h2>
              <Badge variant="outline" className="ml-auto text-xs rounded-full">
                {result.quickWins.length} ação(ões)
              </Badge>
            </div>
            {result.quickWins.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {result.quickWins.length} ação(ões) de alto impacto identificada(s) com base nas respostas de maior criticidade.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.quickWins.map((qw, idx) => (
                    <QuickWinCard key={qw.questionId} quickWin={qw} rank={idx + 1} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="border-border/40 shadow-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Nenhum quick win identificado — a empresa não possui áreas com maturidade crítica e risco alto simultâneo.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>

        {/* ──────────────────────────────────────────── */}
        {/* SECTION 7: Maturity Scale Legend */}
        {/* ──────────────────────────────────────────── */}
        <section className="space-y-4 scroll-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-border/40">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Escala de Maturidade</h2>
          </div>

          <Card className="border-border/40 shadow-sm">
            <CardContent className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {maturityScale.map((item) => {
                  const isCurrentLevel = item.level === result.maturityLevel;
                  return (
                    <div
                      key={item.level}
                      className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                        isCurrentLevel
                          ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm scale-[1.02]"
                          : "border-border/30 bg-muted/20 hover:border-border/60"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold shadow-sm"
                        style={{ backgroundColor: getMaturityColor(item.level) }}
                      >
                        {item.level}
                      </div>
                      <div className={`text-xs font-semibold ${isCurrentLevel ? "text-primary" : ""}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.description}</div>
                      <div className="text-[10px] text-muted-foreground tabular-nums">{item.range}</div>
                      {isCurrentLevel && (
                        <Badge className="mt-2 text-[10px] bg-primary/20 text-primary border-transparent hover:bg-primary/20">
                          Nivel Atual
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer spacing */}
        <div className="pb-8" />
      </main>
    </div>
  );
}

// ============================================================
// Diagnóstico 360° — Motor de Cálculos
// Fase 1: Lógica de negócio usando dados reais (src/data/)
// ============================================================

import { areas } from '@/data/areas';
import { subAreas } from '@/data/subareas';
import { questions } from '@/data/questions';
import { riskMatrix } from '@/data/riskMatrix';
import { getMaturityLevel } from '@/data/maturityScale';
import type { RiskMatrixEntry } from '@/data/riskMatrix';
import type {
  Answer,
  AreaScore,
  SubAreaScore,
  IdentifiedRisk,
  QuickWin,
  DiagnosticResult,
} from '@/types/diagnostic';

// ────────────────────────────────────────────────────────────
// Cálculo de scores por área e subárea
// ────────────────────────────────────────────────────────────

export function calculateAreaScores(
  answers: Record<string, Answer>
): AreaScore[] {
  return areas.map((area) => {
    // Perguntas desta área
    const areaQuestions = questions.filter((q) => q.areaId === area.id);

    // Subáreas desta área
    const areaSubAreas = subAreas.filter((sa) => sa.areaId === area.id);

    // Calcular score por subárea
    const subAreaScores: SubAreaScore[] = areaSubAreas.map((sa) => {
      const saQuestions = areaQuestions.filter((q) => q.subAreaId === sa.id);
      const answeredGrades = saQuestions
        .map((q) => answers[q.id]?.grade)
        .filter((g): g is number => g !== undefined && g !== null);

      const score =
        answeredGrades.length > 0
          ? answeredGrades.reduce((sum, g) => sum + g, 0) / answeredGrades.length
          : 0;

      return {
        subAreaId: sa.id,
        subAreaName: sa.name,
        score: Math.round(score * 100) / 100,
        questionCount: saQuestions.length,
      };
    });

    // Score da área = média das notas de todas as perguntas respondidas da área
    const allAnsweredGrades = areaQuestions
      .map((q) => answers[q.id]?.grade)
      .filter((g): g is number => g !== undefined && g !== null);

    const areaScore =
      allAnsweredGrades.length > 0
        ? allAnsweredGrades.reduce((sum, g) => sum + g, 0) / allAnsweredGrades.length
        : 0;

    const roundedScore = Math.round(areaScore * 100) / 100;
    const maturity = getMaturityInfo(roundedScore);

    return {
      areaId: area.id,
      areaName: area.name,
      weight: area.weight,
      score: roundedScore,
      maturityLevel: maturity.level,
      maturityLabel: maturity.label,
      subAreaScores,
    };
  });
}

// ────────────────────────────────────────────────────────────
// Cálculo do score global ponderado
// ────────────────────────────────────────────────────────────

export function calculateGlobalScore(
  areaScores: AreaScore[]
): { score: number; level: number; label: string } {
  const weightedSum = areaScores.reduce(
    (sum, as_) => sum + as_.score * as_.weight,
    0
  );
  const rounded = Math.round(weightedSum * 100) / 100;
  const maturity = getMaturityInfo(rounded);

  return {
    score: rounded,
    level: maturity.level,
    label: maturity.label,
  };
}

// ────────────────────────────────────────────────────────────
// Identificação de riscos via Matriz de Risco
// ────────────────────────────────────────────────────────────

export function identifyRisks(
  answers: Record<string, Answer>
): IdentifiedRisk[] {
  const risks: IdentifiedRisk[] = [];

  for (const answer of Object.values(answers)) {
    const entry = findRiskEntry(answer.questionId, answer.grade);
    if (!entry) continue;

    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const area = areas.find((a) => a.id === question.areaId);
    const subArea = subAreas.find((sa) => sa.id === question.subAreaId);

    risks.push({
      questionId: answer.questionId,
      questionText: question.text,
      areaName: area?.name ?? '',
      subAreaName: subArea?.name ?? '',
      grade: answer.grade,
      riskScore: entry.riskScore,
      riskCategory: entry.riskCategory,
      riskNarrative: entry.riskNarrative,
      controls: entry.controls,
      actionPlan: entry.actionPlan,
      impact: entry.impact,
      probability: entry.probability,
    });
  }

  // Ordenar por riskScore descendente
  risks.sort((a, b) => b.riskScore - a.riskScore);

  return risks;
}

// ────────────────────────────────────────────────────────────
// Geração de Quick Wins
// ────────────────────────────────────────────────────────────

export function generateQuickWins(
  answers: Record<string, Answer>,
  risks: IdentifiedRisk[]
): QuickWin[] {
  // Filtrar: grade <= 2 AND riskScore >= 6
  const quickWinRisks = risks.filter(
    (r) => r.grade <= 2 && r.riskScore >= 6
  );

  const quickWins: QuickWin[] = quickWinRisks.map((risk) => {
    const effort = estimateEffort(risk);
    const impact = estimateImpact(risk);
    const priority = calculatePriority(impact, effort);

    return {
      questionId: risk.questionId,
      questionText: risk.questionText,
      areaName: risk.areaName,
      currentGrade: risk.grade,
      riskScore: risk.riskScore,
      actionPlan: risk.actionPlan,
      estimatedEffort: effort,
      estimatedImpact: impact,
      priority,
    };
  });

  // Ordenar por prioridade descendente (maior = mais prioritário)
  quickWins.sort((a, b) => b.priority - a.priority);

  return quickWins;
}

// ────────────────────────────────────────────────────────────
// Função principal: orquestra todos os cálculos
// ────────────────────────────────────────────────────────────

export function calculateResults(
  companyName: string,
  answers: Record<string, Answer>
): DiagnosticResult {
  const areaScores = calculateAreaScores(answers);
  const global = calculateGlobalScore(areaScores);
  const identifiedRisks = identifyRisks(answers);
  const quickWins = generateQuickWins(answers, identifiedRisks);

  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;

  return {
    companyName,
    datePerformed: new Date().toISOString(),
    answers,
    areaScores,
    globalScore: global.score,
    maturityLevel: global.level,
    maturityLabel: global.label,
    identifiedRisks,
    quickWins,
    totalQuestions,
    answeredQuestions,
  };
}

// ────────────────────────────────────────────────────────────
// Funções auxiliares
// ────────────────────────────────────────────────────────────

/** Busca entrada na matriz de risco para uma pergunta + nota */
export function findRiskEntry(
  questionId: string,
  grade: number
): RiskMatrixEntry | undefined {
  return riskMatrix.find(
    (entry) => entry.questionId === questionId && entry.grade === grade
  );
}

/** Determina nível de maturidade com base na nota */
export function getMaturityInfo(score: number): { level: number; label: string } {
  if (score <= 1.8) return { level: 1, label: 'Crítica' };
  if (score <= 2.6) return { level: 2, label: 'Básica' };
  if (score <= 3.4) return { level: 3, label: 'Intermediária' };
  if (score <= 4.2) return { level: 4, label: 'Gerencial' };
  return { level: 5, label: 'Estratégica' };
}

/** Cor associada ao nível de maturidade */
export function getMaturityColor(level: number): string {
  const colors: Record<number, string> = {
    1: 'hsl(0, 84%, 60%)',
    2: 'hsl(25, 95%, 53%)',
    3: 'hsl(48, 96%, 53%)',
    4: 'hsl(217, 91%, 60%)',
    5: 'hsl(142, 71%, 45%)',
  };
  return colors[level] || colors[1];
}

/** Estima esforço com base no impacto e probabilidade */
function estimateEffort(risk: IdentifiedRisk): 'baixo' | 'médio' | 'alto' {
  // Lógica: grade 1 com alto impacto = alto esforço
  // grade 2 com impacto moderado = médio esforço
  if (risk.impact >= 3 && risk.grade === 1) return 'alto';
  if (risk.impact >= 2 && risk.grade === 1) return 'médio';
  if (risk.impact >= 3 && risk.grade === 2) return 'médio';
  return 'baixo';
}

/** Estima impacto da ação corretiva */
function estimateImpact(risk: IdentifiedRisk): 'baixo' | 'médio' | 'alto' {
  if (risk.riskScore >= 9) return 'alto';
  if (risk.riskScore >= 6) return 'alto';
  if (risk.riskScore >= 4) return 'médio';
  return 'baixo';
}

/** Calcula prioridade numérica (impacto / esforço) */
function calculatePriority(
  impact: 'baixo' | 'médio' | 'alto',
  effort: 'baixo' | 'médio' | 'alto'
): number {
  const impactValues: Record<string, number> = { baixo: 1, médio: 2, alto: 3 };
  const effortValues: Record<string, number> = { baixo: 1, médio: 2, alto: 3 };

  // Prioridade = impacto / esforço (quanto maior, mais prioritário)
  const impactVal = impactValues[impact] ?? 1;
  const effortVal = effortValues[effort] ?? 1;

  return Math.round((impactVal / effortVal) * 100) / 100;
}

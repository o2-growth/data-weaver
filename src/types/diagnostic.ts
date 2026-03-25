// ============================================================
// Diagnóstico 360° — Tipos do Core Engine
// Fase 1: Interfaces completas para toda a plataforma
// ============================================================

/** Resposta dada pelo usuário a uma pergunta */
export interface Answer {
  questionId: string;
  grade: number;           // 1-5
  optionText: string;      // Texto descritivo selecionado
  observation?: string;    // Notas do CFO
}

/** Score calculado para uma subárea */
export interface SubAreaScore {
  subAreaId: string;
  subAreaName: string;
  score: number;
  questionCount: number;
}

/** Score calculado para uma área */
export interface AreaScore {
  areaId: string;
  areaName: string;
  weight: number;
  score: number;           // Média das notas (1-5)
  maturityLevel: number;   // 1-5
  maturityLabel: string;   // Crítica, Básica, etc.
  subAreaScores: SubAreaScore[];
}

/** Risco identificado para uma resposta específica */
export interface IdentifiedRisk {
  questionId: string;
  questionText: string;
  areaName: string;
  subAreaName: string;
  grade: number;
  riskScore: number;
  riskCategory: string;
  riskNarrative: string;
  controls: string;
  actionPlan: string;
  impact: number;
  probability: number;
}

/** Oportunidade de Quick Win */
export interface QuickWin {
  questionId: string;
  questionText: string;
  areaName: string;
  currentGrade: number;
  riskScore: number;
  actionPlan: string;
  estimatedEffort: 'baixo' | 'médio' | 'alto';
  estimatedImpact: 'baixo' | 'médio' | 'alto';
  priority: number;
}

/** Resultado completo do diagnóstico */
export interface DiagnosticResult {
  companyName: string;
  datePerformed: string;
  answers: Record<string, Answer>;
  areaScores: AreaScore[];
  globalScore: number;
  maturityLevel: number;
  maturityLabel: string;
  identifiedRisks: IdentifiedRisk[];
  quickWins: QuickWin[];
  totalQuestions: number;
  answeredQuestions: number;
}

/** Progresso por área */
export interface AreaProgress {
  areaId: string;
  areaName: string;
  total: number;
  answered: number;
  percentage: number;
}

/** Sessão do diagnóstico em andamento */
export interface DiagnosticSession {
  companyName: string;
  startedAt: string;
  answers: Record<string, Answer>;
}

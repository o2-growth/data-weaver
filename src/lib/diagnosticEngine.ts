// ============================================================
// Diagnóstico 360° — Engine de Sessão
// Gerencia o estado do diagnóstico durante o preenchimento
// ============================================================

import { questions } from '@/data/questions';
import { areas } from '@/data/areas';
import { subAreas } from '@/data/subareas';
import { riskMatrix } from '@/data/riskMatrix';
import type { RiskMatrixEntry } from '@/data/riskMatrix';
import {
  calculateResults,
} from '@/lib/calculations';
import type {
  Answer,
  AreaProgress,
  DiagnosticResult,
  DiagnosticSession,
} from '@/types/diagnostic';

// ────────────────────────────────────────────────────────────
// Iniciar diagnóstico
// ────────────────────────────────────────────────────────────

export function startDiagnostic(companyName: string): DiagnosticSession {
  return {
    companyName,
    startedAt: new Date().toISOString(),
    answers: {},
  };
}

// ────────────────────────────────────────────────────────────
// Responder uma pergunta
// ────────────────────────────────────────────────────────────

export function answerQuestion(
  session: DiagnosticSession,
  questionId: string,
  grade: number,
  observation?: string
): DiagnosticSession {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return session;

  // Encontrar o texto da opção selecionada
  const option = question.options.find((o) => o.grade === grade);
  const optionText = option?.text ?? '';

  const answer: Answer = {
    questionId,
    grade,
    optionText,
    observation,
  };

  return {
    ...session,
    answers: {
      ...session.answers,
      [questionId]: answer,
    },
  };
}

// ────────────────────────────────────────────────────────────
// Progresso do diagnóstico
// ────────────────────────────────────────────────────────────

export function getProgress(session: DiagnosticSession): {
  total: number;
  answered: number;
  percentage: number;
  byArea: AreaProgress[];
} {
  const total = questions.length;
  const answered = Object.keys(session.answers).length;
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  const byArea: AreaProgress[] = areas.map((area) => {
    const areaQuestions = questions.filter((q) => q.areaId === area.id);
    const areaAnswered = areaQuestions.filter(
      (q) => session.answers[q.id] !== undefined
    ).length;

    return {
      areaId: area.id,
      areaName: area.name,
      total: areaQuestions.length,
      answered: areaAnswered,
      percentage:
        areaQuestions.length > 0
          ? Math.round((areaAnswered / areaQuestions.length) * 100)
          : 0,
    };
  });

  return { total, answered, percentage, byArea };
}

// ────────────────────────────────────────────────────────────
// Completar o diagnóstico
// ────────────────────────────────────────────────────────────

export function completeDiagnostic(
  session: DiagnosticSession
): DiagnosticResult {
  return calculateResults(session.companyName, session.answers);
}

// ────────────────────────────────────────────────────────────
// Consultar riscos para uma resposta específica
// ────────────────────────────────────────────────────────────

export function getRisksForAnswer(
  questionId: string,
  grade: number
): RiskMatrixEntry | undefined {
  return riskMatrix.find(
    (entry) => entry.questionId === questionId && entry.grade === grade
  );
}

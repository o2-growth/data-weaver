// ============================================================
// Diagnóstico 360° — React Hook
// Wrapper do engine para uso em componentes React
// ============================================================

import { useState, useCallback, useMemo } from 'react';
import {
  startDiagnostic,
  answerQuestion as engineAnswer,
  getProgress as engineProgress,
  completeDiagnostic as engineComplete,
  getRisksForAnswer,
} from '@/lib/diagnosticEngine';
import type {
  DiagnosticSession,
  DiagnosticResult,
  AreaProgress,
} from '@/types/diagnostic';
import type { RiskMatrixEntry } from '@/data/riskMatrix';

interface UseDiagnosticReturn {
  session: DiagnosticSession | null;
  result: DiagnosticResult | null;
  isComplete: boolean;
  isStarted: boolean;
  start: (companyName: string) => void;
  answerQuestion: (questionId: string, grade: number, observation?: string) => void;
  getProgress: () => {
    total: number;
    answered: number;
    percentage: number;
    byArea: AreaProgress[];
  };
  completeDiagnostic: () => DiagnosticResult | null;
  getRiskPreview: (questionId: string, grade: number) => RiskMatrixEntry | undefined;
  reset: () => void;
}

export function useDiagnostic(): UseDiagnosticReturn {
  const [session, setSession] = useState<DiagnosticSession | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const isComplete = result !== null;
  const isStarted = session !== null;

  const start = useCallback((companyName: string) => {
    setSession(startDiagnostic(companyName));
    setResult(null);
  }, []);

  const answerQuestion = useCallback(
    (questionId: string, grade: number, observation?: string) => {
      setSession((prev) => {
        if (!prev) return prev;
        return engineAnswer(prev, questionId, grade, observation);
      });
    },
    []
  );

  const getProgress = useCallback(() => {
    if (!session) {
      return { total: 0, answered: 0, percentage: 0, byArea: [] };
    }
    return engineProgress(session);
  }, [session]);

  const completeDiagnostic = useCallback(() => {
    if (!session) return null;
    const diagnosticResult = engineComplete(session);
    setResult(diagnosticResult);
    return diagnosticResult;
  }, [session]);

  const getRiskPreview = useCallback(
    (questionId: string, grade: number) => {
      return getRisksForAnswer(questionId, grade);
    },
    []
  );

  const reset = useCallback(() => {
    setSession(null);
    setResult(null);
  }, []);

  return {
    session,
    result,
    isComplete,
    isStarted,
    start,
    answerQuestion,
    getProgress,
    completeDiagnostic,
    getRiskPreview,
    reset,
  };
}

import type { DiagnosticResult } from "@/types/diagnostic";

const RESULT_STORAGE_KEY = "diagnostico360:last-result";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function saveDiagnosticResult(result: DiagnosticResult): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
}

export function loadDiagnosticResult(): DiagnosticResult | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(RESULT_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as DiagnosticResult;
  } catch {
    window.localStorage.removeItem(RESULT_STORAGE_KEY);
    return null;
  }
}

export function clearDiagnosticResult(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(RESULT_STORAGE_KEY);
}
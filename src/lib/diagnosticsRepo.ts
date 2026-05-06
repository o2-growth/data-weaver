// ============================================================
// Repositório de diagnósticos (banco + cache local como fallback)
// ============================================================

import { supabase } from "@/integrations/supabase/client";
import {
  saveDiagnosticResult,
  loadDiagnosticResult,
} from "@/lib/diagnosticStorage";
import type { DiagnosticResult } from "@/types/diagnostic";

export interface DiagnosticListItem {
  id: string;
  company_name: string;
  date_performed: string;
  global_score: number;
  maturity_level: number;
  created_at: string;
}

/**
 * Salva no banco (se houver sessão) e sempre no localStorage.
 * Retorna o id se salvou no banco; null se ficou só local.
 */
export async function saveDiagnostic(
  result: DiagnosticResult,
): Promise<string | null> {
  // Cache local sempre
  saveDiagnosticResult(result);

  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) return null;

    const { data, error } = await supabase
      .from("diagnostics")
      .insert([
        {
          user_id: userId,
          company_name: result.companyName,
          date_performed: result.datePerformed,
          global_score: result.globalScore,
          maturity_level: result.maturityLevel,
          result: result as any,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("[diagnosticsRepo] insert error:", error);
      return null;
    }
    return data?.id ?? null;
  } catch (err) {
    console.error("[diagnosticsRepo] save exception:", err);
    return null;
  }
}

export async function listDiagnostics(): Promise<DiagnosticListItem[]> {
  const { data, error } = await supabase
    .from("diagnostics")
    .select("id, company_name, date_performed, global_score, maturity_level, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[diagnosticsRepo] list error:", error);
    return [];
  }
  return (data ?? []) as DiagnosticListItem[];
}

export async function getDiagnostic(
  id: string,
): Promise<DiagnosticResult | null> {
  const { data, error } = await supabase
    .from("diagnostics")
    .select("result")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[diagnosticsRepo] get error:", error);
    return null;
  }
  return (data?.result as unknown as DiagnosticResult) ?? null;
}

export async function deleteDiagnostic(id: string): Promise<boolean> {
  const { error } = await supabase.from("diagnostics").delete().eq("id", id);
  if (error) {
    console.error("[diagnosticsRepo] delete error:", error);
    return false;
  }
  return true;
}

export { loadDiagnosticResult };

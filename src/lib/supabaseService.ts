// ============================================================
// Supabase Service Layer — Dual Mode (Local / Supabase)
// Se Supabase não configurado: usa dados locais (src/data/*)
// Se configurado: busca do banco via Supabase client
// ============================================================

import { supabase } from '@/lib/supabase';
import { areas as localAreas } from '@/data/areas';
import { subAreas as localSubAreas } from '@/data/subareas';
import { questions as localQuestions } from '@/data/questions';
import { riskMatrix as localRiskMatrix } from '@/data/riskMatrix';
import type { Area } from '@/data/areas';
import type { SubArea } from '@/data/subareas';
import type { Question, AnswerOption } from '@/data/questions';
import type { RiskMatrixEntry } from '@/data/riskMatrix';
import type { DiagnosticResult } from '@/types/diagnostic';

// ────────────────────────────────────────────────────────────
// Áreas
// ────────────────────────────────────────────────────────────

export async function getAreas(): Promise<Area[]> {
  if (!supabase) {
    return localAreas;
  }

  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .order('ordem');

  if (error) throw error;

  return (data ?? []).map((a) => ({
    id: a.codigo,
    name: a.nome,
    weight: parseFloat(a.peso),
    order: a.ordem,
  }));
}

// ────────────────────────────────────────────────────────────
// Subáreas
// ────────────────────────────────────────────────────────────

export async function getSubAreas(): Promise<SubArea[]> {
  if (!supabase) {
    return localSubAreas;
  }

  const { data, error } = await supabase
    .from('subareas')
    .select('*, areas!inner(codigo)')
    .order('ordem');

  if (error) throw error;

  return (data ?? []).map((sa) => ({
    id: sa.codigo,
    name: sa.nome,
    areaId: (sa.areas as { codigo: string }).codigo,
    order: sa.ordem,
  }));
}

// ────────────────────────────────────────────────────────────
// Perguntas com opções
// ────────────────────────────────────────────────────────────

export async function getQuestionsWithOptions(): Promise<Question[]> {
  if (!supabase) {
    return localQuestions;
  }

  const { data, error } = await supabase
    .from('perguntas')
    .select(`
      *,
      subareas!inner(codigo, areas!inner(codigo)),
      opcoes_resposta(grau, titulo, descricao)
    `)
    .eq('ativa', true)
    .order('ordem');

  if (error) throw error;

  return (data ?? []).map((p) => ({
    id: p.codigo,
    number: p.codigo,
    text: p.texto,
    areaId: (p.subareas as { codigo: string; areas: { codigo: string } }).areas.codigo,
    subAreaId: (p.subareas as { codigo: string; areas: { codigo: string } }).codigo,
    order: p.ordem,
    options: ((p.opcoes_resposta ?? []) as { grau: number; titulo: string; descricao: string }[])
      .sort((a, b) => a.grau - b.grau)
      .map((o) => ({
        grade: o.grau,
        text: o.titulo,
      })),
  }));
}

// ────────────────────────────────────────────────────────────
// Matriz de Risco
// ────────────────────────────────────────────────────────────

export async function getRiskMatrix(): Promise<RiskMatrixEntry[]> {
  if (!supabase) {
    return localRiskMatrix;
  }

  const { data, error } = await supabase
    .from('matriz_risco')
    .select(`
      *,
      perguntas!inner(codigo)
    `);

  if (error) throw error;

  return (data ?? []).map((mr) => ({
    questionId: (mr.perguntas as { codigo: string }).codigo,
    grade: mr.grau,
    answerText: '',
    impactArea: mr.impacto,
    impactSubArea: mr.impacto,
    impact: mr.impacto,
    probability: mr.probabilidade,
    riskScore: mr.score_risco,
    riskCategory: mr.categoria_risco === 'alto' ? 'Alto' : mr.categoria_risco === 'medio' ? 'Médio' : 'Baixo',
    riskNarrative: mr.narrativa_risco,
    controls: mr.controles_sugeridos ?? '',
    actionPlan: mr.plano_acao ?? '',
  }));
}

// ────────────────────────────────────────────────────────────
// Salvar Diagnóstico (apenas Supabase mode)
// ────────────────────────────────────────────────────────────

export async function saveDiagnostic(
  result: DiagnosticResult,
  empresaId?: string,
  responsavelId?: string
): Promise<string | null> {
  if (!supabase) {
    // Local mode: retorna null (não persiste)
    console.info('[supabaseService] Modo local — diagnóstico não persistido no banco.');
    return null;
  }

  // Criar diagnóstico
  const { data: diag, error: diagError } = await supabase
    .from('diagnosticos')
    .insert({
      empresa_id: empresaId,
      responsavel_id: responsavelId,
      status: 'concluido',
      score_global: result.globalScore,
      nivel_maturidade: result.maturityLevel,
      label_maturidade: result.maturityLabel,
      scores_por_area: result.areaScores.reduce((acc, as_) => {
        acc[as_.areaId] = {
          score: as_.score,
          nivel: as_.maturityLevel,
          label: as_.maturityLabel,
          peso: as_.weight,
        };
        return acc;
      }, {} as Record<string, unknown>),
      concluido_em: result.datePerformed,
    })
    .select('id')
    .single();

  if (diagError) throw diagError;
  if (!diag) throw new Error('Falha ao criar diagnóstico');

  // Salvar respostas em batch
  const respostas = Object.values(result.answers).map((answer) => ({
    diagnostico_id: diag.id,
    pergunta_id: answer.questionId, // Precisa ser o UUID real — veja nota abaixo
    grau_selecionado: answer.grade,
    observacao: answer.observation ?? null,
  }));

  if (respostas.length > 0) {
    const { error: respError } = await supabase
      .from('respostas')
      .insert(respostas);

    if (respError) throw respError;
  }

  return diag.id;
}

// ────────────────────────────────────────────────────────────
// Listar Diagnósticos
// ────────────────────────────────────────────────────────────

export async function getDiagnostics() {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('diagnosticos')
    .select('*, empresas(nome_fantasia, razao_social)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// ────────────────────────────────────────────────────────────
// Buscar Diagnóstico por ID
// ────────────────────────────────────────────────────────────

export async function getDiagnosticById(id: string) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('diagnosticos')
    .select(`
      *,
      empresas(nome_fantasia, razao_social),
      respostas(*, perguntas(codigo, texto)),
      quick_wins(*, perguntas(codigo, texto))
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// Quick Wins
// ────────────────────────────────────────────────────────────

export async function getQuickWinsByDiagnostic(diagnosticoId: string) {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('quick_wins')
    .select('*, perguntas(codigo, texto)')
    .eq('diagnostico_id', diagnosticoId)
    .order('prioridade', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function updateQuickWinStatus(
  quickWinId: string,
  status: 'pendente' | 'em_andamento' | 'concluido'
) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('quick_wins')
    .update({ status })
    .eq('id', quickWinId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ────────────────────────────────────────────────────────────
// Concluir Diagnóstico (chama função PL/pgSQL)
// ────────────────────────────────────────────────────────────

export async function concluirDiagnostico(diagnosticoId: string) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .rpc('concluir_diagnostico', { p_diagnostico_id: diagnosticoId });

  if (error) throw error;
  return data;
}

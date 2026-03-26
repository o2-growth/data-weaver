// Documentos por Nível de Maturidade do Diagnóstico 360°
// Lista de documentos que devem ser solicitados conforme o grau de maturidade da empresa

export interface DocumentByMaturity {
  document: string;
  maturityLevel: number;
}

export const documentsByMaturity: DocumentByMaturity[] = [
  { document: 'Cartão CNPJ', maturityLevel: 1 },
  { document: 'Comprovante de opção pelo regime (Simples, Lucro Presumido ou Lucro Real)', maturityLevel: 1 },
  { document: 'Contrato Social atualizado', maturityLevel: 1 },
  { document: 'IRPF Sócios', maturityLevel: 1 },
  { document: 'Lista de Funcionários (CLT, PJ, sócios que atuam)', maturityLevel: 1 },
  { document: 'Última alteração contratual', maturityLevel: 1 },
  { document: 'Últimas Alterações Contratuais', maturityLevel: 1 },
  { document: 'Acesso ao sistema', maturityLevel: 1 },
  { document: 'Certidões Negativas (todas as esferas)', maturityLevel: 1 },
  { document: 'Contratos de empréstimos e financiamentos', maturityLevel: 1 },
  { document: 'Cópia dos contratos referentes aos financiamentos ativos', maturityLevel: 1 },
  { document: 'Extrato Bancário Mês a Mês (últimos 12 meses)', maturityLevel: 1 },
  { document: 'Relatório de Contas a Pagar', maturityLevel: 1 },
  { document: 'Relatório de Contas a Receber', maturityLevel: 1 },
  { document: 'Contratos de seguros contratados', maturityLevel: 1 },
  { document: 'Controle de processos judiciais e valores estimados de pagamento', maturityLevel: 1 },
  { document: 'Extrato de parcelamentos de impostos caso ativo', maturityLevel: 2 },
  { document: 'Fluxo de Caixa', maturityLevel: 2 },
  { document: 'Relatório de faturamento mensal detalhado', maturityLevel: 2 },
  { document: 'DRE Gerencial em excel (Mês a mês e anual)', maturityLevel: 2 },
  { document: 'DRE Gerencial em excel (Mês a mês e anual)', maturityLevel: 2 },
  { document: 'DRE Gerencial em excel (Mês a mês e anual)', maturityLevel: 2 },
  { document: 'Organograma dos colaboradores da empresa', maturityLevel: 2 },
  { document: 'Balancetes Mensais (2024, 2025, 2026)', maturityLevel: 3 },
  { document: 'Balanço Patrimonial 2024', maturityLevel: 3 },
  { document: 'Balanço Patrimonial 2025', maturityLevel: 3 },
  { document: 'Balanço Patrimonial 2026', maturityLevel: 3 },
  { document: 'Conciliações contábeis', maturityLevel: 3 },
  { document: 'Controle de Imobilizado', maturityLevel: 3 },
  { document: 'Razão Contábil - 2024, 2025 e 2026', maturityLevel: 3 },
  { document: 'Relatório auxiliar de Estoque', maturityLevel: 3 },
  { document: 'Relatório de Despesas Financeiras', maturityLevel: 3 },
  { document: 'Relatório de compras', maturityLevel: 3 },
  { document: 'Controle de Precificação', maturityLevel: 3 },
  { document: 'Organograma com a estrutura corporativa', maturityLevel: 3 },
  { document: 'Receita por produto / serviço', maturityLevel: 3 },
  { document: 'Relatório de devoluções / cancelamentos', maturityLevel: 3 },
  { document: 'Relatório de margem por produto', maturityLevel: 3 },
  { document: 'Estrutura de custos por centro de custo', maturityLevel: 4 },
  { document: 'Fluxo de Caixa Projetado', maturityLevel: 4 },
  { document: 'Orçamento 2026', maturityLevel: 4 },
  { document: 'Planilha Auxiliar de Acompanhamento dos Empréstimos e Financiamento', maturityLevel: 4 },
  { document: 'Política de crédito', maturityLevel: 4 },
  { document: 'Política de pagamento a fornecedores', maturityLevel: 4 },
  { document: 'Receita por cliente (curva ABC)', maturityLevel: 4 },
  { document: 'Relatório de provisões', maturityLevel: 4 },
  { document: 'Relatório de rentabilidade por cliente', maturityLevel: 4 },
  { document: 'Relatório detalhado de CMV / CPV', maturityLevel: 4 },
  { document: 'Relatórios de inadimplência', maturityLevel: 4 },
  { document: 'Planejamento Estratégico', maturityLevel: 4 },
  { document: 'Plano comercial', maturityLevel: 4 },
  { document: 'Plano de Captação de Recursos', maturityLevel: 5 },
  { document: 'Premissas de crescimento', maturityLevel: 5 },
  { document: 'Projeções de Investimentos', maturityLevel: 5 },
];

/**
 * Retorna os documentos necessários para um determinado nível de maturidade.
 * Inclui todos os documentos do nível informado e dos níveis inferiores.
 */
export function getDocumentsForMaturityLevel(level: number): DocumentByMaturity[] {
  return documentsByMaturity.filter((doc) => doc.maturityLevel <= level);
}

/**
 * Retorna os documentos agrupados por nível de maturidade.
 */
export function getDocumentsGroupedByLevel(): Record<number, string[]> {
  const grouped: Record<number, string[]> = {};
  for (const doc of documentsByMaturity) {
    if (!grouped[doc.maturityLevel]) {
      grouped[doc.maturityLevel] = [];
    }
    grouped[doc.maturityLevel].push(doc.document);
  }
  return grouped;
}

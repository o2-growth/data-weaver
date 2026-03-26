// Subáreas do Diagnóstico 360° - Extraído automaticamente da planilha

export interface SubArea {
  id: string;
  name: string;
  areaId: string;
  order: number;
}

export const subAreas: SubArea[] = [
  {
    id: 'estrutura-contabil',
    name: 'Estrutura Contábil',
    areaId: 'contabilidade',
    order: 1,
  },
  {
    id: 'fechamento-e-confiabilidade',
    name: 'Fechamento e Confiabilidade',
    areaId: 'contabilidade',
    order: 2,
  },
  {
    id: 'analise-de-margem',
    name: 'Análise de Margem',
    areaId: 'controladoria',
    order: 3,
  },
  {
    id: 'capital-de-giro',
    name: 'Capital de Giro',
    areaId: 'controladoria',
    order: 4,
  },
  {
    id: 'endividamento',
    name: 'Endividamento',
    areaId: 'controladoria',
    order: 5,
  },
  {
    id: 'estrutura-de-custos',
    name: 'Estrutura de Custos',
    areaId: 'controladoria',
    order: 6,
  },
  {
    id: 'controle-de-caixa',
    name: 'Controle de Caixa',
    areaId: 'financeiro',
    order: 7,
  },
  {
    id: 'processos-financeiros',
    name: 'Processos Financeiros',
    areaId: 'financeiro',
    order: 8,
  },
  {
    id: 'conformidade-tributaria',
    name: 'Conformidade Tributária',
    areaId: 'fiscal',
    order: 9,
  },
  {
    id: 'estrategia-e-planejamento-tributario',
    name: 'Estratégia e Planejamento Tributário',
    areaId: 'fiscal',
    order: 10,
  },
  {
    id: 'indicadores-e-performance',
    name: 'Indicadores e Performance',
    areaId: 'planejamento',
    order: 11,
  },
  {
    id: 'orcamento-e-forecast',
    name: 'Orçamento e Forecast',
    areaId: 'planejamento',
    order: 12,
  },
  {
    id: 'gestao-do-pipeline-e-funil-de-vendas',
    name: 'Gestão do Pipeline e Funil de Vendas',
    areaId: 'comercial',
    order: 13,
  },
  {
    id: 'precificacao-e-rentabilidade-comercial',
    name: 'Precificação e Rentabilidade Comercial',
    areaId: 'comercial',
    order: 14,
  },
];

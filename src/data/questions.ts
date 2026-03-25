// Perguntas do Diagnóstico 360° - Extraído automaticamente da planilha
// Sheet 'Base', rows 6-53, colunas B-J

export interface AnswerOption {
  grade: number;
  text: string;
}

export interface Question {
  id: string;
  number: string;
  text: string;
  areaId: string;
  subAreaId: string;
  order: number;
  options: AnswerOption[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    number: '1.1.1',
    text: 'Plano de contas permite análise gerencial?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 1,
    options: [
      {
        grade: 1,
        text: 'Inexistente ou genérico',
      },
      {
        grade: 2,
        text: 'Básico, sem detalhamento gerencial',
      },
      {
        grade: 3,
        text: 'Estruturado, mas sem centros de custo',
      },
      {
        grade: 4,
        text: 'Com centros de custo ou unidades',
      },
      {
        grade: 5,
        text: 'Estruturado por unidade, projeto e visão estratégica',
      },
    ],
  },
  {
    id: 'q2',
    number: '1.1.2',
    text: 'A contabilidade é utilizada apenas para fins fiscais ou também para gestão?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 2,
    options: [
      {
        grade: 1,
        text: 'Apenas fiscal',
      },
      {
        grade: 2,
        text: 'Predominantemente fiscal',
      },
      {
        grade: 3,
        text: 'Ocasionalmente usada para gestão',
      },
      {
        grade: 4,
        text: 'Utilizada regularmente para análise',
      },
      {
        grade: 5,
        text: 'Base principal para decisões estratégicas',
      },
    ],
  },
  {
    id: 'q3',
    number: '1.1.3',
    text: 'Existe integração entre contabilidade e financeiro?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 3,
    options: [
      {
        grade: 1,
        text: 'Não existe integração',
      },
      {
        grade: 2,
        text: 'Integração manual e esporádica',
      },
      {
        grade: 3,
        text: 'Integração parcial',
      },
      {
        grade: 4,
        text: 'Integração estruturada',
      },
      {
        grade: 5,
        text: 'Integração automatizada e validada',
      },
    ],
  },
  {
    id: 'q4',
    number: '1.1.4',
    text: 'Os relatórios contábeis refletem a realidade operacional?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 4,
    options: [
      {
        grade: 1,
        text: 'Não refletem',
      },
      {
        grade: 2,
        text: 'Refletem parcialmente',
      },
      {
        grade: 3,
        text: 'Refletem com ajustes frequentes',
      },
      {
        grade: 4,
        text: 'Refletem de forma consistente',
      },
      {
        grade: 5,
        text: 'Refletem com alta confiabilidade e tempestividade',
      },
    ],
  },
  {
    id: 'q5',
    number: '1.2.1',
    text: 'O fechamento contábil ocorre com qual periodicidade?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 5,
    options: [
      {
        grade: 1,
        text: 'Não há fechamento formal',
      },
      {
        grade: 2,
        text: 'Esporádico',
      },
      {
        grade: 3,
        text: 'Trimestral',
      },
      {
        grade: 4,
        text: 'Mensal',
      },
      {
        grade: 5,
        text: 'Mensal com prazo definido e análise gerencial',
      },
    ],
  },
  {
    id: 'q6',
    number: '1.2.2',
    text: 'Há revisão técnica dos demonstrativos?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 6,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Apenas contábil',
      },
      {
        grade: 3,
        text: 'Revisão básica',
      },
      {
        grade: 4,
        text: 'Revisão contábil e gerencial',
      },
      {
        grade: 5,
        text: 'Revisão estruturada com validação cruzada',
      },
    ],
  },
  {
    id: 'q7',
    number: '1.2.3',
    text: 'Existem ajustes frequentes após fechamento?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 7,
    options: [
      {
        grade: 1,
        text: 'Ajustes constantes',
      },
      {
        grade: 2,
        text: 'Ajustes recorrentes',
      },
      {
        grade: 3,
        text: 'Ajustes eventuais',
      },
      {
        grade: 4,
        text: 'Ajustes raros',
      },
      {
        grade: 5,
        text: 'Sem ajustes relevantes',
      },
    ],
  },
  {
    id: 'q8',
    number: '1.2.4',
    text: 'DRE/Balanço são utilizados para decisões?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 8,
    options: [
      {
        grade: 1,
        text: 'Nunca',
      },
      {
        grade: 2,
        text: 'Raramente',
      },
      {
        grade: 3,
        text: 'Ocasionalmente',
      },
      {
        grade: 4,
        text: 'Frequentemente',
      },
      {
        grade: 5,
        text: 'São base central da gestão',
      },
    ],
  },
  {
    id: 'q9',
    number: '2.1.1',
    text: 'Existe fluxo de caixa projetado?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 9,
    options: [
      {
        grade: 1,
        text: 'Não existe',
      },
      {
        grade: 2,
        text: 'Controle apenas realizado',
      },
      {
        grade: 3,
        text: 'Projeção curta (até 15 dias)',
      },
      {
        grade: 4,
        text: 'Projeção mensal',
      },
      {
        grade: 5,
        text: 'Projeção estruturada com cenários',
      },
    ],
  },
  {
    id: 'q10',
    number: '2.1.2',
    text: 'Frequência de atualização do fluxo de Caixa?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 10,
    options: [
      {
        grade: 1,
        text: 'Não atualizado',
      },
      {
        grade: 2,
        text: 'Esporádico',
      },
      {
        grade: 3,
        text: 'Mensal',
      },
      {
        grade: 4,
        text: 'Semanal',
      },
      {
        grade: 5,
        text: 'Diário ou automatizado',
      },
    ],
  },
  {
    id: 'q11',
    number: '2.1.3',
    text: 'Caixa é usado para planejamento?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 11,
    options: [
      {
        grade: 1,
        text: 'Apenas registro histórico',
      },
      {
        grade: 2,
        text: 'Controle básico',
      },
      {
        grade: 3,
        text: 'Planejamento de curto prazo',
      },
      {
        grade: 4,
        text: 'Planejamento estruturado',
      },
      {
        grade: 5,
        text: 'Planejamento estratégico com simulações',
      },
    ],
  },
  {
    id: 'q12',
    number: '2.1.4',
    text: 'Há simulação de cenários financeiros?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 12,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Informal',
      },
      {
        grade: 3,
        text: 'Simples',
      },
      {
        grade: 4,
        text: 'Estruturada',
      },
      {
        grade: 5,
        text: 'Modelagem financeira avançada',
      },
    ],
  },
  {
    id: 'q13',
    number: '2.2.1',
    text: 'Conciliações bancárias são realizadas?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 13,
    options: [
      {
        grade: 1,
        text: 'Não realizadas',
      },
      {
        grade: 2,
        text: 'Esporádicas',
      },
      {
        grade: 3,
        text: 'Mensais',
      },
      {
        grade: 4,
        text: 'Semanais',
      },
      {
        grade: 5,
        text: 'Automatizadas e auditáveis',
      },
    ],
  },
  {
    id: 'q14',
    number: '2.2.2',
    text: 'Existe segregação de funções?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 14,
    options: [
      {
        grade: 1,
        text: 'Não existe',
      },
      {
        grade: 2,
        text: 'Parcial',
      },
      {
        grade: 3,
        text: 'Estrutura básica',
      },
      {
        grade: 4,
        text: 'Estruturada',
      },
      {
        grade: 5,
        text: 'Estruturada com controles internos',
      },
    ],
  },
  {
    id: 'q15',
    number: '2.2.3',
    text: 'Controle de contas a pagar/receber?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 15,
    options: [
      {
        grade: 1,
        text: 'Manual/desorganizado',
      },
      {
        grade: 2,
        text: 'Planilhas básicas',
      },
      {
        grade: 3,
        text: 'Sistema simples',
      },
      {
        grade: 4,
        text: 'Sistema integrado',
      },
      {
        grade: 5,
        text: 'Sistema integrado com indicadores',
      },
    ],
  },
  {
    id: 'q16',
    number: '2.2.4',
    text: 'Existem políticas formais de aprovação?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 16,
    options: [
      {
        grade: 1,
        text: 'Não existem',
      },
      {
        grade: 2,
        text: 'Informais',
      },
      {
        grade: 3,
        text: 'Parcialmente formalizadas',
      },
      {
        grade: 4,
        text: 'Formalizadas',
      },
      {
        grade: 5,
        text: 'Formalizadas e auditadas',
      },
    ],
  },
  {
    id: 'q17',
    number: '3.1.1',
    text: 'Conhece margem bruta?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 17,
    options: [
      {
        grade: 1,
        text: 'Não conhece',
      },
      {
        grade: 2,
        text: 'Estimativa informal',
      },
      {
        grade: 3,
        text: 'Calcula eventualmente',
      },
      {
        grade: 4,
        text: 'Calcula mensalmente',
      },
      {
        grade: 5,
        text: 'Analisa com metas e histórico',
      },
    ],
  },
  {
    id: 'q18',
    number: '3.1.2',
    text: 'Margem por produto/serviço?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 18,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Estimativa informal',
      },
      {
        grade: 3,
        text: 'Por linha geral',
      },
      {
        grade: 4,
        text: 'Por produto',
      },
      {
        grade: 5,
        text: 'Por produto com histórico comparativo',
      },
    ],
  },
  {
    id: 'q19',
    number: '3.1.3',
    text: 'Margem por cliente/canal?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 19,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Raramente',
      },
      {
        grade: 3,
        text: 'Parcial',
      },
      {
        grade: 4,
        text: 'Estruturada',
      },
      {
        grade: 5,
        text: 'Base para decisões comerciais',
      },
    ],
  },
  {
    id: 'q20',
    number: '3.1.4',
    text: 'Decisões comerciais consideram margem?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 20,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Ocasionalmente',
      },
      {
        grade: 3,
        text: 'Parcialmente',
      },
      {
        grade: 4,
        text: 'Frequentemente',
      },
      {
        grade: 5,
        text: 'Sempre com análise estruturada',
      },
    ],
  },
  {
    id: 'q21',
    number: '3.2.1',
    text: 'Classificação fixo/variável?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 21,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Parcial',
      },
      {
        grade: 3,
        text: 'Estruturada básica',
      },
      {
        grade: 4,
        text: 'Estruturada consistente',
      },
      {
        grade: 5,
        text: 'Estruturada com análise gerencial',
      },
    ],
  },
  {
    id: 'q22',
    number: '3.2.2',
    text: 'Rateio de custos indiretos?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 22,
    options: [
      {
        grade: 1,
        text: 'Não existe',
      },
      {
        grade: 2,
        text: 'Rateio simples',
      },
      {
        grade: 3,
        text: 'Rateio básico',
      },
      {
        grade: 4,
        text: 'Rateio técnico',
      },
      {
        grade: 5,
        text: 'Rateio com critério estratégico',
      },
    ],
  },
  {
    id: 'q23',
    number: '3.2.3',
    text: 'Conhece ponto de equilíbrio?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 23,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Estimativa informal',
      },
      {
        grade: 3,
        text: 'Cálculo eventual',
      },
      {
        grade: 4,
        text: 'Cálculo estruturado',
      },
      {
        grade: 5,
        text: 'Monitorado periodicamente',
      },
    ],
  },
  {
    id: 'q24',
    number: '3.2.4',
    text: 'Existe análise de alavancagem operacional?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 24,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Conhecimento conceitual',
      },
      {
        grade: 3,
        text: 'Aplicação eventual',
      },
      {
        grade: 4,
        text: 'Aplicação estruturada',
      },
      {
        grade: 5,
        text: 'Aplicação estratégica com simulações',
      },
    ],
  },
  {
    id: 'q25',
    number: '3.3.1',
    text: 'Monitora PMR, PMP e PME?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 25,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Conhece informalmente',
      },
      {
        grade: 3,
        text: 'Calcula eventualmente',
      },
      {
        grade: 4,
        text: 'Calcula periodicamente',
      },
      {
        grade: 5,
        text: 'Utiliza para decisões estratégicas',
      },
    ],
  },
  {
    id: 'q26',
    number: '3.3.2',
    text: 'Cálculo formal da NCG?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 26,
    options: [
      {
        grade: 1,
        text: 'Não calcula',
      },
      {
        grade: 2,
        text: 'Estimativa informal',
      },
      {
        grade: 3,
        text: 'Cálculo eventual',
      },
      {
        grade: 4,
        text: 'Cálculo estruturado',
      },
      {
        grade: 5,
        text: 'Monitorado e projetado',
      },
    ],
  },
  {
    id: 'q27',
    number: '3.3.3',
    text: 'Ciclo financeiro acompanhado?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 27,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Esporadicamente',
      },
      {
        grade: 3,
        text: 'Periodicamente',
      },
      {
        grade: 4,
        text: 'Formalizado',
      },
      {
        grade: 5,
        text: 'Integrado ao planejamento',
      },
    ],
  },
  {
    id: 'q28',
    number: '3.3.4',
    text: 'Já enfrentou descasamento relevante no Capital de Giro?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 28,
    options: [
      {
        grade: 1,
        text: 'Frequentemente',
      },
      {
        grade: 2,
        text: 'Recorrentemente',
      },
      {
        grade: 3,
        text: 'Eventualmente',
      },
      {
        grade: 4,
        text: 'Raramente',
      },
      {
        grade: 5,
        text: 'Nunca ou altamente controlado',
      },
    ],
  },
  {
    id: 'q29',
    number: '3.4.1',
    text: 'Controle do perfil da dívida?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 29,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Informal',
      },
      {
        grade: 3,
        text: 'Controle básico',
      },
      {
        grade: 4,
        text: 'Controle estruturado',
      },
      {
        grade: 5,
        text: 'Gestão ativa estratégica',
      },
    ],
  },
  {
    id: 'q30',
    number: '3.4.2',
    text: 'Conhece custo médio da dívida?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 30,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Estimativa',
      },
      {
        grade: 3,
        text: 'Cálculo eventual',
      },
      {
        grade: 4,
        text: 'Cálculo estruturado',
      },
      {
        grade: 5,
        text: 'Monitorado estrategicamente',
      },
    ],
  },
  {
    id: 'q31',
    number: '3.4.3',
    text: 'Dívida alinhada à geração de caixa?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 31,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Parcial',
      },
      {
        grade: 3,
        text: 'Adequação básica',
      },
      {
        grade: 4,
        text: 'Adequação estruturada',
      },
      {
        grade: 5,
        text: 'Planejamento estratégico',
      },
    ],
  },
  {
    id: 'q32',
    number: '3.4.4',
    text: 'Existe estratégia formal de capital?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 32,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Informal',
      },
      {
        grade: 3,
        text: 'Parcial',
      },
      {
        grade: 4,
        text: 'Formalizada',
      },
      {
        grade: 5,
        text: 'Estratégia estruturada e revisada',
      },
    ],
  },
  {
    id: 'q33',
    number: '4.1.1',
    text: 'Existe orçamento anual?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'orcamento-e-forecast',
    order: 33,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Informal',
      },
      {
        grade: 3,
        text: 'Básico',
      },
      {
        grade: 4,
        text: 'Formalizado',
      },
      {
        grade: 5,
        text: 'Formalizado com metas estratégicas',
      },
    ],
  },
  {
    id: 'q34',
    number: '4.1.2',
    text: 'Revisão periódica do orçamento?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'orcamento-e-forecast',
    order: 34,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Esporádica',
      },
      {
        grade: 3,
        text: 'Semestral',
      },
      {
        grade: 4,
        text: 'Trimestral',
      },
      {
        grade: 5,
        text: 'Mensal com ajustes',
      },
    ],
  },
  {
    id: 'q35',
    number: '4.1.3',
    text: 'Análise orçado vs realizado?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'orcamento-e-forecast',
    order: 35,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Ocasional',
      },
      {
        grade: 3,
        text: 'Básica',
      },
      {
        grade: 4,
        text: 'Estruturada',
      },
      {
        grade: 5,
        text: 'Estruturada com plano de ação',
      },
    ],
  },
  {
    id: 'q36',
    number: '4.1.4',
    text: 'Projeções financeiras de médio prazo?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'orcamento-e-forecast',
    order: 36,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Informal',
      },
      {
        grade: 3,
        text: 'Projeção simples',
      },
      {
        grade: 4,
        text: 'Projeção estruturada',
      },
      {
        grade: 5,
        text: 'Modelagem estratégica',
      },
    ],
  },
  {
    id: 'q37',
    number: '4.2.1',
    text: 'Existem KPIs financeiros definidos?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'indicadores-e-performance',
    order: 37,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Básico',
      },
      {
        grade: 3,
        text: 'Estruturados',
      },
      {
        grade: 4,
        text: 'Com Metas',
      },
      {
        grade: 5,
        text: 'Integrados a Estratégia',
      },
    ],
  },
  {
    id: 'q38',
    number: '4.2.2',
    text: 'KPIs possuem metas formais?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'indicadores-e-performance',
    order: 38,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Informais',
      },
      {
        grade: 3,
        text: 'Parcialmente formalizadas',
      },
      {
        grade: 4,
        text: 'Formalizadas',
      },
      {
        grade: 5,
        text: 'Revisadas periodicamente',
      },
    ],
  },
  {
    id: 'q39',
    number: '4.2.3',
    text: 'Acompanhamento periódico?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'indicadores-e-performance',
    order: 39,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Esporádico',
      },
      {
        grade: 3,
        text: 'Mensal',
      },
      {
        grade: 4,
        text: 'Estruturado',
      },
      {
        grade: 5,
        text: 'Com reuniões formais',
      },
    ],
  },
  {
    id: 'q40',
    number: '4.2.4',
    text: 'Indicadores influenciam decisões estratégicas?',
    areaId: 'planejamento-e-inteligencia-financeira',
    subAreaId: 'indicadores-e-performance',
    order: 40,
    options: [
      {
        grade: 1,
        text: 'Não',
      },
      {
        grade: 2,
        text: 'Raramente',
      },
      {
        grade: 3,
        text: 'Parcialmente',
      },
      {
        grade: 4,
        text: 'Frequentemente',
      },
      {
        grade: 5,
        text: 'São base da gestão estratégica',
      },
    ],
  },
  {
    id: 'q41',
    number: '5.1.1',
    text: 'A empresa possui calendário fiscal formalizado?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 41,
    options: [
      {
        grade: 1,
        text: 'Não possui controle formal das obrigações fiscais',
      },
      {
        grade: 2,
        text: 'Controle informal via lembretes ou contador externo',
      },
      {
        grade: 3,
        text: 'Calendário básico estruturado',
      },
      {
        grade: 4,
        text: 'Calendário formal com responsáveis definidos',
      },
      {
        grade: 5,
        text: 'Calendário integrado ao sistema com controle e monitoramento',
      },
    ],
  },
  {
    id: 'q42',
    number: '5.1.2',
    text: 'Existem atrasos recorrentes no cumprimento de obrigações acessórias?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 42,
    options: [
      {
        grade: 1,
        text: 'Atrasos frequentes e multas recorrentes',
      },
      {
        grade: 2,
        text: 'Atrasos ocasionais',
      },
      {
        grade: 3,
        text: 'Cumprimento regular com pequenos ajustes',
      },
      {
        grade: 4,
        text: 'Cumprimento pontual e monitorado',
      },
      {
        grade: 5,
        text: 'Cumprimento automatizado com controle preventivo',
      },
    ],
  },
  {
    id: 'q43',
    number: '5.1.3',
    text: 'Existe controle formal de tributos a recolher?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 43,
    options: [
      {
        grade: 1,
        text: 'Não há controle formal',
      },
      {
        grade: 2,
        text: 'Controle via planilha básica',
      },
      {
        grade: 3,
        text: 'Controle estruturado por período',
      },
      {
        grade: 4,
        text: 'Controle integrado com financeiro',
      },
      {
        grade: 5,
        text: 'Controle integrado com projeção de impacto no caixa',
      },
    ],
  },
  {
    id: 'q44',
    number: '5.1.4',
    text: 'Já houve autuações fiscais relevantes nos últimos anos?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 44,
    options: [
      {
        grade: 1,
        text: 'Autuações frequentes e significativas',
      },
      {
        grade: 2,
        text: 'Autuações pontuais relevantes',
      },
      {
        grade: 3,
        text: 'Autuações pequenas e esporádicas',
      },
      {
        grade: 4,
        text: 'Não houve autuações relevantes',
      },
      {
        grade: 5,
        text: 'Gestão preventiva estruturada com auditoria fiscal interna',
      },
    ],
  },
  {
    id: 'q45',
    number: '5.2.1',
    text: 'A empresa realiza planejamento tributário estruturado?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 45,
    options: [
      {
        grade: 1,
        text: 'Não realiza',
      },
      {
        grade: 2,
        text: 'Apenas reage a mudanças legais',
      },
      {
        grade: 3,
        text: 'Planejamento básico anual',
      },
      {
        grade: 4,
        text: 'Planejamento estruturado com análise de cenários',
      },
      {
        grade: 5,
        text: 'Planejamento estratégico contínuo e revisado periodicamente',
      },
    ],
  },
  {
    id: 'q46',
    number: '5.2.2',
    text: 'Existe análise periódica do regime tributário?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 46,
    options: [
      {
        grade: 1,
        text: 'Nunca foi revisado',
      },
      {
        grade: 2,
        text: 'Revisão apenas quando problema surge',
      },
      {
        grade: 3,
        text: 'Revisão eventual',
      },
      {
        grade: 4,
        text: 'Revisão periódica estruturada',
      },
      {
        grade: 5,
        text: 'Revisão estratégica considerando expansão e crescimento',
      },
    ],
  },
  {
    id: 'q47',
    number: '5.2.3',
    text: 'Há acompanhamento de benefícios fiscais aplicáveis?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 47,
    options: [
      {
        grade: 1,
        text: 'Não há acompanhamento',
      },
      {
        grade: 2,
        text: 'Conhecimento superficial',
      },
      {
        grade: 3,
        text: 'Avaliação ocasional',
      },
      {
        grade: 4,
        text: 'Avaliação estruturada',
      },
      {
        grade: 5,
        text: 'Estratégia ativa de aproveitamento de incentivos',
      },
    ],
  },
  {
    id: 'q48',
    number: '5.2.4',
    text: 'O impacto tributário é considerado nas decisões estratégicas?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 48,
    options: [
      {
        grade: 1,
        text: 'Nunca considerado',
      },
      {
        grade: 2,
        text: 'Considerado apenas após decisão tomada',
      },
      {
        grade: 3,
        text: 'Considerado em decisões relevantes',
      },
      {
        grade: 4,
        text: 'Considerado regularmente',
      },
      {
        grade: 5,
        text: 'Integrado ao planejamento estratégico e financeiro',
      },
    ],
  },
];

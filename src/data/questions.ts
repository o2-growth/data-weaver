// Perguntas do Diagnóstico 360° - Extraído automaticamente da planilha
// Sheet 'Base', rows 6-59, colunas B-J

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
    text: 'A contabilidade é utilizada apenas para fins fiscais ou também como base para decisões gerenciais?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 1,
    options: [
      {
        grade: 1,
        text: 'Exclusivamente fiscal, nenhum relatório é usado para gestão',
      },
      {
        grade: 2,
        text: 'Predominantemente fiscal, eventualmente consultada em situações de crise',
      },
      {
        grade: 3,
        text: 'Usada para gestão de forma pontual, sem rotina ou padronização definida',
      },
      {
        grade: 4,
        text: 'Utilizada regularmente para análise de resultados e tomada de decisão',
      },
      {
        grade: 5,
        text: 'Base central da gestão, integrada ao processo decisório estratégico',
      },
    ],
  },
  {
    id: 'q2',
    number: '1.1.2',
    text: 'Os lançamentos contábeis são registrados por regime de competência e refletem com fidelidade a realidade operacional da empresa?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 2,
    options: [
      {
        grade: 1,
        text: 'Lançamentos feitos majoritariamente por regime de caixa ou de forma irregular, sem competência',
      },
      {
        grade: 2,
        text: 'Competência aplicada parcialmente, lançamentos principais seguem a regra, mas há exceções recorrentes',
      },
      {
        grade: 3,
        text: 'Competência aplicada na maioria dos lançamentos, com ajustes pontuais após o fechamento',
      },
      {
        grade: 4,
        text: 'Regime de competência aplicado de forma consistente, ajustes pós-fechamento são raros e documentados',
      },
      {
        grade: 5,
        text: 'Regime de competência aplicado com validação cruzada automatizada e trilha de auditoria',
      },
    ],
  },
  {
    id: 'q3',
    number: '1.1.3',
    text: 'Existe integração estruturada entre a contabilidade e o departamento financeiro, permitindo conciliação e consistência entre os dados de ambas as áreas?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 3,
    options: [
      {
        grade: 1,
        text: 'Nenhuma integração, contabilidade e financeiro operam com dados independentes',
      },
      {
        grade: 2,
        text: 'Integração manual e esporádica, realizada sob demanda ou em situações de crise',
      },
      {
        grade: 3,
        text: 'Integração parcial, algumas contas são conciliadas, mas sem processo formal e periódico',
      },
      {
        grade: 4,
        text: 'Integração estruturada com conciliação mensal documentada entre contabilidade e financeiro',
      },
      {
        grade: 5,
        text: 'Integração automatizada e validada, conciliação diária ou semanal com trilha de auditoria completa',
      },
    ],
  },
  {
    id: 'q4',
    number: '1.1.4',
    text: 'O plano de contas da empresa está estruturado de forma a permitir análise gerencial por centro de custo, unidade ou projeto, além da obrigação fiscal?',
    areaId: 'contabilidade',
    subAreaId: 'estrutura-contabil',
    order: 4,
    options: [
      {
        grade: 1,
        text: 'Inexistente ou genérico, copia o modelo do contador sem qualquer adequação ao negócio',
      },
      {
        grade: 2,
        text: 'Básico, atende às obrigações fiscais, mas não permite análise gerencial por segmento',
      },
      {
        grade: 3,
        text: 'Estruturado para fins fiscais e com alguma separação gerencial, mas sem centros de custo definidos',
      },
      {
        grade: 4,
        text: 'Estruturado com centros de custo ou unidades de negócio mapeadas e utilizadas nas análises',
      },
      {
        grade: 5,
        text: 'Estruturado por unidade, projeto e dimensão estratégica, suporta análise multidimensional avançada',
      },
    ],
  },
  {
    id: 'q5',
    number: '1.2.1',
    text: 'O fechamento contábil ocorre com qual periodicidade e existe um calendário formal com prazos e responsáveis definidos?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 5,
    options: [
      {
        grade: 1,
        text: 'Não há fechamento formal, demonstrativos são gerados apenas quando solicitados à contabilidade',
      },
      {
        grade: 2,
        text: 'Fechamento esporádico, sem periodicidade definida ou calendário documentado',
      },
      {
        grade: 3,
        text: 'Fechamento trimestral, com alguma consistência mas sem calendário formal de responsáveis',
      },
      {
        grade: 4,
        text: 'Fechamento mensal realizado dentro de um prazo definido, com responsáveis atribuídos',
      },
      {
        grade: 5,
        text: 'Fechamento mensal com prazo máximo fixo (ex, até D+5), análise gerencial incluída e evidências documentadas',
      },
    ],
  },
  {
    id: 'q6',
    number: '1.2.2',
    text: 'Os demonstrativos contábeis (DRE e Balanço) são utilizados ativamente como base para decisões gerenciais?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 6,
    options: [
      {
        grade: 1,
        text: 'Não, os demonstrativos existem apenas para atender exigências fiscais e do contador',
      },
      {
        grade: 2,
        text: 'Raramente, consultados em situações de emergência financeira ou exigência de terceiros',
      },
      {
        grade: 3,
        text: 'Ocasionalmente, usados em algumas reuniões, mas sem rotina ou aprofundamento analítico',
      },
      {
        grade: 4,
        text: 'Frequentemente, fazem parte da rotina de gestão mensal com análise de variações',
      },
      {
        grade: 5,
        text: 'São a base central da gestão, integrados ao dashboard executivo e a todas as decisões relevantes',
      },
    ],
  },
  {
    id: 'q7',
    number: '1.2.3',
    text: 'Com que frequência ocorrem ajustes relevantes nos demonstrativos após o fechamento contábil e quais são as principais causas?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 7,
    options: [
      {
        grade: 1,
        text: 'Ajustes constantes e em valores relevantes, os números mudam após cada divulgação dos demonstrativos',
      },
      {
        grade: 2,
        text: 'Ajustes recorrentes, mas concentrados em categorias conhecidas como provisões e competência',
      },
      {
        grade: 3,
        text: 'Ajustes eventuais, acontecem, mas já há consciência das causas e tentativas de controle',
      },
      {
        grade: 4,
        text: 'Ajustes raros, processo de fechamento é robusto o suficiente para prevenir a maioria das correções',
      },
      {
        grade: 5,
        text: 'Praticamente sem ajustes relevantes, controles preventivos e automatizados eliminam as causas na origem',
      },
    ],
  },
  {
    id: 'q8',
    number: '1.2.4',
    text: 'Os demonstrativos contábeis passam por revisão técnica (contábil e gerencial) antes de serem utilizados para decisões?',
    areaId: 'contabilidade',
    subAreaId: 'fechamento-e-confiabilidade',
    order: 8,
    options: [
      {
        grade: 1,
        text: 'Não há revisão, os dados saem direto da contabilidade externa sem qualquer validação interna',
      },
      {
        grade: 2,
        text: 'Revisão apenas pelo contador externo, sem validação gerencial ou cruzamento com dados operacionais',
      },
      {
        grade: 3,
        text: 'Revisão básica realizada internamente, focada em erros óbvios, sem análise de consistência ou variações',
      },
      {
        grade: 4,
        text: 'Revisão contábil e gerencial com análise de variações significativas antes da divulgação',
      },
      {
        grade: 5,
        text: 'Revisão estruturada com validação cruzada automática, aprovação formal e trilha de auditoria completa',
      },
    ],
  },
  {
    id: 'q9',
    number: '2.1.1',
    text: 'A empresa conhece e acompanha sua margem bruta com regularidade, entendendo os componentes de receita e custo direto que a compõem?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 9,
    options: [
      {
        grade: 1,
        text: 'Não conhece, nunca calculou margem bruta de forma estruturada',
      },
      {
        grade: 2,
        text: 'Estima informalmente, mas sem metodologia ou dados confiáveis para embasar o cálculo',
      },
      {
        grade: 3,
        text: 'Calcula eventualmente, geralmente após questionamento externo ou crise de caixa',
      },
      {
        grade: 4,
        text: 'Calcula mensalmente com metodologia definida e acompanha a evolução histórica',
      },
      {
        grade: 5,
        text: 'Analisa com metas definidas, histórico comparativo e alertas para desvios significativos',
      },
    ],
  },
  {
    id: 'q10',
    number: '2.1.2',
    text: 'A empresa calcula e monitora a margem de contribuição por produto ou linha de serviço, com clareza sobre quais geram mais ou menos resultado?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 10,
    options: [
      {
        grade: 1,
        text: 'Não, não existe cálculo de margem por produto, todos os produtos são tratados de forma homogênea',
      },
      {
        grade: 2,
        text: 'Estimativa informal, existe percepção de quais produtos são \'mais lucrativos\', mas sem dados formais',
      },
      {
        grade: 3,
        text: 'Cálculo eventual por linha geral de produto, sem granularidade por item ou SKU individual',
      },
      {
        grade: 4,
        text: 'Calcula por produto individual com metodologia definida e atualização periódica',
      },
      {
        grade: 5,
        text: 'Analisa por produto com histórico comparativo, metas por linha e integração ao modelo de precificação',
      },
    ],
  },
  {
    id: 'q11',
    number: '2.1.3',
    text: 'A empresa calcula e monitora a margem de contribuição por cliente ou canal de venda, identificando quais geram mais ou menos resultado?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 11,
    options: [
      {
        grade: 1,
        text: 'Não, todos os clientes são tratados como igualmente rentáveis, não existe segmentação por rentabilidade',
      },
      {
        grade: 2,
        text: 'Raramente, apenas quando um cliente demanda condições especiais ou gera algum conflito de interesse',
      },
      {
        grade: 3,
        text: 'Parcialmente, análise feita para os maiores clientes em momentos de renovação contratual',
      },
      {
        grade: 4,
        text: 'Estruturada, análise periódica por cliente com classificação por faixa de rentabilidade',
      },
      {
        grade: 5,
        text: 'Base para decisões comerciais, margem por cliente integrada ao CRM e às políticas de desconto e investimento',
      },
    ],
  },
  {
    id: 'q12',
    number: '2.1.4',
    text: 'As decisões comerciais (precificação, descontos, campanhas) são de forma regular embasadas em análise de margem antes de serem aprovadas?',
    areaId: 'controladoria',
    subAreaId: 'analise-de-margem',
    order: 12,
    options: [
      {
        grade: 1,
        text: 'Não, decisões comerciais são tomadas por intuição, pressão de mercado ou follow do concorrente, sem análise de margem',
      },
      {
        grade: 2,
        text: 'Ocasionalmente, margem é considerada em grandes negociações, mas não há processo formal',
      },
      {
        grade: 3,
        text: 'Parcialmente, algumas decisões incluem análise de margem, mas de forma inconsistente e não padronizada',
      },
      {
        grade: 4,
        text: 'Frequentemente, existe processo formal de aprovação com análise de margem para decisões relevantes',
      },
      {
        grade: 5,
        text: 'Sempre, análise de margem é pré-requisito formal para qualquer decisão comercial com impacto significativo',
      },
    ],
  },
  {
    id: 'q13',
    number: '2.2.1',
    text: 'A empresa conhece e calcula formalmente sua Necessidade de Capital de Giro (NCG), entendendo como o ciclo operacional impacta o caixa?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 13,
    options: [
      {
        grade: 1,
        text: 'Não calcula NCG, gestão de caixa é feita apenas por saldo disponível, sem visão estrutural do ciclo',
      },
      {
        grade: 2,
        text: 'Estima informalmente o descasamento de caixa, mas sem metodologia estruturada de NCG',
      },
      {
        grade: 3,
        text: 'Calcula eventualmente, geralmente após problema de caixa ou exigência de financiador',
      },
      {
        grade: 4,
        text: 'Calcula formalmente com periodicidade definida, monitorando tendências e comparando metas',
      },
      {
        grade: 5,
        text: 'NCG monitorada e projetada com integração ao fluxo de caixa e planejamento de capital',
      },
    ],
  },
  {
    id: 'q14',
    number: '2.2.2',
    text: 'A empresa monitora seus prazos médios de recebimento (PMR), pagamento (PMP) e estocagem (PME) e os utiliza para gestão do ciclo financeiro?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 14,
    options: [
      {
        grade: 1,
        text: 'Não monitora PMR, PMP ou PME, gestão de prazos é feita empiricamente, sem indicadores definidos',
      },
      {
        grade: 2,
        text: 'Tem conhecimento informal dos prazos médios, mas não faz o cálculo estruturado com dados reais',
      },
      {
        grade: 3,
        text: 'Calcula eventualmente, mas sem periodicidade ou uso regular na gestão do capital de giro',
      },
      {
        grade: 4,
        text: 'Calcula periodicamente com metas definidas e ações estruturadas para otimização de prazos',
      },
      {
        grade: 5,
        text: 'Utiliza os indicadores para decisões estratégicas de crédito, precificação e negociação com fornecedores',
      },
    ],
  },
  {
    id: 'q15',
    number: '2.2.3',
    text: 'A empresa já enfrentou situações relevantes de descasamento de capital de giro que comprometeram o cumprimento de obrigações financeiras?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 15,
    options: [
      {
        grade: 1,
        text: 'Frequentemente, descasamentos de caixa são recorrentes e frequentemente levam a atrasos em pagamentos',
      },
      {
        grade: 2,
        text: 'Recorrentemente, ocorrem de forma previsível, geralmente em determinados meses ou períodos',
      },
      {
        grade: 3,
        text: 'Eventualmente, ocorreram episódios isolados, geralmente associados a crescimento rápido ou sazonalidade',
      },
      {
        grade: 4,
        text: 'Raramente, o processo de gestão de capital de giro previne a maioria dos descasamentos',
      },
      {
        grade: 5,
        text: 'Não ou controlado, qualquer tendência de descasamento é identificada e tratada com antecedência',
      },
    ],
  },
  {
    id: 'q16',
    number: '2.2.4',
    text: 'A empresa acompanha formalmente seu ciclo de caixa (dias de prazo de recebimento, dias de prazo de pagamento) e toma ações sistemáticas para otimizá-lo?',
    areaId: 'controladoria',
    subAreaId: 'capital-de-giro',
    order: 16,
    options: [
      {
        grade: 1,
        text: 'Não conhece o conceito de ciclo de caixa ou não o aplica à gestão',
      },
      {
        grade: 2,
        text: 'Tem noção informal do ciclo, mas não mensura ou registra de forma estruturada',
      },
      {
        grade: 3,
        text: 'Calcula periodicamente, mas as ações de otimização são pontuais e não sistemáticas',
      },
      {
        grade: 4,
        text: 'Calcula com regularidade, tem metas definidas e gera ações estruturadas para redução do ciclo',
      },
      {
        grade: 5,
        text: 'Integra o ciclo de caixa ao planejamento estratégico e às decisões de precificação, crédito e suprimentos',
      },
    ],
  },
  {
    id: 'q17',
    number: '2.3.1',
    text: 'A empresa conhece o custo efetivo de toda a sua dívida (taxa anual equivalente), incluindo tarifas, IOF e outros encargos além da taxa nominal?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 17,
    options: [
      {
        grade: 1,
        text: 'Não, não sabe o custo real da dívida, contratou crédito sem calcular o CET (Custo Efetivo Total)',
      },
      {
        grade: 2,
        text: 'Conhece apenas a taxa nominal dos principais contratos, sem considerar encargos adicionais',
      },
      {
        grade: 3,
        text: 'Calcula eventualmente para novos contratos, mas não monitora o custo da carteira completa',
      },
      {
        grade: 4,
        text: 'Calcula e monitora o custo médio da dívida periodicamente com visão de toda a carteira',
      },
      {
        grade: 5,
        text: 'Monitora estrategicamente com mapa atualizado, benchmarking de mercado e negociação proativa',
      },
    ],
  },
  {
    id: 'q18',
    number: '2.3.2',
    text: 'A empresa possui um controle formal do perfil de vencimento da sua dívida, identificando o volume de amortizações nos próximos 12 meses e o alinhamento com a geração de caixa?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 18,
    options: [
      {
        grade: 1,
        text: 'Não, não tem visibilidade do vencimento das dívidas, descobre as amortizações quando elas vencem',
      },
      {
        grade: 2,
        text: 'Controle informal baseado na memória do sócio ou em notificações bancárias',
      },
      {
        grade: 3,
        text: 'Controle básico com planilha de vencimentos, mas sem integração ao fluxo de caixa',
      },
      {
        grade: 4,
        text: 'Controle estruturado com cronograma de amortizações integrado ao fluxo de caixa projetado',
      },
      {
        grade: 5,
        text: 'Gestão ativa com mapa completo, perfil de vencimentos diversificado e estratégia de rolagem documentada',
      },
    ],
  },
  {
    id: 'q19',
    number: '2.3.3',
    text: 'A empresa avalia formalmente o alinhamento entre o perfil da sua dívida e sua capacidade de geração de caixa operacional (EBITDA ou FCO)?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 19,
    options: [
      {
        grade: 1,
        text: 'Não, tomou crédito sem avaliar impacto na geração de caixa, dívida não foi planejada estrategicamente',
      },
      {
        grade: 2,
        text: 'Avaliação parcial e informal no momento da contratação, não monitora continuamente o alinhamento',
      },
      {
        grade: 3,
        text: 'Adequação básica verificada na contratação, mas sem indicadores formais de cobertura ou monitoramento',
      },
      {
        grade: 4,
        text: 'Avaliação estruturada com indicadores de cobertura (ex. Dívida/EBITDA, DSCR) monitorados periodicamente',
      },
      {
        grade: 5,
        text: 'Estratégia de capital integrada ao planejamento financeiro, com indicadores de cobertura e limite de alavancagem definidos',
      },
    ],
  },
  {
    id: 'q20',
    number: '2.3.4',
    text: 'A empresa possui uma estratégia formal de estrutura de capital, definindo o mix ideal entre capital próprio e de terceiros e os critérios para novas captações?',
    areaId: 'controladoria',
    subAreaId: 'endividamento',
    order: 20,
    options: [
      {
        grade: 1,
        text: 'Não, não existe estratégia de capital, captação de crédito é reativa a necessidades imediatas de caixa',
      },
      {
        grade: 2,
        text: 'Estratégia informal baseada na experiência do sócio, sem documentação ou critérios objetivos',
      },
      {
        grade: 3,
        text: 'Estratégia parcial com alguns critérios definidos, mas sem formalização ou aprovação da liderança',
      },
      {
        grade: 4,
        text: 'Estratégia formalizada com mix-alvo definido, critérios de captação documentados e revisão periódica',
      },
      {
        grade: 5,
        text: 'Estratégia de capital integrada ao planejamento estratégico, com análise de WACC e otimização do custo de capital',
      },
    ],
  },
  {
    id: 'q21',
    number: '2.4.1',
    text: 'A empresa classifica seus custos entre fixos e variáveis com metodologia definida, permitindo calcular o ponto de equilíbrio e a alavancagem operacional?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 21,
    options: [
      {
        grade: 1,
        text: 'Não, todos os custos são tratados da mesma forma, sem separação entre fixo e variável',
      },
      {
        grade: 2,
        text: 'Separação parcial e informal, existe percepção de quais custos são fixos, mas sem documentação ou consistência',
      },
      {
        grade: 3,
        text: 'Estrutura básica de classificação existente, mas sem uso regular para análise gerencial',
      },
      {
        grade: 4,
        text: 'Classificação consistente com atualização periódica, usada para análise de ponto de equilíbrio e decisões operacionais',
      },
      {
        grade: 5,
        text: 'Estrutura sofisticada com análise de alavancagem operacional e simulações de impacto de volume na margem',
      },
    ],
  },
  {
    id: 'q22',
    number: '2.4.2',
    text: 'A empresa realiza rateio dos custos indiretos com critério técnico definido, garantindo que a análise de rentabilidade por produto ou área reflita o custo real?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 22,
    options: [
      {
        grade: 1,
        text: 'Não existe rateio, custos indiretos são tratados como massa única sem alocação por produto ou área',
      },
      {
        grade: 2,
        text: 'Rateio simples e uniforme (ex, percentual fixo sobre receita) sem critério técnico ou adequação à realidade',
      },
      {
        grade: 3,
        text: 'Rateio básico com algum critério (ex, horas de uso, área ocupada), aplicado de forma não regular',
      },
      {
        grade: 4,
        text: 'Rateio técnico com critérios definidos por categoria de custo e revisão periódica',
      },
      {
        grade: 5,
        text: 'Rateio estratégico com drivers específicos por tipo de custo indireto, integrado ao modelo de rentabilidade',
      },
    ],
  },
  {
    id: 'q23',
    number: '2.4.3',
    text: 'A empresa conhece e monitora seu ponto de equilíbrio, sabendo o faturamento mínimo necessário para cobrir todos os seus custos e despesas?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 23,
    options: [
      {
        grade: 1,
        text: 'Não, nunca calculou o ponto de equilíbrio, não sabe qual é o faturamento mínimo para não ter prejuízo',
      },
      {
        grade: 2,
        text: 'Estimativa informal, baseada na percepção do sócio sobre \'o quanto é necessário para pagar as contas\'',
      },
      {
        grade: 3,
        text: 'Calculou eventualmente, mas não atualiza com regularidade nem usa na gestão operacional',
      },
      {
        grade: 4,
        text: 'Calcula mensalmente com metodologia consistente e usa o PE para monitorar a saúde operacional',
      },
      {
        grade: 5,
        text: 'Monitora PE de forma estruturada com alertas, histórico e integração às metas e ao orçamento',
      },
    ],
  },
  {
    id: 'q24',
    number: '2.4.4',
    text: 'A empresa analisa sua alavancagem operacional, entendendo como variações no volume de vendas impactam de forma desproporcional o resultado operacional?',
    areaId: 'controladoria',
    subAreaId: 'estrutura-de-custos',
    order: 24,
    options: [
      {
        grade: 1,
        text: 'Não, o conceito de alavancagem operacional não é conhecido ou aplicado na gestão',
      },
      {
        grade: 2,
        text: 'Conhecimento conceitual superficial, mas sem aplicação prática ou cálculo estruturado',
      },
      {
        grade: 3,
        text: 'Aplicação eventual em análises específicas, mas sem rotina ou integração à gestão mensal',
      },
      {
        grade: 4,
        text: 'Aplicação estruturada com cálculo periódico e uso em decisões de capacidade e expansão',
      },
      {
        grade: 5,
        text: 'Aplicação estratégica com simulações de cenários e integração ao planejamento de longo prazo',
      },
    ],
  },
  {
    id: 'q25',
    number: '3.1.1',
    text: 'A empresa possui fluxo de caixa projetado com horizonte mínimo de 30 dias, atualizado com frequência definida?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 25,
    options: [
      {
        grade: 1,
        text: 'Não existe fluxo de caixa projetado, a gestão de caixa é feita apenas pelo saldo disponível no dia',
      },
      {
        grade: 2,
        text: 'Controle realizado somente, registra o que aconteceu, mas não projeta o que vai acontecer',
      },
      {
        grade: 3,
        text: 'Projeção de curtíssimo prazo (até 15 dias) feita de forma informal e atualizada esporadicamente',
      },
      {
        grade: 4,
        text: 'Projeção mensal com atualização semanal, entradas e saídas mapeadas com razoável precisão',
      },
      {
        grade: 5,
        text: 'Projeção estruturada com cenários (base/otimista/conservador), horizonte de 90+ dias e alta acurácia',
      },
    ],
  },
  {
    id: 'q26',
    number: '3.1.2',
    text: 'Com que frequência o fluxo de caixa é atualizado e quem é o responsável formal por essa atualização?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 26,
    options: [
      {
        grade: 1,
        text: 'Não é atualizado, quando existe, é uma foto estática sem manutenção',
      },
      {
        grade: 2,
        text: 'Atualização esporádica, geralmente quando há pressão de caixa ou solicitação da diretoria',
      },
      {
        grade: 3,
        text: 'Atualização mensal, com dados do mês encerrado e projeção básica para o mês seguinte',
      },
      {
        grade: 4,
        text: 'Atualização semanal com responsável definido, premissas documentadas e aprovação da gestão',
      },
      {
        grade: 5,
        text: 'Atualização diária ou automatizada por integração com sistema bancário e ERP',
      },
    ],
  },
  {
    id: 'q27',
    number: '3.1.3',
    text: 'O fluxo de caixa é utilizado como ferramenta de planejamento e tomada de decisão, ou apenas como registro histórico?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 27,
    options: [
      {
        grade: 1,
        text: 'Registro histórico, o fluxo registra o que aconteceu, mas não influencia decisões futuras',
      },
      {
        grade: 2,
        text: 'Controle básico, usado para verificar saldo disponível, mas não para planejar receitas e despesas futuras',
      },
      {
        grade: 3,
        text: 'Planejamento de curto prazo, algumas decisões de prazo imediato são baseadas no fluxo, mas de forma pontual',
      },
      {
        grade: 4,
        text: 'Planejamento estruturado, o fluxo é insumo obrigatório nas decisões de pagamento, compra e investimento',
      },
      {
        grade: 5,
        text: 'Planejamento estratégico com simulações, cenários de crescimento e crises são modelados no fluxo',
      },
    ],
  },
  {
    id: 'q28',
    number: '3.1.4',
    text: 'A empresa realiza simulações de cenários financeiros no fluxo de caixa para avaliar o impacto de decisões como expansão, contratação ou perda de cliente relevante?',
    areaId: 'financeiro',
    subAreaId: 'controle-de-caixa',
    order: 28,
    options: [
      {
        grade: 1,
        text: 'Não, não há simulação de cenários, decisões são tomadas com base no cenário atual sem análise de sensibilidade',
      },
      {
        grade: 2,
        text: 'Simulações informais e mentais feitas pelo sócio, sem registro ou base de dados estruturada',
      },
      {
        grade: 3,
        text: 'Simulações simples e pontuais para decisões específicas, sem metodologia padronizada',
      },
      {
        grade: 4,
        text: 'Simulações estruturadas para decisões relevantes, com premissas documentadas e 2-3 cenários formalizados',
      },
      {
        grade: 5,
        text: 'Modelagem financeira avançada com cenários probabilísticos e integração ao planejamento estratégico',
      },
    ],
  },
  {
    id: 'q29',
    number: '3.2.1',
    text: 'A empresa realiza conciliação bancária com frequência definida, garantindo que os registros financeiros estejam alinhados com os extratos bancários?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 29,
    options: [
      {
        grade: 1,
        text: 'Não realiza, os extratos bancários nunca são cruzados com os registros internos do sistema',
      },
      {
        grade: 2,
        text: 'Realização esporádica, geralmente quando há discrepância percebida ou exigência de auditoria',
      },
      {
        grade: 3,
        text: 'Conciliação mensal realizada pelo contador ou equipe financeira, após o fechamento do mês',
      },
      {
        grade: 4,
        text: 'Conciliação semanal com responsável definido, checklist padronizado e divergências documentadas',
      },
      {
        grade: 5,
        text: 'Conciliação automatizada e auditável com alertas de divergência em tempo real e trilha completa',
      },
    ],
  },
  {
    id: 'q30',
    number: '3.2.2',
    text: 'A empresa possui controle estruturado de contas a pagar e receber com sistema ou planilha padronizada, aging report e responsável definido?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 30,
    options: [
      {
        grade: 1,
        text: 'Manual e desorganizado. AP e AR são controlados de memória ou em anotações sem sistema',
      },
      {
        grade: 2,
        text: 'Planilhas básicas sem padronização, com alto risco de duplicidade e esquecimento de vencimentos',
      },
      {
        grade: 3,
        text: 'Sistema simples implantado (ERP básico ou planilha estruturada), mas com inconsistências de cadastro',
      },
      {
        grade: 4,
        text: 'Sistema integrado com aging report gerado regularmente e responsável definido por follow-up',
      },
      {
        grade: 5,
        text: 'Sistema integrado com indicadores de desempenho, alerta automático de vencimentos e relatórios gerenciais',
      },
    ],
  },
  {
    id: 'q31',
    number: '3.2.3',
    text: 'Existe segregação de funções no processo financeiro, garantindo que quem solicita, aprova, executa e concilia pagamentos sejam pessoas ou alçadas diferentes?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 31,
    options: [
      {
        grade: 1,
        text: 'Não existe, uma única pessoa (geralmente o sócio ou um colaborador de confiança) concentra todas as etapas do processo financeiro',
      },
      {
        grade: 2,
        text: 'Segregação parcial e informal, algumas etapas são feitas por pessoas diferentes, mas sem processo documentado',
      },
      {
        grade: 3,
        text: 'Estrutura básica de segregação com distinção entre solicitante e pagador, mas sem controles formais',
      },
      {
        grade: 4,
        text: 'Segregação estruturada com alçadas definidas, aprovação documentada e processo formal por tipo de transação',
      },
      {
        grade: 5,
        text: 'Segregação completa com controles internos, trilha de auditoria, dupla assinatura em banco e revisão periódica',
      },
    ],
  },
  {
    id: 'q32',
    number: '3.2.4',
    text: 'Existem políticas formais de aprovação financeira documentadas, com alçadas definidas por nível hierárquico e tipo de transação?',
    areaId: 'financeiro',
    subAreaId: 'processos-financeiros',
    order: 32,
    options: [
      {
        grade: 1,
        text: 'Não existem, todas as decisões de pagamento e compromisso financeiro passam pelo sócio sem critério formal',
      },
      {
        grade: 2,
        text: 'Políticas informais baseadas na experiência do sócio, transmitidas verbalmente sem documentação',
      },
      {
        grade: 3,
        text: 'Algumas alçadas parcialmente formalizadas, mas sem cobertura completa dos tipos de transação',
      },
      {
        grade: 4,
        text: 'Políticas formalizadas e documentadas com alçadas por valor e tipo de transação, revisadas periodicamente',
      },
      {
        grade: 5,
        text: 'Políticas formalizadas, publicadas, auditadas e integradas ao sistema de aprovação digital com trilha completa',
      },
    ],
  },
  {
    id: 'q33',
    number: '4.1.1',
    text: 'A empresa possui um calendário fiscal formalizado com todas as obrigações acessórias e principais, prazos e responsáveis definidos?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 33,
    options: [
      {
        grade: 1,
        text: 'Não possui, obrigações fiscais são lembradas de forma reativa, geralmente por alertas do contador externo',
      },
      {
        grade: 2,
        text: 'Controle informal via e-mail do contador ou lembrete de celular, sem documentação própria',
      },
      {
        grade: 3,
        text: 'Calendário básico estruturado pelo contador externo, mas sem acompanhamento interno regular',
      },
      {
        grade: 4,
        text: 'Calendário formal com responsáveis internos definidos e revisão mensal de cumprimento',
      },
      {
        grade: 5,
        text: 'Calendário integrado ao sistema com alertas automáticos, controle de evidências e auditoria preventiva',
      },
    ],
  },
  {
    id: 'q34',
    number: '4.1.2',
    text: 'Existe controle formal e integrado dos tributos a recolher, com projeção do impacto no caixa e conciliação regular com a contabilidade?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 34,
    options: [
      {
        grade: 1,
        text: 'Não há controle formal, o valor dos tributos é conhecido apenas no momento do vencimento',
      },
      {
        grade: 2,
        text: 'Controle via planilha básica com valores informados pelo contador, sem projeção antecipada',
      },
      {
        grade: 3,
        text: 'Controle estruturado por período com valores calculados, mas sem integração com o fluxo de caixa',
      },
      {
        grade: 4,
        text: 'Controle integrado com financeiro, valores projetados com antecedência e conciliação mensal com contabilidade',
      },
      {
        grade: 5,
        text: 'Controle integrado com projeção de impacto no caixa de 60-90 dias e sistema automatizado de lançamentos',
      },
    ],
  },
  {
    id: 'q35',
    number: '4.1.3',
    text: 'A empresa tem histórico de atrasos recorrentes no cumprimento de obrigações acessórias e quais são os impactos financeiros (multas, juros, autuações) desses atrasos?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 35,
    options: [
      {
        grade: 1,
        text: 'Atrasos frequentes com multas recorrentes que impactam significativamente o resultado financeiro',
      },
      {
        grade: 2,
        text: 'Atrasos ocasionais por falta de controle ou descuido, com multas pontuais mas relevantes',
      },
      {
        grade: 3,
        text: 'Cumprimento regular com pequenos ajustes e multas de pequeno valor em menos de 20% das obrigações',
      },
      {
        grade: 4,
        text: 'Cumprimento pontual e monitorado, com histórico documentado e ações corretivas rápidas',
      },
      {
        grade: 5,
        text: 'Cumprimento automatizado com controle preventivo, zero multas nos últimos 12 meses e auditoria regular',
      },
    ],
  },
  {
    id: 'q36',
    number: '4.1.4',
    text: 'A empresa já sofreu autuações fiscais nos últimos 3 anos e existe gestão formal dos riscos e contingências tributárias?',
    areaId: 'fiscal',
    subAreaId: 'conformidade-tributaria',
    order: 36,
    options: [
      {
        grade: 1,
        text: 'Autuações frequentes e significativas com passivo fiscal relevante sem gestão estruturada',
      },
      {
        grade: 2,
        text: 'Autuações pontuais com valores relevantes, registradas mas sem análise de causa ou plano preventivo',
      },
      {
        grade: 3,
        text: 'Autuações pequenas e esporádicas, com registro mas sem gestão formal de riscos tributários',
      },
      {
        grade: 4,
        text: 'Sem autuações relevantes nos últimos 3 anos, com gestão preventiva e revisão periódica dos riscos',
      },
      {
        grade: 5,
        text: 'Gestão preventiva estruturada com auditoria fiscal interna, mapeamento de contingências e assessoria jurídico-tributária',
      },
    ],
  },
  {
    id: 'q37',
    number: '4.2.1',
    text: 'A empresa realiza planejamento tributário estruturado, avaliando proativamente o regime mais adequado e as oportunidades de economia fiscal legítima?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 37,
    options: [
      {
        grade: 1,
        text: 'Não realiza, o regime tributário foi escolhido na abertura e nunca foi revisado',
      },
      {
        grade: 2,
        text: 'Reage apenas a mudanças legais obrigatórias, sem análise proativa de oportunidades',
      },
      {
        grade: 3,
        text: 'Planejamento básico anual realizado pelo contador, sem análise detalhada de cenários ou alternativas',
      },
      {
        grade: 4,
        text: 'Planejamento estruturado com análise de cenários, simulações e consideração de benefícios fiscais aplicáveis',
      },
      {
        grade: 5,
        text: 'Planejamento estratégico contínuo integrado ao orçamento e às decisões de expansão e precificação',
      },
    ],
  },
  {
    id: 'q38',
    number: '4.2.2',
    text: 'O regime tributário da empresa é revisado anualmente com simulação dos cenários disponíveis (Simples Nacional, Lucro Presumido, Lucro Real)?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 38,
    options: [
      {
        grade: 1,
        text: 'Não foi revisado, o regime definido na abertura permanece sem qualquer análise de adequação',
      },
      {
        grade: 2,
        text: 'Revisado apenas quando problema surge ou quando o contador menciona uma mudança obrigatória',
      },
      {
        grade: 3,
        text: 'Revisão eventual feita pelo contador, mas sem simulação quantitativa formal dos cenários',
      },
      {
        grade: 4,
        text: 'Revisão periódica estruturada com simulação dos três regimes e decisão documentada',
      },
      {
        grade: 5,
        text: 'Revisão estratégica contínua com análise de expansão, reestruturação societária e otimização de carga',
      },
    ],
  },
  {
    id: 'q39',
    number: '4.2.3',
    text: 'A empresa monitora e aproveita de forma regular os benefícios fiscais aplicáveis ao seu setor, regime ou localização?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 39,
    options: [
      {
        grade: 1,
        text: 'Não monitora, desconhece se existem benefícios fiscais aplicáveis ao seu negócio',
      },
      {
        grade: 2,
        text: 'Tem conhecimento superficial de alguns benefícios, mas não faz gestão ativa para aproveitamento',
      },
      {
        grade: 3,
        text: 'Avalia ocasionalmente benefícios quando o contador menciona, mas sem processo regular',
      },
      {
        grade: 4,
        text: 'Avaliação estruturada com mapeamento anual de benefícios aplicáveis e aproveitamento documentado',
      },
      {
        grade: 5,
        text: 'Estratégia ativa de aproveitamento de incentivos com monitoramento contínuo e integração ao planejamento',
      },
    ],
  },
  {
    id: 'q40',
    number: '4.2.4',
    text: 'O impacto tributário é considerado previamente nas decisões estratégicas relevantes (precificação, expansão, estrutura societária, novos produtos)?',
    areaId: 'fiscal',
    subAreaId: 'estrategia-e-planejamento-tributario',
    order: 40,
    options: [
      {
        grade: 1,
        text: 'Não, decisões estratégicas são tomadas sem qualquer análise do impacto tributário',
      },
      {
        grade: 2,
        text: 'Considerado apenas após a decisão tomada, quando o impacto fiscal já é um fato consumado',
      },
      {
        grade: 3,
        text: 'Considerado em decisões de maior porte, mas de forma informal e sem análise quantitativa',
      },
      {
        grade: 4,
        text: 'Considerado regularmente com análise quantitativa para decisões acima de determinado threshold',
      },
      {
        grade: 5,
        text: 'Integrado ao planejamento estratégico e financeiro como critério formal em todas as decisões relevantes',
      },
    ],
  },
  {
    id: 'q41',
    number: '5.1.1',
    text: 'A empresa possui KPIs financeiros formalmente definidos, com metodologia de cálculo documentada e acompanhamento periódico estruturado?',
    areaId: 'planejamento',
    subAreaId: 'indicadores-e-performance',
    order: 41,
    options: [
      {
        grade: 1,
        text: 'Não possui KPIs, a avaliação de desempenho é feita por percepção e comparação de saldos bancários',
      },
      {
        grade: 2,
        text: 'Alguns indicadores básicos acompanhados de forma informal, sem cálculo padronizado ou metas definidas',
      },
      {
        grade: 3,
        text: 'KPIs estruturados e acompanhados mensalmente, mas sem metas formais ou análise de desvios',
      },
      {
        grade: 4,
        text: 'KPIs financeiros definidos com metas, metodologia documentada e análise mensal de variações',
      },
      {
        grade: 5,
        text: 'KPIs integrados ao sistema de gestão (BSC ou OKR) com dashboard automatizado e governança estabelecida',
      },
    ],
  },
  {
    id: 'q42',
    number: '5.1.2',
    text: 'Os indicadores financeiros são acompanhados em reuniões periódicas de resultado com pauta estruturada e decisões documentadas?',
    areaId: 'planejamento',
    subAreaId: 'indicadores-e-performance',
    order: 42,
    options: [
      {
        grade: 1,
        text: 'Não, os indicadores são calculados mas nunca discutidos em reunião formal de resultado',
      },
      {
        grade: 2,
        text: 'Reuniões esporádicas sem pauta definida, geralmente convocadas em situação de crise',
      },
      {
        grade: 3,
        text: 'Reunião mensal de resultado existente, mas sem pauta estruturada ou documentação das decisões',
      },
      {
        grade: 4,
        text: 'Reunião mensal com pauta estruturada, análise de variações e ações documentadas com responsáveis',
      },
      {
        grade: 5,
        text: 'Rito de gestão consolidado com reuniões mensais/quinzenais, dashboard atualizado e governança estabelecida',
      },
    ],
  },
  {
    id: 'q43',
    number: '5.1.3',
    text: 'Os indicadores financeiros possuem metas formais aprovadas pela diretoria e influenciam efetivamente as decisões estratégicas da empresa?',
    areaId: 'planejamento',
    subAreaId: 'indicadores-e-performance',
    order: 43,
    options: [
      {
        grade: 1,
        text: 'Não, não existem metas formais, indicadores são acompanhados sem referência de desempenho esperado',
      },
      {
        grade: 2,
        text: 'Metas informais transmitidas verbalmente pelo sócio, sem documentação ou aprovação formal',
      },
      {
        grade: 3,
        text: 'Metas parcialmente formalizadas para alguns indicadores, mas não revisadas ou vinculadas à estratégia',
      },
      {
        grade: 4,
        text: 'Metas formais aprovadas e documentadas para todos os KPIs principais, revisadas anualmente',
      },
      {
        grade: 5,
        text: 'Metas integradas ao sistema de gestão estratégica (BSC/OKR), revisadas periodicamente e vinculadas a incentivos',
      },
    ],
  },
  {
    id: 'q44',
    number: '5.1.4',
    text: 'Os indicadores financeiros são utilizados na tomada de decisões de investimento, expansão, contratação e estratégia, ou apenas como relatório de acompanhamento?',
    areaId: 'planejamento',
    subAreaId: 'indicadores-e-performance',
    order: 44,
    options: [
      {
        grade: 1,
        text: 'Não, os indicadores existem mas nunca são usados como insumo para decisões estratégicas relevantes',
      },
      {
        grade: 2,
        text: 'Raramente, consultados em grandes decisões, mas de forma superficial sem análise aprofundada',
      },
      {
        grade: 3,
        text: 'Parcialmente, parte das decisões usa os indicadores, mas sem processo formal e consistente',
      },
      {
        grade: 4,
        text: 'Frequentemente, indicadores são insumo obrigatório em decisões acima de um threshold definido',
      },
      {
        grade: 5,
        text: 'São a base da gestão estratégica, todas as decisões relevantes têm análise de KPIs como etapa obrigatória',
      },
    ],
  },
  {
    id: 'q45',
    number: '5.2.1',
    text: 'A empresa possui orçamento anual formalizado, construído com premissas documentadas e aprovado pela liderança?',
    areaId: 'planejamento',
    subAreaId: 'orcamento-e-forecast',
    order: 45,
    options: [
      {
        grade: 1,
        text: 'Não, não existe orçamento, o crescimento é gerenciado de forma reativa sem planejamento formal',
      },
      {
        grade: 2,
        text: 'Orçamento informal na cabeça do sócio, sem documentação ou processo de construção estruturado',
      },
      {
        grade: 3,
        text: 'Orçamento básico elaborado, mas com premissas não documentadas e sem aprovação formal',
      },
      {
        grade: 4,
        text: 'Orçamento formalizado com premissas documentadas, aprovado pela liderança e comunicado ao time',
      },
      {
        grade: 5,
        text: 'Orçamento integrado ao planejamento estratégico com metas desdobradas por área e revisado periodicamente',
      },
    ],
  },
  {
    id: 'q46',
    number: '5.2.2',
    text: 'A empresa realiza análise de orçado vs. realizado com frequência mensal, identificando e documentando as causas dos desvios mais relevantes?',
    areaId: 'planejamento',
    subAreaId: 'orcamento-e-forecast',
    order: 46,
    options: [
      {
        grade: 1,
        text: 'Não, não existe comparação entre orçado e realizado, não há monitoramento do cumprimento do orçamento',
      },
      {
        grade: 2,
        text: 'Comparação ocasional, sem frequência definida ou análise estruturada dos desvios identificados',
      },
      {
        grade: 3,
        text: 'Análise básica mensal com identificação das variações, mas sem análise de causa-raiz estruturada',
      },
      {
        grade: 4,
        text: 'Análise mensal estruturada com causa-raiz dos principais desvios e planos de ação documentados',
      },
      {
        grade: 5,
        text: 'Análise mensal com causa-raiz, plano de ação com responsáveis, follow-up e atualização do forecast',
      },
    ],
  },
  {
    id: 'q47',
    number: '5.2.3',
    text: 'A empresa possui processo de revisão periódica do orçamento (forecast), atualizando as projeções com base no cenário mais recente?',
    areaId: 'planejamento',
    subAreaId: 'orcamento-e-forecast',
    order: 47,
    options: [
      {
        grade: 1,
        text: 'Não, o orçamento anual é fixo e nunca revisado, mesmo com mudanças relevantes de contexto',
      },
      {
        grade: 2,
        text: 'Revisão apenas quando a divergência com o realizado é demasiado grande ou quando há decisão urgente',
      },
      {
        grade: 3,
        text: 'Revisão semestral básica, sem metodologia estruturada ou integração ao planejamento financeiro',
      },
      {
        grade: 4,
        text: 'Revisão trimestral com forecast atualizado e análise das mudanças de premissas relevantes',
      },
      {
        grade: 5,
        text: 'Forecast rolling mensal integrado ao fluxo de caixa, aos KPIs e às decisões estratégicas',
      },
    ],
  },
  {
    id: 'q48',
    number: '5.2.4',
    text: 'A empresa realiza projeções financeiras de médio prazo (2-3 anos) para suportar decisões estratégicas de expansão, investimento ou captação?',
    areaId: 'planejamento',
    subAreaId: 'orcamento-e-forecast',
    order: 48,
    options: [
      {
        grade: 1,
        text: 'Não, o horizonte de planejamento é limitado ao ano corrente, sem visão de médio ou longo prazo',
      },
      {
        grade: 2,
        text: 'Projeções informais e imprecisas do sócio para o próximo ano, sem metodologia ou base de dados',
      },
      {
        grade: 3,
        text: 'Projeção simples para 1-2 anos, sem cenários ou integração ao planejamento estratégico',
      },
      {
        grade: 4,
        text: 'Projeção estruturada para 2-3 anos com premissas documentadas e integração às decisões estratégicas',
      },
      {
        grade: 5,
        text: 'Modelagem estratégica com cenários para 3-5 anos integrada ao BSC/OKR e ao plano de captação',
      },
    ],
  },
  {
    id: 'q49',
    number: '6.1.1',
    text: 'A empresa possui um processo estruturado de funil de vendas com etapas definidas e critérios de avanço entre fases?',
    areaId: 'comercial',
    subAreaId: 'gestao-do-pipeline-e-funil-de-vendas',
    order: 49,
    options: [
      {
        grade: 1,
        text: 'Não existe funil. Vendas são feitas por relacionamento informal sem processo definido.',
      },
      {
        grade: 2,
        text: 'Existe um funil mental ou informal, mas sem registro, critérios ou etapas documentadas.',
      },
      {
        grade: 3,
        text: 'Funil definido com etapas básicas, mas sem critérios objetivos de avanço ou registro regular.',
      },
      {
        grade: 4,
        text: 'Funil estruturado com etapas, critérios de qualificação e registro em CRM ou planilha padronizada.',
      },
      {
        grade: 5,
        text: 'Funil integrado ao CRM com critérios claros, taxas de conversão monitoradas e forecast de vendas.',
      },
    ],
  },
  {
    id: 'q50',
    number: '6.1.2',
    text: 'Existe acompanhamento periódico do pipeline com visibilidade sobre volume, valor e probabilidade de fechamento das oportunidades?',
    areaId: 'comercial',
    subAreaId: 'gestao-do-pipeline-e-funil-de-vendas',
    order: 50,
    options: [
      {
        grade: 1,
        text: 'Nenhum acompanhamento. O sócio sabe \'de cabeça\' quais clientes estão sendo trabalhados.',
      },
      {
        grade: 2,
        text: 'Acompanhamento esporádico, sem padronização de critérios ou valor estimado das oportunidades.',
      },
      {
        grade: 3,
        text: 'Reuniões periódicas de pipeline, mas sem dados quantitativos confiáveis de valor e probabilidade.',
      },
      {
        grade: 4,
        text: 'Pipeline monitorado semanalmente com valor, estágio, probabilidade e responsável por oportunidade.',
      },
      {
        grade: 5,
        text: 'Pipeline com forecast mensal/trimestral, integrado ao planejamento financeiro e com alertas automatizados.',
      },
    ],
  },
  {
    id: 'q51',
    number: '6.1.3',
    text: 'A empresa mensura e acompanha as taxas de conversão entre as etapas do funil (lead, proposta, fechamento)?',
    areaId: 'comercial',
    subAreaId: 'gestao-do-pipeline-e-funil-de-vendas',
    order: 51,
    options: [
      {
        grade: 1,
        text: 'Não mede conversão. Não sabe quantos leads viram clientes.',
      },
      {
        grade: 2,
        text: 'Sabe aproximadamente a taxa final de fechamento, mas não por etapa do funil.',
      },
      {
        grade: 3,
        text: 'Mede conversão entre algumas etapas, mas sem histórico ou análise de tendência.',
      },
      {
        grade: 4,
        text: 'Taxas de conversão por etapa monitoradas mensalmente com análise de variações.',
      },
      {
        grade: 5,
        text: 'Taxas de conversão por etapa, canal, produto e vendedor, usadas para decisões estratégicas de alocação.',
      },
    ],
  },
  {
    id: 'q52',
    number: '6.2.1',
    text: 'O processo de precificação é baseado em análise de custos, margem-alvo e posicionamento competitivo, ou é feito de forma intuitiva?',
    areaId: 'comercial',
    subAreaId: 'precificacao-e-rentabilidade-comercial',
    order: 52,
    options: [
      {
        grade: 1,
        text: 'Precificação intuitiva. Preço definido pelo sócio \'no feeling\' ou copiado do concorrente.',
      },
      {
        grade: 2,
        text: 'Considera custo básico de forma informal, mas sem metodologia estruturada ou margem-alvo definida.',
      },
      {
        grade: 3,
        text: 'Precificação baseada em custo, mas sem considerar margem-alvo formal ou posicionamento estratégico.',
      },
      {
        grade: 4,
        text: 'Metodologia estruturada, custo + margem-alvo + análise competitiva, revisada periodicamente.',
      },
      {
        grade: 5,
        text: 'Precificação dinâmica por segmento, canal e cliente, com simulação de sensibilidade e margem de contribuição.',
      },
    ],
  },
  {
    id: 'q53',
    number: '6.2.2',
    text: 'A empresa conhece a rentabilidade real por cliente, produto ou serviço prestado após deduzir todos os custos diretos e indiretos?',
    areaId: 'comercial',
    subAreaId: 'precificacao-e-rentabilidade-comercial',
    order: 53,
    options: [
      {
        grade: 1,
        text: 'Não sabe quais clientes ou produtos são lucrativos. Acredita que \'vender mais é sempre positivo\'.',
      },
      {
        grade: 2,
        text: 'Tem percepção informal de quais clientes são mais rentáveis, mas sem cálculo estruturado.',
      },
      {
        grade: 3,
        text: 'Calcula rentabilidade por produto/serviço eventualmente, mas sem incorporar custos indiretos.',
      },
      {
        grade: 4,
        text: 'Rentabilidade por cliente e produto calculada mensalmente, considerando custos diretos e indiretos.',
      },
      {
        grade: 5,
        text: 'Análise de rentabilidade integrada ao CRM, decisões de mix, precificação e desconto baseadas em margem real.',
      },
    ],
  },
  {
    id: 'q54',
    number: '6.2.3',
    text: 'Existe uma política formal de descontos com alçadas de aprovação definidas por nível hierárquico?',
    areaId: 'comercial',
    subAreaId: 'precificacao-e-rentabilidade-comercial',
    order: 54,
    options: [
      {
        grade: 1,
        text: 'Não existe política. Qualquer vendedor concede o desconto que quiser para fechar negócio.',
      },
      {
        grade: 2,
        text: 'O sócio aprova descontos informalmente, mas sem critérios documentados ou limites definidos.',
      },
      {
        grade: 3,
        text: 'Existe limite de desconto informal por vendedor, mas sem documento formal ou controle regular.',
      },
      {
        grade: 4,
        text: 'Política de descontos documentada com alçadas por nível e impacto mínimo de margem exigido.',
      },
      {
        grade: 5,
        text: 'Política de descontos automatizada no CRM, com aprovação por fluxo, registro e análise de impacto na margem.',
      },
    ],
  },
];

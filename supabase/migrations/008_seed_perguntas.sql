-- ========================================
-- Migration 008: Seed perguntas (48 perguntas)
-- Diagnostico 360 - O2 Inc
-- ========================================

INSERT INTO public.perguntas (id, subarea_id, codigo, texto, ordem) VALUES
    -- Area 1: Contabilidade > Estrutura Contábil (q1-q4)
    (md5('pergunta:q1')::uuid, md5('subarea:estrutura-contabil')::uuid, 'q1', 'Plano de contas permite análise gerencial?', 1),
    (md5('pergunta:q2')::uuid, md5('subarea:estrutura-contabil')::uuid, 'q2', 'A contabilidade é utilizada apenas para fins fiscais ou também para gestão?', 2),
    (md5('pergunta:q3')::uuid, md5('subarea:estrutura-contabil')::uuid, 'q3', 'Existe integração entre contabilidade e financeiro?', 3),
    (md5('pergunta:q4')::uuid, md5('subarea:estrutura-contabil')::uuid, 'q4', 'Os relatórios contábeis refletem a realidade operacional?', 4),

    -- Area 1: Contabilidade > Fechamento e Confiabilidade (q5-q8)
    (md5('pergunta:q5')::uuid, md5('subarea:fechamento-e-confiabilidade')::uuid, 'q5', 'O fechamento contábil ocorre com qual periodicidade?', 5),
    (md5('pergunta:q6')::uuid, md5('subarea:fechamento-e-confiabilidade')::uuid, 'q6', 'Há revisão técnica dos demonstrativos?', 6),
    (md5('pergunta:q7')::uuid, md5('subarea:fechamento-e-confiabilidade')::uuid, 'q7', 'Existem ajustes frequentes após fechamento?', 7),
    (md5('pergunta:q8')::uuid, md5('subarea:fechamento-e-confiabilidade')::uuid, 'q8', 'DRE/Balanço são utilizados para decisões?', 8),

    -- Area 2: Financeiro > Controle de Caixa (q9-q12)
    (md5('pergunta:q9')::uuid, md5('subarea:controle-de-caixa')::uuid, 'q9', 'Existe fluxo de caixa projetado?', 9),
    (md5('pergunta:q10')::uuid, md5('subarea:controle-de-caixa')::uuid, 'q10', 'Frequência de atualização do fluxo de Caixa?', 10),
    (md5('pergunta:q11')::uuid, md5('subarea:controle-de-caixa')::uuid, 'q11', 'Caixa é usado para planejamento?', 11),
    (md5('pergunta:q12')::uuid, md5('subarea:controle-de-caixa')::uuid, 'q12', 'Há simulação de cenários financeiros?', 12),

    -- Area 2: Financeiro > Processos Financeiros (q13-q16)
    (md5('pergunta:q13')::uuid, md5('subarea:processos-financeiros')::uuid, 'q13', 'Conciliações bancárias são realizadas?', 13),
    (md5('pergunta:q14')::uuid, md5('subarea:processos-financeiros')::uuid, 'q14', 'Existe segregação de funções?', 14),
    (md5('pergunta:q15')::uuid, md5('subarea:processos-financeiros')::uuid, 'q15', 'Controle de contas a pagar/receber?', 15),
    (md5('pergunta:q16')::uuid, md5('subarea:processos-financeiros')::uuid, 'q16', 'Existem políticas formais de aprovação?', 16),

    -- Area 3: Controladoria > Análise de Margem (q17-q20)
    (md5('pergunta:q17')::uuid, md5('subarea:analise-de-margem')::uuid, 'q17', 'Conhece margem bruta?', 17),
    (md5('pergunta:q18')::uuid, md5('subarea:analise-de-margem')::uuid, 'q18', 'Margem por produto/serviço?', 18),
    (md5('pergunta:q19')::uuid, md5('subarea:analise-de-margem')::uuid, 'q19', 'Margem por cliente/canal?', 19),
    (md5('pergunta:q20')::uuid, md5('subarea:analise-de-margem')::uuid, 'q20', 'Decisões comerciais consideram margem?', 20),

    -- Area 3: Controladoria > Estrutura de Custos (q21-q24)
    (md5('pergunta:q21')::uuid, md5('subarea:estrutura-de-custos')::uuid, 'q21', 'Classificação fixo/variável?', 21),
    (md5('pergunta:q22')::uuid, md5('subarea:estrutura-de-custos')::uuid, 'q22', 'Rateio de custos indiretos?', 22),
    (md5('pergunta:q23')::uuid, md5('subarea:estrutura-de-custos')::uuid, 'q23', 'Conhece ponto de equilíbrio?', 23),
    (md5('pergunta:q24')::uuid, md5('subarea:estrutura-de-custos')::uuid, 'q24', 'Existe análise de alavancagem operacional?', 24),

    -- Area 3: Controladoria > Capital de Giro (q25-q28)
    (md5('pergunta:q25')::uuid, md5('subarea:capital-de-giro')::uuid, 'q25', 'Monitora PMR, PMP e PME?', 25),
    (md5('pergunta:q26')::uuid, md5('subarea:capital-de-giro')::uuid, 'q26', 'Cálculo formal da NCG?', 26),
    (md5('pergunta:q27')::uuid, md5('subarea:capital-de-giro')::uuid, 'q27', 'Ciclo financeiro acompanhado?', 27),
    (md5('pergunta:q28')::uuid, md5('subarea:capital-de-giro')::uuid, 'q28', 'Já enfrentou descasamento relevante no Capital de Giro?', 28),

    -- Area 3: Controladoria > Endividamento (q29-q32)
    (md5('pergunta:q29')::uuid, md5('subarea:endividamento')::uuid, 'q29', 'Controle do perfil da dívida?', 29),
    (md5('pergunta:q30')::uuid, md5('subarea:endividamento')::uuid, 'q30', 'Conhece custo médio da dívida?', 30),
    (md5('pergunta:q31')::uuid, md5('subarea:endividamento')::uuid, 'q31', 'Dívida alinhada à geração de caixa?', 31),
    (md5('pergunta:q32')::uuid, md5('subarea:endividamento')::uuid, 'q32', 'Existe estratégia formal de capital?', 32),

    -- Area 4: Planejamento > Orçamento e Forecast (q33-q36)
    (md5('pergunta:q33')::uuid, md5('subarea:orcamento-e-forecast')::uuid, 'q33', 'Existe orçamento anual?', 33),
    (md5('pergunta:q34')::uuid, md5('subarea:orcamento-e-forecast')::uuid, 'q34', 'Revisão periódica do orçamento?', 34),
    (md5('pergunta:q35')::uuid, md5('subarea:orcamento-e-forecast')::uuid, 'q35', 'Análise orçado vs realizado?', 35),
    (md5('pergunta:q36')::uuid, md5('subarea:orcamento-e-forecast')::uuid, 'q36', 'Projeções financeiras de médio prazo?', 36),

    -- Area 4: Planejamento > Indicadores e Performance (q37-q40)
    (md5('pergunta:q37')::uuid, md5('subarea:indicadores-e-performance')::uuid, 'q37', 'Existem KPIs financeiros definidos?', 37),
    (md5('pergunta:q38')::uuid, md5('subarea:indicadores-e-performance')::uuid, 'q38', 'KPIs possuem metas formais?', 38),
    (md5('pergunta:q39')::uuid, md5('subarea:indicadores-e-performance')::uuid, 'q39', 'Acompanhamento periódico?', 39),
    (md5('pergunta:q40')::uuid, md5('subarea:indicadores-e-performance')::uuid, 'q40', 'Indicadores influenciam decisões estratégicas?', 40),

    -- Area 5: Fiscal > Conformidade Tributária (q41-q44)
    (md5('pergunta:q41')::uuid, md5('subarea:conformidade-tributaria')::uuid, 'q41', 'A empresa possui calendário fiscal formalizado?', 41),
    (md5('pergunta:q42')::uuid, md5('subarea:conformidade-tributaria')::uuid, 'q42', 'Existem atrasos recorrentes no cumprimento de obrigações acessórias?', 42),
    (md5('pergunta:q43')::uuid, md5('subarea:conformidade-tributaria')::uuid, 'q43', 'Existe controle formal de tributos a recolher?', 43),
    (md5('pergunta:q44')::uuid, md5('subarea:conformidade-tributaria')::uuid, 'q44', 'Já houve autuações fiscais relevantes nos últimos anos?', 44),

    -- Area 5: Fiscal > Estratégia e Planejamento Tributário (q45-q48)
    (md5('pergunta:q45')::uuid, md5('subarea:estrategia-e-planejamento-tributario')::uuid, 'q45', 'A empresa realiza planejamento tributário estruturado?', 45),
    (md5('pergunta:q46')::uuid, md5('subarea:estrategia-e-planejamento-tributario')::uuid, 'q46', 'Existe análise periódica do regime tributário?', 46),
    (md5('pergunta:q47')::uuid, md5('subarea:estrategia-e-planejamento-tributario')::uuid, 'q47', 'Há acompanhamento de benefícios fiscais aplicáveis?', 47),
    (md5('pergunta:q48')::uuid, md5('subarea:estrategia-e-planejamento-tributario')::uuid, 'q48', 'O impacto tributário é considerado nas decisões estratégicas?', 48)
ON CONFLICT (codigo) DO NOTHING;

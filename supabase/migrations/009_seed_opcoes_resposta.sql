-- ========================================
-- Migration 009: Seed opcoes_resposta (48 perguntas x 5 graus = 240 opcoes)
-- Diagnostico 360 - O2 Inc
-- ========================================

INSERT INTO public.opcoes_resposta (id, pergunta_id, grau, titulo, descricao) VALUES
    -- q1: Plano de contas permite análise gerencial?
    (md5('opcao:q1:1')::uuid, md5('pergunta:q1')::uuid, 1, 'Inexistente ou genérico', 'Inexistente ou genérico'),
    (md5('opcao:q1:2')::uuid, md5('pergunta:q1')::uuid, 2, 'Básico, sem detalhamento gerencial', 'Básico, sem detalhamento gerencial'),
    (md5('opcao:q1:3')::uuid, md5('pergunta:q1')::uuid, 3, 'Estruturado, mas sem centros de custo', 'Estruturado, mas sem centros de custo'),
    (md5('opcao:q1:4')::uuid, md5('pergunta:q1')::uuid, 4, 'Com centros de custo ou unidades', 'Com centros de custo ou unidades'),
    (md5('opcao:q1:5')::uuid, md5('pergunta:q1')::uuid, 5, 'Estruturado por unidade, projeto e visão estratégica', 'Estruturado por unidade, projeto e visão estratégica'),

    -- q2: A contabilidade é utilizada apenas para fins fiscais ou também para gestão?
    (md5('opcao:q2:1')::uuid, md5('pergunta:q2')::uuid, 1, 'Apenas fiscal', 'Apenas fiscal'),
    (md5('opcao:q2:2')::uuid, md5('pergunta:q2')::uuid, 2, 'Predominantemente fiscal', 'Predominantemente fiscal'),
    (md5('opcao:q2:3')::uuid, md5('pergunta:q2')::uuid, 3, 'Ocasionalmente usada para gestão', 'Ocasionalmente usada para gestão'),
    (md5('opcao:q2:4')::uuid, md5('pergunta:q2')::uuid, 4, 'Utilizada regularmente para análise', 'Utilizada regularmente para análise'),
    (md5('opcao:q2:5')::uuid, md5('pergunta:q2')::uuid, 5, 'Base principal para decisões estratégicas', 'Base principal para decisões estratégicas'),

    -- q3: Existe integração entre contabilidade e financeiro?
    (md5('opcao:q3:1')::uuid, md5('pergunta:q3')::uuid, 1, 'Não existe integração', 'Não existe integração'),
    (md5('opcao:q3:2')::uuid, md5('pergunta:q3')::uuid, 2, 'Integração manual e esporádica', 'Integração manual e esporádica'),
    (md5('opcao:q3:3')::uuid, md5('pergunta:q3')::uuid, 3, 'Integração parcial', 'Integração parcial'),
    (md5('opcao:q3:4')::uuid, md5('pergunta:q3')::uuid, 4, 'Integração estruturada', 'Integração estruturada'),
    (md5('opcao:q3:5')::uuid, md5('pergunta:q3')::uuid, 5, 'Integração automatizada e validada', 'Integração automatizada e validada'),

    -- q4: Os relatórios contábeis refletem a realidade operacional?
    (md5('opcao:q4:1')::uuid, md5('pergunta:q4')::uuid, 1, 'Não refletem', 'Não refletem'),
    (md5('opcao:q4:2')::uuid, md5('pergunta:q4')::uuid, 2, 'Refletem parcialmente', 'Refletem parcialmente'),
    (md5('opcao:q4:3')::uuid, md5('pergunta:q4')::uuid, 3, 'Refletem com ajustes frequentes', 'Refletem com ajustes frequentes'),
    (md5('opcao:q4:4')::uuid, md5('pergunta:q4')::uuid, 4, 'Refletem de forma consistente', 'Refletem de forma consistente'),
    (md5('opcao:q4:5')::uuid, md5('pergunta:q4')::uuid, 5, 'Refletem com alta confiabilidade e tempestividade', 'Refletem com alta confiabilidade e tempestividade'),

    -- q5: O fechamento contábil ocorre com qual periodicidade?
    (md5('opcao:q5:1')::uuid, md5('pergunta:q5')::uuid, 1, 'Não há fechamento formal', 'Não há fechamento formal'),
    (md5('opcao:q5:2')::uuid, md5('pergunta:q5')::uuid, 2, 'Esporádico', 'Esporádico'),
    (md5('opcao:q5:3')::uuid, md5('pergunta:q5')::uuid, 3, 'Trimestral', 'Trimestral'),
    (md5('opcao:q5:4')::uuid, md5('pergunta:q5')::uuid, 4, 'Mensal', 'Mensal'),
    (md5('opcao:q5:5')::uuid, md5('pergunta:q5')::uuid, 5, 'Mensal com prazo definido e análise gerencial', 'Mensal com prazo definido e análise gerencial'),

    -- q6: Há revisão técnica dos demonstrativos?
    (md5('opcao:q6:1')::uuid, md5('pergunta:q6')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q6:2')::uuid, md5('pergunta:q6')::uuid, 2, 'Apenas contábil', 'Apenas contábil'),
    (md5('opcao:q6:3')::uuid, md5('pergunta:q6')::uuid, 3, 'Revisão básica', 'Revisão básica'),
    (md5('opcao:q6:4')::uuid, md5('pergunta:q6')::uuid, 4, 'Revisão contábil e gerencial', 'Revisão contábil e gerencial'),
    (md5('opcao:q6:5')::uuid, md5('pergunta:q6')::uuid, 5, 'Revisão estruturada com validação cruzada', 'Revisão estruturada com validação cruzada'),

    -- q7: Existem ajustes frequentes após fechamento?
    (md5('opcao:q7:1')::uuid, md5('pergunta:q7')::uuid, 1, 'Ajustes constantes', 'Ajustes constantes'),
    (md5('opcao:q7:2')::uuid, md5('pergunta:q7')::uuid, 2, 'Ajustes recorrentes', 'Ajustes recorrentes'),
    (md5('opcao:q7:3')::uuid, md5('pergunta:q7')::uuid, 3, 'Ajustes eventuais', 'Ajustes eventuais'),
    (md5('opcao:q7:4')::uuid, md5('pergunta:q7')::uuid, 4, 'Ajustes raros', 'Ajustes raros'),
    (md5('opcao:q7:5')::uuid, md5('pergunta:q7')::uuid, 5, 'Sem ajustes relevantes', 'Sem ajustes relevantes'),

    -- q8: DRE/Balanço são utilizados para decisões?
    (md5('opcao:q8:1')::uuid, md5('pergunta:q8')::uuid, 1, 'Nunca', 'Nunca'),
    (md5('opcao:q8:2')::uuid, md5('pergunta:q8')::uuid, 2, 'Raramente', 'Raramente'),
    (md5('opcao:q8:3')::uuid, md5('pergunta:q8')::uuid, 3, 'Ocasionalmente', 'Ocasionalmente'),
    (md5('opcao:q8:4')::uuid, md5('pergunta:q8')::uuid, 4, 'Frequentemente', 'Frequentemente'),
    (md5('opcao:q8:5')::uuid, md5('pergunta:q8')::uuid, 5, 'São base central da gestão', 'São base central da gestão'),

    -- q9: Existe fluxo de caixa projetado?
    (md5('opcao:q9:1')::uuid, md5('pergunta:q9')::uuid, 1, 'Não existe', 'Não existe'),
    (md5('opcao:q9:2')::uuid, md5('pergunta:q9')::uuid, 2, 'Controle apenas realizado', 'Controle apenas realizado'),
    (md5('opcao:q9:3')::uuid, md5('pergunta:q9')::uuid, 3, 'Projeção curta (até 15 dias)', 'Projeção curta (até 15 dias)'),
    (md5('opcao:q9:4')::uuid, md5('pergunta:q9')::uuid, 4, 'Projeção mensal', 'Projeção mensal'),
    (md5('opcao:q9:5')::uuid, md5('pergunta:q9')::uuid, 5, 'Projeção estruturada com cenários', 'Projeção estruturada com cenários'),

    -- q10: Frequência de atualização do fluxo de Caixa?
    (md5('opcao:q10:1')::uuid, md5('pergunta:q10')::uuid, 1, 'Não atualizado', 'Não atualizado'),
    (md5('opcao:q10:2')::uuid, md5('pergunta:q10')::uuid, 2, 'Esporádico', 'Esporádico'),
    (md5('opcao:q10:3')::uuid, md5('pergunta:q10')::uuid, 3, 'Mensal', 'Mensal'),
    (md5('opcao:q10:4')::uuid, md5('pergunta:q10')::uuid, 4, 'Semanal', 'Semanal'),
    (md5('opcao:q10:5')::uuid, md5('pergunta:q10')::uuid, 5, 'Diário ou automatizado', 'Diário ou automatizado'),

    -- q11: Caixa é usado para planejamento?
    (md5('opcao:q11:1')::uuid, md5('pergunta:q11')::uuid, 1, 'Apenas registro histórico', 'Apenas registro histórico'),
    (md5('opcao:q11:2')::uuid, md5('pergunta:q11')::uuid, 2, 'Controle básico', 'Controle básico'),
    (md5('opcao:q11:3')::uuid, md5('pergunta:q11')::uuid, 3, 'Planejamento de curto prazo', 'Planejamento de curto prazo'),
    (md5('opcao:q11:4')::uuid, md5('pergunta:q11')::uuid, 4, 'Planejamento estruturado', 'Planejamento estruturado'),
    (md5('opcao:q11:5')::uuid, md5('pergunta:q11')::uuid, 5, 'Planejamento estratégico com simulações', 'Planejamento estratégico com simulações'),

    -- q12: Há simulação de cenários financeiros?
    (md5('opcao:q12:1')::uuid, md5('pergunta:q12')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q12:2')::uuid, md5('pergunta:q12')::uuid, 2, 'Informal', 'Informal'),
    (md5('opcao:q12:3')::uuid, md5('pergunta:q12')::uuid, 3, 'Simples', 'Simples'),
    (md5('opcao:q12:4')::uuid, md5('pergunta:q12')::uuid, 4, 'Estruturada', 'Estruturada'),
    (md5('opcao:q12:5')::uuid, md5('pergunta:q12')::uuid, 5, 'Modelagem financeira avançada', 'Modelagem financeira avançada'),

    -- q13: Conciliações bancárias são realizadas?
    (md5('opcao:q13:1')::uuid, md5('pergunta:q13')::uuid, 1, 'Não realizadas', 'Não realizadas'),
    (md5('opcao:q13:2')::uuid, md5('pergunta:q13')::uuid, 2, 'Esporádicas', 'Esporádicas'),
    (md5('opcao:q13:3')::uuid, md5('pergunta:q13')::uuid, 3, 'Mensais', 'Mensais'),
    (md5('opcao:q13:4')::uuid, md5('pergunta:q13')::uuid, 4, 'Semanais', 'Semanais'),
    (md5('opcao:q13:5')::uuid, md5('pergunta:q13')::uuid, 5, 'Automatizadas e auditáveis', 'Automatizadas e auditáveis'),

    -- q14: Existe segregação de funções?
    (md5('opcao:q14:1')::uuid, md5('pergunta:q14')::uuid, 1, 'Não existe', 'Não existe'),
    (md5('opcao:q14:2')::uuid, md5('pergunta:q14')::uuid, 2, 'Parcial', 'Parcial'),
    (md5('opcao:q14:3')::uuid, md5('pergunta:q14')::uuid, 3, 'Estrutura básica', 'Estrutura básica'),
    (md5('opcao:q14:4')::uuid, md5('pergunta:q14')::uuid, 4, 'Estruturada', 'Estruturada'),
    (md5('opcao:q14:5')::uuid, md5('pergunta:q14')::uuid, 5, 'Estruturada com controles internos', 'Estruturada com controles internos'),

    -- q15: Controle de contas a pagar/receber?
    (md5('opcao:q15:1')::uuid, md5('pergunta:q15')::uuid, 1, 'Manual/desorganizado', 'Manual/desorganizado'),
    (md5('opcao:q15:2')::uuid, md5('pergunta:q15')::uuid, 2, 'Planilhas básicas', 'Planilhas básicas'),
    (md5('opcao:q15:3')::uuid, md5('pergunta:q15')::uuid, 3, 'Sistema simples', 'Sistema simples'),
    (md5('opcao:q15:4')::uuid, md5('pergunta:q15')::uuid, 4, 'Sistema integrado', 'Sistema integrado'),
    (md5('opcao:q15:5')::uuid, md5('pergunta:q15')::uuid, 5, 'Sistema integrado com indicadores', 'Sistema integrado com indicadores'),

    -- q16: Existem políticas formais de aprovação?
    (md5('opcao:q16:1')::uuid, md5('pergunta:q16')::uuid, 1, 'Não existem', 'Não existem'),
    (md5('opcao:q16:2')::uuid, md5('pergunta:q16')::uuid, 2, 'Informais', 'Informais'),
    (md5('opcao:q16:3')::uuid, md5('pergunta:q16')::uuid, 3, 'Parcialmente formalizadas', 'Parcialmente formalizadas'),
    (md5('opcao:q16:4')::uuid, md5('pergunta:q16')::uuid, 4, 'Formalizadas', 'Formalizadas'),
    (md5('opcao:q16:5')::uuid, md5('pergunta:q16')::uuid, 5, 'Formalizadas e auditadas', 'Formalizadas e auditadas'),

    -- q17: Conhece margem bruta?
    (md5('opcao:q17:1')::uuid, md5('pergunta:q17')::uuid, 1, 'Não conhece', 'Não conhece'),
    (md5('opcao:q17:2')::uuid, md5('pergunta:q17')::uuid, 2, 'Estimativa informal', 'Estimativa informal'),
    (md5('opcao:q17:3')::uuid, md5('pergunta:q17')::uuid, 3, 'Calcula eventualmente', 'Calcula eventualmente'),
    (md5('opcao:q17:4')::uuid, md5('pergunta:q17')::uuid, 4, 'Calcula mensalmente', 'Calcula mensalmente'),
    (md5('opcao:q17:5')::uuid, md5('pergunta:q17')::uuid, 5, 'Analisa com metas e histórico', 'Analisa com metas e histórico'),

    -- q18: Margem por produto/serviço?
    (md5('opcao:q18:1')::uuid, md5('pergunta:q18')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q18:2')::uuid, md5('pergunta:q18')::uuid, 2, 'Estimativa informal', 'Estimativa informal'),
    (md5('opcao:q18:3')::uuid, md5('pergunta:q18')::uuid, 3, 'Por linha geral', 'Por linha geral'),
    (md5('opcao:q18:4')::uuid, md5('pergunta:q18')::uuid, 4, 'Por produto', 'Por produto'),
    (md5('opcao:q18:5')::uuid, md5('pergunta:q18')::uuid, 5, 'Por produto com histórico comparativo', 'Por produto com histórico comparativo'),

    -- q19: Margem por cliente/canal?
    (md5('opcao:q19:1')::uuid, md5('pergunta:q19')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q19:2')::uuid, md5('pergunta:q19')::uuid, 2, 'Raramente', 'Raramente'),
    (md5('opcao:q19:3')::uuid, md5('pergunta:q19')::uuid, 3, 'Parcial', 'Parcial'),
    (md5('opcao:q19:4')::uuid, md5('pergunta:q19')::uuid, 4, 'Estruturada', 'Estruturada'),
    (md5('opcao:q19:5')::uuid, md5('pergunta:q19')::uuid, 5, 'Base para decisões comerciais', 'Base para decisões comerciais'),

    -- q20: Decisões comerciais consideram margem?
    (md5('opcao:q20:1')::uuid, md5('pergunta:q20')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q20:2')::uuid, md5('pergunta:q20')::uuid, 2, 'Ocasionalmente', 'Ocasionalmente'),
    (md5('opcao:q20:3')::uuid, md5('pergunta:q20')::uuid, 3, 'Parcialmente', 'Parcialmente'),
    (md5('opcao:q20:4')::uuid, md5('pergunta:q20')::uuid, 4, 'Frequentemente', 'Frequentemente'),
    (md5('opcao:q20:5')::uuid, md5('pergunta:q20')::uuid, 5, 'Sempre com análise estruturada', 'Sempre com análise estruturada'),

    -- q21: Classificação fixo/variável?
    (md5('opcao:q21:1')::uuid, md5('pergunta:q21')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q21:2')::uuid, md5('pergunta:q21')::uuid, 2, 'Parcial', 'Parcial'),
    (md5('opcao:q21:3')::uuid, md5('pergunta:q21')::uuid, 3, 'Estruturada básica', 'Estruturada básica'),
    (md5('opcao:q21:4')::uuid, md5('pergunta:q21')::uuid, 4, 'Estruturada consistente', 'Estruturada consistente'),
    (md5('opcao:q21:5')::uuid, md5('pergunta:q21')::uuid, 5, 'Estruturada com análise gerencial', 'Estruturada com análise gerencial'),

    -- q22: Rateio de custos indiretos?
    (md5('opcao:q22:1')::uuid, md5('pergunta:q22')::uuid, 1, 'Não existe', 'Não existe'),
    (md5('opcao:q22:2')::uuid, md5('pergunta:q22')::uuid, 2, 'Rateio simples', 'Rateio simples'),
    (md5('opcao:q22:3')::uuid, md5('pergunta:q22')::uuid, 3, 'Rateio básico', 'Rateio básico'),
    (md5('opcao:q22:4')::uuid, md5('pergunta:q22')::uuid, 4, 'Rateio técnico', 'Rateio técnico'),
    (md5('opcao:q22:5')::uuid, md5('pergunta:q22')::uuid, 5, 'Rateio com critério estratégico', 'Rateio com critério estratégico'),

    -- q23: Conhece ponto de equilíbrio?
    (md5('opcao:q23:1')::uuid, md5('pergunta:q23')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q23:2')::uuid, md5('pergunta:q23')::uuid, 2, 'Estimativa informal', 'Estimativa informal'),
    (md5('opcao:q23:3')::uuid, md5('pergunta:q23')::uuid, 3, 'Cálculo eventual', 'Cálculo eventual'),
    (md5('opcao:q23:4')::uuid, md5('pergunta:q23')::uuid, 4, 'Cálculo estruturado', 'Cálculo estruturado'),
    (md5('opcao:q23:5')::uuid, md5('pergunta:q23')::uuid, 5, 'Monitorado periodicamente', 'Monitorado periodicamente'),

    -- q24: Existe análise de alavancagem operacional?
    (md5('opcao:q24:1')::uuid, md5('pergunta:q24')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q24:2')::uuid, md5('pergunta:q24')::uuid, 2, 'Conhecimento conceitual', 'Conhecimento conceitual'),
    (md5('opcao:q24:3')::uuid, md5('pergunta:q24')::uuid, 3, 'Aplicação eventual', 'Aplicação eventual'),
    (md5('opcao:q24:4')::uuid, md5('pergunta:q24')::uuid, 4, 'Aplicação estruturada', 'Aplicação estruturada'),
    (md5('opcao:q24:5')::uuid, md5('pergunta:q24')::uuid, 5, 'Aplicação estratégica com simulações', 'Aplicação estratégica com simulações'),

    -- q25: Monitora PMR, PMP e PME?
    (md5('opcao:q25:1')::uuid, md5('pergunta:q25')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q25:2')::uuid, md5('pergunta:q25')::uuid, 2, 'Conhece informalmente', 'Conhece informalmente'),
    (md5('opcao:q25:3')::uuid, md5('pergunta:q25')::uuid, 3, 'Calcula eventualmente', 'Calcula eventualmente'),
    (md5('opcao:q25:4')::uuid, md5('pergunta:q25')::uuid, 4, 'Calcula periodicamente', 'Calcula periodicamente'),
    (md5('opcao:q25:5')::uuid, md5('pergunta:q25')::uuid, 5, 'Utiliza para decisões estratégicas', 'Utiliza para decisões estratégicas'),

    -- q26: Cálculo formal da NCG?
    (md5('opcao:q26:1')::uuid, md5('pergunta:q26')::uuid, 1, 'Não calcula', 'Não calcula'),
    (md5('opcao:q26:2')::uuid, md5('pergunta:q26')::uuid, 2, 'Estimativa informal', 'Estimativa informal'),
    (md5('opcao:q26:3')::uuid, md5('pergunta:q26')::uuid, 3, 'Cálculo eventual', 'Cálculo eventual'),
    (md5('opcao:q26:4')::uuid, md5('pergunta:q26')::uuid, 4, 'Cálculo estruturado', 'Cálculo estruturado'),
    (md5('opcao:q26:5')::uuid, md5('pergunta:q26')::uuid, 5, 'Monitorado e projetado', 'Monitorado e projetado'),

    -- q27: Ciclo financeiro acompanhado?
    (md5('opcao:q27:1')::uuid, md5('pergunta:q27')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q27:2')::uuid, md5('pergunta:q27')::uuid, 2, 'Esporadicamente', 'Esporadicamente'),
    (md5('opcao:q27:3')::uuid, md5('pergunta:q27')::uuid, 3, 'Periodicamente', 'Periodicamente'),
    (md5('opcao:q27:4')::uuid, md5('pergunta:q27')::uuid, 4, 'Formalizado', 'Formalizado'),
    (md5('opcao:q27:5')::uuid, md5('pergunta:q27')::uuid, 5, 'Integrado ao planejamento', 'Integrado ao planejamento'),

    -- q28: Já enfrentou descasamento relevante no Capital de Giro?
    (md5('opcao:q28:1')::uuid, md5('pergunta:q28')::uuid, 1, 'Frequentemente', 'Frequentemente'),
    (md5('opcao:q28:2')::uuid, md5('pergunta:q28')::uuid, 2, 'Recorrentemente', 'Recorrentemente'),
    (md5('opcao:q28:3')::uuid, md5('pergunta:q28')::uuid, 3, 'Eventualmente', 'Eventualmente'),
    (md5('opcao:q28:4')::uuid, md5('pergunta:q28')::uuid, 4, 'Raramente', 'Raramente'),
    (md5('opcao:q28:5')::uuid, md5('pergunta:q28')::uuid, 5, 'Nunca ou altamente controlado', 'Nunca ou altamente controlado'),

    -- q29: Controle do perfil da dívida?
    (md5('opcao:q29:1')::uuid, md5('pergunta:q29')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q29:2')::uuid, md5('pergunta:q29')::uuid, 2, 'Informal', 'Informal'),
    (md5('opcao:q29:3')::uuid, md5('pergunta:q29')::uuid, 3, 'Controle básico', 'Controle básico'),
    (md5('opcao:q29:4')::uuid, md5('pergunta:q29')::uuid, 4, 'Controle estruturado', 'Controle estruturado'),
    (md5('opcao:q29:5')::uuid, md5('pergunta:q29')::uuid, 5, 'Gestão ativa estratégica', 'Gestão ativa estratégica'),

    -- q30: Conhece custo médio da dívida?
    (md5('opcao:q30:1')::uuid, md5('pergunta:q30')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q30:2')::uuid, md5('pergunta:q30')::uuid, 2, 'Estimativa', 'Estimativa'),
    (md5('opcao:q30:3')::uuid, md5('pergunta:q30')::uuid, 3, 'Cálculo eventual', 'Cálculo eventual'),
    (md5('opcao:q30:4')::uuid, md5('pergunta:q30')::uuid, 4, 'Cálculo estruturado', 'Cálculo estruturado'),
    (md5('opcao:q30:5')::uuid, md5('pergunta:q30')::uuid, 5, 'Monitorado estrategicamente', 'Monitorado estrategicamente'),

    -- q31: Dívida alinhada à geração de caixa?
    (md5('opcao:q31:1')::uuid, md5('pergunta:q31')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q31:2')::uuid, md5('pergunta:q31')::uuid, 2, 'Parcial', 'Parcial'),
    (md5('opcao:q31:3')::uuid, md5('pergunta:q31')::uuid, 3, 'Adequação básica', 'Adequação básica'),
    (md5('opcao:q31:4')::uuid, md5('pergunta:q31')::uuid, 4, 'Adequação estruturada', 'Adequação estruturada'),
    (md5('opcao:q31:5')::uuid, md5('pergunta:q31')::uuid, 5, 'Planejamento estratégico', 'Planejamento estratégico'),

    -- q32: Existe estratégia formal de capital?
    (md5('opcao:q32:1')::uuid, md5('pergunta:q32')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q32:2')::uuid, md5('pergunta:q32')::uuid, 2, 'Informal', 'Informal'),
    (md5('opcao:q32:3')::uuid, md5('pergunta:q32')::uuid, 3, 'Parcial', 'Parcial'),
    (md5('opcao:q32:4')::uuid, md5('pergunta:q32')::uuid, 4, 'Formalizada', 'Formalizada'),
    (md5('opcao:q32:5')::uuid, md5('pergunta:q32')::uuid, 5, 'Estratégia estruturada e revisada', 'Estratégia estruturada e revisada'),

    -- q33: Existe orçamento anual?
    (md5('opcao:q33:1')::uuid, md5('pergunta:q33')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q33:2')::uuid, md5('pergunta:q33')::uuid, 2, 'Informal', 'Informal'),
    (md5('opcao:q33:3')::uuid, md5('pergunta:q33')::uuid, 3, 'Básico', 'Básico'),
    (md5('opcao:q33:4')::uuid, md5('pergunta:q33')::uuid, 4, 'Formalizado', 'Formalizado'),
    (md5('opcao:q33:5')::uuid, md5('pergunta:q33')::uuid, 5, 'Formalizado com metas estratégicas', 'Formalizado com metas estratégicas'),

    -- q34: Revisão periódica do orçamento?
    (md5('opcao:q34:1')::uuid, md5('pergunta:q34')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q34:2')::uuid, md5('pergunta:q34')::uuid, 2, 'Esporádica', 'Esporádica'),
    (md5('opcao:q34:3')::uuid, md5('pergunta:q34')::uuid, 3, 'Semestral', 'Semestral'),
    (md5('opcao:q34:4')::uuid, md5('pergunta:q34')::uuid, 4, 'Trimestral', 'Trimestral'),
    (md5('opcao:q34:5')::uuid, md5('pergunta:q34')::uuid, 5, 'Mensal com ajustes', 'Mensal com ajustes'),

    -- q35: Análise orçado vs realizado?
    (md5('opcao:q35:1')::uuid, md5('pergunta:q35')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q35:2')::uuid, md5('pergunta:q35')::uuid, 2, 'Ocasional', 'Ocasional'),
    (md5('opcao:q35:3')::uuid, md5('pergunta:q35')::uuid, 3, 'Básica', 'Básica'),
    (md5('opcao:q35:4')::uuid, md5('pergunta:q35')::uuid, 4, 'Estruturada', 'Estruturada'),
    (md5('opcao:q35:5')::uuid, md5('pergunta:q35')::uuid, 5, 'Estruturada com plano de ação', 'Estruturada com plano de ação'),

    -- q36: Projeções financeiras de médio prazo?
    (md5('opcao:q36:1')::uuid, md5('pergunta:q36')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q36:2')::uuid, md5('pergunta:q36')::uuid, 2, 'Informal', 'Informal'),
    (md5('opcao:q36:3')::uuid, md5('pergunta:q36')::uuid, 3, 'Projeção simples', 'Projeção simples'),
    (md5('opcao:q36:4')::uuid, md5('pergunta:q36')::uuid, 4, 'Projeção estruturada', 'Projeção estruturada'),
    (md5('opcao:q36:5')::uuid, md5('pergunta:q36')::uuid, 5, 'Modelagem estratégica', 'Modelagem estratégica'),

    -- q37: Existem KPIs financeiros definidos?
    (md5('opcao:q37:1')::uuid, md5('pergunta:q37')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q37:2')::uuid, md5('pergunta:q37')::uuid, 2, 'Básico', 'Básico'),
    (md5('opcao:q37:3')::uuid, md5('pergunta:q37')::uuid, 3, 'Estruturados', 'Estruturados'),
    (md5('opcao:q37:4')::uuid, md5('pergunta:q37')::uuid, 4, 'Com Metas', 'Com Metas'),
    (md5('opcao:q37:5')::uuid, md5('pergunta:q37')::uuid, 5, 'Integrados a Estratégia', 'Integrados a Estratégia'),

    -- q38: KPIs possuem metas formais?
    (md5('opcao:q38:1')::uuid, md5('pergunta:q38')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q38:2')::uuid, md5('pergunta:q38')::uuid, 2, 'Informais', 'Informais'),
    (md5('opcao:q38:3')::uuid, md5('pergunta:q38')::uuid, 3, 'Parcialmente formalizadas', 'Parcialmente formalizadas'),
    (md5('opcao:q38:4')::uuid, md5('pergunta:q38')::uuid, 4, 'Formalizadas', 'Formalizadas'),
    (md5('opcao:q38:5')::uuid, md5('pergunta:q38')::uuid, 5, 'Revisadas periodicamente', 'Revisadas periodicamente'),

    -- q39: Acompanhamento periódico?
    (md5('opcao:q39:1')::uuid, md5('pergunta:q39')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q39:2')::uuid, md5('pergunta:q39')::uuid, 2, 'Esporádico', 'Esporádico'),
    (md5('opcao:q39:3')::uuid, md5('pergunta:q39')::uuid, 3, 'Mensal', 'Mensal'),
    (md5('opcao:q39:4')::uuid, md5('pergunta:q39')::uuid, 4, 'Estruturado', 'Estruturado'),
    (md5('opcao:q39:5')::uuid, md5('pergunta:q39')::uuid, 5, 'Com reuniões formais', 'Com reuniões formais'),

    -- q40: Indicadores influenciam decisões estratégicas?
    (md5('opcao:q40:1')::uuid, md5('pergunta:q40')::uuid, 1, 'Não', 'Não'),
    (md5('opcao:q40:2')::uuid, md5('pergunta:q40')::uuid, 2, 'Raramente', 'Raramente'),
    (md5('opcao:q40:3')::uuid, md5('pergunta:q40')::uuid, 3, 'Parcialmente', 'Parcialmente'),
    (md5('opcao:q40:4')::uuid, md5('pergunta:q40')::uuid, 4, 'Frequentemente', 'Frequentemente'),
    (md5('opcao:q40:5')::uuid, md5('pergunta:q40')::uuid, 5, 'São base da gestão estratégica', 'São base da gestão estratégica'),

    -- q41: A empresa possui calendário fiscal formalizado?
    (md5('opcao:q41:1')::uuid, md5('pergunta:q41')::uuid, 1, 'Não possui controle formal das obrigações fiscais', 'Não possui controle formal das obrigações fiscais'),
    (md5('opcao:q41:2')::uuid, md5('pergunta:q41')::uuid, 2, 'Controle informal via lembretes ou contador externo', 'Controle informal via lembretes ou contador externo'),
    (md5('opcao:q41:3')::uuid, md5('pergunta:q41')::uuid, 3, 'Calendário básico estruturado', 'Calendário básico estruturado'),
    (md5('opcao:q41:4')::uuid, md5('pergunta:q41')::uuid, 4, 'Calendário formal com responsáveis definidos', 'Calendário formal com responsáveis definidos'),
    (md5('opcao:q41:5')::uuid, md5('pergunta:q41')::uuid, 5, 'Calendário integrado ao sistema com controle e monitoramento', 'Calendário integrado ao sistema com controle e monitoramento'),

    -- q42: Existem atrasos recorrentes no cumprimento de obrigações acessórias?
    (md5('opcao:q42:1')::uuid, md5('pergunta:q42')::uuid, 1, 'Atrasos frequentes e multas recorrentes', 'Atrasos frequentes e multas recorrentes'),
    (md5('opcao:q42:2')::uuid, md5('pergunta:q42')::uuid, 2, 'Atrasos ocasionais', 'Atrasos ocasionais'),
    (md5('opcao:q42:3')::uuid, md5('pergunta:q42')::uuid, 3, 'Cumprimento regular com pequenos ajustes', 'Cumprimento regular com pequenos ajustes'),
    (md5('opcao:q42:4')::uuid, md5('pergunta:q42')::uuid, 4, 'Cumprimento pontual e monitorado', 'Cumprimento pontual e monitorado'),
    (md5('opcao:q42:5')::uuid, md5('pergunta:q42')::uuid, 5, 'Cumprimento automatizado com controle preventivo', 'Cumprimento automatizado com controle preventivo'),

    -- q43: Existe controle formal de tributos a recolher?
    (md5('opcao:q43:1')::uuid, md5('pergunta:q43')::uuid, 1, 'Não há controle formal', 'Não há controle formal'),
    (md5('opcao:q43:2')::uuid, md5('pergunta:q43')::uuid, 2, 'Controle via planilha básica', 'Controle via planilha básica'),
    (md5('opcao:q43:3')::uuid, md5('pergunta:q43')::uuid, 3, 'Controle estruturado por período', 'Controle estruturado por período'),
    (md5('opcao:q43:4')::uuid, md5('pergunta:q43')::uuid, 4, 'Controle integrado com financeiro', 'Controle integrado com financeiro'),
    (md5('opcao:q43:5')::uuid, md5('pergunta:q43')::uuid, 5, 'Controle integrado com projeção de impacto no caixa', 'Controle integrado com projeção de impacto no caixa'),

    -- q44: Já houve autuações fiscais relevantes nos últimos anos?
    (md5('opcao:q44:1')::uuid, md5('pergunta:q44')::uuid, 1, 'Autuações frequentes e significativas', 'Autuações frequentes e significativas'),
    (md5('opcao:q44:2')::uuid, md5('pergunta:q44')::uuid, 2, 'Autuações pontuais relevantes', 'Autuações pontuais relevantes'),
    (md5('opcao:q44:3')::uuid, md5('pergunta:q44')::uuid, 3, 'Autuações pequenas e esporádicas', 'Autuações pequenas e esporádicas'),
    (md5('opcao:q44:4')::uuid, md5('pergunta:q44')::uuid, 4, 'Não houve autuações relevantes', 'Não houve autuações relevantes'),
    (md5('opcao:q44:5')::uuid, md5('pergunta:q44')::uuid, 5, 'Gestão preventiva estruturada com auditoria fiscal interna', 'Gestão preventiva estruturada com auditoria fiscal interna'),

    -- q45: A empresa realiza planejamento tributário estruturado?
    (md5('opcao:q45:1')::uuid, md5('pergunta:q45')::uuid, 1, 'Não realiza', 'Não realiza'),
    (md5('opcao:q45:2')::uuid, md5('pergunta:q45')::uuid, 2, 'Apenas reage a mudanças legais', 'Apenas reage a mudanças legais'),
    (md5('opcao:q45:3')::uuid, md5('pergunta:q45')::uuid, 3, 'Planejamento básico anual', 'Planejamento básico anual'),
    (md5('opcao:q45:4')::uuid, md5('pergunta:q45')::uuid, 4, 'Planejamento estruturado com análise de cenários', 'Planejamento estruturado com análise de cenários'),
    (md5('opcao:q45:5')::uuid, md5('pergunta:q45')::uuid, 5, 'Planejamento estratégico contínuo e revisado periodicamente', 'Planejamento estratégico contínuo e revisado periodicamente'),

    -- q46: Existe análise periódica do regime tributário?
    (md5('opcao:q46:1')::uuid, md5('pergunta:q46')::uuid, 1, 'Nunca foi revisado', 'Nunca foi revisado'),
    (md5('opcao:q46:2')::uuid, md5('pergunta:q46')::uuid, 2, 'Revisão apenas quando problema surge', 'Revisão apenas quando problema surge'),
    (md5('opcao:q46:3')::uuid, md5('pergunta:q46')::uuid, 3, 'Revisão eventual', 'Revisão eventual'),
    (md5('opcao:q46:4')::uuid, md5('pergunta:q46')::uuid, 4, 'Revisão periódica estruturada', 'Revisão periódica estruturada'),
    (md5('opcao:q46:5')::uuid, md5('pergunta:q46')::uuid, 5, 'Revisão estratégica considerando expansão e crescimento', 'Revisão estratégica considerando expansão e crescimento'),

    -- q47: Há acompanhamento de benefícios fiscais aplicáveis?
    (md5('opcao:q47:1')::uuid, md5('pergunta:q47')::uuid, 1, 'Não há acompanhamento', 'Não há acompanhamento'),
    (md5('opcao:q47:2')::uuid, md5('pergunta:q47')::uuid, 2, 'Conhecimento superficial', 'Conhecimento superficial'),
    (md5('opcao:q47:3')::uuid, md5('pergunta:q47')::uuid, 3, 'Avaliação ocasional', 'Avaliação ocasional'),
    (md5('opcao:q47:4')::uuid, md5('pergunta:q47')::uuid, 4, 'Avaliação estruturada', 'Avaliação estruturada'),
    (md5('opcao:q47:5')::uuid, md5('pergunta:q47')::uuid, 5, 'Estratégia ativa de aproveitamento de incentivos', 'Estratégia ativa de aproveitamento de incentivos'),

    -- q48: O impacto tributário é considerado nas decisões estratégicas?
    (md5('opcao:q48:1')::uuid, md5('pergunta:q48')::uuid, 1, 'Nunca considerado', 'Nunca considerado'),
    (md5('opcao:q48:2')::uuid, md5('pergunta:q48')::uuid, 2, 'Considerado apenas após decisão tomada', 'Considerado apenas após decisão tomada'),
    (md5('opcao:q48:3')::uuid, md5('pergunta:q48')::uuid, 3, 'Considerado em decisões relevantes', 'Considerado em decisões relevantes'),
    (md5('opcao:q48:4')::uuid, md5('pergunta:q48')::uuid, 4, 'Considerado regularmente', 'Considerado regularmente'),
    (md5('opcao:q48:5')::uuid, md5('pergunta:q48')::uuid, 5, 'Integrado ao planejamento estratégico e financeiro', 'Integrado ao planejamento estratégico e financeiro')
ON CONFLICT (pergunta_id, grau) DO NOTHING;

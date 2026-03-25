-- ========================================
-- Migration 007: Seed subareas (12 subareas)
-- Diagnostico 360 - O2 Inc
-- ========================================

INSERT INTO public.subareas (id, area_id, codigo, nome, ordem) VALUES
    (md5('subarea:estrutura-contabil')::uuid, md5('area:contabilidade')::uuid, 'estrutura-contabil', 'Estrutura Contábil', 1),
    (md5('subarea:fechamento-e-confiabilidade')::uuid, md5('area:contabilidade')::uuid, 'fechamento-e-confiabilidade', 'Fechamento e Confiabilidade', 2),
    (md5('subarea:controle-de-caixa')::uuid, md5('area:financeiro')::uuid, 'controle-de-caixa', 'Controle de Caixa', 3),
    (md5('subarea:processos-financeiros')::uuid, md5('area:financeiro')::uuid, 'processos-financeiros', 'Processos Financeiros', 4),
    (md5('subarea:analise-de-margem')::uuid, md5('area:controladoria')::uuid, 'analise-de-margem', 'Análise de Margem', 5),
    (md5('subarea:estrutura-de-custos')::uuid, md5('area:controladoria')::uuid, 'estrutura-de-custos', 'Estrutura de Custos', 6),
    (md5('subarea:capital-de-giro')::uuid, md5('area:controladoria')::uuid, 'capital-de-giro', 'Capital de Giro', 7),
    (md5('subarea:endividamento')::uuid, md5('area:controladoria')::uuid, 'endividamento', 'Endividamento', 8),
    (md5('subarea:orcamento-e-forecast')::uuid, md5('area:planejamento-e-inteligencia-financeira')::uuid, 'orcamento-e-forecast', 'Orçamento e Forecast', 9),
    (md5('subarea:indicadores-e-performance')::uuid, md5('area:planejamento-e-inteligencia-financeira')::uuid, 'indicadores-e-performance', 'Indicadores e Performance', 10),
    (md5('subarea:conformidade-tributaria')::uuid, md5('area:fiscal')::uuid, 'conformidade-tributaria', 'Conformidade Tributária', 11),
    (md5('subarea:estrategia-e-planejamento-tributario')::uuid, md5('area:fiscal')::uuid, 'estrategia-e-planejamento-tributario', 'Estratégia e Planejamento Tributário', 12)
ON CONFLICT (codigo) DO NOTHING;

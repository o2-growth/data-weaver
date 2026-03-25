-- ========================================
-- Migration 006: Seed areas (5 areas)
-- Diagnostico 360 - O2 Inc
-- UUIDs determinísticos via md5
-- ========================================

INSERT INTO public.areas (id, codigo, nome, peso, ordem) VALUES
    (md5('area:contabilidade')::uuid, 'contabilidade', 'Contabilidade', 0.20, 1),
    (md5('area:financeiro')::uuid, 'financeiro', 'Financeiro', 0.20, 2),
    (md5('area:controladoria')::uuid, 'controladoria', 'Controladoria', 0.30, 3),
    (md5('area:planejamento-e-inteligencia-financeira')::uuid, 'planejamento-e-inteligencia-financeira', 'Planejamento e Inteligência Financeira', 0.15, 4),
    (md5('area:fiscal')::uuid, 'fiscal', 'Fiscal', 0.15, 5)
ON CONFLICT (codigo) DO NOTHING;

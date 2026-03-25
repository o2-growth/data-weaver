-- ========================================
-- Migration 004: PL/pgSQL functions
-- Diagnostico 360 - O2 Inc
-- ========================================

-- ========================================
-- FUNCAO: Calcular score de um diagnostico
-- ========================================
CREATE OR REPLACE FUNCTION calcular_diagnostico(p_diagnostico_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_scores JSONB := '{}';
    v_global NUMERIC := 0;
    v_area RECORD;
    v_media NUMERIC;
    v_nivel INT;
    v_label TEXT;
BEGIN
    -- Calcular media por area
    FOR v_area IN
        SELECT
            a.id,
            a.codigo,
            a.nome,
            a.peso,
            AVG(r.grau_selecionado)::NUMERIC(4,2) AS media
        FROM public.areas a
        JOIN public.subareas sa ON sa.area_id = a.id
        JOIN public.perguntas p ON p.subarea_id = sa.id AND p.ativa = TRUE
        LEFT JOIN public.respostas r ON r.pergunta_id = p.id
            AND r.diagnostico_id = p_diagnostico_id
        GROUP BY a.id, a.codigo, a.nome, a.peso
        ORDER BY a.ordem
    LOOP
        v_media := COALESCE(v_area.media, 0);

        -- Determinar nivel de maturidade
        v_nivel := CASE
            WHEN v_media <= 1.8 THEN 1
            WHEN v_media <= 2.6 THEN 2
            WHEN v_media <= 3.4 THEN 3
            WHEN v_media <= 4.2 THEN 4
            ELSE 5
        END;

        v_label := CASE v_nivel
            WHEN 1 THEN 'Critica'
            WHEN 2 THEN 'Basica'
            WHEN 3 THEN 'Intermediaria'
            WHEN 4 THEN 'Gerencial'
            WHEN 5 THEN 'Estrategica'
        END;

        v_scores := v_scores || jsonb_build_object(
            v_area.codigo,
            jsonb_build_object(
                'score', v_media,
                'nivel', v_nivel,
                'label', v_label,
                'peso', v_area.peso
            )
        );

        v_global := v_global + (v_media * v_area.peso);
    END LOOP;

    -- Nivel global
    v_nivel := CASE
        WHEN v_global <= 1.8 THEN 1
        WHEN v_global <= 2.6 THEN 2
        WHEN v_global <= 3.4 THEN 3
        WHEN v_global <= 4.2 THEN 4
        ELSE 5
    END;

    v_label := CASE v_nivel
        WHEN 1 THEN 'Critica'
        WHEN 2 THEN 'Basica'
        WHEN 3 THEN 'Intermediaria'
        WHEN 4 THEN 'Gerencial'
        WHEN 5 THEN 'Estrategica'
    END;

    -- Atualizar diagnostico
    UPDATE public.diagnosticos SET
        score_global = ROUND(v_global, 2),
        nivel_maturidade = v_nivel,
        label_maturidade = v_label,
        scores_por_area = v_scores,
        updated_at = NOW()
    WHERE id = p_diagnostico_id;

    RETURN jsonb_build_object(
        'score_global', ROUND(v_global, 2),
        'nivel_maturidade', v_nivel,
        'label_maturidade', v_label,
        'scores_por_area', v_scores
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- FUNCAO: Gerar quick wins automaticamente
-- ========================================
CREATE OR REPLACE FUNCTION gerar_quick_wins(p_diagnostico_id UUID)
RETURNS INT AS $$
DECLARE
    v_count INT := 0;
    v_row RECORD;
BEGIN
    -- Limpar quick wins anteriores deste diagnostico
    DELETE FROM public.quick_wins WHERE diagnostico_id = p_diagnostico_id;

    -- Inserir quick wins: respostas com grau 1 ou 2 onde o risco e alto
    FOR v_row IN
        SELECT
            r.pergunta_id,
            r.grau_selecionado,
            p.texto AS pergunta_texto,
            mr.plano_acao,
            mr.narrativa_risco,
            mr.impacto,
            mr.probabilidade
        FROM public.respostas r
        JOIN public.perguntas p ON p.id = r.pergunta_id
        JOIN public.matriz_risco mr ON mr.pergunta_id = r.pergunta_id
            AND mr.grau = r.grau_selecionado
        WHERE r.diagnostico_id = p_diagnostico_id
            AND r.grau_selecionado <= 2
            AND mr.impacto >= 2
        ORDER BY mr.score_risco DESC
    LOOP
        INSERT INTO public.quick_wins (
            diagnostico_id, pergunta_id, grau_atual,
            titulo, descricao, acao_recomendada,
            esforco, impacto_estimado
        ) VALUES (
            p_diagnostico_id,
            v_row.pergunta_id,
            v_row.grau_selecionado,
            'Melhoria: ' || LEFT(v_row.pergunta_texto, 80),
            v_row.narrativa_risco,
            v_row.plano_acao,
            1, -- esforco baixo (quick win)
            v_row.impacto
        );
        v_count := v_count + 1;
    END LOOP;

    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- FUNCAO: Concluir diagnostico (calcula + gera quick wins)
-- ========================================
CREATE OR REPLACE FUNCTION concluir_diagnostico(p_diagnostico_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_resultado JSONB;
    v_quick_wins INT;
BEGIN
    -- Calcular scores
    v_resultado := calcular_diagnostico(p_diagnostico_id);

    -- Gerar quick wins
    v_quick_wins := gerar_quick_wins(p_diagnostico_id);

    -- Marcar como concluido
    UPDATE public.diagnosticos SET
        status = 'concluido',
        concluido_em = NOW()
    WHERE id = p_diagnostico_id;

    RETURN v_resultado || jsonb_build_object('quick_wins_gerados', v_quick_wins);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

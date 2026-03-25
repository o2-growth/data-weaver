-- ========================================
-- Migration 005: RLS Policies
-- Diagnostico 360 - O2 Inc
-- ========================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnosticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subareas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opcoes_resposta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matriz_risco ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quick_wins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorios_pdf ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ========================================
-- Helper: pegar role do usuario logado
-- ========================================
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
    SELECT role FROM public.usuarios WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ========================================
-- POLICIES: usuarios
-- ========================================
CREATE POLICY "Usuarios podem ver todos os usuarios"
    ON public.usuarios FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Apenas admin pode inserir usuarios"
    ON public.usuarios FOR INSERT
    TO authenticated
    WITH CHECK (public.get_user_role() = 'admin');

CREATE POLICY "Apenas admin pode atualizar outros usuarios"
    ON public.usuarios FOR UPDATE
    TO authenticated
    USING (id = auth.uid() OR public.get_user_role() = 'admin');

-- ========================================
-- POLICIES: empresas
-- ========================================
CREATE POLICY "Todos autenticados podem ver empresas"
    ON public.empresas FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admin e analyst podem criar empresas"
    ON public.empresas FOR INSERT
    TO authenticated
    WITH CHECK (public.get_user_role() IN ('admin', 'analyst'));

CREATE POLICY "Admin e analyst podem editar empresas"
    ON public.empresas FOR UPDATE
    TO authenticated
    USING (public.get_user_role() IN ('admin', 'analyst'));

CREATE POLICY "Apenas admin pode excluir empresas"
    ON public.empresas FOR DELETE
    TO authenticated
    USING (public.get_user_role() = 'admin');

-- ========================================
-- POLICIES: diagnosticos
-- ========================================
CREATE POLICY "Todos autenticados podem ver diagnosticos"
    ON public.diagnosticos FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admin e analyst podem criar diagnosticos"
    ON public.diagnosticos FOR INSERT
    TO authenticated
    WITH CHECK (public.get_user_role() IN ('admin', 'analyst'));

CREATE POLICY "Admin e analyst podem atualizar diagnosticos"
    ON public.diagnosticos FOR UPDATE
    TO authenticated
    USING (public.get_user_role() IN ('admin', 'analyst'));

CREATE POLICY "Apenas admin pode excluir diagnosticos"
    ON public.diagnosticos FOR DELETE
    TO authenticated
    USING (public.get_user_role() = 'admin');

-- ========================================
-- POLICIES: respostas
-- ========================================
CREATE POLICY "Todos autenticados podem ver respostas"
    ON public.respostas FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admin e analyst podem inserir respostas"
    ON public.respostas FOR INSERT
    TO authenticated
    WITH CHECK (public.get_user_role() IN ('admin', 'analyst'));

CREATE POLICY "Admin e analyst podem atualizar respostas"
    ON public.respostas FOR UPDATE
    TO authenticated
    USING (public.get_user_role() IN ('admin', 'analyst'));

-- ========================================
-- POLICIES: dados de referencia (read-only para todos)
-- ========================================
CREATE POLICY "Todos podem ler areas"
    ON public.areas FOR SELECT TO authenticated USING (true);

CREATE POLICY "Todos podem ler subareas"
    ON public.subareas FOR SELECT TO authenticated USING (true);

CREATE POLICY "Todos podem ler perguntas"
    ON public.perguntas FOR SELECT TO authenticated USING (true);

CREATE POLICY "Todos podem ler opcoes de resposta"
    ON public.opcoes_resposta FOR SELECT TO authenticated USING (true);

CREATE POLICY "Todos podem ler matriz de risco"
    ON public.matriz_risco FOR SELECT TO authenticated USING (true);

-- Admin pode editar dados de referencia
CREATE POLICY "Admin pode editar matriz de risco"
    ON public.matriz_risco FOR ALL
    TO authenticated
    USING (public.get_user_role() = 'admin')
    WITH CHECK (public.get_user_role() = 'admin');

-- ========================================
-- POLICIES: quick_wins
-- ========================================
CREATE POLICY "Todos autenticados podem ver quick wins"
    ON public.quick_wins FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admin e analyst podem atualizar quick wins"
    ON public.quick_wins FOR UPDATE
    TO authenticated
    USING (public.get_user_role() IN ('admin', 'analyst'));

-- ========================================
-- POLICIES: relatorios_pdf
-- ========================================
CREATE POLICY "Todos autenticados podem ver relatorios"
    ON public.relatorios_pdf FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Todos autenticados podem gerar relatorios"
    ON public.relatorios_pdf FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- ========================================
-- POLICIES: audit_log
-- ========================================
CREATE POLICY "Apenas admin pode ler audit log"
    ON public.audit_log FOR SELECT
    TO authenticated
    USING (public.get_user_role() = 'admin');

CREATE POLICY "Sistema pode inserir audit log"
    ON public.audit_log FOR INSERT
    TO authenticated
    WITH CHECK (true);

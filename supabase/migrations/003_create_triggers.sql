-- ========================================
-- Migration 003: Create triggers for updated_at
-- Diagnostico 360 - O2 Inc
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_usuarios_updated_at BEFORE UPDATE ON public.usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_empresas_updated_at BEFORE UPDATE ON public.empresas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_diagnosticos_updated_at BEFORE UPDATE ON public.diagnosticos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_respostas_updated_at BEFORE UPDATE ON public.respostas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_quick_wins_updated_at BEFORE UPDATE ON public.quick_wins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

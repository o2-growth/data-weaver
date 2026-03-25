-- ========================================
-- Migration 002: Create indexes
-- Diagnostico 360 - O2 Inc
-- ========================================

CREATE INDEX idx_diagnosticos_empresa ON public.diagnosticos(empresa_id);
CREATE INDEX idx_diagnosticos_responsavel ON public.diagnosticos(responsavel_id);
CREATE INDEX idx_diagnosticos_status ON public.diagnosticos(status);
CREATE INDEX idx_respostas_diagnostico ON public.respostas(diagnostico_id);
CREATE INDEX idx_respostas_pergunta ON public.respostas(pergunta_id);
CREATE INDEX idx_matriz_risco_pergunta ON public.matriz_risco(pergunta_id);
CREATE INDEX idx_quick_wins_diagnostico ON public.quick_wins(diagnostico_id);
CREATE INDEX idx_audit_log_usuario ON public.audit_log(usuario_id);
CREATE INDEX idx_audit_log_entidade ON public.audit_log(entidade, entidade_id);

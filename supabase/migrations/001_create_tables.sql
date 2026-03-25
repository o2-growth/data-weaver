-- ========================================
-- Migration 001: Create all tables
-- Diagnostico 360 - O2 Inc
-- ========================================

-- Extensoes necessarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- TABELA: usuarios (perfis vinculados ao auth)
-- ========================================
CREATE TABLE public.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    nome_completo TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'intern' CHECK (role IN ('admin', 'analyst', 'intern')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================
-- TABELA: empresas
-- ========================================
CREATE TABLE public.empresas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razao_social TEXT NOT NULL,
    nome_fantasia TEXT,
    cnpj TEXT UNIQUE,
    segmento TEXT,
    porte TEXT CHECK (porte IN ('micro', 'pequena', 'media', 'grande')),
    cidade TEXT,
    uf TEXT CHECK (LENGTH(uf) = 2),
    contato_nome TEXT,
    contato_email TEXT,
    contato_telefone TEXT,
    observacoes TEXT,
    criado_por UUID REFERENCES public.usuarios(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================
-- TABELA: areas
-- ========================================
CREATE TABLE public.areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo TEXT NOT NULL UNIQUE,
    nome TEXT NOT NULL,
    peso NUMERIC(4,2) NOT NULL CHECK (peso > 0 AND peso <= 1),
    ordem INT NOT NULL
);

-- ========================================
-- TABELA: subareas
-- ========================================
CREATE TABLE public.subareas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    area_id UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
    codigo TEXT NOT NULL UNIQUE,
    nome TEXT NOT NULL,
    ordem INT NOT NULL
);

-- ========================================
-- TABELA: perguntas
-- ========================================
CREATE TABLE public.perguntas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subarea_id UUID NOT NULL REFERENCES public.subareas(id) ON DELETE CASCADE,
    codigo TEXT NOT NULL UNIQUE,
    texto TEXT NOT NULL,
    ordem INT NOT NULL,
    ativa BOOLEAN NOT NULL DEFAULT TRUE
);

-- ========================================
-- TABELA: opcoes_resposta (5 por pergunta)
-- ========================================
CREATE TABLE public.opcoes_resposta (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pergunta_id UUID NOT NULL REFERENCES public.perguntas(id) ON DELETE CASCADE,
    grau INT NOT NULL CHECK (grau BETWEEN 1 AND 5),
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    UNIQUE(pergunta_id, grau)
);

-- ========================================
-- TABELA: diagnosticos
-- ========================================
CREATE TABLE public.diagnosticos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
    responsavel_id UUID NOT NULL REFERENCES public.usuarios(id),
    status TEXT NOT NULL DEFAULT 'rascunho'
        CHECK (status IN ('rascunho', 'em_andamento', 'concluido', 'arquivado')),
    score_global NUMERIC(4,2),
    nivel_maturidade INT CHECK (nivel_maturidade BETWEEN 1 AND 5),
    label_maturidade TEXT,
    scores_por_area JSONB,
    data_referencia DATE NOT NULL DEFAULT CURRENT_DATE,
    observacoes_gerais TEXT,
    iniciado_em TIMESTAMPTZ,
    concluido_em TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================
-- TABELA: respostas
-- ========================================
CREATE TABLE public.respostas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostico_id UUID NOT NULL REFERENCES public.diagnosticos(id) ON DELETE CASCADE,
    pergunta_id UUID NOT NULL REFERENCES public.perguntas(id),
    opcao_resposta_id UUID REFERENCES public.opcoes_resposta(id),
    grau_selecionado INT NOT NULL CHECK (grau_selecionado BETWEEN 1 AND 5),
    observacao TEXT,
    respondido_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(diagnostico_id, pergunta_id)
);

-- ========================================
-- TABELA: matriz_risco (seed data - 240 entradas)
-- ========================================
CREATE TABLE public.matriz_risco (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pergunta_id UUID NOT NULL REFERENCES public.perguntas(id) ON DELETE CASCADE,
    grau INT NOT NULL CHECK (grau BETWEEN 1 AND 5),
    narrativa_risco TEXT NOT NULL,
    controles_sugeridos TEXT,
    plano_acao TEXT,
    impacto INT NOT NULL CHECK (impacto BETWEEN 1 AND 3),
    probabilidade INT NOT NULL CHECK (probabilidade BETWEEN 1 AND 3),
    score_risco INT GENERATED ALWAYS AS (impacto * probabilidade) STORED,
    categoria_risco TEXT GENERATED ALWAYS AS (
        CASE
            WHEN impacto * probabilidade >= 6 THEN 'alto'
            WHEN impacto * probabilidade >= 3 THEN 'medio'
            ELSE 'baixo'
        END
    ) STORED,
    UNIQUE(pergunta_id, grau)
);

-- ========================================
-- TABELA: quick_wins
-- ========================================
CREATE TABLE public.quick_wins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostico_id UUID NOT NULL REFERENCES public.diagnosticos(id) ON DELETE CASCADE,
    pergunta_id UUID NOT NULL REFERENCES public.perguntas(id),
    grau_atual INT NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    acao_recomendada TEXT NOT NULL,
    esforco INT NOT NULL CHECK (esforco BETWEEN 1 AND 3),
    impacto_estimado INT NOT NULL CHECK (impacto_estimado BETWEEN 1 AND 3),
    prioridade INT GENERATED ALWAYS AS (
        CASE WHEN esforco > 0 THEN ROUND(impacto_estimado::NUMERIC / esforco::NUMERIC * 3)::INT ELSE 0 END
    ) STORED,
    status TEXT NOT NULL DEFAULT 'pendente'
        CHECK (status IN ('pendente', 'em_andamento', 'concluido')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================
-- TABELA: relatorios_pdf
-- ========================================
CREATE TABLE public.relatorios_pdf (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostico_id UUID NOT NULL REFERENCES public.diagnosticos(id) ON DELETE CASCADE,
    nome_arquivo TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    url_publica TEXT,
    tamanho_bytes INT,
    gerado_por UUID NOT NULL REFERENCES public.usuarios(id),
    gerado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================
-- TABELA: audit_log
-- ========================================
CREATE TABLE public.audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES public.usuarios(id),
    acao TEXT NOT NULL,
    entidade TEXT NOT NULL,
    entidade_id UUID,
    dados_antes JSONB,
    dados_depois JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

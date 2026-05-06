## Objetivo

Três ajustes na plataforma:

1. Remover os botões "Exportar PDF" e "Exportar PPT" da página de Resultados.
2. Garantir que login + cadastro estejam visíveis e funcionais (ajustes finos no fluxo já existente).
3. Exibir as **sugestões** (controles recomendados + plano de ação) vindas da matriz de risco para cada pergunta na seção "Perguntas Respondidas" dos Resultados.

---

## 1. Remover exportação PDF/PPT

**Arquivo:** `src/pages/Results.tsx`

- Remover imports de `PdfDownloadButton` e `PptxDownloadButton` (linhas 31–32).
- Remover os dois botões do header (linhas 355–356), mantendo apenas o botão "Novo".

Os arquivos `src/components/PdfDownloadButton.tsx`, `src/components/PptxDownloadButton.tsx`, `src/lib/pdf/*`, `src/lib/pptx/*` ficam no projeto (não removo agora) — podem ser excluídos depois se você confirmar que não vai querer reativar. Se preferir já remover tudo, posso apagar também.

---

## 2. Login e cadastro

O fluxo já existe em `src/pages/LoginPage.tsx` com:
- Tabs "Entrar" / "Criar conta"
- Login Google (Lovable Cloud Auth)
- E-mail/senha
- "Esqueci minha senha" → `/reset-password`

Ações:
- Confirmar que o cadastro está com **auto-confirm de e-mail desabilitado** (recomendado em produção: usuário confirma por e-mail antes de logar). Hoje o código faz `signUp` e redireciona direto para `/app`. Vou ajustar para: se a sessão não vier preenchida (e-mail precisa de confirmação), mostrar mensagem "Confirme seu e-mail para entrar" em vez de redirecionar; se vier preenchida (auto-confirm ligado no painel), segue direto.
- Garantir botão "Criar conta" bem visível na landing/login (já está nas tabs).
- Sem mudanças adicionais na landing — os CTAs já apontam para `/login`.

> Pergunta para você: quer **manter auto-confirm ligado** (signup → entra direto, sem e-mail) ou **desligar** (signup → confirma e-mail → loga)? Posso seguir com qualquer uma. Se não disser nada, deixo auto-confirm **ligado** (mais simples para o evento), apenas tornando a UX robusta.

---

## 3. Sugestões por pergunta nas respostas

Hoje a seção "Perguntas Respondidas" (Results.tsx, linhas 502–536) mostra apenas:
- Texto da pergunta
- Texto da opção escolhida
- Nota (1–5)
- Observação do CFO

A matriz de risco (`src/data/riskMatrix.ts`) já contém para **cada combinação `questionId + grade`**:
- `riskNarrative` — narrativa do risco
- `controls` — controles recomendados
- `actionPlan` — plano de ação (itens separados por `|`)
- `riskCategory` (Alto/Médio/Baixo)

Estes campos hoje só aparecem agrupados na seção "Matriz de Riscos Identificados", e somente para perguntas que viraram risco. A matriz tem entrada para **todas** as combinações pergunta×nota.

**Mudanças em `src/pages/Results.tsx`:**

- Importar `riskMatrix` de `@/data/riskMatrix`.
- Para cada pergunta respondida na seção "Perguntas Respondidas", buscar a entrada da matriz (`questionId === q.id && grade === answer.grade`).
- Se houver entrada, renderizar logo abaixo da resposta um bloco compacto (estilo glass) com:
  - Badge de categoria de risco (Alto/Médio/Baixo) com cor adequada
  - Linha "Risco identificado": `riskNarrative`
  - Accordion (fechado por padrão) "Sugestões e plano de ação" contendo:
    - **Controles recomendados:** texto de `controls`
    - **Plano de ação:** lista numerada (split em `|`) — mesmo padrão do `RiskCard.tsx` (linhas 89–99)

Assim o usuário vê, pergunta por pergunta, exatamente o que fazer para evoluir naquele item — não só os riscos críticos.

**Componente reutilizável (opcional):** extrair o bloco de "controles + plano de ação" em `src/components/AnswerSuggestion.tsx` para evitar duplicação com `RiskCard`. Faço isso para manter o código limpo.

---

## Resumo de arquivos alterados

```text
src/pages/Results.tsx              edit (remove botões + adiciona sugestões por pergunta)
src/pages/LoginPage.tsx            edit (mensagem de confirmação se signup pedir e-mail)
src/components/AnswerSuggestion.tsx  new (bloco controles + plano de ação)
```

Confirma que posso seguir? Se quiser também **apagar** os arquivos de geração PDF/PPT (não só os botões), me avisa.

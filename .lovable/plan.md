

# Botão Admin para Preenchimento Automático

## O que será feito

Adicionar um botão visível apenas para o admin no topo da página do questionário que preenche automaticamente todas as respostas com notas aleatórias (1-5), permitindo testar rapidamente o dashboard de resultados.

## Controle de acesso

Um e-mail admin hardcoded será verificado via query parameter (`?admin=true`) na URL — sem necessidade de autenticação por enquanto. O botão só aparece quando o parâmetro está presente.

## Alterações

**`src/pages/Questionnaire.tsx`**:
- Verificar `?admin=true` na URL
- Adicionar botão "Preencher Tudo (Admin)" no header que gera respostas aleatórias para todas as perguntas de todas as áreas
- Estilo discreto (outline/ghost) com ícone de ferramenta


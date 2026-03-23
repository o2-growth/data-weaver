

# Plataforma Diagnóstico 360° - CFO

## O que será construído

Uma plataforma web de diagnóstico financeiro empresarial baseada no questionário do arquivo enviado. O usuário preenche o nome da empresa, responde 40 perguntas organizadas em 5 áreas, e recebe um dashboard com o grau de maturidade financeira.

## Estrutura do questionário

5 áreas com pesos diferentes:

| Area | Perguntas | Peso |
|------|-----------|------|
| Contabilidade | 8 | 20% |
| Financeiro | 8 | 25% |
| Controladoria | 16 | 30% |
| Fiscal | 8 | 15% |
| Planejamento e Inteligencia Financeira | 8 | 10% |

Cada pergunta recebe nota de 1 a 5 (Grau de Maturidade) + campo de observacoes opcional.

## Fluxo da aplicacao

1. **Tela inicial** - Nome da empresa + botao iniciar
2. **Questionario** - Wizard com 5 etapas (uma por area), progress bar, perguntas com escala 1-5 e campo de observacoes
3. **Dashboard de resultados** - Grafico radar com as 5 areas, nota global ponderada, grau de maturidade (1 a 5), classificacao (Critica/Basica/Intermediaria/Gerencial/Estrategica), detalhamento por subarea

## Grau de maturidade (calculo)

- Media simples por area
- Nota global = soma ponderada das medias
- Conversao: 1.00-1.80 = Grau 1 (Critica), 1.81-2.60 = Grau 2 (Basica), 2.61-3.40 = Grau 3 (Intermediaria), 3.41-4.20 = Grau 4 (Gerencial), 4.21-5.00 = Grau 5 (Estrategica)

## Arquivos a criar/editar

1. **`src/data/questionnaire.ts`** - Dados do questionario (areas, subareas, perguntas, pesos)
2. **`src/types/diagnostic.ts`** - Tipos TypeScript
3. **`src/pages/Index.tsx`** - Tela inicial com formulario de nome da empresa
4. **`src/pages/Questionnaire.tsx`** - Wizard com as 5 etapas
5. **`src/pages/Results.tsx`** - Dashboard com graficos
6. **`src/components/QuestionCard.tsx`** - Card de pergunta com slider 1-5 e observacoes
7. **`src/components/RadarChart.tsx`** - Grafico radar usando Recharts
8. **`src/components/MaturityBadge.tsx`** - Badge colorido do grau de maturidade
9. **`src/lib/calculations.ts`** - Logica de calculo de medias e nota global
10. **`src/App.tsx`** - Rotas atualizadas

## Tecnologias

- Recharts para grafico radar
- React state (sem banco de dados por enquanto)
- shadcn/ui components (Progress, Slider, Card, Badge, Button)
- Cores por grau: vermelho (1), laranja (2), amarelo (3), azul (4), verde (5)

## Design

- Visual profissional/corporativo
- Paleta escura com acentos azuis
- Layout responsivo
- Branding "Diagnostico 360° - CFO"


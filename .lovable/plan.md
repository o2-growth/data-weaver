

# Melhorias no PowerPoint — Design Executivo

## Resumo

Redesenhar o gerador PPTX para produzir uma apresentação de nível consultoria (McKinsey/BCG-like), com gráficos embarcados, paleta premium, e conteúdo contextualizado.

## Alterações planejadas

### 1. Paleta e tipografia premium
- Trocar Calibri por Georgia (títulos) + Calibri (corpo) — par mais sofisticado
- Nova paleta: fundo escuro na capa e fechamento (`1E2761` navy), slides internos limpos (`F8FAFC`), accent `2563EB`
- Barra lateral colorida nos slides de área (cor do grau de maturidade)

### 2. Slide de Executive Summary (novo)
- Após o resultado geral
- 3 blocos visuais grandes: Nota Global (número 54pt), Nível de Maturidade (badge), Principal Risco (destaque vermelho)
- Uma frase de interpretação contextualizada baseada no nível

### 3. Gráfico de barras horizontal nas áreas
- Usar pptxgenjs `addChart(CHART_TYPE.BAR)` para gerar um bar chart comparando as 5 áreas
- Barras coloridas pelo grau de maturidade
- Incluir no slide de Resultado Geral ao lado da tabela

### 4. Radar chart embarcado
- pptxgenjs suporta `addChart(CHART_TYPE.RADAR)` nativamente
- Substituir/complementar a tabela de resultado geral com o radar visual

### 5. Quick Wins redesenhados
- Máximo 5 por slide, com layout de cards (não tabela densa)
- Se houver mais de 5, criar slides adicionais
- Fonte mínima 11pt, com ícones de esforço/impacto como badges coloridos

### 6. Próximos Passos contextualizados
- Gerar os passos com base nas áreas mais fracas do diagnóstico
- Ex: "Priorizar estruturação da área de Controladoria (nota 1.80)"

### 7. Slide de encerramento com CTA
- "Próxima etapa: Agendar reunião de devolutiva"
- Contato e branding O2 Inc.

## Arquivos alterados

- **`src/lib/pptx/generatePptx.ts`** — reescrever com novo design system, adicionar charts, executive summary, quick wins paginados, próximos passos dinâmicos

## Impacto

Nenhuma mudança na web app. Apenas o arquivo PPTX gerado será significativamente melhor.


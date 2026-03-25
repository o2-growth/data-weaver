// Áreas do Diagnóstico 360° - Extraído automaticamente da planilha
// Pesos REAIS extraídos das fórmulas (linhas 43-47 da sheet Resultados)

export interface Area {
  id: string;
  name: string;
  weight: number;
  order: number;
}

export const areas: Area[] = [
  {
    id: 'contabilidade',
    name: 'Contabilidade',
    weight: 0.2,
    order: 1,
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    weight: 0.2,
    order: 2,
  },
  {
    id: 'controladoria',
    name: 'Controladoria',
    weight: 0.3,
    order: 3,
  },
  {
    id: 'planejamento-e-inteligencia-financeira',
    name: 'Planejamento e Inteligência Financeira',
    weight: 0.15,
    order: 4,
  },
  {
    id: 'fiscal',
    name: 'Fiscal',
    weight: 0.15,
    order: 5,
  },
];

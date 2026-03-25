// Escala de Maturidade do Diagnóstico 360° - Extraído automaticamente da planilha
// Sheet 'Resultados', linhas 24-28

export interface MaturityLevel {
  grade: number;
  label: string;
  description: string;
  minScore: number;
  maxScore: number;
  color: string;
}

export const maturityLevels: MaturityLevel[] = [
  {
    grade: 1,
    label: 'Grau 1',
    description: 'Estrutura Crítica',
    minScore: 1.0,
    maxScore: 1.8,
    color: '#DC2626',
  },
  {
    grade: 2,
    label: 'Grau 2',
    description: 'Estrutura Básica',
    minScore: 1.81,
    maxScore: 2.6,
    color: '#F97316',
  },
  {
    grade: 3,
    label: 'Grau 3',
    description: 'Estrutura Intermediária',
    minScore: 2.61,
    maxScore: 3.4,
    color: '#EAB308',
  },
  {
    grade: 4,
    label: 'Grau 4',
    description: 'Estrutura Gerencial',
    minScore: 3.41,
    maxScore: 4.2,
    color: '#22C55E',
  },
  {
    grade: 5,
    label: 'Grau 5',
    description: 'Estrutura Estratégica',
    minScore: 4.21,
    maxScore: 5.0,
    color: '#3B82F6',
  },
];

// Classificação de risco: Impact (1-3) × Probability (1-3) = Risk Score
export interface RiskClassification {
  minScore: number;
  maxScore: number;
  label: string;
  color: string;
}

export const riskClassifications: RiskClassification[] = [
  { minScore: 1, maxScore: 2, label: 'Baixo', color: '#22C55E' },
  { minScore: 3, maxScore: 4, label: 'Médio', color: '#EAB308' },
  { minScore: 5, maxScore: 6, label: 'Alto', color: '#F97316' },
  { minScore: 7, maxScore: 9, label: 'Alto Crítico', color: '#DC2626' },
];

/**
 * Determina o nível de maturidade com base na nota.
 */
export function getMaturityLevel(score: number): MaturityLevel {
  for (const level of maturityLevels) {
    if (score <= level.maxScore) {
      return level;
    }
  }
  return maturityLevels[maturityLevels.length - 1];
}

/**
 * Determina a classificação de risco com base no score.
 */
export function getRiskClassification(score: number): RiskClassification {
  for (const classification of riskClassifications) {
    if (score <= classification.maxScore) {
      return classification;
    }
  }
  return riskClassifications[riskClassifications.length - 1];
}

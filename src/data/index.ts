// Diagnóstico 360° - Dados Estruturados
// Re-exportação centralizada de todos os módulos de dados

export { areas } from './areas';
export type { Area } from './areas';

export { subAreas } from './subareas';
export type { SubArea } from './subareas';

export { questions } from './questions';
export type { Question, AnswerOption } from './questions';

export { riskMatrix } from './riskMatrix';
export type { RiskMatrixEntry } from './riskMatrix';

export {
  maturityLevels,
  riskClassifications,
  getMaturityLevel,
  getRiskClassification,
} from './maturityScale';
export type { MaturityLevel, RiskClassification } from './maturityScale';

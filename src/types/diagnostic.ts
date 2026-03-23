export interface Question {
  id: string;
  text: string;
  subArea: string;
}

export interface Area {
  id: string;
  name: string;
  weight: number;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  grade: number;
  observation: string;
}

export interface DiagnosticResult {
  companyName: string;
  answers: Record<string, Answer>;
  areaScores: { areaId: string; name: string; score: number }[];
  globalScore: number;
  maturityLevel: number;
  maturityLabel: string;
}

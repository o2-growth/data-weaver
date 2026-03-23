import { areas } from "@/data/questionnaire";
import { Answer, DiagnosticResult } from "@/types/diagnostic";

export function calculateResults(
  companyName: string,
  answers: Record<string, Answer>
): DiagnosticResult {
  const areaScores = areas.map((area) => {
    const grades = area.questions.map((q) => answers[q.id]?.grade ?? 1);
    const score = grades.reduce((sum, g) => sum + g, 0) / grades.length;
    return { areaId: area.id, name: area.name, score: Math.round(score * 100) / 100 };
  });

  const globalScore = areas.reduce((sum, area, i) => {
    return sum + areaScores[i].score * area.weight;
  }, 0);

  const rounded = Math.round(globalScore * 100) / 100;
  const { level, label } = getMaturityInfo(rounded);

  return {
    companyName,
    answers,
    areaScores,
    globalScore: rounded,
    maturityLevel: level,
    maturityLabel: label,
  };
}

export function getMaturityInfo(score: number): { level: number; label: string } {
  if (score <= 1.8) return { level: 1, label: "Crítica" };
  if (score <= 2.6) return { level: 2, label: "Básica" };
  if (score <= 3.4) return { level: 3, label: "Intermediária" };
  if (score <= 4.2) return { level: 4, label: "Gerencial" };
  return { level: 5, label: "Estratégica" };
}

export function getMaturityColor(level: number): string {
  const colors: Record<number, string> = {
    1: "hsl(0, 84%, 60%)",
    2: "hsl(25, 95%, 53%)",
    3: "hsl(48, 96%, 53%)",
    4: "hsl(217, 91%, 60%)",
    5: "hsl(142, 71%, 45%)",
  };
  return colors[level] || colors[1];
}

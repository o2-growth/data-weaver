import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { areas } from "@/data/questionnaire";
import { Answer } from "@/types/diagnostic";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, ChevronLeft, ChevronRight, CheckCircle2, Wrench } from "lucide-react";
import { calculateResults } from "@/lib/calculations";

export default function Questionnaire() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const companyName = (location.state as any)?.companyName || "Empresa";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const currentArea = areas[step];
  const totalQuestions = areas.reduce((sum, a) => sum + a.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const currentAreaAnswered = currentArea.questions.filter((q) => answers[q.id]?.grade).length;
  const allCurrentAnswered = currentAreaAnswered === currentArea.questions.length;

  const fillAllAnswers = () => {
    const filled: Record<string, Answer> = {};
    areas.forEach((area) => {
      area.questions.forEach((q) => {
        filled[q.id] = {
          questionId: q.id,
          grade: Math.floor(Math.random() * 5) + 1,
          observation: "",
        };
      });
    });
    setAnswers(filled);
  };

  const updateAnswer = (questionId: string, field: "grade" | "observation", value: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        [field]: value,
        grade: field === "grade" ? (value as number) : prev[questionId]?.grade ?? 0,
        observation: field === "observation" ? (value as string) : prev[questionId]?.observation ?? "",
      },
    }));
  };

  const handleFinish = () => {
    const result = calculateResults(companyName, answers);
    navigate("/resultados", { state: { result } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 border-b border-border/50 bg-card/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Diagnóstico 360°</span>
              <span className="text-xs text-muted-foreground">— {companyName}</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {answeredCount}/{totalQuestions} respondidas
            </span>
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={fillAllAnswers} className="gap-1.5 ml-2 text-xs">
                <Wrench className="w-3.5 h-3.5" /> Preencher Tudo
              </Button>
            )}
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex gap-1 mt-2">
            {areas.map((area, i) => (
              <button
                key={area.id}
                onClick={() => setStep(i)}
                className={`flex-1 text-[10px] font-medium py-1.5 rounded-md transition-colors ${
                  i === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {area.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{currentArea.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Peso: {currentArea.weight * 100}% · {currentArea.questions.length} perguntas ·{" "}
            {currentAreaAnswered} respondidas
          </p>
        </div>

        <div className="space-y-4">
          {currentArea.questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              number={i + 1}
              text={q.text}
              subArea={q.subArea}
              grade={answers[q.id]?.grade ?? 0}
              observation={answers[q.id]?.observation ?? ""}
              onGradeChange={(g) => updateAnswer(q.id, "grade", g)}
              onObservationChange={(o) => updateAnswer(q.id, "observation", o)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </Button>

          {step < areas.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!allCurrentAnswered}
              className="gap-2"
            >
              Próxima Área <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={answeredCount < totalQuestions}
              className="gap-2 bg-[hsl(var(--maturity-5))] hover:bg-[hsl(var(--maturity-5))]/90"
            >
              <CheckCircle2 className="w-4 h-4" /> Ver Resultados
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  number: number;
  text: string;
  subArea: string;
  grade: number;
  observation: string;
  onGradeChange: (grade: number) => void;
  onObservationChange: (obs: string) => void;
}

const gradeLabels = ["", "Inexistente", "Inicial", "Definido", "Gerenciado", "Otimizado"];
const gradeColors = [
  "",
  "border-[hsl(var(--maturity-1))] bg-[hsl(var(--maturity-1))] text-white",
  "border-[hsl(var(--maturity-2))] bg-[hsl(var(--maturity-2))] text-white",
  "border-[hsl(var(--maturity-3))] bg-[hsl(var(--maturity-3))] text-foreground",
  "border-[hsl(var(--maturity-4))] bg-[hsl(var(--maturity-4))] text-white",
  "border-[hsl(var(--maturity-5))] bg-[hsl(var(--maturity-5))] text-white",
];

export function QuestionCard({
  number,
  text,
  subArea,
  grade,
  observation,
  onGradeChange,
  onObservationChange,
}: QuestionCardProps) {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardContent className="p-5 space-y-4">
        <div className="flex gap-3">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
            {number}
          </span>
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {subArea}
            </span>
            <p className="text-sm font-medium leading-relaxed">{text}</p>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">Grau de Maturidade</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onGradeChange(g)}
                className={cn(
                  "flex-1 py-2 rounded-lg border-2 text-center text-xs font-semibold transition-all",
                  grade === g
                    ? gradeColors[g]
                    : "border-border bg-muted/50 text-muted-foreground hover:border-primary/30"
                )}
              >
                <div className="text-lg font-bold">{g}</div>
                <div className="text-[10px] leading-tight mt-0.5 opacity-80">{gradeLabels[g]}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Observações (opcional)</span>
          <Textarea
            placeholder="Adicione observações relevantes..."
            value={observation}
            onChange={(e) => onObservationChange(e.target.value)}
            className="min-h-[60px] text-sm resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}

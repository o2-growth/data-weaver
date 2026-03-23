import { useLocation, useNavigate } from "react-router-dom";
import { DiagnosticResult } from "@/types/diagnostic";
import { RadarChart } from "@/components/RadarChart";
import { MaturityBadge } from "@/components/MaturityBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, RotateCcw, BarChart3 } from "lucide-react";
import { getMaturityInfo, getMaturityColor } from "@/lib/calculations";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = (location.state as any)?.result as DiagnosticResult | undefined;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Nenhum resultado encontrado.</p>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  const radarData = result.areaScores.map((a) => ({
    name: a.name.length > 15 ? a.name.substring(0, 15) + "…" : a.name,
    score: a.score,
    fullMark: 5,
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold">Diagnóstico 360° — CFO</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/")} className="gap-2">
            <RotateCcw className="w-4 h-4" /> Novo Diagnóstico
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 space-y-8">
        {/* Company + Global Score */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold">{result.companyName}</h2>
          <p className="text-muted-foreground">Resultado do Diagnóstico Financeiro 360°</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Score Card */}
          <Card className="md:col-span-1 border-border/60">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center border-4"
                style={{ borderColor: getMaturityColor(result.maturityLevel) }}
              >
                <div>
                  <div className="text-3xl font-extrabold">{result.globalScore.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">de 5.00</div>
                </div>
              </div>
              <MaturityBadge level={result.maturityLevel} label={result.maturityLabel} size="lg" />
              <p className="text-xs text-muted-foreground">
                Nota global ponderada considerando os pesos de cada área
              </p>
            </CardContent>
          </Card>

          {/* Radar */}
          <Card className="md:col-span-2 border-border/60">
            <CardHeader className="pb-0">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Visão Geral por Área
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <RadarChart data={radarData} />
            </CardContent>
          </Card>
        </div>

        {/* Area Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Detalhamento por Área</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {result.areaScores.map((area) => {
              const info = getMaturityInfo(area.score);
              return (
                <Card key={area.areaId} className="border-border/60">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{area.name}</h4>
                      <MaturityBadge level={info.level} size="sm" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={(area.score / 5) * 100}
                        className="h-3 flex-1"
                      />
                      <span className="text-sm font-bold w-12 text-right">
                        {area.score.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Maturity Scale Legend */}
        <Card className="border-border/60">
          <CardContent className="p-5">
            <h4 className="font-semibold mb-3">Escala de Maturidade</h4>
            <div className="grid grid-cols-5 gap-2">
              {[
                { level: 1, label: "Crítica", range: "1.00 – 1.80" },
                { level: 2, label: "Básica", range: "1.81 – 2.60" },
                { level: 3, label: "Intermediária", range: "2.61 – 3.40" },
                { level: 4, label: "Gerencial", range: "3.41 – 4.20" },
                { level: 5, label: "Estratégica", range: "4.21 – 5.00" },
              ].map((item) => (
                <div
                  key={item.level}
                  className="text-center p-3 rounded-lg border border-border/40 bg-muted/30"
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: getMaturityColor(item.level) }}
                  >
                    {item.level}
                  </div>
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.range}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

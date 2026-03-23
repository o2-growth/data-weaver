import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Shield, Target, TrendingUp, FileText } from "lucide-react";

const features = [
  { icon: BarChart3, title: "5 Áreas", desc: "Análise completa do ecossistema financeiro" },
  { icon: FileText, title: "48 Perguntas", desc: "Diagnóstico detalhado por subárea" },
  { icon: Target, title: "Grau de Maturidade", desc: "Classificação de 1 a 5 com recomendações" },
  { icon: TrendingUp, title: "Dashboard", desc: "Visualização gráfica dos resultados" },
];

export default function Index() {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (companyName.trim()) {
      navigate("/questionario", { state: { companyName: companyName.trim() } });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Shield className="w-7 h-7 text-primary" />
          <h1 className="text-lg font-bold tracking-tight">Diagnóstico 360° — CFO</h1>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              Plataforma de Diagnóstico Financeiro
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Avalie a maturidade<br />
              <span className="text-primary">financeira</span> da sua empresa
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Responda o questionário e descubra o grau de maturidade nas áreas de Contabilidade, 
              Financeiro, Controladoria, Fiscal e Planejamento.
            </p>
          </div>

          <Card className="max-w-md mx-auto border-border/60 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <label className="text-sm font-semibold text-foreground">
                Nome da Empresa
              </label>
              <Input
                placeholder="Ex: Empresa ABC Ltda"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                className="h-12 text-base"
              />
              <Button
                onClick={handleStart}
                disabled={!companyName.trim()}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                Iniciar Diagnóstico
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="text-center space-y-2 p-4 rounded-xl bg-card border border-border/40">
                <f.icon className="w-6 h-6 text-primary mx-auto" />
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

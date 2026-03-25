import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  BarChart3,
  FileText,
  ArrowRight,
  Building2,
  Target,
  TrendingUp,
  ClipboardCheck,
  Monitor,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "5 Áreas Estratégicas",
    desc: "Contabilidade, Financeiro, Controladoria, Fiscal e Planejamento",
  },
  {
    icon: FileText,
    title: "48 Perguntas Especializadas",
    desc: "Cada pergunta com 5 opções de resposta descritivas para avaliação precisa",
  },
  {
    icon: Shield,
    title: "Matriz de Risco",
    desc: "240 análises de risco pré-configuradas com controles e planos de ação",
  },
];

const steps = [
  {
    number: 1,
    icon: Building2,
    text: "Informe o nome da empresa",
  },
  {
    number: 2,
    icon: ClipboardCheck,
    text: "Responda as 48 perguntas do diagnóstico",
  },
  {
    number: 3,
    icon: BarChart3,
    text: "Receba o score de maturidade e riscos identificados",
  },
  {
    number: 4,
    icon: TrendingUp,
    text: "Obtenha quick wins e planos de ação detalhados",
  },
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
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7 text-primary" />
            <span className="text-lg font-bold tracking-tight">O2 Inc</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            CFOs as a Service
          </Badge>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-16 md:py-24 hero-gradient">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border-transparent hover:bg-primary/10">
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Plataforma de Diagnóstico Financeiro
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Diagnóstico{" "}
              <span className="text-primary">360°</span>
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-primary/80">
              Avaliação de Maturidade Financeira
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Avalie a maturidade financeira da empresa em{" "}
              <span className="font-semibold text-foreground">5 áreas estratégicas</span>{" "}
              com{" "}
              <span className="font-semibold text-foreground">48 perguntas especializadas</span>
            </p>
          </div>
        </section>

        {/* Company Name Input */}
        <section className="px-6 pb-16 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <Card className="max-w-md mx-auto border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                Iniciar Diagnóstico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-sm font-semibold">
                  Nome da Empresa
                </Label>
                <Input
                  id="company-name"
                  placeholder="Ex: Empresa ABC Ltda"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  className="h-12 text-base border-border/60 focus:border-primary"
                />
              </div>
              <Button
                onClick={handleStart}
                disabled={!companyName.trim()}
                className="w-full h-12 px-8 text-base font-semibold btn-glow"
                size="lg"
              >
                Iniciar Diagnóstico
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => {
                  if (companyName.trim()) {
                    navigate("/apresentacao", { state: { companyName: companyName.trim() } });
                  }
                }}
                disabled={!companyName.trim()}
                variant="outline"
                className="w-full h-11 px-8 text-sm font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/5"
                size="lg"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Iniciar em Modo Apresentação
              </Button>
            </CardContent>
          </Card>
        </section>

        <Separator className="max-w-6xl mx-auto" />

        {/* Feature Highlights Grid */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                O que compõe o diagnóstico
              </h3>
              <p className="text-muted-foreground">
                Uma avaliação completa da maturidade financeira da sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger">
              {features.map((f) => (
                <Card
                  key={f.title}
                  className="rounded-xl border-border/40 shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg">{f.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="max-w-6xl mx-auto" />

        {/* How It Works Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Como funciona
              </h3>
              <p className="text-muted-foreground">
                4 passos simples para um diagnóstico completo
              </p>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Connecting line (desktop only) */}
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 z-0" />

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center space-y-3 p-6 rounded-xl bg-card border border-border/40 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 z-[1]"
                >
                  <div className="relative z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-background">
                    {step.number}
                  </div>
                  <step.icon className="w-6 h-6 text-primary/60" />
                  <p className="text-sm font-medium leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">
              O2 Inc.
            </span>
            <span>— CFOs as a Service</span>
          </div>
          <span>Porto Alegre, RS</span>
        </div>
      </footer>
    </div>
  );
}

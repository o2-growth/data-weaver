import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
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
    title: "6 Áreas Estratégicas",
    desc: "Contabilidade, Controladoria, Financeiro, Fiscal, Planejamento e Comercial",
  },
  {
    icon: FileText,
    title: "54 Perguntas Especializadas",
    desc: "Cada pergunta com 5 opções descritivas para avaliação precisa do grau de maturidade",
  },
  {
    icon: Shield,
    title: "Matriz de Risco",
    desc: "270 análises de risco pré-configuradas com controles e planos de ação",
  },
];

const steps = [
  { number: 1, icon: Building2, text: "Informe o nome da empresa" },
  { number: 2, icon: ClipboardCheck, text: "Responda as 48 perguntas do diagnóstico" },
  { number: 3, icon: BarChart3, text: "Receba o score de maturidade e riscos identificados" },
  { number: 4, icon: TrendingUp, text: "Obtenha quick wins e planos de ação detalhados" },
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
    <div className="min-h-screen lp-bg text-white flex flex-col">
      {/* Header */}
      <header className="lp-header sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center">
              <span className="text-[#0A0A0A] font-black text-xs">O2</span>
            </div>
            <span className="text-sm font-bold tracking-tight">
              Grau de <span className="gradient-text-neon">Maturidade</span>
            </span>
          </div>
          <span className="eyebrow-pill text-[10px]">CFOs as a Service</span>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative px-6 pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-60" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,230,118,0.12) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <span className="eyebrow-pill">Plataforma de Avaliação Financeira</span>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] font-display">
              Grau de{" "}
              <span className="gradient-text-neon">Maturidade</span>
            </h1>

            <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
              Avalie a maturidade financeira da empresa em{" "}
              <strong className="text-white font-semibold">6 áreas estratégicas</strong>{" "}
              com{" "}
              <strong className="text-white font-semibold">54 perguntas especializadas</strong>.
            </p>
          </div>
        </section>

        {/* Iniciar Diagnóstico */}
        <section className="px-6 pb-20">
          <GlassCard className="max-w-md mx-auto p-7 space-y-5 animate-slide-up">
            <div className="space-y-1">
              <span className="eyebrow-pill">Iniciar Diagnóstico</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
                Nome da Empresa
              </Label>
              <Input
                id="company-name"
                placeholder="Ex: Empresa ABC Ltda"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                className="h-12 text-base lp-input"
              />
            </div>

            <div className="space-y-3">
              <NeonButton
                variant="primary"
                glow
                onClick={handleStart}
                disabled={!companyName.trim()}
                className="w-full"
              >
                Iniciar Diagnóstico
                <ArrowRight className="w-4 h-4" />
              </NeonButton>

              <NeonButton
                variant="outline"
                onClick={() => {
                  if (companyName.trim()) {
                    navigate("/apresentacao", { state: { companyName: companyName.trim() } });
                  }
                }}
                disabled={!companyName.trim()}
                className="w-full text-sm py-3"
              >
                <Monitor className="w-4 h-4" />
                Iniciar em Modo Apresentação
              </NeonButton>
            </div>
          </GlassCard>
        </section>

        {/* Features */}
        <section className="lp-bg-alt border-y border-white/8 px-6 py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="eyebrow-pill">O que compõe</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
                Avaliação <span className="gradient-text-neon">completa</span> da maturidade
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-stagger">
              {features.map((f) => (
                <GlassCard
                  key={f.title}
                  interactive
                  className="p-6 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#4CAF50]/10 border border-[#7EBF8E]/20 flex items-center justify-center mx-auto">
                    <f.icon className="w-6 h-6 text-[#00E676]" />
                  </div>
                  <h3 className="font-bold text-base text-white">{f.title}</h3>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">{f.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-20">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="eyebrow-pill">Como funciona</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight font-display">
                4 passos para um <span className="gradient-text-neon">diagnóstico completo</span>
              </h2>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#7EBF8E]/30 to-transparent z-0" />
              {steps.map((step) => (
                <GlassCard
                  key={step.number}
                  interactive
                  className="relative z-[1] flex flex-col items-center text-center p-6 space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#00E676] text-[#0A0A0A] flex items-center justify-center font-black text-sm shadow-lg shadow-[#4CAF50]/30">
                    {step.number}
                  </div>
                  <step.icon className="w-5 h-5 text-[#7EBF8E]" />
                  <p className="text-sm font-medium text-white leading-relaxed">{step.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="lp-bg-alt border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#606060]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#7EBF8E]" />
            <span className="font-semibold text-white">O2 Inc.</span>
            <span>— CFOs as a Service</span>
          </div>
          <span>Porto Alegre, RS</span>
        </div>
      </footer>
    </div>
  );
}

import { useEffect } from "react";
import { LPNavbar } from "@/components/landing/LPNavbar";
import { LPHero } from "@/components/landing/LPHero";
import { LPSocialProof } from "@/components/landing/LPSocialProof";
import { LPHowItWorks } from "@/components/landing/LPHowItWorks";
import { LPAreas } from "@/components/landing/LPAreas";
import { LPResults } from "@/components/landing/LPResults";
import { LPTestimonials } from "@/components/landing/LPTestimonials";
import { LPPricing } from "@/components/landing/LPPricing";
import { LPFAQ } from "@/components/landing/LPFAQ";
import { LPFooter } from "@/components/landing/LPFooter";

/**
 * Public landing page — dark premium, neon green accent.
 * Hardcoded brand palette (isolated from app tokens) per brief.
 * Route: /landing
 */
export default function LandingPage() {
  useEffect(() => {
    document.title = "Grau de Maturidade | O2 Inc — Avalie a maturidade financeira da sua empresa";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Avalie o grau de maturidade financeira da sua empresa em 6 áreas estratégicas, com 54 perguntas e 270 análises de risco. Relatório executivo pronto para o board.",
      );
    }
  }, []);

  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen font-sans">
      <h1 className="sr-only">Grau de Maturidade — O2 Inc</h1>
      <LPNavbar />
      <LPHero />
      <LPSocialProof />
      <LPHowItWorks />
      <LPAreas />
      <LPResults />
      <LPTestimonials />
      <LPPricing />
      <LPFAQ />
      <LPFooter />
    </main>
  );
}

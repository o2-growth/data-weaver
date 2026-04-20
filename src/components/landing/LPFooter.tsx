import { Mail } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";

export function LPFooter() {
  const { startCheckout, CheckoutDialog } = useCheckout();
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/[0.06]">
      {/* Final CTA strip */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white mb-4">
          Pronto para ver{" "}
          <span className="bg-gradient-to-r from-[#7EBF8E] to-[#00E676] bg-clip-text text-transparent">
            o raio-X da sua empresa?
          </span>
        </h2>
        <p className="text-[#A0A0A0] mb-8 max-w-xl mx-auto">
          ~30 minutos agora podem mudar a próxima década do seu negócio.
        </p>
        <button
          onClick={startCheckout}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#00E676] text-[#0A0A0A] font-black text-lg shadow-xl shadow-[#4CAF50]/30 hover:shadow-[#00E676]/50 hover:scale-[1.03] transition-all animate-glow-pulse"
        >
          Obter Grau de Maturidade →
        </button>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7EBF8E] to-[#4CAF50] flex items-center justify-center text-[#0A0A0A] font-black text-[10px]">
              O2
            </span>
            <span className="text-[#606060] text-sm">
              © {new Date().getFullYear()} O2 Inc · Porto Alegre · Todos os direitos reservados.
            </span>
          </div>
          <a
            href="mailto:contato@o2inc.com.br"
            className="flex items-center gap-2 text-[#7EBF8E] text-sm hover:text-[#00E676] transition-colors"
          >
            <Mail className="w-4 h-4" />
            contato@o2inc.com.br
          </a>
        </div>
      </div>
      {CheckoutDialog}
    </footer>
  );
}

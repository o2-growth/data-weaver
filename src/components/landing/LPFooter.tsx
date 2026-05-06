import { ArrowUp, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoWhite from "@/assets/o2-logo-white.png";

export function LPFooter() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-background border-t border-border">
      {/* CTA strip */}
      <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-20 text-center">
        <div className="eyebrow eyebrow-accent justify-center mb-6">Próximo passo</div>
        <h2 className="font-display font-bold text-foreground"
          style={{ fontSize: "clamp(36px, 5.6vw, 72px)", lineHeight: 1.05 }}
        >
          Pronto para ver o <span className="gradient-text-neon">raio-X</span> da sua empresa?
        </h2>
        <p className="text-foreground/70 mt-6 mb-10 max-w-xl mx-auto normal-case">
          ~30 minutos agora podem mudar a próxima década do seu negócio.
        </p>
        <button onClick={() => navigate("/login")} className="btn btn-primary">
          COMEÇAR DIAGNÓSTICO →
        </button>
      </div>

      {/* Footer body */}
      <div className="border-t border-border">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-16 grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <img src={logoWhite} alt="O2 Inc" className="h-8 w-auto mb-6" />
            <p className="text-foreground/60 text-sm max-w-md normal-case">
              CFOs as a Service. Diagnóstico, controladoria e direção financeira para empresas em crescimento.
            </p>
            <div className="footer-actions flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn btn-ghost btn-sm"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                VOLTAR AO TOPO
              </button>
              <a
                href="mailto:contato@o2inc.com.br"
                className="btn btn-ghost btn-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                CONTATO@O2INC.COM.BR
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/60 mb-4">
              Plataforma
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6 list-none m-0 p-0 text-sm">
              <li><a href="#como-funciona" className="text-foreground/70 hover:text-foreground">Como funciona</a></li>
              <li><a href="#areas" className="text-foreground/70 hover:text-foreground">Áreas</a></li>
              <li><a href="#depoimentos" className="text-foreground/70 hover:text-foreground">Depoimentos</a></li>
              <li><a href="#faq" className="text-foreground/70 hover:text-foreground">FAQ</a></li>
              <li><button onClick={() => navigate("/login")} className="text-foreground/70 hover:text-foreground text-left">Entrar</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-6 flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] tracking-[0.08em] uppercase text-foreground/50">
            <span>© {new Date().getFullYear()} O2 Inc — Porto Alegre, RS</span>
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

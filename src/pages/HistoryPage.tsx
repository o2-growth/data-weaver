import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoWhite from "@/assets/o2-logo-white.png";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Trash2, FileText } from "lucide-react";
import {
  listDiagnostics,
  deleteDiagnostic,
  type DiagnosticListItem,
} from "@/lib/diagnosticsRepo";
import { toast } from "sonner";

function getMaturityLabel(level: number): string {
  return ["Crítica", "Básica", "Intermediária", "Gerencial", "Estratégica"][level - 1] ?? "—";
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<DiagnosticListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await listDiagnostics();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este diagnóstico? Esta ação não pode ser desfeita.")) return;
    const ok = await deleteDiagnostic(id);
    if (ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Diagnóstico excluído");
    } else {
      toast.error("Falha ao excluir");
    }
  };

  return (
    <div className="min-h-screen lp-bg text-white flex flex-col">
      <header className="lp-header sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoWhite} alt="O2 Inc" className="h-7 w-auto" />
            <span className="hidden sm:block w-px h-5 bg-white/20" />
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-white/70">
              Meus Diagnósticos
            </span>
          </div>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-3 h-9 rounded-xl border border-white/12 text-white text-xs font-semibold hover:border-white/25 hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Início
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 space-y-6">
        <div className="space-y-2">
          <span className="eyebrow-pill">Histórico</span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display">
            Meus <span className="gradient-text-neon">diagnósticos</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#00E676] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <GlassCard className="p-10 text-center space-y-4">
            <FileText className="w-10 h-10 text-[#7EBF8E] mx-auto" />
            <p className="text-[#A0A0A0]">Você ainda não realizou nenhum diagnóstico.</p>
            <button onClick={() => navigate("/app")} className="btn-neon-primary">
              Iniciar diagnóstico
            </button>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const date = new Date(item.date_performed).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
              return (
                <GlassCard key={item.id} interactive className="p-5 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/resultados?id=${item.id}`)}
                    className="flex-1 text-left space-y-1"
                  >
                    <p className="font-bold text-white">{item.company_name}</p>
                    <p className="text-xs text-[#A0A0A0]">{date}</p>
                  </button>
                  <div className="flex flex-col items-end">
                    <span className="font-display text-2xl font-black text-white tabular-nums">
                      {Number(item.global_score).toFixed(1)}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#7EBF8E]">
                      {getMaturityLabel(item.maturity_level)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg text-[#A0A0A0] hover:text-red-400 hover:bg-red-500/10 transition-all"
                    aria-label="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </GlassCard>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

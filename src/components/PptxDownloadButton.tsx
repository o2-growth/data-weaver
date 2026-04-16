// ============================================================
// Botao para download do relatorio PowerPoint (.pptx)
// ============================================================

import { useState } from "react";
import { FileSliders, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateDiagnosticPptx } from "@/lib/pptx/generatePptx";
import type { DiagnosticResult } from "@/types/diagnostic";
import { cn } from "@/lib/utils";

interface PptxDownloadButtonProps {
  result: DiagnosticResult;
  className?: string;
}

export function PptxDownloadButton({ result, className }: PptxDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      await generateDiagnosticPptx(result);
      toast.success("Apresentacao gerada com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PPTX:", error);
      toast.error("Erro ao gerar apresentacao. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 h-9 rounded-xl",
        "border border-white/12 text-white font-semibold text-xs bg-transparent",
        "transition-all duration-300 hover:border-white/25 hover:bg-white/5",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Gerando PPT...
        </>
      ) : (
        <>
          <FileSliders className="w-3.5 h-3.5" />
          Exportar PPT
        </>
      )}
    </button>
  );
}

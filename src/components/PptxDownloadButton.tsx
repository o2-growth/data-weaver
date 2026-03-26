// ============================================================
// Botao para download do relatorio PowerPoint (.pptx)
// ============================================================

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileSliders, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateDiagnosticPptx } from "@/lib/pptx/generatePptx";
import type { DiagnosticResult } from "@/types/diagnostic";

interface PptxDownloadButtonProps {
  result: DiagnosticResult;
}

export function PptxDownloadButton({ result }: PptxDownloadButtonProps) {
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
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isGenerating}
      className="gap-2"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Gerando PPT...
        </>
      ) : (
        <>
          <FileSliders className="w-4 h-4" />
          Exportar PPT
        </>
      )}
    </Button>
  );
}

// ============================================================
// Botao para download do relatorio PDF
// ============================================================

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { generatePdf } from "@/lib/pdf/generatePdf";
import { downloadBlob } from "@/lib/downloadBlob";
import { toast } from "sonner";
import type { DiagnosticResult } from "@/types/diagnostic";
import { cn } from "@/lib/utils";

interface PdfDownloadButtonProps {
  result: DiagnosticResult;
  className?: string;
}

export function PdfDownloadButton({ result, className }: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const blob = await generatePdf(result);
      const safeCompanyName = result.companyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const dateStr = new Date(result.datePerformed).toISOString().split("T")[0];
      const fileName = `diagnostico-360-${safeCompanyName}-${dateStr}.pdf`;
      downloadBlob(blob, fileName);
      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
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
        "bg-gradient-to-r from-[#4CAF50] to-[#00E676] text-[#0A0A0A] font-bold text-xs",
        "shadow-lg shadow-[#4CAF50]/30 transition-all duration-300",
        "hover:scale-[1.03] hover:shadow-[#00E676]/50",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        className,
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <FileDown className="w-3.5 h-3.5" />
          Exportar PDF
        </>
      )}
    </button>
  );
}

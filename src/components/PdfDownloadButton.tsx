// ============================================================
// Botao para download do relatorio PDF
// ============================================================

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { generatePdf } from "@/lib/pdf/generatePdf";
import type { DiagnosticResult } from "@/types/diagnostic";

interface PdfDownloadButtonProps {
  result: DiagnosticResult;
}

export function PdfDownloadButton({ result }: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const blob = await generatePdf(result);
      const url = URL.createObjectURL(blob);

      // Sanitizar nome da empresa para usar no filename
      const safeCompanyName = result.companyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const dateStr = new Date(result.datePerformed)
        .toISOString()
        .split("T")[0];

      const fileName = `diagnostico-360-${safeCompanyName}-${dateStr}.pdf`;

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Liberar o blob URL apos um curto delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
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
          Gerando PDF...
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4" />
          Exportar PDF
        </>
      )}
    </Button>
  );
}

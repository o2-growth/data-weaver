// ============================================================
// Diagnostico 360 - Gerador de PDF
// ============================================================

import { pdf } from "@react-pdf/renderer";
import { createElement } from "react";
import { DiagnosticReport } from "./DiagnosticReport";
import type { DiagnosticResult } from "@/types/diagnostic";

/**
 * Gera o PDF do relatorio diagnostico e retorna como Blob.
 */
export async function generatePdf(result: DiagnosticResult): Promise<Blob> {
  const document = createElement(DiagnosticReport, { result });
  const blob = await pdf(document).toBlob();
  return blob;
}

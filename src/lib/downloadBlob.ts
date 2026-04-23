// ============================================================
// Helper de download que funciona dentro do preview (iframe)
// ============================================================

/**
 * Faz o download de um Blob. Se estiver rodando dentro de um iframe
 * (ex: preview do Lovable) que bloqueia downloads, abre em nova aba
 * como fallback.
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const inIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.rel = "noopener";
    if (inIframe) {
      link.target = "_blank";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    // Fallback final: nova aba
    window.open(url, "_blank", "noopener,noreferrer");
  }

  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

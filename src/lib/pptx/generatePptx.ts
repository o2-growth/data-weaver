// ============================================================
// Diagnostico 360 - Gerador de PowerPoint (.pptx)
// Usa pptxgenjs para gerar apresentacao profissional
// ============================================================

import PptxGenJS from 'pptxgenjs';
import type { DiagnosticResult, AreaScore, IdentifiedRisk, QuickWin } from '@/types/diagnostic';
import { getMaturityInfo } from '@/lib/calculations';

// ────────────────────────────────────────────────────────────
// Constantes de Design
// ────────────────────────────────────────────────────────────

const COLORS = {
  primary: '1B2A4A',
  accent: '3B82F6',
  white: 'FFFFFF',
  lightGray: 'F1F5F9',
  mediumGray: 'E2E8F0',
  darkGray: '64748B',
  text: '1E293B',
  textLight: '94A3B8',
  grade1: 'DC2626',
  grade2: 'F97316',
  grade3: 'EAB308',
  grade4: '22C55E',
  grade5: '3B82F6',
  riskAlto: 'DC2626',
  riskMedio: 'EAB308',
  riskBaixo: '22C55E',
} as const;

const FONT = 'Calibri';

// Slide dimensions for LAYOUT_WIDE (13.33" x 7.5")
const SLIDE_W = 13.33;
const SLIDE_H = 7.5;
const MARGIN_X = 0.6;
const CONTENT_W = SLIDE_W - MARGIN_X * 2;

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────

function getGradeColor(level: number): string {
  const map: Record<number, string> = {
    1: COLORS.grade1,
    2: COLORS.grade2,
    3: COLORS.grade3,
    4: COLORS.grade4,
    5: COLORS.grade5,
  };
  return map[level] || COLORS.darkGray;
}

function getRiskColor(category: string): string {
  const map: Record<string, string> = {
    Alto: COLORS.riskAlto,
    'Médio': COLORS.riskMedio,
    Baixo: COLORS.riskBaixo,
  };
  return map[category] || COLORS.darkGray;
}

function getEffortImpactColor(value: string): string {
  const map: Record<string, string> = {
    baixo: COLORS.riskBaixo,
    'médio': COLORS.riskMedio,
    alto: COLORS.riskAlto,
  };
  return map[value] || COLORS.darkGray;
}

function formatMonthYear(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  } catch {
    return isoDate;
  }
}

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

function getMaturityDescription(level: number): string {
  const descriptions: Record<number, string> = {
    1: 'A empresa se encontra em estagio critico de maturidade financeira. Processos inexistentes ou altamente informais, com riscos significativos.',
    2: 'A empresa possui estrutura basica de gestao financeira. Processos iniciais existem, porem pouco formalizados e dependentes de controles manuais.',
    3: 'Estagio intermediario de maturidade financeira. Processos parcialmente estruturados, com oportunidades claras de evolucao.',
    4: 'Estrutura gerencial solida. Processos bem definidos, com controles adequados e bom nivel de governanca.',
    5: 'Nivel estrategico de maturidade financeira. Processos plenamente integrados, com analise preditiva e visao de longo prazo.',
  };
  return descriptions[level] || descriptions[1];
}

/** Adds the thin accent bar at the top of content slides */
function addTopBar(slide: PptxGenJS.Slide): void {
  slide.addShape('rect', {
    x: 0,
    y: 0,
    w: SLIDE_W,
    h: 0.06,
    fill: { color: COLORS.accent },
  });
}

/** Adds slide number at bottom right */
function addSlideNumber(slide: PptxGenJS.Slide): void {
  slide.slideNumber = {
    x: SLIDE_W - 0.8,
    y: SLIDE_H - 0.4,
    w: 0.5,
    fontSize: 9,
    fontFace: FONT,
    color: COLORS.darkGray,
    align: 'right',
  };
}

/** Adds a section title bar */
function addSectionTitle(slide: PptxGenJS.Slide, title: string, y: number): void {
  slide.addShape('rect', {
    x: MARGIN_X,
    y,
    w: CONTENT_W,
    h: 0.42,
    fill: { color: COLORS.primary },
    rectRadius: 0.05,
  });
  slide.addText(title, {
    x: MARGIN_X + 0.15,
    y,
    w: CONTENT_W - 0.3,
    h: 0.42,
    fontFace: FONT,
    fontSize: 13,
    bold: true,
    color: COLORS.white,
    valign: 'middle',
  });
}

/** Truncate text to max length */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.substring(0, max - 3) + '...';
}

// ────────────────────────────────────────────────────────────
// Slide Builders
// ────────────────────────────────────────────────────────────

function buildCoverSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.primary };

  // O2 Inc. logo text
  slide.addText('O2 Inc.', {
    x: MARGIN_X,
    y: 0.6,
    w: CONTENT_W,
    h: 0.6,
    fontFace: FONT,
    fontSize: 20,
    bold: true,
    color: COLORS.accent,
    align: 'left',
  });

  // Decorative line
  slide.addShape('rect', {
    x: MARGIN_X,
    y: 1.3,
    w: 2.0,
    h: 0.04,
    fill: { color: COLORS.accent },
  });

  // Main title
  slide.addText('Diagnostico 360\u00B0', {
    x: MARGIN_X,
    y: 2.0,
    w: CONTENT_W,
    h: 1.0,
    fontFace: FONT,
    fontSize: 44,
    bold: true,
    color: COLORS.white,
    align: 'left',
  });

  // Subtitle
  slide.addText('Grau de Maturidade Financeira', {
    x: MARGIN_X,
    y: 3.0,
    w: CONTENT_W,
    h: 0.6,
    fontFace: FONT,
    fontSize: 22,
    color: COLORS.textLight,
    align: 'left',
  });

  // Company name
  slide.addText(result.companyName, {
    x: MARGIN_X,
    y: 3.9,
    w: CONTENT_W,
    h: 0.7,
    fontFace: FONT,
    fontSize: 28,
    bold: true,
    color: COLORS.accent,
    align: 'left',
  });

  // Decorative line bottom
  slide.addShape('rect', {
    x: MARGIN_X,
    y: 5.4,
    w: CONTENT_W,
    h: 0.01,
    fill: { color: '2D4A7A' },
  });

  // Date
  slide.addText(formatMonthYear(result.datePerformed), {
    x: MARGIN_X,
    y: 5.6,
    w: CONTENT_W,
    h: 0.4,
    fontFace: FONT,
    fontSize: 14,
    color: COLORS.textLight,
    align: 'left',
  });

  // Confidential
  slide.addText('Confidencial', {
    x: MARGIN_X,
    y: 6.6,
    w: CONTENT_W,
    h: 0.4,
    fontFace: FONT,
    fontSize: 10,
    italic: true,
    color: COLORS.darkGray,
    align: 'left',
  });
}

function buildResultadoGeralSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  addTopBar(slide);
  addSlideNumber(slide);

  // Title
  slide.addText('Resultado Geral', {
    x: MARGIN_X,
    y: 0.25,
    w: CONTENT_W,
    h: 0.55,
    fontFace: FONT,
    fontSize: 26,
    bold: true,
    color: COLORS.primary,
  });

  // Subtitle with date
  slide.addText(`${result.companyName} \u2014 ${formatDate(result.datePerformed)}`, {
    x: MARGIN_X,
    y: 0.75,
    w: CONTENT_W,
    h: 0.3,
    fontFace: FONT,
    fontSize: 11,
    color: COLORS.darkGray,
  });

  // ── Left section: Score display ──
  const scoreBoxX = MARGIN_X;
  const scoreBoxY = 1.3;
  const scoreBoxW = 4.0;

  // Score background box
  const gradeColor = getGradeColor(result.maturityLevel);
  slide.addShape('roundRect', {
    x: scoreBoxX,
    y: scoreBoxY,
    w: scoreBoxW,
    h: 2.8,
    fill: { color: COLORS.lightGray },
    rectRadius: 0.1,
    line: { color: COLORS.mediumGray, pt: 1 },
  });

  // Score number
  slide.addText(result.globalScore.toFixed(2), {
    x: scoreBoxX,
    y: scoreBoxY + 0.2,
    w: scoreBoxW,
    h: 1.2,
    fontFace: FONT,
    fontSize: 54,
    bold: true,
    color: gradeColor,
    align: 'center',
  });

  // "de 5.00"
  slide.addText('de 5.00', {
    x: scoreBoxX,
    y: scoreBoxY + 1.2,
    w: scoreBoxW,
    h: 0.3,
    fontFace: FONT,
    fontSize: 12,
    color: COLORS.darkGray,
    align: 'center',
  });

  // Maturity badge
  slide.addShape('roundRect', {
    x: scoreBoxX + scoreBoxW / 2 - 1.2,
    y: scoreBoxY + 1.65,
    w: 2.4,
    h: 0.38,
    fill: { color: gradeColor },
    rectRadius: 0.19,
  });
  slide.addText(result.maturityLabel, {
    x: scoreBoxX + scoreBoxW / 2 - 1.2,
    y: scoreBoxY + 1.65,
    w: 2.4,
    h: 0.38,
    fontFace: FONT,
    fontSize: 13,
    bold: true,
    color: COLORS.white,
    align: 'center',
    valign: 'middle',
  });

  // Grau level
  slide.addText(`Grau ${result.maturityLevel}`, {
    x: scoreBoxX,
    y: scoreBoxY + 2.15,
    w: scoreBoxW,
    h: 0.35,
    fontFace: FONT,
    fontSize: 11,
    color: COLORS.darkGray,
    align: 'center',
  });

  // ── Right section: Areas table ──
  const tableX = scoreBoxX + scoreBoxW + 0.4;
  const tableW = CONTENT_W - scoreBoxW - 0.4;

  const headerRow: PptxGenJS.TableCell[] = [
    { text: 'Area', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 10, align: 'left', valign: 'middle' } },
    { text: 'Peso', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 10, align: 'center', valign: 'middle' } },
    { text: 'Nota', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 10, align: 'center', valign: 'middle' } },
    { text: 'Grau', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 10, align: 'center', valign: 'middle' } },
  ];

  const dataRows: PptxGenJS.TableRow[] = result.areaScores.map((area, idx) => {
    const bg = idx % 2 === 0 ? COLORS.white : COLORS.lightGray;
    const areaGradeColor = getGradeColor(area.maturityLevel);
    return [
      { text: area.areaName, options: { fill: { color: bg }, fontFace: FONT, fontSize: 10, align: 'left', valign: 'middle' } },
      { text: `${(area.weight * 100).toFixed(0)}%`, options: { fill: { color: bg }, fontFace: FONT, fontSize: 10, align: 'center', valign: 'middle' } },
      { text: area.score.toFixed(2), options: { fill: { color: bg }, fontFace: FONT, fontSize: 10, bold: true, align: 'center', valign: 'middle', color: areaGradeColor } },
      { text: area.maturityLabel, options: { fill: { color: bg }, fontFace: FONT, fontSize: 9, align: 'center', valign: 'middle', color: areaGradeColor } },
    ];
  });

  slide.addTable([headerRow, ...dataRows], {
    x: tableX,
    y: scoreBoxY,
    w: tableW,
    colW: [tableW * 0.35, tableW * 0.15, tableW * 0.2, tableW * 0.3],
    rowH: 0.38,
    border: { type: 'solid', pt: 0.5, color: COLORS.mediumGray },
    margin: [3, 5, 3, 5],
  });

  // ── Bottom: Interpretation ──
  const descY = 4.5;
  slide.addShape('roundRect', {
    x: MARGIN_X,
    y: descY,
    w: CONTENT_W,
    h: 0.85,
    fill: { color: COLORS.lightGray },
    rectRadius: 0.08,
    line: { color: COLORS.mediumGray, pt: 0.5 },
  });
  slide.addText(getMaturityDescription(result.maturityLevel), {
    x: MARGIN_X + 0.2,
    y: descY + 0.05,
    w: CONTENT_W - 0.4,
    h: 0.75,
    fontFace: FONT,
    fontSize: 11,
    color: COLORS.text,
    valign: 'middle',
  });

  // Stats at bottom
  slide.addText(`${result.answeredQuestions}/${result.totalQuestions} perguntas respondidas  |  ${result.identifiedRisks.length} risco(s) identificado(s)  |  ${result.quickWins.length} quick win(s)`, {
    x: MARGIN_X,
    y: 5.6,
    w: CONTENT_W,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: COLORS.darkGray,
    align: 'center',
  });
}

function buildAreaSlide(pptx: PptxGenJS, result: DiagnosticResult, area: AreaScore): void {
  const areaRisks = result.identifiedRisks
    .filter((r) => r.areaName === area.areaName)
    .sort((a, b) => b.riskScore - a.riskScore);

  const slide = pptx.addSlide();
  addTopBar(slide);
  addSlideNumber(slide);

  // ── Header: Area name + weight + score badge ──
  const gradeColor = getGradeColor(area.maturityLevel);

  slide.addText(area.areaName, {
    x: MARGIN_X,
    y: 0.2,
    w: 6,
    h: 0.5,
    fontFace: FONT,
    fontSize: 24,
    bold: true,
    color: COLORS.primary,
  });

  // Weight badge
  slide.addText(`Peso: ${(area.weight * 100).toFixed(0)}%`, {
    x: MARGIN_X,
    y: 0.7,
    w: 2,
    h: 0.3,
    fontFace: FONT,
    fontSize: 10,
    color: COLORS.darkGray,
  });

  // Score badge (right side of header)
  slide.addShape('roundRect', {
    x: SLIDE_W - MARGIN_X - 3.0,
    y: 0.2,
    w: 3.0,
    h: 0.55,
    fill: { color: gradeColor },
    rectRadius: 0.08,
  });
  slide.addText(`${area.score.toFixed(2)}  \u2014  ${area.maturityLabel}`, {
    x: SLIDE_W - MARGIN_X - 3.0,
    y: 0.2,
    w: 3.0,
    h: 0.55,
    fontFace: FONT,
    fontSize: 14,
    bold: true,
    color: COLORS.white,
    align: 'center',
    valign: 'middle',
  });

  // ── Subareas table ──
  let currentY = 1.15;

  if (area.subAreaScores.length > 0) {
    const subHeaderRow: PptxGenJS.TableCell[] = [
      { text: 'SubArea', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 9, align: 'left', valign: 'middle' } },
      { text: 'Nota', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 9, align: 'center', valign: 'middle' } },
      { text: 'Grau', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 9, align: 'center', valign: 'middle' } },
    ];

    const subDataRows: PptxGenJS.TableRow[] = area.subAreaScores.map((sub, idx) => {
      const bg = idx % 2 === 0 ? COLORS.white : COLORS.lightGray;
      const subInfo = getMaturityInfo(sub.score);
      const subColor = getGradeColor(subInfo.level);
      return [
        { text: sub.subAreaName, options: { fill: { color: bg }, fontFace: FONT, fontSize: 9, align: 'left', valign: 'middle' } },
        { text: sub.score.toFixed(2), options: { fill: { color: bg }, fontFace: FONT, fontSize: 9, bold: true, align: 'center', valign: 'middle', color: subColor } },
        { text: subInfo.label, options: { fill: { color: bg }, fontFace: FONT, fontSize: 9, align: 'center', valign: 'middle', color: subColor } },
      ];
    });

    const subTableW = 5.5;
    slide.addTable([subHeaderRow, ...subDataRows], {
      x: MARGIN_X,
      y: currentY,
      w: subTableW,
      colW: [subTableW * 0.55, subTableW * 0.2, subTableW * 0.25],
      rowH: 0.3,
      border: { type: 'solid', pt: 0.5, color: COLORS.mediumGray },
      margin: [2, 4, 2, 4],
    });

    currentY += 0.3 * (area.subAreaScores.length + 1) + 0.2;
  }

  // ── Risks section ──
  if (areaRisks.length > 0) {
    addSectionTitle(slide, `Riscos Identificados (${areaRisks.length})`, currentY);
    currentY += 0.55;

    // Group risks by subarea
    const risksBySubArea: Record<string, IdentifiedRisk[]> = {};
    for (const risk of areaRisks) {
      const key = risk.subAreaName || 'Geral';
      if (!risksBySubArea[key]) risksBySubArea[key] = [];
      risksBySubArea[key].push(risk);
    }

    // Determine font size based on content volume
    const totalRisks = areaRisks.length;
    const riskFontSize = totalRisks > 4 ? 8 : totalRisks > 2 ? 9 : 10;
    const lineH = totalRisks > 4 ? 0.22 : 0.26;

    for (const [subAreaName, risks] of Object.entries(risksBySubArea)) {
      if (currentY > 6.5) break; // Prevent overflow

      // SubArea name header
      slide.addText(subAreaName, {
        x: MARGIN_X + 0.1,
        y: currentY,
        w: CONTENT_W - 0.2,
        h: lineH,
        fontFace: FONT,
        fontSize: riskFontSize + 1,
        bold: true,
        color: COLORS.primary,
      });
      currentY += lineH;

      for (const risk of risks) {
        if (currentY > 6.5) break;

        // Risk category badge + narrative
        const riskColor = getRiskColor(risk.riskCategory);
        const badgeW = 0.55;

        slide.addShape('roundRect', {
          x: MARGIN_X + 0.15,
          y: currentY + 0.02,
          w: badgeW,
          h: lineH - 0.04,
          fill: { color: riskColor },
          rectRadius: 0.04,
        });
        slide.addText(risk.riskCategory, {
          x: MARGIN_X + 0.15,
          y: currentY + 0.02,
          w: badgeW,
          h: lineH - 0.04,
          fontFace: FONT,
          fontSize: 7,
          bold: true,
          color: COLORS.white,
          align: 'center',
          valign: 'middle',
        });

        // Narrative text (truncated if needed)
        const maxNarrativeLen = totalRisks > 4 ? 120 : 180;
        slide.addText(truncate(risk.riskNarrative, maxNarrativeLen), {
          x: MARGIN_X + 0.15 + badgeW + 0.1,
          y: currentY,
          w: CONTENT_W - badgeW - 0.4,
          h: lineH,
          fontFace: FONT,
          fontSize: riskFontSize,
          color: COLORS.text,
          valign: 'middle',
        });
        currentY += lineH;
      }
      currentY += 0.05;
    }

    currentY += 0.1;
  }

  // ── Controls section ──
  const controlsForArea = areaRisks.filter((r) => r.controls && r.controls.trim().length > 0);
  if (controlsForArea.length > 0 && currentY < 6.0) {
    addSectionTitle(slide, 'Controles Recomendados', currentY);
    currentY += 0.5;

    // Deduplicate controls
    const uniqueControls = [...new Set(controlsForArea.map((r) => r.controls.trim()))];
    const ctrlFontSize = uniqueControls.length > 4 ? 8 : 9;
    const ctrlLineH = uniqueControls.length > 4 ? 0.22 : 0.26;

    for (const ctrl of uniqueControls) {
      if (currentY > 6.5) break;
      slide.addText(`\u2022  ${truncate(ctrl, 150)}`, {
        x: MARGIN_X + 0.15,
        y: currentY,
        w: CONTENT_W - 0.3,
        h: ctrlLineH,
        fontFace: FONT,
        fontSize: ctrlFontSize,
        color: COLORS.text,
        valign: 'middle',
      });
      currentY += ctrlLineH;
    }
    currentY += 0.1;
  }

  // ── Action Plan section ──
  const actionsForArea = areaRisks.filter((r) => r.actionPlan && r.actionPlan.trim().length > 0);
  if (actionsForArea.length > 0 && currentY < 5.8) {
    addSectionTitle(slide, 'Plano de Acao', currentY);
    currentY += 0.5;

    // Collect unique action items, split by "|"
    const allActions: string[] = [];
    for (const risk of actionsForArea) {
      const items = risk.actionPlan.split('|').map((s) => s.trim()).filter(Boolean);
      for (const item of items) {
        if (!allActions.includes(item)) {
          allActions.push(item);
        }
      }
    }

    const actionFontSize = allActions.length > 5 ? 8 : 9;
    const actionLineH = allActions.length > 5 ? 0.22 : 0.26;

    for (let i = 0; i < allActions.length; i++) {
      if (currentY > 6.8) break;
      slide.addText(`${i + 1}. ${truncate(allActions[i], 140)}`, {
        x: MARGIN_X + 0.15,
        y: currentY,
        w: CONTENT_W - 0.3,
        h: actionLineH,
        fontFace: FONT,
        fontSize: actionFontSize,
        color: COLORS.text,
        valign: 'middle',
      });
      currentY += actionLineH;
    }
  }
}

function buildQuickWinsSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  addTopBar(slide);
  addSlideNumber(slide);

  slide.addText('Oportunidades de Melhoria Rapida (Quick Wins)', {
    x: MARGIN_X,
    y: 0.25,
    w: CONTENT_W,
    h: 0.55,
    fontFace: FONT,
    fontSize: 24,
    bold: true,
    color: COLORS.primary,
  });

  const wins = result.quickWins.slice(0, 10);

  if (wins.length === 0) {
    slide.addText('Nenhum quick win identificado \u2014 a empresa nao possui areas com maturidade critica e risco alto simultaneo.', {
      x: MARGIN_X,
      y: 2.5,
      w: CONTENT_W,
      h: 0.5,
      fontFace: FONT,
      fontSize: 12,
      color: COLORS.darkGray,
      align: 'center',
    });
    return;
  }

  // Table header
  const headerRow: PptxGenJS.TableCell[] = [
    { text: '#', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 8, align: 'center', valign: 'middle' } },
    { text: 'Area', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 8, align: 'left', valign: 'middle' } },
    { text: 'Pergunta', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 8, align: 'left', valign: 'middle' } },
    { text: 'Grau', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 8, align: 'center', valign: 'middle' } },
    { text: 'Esforco', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 8, align: 'center', valign: 'middle' } },
    { text: 'Impacto', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 8, align: 'center', valign: 'middle' } },
    { text: 'Acao', options: { bold: true, fill: { color: COLORS.primary }, color: COLORS.white, fontFace: FONT, fontSize: 8, align: 'left', valign: 'middle' } },
  ];

  const dataRows: PptxGenJS.TableRow[] = wins.map((qw, idx) => {
    const bg = idx % 2 === 0 ? COLORS.white : COLORS.lightGray;
    const effortColor = getEffortImpactColor(qw.estimatedEffort);
    const impactColor = getEffortImpactColor(qw.estimatedImpact);
    // Get first action from action plan
    const firstAction = qw.actionPlan.split('|')[0]?.trim() || qw.actionPlan;

    return [
      { text: `${idx + 1}`, options: { fill: { color: bg }, fontFace: FONT, fontSize: 8, align: 'center', valign: 'middle' } },
      { text: qw.areaName, options: { fill: { color: bg }, fontFace: FONT, fontSize: 8, align: 'left', valign: 'middle' } },
      { text: truncate(qw.questionText, 60), options: { fill: { color: bg }, fontFace: FONT, fontSize: 8, align: 'left', valign: 'middle' } },
      { text: `${qw.currentGrade}/5`, options: { fill: { color: bg }, fontFace: FONT, fontSize: 8, bold: true, align: 'center', valign: 'middle', color: getGradeColor(qw.currentGrade) } },
      { text: qw.estimatedEffort, options: { fill: { color: bg }, fontFace: FONT, fontSize: 8, bold: true, align: 'center', valign: 'middle', color: effortColor } },
      { text: qw.estimatedImpact, options: { fill: { color: bg }, fontFace: FONT, fontSize: 8, bold: true, align: 'center', valign: 'middle', color: impactColor } },
      { text: truncate(firstAction, 55), options: { fill: { color: bg }, fontFace: FONT, fontSize: 8, align: 'left', valign: 'middle' } },
    ];
  });

  const tableW = CONTENT_W;
  slide.addTable([headerRow, ...dataRows], {
    x: MARGIN_X,
    y: 1.0,
    w: tableW,
    colW: [tableW * 0.04, tableW * 0.1, tableW * 0.28, tableW * 0.06, tableW * 0.08, tableW * 0.08, tableW * 0.36],
    rowH: 0.42,
    border: { type: 'solid', pt: 0.5, color: COLORS.mediumGray },
    margin: [2, 4, 2, 4],
  });
}

function buildProximosPassosSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  addTopBar(slide);
  addSlideNumber(slide);

  slide.addText('Proximos Passos', {
    x: MARGIN_X,
    y: 0.25,
    w: CONTENT_W,
    h: 0.55,
    fontFace: FONT,
    fontSize: 26,
    bold: true,
    color: COLORS.primary,
  });

  // Decorative line
  slide.addShape('rect', {
    x: MARGIN_X,
    y: 0.9,
    w: 2.0,
    h: 0.03,
    fill: { color: COLORS.accent },
  });

  const steps = [
    'Revisao detalhada dos riscos identificados',
    'Priorizacao dos planos de acao por area',
    'Definicao de responsaveis e prazos',
    'Acompanhamento periodico da evolucao',
  ];

  let stepY = 1.4;
  for (let i = 0; i < steps.length; i++) {
    // Number circle
    slide.addShape('ellipse', {
      x: MARGIN_X + 0.3,
      y: stepY,
      w: 0.5,
      h: 0.5,
      fill: { color: COLORS.accent },
    });
    slide.addText(`${i + 1}`, {
      x: MARGIN_X + 0.3,
      y: stepY,
      w: 0.5,
      h: 0.5,
      fontFace: FONT,
      fontSize: 16,
      bold: true,
      color: COLORS.white,
      align: 'center',
      valign: 'middle',
    });

    // Step text
    slide.addText(steps[i], {
      x: MARGIN_X + 1.1,
      y: stepY,
      w: CONTENT_W - 1.5,
      h: 0.5,
      fontFace: FONT,
      fontSize: 16,
      color: COLORS.text,
      valign: 'middle',
    });

    // Connector line (except last)
    if (i < steps.length - 1) {
      slide.addShape('rect', {
        x: MARGIN_X + 0.53,
        y: stepY + 0.5,
        w: 0.04,
        h: 0.6,
        fill: { color: COLORS.mediumGray },
      });
    }

    stepY += 1.1;
  }

  // Bottom branding
  slide.addShape('rect', {
    x: 0,
    y: SLIDE_H - 0.9,
    w: SLIDE_W,
    h: 0.9,
    fill: { color: COLORS.primary },
  });
  slide.addText('O2 Inc. \u2014 CFO as a Service', {
    x: MARGIN_X,
    y: SLIDE_H - 0.9,
    w: CONTENT_W,
    h: 0.9,
    fontFace: FONT,
    fontSize: 18,
    bold: true,
    color: COLORS.white,
    align: 'center',
    valign: 'middle',
  });
}

// ────────────────────────────────────────────────────────────
// Main export
// ────────────────────────────────────────────────────────────

export async function generateDiagnosticPptx(result: DiagnosticResult): Promise<void> {
  const pptx = new PptxGenJS();

  // Presentation metadata
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'O2 Inc.';
  pptx.company = 'O2 Inc.';
  pptx.title = `Diagnostico 360 - ${result.companyName}`;
  pptx.subject = 'Grau de Maturidade Financeira';

  // Slide 1: Capa
  buildCoverSlide(pptx, result);

  // Slide 2: Resultado Geral
  buildResultadoGeralSlide(pptx, result);

  // Slides 3-8: Area slides
  const areaOrder = ['Contabilidade', 'Controladoria', 'Financeiro', 'Fiscal', 'Planejamento', 'Comercial'];
  for (const areaName of areaOrder) {
    const area = result.areaScores.find((a) => a.areaName === areaName);
    if (area) {
      buildAreaSlide(pptx, result, area);
    }
  }

  // Slide 9: Quick Wins
  buildQuickWinsSlide(pptx, result);

  // Slide 10: Proximos Passos
  buildProximosPassosSlide(pptx, result);

  // Generate filename
  const safeCompanyName = result.companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const dateStr = new Date(result.datePerformed).toISOString().split('T')[0];
  const fileName = `diagnostico-360-${safeCompanyName}-${dateStr}`;

  // Download
  await pptx.writeFile({ fileName });
}

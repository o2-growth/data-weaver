// ============================================================
// Diagnostico 360° — Gerador de PowerPoint Executive
// Design de nível consultoria com gráficos embarcados
// ============================================================

import PptxGenJS from 'pptxgenjs';
import type { DiagnosticResult, AreaScore, IdentifiedRisk, QuickWin } from '@/types/diagnostic';
import { getMaturityInfo } from '@/lib/calculations';

// ────────────────────────────────────────────────────────────
// Design System
// ────────────────────────────────────────────────────────────

const COLORS = {
  navy: '1E2761',
  navyLight: '2D3A6A',
  accent: '2563EB',
  accentLight: '3B82F6',
  white: 'FFFFFF',
  offWhite: 'F8FAFC',
  lightGray: 'F1F5F9',
  mediumGray: 'E2E8F0',
  borderGray: 'CBD5E1',
  darkGray: '64748B',
  text: '1E293B',
  textMuted: '94A3B8',
  grade1: 'DC2626',
  grade2: 'F97316',
  grade3: 'EAB308',
  grade4: '22C55E',
  grade5: '3B82F6',
} as const;

const TITLE_FONT = 'Georgia';
const BODY_FONT = 'Calibri';

const SLIDE_W = 13.33;
const SLIDE_H = 7.5;
const MARGIN_X = 0.7;
const CONTENT_W = SLIDE_W - MARGIN_X * 2;

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────

function getGradeColor(level: number): string {
  const map: Record<number, string> = {
    1: COLORS.grade1, 2: COLORS.grade2, 3: COLORS.grade3,
    4: COLORS.grade4, 5: COLORS.grade5,
  };
  return map[level] || COLORS.darkGray;
}

function getRiskColor(category: string): string {
  if (category === 'Alto') return COLORS.grade1;
  if (category === 'Médio') return COLORS.grade3;
  return COLORS.grade4;
}

function getEffortImpactLabel(value: string): string {
  const map: Record<string, string> = { baixo: 'Baixo', 'médio': 'Médio', alto: 'Alto' };
  return map[value] || value;
}

function getEffortImpactColor(value: string): string {
  if (value === 'alto') return COLORS.grade1;
  if (value === 'médio') return COLORS.grade3;
  return COLORS.grade4;
}

function formatMonthYear(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  } catch { return isoDate; }
}

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  } catch { return isoDate; }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.substring(0, max - 3) + '...';
}

function getMaturityDescription(level: number): string {
  const d: Record<number, string> = {
    1: 'A empresa se encontra em estágio crítico de maturidade financeira. Processos inexistentes ou altamente informais, com riscos significativos que demandam ação imediata.',
    2: 'A empresa possui estrutura básica de gestão financeira. Processos iniciais existem, porém pouco formalizados e dependentes de controles manuais.',
    3: 'Estágio intermediário de maturidade financeira. Processos parcialmente estruturados, com oportunidades claras de evolução para o próximo nível.',
    4: 'Estrutura gerencial sólida. Processos bem definidos, com controles adequados e bom nível de governança financeira.',
    5: 'Nível estratégico de maturidade financeira. Processos plenamente integrados, com análise preditiva e visão de longo prazo.',
  };
  return d[level] || d[1];
}

// ────────────────────────────────────────────────────────────
// Slide Components (reusable)
// ────────────────────────────────────────────────────────────

function addContentSlideHeader(slide: PptxGenJS.Slide, title: string, subtitle?: string): void {
  // Top accent bar
  slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: 0.06, fill: { color: COLORS.accent } });

  slide.addText(title, {
    x: MARGIN_X, y: 0.25, w: CONTENT_W * 0.7, h: 0.55,
    fontFace: TITLE_FONT, fontSize: 26, bold: true, color: COLORS.navy,
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: MARGIN_X, y: 0.78, w: CONTENT_W, h: 0.28,
      fontFace: BODY_FONT, fontSize: 11, color: COLORS.darkGray,
    });
  }

  // Slide number
  slide.slideNumber = {
    x: SLIDE_W - 0.8, y: SLIDE_H - 0.4, w: 0.5,
    fontSize: 9, fontFace: BODY_FONT, color: COLORS.darkGray, align: 'right',
  };
}

function addSectionTitle(slide: PptxGenJS.Slide, title: string, y: number): void {
  slide.addShape('rect', {
    x: MARGIN_X, y, w: CONTENT_W, h: 0.40,
    fill: { color: COLORS.navy }, rectRadius: 0.05,
  });
  slide.addText(title, {
    x: MARGIN_X + 0.15, y, w: CONTENT_W - 0.3, h: 0.40,
    fontFace: BODY_FONT, fontSize: 12, bold: true, color: COLORS.white, valign: 'middle',
  });
}

function addColoredSidebar(slide: PptxGenJS.Slide, color: string): void {
  slide.addShape('rect', { x: 0, y: 0.06, w: 0.12, h: SLIDE_H - 0.06, fill: { color } });
}

// ────────────────────────────────────────────────────────────
// Slide 1: Cover
// ────────────────────────────────────────────────────────────

function buildCoverSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.navy };

  // O2 Inc branding
  slide.addText('O2 Inc.', {
    x: MARGIN_X, y: 0.6, w: 4, h: 0.5,
    fontFace: BODY_FONT, fontSize: 18, bold: true, color: COLORS.accent,
  });

  // Accent line
  slide.addShape('rect', { x: MARGIN_X, y: 1.25, w: 1.8, h: 0.04, fill: { color: COLORS.accent } });

  // Main title
  slide.addText('Diagnóstico 360°', {
    x: MARGIN_X, y: 2.0, w: CONTENT_W, h: 1.1,
    fontFace: TITLE_FONT, fontSize: 48, bold: true, color: COLORS.white,
  });

  // Subtitle
  slide.addText('Grau de Maturidade Financeira', {
    x: MARGIN_X, y: 3.1, w: CONTENT_W, h: 0.6,
    fontFace: BODY_FONT, fontSize: 22, color: COLORS.textMuted,
  });

  // Company name
  slide.addText(result.companyName, {
    x: MARGIN_X, y: 4.1, w: CONTENT_W, h: 0.7,
    fontFace: TITLE_FONT, fontSize: 30, bold: true, color: COLORS.accentLight,
  });

  // Bottom separator
  slide.addShape('rect', { x: MARGIN_X, y: 5.5, w: CONTENT_W, h: 0.01, fill: { color: COLORS.navyLight } });

  // Date
  slide.addText(formatMonthYear(result.datePerformed), {
    x: MARGIN_X, y: 5.7, w: CONTENT_W / 2, h: 0.4,
    fontFace: BODY_FONT, fontSize: 14, color: COLORS.textMuted,
  });

  // Confidential
  slide.addText('Confidencial', {
    x: MARGIN_X, y: 6.6, w: CONTENT_W, h: 0.4,
    fontFace: BODY_FONT, fontSize: 10, italic: true, color: COLORS.darkGray,
  });
}

// ────────────────────────────────────────────────────────────
// Slide 2: Executive Summary (NEW)
// ────────────────────────────────────────────────────────────

function buildExecutiveSummarySlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.offWhite };
  addContentSlideHeader(slide, 'Executive Summary', `${result.companyName} — ${formatDate(result.datePerformed)}`);

  const gradeColor = getGradeColor(result.maturityLevel);
  const cardY = 1.4;
  const cardH = 2.6;
  const cardGap = 0.35;
  const cardW = (CONTENT_W - cardGap * 2) / 3;

  // ── Card 1: Nota Global ──
  const c1x = MARGIN_X;
  slide.addShape('rect', {
    x: c1x, y: cardY, w: cardW, h: cardH,
    fill: { color: COLORS.white },
    line: { color: COLORS.mediumGray, pt: 1 },
    rectRadius: 0.08,
  });
  slide.addText('NOTA GLOBAL', {
    x: c1x, y: cardY + 0.2, w: cardW, h: 0.35,
    fontFace: BODY_FONT, fontSize: 11, bold: true, color: COLORS.darkGray, align: 'center',
  });
  slide.addText(result.globalScore.toFixed(2), {
    x: c1x, y: cardY + 0.6, w: cardW, h: 1.1,
    fontFace: TITLE_FONT, fontSize: 54, bold: true, color: gradeColor, align: 'center',
  });
  slide.addText('de 5.00', {
    x: c1x, y: cardY + 1.6, w: cardW, h: 0.3,
    fontFace: BODY_FONT, fontSize: 12, color: COLORS.darkGray, align: 'center',
  });
  // Progress bar
  const barW = cardW * 0.6;
  const barX = c1x + (cardW - barW) / 2;
  slide.addShape('rect', {
    x: barX, y: cardY + 2.0, w: barW, h: 0.12,
    fill: { color: COLORS.mediumGray }, rectRadius: 0.06,
  });
  slide.addShape('rect', {
    x: barX, y: cardY + 2.0, w: barW * (result.globalScore / 5), h: 0.12,
    fill: { color: gradeColor }, rectRadius: 0.06,
  });

  // ── Card 2: Nível de Maturidade ──
  const c2x = MARGIN_X + cardW + cardGap;
  slide.addShape('rect', {
    x: c2x, y: cardY, w: cardW, h: cardH,
    fill: { color: COLORS.white },
    line: { color: COLORS.mediumGray, pt: 1 },
    rectRadius: 0.08,
  });
  slide.addText('NÍVEL DE MATURIDADE', {
    x: c2x, y: cardY + 0.2, w: cardW, h: 0.35,
    fontFace: BODY_FONT, fontSize: 11, bold: true, color: COLORS.darkGray, align: 'center',
  });
  slide.addText(`Grau ${result.maturityLevel}`, {
    x: c2x, y: cardY + 0.7, w: cardW, h: 0.8,
    fontFace: TITLE_FONT, fontSize: 40, bold: true, color: gradeColor, align: 'center',
  });
  // Maturity badge
  const badgeW = 2.8;
  const badgeX = c2x + (cardW - badgeW) / 2;
  slide.addShape('rect', {
    x: badgeX, y: cardY + 1.55, w: badgeW, h: 0.4,
    fill: { color: gradeColor }, rectRadius: 0.2,
  });
  slide.addText(result.maturityLabel, {
    x: badgeX, y: cardY + 1.55, w: badgeW, h: 0.4,
    fontFace: BODY_FONT, fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
  });

  // ── Card 3: Principal Risco ──
  const c3x = MARGIN_X + (cardW + cardGap) * 2;
  const topRisk = result.identifiedRisks[0];
  slide.addShape('rect', {
    x: c3x, y: cardY, w: cardW, h: cardH,
    fill: { color: COLORS.white },
    line: { color: COLORS.mediumGray, pt: 1 },
    rectRadius: 0.08,
  });
  slide.addText('PRINCIPAL RISCO', {
    x: c3x, y: cardY + 0.2, w: cardW, h: 0.35,
    fontFace: BODY_FONT, fontSize: 11, bold: true, color: COLORS.darkGray, align: 'center',
  });
  if (topRisk) {
    // Risk score
    slide.addText(`${topRisk.riskScore}`, {
      x: c3x, y: cardY + 0.6, w: cardW, h: 0.9,
      fontFace: TITLE_FONT, fontSize: 44, bold: true, color: COLORS.grade1, align: 'center',
    });
    slide.addText(`Score de Risco`, {
      x: c3x, y: cardY + 1.4, w: cardW, h: 0.3,
      fontFace: BODY_FONT, fontSize: 10, color: COLORS.darkGray, align: 'center',
    });
    slide.addText(truncate(topRisk.areaName + ': ' + topRisk.riskNarrative, 100), {
      x: c3x + 0.2, y: cardY + 1.8, w: cardW - 0.4, h: 0.6,
      fontFace: BODY_FONT, fontSize: 9, color: COLORS.text, align: 'center',
    });
  } else {
    slide.addText('Nenhum risco\ncrítico identificado', {
      x: c3x, y: cardY + 0.8, w: cardW, h: 1.0,
      fontFace: BODY_FONT, fontSize: 14, color: COLORS.grade4, align: 'center',
    });
  }

  // ── Bottom: Interpretation ──
  const descY = 4.4;
  slide.addShape('rect', {
    x: MARGIN_X, y: descY, w: CONTENT_W, h: 0.9,
    fill: { color: COLORS.white },
    line: { color: COLORS.mediumGray, pt: 0.5 },
    rectRadius: 0.08,
  });
  // Colored left accent on interpretation box
  slide.addShape('rect', {
    x: MARGIN_X, y: descY, w: 0.08, h: 0.9,
    fill: { color: gradeColor },
  });
  slide.addText(getMaturityDescription(result.maturityLevel), {
    x: MARGIN_X + 0.25, y: descY + 0.05, w: CONTENT_W - 0.5, h: 0.8,
    fontFace: BODY_FONT, fontSize: 12, color: COLORS.text, valign: 'middle',
  });

  // Stats bar
  slide.addText(
    `${result.answeredQuestions}/${result.totalQuestions} perguntas  |  ${result.identifiedRisks.length} risco(s)  |  ${result.quickWins.length} quick win(s)`,
    {
      x: MARGIN_X, y: 5.7, w: CONTENT_W, h: 0.3,
      fontFace: BODY_FONT, fontSize: 10, color: COLORS.darkGray, align: 'center',
    }
  );
}

// ────────────────────────────────────────────────────────────
// Slide 3: Resultado Geral com Charts
// ────────────────────────────────────────────────────────────

function buildResultadoGeralSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.offWhite };
  addContentSlideHeader(slide, 'Resultado por Área');

  // ── Left: Radar Chart ──
  const radarData = [{
    name: 'Nota',
    labels: result.areaScores.map(a => a.areaName),
    values: result.areaScores.map(a => a.score),
  }];

  slide.addChart(pptx.charts.RADAR, radarData, {
    x: MARGIN_X, y: 1.2, w: 5.5, h: 4.8,
    radarStyle: 'filled',
    chartColors: [COLORS.accent],
    catAxisLabelColor: COLORS.text,
    catAxisLabelFontSize: 10,
    catAxisLabelFontFace: BODY_FONT,
    valAxisMaxVal: 5,
    valAxisMinVal: 0,
    valGridLine: { color: COLORS.mediumGray, size: 0.5 },
    showLegend: false,
    chartArea: { fill: { color: COLORS.offWhite }, roundedCorners: true },
  } as any);

  // ── Right: Bar Chart horizontal ──
  const barData = [{
    name: 'Nota',
    labels: result.areaScores.map(a => a.areaName),
    values: result.areaScores.map(a => a.score),
  }];

  const barColors = result.areaScores.map(a => getGradeColor(a.maturityLevel));

  slide.addChart(pptx.charts.BAR, barData, {
    x: 6.5, y: 1.2, w: 6.1, h: 4.8,
    barDir: 'bar',
    chartColors: barColors,
    catAxisLabelColor: COLORS.text,
    catAxisLabelFontSize: 10,
    catAxisLabelFontFace: BODY_FONT,
    valAxisLabelColor: COLORS.darkGray,
    valAxisMaxVal: 5,
    valAxisMinVal: 0,
    valGridLine: { color: COLORS.mediumGray, size: 0.5 },
    catGridLine: { style: 'none' },
    showValue: true,
    dataLabelPosition: 'outEnd',
    dataLabelColor: COLORS.text,
    showLegend: false,
    chartArea: { fill: { color: COLORS.offWhite }, roundedCorners: true },
  } as any);

  // ── Bottom: Areas table (compact) ──
  const tableY = 6.2;
  const headerRow: PptxGenJS.TableCell[] = [
    { text: 'Área', options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white, fontFace: BODY_FONT, fontSize: 9, align: 'left', valign: 'middle' } },
    { text: 'Peso', options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle' } },
    { text: 'Nota', options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle' } },
    { text: 'Maturidade', options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle' } },
  ];

  const dataRows: PptxGenJS.TableRow[] = result.areaScores.map((area, idx) => {
    const bg = idx % 2 === 0 ? COLORS.white : COLORS.lightGray;
    const c = getGradeColor(area.maturityLevel);
    return [
      { text: area.areaName, options: { fill: { color: bg }, fontFace: BODY_FONT, fontSize: 9, align: 'left', valign: 'middle' } },
      { text: `${(area.weight * 100).toFixed(0)}%`, options: { fill: { color: bg }, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle' } },
      { text: area.score.toFixed(2), options: { fill: { color: bg }, fontFace: BODY_FONT, fontSize: 9, bold: true, align: 'center', valign: 'middle', color: c } },
      { text: `Grau ${area.maturityLevel} — ${area.maturityLabel}`, options: { fill: { color: bg }, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle', color: c } },
    ];
  });

  slide.addTable([headerRow, ...dataRows], {
    x: MARGIN_X, y: tableY, w: CONTENT_W,
    colW: [CONTENT_W * 0.3, CONTENT_W * 0.12, CONTENT_W * 0.15, CONTENT_W * 0.43],
    rowH: 0.18,
    border: { type: 'solid', pt: 0.5, color: COLORS.mediumGray },
    margin: [2, 4, 2, 4],
  });
}

// ────────────────────────────────────────────────────────────
// Area Slides (with colored sidebar)
// ────────────────────────────────────────────────────────────

function buildAreaSlide(pptx: PptxGenJS, result: DiagnosticResult, area: AreaScore): void {
  const areaRisks = result.identifiedRisks
    .filter(r => r.areaName === area.areaName)
    .sort((a, b) => b.riskScore - a.riskScore);

  const slide = pptx.addSlide();
  slide.background = { color: COLORS.offWhite };
  const gradeColor = getGradeColor(area.maturityLevel);

  // Colored sidebar
  addColoredSidebar(slide, gradeColor);

  // Top accent bar
  slide.addShape('rect', { x: 0, y: 0, w: SLIDE_W, h: 0.06, fill: { color: COLORS.accent } });
  slide.slideNumber = {
    x: SLIDE_W - 0.8, y: SLIDE_H - 0.4, w: 0.5,
    fontSize: 9, fontFace: BODY_FONT, color: COLORS.darkGray, align: 'right',
  };

  // Area name
  slide.addText(area.areaName, {
    x: MARGIN_X + 0.3, y: 0.2, w: 7, h: 0.55,
    fontFace: TITLE_FONT, fontSize: 24, bold: true, color: COLORS.navy,
  });

  // Weight
  slide.addText(`Peso: ${(area.weight * 100).toFixed(0)}%`, {
    x: MARGIN_X + 0.3, y: 0.72, w: 2, h: 0.25,
    fontFace: BODY_FONT, fontSize: 10, color: COLORS.darkGray,
  });

  // Score badge
  slide.addShape('rect', {
    x: SLIDE_W - MARGIN_X - 3.2, y: 0.2, w: 3.2, h: 0.55,
    fill: { color: gradeColor }, rectRadius: 0.08,
  });
  slide.addText(`${area.score.toFixed(2)}  —  ${area.maturityLabel}`, {
    x: SLIDE_W - MARGIN_X - 3.2, y: 0.2, w: 3.2, h: 0.55,
    fontFace: BODY_FONT, fontSize: 14, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
  });

  let currentY = 1.15;

  // ── Subareas table ──
  if (area.subAreaScores.length > 0) {
    const subHeaderRow: PptxGenJS.TableCell[] = [
      { text: 'Subárea', options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white, fontFace: BODY_FONT, fontSize: 9, align: 'left', valign: 'middle' } },
      { text: 'Nota', options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle' } },
      { text: 'Maturidade', options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle' } },
    ];

    const subDataRows: PptxGenJS.TableRow[] = area.subAreaScores.map((sub, idx) => {
      const bg = idx % 2 === 0 ? COLORS.white : COLORS.lightGray;
      const subInfo = getMaturityInfo(sub.score);
      const subColor = getGradeColor(subInfo.level);
      return [
        { text: sub.subAreaName, options: { fill: { color: bg }, fontFace: BODY_FONT, fontSize: 9, align: 'left', valign: 'middle' } },
        { text: sub.score.toFixed(2), options: { fill: { color: bg }, fontFace: BODY_FONT, fontSize: 9, bold: true, align: 'center', valign: 'middle', color: subColor } },
        { text: subInfo.label, options: { fill: { color: bg }, fontFace: BODY_FONT, fontSize: 9, align: 'center', valign: 'middle', color: subColor } },
      ];
    });

    const subTableW = 5.5;
    slide.addTable([subHeaderRow, ...subDataRows], {
      x: MARGIN_X + 0.3, y: currentY, w: subTableW,
      colW: [subTableW * 0.55, subTableW * 0.2, subTableW * 0.25],
      rowH: 0.3,
      border: { type: 'solid', pt: 0.5, color: COLORS.mediumGray },
      margin: [2, 4, 2, 4],
    });

    currentY += 0.3 * (area.subAreaScores.length + 1) + 0.25;
  }

  // ── Risks ──
  if (areaRisks.length > 0) {
    addSectionTitle(slide, `Riscos Identificados (${areaRisks.length})`, currentY);
    currentY += 0.5;

    const risksBySubArea: Record<string, IdentifiedRisk[]> = {};
    for (const risk of areaRisks) {
      const key = risk.subAreaName || 'Geral';
      if (!risksBySubArea[key]) risksBySubArea[key] = [];
      risksBySubArea[key].push(risk);
    }

    const totalRisks = areaRisks.length;
    const riskFontSize = totalRisks > 4 ? 8 : totalRisks > 2 ? 9 : 10;
    const lineH = totalRisks > 4 ? 0.22 : 0.26;

    for (const [subAreaName, risks] of Object.entries(risksBySubArea)) {
      if (currentY > 6.5) break;

      slide.addText(subAreaName, {
        x: MARGIN_X + 0.3, y: currentY, w: CONTENT_W - 0.5, h: lineH,
        fontFace: BODY_FONT, fontSize: riskFontSize + 1, bold: true, color: COLORS.navy,
      });
      currentY += lineH;

      for (const risk of risks) {
        if (currentY > 6.5) break;

        const riskColor = getRiskColor(risk.riskCategory);
        const badgeW = 0.55;

        slide.addShape('rect', {
          x: MARGIN_X + 0.35, y: currentY + 0.02, w: badgeW, h: lineH - 0.04,
          fill: { color: riskColor }, rectRadius: 0.04,
        });
        slide.addText(risk.riskCategory, {
          x: MARGIN_X + 0.35, y: currentY + 0.02, w: badgeW, h: lineH - 0.04,
          fontFace: BODY_FONT, fontSize: 7, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
        });

        const maxLen = totalRisks > 4 ? 120 : 180;
        slide.addText(truncate(risk.riskNarrative, maxLen), {
          x: MARGIN_X + 0.35 + badgeW + 0.1, y: currentY, w: CONTENT_W - badgeW - 0.8, h: lineH,
          fontFace: BODY_FONT, fontSize: riskFontSize, color: COLORS.text, valign: 'middle',
        });
        currentY += lineH;
      }
      currentY += 0.05;
    }
    currentY += 0.1;
  }

  // ── Controls ──
  const controlsForArea = areaRisks.filter(r => r.controls?.trim().length > 0);
  if (controlsForArea.length > 0 && currentY < 6.0) {
    addSectionTitle(slide, 'Controles Recomendados', currentY);
    currentY += 0.5;

    const uniqueControls = [...new Set(controlsForArea.map(r => r.controls.trim()))];
    const ctrlFontSize = uniqueControls.length > 4 ? 8 : 9;
    const ctrlLineH = uniqueControls.length > 4 ? 0.22 : 0.26;

    for (const ctrl of uniqueControls) {
      if (currentY > 6.5) break;
      slide.addText([
        { text: '•  ', options: { bold: true, color: COLORS.accent } },
        { text: truncate(ctrl, 150) },
      ], {
        x: MARGIN_X + 0.35, y: currentY, w: CONTENT_W - 0.7, h: ctrlLineH,
        fontFace: BODY_FONT, fontSize: ctrlFontSize, color: COLORS.text, valign: 'middle',
      });
      currentY += ctrlLineH;
    }
    currentY += 0.1;
  }

  // ── Action Plan ──
  const actionsForArea = areaRisks.filter(r => r.actionPlan?.trim().length > 0);
  if (actionsForArea.length > 0 && currentY < 5.8) {
    addSectionTitle(slide, 'Plano de Ação', currentY);
    currentY += 0.5;

    const allActions: string[] = [];
    for (const risk of actionsForArea) {
      const items = risk.actionPlan.split('|').map(s => s.trim()).filter(Boolean);
      for (const item of items) {
        if (!allActions.includes(item)) allActions.push(item);
      }
    }

    const actionFontSize = allActions.length > 5 ? 8 : 9;
    const actionLineH = allActions.length > 5 ? 0.22 : 0.26;

    for (let i = 0; i < allActions.length; i++) {
      if (currentY > 6.8) break;
      slide.addText(`${i + 1}. ${truncate(allActions[i], 140)}`, {
        x: MARGIN_X + 0.35, y: currentY, w: CONTENT_W - 0.7, h: actionLineH,
        fontFace: BODY_FONT, fontSize: actionFontSize, color: COLORS.text, valign: 'middle',
      });
      currentY += actionLineH;
    }
  }
}

// ────────────────────────────────────────────────────────────
// Quick Wins (paginated cards, max 5 per slide)
// ────────────────────────────────────────────────────────────

function buildQuickWinsSlides(pptx: PptxGenJS, result: DiagnosticResult): void {
  const wins = result.quickWins;
  const ITEMS_PER_SLIDE = 5;

  if (wins.length === 0) {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.offWhite };
    addContentSlideHeader(slide, 'Quick Wins');
    slide.addText('Nenhum quick win identificado — a empresa não possui áreas com maturidade crítica e risco alto simultâneo.', {
      x: MARGIN_X, y: 2.5, w: CONTENT_W, h: 0.5,
      fontFace: BODY_FONT, fontSize: 13, color: COLORS.darkGray, align: 'center',
    });
    return;
  }

  const totalPages = Math.ceil(wins.length / ITEMS_PER_SLIDE);

  for (let page = 0; page < totalPages; page++) {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.offWhite };
    const pageLabel = totalPages > 1 ? ` (${page + 1}/${totalPages})` : '';
    addContentSlideHeader(slide, `Quick Wins${pageLabel}`);

    const pageWins = wins.slice(page * ITEMS_PER_SLIDE, (page + 1) * ITEMS_PER_SLIDE);
    const cardH = 1.05;
    const cardGap = 0.15;
    let cardY = 1.2;

    for (const qw of pageWins) {
      const effortColor = getEffortImpactColor(qw.estimatedEffort);
      const impactColor = getEffortImpactColor(qw.estimatedImpact);
      const gradeColor = getGradeColor(qw.currentGrade);

      // Card background
      slide.addShape('rect', {
        x: MARGIN_X, y: cardY, w: CONTENT_W, h: cardH,
        fill: { color: COLORS.white },
        line: { color: COLORS.mediumGray, pt: 0.5 },
        rectRadius: 0.06,
      });

      // Left accent bar
      slide.addShape('rect', {
        x: MARGIN_X, y: cardY, w: 0.07, h: cardH,
        fill: { color: COLORS.accent },
      });

      // Area + Question
      slide.addText(qw.areaName, {
        x: MARGIN_X + 0.25, y: cardY + 0.08, w: 7, h: 0.25,
        fontFace: BODY_FONT, fontSize: 9, bold: true, color: COLORS.accent,
      });
      slide.addText(truncate(qw.questionText, 100), {
        x: MARGIN_X + 0.25, y: cardY + 0.3, w: 7.5, h: 0.25,
        fontFace: BODY_FONT, fontSize: 11, color: COLORS.text,
      });

      // Action plan
      const firstAction = qw.actionPlan.split('|')[0]?.trim() || qw.actionPlan;
      slide.addText(`→ ${truncate(firstAction, 90)}`, {
        x: MARGIN_X + 0.25, y: cardY + 0.58, w: 7.5, h: 0.25,
        fontFace: BODY_FONT, fontSize: 9, italic: true, color: COLORS.darkGray,
      });

      // Right side badges
      const badgesX = SLIDE_W - MARGIN_X - 4.2;

      // Grade badge
      slide.addShape('rect', {
        x: badgesX, y: cardY + 0.15, w: 1.1, h: 0.3,
        fill: { color: gradeColor }, rectRadius: 0.15,
      });
      slide.addText(`Grau ${qw.currentGrade}`, {
        x: badgesX, y: cardY + 0.15, w: 1.1, h: 0.3,
        fontFace: BODY_FONT, fontSize: 9, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
      });

      // Effort badge
      slide.addShape('rect', {
        x: badgesX + 1.3, y: cardY + 0.15, w: 1.3, h: 0.3,
        fill: { color: effortColor }, rectRadius: 0.15,
      });
      slide.addText(`Esforço: ${getEffortImpactLabel(qw.estimatedEffort)}`, {
        x: badgesX + 1.3, y: cardY + 0.15, w: 1.3, h: 0.3,
        fontFace: BODY_FONT, fontSize: 8, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
      });

      // Impact badge
      slide.addShape('rect', {
        x: badgesX + 2.8, y: cardY + 0.15, w: 1.3, h: 0.3,
        fill: { color: impactColor }, rectRadius: 0.15,
      });
      slide.addText(`Impacto: ${getEffortImpactLabel(qw.estimatedImpact)}`, {
        x: badgesX + 2.8, y: cardY + 0.15, w: 1.3, h: 0.3,
        fontFace: BODY_FONT, fontSize: 8, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
      });

      cardY += cardH + cardGap;
    }
  }
}

// ────────────────────────────────────────────────────────────
// Próximos Passos (contextualizados)
// ────────────────────────────────────────────────────────────

function buildProximosPassosSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.offWhite };
  addContentSlideHeader(slide, 'Próximos Passos');

  // Generate contextual steps based on weakest areas
  const sortedAreas = [...result.areaScores].sort((a, b) => a.score - b.score);
  const weakest = sortedAreas[0];
  const secondWeakest = sortedAreas[1];

  const steps = [
    `Priorizar a estruturação da área de ${weakest.areaName} (nota ${weakest.score.toFixed(2)})`,
    secondWeakest.score < 3
      ? `Desenvolver controles para ${secondWeakest.areaName} (nota ${secondWeakest.score.toFixed(2)})`
      : `Fortalecer governança em ${secondWeakest.areaName}`,
    result.quickWins.length > 0
      ? `Implementar ${Math.min(result.quickWins.length, 5)} quick wins identificados para ganhos imediatos`
      : 'Revisar processos críticos e formalizar controles básicos',
    'Definir responsáveis e cronograma de implementação',
    'Agendar reavaliação em 90 dias para medir evolução',
  ];

  let stepY = 1.3;
  for (let i = 0; i < steps.length; i++) {
    // Number circle
    slide.addShape('ellipse', {
      x: MARGIN_X + 0.3, y: stepY, w: 0.5, h: 0.5,
      fill: { color: COLORS.accent },
    });
    slide.addText(`${i + 1}`, {
      x: MARGIN_X + 0.3, y: stepY, w: 0.5, h: 0.5,
      fontFace: BODY_FONT, fontSize: 16, bold: true, color: COLORS.white, align: 'center', valign: 'middle',
    });

    // Step text
    slide.addText(steps[i], {
      x: MARGIN_X + 1.1, y: stepY, w: CONTENT_W - 1.5, h: 0.5,
      fontFace: BODY_FONT, fontSize: 15, color: COLORS.text, valign: 'middle',
    });

    // Connector
    if (i < steps.length - 1) {
      slide.addShape('rect', {
        x: MARGIN_X + 0.53, y: stepY + 0.5, w: 0.04, h: 0.55,
        fill: { color: COLORS.mediumGray },
      });
    }

    stepY += 1.05;
  }
}

// ────────────────────────────────────────────────────────────
// Slide de Encerramento com CTA
// ────────────────────────────────────────────────────────────

function buildClosingSlide(pptx: PptxGenJS, result: DiagnosticResult): void {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.navy };

  // O2 Inc branding
  slide.addText('O2 Inc.', {
    x: MARGIN_X, y: 1.5, w: CONTENT_W, h: 0.6,
    fontFace: BODY_FONT, fontSize: 22, bold: true, color: COLORS.accent, align: 'center',
  });

  // Main CTA
  slide.addText('Próxima Etapa', {
    x: MARGIN_X, y: 2.5, w: CONTENT_W, h: 0.8,
    fontFace: TITLE_FONT, fontSize: 36, bold: true, color: COLORS.white, align: 'center',
  });

  // CTA subtitle
  slide.addText('Agendar reunião de devolutiva e planejamento', {
    x: MARGIN_X, y: 3.3, w: CONTENT_W, h: 0.5,
    fontFace: BODY_FONT, fontSize: 18, color: COLORS.textMuted, align: 'center',
  });

  // Separator
  slide.addShape('rect', {
    x: SLIDE_W / 2 - 1.5, y: 4.2, w: 3, h: 0.03,
    fill: { color: COLORS.accent },
  });

  // Contact info
  slide.addText('CFO as a Service', {
    x: MARGIN_X, y: 4.6, w: CONTENT_W, h: 0.5,
    fontFace: BODY_FONT, fontSize: 16, bold: true, color: COLORS.accentLight, align: 'center',
  });

  slide.addText(`Diagnóstico realizado em ${formatDate(result.datePerformed)}`, {
    x: MARGIN_X, y: 5.2, w: CONTENT_W, h: 0.4,
    fontFace: BODY_FONT, fontSize: 12, color: COLORS.darkGray, align: 'center',
  });

  // Confidential
  slide.addText('Confidencial — Este documento contém informações estratégicas.', {
    x: MARGIN_X, y: 6.5, w: CONTENT_W, h: 0.4,
    fontFace: BODY_FONT, fontSize: 10, italic: true, color: COLORS.darkGray, align: 'center',
  });
}

// ────────────────────────────────────────────────────────────
// Main export
// ────────────────────────────────────────────────────────────

export async function generateDiagnosticPptx(result: DiagnosticResult): Promise<void> {
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'O2 Inc.';
  pptx.company = 'O2 Inc.';
  pptx.title = `Diagnóstico 360° - ${result.companyName}`;
  pptx.subject = 'Grau de Maturidade Financeira';

  // 1. Capa
  buildCoverSlide(pptx, result);

  // 2. Executive Summary
  buildExecutiveSummarySlide(pptx, result);

  // 3. Resultado por Área (Radar + Bar chart)
  buildResultadoGeralSlide(pptx, result);

  // 4-9. Slides por área
  const areaOrder = ['Contabilidade', 'Controladoria', 'Financeiro', 'Fiscal', 'Planejamento', 'Comercial'];
  for (const areaName of areaOrder) {
    const area = result.areaScores.find(a => a.areaName === areaName);
    if (area) buildAreaSlide(pptx, result, area);
  }

  // 10+. Quick Wins (paginados)
  buildQuickWinsSlides(pptx, result);

  // 11. Próximos Passos
  buildProximosPassosSlide(pptx, result);

  // 12. Encerramento
  buildClosingSlide(pptx, result);

  // Generate filename
  const safeCompanyName = result.companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const dateStr = new Date(result.datePerformed).toISOString().split('T')[0];
  const fileName = `diagnostico-360-${safeCompanyName}-${dateStr}`;

  await pptx.writeFile({ fileName });
}

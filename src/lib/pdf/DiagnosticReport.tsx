// ============================================================
// Diagnostico 360 - Relatorio PDF Profissional
// @react-pdf/renderer template
// ============================================================

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type {
  DiagnosticResult,
  AreaScore,
  IdentifiedRisk,
  QuickWin,
} from "@/types/diagnostic";
import { questions } from "@/data/questions";
import { getMaturityInfo } from "@/lib/calculations";

// ────────────────────────────────────────────────────────────
// Cores e constantes
// ────────────────────────────────────────────────────────────

const COLORS = {
  primary: "#1e3a5f",
  primaryLight: "#2c5282",
  accent: "#3182ce",
  white: "#ffffff",
  lightGray: "#f7f8fa",
  mediumGray: "#e2e8f0",
  darkGray: "#4a5568",
  text: "#1a202c",
  textLight: "#718096",
  grade1: "#DC2626",
  grade2: "#F97316",
  grade3: "#EAB308",
  grade4: "#22C55E",
  grade5: "#3B82F6",
};

function getGradeColor(grade: number): string {
  const map: Record<number, string> = {
    1: COLORS.grade1,
    2: COLORS.grade2,
    3: COLORS.grade3,
    4: COLORS.grade4,
    5: COLORS.grade5,
  };
  return map[grade] || COLORS.darkGray;
}

function getMaturityDescription(level: number): string {
  const descriptions: Record<number, string> = {
    1: "A empresa se encontra em estagio critico de maturidade financeira. Os processos sao inexistentes ou altamente informais, apresentando riscos significativos.",
    2: "A empresa possui uma estrutura basica de gestao financeira. Processos iniciais existem, porem ainda sao pouco formalizados e dependem de controles manuais.",
    3: "A empresa esta em estagio intermediario de maturidade financeira. Processos estao parcialmente estruturados, com oportunidades claras de evolucao.",
    4: "A empresa apresenta uma estrutura gerencial solida. Processos sao bem definidos, com controles adequados e bom nivel de governanca.",
    5: "A empresa atingiu o nivel estrategico de maturidade financeira. Processos sao plenamente integrados, com analise preditiva e visao de longo prazo.",
  };
  return descriptions[level] || descriptions[1];
}

function getRiskCategoryColor(category: string): string {
  const map: Record<string, string> = {
    "Alto": COLORS.grade1,
    "Médio": COLORS.grade3,
    "Baixo": COLORS.grade4,
  };
  return map[category] || COLORS.darkGray;
}

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

// ────────────────────────────────────────────────────────────
// Estilos
// ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Page
  page: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.text,
  },

  // Header / Footer (per page)
  pageHeader: {
    position: "absolute",
    top: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mediumGray,
    paddingBottom: 6,
  },
  pageHeaderText: {
    fontSize: 7,
    color: COLORS.textLight,
  },
  pageFooter: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
    paddingTop: 6,
  },
  pageFooterText: {
    fontSize: 7,
    color: COLORS.textLight,
  },

  // Cover page
  coverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  coverBrand: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    letterSpacing: 3,
    marginBottom: 8,
  },
  coverDivider: {
    width: 80,
    height: 2,
    backgroundColor: COLORS.accent,
    marginVertical: 16,
  },
  coverTitle: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 6,
  },
  coverSubtitle: {
    fontSize: 14,
    color: COLORS.darkGray,
    textAlign: "center",
    marginBottom: 30,
  },
  coverCompany: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primaryLight,
    textAlign: "center",
    marginBottom: 10,
  },
  coverDate: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 40,
  },
  coverConfidential: {
    fontSize: 9,
    color: COLORS.textLight,
    textAlign: "center",
    fontFamily: "Helvetica-Oblique",
  },

  // Section
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primaryLight,
    marginTop: 14,
    marginBottom: 6,
  },

  // Score box
  scoreBox: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  scoreValue: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },
  scoreMax: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  scoreBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  scoreBadgeText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
  },

  // Table
  table: {
    marginBottom: 12,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.mediumGray,
  },
  tableRowAlt: {
    backgroundColor: COLORS.lightGray,
  },
  tableCell: {
    fontSize: 9,
    color: COLORS.text,
  },
  tableCellBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
  },

  // Description text
  bodyText: {
    fontSize: 10,
    color: COLORS.darkGray,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  smallText: {
    fontSize: 8,
    color: COLORS.textLight,
    lineHeight: 1.4,
  },

  // Risk card
  riskCard: {
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  riskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  riskBadgeText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
  },
  riskLabel: {
    fontSize: 8,
    color: COLORS.textLight,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginTop: 6,
    marginBottom: 2,
  },

  // Quick Win card
  qwCard: {
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  qwHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  qwPriority: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },

  // Flex helpers
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
});

// ────────────────────────────────────────────────────────────
// Componentes auxiliares
// ────────────────────────────────────────────────────────────

interface HeaderFooterProps {
  companyName: string;
}

function PageHeader({ companyName }: HeaderFooterProps) {
  return (
    <View style={styles.pageHeader} fixed>
      <Text style={styles.pageHeaderText}>
        Diagnostico 360 | {companyName}
      </Text>
      <Text style={styles.pageHeaderText}>O2 Inc.</Text>
    </View>
  );
}

function PageFooter() {
  return (
    <View style={styles.pageFooter} fixed>
      <Text style={styles.pageFooterText}>
        Confidencial - O2 Inc. - CFOs as a Service
      </Text>
      <Text
        style={styles.pageFooterText}
        render={({ pageNumber, totalPages }) =>
          `Pagina ${pageNumber} de ${totalPages}`
        }
      />
    </View>
  );
}

// ────────────────────────────────────────────────────────────
// Pages
// ────────────────────────────────────────────────────────────

function CoverPage({ result }: { result: DiagnosticResult }) {
  return (
    <Page size="A4" style={[styles.page, { paddingTop: 40, paddingBottom: 40 }]}>
      <View style={styles.coverContainer}>
        <Text style={styles.coverBrand}>O2 INC.</Text>
        <Text style={{ fontSize: 9, color: COLORS.textLight, marginBottom: 6 }}>
          CFOs as a Service
        </Text>
        <View style={styles.coverDivider} />
        <Text style={styles.coverTitle}>Diagnostico 360</Text>
        <Text style={styles.coverSubtitle}>
          Relatorio de Maturidade Financeira
        </Text>
        <View style={[styles.coverDivider, { width: 40, marginVertical: 12 }]} />
        <Text style={styles.coverCompany}>{result.companyName}</Text>
        <Text style={styles.coverDate}>{formatDate(result.datePerformed)}</Text>
        <Text style={styles.coverConfidential}>
          Confidencial - Preparado por O2 Inc.
        </Text>
      </View>
    </Page>
  );
}

function ExecutiveSummaryPage({ result }: { result: DiagnosticResult }) {
  return (
    <Page size="A4" style={styles.page}>
      <PageHeader companyName={result.companyName} />
      <PageFooter />

      <Text style={styles.sectionTitle}>Resumo Executivo</Text>

      {/* Score global */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreValue}>{result.globalScore.toFixed(2)}</Text>
        <Text style={styles.scoreMax}>de 5.00</Text>
        <View
          style={[
            styles.scoreBadge,
            { backgroundColor: getGradeColor(result.maturityLevel) },
          ]}
        >
          <Text style={styles.scoreBadgeText}>{result.maturityLabel}</Text>
        </View>
      </View>

      <Text style={styles.bodyText}>
        {getMaturityDescription(result.maturityLevel)}
      </Text>

      <Text style={styles.bodyText}>
        Diagnostico realizado em {formatDate(result.datePerformed)} com{" "}
        {result.answeredQuestions} de {result.totalQuestions} perguntas
        respondidas.
      </Text>

      {/* Tabela por area */}
      <Text style={styles.sectionSubtitle}>Score por Area</Text>

      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCell, { width: "35%" }]}>Area</Text>
          <Text
            style={[styles.tableHeaderCell, { width: "15%", textAlign: "center" }]}
          >
            Score
          </Text>
          <Text
            style={[styles.tableHeaderCell, { width: "15%", textAlign: "center" }]}
          >
            Peso
          </Text>
          <Text
            style={[styles.tableHeaderCell, { width: "15%", textAlign: "center" }]}
          >
            Ponderado
          </Text>
          <Text
            style={[styles.tableHeaderCell, { width: "20%", textAlign: "center" }]}
          >
            Maturidade
          </Text>
        </View>
        {/* Rows */}
        {result.areaScores.map((area, i) => (
          <View
            key={area.areaId}
            style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}
          >
            <Text style={[styles.tableCellBold, { width: "35%" }]}>
              {area.areaName}
            </Text>
            <Text
              style={[styles.tableCell, { width: "15%", textAlign: "center" }]}
            >
              {area.score.toFixed(2)}
            </Text>
            <Text
              style={[styles.tableCell, { width: "15%", textAlign: "center" }]}
            >
              {(area.weight * 100).toFixed(0)}%
            </Text>
            <Text
              style={[styles.tableCell, { width: "15%", textAlign: "center" }]}
            >
              {(area.score * area.weight).toFixed(2)}
            </Text>
            <Text
              style={[
                styles.tableCellBold,
                { width: "20%", textAlign: "center", color: getGradeColor(area.maturityLevel) },
              ]}
            >
              {area.maturityLabel}
            </Text>
          </View>
        ))}
        {/* Total */}
        <View
          style={[
            styles.tableRow,
            {
              backgroundColor: COLORS.primary,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            },
          ]}
        >
          <Text
            style={[
              styles.tableHeaderCell,
              { width: "35%" },
            ]}
          >
            TOTAL PONDERADO
          </Text>
          <Text
            style={[styles.tableHeaderCell, { width: "15%", textAlign: "center" }]}
          >
            {" "}
          </Text>
          <Text
            style={[styles.tableHeaderCell, { width: "15%", textAlign: "center" }]}
          >
            100%
          </Text>
          <Text
            style={[styles.tableHeaderCell, { width: "15%", textAlign: "center" }]}
          >
            {result.globalScore.toFixed(2)}
          </Text>
          <Text
            style={[styles.tableHeaderCell, { width: "20%", textAlign: "center" }]}
          >
            {result.maturityLabel}
          </Text>
        </View>
      </View>
    </Page>
  );
}

function AreaDetailPages({ result }: { result: DiagnosticResult }) {
  return (
    <>
      {result.areaScores.map((area) => {
        const areaQuestions = questions.filter((q) => q.areaId === area.areaId);
        const maturity = getMaturityInfo(area.score);

        return (
          <Page key={area.areaId} size="A4" style={styles.page} wrap>
            <PageHeader companyName={result.companyName} />
            <PageFooter />

            {/* Area title */}
            <Text style={styles.sectionTitle}>{area.areaName}</Text>

            <View style={[styles.spaceBetween, styles.mb8]}>
              <View style={styles.row}>
                <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: COLORS.primary }}>
                  {area.score.toFixed(2)}
                </Text>
                <Text style={{ fontSize: 10, color: COLORS.textLight, marginLeft: 4 }}>
                  / 5.00
                </Text>
              </View>
              <View
                style={[
                  styles.scoreBadge,
                  { backgroundColor: getGradeColor(maturity.level) },
                ]}
              >
                <Text style={styles.scoreBadgeText}>{maturity.label}</Text>
              </View>
            </View>

            <Text style={[styles.bodyText, { marginBottom: 4 }]}>
              Peso no score global: {(area.weight * 100).toFixed(0)}%
            </Text>

            {/* SubArea table */}
            {area.subAreaScores.length > 0 && (
              <>
                <Text style={styles.sectionSubtitle}>Subareas</Text>
                <View style={styles.table}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.tableHeaderCell, { width: "50%" }]}>
                      Subarea
                    </Text>
                    <Text
                      style={[
                        styles.tableHeaderCell,
                        { width: "25%", textAlign: "center" },
                      ]}
                    >
                      Score
                    </Text>
                    <Text
                      style={[
                        styles.tableHeaderCell,
                        { width: "25%", textAlign: "center" },
                      ]}
                    >
                      Nivel
                    </Text>
                  </View>
                  {area.subAreaScores.map((sub, i) => {
                    const subMaturity = getMaturityInfo(sub.score);
                    return (
                      <View
                        key={sub.subAreaId}
                        style={[
                          styles.tableRow,
                          i % 2 === 1 ? styles.tableRowAlt : {},
                        ]}
                      >
                        <Text style={[styles.tableCellBold, { width: "50%" }]}>
                          {sub.subAreaName}
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            { width: "25%", textAlign: "center" },
                          ]}
                        >
                          {sub.score.toFixed(2)}
                        </Text>
                        <Text
                          style={[
                            styles.tableCellBold,
                            {
                              width: "25%",
                              textAlign: "center",
                              color: getGradeColor(subMaturity.level),
                            },
                          ]}
                        >
                          {subMaturity.label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </>
            )}

            {/* Questions table */}
            {areaQuestions.length > 0 && (
              <>
                <Text style={styles.sectionSubtitle}>Perguntas</Text>
                <View style={styles.table}>
                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.tableHeaderCell, { width: "8%" }]}>#</Text>
                    <Text style={[styles.tableHeaderCell, { width: "47%" }]}>
                      Pergunta
                    </Text>
                    <Text
                      style={[
                        styles.tableHeaderCell,
                        { width: "10%", textAlign: "center" },
                      ]}
                    >
                      Grau
                    </Text>
                    <Text style={[styles.tableHeaderCell, { width: "35%" }]}>
                      Resposta
                    </Text>
                  </View>
                  {areaQuestions.map((q, i) => {
                    const answer = result.answers[q.id];
                    if (!answer) return null;

                    return (
                      <View
                        key={q.id}
                        style={[
                          styles.tableRow,
                          i % 2 === 1 ? styles.tableRowAlt : {},
                        ]}
                        wrap={false}
                      >
                        <Text style={[styles.tableCell, { width: "8%" }]}>
                          {q.number}
                        </Text>
                        <Text style={[styles.tableCell, { width: "47%" }]}>
                          {q.text}
                        </Text>
                        <Text
                          style={[
                            styles.tableCellBold,
                            {
                              width: "10%",
                              textAlign: "center",
                              color: getGradeColor(answer.grade),
                            },
                          ]}
                        >
                          {answer.grade}
                        </Text>
                        <Text style={[styles.tableCell, { width: "35%" }]}>
                          {answer.optionText}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* Observations */}
                {areaQuestions.some((q) => result.answers[q.id]?.observation) && (
                  <>
                    <Text style={styles.sectionSubtitle}>
                      Observacoes do CFO
                    </Text>
                    {areaQuestions.map((q) => {
                      const answer = result.answers[q.id];
                      if (!answer?.observation) return null;
                      return (
                        <View key={q.id} style={[styles.mb4]}>
                          <Text style={styles.smallText}>
                            <Text style={{ fontFamily: "Helvetica-Bold" }}>
                              {q.number}:
                            </Text>{" "}
                            {answer.observation}
                          </Text>
                        </View>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </Page>
        );
      })}
    </>
  );
}

function RiskMatrixPages({ result }: { result: DiagnosticResult }) {
  const relevantRisks = [...result.identifiedRisks]
    .filter((r) => r.grade <= 3)
    .sort((a, b) => b.riskScore - a.riskScore);

  if (relevantRisks.length === 0) return null;

  const countByCategory = (cat: string) =>
    relevantRisks.filter((r) => r.riskCategory === cat).length;

  const alto = countByCategory("Alto");
  const medio = countByCategory("Médio");
  const baixo = countByCategory("Baixo");

  return (
    <Page size="A4" style={styles.page} wrap>
      <PageHeader companyName={result.companyName} />
      <PageFooter />

      <Text style={styles.sectionTitle}>Matriz de Riscos Identificados</Text>

      <Text style={[styles.bodyText, styles.mb8]}>
        {relevantRisks.length} risco(s) identificado(s) com grau inferior ou
        igual a 3.
        {alto > 0 && ` ${alto} alto(s),`}
        {medio > 0 && ` ${medio} medio(s),`}
        {baixo > 0 && ` ${baixo} baixo(s).`}
      </Text>

      {relevantRisks.map((risk, idx) => {
        const actionItems = risk.actionPlan
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean);

        return (
          <View key={`${risk.questionId}-${idx}`} style={styles.riskCard} wrap={false}>
            <View style={styles.riskHeader}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.riskBadge,
                    { backgroundColor: getRiskCategoryColor(risk.riskCategory) },
                  ]}
                >
                  <Text style={styles.riskBadgeText}>{risk.riskCategory}</Text>
                </View>
                <Text
                  style={{
                    fontSize: 9,
                    color: COLORS.textLight,
                    marginLeft: 8,
                  }}
                >
                  Score: {risk.riskScore} (I:{risk.impact} x P:{risk.probability})
                </Text>
              </View>
              <Text style={{ fontSize: 8, color: COLORS.textLight }}>
                {risk.areaName} / {risk.subAreaName}
              </Text>
            </View>

            <Text
              style={[styles.tableCellBold, { fontSize: 9, marginBottom: 4 }]}
            >
              {risk.questionText}
            </Text>

            <Text style={styles.riskLabel}>Narrativa de Risco</Text>
            <Text style={styles.smallText}>{risk.riskNarrative}</Text>

            <Text style={styles.riskLabel}>Controles Recomendados</Text>
            <Text style={styles.smallText}>{risk.controls}</Text>

            <Text style={styles.riskLabel}>Plano de Acao</Text>
            {actionItems.map((item, i) => (
              <Text key={i} style={styles.smallText}>
                {i + 1}. {item}
              </Text>
            ))}
          </View>
        );
      })}
    </Page>
  );
}

function QuickWinsPages({ result }: { result: DiagnosticResult }) {
  if (result.quickWins.length === 0) return null;

  return (
    <Page size="A4" style={styles.page} wrap>
      <PageHeader companyName={result.companyName} />
      <PageFooter />

      <Text style={styles.sectionTitle}>
        Quick Wins - Acoes de Impacto Rapido
      </Text>

      <Text style={[styles.bodyText, styles.mb8]}>
        {result.quickWins.length} acao(oes) de alto impacto identificada(s),
        ordenadas por prioridade.
      </Text>

      {result.quickWins.map((qw, idx) => {
        const actionItems = qw.actionPlan
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean);

        return (
          <View key={`${qw.questionId}-${idx}`} style={styles.qwCard} wrap={false}>
            <View style={styles.qwHeader}>
              <Text style={styles.qwPriority}>
                #{idx + 1} - Prioridade: {qw.priority.toFixed(2)}
              </Text>
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getGradeColor(qw.currentGrade) },
                ]}
              >
                <Text style={styles.riskBadgeText}>
                  Grau {qw.currentGrade}/5
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 8,
                color: COLORS.textLight,
                marginBottom: 2,
              }}
            >
              {qw.areaName}
            </Text>
            <Text
              style={[styles.tableCellBold, { fontSize: 9, marginBottom: 4 }]}
            >
              {qw.questionText}
            </Text>

            <View style={[styles.row, styles.mb4]}>
              <Text style={styles.smallText}>
                Esforco: {qw.estimatedEffort}
              </Text>
              <Text style={[styles.smallText, { marginLeft: 16 }]}>
                Impacto: {qw.estimatedImpact}
              </Text>
              <Text style={[styles.smallText, { marginLeft: 16 }]}>
                Risk Score: {qw.riskScore}
              </Text>
            </View>

            <Text style={styles.riskLabel}>Plano de Acao</Text>
            {actionItems.map((item, i) => (
              <Text key={i} style={styles.smallText}>
                {i + 1}. {item}
              </Text>
            ))}
          </View>
        );
      })}
    </Page>
  );
}

function MethodologyPage({ result }: { result: DiagnosticResult }) {
  const maturityScale = [
    {
      level: 1,
      label: "Critica",
      range: "1.00 - 1.80",
      description: "Processos inexistentes ou altamente informais",
    },
    {
      level: 2,
      label: "Basica",
      range: "1.81 - 2.60",
      description: "Processos iniciais, pouco formalizados",
    },
    {
      level: 3,
      label: "Intermediaria",
      range: "2.61 - 3.40",
      description: "Processos parcialmente estruturados",
    },
    {
      level: 4,
      label: "Gerencial",
      range: "3.41 - 4.20",
      description: "Processos definidos com controles adequados",
    },
    {
      level: 5,
      label: "Estrategica",
      range: "4.21 - 5.00",
      description: "Processos integrados com visao estrategica",
    },
  ];

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader companyName={result.companyName} />
      <PageFooter />

      <Text style={styles.sectionTitle}>Metodologia</Text>

      <Text style={styles.bodyText}>
        O Diagnostico 360 e uma metodologia proprietaria desenvolvida pela O2
        Inc. para avaliacao abrangente da maturidade financeira empresarial.
        Atraves de {result.totalQuestions} perguntas distribuidas em 6 areas
        estrategicas, o diagnostico mapeia o nivel de estruturacao dos processos
        financeiros, identifica riscos e oportunidades de melhoria.
      </Text>

      <Text style={styles.bodyText}>
        Cada pergunta e avaliada em uma escala de 1 a 5, onde 1 representa
        ausencia total de processo e 5 representa excelencia estrategica. As
        notas sao agregadas por subarea e area, e o score global e calculado
        como media ponderada das areas.
      </Text>

      {/* Maturity scale */}
      <Text style={styles.sectionSubtitle}>Escala de Maturidade</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCell, { width: "15%" }]}>Nivel</Text>
          <Text style={[styles.tableHeaderCell, { width: "20%" }]}>
            Classificacao
          </Text>
          <Text style={[styles.tableHeaderCell, { width: "20%" }]}>Faixa</Text>
          <Text style={[styles.tableHeaderCell, { width: "45%" }]}>
            Descricao
          </Text>
        </View>
        {maturityScale.map((item, i) => (
          <View
            key={item.level}
            style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}
          >
            <Text
              style={[
                styles.tableCellBold,
                { width: "15%", color: getGradeColor(item.level) },
              ]}
            >
              Grau {item.level}
            </Text>
            <Text style={[styles.tableCellBold, { width: "20%" }]}>
              {item.label}
            </Text>
            <Text style={[styles.tableCell, { width: "20%" }]}>
              {item.range}
            </Text>
            <Text style={[styles.tableCell, { width: "45%" }]}>
              {item.description}
            </Text>
          </View>
        ))}
      </View>

      {/* Formula */}
      <Text style={styles.sectionSubtitle}>Formula de Calculo</Text>
      <Text style={styles.bodyText}>
        Score Global = Somatorio(Score_Area x Peso_Area)
      </Text>
      <Text style={styles.bodyText}>
        Onde cada Score_Area e a media aritmetica das notas das perguntas
        respondidas naquela area.
      </Text>

      {/* Weights table */}
      <Text style={styles.sectionSubtitle}>Pesos por Area</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCell, { width: "60%" }]}>Area</Text>
          <Text
            style={[styles.tableHeaderCell, { width: "40%", textAlign: "center" }]}
          >
            Peso
          </Text>
        </View>
        {result.areaScores.map((area, i) => (
          <View
            key={area.areaId}
            style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}
          >
            <Text style={[styles.tableCellBold, { width: "60%" }]}>
              {area.areaName}
            </Text>
            <Text
              style={[styles.tableCell, { width: "40%", textAlign: "center" }]}
            >
              {(area.weight * 100).toFixed(0)}%
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View
        style={{
          marginTop: "auto",
          borderTopWidth: 1,
          borderTopColor: COLORS.mediumGray,
          paddingTop: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Helvetica-Bold",
            color: COLORS.primary,
          }}
        >
          O2 Inc. - CFOs as a Service
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: COLORS.textLight,
            marginTop: 2,
          }}
        >
          Porto Alegre, RS
        </Text>
      </View>
    </Page>
  );
}

// ────────────────────────────────────────────────────────────
// Documento principal
// ────────────────────────────────────────────────────────────

interface DiagnosticReportProps {
  result: DiagnosticResult;
}

export function DiagnosticReport({ result }: DiagnosticReportProps) {
  return (
    <Document
      title={`Diagnostico 360 - ${result.companyName}`}
      author="O2 Inc."
      subject="Relatorio de Maturidade Financeira"
      creator="O2 Inc. - Data Weaver"
    >
      <CoverPage result={result} />
      <ExecutiveSummaryPage result={result} />
      <AreaDetailPages result={result} />
      <RiskMatrixPages result={result} />
      <QuickWinsPages result={result} />
      <MethodologyPage result={result} />
    </Document>
  );
}

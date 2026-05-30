/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShareholdingRow {
  category: string;
  q3: string;
  q4: string;
  q1: string;
}

export interface PricePerformanceRow {
  period: string; // e.g., "3 Month", "6 Month", "1 Year"
  absoluteReturn: string;
  absoluteSensex: string;
  relativeReturn: string;
}

export interface FinancialMetricRow {
  metric: string; // e.g., "Sales", "EBITDA", "EBITDA Margin (%)", "PAT Adjusted", "Adjusted EPS", "P/E", "P/B", "EV/EBITDA", "ROE (%)", "D/E"
  fy25: string;
  fy26: string;
  fy27: string;
}

export interface QuarterlyFinancialRow {
  metric: string; // e.g., "Sales", "EBITDA", "Margin (%)", "EBIT", "PBT", "Rep. PAT", "Adj PAT", "Adj. EPS"
  q1_current: string; // e.g., Q1FY26
  q1_previous: string; // e.g., Q1FY25
  yoyGrowth: string;
  q4_previous: string; // e.g., Q4FY25
  qoqGrowth: string;
}

export interface ChangeInEstimatesRow {
  metric: string; // e.g., "Revenue", "EBITDA", "Margins (%)", "Adj. PAT", "EPS"
  old_fy26: string;
  old_fy27: string;
  new_fy26: string;
  new_fy27: string;
  change_fy26: string;
  change_fy27: string;
}

export interface ChartDataPoint {
  period: string; // e.g. "Q2FY24", "Q3FY24", "Q4FY24", "Q1FY25", "Q2FY25", "Q3FY25", "Q4FY25", "Q1FY26"
  value: number; // For bars (revenue, gov, ebitda, pat)
  rate: number; // For lines (Yoy growth rate or Margin %)
}

export interface PerformanceCharts {
  revenueTrend: ChartDataPoint[];
  grossOrderValueTrend: ChartDataPoint[];
  ebitdaTrend: ChartDataPoint[];
  patTrend: ChartDataPoint[];
}

export interface FinancialReportTemplate {
  // Report Header and Summary
  companyName: string;
  legalName: string;
  recommendation: "BUY" | "ACCUMULATE" | "HOLD" | "REDUCE" | "SELL" | string;
  sector: string;
  reportDate: string;
  targetPrice: string;
  cmp: string;
  expectedReturn: string;

  // Key Changes
  targetChange: string; // e.g. "No Change", "Revised"
  ratingChange: string; // e.g. "Downgrade", "No Change"
  earningsChange: string; // e.g. "No Change", "Revised"

  // Stock details box
  stockType: string; // e.g., "Large Cap", "Mid Cap"
  bloombergCode: string;
  nseCode: string;
  bseCode: string;
  sensexValue: string;
  timeFrame: string;

  // Data as Of
  dataAsOf: string;

  // Left tables
  companyData: {
    marketCapCr: string;
    fiftyTwoWeekHighLow: string;
    enterpriseValueCr: string;
    outstandingSharesCr: string;
    freeFloatPct: string;
    dividendYieldPct: string;
    avgVolume6mCr: string;
    beta: string;
    faceValue: string;
  };

  shareholding: ShareholdingRow[];
  pricePerformance: PricePerformanceRow[];

  // Narrative
  highlightHeader: string;
  highlightBullets: string[];
  outlookHeading: string;
  outlookText: string;

  // Annual Financials Table
  annualFinancials: FinancialMetricRow[];

  // Quarterly Financials Table
  quarterlyFinancials: QuarterlyFinancialRow[];

  // Change in Estimates Table
  changeInEstimates: ChangeInEstimatesRow[];

  // Charts
  charts: PerformanceCharts;
}

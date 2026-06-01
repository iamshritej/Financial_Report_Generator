<<<<<<< HEAD
export interface CompanyDetails {
  name: string;
  ticker: string;
  sector: string;
  date: string;
  rating: string;
  cmp: string;
  targetPrice: string;
  returnPercent: string;
  stockType: string;
  bloombergCode: string;
  nseCode: string;
  bseCode: string;
  timeFrame: string;
  sensex: string;
}

export interface CompanyData {
  marketCap: string;
  fiftyTwoWeekHighLow: string;
  enterpriseValue: string;
  outstandingShares: string;
  freeFloat: string;
  dividendYield: string;
  sixMonthAverageVolume: string;
  beta: string;
  faceValue: string;
}

export interface Shareholding {
  periodHeaders: string[];
  promoters: string[];
  fiis: string[];
  mfs: string[];
  public: string[];
  others: string[];
  promoterPledge: string[];
}

export interface PricePerformance {
  periodHeaders: string[]; // e.g. ["3 Month", "6 Month", "1 Year"]
  absoluteReturn: string[];
  absoluteSensex: string[];
  relativeReturn: string[];
}

export interface StatementRow {
  metric: string;
  values: string[]; // matching the years/period columns in statement
}

export interface FinancialStatement {
  columns: string[];
  rows: StatementRow[];
}

export interface ChartPoint {
  period: string;
  value1: number; // e.g. Revenue, GoV, EBITDA, PAT
  value2?: number; // e.g. Margin %, growth rate, trend representation
}

export interface ReportCharts {
  revenueTrend: ChartPoint[];
  orderValueTrend: ChartPoint[];
  ebitdaTrend: ChartPoint[];
  patTrend: ChartPoint[];
}

export interface NarrativeSection {
  title: string;
  summary: string;
  bullets: string[];
}

export interface ChangeInEstimates {
  columns: string[]; // ["FY26E", "FY27E"] etc.
  metrics: {
    name: string;
    oldEstimates: string[];
    newEstimates: string[];
    changePercent: string[];
  }[];
}

export interface ReportData {
  companyDetails: CompanyDetails;
  companyData: CompanyData;
  shareholding: Shareholding;
  pricePerformance: PricePerformance;
  narrative: NarrativeSection;
  outlookValuation: string;
  yeMarchFinancials: FinancialStatement; // FY25A, FY26E, FY27E table
  quarterlyFinancials: FinancialStatement; // Q1FY26, Q1FY25, etc. Table
  changeInEstimates: ChangeInEstimates;
  profitAndLoss: FinancialStatement;
  balanceSheet: FinancialStatement;
  cashFlow: FinancialStatement;
  ratios: FinancialStatement;
  charts: ReportCharts;
=======
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
>>>>>>> da73ab59cb5a6806564e9628c1b2bfae797d0e15
}

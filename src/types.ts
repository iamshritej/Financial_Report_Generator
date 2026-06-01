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
}

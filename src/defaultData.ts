import { ReportData } from "./types";

export const defaultReportData: ReportData = {
  companyDetails: {
    name: "Eternal Ltd.",
    ticker: "ETERNAL",
    sector: "Internet & Catalogue Retail",
    date: "29th July, 2025",
    rating: "HOLD",
    cmp: "Rs. 306",
    targetPrice: "Rs. 337",
    returnPercent: "+10%",
    stockType: "Large Cap",
    bloombergCode: "ETERNAL:IN",
    nseCode: "ETERNAL",
    bseCode: "543320",
    timeFrame: "12 Months",
    sensex: "81,334"
  },
  companyData: {
    marketCap: "295,735",
    fiftyTwoWeekHighLow: "314 - 190",
    enterpriseValue: "294,166",
    outstandingShares: "965.0",
    freeFloat: "71.9",
    dividendYield: "-",
    sixMonthAverageVolume: "6.1",
    beta: "1.0",
    faceValue: "1.0"
  },
  shareholding: {
    periodHeaders: ["Q3FY25", "Q4FY25", "Q1FY26"],
    promoters: ["0.0", "0.0", "0.0"],
    fiis: ["47.3", "44.4", "42.3"],
    mfs: ["20.5", "23.6", "26.6"],
    public: ["8.0", "8.5", "7.6"],
    others: ["24.1", "23.6", "23.5"],
    promoterPledge: ["Nil", "Nil", "Nil"]
  },
  pricePerformance: {
    periodHeaders: ["3 Month", "6 Month", "1 Year"],
    absoluteReturn: ["32.1%", "44.8%", "39.7%"],
    absoluteSensex: ["3.0%", "7.9%", "2.5%"],
    relativeReturn: ["29.2%", "36.9%", "37.1%"]
  },
  narrative: {
    title: "Blinkit propels growth; valuation limits upside",
    summary: "Eternal Limited, formerly Zomato Limited, operates as an online food delivery company. It runs a B2C platform under the Zomato brand. The company also operates Hyperpure and Blinkit, organises events, provides payment services and engages in investment activities.",
    bullets: [
      "Consolidated revenue from operations surged 70.4% YoY in Q1FY26 to Rs. 7,167cr as all segments demonstrated robust growth.",
      "Revenue from the quick commerce business soared 154.8% YoY to Rs. 2,400cr, while the Hyperpure supplies and India food ordering and delivery segment grew 89.4% and 16.4% YoY, respectively.",
      "Net order value (NOV) of B2C businesses rose 55% YoY to Rs. 20,183cr in Q1FY26, with quick commerce NOV exceeding food delivery NOV for the first time.",
      "EBITDA fell 35.0% YoY to Rs. 115cr in Q1FY26, mainly due to higher operating expenses; consequently EBITDA margin declined 260bps to 1.6%.",
      "Reported PAT plunged 90.1% YoY to Rs. 25cr in Q1FY26 because of lower EBITDA.",
      "Blinkit added 243 new stores in Q1FY26, taking the total to 1,544 stores, and aims to hit 2,000 stores by December 2025."
    ]
  },
  outlookValuation: "Eternal Limited is poised for long-term growth and improved profitability, driven by its strong market position and growth prospects in the quick commerce business (QCB). The company's focus on inventory ownership and margin improvement is expected to drive profitability. Although the industry outlook remains competitive, the company’s strategy and long-term growth objectives, along with its strong management team, are expected to drive future growth. However, the stock's significant run-up in price and rich valuations limit the upside potential from current levels. Therefore, we downgrade our rating on the stock to HOLD from BUY with a revised target price of Rs. 337, based on 6x FY27 price/sales.",
  yeMarchFinancials: {
    columns: ["FY25A", "FY26E", "FY27E"],
    rows: [
      { metric: "Sales (cr)", values: ["20,243", "35,020", "54,632"] },
      { metric: "Growth (%)", values: ["67.1", "73.0", "56.0"] },
      { metric: "EBITDA (cr)", values: ["637", "1,248", "3,575"] },
      { metric: "EBITDA Margin (%)", values: ["3.1", "3.6", "6.5"] },
      { metric: "PAT Adjusted (cr)", values: ["527", "927", "2,643"] },
      { metric: "Growth (%)", values: ["50.1", "75.9", "185.2"] },
      { metric: "Adjusted EPS (Rs.)", values: ["0.6", "1.0", "2.7"] },
      { metric: "Growth (%)", values: ["46.3", "60.1", "185.2"] },
      { metric: "P/E", values: ["335.8", "325.2", "114.1"] },
      { metric: "P/B", values: ["6.4", "9.6", "8.9"] },
      { metric: "EV/EBITDA", values: ["302.2", "240.3", "84.0"] },
      { metric: "ROE (%)", values: ["1.7", "3.0", "7.8"] },
      { metric: "D/E", values: ["0.1", "0.1", "0.1"] }
    ]
  },
  quarterlyFinancials: {
    columns: ["Q1FY26", "Q1FY25", "YoY (%)", "Q4FY25", "QoQ (%)"],
    rows: [
      { metric: "Sales", values: ["7,167", "4,206", "70.4", "5,833", "22.9"] },
      { metric: "EBITDA", values: ["115", "177", "-35.0", "72", "59.7"] },
      { metric: "Margin (%)", values: ["1.6", "4.2", "-260bps", "1.2", "40bps"] },
      { metric: "EBIT", values: ["-199", "28", "-810.7", "-215", "7.4"] },
      { metric: "PBT", values: ["88", "239", "-63.2", "97", "-9.3"] },
      { metric: "Rep. PAT", values: ["25", "253", "-90.1", "39", "-35.9"] },
      { metric: "Adj PAT", values: ["25", "253", "-90.1", "39", "-35.9"] },
      { metric: "Adj. EPS (Rs)", values: ["0.03", "0.3", "-90.1", "0.04", "-35.9"] }
    ]
  },
  changeInEstimates: {
    columns: ["FY26E", "FY27E"],
    metrics: [
      { name: "Revenue (cr)", oldEstimates: ["30,738", "41,743"], newEstimates: ["35,020", "54,632"], changePercent: ["13.9", "30.9"] },
      { name: "EBITDA (cr)", oldEstimates: ["1,686", "3,959"], newEstimates: ["1,248", "3,575"], changePercent: ["-25.9", "-9.7"] },
      { name: "Margins (%)", oldEstimates: ["5.5", "9.5"], newEstimates: ["3.6", "6.5"], changePercent: ["-190bps", "-300bps"] },
      { name: "Adj. PAT (cr)", oldEstimates: ["1,460", "3,254"], newEstimates: ["927", "2,643"], changePercent: ["-36.5", "-18.8"] },
      { name: "EPS (Rs)", oldEstimates: ["1.6", "3.6"], newEstimates: ["1.0", "2.7"], changePercent: ["-40.4", "-23.7"] }
    ]
  },
  profitAndLoss: {
    columns: ["FY23A", "FY24A", "FY25A", "FY26E", "FY27E"],
    rows: [
      { metric: "Sales", values: ["7,079", "12,114", "20,243", "35,020", "54,632"] },
      { metric: "% change", values: ["68.9", "71.1", "67.1", "73.0", "56.0"] },
      { metric: "EBITDA", values: ["-1,210", "42", "637", "1,248", "3,575"] },
      { metric: "% change", values: ["-35.4", "-100.1", "63600.0", "96.0", "186.3"] },
      { metric: "Depreciation", values: ["437", "526", "863", "1,233", "1,372"] },
      { metric: "EBIT", values: ["-1,647", "-484", "-226", "16", "2,203"] },
      { metric: "Interest", values: ["49", "72", "154", "181", "208"] },
      { metric: "Other Income", values: ["681", "847", "1,077", "1,401", "1,530"] },
      { metric: "PBT", values: ["-1,015", "291", "697", "1,236", "3,524"] },
      { metric: "% change", values: ["-16.8", "-128.7", "139.5", "77.3", "185.2"] },
      { metric: "Tax", values: ["44", "60", "-170", "309", "881"] },
      { metric: "Tax Rate (%)", values: ["-4.3", "20.6", "-24.4", "25.0", "25.0"] },
      { metric: "Reported PAT", values: ["-971", "351", "527", "927", "2,643"] },
      { metric: "PAT att. to minority", values: ["-971", "351", "527", "927", "2,643"] },
      { metric: "Adj. PAT", values: ["-971", "351", "527", "927", "2,643"] },
      { metric: "% change", values: ["-35.5", "-136.1", "50.1", "75.9", "185.2"] },
      { metric: "No. of shares (cr)", values: ["855.4", "882.0", "965.0", "965.0", "965.0"] },
      { metric: "Adj EPS (Rs.)", values: ["-1.2", "0.4", "0.6", "1.0", "2.7"] },
      { metric: "% change", values: ["-28.1", "-134.2", "46.3", "60.1", "185.2"] },
      { metric: "DPS (Rs.)", values: ["-", "-", "-", "-", "-"] }
    ]
  },
  balanceSheet: {
    columns: ["FY23A", "FY24A", "FY25A", "FY26E", "FY27E"],
    rows: [
      { metric: "Cash", values: ["1,017", "731", "3,614", "3,203", "3,155"] },
      { metric: "Accts. Receivable", values: ["457", "794", "1,946", "3,309", "4,971"] },
      { metric: "Inventories", values: ["83", "88", "176", "350", "511"] },
      { metric: "Other Cur. Assets", values: ["9,274", "3,845", "5,965", "6,227", "6,566"] },
      { metric: "Investments", values: ["2,280", "10,365", "10,920", "12,012", "13,814"] },
      { metric: "Gross Fixed Assets", values: ["363", "529", "1,460", "2,511", "3,740"] },
      { metric: "Net Fixed Assets", values: ["636", "977", "2,883", "3,063", "3,198"] },
      { metric: "CWIP", values: ["7", "18", "51", "56", "62"] },
      { metric: "Intangible Assets", values: ["5,708", "5,471", "6,649", "6,569", "6,888"] },
      { metric: "Other Assets", values: ["2,137", "1,067", "3,419", "3,556", "3,700"] },
      { metric: "Total Assets", values: ["21,599", "23,356", "35,623", "38,346", "42,866"] },
      { metric: "Current Liabilities", values: ["1,406", "2,083", "3,326", "5,022", "6,791"] },
      { metric: "Provisions", values: ["94", "88", "120", "138", "159"] },
      { metric: "Debt Funds", values: ["392", "588", "1,654", "1,737", "1,824"] },
      { metric: "Other Liabilities", values: ["254", "191", "213", "213", "213"] },
      { metric: "Equity Capital", values: ["836", "868", "907", "907", "907"] },
      { metric: "Res. & Surplus", values: ["18,624", "19,545", "29,410", "30,337", "32,980"] },
      { metric: "Shareholder Funds", values: ["19,460", "20,413", "30,317", "31,244", "33,887"] },
      { metric: "Total Liabilities", values: ["21,599", "23,356", "35,623", "38,346", "42,866"] },
      { metric: "BVPS", values: ["23", "23", "31", "32", "35"] }
    ]
  },
  cashFlow: {
    columns: ["FY23A", "FY24A", "FY25A", "FY26E", "FY27E"],
    rows: [
      { metric: "Net inc. + Depn.", values: ["-520", "836", "1,390", "2,160", "4,015"] },
      { metric: "Non-cash adj.", values: ["-7", "-48", "-506", "-1,803", "-2,925"] },
      { metric: "Changes in W.C", values: ["-317", "-142", "-576", "89", "-134"] },
      { metric: "C.F. Operation", values: ["-844", "646", "308", "445", "956"] },
      { metric: "Capital exp.", values: ["-101", "-202", "-931", "-1,051", "-1,229"] },
      { metric: "Change in inv.", values: ["179", "4,073", "-5,941", "-68", "-70"] },
      { metric: "Other invest.CF", values: ["379", "-4,218", "-1,121", "181", "208"] },
      { metric: "C.F - Investment", values: ["457", "-347", "-7,993", "-938", "-1,091"] },
      { metric: "Issue of equity", values: ["4", "23", "8,501", "-", "-"] },
      { metric: "Issue/repay debt", values: ["-23", "-40", "-", "83", "87"] },
      { metric: "Other finance.CF", values: ["-108", "-190", "-459", "-", "-"] },
      { metric: "C.F - Finance", values: ["-127", "-207", "8,042", "83", "87"] },
      { metric: "Chg. in cash", values: ["-514", "92", "357", "-411", "-48"] },
      { metric: "Closing Cash", values: ["1,017", "731", "3,614", "3,203", "3,155"] }
    ]
  },
  ratios: {
    columns: ["FY23A", "FY24A", "FY25A", "FY26E", "FY27E"],
    rows: [
      { metric: "EBITDA margin (%)", values: ["-17.1", "0.3", "3.1", "3.6", "6.5"] },
      { metric: "EBIT margin (%)", values: ["-23.3", "-4.0", "-1.1", "0.0", "4.0"] },
      { metric: "Net profit mgn.(%)", values: ["-13.7", "2.9", "2.6", "2.6", "4.8"] },
      { metric: "ROE (%)", values: ["-5.0", "1.7", "1.7", "3.0", "7.8"] },
      { metric: "ROCE (%)", values: ["-8.3", "-2.3", "-0.7", "0.0", "6.2"] },
      { metric: "Receivables (days)", values: ["23.6", "23.9", "35.1", "34.5", "33.2"] },
      { metric: "Inventory (days)", values: ["21.7", "11.1", "11.5", "11.3", "11.0"] },
      { metric: "Payables (days)", values: ["177.7", "112.2", "100.7", "102.2", "104.6"] },
      { metric: "Current ratio (x)", values: ["7.5", "2.6", "3.5", "2.6", "2.2"] },
      { metric: "Quick ratio (x)", values: ["4.1", "1.3", "2.4", "1.8", "1.6"] },
      { metric: "Gross asset T.O (x)", values: ["28.2", "27.2", "20.4", "17.6", "17.5"] },
      { metric: "Total asset T.O (x)", values: ["0.4", "0.5", "0.7", "0.9", "1.3"] },
      { metric: "Int. covge. ratio (x)", values: ["-33.6", "-6.7", "-1.5", "0.1", "10.6"] },
      { metric: "Adj. debt/equity (x)", values: ["0.0", "0.0", "0.1", "0.1", "0.1"] },
      { metric: "EV/Sales (x)", values: ["6.1", "13.3", "9.5", "8.6", "5.5"] },
      { metric: "EV/EBITDA (x)", values: ["n.m.", "3,825.7", "302.2", "240.3", "84.0"] },
      { metric: "P/E (x)", values: ["n.m.", "4,444.8", "335.8", "325.2", "114.1"] },
      { metric: "P/BV (x)", values: ["2.2", "7.9", "6.4", "9.6", "8.9"] }
    ]
  },
  charts: {
    revenueTrend: [
      { period: "Q2FY24", value1: 3200, value2: 17.9 },
      { period: "Q3FY24", value1: 3450, value2: 15.4 },
      { period: "Q4FY24", value1: 3910, value2: 18.1 },
      { period: "Q1FY25", value1: 4206, value2: 14.1 },
      { period: "Q2FY25", value1: 4790, value2: 12.6 },
      { period: "Q3FY25", value1: 5210, value2: 7.9 },
      { period: "Q4FY25", value1: 5833, value2: 11.2 },
      { period: "Q1FY26", value1: 7167, value2: 24.0 }
    ],
    orderValueTrend: [
      { period: "Q2FY24", value1: 110, value2: 13.4 },
      { period: "Q3FY24", value1: 125, value2: 12.8 },
      { period: "Q4FY24", value1: 140, value2: 14.2 },
      { period: "Q1FY25", value1: 149, value2: 14.3 },
      { period: "Q2FY25", value1: 168, value2: 15.8 },
      { period: "Q3FY25", value1: 182, value2: 16.7 },
      { period: "Q4FY25", value1: 202, value2: 18.0 }
    ],
    ebitdaTrend: [
      { period: "Q2FY24", value1: -12, value2: -1.7 },
      { period: "Q3FY24", value1: 18, value2: 1.6 },
      { period: "Q4FY24", value1: 45, value2: 2.4 },
      { period: "Q1FY25", value1: 177, value2: 4.2 },
      { period: "Q2FY25", value1: 195, value2: 4.7 },
      { period: "Q3FY25", value1: 160, value2: 3.0 },
      { period: "Q4FY25", value1: 72, value2: 1.2 },
      { period: "Q1FY26", value1: 115, value2: 1.6 }
    ],
    patTrend: [
      { period: "Q2FY24", value1: -36, value2: -1.3 },
      { period: "Q3FY24", value1: 22, value2: 4.2 },
      { period: "Q4FY24", value1: 30, value2: 4.9 },
      { period: "Q1FY25", value1: 253, value2: 6.0 },
      { period: "Q2FY25", value1: 117, value2: 3.7 },
      { period: "Q3FY25", value1: 85, value2: 1.1 },
      { period: "Q4FY25", value1: 39, value2: 0.7 },
      { period: "Q1FY26", value1: 25, value2: 0.3 }
    ]
  }
};

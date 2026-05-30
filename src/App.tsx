/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Upload, 
  Download, 
  RefreshCw, 
  Check, 
  TrendingUp, 
  Edit, 
  FileSpreadsheet, 
  Layers,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { FinancialReportTemplate, ShareholdingRow, PricePerformanceRow, FinancialMetricRow, QuarterlyFinancialRow, ChangeInEstimatesRow, ChartDataPoint } from "./types";

const defaultTemplate: FinancialReportTemplate = {
  companyName: "Eternal Ltd.",
  legalName: "Eternal Limited, formerly Zomato Limited",
  recommendation: "HOLD",
  sector: "Internet & Catalogue Retail",
  reportDate: "29th July, 2025",
  targetPrice: "Rs. 337",
  cmp: "Rs. 306",
  expectedReturn: "+10%",
  targetChange: "Revised",
  ratingChange: "Downgrade",
  earningsChange: "No Change",
  stockType: "Large Cap",
  bloombergCode: "ETERNAL:IN",
  nseCode: "ETERNAL",
  bseCode: "543320",
  sensexValue: "81,334",
  timeFrame: "12 Months",
  dataAsOf: "29-July-2025, 16:23hrs",
  companyData: {
    marketCapCr: "295,735",
    fiftyTwoWeekHighLow: "314 - 190",
    enterpriseValueCr: "294,166",
    outstandingSharesCr: "965.0",
    freeFloatPct: "71.9",
    dividendYieldPct: "-",
    avgVolume6mCr: "6.1",
    beta: "1.0",
    faceValue: "1.0"
  },
  shareholding: [
    { category: "Promoters", q3: "0.0", q4: "0.0", q1: "0.0" },
    { category: "FII's", q3: "47.3", q4: "44.4", q1: "42.3" },
    { category: "MFs/Institutions", q3: "20.5", q4: "23.6", q1: "26.6" },
    { category: "Public", q3: "8.0", q4: "8.5", q1: "7.6" },
    { category: "Others", q3: "24.1", q4: "23.6", q1: "23.5" },
  ],
  pricePerformance: [
    { period: "Absolute Return", absoluteReturn: "32.1%", absoluteSensex: "44.8%", relativeReturn: "39.7%" },
    { period: "Absolute Sensex", absoluteReturn: "3.0%", absoluteSensex: "7.9%", relativeReturn: "2.5%" },
    { period: "Relative Return", absoluteReturn: "29.2%", absoluteSensex: "36.9%", relativeReturn: "37.1%" },
  ],
  highlightHeader: "Blinkit propels growth; valuation limits upside",
  highlightBullets: [
    "Consolidated revenue from operations surged 70.4% YoY in Q1FY26 to Rs. 7,167cr as all segments demonstrated robust growth.",
    "Revenue from the quick commerce business soared 154.8% YoY to Rs. 2,400cr, while the Hyperpure supplies and India food delivery segment grew 89.4% and 16.4% YoY, respectively.",
    "Net order value (NOV) of B2C businesses rose 55% YoY to Rs. 20,183cr in Q1FY26, with quick commerce NOV exceeding food delivery NOV for the first time.",
    "EBITDA fell 35.0% YoY to Rs. 115cr in Q1FY26, mainly due to higher operating expenses; consequently EBITDA margin declined 260bps to 1.6%.",
    "Blinkit added 243 new stores in Q1FY26, taking the total to 1,544 stores, and aims to hit 2,000 stores by December 2025.",
  ],
  outlookHeading: "Outlook & Valuation",
  outlookText: "Eternal Limited is poised for long-term growth and improved profitability, driven by its strong market position and growth prospects in the quick commerce business (QCB). The company's focus on inventory ownership and margin improvement is expected to drive profitability. Although the industry outlook remains competitive, the company’s strategy and long-term growth objectives, along with its strong management team, are expected to drive future growth. However, the stock's significant run-up in price and rich valuations limit the upside potential from current levels. Therefore, we downgrade our rating on the stock to HOLD from BUY with a revised target price of Rs. 337, based on 6x FY27 price/sales.",
  annualFinancials: [
    { metric: "Sales", fy25: "20,243", fy26: "35,020", fy27: "54,632" },
    { metric: "Growth (%)", fy25: "67.1", fy26: "73.0", fy27: "56.0" },
    { metric: "EBITDA", fy25: "637", fy26: "1,248", fy27: "3,575" },
    { metric: "EBITDA Margin (%)", fy25: "3.1", fy26: "3.6", fy27: "6.5" },
    { metric: "PAT Adjusted", fy25: "527", fy26: "927", fy27: "2,643" },
    { metric: "Growth (%)", fy25: "50.1", fy26: "75.9", fy27: "185.2" },
    { metric: "Adjusted EPS", fy25: "0.6", fy26: "1.0", fy27: "2.7" },
  ],
  quarterlyFinancials: [
    { metric: "Sales", q1_current: "7,167", q1_previous: "4,206", yoyGrowth: "70.4", q4_previous: "5,833", qoqGrowth: "22.9" },
    { metric: "EBITDA", q1_current: "115", q1_previous: "177", yoyGrowth: "-35.0", q4_previous: "72", qoqGrowth: "59.7" },
    { metric: "Margin (%)", q1_current: "1.6", q1_previous: "4.2", yoyGrowth: "-260bps", q4_previous: "1.2", qoqGrowth: "40bps" },
    { metric: "EBIT", q1_current: "-199", q1_previous: "28", yoyGrowth: "-810.7", q4_previous: "-215", qoqGrowth: "7.4" },
    { metric: "PBT", q1_current: "88", q1_previous: "239", yoyGrowth: "-63.2", q4_previous: "97", qoqGrowth: "-9.3" },
    { metric: "Rep. PAT", q1_current: "25", q1_previous: "253", yoyGrowth: "-90.1", q4_previous: "39", qoqGrowth: "-35.9" },
    { metric: "Adj PAT", q1_current: "25", q1_previous: "253", yoyGrowth: "-90.1", q4_previous: "39", qoqGrowth: "-35.9" },
    { metric: "Adj. EPS (Rs)", q1_current: "0.03", q1_previous: "0.3", yoyGrowth: "-90.1", q4_previous: "0.04", qoqGrowth: "-35.9" },
  ],
  changeInEstimates: [
    { metric: "Revenue", old_fy26: "30,738", old_fy27: "41,743", new_fy26: "35,020", new_fy27: "54,632", change_fy26: "13.9", change_fy27: "30.9" },
    { metric: "EBITDA", old_fy26: "1,686", old_fy27: "3,959", new_fy26: "1,248", new_fy27: "3,575", change_fy26: "-25.9", change_fy27: "-9.7" },
    { metric: "Margins (%)", old_fy26: "5.5", old_fy27: "9.5", new_fy26: "3.6", new_fy27: "6.5", change_fy26: "-190bps", change_fy27: "-300bps" },
    { metric: "Adj. PAT", old_fy26: "1,460", old_fy27: "3,254", new_fy26: "927", new_fy27: "2,643", change_fy26: "-36.5", change_fy27: "-18.8" },
    { metric: "EPS", old_fy26: "1.6", old_fy27: "3.6", new_fy26: "1.0", new_fy27: "2.7", change_fy26: "-40.4", change_fy27: "-23.7" },
  ],
  charts: {
    revenueTrend: [
      { period: "Q2FY24", value: 3845, rate: 17.9 },
      { period: "Q3FY24", value: 4847, rate: 15.4 },
      { period: "Q4FY24", value: 5800, rate: 18.1 },
      { period: "Q1FY25", value: 4206, rate: 14.1 },
      { period: "Q2FY25", value: 5833, rate: 12.6 },
      { period: "Q3FY25", value: 6403, rate: 10.5 },
      { period: "Q4FY25", value: 7167, rate: 9.3 },
      { period: "Q1FY26", value: 7845, rate: 14.2 },
    ],
    grossOrderValueTrend: [
      { period: "Q2FY24", value: 1286, rate: 13.4 },
      { period: "Q3FY24", value: 1703, rate: 12.8 },
      { period: "Q4FY24", value: 1935, rate: 14.2 },
      { period: "Q1FY25", value: 1266, rate: 14.4 },
      { period: "Q2FY25", value: 1935, rate: 16.7 },
      { period: "Q3FY25", value: 2150, rate: 15.8 },
      { period: "Q4FY25", value: 2310, rate: 18.0 },
      { period: "Q1FY26", value: 2843, rate: 16.5 },
    ],
    ebitdaTrend: [
      { period: "Q2FY24", value: 160, rate: 2.4 },
      { period: "Q3FY24", value: 175, rate: 1.6 },
      { period: "Q4FY24", value: 170, rate: -1.7 },
      { period: "Q1FY25", value: 115, rate: 1.2 },
      { period: "Q2FY25", value: 177, rate: 4.2 },
      { period: "Q3FY25", value: 210, rate: 3.0 },
      { period: "Q4FY25", value: 250, rate: 4.7 },
      { period: "Q1FY26", value: 318, rate: 5.2 },
    ],
    patTrend: [
      { period: "Q2FY24", value: 117, rate: 1.3 },
      { period: "Q3FY24", value: 127, rate: 4.2 },
      { period: "Q4FY24", value: 123, rate: 4.9 },
      { period: "Q1FY25", value: 25, rate: 1.1 },
      { period: "Q2FY25", value: 253, rate: 6.0 },
      { period: "Q3FY25", value: 144, rate: 3.7 },
      { period: "Q4FY25", value: 220, rate: 0.7 },
      { period: "Q1FY26", value: 328, rate: 5.6 },
    ],
  }
};

export default function App() {
  const [report, setReport] = useState<FinancialReportTemplate>(defaultTemplate);
  const [presets, setPresets] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState("");
  const [rawTextContext, setRawTextContext] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const [activeTab, setActiveTab] = useState<"narrative" | "tables" | "metadata" | "charts">("narrative");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; msg: string } | null>(null);

  // Fetch presets on load
  useEffect(() => {
    fetch("/api/presets")
      .then((res) => res.json())
      .then((data) => setPresets(data || []))
      .catch((err) => console.error("Error fetching presets:", err));
  }, []);

  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(id);
    setUploadedFile(null);
    const preset = presets.find((p) => p.id === id);
    if (preset) {
      setCompanyName(preset.name);
      setRawTextContext(preset.text);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      setSelectedPresetId("");
      setCompanyName(e.target.files[0].name.replace(/\.[^/.]+$/, "")); // remove ext
    }
  };

  const triggerExtraction = async () => {
    setIsExtracting(true);
    setNotification({ type: "info", msg: "AI model analyzing financial document..." });

    try {
      const formData = new FormData();
      formData.append("companyName", companyName);

      if (selectedPresetId) {
        formData.append("presetId", selectedPresetId);
      } else if (uploadedFile) {
        formData.append("file", uploadedFile);
      } else if (rawTextContext) {
        formData.append("textContext", rawTextContext);
      } else {
        throw new Error("Please select a preset, upload a file, or write raw text context first.");
      }

      const res = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Extraction failed");
      }

      const extractedData = await res.json();
      setReport({ ...defaultTemplate, ...extractedData });
      setNotification({ type: "success", msg: "Data successfully extracted & auto-filled into Geojit template!" });
    } catch (e: any) {
      console.error(e);
      setNotification({ type: "error", msg: e.message || "Failed during parsing" });
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadPdf = async () => {
    setIsGeneratingPdf(true);
    setNotification({ type: "info", msg: "Compiling vector PDF report..." });

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });

      if (!res.ok) throw new Error("Could not compile report PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${report.companyName}_Geojit_Sample_Report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setNotification({ type: "success", msg: "PDF downloaded successfully!" });
    } catch (e: any) {
      console.error(e);
      setNotification({ type: "error", msg: e.message || "Failed during PDF compile" });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Helper row updating functions for table customizability
  const updateShareholding = (index: number, field: keyof ShareholdingRow, val: string) => {
    const updated = [...report.shareholding];
    updated[index] = { ...updated[index], [field]: val };
    setReport({ ...report, shareholding: updated });
  };

  const updatePricePerformance = (index: number, field: keyof PricePerformanceRow, val: string) => {
    const updated = [...report.pricePerformance];
    updated[index] = { ...updated[index], [field]: val };
    setReport({ ...report, pricePerformance: updated });
  };

  const updateAnnualFinancials = (index: number, field: keyof FinancialMetricRow, val: string) => {
    const updated = [...report.annualFinancials];
    updated[index] = { ...updated[index], [field]: val };
    setReport({ ...report, annualFinancials: updated });
  };

  const updateQuarterlyFinancials = (index: number, field: keyof QuarterlyFinancialRow, val: string) => {
    const updated = [...report.quarterlyFinancials];
    updated[index] = { ...updated[index], [field]: val };
    setReport({ ...report, quarterlyFinancials: updated });
  };

  const updateChangeInEstimates = (index: number, field: keyof ChangeInEstimatesRow, val: string) => {
    const updated = [...report.changeInEstimates];
    updated[index] = { ...updated[index], [field]: val };
    setReport({ ...report, changeInEstimates: updated });
  };

  const updateChartPoint = (chartName: "revenueTrend" | "grossOrderValueTrend" | "ebitdaTrend" | "patTrend", index: number, field: keyof ChartDataPoint, val: number | string) => {
    const chartList = [...report.charts[chartName]];
    chartList[index] = { ...chartList[index], [field]: typeof val === 'string' ? parseFloat(val) || 0 : val };
    setReport({
      ...report,
      charts: {
        ...report.charts,
        [chartName]: chartList
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans flex flex-col">
      {/* HEADER BAR */}
      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-[#0d0d0d]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white italic shadow-lg">G</div>
          <div>
            <h1 className="text-base sm:text-lg font-medium text-white flex items-center gap-2">
              Financial Report Generator <span className="text-gray-500 text-xs sm:text-sm font-normal">/ Engine v1.0.4</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-400 font-mono uppercase tracking-tighter">AI Engine Online</span>
          </div>
          <button 
            onClick={downloadPdf} 
            disabled={isGeneratingPdf}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white px-5 py-2 rounded-full shadow-lg font-semibold flex items-center gap-2 transition-all cursor-pointer text-xs sm:text-sm"
          >
            {isGeneratingPdf ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download Final PDF
          </button>
        </div>
      </header>

      {/* NOTIFICATION FEED */}
      {notification && (
        <div className={`mx-6 mt-4 p-3 rounded-lg border text-sm flex items-center justify-between ${
          notification.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
          notification.type === 'error' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
          'bg-blue-500/10 text-blue-400 border-blue-500/20'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>{notification.msg}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs font-bold px-2 py-0.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-all">Close</button>
        </div>
      )}

      {/* CORE WRAPPER BODY */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CONTROL & EXTRACTION */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* STEP 1: Select or Upload */}
          <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-sm font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded"></span>
              Report Configuration
            </h2>

            {/* Presets Grid */}
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2 tracking-wider">Load Test Option Portfolio</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.id)}
                  className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                    selectedPresetId === preset.id
                      ? "border-blue-500 bg-blue-500/10 text-blue-400 font-semibold shadow-inner"
                      : "border-gray-800 hover:border-gray-700 text-gray-300 bg-[#1c1c1c]"
                  }`}
                >
                  <FileText className={`h-3.5 w-3.5 mb-1 ${selectedPresetId === preset.id ? 'text-blue-400' : 'text-gray-500'}`} />
                  {preset.name}
                  <span className="block text-[9px] text-gray-500 font-normal">{preset.sector}</span>
                </button>
              ))}
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-3 text-xs text-gray-500 font-mono">or upload custom</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            {/* Custom File uploader */}
            <div className="mt-2.5">
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2 tracking-wider">PDF, CSV, or TXT file</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="doc-file"
                  accept=".pdf,.csv,.txt,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="doc-file"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-800 hover:border-blue-500 rounded-lg py-3 px-4 cursor-pointer text-gray-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all text-xs bg-[#1c1c1c]"
                >
                  <Upload className="h-4 w-4" />
                  {uploadedFile ? uploadedFile.name : "Select Company File..."}
                </label>
              </div>
            </div>

            {/* Optional text area directly */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Or Paste Context Raw Text</label>
                {selectedPresetId && <span className="text-[10px] text-blue-400 font-medium font-mono">Preset Loaded</span>}
              </div>
              <textarea
                value={rawTextContext}
                onChange={(e) => {
                  setRawTextContext(e.target.value);
                  setSelectedPresetId("");
                }}
                placeholder="Paste financial metrics, table text, or narrative highlights..."
                className="w-full h-24 bg-[#1c1c1c] border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs p-2.5 rounded-lg font-mono text-gray-200 placeholder-gray-600 focus:outline-none"
              ></textarea>
            </div>

            <div className="mt-4 flex gap-2">
              <div className="w-1/2">
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-wider">Company Name Override</label>
                <input
                  type="text"
                  placeholder="e.g. ICICI Bank"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-lg placeholder-gray-600 focus:outline-none h-[42px]"
                />
              </div>
              <div className="w-1/2 flex items-end">
                <button
                  onClick={triggerExtraction}
                  disabled={isExtracting || (!uploadedFile && !rawTextContext)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-lg cursor-pointer transition-all h-[42px]"
                >
                  {isExtracting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-yellow-400" />}
                  Auto-Fill Via AI
                </button>
              </div>
            </div>
          </div>

          {/* STEP 2: FIELD EDITOR */}
          <div className="bg-[#141414] border border-gray-800 rounded-xl p-6 shadow-2xl flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-1 h-4 bg-teal-500 rounded"></span>
                Customize Model Template
              </h2>
              <span className="text-[10px] text-gray-500 font-mono">Modularity Level 100%</span>
            </div>

            {/* TAB SELECTION */}
            <div className="flex border-b border-gray-800 mb-4 gap-1">
              <button
                onClick={() => setActiveTab("narrative")}
                className={`py-1.5 px-3 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
                  activeTab === "narrative"
                    ? "border-blue-500 text-blue-400 font-bold"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Narratives
              </button>
              <button
                onClick={() => setActiveTab("metadata")}
                className={`py-1.5 px-3 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
                  activeTab === "metadata"
                    ? "border-blue-500 text-blue-400 font-bold"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Metadata
              </button>
              <button
                onClick={() => setActiveTab("tables")}
                className={`py-1.5 px-3 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
                  activeTab === "tables"
                    ? "border-blue-500 text-blue-400 font-bold"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Ratios & Tables
              </button>
              <button
                onClick={() => setActiveTab("charts")}
                className={`py-1.5 px-3 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
                  activeTab === "charts"
                    ? "border-blue-500 text-blue-400 font-bold"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Chart Figures
              </button>
            </div>

            {/* TAB CHANNELS */}
            <div className="flex-1 overflow-y-auto max-h-[350px] pr-1">
              
              {/* NARRATIVES */}
              {activeTab === "narrative" && (
                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Analyst Key Topic Header</label>
                    <input
                      type="text"
                      value={report.highlightHeader}
                      onChange={(e) => setReport({ ...report, highlightHeader: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 rounded-lg text-white font-semibold focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Highlight Bullet Points (one per line)</label>
                    <textarea
                      rows={5}
                      value={report.highlightBullets?.join("\n")}
                      onChange={(e) => setReport({ ...report, highlightBullets: e.target.value.split("\n") })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 rounded-lg text-white font-sans leading-relaxed focus:border-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Outlook Heading</label>
                    <input
                      type="text"
                      value={report.outlookHeading}
                      onChange={(e) => setReport({ ...report, outlookHeading: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 rounded-lg text-white font-semibold focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Outlook Details & Valuation Summary</label>
                    <textarea
                      rows={6}
                      value={report.outlookText}
                      onChange={(e) => setReport({ ...report, outlookText: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 rounded-lg text-white text-justify leading-relaxed focus:border-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* METADATA */}
              {activeTab === "metadata" && (
                <div className="space-y-3 grid grid-cols-2 gap-x-2 gap-y-2.5 text-left font-sans">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Legal/Full Name</label>
                    <input
                      type="text"
                      value={report.legalName}
                      onChange={(e) => setReport({ ...report, legalName: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Sector</label>
                    <input
                      type="text"
                      value={report.sector}
                      onChange={(e) => setReport({ ...report, sector: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Report Date</label>
                    <input
                      type="text"
                      value={report.reportDate}
                      onChange={(e) => setReport({ ...report, reportDate: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Bloomberg Ticker </label>
                    <input
                      type="text"
                      value={report.bloombergCode}
                      onChange={(e) => setReport({ ...report, bloombergCode: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">NSE Code</label>
                    <input
                      type="text"
                      value={report.nseCode}
                      onChange={(e) => setReport({ ...report, nseCode: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Rating Recommendation</label>
                    <input
                      type="text"
                      value={report.recommendation}
                      onChange={(e) => setReport({ ...report, recommendation: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-orange-400 font-bold rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Expected Return</label>
                    <input
                      type="text"
                      value={report.expectedReturn}
                      onChange={(e) => setReport({ ...report, expectedReturn: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-emerald-400 font-bold rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">CMP (Rs.)</label>
                    <input
                      type="text"
                      value={report.cmp}
                      onChange={(e) => setReport({ ...report, cmp: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Target Price (Rs.)</label>
                    <input
                      type="text"
                      value={report.targetPrice}
                      onChange={(e) => setReport({ ...report, targetPrice: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white font-bold rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Market Cap (Cr)</label>
                    <input
                      type="text"
                      value={report.companyData?.marketCapCr}
                      onChange={(e) => setReport({ ...report, companyData: { ...report.companyData, marketCapCr: e.target.value } })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">52 Wk High-Low</label>
                    <input
                      type="text"
                      value={report.companyData?.fiftyTwoWeekHighLow}
                      onChange={(e) => setReport({ ...report, companyData: { ...report.companyData, fiftyTwoWeekHighLow: e.target.value } })}
                      className="w-full text-xs p-2.5 bg-[#1c1c1c] border border-gray-800 text-white rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TABLES EDITOR */}
              {activeTab === "tables" && (
                <div className="space-y-4 text-left">
                  {/* Shareholding cells */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider">Shareholding Percent (%)</h3>
                    <div className="grid grid-cols-12 gap-1 text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider text-center">
                      <div className="col-span-5 text-left">Category</div>
                      <div className="col-span-2">Q3</div>
                      <div className="col-span-2">Q4</div>
                      <div className="col-span-2">Q1</div>
                    </div>
                    {report.shareholding?.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-1 mb-1">
                        <input type="text" value={row.category} readOnly className="col-span-5 text-xs p-1.5 bg-[#111111] text-gray-400 border border-gray-850 rounded focus:outline-none" />
                        <input type="text" value={row.q3} onChange={(e) => updateShareholding(idx, "q3", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                        <input type="text" value={row.q4} onChange={(e) => updateShareholding(idx, "q4", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                        <input type="text" value={row.q1} onChange={(e) => updateShareholding(idx, "q1", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                      </div>
                    ))}
                  </div>

                  {/* Y.E March annual indicators */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider">Y.E March Annual Financial Estimates</h3>
                    <div className="grid grid-cols-12 gap-1 text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider text-center">
                      <div className="col-span-5 text-left">Metric</div>
                      <div className="col-span-2">FY25A</div>
                      <div className="col-span-2">FY26E</div>
                      <div className="col-span-2">FY27E</div>
                    </div>
                    {report.annualFinancials?.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-1 mb-1">
                        <input type="text" value={row.metric} readOnly className="col-span-5 text-xs p-1.5 bg-[#111111] text-gray-400 border border-gray-850 rounded focus:outline-none" />
                        <input type="text" value={row.fy25} onChange={(e) => updateAnnualFinancials(idx, "fy25", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                        <input type="text" value={row.fy26} onChange={(e) => updateAnnualFinancials(idx, "fy26", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                        <input type="text" value={row.fy27} onChange={(e) => updateAnnualFinancials(idx, "fy27", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                      </div>
                    ))}
                  </div>

                  {/* Quarterly table metrics */}
                  <div>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider">Quarterly Financial Performance</h3>
                    <div className="grid grid-cols-12 gap-1 text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider text-center">
                      <div className="col-span-4 text-left">Metric</div>
                      <div className="col-span-2">Q1FY26</div>
                      <div className="col-span-2">Q1FY25</div>
                      <div className="col-span-2">YoY%</div>
                      <div className="col-span-2">Q4FY25</div>
                    </div>
                    {report.quarterlyFinancials?.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-1 mb-1">
                        <input type="text" value={row.metric} readOnly className="col-span-4 text-xs p-1.5 bg-[#111111] text-gray-400 border border-gray-850 rounded focus:outline-none" />
                        <input type="text" value={row.q1_current} onChange={(e) => updateQuarterlyFinancials(idx, "q1_current", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                        <input type="text" value={row.q1_previous} onChange={(e) => updateQuarterlyFinancials(idx, "q1_previous", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                        <input type="text" value={row.yoyGrowth} onChange={(e) => updateQuarterlyFinancials(idx, "yoyGrowth", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                        <input type="text" value={row.q4_previous} onChange={(e) => updateQuarterlyFinancials(idx, "q4_previous", e.target.value)} className="col-span-2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded text-center focus:border-blue-500 focus:outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CHARTS TREND EDITOR */}
              {activeTab === "charts" && (
                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider font-mono">Revenue Trend (Rs.cr & YoY growth)</h3>
                    {report.charts?.revenueTrend?.map((pt, idx) => (
                      <div key={idx} className="flex gap-2 items-center mb-1">
                        <span className="text-[10px] text-gray-550 w-16 font-mono">{pt.period}</span>
                        <input type="number" placeholder="Value" value={pt.value} onChange={(e) => updateChartPoint("revenueTrend", idx, "value", e.target.value)} className="w-1/2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded focus:border-blue-500 focus:outline-none" />
                        <input type="number" step="0.1" placeholder="YoY%" value={pt.rate} onChange={(e) => updateChartPoint("revenueTrend", idx, "rate", e.target.value)} className="w-1/2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded focus:border-blue-500 focus:outline-none" />
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider font-mono">EBITDA Trend (Value & Margin %)</h3>
                    {report.charts?.ebitdaTrend?.map((pt, idx) => (
                      <div key={idx} className="flex gap-2 items-center mb-1">
                        <span className="text-[10px] text-gray-550 w-16 font-mono">{pt.period}</span>
                        <input type="number" placeholder="Value" value={pt.value} onChange={(e) => updateChartPoint("ebitdaTrend", idx, "value", e.target.value)} className="w-1/2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded focus:border-blue-500 focus:outline-none" />
                        <input type="number" step="0.1" placeholder="Margin%" value={pt.rate} onChange={(e) => updateChartPoint("ebitdaTrend", idx, "rate", e.target.value)} className="w-1/2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded focus:border-blue-500 focus:outline-none" />
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider font-mono">PAT Trend (Value & Net Margin %)</h3>
                    {report.charts?.patTrend?.map((pt, idx) => (
                      <div key={idx} className="flex gap-2 items-center mb-1">
                        <span className="text-[10px] text-gray-550 w-16 font-mono">{pt.period}</span>
                        <input type="number" placeholder="Value" value={pt.value} onChange={(e) => updateChartPoint("patTrend", idx, "value", e.target.value)} className="w-1/2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded focus:border-blue-500 focus:outline-none" />
                        <input type="number" step="0.1" placeholder="PAT Margin%" value={pt.rate} onChange={(e) => updateChartPoint("patTrend", idx, "rate", e.target.value)} className="w-1/2 text-xs p-1.5 bg-[#1c1c1c] border border-gray-800 text-white rounded focus:border-blue-500 focus:outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: INTERACTIVE GEOMETRICAL PREVIEW CARD */}
        <section className="lg:col-span-7 flex flex-col gap-4 text-left">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-blue-500" />
              Live Styled Layout Preview (Geojit Template Order)
            </h2>
            <span className="text-[10px] text-blue-450 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">A4 Page 1 Frame</span>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-xl shadow-2xl p-4 flex flex-col flex-1 min-h-[700px] border-t-8 border-t-blue-600 relative select-none">
            
            {/* Geojit Mockup Header */}
            <div className="flex justify-between items-start border-b pb-4 mb-4 border-slate-100">
              <div>
                <span className="text-[9px] font-extrabold uppercase text-teal-700 tracking-wider">Retail Equity Research</span>
                <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none mt-1">{report.companyName}</h3>
                <span className="text-[10px] text-slate-400 block mt-1">Sector: {report.sector}</span>
              </div>

              <div className="text-right flex flex-col items-end">
                {/* Simulated Geojit Logo */}
                <div className="bg-teal-700 text-white rounded px-2.5 py-1 text-center font-bold text-xs uppercase leading-none border border-teal-900 shadow">
                  GEOJIT
                  <span className="block text-[5px] text-teal-200 tracking-tighter">PEOPLE YOU PROSPER WITH</span>
                </div>
                {/* Hold Recommendation tag */}
                <div className="mt-2 text-xs font-bold text-teal-800 bg-slate-100 border border-teal-600 px-4 py-1.5 rounded uppercase shadow-sm">
                  {report.recommendation}
                </div>
              </div>
            </div>

            {/* Simulated target metrics bar */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-center">
                <span className="block text-[8px] text-slate-400 uppercase font-medium">Key Changes</span>
                <span className="text-[10px] font-bold text-teal-700">{report.targetChange}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-center">
                <span className="block text-[8px] text-slate-400 uppercase font-medium">Rating</span>
                <span className="text-[10px] font-bold text-teal-700">{report.ratingChange}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-center">
                <span className="block text-[8px] text-slate-400 uppercase font-medium">Earnings</span>
                <span className="text-[10px] font-bold text-teal-700">{report.earningsChange}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border border-teal-100 text-center col-span-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[8px] text-slate-400 uppercase">Target: <strong className="text-slate-700 font-bold">{report.targetPrice}</strong></span>
                  <span className="text-[8px] text-slate-400 uppercase">CMP: <strong className="text-slate-700 font-bold">{report.cmp}</strong></span>
                </div>
              </div>
              <div className="bg-teal-700 p-1.5 rounded text-center text-white">
                <span className="block text-[7px] text-teal-300 uppercase">Return</span>
                <span className="text-[11px] font-bold text-orange-400">{report.expectedReturn}</span>
              </div>
            </div>

            {/* Horizontal parameters stripe */}
            <div className="bg-[#e4ecea] px-3 py-1.5 rounded flex justify-between text-[9px] text-slate-600 font-medium mb-4">
              <span>Bloomberg: <strong>{report.bloombergCode}</strong></span>
              <span>Sensex: <strong>{report.sensexValue}</strong></span>
              <span>NSE: <strong>{report.nseCode}</strong></span>
              <span>BSE: <strong>{report.bseCode}</strong></span>
              <span>Time: <strong>{report.timeFrame}</strong></span>
            </div>

            {/* Layout Columns */}
            <div className="flex-1 grid grid-cols-12 gap-4">
              
              {/* Left Column grid info */}
              <div className="col-span-4 border-r border-slate-100 pr-3 space-y-4">
                {/* Data of As of */}
                <div className="text-[9px] text-slate-400">Data as of: <strong className="text-slate-600 font-normal">{report.dataAsOf}</strong></div>

                {/* Left Table: Company Data */}
                <div>
                  <div className="bg-teal-700 text-white font-bold text-[9px] py-1 px-1.5 uppercase leading-none">Company Data</div>
                  <div className="text-[8px] divide-y divide-slate-100 border border-slate-100">
                    <div className="flex justify-between p-1 bg-slate-50"><span>Mkt Cap (cr)</span><span className="font-bold">{report.companyData?.marketCapCr}</span></div>
                    <div className="flex justify-between p-1"><span>52 Wk H/L</span><span className="font-bold">{report.companyData?.fiftyTwoWeekHighLow}</span></div>
                    <div className="flex justify-between p-1 bg-slate-50"><span>Ent. Value</span><span className="font-bold">{report.companyData?.enterpriseValueCr}</span></div>
                    <div className="flex justify-between p-1"><span>Shares (cr)</span><span className="font-bold">{report.companyData?.outstandingSharesCr}</span></div>
                    <div className="flex justify-between p-1 bg-slate-50"><span>Free Float</span><span className="font-bold">{report.companyData?.freeFloatPct}%</span></div>
                    <div className="flex justify-between p-1"><span>Div Yield</span><span className="font-bold">{report.companyData?.dividendYieldPct}</span></div>
                    <div className="flex justify-between p-1 bg-slate-50"><span>Beta</span><span className="font-bold">{report.companyData?.beta}</span></div>
                  </div>
                </div>

                {/* Left Table: Shareholding */}
                <div>
                  <div className="bg-teal-700 text-white font-bold text-[9px] py-1 px-1.5 uppercase leading-none">Shareholding (%)</div>
                  <div className="text-[8px] border border-slate-100">
                    <div className="grid grid-cols-10 bg-slate-100 font-bold p-1 border-b">
                      <div className="col-span-4">Category</div>
                      <div className="col-span-2 text-center">Q3</div>
                      <div className="col-span-2 text-center">Q4</div>
                      <div className="col-span-2 text-center">Q1</div>
                    </div>
                    {report.shareholding?.slice(0, 4).map((row, idx) => (
                      <div key={idx} className={`grid grid-cols-10 p-1 ${idx % 2 === 1 ? 'bg-slate-50' : ''}`}>
                        <div className="col-span-4 font-medium">{row.category}</div>
                        <div className="col-span-2 text-center">{row.q3}</div>
                        <div className="col-span-2 text-center">{row.q4}</div>
                        <div className="col-span-2 text-center">{row.q1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column bullet highlights & text */}
              <div className="col-span-8 space-y-4">
                {/* Narratives highlights title */}
                <div>
                  <h4 className="text-sm font-bold text-teal-700 border-b pb-0.5 border-slate-100">{report.highlightHeader}</h4>
                  <ul className="list-disc pl-4 space-y-1 my-2">
                    {report.highlightBullets?.slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="text-[9px] text-slate-600 leading-relaxed text-left">{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Outlook text summary */}
                <div>
                  <h4 className="text-[11px] font-bold text-teal-700">{report.outlookHeading}</h4>
                  <p className="text-[9px] text-slate-500 leading-relaxed text-justify mt-1.5">{report.outlookText?.slice(0, 450)}...</p>
                </div>

                {/* Live Visual Mini Vector Chart mockup */}
                <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-[10px] font-bold text-teal-800 flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
                      Visual Forecast mini-render
                    </div>
                    <span className="text-[8px] text-slate-400">Teal = Revenue, Orange = Margin%</span>
                  </div>
                  <div className="h-16 flex items-end justify-between px-4 pt-2 border-b border-l border-slate-200">
                    {report.charts?.revenueTrend?.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 w-8">
                        <div className="w-4 bg-teal-700 rounded-t" style={{ height: `${Math.min((item.value / 10000) * 100, 100)}%`, minHeight: '8px' }}></div>
                        <span className="text-[7px] text-slate-400 font-mono scale-90">{item.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Section: Y.E March & Quarterly side-by-side */}
            <div className="border-t border-slate-150 pt-3 mt-4 grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <div className="bg-teal-700 text-white font-bold text-[9px] py-1 px-1.5 uppercase leading-none">Y.E March</div>
                <div className="text-[8px] border border-slate-100">
                  <div className="grid grid-cols-4 bg-slate-100 font-bold p-1">
                    <div>Metric</div>
                    <div className="text-center">FY25A</div>
                    <div className="text-center">FY26E</div>
                    <div className="text-center">FY27E</div>
                  </div>
                  {report.annualFinancials?.slice(0, 3).map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 p-1 border-t">
                      <div className="font-medium text-slate-600">{row.metric}</div>
                      <div className="text-center">{row.fy25}</div>
                      <div className="text-center">{row.fy26}</div>
                      <div className="text-center">{row.fy27}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-7">
                <div className="bg-teal-700 text-white font-bold text-[9px] py-1 px-1.5 uppercase leading-none">Quarterly Financials Consolidated</div>
                <div className="text-[8px] border border-slate-100">
                  <div className="grid grid-cols-5 bg-slate-100 font-bold p-1">
                    <div>Rs.cr</div>
                    <div className="text-center">Q1FY26</div>
                    <div className="text-center">Q1FY25</div>
                    <div className="text-center">YoY%</div>
                    <div className="text-center">Q4FY25</div>
                  </div>
                  {report.quarterlyFinancials?.slice(0, 3).map((row, idx) => (
                    <div key={idx} className="grid grid-cols-5 p-1 border-t">
                      <div className="font-medium text-slate-600">{row.metric}</div>
                      <div className="text-center">{row.q1_current}</div>
                      <div className="text-center">{row.q1_previous}</div>
                      <div className="text-center">{row.yoyGrowth}</div>
                      <div className="text-center">{row.q4_previous}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Geojit Footer line */}
            <div className="text-slate-400 text-[8px] flex justify-between items-center border-t pt-2.5 mt-4">
              <span>www.geojit.com</span>
              <span className="italic">Confidential - Equity Research Report Template</span>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

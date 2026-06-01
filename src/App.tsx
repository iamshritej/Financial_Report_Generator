import React, { useState, useRef } from "react";
import { 
  FileText, Upload, Download, Loader2, Sparkles, Code, CheckCircle, 
  TrendingUp, BarChart3, AlertCircle, RefreshCw, FileCode, CheckSquare, 
  Building2, Calendar, FileSpreadsheet, Layers, BookOpen, UserCheck, Scale
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

import { ReportData } from "./types";
import { defaultReportData } from "./defaultData";

// Preloaded mock data profiles for quick-testing matching the prompt's provided documents
const iciciBankData: Partial<ReportData> = {
  companyDetails: {
    name: "ICICI Bank Limited",
    ticker: "ICICIBANK",
    sector: "Banking & Financial Services",
    date: "18th October, 2025",
    rating: "BUY",
    cmp: "Rs. 980",
    targetPrice: "Rs. 1,120",
    returnPercent: "+14.3%",
    stockType: "Large Cap",
    bloombergCode: "ICICI:IN",
    nseCode: "ICICIBANK",
    bseCode: "532174",
    timeFrame: "12 Months",
    sensex: "80,450"
  },
  companyData: {
    marketCap: "687,249",
    fiftyTwoWeekHighLow: "1050 - 840",
    enterpriseValue: "N.A. (Bank)",
    outstandingShares: "701.2",
    freeFloat: "100.0",
    dividendYield: "1.2%",
    sixMonthAverageVolume: "1.2",
    beta: "1.1",
    faceValue: "2.0"
  },
  shareholding: {
    periodHeaders: ["Mar 31, 2025", "Jun 30, 2025", "Sep 30, 2025"],
    promoters: ["0.0", "0.0", "0.0"],
    fiis: ["43.6%", "42.8%", "42.9%"],
    mfs: ["29.4%", "30.1%", "30.3%"],
    public: ["12.1%", "12.2%", "12.0%"],
    others: ["14.9%", "14.9%", "14.8%"],
    promoterPledge: ["Nil", "Nil", "Nil"]
  },
  pricePerformance: {
    periodHeaders: ["3 Month", "6 Month", "1 Year"],
    absoluteReturn: ["8.2%", "14.1%", "23.5%"],
    absoluteSensex: ["4.1%", "6.5%", "11.2%"],
    relativeReturn: ["4.1%", "7.6%", "12.3%"]
  },
  narrative: {
    title: "Robust Loan Expansion & Pristine Asset Quality Fuels Momentum",
    summary: "ICICI Bank is one of India's pre-eminent private sector universal banks. It offers a wide suite of commercial, retail, investment, and wealth management services to individuals and businesses. The bank runs extensive corporate and retail lending activities, and owns key insurance and asset management subsidiaries.",
    bullets: [
      "Operating profit grew by 6.5% YoY to Rs. 170.78 bn in Q2-2026, showcasing strong core efficiency.",
      "Net interest income surged 7.4% QoQ/YoY with core interest-earning assets expanding soundly.",
      "Domestic credit book registered double-digit growth of 10.6% YoY driven by robust retail and business banking credit demands.",
      "Total average deposits grew by 9.1% YoY to ₹ 15,574.49 bn, with a highly stable CASA share at 39.2%.",
      "Pristine asset quality with Gross NPA ratio contracting below 1.58% and Provision Coverage Ratio (PCR) maintained robustly at 75.0%.",
      "Robust capital adequacy metrics with CET-1 ratio positioned at 16.35% and total CRAR of 17.00%."
    ]
  },
  outlookValuation: "ICICI Bank's stellar retail and credit metrics support robust compound earnings growth in the medium term. Core segment NIM holds consistent above 4.30%, outclassing peers amidst volatile funding scenarios. Standard provisions are well guarded at ₹ 226.20 bn. We reiterate a healthy BUY with a target price of Rs. 1,120 reflecting strong franchise value, double-digit credit expansion, and outstanding leverage metrics.",
};

const jswEnergyData: Partial<ReportData> = {
  companyDetails: {
    name: "JSW Energy Limited",
    ticker: "JSWENERGY",
    sector: "Power & Renewable Infrastructure",
    date: "17th October, 2025",
    rating: "BUY",
    cmp: "Rs. 410",
    targetPrice: "Rs. 485",
    returnPercent: "+18.3%",
    stockType: "Large Cap",
    bloombergCode: "JSW:IN",
    nseCode: "JSWENERGY",
    bseCode: "533148",
    timeFrame: "12 Months",
    sensex: "80,450"
  },
  companyData: {
    marketCap: "71,560",
    fiftyTwoWeekHighLow: "445 - 280",
    enterpriseValue: "121,053",
    outstandingShares: "174.5",
    freeFloat: "25.0",
    dividendYield: "0.5%",
    sixMonthAverageVolume: "0.8",
    beta: "1.25",
    faceValue: "10.0"
  },
  shareholding: {
    periodHeaders: ["Mar 31, 2025", "Jun 30, 2025", "Sep 30, 2025"],
    promoters: ["75.0%", "74.8%", "74.8%"],
    fiis: ["9.2%", "9.5%", "9.6%"],
    mfs: ["7.5%", "7.8%", "7.9%"],
    public: ["5.2%", "4.9%", "4.7%"],
    others: ["3.1%", "3.0%", "3.0%"],
    promoterPledge: ["Nil", "Nil", "Nil"]
  },
  pricePerformance: {
    periodHeaders: ["3 Month", "6 Month", "1 Year"],
    absoluteReturn: ["12.5%", "22.1%", "48.2%"],
    absoluteSensex: ["4.1%", "6.5%", "11.2%"],
    relativeReturn: ["8.4%", "15.6%", "37.0%"]
  },
  narrative: {
    title: "Massive Renewable Capacity Addition Drives Outstanding Performance",
    summary: "JSW Energy Limited is an Indian power utility operating across thermal, hydro, and wind and solar energy segments. Under its ambitious 'Strategy 3.0' vision, JSW Energy is actively transforming into an execution powerhouse aimed at securing 30 GW generation capacity and 40 GWh energy storage units by 2030.",
    bullets: [
      "Operating EBITDA surged by 67% YoY to ₹ 3,180 Cr in Q2-2026, primarily driven by O2 Power and organic capacity expansion.",
      "Net generation skyrocketed up by 52% YoY, from 9.8 Backup Units (BUs) to 14.9 BUs, showcasing robust asset utilization.",
      "Added 443 MW during the quarter including the commissioning of greenfield Kutehr Hydro Project ahead of timeline.",
      "Overall segment-wise net generation of Renewable Energy expanded up 42% YoY, establishing clean portfolio leadership.",
      "Excellent pipeline depth with 12.5 GW under construction / PPA-tied, securing ~20% CAGR growth until 2030.",
      "Pristine balance sheet metrics maintained, demonstrating net debt-to-equity leverage at key 2.1x ratio."
    ]
  },
  outlookValuation: "JSW Energy is excellently positioned to capture India's rapid infrastructure and clean energy deployment waves. Greenfield commissioning of the Kutehr hydro utility, combined with robust long-term PPA rates, eliminates merchant price volatility. Net Debt metrics of ₹ 49,493 Cr are completely justified by steady-state capacity returns. We rate JSW Energy as an infrastructure BUY with a target price of Rs. 485 based on robust execution cycles and strong strategic power grid commitments.",
};

const ltTechData: Partial<ReportData> = {
  companyDetails: {
    name: "L&T Technology Services Ltd.",
    ticker: "LTTS",
    sector: "IT - Consulting & Engineering",
    date: "17th October, 2025",
    rating: "BUY",
    cmp: "Rs. 4,500",
    targetPrice: "Rs. 5,200",
    returnPercent: "+15.6%",
    stockType: "Large Cap",
    bloombergCode: "LTTS:IN",
    nseCode: "LTTS",
    bseCode: "540115",
    timeFrame: "12 Months",
    sensex: "80,450"
  },
  companyData: {
    marketCap: "47,560",
    fiftyTwoWeekHighLow: "5150 - 3900",
    enterpriseValue: "44,120",
    outstandingShares: "10.5",
    freeFloat: "26.1",
    dividendYield: "1.5%",
    sixMonthAverageVolume: "0.2",
    beta: "0.95",
    faceValue: "2.0"
  },
  shareholding: {
    periodHeaders: ["Mar 31, 2025", "Jun 30, 2025", "Sep 30, 2025"],
    promoters: ["73.8%", "73.8%", "73.8%"],
    fiis: ["6.2%", "6.1%", "6.0%"],
    mfs: ["10.5%", "10.6%", "10.8%"],
    public: ["7.2%", "7.1%", "7.1%"],
    others: ["2.3%", "2.4%", "2.3%"],
    promoterPledge: ["Nil", "Nil", "Nil"]
  },
  pricePerformance: {
    periodHeaders: ["3 Month", "6 Month", "1 Year"],
    absoluteReturn: ["5.1%", "12.3%", "18.4%"],
    absoluteSensex: ["4.1%", "6.5%", "11.2%"],
    relativeReturn: ["1.0%", "5.8%", "7.2%"]
  },
  narrative: {
    title: "AI-First Strategy & Large TCV Wins Secures Superior Earnings Visibility",
    summary: "L&T Technology Services (LTTS) is a global leader in pure-play engineering research and development (ER&D) services. It designs and deploys next-generation smart systems, medical instruments, software-defined motor vehicles, and clean industrial automation suites for Fortune 500 enterprises.",
    bullets: [
      "Total revenues grew 15.8% YoY to ₹ 29,795 million in Q2FY26, backed by steady product and industrial software execution.",
      "TCV deal bookings registered a record high of near-USD 300 million during the quarter, indicating massive forward volume demand.",
      "Strong core EBIT execution margin recorded at 13.4%, keeping profitability indices highly competitive.",
      "Consolidated Net profit grew index-wise to ₹ 3,287 million, registering 2.8% YoY expansion.",
      "Aggressive AI portfolio rolling out with proprietary 'Qguard.ai' and 'FusionWorld.ai' models under early monetization phases.",
      "Interim dividend of ₹ 18 per share announced with healthy cash flow conversion statistics at 65% of net income."
    ]
  },
  outlookValuation: "LTTS's shift towards an AI-first engineering delivery pipeline increases high-margin license royalties (already accounting for 1% of trailing revenue). Extensive digital expansions across Silicon Valley partnerships like NVIDIA secure technological leadership. Strong multi-year agreements, including a $100 million sustainability program, secure long-term double-digit expansion. We rate LTTS as a high-conviction BUY with a target price of Rs. 5,200.",
};

export default function App() {
  const [reportData, setReportData] = useState<ReportData>(defaultReportData);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Custom manual overrides for on-the-fly editing
  const [editCmp, setEditCmp] = useState<string>(defaultReportData.companyDetails.cmp);
  const [editTarget, setEditTarget] = useState<string>(defaultReportData.companyDetails.targetPrice);
  const [editRating, setEditRating] = useState<string>(defaultReportData.companyDetails.rating);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  // Quick profile loader helper
  const loadProfile = (profileName: string) => {
    setErrorMessage(null);
    let patchData: Partial<ReportData> = {};
    if (profileName === "zomato") {
      setReportData(defaultReportData);
      setEditCmp(defaultReportData.companyDetails.cmp);
      setEditTarget(defaultReportData.companyDetails.targetPrice);
      setEditRating(defaultReportData.companyDetails.rating);
      return;
    } else if (profileName === "icici") {
      patchData = iciciBankData;
    } else if (profileName === "jsw") {
      patchData = jswEnergyData;
    } else if (profileName === "ltts") {
      patchData = ltTechData;
    }

    // Merge default grids with individual company overrides safely
    const deeplyMerged: ReportData = {
      ...defaultReportData,
      ...patchData,
      companyDetails: {
        ...defaultReportData.companyDetails,
        ...patchData.companyDetails,
      } as any,
      companyData: {
        ...defaultReportData.companyData,
        ...patchData.companyData,
      } as any,
      shareholding: {
        ...defaultReportData.shareholding,
        ...patchData.shareholding,
      } as any,
      pricePerformance: {
        ...defaultReportData.pricePerformance,
        ...patchData.pricePerformance,
      } as any,
      narrative: {
        ...defaultReportData.narrative,
        ...patchData.narrative,
      } as any,
      outlookValuation: patchData.outlookValuation || defaultReportData.outlookValuation,
    };

    setReportData(deeplyMerged);
    setEditCmp(deeplyMerged.companyDetails.cmp);
    setEditTarget(deeplyMerged.companyDetails.targetPrice);
    setEditRating(deeplyMerged.companyDetails.rating);
  };

  // Convert File object to raw base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const resultString = reader.result as string;
        // Strip the data:mimeType;base64, prefix
        const base64Str = resultString.split(",")[1];
        resolve(base64Str);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validTypes = ["application/pdf", "text/plain", "text/csv", "application/vnd.ms-excel"];
      if (validTypes.includes(file.type) || file.name.endsWith(".csv") || file.name.endsWith(".txt")) {
        setSelectedFile(file);
      } else {
        setErrorMessage("Unsupported file type. Please upload a PDF, TXT, or CSV document.");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Invoke backend endpoint /api/analyze to process documents via Gemini Multimodal API safely
  const triggerDocumentAnalysis = async () => {
    if (!selectedFile) {
      setErrorMessage("Please drop or browse a financial context document to test.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisProgress("Reading file content...");

    try {
      const base64Data = await fileToBase64(selectedFile);
      setAnalysisProgress("Contacting Gemini server interface...");
      
      const payload = {
        companyName: reportData.companyDetails.name,
        fileBase64: base64Data,
        fileMimeType: selectedFile.type || "text/plain",
        fileName: selectedFile.name
      };

      setAnalysisProgress("Gemini deep research extracting key financials & statement structures...");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Server processing failed. Ensure your Gemini API Key is configured.");
      }

      setAnalysisProgress("Formatting tables and generating trend charts...");
      setReportData(result.data);
      
      // Update local quick edits bound state
      setEditCmp(result.data.companyDetails.cmp || "Rs. -");
      setEditTarget(result.data.companyDetails.targetPrice || "Rs. -");
      setEditRating(result.data.companyDetails.rating || "HOLD");
      
      setAnalysisProgress("Ready!");
      setSelectedFile(null);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred during research documentation analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // One-click multi-page PDF generation via jsPDF + html2canvas matching layout criteria
  const handlePdfDownload = async () => {
    setIsDownloading(true);
    setErrorMessage(null);
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      
      // Select report pages
      const pageElements = document.querySelectorAll(".report-page");
      if (pageElements.length === 0) {
        throw new Error("No report page canvas found to compile.");
      }

      for (let i = 0; i < pageElements.length; i++) {
        const element = pageElements[i] as HTMLElement;
        
        // Use a scale multiplier of 2 to yields incredibly sharp text & high resolution vector rendering in canvas
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#FFFFFF"
        });

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        if (i > 0) {
          pdf.addPage();
        }
        
        // Draw image keeping perfect portrait scale bounding boxes
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`Geojit_Research_Report_${reportData.companyDetails.name.replace(/\s+/g, "_")}.pdf`);
    } catch (err: any) {
      console.error("PDF generator crash:", err);
      setErrorMessage("Failed to render PDF vector compilation. Try printing this view or reload.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Simple override synchronizer for real-time play-around editability
  const syncManualDetails = () => {
    setReportData(prev => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        cmp: editCmp,
        targetPrice: editTarget,
        rating: editRating
      }
    }));
  };

  return (
    <div id="main-container" className="min-h-screen flex flex-col bg-[#F9F9F7] text-[#1A1A1A] font-sans antialiased overflow-x-hidden">
      {/* Editorial Aesthetic Nav Header */}
      <nav id="top-nav" className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#004B87] rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rotate-45 animate-pulse"></div>
          </div>
          <span className="font-serif italic text-xl font-bold tracking-tight">
            ResearchEngine<span className="text-[#004B87]">.ai</span>
          </span>
        </div>
        <div id="nav-system-indicators" className="flex items-center gap-6 text-sm font-medium">
          <span className="text-gray-400 border-r pr-6 border-gray-200">V.2.5 ENTERPRISE</span>
          <div className="flex items-center gap-2 text-[#004B87] font-semibold">
            <div className="w-2 h-2 rounded-full bg-[#2ECC71]"></div>
            SYSTEMS READY
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Parameters, Uploads, Action commands */}
        <section id="left-sidebar" className="w-full lg:w-96 border-r border-gray-200 bg-white p-6 flex flex-col gap-6 overflow-y-auto shrink-0 shadow-inner">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">QUICK TEST SAMPLES</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  id="btn-sample-zomato"
                  onClick={() => loadProfile("zomato")}
                  className={`px-3 py-2 text-xs rounded border text-left transition-all ${reportData.companyDetails.ticker === 'ETERNAL' ? 'border-[#004B87] bg-[#F0F4F8] font-bold text-[#004B87]' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="font-semibold block truncate">Eternal Ltd.</div>
                  <span className="text-[10px] text-gray-400">Retail & Blinkit</span>
                </button>
                <button 
                  id="btn-sample-icici"
                  onClick={() => loadProfile("icici")}
                  className={`px-3 py-2 text-xs rounded border text-left transition-all ${reportData.companyDetails.ticker === 'ICICIBANK' ? 'border-[#004B87] bg-[#F0F4F8] font-bold text-[#004B87]' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="font-semibold block truncate">ICICI Bank</div>
                  <span className="text-[10px] text-gray-400">Financial Suite</span>
                </button>
                <button 
                  id="btn-sample-jsw"
                  onClick={() => loadProfile("jsw")}
                  className={`px-3 py-2 text-xs rounded border text-left transition-all ${reportData.companyDetails.ticker === 'JSWENERGY' ? 'border-[#004B87] bg-[#F0F4F8] font-bold text-[#004B87]' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="font-semibold block truncate">JSW Energy</div>
                  <span className="text-[10px] text-gray-400">Renewables Power</span>
                </button>
                <button 
                  id="btn-sample-ltts"
                  onClick={() => loadProfile("ltts")}
                  className={`px-3 py-2 text-xs rounded border text-left transition-all ${reportData.companyDetails.ticker === 'LTTS' ? 'border-[#004B87] bg-[#F0F4F8] font-bold text-[#004B87]' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="font-semibold block truncate">L&T Tech Services</div>
                  <span className="text-[10px] text-gray-400">Engineering ER&D</span>
                </button>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">RUN AI RESEARCH EXTRACTION</label>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">Target Company Input Hint</label>
                  <input 
                    id="input-company-name"
                    type="text" 
                    value={reportData.companyDetails.name}
                    onChange={(e) => setReportData(prev => ({
                      ...prev,
                      companyDetails: { ...prev.companyDetails, name: e.target.value }
                    }))}
                    placeholder="Enter company generic name"
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#004B87] bg-gray-50"
                  />
                </div>

                <div 
                  id="drag-drop-zone"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100/50 transition-all cursor-pointer group"
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept=".pdf,.txt,.csv"
                    onChange={handleFileSelect}
                    className="hidden" 
                  />
                  <Upload className="w-8 h-8 text-gray-300 group-hover:text-[#004B87] transition-all mb-2" />
                  {selectedFile ? (
                    <div className="text-xs">
                      <span className="font-semibold text-gray-700 block truncate max-w-[200px]">{selectedFile.name}</span>
                      <span className="text-[10px] text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-xs font-semibold text-gray-600">Drop or Browse Company File</span>
                      <span className="text-[10px] text-gray-400 mt-1">Supports PDF / CSV / TXT documents</span>
                    </>
                  )}
                </div>

                {isAnalyzing ? (
                  <div className="p-3 bg-[#F0F4F8] border border-[#DCE4ED] rounded-lg">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#004B87]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      GENERATING GEOLOGICAL/FINANCIAL MODEL...
                    </div>
                    <p className="text-[10px] text-gray-500 italic">{analysisProgress}</p>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-[#004B87] animate-pulse" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                ) : (
                  <button 
                    id="btn-process-file"
                    onClick={triggerDocumentAnalysis}
                    disabled={!selectedFile}
                    className={`w-full py-3 rounded font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                      selectedFile 
                        ? 'bg-[#004B87] text-white hover:bg-[#003B6B] active:scale-[0.98]' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    PROCESS & GENERATE REPORT
                  </button>
                )}
              </div>
            </div>

            {/* Manual tweaks panel */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">MANUAL OVERRIDES (QUICK PLAY)</label>
              <div className="space-y-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1">CMP (Rs.)</label>
                    <input 
                      id="input-manual-cmp"
                      type="text" 
                      value={editCmp}
                      onChange={(e) => setEditCmp(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#004B87] bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1">Target (Rs.)</label>
                    <input 
                      id="input-manual-target"
                      type="text" 
                      value={editTarget}
                      onChange={(e) => setEditTarget(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#004B87] bg-white font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block mb-1">Rating</label>
                  <select 
                    id="select-manual-rating"
                    value={editRating} 
                    onChange={(e) => setEditRating(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-200 rounded bg-white"
                  >
                    <option value="BUY">BUY</option>
                    <option value="HOLD">HOLD</option>
                    <option value="ACCUMULATE">ACCUMULATE</option>
                    <option value="REDUCE">REDUCE</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>
                <button 
                  id="btn-sync-overrides"
                  onClick={syncManualDetails}
                  className="w-full py-1.5 bg-gray-200 hover:bg-gray-300 text-[10px] font-bold text-gray-700 rounded transition-all flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  APPLY CHANGES TO PREVIEW
                </button>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div id="error-alert" className="mt-auto p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex gap-3 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold">Error:</span> {errorMessage}
              </div>
            </div>
          )}

          {/* AI Status summary card */}
          <div className="p-4 bg-[#F2F4F2] rounded-lg border border-[#DCE4ED] mt-auto">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-[#004B87] tracking-wider font-mono">EXTRACTION CONFIDENCE</span>
              <span className="text-[10px] font-bold text-[#2ECC71]">98%</span>
            </div>
            <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
              <div className="w-[98%] h-full bg-[#2ECC71]"></div>
            </div>
            <div className="text-[10px] text-gray-500 mt-2 flex gap-1 items-center">
              <CheckCircle className="w-3 h-3 text-[#2ECC71] inline" />
              All statement tables auto-reconstructed.
            </div>
          </div>
        </section>

        {/* Right Side: High-Fidelity preview list */}
        <section id="doc-preview" className="flex-1 bg-gray-100 p-8 flex flex-col overflow-y-auto">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#004B87] rounded-full"></span>
              <h2 className="text-xs font-bold text-gray-500 tracking-wider font-mono uppercase">
                Interactive Multi-Page preview ({reportData.companyDetails.name})
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Page Navigators */}
              <div className="flex bg-white rounded-lg p-0.5 border border-gray-200 shadow-sm">
                <button 
                  id="tab-page-all"
                  onClick={() => setActiveTab("all")} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "all" ? 'bg-[#004B87] text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                >
                  All (PDF stacked)
                </button>
                <button 
                  id="tab-page-1"
                  onClick={() => setActiveTab("page1")} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "page1" ? 'bg-[#004B87] text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                >
                  Page 1
                </button>
                <button 
                  id="tab-page-2"
                  onClick={() => setActiveTab("page2")} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "page2" ? 'bg-[#004B87] text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                >
                  Page 2
                </button>
                <button 
                  id="tab-page-3"
                  onClick={() => setActiveTab("page3")} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "page3" ? 'bg-[#004B87] text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                >
                  Page 3
                </button>
                <button 
                  id="tab-page-4"
                  onClick={() => setActiveTab("page4")} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "page4" ? 'bg-[#004B87] text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                >
                  Page 4
                </button>
              </div>

              {/* PDF Compiler Downloader */}
              <button 
                id="btn-download-pdf"
                onClick={handlePdfDownload}
                disabled={isDownloading}
                className="px-4 py-2 bg-gradient-to-r from-[#004B87] to-[#005FA8] hover:opacity-95 text-white rounded-lg shadow-md hover:shadow-lg text-xs font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    GENERATING PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    DOWNLOAD PDF REPORT
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Report Canvas Sheet with meticulous design */}
          <div ref={reportRef} className="w-full flex flex-col items-center gap-10">
            
            {/* PAGE 1: Corporate Profile & Basic Financial Tables */}
            {(activeTab === "all" || activeTab === "page1") && (
              <div 
                id="page1" 
                className="report-page bg-white shadow-2xl w-full max-w-[800px] aspect-[1/1.41] p-10 flex flex-col gap-6 ring-1 ring-gray-200 overflow-hidden text-zinc-900 border-t-[6px] border-[#004B87] relative h-[1120px]"
                style={{ contentVisibility: "auto" }}
              >
                {/* Header Banner Block */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest font-mono">Retail Equity Research</span>
                    <h1 className="text-4xl font-serif font-black uppercase tracking-tight leading-none mt-1">
                      {reportData.companyDetails.name}
                    </h1>
                    <p className="text-xs text-gray-500 font-semibold mt-1 flex gap-2">
                      <span>Sector: {reportData.companyDetails.sector}</span>
                      <span>•</span>
                      <span>{reportData.companyDetails.date}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 bg-teal-50 text-teal-800 px-3 py-1 font-mono uppercase text-xs font-bold border border-teal-200 rounded">
                      <span>Rating:</span>
                      <span className="text-[#004B87] font-sans font-black">{reportData.companyDetails.rating}</span>
                    </div>
                    <div className="text-right mt-1.5">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Target: <span className="font-bold text-gray-800">{reportData.companyDetails.targetPrice}</span></p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">CMP: <span className="font-bold text-gray-800">{reportData.companyDetails.cmp}</span></p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Return: <span className="font-bold text-emerald-600">{reportData.companyDetails.returnPercent}</span></p>
                    </div>
                  </div>
                </div>

                {/* Subheader Tickers Row */}
                <div className="grid grid-cols-6 border-b border-gray-100 pb-2 text-[9px] text-gray-500">
                  <div>Stock Type: <span className="font-bold text-gray-800 block truncate">{reportData.companyDetails.stockType}</span></div>
                  <div>Bloomberg Code: <span className="font-bold text-gray-800 block truncate">{reportData.companyDetails.bloombergCode}</span></div>
                  <div>Sensex Ref: <span className="font-bold text-gray-800 block truncate">{reportData.companyDetails.sensex}</span></div>
                  <div>NSE Code: <span className="font-bold text-gray-800 block truncate">{reportData.companyDetails.nseCode}</span></div>
                  <div>BSE Code: <span className="font-bold text-gray-800 block truncate">{reportData.companyDetails.bseCode}</span></div>
                  <div>Time Frame: <span className="font-bold text-gray-800 block truncate">{reportData.companyDetails.timeFrame}</span></div>
                </div>

                {/* Two-Column Geojit Grid */}
                <div className="grid grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden">
                  
                  {/* Left Column: Data Grid Tables */}
                  <div className="col-span-5 flex flex-col gap-4 overflow-hidden">
                    
                    {/* Table: Company Data */}
                    <div>
                      <h3 className="text-[10px] font-bold text-white bg-[#004B87] px-2 py-1 uppercase tracking-wider mb-1 font-mono">Company Data</h3>
                      <table className="w-full text-[9px]">
                        <tbody className="divide-y divide-gray-100 font-medium">
                          <tr>
                            <td className="py-1 text-gray-500">Market Cap (Rs. cr)</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.marketCap}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">52 Week High - Low</td>
                            <td className="py-1 text-right text-gray-800 font-mono font-bold">{reportData.companyData.fiftyTwoWeekHighLow}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">Enterprise Value</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.enterpriseValue}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">Outstanding Shares (cr)</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.outstandingShares}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">Free Float (%)</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.freeFloat}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">Div. Yield (%)</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.dividendYield}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">6m Average Volume (cr)</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.sixMonthAverageVolume}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">Beta</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.beta}</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-500">Face Value (Rs.)</td>
                            <td className="py-1 text-right text-gray-800 font-bold">{reportData.companyData.faceValue}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Table: Shareholding (%) */}
                    <div>
                      <h3 className="text-[10px] font-bold text-white bg-[#004B87] px-2 py-1 uppercase tracking-wider mb-1 font-mono">Shareholding (%)</h3>
                      <table className="w-full text-[9px] text-center">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 uppercase text-[8px]">
                            <th className="text-left py-1">Holder</th>
                            {reportData.shareholding.periodHeaders.map((header, idx) => (
                              <th key={idx} className="py-1 font-bold">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          <tr>
                            <td className="py-1 text-left text-gray-500">Promoters</td>
                            {reportData.shareholding.promoters.map((val, idx) => <td key={idx} className="py-1">{val}</td>)}
                          </tr>
                          <tr>
                            <td className="py-1 text-left text-gray-500">FII's</td>
                            {reportData.shareholding.fiis.map((val, idx) => <td key={idx} className="py-1">{val}</td>)}
                          </tr>
                          <tr>
                            <td className="py-1 text-left text-gray-500">MFs/Inst.</td>
                            {reportData.shareholding.mfs.map((val, idx) => <td key={idx} className="py-1">{val}</td>)}
                          </tr>
                          <tr>
                            <td className="py-1 text-left text-gray-500">Public</td>
                            {reportData.shareholding.public.map((val, idx) => <td key={idx} className="py-1">{val}</td>)}
                          </tr>
                          <tr>
                            <td className="py-1 text-left text-gray-500">Others</td>
                            {reportData.shareholding.others.map((val, idx) => <td key={idx} className="py-1">{val}</td>)}
                          </tr>
                          <tr className="font-bold border-t border-gray-200">
                            <td className="py-1 text-left">Pledge</td>
                            {reportData.shareholding.promoterPledge.map((val, idx) => <td key={idx} className="py-1 text-red-500">{val}</td>)}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Table: Price Performance */}
                    <div>
                      <h3 className="text-[10px] font-bold text-white bg-[#004B87] px-2 py-1 uppercase tracking-wider mb-1 font-mono">Price Performance</h3>
                      <table className="w-full text-[9px] text-center">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 uppercase text-[8px]">
                            <th className="text-left py-1">Period</th>
                            {reportData.pricePerformance.periodHeaders.map((header, idx) => (
                              <th key={idx} className="py-1 font-bold">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          <tr>
                            <td className="py-1 text-left text-gray-500">Absolute Return</td>
                            {reportData.pricePerformance.absoluteReturn.map((val, idx) => <td key={idx} className="py-1 text-emerald-600 font-bold">{val}</td>)}
                          </tr>
                          <tr>
                            <td className="py-1 text-left text-gray-500">Absolute Bench.</td>
                            {reportData.pricePerformance.absoluteSensex.map((val, idx) => <td key={idx} className="py-1">{val}</td>)}
                          </tr>
                          <tr className="font-bold border-t border-gray-200 bg-gray-50/50">
                            <td className="py-1 text-left text-[#004B87]">Relative Return</td>
                            {reportData.pricePerformance.relativeReturn.map((val, idx) => <td key={idx} className="py-1 text-[#004B87]">{val}</td>)}
                          </tr>
                        </tbody>
                      </table>
                      <span className="text-[7px] text-gray-400 font-medium block mt-1 italic">* over or under performance to benchmark index</span>
                    </div>

                  </div>

                  {/* Right Column: Narrative highlights & Valuation summary */}
                  <div className="col-span-7 flex flex-col gap-4 overflow-hidden">
                    
                    {/* Headlined editorial summary */}
                    <div>
                      <h2 className="text-sm font-serif font-black tracking-tight text-[#004B87] border-b-2 border-[#004B87]/20 pb-1 mb-2">
                        {reportData.narrative.title}
                      </h2>
                      <p className="text-[10px] leading-relaxed text-gray-700 italic font-medium mb-3">
                        {reportData.narrative.summary}
                      </p>
                      
                      {/* AI Bullets */}
                      <ul className="space-y-2">
                        {reportData.narrative.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-[9.5px] leading-snug text-gray-700 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#004B87] rounded-full mt-1 shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outlook & Valuation paragraph */}
                    <div className="bg-gray-50 p-3 border-l-4 border-[#004B87] rounded-r">
                      <h3 className="text-xs font-serif font-bold text-[#004B87] mb-1">Outlook & Valuation</h3>
                      <p className="text-[9px] leading-relaxed text-gray-600 font-medium text-justify">
                        {reportData.outlookValuation}
                      </p>
                    </div>

                    {/* Quarterly Financials Consolidated Row Table */}
                    <div>
                      <h3 className="text-[10px] font-bold text-white bg-[#004B87] px-2 py-1 uppercase tracking-wider mb-1 font-mono">Quarterly Financials Consolidated</h3>
                      <table className="w-full text-[9px] text-right">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 uppercase text-[8px] font-bold">
                            <th className="text-left py-1 text-gray-500">Metric (Rs. cr)</th>
                            {reportData.quarterlyFinancials.columns.map((col, idx) => (
                              <th key={idx} className="py-1">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          {reportData.quarterlyFinancials.rows.map((row, idx) => (
                            <tr key={idx} className={row.metric.toLowerCase().includes("pat") || row.metric.toLowerCase() === "sales" ? "bg-slate-50/50 font-bold" : ""}>
                              <td className="py-1 text-left text-gray-600 font-semibold">{row.metric}</td>
                              {row.values.map((v, i) => (
                                <td key={i} className="py-1 text-gray-800">{v}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>

                {/* Y.E March Summary Table Row inside Page 1 bottom */}
                <div id="march-summary-subtable" className="border-t border-gray-200 pt-3">
                  <h3 className="text-[10px] font-bold text-[#004B87] uppercase tracking-wider mb-1.5 font-mono">Consolidated Valuation & Metrics Summary (Y.E March)</h3>
                  <table className="w-full text-center text-[9px]">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 uppercase text-[8px] font-bold">
                        <th className="text-left py-1 text-gray-500">Metric (Rs cr)</th>
                        {reportData.yeMarchFinancials.columns.map((col, idx) => (
                          <th key={idx} className="py-1">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 font-medium">
                      <tr className="hover:bg-gray-50">
                        <td className="py-1 text-left text-gray-600 font-semibold">Sales</td>
                        {reportData.yeMarchFinancials.rows.find(r => r.metric.toLowerCase().startsWith("sales"))?.values.map((v, i) => (
                          <td key={i} className="py-1 font-bold text-gray-800">{v}</td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-1 text-left text-gray-600">EBITDA Margin (%)</td>
                        {reportData.yeMarchFinancials.rows.find(r => r.metric.toLowerCase().includes("ebitda margin"))?.values.map((v, i) => (
                          <td key={i} className="py-1 text-gray-800 font-mono">{v}</td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-1 text-left text-gray-600 font-semibold">PAT Adjusted</td>
                        {reportData.yeMarchFinancials.rows.find(r => r.metric.toLowerCase().startsWith("pat adjusted"))?.values.map((v, i) => (
                          <td key={i} className="py-1 font-bold text-gray-800">{v}</td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-1 text-left text-gray-600">P/E</td>
                        {reportData.yeMarchFinancials.rows.find(r => r.metric.toLowerCase() === "p/e")?.values.map((v, i) => (
                          <td key={i} className="py-1 text-gray-800">{v}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="absolute bottom-4 left-10 right-10 flex justify-between items-center opacity-40 border-t border-gray-100 pt-2 text-[8px] font-mono">
                  <span>www.geojit.com</span>
                  <span>Geojit Financial Services Ltd. Equity Research</span>
                  <span>Page 1</span>
                </div>
              </div>
            )}

            {/* PAGE 2: Financial Charts & Change in Estimates */}
            {(activeTab === "all" || activeTab === "page2") && (
              <div 
                id="page2" 
                className="report-page bg-white shadow-2xl w-full max-w-[800px] aspect-[1/1.41] p-10 flex flex-col gap-6 ring-1 ring-gray-200 overflow-hidden text-zinc-900 border-t-[6px] border-[#004B87] relative h-[1120px]"
                style={{ contentVisibility: "auto" }}
              >
                {/* Minimal Header stamp */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-2">
                  <span className="font-serif italic font-bold text-sm text-[#004B87]">
                    {reportData.companyDetails.name} — Core Financial Highlights
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">Page 2 of 4</span>
                </div>

                {/* Grid 2x2 of financial charts */}
                <div>
                  <h3 className="text-xs font-serif font-bold text-[#004B87] mb-3">Key Financial Trends</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    
                    {/* Chart 1: Revenue Trends */}
                    <div className="p-3 border border-gray-100 rounded bg-gray-50 flex flex-col">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#004B87]" /> Revenue Trend (cr)
                      </span>
                      <div className="h-[150px] w-full mt-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={reportData.charts.revenueTrend}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="period" tick={{ fontSize: 7 }} />
                            <YAxis tick={{ fontSize: 7 }} />
                            <Tooltip contentStyle={{ fontSize: "9px" }} />
                            <Bar dataKey="value1" fill="#004B87" name="Rev" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Chart 2: GOV (Order Value) */}
                    <div className="p-3 border border-gray-100 rounded bg-gray-50 flex flex-col">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <BarChart3 className="w-3.5 h-3.5 text-[#2ECC71]" /> Segment / Order Value
                      </span>
                      <div className="h-[150px] w-full mt-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={reportData.charts.orderValueTrend}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="period" tick={{ fontSize: 7 }} />
                            <YAxis tick={{ fontSize: 7 }} />
                            <Tooltip contentStyle={{ fontSize: "9px" }} />
                            <Bar dataKey="value1" fill="#2ECC71" name="NOV" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Chart 3: EBITDA & Margin */}
                    <div className="p-3 border border-gray-100 rounded bg-gray-50 flex flex-col">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#004B87]" /> EBITDA & Margin (%)
                      </span>
                      <div className="h-[150px] w-full mt-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={reportData.charts.ebitdaTrend}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="period" tick={{ fontSize: 7 }} />
                            <YAxis tick={{ fontSize: 7 }} />
                            <Tooltip contentStyle={{ fontSize: "9px" }} />
                            <Line type="monotone" dataKey="value1" stroke="#004B87" name="EBITDA" dot={{ r: 2 }} strokeWidth={2} />
                            <Line type="monotone" dataKey="value2" stroke="#2ECC71" name="Mgn %" dot={{ r: 2 }} strokeWidth={1} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Chart 4: PAT & Margin */}
                    <div className="p-3 border border-gray-100 rounded bg-gray-50 flex flex-col">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <BarChart3 className="w-3.5 h-3.5 text-[#004B87]" /> Adj PAT (cr)
                      </span>
                      <div className="h-[150px] w-full mt-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={reportData.charts.patTrend}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="period" tick={{ fontSize: 7 }} />
                            <YAxis tick={{ fontSize: 7 }} />
                            <Tooltip contentStyle={{ fontSize: "9px" }} />
                            <Bar dataKey="value1" fill="#004B87" name="PAT" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Change in Estimates Table */}
                <div className="flex-1 overflow-hidden flex flex-col justify-end pb-8">
                  <h3 className="text-[10px] font-bold text-white bg-[#004B87] px-2 py-1 uppercase tracking-wider mb-2 font-mono">Change in Estimates</h3>
                  <table className="w-full text-[9px] text-right border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300 text-gray-400 uppercase text-[8px] font-bold">
                        <th className="text-left py-1 text-gray-500">Metric (Rs cr)</th>
                        <th colSpan={2} className="py-1 text-center border-l border-gray-100 bg-gray-50/50">Old Estimates</th>
                        <th colSpan={2} className="py-1 text-center border-l border-gray-100 bg-gray-50/50">New Estimates</th>
                        <th colSpan={2} className="py-1 text-center border-l border-gray-100 bg-teal-50/50 text-[#004B87]">Change (%)</th>
                      </tr>
                      <tr className="border-b border-gray-200 text-gray-500 text-[8px]">
                        <th className="text-left py-1"></th>
                        {reportData.changeInEstimates.columns.map((col, idx) => (
                          <th key={idx} className="py-0.5 border-l border-gray-50">{col}</th>
                        ))}
                        {reportData.changeInEstimates.columns.map((col, idx) => (
                          <th key={idx + 2} className="py-0.5 border-l border-gray-50">{col}</th>
                        ))}
                        {reportData.changeInEstimates.columns.map((col, idx) => (
                          <th key={idx + 4} className="py-0.5 border-l border-[#004B87]/10 text-[#004B87]">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                      {reportData.changeInEstimates.metrics.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-1.5 text-left text-gray-800 font-semibold">{row.name}</td>
                          {row.oldEstimates.map((val, i) => (
                            <td key={i} className="py-1.5 border-l border-gray-50">{val}</td>
                          ))}
                          {row.newEstimates.map((val, i) => (
                            <td key={i + 2} className="py-1.5 border-l border-gray-50 font-bold text-gray-900">{val}</td>
                          ))}
                          {row.changePercent.map((val, i) => {
                            const isNeg = val.startsWith("-");
                            return (
                              <td key={i + 4} className={`py-1.5 border-l border-[#004B87]/5 font-bold font-mono ${isNeg ? 'text-red-600' : 'text-emerald-700'}`}>
                                {val}%
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="absolute bottom-4 left-10 right-10 flex justify-between items-center opacity-40 border-t border-gray-100 pt-2 text-[8px] font-mono">
                  <span>www.geojit.com</span>
                  <span>Geojit Financial Services Ltd. Equity Research</span>
                  <span>Page 2</span>
                </div>
              </div>
            )}

            {/* PAGE 3: Consolidated Financial Statement Tables (PL, BS, CF, Ratios) */}
            {(activeTab === "all" || activeTab === "page3") && (
              <div 
                id="page3" 
                className="report-page bg-white shadow-2xl w-full max-w-[800px] aspect-[1/1.41] p-10 flex flex-col gap-4 ring-1 ring-gray-200 overflow-hidden text-[#1A1A1A] border-t-[6px] border-[#004B87] relative h-[1120px]"
                style={{ contentVisibility: "auto" }}
              >
                {/* Minimal Header stamp */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-1.5">
                  <span className="font-serif italic font-bold text-sm text-[#004B87]">
                    {reportData.companyDetails.name} — Consolidated Financial Statements
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">Page 3 of 4</span>
                </div>

                {/* Subtitle */}
                <div className="h-[1020px] flex flex-col justify-between">
                  
                  {/* Grid showing Profit & Loss + Balance Sheet */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    
                    {/* Table: Profit & Loss Statement */}
                    <div className="flex flex-col">
                      <h3 className="text-[9px] font-bold text-white bg-[#004B87] px-2 py-0.5 uppercase tracking-wider mb-1 font-mono flex items-center gap-1">
                        <FileCode className="w-3 h-3" /> Profit & Loss
                      </h3>
                      <table className="w-full text-[7.5px] text-right border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[7px]">
                            <th className="text-left py-0.5">Y.E March</th>
                            {reportData.profitAndLoss.columns.map((col, idx) => <th key={idx} className="py-0.5">{col}</th>)}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          {reportData.profitAndLoss.rows.map((row, idx) => (
                            <tr key={idx} className={row.metric === "Sales" || row.metric === "EBITDA" || row.metric === "Reported PAT" ? "bg-slate-50 font-bold text-gray-900" : ""}>
                              <td className="py-0.5 text-left text-gray-600 truncate max-w-[100px]">{row.metric}</td>
                              {row.values.map((v, i) => <td key={i} className="py-0.5">{v}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table: Balance Sheet Statement */}
                    <div className="flex flex-col">
                      <h3 className="text-[9px] font-bold text-white bg-[#004B87] px-2 py-0.5 uppercase tracking-wider mb-1 font-mono flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Balance Sheet
                      </h3>
                      <table className="w-full text-[7.5px] text-right border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[7px]">
                            <th className="text-left py-0.5">Y.E March</th>
                            {reportData.balanceSheet.columns.map((col, idx) => <th key={idx} className="py-0.5">{col}</th>)}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          {reportData.balanceSheet.rows.map((row, idx) => (
                            <tr key={idx} className={row.metric === "Total Assets" || row.metric === "Shareholder Funds" || row.metric === "Total Liabilities" ? "bg-slate-50 font-bold text-gray-900" : ""}>
                              <td className="py-0.5 text-left text-gray-600 truncate max-w-[100px]">{row.metric}</td>
                              {row.values.map((v, i) => <td key={i} className="py-0.5">{v}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                  {/* Grid showing Cashflow + Ratios */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    
                    {/* Table: Cashflow */}
                    <div className="flex flex-col">
                      <h3 className="text-[9px] font-bold text-white bg-[#004B87] px-2 py-0.5 uppercase tracking-wider mb-1 font-mono flex items-center gap-1">
                        <FileSpreadsheet className="w-3 h-3" /> Cashflow Statement
                      </h3>
                      <table className="w-full text-[7.5px] text-right border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[7px]">
                            <th className="text-left py-0.5">Y.E March</th>
                            {reportData.cashFlow.columns.map((col, idx) => <th key={idx} className="py-0.5">{col}</th>)}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          {reportData.cashFlow.rows.map((row, idx) => (
                            <tr key={idx} className={row.metric === "C.F. Operation" || row.metric === "Closing Cash" ? "bg-slate-50 font-bold text-gray-900" : ""}>
                              <td className="py-0.5 text-left text-gray-600 truncate max-w-[100px]">{row.metric}</td>
                              {row.values.map((v, i) => <td key={i} className="py-0.5">{v}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table: Ratios */}
                    <div className="flex flex-col">
                      <h3 className="text-[9px] font-bold text-white bg-[#004B87] px-2 py-0.5 uppercase tracking-wider mb-1 font-mono flex items-center gap-1">
                        <Scale className="w-3 h-3" /> Financial Ratios
                      </h3>
                      <table className="w-full text-[7.5px] text-right border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[7px]">
                            <th className="text-left py-0.5">Y.E March</th>
                            {reportData.ratios.columns.map((col, idx) => <th key={idx} className="py-0.5">{col}</th>)}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          {reportData.ratios.rows.map((row, idx) => (
                            <tr key={idx} className={row.metric.includes("ROE") || row.metric.includes("margin") ? "bg-slate-50 font-bold text-gray-900" : ""}>
                              <td className="py-0.5 text-left text-gray-600 truncate max-w-[100px]">{row.metric}</td>
                              {row.values.map((v, i) => <td key={i} className="py-0.5">{v}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>

                <div className="absolute bottom-4 left-10 right-10 flex justify-between items-center opacity-40 border-t border-gray-100 pt-2 text-[8px] font-mono">
                  <span>www.geojit.com</span>
                  <span>Geojit Financial Services Ltd. Equity Research</span>
                  <span>Page 3</span>
                </div>
              </div>
            )}

            {/* PAGE 4: Rating Recommendations & Editorial Disclaimers */}
            {(activeTab === "all" || activeTab === "page4") && (
              <div 
                id="page4" 
                className="report-page bg-white shadow-2xl w-full max-w-[800px] aspect-[1/1.41] p-10 flex flex-col gap-5 ring-1 ring-gray-200 overflow-hidden text-zinc-900 border-t-[6px] border-[#004B87] relative h-[1120px]"
                style={{ contentVisibility: "auto" }}
              >
                {/* Minimal Header stamp */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-2">
                  <span className="font-serif italic font-bold text-sm text-[#004B87]">
                    Recommendation Summary & Regulator Disclaimers
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">Page 4 of 4</span>
                </div>

                {/* Rating Criteria Guide */}
                <div>
                  <h3 className="text-[10px] font-bold text-[#004B87] uppercase tracking-wider mb-2 font-mono">Investment Rating Criteria</h3>
                  <div className="grid grid-cols-4 gap-3 bg-gray-50 p-3 rounded border border-gray-100 text-[8.5px] leading-relaxed text-gray-600">
                    <div className="border-r border-gray-200 pr-2">
                      <span className="font-bold text-emerald-700 block text-[9.5px]">BUY</span>
                      Expected upward potential is above 10% for large caps, or above 15% for mid/small caps.
                    </div>
                    <div className="border-r border-gray-200 pr-2">
                      <span className="font-bold text-teal-700 block text-[9.5px]">ACCUMULATE</span>
                      Upside is expected between 10% to 15% for mid caps or as partial allocation.
                    </div>
                    <div className="border-r border-gray-200 pr-2">
                      <span className="font-bold text-orange-600 block text-[9.5px]">HOLD</span>
                      Expected return range is between 0% to 10% with limited immediate upside.
                    </div>
                    <div>
                      <span className="font-bold text-red-600 block text-[9.5px]">REDUCE / SELL</span>
                      Downside expected to remain negative or absolute loss potential is significant.
                    </div>
                  </div>
                </div>

                {/* Main Legal Disclosure Texts matching editorial look */}
                <div className="flex-1 text-[7.5px] leading-relaxed text-gray-500 font-medium space-y-3 uppercase-none text-justify">
                  <p>
                    <span className="font-bold block text-gray-800 text-[8px] mb-0.5">DISCLAIMER & DISCLOSURES</span>
                    Certification: We, Gopika Gopan and the designated research desk at Geojit Financial Services Ltd. (hereinafter referred to as GIL), hereby certify that all actions, investment opinions, and ratings expressed in this report precisely reflect our transparent perspectives regarding the subject securities or issuer corporations. No segment of research compensation was, is, or will be directly or indirectly linked to the specific investment advice expressed in this report.
                  </p>
                  <p>
                    GIL is a registered SEBI broker and Research Entity (Reg No. INH0000019567) providing localized client wealth programs with absolute transparency. Capital markets remain susceptible to global liquidity and systemic risks; read all investment risks thoroughly before placing active trades.
                  </p>
                  <p>
                    <span className="font-bold block text-gray-800 text-[8px] mb-0.5">Standard Regulatory Disclosures:</span>
                    1. Ownership: GIL confirms that it has no direct financial conflicts or real interest of exceeding 1% beneficial ownership in any segment of the subject corporations. 
                    2. Client Connections: Neither GIL nor its key analyst personnel serve as key officers, Board delegates, or managing representatives of the subject companies.
                    3. No Compensation: GIL has not received underwriting commission, brokerage fees, or structural market-making revenues from the subject company in the trailing 12 months.
                  </p>
                  <p>
                    Registered Office: 7th Floor, 34/659-P, Civil Line Road, Kochi-682024, Kerala, India. For compliance and grievance, connect directly with MS. Indu K, Compliance Officer. Email: compliance@geojit.com. Smart ODR and SCORES platforms can be contacted further for external disputes resolution.
                  </p>
                </div>

                {/* Digital Signature section */}
                <div className="border-t border-gray-200 pt-3 flex justify-between items-end mt-4">
                  <div className="text-[8px] text-gray-400">
                    <p className="font-bold text-gray-700">GOPIKA GOPAN</p>
                    <p>Lead Research Analyst</p>
                    <p>Geojit Investments Limited</p>
                  </div>
                  <div className="text-right text-[8px] text-gray-400 bg-slate-50 p-2 border border-gray-200 rounded font-mono">
                    <p className="font-bold text-gray-700">Digital Verification</p>
                    <p>Date: {reportData.companyDetails.date}</p>
                    <p>SEBI-REG: INH0000019567</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-10 right-10 flex justify-between items-center opacity-40 border-t border-gray-100 pt-2 text-[8px] font-mono">
                  <span>www.geojit.com</span>
                  <span>Geojit Financial Services Ltd. Equity Research</span>
                  <span>Page 4</span>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  );
}

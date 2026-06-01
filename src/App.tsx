<<<<<<< HEAD
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
=======
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
>>>>>>> da73ab59cb5a6806564e9628c1b2bfae797d0e15
                </button>
              </div>
            </div>
          </div>

<<<<<<< HEAD
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
=======
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

>>>>>>> da73ab59cb5a6806564e9628c1b2bfae797d0e15
      </main>
    </div>
  );
}

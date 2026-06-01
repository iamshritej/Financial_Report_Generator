import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  
  // Increase payload limit to support large financial documents / PDF uploads safely via raw Base64 JSON
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Initialize Gemini AI Client (Lazy initialization with safety checks)
  const getGeminiClient = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please configure it in your Secrets / Env variables.");
    }
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // POST endpoint for analyzing uploaded context documents (PDF, CSV, TXT)
  app.post("/api/analyze", async (req, res, next) => {
    try {
      const { companyName, fileBase64, fileMimeType, fileName } = req.body;

      if (!fileBase64 || !fileMimeType) {
        res.status(400).json({ error: "Missing uploaded file data (fileBase64 or fileMimeType)." });
        return;
      }

      console.log(`Analyzing file "${fileName}" (${fileMimeType}) for company "${companyName || "Unknown"}"`);

      const ai = getGeminiClient();

      // Formulate a clean, highly structured multimodal request to Gemini 3.5-flash
      // If it is binary (like application/pdf), we pass it as inlineData
      // If it is text-like (like CSV, text/plain), we can either pass it as text/plain inlineData or supply it as a part
      const filePart = {
        inlineData: {
          data: fileBase64,
          mimeType: fileMimeType,
        },
      };

      const promptText = `
You are an elite equity research analyst and investment banker. Your goal is to analyze the attached financial context document for the company "${companyName || "the specified company"}" (which may be a PDF earnings presentation, quarterly results, an annual report, CSV transactions, or text transcript).
Extract the key financials, narrative performance highlights, stock parameters, current and estimated future performance metrics, and complete standard quarterly and annual consolidated statement tables (P&L, Balance Sheet, Cash Flow, and Ratios) matching the historical periods available in the document.

CRITICAL INSTRUCTIONS:
1. Ensure all extracted figures are accurate and tie precisely to the provided document.
2. If some fields or whole historical statements (such as a full Cash Flow statements or detailed change in estimates) are completely missing/not mentioned in the context document, do not invent data. Return "-" or "N.A." for those fields, or provide a reliable estimation based on the other figures if standard.
3. For trend charts, generate lists of Q-o-Q or Y-o-Y datatrend points:
   - "revenueTrend" should have matching quarters (past 6-8 quarters, e.g. "Q1FY25", "Q2FY25") with revenue figures (value1, raw numbers) and YoY/QoQ growth rates (value2, percentages).
   - "orderValueTrend" or alternative metric should show order values or segment activity.
   - "ebitdaTrend" should show absolute EBITDA and YoY Margins.
   - "patTrend" should show absolute PAT and YoY Margin metrics.
4. Try to output the final JSON as closely matching this TypeScript schema as possible:

interface ReportData {
  companyDetails: {
    name: string; // Company Name
    ticker: string; // Stock abbreviation (e.g. ETERNAL, ICICI, etc.)
    sector: string; // Industry classification
    date: string; // Today's date or document date (e.g. "29th July, 2025")
    rating: "BUY" | "HOLD" | "ACCUMULATE" | "REDUCE" | "SELL"; // Best rating fit based on targets/estimates
    cmp: string; // Current Market Price (e.g. "Rs. 306")
    targetPrice: string; // Revised target price or estimated valuation (e.g. "Rs. 337")
    returnPercent: string; // Upward potential return % (e.g. "+10%")
    stockType: string; // Stock tier (e.g. "Large Cap", "Mid Cap", "Small Cap")
    bloombergCode: string; // Bloomberg terminal ticker (e.g. "ETERNAL:IN")
    nseCode: string; // National Stock Exchange code
    bseCode: string; // Bombay Stock Exchange numeric code
    timeFrame: string; // Valuation target time frame (e.g., "12 Months")
    sensex: string; // Index reference value if available, of fallback value
  };
  companyData: {
    marketCap: string; // in Cr or appropriate units (e.g. "295,735")
    fiftyTwoWeekHighLow: string; // (e.g. "314 - 190")
    enterpriseValue: string; // EV in Cr
    outstandingShares: string; // Outstanding shares in Cr (e.g. "965.0")
    freeFloat: string; // float percentage (e.g. "71.9")
    dividendYield: string; // % or "-"
    sixMonthAverageVolume: string; // average volume in Cr/Lakhs
    beta: string;
    faceValue: string; // face value in Rs. (e.g. "1.0")
  };
  shareholding: {
    periodHeaders: string[]; // Past 3 quarters headers (e.g. ["Q3FY25", "Q4FY25", "Q1FY26"])
    promoters: string[]; // % share relative to periodHeaders
    fiis: string[]; // % share relative to periodHeaders
    mfs: string[]; // % share relative to periodHeaders
    public: string[]; // % share relative to periodHeaders
    others: string[]; // % share relative to periodHeaders
    promoterPledge: string[]; // matching periodHeaders
  };
  pricePerformance: {
    periodHeaders: string[]; // ["3 Month", "6 Month", "1 Year"]
    absoluteReturn: string[];
    absoluteSensex: string[];
    relativeReturn: string[];
  };
  narrative: {
    title: string; // Descriptive editorial summary title (e.g. "Blinkit propels growth; valuation limits upside")
    summary: string; // Paragraph brief detailing general business setup
    bullets: string[]; // 4 to 6 concise, bulleted key financial highlights from the document (e.g. YoY segments, sales, net orders, expenses)
  };
  outlookValuation: string; // Detailed paragraph containing professional valuation, industry trends, potential opportunities, and limitations.
  yeMarchFinancials: {
    columns: string[]; // e.g. ["FY25A", "FY26E", "FY27E"]
    rows: { metric: string, values: string[] }[]; // metrics include: "Sales", "Growth (%)", "EBITDA", "EBITDA Margin (%)", "PAT Adjusted", "Growth (%)", "Adjusted EPS", "P/E", "P/B", "EV/EBITDA", "ROE (%)", "D/E"
  };
  quarterlyFinancials: {
    columns: string[]; // e.g. ["Q1FY26", "Q1FY25", "YoY (%)", "Q4FY25", "QoQ (%)"]
    rows: { metric: string, values: string[] }[]; // metrics include: "Sales", "EBITDA", "Margin (%)", "EBIT", "PBT", "Rep. PAT", "Adj PAT", "Adj. EPS"
  };
  changeInEstimates: {
    columns: string[]; // ["FY26E", "FY27E"]
    metrics: { name: string, oldEstimates: string[], newEstimates: string[], changePercent: string[] }[]; // rows: "Revenue", "EBITDA", "Margins (%)", "Adj. PAT", "EPS"
  };
  profitAndLoss: {
    columns: string[]; // 5 years: e.g. ["FY23A", "FY24A", "FY25A", "FY26E", "FY27E"]
    rows: { metric: string, values: string[] }[]; // P&L items, including Sales, % change, EBITDA, % change, Depreciation, EBIT, Interest, Other Income, PBT, % change, Tax, Tax Rate %, Reported PAT, Adj PAT, No. of Shares, Adj EPS, DPS
  };
  balanceSheet: {
    columns: string[]; // e.g. ["FY23A", "FY24A", "FY25A", "FY26E", "FY27E"]
    rows: { metric: string, values: string[] }[]; // Cash, Accts. Receivable, Inventories, Other Cur. Assets, Investments, Gross Fixed Assets, Net Fixed Assets, CWIP, Intangible Assets, Other Assets, Total Assets, Current Liabilities, Provisions, Debt Funds, Other Liabilities, Equity Capital, Res. & Surplus, Shareholder Funds, Total Liabilities, BVPS
  };
  cashFlow: {
    columns: string[]; // e.g. ["FY23A", "FY24A", "FY25A", "FY26E", "FY27E"]
    rows: { metric: string, values: string[] }[]; // Net inc. + Depn., Non-cash adj., Changes in W.C, C.F. Operation, Capital exp., Change in inv., Other invest.CF, C.F - Investment, Issue of equity, Issue/repay debt, dividends paid, Other finance.CF, C.F - Finance, Chg. in cash, Closing Cash
  };
  ratios: {
    columns: string[]; // matching 5 years headers
    rows: { metric: string, values: string[] }[]; // EBITDA margin (%), EBIT margin (%), Net profit mgn.(%), ROE (%), ROCE (%), Receivables (days), Inventory (days), Payables (days), Current ratio (x), Quick ratio (x), Gross asset T.O (x), Total asset T.O (x), Int. covge. ratio (x), Adj. debt/equity (x), EV/Sales (x), EV/EBITDA (x), P/E (x), P/BV (x)
  };
  charts: {
    revenueTrend: { period: string, value1: number, value2?: number }[];
    orderValueTrend: { period: string, value1: number, value2?: number }[];
    ebitdaTrend: { period: string, value1: number, value2?: number }[];
    patTrend: { period: string, value1: number, value2?: number }[];
  }
}
`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          companyDetails: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ticker: { type: Type.STRING },
              sector: { type: Type.STRING },
              date: { type: Type.STRING },
              rating: { type: Type.STRING },
              cmp: { type: Type.STRING },
              targetPrice: { type: Type.STRING },
              returnPercent: { type: Type.STRING },
              stockType: { type: Type.STRING },
              bloombergCode: { type: Type.STRING },
              nseCode: { type: Type.STRING },
              bseCode: { type: Type.STRING },
              timeFrame: { type: Type.STRING },
              sensex: { type: Type.STRING },
            },
          },
          companyData: {
            type: Type.OBJECT,
            properties: {
              marketCap: { type: Type.STRING },
              fiftyTwoWeekHighLow: { type: Type.STRING },
              enterpriseValue: { type: Type.STRING },
              outstandingShares: { type: Type.STRING },
              freeFloat: { type: Type.STRING },
              dividendYield: { type: Type.STRING },
              sixMonthAverageVolume: { type: Type.STRING },
              beta: { type: Type.STRING },
              faceValue: { type: Type.STRING },
            },
          },
          shareholding: {
            type: Type.OBJECT,
            properties: {
              periodHeaders: { type: Type.ARRAY, items: { type: Type.STRING } },
              promoters: { type: Type.ARRAY, items: { type: Type.STRING } },
              fiis: { type: Type.ARRAY, items: { type: Type.STRING } },
              mfs: { type: Type.ARRAY, items: { type: Type.STRING } },
              public: { type: Type.ARRAY, items: { type: Type.STRING } },
              others: { type: Type.ARRAY, items: { type: Type.STRING } },
              promoterPledge: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
          pricePerformance: {
            type: Type.OBJECT,
            properties: {
              periodHeaders: { type: Type.ARRAY, items: { type: Type.STRING } },
              absoluteReturn: { type: Type.ARRAY, items: { type: Type.STRING } },
              absoluteSensex: { type: Type.ARRAY, items: { type: Type.STRING } },
              relativeReturn: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
          narrative: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
          outlookValuation: { type: Type.STRING },
          yeMarchFinancials: {
            type: Type.OBJECT,
            properties: {
              columns: { type: Type.ARRAY, items: { type: Type.STRING } },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    values: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
            },
          },
          quarterlyFinancials: {
            type: Type.OBJECT,
            properties: {
              columns: { type: Type.ARRAY, items: { type: Type.STRING } },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    values: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
            },
          },
          changeInEstimates: {
            type: Type.OBJECT,
            properties: {
              columns: { type: Type.ARRAY, items: { type: Type.STRING } },
              metrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    oldEstimates: { type: Type.ARRAY, items: { type: Type.STRING } },
                    newEstimates: { type: Type.ARRAY, items: { type: Type.STRING } },
                    changePercent: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
            },
          },
          profitAndLoss: {
            type: Type.OBJECT,
            properties: {
              columns: { type: Type.ARRAY, items: { type: Type.STRING } },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    values: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
            },
          },
          balanceSheet: {
            type: Type.OBJECT,
            properties: {
              columns: { type: Type.ARRAY, items: { type: Type.STRING } },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    values: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
            },
          },
          cashFlow: {
            type: Type.OBJECT,
            properties: {
              columns: { type: Type.ARRAY, items: { type: Type.STRING } },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    values: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
            },
          },
          ratios: {
            type: Type.OBJECT,
            properties: {
              columns: { type: Type.ARRAY, items: { type: Type.STRING } },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    values: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
            },
          },
          charts: {
            type: Type.OBJECT,
            properties: {
              revenueTrend: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    period: { type: Type.STRING },
                    value1: { type: Type.NUMBER },
                    value2: { type: Type.NUMBER },
                  },
                },
              },
              orderValueTrend: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    period: { type: Type.STRING },
                    value1: { type: Type.NUMBER },
                    value2: { type: Type.NUMBER },
                  },
                },
              },
              ebitdaTrend: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    period: { type: Type.STRING },
                    value1: { type: Type.NUMBER },
                    value2: { type: Type.NUMBER },
                  },
                },
              },
              patTrend: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    period: { type: Type.STRING },
                    value1: { type: Type.NUMBER },
                    value2: { type: Type.NUMBER },
                  },
                },
              },
            },
          },
        },
      };

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [filePart, { text: promptText }],
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          temperature: 0.1, // low temperature for precise factual extraction
        },
      });

      const rawText = result.text;
      if (!rawText) {
        throw new Error("Empty response returned from Gemini API");
      }

      const parsedJSON = JSON.parse(rawText);
      res.json({ success: true, data: parsedJSON });
    } catch (error: any) {
      console.error("Analysis failed:", error);
      res.status(500).json({
        success: false,
        error: error.message || "An unexpected error occurred during document parsing.",
      });
    }
  });

  // Serve static UI assets to make our applet beautifully work as a unified entity
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  } else {
    // In development mode, load Vite dev middleware on Port 3000 to bridge Hot-Reload & API proxies perfectly
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port} (production: ${process.env.NODE_ENV === "production"})`);
  });
}

startServer().catch((err) => {
  console.error("Critical error starting backend server:", err);
  process.exit(1);
});

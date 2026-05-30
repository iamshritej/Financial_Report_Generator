/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import multer from "multer";
import { createRequire } from "module";
import PDFDocument from "pdfkit";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { sampleDocs } from "./src/sampleDocs";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = typeof pdfParseModule === "function"
  ? pdfParseModule
  : (pdfParseModule.default || pdfParseModule);

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // API Route: Get Pre-populated Sample Documents
  app.get("/api/presets", (req, res) => {
    res.json(sampleDocs);
  });

  // API Route: Extract Financial Data from File or preset using Gemini
  app.post("/api/extract", upload.single("file"), async (req, res) => {
    try {
      let targetText = "";
      const presetId = req.body.presetId;
      const companyNameInput = req.body.companyName || "";

      if (presetId) {
        const preset = sampleDocs.find((d) => d.id === presetId);
        if (preset) {
          targetText = preset.text;
        } else {
          return res.status(400).json({ error: "Preset ID not found" });
        }
      } else if (req.file) {
        const mimeType = req.file.mimetype;
        if (mimeType === "application/pdf") {
          const parsed = await pdfParse(req.file.buffer);
          targetText = parsed.text;
        } else {
          // txt, csv, etc.
          targetText = req.file.buffer.toString("utf-8");
        }
      } else if (req.body.textContext) {
        targetText = req.body.textContext;
      } else {
        return res
          .status(400)
          .json({ error: "Please upload a document, enter text, or select a preset." });
      }

      const prompt = `
You are an expert equity research analyst. Extract the financial data from the following company context document and map it to our Geojit-style report template. 
Context document:
---
${targetText}
---

If the context is about a different company than "${companyNameInput}" (but matches), please fill in based on the context. If fields (like ticker, BSE/NSE codes, beta, dividend yield, specific shareholding values, or specific years) are missing in the document, extract what is available and leave the missing fields blank ("") or clearly marked as "-" or "Nil" where appropriate. DO NOT invent fake placeholders, but make sure to fill in all the required tables with whatever metrics are provided or derived.

Please make sure returnPercentage, expectedReturn, targetPrice, and cmp are cleanly extracted.
Provide four quarterly data points and four historical trend chart data points for:
- Revenue trend (Quarter, Revenue Value, Growth Rate %)
- EBITDA trend (Quarter, EBITDA Value, Margin %)
- PAT trend (Quarter, PAT Value, Margin %)
- Gross Order Value / Core Business indicator trend (Quarter, GOV Value, Growth %)

Return a JSON object conforming exactly to the following structure.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              companyName: { type: Type.STRING },
              legalName: { type: Type.STRING },
              sector: { type: Type.STRING },
              reportDate: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              targetPrice: { type: Type.STRING },
              cmp: { type: Type.STRING },
              expectedReturn: { type: Type.STRING },
              targetChange: { type: Type.STRING },
              ratingChange: { type: Type.STRING },
              earningsChange: { type: Type.STRING },
              stockType: { type: Type.STRING },
              bloombergCode: { type: Type.STRING },
              nseCode: { type: Type.STRING },
              bseCode: { type: Type.STRING },
              sensexValue: { type: Type.STRING },
              timeFrame: { type: Type.STRING },
              dataAsOf: { type: Type.STRING },
              companyData: {
                type: Type.OBJECT,
                properties: {
                  marketCapCr: { type: Type.STRING },
                  fiftyTwoWeekHighLow: { type: Type.STRING },
                  enterpriseValueCr: { type: Type.STRING },
                  outstandingSharesCr: { type: Type.STRING },
                  freeFloatPct: { type: Type.STRING },
                  dividendYieldPct: { type: Type.STRING },
                  avgVolume6mCr: { type: Type.STRING },
                  beta: { type: Type.STRING },
                  faceValue: { type: Type.STRING },
                },
              },
              shareholding: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    q3: { type: Type.STRING },
                    q4: { type: Type.STRING },
                    q1: { type: Type.STRING },
                  },
                },
              },
              pricePerformance: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    period: { type: Type.STRING },
                    absoluteReturn: { type: Type.STRING },
                    absoluteSensex: { type: Type.STRING },
                    relativeReturn: { type: Type.STRING },
                  },
                },
              },
              highlightHeader: { type: Type.STRING },
              highlightBullets: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              outlookHeading: { type: Type.STRING },
              outlookText: { type: Type.STRING },
              annualFinancials: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    fy25: { type: Type.STRING },
                    fy26: { type: Type.STRING },
                    fy27: { type: Type.STRING },
                  },
                },
              },
              quarterlyFinancials: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    q1_current: { type: Type.STRING },
                    q1_previous: { type: Type.STRING },
                    yoyGrowth: { type: Type.STRING },
                    q4_previous: { type: Type.STRING },
                    qoqGrowth: { type: Type.STRING },
                  },
                },
              },
              changeInEstimates: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING },
                    old_fy26: { type: Type.STRING },
                    old_fy27: { type: Type.STRING },
                    new_fy26: { type: Type.STRING },
                    new_fy27: { type: Type.STRING },
                    change_fy26: { type: Type.STRING },
                    change_fy27: { type: Type.STRING },
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
                        value: { type: Type.NUMBER },
                        rate: { type: Type.NUMBER },
                      },
                    },
                  },
                  grossOrderValueTrend: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        period: { type: Type.STRING },
                        value: { type: Type.NUMBER },
                        rate: { type: Type.NUMBER },
                      },
                    },
                  },
                  ebitdaTrend: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        period: { type: Type.STRING },
                        value: { type: Type.NUMBER },
                        rate: { type: Type.NUMBER },
                      },
                    },
                  },
                  patTrend: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        period: { type: Type.STRING },
                        value: { type: Type.NUMBER },
                        rate: { type: Type.NUMBER },
                      },
                    },
                  },
                },
              },
            },
            required: [
              "companyName",
              "recommendation",
              "targetPrice",
              "cmp",
              "expectedReturn",
              "annualFinancials",
              "quarterlyFinancials",
              "changeInEstimates",
            ],
          },
        },
      });

      const parsedJSON = JSON.parse(response.text || "{}");
      res.json(parsedJSON);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to extract core financial data. " + e.message });
    }
  });

  // API Route: Generate beautiful PDFKit based Geojit report
  app.post("/api/generate-pdf", async (req, res) => {
    try {
      const data = req.body;

      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 35, bottom: 35, left: 35, right: 35 },
      });

      // Stream PDF response
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${data.companyName || "Report"}_Research_Report.pdf"`);
      doc.pipe(res);

      // --- COLOR PALETTE ---
      const teal = "#02636b";
      const orange = "#ef7227";
      const darkGray = "#333333";
      const lightGray = "#f4f7f6";
      const tableBorder = "#e0e7e5";

      // ==========================================
      // PAGE 1: EXECUTIVE BRIEF & RATINGS
      // ==========================================

      // 1. Header (Retail Equity Research & GEOJIT logo)
      doc.font("Helvetica-Bold").fontSize(18).fillColor(teal).text("Retail Equity Research", 35, 40);
      
      // Draw GEOJIT visual mockup logo
      doc.rect(470, 38, 90, 26).fill(teal);
      doc.fontSize(10).font("Helvetica-Bold").fillColor("#ffffff").text("GEOJIT", 480, 43);
      doc.fontSize(5).font("Helvetica").text("PEOPLE YOU PROSPER WITH", 480, 54);

      // Company Title & Badge
      doc.fontSize(24).font("Helvetica-Bold").fillColor(darkGray).text(data.companyName || "Company Name", 35, 75);
      
      // Recommendations Card (HOLD / BUY)
      doc.rect(450, 75, 110, 30).fill(lightGray).stroke(teal);
      doc.fontSize(14).font("Helvetica-Bold").fillColor(teal).text(data.recommendation || "HOLD", 455, 83, { width: 100, align: "center" });

      // Sector and Date line
      doc.fontSize(9).font("Helvetica").fillColor(darkGray).text(`Sector: ${data.sector || "Unassigned"}`, 35, 115);
      doc.text(data.reportDate || "Today", 475, 115, { align: "right" });

      // Highlight divider line
      doc.moveTo(35, 128).lineTo(560, 128).lineWidth(1).stroke(teal);

      // 2. Row of Changes and Tar. Rates Cards
      // 5 columns across the page width: 525 points available (560 - 35 = 525)
      const colW = 100;
      const getX = (i: number) => 35 + i * 105;

      const cardData = [
        { title: "Key Changes", value: data.targetChange || "Revised" },
        { title: "Rating", value: data.ratingChange || "Hold" },
        { title: "Earnings", value: data.earningsChange || "No Change" },
        { title: "Target Price", value: `${data.targetPrice || "N/A"}` },
        { title: "CMP", value: `${data.cmp || "N/A"}` },
      ];

      cardData.forEach((card, idx) => {
        const cx = getX(idx);
        doc.rect(cx, 135, 100, 38).fill(lightGray);
        doc.fontSize(8).font("Helvetica").fillColor(darkGray).text(card.title, cx + 5, 140, { width: 90, align: "center" });
        doc.fontSize(10).font("Helvetica-Bold").fillColor(teal).text(card.value, cx + 5, 153, { width: 90, align: "center" });
      });

      // Special box: Expected Return indicator card
      const retX = getX(4) + 105;
      doc.rect(510, 135, 50, 38).fill(teal);
      doc.fontSize(7).font("Helvetica").fillColor("#ffffff").text("Return", 510, 140, { width: 50, align: "center" });
      doc.fontSize(10).font("Helvetica-Bold").fillColor(orange).text(data.expectedReturn || "0%", 510, 153, { width: 50, align: "center" });

      // 3. Table of Stock codes
      const stockX = 35;
      const stockY = 180;
      doc.rect(stockX, stockY, 525, 18).fill("#e0ebea");
      const codes = [
        `Stock Type: ${data.stockType || "Large Cap"}`,
        `Bloomberg Code: ${data.bloombergCode || "-"}`,
        `Sensex: ${data.sensexValue || "-"}`,
        `NSE: ${data.nseCode || "-"}`,
        `BSE: ${data.bseCode || "-"}`,
        `Time Frame: ${data.timeFrame || "12 Months"}`,
      ];
      codes.forEach((code, idx) => {
        doc.fontSize(7.5).font("Helvetica").fillColor(darkGray).text(code, stockX + idx * 87 + 5, stockY + 5);
      });

      // ================= TWO COLUMN CONTENT =================
      // LEFT COLUMN holds tables: Company Data, Shareholding, Price Performance
      // RIGHT COLUMN holds Narratives, bullets, and Quarterly tables.

      const leftColX = 35;
      const rightColX = 245;
      const contentY = 205;

      // ---- LEFT COLUMN ----
      doc.fontSize(7.5).font("Helvetica-Oblique").fillColor(darkGray).text(`Data as of: ${data.dataAsOf || "Current Data"}`, leftColX, contentY);

      // Section: Company Data Table
      const compDataY = contentY + 12;
      doc.rect(leftColX, compDataY, 195, 13).fill(teal);
      doc.fontSize(8).font("Helvetica-Bold").fillColor("#ffffff").text("Company Data", leftColX + 5, compDataY + 3);

      const compRows = [
        { label: "Market Cap (Rs.cr)", val: data.companyData?.marketCapCr || "-" },
        { label: "52 Week High - Low", val: data.companyData?.fiftyTwoWeekHighLow || "-" },
        { label: "Enterprise Value (Rs.cr)", val: data.companyData?.enterpriseValueCr || "-" },
        { label: "Outstanding Shares (cr)", val: data.companyData?.outstandingSharesCr || "-" },
        { label: "Free Float (%)", val: data.companyData?.freeFloatPct || "-" },
        { label: "Dividend Yield (%)", val: data.companyData?.dividendYieldPct || "-" },
        { label: "6m average volume (cr)", val: data.companyData?.avgVolume6mCr || "-" },
        { label: "Beta", val: data.companyData?.beta || "-" },
        { label: "Face value (Rs.)", val: data.companyData?.faceValue || "-" },
      ];

      compRows.forEach((row, idx) => {
        const ry = compDataY + 13 + idx * 11;
        if (idx % 2 === 1) {
          doc.rect(leftColX, ry, 195, 11).fill(lightGray);
        }
        doc.fontSize(7).font("Helvetica").fillColor(darkGray).text(row.label, leftColX + 4, ry + 2);
        doc.font("Helvetica-Bold").text(row.val, leftColX + 130, ry + 2, { width: 60, align: "right" });
      });

      // Section: Shareholding Table
      const shY = compDataY + 13 + compRows.length * 11 + 6;
      doc.rect(leftColX, shY, 195, 13).fill(teal);
      doc.fontSize(8).font("Helvetica-Bold").fillColor("#ffffff").text("Shareholding (%)", leftColX + 5, shY + 3);

      // Table headers
      doc.rect(leftColX, shY + 13, 195, 11).fill("#e1eae8");
      doc.fontSize(7).font("Helvetica-Bold").fillColor(teal);
      doc.text("Category", leftColX + 4, shY + 15);
      doc.text("Q3", leftColX + 110, shY + 15);
      doc.text("Q4", leftColX + 140, shY + 15);
      doc.text("Q1", leftColX + 170, shY + 15);

      const shRows = data.shareholding && data.shareholding.length > 0 ? data.shareholding : [
        { category: "Promoters", q3: "0.0", q4: "0.0", q1: "0.0" },
        { category: "FII's", q3: "47.3", q4: "44.4", q1: "42.3" },
        { category: "MFs/Institutions", q3: "20.5", q4: "23.6", q1: "26.6" },
        { category: "Public", q3: "8.0", q4: "8.5", q1: "7.6" },
        { category: "Others", q3: "24.1", q4: "23.6", q1: "23.5" },
      ];

      shRows.forEach((row, idx) => {
        const ry = shY + 24 + idx * 11;
        if (idx % 2 === 1) {
          doc.rect(leftColX, ry, 195, 11).fill(lightGray);
        }
        doc.fontSize(7).font("Helvetica").fillColor(darkGray);
        doc.text(row.category, leftColX + 4, ry + 2);
        doc.text(row.q3, leftColX + 110, ry + 2);
        doc.text(row.q4, leftColX + 140, ry + 2);
        doc.text(row.q1, leftColX + 170, ry + 2);
      });

      // Section: Price Performance Table
      const perfY = shY + 24 + shRows.length * 11 + 6;
      doc.rect(leftColX, perfY, 195, 13).fill(teal);
      doc.fontSize(8).font("Helvetica-Bold").fillColor("#ffffff").text("Price Performance", leftColX + 5, perfY + 3);

      doc.rect(leftColX, perfY + 13, 195, 11).fill("#e1eae8");
      doc.fontSize(7).font("Helvetica-Bold").fillColor(teal);
      doc.text("Period", leftColX + 4, perfY + 15);
      doc.text("3 Mon", leftColX + 85, perfY + 15);
      doc.text("6 Mon", leftColX + 125, perfY + 15);
      doc.text("1 Year", leftColX + 165, perfY + 15);

      const perfRows = data.pricePerformance && data.pricePerformance.length > 0 ? data.pricePerformance : [
        { period: "Absolute Return", absoluteReturn: "32.1%", absoluteSensex: "44.8%", relativeReturn: "39.7%" },
        { period: "Absolute Sensex", absoluteReturn: "3.0%", absoluteSensex: "7.9%", relativeReturn: "2.5%" },
        { period: "Relative Return", absoluteReturn: "29.2%", absoluteSensex: "36.9%", relativeReturn: "37.1%" },
      ];

      perfRows.forEach((row, idx) => {
        const ry = perfY + 24 + idx * 11;
        if (idx % 2 === 1) {
          doc.rect(leftColX, ry, 195, 11).fill(lightGray);
        }
        doc.fontSize(7).font("Helvetica").fillColor(darkGray);
        doc.text(row.period, leftColX + 4, ry + 2);
        doc.text(row.absoluteReturn, leftColX + 85, ry + 2);
        doc.text(row.absoluteSensex, leftColX + 125, ry + 2);
        doc.text(row.relativeReturn, leftColX + 165, ry + 2);
      });

      // ---- RIGHT COLUMN ----
      // Bullet highlights
      doc.fontSize(12).font("Helvetica-Bold").fillColor(teal).text(data.highlightHeader || "Key Narrative Highlights", rightColX, contentY);
      
      let bulletY = contentY + 15;
      const bullets = data.highlightBullets || [
        "Consolidated revenue from operations demonstrated robust year-on-year growth.",
        "Operational efficiencies led to competitive EBITDA ratios across key divisions.",
        "Robust balance sheet metrics provide high liquidity and leverage capacity.",
      ];

      bullets.slice(0, 5).forEach((bullet: string) => {
        doc.circle(rightColX + 3, bulletY + 4, 1.5).fill(orange);
        doc.fontSize(8).font("Helvetica").fillColor(darkGray).text(bullet, rightColX + 10, bulletY, { width: 305, align: "left" });
        bulletY += doc.heightOfString(bullet, { width: 305 }) + 4;
      });

      // Outlook section
      doc.fontSize(12).font("Helvetica-Bold").fillColor(teal).text(data.outlookHeading || "Outlook & Valuation", rightColX, bulletY + 8);
      doc.fontSize(8.5).font("Helvetica").fillColor(darkGray).text(data.outlookText || "Company presents strong fundamentals over a long-term period...", rightColX, bulletY + 22, { width: 315, align: "justify" });

      // Lower Section Tables: Annual financials bottom left, Quarterly bottom right
      // Let's draw Annual Financial Metrics at bottom coordinates of left col, and Quarterly consolidated at bottom right!
      const tableY = 475;

      // Bottom Left: Annual Financials Table
      doc.rect(leftColX, tableY, 195, 14).fill(teal);
      doc.fontSize(8).font("Helvetica-Bold").fillColor("#ffffff").text("Y.E March", leftColX + 5, tableY + 3);

      doc.rect(leftColX, tableY + 14, 195, 11).fill("#e1eae8");
      doc.fontSize(7).font("Helvetica-Bold").fillColor(teal);
      doc.text("Y.E March (cr)", leftColX + 4, tableY + 16);
      doc.text("FY25A", leftColX + 100, tableY + 16);
      doc.text("FY26E", leftColX + 135, tableY + 16);
      doc.text("FY27E", leftColX + 168, tableY + 16);

      const annRows = data.annualFinancials && data.annualFinancials.length > 0 ? data.annualFinancials : [
        { metric: "Sales", fy25: "20,243", fy26: "35,020", fy27: "54,632" },
        { metric: "EBITDA", fy25: "637", fy26: "1,248", fy27: "3,575" },
        { metric: "Margin (%)", fy25: "3.1", fy26: "3.6", fy27: "6.5" },
        { metric: "PAT Adjusted", fy25: "527", fy26: "927", fy27: "2,643" },
        { metric: "P/E", fy25: "335.8", fy26: "325.2", fy27: "114.1" },
        { metric: "ROE (%)", fy25: "1.7", fy26: "3.0", fy27: "7.8" },
      ];

      annRows.slice(0, 10).forEach((row, idx) => {
        const ry = tableY + 25 + idx * 11;
        if (idx % 2 === 1) {
          doc.rect(leftColX, ry, 195, 11).fill(lightGray);
        }
        doc.fontSize(7).font("Helvetica").fillColor(darkGray);
        doc.text(row.metric, leftColX + 4, ry + 2);
        doc.text(row.fy25, leftColX + 100, ry + 2);
        doc.text(row.fy26, leftColX + 135, ry + 2);
        doc.text(row.fy27, leftColX + 168, ry + 2);
      });

      // Bottom Right: Quarterly Financials Table (Quarterly Financials Consolidated)
      doc.rect(rightColX, tableY, 315, 14).fill(teal);
      doc.fontSize(8).font("Helvetica-Bold").fillColor("#ffffff").text("Quarterly Financials Consolidated", rightColX + 5, tableY + 3);

      doc.rect(rightColX, tableY + 14, 315, 11).fill("#e1eae8");
      doc.fontSize(7).font("Helvetica-Bold").fillColor(teal);
      doc.text("Rs.cr", rightColX + 4, tableY + 16);
      doc.text(data.quarterlyFinancials?.[0]?.q1_current || "Q1FY26", rightColX + 100, tableY + 16);
      doc.text(data.quarterlyFinancials?.[0]?.q1_previous || "Q1FY25", rightColX + 145, tableY + 16);
      doc.text("YoY (%)", rightColX + 195, tableY + 16);
      doc.text(data.quarterlyFinancials?.[0]?.q4_previous || "Q4FY25", rightColX + 240, tableY + 16);
      doc.text("QoQ (%)", rightColX + 280, tableY + 16);

      const qtrRows = data.quarterlyFinancials && data.quarterlyFinancials.length > 0 ? data.quarterlyFinancials : [
        { metric: "Sales", q1_current: "7,167", q1_previous: "4,206", yoyGrowth: "70.4", q4_previous: "5,833", qoqGrowth: "22.9" },
        { metric: "EBITDA", q1_current: "115", q1_previous: "177", yoyGrowth: "-35.0", q4_previous: "72", qoqGrowth: "59.7" },
        { metric: "Margin (%)", q1_current: "1.6", q1_previous: "4.2", yoyGrowth: "-260bps", q4_previous: "1.2", qoqGrowth: "40bps" },
        { metric: "EBIT", q1_current: "-199", q1_previous: "28", yoyGrowth: "-810.7", q4_previous: "-215", qoqGrowth: "7.4" },
        { metric: "PBT", q1_current: "88", q1_previous: "239", yoyGrowth: "-63.2", q4_previous: "97", qoqGrowth: "-9.3" },
        { metric: "Rep. PAT", q1_current: "25", q1_previous: "253", yoyGrowth: "-90.1", q4_previous: "39", qoqGrowth: "-35.9" },
      ];

      qtrRows.slice(0, 10).forEach((row, idx) => {
        const ry = tableY + 25 + idx * 11;
        if (idx % 2 === 1) {
          doc.rect(rightColX, ry, 315, 11).fill(lightGray);
        }
        doc.fontSize(7).font("Helvetica").fillColor(darkGray);
        doc.text(row.metric, rightColX + 4, ry + 2);
        doc.text(row.q1_current || "-", rightColX + 100, ry + 2);
        doc.text(row.q1_previous || "-", rightColX + 145, ry + 2);
        doc.text(row.yoyGrowth || "-", rightColX + 195, ry + 2);
        doc.text(row.q4_previous || "-", rightColX + 240, ry + 2);
        doc.text(row.qoqGrowth || "-", rightColX + 280, ry + 2);
      });

      // Footer brand details
      doc.moveTo(35, 775).lineTo(560, 775).lineWidth(0.5).stroke("#cccccc");
      doc.fontSize(7).font("Helvetica").fillColor("#999999").text("www.geojit.com", 35, 780);
      doc.text("Page 1 of 2", 500, 780, { align: "right" });

      // ==========================================
      // PAGE 2: HISTORICAL CHARTS & ESTIMATIONS
      // ==========================================
      doc.addPage();

      // Geojit Header layout
      doc.rect(35, 30, 525, 24).fill(teal);
      doc.fontSize(10).font("Helvetica-Bold").fillColor("#ffffff").text("Key operational highlights & Visualizations", 45, 37);

      // Section label
      doc.fontSize(11).font("Helvetica-Bold").fillColor(teal).text("Key historical trends (Last 8 Quarters)", 35, 65);

      // Helper to Draw a beautiful Vector Bar + Line trend chart right inside PDFKit!
      // This is perfectly crisp and fully programmatic!
      function drawVectorChart(
        title: string,
        data: any[],
        cx: number,
        cy: number,
        cw: number,
        ch: number,
        barCol: string,
        lineCol: string
      ) {
        // Box background
        doc.rect(cx, cy, cw, ch).fill("#fafafa").stroke("#e5e5e5");
        doc.fontSize(8.5).font("Helvetica-Bold").fillColor(teal).text(title, cx + 10, cy + 8);

        if (!data || data.length === 0) {
          doc.fontSize(8).font("Helvetica").fillColor("#999999").text("No sufficient chart data available", cx + 20, cy + ch/2);
          return;
        }

        const plotX = cx + 25;
        const plotY = cy + 25;
        const plotW = cw - 50;
        const plotH = ch - 45;

        // Draw axis lines
        doc.moveTo(plotX, plotY).lineTo(plotX, plotY + plotH).lineTo(plotX + plotW, plotY + plotH)
          .lineWidth(0.5).stroke("#cccccc");

        // Find max values for ratios
        const maxVal = Math.max(...data.map((dp) => dp.value || 1)) * 1.15;
        const minVal = Math.min(...data.map((dp) => dp.value || 0), 0);
        const rangeVal = maxVal - minVal;

        const maxRate = Math.max(...data.map((dp) => dp.rate || 1)) * 1.15;
        const minRate = Math.min(...data.map((dp) => dp.rate || 0), 0);
        const rangeRate = maxRate - minRate;

        const count = data.length;
        const barSpacing = plotW / count;
        const barW = barSpacing * 0.45;

        // Draw bars and continuous trend lines
        const linePoints: Array<{ x: number; y: number }> = [];

        data.forEach((dp, idx) => {
          const bx = plotX + idx * barSpacing + barSpacing * 0.15;
          
          // Calculate bar height
          const valShare = (dp.value - minVal) / rangeVal;
          const barH = plotH * valShare;
          const by = plotY + plotH - barH;

          // Render bar rectangle
          doc.rect(bx, by, barW, barH).fill(barCol);

          // Calculate line point
          const rateShare = (dp.rate - minRate) / rangeRate;
          const ly = plotY + plotH - plotH * rateShare;
          const lx = bx + barW / 2;
          linePoints.push({ x: lx, y: ly });

          // Label x-axis
          doc.fontSize(6).font("Helvetica").fillColor(darkGray)
            .text(dp.period || "", bx - 3, plotY + plotH + 4, { width: barSpacing, align: "center" });
        });

        // Draw overlay continuous line
        if (linePoints.length > 1) {
          doc.moveTo(linePoints[0].x, linePoints[0].y);
          for (let i = 1; i < linePoints.length; i++) {
            doc.lineTo(linePoints[i].x, linePoints[i].y);
          }
          doc.lineWidth(1.5).stroke(lineCol);

          // Draw marker circles
          linePoints.forEach((p) => {
            doc.circle(p.x, p.y, 2).fill(lineCol);
          });
        }

        // Draw legends
        doc.rect(plotX + plotW - 45, cy + 6, 6, 6).fill(barCol);
        doc.fontSize(6.5).font("Helvetica").fillColor(darkGray).text("Val", plotX + plotW - 35, cy + 6);

        doc.rect(plotX + plotW - 15, cy + 6, 6, 6).fill(lineCol);
        doc.fontSize(6.5).text("Margin%", plotX + plotW - 5, cy + 6);
      }

      // Render grid of 4 vector charts (A4 width = 595 - 70 margins = 525)
      const graphW = 250;
      const graphH = 135;

      const chR = data.charts?.revenueTrend || [
        { period: "Q2FY24", value: 3845, rate: 17.9 },
        { period: "Q3FY24", value: 4847, rate: 15.4 },
        { period: "Q4FY24", value: 5800, rate: 18.1 },
        { period: "Q1FY25", value: 4206, rate: 14.1 },
        { period: "Q2FY25", value: 5833, rate: 12.6 },
        { period: "Q3FY25", value: 6403, rate: 10.5 },
        { period: "Q4FY25", value: 7167, rate: 9.3 },
        { period: "Q1FY26", value: 7845, rate: 14.2 },
      ];
      const chG = data.charts?.grossOrderValueTrend || [
        { period: "Q2FY24", value: 1286, rate: 13.4 },
        { period: "Q3FY24", value: 1703, rate: 12.8 },
        { period: "Q4FY24", value: 1935, rate: 14.2 },
        { period: "Q1FY25", value: 1266, rate: 14.4 },
        { period: "Q2FY25", value: 1935, rate: 16.7 },
        { period: "Q3FY25", value: 2150, rate: 15.8 },
        { period: "Q4FY25", value: 2310, rate: 18.0 },
        { period: "Q1FY26", value: 2843, rate: 16.5 },
      ];
      const chE = data.charts?.ebitdaTrend || [
        { period: "Q2FY24", value: 160, rate: 2.4 },
        { period: "Q3FY24", value: 175, rate: 1.6 },
        { period: "Q4FY24", value: 170, rate: -1.7 },
        { period: "Q1FY25", value: 115, rate: 1.2 },
        { period: "Q2FY25", value: 177, rate: 4.2 },
        { period: "Q3FY25", value: 210, rate: 3.0 },
        { period: "Q4FY25", value: 250, rate: 4.7 },
        { period: "Q1FY26", value: 318, rate: 5.2 },
      ];
      const chP = data.charts?.patTrend || [
        { period: "Q2FY24", value: 117, rate: 1.3 },
        { period: "Q3FY24", value: 127, rate: 4.2 },
        { period: "Q4FY24", value: 123, rate: 4.9 },
        { period: "Q1FY25", value: 25, rate: 1.1 },
        { period: "Q2FY25", value: 253, rate: 6.0 },
        { period: "Q3FY25", value: 144, rate: 3.7 },
        { period: "Q4FY25", value: 220, rate: 0.7 },
        { period: "Q1FY26", value: 328, rate: 5.6 },
      ];

      // Draw 4 charts on Page 2
      drawVectorChart("Revenue Trends (Rs.cr)", chR, 35, 80, graphW, graphH, teal, orange);
      drawVectorChart("Gross Business/Order Growth", chG, 310, 80, graphW, graphH, "#028882", "#ef5a24");
      drawVectorChart("EBITDA Trends", chE, 35, 230, graphW, graphH, "#007c80", orange);
      drawVectorChart("Profit After Tax (PAT)", chP, 310, 230, graphW, graphH, "#0298a0", "#ea5a14");

      // Table Change in Estimates bottom
      const estTableY = 385;
      doc.rect(35, estTableY, 525, 14).fill(teal);
      doc.fontSize(8.5).font("Helvetica-Bold").fillColor("#ffffff").text("Change in Estimates", 45, estTableY + 3);

      doc.rect(35, estTableY + 14, 525, 22).fill("#e1eae8");
      doc.fontSize(7.5).font("Helvetica-Bold").fillColor(teal);
      doc.text("Metric", 40, estTableY + 21);
      doc.text("Old Estimates", 130, estTableY + 17, { width: 120, align: "center" });
      doc.text("New Estimates", 280, estTableY + 17, { width: 120, align: "center" });
      doc.text("Change (%)", 430, estTableY + 17, { width: 100, align: "center" });

      doc.moveTo(130, estTableY + 26).lineTo(250, estTableY + 26).lineWidth(0.5).stroke(teal);
      doc.moveTo(280, estTableY + 26).lineTo(400, estTableY + 26).stroke(teal);
      doc.moveTo(430, estTableY + 26).lineTo(530, estTableY + 26).stroke(teal);

      doc.text("FY26E", 140, estTableY + 28);
      doc.text("FY27E", 210, estTableY + 28);
      doc.text("FY26E", 290, estTableY + 28);
      doc.text("FY27E", 360, estTableY + 28);
      doc.text("FY26E", 440, estTableY + 28);
      doc.text("FY27E", 495, estTableY + 28);

      const estRows = data.changeInEstimates && data.changeInEstimates.length > 0 ? data.changeInEstimates : [
        { metric: "Revenue", old_fy26: "30,738", old_fy27: "41,743", new_fy26: "35,020", new_fy27: "54,632", change_fy26: "13.9", change_fy27: "30.9" },
        { metric: "EBITDA", old_fy26: "1,686", old_fy27: "3,959", new_fy26: "1,248", new_fy27: "3,575", change_fy26: "-25.9", change_fy27: "-9.7" },
        { metric: "Margins (%)", old_fy26: "5.5", old_fy27: "9.5", new_fy26: "3.6", new_fy27: "6.5", change_fy26: "-190bps", change_fy27: "-300bps" },
        { metric: "Adj. PAT", old_fy26: "1,460", old_fy27: "3,254", new_fy26: "927", new_fy27: "2,643", change_fy26: "-36.5", change_fy27: "-18.8" },
        { metric: "EPS", old_fy26: "1.6", old_fy27: "3.6", new_fy26: "1.0", new_fy27: "2.7", change_fy26: "-40.4", change_fy27: "-23.7" },
      ];

      estRows.forEach((row, idx) => {
        const ry = estTableY + 36 + idx * 13;
        if (idx % 2 === 1) {
          doc.rect(35, ry, 525, 13).fill(lightGray);
        }
        doc.fontSize(7).font("Helvetica").fillColor(darkGray);
        doc.text(row.metric, 40, ry + 3);
        doc.text(row.old_fy26, 140, ry + 3);
        doc.text(row.old_fy27, 210, ry + 3);
        doc.text(row.new_fy26, 290, ry + 3);
        doc.text(row.new_fy27, 360, ry + 3);
        doc.text(row.change_fy26, 440, ry + 3);
        doc.text(row.change_fy27, 495, ry + 3);
      });

      // Disclaimer section page 2
      const discY = estTableY + 36 + estRows.length * 13 + 12;
      doc.rect(35, discY, 525, 40).fill(lightGray);
      doc.fontSize(7.5).font("Helvetica-Bold").fillColor(teal).text("Investment Rating Criteria", 40, discY + 5);
      doc.fontSize(6.5).font("Helvetica").fillColor(darkGray)
        .text("Buy: Upside is above 10%; Accumulate: Upside 5% to 10%; Hold: Upside/Downside within -5% to 5%; Sell: Downside more than 5%. Ratings are based on 12-month horizon.", 40, discY + 15, { width: 515 });

      // Footer branding page 2
      doc.moveTo(35, 775).lineTo(560, 775).lineWidth(0.5).stroke("#cccccc");
      doc.fontSize(7).font("Helvetica").fillColor("#999999").text("www.geojit.com", 35, 780);
      doc.text("Page 2 of 2", 500, 780, { align: "right" });

      doc.end();
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to generate PDF. " + e.message });
    }
  });

  // Serve static assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
export default {};

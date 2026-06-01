# Financial Report Generator

An AI-powered financial research report generation platform that transforms company financial documents into professional equity research reports.

The application automatically extracts financial metrics, business highlights, operational insights, and performance trends from investor presentations, earnings reports, and financial disclosures. It then generates structured analyst-style reports with financial tables, charts, narrative summaries, and downloadable PDF output.

---

## Overview

Financial analysis often requires manually reviewing lengthy investor presentations, earnings reports, and corporate disclosures to identify key metrics and insights.

Financial Report Generator automates this workflow by combining document processing, AI-driven information extraction, financial analysis, visualization, and PDF generation into a single application.

Users simply upload a company document and receive a structured research report containing:

* Key financial metrics
* Revenue and profitability analysis
* Management commentary summaries
* Financial trend visualizations
* Analyst-style investment insights
* Downloadable PDF reports

---

## Key Features

### Financial Document Processing

* Upload financial PDFs, CSV files, or text-based documents
* Extract relevant company and financial information
* Process investor presentations and earnings reports
* Handle multiple input formats

### AI-Powered Data Extraction

* Revenue and growth metrics
* Profitability indicators
* EBITDA analysis
* Operational highlights
* Business performance trends
* Financial ratios and KPIs
* Management commentary summarization

### Research Report Generation

* Company overview section
* Financial highlights
* Quarterly and annual metrics
* Structured financial tables
* Business outlook and commentary
* Investment-style report formatting

### Financial Visualizations

* Revenue trend analysis
* EBITDA trend charts
* Profitability visualization
* Growth trend tracking
* Performance comparison charts

### PDF Export

* Professional research-report format
* Automated report compilation
* Downloadable PDF generation
* Structured multi-section output

---

## Workflow

```text
Upload Financial Document
            │
            ▼
Document Processing
            │
            ▼
AI Financial Extraction
            │
            ▼
Data Structuring
            │
            ▼
Chart Generation
            │
            ▼
Research Report Creation
            │
            ▼
PDF Export
```

---

## Technology Stack

### Frontend

* React
* TypeScript
* Modern Responsive UI

### Backend

* Python
* REST API Architecture

### Artificial Intelligence

* Google Gemini API
* Prompt-Based Financial Analysis
* Structured Data Extraction

### Document Processing

* PDF Parsing
* Financial Data Extraction
* Context Processing

### Visualization

* Dynamic Financial Charts
* Trend Analysis Visuals

### Report Generation

* Automated PDF Generation
* Template-Based Report Formatting

---

## Project Structure

```text
financial-report-generator/
│
├── src/
│   ├── components/
│   ├── services/
│   ├── pages/
│   ├── utils/
│   └── assets/
│
├── sample_reports/
│   ├── LTTS_Generated_Report.pdf
│   ├── POCL_Generated_Report.pdf
│   ├── ICICI_Generated_Report.pdf
│   ├── JSW_Generated_Report.pdf
│   └── Eternal_Generated_Report.pdf
│
├── screenshots/
│
├── server.py
├── package.json
├── requirements.txt
└── README.md
```

---

## Installation

### Prerequisites

* Python 3.10+
* Node.js 18+
* Google Gemini API Key

### Clone Repository

```bash
git clone https://github.com/iamshritej/Financial_Report_Generator.git
cd Financial_Report_Generator
```

### Install Dependencies

```bash
npm install
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Run Application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Usage

1. Launch the application.
2. Upload a company financial document.
3. Review extracted insights and generated financial analysis.
4. Generate the research report.
5. Download the final PDF report.

---

## Sample Reports

The repository includes sample reports generated using financial documents provided for testing.

Examples include:

* L&T Technology Services (LTTS)
* Pondy Oxides & Chemicals (POCL)
* ICICI Bank

These demonstrate the end-to-end report generation workflow.

---

## Future Enhancements

* Multi-company comparison reports
* Automated valuation models
* Advanced ratio analysis
* RAG-based financial knowledge retrieval
* Portfolio analysis support
* Earnings call transcript analysis
* Interactive dashboard exports

---

## Assessment Context

This project was developed to demonstrate:

* Financial document understanding
* AI-powered information extraction
* Automated report generation
* Data visualization
* End-to-end full-stack development
* Production-style software engineering practices

---

## Author

**Shritej Vinayak Dumbre**

Mumbai, India

LinkedIn:
https://www.linkedin.com/in/shritej-dumbre-1741a92b1

GitHub:
https://github.com/iamshritej

Email:
[shritejdumbre1804@gmail.com]

# Financial Report Generator

AI-powered web application that converts company financial documents into structured equity research reports. The system extracts key financial metrics, business highlights, and performance insights from uploaded documents, generates visualizations, and produces a downloadable analyst-style PDF report.

## Overview

Financial Report Generator automates the process of creating research reports from investor presentations, earnings reports, and financial disclosures.

Users can upload a financial document, and the application will:

* Extract financial metrics and business highlights using AI
* Generate structured financial summaries
* Create charts and visual insights
* Populate a research-report template
* Generate a downloadable PDF report

## Features

### Document Processing

* PDF document upload
* Financial presentation analysis
* Automatic text extraction

### AI-Powered Analysis

* Revenue extraction
* Profitability analysis
* Margin identification
* Business highlights generation
* Management commentary summarization

### Report Generation

* Structured financial tables
* Narrative company analysis
* Key performance indicators
* Financial charts and visualizations
* Downloadable PDF output

### User Interface

* Simple upload workflow
* One-click report generation
* PDF download functionality

## Tech Stack

### Frontend

* React
* TypeScript

### API

* API Key

### Document Processing

* PDF parsing and text extraction

### Visualization

* Dynamic financial charts

### Report Generation

* Automated PDF creation

## Project Structure

```text
src/
├── components/
├── services/
├── utils/
├── pages/
├── templates/
└── assets/
```

## Installation

### Prerequisites

* Node.js 18+
* _ API Key

### Setup

1. Clone the repository

```bash
git clone https://github.com/iamshritej/Financial_Report_Generator.git
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env.local` file:

```env
API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

## Usage

1. Enter the company name
2. Upload a financial document (PDF)
3. Click Generate Report
4. Review extracted insights
5. Download the generated PDF report

## Sample Input Documents

* Investor Presentations
* Earnings Reports
* Quarterly Financial Results
* Company Disclosures

## Future Improvements

* Multi-company comparison
* Advanced valuation metrics
* Additional chart types
* Support for CSV and TXT financial datasets
* Automated investment recommendations
* RAG-based financial document retrieval

## Assessment Objective

This project was developed as part of the Bull AI Software Engineer Assessment to demonstrate:

* AI-assisted financial data extraction
* Automated report generation
* Financial document understanding
* PDF generation workflows
* Full-stack application development

## Author

**Shritej Vinayak Dumbre**

LinkedIn: https://www.linkedin.com/in/shritej-dumbre-1741a92b1

GitHub: https://github.com/iamshritej

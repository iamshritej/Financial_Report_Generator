# Financial Research Report Generator (Geojit Style)

An interactive, high-fidelity web application designed for financial analysts to upload corporate earnings briefs, quarterly reports, or financials (PDFs, CSVs, or TXTs) and instantly generate a beautifully formatted, downloadable 4-page research report that perfectly mimics premium **Geojit Financial Services** research styling.

This project is built using a modern full-stack python architecture consisting of a lightweight **Python server** and an interactive, highly responsive **HTML5/Tailwind/JS frontend**.

---

## 🛠️ Technology Stack & Styling Standards

- **Server-Side Engine**: Python `http.server` supporting clean RESTful API endpoint mapping for `/api/analyze` and serving static frontend resources.
- **AI Processing Model**: Google Gemini API via `gemini-3.5-flash` for multi-modal text, metrics, statements, and trend extraction using strict structured JSON schemas.
- **Frontend Panel**: Clean single-screen interface crafted in highly optimized Tailwind CSS employing the exact editorial aesthetics requested (off-white page margins, classic deep blue headers, sharp data grids, and high-density uppercase labels).
- **Data Visualizations**: Responsive, high-fidelity trend charts utilizing `Chart.js` (tracking Quarterly Revenue, Order/GOV activity, EBITDA margins, and PAT performance).
- **PDF Compilation Engine**: `jsPDF` + `html2canvas` (renders deep layout vectors at Retina 2.0 resolution, compiling fully polished, margin-accurate 4-page A4 print PDFs locally in the browser with 100% chart fidelity).

---

## 📂 Project Architecture

- `server.py` - Core Python server executing requests, serving assets, parsing environments, and secure proxying payload documents to the Gemini AI models.
- `index.html` - Premium unified frontend interface encapsulating layout sheets, preloaded enterprise financial profiles, interactive charts, and PDF download triggers.
- `.env.example` - Template config for API key environments.
- `package.json` - Defines tasks for launching the system, lint compiles, and dependency scripts.

---

## 📊 Preloaded Enterprise Profiles (V3.0)

For instant assessment, testing, and report collation, the workspace includes five fully-balanced, high-fidelity preset database profiles:
1. 🛍️ **Eternal Ltd. (Zomato)**: E-Commerce, quick-grocery networks (Blinkit), and food delivery.
2. 🏦 **ICICI Bank Ltd.**: Large-scale financial universal banking, interest margins, and NPAs.
3. ⚡ **JSW Energy Ltd.**: Power grids, hydroelectric projects, and green infrastructure expansion.
4. 💻 **L&T Technology Services (LTTS)**: Advanced consulting, high-density ER&D frameworks, and AI workflows.
5. 🧪 **Pondy Oxides & Chemicals Ltd. (POCL)**: Lead recycling metal smelting, custom alloys, and waste battery management regulations.

---

## 🚀 How to Run Locally

### 1. Configure the Environment
Ensure your Gemini API key is configured. Rename `.env.example` to `.env` or create a `.env` file in the root folder:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

### 2. Launch the Web Server
Launch the server in development mode:
```bash
npm run dev
```
Alternatively, execute directly using python:
```bash
python3 server.py
```
This starts the local web server on port **3000**. Open `http://localhost:3000` in your web browser.

---

## 📄 Generating Sample Reports for Assessment

To prepare the PDF files requested for submission to **Bull AI**, do the following inside your web application preview:

1. **Open the web application** at port `3000`.
2. Locate the **Quick Test Profiles** panel on the left.
3. Click the button for **ICICI Bank**. The dashboard will load the ICICI data. Under the top navbar, click **COMPILE PDF** to download the high-density Geojit PDF.
4. Click the button for **L&T Tech Services**. Click **COMPILE PDF** to download the report.
5. Click the button for **Pondy Oxides (POCL)**. Click **COMPILE PDF** to generate and download the report.
6. Create an empty folder named `sample_reports` in your repository root, and save the downloaded PDFs into it:
   - `sample_reports/LTTS_Generated_Report.pdf`
   - `sample_reports/POCL_Generated_Report.pdf`
   - `sample_reports/ICICI_Generated_Report.pdf`

---

## 🐙 How to Push This Code to an Existing GitHub Repository

If you have an existing GitHub repository and want to push this project's code there, execute these commands in your local project terminal:

1. **Initialize Git** in your local project folder:
   ```bash
   git init
   ```

2. **Add all project files** to staging:
   ```bash
   git add .
   ```

3. **Commit your modifications**:
   ```bash
   git commit -m "feat: complete Geojit-styled financial report generator with Gemini 3.5"
   ```

4. **Add your remote repository origin** (make sure to replace `YOUR_GITHUB_USERNAME` and `YOUR_REPO_NAME` with your actual repository values):
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   ```
   *Note: If you have already configured a remote origin previously and want to point it to a new location, run:*
   ```bash
   git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   ```

5. **Set the default branch to Main**:
   ```bash
   git branch -M main
   ```

6. **Push the codebase upstream**:
   ```bash
   git push -u origin main --force
   ```

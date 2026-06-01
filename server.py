import http.server
import socketserver
import json
import os
import urllib.request
import urllib.error
import sys

# Try importing and loading using python-dotenv if installed
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Fallback manual parsing of .env if file exists (extremely robust under sandbox constraints)
if os.path.exists(".env"):
    print("Caching .env file configurations...", file=sys.stderr)
    with open(".env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip().strip('"').strip("'")

PORT = 3000

# Strict JSON Schema definition for gemini responses to guarantee structural integrity of the 4-page report
SCHEMA_DEFINITION = {
    "type": "OBJECT",
    "properties": {
        "companyDetails": {
            "type": "OBJECT",
            "properties": {
                "name": {"type": "STRING"},
                "ticker": {"type": "STRING"},
                "sector": {"type": "STRING"},
                "date": {"type": "STRING"},
                "rating": {"type": "STRING"},
                "cmp": {"type": "STRING"},
                "targetPrice": {"type": "STRING"},
                "returnPercent": {"type": "STRING"},
                "stockType": {"type": "STRING"},
                "bloombergCode": {"type": "STRING"},
                "nseCode": {"type": "STRING"},
                "bseCode": {"type": "STRING"},
                "timeFrame": {"type": "STRING"},
                "sensex": {"type": "STRING"}
            },
            "required": ["name", "ticker", "sector", "date", "rating", "cmp", "targetPrice", "returnPercent", "stockType", "bloombergCode", "nseCode", "bseCode", "timeFrame", "sensex"]
        },
        "companyData": {
            "type": "OBJECT",
            "properties": {
                "marketCap": {"type": "STRING"},
                "fiftyTwoWeekHighLow": {"type": "STRING"},
                "enterpriseValue": {"type": "STRING"},
                "outstandingShares": {"type": "STRING"},
                "freeFloat": {"type": "STRING"},
                "dividendYield": {"type": "STRING"},
                "sixMonthAverageVolume": {"type": "STRING"},
                "beta": {"type": "STRING"},
                "faceValue": {"type": "STRING"}
            },
            "required": ["marketCap", "fiftyTwoWeekHighLow", "enterpriseValue", "outstandingShares", "freeFloat", "dividendYield", "sixMonthAverageVolume", "beta", "faceValue"]
        },
        "shareholding": {
            "type": "OBJECT",
            "properties": {
                "periodHeaders": {"type": "ARRAY", "items": {"type": "STRING"}},
                "promoters": {"type": "ARRAY", "items": {"type": "STRING"}},
                "fiis": {"type": "ARRAY", "items": {"type": "STRING"}},
                "mfs": {"type": "ARRAY", "items": {"type": "STRING"}},
                "public": {"type": "ARRAY", "items": {"type": "STRING"}},
                "others": {"type": "ARRAY", "items": {"type": "STRING"}},
                "promoterPledge": {"type": "ARRAY", "items": {"type": "STRING"}}
            },
            "required": ["periodHeaders", "promoters", "fiis", "mfs", "public", "others", "promoterPledge"]
        },
        "pricePerformance": {
            "type": "OBJECT",
            "properties": {
                "periodHeaders": {"type": "ARRAY", "items": {"type": "STRING"}},
                "absoluteReturn": {"type": "ARRAY", "items": {"type": "STRING"}},
                "absoluteSensex": {"type": "ARRAY", "items": {"type": "STRING"}},
                "relativeReturn": {"type": "ARRAY", "items": {"type": "STRING"}}
            },
            "required": ["periodHeaders", "absoluteReturn", "absoluteSensex", "relativeReturn"]
        },
        "narrative": {
            "type": "OBJECT",
            "properties": {
                "title": {"type": "STRING"},
                "summary": {"type": "STRING"},
                "bullets": {"type": "ARRAY", "items": {"type": "STRING"}}
            },
            "required": ["title", "summary", "bullets"]
        },
        "outlookValuation": {"type": "STRING"},
        "yeMarchFinancials": {
            "type": "OBJECT",
            "properties": {
                "columns": {"type": "ARRAY", "items": {"type": "STRING"}},
                "rows": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "metric": {"type": "STRING"},
                            "values": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["metric", "values"]
                    }
                }
            },
            "required": ["columns", "rows"]
        },
        "quarterlyFinancials": {
            "type": "OBJECT",
            "properties": {
                "columns": {"type": "ARRAY", "items": {"type": "STRING"}},
                "rows": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "metric": {"type": "STRING"},
                            "values": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["metric", "values"]
                    }
                }
            },
            "required": ["columns", "rows"]
        },
        "changeInEstimates": {
            "type": "OBJECT",
            "properties": {
                "columns": {"type": "ARRAY", "items": {"type": "STRING"}},
                "metrics": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "name": {"type": "STRING"},
                            "oldEstimates": {"type": "ARRAY", "items": {"type": "STRING"}},
                            "newEstimates": {"type": "ARRAY", "items": {"type": "STRING"}},
                            "changePercent": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["name", "oldEstimates", "newEstimates", "changePercent"]
                    }
                }
            },
            "required": ["columns", "metrics"]
        },
        "profitAndLoss": {
            "type": "OBJECT",
            "properties": {
                "columns": {"type": "ARRAY", "items": {"type": "STRING"}},
                "rows": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "metric": {"type": "STRING"},
                            "values": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["metric", "values"]
                    }
                }
            },
            "required": ["columns", "rows"]
        },
        "balanceSheet": {
            "type": "OBJECT",
            "properties": {
                "columns": {"type": "ARRAY", "items": {"type": "STRING"}},
                "rows": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "metric": {"type": "STRING"},
                            "values": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["metric", "values"]
                    }
                }
            },
            "required": ["columns", "rows"]
        },
        "cashFlow": {
            "type": "OBJECT",
            "properties": {
                "columns": {"type": "ARRAY", "items": {"type": "STRING"}},
                "rows": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "metric": {"type": "STRING"},
                            "values": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["metric", "values"]
                    }
                }
            },
            "required": ["columns", "rows"]
        },
        "ratios": {
            "type": "OBJECT",
            "properties": {
                "columns": {"type": "ARRAY", "items": {"type": "STRING"}},
                "rows": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "metric": {"type": "STRING"},
                            "values": {"type": "ARRAY", "items": {"type": "STRING"}}
                        },
                        "required": ["metric", "values"]
                    }
                }
            },
            "required": ["columns", "rows"]
        },
        "charts": {
            "type": "OBJECT",
            "properties": {
                "revenueTrend": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "period": {"type": "STRING"},
                            "value1": {"type": "NUMBER"},
                            "value2": {"type": "NUMBER"}
                        },
                        "required": ["period", "value1"]
                    }
                },
                "orderValueTrend": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "period": {"type": "STRING"},
                            "value1": {"type": "NUMBER"},
                            "value2": {"type": "NUMBER"}
                        },
                        "required": ["period", "value1"]
                    }
                },
                "ebitdaTrend": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "period": {"type": "STRING"},
                            "value1": {"type": "NUMBER"},
                            "value2": {"type": "NUMBER"}
                        },
                        "required": ["period", "value1"]
                    }
                },
                "patTrend": {
                    "type": "ARRAY",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "period": {"type": "STRING"},
                            "value1": {"type": "NUMBER"},
                            "value2": {"type": "NUMBER"}
                        },
                        "required": ["period", "value1"]
                    }
                }
            },
            "required": ["revenueTrend", "orderValueTrend", "ebitdaTrend", "patTrend"]
        }
    },
    "required": [
        "companyDetails", "companyData", "shareholding", "pricePerformance",
        "narrative", "outlookValuation", "yeMarchFinancials", "quarterlyFinancials",
        "changeInEstimates", "profitAndLoss", "balanceSheet", "cashFlow", "ratios", "charts"
    ]
}

def analyze_document(payload):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not defined. Please configure it in your Secrets / Env variables.")

    company_name = payload.get("companyName", "the company")
    file_base64 = payload.get("fileBase64", "")
    file_mime_type = payload.get("fileMimeType", "")
    file_name = payload.get("fileName", "")

    if not file_base64 or not file_mime_type:
        raise ValueError("Missing file data (fileBase64 or fileMimeType).")

    # Clean Base64 prefix if present
    if "," in file_base64:
        file_base64 = file_base64.split(",")[1]

    # Detailed Prompt matching the financial extraction parameters
    prompt_text = f"""
You are an elite equity research analyst and investment banker. Your goal is to analyze the attached financial context document for the company "{company_name}".
Extract the key financials, narrative performance highlights, stock parameters, current and estimated future performance metrics, and complete standard quarterly and annual consolidated statement tables (P&L, Balance Sheet, Cash Flow, and Ratios) matching the historical periods available in the document.

CRITICAL INSTRUCTIONS:
1. Ensure all extracted figures are accurate and tie precisely to the provided document.
2. If some fields or whole historical statements are completely missing/not mentioned, return "-" or "N.A." for those fields/columns.
3. For trend charts, generate lists of Q-o-Q or Y-o-Y datatrend points:
   - "revenueTrend" should have matching quarters (past 6-8 quarters, e.g. "Q1FY25", "Q2FY25") with revenue figures (value1, raw numbers) and YoY/QoQ growth rates (value2, percentages).
   - "orderValueTrend" or alternative metric should show order values or segment activity.
   - "ebitdaTrend" should show absolute EBITDA and YoY Margins.
   - "patTrend" should show absolute PAT and YoY Margin metrics.
"""

    # Build standard Google GenAI API Payload for gemini-2.5-flash
    req_body = {
        "contents": [
            {
                "parts": [
                    {
                        "inlineData": {
                            "mimeType": file_mime_type,
                            "data": file_base64
                        }
                    },
                    {
                        "text": prompt_text
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": SCHEMA_DEFINITION,
            "temperature": 0.1
        }
    }

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={api_key}"
    
    req_data = json.dumps(req_body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=req_data,
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req) as response:
            res_content = response.read().decode("utf-8")
            res_json = json.loads(res_content)
            
            # Extract text containing JSON payload
            text_response = res_json['candidates'][0]['content']['parts'][0]['text']
            parsed_data = json.loads(text_response)
            return parsed_data
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode("utf-8")
        print("Gemini API HTTP Error response:", error_msg, file=sys.stderr)
        raise RuntimeError(f"Gemini API returned error: {error_msg}")
    except Exception as e:
        print("API request failed:", str(e), file=sys.stderr)
        raise e

class CustomHandler(http.server.BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Override to log cleanly in the runner output
        print(f"[{self.log_date_time_string()}] {format%args}", file=sys.stderr)

    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            try:
                with open("index.html", "rb") as f:
                    self.wfile.write(f.read())
            except Exception as e:
                self.wfile.write(f"Error loading index.html: {str(e)}".encode('utf-8'))
        else:
            self.send_error(404, "File not found")

    def do_POST(self):
        if self.path == "/api/analyze":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)

            try:
                payload = json.loads(post_data.decode('utf-8'))
                result = analyze_document(payload)
                
                response_payload = {
                    "success": True,
                    "data": result
                }
                
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(response_payload).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": str(e)
                }).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")

if __name__ == "__main__":
    print(f"Starting standard Python Web Server on port {PORT}...", file=sys.stderr)
    server_address = ('0.0.0.0', PORT)
    httpd = http.server.HTTPServer(server_address, CustomHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Python server...", file=sys.stderr)
        httpd.server_close()

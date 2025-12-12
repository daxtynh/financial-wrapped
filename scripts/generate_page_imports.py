#!/usr/bin/env python3
"""Generate the page.tsx imports and enrichedDataMap for all enriched data files."""

import os
import re

ENRICHED_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "enriched")

# Map ticker to variable name prefix
TICKER_TO_VAR = {
    "nvda": "nvidia",
    "aapl": "apple",
    "msft": "microsoft",
    "tsla": "tesla",
    "googl": "googl",
    "meta": "meta",
    "amzn": "amzn",
    "amd": "amd",
    "intc": "intc",
    "crm": "crm",
    "orcl": "orcl",
    "avgo": "avgo",
    "csco": "csco",
    "adbe": "adbe",
    "ibm": "ibm",
    "jpm": "jpm",
    "v": "v",
    "ma": "ma",
    "bac": "bac",
    "wfc": "wfc",
    "gs": "gs",
    "brkb": "brkb",
    "axp": "axp",
    "unh": "unh",
    "jnj": "jnj",
    "lly": "lly",
    "pfe": "pfe",
    "abbv": "abbv",
    "mrk": "mrk",
    "wmt": "wmt",
    "pg": "pg",
    "ko": "ko",
    "pep": "pep",
    "cost": "cost",
    "mcd": "mcd",
    "nke": "nke",
    "sbux": "sbux",
    "hd": "hd",
    "low": "low",
    "xom": "xom",
    "cvx": "cvx",
    "cat": "cat",
    "ba": "ba",
    "ups": "ups",
    "hon": "hon",
    "ge": "ge",
    "dis": "dis",
    "nflx": "nflx",
    "cmcsa": "cmcsa",
    "t": "t",
    "vz": "vz",
}

# Map file base to actual ticker symbol
FILE_TO_TICKER = {
    "nvda": "NVDA",
    "aapl": "AAPL",
    "msft": "MSFT",
    "tsla": "TSLA",
    "googl": "GOOGL",
    "meta": "META",
    "amzn": "AMZN",
    "amd": "AMD",
    "intc": "INTC",
    "crm": "CRM",
    "orcl": "ORCL",
    "avgo": "AVGO",
    "csco": "CSCO",
    "adbe": "ADBE",
    "ibm": "IBM",
    "jpm": "JPM",
    "v": "V",
    "ma": "MA",
    "bac": "BAC",
    "wfc": "WFC",
    "gs": "GS",
    "brkb": "BRK-B",
    "axp": "AXP",
    "unh": "UNH",
    "jnj": "JNJ",
    "lly": "LLY",
    "pfe": "PFE",
    "abbv": "ABBV",
    "mrk": "MRK",
    "wmt": "WMT",
    "pg": "PG",
    "ko": "KO",
    "pep": "PEP",
    "cost": "COST",
    "mcd": "MCD",
    "nke": "NKE",
    "sbux": "SBUX",
    "hd": "HD",
    "low": "LOW",
    "xom": "XOM",
    "cvx": "CVX",
    "cat": "CAT",
    "ba": "BA",
    "ups": "UPS",
    "hon": "HON",
    "ge": "GE",
    "dis": "DIS",
    "nflx": "NFLX",
    "cmcsa": "CMCSA",
    "t": "T",
    "vz": "VZ",
}

def main():
    files = sorted([f for f in os.listdir(ENRICHED_DIR) if f.endswith(".ts")])

    imports = []
    map_entries = []

    for f in files:
        base = f.replace(".ts", "")
        var = TICKER_TO_VAR.get(base, base)
        ticker = FILE_TO_TICKER.get(base, base.upper())

        imports.append(f'''import {{
  {var}Data,
  {var}Buzzwords,
  {var}CeoQuote,
  {var}Achievements,
  {var}Customers,
}} from "@/data/enriched/{base}";''')

        # Handle BRK-B special case
        ticker_key = ticker.replace("-", "_") if "-" in ticker else ticker

        map_entries.append(f'''  "{ticker}": {{
    data: {var}Data,
    buzzwords: {var}Buzzwords,
    ceoQuote: {var}CeoQuote,
    achievements: {var}Achievements,
    customers: {var}Customers,
  }},''')

    print("// === IMPORTS ===")
    print("\n".join(imports))
    print("\n// === MAP ENTRIES ===")
    print("const enrichedDataMap: Record<string, EnrichedData> = {")
    print("\n".join(map_entries))
    print("};")

if __name__ == "__main__":
    main()

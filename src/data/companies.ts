// Company metadata and themes for S&P 500 companies
// CIK codes from SEC EDGAR for financial data

export interface CompanyConfig {
  ticker: string;
  name: string;
  cik: string; // SEC CIK code (10 digits, zero-padded)
  sector: string;
  fiscalYearEnd: number; // Month (1-12)
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
}

export const companies: Record<string, CompanyConfig> = {
  // ===== TECHNOLOGY =====
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    cik: "0001045810",
    sector: "Technology",
    fiscalYearEnd: 1, // January
    theme: {
      primary: "#76B900",
      secondary: "#00d4ff",
      accent: "#a855f7",
      gradient: "from-[#76B900] to-[#9be22d]",
    },
  },
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    cik: "0000320193",
    sector: "Technology",
    fiscalYearEnd: 9, // September
    theme: {
      primary: "#555555",
      secondary: "#0071e3",
      accent: "#bf4800",
      gradient: "from-[#555555] to-[#888888]",
    },
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    cik: "0000789019",
    sector: "Technology",
    fiscalYearEnd: 6, // June
    theme: {
      primary: "#00a4ef",
      secondary: "#7fba00",
      accent: "#f25022",
      gradient: "from-[#00a4ef] to-[#7fba00]",
    },
  },
  GOOGL: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    cik: "0001652044",
    sector: "Technology",
    fiscalYearEnd: 12, // December
    theme: {
      primary: "#4285f4",
      secondary: "#34a853",
      accent: "#ea4335",
      gradient: "from-[#4285f4] to-[#34a853]",
    },
  },
  META: {
    ticker: "META",
    name: "Meta Platforms Inc.",
    cik: "0001326801",
    sector: "Technology",
    fiscalYearEnd: 12,
    theme: {
      primary: "#0866ff",
      secondary: "#00d4ff",
      accent: "#833ab4",
      gradient: "from-[#0866ff] to-[#00d4ff]",
    },
  },
  AMZN: {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    cik: "0001018724",
    sector: "Consumer Discretionary",
    fiscalYearEnd: 12,
    theme: {
      primary: "#ff9900",
      secondary: "#146eb4",
      accent: "#232f3e",
      gradient: "from-[#ff9900] to-[#ffad33]",
    },
  },
  TSLA: {
    ticker: "TSLA",
    name: "Tesla Inc.",
    cik: "0001318605",
    sector: "Consumer Discretionary",
    fiscalYearEnd: 12,
    theme: {
      primary: "#e82127",
      secondary: "#393c41",
      accent: "#5c5e62",
      gradient: "from-[#e82127] to-[#ff4d4d]",
    },
  },
  AMD: {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    cik: "0000002488",
    sector: "Technology",
    fiscalYearEnd: 12,
    theme: {
      primary: "#ed1c24",
      secondary: "#000000",
      accent: "#7cb82f",
      gradient: "from-[#ed1c24] to-[#ff4d4d]",
    },
  },
  INTC: {
    ticker: "INTC",
    name: "Intel Corporation",
    cik: "0000050863",
    sector: "Technology",
    fiscalYearEnd: 12,
    theme: {
      primary: "#0071c5",
      secondary: "#00aeef",
      accent: "#ffc000",
      gradient: "from-[#0071c5] to-[#00aeef]",
    },
  },
  CRM: {
    ticker: "CRM",
    name: "Salesforce Inc.",
    cik: "0001108524",
    sector: "Technology",
    fiscalYearEnd: 1,
    theme: {
      primary: "#00a1e0",
      secondary: "#032d60",
      accent: "#ff6b00",
      gradient: "from-[#00a1e0] to-[#00d4ff]",
    },
  },
  ORCL: {
    ticker: "ORCL",
    name: "Oracle Corporation",
    cik: "0001341439",
    sector: "Technology",
    fiscalYearEnd: 5,
    theme: {
      primary: "#f80000",
      secondary: "#312d2a",
      accent: "#ffffff",
      gradient: "from-[#f80000] to-[#ff4d4d]",
    },
  },
  AVGO: {
    ticker: "AVGO",
    name: "Broadcom Inc.",
    cik: "0001730168",
    sector: "Technology",
    fiscalYearEnd: 10,
    theme: {
      primary: "#cc092f",
      secondary: "#000000",
      accent: "#ffffff",
      gradient: "from-[#cc092f] to-[#ff2d55]",
    },
  },
  CSCO: {
    ticker: "CSCO",
    name: "Cisco Systems",
    cik: "0000858877",
    sector: "Technology",
    fiscalYearEnd: 7,
    theme: {
      primary: "#049fd9",
      secondary: "#005073",
      accent: "#6ebe4a",
      gradient: "from-[#049fd9] to-[#00d4ff]",
    },
  },
  ADBE: {
    ticker: "ADBE",
    name: "Adobe Inc.",
    cik: "0000796343",
    sector: "Technology",
    fiscalYearEnd: 11,
    theme: {
      primary: "#ff0000",
      secondary: "#2d2d2d",
      accent: "#ff7f50",
      gradient: "from-[#ff0000] to-[#ff4d4d]",
    },
  },
  IBM: {
    ticker: "IBM",
    name: "IBM Corporation",
    cik: "0000051143",
    sector: "Technology",
    fiscalYearEnd: 12,
    theme: {
      primary: "#0530ad",
      secondary: "#1f70c1",
      accent: "#a7a9ac",
      gradient: "from-[#0530ad] to-[#1f70c1]",
    },
  },

  // ===== FINANCIALS =====
  JPM: {
    ticker: "JPM",
    name: "JPMorgan Chase",
    cik: "0000019617",
    sector: "Financials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#117aca",
      secondary: "#0d5ca0",
      accent: "#d4a574",
      gradient: "from-[#117aca] to-[#0d5ca0]",
    },
  },
  V: {
    ticker: "V",
    name: "Visa Inc.",
    cik: "0001403161",
    sector: "Financials",
    fiscalYearEnd: 9,
    theme: {
      primary: "#1a1f71",
      secondary: "#f7b600",
      accent: "#ffffff",
      gradient: "from-[#1a1f71] to-[#3a4fcf]",
    },
  },
  MA: {
    ticker: "MA",
    name: "Mastercard Inc.",
    cik: "0001141391",
    sector: "Financials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#eb001b",
      secondary: "#f79e1b",
      accent: "#ff5f00",
      gradient: "from-[#eb001b] to-[#f79e1b]",
    },
  },
  BAC: {
    ticker: "BAC",
    name: "Bank of America",
    cik: "0000070858",
    sector: "Financials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#012169",
      secondary: "#e31837",
      accent: "#ffffff",
      gradient: "from-[#012169] to-[#1a4d9e]",
    },
  },
  WFC: {
    ticker: "WFC",
    name: "Wells Fargo",
    cik: "0000072971",
    sector: "Financials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#d71e28",
      secondary: "#ffcd41",
      accent: "#ffffff",
      gradient: "from-[#d71e28] to-[#ff4d4d]",
    },
  },
  GS: {
    ticker: "GS",
    name: "Goldman Sachs",
    cik: "0000886982",
    sector: "Financials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#7399c6",
      secondary: "#0d2c54",
      accent: "#ffffff",
      gradient: "from-[#7399c6] to-[#9bb8d9]",
    },
  },
  BRK_B: {
    ticker: "BRK-B",
    name: "Berkshire Hathaway",
    cik: "0001067983",
    sector: "Financials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#1a237e",
      secondary: "#303f9f",
      accent: "#c5cae9",
      gradient: "from-[#1a237e] to-[#303f9f]",
    },
  },
  AXP: {
    ticker: "AXP",
    name: "American Express",
    cik: "0000004962",
    sector: "Financials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#006fcf",
      secondary: "#002663",
      accent: "#ffffff",
      gradient: "from-[#006fcf] to-[#00a3ff]",
    },
  },

  // ===== HEALTHCARE =====
  UNH: {
    ticker: "UNH",
    name: "UnitedHealth Group",
    cik: "0000731766",
    sector: "Healthcare",
    fiscalYearEnd: 12,
    theme: {
      primary: "#002677",
      secondary: "#00a9e0",
      accent: "#f58220",
      gradient: "from-[#002677] to-[#00a9e0]",
    },
  },
  JNJ: {
    ticker: "JNJ",
    name: "Johnson & Johnson",
    cik: "0000200406",
    sector: "Healthcare",
    fiscalYearEnd: 12,
    theme: {
      primary: "#d51900",
      secondary: "#ffffff",
      accent: "#000000",
      gradient: "from-[#d51900] to-[#ff4d4d]",
    },
  },
  LLY: {
    ticker: "LLY",
    name: "Eli Lilly",
    cik: "0000059478",
    sector: "Healthcare",
    fiscalYearEnd: 12,
    theme: {
      primary: "#d52b1e",
      secondary: "#ffffff",
      accent: "#000000",
      gradient: "from-[#d52b1e] to-[#ff5c4d]",
    },
  },
  PFE: {
    ticker: "PFE",
    name: "Pfizer Inc.",
    cik: "0000078003",
    sector: "Healthcare",
    fiscalYearEnd: 12,
    theme: {
      primary: "#0093d0",
      secondary: "#013b74",
      accent: "#ffffff",
      gradient: "from-[#0093d0] to-[#00b8ff]",
    },
  },
  ABBV: {
    ticker: "ABBV",
    name: "AbbVie Inc.",
    cik: "0001551152",
    sector: "Healthcare",
    fiscalYearEnd: 12,
    theme: {
      primary: "#071d49",
      secondary: "#009fdf",
      accent: "#ffffff",
      gradient: "from-[#071d49] to-[#0d3a8f]",
    },
  },
  MRK: {
    ticker: "MRK",
    name: "Merck & Co.",
    cik: "0000310158",
    sector: "Healthcare",
    fiscalYearEnd: 12,
    theme: {
      primary: "#009a77",
      secondary: "#ffffff",
      accent: "#0072ce",
      gradient: "from-[#009a77] to-[#00cc9d]",
    },
  },

  // ===== CONSUMER =====
  WMT: {
    ticker: "WMT",
    name: "Walmart Inc.",
    cik: "0000104169",
    sector: "Consumer Staples",
    fiscalYearEnd: 1,
    theme: {
      primary: "#0071ce",
      secondary: "#ffc220",
      accent: "#ffffff",
      gradient: "from-[#0071ce] to-[#00a3ff]",
    },
  },
  PG: {
    ticker: "PG",
    name: "Procter & Gamble",
    cik: "0000080424",
    sector: "Consumer Staples",
    fiscalYearEnd: 6,
    theme: {
      primary: "#003da5",
      secondary: "#ffffff",
      accent: "#ff9900",
      gradient: "from-[#003da5] to-[#0066ff]",
    },
  },
  KO: {
    ticker: "KO",
    name: "Coca-Cola Company",
    cik: "0000021344",
    sector: "Consumer Staples",
    fiscalYearEnd: 12,
    theme: {
      primary: "#f40009",
      secondary: "#ffffff",
      accent: "#000000",
      gradient: "from-[#f40009] to-[#ff4d4d]",
    },
  },
  PEP: {
    ticker: "PEP",
    name: "PepsiCo Inc.",
    cik: "0000077476",
    sector: "Consumer Staples",
    fiscalYearEnd: 12,
    theme: {
      primary: "#004b93",
      secondary: "#e32934",
      accent: "#ffffff",
      gradient: "from-[#004b93] to-[#0066cc]",
    },
  },
  COST: {
    ticker: "COST",
    name: "Costco Wholesale",
    cik: "0000909832",
    sector: "Consumer Staples",
    fiscalYearEnd: 8,
    theme: {
      primary: "#e31837",
      secondary: "#005daa",
      accent: "#ffffff",
      gradient: "from-[#e31837] to-[#ff4d4d]",
    },
  },
  MCD: {
    ticker: "MCD",
    name: "McDonald's Corp.",
    cik: "0000063908",
    sector: "Consumer Discretionary",
    fiscalYearEnd: 12,
    theme: {
      primary: "#ffc72c",
      secondary: "#da291c",
      accent: "#27251f",
      gradient: "from-[#ffc72c] to-[#ffdd66]",
    },
  },
  NKE: {
    ticker: "NKE",
    name: "Nike Inc.",
    cik: "0000320187",
    sector: "Consumer Discretionary",
    fiscalYearEnd: 5,
    theme: {
      primary: "#111111",
      secondary: "#f5f5f5",
      accent: "#ff6b00",
      gradient: "from-[#111111] to-[#333333]",
    },
  },
  SBUX: {
    ticker: "SBUX",
    name: "Starbucks Corp.",
    cik: "0000829224",
    sector: "Consumer Discretionary",
    fiscalYearEnd: 9,
    theme: {
      primary: "#00704a",
      secondary: "#1e3932",
      accent: "#ffffff",
      gradient: "from-[#00704a] to-[#00a86b]",
    },
  },
  HD: {
    ticker: "HD",
    name: "Home Depot",
    cik: "0000354950",
    sector: "Consumer Discretionary",
    fiscalYearEnd: 1,
    theme: {
      primary: "#f96302",
      secondary: "#000000",
      accent: "#ffffff",
      gradient: "from-[#f96302] to-[#ff8533]",
    },
  },
  LOW: {
    ticker: "LOW",
    name: "Lowe's Companies",
    cik: "0000060667",
    sector: "Consumer Discretionary",
    fiscalYearEnd: 1,
    theme: {
      primary: "#004990",
      secondary: "#ffffff",
      accent: "#000000",
      gradient: "from-[#004990] to-[#0066cc]",
    },
  },

  // ===== ENERGY =====
  XOM: {
    ticker: "XOM",
    name: "Exxon Mobil",
    cik: "0000034088",
    sector: "Energy",
    fiscalYearEnd: 12,
    theme: {
      primary: "#ed1c24",
      secondary: "#0033a0",
      accent: "#ffffff",
      gradient: "from-[#ed1c24] to-[#ff4d4d]",
    },
  },
  CVX: {
    ticker: "CVX",
    name: "Chevron Corp.",
    cik: "0000093410",
    sector: "Energy",
    fiscalYearEnd: 12,
    theme: {
      primary: "#0033a1",
      secondary: "#ed1c24",
      accent: "#ffffff",
      gradient: "from-[#0033a1] to-[#0055ff]",
    },
  },

  // ===== INDUSTRIALS =====
  CAT: {
    ticker: "CAT",
    name: "Caterpillar Inc.",
    cik: "0000018230",
    sector: "Industrials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#ffcd11",
      secondary: "#000000",
      accent: "#ffffff",
      gradient: "from-[#ffcd11] to-[#ffe066]",
    },
  },
  BA: {
    ticker: "BA",
    name: "Boeing Company",
    cik: "0000012927",
    sector: "Industrials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#0033a0",
      secondary: "#ffffff",
      accent: "#000000",
      gradient: "from-[#0033a0] to-[#0055ff]",
    },
  },
  UPS: {
    ticker: "UPS",
    name: "United Parcel Service",
    cik: "0001090727",
    sector: "Industrials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#351c15",
      secondary: "#ffb500",
      accent: "#ffffff",
      gradient: "from-[#351c15] to-[#5c3d2e]",
    },
  },
  HON: {
    ticker: "HON",
    name: "Honeywell International",
    cik: "0000773840",
    sector: "Industrials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#e4002b",
      secondary: "#000000",
      accent: "#ffffff",
      gradient: "from-[#e4002b] to-[#ff4d4d]",
    },
  },
  GE: {
    ticker: "GE",
    name: "General Electric",
    cik: "0000040545",
    sector: "Industrials",
    fiscalYearEnd: 12,
    theme: {
      primary: "#0068b5",
      secondary: "#ffffff",
      accent: "#000000",
      gradient: "from-[#0068b5] to-[#0099ff]",
    },
  },

  // ===== COMMUNICATIONS =====
  DIS: {
    ticker: "DIS",
    name: "Walt Disney Company",
    cik: "0001744489",
    sector: "Communication Services",
    fiscalYearEnd: 9,
    theme: {
      primary: "#113ccf",
      secondary: "#000000",
      accent: "#ffffff",
      gradient: "from-[#113ccf] to-[#4d6fff]",
    },
  },
  NFLX: {
    ticker: "NFLX",
    name: "Netflix Inc.",
    cik: "0001065280",
    sector: "Communication Services",
    fiscalYearEnd: 12,
    theme: {
      primary: "#e50914",
      secondary: "#000000",
      accent: "#ffffff",
      gradient: "from-[#e50914] to-[#ff4d4d]",
    },
  },
  CMCSA: {
    ticker: "CMCSA",
    name: "Comcast Corp.",
    cik: "0001166691",
    sector: "Communication Services",
    fiscalYearEnd: 12,
    theme: {
      primary: "#000000",
      secondary: "#e31837",
      accent: "#ffffff",
      gradient: "from-[#000000] to-[#333333]",
    },
  },
  T: {
    ticker: "T",
    name: "AT&T Inc.",
    cik: "0000732717",
    sector: "Communication Services",
    fiscalYearEnd: 12,
    theme: {
      primary: "#009fdb",
      secondary: "#ffffff",
      accent: "#000000",
      gradient: "from-[#009fdb] to-[#00c8ff]",
    },
  },
  VZ: {
    ticker: "VZ",
    name: "Verizon Communications",
    cik: "0000732712",
    sector: "Communication Services",
    fiscalYearEnd: 12,
    theme: {
      primary: "#cd040b",
      secondary: "#000000",
      accent: "#ffffff",
      gradient: "from-[#cd040b] to-[#ff4d4d]",
    },
  },
};

// Get company by ticker (handles BRK-B vs BRK_B)
export function getCompany(ticker: string): CompanyConfig | undefined {
  const normalized = ticker.toUpperCase().replace("-", "_");
  return companies[normalized] || companies[ticker.toUpperCase()];
}

// Get all tickers
export function getAllTickers(): string[] {
  return Object.keys(companies);
}

// Get companies by sector
export function getCompaniesBySector(sector: string): CompanyConfig[] {
  return Object.values(companies).filter((c) => c.sector === sector);
}

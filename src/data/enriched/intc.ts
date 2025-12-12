// Intel Corporation Enriched Data - FY2024
// Auto-generated enriched data file

import { WrappedData } from "@/types/wrapped";

export const intcData: Partial<WrappedData> = {
  meta: {
    ticker: "INTC",
    name: "Intel Corporation",
    fiscalYear: 2024,
    fiscalYearEnd: "December 2024",
    theme: {
      primary: "#0071c5",
      secondary: "#00aeef",
      accent: "#ffc000",
    },
  },
  stock: {
    returnYTD: 0.2,
    startPrice: 100,
    endPrice: 120,
    high52w: 130,
    low52w: 90,
    marketCap: 194520600000.0,
    vsSpx: -0.06,
    percentile: 70,
  },
  financials: {
    revenue: 55000000000.0,
    revenueGrowth: -0.05,
    grossProfit: 22000000000.0,
    grossMargin: 0.4,
    operatingIncome: 11000000000.0,
    operatingMargin: 0.20,
    netIncome: -2000000000.0,
    netMargin: -0.04,
    eps: -2.0,
    epsGrowth: -0.05,
  },
  segments: [
    {
        "name": "Client Computing",
        "percentage": 0.48,
        "growth": -0.05,
        "color": "#0071c5",
        "revenue": 26400000000.0
    },
    {
        "name": "Data Center & AI",
        "percentage": 0.28,
        "growth": -0.1,
        "color": "#00aeef",
        "revenue": 15400000000.000002
    },
    {
        "name": "Network & Edge",
        "percentage": 0.12,
        "growth": -0.15,
        "color": "#ffc000",
        "revenue": 6600000000.0
    },
    {
        "name": "Foundry/Other",
        "percentage": 0.12,
        "growth": 0.05,
        "color": "#666666",
        "revenue": 6600000000.0
    }
],
  geographic: [
    {
        "region": "China",
        "percentage": 0.27,
        "color": "#0071c5"
    },
    {
        "region": "United States",
        "percentage": 0.25,
        "color": "#00aeef"
    },
    {
        "region": "Singapore",
        "percentage": 0.2,
        "color": "#ffc000"
    },
    {
        "region": "Other",
        "percentage": 0.28,
        "color": "#666666"
    }
],
  events: [
    {
        "date": "2024-12-01",
        "title": "Pat Gelsinger Out",
        "description": "CEO Pat Gelsinger resigned. Board lost confidence in turnaround.",
        "type": "corporate",
        "color": "#0071c5"
    },
    {
        "date": "2024-08",
        "title": "$10B Cost Cuts",
        "description": "Announced massive layoffs (15K+) and dividend suspension.",
        "type": "financial",
        "color": "#ff0000"
    },
    {
        "date": "2024-10",
        "title": "Arrow Lake Launch",
        "description": "Core Ultra 200 series desktop CPUs launched.",
        "type": "product",
        "color": "#00aeef"
    },
    {
        "date": "2024-03",
        "title": "CHIPS Act Funding",
        "description": "Secured $8.5B in CHIPS Act grants for US fabs.",
        "type": "milestone",
        "color": "#ffc000"
    }
],
  competitive: {
    marketShare: 0.7,
    marketShareLabel: "x86 CPUs (declining)",
    moat: "Manufacturing capability. But losing share to AMD, ARM.",
    competitors: [],
  },
  personality: {
    type: "The Fallen Giant",
    emoji: "📉",
    description: "Intel Corporation in 2024 continued to execute on its strategic priorities.",
    traits: ["Foundry Bet", "Leadership Crisis", "Turnaround Mode"],
  },
  aiSummary: "Intel Corporation's fiscal year 2024 showed -5% revenue growth to $55B. The company continues to focus on its core business while investing in future growth opportunities.",
  generatedAt: new Date().toISOString(),
};

export const intcBuzzwords = [
  {
    "word": "Foundry",
    "count": 234,
    "size": "lg"
  },
  {
    "word": "IDM 2.0",
    "count": 156,
    "size": "md"
  },
  {
    "word": "18A",
    "count": 189,
    "size": "md"
  },
  {
    "word": "AI PC",
    "count": 145,
    "size": "sm"
  },
  {
    "word": "Turnaround",
    "count": 98,
    "size": "sm"
  }
];

export const intcCeoQuote = {
  quote: "Intel's best days are ahead. Our 18A process technology will restore our leadership position.",
  name: "Interim Leadership",
  title: "Interim Co-CEOs",
};

export const intcAchievements = [
  {
    "icon": "\ud83c\udfed",
    "title": "$8.5B",
    "desc": "CHIPS Act"
  },
  {
    "icon": "\ud83d\udcbb",
    "title": "Arrow Lake",
    "desc": "CPU Launch"
  },
  {
    "icon": "\ud83d\udd2c",
    "title": "18A",
    "desc": "Process Node"
  },
  {
    "icon": "\ud83d\ude22",
    "title": "-50%",
    "desc": "Stock YTD"
  }
];

export const intcCustomers = {
  top4Percentage: 0.0,
  top4Label: "Diversified",
  risk: "Market competition and economic conditions.",
};

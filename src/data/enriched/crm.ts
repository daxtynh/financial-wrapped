// Salesforce Inc. Enriched Data - FY2025
// Auto-generated enriched data file

import { WrappedData } from "@/types/wrapped";

export const crmData: Partial<WrappedData> = {
  meta: {
    ticker: "CRM",
    name: "Salesforce Inc.",
    fiscalYear: 2025,
    fiscalYearEnd: "January 2025",
    theme: {
      primary: "#00a1e0",
      secondary: "#032d60",
      accent: "#ff6b00",
    },
  },
  stock: {
    returnYTD: 0.2,
    startPrice: 100,
    endPrice: 120,
    high52w: 130,
    low52w: 90,
    marketCap: 247555400000.0,
    vsSpx: -0.06,
    percentile: 70,
  },
  financials: {
    revenue: 37000000000.0,
    revenueGrowth: 0.1,
    grossProfit: 28120000000.0,
    grossMargin: 0.76,
    operatingIncome: 7400000000.0,
    operatingMargin: 0.20,
    netIncome: 5000000000.0,
    netMargin: 0.14,
    eps: 5.0,
    epsGrowth: 0.1,
  },
  segments: [
    {
        "name": "Sales Cloud",
        "percentage": 0.24,
        "growth": 0.11,
        "color": "#00a1e0",
        "revenue": 8880000000.0
    },
    {
        "name": "Service Cloud",
        "percentage": 0.24,
        "growth": 0.13,
        "color": "#032d60",
        "revenue": 8880000000.0
    },
    {
        "name": "Platform",
        "percentage": 0.2,
        "growth": 0.12,
        "color": "#ff6b00",
        "revenue": 7400000000.0
    },
    {
        "name": "Marketing/Commerce",
        "percentage": 0.18,
        "growth": 0.08,
        "color": "#ffc220",
        "revenue": 6660000000.0
    },
    {
        "name": "Data Cloud",
        "percentage": 0.14,
        "growth": 0.25,
        "color": "#1b96ff",
        "revenue": 5180000000.000001
    }
],
  geographic: [
    {
        "region": "Americas",
        "percentage": 0.7,
        "color": "#00a1e0"
    },
    {
        "region": "Europe",
        "percentage": 0.2,
        "color": "#032d60"
    },
    {
        "region": "Asia Pacific",
        "percentage": 0.1,
        "color": "#ff6b00"
    }
],
  events: [
    {
        "date": "2024-09-12",
        "title": "Agentforce Launch",
        "description": "AI agents for enterprise. 'Third wave of AI' according to Benioff.",
        "type": "product",
        "color": "#00a1e0"
    },
    {
        "date": "2024-02",
        "title": "Data Cloud Momentum",
        "description": "Data Cloud became fastest growing product.",
        "type": "milestone",
        "color": "#1b96ff"
    },
    {
        "date": "2024-05",
        "title": "Informatica Deal Cancelled",
        "description": "Walked away from $11B Informatica acquisition.",
        "type": "corporate",
        "color": "#ff6b00"
    },
    {
        "date": "2024-08",
        "title": "Strong Q2 Results",
        "description": "Beat estimates, raised guidance. AI driving demand.",
        "type": "financial",
        "color": "#032d60"
    }
],
  competitive: {
    marketShare: 0.23,
    marketShareLabel: "CRM Market",
    moat: "#1 CRM globally. Platform ecosystem. Enterprise relationships.",
    competitors: [],
  },
  personality: {
    type: "The CRM King",
    emoji: "👑",
    description: "Salesforce Inc. in 2025 continued to execute on its strategic priorities.",
    traits: ["AI Agents", "Enterprise Cloud", "Platform Play"],
  },
  aiSummary: "Salesforce Inc.'s fiscal year 2025 showed +10% revenue growth to $37B. The company continues to focus on its core business while investing in future growth opportunities.",
  generatedAt: new Date().toISOString(),
};

export const crmBuzzwords = [
  {
    "word": "Agentforce",
    "count": 345,
    "size": "lg"
  },
  {
    "word": "AI",
    "count": 456,
    "size": "lg"
  },
  {
    "word": "Data Cloud",
    "count": 234,
    "size": "md"
  },
  {
    "word": "Einstein",
    "count": 189,
    "size": "md"
  },
  {
    "word": "Platform",
    "count": 156,
    "size": "sm"
  }
];

export const crmCeoQuote = {
  quote: "Agentforce is the third wave of AI. We're moving from copilots to fully autonomous AI agents.",
  name: "Marc Benioff",
  title: "CEO & Chair",
};

export const crmAchievements = [
  {
    "icon": "\ud83e\udd16",
    "title": "Agentforce",
    "desc": "AI Agents"
  },
  {
    "icon": "\ud83d\udcca",
    "title": "#1",
    "desc": "CRM Market"
  },
  {
    "icon": "\ud83d\udcc8",
    "title": "+25%",
    "desc": "Stock YTD"
  },
  {
    "icon": "\u2601\ufe0f",
    "title": "$37B",
    "desc": "Revenue"
  }
];

export const crmCustomers = {
  top4Percentage: 0.0,
  top4Label: "Diversified",
  risk: "Market competition and economic conditions.",
};

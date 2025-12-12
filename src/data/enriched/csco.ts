// Cisco Systems Enriched Data - FY2024
// Auto-generated enriched data file

import { WrappedData } from "@/types/wrapped";

export const cscoData: Partial<WrappedData> = {
  meta: {
    ticker: "CSCO",
    name: "Cisco Systems",
    fiscalYear: 2024,
    fiscalYearEnd: "December 2024",
    theme: {
      primary: "#333333",
      secondary: "#666666",
      accent: "#999999",
    },
  },
  stock: {
    returnYTD: 0.2,
    startPrice: 100,
    endPrice: 120,
    high52w: 130,
    low52w: 90,
    marketCap: 317075338680.75,
    vsSpx: -0.06,
    percentile: 70,
  },
  financials: {
    revenue: 55000000000.0,
    revenueGrowth: 0.05,
    grossProfit: 27500000000.0,
    grossMargin: 0.5,
    operatingIncome: 11000000000.0,
    operatingMargin: 0.20,
    netIncome: 5500000000.0,
    netMargin: 0.1,
    eps: 5.5,
    epsGrowth: 0.05,
  },
  segments: [
    {
        "name": "Primary",
        "revenue": 33000000000.0,
        "percentage": 0.6,
        "growth": 0.1,
        "color": "#333333"
    },
    {
        "name": "Secondary",
        "revenue": 16500000000.0,
        "percentage": 0.3,
        "growth": 0.05,
        "color": "#666666"
    },
    {
        "name": "Other",
        "revenue": 5500000000.0,
        "percentage": 0.1,
        "growth": 0.0,
        "color": "#999999"
    }
],
  geographic: [
    {
        "region": "United States",
        "percentage": 0.5,
        "color": "#333333"
    },
    {
        "region": "Europe",
        "percentage": 0.25,
        "color": "#666666"
    },
    {
        "region": "Asia",
        "percentage": 0.15,
        "color": "#999999"
    },
    {
        "region": "Other",
        "percentage": 0.1,
        "color": "#666666"
    }
],
  events: [
    {
        "date": "2024-03",
        "title": "Q1 Earnings",
        "description": "Strong quarterly results.",
        "type": "financial",
        "color": "#333333"
    },
    {
        "date": "2024-06",
        "title": "Product Launch",
        "description": "New product announcement.",
        "type": "product",
        "color": "#666666"
    },
    {
        "date": "2024-09",
        "title": "Strategic Update",
        "description": "Company strategy presentation.",
        "type": "corporate",
        "color": "#999999"
    }
],
  competitive: {
    marketShare: 0.2,
    marketShareLabel: "Market",
    moat: "Strong brand and market position.",
    competitors: [],
  },
  personality: {
    type: "The Network Giant",
    emoji: "🌐",
    description: "Cisco Systems in 2024 continued to execute on its strategic priorities.",
    traits: ["Growth", "Innovation", "Leadership"],
  },
  aiSummary: "Cisco Systems's fiscal year 2024 showed +5% revenue growth to $55B. The company continues to focus on its core business while investing in future growth opportunities.",
  generatedAt: new Date().toISOString(),
};

export const cscoBuzzwords = [
  {
    "word": "Growth",
    "count": 150,
    "size": "lg"
  },
  {
    "word": "Innovation",
    "count": 120,
    "size": "md"
  },
  {
    "word": "AI",
    "count": 100,
    "size": "md"
  },
  {
    "word": "Efficiency",
    "count": 80,
    "size": "sm"
  }
];

export const cscoCeoQuote = {
  quote: "We remain focused on delivering value to our shareholders and customers.",
  name: "Chuck Robbins",
  title: "CEO",
};

export const cscoAchievements = [
  {
    "icon": "\ud83d\udcc8",
    "title": "+5%",
    "desc": "Revenue Growth"
  },
  {
    "icon": "\ud83d\udcb0",
    "title": "$5B",
    "desc": "Net Income"
  },
  {
    "icon": "\ud83c\udfaf",
    "title": "Strong",
    "desc": "Execution"
  }
];

export const cscoCustomers = {
  top4Percentage: 0.0,
  top4Label: "Diversified",
  risk: "Market competition and economic conditions.",
};

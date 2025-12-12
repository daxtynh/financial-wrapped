// Alphabet Inc. Enriched Data - FY2024
// Auto-generated enriched data file

import { WrappedData } from "@/types/wrapped";

export const googlData: Partial<WrappedData> = {
  meta: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    fiscalYear: 2024,
    fiscalYearEnd: "December 2024",
    theme: {
      primary: "#4285f4",
      secondary: "#34a853",
      accent: "#ea4335",
    },
  },
  stock: {
    returnYTD: 0.2,
    startPrice: 100,
    endPrice: 120,
    high52w: 130,
    low52w: 90,
    marketCap: 3863974069999.9995,
    vsSpx: -0.06,
    percentile: 70,
  },
  financials: {
    revenue: 350000000000.0,
    revenueGrowth: 0.14,
    grossProfit: 199499999999.99997,
    grossMargin: 0.57,
    operatingIncome: 70000000000.0,
    operatingMargin: 0.20,
    netIncome: 85000000000.0,
    netMargin: 0.24,
    eps: 85.0,
    epsGrowth: 0.14,
  },
  segments: [
    {
        "name": "Google Services",
        "percentage": 0.87,
        "growth": 0.12,
        "color": "#4285f4",
        "revenue": 304500000000.0
    },
    {
        "name": "Google Cloud",
        "percentage": 0.11,
        "growth": 0.26,
        "color": "#34a853",
        "revenue": 38500000000.0
    },
    {
        "name": "Other Bets",
        "percentage": 0.02,
        "growth": -0.05,
        "color": "#ea4335",
        "revenue": 7000000000.0
    }
],
  geographic: [
    {
        "region": "United States",
        "percentage": 0.47,
        "color": "#4285f4"
    },
    {
        "region": "EMEA",
        "percentage": 0.3,
        "color": "#34a853"
    },
    {
        "region": "APAC",
        "percentage": 0.18,
        "color": "#fbbc04"
    },
    {
        "region": "Other Americas",
        "percentage": 0.05,
        "color": "#ea4335"
    }
],
  events: [
    {
        "date": "2024-02-08",
        "title": "Gemini AI Launch",
        "description": "Rebranded Bard to Gemini. Gemini Advanced with Ultra model.",
        "type": "product",
        "color": "#4285f4"
    },
    {
        "date": "2024-05-14",
        "title": "AI Overviews in Search",
        "description": "AI-generated summaries at top of search results. Mixed reception.",
        "type": "product",
        "color": "#34a853"
    },
    {
        "date": "2024-08-05",
        "title": "Antitrust Ruling",
        "description": "Judge ruled Google holds illegal monopoly in search. Appeals expected.",
        "type": "corporate",
        "color": "#ea4335"
    },
    {
        "date": "2024-12",
        "title": "Willow Quantum Chip",
        "description": "Breakthrough quantum computing chip announced.",
        "type": "milestone",
        "color": "#fbbc04"
    }
],
  competitive: {
    marketShare: 0.9,
    marketShareLabel: "Search Market",
    moat: "Search dominance + YouTube + Android ecosystem. AI race with OpenAI/Microsoft.",
    competitors: [],
  },
  personality: {
    type: "The Search Giant",
    emoji: "🔍",
    description: "Alphabet Inc. in 2024 continued to execute on its strategic priorities.",
    traits: ["AI Pioneer", "Ad Dominance", "Cloud Growth"],
  },
  aiSummary: "Alphabet Inc.'s fiscal year 2024 showed +14% revenue growth to $350B. The company continues to focus on its core business while investing in future growth opportunities.",
  generatedAt: new Date().toISOString(),
};

export const googlBuzzwords = [
  {
    "word": "Gemini",
    "count": 234,
    "size": "lg"
  },
  {
    "word": "AI",
    "count": 567,
    "size": "lg"
  },
  {
    "word": "Search",
    "count": 189,
    "size": "md"
  },
  {
    "word": "Cloud",
    "count": 156,
    "size": "md"
  },
  {
    "word": "YouTube",
    "count": 134,
    "size": "sm"
  }
];

export const googlCeoQuote = {
  quote: "We are reimagining all of our products with AI at the center. This is the most profound technology shift we've seen.",
  name: "Sundar Pichai",
  title: "CEO",
};

export const googlAchievements = [
  {
    "icon": "\ud83d\udd0d",
    "title": "90%",
    "desc": "Search Share"
  },
  {
    "icon": "\u2601\ufe0f",
    "title": "+26%",
    "desc": "Cloud Growth"
  },
  {
    "icon": "\ud83e\udd16",
    "title": "Gemini",
    "desc": "AI Launch"
  },
  {
    "icon": "\ud83d\udcfa",
    "title": "2.5B",
    "desc": "YouTube Users"
  }
];

export const googlCustomers = {
  top4Percentage: 0.0,
  top4Label: "Diversified",
  risk: "Market competition and economic conditions.",
};

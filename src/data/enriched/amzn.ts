// Amazon.com Inc. Enriched Data - FY2024
// Auto-generated enriched data file

import { WrappedData } from "@/types/wrapped";

export const amznData: Partial<WrappedData> = {
  meta: {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    fiscalYear: 2024,
    fiscalYearEnd: "December 2024",
    theme: {
      primary: "#ff9900",
      secondary: "#146eb4",
      accent: "#232f3e",
    },
  },
  stock: {
    returnYTD: 0.2,
    startPrice: 100,
    endPrice: 120,
    high52w: 130,
    low52w: 90,
    marketCap: 2477778267029.58,
    vsSpx: -0.06,
    percentile: 70,
  },
  financials: {
    revenue: 620000000000.0,
    revenueGrowth: 0.11,
    grossProfit: 291400000000.0,
    grossMargin: 0.47,
    operatingIncome: 124000000000.0,
    operatingMargin: 0.20,
    netIncome: 45000000000.0,
    netMargin: 0.07,
    eps: 45.0,
    epsGrowth: 0.11,
  },
  segments: [
    {
        "name": "North America",
        "percentage": 0.6,
        "growth": 0.1,
        "color": "#ff9900",
        "revenue": 372000000000.0
    },
    {
        "name": "AWS",
        "percentage": 0.17,
        "growth": 0.19,
        "color": "#232f3e",
        "revenue": 105400000000.0
    },
    {
        "name": "International",
        "percentage": 0.23,
        "growth": 0.08,
        "color": "#146eb4",
        "revenue": 142600000000.0
    }
],
  geographic: [
    {
        "region": "United States",
        "percentage": 0.65,
        "color": "#ff9900"
    },
    {
        "region": "Germany",
        "percentage": 0.08,
        "color": "#232f3e"
    },
    {
        "region": "UK",
        "percentage": 0.07,
        "color": "#146eb4"
    },
    {
        "region": "Other",
        "percentage": 0.2,
        "color": "#37475a"
    }
],
  events: [
    {
        "date": "2024-12",
        "title": "AWS re:Invent",
        "description": "Trainium2 chips, Amazon Nova AI models, new AI services.",
        "type": "product",
        "color": "#ff9900"
    },
    {
        "date": "2024-09",
        "title": "Alexa AI Upgrade",
        "description": "Next-gen Alexa with LLM capabilities announced.",
        "type": "product",
        "color": "#232f3e"
    },
    {
        "date": "2024-04",
        "title": "Project Kuiper Progress",
        "description": "Satellite internet constellation on track. First launches.",
        "type": "milestone",
        "color": "#146eb4"
    },
    {
        "date": "2024-01",
        "title": "Prime Video Ads",
        "description": "Introduced ads to Prime Video. New revenue stream.",
        "type": "financial",
        "color": "#37475a"
    }
],
  competitive: {
    marketShare: 0.32,
    marketShareLabel: "Cloud Infrastructure",
    moat: "AWS market leader. E-commerce scale. Prime ecosystem. Logistics network.",
    competitors: [],
  },
  personality: {
    type: "The Everything Store",
    emoji: "📦",
    description: "Amazon.com Inc. in 2024 continued to execute on its strategic priorities.",
    traits: ["AWS Dominance", "Retail Scale", "AI Infrastructure"],
  },
  aiSummary: "Amazon.com Inc.'s fiscal year 2024 showed +11% revenue growth to $620B. The company continues to focus on its core business while investing in future growth opportunities.",
  generatedAt: new Date().toISOString(),
};

export const amznBuzzwords = [
  {
    "word": "AWS",
    "count": 345,
    "size": "lg"
  },
  {
    "word": "AI",
    "count": 456,
    "size": "lg"
  },
  {
    "word": "Prime",
    "count": 234,
    "size": "md"
  },
  {
    "word": "Alexa",
    "count": 123,
    "size": "sm"
  },
  {
    "word": "Cloud",
    "count": 289,
    "size": "md"
  }
];

export const amznCeoQuote = {
  quote: "Generative AI is going to be transformative for virtually every customer experience we have.",
  name: "Andy Jassy",
  title: "CEO",
};

export const amznAchievements = [
  {
    "icon": "\u2601\ufe0f",
    "title": "#1",
    "desc": "Cloud Provider"
  },
  {
    "icon": "\ud83d\udce6",
    "title": "200M+",
    "desc": "Prime Members"
  },
  {
    "icon": "\ud83d\ude80",
    "title": "Kuiper",
    "desc": "Satellite Launch"
  },
  {
    "icon": "\ud83d\udcb0",
    "title": "$45B",
    "desc": "Net Income"
  }
];

export const amznCustomers = {
  top4Percentage: 0.0,
  top4Label: "Diversified",
  risk: "Market competition and economic conditions.",
};

// Advanced Micro Devices Enriched Data - FY2024
// Auto-generated enriched data file

import { WrappedData } from "@/types/wrapped";

export const amdData: Partial<WrappedData> = {
  meta: {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    fiscalYear: 2024,
    fiscalYearEnd: "December 2024",
    theme: {
      primary: "#ed1c24",
      secondary: "#000000",
      accent: "#7cb82f",
    },
  },
  stock: {
    returnYTD: 0.2,
    startPrice: 100,
    endPrice: 120,
    high52w: 130,
    low52w: 90,
    marketCap: 360480957786.8,
    vsSpx: -0.06,
    percentile: 70,
  },
  financials: {
    revenue: 25000000000.0,
    revenueGrowth: 0.1,
    grossProfit: 12750000000.0,
    grossMargin: 0.51,
    operatingIncome: 5000000000.0,
    operatingMargin: 0.20,
    netIncome: 1500000000.0,
    netMargin: 0.06,
    eps: 1.5,
    epsGrowth: 0.1,
  },
  segments: [
    {
        "name": "Data Center",
        "percentage": 0.5,
        "growth": 0.8,
        "color": "#ed1c24",
        "revenue": 12500000000.0
    },
    {
        "name": "Client",
        "percentage": 0.25,
        "growth": 0.29,
        "color": "#000000",
        "revenue": 6250000000.0
    },
    {
        "name": "Gaming",
        "percentage": 0.15,
        "growth": -0.3,
        "color": "#7cb82f",
        "revenue": 3750000000.0
    },
    {
        "name": "Embedded",
        "percentage": 0.1,
        "growth": -0.4,
        "color": "#666666",
        "revenue": 2500000000.0
    }
],
  geographic: [
    {
        "region": "United States",
        "percentage": 0.3,
        "color": "#ed1c24"
    },
    {
        "region": "China",
        "percentage": 0.25,
        "color": "#000000"
    },
    {
        "region": "Taiwan",
        "percentage": 0.2,
        "color": "#7cb82f"
    },
    {
        "region": "Other",
        "percentage": 0.25,
        "color": "#666666"
    }
],
  events: [
    {
        "date": "2024-12-09",
        "title": "MI325X Launch",
        "description": "Next-gen data center GPU. Competing with NVIDIA H200.",
        "type": "product",
        "color": "#ed1c24"
    },
    {
        "date": "2024-10",
        "title": "AI Revenue Guidance Up",
        "description": "Raised AI chip revenue guidance to $5B for 2024.",
        "type": "financial",
        "color": "#7cb82f"
    },
    {
        "date": "2024-07-30",
        "title": "Ryzen 9000 Series",
        "description": "Zen 5 architecture CPUs for desktop.",
        "type": "product",
        "color": "#000000"
    },
    {
        "date": "2024-04",
        "title": "ZT Systems Acquisition",
        "description": "$4.9B acquisition for AI infrastructure.",
        "type": "corporate",
        "color": "#666666"
    }
],
  competitive: {
    marketShare: 0.1,
    marketShareLabel: "Data Center GPU",
    moat: "CPU gains vs Intel. GPU challenger to NVIDIA. Strong enterprise relationships.",
    competitors: [],
  },
  personality: {
    type: "The Challenger",
    emoji: "⚔️",
    description: "Advanced Micro Devices in 2024 continued to execute on its strategic priorities.",
    traits: ["GPU Challenger", "CPU Gains", "AI Acceleration"],
  },
  aiSummary: "Advanced Micro Devices's fiscal year 2024 showed +10% revenue growth to $25B. The company continues to focus on its core business while investing in future growth opportunities.",
  generatedAt: new Date().toISOString(),
};

export const amdBuzzwords = [
  {
    "word": "MI300",
    "count": 234,
    "size": "lg"
  },
  {
    "word": "AI",
    "count": 345,
    "size": "lg"
  },
  {
    "word": "Data Center",
    "count": 189,
    "size": "md"
  },
  {
    "word": "EPYC",
    "count": 156,
    "size": "md"
  },
  {
    "word": "Zen 5",
    "count": 98,
    "size": "sm"
  }
];

export const amdCeoQuote = {
  quote: "We're in a strong position to compete in the AI era. Our MI300X is the most advanced AI accelerator we've ever built.",
  name: "Lisa Su",
  title: "CEO",
};

export const amdAchievements = [
  {
    "icon": "\ud83c\udfaf",
    "title": "$5B+",
    "desc": "AI Revenue"
  },
  {
    "icon": "\u26a1",
    "title": "MI325X",
    "desc": "GPU Launch"
  },
  {
    "icon": "\ud83d\udcbb",
    "title": "+29%",
    "desc": "Client Growth"
  },
  {
    "icon": "\ud83c\udfc6",
    "title": "#2",
    "desc": "x86 CPUs"
  }
];

export const amdCustomers = {
  top4Percentage: 0.0,
  top4Label: "Diversified",
  risk: "Market competition and economic conditions.",
};

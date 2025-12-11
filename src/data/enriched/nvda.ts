// NVIDIA Enriched Data - FY2025 (Feb 2024 - Jan 2025)
// Manually curated from earnings reports, press releases, and SEC filings

import { WrappedData } from "@/types/wrapped";

export const nvidiaData: Partial<WrappedData> = {
  meta: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    fiscalYear: 2025,
    fiscalYearEnd: "January 2025",
    theme: {
      primary: "#76B900",
      secondary: "#00d4ff",
      accent: "#a855f7",
    },
  },
  stock: {
    returnYTD: 1.71, // +171%
    startPrice: 48,
    endPrice: 130,
    high52w: 148.88,
    low52w: 47,
    marketCap: 3.2e12,
    peakMarketCap: 3.34e12,
    vsSpx: 1.45, // Beat S&P by 145%
    percentile: 99,
    split: {
      ratio: "10:1",
      date: "2024-06-07",
    },
  },
  financials: {
    revenue: 130.5e9,
    revenueGrowth: 1.14, // +114%
    grossProfit: 97.9e9,
    grossMargin: 0.75,
    operatingIncome: 81.5e9,
    operatingMargin: 0.625,
    netIncome: 72.9e9,
    netMargin: 0.559,
    eps: 2.94,
    epsGrowth: 1.47, // +147%
    employees: 29600,
    revenuePerEmployee: 4.41e6,
    profitPerEmployee: 2.46e6,
  },
  segments: [
    { name: "Data Center", revenue: 115.2e9, percentage: 0.88, growth: 1.42, color: "#76B900" },
    { name: "Gaming", revenue: 11.4e9, percentage: 0.09, growth: 0.09, color: "#00d4ff" },
    { name: "Pro Visualization", revenue: 1.9e9, percentage: 0.015, growth: 0.21, color: "#f59e0b" },
    { name: "Automotive", revenue: 1.7e9, percentage: 0.013, growth: 0.55, color: "#a855f7" },
  ],
  geographic: [
    { region: "United States", percentage: 0.47, color: "#3b82f6" },
    { region: "China + Hong Kong", percentage: 0.22, growth: -0.04, color: "#f59e0b" },
    { region: "Taiwan", percentage: 0.15, color: "#22c55e" },
    { region: "Singapore", percentage: 0.08, color: "#8b5cf6" },
    { region: "Rest of World", percentage: 0.08, color: "#6b7280" },
  ],
  quarterly: [
    { quarter: "Q1 FY25", revenue: 26.0e9, qoqGrowth: 0.18, yoyGrowth: 2.62 },
    { quarter: "Q2 FY25", revenue: 30.0e9, qoqGrowth: 0.15, yoyGrowth: 1.22 },
    { quarter: "Q3 FY25", revenue: 35.1e9, qoqGrowth: 0.17, yoyGrowth: 0.94 },
    { quarter: "Q4 FY25", revenue: 39.3e9, qoqGrowth: 0.12, yoyGrowth: 0.78 },
  ],
  cashFlow: {
    operatingCashFlow: 64.1e9,
    freeCashFlow: 60.7e9,
    capex: 3.2e9,
    rdSpend: 12.9e9,
    buybacks: 33.7e9,
    dividends: 0.5e9,
  },
  valuation: {
    peRatio: 55,
    peSectorAvg: 25,
    psRatio: 31,
    psSectorAvg: 5,
    pegRatio: 0.5,
    evEbitda: 48,
  },
  insiders: {
    totalSales: 2e9,
    totalBuys: 0,
    netActivity: "selling",
    ceoSales: 1e9,
    ceoName: "Jensen Huang",
    transactions: [
      { date: "2024-03", name: "Jensen Huang", title: "CEO", type: "sale", shares: 0, value: 0 },
    ],
  },
  events: [
    {
      date: "2024-03-18",
      title: "Blackwell Unveiled",
      description: "208B transistors. 30x faster inference. Most powerful chip ever.",
      type: "product",
      color: "#76B900",
    },
    {
      date: "2024-06-07",
      title: "10-for-1 Stock Split",
      description: "Made shares accessible. Volume surged 40%.",
      type: "corporate",
      color: "#00d4ff",
    },
    {
      date: "2024-06-18",
      title: "Became #1 Most Valuable",
      description: "Briefly passed Apple & Microsoft. $3.34T market cap.",
      type: "milestone",
      color: "#a855f7",
    },
    {
      date: "2024-11",
      title: "Joined the Dow Jones",
      description: "Replaced Intel. The symbolic passing of the torch.",
      type: "milestone",
      color: "#f59e0b",
    },
  ],
  competitive: {
    marketShare: 0.9,
    marketShareLabel: "Data Center GPU",
    moat: "CUDA ecosystem + 15 years of software = sticky. Google TPU and Amazon Trainium are threats, but neither is available externally.",
    competitors: [
      { name: "NVIDIA", ticker: "NVDA", share: 0.9, metric: "H100, Blackwell", color: "#76B900" },
      { name: "AMD", ticker: "AMD", share: 0.06, metric: "MI300X", color: "#ef4444" },
      { name: "Intel", ticker: "INTC", share: 0.03, metric: "Gaudi", color: "#3b82f6" },
      { name: "Others", share: 0.01, color: "#6b7280" },
    ],
  },
  personality: {
    type: "The Unstoppable Force",
    emoji: "🦾",
    description: "NVIDIA in 2024 was a company that couldn't be stopped. Every doubter silenced. Every quarter dominated.",
    traits: ["Hypergrowth", "Execution", "AI Kingpin"],
  },
  aiSummary: "In FY2025, NVIDIA cemented its position as the backbone of AI. Revenue hit $130.5B (+114%), net income reached $72.9B, and margins expanded to software-like levels. Data Center is now 88% of revenue. Risks include China exposure (22%) and customer concentration (top 4 = 40%), but momentum is unprecedented.",
  generatedAt: new Date().toISOString(),
};

// Buzzwords from earnings calls
export const nvidiaBuzzwords = [
  { word: "AI", count: 847, size: "lg" },
  { word: "GPU", count: 312, size: "md" },
  { word: "Blackwell", count: 156, size: "md" },
  { word: "Inference", count: 134, size: "sm" },
  { word: "CUDA", count: 98, size: "sm" },
  { word: "Sovereign AI", count: 67, size: "sm" },
  { word: "Datacenter", count: 245, size: "md" },
];

// CEO Quote
export const nvidiaCeoQuote = {
  quote: "The next wave of AI is physical AI — robots and autonomous machines that understand and interact with the world.",
  name: "Jensen Huang",
  title: "CEO & Co-Founder",
};

// Achievements/Badges
export const nvidiaAchievements = [
  { icon: "🏆", title: "Beat 8/8", desc: "Quarters" },
  { icon: "💰", title: "$3T Club", desc: "Market cap" },
  { icon: "👑", title: "Briefly #1", desc: "Most valuable" },
  { icon: "📈", title: "+114%", desc: "Revenue" },
  { icon: "⚡", title: "Blackwell", desc: "Launched" },
  { icon: "🎯", title: "Dow Jones", desc: "Replaced Intel" },
];

// Customer concentration
export const nvidiaCustomers = {
  top4Percentage: 0.4,
  top4Label: "Top 4 Hyperscalers",
  customers: ["AWS", "Azure", "GCP", "Meta"],
  risk: "If they build their own chips (Google TPU, Amazon Trainium), that's a problem.",
};

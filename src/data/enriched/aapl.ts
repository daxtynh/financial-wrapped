// Apple Enriched Data - FY2024 (Oct 2023 - Sep 2024)
// Manually curated from earnings reports, press releases, and SEC filings

import { WrappedData } from "@/types/wrapped";

export const appleData: Partial<WrappedData> = {
  meta: {
    ticker: "AAPL",
    name: "Apple Inc.",
    fiscalYear: 2024,
    fiscalYearEnd: "September 2024",
    theme: {
      primary: "#000000",
      secondary: "#86868b",
      accent: "#0071e3",
    },
  },
  stock: {
    returnYTD: 0.31, // +31%
    startPrice: 185,
    endPrice: 227,
    high52w: 237.49,
    low52w: 164.08,
    marketCap: 3.44e12,
    peakMarketCap: 3.58e12,
    vsSpx: 0.05, // Beat S&P by 5%
    percentile: 75,
  },
  financials: {
    revenue: 391e9,
    revenueGrowth: 0.02, // +2%
    grossProfit: 180.7e9,
    grossMargin: 0.462,
    operatingIncome: 123.2e9,
    operatingMargin: 0.315,
    netIncome: 93.7e9,
    netMargin: 0.24,
    eps: 6.11,
    epsGrowth: 0.10, // +10%
    employees: 161000,
    revenuePerEmployee: 2.43e6,
    profitPerEmployee: 0.58e6,
  },
  segments: [
    { name: "iPhone", revenue: 201.2e9, percentage: 0.515, growth: -0.01, color: "#0071e3" },
    { name: "Services", revenue: 96.2e9, percentage: 0.246, growth: 0.13, color: "#34c759" },
    { name: "Mac", revenue: 29.9e9, percentage: 0.077, growth: 0.02, color: "#86868b" },
    { name: "iPad", revenue: 26.7e9, percentage: 0.068, growth: -0.06, color: "#ff9500" },
    { name: "Wearables & Home", revenue: 37e9, percentage: 0.095, growth: -0.07, color: "#ff2d55" },
  ],
  geographic: [
    { region: "Americas", percentage: 0.42, color: "#0071e3" },
    { region: "Europe", percentage: 0.25, color: "#34c759" },
    { region: "Greater China", percentage: 0.17, growth: -0.08, color: "#ff9500" },
    { region: "Japan", percentage: 0.06, color: "#ff2d55" },
    { region: "Rest of Asia Pacific", percentage: 0.10, color: "#86868b" },
  ],
  quarterly: [
    { quarter: "Q1 FY24", revenue: 119.6e9, qoqGrowth: 0.13, yoyGrowth: 0.02 },
    { quarter: "Q2 FY24", revenue: 90.8e9, qoqGrowth: -0.24, yoyGrowth: -0.04 },
    { quarter: "Q3 FY24", revenue: 85.8e9, qoqGrowth: -0.05, yoyGrowth: 0.05 },
    { quarter: "Q4 FY24", revenue: 94.9e9, qoqGrowth: 0.11, yoyGrowth: 0.06 },
  ],
  cashFlow: {
    operatingCashFlow: 118.3e9,
    freeCashFlow: 108.8e9,
    capex: 9.5e9,
    rdSpend: 29.9e9,
    buybacks: 95e9,
    dividends: 15.2e9,
  },
  valuation: {
    peRatio: 36,
    peSectorAvg: 25,
    psRatio: 8.8,
    psSectorAvg: 5,
    pegRatio: 3.2,
    evEbitda: 28,
  },
  insiders: {
    totalSales: 75e6,
    totalBuys: 0,
    netActivity: "selling",
    ceoSales: 50e6,
    ceoName: "Tim Cook",
    transactions: [],
  },
  events: [
    {
      date: "2024-01-28",
      title: "Vision Pro Launch",
      description: "Apple's first spatial computer. $3,499. Mixed reality enters premium market.",
      type: "product",
      color: "#0071e3",
    },
    {
      date: "2024-06-10",
      title: "Apple Intelligence Announced",
      description: "AI features coming to iOS 18. Siri gets smarter. ChatGPT integration.",
      type: "product",
      color: "#34c759",
    },
    {
      date: "2024-09-09",
      title: "iPhone 16 Launch",
      description: "A18 chip. Apple Intelligence built-in. Camera button debuts.",
      type: "product",
      color: "#ff9500",
    },
    {
      date: "2024-03",
      title: "EU DMA Compliance",
      description: "Opened App Store to third-party payments. Sideloading in EU.",
      type: "corporate",
      color: "#ff2d55",
    },
  ],
  competitive: {
    marketShare: 0.22,
    marketShareLabel: "Global Smartphone",
    moat: "Ecosystem lock-in + brand loyalty + premium positioning. Services growing 2x hardware.",
    competitors: [
      { name: "Apple", ticker: "AAPL", share: 0.22, metric: "iPhone", color: "#000000" },
      { name: "Samsung", share: 0.19, metric: "Galaxy", color: "#1428a0" },
      { name: "Xiaomi", share: 0.14, metric: "Mi/Redmi", color: "#ff6900" },
      { name: "Others", share: 0.45, color: "#86868b" },
    ],
  },
  personality: {
    type: "The Reliable Giant",
    emoji: "🍎",
    description: "Apple in 2024 showed why it's the world's most valuable company - steady, predictable, and impossible to ignore.",
    traits: ["Cash Machine", "Ecosystem King", "Premium Pricing"],
  },
  aiSummary: "Apple's FY2024 showed modest revenue growth (+2%) but continued services momentum (+13%). Services now 25% of revenue with 2B+ active devices. China remains a concern (-8% YoY). AI features (Apple Intelligence) positioned as the next growth driver. Returned $110B to shareholders via buybacks and dividends.",
  generatedAt: new Date().toISOString(),
};

// Buzzwords from earnings calls
export const appleBuzzwords = [
  { word: "Apple Intelligence", count: 156, size: "lg" },
  { word: "Services", count: 134, size: "md" },
  { word: "iPhone", count: 289, size: "lg" },
  { word: "Privacy", count: 87, size: "sm" },
  { word: "Ecosystem", count: 76, size: "sm" },
  { word: "Vision Pro", count: 45, size: "sm" },
  { word: "Installed Base", count: 98, size: "md" },
];

// CEO Quote
export const appleCeoQuote = {
  quote: "Apple Intelligence is the next big step for Apple. Personal intelligence that understands you, protects your privacy, and helps you do more.",
  name: "Tim Cook",
  title: "CEO",
};

// Achievements/Badges
export const appleAchievements = [
  { icon: "💰", title: "$3.4T", desc: "Market Cap" },
  { icon: "📱", title: "2B+", desc: "Active Devices" },
  { icon: "🎯", title: "$110B", desc: "Returned to Shareholders" },
  { icon: "🤖", title: "Apple AI", desc: "Intelligence Launch" },
  { icon: "👓", title: "Vision Pro", desc: "Spatial Computing" },
  { icon: "💵", title: "$108B", desc: "Free Cash Flow" },
];

// Customer concentration
export const appleCustomers = {
  top4Percentage: 0.0,
  top4Label: "Consumer-Focused",
  customers: ["Individual Consumers", "Enterprise", "Education", "Government"],
  risk: "Consumer discretionary spending. China competition (Huawei). Regulatory pressure in EU.",
};

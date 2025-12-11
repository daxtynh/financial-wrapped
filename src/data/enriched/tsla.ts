// Tesla Enriched Data - FY2024 (Jan 2024 - Dec 2024)
// Manually curated from earnings reports, press releases, and SEC filings

import { WrappedData } from "@/types/wrapped";

export const teslaData: Partial<WrappedData> = {
  meta: {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    fiscalYear: 2024,
    fiscalYearEnd: "December 2024",
    theme: {
      primary: "#cc0000",
      secondary: "#1a1a1a",
      accent: "#ffffff",
    },
  },
  stock: {
    returnYTD: 0.12, // +12% (volatile year)
    startPrice: 248,
    endPrice: 352,
    high52w: 358.64,
    low52w: 138.80,
    marketCap: 1.13e12,
    peakMarketCap: 1.15e12,
    vsSpx: -0.14, // Behind S&P
    percentile: 45,
  },
  financials: {
    revenue: 97.7e9,
    revenueGrowth: 0.01, // +1% (challenging year)
    grossProfit: 17.5e9,
    grossMargin: 0.179,
    operatingIncome: 7.2e9,
    operatingMargin: 0.074,
    netIncome: 7.1e9,
    netMargin: 0.073,
    eps: 2.04,
    epsGrowth: -0.23, // -23%
    employees: 140000,
    revenuePerEmployee: 0.70e6,
    profitPerEmployee: 0.05e6,
  },
  segments: [
    { name: "Automotive Sales", revenue: 77.1e9, percentage: 0.79, growth: -0.06, color: "#cc0000" },
    { name: "Energy Gen & Storage", revenue: 10.3e9, percentage: 0.106, growth: 0.67, color: "#00d4ff" },
    { name: "Services & Other", revenue: 10.3e9, percentage: 0.106, growth: 0.27, color: "#f59e0b" },
  ],
  geographic: [
    { region: "United States", percentage: 0.47, growth: -0.04, color: "#cc0000" },
    { region: "China", percentage: 0.22, growth: 0.05, color: "#f59e0b" },
    { region: "Europe", percentage: 0.18, growth: -0.05, color: "#00d4ff" },
    { region: "Other", percentage: 0.13, color: "#6b7280" },
  ],
  quarterly: [
    { quarter: "Q1 2024", revenue: 21.3e9, qoqGrowth: -0.15, yoyGrowth: -0.09 },
    { quarter: "Q2 2024", revenue: 25.5e9, qoqGrowth: 0.20, yoyGrowth: 0.02 },
    { quarter: "Q3 2024", revenue: 25.2e9, qoqGrowth: -0.01, yoyGrowth: 0.08 },
    { quarter: "Q4 2024", revenue: 25.7e9, qoqGrowth: 0.02, yoyGrowth: 0.02 },
  ],
  cashFlow: {
    operatingCashFlow: 14.7e9,
    freeCashFlow: 3.6e9,
    capex: 11.1e9,
    rdSpend: 4.0e9,
    buybacks: 0,
    dividends: 0,
  },
  valuation: {
    peRatio: 160,
    peSectorAvg: 15,
    psRatio: 11.5,
    psSectorAvg: 1,
    pegRatio: 8.0,
    evEbitda: 75,
  },
  insiders: {
    totalSales: 5e9,
    totalBuys: 0,
    netActivity: "selling",
    ceoSales: 0,
    ceoName: "Elon Musk",
    transactions: [],
  },
  events: [
    {
      date: "2024-01-25",
      title: "Warned of Lower Growth",
      description: "Company guided for notably lower vehicle growth. Stock dropped 12%.",
      type: "financial",
      color: "#cc0000",
    },
    {
      date: "2024-04-23",
      title: "FSD v12 Rollout",
      description: "End-to-end neural network. Supervision still required but major leap.",
      type: "product",
      color: "#00d4ff",
    },
    {
      date: "2024-10-10",
      title: "Cybercab & Robovan Unveiled",
      description: "'We, Robot' event. Autonomous taxi with no steering wheel. $30k price target.",
      type: "product",
      color: "#f59e0b",
    },
    {
      date: "2024-11",
      title: "Post-Election Rally",
      description: "Stock surged 40% after US election. Musk's political ties seen as favorable.",
      type: "milestone",
      color: "#a855f7",
    },
  ],
  competitive: {
    marketShare: 0.17,
    marketShareLabel: "Global EV Market",
    moat: "Brand, Supercharger network, manufacturing efficiency. But BYD passed Tesla in Q4 deliveries.",
    competitors: [
      { name: "BYD", share: 0.19, metric: "China", color: "#f59e0b" },
      { name: "Tesla", ticker: "TSLA", share: 0.17, metric: "Global", color: "#cc0000" },
      { name: "VW Group", share: 0.07, metric: "Europe", color: "#00d4ff" },
      { name: "Others", share: 0.57, color: "#6b7280" },
    ],
  },
  personality: {
    type: "The Volatile Visionary",
    emoji: "⚡",
    description: "Tesla in 2024 faced its toughest year yet - pricing pressure, slower growth, competition surging. But the robotaxi dream lives on.",
    traits: ["EV Pioneer", "Margin Pressure", "FSD Bet"],
  },
  aiSummary: "Tesla's 2024 was a transitional year. Revenue barely grew (+1%), margins compressed to 17.9% (from 25% peak), and China competition intensified (BYD overtook Tesla). Energy storage grew 67% but couldn't offset auto weakness. Robotaxi and FSD remain the bull case. Stock volatile: 52-week range from $139 to $359.",
  generatedAt: new Date().toISOString(),
};

// Buzzwords from earnings calls
export const teslaBuzzwords = [
  { word: "FSD", count: 234, size: "lg" },
  { word: "Robotaxi", count: 156, size: "lg" },
  { word: "Autonomy", count: 187, size: "md" },
  { word: "Energy Storage", count: 134, size: "md" },
  { word: "Cybertruck", count: 98, size: "sm" },
  { word: "Manufacturing", count: 89, size: "sm" },
  { word: "Margin", count: 167, size: "md" },
];

// CEO Quote
export const teslaCeoQuote = {
  quote: "I think Tesla will be the most valuable company in the world, and the reason is autonomy. Fully autonomous cars worth 5-10x more than non-autonomous.",
  name: "Elon Musk",
  title: "CEO & Technoking",
};

// Achievements/Badges
export const teslaAchievements = [
  { icon: "🚗", title: "1.8M", desc: "Vehicles Delivered" },
  { icon: "⚡", title: "+67%", desc: "Energy Growth" },
  { icon: "🤖", title: "FSD v12", desc: "End-to-End AI" },
  { icon: "🚕", title: "Cybercab", desc: "Revealed" },
  { icon: "🔋", title: "Megapack", desc: "Record Deployments" },
  { icon: "🌐", title: "60k+", desc: "Superchargers" },
];

// Customer concentration
export const teslaCustomers = {
  top4Percentage: 0.0,
  top4Label: "Consumer Direct Sales",
  customers: ["Individual Buyers", "Fleet Operators", "Energy Utilities", "Governments"],
  risk: "China competition (BYD). EV demand softening. Margin compression. Elon distraction risk.",
};

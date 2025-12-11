// Microsoft Enriched Data - FY2024 (Jul 2023 - Jun 2024)
// Manually curated from earnings reports, press releases, and SEC filings

import { WrappedData } from "@/types/wrapped";

export const microsoftData: Partial<WrappedData> = {
  meta: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    fiscalYear: 2024,
    fiscalYearEnd: "June 2024",
    theme: {
      primary: "#00a4ef",
      secondary: "#7fba00",
      accent: "#f25022",
    },
  },
  stock: {
    returnYTD: 0.21, // +21%
    startPrice: 376,
    endPrice: 447,
    high52w: 468.35,
    low52w: 309.45,
    marketCap: 3.32e12,
    peakMarketCap: 3.47e12,
    vsSpx: -0.05, // Slightly behind S&P
    percentile: 65,
  },
  financials: {
    revenue: 245.1e9,
    revenueGrowth: 0.16, // +16%
    grossProfit: 171.0e9,
    grossMargin: 0.698,
    operatingIncome: 109.4e9,
    operatingMargin: 0.446,
    netIncome: 88.1e9,
    netMargin: 0.359,
    eps: 11.80,
    epsGrowth: 0.22, // +22%
    employees: 228000,
    revenuePerEmployee: 1.08e6,
    profitPerEmployee: 0.39e6,
  },
  segments: [
    { name: "Intelligent Cloud", revenue: 105.4e9, percentage: 0.43, growth: 0.21, color: "#00a4ef" },
    { name: "Productivity & Business", revenue: 78.4e9, percentage: 0.32, growth: 0.12, color: "#7fba00" },
    { name: "More Personal Computing", revenue: 61.3e9, percentage: 0.25, growth: 0.13, color: "#f25022" },
  ],
  geographic: [
    { region: "United States", percentage: 0.50, color: "#00a4ef" },
    { region: "Other Americas", percentage: 0.06, color: "#7fba00" },
    { region: "Europe, Middle East, Africa", percentage: 0.28, color: "#f25022" },
    { region: "Asia Pacific", percentage: 0.16, color: "#ffb900" },
  ],
  quarterly: [
    { quarter: "Q1 FY24", revenue: 56.5e9, qoqGrowth: 0.02, yoyGrowth: 0.13 },
    { quarter: "Q2 FY24", revenue: 62.0e9, qoqGrowth: 0.10, yoyGrowth: 0.18 },
    { quarter: "Q3 FY24", revenue: 61.9e9, qoqGrowth: 0.00, yoyGrowth: 0.17 },
    { quarter: "Q4 FY24", revenue: 64.7e9, qoqGrowth: 0.05, yoyGrowth: 0.15 },
  ],
  cashFlow: {
    operatingCashFlow: 118.5e9,
    freeCashFlow: 74.1e9,
    capex: 44.5e9,
    rdSpend: 29.5e9,
    buybacks: 17.3e9,
    dividends: 22.3e9,
  },
  valuation: {
    peRatio: 38,
    peSectorAvg: 25,
    psRatio: 13.5,
    psSectorAvg: 5,
    pegRatio: 2.1,
    evEbitda: 27,
  },
  insiders: {
    totalSales: 50e6,
    totalBuys: 0,
    netActivity: "selling",
    ceoSales: 0,
    ceoName: "Satya Nadella",
    transactions: [],
  },
  events: [
    {
      date: "2024-01-30",
      title: "Copilot Enterprise Launch",
      description: "$30/user/month. AI assistant in Microsoft 365. Enterprise AI adoption begins.",
      type: "product",
      color: "#00a4ef",
    },
    {
      date: "2024-03-21",
      title: "Inflection AI Acquisition",
      description: "Hired Inflection team including founder Mustafa Suleyman to lead Microsoft AI.",
      type: "corporate",
      color: "#7fba00",
    },
    {
      date: "2024-05-21",
      title: "Copilot+ PCs Announced",
      description: "New category of AI PCs with Neural Processing Units. ARM-based Surface devices.",
      type: "product",
      color: "#f25022",
    },
    {
      date: "2024-06-24",
      title: "Activision Integration Complete",
      description: "$69B acquisition closed. Call of Duty, Candy Crush now Microsoft Gaming.",
      type: "milestone",
      color: "#ffb900",
    },
  ],
  competitive: {
    marketShare: 0.24,
    marketShareLabel: "Cloud Infrastructure",
    moat: "Enterprise relationships + GitHub + Azure + Office. Copilot in everything. OpenAI partnership.",
    competitors: [
      { name: "AWS", ticker: "AMZN", share: 0.32, metric: "Amazon", color: "#ff9900" },
      { name: "Azure", ticker: "MSFT", share: 0.24, metric: "Microsoft", color: "#00a4ef" },
      { name: "GCP", ticker: "GOOGL", share: 0.11, metric: "Google", color: "#4285f4" },
      { name: "Others", share: 0.33, color: "#6b7280" },
    ],
  },
  personality: {
    type: "The Enterprise Titan",
    emoji: "🏢",
    description: "Microsoft in 2024 proved that boring can be beautiful. Steady cloud growth, Copilot everywhere, and AI bets paying off.",
    traits: ["Cloud Leader", "AI Everywhere", "Enterprise DNA"],
  },
  aiSummary: "Microsoft's FY2024 was defined by AI integration across products. Azure grew 29%, Copilot gained enterprise traction, and the Activision acquisition added gaming scale. Cloud is now 43% of revenue. OpenAI partnership driving differentiation. Capex up 60% YoY for AI infrastructure.",
  generatedAt: new Date().toISOString(),
};

// Buzzwords from earnings calls
export const microsoftBuzzwords = [
  { word: "Copilot", count: 312, size: "lg" },
  { word: "Azure", count: 245, size: "lg" },
  { word: "AI", count: 567, size: "lg" },
  { word: "Cloud", count: 198, size: "md" },
  { word: "OpenAI", count: 89, size: "sm" },
  { word: "Enterprise", count: 134, size: "md" },
  { word: "Gaming", count: 67, size: "sm" },
];

// CEO Quote
export const microsoftCeoQuote = {
  quote: "We are witnessing the most rapid platform transition ever. Every layer of the stack is being reinvented with AI.",
  name: "Satya Nadella",
  title: "Chairman & CEO",
};

// Achievements/Badges
export const microsoftAchievements = [
  { icon: "☁️", title: "29%", desc: "Azure Growth" },
  { icon: "🤖", title: "Copilot", desc: "In Everything" },
  { icon: "🎮", title: "$69B", desc: "Activision Closed" },
  { icon: "💰", title: "$3.3T", desc: "Market Cap" },
  { icon: "📈", title: "+22%", desc: "EPS Growth" },
  { icon: "🏢", title: "#1", desc: "Enterprise Software" },
];

// Customer concentration
export const microsoftCustomers = {
  top4Percentage: 0.0,
  top4Label: "Diversified Enterprise",
  customers: ["Fortune 500", "SMBs", "Consumers", "Government"],
  risk: "OpenAI partnership costs. Cloud competition (AWS). Antitrust scrutiny. Gaming integration.",
};

// Wrapped Data Builder
// Combines SEC + Polygon data into WrappedData format

import { WrappedData, StockData, FinancialData, PersonalityData } from "@/types/wrapped";
import { getCompany, CompanyConfig } from "@/data/companies";
import { getCompanyFacts, extractKeyFinancials } from "./sec";
import {
  calculateStockPerformance,
  getTickerDetails,
  getSPXPerformance,
  getStockSplits,
} from "./polygon";

// Build complete wrapped data for a company
export async function buildWrappedData(
  ticker: string,
  year: number = 2024
): Promise<WrappedData | null> {
  const company = getCompany(ticker);
  if (!company) {
    console.error(`Company not found: ${ticker}`);
    return null;
  }

  // Determine fiscal year based on company's fiscal year end
  // If fiscal year ends in Jan-Mar, the calendar year data is for FY+1
  const fiscalYear = company.fiscalYearEnd <= 3 ? year + 1 : year;

  console.log(`Building wrapped for ${ticker} (FY${fiscalYear})...`);

  // Fetch data in parallel
  const [secFacts, stockPerf, tickerDetails, spxPerf, splits] = await Promise.all([
    getCompanyFacts(company.cik),
    calculateStockPerformance(ticker, year),
    getTickerDetails(ticker),
    getSPXPerformance(year),
    getStockSplits(ticker, `${year}-01-01`, `${year}-12-31`),
  ]);

  // Extract financial data from SEC
  const financials = secFacts ? extractKeyFinancials(secFacts, fiscalYear) : null;

  // Build stock data
  const stockData: StockData = {
    returnYTD: stockPerf?.returnYTD ?? 0,
    startPrice: stockPerf?.startPrice ?? 0,
    endPrice: stockPerf?.endPrice ?? 0,
    high52w: stockPerf?.high52w ?? 0,
    low52w: stockPerf?.low52w ?? 0,
    marketCap: tickerDetails?.marketCap ?? 0,
    vsSpx: stockPerf && spxPerf ? stockPerf.returnYTD - spxPerf : 0,
    percentile: calculatePercentile(stockPerf?.returnYTD ?? 0),
    split: splits.length > 0 ? {
      ratio: `${splits[0].splitTo}:${splits[0].splitFrom}`,
      date: splits[0].executionDate,
    } : undefined,
  };

  // Build financial data
  const financialData: FinancialData = {
    revenue: financials?.revenue ?? 0,
    revenueGrowth: financials?.revenueGrowth ?? 0,
    grossProfit: financials?.grossProfit ?? 0,
    grossMargin: financials?.grossMargin ?? 0,
    operatingIncome: financials?.operatingIncome ?? 0,
    operatingMargin: financials?.operatingMargin ?? 0,
    netIncome: financials?.netIncome ?? 0,
    netMargin: financials?.netMargin ?? 0,
    eps: financials?.eps ?? 0,
    epsGrowth: financials?.epsGrowth ?? 0,
    employees: tickerDetails?.employees,
    revenuePerEmployee: tickerDetails?.employees && financials?.revenue
      ? financials.revenue / tickerDetails.employees
      : undefined,
    profitPerEmployee: tickerDetails?.employees && financials?.netIncome
      ? financials.netIncome / tickerDetails.employees
      : undefined,
  };

  // Generate personality based on performance
  const personality = generatePersonality(stockData, financialData);

  // Generate AI summary
  const aiSummary = generateSummary(company, stockData, financialData, year);

  // Build the wrapped data
  const wrapped: WrappedData = {
    meta: {
      ticker: company.ticker,
      name: company.name,
      fiscalYear,
      fiscalYearEnd: getFiscalYearEndLabel(company.fiscalYearEnd, fiscalYear),
      theme: {
        primary: company.theme.primary,
        secondary: company.theme.secondary,
        accent: company.theme.accent,
      },
    },
    stock: stockData,
    financials: financialData,
    segments: [], // Would need company-specific parsing
    geographic: [], // Would need company-specific parsing
    quarterly: [], // Would need quarterly data parsing
    cashFlow: {
      operatingCashFlow: financials?.operatingCashFlow ?? 0,
      freeCashFlow: financials?.freeCashFlow ?? 0,
      capex: 0, // Would need to extract
      rdSpend: financials?.rdExpense ?? 0,
      buybacks: 0, // Would need to extract
      dividends: 0, // Would need to extract
    },
    valuation: calculateValuation(stockData, financialData),
    insiders: {
      totalSales: 0,
      totalBuys: 0,
      netActivity: "neutral",
      transactions: [],
    },
    events: [], // Would need news/events API
    competitive: {
      competitors: [],
    },
    personality,
    aiSummary,
    generatedAt: new Date().toISOString(),
  };

  return wrapped;
}

// Calculate percentile rank (simplified)
function calculatePercentile(returnYTD: number): number {
  // Rough approximation based on historical S&P 500 distribution
  if (returnYTD > 1.0) return 99;
  if (returnYTD > 0.5) return 95;
  if (returnYTD > 0.3) return 85;
  if (returnYTD > 0.2) return 75;
  if (returnYTD > 0.1) return 60;
  if (returnYTD > 0) return 50;
  if (returnYTD > -0.1) return 35;
  if (returnYTD > -0.2) return 20;
  return 10;
}

// Get fiscal year end label
function getFiscalYearEndLabel(month: number, year: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${months[month - 1]} ${year}`;
}

// Calculate valuation metrics
function calculateValuation(stock: StockData, financials: FinancialData) {
  const marketCap = stock.marketCap;
  const eps = financials.eps;
  const revenue = financials.revenue;

  return {
    peRatio: eps && eps > 0 ? stock.endPrice / eps : 0,
    peSectorAvg: 25, // Would need sector data
    psRatio: marketCap && revenue ? marketCap / revenue : 0,
    psSectorAvg: 5, // Would need sector data
    pegRatio: undefined, // Would need growth estimates
    evEbitda: undefined, // Would need debt data
  };
}

// Generate company personality based on performance
function generatePersonality(stock: StockData, financials: FinancialData): PersonalityData {
  const returnYTD = stock.returnYTD;
  const revenueGrowth = financials.revenueGrowth;
  const netMargin = financials.netMargin;

  // Determine personality type based on metrics
  if (returnYTD > 1.0 && revenueGrowth > 0.5) {
    return {
      type: "The Unstoppable Force",
      emoji: "🦾",
      description: `An absolute juggernaut. Every quarter dominated, every doubter silenced. This was a company that couldn't be stopped.`,
      traits: ["Hypergrowth", "Market Leader", "Momentum"],
    };
  } else if (returnYTD > 0.5 && netMargin > 0.2) {
    return {
      type: "The Profit Machine",
      emoji: "💰",
      description: `A lean, mean profit-generating machine. Strong returns backed by exceptional profitability.`,
      traits: ["High Margins", "Efficient", "Cash Rich"],
    };
  } else if (returnYTD > 0.3) {
    return {
      type: "The Steady Climber",
      emoji: "📈",
      description: `Consistent outperformance without the drama. A reliable wealth builder that delivered solid gains.`,
      traits: ["Consistent", "Reliable", "Outperformer"],
    };
  } else if (returnYTD > 0 && revenueGrowth > 0.1) {
    return {
      type: "The Growth Story",
      emoji: "🌱",
      description: `Revenue growing faster than the stock price — the market hasn't caught up yet.`,
      traits: ["Growth Mode", "Expanding", "Undervalued"],
    };
  } else if (returnYTD > 0) {
    return {
      type: "The Quiet Performer",
      emoji: "🎯",
      description: `No fireworks, just steady execution. Beat the bank and did its job.`,
      traits: ["Stable", "Modest Growth", "Defensive"],
    };
  } else if (returnYTD > -0.2 && netMargin > 0.1) {
    return {
      type: "The Turnaround Story",
      emoji: "🔄",
      description: `A rough year on the stock, but fundamentals suggest better days ahead.`,
      traits: ["Oversold", "Fundamentals OK", "Patience Required"],
    };
  } else if (returnYTD > -0.3) {
    return {
      type: "The Rebuilder",
      emoji: "🏗️",
      description: `Taking its lumps while laying groundwork for the future.`,
      traits: ["Restructuring", "Challenged", "Rebuilding"],
    };
  } else {
    return {
      type: "The Fallen Giant",
      emoji: "📉",
      description: `A tough year. Investors are questioning the path forward.`,
      traits: ["Struggling", "Uncertain", "High Risk"],
    };
  }
}

// Generate AI summary
function generateSummary(
  company: CompanyConfig,
  stock: StockData,
  financials: FinancialData,
  year: number
): string {
  const returnPct = (stock.returnYTD * 100).toFixed(0);
  const revenueB = financials.revenue ? (financials.revenue / 1e9).toFixed(1) : "N/A";
  const revGrowthPct = financials.revenueGrowth ? (financials.revenueGrowth * 100).toFixed(0) : "N/A";
  const netIncomeB = financials.netIncome ? (financials.netIncome / 1e9).toFixed(1) : "N/A";
  const marginPct = financials.netMargin ? (financials.netMargin * 100).toFixed(0) : "N/A";

  const direction = stock.returnYTD >= 0 ? "gained" : "lost";
  const returnDesc = stock.returnYTD >= 0 ? `+${returnPct}%` : `${returnPct}%`;

  let summary = `In ${year}, ${company.name} stock ${direction} ${Math.abs(stock.returnYTD * 100).toFixed(0)}%. `;

  if (financials.revenue) {
    summary += `Revenue reached $${revenueB}B`;
    if (financials.revenueGrowth) {
      const growthDir = financials.revenueGrowth >= 0 ? "up" : "down";
      summary += ` (${growthDir} ${Math.abs(financials.revenueGrowth * 100).toFixed(0)}% YoY)`;
    }
    summary += `. `;
  }

  if (financials.netIncome && financials.netMargin) {
    summary += `Net income was $${netIncomeB}B with a ${marginPct}% net margin. `;
  }

  if (stock.split) {
    summary += `The company executed a ${stock.split.ratio} stock split in ${stock.split.date}. `;
  }

  return summary.trim();
}

// Format large numbers for display
export function formatNumber(num: number, decimals: number = 1): string {
  if (Math.abs(num) >= 1e12) return (num / 1e12).toFixed(decimals) + "T";
  if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(decimals) + "B";
  if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(decimals) + "M";
  if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(decimals) + "K";
  return num.toFixed(decimals);
}

// Format percentage
export function formatPercent(num: number, decimals: number = 0): string {
  const sign = num >= 0 ? "+" : "";
  return `${sign}${(num * 100).toFixed(decimals)}%`;
}

// Format currency
export function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// Wrapped data orchestration service
// Fetches real data from APIs, caches in database, returns WrappedData

import { getFinancials } from "./api/sec";
import { calculateStockPerformance, getSPYPerformance, getDividends } from "./api/polygon";
import { getCachedWrapped, cacheWrapped } from "./db";
import { getCompany, getAllTickers } from "@/data/companies";
import type { WrappedData, EventData } from "@/types/wrapped";

// Extended company metadata - things not in companies.ts
const COMPANY_EXTRA: Record<string, {
  industry: string;
  ceo: string;
  headquarters: string;
  founded: string;
}> = {
  NVDA: { industry: "Semiconductors", ceo: "Jensen Huang", headquarters: "Santa Clara, CA", founded: "1993" },
  AAPL: { industry: "Consumer Electronics", ceo: "Tim Cook", headquarters: "Cupertino, CA", founded: "1976" },
  MSFT: { industry: "Software", ceo: "Satya Nadella", headquarters: "Redmond, WA", founded: "1975" },
  GOOGL: { industry: "Internet Services", ceo: "Sundar Pichai", headquarters: "Mountain View, CA", founded: "1998" },
  META: { industry: "Social Media", ceo: "Mark Zuckerberg", headquarters: "Menlo Park, CA", founded: "2004" },
  AMZN: { industry: "E-commerce", ceo: "Andy Jassy", headquarters: "Seattle, WA", founded: "1994" },
  TSLA: { industry: "Electric Vehicles", ceo: "Elon Musk", headquarters: "Austin, TX", founded: "2003" },
  AMD: { industry: "Semiconductors", ceo: "Lisa Su", headquarters: "Santa Clara, CA", founded: "1969" },
  INTC: { industry: "Semiconductors", ceo: "Pat Gelsinger", headquarters: "Santa Clara, CA", founded: "1968" },
  CRM: { industry: "Software", ceo: "Marc Benioff", headquarters: "San Francisco, CA", founded: "1999" },
  ORCL: { industry: "Software", ceo: "Safra Catz", headquarters: "Austin, TX", founded: "1977" },
  AVGO: { industry: "Semiconductors", ceo: "Hock Tan", headquarters: "San Jose, CA", founded: "1991" },
  CSCO: { industry: "Networking", ceo: "Chuck Robbins", headquarters: "San Jose, CA", founded: "1984" },
  ADBE: { industry: "Software", ceo: "Shantanu Narayen", headquarters: "San Jose, CA", founded: "1982" },
  IBM: { industry: "IT Services", ceo: "Arvind Krishna", headquarters: "Armonk, NY", founded: "1911" },
  JPM: { industry: "Banking", ceo: "Jamie Dimon", headquarters: "New York, NY", founded: "1799" },
  V: { industry: "Payment Processing", ceo: "Ryan McInerney", headquarters: "San Francisco, CA", founded: "1958" },
  MA: { industry: "Payment Processing", ceo: "Michael Miebach", headquarters: "Purchase, NY", founded: "1966" },
  BAC: { industry: "Banking", ceo: "Brian Moynihan", headquarters: "Charlotte, NC", founded: "1998" },
  WFC: { industry: "Banking", ceo: "Charlie Scharf", headquarters: "San Francisco, CA", founded: "1852" },
  GS: { industry: "Investment Banking", ceo: "David Solomon", headquarters: "New York, NY", founded: "1869" },
  BRK_B: { industry: "Conglomerate", ceo: "Warren Buffett", headquarters: "Omaha, NE", founded: "1839" },
  AXP: { industry: "Financial Services", ceo: "Stephen Squeri", headquarters: "New York, NY", founded: "1850" },
  UNH: { industry: "Health Insurance", ceo: "Andrew Witty", headquarters: "Minnetonka, MN", founded: "1977" },
  JNJ: { industry: "Pharmaceuticals", ceo: "Joaquin Duato", headquarters: "New Brunswick, NJ", founded: "1886" },
  LLY: { industry: "Pharmaceuticals", ceo: "David Ricks", headquarters: "Indianapolis, IN", founded: "1876" },
  PFE: { industry: "Pharmaceuticals", ceo: "Albert Bourla", headquarters: "New York, NY", founded: "1849" },
  ABBV: { industry: "Pharmaceuticals", ceo: "Robert Michael", headquarters: "North Chicago, IL", founded: "2013" },
  MRK: { industry: "Pharmaceuticals", ceo: "Robert Davis", headquarters: "Rahway, NJ", founded: "1891" },
  WMT: { industry: "Retail", ceo: "Doug McMillon", headquarters: "Bentonville, AR", founded: "1962" },
  PG: { industry: "Consumer Goods", ceo: "Jon Moeller", headquarters: "Cincinnati, OH", founded: "1837" },
  KO: { industry: "Beverages", ceo: "James Quincey", headquarters: "Atlanta, GA", founded: "1886" },
  PEP: { industry: "Beverages", ceo: "Ramon Laguarta", headquarters: "Purchase, NY", founded: "1965" },
  COST: { industry: "Retail", ceo: "Ron Vachris", headquarters: "Issaquah, WA", founded: "1983" },
  MCD: { industry: "Restaurants", ceo: "Chris Kempczinski", headquarters: "Chicago, IL", founded: "1940" },
  NKE: { industry: "Apparel", ceo: "John Donahoe", headquarters: "Beaverton, OR", founded: "1964" },
  SBUX: { industry: "Restaurants", ceo: "Laxman Narasimhan", headquarters: "Seattle, WA", founded: "1971" },
  HD: { industry: "Retail", ceo: "Ted Decker", headquarters: "Atlanta, GA", founded: "1978" },
  LOW: { industry: "Retail", ceo: "Marvin Ellison", headquarters: "Mooresville, NC", founded: "1946" },
  XOM: { industry: "Oil & Gas", ceo: "Darren Woods", headquarters: "Spring, TX", founded: "1999" },
  CVX: { industry: "Oil & Gas", ceo: "Mike Wirth", headquarters: "San Ramon, CA", founded: "1879" },
  CAT: { industry: "Heavy Equipment", ceo: "Jim Umpleby", headquarters: "Irving, TX", founded: "1925" },
  BA: { industry: "Aerospace", ceo: "Dave Calhoun", headquarters: "Arlington, VA", founded: "1916" },
  UPS: { industry: "Logistics", ceo: "Carol Tome", headquarters: "Atlanta, GA", founded: "1907" },
  HON: { industry: "Conglomerate", ceo: "Vimal Kapur", headquarters: "Charlotte, NC", founded: "1906" },
  GE: { industry: "Aerospace", ceo: "Larry Culp", headquarters: "Boston, MA", founded: "1892" },
  DIS: { industry: "Entertainment", ceo: "Bob Iger", headquarters: "Burbank, CA", founded: "1923" },
  NFLX: { industry: "Streaming", ceo: "Ted Sarandos", headquarters: "Los Gatos, CA", founded: "1997" },
  CMCSA: { industry: "Media", ceo: "Brian Roberts", headquarters: "Philadelphia, PA", founded: "1963" },
  T: { industry: "Telecommunications", ceo: "John Stankey", headquarters: "Dallas, TX", founded: "1983" },
  VZ: { industry: "Telecommunications", ceo: "Hans Vestberg", headquarters: "New York, NY", founded: "1983" },
};

// Curated events and insights per company per year
const COMPANY_EVENTS: Record<string, Record<number, {
  events: EventData[];
  buzzwords: string[];
  insights: string[];
  personality: { type: string; emoji: string; description: string; traits: string[] };
}>> = {
  NVDA: {
    2024: {
      events: [
        { date: "2024-03-18", title: "GTC 2024", description: "Blackwell architecture and B200 GPU announced", type: "product" },
        { date: "2024-05-22", title: "Record Earnings", description: "Data center revenue exceeded $22B in quarter", type: "financial" },
        { date: "2024-06-10", title: "Stock Split", description: "10-for-1 stock split executed", type: "corporate" },
      ],
      buzzwords: ["Blackwell", "H100", "CUDA", "Generative AI", "Inference", "Training"],
      insights: [
        "Data center revenue grew 409% year-over-year",
        "Became world's most valuable company briefly in June",
        "AI chip demand continues to outpace supply",
      ],
      personality: { type: "The AI Kingmaker", emoji: "crown", description: "NVIDIA became the backbone of the AI revolution, with chips powering every major AI model", traits: ["Dominant", "Innovative", "High-growth"] },
    },
  },
  AAPL: {
    2024: {
      events: [
        { date: "2024-02-02", title: "Vision Pro Launch", description: "Apple Vision Pro launched starting at $3,499", type: "product" },
        { date: "2024-06-10", title: "Apple Intelligence", description: "AI features announced at WWDC 2024", type: "product" },
        { date: "2024-09-09", title: "iPhone 16 Launch", description: "iPhone 16 series with A18 chips unveiled", type: "product" },
      ],
      buzzwords: ["Apple Intelligence", "Vision Pro", "Spatial Computing", "On-device AI", "Privacy-first ML"],
      insights: [
        "Services revenue hit all-time high, now $96B+ annually",
        "India became Apple's fastest-growing market",
        "Vision Pro represents Apple's biggest new product category since Apple Watch",
      ],
      personality: { type: "The Premium Innovator", emoji: "sparkles", description: "Apple continued pushing premium boundaries while expanding services", traits: ["Premium", "Ecosystem-driven", "Service-focused"] },
    },
  },
  MSFT: {
    2024: {
      events: [
        { date: "2024-01-25", title: "Copilot Enterprise", description: "Microsoft 365 Copilot launched for enterprises", type: "product" },
        { date: "2024-03-21", title: "AI Infrastructure", description: "Azure AI expanded with new GPU clusters", type: "corporate" },
        { date: "2024-10-15", title: "Activision Integration", description: "Full integration of Activision Blizzard completed", type: "milestone" },
      ],
      buzzwords: ["Copilot", "Azure AI", "OpenAI Partnership", "Responsible AI", "Cloud Gaming"],
      insights: [
        "Azure growth accelerated to 30%+ driven by AI workloads",
        "Copilot became fastest-growing Microsoft product ever",
        "Gaming revenue surged 61% post-Activision acquisition",
      ],
      personality: { type: "The AI Enterprise Giant", emoji: "building", description: "Microsoft transformed into the enterprise AI leader", traits: ["Enterprise-focused", "AI-first", "Diversified"] },
    },
  },
  TSLA: {
    2024: {
      events: [
        { date: "2024-01-24", title: "Earnings Miss", description: "Q4 2023 earnings missed expectations, stock dropped", type: "financial" },
        { date: "2024-04-08", title: "FSD v12", description: "Full Self-Driving v12 released with end-to-end neural nets", type: "product" },
        { date: "2024-10-10", title: "Robotaxi Reveal", description: "Cybercab autonomous vehicle unveiled", type: "product" },
      ],
      buzzwords: ["Cybercab", "FSD v12", "Optimus", "4680 Cells", "Megapack", "Robotaxi"],
      insights: [
        "EV price war pressured margins throughout the year",
        "Energy storage business grew 75%, becoming major profit driver",
        "FSD subscriptions and licensing emerged as key revenue stream",
      ],
      personality: { type: "The Disruptor", emoji: "lightning", description: "Tesla continued disrupting while navigating margin pressures", traits: ["Volatile", "Visionary", "Margin-pressured"] },
    },
  },
  GOOGL: {
    2024: {
      events: [
        { date: "2024-02-08", title: "Gemini Launch", description: "Google Gemini AI model released to compete with GPT-4", type: "product" },
        { date: "2024-05-14", title: "Google I/O", description: "AI-powered search and Gemini integration announced", type: "product" },
        { date: "2024-08-05", title: "Antitrust Ruling", description: "DOJ ruled Google violated antitrust law in search", type: "corporate" },
      ],
      buzzwords: ["Gemini", "AI Overviews", "Cloud AI", "TPU v5", "Search Generative Experience"],
      insights: [
        "Google Cloud achieved profitability for the first time",
        "YouTube ad revenue grew 21% year-over-year",
        "Regulatory challenges intensified in US and EU",
      ],
      personality: { type: "The Search Titan", emoji: "magnifying-glass", description: "Google defended its search empire while pivoting to AI", traits: ["Dominant", "AI-transitioning", "Regulatory-pressured"] },
    },
  },
  META: {
    2024: {
      events: [
        { date: "2024-02-01", title: "Dividend Announcement", description: "Meta announced first-ever dividend of $0.50/share", type: "financial" },
        { date: "2024-04-18", title: "Llama 3 Release", description: "Open-source Llama 3 model released", type: "product" },
        { date: "2024-09-25", title: "Quest 3S Launch", description: "Lower-cost VR headset launched at $299", type: "product" },
      ],
      buzzwords: ["Llama 3", "Year of Efficiency", "Reels", "AI Personas", "Reality Labs"],
      insights: [
        "Ad revenue recovered strongly, up 24% year-over-year",
        "Reality Labs losses exceeded $16B but VR strategy continued",
        "Threads reached 200M monthly users",
      ],
      personality: { type: "The Comeback Kid", emoji: "rocket", description: "Meta bounced back with efficiency and AI focus", traits: ["Recovering", "AI-focused", "Metaverse-committed"] },
    },
  },
  AMZN: {
    2024: {
      events: [
        { date: "2024-01-09", title: "Layoffs Continue", description: "Additional layoffs announced in AWS and entertainment", type: "corporate" },
        { date: "2024-04-30", title: "AWS Growth", description: "AWS revenue growth accelerated to 17%", type: "financial" },
        { date: "2024-10-08", title: "Anthropic Investment", description: "Additional $2.75B investment in Anthropic announced", type: "corporate" },
      ],
      buzzwords: ["Bedrock", "AWS AI", "Project Kuiper", "Just Walk Out", "Anthropic"],
      insights: [
        "AWS growth reaccelerated driven by AI workloads",
        "Retail margins improved through cost optimization",
        "Invested heavily in AI infrastructure and partnerships",
      ],
      personality: { type: "The Everything Store", emoji: "package", description: "Amazon balanced retail efficiency with AI cloud growth", traits: ["Diversified", "Cost-optimizing", "AI-investing"] },
    },
  },
  JPM: {
    2024: {
      events: [
        { date: "2024-01-12", title: "Record Profit", description: "JPM reported record annual profit of $49.6B", type: "financial" },
        { date: "2024-05-20", title: "First Republic Integration", description: "Full integration of First Republic completed", type: "milestone" },
        { date: "2024-09-18", title: "Fed Rate Cut", description: "First Fed rate cut in 4 years impacts banking sector", type: "financial" },
      ],
      buzzwords: ["Net Interest Income", "Investment Banking", "AI in Banking", "Digital Banking"],
      insights: [
        "Consumer banking remained resilient despite rate changes",
        "Investment banking fees rebounded strongly",
        "JPM maintained dominant market position across business lines",
      ],
      personality: { type: "The Banking Titan", emoji: "bank", description: "JPMorgan dominated banking with record profits", traits: ["Dominant", "Diversified", "Rate-sensitive"] },
    },
  },
};

// Get fiscal year end month name
function getFiscalYearEndMonth(month: number): string {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[month - 1] || "December";
}

// Build wrapped data for a company
export async function buildWrappedData(
  ticker: string,
  year: number,
  forceRefresh: boolean = false
): Promise<WrappedData | null> {
  const upperTicker = ticker.toUpperCase().replace("-", "_");

  // Check cache first (unless forcing refresh)
  if (!forceRefresh) {
    try {
      const cached = await getCachedWrapped(upperTicker, year);
      if (cached) {
        return cached as WrappedData;
      }
    } catch (error) {
      // Database not available, continue without cache
      console.warn("Cache not available, fetching fresh data");
    }
  }

  // Get company config from companies.ts
  const companyConfig = getCompany(upperTicker);
  if (!companyConfig) {
    console.warn(`No company config for ${upperTicker}`);
    return null;
  }

  // Get extended metadata
  const extra = COMPANY_EXTRA[upperTicker] || {
    industry: companyConfig.sector,
    ceo: "Unknown",
    headquarters: "Unknown",
    founded: "Unknown",
  };

  // Fetch data from APIs in parallel
  let financials = null;
  let stockPerformance = null;
  let spyPerformance = null;
  let dividends: Array<{ ex_dividend_date: string; cash_amount: number; declaration_date: string; pay_date: string }> = [];

  try {
    [financials, stockPerformance, spyPerformance, dividends] = await Promise.all([
      getFinancials(upperTicker.replace("_", "-"), year).catch(() => null),
      calculateStockPerformance(upperTicker.replace("_", "-"), year).catch(() => null),
      getSPYPerformance(year).catch(() => null),
      getDividends(upperTicker.replace("_", "-"), year).catch(() => []),
    ]);
  } catch (error) {
    console.error(`Error fetching data for ${upperTicker}:`, error);
  }

  // Get curated events
  const curatedData = COMPANY_EVENTS[upperTicker]?.[year] || {
    events: [],
    buzzwords: [],
    insights: [],
    personality: { type: "Market Player", emoji: "chart", description: `${companyConfig.name} navigated the year`, traits: ["Dynamic"] },
  };

  // Calculate derived metrics
  const vsMarket = stockPerformance && spyPerformance
    ? stockPerformance.returnYTD - spyPerformance.returnYTD
    : 0;

  // Calculate percentile (simplified - would need full S&P 500 data for real calculation)
  const percentile = stockPerformance ? Math.min(99, Math.max(1, Math.round(50 + vsMarket * 100))) : 50;

  // Calculate total dividends
  const totalDividends = dividends.reduce((sum, d) => sum + d.cash_amount, 0);

  // Build the wrapped data object matching WrappedData type
  const wrappedData: WrappedData = {
    meta: {
      ticker: upperTicker.replace("_", "-"),
      name: companyConfig.name,
      fiscalYear: year,
      fiscalYearEnd: `${getFiscalYearEndMonth(companyConfig.fiscalYearEnd)} ${year + 1}`,
      theme: companyConfig.theme,
    },
    stock: {
      returnYTD: stockPerformance?.returnYTD || 0,
      startPrice: stockPerformance?.startPrice || 0,
      endPrice: stockPerformance?.endPrice || 0,
      high52w: stockPerformance?.high52w || 0,
      low52w: stockPerformance?.low52w || 0,
      marketCap: stockPerformance?.marketCap || 0,
      vsSpx: vsMarket,
      percentile: percentile,
      split: stockPerformance?.splits?.[0] ? {
        ratio: `${stockPerformance.splits[0].split_to}-for-${stockPerformance.splits[0].split_from}`,
        date: stockPerformance.splits[0].execution_date,
      } : undefined,
    },
    financials: {
      revenue: financials?.revenue || 0,
      revenueGrowth: financials?.revenueGrowth || 0,
      grossProfit: financials?.grossProfit || 0,
      grossMargin: financials?.grossMargin || 0,
      operatingIncome: financials?.operatingIncome || 0,
      operatingMargin: financials?.operatingMargin || 0,
      netIncome: financials?.netIncome || 0,
      netMargin: financials?.netMargin || 0,
      eps: financials?.eps || 0,
      epsGrowth: financials?.epsGrowth || 0,
      employees: stockPerformance?.employees,
      revenuePerEmployee: financials?.revenue && stockPerformance?.employees
        ? financials.revenue / stockPerformance.employees
        : undefined,
      profitPerEmployee: financials?.netIncome && stockPerformance?.employees
        ? financials.netIncome / stockPerformance.employees
        : undefined,
    },
    segments: [], // Would need 10-K parsing
    geographic: [], // Would need 10-K parsing
    quarterly: financials?.quarterlyRevenue?.map((q, i, arr) => ({
      quarter: q.quarter,
      revenue: q.value,
      qoqGrowth: i > 0 && arr[i-1].value ? (q.value - arr[i-1].value) / arr[i-1].value : 0,
      yoyGrowth: 0, // Would need previous year data
    })) || [],
    cashFlow: {
      operatingCashFlow: financials?.cashFlow || 0,
      freeCashFlow: financials?.freeCashFlow || 0,
      capex: financials?.capex || 0,
      rdSpend: financials?.rdExpense || 0,
      buybacks: 0, // Would need additional SEC data
      dividends: totalDividends * (stockPerformance?.sharesOutstanding || 0),
    },
    valuation: {
      peRatio: financials?.eps && stockPerformance ? stockPerformance.endPrice / financials.eps : 0,
      peSectorAvg: 25, // Would need sector data
      psRatio: financials?.revenue && stockPerformance?.marketCap
        ? stockPerformance.marketCap / financials.revenue
        : 0,
      psSectorAvg: 5, // Would need sector data
    },
    insiders: {
      totalSales: 0,
      totalBuys: 0,
      netActivity: "neutral",
      ceoName: extra.ceo,
      transactions: [],
    },
    events: curatedData.events,
    competitive: {
      competitors: [],
    },
    personality: curatedData.personality,
    aiSummary: `${companyConfig.name} had ${stockPerformance && stockPerformance.returnYTD > 0 ? "a strong" : "a challenging"} fiscal year ${year}. ${curatedData.insights[0] || ""}`,
    generatedAt: new Date().toISOString(),
  };

  // Cache the result (24 hour TTL) - don't fail if cache unavailable
  try {
    await cacheWrapped(upperTicker, year, "FY", wrappedData, 24);
  } catch (error) {
    console.warn("Failed to cache wrapped data:", error);
  }

  return wrappedData;
}

// Helper data export for page.tsx
export function getCuratedData(ticker: string, year: number) {
  const upperTicker = ticker.toUpperCase().replace("-", "_");
  return COMPANY_EVENTS[upperTicker]?.[year] || null;
}

// Get list of supported tickers
export function getSupportedTickers(): string[] {
  return getAllTickers();
}

// Check if a ticker is supported
export function isTickerSupported(ticker: string): boolean {
  return getCompany(ticker) !== undefined;
}

// Polygon.io API Service
// Requires API key - set POLYGON_API_KEY env var

const POLYGON_BASE_URL = "https://api.polygon.io";

function getApiKey(): string {
  const key = process.env.POLYGON_API_KEY;
  if (!key) {
    throw new Error("POLYGON_API_KEY environment variable not set");
  }
  return key;
}

// Stock price aggregates (daily bars)
export interface StockBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export async function getDailyBars(
  ticker: string,
  from: string, // YYYY-MM-DD
  to: string
): Promise<StockBar[]> {
  try {
    const url = `${POLYGON_BASE_URL}/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${getApiKey()}`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache 1h

    if (!response.ok) {
      console.error(`Polygon API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    if (!data.results) return [];

    return data.results.map((bar: any) => ({
      date: new Date(bar.t).toISOString().split("T")[0],
      open: bar.o,
      high: bar.h,
      low: bar.l,
      close: bar.c,
      volume: bar.v,
    }));
  } catch (error) {
    console.error("Error fetching Polygon data:", error);
    return [];
  }
}

// Get ticker details (market cap, shares outstanding, etc.)
export interface TickerDetails {
  ticker: string;
  name: string;
  marketCap: number;
  sharesOutstanding: number;
  description?: string;
  homepageUrl?: string;
  employees?: number;
  listDate?: string;
  sicCode?: string;
  sicDescription?: string;
}

export async function getTickerDetails(ticker: string): Promise<TickerDetails | null> {
  try {
    const url = `${POLYGON_BASE_URL}/v3/reference/tickers/${ticker}?apiKey=${getApiKey()}`;
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache 24h

    if (!response.ok) {
      console.error(`Polygon API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (!data.results) return null;

    const r = data.results;
    return {
      ticker: r.ticker,
      name: r.name,
      marketCap: r.market_cap,
      sharesOutstanding: r.weighted_shares_outstanding || r.share_class_shares_outstanding,
      description: r.description,
      homepageUrl: r.homepage_url,
      employees: r.total_employees,
      listDate: r.list_date,
      sicCode: r.sic_code,
      sicDescription: r.sic_description,
    };
  } catch (error) {
    console.error("Error fetching ticker details:", error);
    return null;
  }
}

// Get previous day close
export async function getPreviousClose(ticker: string): Promise<{
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
} | null> {
  try {
    const url = `${POLYGON_BASE_URL}/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${getApiKey()}`;
    const response = await fetch(url, { next: { revalidate: 300 } }); // Cache 5min

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;

    const r = data.results[0];
    return {
      close: r.c,
      open: r.o,
      high: r.h,
      low: r.l,
      volume: r.v,
    };
  } catch (error) {
    console.error("Error fetching previous close:", error);
    return null;
  }
}

// Calculate stock performance metrics
export interface StockPerformance {
  returnYTD: number;
  startPrice: number;
  endPrice: number;
  high52w: number;
  low52w: number;
  volatility: number;
}

export async function calculateStockPerformance(
  ticker: string,
  year: number
): Promise<StockPerformance | null> {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const bars = await getDailyBars(ticker, startDate, endDate);
  if (bars.length === 0) return null;

  const startPrice = bars[0].close;
  const endPrice = bars[bars.length - 1].close;
  const high52w = Math.max(...bars.map((b) => b.high));
  const low52w = Math.min(...bars.map((b) => b.low));

  // Calculate volatility (standard deviation of daily returns)
  const returns: number[] = [];
  for (let i = 1; i < bars.length; i++) {
    returns.push((bars[i].close - bars[i - 1].close) / bars[i - 1].close);
  }
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance) * Math.sqrt(252); // Annualized

  return {
    returnYTD: (endPrice - startPrice) / startPrice,
    startPrice,
    endPrice,
    high52w,
    low52w,
    volatility,
  };
}

// Get S&P 500 performance for comparison
export async function getSPXPerformance(year: number): Promise<number | null> {
  const performance = await calculateStockPerformance("SPY", year);
  return performance?.returnYTD ?? null;
}

// Get stock splits
export interface StockSplit {
  executionDate: string;
  splitFrom: number;
  splitTo: number;
}

export async function getStockSplits(
  ticker: string,
  from: string,
  to: string
): Promise<StockSplit[]> {
  try {
    const url = `${POLYGON_BASE_URL}/v3/reference/splits?ticker=${ticker}&execution_date.gte=${from}&execution_date.lte=${to}&apiKey=${getApiKey()}`;
    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.results) return [];

    return data.results.map((s: any) => ({
      executionDate: s.execution_date,
      splitFrom: s.split_from,
      splitTo: s.split_to,
    }));
  } catch (error) {
    console.error("Error fetching stock splits:", error);
    return [];
  }
}

// Get financials from Polygon (alternative to SEC)
export async function getFinancials(ticker: string, limit: number = 4): Promise<any[]> {
  try {
    const url = `${POLYGON_BASE_URL}/vX/reference/financials?ticker=${ticker}&limit=${limit}&apiKey=${getApiKey()}`;
    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) return [];

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching financials:", error);
    return [];
  }
}

// Polygon.io API service for stock data
// Docs: https://polygon.io/docs

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const BASE_URL = "https://api.polygon.io";

interface PolygonAggResult {
  c: number; // close
  h: number; // high
  l: number; // low
  o: number; // open
  v: number; // volume
  t: number; // timestamp
}

interface TickerDetails {
  ticker: string;
  name: string;
  market_cap: number;
  share_class_shares_outstanding: number;
  weighted_shares_outstanding: number;
  description: string;
  sic_code: string;
  sic_description: string;
  homepage_url: string;
  total_employees: number;
  list_date: string;
  primary_exchange: string;
  type: string;
}

// Get stock price history for a date range
export async function getStockPrices(
  ticker: string,
  startDate: string,
  endDate: string
): Promise<PolygonAggResult[]> {
  const url = `${BASE_URL}/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}`;
  const params = new URLSearchParams({
    apiKey: POLYGON_API_KEY!,
    adjusted: "true",
    sort: "asc",
    limit: "365",
  });

  const response = await fetch(`${url}?${params}`);
  const data = await response.json();

  if (data.status !== "OK" || !data.results) {
    console.error(`Polygon error for ${ticker}:`, data);
    return [];
  }

  return data.results;
}

// Get ticker details (market cap, employees, etc.)
export async function getTickerDetails(ticker: string): Promise<TickerDetails | null> {
  const url = `${BASE_URL}/v3/reference/tickers/${ticker}`;
  const params = new URLSearchParams({ apiKey: POLYGON_API_KEY! });

  const response = await fetch(`${url}?${params}`);
  const data = await response.json();

  if (data.status !== "OK" || !data.results) {
    console.error(`Polygon ticker details error for ${ticker}:`, data);
    return null;
  }

  return data.results;
}

// Get stock splits
export async function getStockSplits(ticker: string): Promise<Array<{
  execution_date: string;
  split_from: number;
  split_to: number;
}>> {
  const url = `${BASE_URL}/v3/reference/splits`;
  const params = new URLSearchParams({
    apiKey: POLYGON_API_KEY!,
    ticker: ticker,
    limit: "10",
  });

  const response = await fetch(`${url}?${params}`);
  const data = await response.json();

  if (data.status !== "OK" || !data.results) {
    return [];
  }

  return data.results;
}

// Get dividends
export async function getDividends(ticker: string, year: number): Promise<Array<{
  ex_dividend_date: string;
  cash_amount: number;
  declaration_date: string;
  pay_date: string;
}>> {
  const url = `${BASE_URL}/v3/reference/dividends`;
  const params = new URLSearchParams({
    apiKey: POLYGON_API_KEY!,
    ticker: ticker,
    "ex_dividend_date.gte": `${year}-01-01`,
    "ex_dividend_date.lte": `${year}-12-31`,
    limit: "50",
  });

  const response = await fetch(`${url}?${params}`);
  const data = await response.json();

  if (data.status !== "OK" || !data.results) {
    return [];
  }

  return data.results;
}

// Calculate stock performance for a year
export async function calculateStockPerformance(ticker: string, year: number) {
  const startDate = `${year - 1}-12-15`; // Get some buffer
  const endDate = `${year}-12-31`;

  const prices = await getStockPrices(ticker, startDate, endDate);
  const details = await getTickerDetails(ticker);
  const splits = await getStockSplits(ticker);

  if (prices.length === 0) {
    return null;
  }

  // Find first trading day of year and last
  const yearStart = new Date(`${year}-01-01`).getTime();
  const yearPrices = prices.filter((p) => p.t >= yearStart);

  if (yearPrices.length === 0) {
    return null;
  }

  const firstPrice = yearPrices[0];
  const lastPrice = yearPrices[yearPrices.length - 1];
  const high52w = Math.max(...yearPrices.map((p) => p.h));
  const low52w = Math.min(...yearPrices.map((p) => p.l));

  const returnYTD = (lastPrice.c - firstPrice.c) / firstPrice.c;

  // Find year's splits
  const yearSplits = splits.filter((s) => {
    const splitDate = new Date(s.execution_date);
    return splitDate.getFullYear() === year;
  });

  return {
    startPrice: firstPrice.c,
    endPrice: lastPrice.c,
    high52w,
    low52w,
    returnYTD,
    marketCap: details?.market_cap || 0,
    sharesOutstanding: details?.weighted_shares_outstanding || 0,
    employees: details?.total_employees || 0,
    splits: yearSplits,
    description: details?.description || "",
  };
}

// Get S&P 500 performance for comparison
export async function getSPYPerformance(year: number) {
  return calculateStockPerformance("SPY", year);
}

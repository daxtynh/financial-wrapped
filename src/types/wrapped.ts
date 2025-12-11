// Types for Financial Wrapped data

export interface WrappedData {
  meta: MetaData;
  stock: StockData;
  financials: FinancialData;
  segments: SegmentData[];
  geographic: GeographicData[];
  quarterly: QuarterlyData[];
  cashFlow: CashFlowData;
  valuation: ValuationData;
  insiders: InsiderData;
  events: EventData[];
  competitive: CompetitiveData;
  personality: PersonalityData;
  aiSummary: string;
  generatedAt: string;
}

export interface MetaData {
  ticker: string;
  name: string;
  fiscalYear: number;
  fiscalYearEnd: string; // e.g., "January 2025"
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface StockData {
  returnYTD: number; // e.g., 1.71 for +171%
  startPrice: number;
  endPrice: number;
  high52w: number;
  low52w: number;
  marketCap: number;
  peakMarketCap?: number;
  split?: {
    ratio: string;
    date: string;
  };
  vsSpx: number; // Performance vs S&P 500
  percentile: number; // Percentile rank vs S&P 500
}

export interface FinancialData {
  revenue: number;
  revenueGrowth: number;
  grossProfit: number;
  grossMargin: number;
  operatingIncome: number;
  operatingMargin: number;
  netIncome: number;
  netMargin: number;
  eps: number;
  epsGrowth: number;
  revenuePerEmployee?: number;
  profitPerEmployee?: number;
  employees?: number;
}

export interface SegmentData {
  name: string;
  revenue: number;
  percentage: number;
  growth: number;
  color?: string;
}

export interface GeographicData {
  region: string;
  percentage: number;
  growth?: number;
  color?: string;
}

export interface QuarterlyData {
  quarter: string; // e.g., "Q1 FY25"
  revenue: number;
  qoqGrowth: number;
  yoyGrowth: number;
}

export interface CashFlowData {
  operatingCashFlow: number;
  freeCashFlow: number;
  capex: number;
  rdSpend: number;
  buybacks: number;
  dividends: number;
}

export interface ValuationData {
  peRatio: number;
  peSectorAvg: number;
  psRatio: number;
  psSectorAvg: number;
  pegRatio?: number;
  evEbitda?: number;
  priceToBook?: number;
}

export interface InsiderData {
  totalSales: number;
  totalBuys: number;
  netActivity: "selling" | "buying" | "neutral";
  ceoSales?: number;
  ceoName?: string;
  transactions: InsiderTransaction[];
}

export interface InsiderTransaction {
  date: string;
  name: string;
  title: string;
  type: "sale" | "buy";
  shares: number;
  value: number;
}

export interface EventData {
  date: string;
  title: string;
  description: string;
  type: "product" | "corporate" | "financial" | "milestone";
  color?: string;
}

export interface CompetitiveData {
  marketShare?: number;
  marketShareLabel?: string;
  competitors: CompetitorData[];
  moat?: string;
}

export interface CompetitorData {
  name: string;
  ticker?: string;
  share?: number;
  metric?: string;
  color?: string;
}

export interface PersonalityData {
  type: string;
  emoji: string;
  description: string;
  traits: string[];
}

// API Response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// SEC EDGAR types
export interface SECCompanyFacts {
  cik: number;
  entityName: string;
  facts: {
    "us-gaap"?: Record<string, SECFact>;
    dei?: Record<string, SECFact>;
  };
}

export interface SECFact {
  label: string;
  description: string;
  units: Record<string, SECFactValue[]>;
}

export interface SECFactValue {
  start?: string;
  end: string;
  val: number;
  accn: string;
  fy: number;
  fp: string;
  form: string;
  filed: string;
}

// Polygon API types
export interface PolygonTickerDetails {
  ticker: string;
  name: string;
  market_cap: number;
  share_class_shares_outstanding: number;
  weighted_shares_outstanding: number;
}

export interface PolygonAggregate {
  ticker: string;
  results: PolygonBar[];
}

export interface PolygonBar {
  o: number; // open
  h: number; // high
  l: number; // low
  c: number; // close
  v: number; // volume
  t: number; // timestamp
}

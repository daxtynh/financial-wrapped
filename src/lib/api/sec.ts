// SEC EDGAR API service for financial data
// Docs: https://www.sec.gov/edgar/sec-api-documentation

const BASE_URL = "https://data.sec.gov";
const USER_AGENT = "FinancialWrapped contact@example.com"; // SEC requires user agent

// CIK to ticker mapping - from companies.ts
const CIK_MAP: Record<string, string> = {
  NVDA: "0001045810",
  AAPL: "0000320193",
  MSFT: "0000789019",
  GOOGL: "0001652044",
  META: "0001326801",
  AMZN: "0001018724",
  TSLA: "0001318605",
  AMD: "0000002488",
  INTC: "0000050863",
  CRM: "0001108524",
  ORCL: "0001341439",
  AVGO: "0001730168",
  CSCO: "0000858877",
  ADBE: "0000796343",
  IBM: "0000051143",
  JPM: "0000019617",
  V: "0001403161",
  MA: "0001141391",
  BAC: "0000070858",
  WFC: "0000072971",
  GS: "0000886982",
  BRK_B: "0001067983",
  "BRK-B": "0001067983",
  AXP: "0000004962",
  UNH: "0000731766",
  JNJ: "0000200406",
  LLY: "0000059478",
  PFE: "0000078003",
  ABBV: "0001551152",
  MRK: "0000310158",
  WMT: "0000104169",
  PG: "0000080424",
  KO: "0000021344",
  PEP: "0000077476",
  COST: "0000909832",
  MCD: "0000063908",
  NKE: "0000320187",
  SBUX: "0000829224",
  HD: "0000354950",
  LOW: "0000060667",
  XOM: "0000034088",
  CVX: "0000093410",
  CAT: "0000018230",
  BA: "0000012927",
  UPS: "0001090727",
  HON: "0000773840",
  GE: "0000040545",
  DIS: "0001744489",
  NFLX: "0001065280",
  CMCSA: "0001166691",
  T: "0000732717",
  VZ: "0000732712",
};

// Fiscal year end months for companies (1=Jan, 12=Dec)
const FISCAL_YEAR_END: Record<string, number> = {
  NVDA: 1, AAPL: 9, MSFT: 6, CRM: 1, ORCL: 5, AVGO: 10, CSCO: 7, ADBE: 11,
  V: 9, WMT: 1, PG: 6, COST: 8, NKE: 5, SBUX: 9, HD: 1, LOW: 1, DIS: 9,
  // Others default to December
};

interface SECCompanyFacts {
  cik: number;
  entityName: string;
  facts: {
    "us-gaap"?: Record<string, {
      label: string;
      description: string;
      units: Record<string, Array<{
        end: string;
        val: number;
        accn: string;
        fy: number;
        fp: string;
        form: string;
        filed: string;
      }>>;
    }>;
  };
}

// Get company facts (all financial data)
export async function getCompanyFacts(ticker: string): Promise<SECCompanyFacts | null> {
  const normalizedTicker = ticker.toUpperCase().replace("-", "_");
  const cik = CIK_MAP[normalizedTicker] || CIK_MAP[ticker.toUpperCase()];
  if (!cik) {
    console.warn(`No CIK mapping for ${ticker}`);
    return null;
  }

  const url = `${BASE_URL}/api/xbrl/companyfacts/CIK${cik}.json`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });

    if (!response.ok) {
      console.error(`SEC API error for ${ticker}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`SEC API fetch error for ${ticker}:`, error);
    return null;
  }
}

// Get the fiscal year to query based on calendar year
function getFiscalYear(ticker: string, calendarYear: number): number {
  const fyEnd = FISCAL_YEAR_END[ticker.toUpperCase()] || 12;
  // If FY ends before July, the FY number is calendarYear + 1
  // e.g., NVDA FY2025 ends Jan 2025, covers most of calendar 2024
  if (fyEnd <= 6) {
    return calendarYear + 1;
  }
  return calendarYear;
}

// Extract financial value for a specific year - picks the correct period
function getValueForYear(
  facts: SECCompanyFacts,
  concept: string,
  fiscalYear: number,
  form: string = "10-K"
): number | null {
  const conceptData = facts.facts["us-gaap"]?.[concept];
  if (!conceptData) return null;

  // Try different unit types
  const unitTypes = ["USD", "USD/shares", "pure", "shares"];
  for (const unitType of unitTypes) {
    const units = conceptData.units[unitType];
    if (!units) continue;

    // Find all matches for this FY and form
    const matches = units.filter(
      (u) => u.fy === fiscalYear && u.form === form && u.fp === "FY"
    );

    if (matches.length > 0) {
      // 10-K contains comparative data for multiple years
      // The actual fiscal year data has the latest end date
      // e.g., FY2025 10-K has entries with end dates 2023, 2024, 2025
      // We want the one ending in 2025 (the actual FY2025 data)
      matches.sort((a, b) => b.end.localeCompare(a.end));
      return matches[0].val;
    }
  }

  return null;
}

// Get the best available revenue value
function getRevenue(facts: SECCompanyFacts, fiscalYear: number): number | null {
  const concepts = [
    "Revenues",
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "SalesRevenueNet",
    "RevenueFromContractWithCustomerIncludingAssessedTax",
    "SalesRevenueGoodsNet",
    "SalesRevenueServicesNet",
  ];

  for (const concept of concepts) {
    const value = getValueForYear(facts, concept, fiscalYear);
    if (value && value > 0) return value;
  }

  return null;
}

// Get key financials for a company
export async function getFinancials(ticker: string, calendarYear: number) {
  const facts = await getCompanyFacts(ticker);
  if (!facts) {
    return null;
  }

  // Convert calendar year to fiscal year for this company
  const fiscalYear = getFiscalYear(ticker, calendarYear);
  console.log(`${ticker}: Calendar ${calendarYear} -> Fiscal ${fiscalYear}`);

  // Try current fiscal year, then previous if no data
  let revenue = getRevenue(facts, fiscalYear);
  let actualFY = fiscalYear;

  // If no data for this FY, try previous year
  if (!revenue) {
    revenue = getRevenue(facts, fiscalYear - 1);
    if (revenue) actualFY = fiscalYear - 1;
  }

  const grossProfit = getValueForYear(facts, "GrossProfit", actualFY);
  const operatingIncome =
    getValueForYear(facts, "OperatingIncomeLoss", actualFY) ||
    getValueForYear(facts, "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest", actualFY);
  const netIncome =
    getValueForYear(facts, "NetIncomeLoss", actualFY) ||
    getValueForYear(facts, "ProfitLoss", actualFY);
  const eps =
    getValueForYear(facts, "EarningsPerShareDiluted", actualFY) ||
    getValueForYear(facts, "EarningsPerShareBasic", actualFY);
  const assets = getValueForYear(facts, "Assets", actualFY);
  const liabilities = getValueForYear(facts, "Liabilities", actualFY);
  const equity =
    getValueForYear(facts, "StockholdersEquity", actualFY) ||
    getValueForYear(facts, "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest", actualFY);
  const cashFlow = getValueForYear(facts, "NetCashProvidedByUsedInOperatingActivities", actualFY);
  const capex =
    getValueForYear(facts, "PaymentsToAcquirePropertyPlantAndEquipment", actualFY) ||
    getValueForYear(facts, "PaymentsToAcquireProductiveAssets", actualFY);
  const rdExpense = getValueForYear(facts, "ResearchAndDevelopmentExpense", actualFY);

  // Calculate margins
  const grossMargin = revenue && grossProfit ? grossProfit / revenue : null;
  const operatingMargin = revenue && operatingIncome ? operatingIncome / revenue : null;
  const netMargin = revenue && netIncome ? netIncome / revenue : null;

  // Get previous year for growth calculations
  const prevRevenue = getRevenue(facts, actualFY - 1);
  const prevEps =
    getValueForYear(facts, "EarningsPerShareDiluted", actualFY - 1) ||
    getValueForYear(facts, "EarningsPerShareBasic", actualFY - 1);

  const revenueGrowth = revenue && prevRevenue ? (revenue - prevRevenue) / prevRevenue : null;
  const epsGrowth = eps && prevEps ? (eps - prevEps) / Math.abs(prevEps) : null;

  console.log(`${ticker} FY${actualFY}: Revenue=${revenue}, EPS=${eps}, NetIncome=${netIncome}`);

  return {
    revenue,
    revenueGrowth,
    grossProfit,
    grossMargin,
    operatingIncome,
    operatingMargin,
    netIncome,
    netMargin,
    eps,
    epsGrowth,
    assets,
    liabilities,
    equity,
    cashFlow,
    capex,
    freeCashFlow: cashFlow && capex ? cashFlow - capex : null,
    rdExpense,
    quarterlyRevenue: [],
    entityName: facts.entityName,
  };
}

// Export CIK map for reference
export function getCIKMap() {
  return { ...CIK_MAP };
}

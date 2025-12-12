// SEC EDGAR API service for financial data
// Docs: https://www.sec.gov/edgar/sec-api-documentation

const BASE_URL = "https://data.sec.gov";
const USER_AGENT = "FinancialWrapped contact@example.com"; // SEC requires user agent

// CIK to ticker mapping for common companies
const CIK_MAP: Record<string, string> = {
  AAPL: "0000320193",
  MSFT: "0000789019",
  GOOGL: "0001652044",
  AMZN: "0001018724",
  NVDA: "0001045810",
  META: "0001326801",
  TSLA: "0001318605",
  // Add more as needed, or fetch dynamically
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
  const cik = CIK_MAP[ticker.toUpperCase()];
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

// Extract financial value for a specific year
function getValueForYear(
  facts: SECCompanyFacts,
  concept: string,
  fiscalYear: number,
  form: string = "10-K"
): number | null {
  const conceptData = facts.facts["us-gaap"]?.[concept];
  if (!conceptData) return null;

  // Try USD first, then pure number
  const units = conceptData.units["USD"] || conceptData.units["pure"] || conceptData.units["shares"];
  if (!units) return null;

  // Find the value for the fiscal year from 10-K
  const match = units.find(
    (u) => u.fy === fiscalYear && u.form === form && u.fp === "FY"
  );

  return match?.val || null;
}

// Extract quarterly values
function getQuarterlyValues(
  facts: SECCompanyFacts,
  concept: string,
  fiscalYear: number
): Array<{ quarter: string; value: number }> {
  const conceptData = facts.facts["us-gaap"]?.[concept];
  if (!conceptData) return [];

  const units = conceptData.units["USD"] || conceptData.units["pure"];
  if (!units) return [];

  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const results: Array<{ quarter: string; value: number }> = [];

  for (const q of quarters) {
    const match = units.find(
      (u) => u.fy === fiscalYear && u.fp === q && u.form === "10-Q"
    );
    if (match) {
      results.push({ quarter: q, value: match.val });
    }
  }

  return results;
}

// Get key financials for a company
export async function getFinancials(ticker: string, fiscalYear: number) {
  const facts = await getCompanyFacts(ticker);
  if (!facts) {
    return null;
  }

  // Common GAAP concepts
  const revenue =
    getValueForYear(facts, "Revenues", fiscalYear) ||
    getValueForYear(facts, "RevenueFromContractWithCustomerExcludingAssessedTax", fiscalYear) ||
    getValueForYear(facts, "SalesRevenueNet", fiscalYear) ||
    getValueForYear(facts, "RevenueFromContractWithCustomerIncludingAssessedTax", fiscalYear);

  const grossProfit = getValueForYear(facts, "GrossProfit", fiscalYear);

  const operatingIncome =
    getValueForYear(facts, "OperatingIncomeLoss", fiscalYear) ||
    getValueForYear(facts, "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest", fiscalYear);

  const netIncome =
    getValueForYear(facts, "NetIncomeLoss", fiscalYear) ||
    getValueForYear(facts, "ProfitLoss", fiscalYear);

  const eps =
    getValueForYear(facts, "EarningsPerShareDiluted", fiscalYear) ||
    getValueForYear(facts, "EarningsPerShareBasic", fiscalYear);

  const assets = getValueForYear(facts, "Assets", fiscalYear);
  const liabilities = getValueForYear(facts, "Liabilities", fiscalYear);
  const equity = getValueForYear(facts, "StockholdersEquity", fiscalYear);

  const cashFlow = getValueForYear(facts, "NetCashProvidedByUsedInOperatingActivities", fiscalYear);
  const capex =
    getValueForYear(facts, "PaymentsToAcquirePropertyPlantAndEquipment", fiscalYear) ||
    getValueForYear(facts, "PaymentsToAcquireProductiveAssets", fiscalYear);

  const rdExpense = getValueForYear(facts, "ResearchAndDevelopmentExpense", fiscalYear);

  // Calculate margins
  const grossMargin = revenue && grossProfit ? grossProfit / revenue : null;
  const operatingMargin = revenue && operatingIncome ? operatingIncome / revenue : null;
  const netMargin = revenue && netIncome ? netIncome / revenue : null;

  // Get previous year for growth calculations
  const prevRevenue =
    getValueForYear(facts, "Revenues", fiscalYear - 1) ||
    getValueForYear(facts, "RevenueFromContractWithCustomerExcludingAssessedTax", fiscalYear - 1) ||
    getValueForYear(facts, "SalesRevenueNet", fiscalYear - 1);

  const prevEps =
    getValueForYear(facts, "EarningsPerShareDiluted", fiscalYear - 1) ||
    getValueForYear(facts, "EarningsPerShareBasic", fiscalYear - 1);

  const revenueGrowth = revenue && prevRevenue ? (revenue - prevRevenue) / prevRevenue : null;
  const epsGrowth = eps && prevEps ? (eps - prevEps) / Math.abs(prevEps) : null;

  // Quarterly revenue
  const quarterlyRevenue = getQuarterlyValues(
    facts,
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    fiscalYear
  );

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
    quarterlyRevenue,
    entityName: facts.entityName,
  };
}

// Get segment data (this is complex, simplified version)
export async function getSegments(ticker: string, fiscalYear: number) {
  const facts = await getCompanyFacts(ticker);
  if (!facts) {
    return null;
  }

  // Segment data uses different concepts - this is a simplified approach
  // Real segment data requires parsing 10-K XML/HTML
  const segmentRevenues: Array<{ name: string; revenue: number }> = [];

  // Check for segment-specific concepts
  const segmentConcepts = Object.keys(facts.facts["us-gaap"] || {}).filter(
    (key) => key.includes("Segment") || key.includes("Geographic")
  );

  // This is complex - for now return null and use fallback
  return null;
}

// Add CIK mapping dynamically
export function addCIKMapping(ticker: string, cik: string) {
  CIK_MAP[ticker.toUpperCase()] = cik.padStart(10, "0");
}

// Export CIK map for reference
export function getCIKMap() {
  return { ...CIK_MAP };
}

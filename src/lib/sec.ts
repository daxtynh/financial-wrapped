// SEC EDGAR API Service
// Free API - no key required
// Rate limit: 10 requests per second

import { SECCompanyFacts, SECFactValue } from "@/types/wrapped";

const SEC_BASE_URL = "https://data.sec.gov";
const USER_AGENT = "FinancialWrapped contact@example.com"; // SEC requires user agent

const headers: Record<string, string> = {
  "User-Agent": USER_AGENT,
  "Accept": "application/json",
};

// Fetch company facts (all financial metrics)
export async function getCompanyFacts(cik: string): Promise<SECCompanyFacts | null> {
  try {
    const url = `${SEC_BASE_URL}/api/xbrl/companyfacts/CIK${cik}.json`;
    const response = await fetch(url, { headers, next: { revalidate: 86400 } }); // Cache 24h

    if (!response.ok) {
      console.error(`SEC API error: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching SEC data:", error);
    return null;
  }
}

// Helper to get a specific metric value for a fiscal year
export function getAnnualValue(
  facts: SECCompanyFacts,
  metric: string,
  fiscalYear: number,
  form: string = "10-K"
): number | null {
  const usGaap = facts.facts["us-gaap"];
  if (!usGaap || !usGaap[metric]) return null;

  const units = usGaap[metric].units;

  // Try different unit types - EPS uses "USD/shares", others use "USD"
  const unitTypes = ["USD", "USD/shares", "pure", "shares"];

  for (const unitType of unitTypes) {
    const values = units[unitType];
    if (!values) continue;

    // Find all matches for this FY and form
    const matches = values.filter(
      (v) => v.fy === fiscalYear && v.form === form && v.fp === "FY"
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

// Get quarterly values for a metric
export function getQuarterlyValues(
  facts: SECCompanyFacts,
  metric: string,
  fiscalYear: number
): SECFactValue[] {
  const usGaap = facts.facts["us-gaap"];
  if (!usGaap || !usGaap[metric]) return [];

  const units = usGaap[metric].units;
  const unitType = Object.keys(units)[0];
  const values = units[unitType];

  return values
    .filter((v) => v.fy === fiscalYear && v.form === "10-Q")
    .sort((a, b) => a.fp.localeCompare(b.fp));
}

// Get key financial metrics for a company
export interface KeyFinancials {
  revenue: number | null;
  revenueGrowth: number | null;
  grossProfit: number | null;
  grossMargin: number | null;
  operatingIncome: number | null;
  operatingMargin: number | null;
  netIncome: number | null;
  netMargin: number | null;
  eps: number | null;
  epsGrowth: number | null;
  totalAssets: number | null;
  totalDebt: number | null;
  cash: number | null;
  operatingCashFlow: number | null;
  freeCashFlow: number | null;
  rdExpense: number | null;
}

// Try multiple revenue field names (companies use different XBRL tags)
function getRevenue(
  facts: SECCompanyFacts,
  fiscalYear: number
): number | null {
  const get = (metric: string) => getAnnualValue(facts, metric, fiscalYear);
  const revenueFields = [
    "Revenues",
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "SalesRevenueNet",
    "RevenueFromContractWithCustomerIncludingAssessedTax",
    "SalesRevenueGoodsNet",
    "SalesRevenueServicesNet",
  ];

  for (const field of revenueFields) {
    const value = get(field);
    if (value && value > 0) return value;
  }
  return null;
}

export function extractKeyFinancials(
  facts: SECCompanyFacts,
  fiscalYear: number
): KeyFinancials {
  const get = (metric: string) => getAnnualValue(facts, metric, fiscalYear);
  const getPrev = (metric: string) => getAnnualValue(facts, metric, fiscalYear - 1);

  const revenue = getRevenue(facts, fiscalYear);
  const prevRevenue = getRevenue(facts, fiscalYear - 1);
  const grossProfit = get("GrossProfit");
  const operatingIncome = get("OperatingIncomeLoss") ||
    get("IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest");
  const netIncome = get("NetIncomeLoss") || get("ProfitLoss");
  const eps = get("EarningsPerShareDiluted") || get("EarningsPerShareBasic");
  const prevEps = getPrev("EarningsPerShareDiluted") || getPrev("EarningsPerShareBasic");
  const totalAssets = get("Assets");
  const totalDebt = get("LongTermDebt") || get("LongTermDebtNoncurrent");
  const cash = get("CashAndCashEquivalentsAtCarryingValue");
  const operatingCashFlow = get("NetCashProvidedByUsedInOperatingActivities");
  const capex = get("PaymentsToAcquirePropertyPlantAndEquipment") ||
    get("PaymentsToAcquireProductiveAssets");
  const rdExpense = get("ResearchAndDevelopmentExpense");

  return {
    revenue,
    revenueGrowth: revenue && prevRevenue ? (revenue - prevRevenue) / prevRevenue : null,
    grossProfit,
    grossMargin: revenue && grossProfit ? grossProfit / revenue : null,
    operatingIncome,
    operatingMargin: revenue && operatingIncome ? operatingIncome / revenue : null,
    netIncome,
    netMargin: revenue && netIncome ? netIncome / revenue : null,
    eps,
    epsGrowth: eps && prevEps ? (eps - prevEps) / Math.abs(prevEps) : null,
    totalAssets,
    totalDebt,
    cash,
    operatingCashFlow,
    freeCashFlow: operatingCashFlow && capex ? operatingCashFlow - capex : null,
    rdExpense,
  };
}

// Get segment revenue (if reported)
export function extractSegmentRevenue(
  facts: SECCompanyFacts,
  fiscalYear: number
): Array<{ name: string; revenue: number }> {
  // SEC segment data is complex and varies by company
  // This is a simplified approach - would need company-specific logic
  const segments: Array<{ name: string; revenue: number }> = [];

  // Try common segment metrics
  const usGaap = facts.facts["us-gaap"];
  if (!usGaap) return segments;

  // Look for segment-related metrics
  const segmentMetrics = Object.keys(usGaap).filter(
    (key) =>
      key.toLowerCase().includes("segment") ||
      key.toLowerCase().includes("revenuefrombusinesssegment")
  );

  // This would need more sophisticated parsing for real implementation
  return segments;
}

// Calculate year-over-year growth
export function calculateYoYGrowth(
  facts: SECCompanyFacts,
  metric: string,
  fiscalYear: number
): number | null {
  const current = getAnnualValue(facts, metric, fiscalYear);
  const previous = getAnnualValue(facts, metric, fiscalYear - 1);

  if (current === null || previous === null || previous === 0) return null;
  return (current - previous) / Math.abs(previous);
}

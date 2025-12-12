// Database connection and queries using Neon Postgres
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Initialize database tables
export async function initDatabase() {
  // Companies table - static reference data
  await sql`
    CREATE TABLE IF NOT EXISTS companies (
      ticker VARCHAR(10) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      cik VARCHAR(10),
      sector VARCHAR(100),
      fiscal_year_end INT,
      theme JSONB,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Wrapped data cache - dynamic, computed data
  await sql`
    CREATE TABLE IF NOT EXISTS wrapped_cache (
      id SERIAL PRIMARY KEY,
      ticker VARCHAR(10) NOT NULL,
      year INT NOT NULL,
      period VARCHAR(10) NOT NULL DEFAULT 'FY',
      data JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      expires_at TIMESTAMP NOT NULL,
      UNIQUE(ticker, year, period)
    )
  `;

  // API response cache - raw API responses for recomputation
  await sql`
    CREATE TABLE IF NOT EXISTS api_cache (
      id SERIAL PRIMARY KEY,
      source VARCHAR(50) NOT NULL,
      ticker VARCHAR(10) NOT NULL,
      endpoint VARCHAR(255) NOT NULL,
      params JSONB,
      response JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      expires_at TIMESTAMP NOT NULL,
      UNIQUE(source, ticker, endpoint)
    )
  `;

  console.log("Database tables initialized");
}

// Get company by ticker
export async function getCompany(ticker: string) {
  const result = await sql`
    SELECT * FROM companies WHERE ticker = ${ticker.toUpperCase()}
  `;
  return result[0] || null;
}

// Upsert company
export async function upsertCompany(company: {
  ticker: string;
  name: string;
  cik?: string;
  sector?: string;
  fiscalYearEnd?: number;
  theme?: object;
}) {
  await sql`
    INSERT INTO companies (ticker, name, cik, sector, fiscal_year_end, theme, updated_at)
    VALUES (
      ${company.ticker.toUpperCase()},
      ${company.name},
      ${company.cik || null},
      ${company.sector || null},
      ${company.fiscalYearEnd || null},
      ${JSON.stringify(company.theme || {})}::jsonb,
      NOW()
    )
    ON CONFLICT (ticker) DO UPDATE SET
      name = EXCLUDED.name,
      cik = COALESCE(EXCLUDED.cik, companies.cik),
      sector = COALESCE(EXCLUDED.sector, companies.sector),
      fiscal_year_end = COALESCE(EXCLUDED.fiscal_year_end, companies.fiscal_year_end),
      theme = COALESCE(EXCLUDED.theme, companies.theme),
      updated_at = NOW()
  `;
}

// Get cached wrapped data
export async function getCachedWrapped(ticker: string, year: number, period: string = "FY") {
  const result = await sql`
    SELECT data FROM wrapped_cache
    WHERE ticker = ${ticker.toUpperCase()}
      AND year = ${year}
      AND period = ${period}
      AND expires_at > NOW()
  `;
  return result[0]?.data || null;
}

// Cache wrapped data (24 hour TTL by default)
export async function cacheWrapped(
  ticker: string,
  year: number,
  period: string,
  data: object,
  ttlHours: number = 24
) {
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  await sql`
    INSERT INTO wrapped_cache (ticker, year, period, data, expires_at)
    VALUES (
      ${ticker.toUpperCase()},
      ${year},
      ${period},
      ${JSON.stringify(data)}::jsonb,
      ${expiresAt.toISOString()}
    )
    ON CONFLICT (ticker, year, period) DO UPDATE SET
      data = EXCLUDED.data,
      expires_at = EXCLUDED.expires_at,
      created_at = NOW()
  `;
}

// Get cached API response
export async function getCachedApiResponse(source: string, ticker: string, endpoint: string) {
  const result = await sql`
    SELECT response FROM api_cache
    WHERE source = ${source}
      AND ticker = ${ticker.toUpperCase()}
      AND endpoint = ${endpoint}
      AND expires_at > NOW()
  `;
  return result[0]?.response || null;
}

// Cache API response (1 hour for stock data, 24 hours for financials)
export async function cacheApiResponse(
  source: string,
  ticker: string,
  endpoint: string,
  response: object,
  ttlHours: number = 1
) {
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  await sql`
    INSERT INTO api_cache (source, ticker, endpoint, response, expires_at)
    VALUES (
      ${source},
      ${ticker.toUpperCase()},
      ${endpoint},
      ${JSON.stringify(response)}::jsonb,
      ${expiresAt.toISOString()}
    )
    ON CONFLICT (source, ticker, endpoint) DO UPDATE SET
      response = EXCLUDED.response,
      expires_at = EXCLUDED.expires_at,
      created_at = NOW()
  `;
}

// Get all companies
export async function getAllCompanies() {
  const result = await sql`SELECT * FROM companies ORDER BY ticker`;
  return result;
}

// Clear expired cache entries
export async function clearExpiredCache() {
  await sql`DELETE FROM wrapped_cache WHERE expires_at < NOW()`;
  await sql`DELETE FROM api_cache WHERE expires_at < NOW()`;
}

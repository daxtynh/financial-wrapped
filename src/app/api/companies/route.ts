// API Route: /api/companies
// Returns list of available companies

import { NextResponse } from "next/server";
import { companies, getAllTickers } from "@/data/companies";

export async function GET() {
  const companyList = getAllTickers().map((ticker) => ({
    ticker: companies[ticker].ticker,
    name: companies[ticker].name,
    sector: companies[ticker].sector,
    theme: companies[ticker].theme,
  }));

  return NextResponse.json({
    success: true,
    count: companyList.length,
    data: companyList,
  });
}

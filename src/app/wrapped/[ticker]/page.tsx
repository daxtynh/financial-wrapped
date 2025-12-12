// Wrapped Page: /wrapped/[ticker]
// Dynamic financial wrapped visualization

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompany } from "@/data/companies";
import { buildWrappedData, getCuratedData } from "@/lib/wrapped-service";
import WrappedClient from "./WrappedClient";

interface Props {
  params: Promise<{ ticker: string }>;
  searchParams: Promise<{ year?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ticker } = await params;
  const company = getCompany(ticker.toUpperCase());

  if (!company) {
    return { title: "Not Found" };
  }

  return {
    title: `${company.name} Financial Wrapped 2024`,
    description: `${company.name}'s year in review - stock performance, financials, and key insights`,
    openGraph: {
      title: `${company.name} Financial Wrapped 2024`,
      description: `See ${company.ticker}'s financial highlights for 2024`,
    },
  };
}

export default async function WrappedPage({ params, searchParams }: Props) {
  const { ticker } = await params;
  const { year: yearParam } = await searchParams;
  const upperTicker = ticker.toUpperCase();
  const year = parseInt(yearParam || "2024", 10);

  const company = getCompany(upperTicker);
  if (!company) {
    notFound();
  }

  // Build wrapped data server-side (from SEC EDGAR + Polygon APIs with caching)
  const wrapped = await buildWrappedData(upperTicker, year);

  if (!wrapped) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Data Unavailable</h1>
          <p className="text-gray-400">
            Unable to load financial data for {company.name}
          </p>
        </div>
      </div>
    );
  }

  // Get curated data for buzzwords and achievements
  const curated = getCuratedData(upperTicker, year);

  // Extract buzzwords from curated data
  const buzzwords = curated?.buzzwords?.map((word, i) => ({
    word,
    count: 100 - i * 10,
    size: i < 2 ? "large" : i < 4 ? "medium" : "small",
  }));

  // Extract achievements from curated insights
  const achievements = curated?.insights?.map((insight, i) => ({
    icon: ["trophy", "chart-line", "star", "rocket"][i % 4],
    title: `Highlight ${i + 1}`,
    desc: insight,
  }));

  // Build CEO quote from personality and summary
  const ceoQuote = {
    quote: wrapped.aiSummary || `${company.name} had a notable year in ${year}.`,
    name: wrapped.insiders?.ceoName || "CEO",
    title: `CEO of ${company.name}`,
  };

  return (
    <WrappedClient
      data={wrapped}
      buzzwords={buzzwords}
      ceoQuote={ceoQuote}
      achievements={achievements}
    />
  );
}

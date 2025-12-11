// Wrapped Page: /wrapped/[ticker]
// Dynamic financial wrapped visualization

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompany } from "@/data/companies";
import { buildWrappedData } from "@/lib/wrapped-builder";
import WrappedClient from "./WrappedClient";
import { WrappedData } from "@/types/wrapped";

// Import enriched data for companies that have it
import {
  nvidiaData,
  nvidiaBuzzwords,
  nvidiaCeoQuote,
  nvidiaAchievements,
  nvidiaCustomers,
} from "@/data/enriched/nvda";
import {
  appleData,
  appleBuzzwords,
  appleCeoQuote,
  appleAchievements,
  appleCustomers,
} from "@/data/enriched/aapl";
import {
  microsoftData,
  microsoftBuzzwords,
  microsoftCeoQuote,
  microsoftAchievements,
  microsoftCustomers,
} from "@/data/enriched/msft";
import {
  teslaData,
  teslaBuzzwords,
  teslaCeoQuote,
  teslaAchievements,
  teslaCustomers,
} from "@/data/enriched/tsla";

// Type definitions for enriched data
type Buzzword = { word: string; count: number; size: string };
type CEOQuote = { quote: string; name: string; title: string };
type Achievement = { icon: string; title: string; desc: string };
type CustomerInfo = { top4Percentage: number; top4Label: string; risk: string };

interface EnrichedData {
  data: Partial<WrappedData>;
  buzzwords: Buzzword[];
  ceoQuote: CEOQuote;
  achievements: Achievement[];
  customers: CustomerInfo;
}

// Map of tickers to their enriched data
const enrichedDataMap: Record<string, EnrichedData> = {
  NVDA: {
    data: nvidiaData,
    buzzwords: nvidiaBuzzwords,
    ceoQuote: nvidiaCeoQuote,
    achievements: nvidiaAchievements,
    customers: nvidiaCustomers,
  },
  AAPL: {
    data: appleData,
    buzzwords: appleBuzzwords,
    ceoQuote: appleCeoQuote,
    achievements: appleAchievements,
    customers: appleCustomers,
  },
  MSFT: {
    data: microsoftData,
    buzzwords: microsoftBuzzwords,
    ceoQuote: microsoftCeoQuote,
    achievements: microsoftAchievements,
    customers: microsoftCustomers,
  },
  TSLA: {
    data: teslaData,
    buzzwords: teslaBuzzwords,
    ceoQuote: teslaCeoQuote,
    achievements: teslaAchievements,
    customers: teslaCustomers,
  },
};

function getEnrichedData(ticker: string): EnrichedData | null {
  return enrichedDataMap[ticker] || null;
}

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

  // Build wrapped data server-side
  const apiData = await buildWrappedData(upperTicker, year);
  const enriched = getEnrichedData(upperTicker);

  // Merge API data with enriched data (enriched takes priority for overlapping fields)
  let wrapped: WrappedData;

  if (enriched) {
    // If we have enriched data, merge it with API data
    wrapped = {
      ...apiData,
      ...enriched.data,
      meta: {
        ...apiData?.meta,
        ...enriched.data.meta,
      },
      stock: {
        ...apiData?.stock,
        ...enriched.data.stock,
      },
      financials: {
        ...apiData?.financials,
        ...enriched.data.financials,
      },
    } as WrappedData;
  } else if (apiData) {
    wrapped = apiData;
  } else {
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

  return (
    <WrappedClient
      data={wrapped}
      buzzwords={enriched?.buzzwords}
      ceoQuote={enriched?.ceoQuote}
      achievements={enriched?.achievements}
      customers={enriched?.customers}
    />
  );
}

// Wrapped Page: /wrapped/[ticker]
// Dynamic financial wrapped visualization

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompany } from "@/data/companies";
import { buildWrappedData } from "@/lib/wrapped-builder";
import WrappedClient from "./WrappedClient";
import { WrappedData } from "@/types/wrapped";

// Import enriched data for all companies
import { appleData, appleBuzzwords, appleCeoQuote, appleAchievements, appleCustomers } from "@/data/enriched/aapl";
import { abbvData, abbvBuzzwords, abbvCeoQuote, abbvAchievements, abbvCustomers } from "@/data/enriched/abbv";
import { adbeData, adbeBuzzwords, adbeCeoQuote, adbeAchievements, adbeCustomers } from "@/data/enriched/adbe";
import { amdData, amdBuzzwords, amdCeoQuote, amdAchievements, amdCustomers } from "@/data/enriched/amd";
import { amznData, amznBuzzwords, amznCeoQuote, amznAchievements, amznCustomers } from "@/data/enriched/amzn";
import { avgoData, avgoBuzzwords, avgoCeoQuote, avgoAchievements, avgoCustomers } from "@/data/enriched/avgo";
import { axpData, axpBuzzwords, axpCeoQuote, axpAchievements, axpCustomers } from "@/data/enriched/axp";
import { baData, baBuzzwords, baCeoQuote, baAchievements, baCustomers } from "@/data/enriched/ba";
import { bacData, bacBuzzwords, bacCeoQuote, bacAchievements, bacCustomers } from "@/data/enriched/bac";
import { brkbData, brkbBuzzwords, brkbCeoQuote, brkbAchievements, brkbCustomers } from "@/data/enriched/brkb";
import { catData, catBuzzwords, catCeoQuote, catAchievements, catCustomers } from "@/data/enriched/cat";
import { cmcsaData, cmcsaBuzzwords, cmcsaCeoQuote, cmcsaAchievements, cmcsaCustomers } from "@/data/enriched/cmcsa";
import { costData, costBuzzwords, costCeoQuote, costAchievements, costCustomers } from "@/data/enriched/cost";
import { crmData, crmBuzzwords, crmCeoQuote, crmAchievements, crmCustomers } from "@/data/enriched/crm";
import { cscoData, cscoBuzzwords, cscoCeoQuote, cscoAchievements, cscoCustomers } from "@/data/enriched/csco";
import { cvxData, cvxBuzzwords, cvxCeoQuote, cvxAchievements, cvxCustomers } from "@/data/enriched/cvx";
import { disData, disBuzzwords, disCeoQuote, disAchievements, disCustomers } from "@/data/enriched/dis";
import { geData, geBuzzwords, geCeoQuote, geAchievements, geCustomers } from "@/data/enriched/ge";
import { googlData, googlBuzzwords, googlCeoQuote, googlAchievements, googlCustomers } from "@/data/enriched/googl";
import { gsData, gsBuzzwords, gsCeoQuote, gsAchievements, gsCustomers } from "@/data/enriched/gs";
import { hdData, hdBuzzwords, hdCeoQuote, hdAchievements, hdCustomers } from "@/data/enriched/hd";
import { honData, honBuzzwords, honCeoQuote, honAchievements, honCustomers } from "@/data/enriched/hon";
import { ibmData, ibmBuzzwords, ibmCeoQuote, ibmAchievements, ibmCustomers } from "@/data/enriched/ibm";
import { intcData, intcBuzzwords, intcCeoQuote, intcAchievements, intcCustomers } from "@/data/enriched/intc";
import { jnjData, jnjBuzzwords, jnjCeoQuote, jnjAchievements, jnjCustomers } from "@/data/enriched/jnj";
import { jpmData, jpmBuzzwords, jpmCeoQuote, jpmAchievements, jpmCustomers } from "@/data/enriched/jpm";
import { koData, koBuzzwords, koCeoQuote, koAchievements, koCustomers } from "@/data/enriched/ko";
import { llyData, llyBuzzwords, llyCeoQuote, llyAchievements, llyCustomers } from "@/data/enriched/lly";
import { lowData, lowBuzzwords, lowCeoQuote, lowAchievements, lowCustomers } from "@/data/enriched/low";
import { maData, maBuzzwords, maCeoQuote, maAchievements, maCustomers } from "@/data/enriched/ma";
import { mcdData, mcdBuzzwords, mcdCeoQuote, mcdAchievements, mcdCustomers } from "@/data/enriched/mcd";
import { metaData, metaBuzzwords, metaCeoQuote, metaAchievements, metaCustomers } from "@/data/enriched/meta";
import { mrkData, mrkBuzzwords, mrkCeoQuote, mrkAchievements, mrkCustomers } from "@/data/enriched/mrk";
import { microsoftData, microsoftBuzzwords, microsoftCeoQuote, microsoftAchievements, microsoftCustomers } from "@/data/enriched/msft";
import { nflxData, nflxBuzzwords, nflxCeoQuote, nflxAchievements, nflxCustomers } from "@/data/enriched/nflx";
import { nkeData, nkeBuzzwords, nkeCeoQuote, nkeAchievements, nkeCustomers } from "@/data/enriched/nke";
import { nvidiaData, nvidiaBuzzwords, nvidiaCeoQuote, nvidiaAchievements, nvidiaCustomers } from "@/data/enriched/nvda";
import { orclData, orclBuzzwords, orclCeoQuote, orclAchievements, orclCustomers } from "@/data/enriched/orcl";
import { pepData, pepBuzzwords, pepCeoQuote, pepAchievements, pepCustomers } from "@/data/enriched/pep";
import { pfeData, pfeBuzzwords, pfeCeoQuote, pfeAchievements, pfeCustomers } from "@/data/enriched/pfe";
import { pgData, pgBuzzwords, pgCeoQuote, pgAchievements, pgCustomers } from "@/data/enriched/pg";
import { sbuxData, sbuxBuzzwords, sbuxCeoQuote, sbuxAchievements, sbuxCustomers } from "@/data/enriched/sbux";
import { tData, tBuzzwords, tCeoQuote, tAchievements, tCustomers } from "@/data/enriched/t";
import { teslaData, teslaBuzzwords, teslaCeoQuote, teslaAchievements, teslaCustomers } from "@/data/enriched/tsla";
import { unhData, unhBuzzwords, unhCeoQuote, unhAchievements, unhCustomers } from "@/data/enriched/unh";
import { upsData, upsBuzzwords, upsCeoQuote, upsAchievements, upsCustomers } from "@/data/enriched/ups";
import { vData, vBuzzwords, vCeoQuote, vAchievements, vCustomers } from "@/data/enriched/v";
import { vzData, vzBuzzwords, vzCeoQuote, vzAchievements, vzCustomers } from "@/data/enriched/vz";
import { wfcData, wfcBuzzwords, wfcCeoQuote, wfcAchievements, wfcCustomers } from "@/data/enriched/wfc";
import { wmtData, wmtBuzzwords, wmtCeoQuote, wmtAchievements, wmtCustomers } from "@/data/enriched/wmt";
import { xomData, xomBuzzwords, xomCeoQuote, xomAchievements, xomCustomers } from "@/data/enriched/xom";

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
  "AAPL": { data: appleData, buzzwords: appleBuzzwords, ceoQuote: appleCeoQuote, achievements: appleAchievements, customers: appleCustomers },
  "ABBV": { data: abbvData, buzzwords: abbvBuzzwords, ceoQuote: abbvCeoQuote, achievements: abbvAchievements, customers: abbvCustomers },
  "ADBE": { data: adbeData, buzzwords: adbeBuzzwords, ceoQuote: adbeCeoQuote, achievements: adbeAchievements, customers: adbeCustomers },
  "AMD": { data: amdData, buzzwords: amdBuzzwords, ceoQuote: amdCeoQuote, achievements: amdAchievements, customers: amdCustomers },
  "AMZN": { data: amznData, buzzwords: amznBuzzwords, ceoQuote: amznCeoQuote, achievements: amznAchievements, customers: amznCustomers },
  "AVGO": { data: avgoData, buzzwords: avgoBuzzwords, ceoQuote: avgoCeoQuote, achievements: avgoAchievements, customers: avgoCustomers },
  "AXP": { data: axpData, buzzwords: axpBuzzwords, ceoQuote: axpCeoQuote, achievements: axpAchievements, customers: axpCustomers },
  "BA": { data: baData, buzzwords: baBuzzwords, ceoQuote: baCeoQuote, achievements: baAchievements, customers: baCustomers },
  "BAC": { data: bacData, buzzwords: bacBuzzwords, ceoQuote: bacCeoQuote, achievements: bacAchievements, customers: bacCustomers },
  "BRK-B": { data: brkbData, buzzwords: brkbBuzzwords, ceoQuote: brkbCeoQuote, achievements: brkbAchievements, customers: brkbCustomers },
  "CAT": { data: catData, buzzwords: catBuzzwords, ceoQuote: catCeoQuote, achievements: catAchievements, customers: catCustomers },
  "CMCSA": { data: cmcsaData, buzzwords: cmcsaBuzzwords, ceoQuote: cmcsaCeoQuote, achievements: cmcsaAchievements, customers: cmcsaCustomers },
  "COST": { data: costData, buzzwords: costBuzzwords, ceoQuote: costCeoQuote, achievements: costAchievements, customers: costCustomers },
  "CRM": { data: crmData, buzzwords: crmBuzzwords, ceoQuote: crmCeoQuote, achievements: crmAchievements, customers: crmCustomers },
  "CSCO": { data: cscoData, buzzwords: cscoBuzzwords, ceoQuote: cscoCeoQuote, achievements: cscoAchievements, customers: cscoCustomers },
  "CVX": { data: cvxData, buzzwords: cvxBuzzwords, ceoQuote: cvxCeoQuote, achievements: cvxAchievements, customers: cvxCustomers },
  "DIS": { data: disData, buzzwords: disBuzzwords, ceoQuote: disCeoQuote, achievements: disAchievements, customers: disCustomers },
  "GE": { data: geData, buzzwords: geBuzzwords, ceoQuote: geCeoQuote, achievements: geAchievements, customers: geCustomers },
  "GOOGL": { data: googlData, buzzwords: googlBuzzwords, ceoQuote: googlCeoQuote, achievements: googlAchievements, customers: googlCustomers },
  "GS": { data: gsData, buzzwords: gsBuzzwords, ceoQuote: gsCeoQuote, achievements: gsAchievements, customers: gsCustomers },
  "HD": { data: hdData, buzzwords: hdBuzzwords, ceoQuote: hdCeoQuote, achievements: hdAchievements, customers: hdCustomers },
  "HON": { data: honData, buzzwords: honBuzzwords, ceoQuote: honCeoQuote, achievements: honAchievements, customers: honCustomers },
  "IBM": { data: ibmData, buzzwords: ibmBuzzwords, ceoQuote: ibmCeoQuote, achievements: ibmAchievements, customers: ibmCustomers },
  "INTC": { data: intcData, buzzwords: intcBuzzwords, ceoQuote: intcCeoQuote, achievements: intcAchievements, customers: intcCustomers },
  "JNJ": { data: jnjData, buzzwords: jnjBuzzwords, ceoQuote: jnjCeoQuote, achievements: jnjAchievements, customers: jnjCustomers },
  "JPM": { data: jpmData, buzzwords: jpmBuzzwords, ceoQuote: jpmCeoQuote, achievements: jpmAchievements, customers: jpmCustomers },
  "KO": { data: koData, buzzwords: koBuzzwords, ceoQuote: koCeoQuote, achievements: koAchievements, customers: koCustomers },
  "LLY": { data: llyData, buzzwords: llyBuzzwords, ceoQuote: llyCeoQuote, achievements: llyAchievements, customers: llyCustomers },
  "LOW": { data: lowData, buzzwords: lowBuzzwords, ceoQuote: lowCeoQuote, achievements: lowAchievements, customers: lowCustomers },
  "MA": { data: maData, buzzwords: maBuzzwords, ceoQuote: maCeoQuote, achievements: maAchievements, customers: maCustomers },
  "MCD": { data: mcdData, buzzwords: mcdBuzzwords, ceoQuote: mcdCeoQuote, achievements: mcdAchievements, customers: mcdCustomers },
  "META": { data: metaData, buzzwords: metaBuzzwords, ceoQuote: metaCeoQuote, achievements: metaAchievements, customers: metaCustomers },
  "MRK": { data: mrkData, buzzwords: mrkBuzzwords, ceoQuote: mrkCeoQuote, achievements: mrkAchievements, customers: mrkCustomers },
  "MSFT": { data: microsoftData, buzzwords: microsoftBuzzwords, ceoQuote: microsoftCeoQuote, achievements: microsoftAchievements, customers: microsoftCustomers },
  "NFLX": { data: nflxData, buzzwords: nflxBuzzwords, ceoQuote: nflxCeoQuote, achievements: nflxAchievements, customers: nflxCustomers },
  "NKE": { data: nkeData, buzzwords: nkeBuzzwords, ceoQuote: nkeCeoQuote, achievements: nkeAchievements, customers: nkeCustomers },
  "NVDA": { data: nvidiaData, buzzwords: nvidiaBuzzwords, ceoQuote: nvidiaCeoQuote, achievements: nvidiaAchievements, customers: nvidiaCustomers },
  "ORCL": { data: orclData, buzzwords: orclBuzzwords, ceoQuote: orclCeoQuote, achievements: orclAchievements, customers: orclCustomers },
  "PEP": { data: pepData, buzzwords: pepBuzzwords, ceoQuote: pepCeoQuote, achievements: pepAchievements, customers: pepCustomers },
  "PFE": { data: pfeData, buzzwords: pfeBuzzwords, ceoQuote: pfeCeoQuote, achievements: pfeAchievements, customers: pfeCustomers },
  "PG": { data: pgData, buzzwords: pgBuzzwords, ceoQuote: pgCeoQuote, achievements: pgAchievements, customers: pgCustomers },
  "SBUX": { data: sbuxData, buzzwords: sbuxBuzzwords, ceoQuote: sbuxCeoQuote, achievements: sbuxAchievements, customers: sbuxCustomers },
  "T": { data: tData, buzzwords: tBuzzwords, ceoQuote: tCeoQuote, achievements: tAchievements, customers: tCustomers },
  "TSLA": { data: teslaData, buzzwords: teslaBuzzwords, ceoQuote: teslaCeoQuote, achievements: teslaAchievements, customers: teslaCustomers },
  "UNH": { data: unhData, buzzwords: unhBuzzwords, ceoQuote: unhCeoQuote, achievements: unhAchievements, customers: unhCustomers },
  "UPS": { data: upsData, buzzwords: upsBuzzwords, ceoQuote: upsCeoQuote, achievements: upsAchievements, customers: upsCustomers },
  "V": { data: vData, buzzwords: vBuzzwords, ceoQuote: vCeoQuote, achievements: vAchievements, customers: vCustomers },
  "VZ": { data: vzData, buzzwords: vzBuzzwords, ceoQuote: vzCeoQuote, achievements: vzAchievements, customers: vzCustomers },
  "WFC": { data: wfcData, buzzwords: wfcBuzzwords, ceoQuote: wfcCeoQuote, achievements: wfcAchievements, customers: wfcCustomers },
  "WMT": { data: wmtData, buzzwords: wmtBuzzwords, ceoQuote: wmtCeoQuote, achievements: wmtAchievements, customers: wmtCustomers },
  "XOM": { data: xomData, buzzwords: xomBuzzwords, ceoQuote: xomCeoQuote, achievements: xomAchievements, customers: xomCustomers },
};

function getEnrichedData(ticker: string): EnrichedData | null {
  // Handle BRK-B special case
  const normalizedTicker = ticker.replace("_", "-");
  return enrichedDataMap[normalizedTicker] || null;
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

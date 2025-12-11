import Link from "next/link";
import { companies, getAllTickers } from "@/data/companies";

export default function Home() {
  const tickers = getAllTickers();
  const sectors = [...new Set(Object.values(companies).map((c) => c.sector))];

  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(ellipse at 20% 0%, rgba(118,185,0,0.06) 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 100%, rgba(0,212,255,0.04) 0%, transparent 50%),
                     #030303`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Financial <span className="text-green-500">Wrapped</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Your favorite companies&apos; year in review. Real data from SEC filings,
            visualized like Spotify Wrapped.
          </p>
        </div>

        {/* Featured */}
        <div className="mb-12">
          <h2 className="text-white/40 text-sm font-semibold tracking-wider uppercase mb-4">
            Featured Companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {["NVDA", "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "JPM", "V", "WMT", "JNJ", "DIS"].map(
              (ticker) => {
                const company = companies[ticker];
                if (!company) return null;
                return (
                  <Link
                    key={ticker}
                    href={`/wrapped/${ticker}`}
                    className="group relative overflow-hidden rounded-xl p-4 transition-all hover:scale-105"
                    style={{
                      backgroundColor: `${company.theme.primary}10`,
                      border: `1px solid ${company.theme.primary}20`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-1 transition-colors"
                      style={{ color: company.theme.primary }}
                    >
                      {ticker}
                    </div>
                    <div className="text-white/50 text-xs truncate">
                      {company.name.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>

        {/* By Sector */}
        {sectors.map((sector) => {
          const sectorCompanies = tickers
            .filter((t) => companies[t].sector === sector)
            .slice(0, 8);
          if (sectorCompanies.length === 0) return null;

          return (
            <div key={sector} className="mb-10">
              <h2 className="text-white/40 text-sm font-semibold tracking-wider uppercase mb-4">
                {sector}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {sectorCompanies.map((ticker) => {
                  const company = companies[ticker];
                  return (
                    <Link
                      key={ticker}
                      href={`/wrapped/${ticker}`}
                      className="group rounded-lg p-3 transition-all hover:bg-white/5"
                      style={{ border: `1px solid ${company.theme.primary}15` }}
                    >
                      <div
                        className="font-bold text-sm"
                        style={{ color: company.theme.primary }}
                      >
                        {company.ticker}
                      </div>
                      <div className="text-white/40 text-[0.65rem] truncate">
                        {company.name.split(" ")[0]}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-white/30 text-sm">
            Data from SEC EDGAR and Polygon.io. Not financial advice.
          </p>
          <p className="text-white/20 text-xs mt-2">
            Built with Next.js • {tickers.length} companies available
          </p>
        </footer>
      </div>
    </div>
  );
}

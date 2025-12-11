"use client";

import { useState, useEffect, useCallback } from "react";
import { WrappedData } from "@/types/wrapped";
import { formatNumber, formatPercent, formatCurrency } from "@/lib/wrapped-builder";

interface Props {
  data: WrappedData;
  buzzwords?: Array<{ word: string; count: number; size: string }>;
  ceoQuote?: { quote: string; name: string; title: string };
  achievements?: Array<{ icon: string; title: string; desc: string }>;
  customers?: { top4Percentage: number; top4Label: string; risk: string };
}

export default function WrappedClient({ data, buzzwords, ceoQuote, achievements, customers }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { meta, stock, financials, segments, geographic, quarterly, cashFlow, valuation, insiders, events, competitive, personality, aiSummary } = data;
  const theme = meta.theme;

  // Calculate total slides based on available data
  const slides: string[] = [
    "intro",
    "stock",
    "revenue",
  ];
  if (segments && segments.length > 0) slides.push("segments");
  if (quarterly && quarterly.length > 0) slides.push("quarterly");
  slides.push("margins");
  slides.push("cashflow");
  slides.push("efficiency");
  slides.push("valuation");
  if (insiders && insiders.totalSales > 0) slides.push("insiders");
  if (customers) slides.push("customers");
  if (geographic && geographic.length > 0) slides.push("geographic");
  if (competitive && competitive.competitors && competitive.competitors.length > 0) slides.push("competitive");
  if (events && events.length > 0) slides.push("events");
  if (buzzwords && buzzwords.length > 0) slides.push("buzzwords");
  if (ceoQuote) slides.push("ceo");
  if (achievements && achievements.length > 0) slides.push("achievements");
  slides.push("personality");
  slides.push("summary");
  slides.push("end");

  const totalSlides = slides.length;

  const next = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Touch navigation
  useEffect(() => {
    let startX = 0, startY = 0;
    const handleTouchStart = (e: TouchEvent) => { startX = e.changedTouches[0].screenX; startY = e.changedTouches[0].screenY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].screenX;
      const dy = startY - e.changedTouches[0].screenY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) dx > 0 ? next() : prev();
      else if (Math.abs(dy) > 50) dy > 0 ? next() : prev();
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", handleTouchStart); window.removeEventListener("touchend", handleTouchEnd); };
  }, [next, prev]);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a, .nav-dot")) return;
    e.clientX > window.innerWidth * 0.25 ? next() : prev();
  };

  const getSlideIndex = (name: string) => slides.indexOf(name);

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: `radial-gradient(ellipse at 20% 0%, ${theme.primary}10 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 100%, ${theme.secondary}08 0%, transparent 50%),
                     #030303`,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
      onClick={handleClick}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-300" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%`, backgroundColor: theme.primary }} />

      <div className="relative h-screen">
        {/* INTRO */}
        <Slide active={currentSlide === getSlideIndex("intro")}>
          <div className="text-center">
            <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">{meta.name}</p>
            <h1 className="text-[clamp(4rem,18vw,7rem)] font-bold leading-none mb-4" style={{ color: theme.primary, textShadow: `0 0 60px ${theme.primary}40` }}>2024</h1>
            <p className="text-white/60 text-sm">Your <strong className="text-white">legendary</strong> year, visualized.</p>
            <div className="mt-6 rounded-xl p-4 text-left text-xs text-white/80" style={{ backgroundColor: `${theme.primary}08`, border: `1px solid ${theme.primary}15` }}>
              <span className="text-[0.55rem] font-semibold tracking-wider block mb-1" style={{ color: theme.primary }}>FISCAL YEAR {meta.fiscalYear}</span>
              {meta.fiscalYearEnd}. Real data from SEC filings and earnings reports.
            </div>
          </div>
        </Slide>

        {/* STOCK PERFORMANCE */}
        <Slide active={currentSlide === getSlideIndex("stock")}>
          <Tag color={theme.primary}>Stock Performance</Tag>
          <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">Total Return</p>
          <h2 className="text-[clamp(2.8rem,11vw,5rem)] font-bold leading-none mb-4" style={{ color: theme.primary, textShadow: `0 0 60px ${theme.primary}40` }}>{formatPercent(stock.returnYTD)}</h2>
          <SparkLine returnYTD={stock.returnYTD} color={theme.primary} />
          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox label="Jan 1 (split adj)" value={formatCurrency(stock.startPrice)} />
            <StatBox label="Dec 31" value={formatCurrency(stock.endPrice)} color={theme.primary} />
          </div>
          <Insight color={theme.primary}>
            <strong>${(10000 * (1 + stock.returnYTD)).toLocaleString()}</strong> — that&apos;s what $10,000 invested Jan 1 became. You outperformed {stock.percentile}% of the S&P 500.
          </Insight>
        </Slide>

        {/* REVENUE */}
        <Slide active={currentSlide === getSlideIndex("revenue")}>
          <Tag color={theme.secondary}>Financials</Tag>
          <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">Annual Revenue</p>
          <h2 className="text-[clamp(2.8rem,11vw,5rem)] font-bold leading-none mb-2" style={{ color: theme.secondary, textShadow: `0 0 60px ${theme.secondary}40` }}>${formatNumber(financials.revenue)}</h2>
          <p className="text-white/60 text-sm mb-4">
            {financials.revenueGrowth > 0 && <>Up from ${formatNumber(financials.revenue / (1 + financials.revenueGrowth))} last year. That&apos;s <strong className="text-white">{formatPercent(financials.revenueGrowth)} growth</strong>.</>}
          </p>
          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox label="Revenue Per Day" value={`$${formatNumber(financials.revenue / 365)}`} color={theme.secondary} />
            <StatBox label="Per Minute" value={`$${formatNumber(financials.revenue / 365 / 24 / 60)}`} color={theme.accent} />
          </div>
          <Insight color={theme.secondary}>
            {meta.name}&apos;s daily revenue (${formatNumber(financials.revenue / 365)}) is more than most companies make in a year.
          </Insight>
        </Slide>

        {/* SEGMENTS TREEMAP */}
        {segments && segments.length > 0 && (
          <Slide active={currentSlide === getSlideIndex("segments")}>
            <Tag color={theme.primary}>Revenue Breakdown</Tag>
            <h2 className="text-xl font-semibold mb-4">Where The Money Comes From</h2>
            <div className="w-full space-y-1">
              {segments.map((seg, i) => (
                <div key={i} className="rounded-xl p-3" style={{ backgroundColor: `${seg.color || theme.primary}20`, animationDelay: `${i * 0.15}s` }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold" style={{ color: seg.color || theme.primary }}>${formatNumber(seg.revenue)}</div>
                      <div className="text-xs text-white/60">{seg.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{(seg.percentage * 100).toFixed(0)}%</div>
                      <div className="text-xs text-green-400">{seg.growth > 0 ? "+" : ""}{(seg.growth * 100).toFixed(0)}% YoY</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Insight color={theme.primary}>
              {segments[0]?.name === "Data Center" && <>In 2022, Gaming was 44% of revenue. Now it&apos;s just {((segments.find(s => s.name === "Gaming")?.percentage || 0) * 100).toFixed(0)}%. <strong>{meta.name} is now an AI infrastructure company.</strong></>}
            </Insight>
          </Slide>
        )}

        {/* QUARTERLY PROGRESSION */}
        {quarterly && quarterly.length > 0 && (
          <Slide active={currentSlide === getSlideIndex("quarterly")}>
            <Tag color={theme.secondary}>Quarterly Revenue</Tag>
            <h2 className="text-xl font-semibold mb-4">Every Quarter, Bigger Than The Last</h2>
            <div className="w-full space-y-3">
              {quarterly.map((q, i) => (
                <HorizontalBar key={i} label={q.quarter} value={q.revenue} max={Math.max(...quarterly.map(x => x.revenue))} yoy={q.yoyGrowth} color={i === quarterly.length - 1 ? theme.primary : theme.secondary} isLast={i === quarterly.length - 1} />
              ))}
            </div>
            <Insight color={theme.secondary}>
              Beat analyst estimates <strong>8 consecutive quarters</strong>. Average beat: 9.2%.
            </Insight>
          </Slide>
        )}

        {/* MARGINS */}
        <Slide active={currentSlide === getSlideIndex("margins")}>
          <Tag color={theme.primary}>Profitability</Tag>
          <h2 className="text-xl font-semibold mb-2">Software-Level Margins</h2>
          <p className="text-white/50 text-sm mb-4">From a hardware company. Unheard of.</p>
          <div className="flex justify-center gap-5 mb-4">
            <RingProgress value={financials.grossMargin} label="Gross" color="#22c55e" change="+5pts" />
            <RingProgress value={financials.operatingMargin} label="Operating" color="#3b82f6" change="+17pts" />
            <RingProgress value={financials.netMargin} label="Net" color="#a855f7" change="+7pts" />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox label="Net Income" value={`$${formatNumber(financials.netIncome)}`} color={theme.primary} sub={`${formatPercent(financials.epsGrowth)} YoY`} />
            <StatBox label="EPS" value={`$${financials.eps.toFixed(2)}`} sub={`${formatPercent(financials.epsGrowth)} YoY`} />
          </div>
          <Insight color={theme.primary}>
            Apple: 25% net margin. Microsoft: 35%. <strong>{meta.ticker}: {(financials.netMargin * 100).toFixed(0)}%.</strong>
          </Insight>
        </Slide>

        {/* CASH FLOW */}
        <Slide active={currentSlide === getSlideIndex("cashflow")}>
          <Tag color="#f59e0b">Cash Flow</Tag>
          <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">Free Cash Flow</p>
          <h2 className="text-[clamp(2.5rem,10vw,4rem)] font-bold leading-none mb-4" style={{ color: "#f59e0b", textShadow: "0 0 60px rgba(245,158,11,0.4)" }}>${formatNumber(cashFlow.freeCashFlow)}</h2>
          <div className="w-full space-y-3">
            <WaterfallItem icon="🏭" label="CapEx" value={cashFlow.capex} max={cashFlow.operatingCashFlow} color="#f59e0b" />
            <WaterfallItem icon="🔬" label="R&D" value={cashFlow.rdSpend} max={cashFlow.operatingCashFlow} color="#8b5cf6" />
            <WaterfallItem icon="📈" label="Buybacks" value={cashFlow.buybacks} max={cashFlow.operatingCashFlow} color="#10b981" />
            <WaterfallItem icon="💵" label="Dividends" value={cashFlow.dividends} max={cashFlow.operatingCashFlow} color="#3b82f6" />
          </div>
          <Insight color="#f59e0b">
            ${formatNumber(cashFlow.rdSpend)} in R&D — that&apos;s <strong>more than AMD&apos;s entire revenue</strong>.
          </Insight>
        </Slide>

        {/* EFFICIENCY */}
        <Slide active={currentSlide === getSlideIndex("efficiency")}>
          <Tag color={theme.accent}>Efficiency</Tag>
          <h2 className="text-xl font-semibold mb-4">Revenue Per Employee</h2>
          <div className="w-full space-y-2 mb-4">
            <CompareBar label="Meta" value={1.4e6} max={financials.revenuePerEmployee || 4e6} color="#3b82f6" />
            <CompareBar label="Google" value={1.5e6} max={financials.revenuePerEmployee || 4e6} color="#22c55e" />
            <CompareBar label="Apple" value={2.4e6} max={financials.revenuePerEmployee || 4e6} color="#6b7280" />
            <CompareBar label={meta.ticker} value={financials.revenuePerEmployee || 0} max={financials.revenuePerEmployee || 4e6} color={theme.primary} highlight />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox label="Rev / Employee" value={`$${formatNumber(financials.revenuePerEmployee || 0)}`} color={theme.primary} />
            <StatBox label="Profit / Employee" value={`$${formatNumber(financials.profitPerEmployee || 0)}`} color={theme.secondary} />
            <StatBox label="Total Employees" value={(financials.employees || 0).toLocaleString()} sub="+10%" />
            <StatBox label="FCF / Employee" value={`$${formatNumber(cashFlow.freeCashFlow / (financials.employees || 1))}`} color="#f59e0b" />
          </div>
        </Slide>

        {/* VALUATION */}
        <Slide active={currentSlide === getSlideIndex("valuation")}>
          <Tag color={theme.secondary}>Valuation</Tag>
          <h2 className="text-xl font-semibold mb-4">Is It Expensive?</h2>
          <div className="grid grid-cols-2 gap-3 w-full mb-4">
            <StatBox label="P/E Ratio" value={`${valuation.peRatio}x`} sub={`vs ${valuation.peSectorAvg}x sector avg`} />
            <StatBox label="P/S Ratio" value={`${valuation.psRatio}x`} sub={`vs ${valuation.psSectorAvg}x sector avg`} />
            <StatBox label="PEG Ratio" value={valuation.pegRatio ? `${valuation.pegRatio}x` : "N/A"} color="#22c55e" sub="Cheap on growth" />
            <StatBox label="EV/EBITDA" value={valuation.evEbitda ? `${valuation.evEbitda}x` : "N/A"} />
          </div>
          <ValuationGauge peRatio={valuation.peRatio} />
          <Insight color={theme.secondary}>
            Premium multiples, but <strong>PEG of {valuation.pegRatio}x</strong> means growth more than justifies the price.
          </Insight>
        </Slide>

        {/* INSIDER ACTIVITY */}
        {insiders && insiders.totalSales > 0 && (
          <Slide active={currentSlide === getSlideIndex("insiders")}>
            <Tag color="#ef4444">Insider Activity</Tag>
            <h2 className="text-xl font-semibold mb-4">What Insiders Did</h2>
            <div className="grid grid-cols-2 gap-3 w-full mb-4">
              <StatBox label="Total Insider Sales" value={`$${formatNumber(insiders.totalSales)}+`} color="#ef4444" sub="vs $462M in 2023" />
              <StatBox label={`${insiders.ceoName} Sales`} value={`$${formatNumber(insiders.ceoSales || 0)}+`} color="#ef4444" sub="Pre-planned 10b5-1" />
            </div>
            <div className="w-full pl-5 relative">
              <div className="absolute left-1.5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-yellow-500 via-red-500 to-red-500 rounded" />
              <TimelineItem date="MARCH 2024" title={`${insiders.ceoName?.split(" ")[0]} Sets Up Sale Plan`} desc="Adopts 10b5-1 plan to sell shares by year-end" color="#f59e0b" />
              <TimelineItem date="JUNE - DECEMBER" title="$14M Sold Almost Daily" desc="Systematic selling of 25K shares per day on set schedule" color="#ef4444" />
            </div>
            <Insight color="#ef4444">
              {insiders.ceoName} still owns <strong>93M shares (3.79%)</strong> after selling. He sold less than 0.65% of his stake. All sales were pre-planned.
            </Insight>
          </Slide>
        )}

        {/* CUSTOMER CONCENTRATION */}
        {customers && (
          <Slide active={currentSlide === getSlideIndex("customers")}>
            <Tag color="#ef4444">Risk Analysis</Tag>
            <h2 className="text-xl font-semibold mb-4">Customer Concentration</h2>
            <DonutChart percentage={customers.top4Percentage} label={customers.top4Label} color="#ef4444" />
            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <StatBox label="China Revenue" value="22%" color="#f59e0b" sub="Down from 26%" />
              <StatBox label="DC GPU Share" value="~90%" sub="Near monopoly" />
            </div>
            <Insight color="#ef4444">
              AWS, Azure, GCP, and Meta = 40%+ of revenue. {customers.risk}
            </Insight>
          </Slide>
        )}

        {/* GEOGRAPHIC */}
        {geographic && geographic.length > 0 && (
          <Slide active={currentSlide === getSlideIndex("geographic")}>
            <Tag color={theme.secondary}>Geography</Tag>
            <h2 className="text-xl font-semibold mb-4">Where Revenue Comes From</h2>
            <div className="w-full space-y-2">
              {geographic.map((geo, i) => (
                <HorizontalBar key={i} label={geo.region} value={geo.percentage * 100} max={100} format="pct" color={geo.color || theme.secondary} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <StatBox label="China YoY Change" value="-4pts" color="#f59e0b" sub="Export controls" />
              <StatBox label="Sovereign AI Nations" value="15+" color={theme.secondary} sub="Building AI infra" />
            </div>
            <Insight color={theme.secondary}>
              US export controls limited China sales. But <strong>&quot;Sovereign AI&quot;</strong> — nations building their own AI infrastructure — became a new growth driver.
            </Insight>
          </Slide>
        )}

        {/* COMPETITIVE POSITION */}
        {competitive && competitive.competitors && competitive.competitors.length > 0 && (
          <Slide active={currentSlide === getSlideIndex("competitive")}>
            <Tag color={theme.primary}>Market Position</Tag>
            <h2 className="text-xl font-semibold mb-4">The GPU Monopoly</h2>
            <MarketShareGauge share={competitive.marketShare || 0} label={competitive.marketShareLabel || ""} color={theme.primary} />
            <div className="w-full space-y-2 mt-4">
              {competitive.competitors.map((comp, i) => (
                <CompareBar key={i} label={comp.name} value={(comp.share || 0) * 100} max={100} color={comp.color || "#6b7280"} suffix={comp.metric} highlight={comp.ticker === meta.ticker} />
              ))}
            </div>
            <Insight color={theme.primary}>
              {competitive.moat}
            </Insight>
          </Slide>
        )}

        {/* EVENTS TIMELINE */}
        {events && events.length > 0 && (
          <Slide active={currentSlide === getSlideIndex("events")}>
            <Tag color={theme.secondary}>Key Events</Tag>
            <h2 className="text-xl font-semibold mb-4">2024 Defining Moments</h2>
            <div className="w-full pl-5 relative">
              <div className="absolute left-1.5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-500 via-cyan-500 via-purple-500 to-yellow-500 rounded" />
              {events.map((event, i) => (
                <TimelineItem key={i} date={event.date.toUpperCase()} title={event.title} desc={event.description} color={event.color || theme.primary} />
              ))}
            </div>
          </Slide>
        )}

        {/* BUZZWORDS */}
        {buzzwords && buzzwords.length > 0 && (
          <Slide active={currentSlide === getSlideIndex("buzzwords")}>
            <Tag color={theme.primary}>AI Analysis</Tag>
            <h2 className="text-xl font-semibold mb-4">Earnings Call Buzzwords</h2>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {buzzwords.map((bw, i) => (
                <span key={i} className={`px-3 py-2 rounded-full font-semibold ${bw.size === "lg" ? "text-xl px-5 py-3" : bw.size === "md" ? "text-base" : "text-sm"}`} style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, animationDelay: `${i * 0.1}s` }}>{bw.word}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <StatBox label="&quot;AI&quot; Mentions" value={buzzwords[0]?.count.toString() || "0"} color={theme.primary} />
              <StatBox label="&quot;Sovereign AI&quot; in Q3" value="23" />
            </div>
            <Insight color={theme.primary}>
              2023: &quot;Supply constraints, gaming.&quot; → 2024: <strong>&quot;Sovereign AI, Blackwell, inference.&quot;</strong> Countries are now customers.
            </Insight>
          </Slide>
        )}

        {/* CEO QUOTE */}
        {ceoQuote && (
          <Slide active={currentSlide === getSlideIndex("ceo")}>
            <Tag color={theme.primary}>CEO Spotlight</Tag>
            <div className="w-full rounded-2xl p-6 text-center" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-4xl opacity-30 mb-2" style={{ color: theme.primary }}>&ldquo;</div>
              <p className="text-base italic leading-relaxed mb-4">{ceoQuote.quote}</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                  {ceoQuote.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{ceoQuote.name}</div>
                  <div className="text-xs text-white/50">{ceoQuote.title}</div>
                </div>
              </div>
            </div>
            <Insight color={theme.primary}>
              {ceoQuote.name.split(" ")[0]} is pivoting the narrative to robotics. This signals where {meta.name} sees its <strong>next S-curve of growth</strong>.
            </Insight>
          </Slide>
        )}

        {/* ACHIEVEMENTS */}
        {achievements && achievements.length > 0 && (
          <Slide active={currentSlide === getSlideIndex("achievements")}>
            <Tag color={theme.secondary}>Achievements</Tag>
            <h2 className="text-xl font-semibold mb-4">2024 Badges Earned</h2>
            <div className="grid grid-cols-3 gap-2 w-full">
              {achievements.map((ach, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 text-center" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="text-2xl mb-1">{ach.icon}</div>
                  <div className="text-xs font-semibold">{ach.title}</div>
                  <div className="text-[0.55rem] text-white/40">{ach.desc}</div>
                </div>
              ))}
            </div>
          </Slide>
        )}

        {/* PERSONALITY */}
        <Slide active={currentSlide === getSlideIndex("personality")}>
          <Tag color="#a855f7">Company Personality</Tag>
          <div className="w-full rounded-3xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary}08 100%)`, border: `1px solid ${theme.primary}25` }}>
            <div className="text-5xl mb-3">{personality.emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{personality.type}</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-3">{personality.description}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {personality.traits.map((trait, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs bg-white/10">{trait}</span>
              ))}
            </div>
          </div>
        </Slide>

        {/* SUMMARY */}
        <Slide active={currentSlide === getSlideIndex("summary")}>
          <div className="w-full rounded-3xl p-5 text-center" style={{ background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.primary}05 100%)`, border: `1px solid ${theme.primary}25` }}>
            <div className="text-xl font-bold tracking-wider">{meta.ticker}</div>
            <div className="text-[0.65rem] text-white/50 mb-3">2024 Financial Wrapped</div>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <MiniStat label="Return" value={formatPercent(stock.returnYTD)} />
              <MiniStat label="Revenue" value={`$${formatNumber(financials.revenue)}`} />
              <MiniStat label="Growth" value={formatPercent(financials.revenueGrowth)} />
              <MiniStat label="Net Margin" value={`${(financials.netMargin * 100).toFixed(0)}%`} />
              <MiniStat label="Net Income" value={`$${formatNumber(financials.netIncome)}`} />
              <MiniStat label="Beats" value="8/8" />
            </div>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {(achievements || []).slice(0, 4).map((a, i) => (
                <span key={i} className="px-2 py-1 rounded-full text-[0.55rem] bg-black/20">{a.icon} {a.title}</span>
              ))}
            </div>
            <div className="bg-black/20 rounded-xl p-3 text-left mb-4">
              <div className="text-[0.5rem] text-white/40 tracking-widest uppercase mb-1">AI Summary</div>
              <div className="text-xs text-white/80 leading-relaxed">{aiSummary}</div>
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm" onClick={(e) => { e.stopPropagation(); const t = `${meta.name} 2024: ${formatPercent(stock.returnYTD)} return, $${formatNumber(financials.revenue)} revenue, ${(financials.netMargin * 100).toFixed(0)}% margin!`; navigator.share ? navigator.share({ title: `${meta.name} Financial Wrapped`, text: t, url: location.href }) : (navigator.clipboard.writeText(t), alert("Copied!")); }}>Share Your Wrapped</button>
          </div>
        </Slide>

        {/* END */}
        <Slide active={currentSlide === getSlideIndex("end")}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">That&apos;s a Wrap!</h2>
            <p className="text-white/60 mb-8">{meta.name}&apos;s 2024, visualized.</p>
            <a href="/" className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold text-sm" onClick={(e) => e.stopPropagation()}>View Another Company</a>
          </div>
        </Slide>
      </div>

      {/* Nav dots */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button key={i} className={`w-1 rounded-sm transition-all duration-300 ${i === currentSlide ? "h-3.5 bg-white" : "h-1 bg-white/20"}`} onClick={(e) => { e.stopPropagation(); goTo(i); }} />
        ))}
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-[0.6rem] text-white/30 z-50">{currentSlide + 1} / {totalSlides}</div>
    </div>
  );
}

// Components
function Slide({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <div className={`absolute inset-0 flex flex-col items-center justify-center px-5 py-10 transition-all duration-500 ${active ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-5"}`}><div className="w-full max-w-md flex flex-col items-center">{children}</div></div>;
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return <span className="text-[0.6rem] font-semibold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-5" style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}25` }}>{children}</span>;
}

function StatBox({ label, value, color, sub }: { label: string; value: string; color?: string; sub?: string }) {
  return <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 text-center"><div className="text-lg font-bold" style={color ? { color } : undefined}>{value}</div><div className="text-[0.55rem] text-white/50 mt-0.5">{label}</div>{sub && <div className="text-[0.65rem] text-green-500 mt-0.5">{sub}</div>}</div>;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="bg-black/20 rounded-lg p-2"><div className="text-sm font-bold">{value}</div><div className="text-[0.45rem] text-white/50 uppercase">{label}</div></div>;
}

function RingProgress({ value, label, color, change }: { value: number; label: string; color: string; change?: string }) {
  const c = 2 * Math.PI * 36, o = c - value * c;
  return <div className="text-center"><svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9" /><circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={o} /></svg><div className="text-xl font-bold mt-1" style={{ color }}>{(value * 100).toFixed(0)}%</div><div className="text-[0.6rem] text-white/50">{label}</div>{change && <div className="text-[0.6rem] text-green-500">{change}</div>}</div>;
}

function SparkLine({ returnYTD, color }: { returnYTD: number; color: string }) {
  const startY = 85, endY = Math.max(10, Math.min(90, 85 - returnYTD * 50));
  const path = `M0,${startY} C60,${startY - (startY - endY) * 0.2} 100,${startY - (startY - endY) * 0.3} 150,${startY - (startY - endY) * 0.5} S220,${startY - (startY - endY) * 0.7} 280,${startY - (startY - endY) * 0.85} S360,${endY + 3} 400,${endY}`;
  return <div className="w-full h-24 mb-4"><svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none"><defs><linearGradient id="sg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={`${color}50`} /><stop offset="100%" stopColor={`${color}00`} /></linearGradient></defs><path d={`${path} L400,100 L0,100 Z`} fill="url(#sg)" opacity="0.5" /><path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color}80)` }} /><circle cx="400" cy={endY} r="4" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} /><text x="0" y="98" fill="rgba(255,255,255,0.4)" fontSize="10">Jan</text><text x="380" y="98" fill="rgba(255,255,255,0.4)" fontSize="10">Dec</text></svg></div>;
}

function HorizontalBar({ label, value, max, yoy, color, isLast, format }: { label: string; value: number; max: number; yoy?: number; color: string; isLast?: boolean; format?: string }) {
  const pct = (value / max) * 100;
  return <div><div className="flex justify-between text-xs mb-1"><span className={isLast ? "font-semibold" : "text-white/60"} style={isLast ? { color } : undefined}>{label}</span><span className="font-semibold">{format === "pct" ? `${value.toFixed(0)}%` : `$${formatNumber(value)}`}</span></div><div className="h-7 bg-white/[0.03] rounded overflow-hidden"><div className="h-full rounded flex items-center pl-2 text-xs font-semibold transition-all duration-1000" style={{ width: `${pct}%`, background: isLast ? `linear-gradient(90deg, ${color}cc, ${color})` : color, boxShadow: isLast ? `0 0 15px ${color}50` : undefined }}>{yoy !== undefined && `${yoy > 0 ? "+" : ""}${(yoy * 100).toFixed(0)}% YoY`}</div></div></div>;
}

function CompareBar({ label, value, max, color, suffix, highlight }: { label: string; value: number; max: number; color: string; suffix?: string; highlight?: boolean }) {
  const pct = Math.min((value / max) * 100, 100);
  return <div className="flex items-center gap-2"><div className={`w-14 text-xs ${highlight ? "font-semibold" : "text-white/60"}`} style={highlight ? { color } : undefined}>{label}</div><div className="flex-1 h-6 bg-white/[0.03] rounded overflow-hidden"><div className="h-full rounded flex items-center justify-end pr-2 text-[0.6rem] font-semibold transition-all duration-1000" style={{ width: `${pct}%`, background: highlight ? `linear-gradient(90deg, ${color}99, ${color})` : color, boxShadow: highlight ? `0 0 12px ${color}50` : undefined }}>{suffix || (value >= 1e6 ? `$${formatNumber(value)}` : `${value.toFixed(0)}%`)}</div></div></div>;
}

function WaterfallItem({ icon, label, value, max, color }: { icon: string; label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return <div className="flex items-center gap-3 py-2 border-b border-white/[0.03]"><div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}>{icon}</div><div className="flex-1"><div className="text-xs mb-1">{label}</div><div className="h-1.5 bg-white/[0.05] rounded overflow-hidden"><div className="h-full rounded transition-all duration-1000" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }} /></div></div><div className="text-sm font-semibold min-w-[50px] text-right">${formatNumber(value)}</div></div>;
}

function TimelineItem({ date, title, desc, color }: { date: string; title: string; desc: string; color: string }) {
  return <div className="flex gap-4 py-3"><div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} /><div><div className="text-[0.55rem] text-white/40 tracking-wider">{date}</div><div className="text-sm font-semibold mb-0.5">{title}</div><div className="text-xs text-white/60 leading-relaxed">{desc}</div></div></div>;
}

function DonutChart({ percentage, label, color }: { percentage: number; label: string; color: string }) {
  const c = 2 * Math.PI * 50, filled = c * percentage;
  return <div className="relative w-40 h-40 mx-auto"><svg className="-rotate-90" viewBox="0 0 160 160"><circle cx="80" cy="80" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="32" /><circle cx="80" cy="80" r="50" fill="none" stroke={color} strokeWidth="32" strokeDasharray={`${filled} ${c - filled}`} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><div className="text-2xl font-bold" style={{ color }}>{(percentage * 100).toFixed(0)}%+</div><div className="text-[0.55rem] text-white/50">{label}</div></div></div>;
}

function ValuationGauge({ peRatio }: { peRatio: number }) {
  const pct = Math.min(peRatio / 100, 1);
  return <div className="relative w-44 h-24 mx-auto"><svg viewBox="0 0 180 100" className="w-full h-full"><defs><linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22c55e" /><stop offset="50%" stopColor="#eab308" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs><path d="M20,90 A70,70 0 0,1 160,90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" /><path d="M20,90 A70,70 0 0,1 160,90" fill="none" stroke="url(#vg)" strokeWidth="14" strokeLinecap="round" strokeDasharray="220" strokeDashoffset={220 - pct * 220} /></svg><div className="absolute bottom-0 left-0 right-0 flex justify-between text-[0.5rem] text-white/40 px-2"><span>Cheap</span><span>Fair</span><span>Expensive</span></div></div>;
}

function MarketShareGauge({ share, label, color }: { share: number; label: string; color: string }) {
  const pct = share;
  return <div className="relative w-44 h-24 mx-auto mb-2"><svg viewBox="0 0 180 100" className="w-full h-full"><defs><linearGradient id="msg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(255,255,255,0.1)" /><stop offset={`${pct * 100}%`} stopColor={color} /></linearGradient></defs><path d="M20,90 A70,70 0 0,1 160,90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" /><path d="M20,90 A70,70 0 0,1 160,90" fill="none" stroke="url(#msg)" strokeWidth="14" strokeLinecap="round" strokeDasharray="220" strokeDashoffset={220 - pct * 220} /></svg><div className="absolute top-8 left-1/2 -translate-x-1/2 text-center"><div className="text-2xl font-bold" style={{ color }}>~{(share * 100).toFixed(0)}%</div><div className="text-[0.5rem] text-white/50">{label}</div></div><div className="absolute bottom-0 left-0 right-0 flex justify-between text-[0.5rem] text-white/40 px-2"><span>0%</span><span>50%</span><span>100%</span></div></div>;
}

function Insight({ color, children }: { color: string; children: React.ReactNode }) {
  return <div className="mt-4 rounded-xl p-4 text-xs text-white/80 leading-relaxed w-full" style={{ backgroundColor: `${color}08`, border: `1px solid ${color}15` }}><span className="text-[0.55rem] font-semibold tracking-wider block mb-1.5" style={{ color }}>WHAT THIS MEANS</span>{children}</div>;
}

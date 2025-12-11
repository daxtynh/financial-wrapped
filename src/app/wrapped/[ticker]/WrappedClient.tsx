"use client";

import { useState, useEffect, useCallback } from "react";
import { WrappedData } from "@/types/wrapped";
import { formatNumber, formatPercent, formatCurrency } from "@/lib/wrapped-builder";

interface Props {
  data: WrappedData;
}

export default function WrappedClient({ data }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 12; // Number of slides

  const { meta, stock, financials, personality, aiSummary } = data;
  const theme = meta.theme;

  // Navigation handlers
  const next = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, []);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        next();
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Touch/swipe navigation
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].screenX;
      const dy = startY - e.changedTouches[0].screenY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        dx > 0 ? next() : prev();
      } else if (Math.abs(dy) > 50) {
        dy > 0 ? next() : prev();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  // Click navigation
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a, .nav-dot")) return;
    e.clientX > window.innerWidth * 0.25 ? next() : prev();
  };

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
      <div
        className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-300"
        style={{
          width: `${((currentSlide + 1) / totalSlides) * 100}%`,
          backgroundColor: theme.primary,
        }}
      />

      {/* Slides container */}
      <div className="relative h-screen">
        {/* SLIDE 0: Intro */}
        <Slide active={currentSlide === 0}>
          <div className="text-center">
            <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">
              {meta.name}
            </p>
            <h1
              className="text-[clamp(4rem,18vw,7rem)] font-bold leading-none mb-4"
              style={{ color: theme.primary, textShadow: `0 0 60px ${theme.primary}40` }}
            >
              2024
            </h1>
            <p className="text-white/60 text-sm">
              Your <strong className="text-white">year</strong>, visualized.
            </p>
            <div
              className="mt-6 rounded-xl p-4 text-left text-xs text-white/80"
              style={{ backgroundColor: `${theme.primary}08`, border: `1px solid ${theme.primary}15` }}
            >
              <span className="text-[0.55rem] font-semibold tracking-wider block mb-1" style={{ color: theme.primary }}>
                FISCAL YEAR {meta.fiscalYear}
              </span>
              {meta.fiscalYearEnd}. Real data from SEC filings.
            </div>
          </div>
        </Slide>

        {/* SLIDE 1: Stock Performance */}
        <Slide active={currentSlide === 1}>
          <Tag color={theme.primary}>Stock Performance</Tag>
          <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">Total Return</p>
          <h2
            className="text-[clamp(2.8rem,11vw,5rem)] font-bold leading-none mb-4"
            style={{ color: theme.primary, textShadow: `0 0 60px ${theme.primary}40` }}
          >
            {formatPercent(stock.returnYTD)}
          </h2>

          {/* Spark line placeholder */}
          <div className="w-full h-24 mb-4 relative">
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={`${theme.primary}50`} />
                  <stop offset="100%" stopColor={`${theme.primary}00`} />
                </linearGradient>
              </defs>
              <path
                d={generateSparkPath(stock.returnYTD)}
                fill="url(#sparkGrad)"
                opacity="0.5"
              />
              <path
                d={generateSparkPath(stock.returnYTD).replace(/ L400,100 L0,100 Z/, "")}
                fill="none"
                stroke={theme.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${theme.primary}80)` }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox label="Jan 1 Price" value={formatCurrency(stock.startPrice)} />
            <StatBox label="Dec 31 Price" value={formatCurrency(stock.endPrice)} color={theme.primary} />
          </div>

          <Insight color={theme.primary}>
            <strong>${(10000 * (1 + stock.returnYTD)).toLocaleString()}</strong> — that&apos;s what $10,000 invested Jan 1 became.
            {stock.vsSpx > 0 ? ` Beat S&P 500 by ${formatPercent(stock.vsSpx)}.` : ""}
          </Insight>
        </Slide>

        {/* SLIDE 2: Revenue */}
        <Slide active={currentSlide === 2}>
          <Tag color={theme.secondary}>Financials</Tag>
          <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">Annual Revenue</p>
          <h2
            className="text-[clamp(2.8rem,11vw,5rem)] font-bold leading-none mb-2"
            style={{ color: theme.secondary, textShadow: `0 0 60px ${theme.secondary}40` }}
          >
            ${formatNumber(financials.revenue)}
          </h2>
          <p className="text-white/60 text-sm mb-6">
            {financials.revenueGrowth !== 0 && (
              <>That&apos;s <strong className="text-white">{formatPercent(financials.revenueGrowth)} YoY growth</strong>.</>
            )}
          </p>

          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox
              label="Revenue Per Day"
              value={`$${formatNumber(financials.revenue / 365)}`}
              color={theme.secondary}
            />
            <StatBox
              label="Per Minute"
              value={`$${formatNumber(financials.revenue / 365 / 24 / 60)}`}
              color={theme.accent}
            />
          </div>
        </Slide>

        {/* SLIDE 3: Profitability */}
        <Slide active={currentSlide === 3}>
          <Tag color={theme.primary}>Profitability</Tag>
          <h2 className="text-xl font-semibold mb-6">Margin Profile</h2>

          <div className="flex justify-center gap-5 mb-6">
            <RingProgress value={financials.grossMargin} label="Gross" color="#22c55e" />
            <RingProgress value={financials.operatingMargin} label="Operating" color="#3b82f6" />
            <RingProgress value={financials.netMargin} label="Net" color="#a855f7" />
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox
              label="Net Income"
              value={`$${formatNumber(financials.netIncome)}`}
              color={theme.primary}
            />
            <StatBox
              label="EPS"
              value={`$${financials.eps.toFixed(2)}`}
              sub={financials.epsGrowth ? formatPercent(financials.epsGrowth) : undefined}
            />
          </div>
        </Slide>

        {/* SLIDE 4: Per Employee */}
        <Slide active={currentSlide === 4}>
          <Tag color={theme.accent}>Efficiency</Tag>
          <h2 className="text-xl font-semibold mb-6">Revenue Per Employee</h2>

          {financials.revenuePerEmployee && (
            <h3
              className="text-4xl font-bold mb-6"
              style={{ color: theme.primary }}
            >
              ${formatNumber(financials.revenuePerEmployee)}
            </h3>
          )}

          <div className="grid grid-cols-2 gap-3 w-full">
            {financials.employees && (
              <StatBox label="Employees" value={financials.employees.toLocaleString()} />
            )}
            {financials.profitPerEmployee && (
              <StatBox
                label="Profit / Employee"
                value={`$${formatNumber(financials.profitPerEmployee)}`}
                color={theme.secondary}
              />
            )}
          </div>
        </Slide>

        {/* SLIDE 5: Valuation */}
        <Slide active={currentSlide === 5}>
          <Tag color={theme.secondary}>Valuation</Tag>
          <h2 className="text-xl font-semibold mb-6">Is It Expensive?</h2>

          <div className="grid grid-cols-2 gap-3 w-full mb-6">
            <StatBox
              label="P/E Ratio"
              value={data.valuation.peRatio > 0 ? `${data.valuation.peRatio.toFixed(1)}x` : "N/A"}
              sub={`vs ${data.valuation.peSectorAvg}x sector`}
            />
            <StatBox
              label="P/S Ratio"
              value={data.valuation.psRatio > 0 ? `${data.valuation.psRatio.toFixed(1)}x` : "N/A"}
              sub={`vs ${data.valuation.psSectorAvg}x sector`}
            />
          </div>

          {/* Gauge */}
          <div className="relative w-44 h-24 mx-auto">
            <svg viewBox="0 0 180 100" className="w-full h-full">
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <path d="M20,90 A70,70 0 0,1 160,90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
              <path
                d="M20,90 A70,70 0 0,1 160,90"
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="220"
                strokeDashoffset={220 - (data.valuation.peRatio / 100) * 220}
              />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[0.55rem] text-white/40 px-2">
              <span>Cheap</span>
              <span>Fair</span>
              <span>Expensive</span>
            </div>
          </div>
        </Slide>

        {/* SLIDE 6: Cash Flow */}
        <Slide active={currentSlide === 6}>
          <Tag color="#f59e0b">Cash Flow</Tag>
          <p className="text-[0.65rem] tracking-[3px] uppercase text-white/40 mb-2">Free Cash Flow</p>
          <h2
            className="text-[clamp(2.5rem,10vw,4rem)] font-bold leading-none mb-6"
            style={{ color: "#f59e0b", textShadow: "0 0 60px rgba(245,158,11,0.4)" }}
          >
            ${formatNumber(data.cashFlow.freeCashFlow)}
          </h2>

          <div className="w-full space-y-3">
            <CashFlowBar label="R&D Spend" value={data.cashFlow.rdSpend} max={data.cashFlow.operatingCashFlow} color="#8b5cf6" />
            <CashFlowBar label="CapEx" value={data.cashFlow.capex} max={data.cashFlow.operatingCashFlow} color="#f59e0b" />
          </div>
        </Slide>

        {/* SLIDE 7: Stock Split (if applicable) */}
        <Slide active={currentSlide === 7}>
          <Tag color={theme.secondary}>Key Events</Tag>
          <h2 className="text-xl font-semibold mb-6">2024 Highlights</h2>

          {stock.split && (
            <div className="w-full rounded-xl p-4 mb-4" style={{ backgroundColor: `${theme.secondary}10`, border: `1px solid ${theme.secondary}20` }}>
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">{stock.split.ratio} Stock Split</div>
              <div className="text-sm text-white/50">{stock.split.date}</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 w-full">
            <StatBox label="52W High" value={formatCurrency(stock.high52w)} color="#22c55e" />
            <StatBox label="52W Low" value={formatCurrency(stock.low52w)} color="#ef4444" />
          </div>
        </Slide>

        {/* SLIDE 8: Personality */}
        <Slide active={currentSlide === 8}>
          <Tag color="#a855f7">Company Personality</Tag>

          <div
            className="w-full rounded-3xl p-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary}08 100%)`,
              border: `1px solid ${theme.primary}25`,
            }}
          >
            <div className="text-5xl mb-4 animate-bounce">{personality.emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{personality.type}</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {personality.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {personality.traits.map((trait, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/10"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </Slide>

        {/* SLIDE 9: AI Summary */}
        <Slide active={currentSlide === 9}>
          <Tag color={theme.primary}>AI Summary</Tag>
          <h2 className="text-xl font-semibold mb-6">The Year in Review</h2>

          <div
            className="w-full rounded-xl p-5 text-sm leading-relaxed text-white/80"
            style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {aiSummary}
          </div>
        </Slide>

        {/* SLIDE 10: Summary Dashboard */}
        <Slide active={currentSlide === 10}>
          <div
            className="w-full rounded-3xl p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.primary}05 100%)`,
              border: `1px solid ${theme.primary}25`,
            }}
          >
            <div className="text-xl font-bold tracking-wider mb-1">{meta.ticker}</div>
            <div className="text-[0.65rem] text-white/50 mb-4">2024 Financial Wrapped</div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <MiniStat label="Return" value={formatPercent(stock.returnYTD)} />
              <MiniStat label="Revenue" value={`$${formatNumber(financials.revenue)}`} />
              <MiniStat label="Net Margin" value={`${(financials.netMargin * 100).toFixed(0)}%`} />
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
              <span className="px-2.5 py-1 rounded-full text-[0.6rem] bg-black/20">{personality.emoji} {personality.type}</span>
            </div>

            <button
              className="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-white/90 transition"
              onClick={(e) => {
                e.stopPropagation();
                const text = `${meta.name} 2024: ${formatPercent(stock.returnYTD)} return, $${formatNumber(financials.revenue)} revenue, ${(financials.netMargin * 100).toFixed(0)}% margin!`;
                if (navigator.share) {
                  navigator.share({ title: `${meta.name} Financial Wrapped`, text, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(text);
                  alert("Copied to clipboard!");
                }
              }}
            >
              Share Your Wrapped
            </button>
          </div>
        </Slide>

        {/* SLIDE 11: End */}
        <Slide active={currentSlide === 11}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">That&apos;s a Wrap! 🎬</h2>
            <p className="text-white/60 mb-8">
              {meta.name}&apos;s 2024, visualized.
            </p>
            <a
              href="/"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-white/90 transition"
              onClick={(e) => e.stopPropagation()}
            >
              View Another Company
            </a>
          </div>
        </Slide>
      </div>

      {/* Navigation dots */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`w-1 rounded-sm transition-all duration-300 ${
              i === currentSlide ? "h-3.5 bg-white" : "h-1 bg-white/20"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-[0.6rem] text-white/30 z-50">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
}

// Helper Components
function Slide({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-5 py-10 transition-all duration-500 ${
        active ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-5"
      }`}
    >
      <div className="w-full max-w-md flex flex-col items-center">{children}</div>
    </div>
  );
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="text-[0.6rem] font-semibold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-5"
      style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
    >
      {children}
    </span>
  );
}

function StatBox({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: string;
  color?: string;
  sub?: string;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 text-center">
      <div className="text-xl font-bold" style={color ? { color } : undefined}>
        {value}
      </div>
      <div className="text-[0.6rem] text-white/50 mt-1">{label}</div>
      {sub && <div className="text-[0.7rem] text-green-500 mt-1">{sub}</div>}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/20 rounded-lg p-2.5">
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[0.5rem] text-white/50 uppercase">{label}</div>
    </div>
  );
}

function RingProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - value * circumference;

  return (
    <div className="text-center">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="text-xl font-bold mt-2" style={{ color }}>
        {(value * 100).toFixed(0)}%
      </div>
      <div className="text-[0.65rem] text-white/50">{label}</div>
    </div>
  );
}

function CashFlowBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/60">{label}</span>
        <span className="font-semibold">${formatNumber(value)}</span>
      </div>
      <div className="h-6 bg-white/[0.03] rounded overflow-hidden">
        <div
          className="h-full rounded transition-all duration-1000"
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function Insight({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      className="mt-4 rounded-xl p-4 text-xs text-white/80 leading-relaxed w-full"
      style={{ backgroundColor: `${color}08`, border: `1px solid ${color}15` }}
    >
      <span className="text-[0.55rem] font-semibold tracking-wider block mb-1.5" style={{ color }}>
        WHAT THIS MEANS
      </span>
      {children}
    </div>
  );
}

// Generate spark line path based on return
function generateSparkPath(returnYTD: number): string {
  // Simplified path generation - would use real price data in production
  const startY = 85;
  const endY = Math.max(10, Math.min(90, 85 - returnYTD * 50));

  // Generate a curved path
  const mid1Y = startY - (startY - endY) * 0.2;
  const mid2Y = startY - (startY - endY) * 0.5;
  const mid3Y = startY - (startY - endY) * 0.8;

  return `M0,${startY} C60,${mid1Y} 100,${mid1Y} 150,${mid2Y} S220,${mid3Y} 280,${mid3Y} S360,${endY + 5} 400,${endY} L400,100 L0,100 Z`;
}

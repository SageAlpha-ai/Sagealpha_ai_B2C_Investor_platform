import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnlockReportCard from "../paywall/UnlockReportCard";
import PaymentModal from "../paywall/PaymentModal";
import CONFIG from "../../config";

function safeArray(x) {
  return Array.isArray(x) ? x : [];
}

export default function ReportView({ reportData, onUnlock, reportId, defaultUnlocked }) {
  const navigate = useNavigate();
  const [isReportUnlocked, setIsReportUnlocked] = useState(!!defaultUnlocked);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);

  if (!reportData) return null;

  const {
    companyName = "Company Name",
    ticker = "",
    subtitle = "",
    rating = "NEUTRAL",
    targetPrice = "N/A",
    targetPeriod = "12-18M",
    currentPrice = "N/A",
    upside = "N/A",
    marketCap = "N/A",
    entValue = "N/A",
    valuation = "N/A",
    investmentThesis,
    highlights,
    valuationMethodology,
    catalysts,
    risks,
    financialSummary,
    analyst = "SageAlpha Research Team",
    analystEmail = "research@sagealpha.ai",
    date,
  } = reportData;

  const thesisList = safeArray(investmentThesis);
  const highlightsList = safeArray(highlights);
  const valuationList = safeArray(valuationMethodology);
  const catalystsList = safeArray(catalysts);
  const risksList = safeArray(risks);
  const fin = safeArray(financialSummary);

  const displayDate =
    date ||
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleOpenPaymentModal = () => {
    setPaymentModalOpen(true);
    onUnlock?.();
  };

  const handlePaymentComplete = async () => {
    if (reportId) {
      setPaymentSubmitting(true);
      try {
        const token = localStorage.getItem("sagealpha_token");
        if (!token) {
          setIsReportUnlocked(true);
          setPaymentModalOpen(false);
          return;
        }
        const base = CONFIG.API_BASE_URL || "";
        const res = await fetch(`${base}/api/reports/purchase`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reportId }),
        });
        const data = await res.json().catch(() => ({}));
        setPaymentModalOpen(false);
        if (res.ok && data.success) {
          navigate("/my-reports", { replace: true });
          return;
        }
      } catch (e) {
        console.error("Purchase error:", e);
      } finally {
        setPaymentSubmitting(false);
      }
    }
    setIsReportUnlocked(true);
    setPaymentModalOpen(false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        {/* Header */}
        <header className="border-b-2 border-slate-900 pb-3 mb-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">
              Sage<span className="text-emerald-600">Alpha</span> Capital
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 mt-1">
              Institutional Equity Research
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-600">
            <div>{displayDate}</div>
          </div>
        </header>

        {/* Company header */}
        <div className="mb-4">
          <div className="text-xl sm:text-2xl font-bold text-slate-900">
            {companyName}{" "}
            {ticker && (
              <span className="text-sm font-normal text-slate-500">({ticker})</span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600 italic max-w-2xl">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,minmax(0,1fr)] gap-8">
          {/* Left column */}
          <div>
            {/* Investment Thesis */}
            {thesisList.length > 0 && (
              <section className="mb-5">
                <h2 className="text-xs font-extrabold tracking-[0.12em] uppercase text-slate-800 border-b-2 border-slate-900 pb-1 mb-2">
                  Investment Thesis
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {thesisList.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {item.content || item.title || item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Key Highlights */}
            {highlightsList.length > 0 && (
              <section className="mb-5">
                <h2 className="text-xs font-extrabold tracking-[0.12em] uppercase text-slate-800 border-b-2 border-slate-900 pb-1 mb-2">
                  Key Highlights
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {highlightsList.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {item.content || item.title || item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Valuation Methodology */}
            {valuationList.length > 0 && (
              <section className="mb-5">
                <h2 className="text-xs font-extrabold tracking-[0.12em] uppercase text-slate-800 border-b-2 border-slate-900 pb-1 mb-2">
                  Valuation Methodology
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {valuationList.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <span className="font-semibold">{item.method || "Method"}: </span>
                      {item.details || item.content || ""}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Catalysts */}
            {catalystsList.length > 0 && (
              <section className="mb-5">
                <h2 className="text-xs font-extrabold tracking-[0.12em] uppercase text-slate-800 border-b-2 border-slate-900 pb-1 mb-2">
                  Catalysts
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {catalystsList.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <span className="font-semibold">{item.title || "Catalyst"}: </span>
                      {item.impact || item.content || ""}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Risks */}
            {risksList.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xs font-extrabold tracking-[0.12em] uppercase text-slate-800 border-b-2 border-slate-900 pb-1 mb-2">
                  Risks
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  {risksList.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <span className="font-semibold">{item.title || "Risk"}: </span>
                      {item.impact || item.content || ""}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right column (sidebar) */}
          <aside className="space-y-5">
            {/* Recommendation box */}
            <div className="rounded-xl border-2 border-emerald-700 bg-emerald-50 px-4 py-4 text-center">
              <div className="text-sm font-extrabold text-emerald-700 uppercase tracking-wide mb-1">
                {rating}
              </div>
              <div className="text-3xl font-black text-slate-900">
                {targetPrice}
              </div>
              <div className="text-[10px] text-slate-600 mt-1">
                Price Target ({targetPeriod})
              </div>
            </div>

            {/* Metrics */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 divide-y divide-slate-200 text-xs">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-slate-600">Current Price</span>
                <span className="font-semibold text-slate-900">{currentPrice}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-slate-600">Upside</span>
                <span className="font-semibold text-emerald-700">{upside}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-slate-600">Market Cap</span>
                <span className="font-semibold text-slate-900">{marketCap}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-slate-600">Ent. Value</span>
                <span className="font-semibold text-slate-900">{entValue}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-slate-600">Valuation</span>
                <span className="font-semibold text-slate-900">{valuation}</span>
              </div>
            </div>

            {/* Financial Summary */}
            {fin.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <h3 className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-slate-800 border-b-2 border-slate-900 pb-1 mb-2">
                  Financial Summary
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-[10px]">
                    <thead>
                      <tr className="border-b-2 border-slate-900 text-slate-800">
                        <th className="text-left font-semibold py-1 pr-2">Year</th>
                        {fin.map((s, idx) => (
                          <th key={idx} className="text-right font-semibold py-1 px-2">
                            {s.year}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="text-left font-semibold py-1 pr-2">Rev</td>
                        {fin.map((s, idx) => (
                          <td key={idx} className="text-right py-1 px-2">
                            {s.rev}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="text-left font-semibold py-1 pr-2">EBITDA</td>
                        {fin.map((s, idx) => (
                          <td key={idx} className="text-right py-1 px-2">
                            {s.ebitda}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="text-left font-semibold py-1 pr-2">EPS</td>
                        {fin.map((s, idx) => (
                          <td key={idx} className="text-right py-1 px-2">
                            {s.eps}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analyst */}
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <h3 className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-slate-800 border-b-2 border-slate-900 pb-1 mb-2">
                Analyst
              </h3>
              <p className="text-xs font-semibold text-slate-900">{analyst}</p>
              <p className="text-[11px] text-slate-600">{analystEmail}</p>
            </div>
          </aside>
        </div>

          {/* Footer */}
          <footer className="mt-6 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
            © {new Date().getFullYear()} SageAlpha Capital. All rights reserved. This report is
            for informational purposes only and does not constitute financial advice. Powered by
            SageAlpha.ai.
          </footer>
        </div>

        {/* Paywalled bottom section: blur + overlay (hidden when unlocked) */}
        {!isReportUnlocked && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white/90 backdrop-blur-md" />
            {/* Watermark overlay (only on locked/blurred section) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.08]">
                <div className="absolute -inset-[30%] flex items-center justify-center rotate-[-30deg]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-14">
                    {Array.from({ length: 9 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="select-none text-[40px] sm:text-[64px] md:text-[80px] font-black tracking-tight"
                      >
                        <span className="text-slate-400">Sage</span>
                        <span className="text-emerald-500">Alpha</span>
                        <span className="text-slate-300 text-[0.55em] align-top ml-1">
                          .ai
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-4 text-center text-[10px] sm:text-[11px] text-slate-700/60">
                <div className="font-semibold">
                  © SageAlpha Capital – Proprietary Institutional Research
                </div>
                <div className="mt-0.5">
                  Unauthorized distribution, copying, or reproduction of this report is strictly prohibited.
                </div>
              </div>
            </div>
            <div className="relative h-full flex items-center justify-center px-4">
              <div className="pointer-events-auto">
                <UnlockReportCard onUnlock={handleOpenPaymentModal} />
              </div>
            </div>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPaymentComplete={handlePaymentComplete}
        isSubmitting={paymentSubmitting}
      />
    </div>
  );
}


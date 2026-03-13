import React from "react";
import { X, Bell, Zap, ShieldAlert, Newspaper, Target } from "lucide-react";

export default function StockAlertsModal({
  isOpen,
  onClose,
  onSubscribe,
  ticker,
  companyName,
  isSubmitting,
  successMessage,
  errorMessage,
}) {
  if (!isOpen) return null;

  const displayName = companyName || ticker || "this stock";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose?.();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-7"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition disabled:opacity-60"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Get Real-Time Stock Alerts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Stay ahead of the market for <span className="font-semibold">{displayName}</span>.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 mb-4">
          <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-3">
            What you&apos;ll get:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-500 mt-0.5" />
              <span>Instant price movement alerts when the stock moves sharply.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500 mt-0.5" />
              <span>Risk alerts when downside risk increases meaningfully.</span>
            </li>
            <li className="flex items-start gap-2">
              <Newspaper className="w-4 h-4 text-blue-500 mt-0.5" />
              <span>Major news and events that could impact the stock.</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-emerald-500 mt-0.5" />
              <span>AI-powered updates when target prices or thesis change.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="text-xl font-black text-emerald-700">₹99</span>
              <span className="text-xs font-semibold text-emerald-700">/ month</span>
            </div>
            <p className="text-[11px] text-emerald-800 font-medium">Cancel anytime.</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-700 text-[10px] font-bold uppercase tracking-wide text-emerald-50 px-3 py-1">
            Early Access Pricing
          </span>
        </div>

        {successMessage && (
          <div className="mb-3 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-700">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onSubscribe}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-slate-900 text-white text-sm font-extrabold py-3.5 shadow-lg hover:bg-slate-800 active:scale-[0.98] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Activating..." : "Subscribe to Alerts"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-bold py-3.5 hover:bg-slate-50 active:scale-[0.98] transition disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


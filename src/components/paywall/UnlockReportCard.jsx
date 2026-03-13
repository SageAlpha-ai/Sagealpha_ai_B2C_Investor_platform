import React from "react";

export default function UnlockReportCard({ onUnlock }) {
  const handleClick = () => {
    if (onUnlock) {
      onUnlock();
    } else {
      // Placeholder for future payment integration
      console.log("Unlock Full Report clicked");
    }
  };

  return (
    <div className="max-w-md w-full bg-transparent rounded-2xl px-6 py-6 sm:px-8 sm:py-7">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-base sm:text-lg font-black text-slate-900">
          Unlock Full AI Research Report
        </h3>
        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 uppercase tracking-wide">
          Limited Time Offer
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
        Get the complete institutional-grade analysis including valuation models, catalysts,
        risks and detailed financial insights.
      </p>

      <div className="flex items-end gap-3 mb-5">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 line-through">₹2000</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">₹500</span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
          75% off for early users
        </span>
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 text-white text-sm font-extrabold py-3.5 shadow-lg shadow-slate-900/20 hover:bg-slate-800 active:scale-[0.98] transition"
      >
        Unlock Full Report
      </button>
    </div>
  );
}


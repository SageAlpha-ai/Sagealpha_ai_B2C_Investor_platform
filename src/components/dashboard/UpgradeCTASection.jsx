import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

function UpgradeCTASection() {
  const navigate = useNavigate();

  const bullets = [
    "AI buy signals",
    "Portfolio optimization insights",
    "Advanced watchlists",
  ];

  return (
    <section className="py-2">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--accent)]/10 to-blue-600/10 p-8 sm:p-10 shadow-sm text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
            Unlock Full Investor Intelligence
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
            Upgrade to Pro to access premium AI insights, advanced watchlists, and portfolio optimization tools.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {bullets.map((b) => (
              <div
                key={b}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] mt-0.5" />
                  <p className="text-sm font-semibold text-[var(--text)]">
                    {b}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate("/upgrade")}
            className="mt-8 w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-extrabold text-white shadow-md hover:opacity-95 active:scale-[0.99] transition"
          >
            Upgrade to SageAlpha Pro
          </button>
        </div>
      </div>
    </section>
  );
}

export default React.memo(UpgradeCTASection);


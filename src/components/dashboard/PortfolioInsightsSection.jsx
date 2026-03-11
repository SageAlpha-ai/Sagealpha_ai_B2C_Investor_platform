import React from "react";
import LockedList from "./LockedList";

function InsightCard({ title, lines }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[var(--text)]">{title}</h3>
      <div className="mt-2 space-y-1">
        {lines.map((l) => (
          <p key={l} className="text-sm text-[var(--text-muted)]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function PortfolioInsightsSection() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text)]">
          Smart Portfolio Insights
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Understand your portfolio performance and risk exposure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InsightCard
          title="Portfolio Performance"
          lines={["Return: +12.4% (last 12 months)"]}
        />
        <InsightCard
          title="Risk Exposure"
          lines={["Technology: 42%", "Finance: 25%"]}
        />
        <InsightCard
          title="AI Portfolio Suggestion"
          lines={[
            "Risk Score: Moderate",
            "Suggestion: Reduce exposure in midcap tech",
          ]}
        />
      </div>

      <LockedList
        title="More portfolio tools"
        items={["Recent Additions", "Recent Removals"]}
      />
    </section>
  );
}

export default React.memo(PortfolioInsightsSection);


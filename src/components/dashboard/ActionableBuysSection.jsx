import React from "react";
import LockedList from "./LockedList";

function SignalBadge({ signal }) {
  const normalized = String(signal || "").toUpperCase();
  const isBuy = normalized === "BUY";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold border ${
        isBuy
          ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
          : "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      }`}
    >
      {normalized || "WATCH"}
    </span>
  );
}

function StockInsightCard({ name, score, signal }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[var(--text)] truncate">
            {name}
          </h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            AI Score: <span className="font-semibold text-[var(--text)]">{score}</span>
          </p>
        </div>
        <SignalBadge signal={signal} />
      </div>
    </div>
  );
}

function ActionableBuysSection() {
  const cards = [
    { name: "TCS", score: "8.7", signal: "BUY" },
    { name: "HDFC Bank", score: "8.3", signal: "BUY" },
    { name: "Infosys", score: "7.9", signal: "WATCH" },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text)]">
          Actionable Buy Opportunities
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          AI identifies companies showing strong fundamentals and market momentum.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <StockInsightCard
            key={c.name}
            name={c.name}
            score={c.score}
            signal={c.signal}
          />
        ))}
      </div>

      <LockedList
        title="Premium insights"
        items={["Current Holdings", "Actionable Buys", "Recent Additions"]}
      />
    </section>
  );
}

export default React.memo(ActionableBuysSection);


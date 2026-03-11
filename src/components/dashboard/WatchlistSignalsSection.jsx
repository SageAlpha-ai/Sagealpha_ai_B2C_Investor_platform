import React from "react";
import LockedList from "./LockedList";

function SentimentPill({ sentiment }) {
  const normalized = String(sentiment || "").toLowerCase();
  const classes =
    normalized === "positive"
      ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
      : normalized === "neutral"
      ? "bg-slate-500/10 text-slate-700 border-slate-500/20"
      : "bg-red-500/10 text-red-700 border-red-500/20";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold border ${classes}`}
    >
      {sentiment}
    </span>
  );
}

function WatchlistCard({ name, price, sentiment }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[var(--text)] truncate">
            {name}
          </h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Price: <span className="font-semibold text-[var(--text)]">{price}</span>
          </p>
        </div>
        <SentimentPill sentiment={sentiment} />
      </div>
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        AI Sentiment:{" "}
        <span className="font-semibold text-[var(--text)]">{sentiment}</span>
      </p>
    </div>
  );
}

function WatchlistSignalsSection() {
  const items = [
    { name: "Reliance", price: "₹2895", sentiment: "Positive" },
    { name: "Infosys", price: "₹1530", sentiment: "Neutral" },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text)]">
          AI Watchlist &amp; Market Signals
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Track companies and receive AI insights on important market movements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((x) => (
          <WatchlistCard
            key={x.name}
            name={x.name}
            price={x.price}
            sentiment={x.sentiment}
          />
        ))}
      </div>

      <LockedList
        title="Advanced watchlists"
        items={["Buy Watchlist", "Sell Watchlist"]}
      />
    </section>
  );
}

export default React.memo(WatchlistSignalsSection);


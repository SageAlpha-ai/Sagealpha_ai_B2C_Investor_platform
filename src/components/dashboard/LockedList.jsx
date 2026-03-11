import React from "react";
import { Lock } from "lucide-react";

function LockedList({ title, items }) {
  return (
    <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          {title}
        </h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--hover)] px-2 py-1 text-[10px] font-semibold text-[var(--text-muted)] border border-[var(--border)]">
          <Lock className="w-3.5 h-3.5" />
          Pro
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {items.map((label) => (
          <li
            key={label}
            className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 opacity-70"
          >
            <span className="text-sm font-medium text-[var(--text)]">
              {label}
            </span>
            <Lock className="w-4 h-4 text-[var(--text-muted)]" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(LockedList);


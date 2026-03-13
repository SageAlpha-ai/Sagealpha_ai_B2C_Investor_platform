import React, { useEffect, useMemo, useState } from "react";
import { X, Bell, ArrowUpRight } from "lucide-react";
import CONFIG from "../../config";

export default function AlertsDrawer({ isOpen, onClose }) {
  const base = useMemo(() => CONFIG.API_BASE_URL || "", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchAlerts = async () => {
      const token = localStorage.getItem("sagealpha_token");
      if (!token) {
        setAlerts([]);
        setError("Please sign in to view alerts.");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${base}/api/alerts/user`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) {
          throw new Error(data.message || "Failed to load alerts");
        }
        setAlerts(Array.isArray(data.alerts) ? data.alerts : []);
      } catch (e) {
        setError(e.message || "Failed to load alerts");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [isOpen, base]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const drawerClasses = [
    "fixed inset-y-0 right-0 z-[110] w-full max-w-sm bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ease-out flex flex-col",
    isOpen ? "translate-x-0" : "translate-x-full",
  ].join(" ");

  const overlayClasses = [
    "fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300",
    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
  ].join(" ");

  const statusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "active") {
      return "inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-[10px] font-semibold border border-emerald-200";
    }
    return "inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-2.5 py-0.5 text-[10px] font-semibold border border-slate-200";
  };

  return (
    <>
      <div
        className={overlayClasses}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      />

      <aside className={drawerClasses} aria-label="Stock alerts">
        <header className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-800">
                Stock Alerts
              </h2>
              <p className="text-xs text-slate-500">
                All stocks with active alert subscriptions.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
            aria-label="Close alerts"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {loading && (
            <p className="text-xs text-slate-500">Loading alerts…</p>
          )}

          {!loading && error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-700">
              {error}
            </div>
          )}

          {!loading && !error && alerts.length === 0 && (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No alerts active yet.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Subscribe to alerts from your purchased reports to see them here.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            alerts.length > 0 &&
            alerts.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {a.companyName}
                    {a.ticker && (
                      <span className="text-slate-500 font-normal ml-1">
                        ({a.ticker})
                      </span>
                    )}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={statusBadge(a.status)}>{(a.status || "active").toUpperCase()}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <ArrowUpRight className="w-3 h-3" />
                  View stock
                </button>
              </div>
            ))}
        </div>
      </aside>
    </>
  );
}


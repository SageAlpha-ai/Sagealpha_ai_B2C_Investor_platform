import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FileText,
  Download,
  Eye,
  Loader2,
  BarChart2,
  Bell,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import ReportView from "../components/reports/ReportView";
import StockAlertsModal from "../components/alerts/StockAlertsModal";
import CONFIG from "../config";

function readStoredUser() {
  try {
    const raw = localStorage.getItem("sagealpha_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function MyReports() {
  const navigate = useNavigate();
  const base = useMemo(() => CONFIG.API_BASE_URL || "", []);

  const [user, setUser] = useState(() => readStoredUser());
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewingReport, setViewingReport] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [alertsModalOpen, setAlertsModalOpen] = useState(false);
  const [alertsTarget, setAlertsTarget] = useState(null);
  const [alertsSubmitting, setAlertsSubmitting] = useState(false);
  const [alertsSuccess, setAlertsSuccess] = useState("");
  const [alertsError, setAlertsError] = useState("");
  const [activeAlertsKeys, setActiveAlertsKeys] = useState(() => new Set());

  useEffect(() => {
    const token = localStorage.getItem("sagealpha_token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch(`${base}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Unauthorized");
        localStorage.setItem("sagealpha_user", JSON.stringify(data.user));
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("sagealpha_token");
        localStorage.removeItem("sagealpha_user");
        navigate("/");
      });
  }, [navigate, base]);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("sagealpha_token");
    if (!token) return;

    setLoading(true);
    setError("");

    fetch(`${base}/api/reports/purchased`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) {
          throw new Error(data.message || "Failed to load purchased reports");
        }
        setReports(Array.isArray(data.reports) ? data.reports : []);
      })
      .catch((err) => {
        setError(err.message || "Could not load reports");
        setReports([]);
      })
      .finally(() => setLoading(false));
  }, [user, base]);

  const alertsKeyFor = (r) =>
    `${(r.ticker || "").toUpperCase()}__${(r.companyName || "").toLowerCase()}`;

  const openAlertsModal = (report) => {
    setAlertsTarget(report);
    setAlertsSuccess("");
    setAlertsError("");
    setAlertsModalOpen(true);
  };

  const handleSubscribeAlerts = async () => {
    if (!alertsTarget) return;
    const token = localStorage.getItem("sagealpha_token");
    if (!token) {
      setAlertsError("You need to be signed in to subscribe to alerts.");
      return;
    }

    setAlertsSubmitting(true);
    setAlertsSuccess("");
    setAlertsError("");
    try {
      const res = await fetch(`${base}/api/alerts/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticker: alertsTarget.ticker,
          companyName: alertsTarget.companyName,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to activate alerts");
      }

      setAlertsSuccess(data.message || "Alerts activated for this stock.");
      setAlertsError("");

      const key = alertsKeyFor(alertsTarget);
      setActiveAlertsKeys((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    } catch (e) {
      setAlertsError(e.message || "Failed to activate alerts");
      setAlertsSuccess("");
    } finally {
      setAlertsSubmitting(false);
    }
  };

  const downloadReport = async (reportId) => {
    const token = localStorage.getItem("sagealpha_token");
    if (!token) return;

    setDownloadingId(reportId);
    try {
      const res = await fetch(`${base}/api/reports/download/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || data.error || "Download failed");
      }
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition");
      let filename = "SageAlpha_Report.pdf";
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match) filename = match[1].trim();
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download error:", e);
      setError(e.message || "Download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const recommendationBadge = (rec) => {
    const r = (rec || "").toLowerCase();
    if (r === "bullish")
      return { text: "Bullish", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    if (r === "bearish")
      return { text: "Bearish", className: "bg-rose-50 text-rose-700 border-rose-200" };
    return { text: "Neutral", className: "bg-slate-100 text-slate-700 border-slate-200" };
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Reports</h1>
          <p className="text-slate-500 mt-1">All reports you have purchased. View or download PDF.</p>
        </div>

        {viewingReport && (
          <div className="mb-8">
            <ReportView reportData={viewingReport.reportData} defaultUnlocked />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingReport(null)}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                Back to list
              </button>
            </div>
          </div>
        )}

        {!viewingReport && (
          <>
            {loading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              </div>
            )}

            {!loading && error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && reports.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                <FileText className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-700">No purchased reports yet</p>
                <p className="text-sm text-slate-500 mt-1">
                  Generate a report, unlock it, and complete payment to see it here.
                </p>
                <Link
                  to="/dashboard"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white font-bold py-3 px-6 shadow-md hover:bg-blue-700 transition"
                >
                  <BarChart2 className="w-5 h-5" />
                  Generate New Report
                </Link>
              </div>
            )}

            {!loading && !error && reports.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {reports.map((r) => {
                  const badge = recommendationBadge(r.recommendation);
                  const initial =
                    (r.ticker || r.companyName || "?").toString().trim().charAt(0).toUpperCase() || "?";
                  const alertsKey = alertsKeyFor(r);
                  const alertsActive = activeAlertsKeys.has(alertsKey);
                  return (
                    <div
                      key={r.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg shrink-0">
                          {initial}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-slate-900 truncate">
                            {r.companyName}
                            {r.ticker && (
                              <span className="text-slate-500 font-normal ml-1">({r.ticker})</span>
                            )}
                          </h3>
                          <span
                            className={`inline-flex mt-2 px-2.5 py-1 rounded-lg text-xs font-bold border ${badge.className}`}
                          >
                            {badge.text}
                          </span>
                          <p className="text-xs text-slate-500 mt-2">
                            Purchased: {formatDate(r.purchasedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setViewingReport(r)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                          <Eye className="w-4 h-4" />
                          View Report
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadReport(r.id)}
                          disabled={downloadingId === r.id}
                          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-70"
                        >
                          {downloadingId === r.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download PDF
                        </button>
                        {alertsActive ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 text-emerald-700 px-3 py-2 text-xs font-semibold border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" />
                            Alerts Active
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openAlertsModal(r)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                          >
                            <Bell className="w-4 h-4" />
                            Get Alerts for this Stock
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
      <StockAlertsModal
        isOpen={alertsModalOpen}
        onClose={() => {
          if (!alertsSubmitting) {
            setAlertsModalOpen(false);
            setAlertsTarget(null);
          }
        }}
        onSubscribe={handleSubscribeAlerts}
        ticker={alertsTarget?.ticker}
        companyName={alertsTarget?.companyName}
        isSubmitting={alertsSubmitting}
        successMessage={alertsSuccess}
        errorMessage={alertsError}
      />
    </div>
  );
}

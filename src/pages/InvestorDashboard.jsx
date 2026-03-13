import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, FileText, Star, BrainCircuit, Loader2, ChevronRight, BarChart2 } from "lucide-react";
import Navbar from "../components/Navbar";
import ReportView from "../components/reports/ReportView";
import CONFIG from "../config";

function readStoredUser() {
  try {
    const raw = localStorage.getItem("sagealpha_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function InvestorDashboard() {
  const navigate = useNavigate();
  const base = useMemo(() => CONFIG.API_BASE_URL || "", []);

  const [user, setUser] = useState(() => readStoredUser());
  const [ticker, setTicker] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [recentError, setRecentError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("sagealpha_token");
    if (!token) {
      navigate("/");
      return;
    }

    // Verify token with backend (source of truth)
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

  // Fetch recent reports once user is verified
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("sagealpha_token");
    if (!token) return;

    fetch(`${base}/api/reports/recent`, {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) {
          throw new Error(data.message || "Failed to load recent reports");
        }
        setRecentReports(Array.isArray(data.reports) ? data.reports : []);
        setRecentError("");
      })
      .catch((err) => {
        console.error("Recent reports error:", err);
        setRecentError(err.message || "Could not load recent reports");
      });
  }, [user, base]);

  if (!user) return null;

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!ticker) {
      setError("Please enter a company name or ticker");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const token = localStorage.getItem("sagealpha_token");
      const res = await fetch(`${base}/api/report/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ query: String(ticker).trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to generate report");
      }

      console.debug("AI report data (dashboard)", data.report);
      setReport(data.report || null);
      setReportId(data.reportId || null);
      setTicker("");
    } catch (err) {
      setError(err.message || "Unable to generate report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const STATS = [
    { label: "Reports Generated", value: "12", icon: <FileText className="w-5 h-5" />, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Stocks Analyzed", value: "4", icon: <Star className="w-5 h-5" />, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "AI Insights Viewed", value: "38", icon: <BrainCircuit className="w-5 h-5" />, color: "text-violet-500", bg: "bg-violet-50" },
  ];

  const formatReportDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const now = new Date();
    const isSameDay = d.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = d.toDateString() === yesterday.toDateString();
    if (isSameDay) {
      return "Today";
    }
    if (isYesterday) {
      return "Yesterday";
    }
    return d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const verdictBadge = (verdict) => {
    const v = (verdict || "").toLowerCase();
    if (v === "bullish") {
      return { text: "Bullish", className: "bg-green-50 text-green-700" };
    }
    if (v === "bearish") {
      return { text: "Bearish", className: "bg-red-50 text-red-700" };
    }
    return { text: "Neutral", className: "bg-slate-100 text-slate-700" };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, {user.name}</h1>
            <p className="text-slate-500 mt-1">Here is the latest overview of your portfolio and reports.</p>
          </div>
          <Link
            to="/my-reports"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <FileText className="w-4 h-4" />
            My Reports
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <h2 className="text-lg font-bold text-slate-800 mb-2">New Analysis</h2>
            <form onSubmit={handleGenerate} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  placeholder="Enter company name or ticker (e.g. INFY, ZOMATO)"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-sm font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-blue-500/20"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart2 className="w-5 h-5" />}
                <span className="hidden sm:inline">Generate AI Report</span>
                <span className="sm:hidden">Generate</span>
              </button>
            </form>
            {error && (
              <p className="mt-2 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>

        {report && (
          <div className="mb-8">
            <ReportView reportData={report} reportId={reportId} />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => { setReport(null); setReportId(null); }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Reports</h2>
            <div className="flex flex-col gap-3">
              {recentError && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {recentError}
                </div>
              )}
              {!recentError && recentReports.length === 0 && (
                <div className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                  No reports generated yet.
                </div>
              )}
              {recentReports.map((r) => {
                const badge = verdictBadge(r.verdict);
                const letter =
                  (r.ticker || r.companyName || "?").toString().trim().charAt(0).toUpperCase() || "?";
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      if (r.reportData) {
                        setReport(r.reportData);
                        setReportId(r.id);
                      }
                    }}
                    className="group bg-white text-left rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                        {letter}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {r.ticker}
                        </h3>
                        <p className="text-xs text-slate-500">{r.companyName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-semibold text-slate-400">
                        {formatReportDate(r.createdAt)}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${badge.className}`}
                      >
                        {badge.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Basic Stats</h2>
            <div className="grid grid-cols-1 gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</h3>
                    <p className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


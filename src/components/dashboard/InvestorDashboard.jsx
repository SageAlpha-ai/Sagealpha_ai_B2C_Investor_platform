import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupPopup from "../auth/SignupPopup";
import {
  Sparkles,
  Bookmark,
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart2,
  ShieldAlert,
  FileSearch,
  BrainCircuit,
  ChevronRight,
  Search,
  Zap,
  Star,
  Quote,
  BadgeCheck,
  Users,
  FileText,
  ThumbsUp,
  Loader2,
} from "lucide-react";
import CONFIG from "../../config";
import Navbar from "../Navbar";

const PAIN_POINTS = [
  {
    icon: <FileSearch className="w-5 h-5" />,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-100 dark:border-violet-800/40",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    title: "Too many filings to read",
    desc: "Annual reports, quarterly results, con-calls — it's a full-time job just keeping up.",
  },
  {
    icon: <ShieldAlert className="w-5 h-5" />,
    color: "from-rose-500 to-red-600",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-100 dark:border-rose-800/40",
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    title: "Hard to spot hidden risks",
    desc: "Debt covenants, promoter pledging, sector headwinds — risks hide in plain sight.",
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-100 dark:border-amber-800/40",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "Valuation is confusing",
    desc: "P/E, EV/EBITDA, DCF — every analyst gives a different number, who do you trust?",
  },
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-100 dark:border-sky-800/40",
    iconBg: "bg-sky-100 dark:bg-sky-900/50",
    iconColor: "text-sky-600 dark:text-sky-400",
    title: "Emotional decision-making",
    desc: "Fear and greed cloud judgement. Most investors buy high and sell low without realising it.",
  },
];

const SUCCESS_STORIES = [
  {
    name: "Mangesh Jadhav",
    role: "Retail Investor",
    location: "Pune",
    avatar: "RS",
    avatarColor: "from-blue-500 to-indigo-600",
    rating: 5,
    featured: true,
    tag: "Time Saved",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    headline: "Cut my research time from 3 hours to 15 minutes",
    review:
      "I live in a tier-2 city, and we do not really get professional financial experts around us. Most of my friends are using random WhatsApp messages for stock recommendations, and to be honest, all of us have ended up losing money because there is no proper research done behind those messages. The thing I like about this platform is that it actually gives real insights and data, so I can understand why I’m putting my money into a particular stock rather than blindly following someone’s advice. ",
    stock: "TITAN",
    outcome: "Avoided ₹80,000 loss",
    outcomeColor: "text-green-600 dark:text-green-400",
    date: "February 2026",
    helpful: 47,
  },
  {
    name: "Priya Mehta",
    role: "SEBI-Registered Advisor",
    location: "Mumbai",
    avatar: "PM",
    avatarColor: "from-rose-500 to-pink-600",
    rating: 5,
    featured: false,
    tag: "Professional Use",
    tagColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
    headline: "My clients actually trust my recommendations now",
    review: "Being in a small advisory for HNI clients means I cannot afford to be wrong. SageAlpha’s breakdown of valuation and bull/bear case is precisely what I present to clients when explaining my rationale for holding a particular stock. The Bajaj Finance report literally prevented my client from averaging into a stock at the worst time. Honestly institutional grade output.",
    stock: "BAJFINANCE",
    outcome: "Retained 3 key clients",
    outcomeColor: "text-blue-600 dark:text-blue-400",
    date: "January 2026",
    helpful: 31,
  },
  {
    name: "Vikram Nair",
    role: "Software Engineer & Investor",
    location: "Bengaluru",
    avatar: "VN",
    avatarColor: "from-emerald-500 to-teal-600",
    rating: 5,
    featured: false,
    tag: "First-time Buyer",
    tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    headline: "Finally understand what I'm actually buying",
    review: "I’ve been investing for 2 years now, but to be honest with everyone, I was basically just following Twitter and YouTube. Ran a report for my clients on Zomato when everyone was calling it. And lo and behold, SageAlpha’s report clearly laid out how Zomato would achieve profitability and how the risk was already priced in. I was able to actually invest in it with conviction instead of FOMO and it’s gone up 34% for me.",
    stock: "ZOMATO",
    outcome: "+34% in 6 months",
    outcomeColor: "text-green-600 dark:text-green-400",
    date: "December 2025",
    helpful: 62,
  },
  {
    name: "Rujay Taywade",
    role: "Portfolio Manager",
    location: "New Delhi",
    avatar: "AD",
    avatarColor: "from-amber-500 to-orange-600",
    rating: 5,
    featured: true,
    tag: "Risk Avoidance",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    headline: "The promoter pledging flag saved us from a 40% drawdown",
    review:
      "Earlier, I used to follow random opinions from the internet for my portfolio, and it always seemed like a game of guesswork. But now, with SageAlpha.ai, I get proper analysis done rather than just price charts. It gives a proper idea of whether a stock is good to invest in or not, which gives me a sense of confidence.",
    stock: "Mid-cap (NDA)",
    outcome: "Avoided 38% drawdown",
    outcomeColor: "text-green-600 dark:text-green-400",
    date: "November 2025",
    helpful: 89,
  },
  {
    name: "Sanjay Gupta",
    role: "Business Owner",
    location: "Hyderabad",
    avatar: "SG",
    avatarColor: "from-violet-500 to-purple-600",
    rating: 4,
    featured: false,
    tag: "Long-term Investing",
    tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
    headline: "Switched from FDs to equities — finally feel confident",
    review:
      "I'm 55 and always thought the stock market was gambling. A friend suggested I try SageAlpha on an ITC report. The way it laid out the dividend history, cash flows and downside risks in plain English — I actually understood it. I've moved 30% of my FD corpus into quality stocks over the last 6 months.",
    stock: "ITC",
    outcome: "Portfolio up 18% YTD",
    outcomeColor: "text-green-600 dark:text-green-400",
    date: "January 2026",
    helpful: 28,
  },
  {
    name: "Deepa Krishnamurthy",
    role: "Chartered Accountant",
    location: "Chennai",
    avatar: "DK",
    avatarColor: "from-sky-500 to-cyan-600",
    rating: 5,
    featured: false,
    tag: "Deep Analysis",
    tagColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
    headline: "As a CA I'm picky about financial analysis — this passed",
    review:
      "I scrutinise financial data for a living, so I was sceptical. But the debt maturity analysis and working capital cycle breakdown on the HDFC Bank report was genuinely solid. Not just ratios — it gave context. The only thing I'd add is a management quality scorecard. Overall, it saves me 2 hours per stock.",
    stock: "HDFCBANK",
    outcome: "2 hrs saved per stock",
    outcomeColor: "text-blue-600 dark:text-blue-400",
    date: "February 2026",
    helpful: 41,
  },
];

const STATS = [
  { icon: <Users className="w-5 h-5" />, value: "12,400+", label: "Investors trust us", color: "text-blue-600 dark:text-blue-400" },
  { icon: <FileText className="w-5 h-5" />, value: "85,000+", label: "Reports generated", color: "text-violet-600 dark:text-violet-400" },
  { icon: <Star className="w-5 h-5" />, value: "4.8 / 5", label: "Average rating", color: "text-amber-500" },
  { icon: <ThumbsUp className="w-5 h-5" />, value: "96%", label: "Would recommend", color: "text-emerald-600 dark:text-emerald-400" },
];

async function generateStockReport(ticker) {
  const base = CONFIG.API_BASE_URL || "";
  const res = await fetch(`${base}/api/ai/generate-report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticker: String(ticker).trim() }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to generate report");
  return data;
}

function InvestorDashboard() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [reportData, setReportData] = useState(null);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    const token = localStorage.getItem('sagealpha_token');
    if (!token) {
      setIsSignupOpen(true);
      return;
    }

    setReportError("");
    setIsReportLoading(true);
    try {
      const data = await generateStockReport(value);
      setReportData(data);
    } catch (err) {
      setReportError(err.message || "Could not generate report. Please try again.");
    } finally {
      setIsReportLoading(false);
    }
  };

  const handleQuickPick = (t) => {
    const token = localStorage.getItem('sagealpha_token');
    if (!token) {
      setInput(t);
      setIsSignupOpen(true);
      return;
    }

    setInput(t);
    setReportError("");
    setIsReportLoading(true);
    generateStockReport(t)
      .then((data) => {
        setReportData(data);
      })
      .catch((err) => {
        setReportError(err.message || "Could not generate report.");
      })
      .finally(() => setIsReportLoading(false));
  };

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSuccess={() => navigate('/dashboard')}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-6 sm:pb-8">



        {/* ── Hero Research Block ── */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
          {/* gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />
          {/* subtle texture dots */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* glow blobs */}
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />

          <div className="relative px-6 sm:px-10 py-10 sm:py-14 flex flex-col items-center text-center">
            {/* badge */}
            <div className="inline-flex items-center gap-2  px-3 py-1.5 mb-5">
              {/* <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> */}
              <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
                AI-Powered Research
              </span>
            </div>

            {/* big heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5 max-w-2xl mx-auto">
              Confused about{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-yellow-300">a stock?</span>
                {/* <span className="absolute -bottom-1 left-0 right-0 h-2 bg-yellow-400/30 rounded-full" /> */}
              </span>
            </h1>

            {/* problems list */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-8 w-full max-w-3xl mx-auto text-[13px] sm:text-[15px] text-white font-medium tracking-wide">
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3">
                <span className="text-blue-300/50 text-[10px] sm:text-xs">●</span>
                <span>Don't know how to research</span>
                <span className="text-blue-300/50 text-[10px] sm:text-xs">●</span>
                <span>Don't know how to evaluate</span>
                <span className="text-blue-300/50 text-[10px] sm:text-xs hidden sm:inline-block">●</span>
                <span className="hidden sm:inline-block">Panic due to crash</span>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3">
                <span className="sm:hidden">Panic due to crash</span>
                <span className="sm:hidden text-blue-300/50 text-[10px] sm:text-xs">●</span>
                {/* <span>Fear of missing out</span>
                <span className="text-blue-300/50 text-[10px] sm:text-xs">●</span>
                <span>No confidence & experience</span>
                <span className="text-blue-300/50 text-[10px] sm:text-xs">●</span>
                <span>No allocation time</span> */}
              </div>
            </div>
            <p className="text-base sm:text-lg text-white/80 font-medium max-w-xl mb-8 leading-relaxed mx-auto">
              Enter a company name or ticker and get an{" "}
              <span className="text-white/80 font-semibold">AI-powered equity report</span>{" "}
              on fundamentals, risks, valuation &amp; more, in seconds.
            </p>

            {/* search bar */}
            <form onSubmit={handleGenerateReport} className="flex flex-col sm:flex-row gap-3 max-w-2xl w-full mx-auto justify-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Try: TCS, Reliance, HDFC Bank, INFY…"
                  className="w-full rounded-xl border-0 bg-white/95 dark:bg-white/90 pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-white/60 shadow-md"
                />
              </div>
              <button
                type="submit"
                disabled={isReportLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] transition px-6 py-3.5 text-sm font-extrabold text-black shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isReportLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                Generate Report
              </button>
            </form>

            {/* quick picks */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {/* <span className="text-xs text-white font-medium">Quick picks:</span> */}
              {["RELIANCE", "TCS", "HDFCBANK", "INFY", "BAJFINANCE"].map((t) => (
                <button
                  key={t}
                  type="button"
                  disabled={isReportLoading}
                  onClick={() => handleQuickPick(t)}
                  className="hover:bg-white/20 border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 transition disabled:opacity-60"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Report error ── */}
        {reportError && (
          <div className="mb-6 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50/80 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {reportError}
          </div>
        )}

        {/* ── Generated Report (inline) ── */}
        {reportData ? (
          <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="text-base sm:text-lg font-extrabold text-[var(--text)]">
                AI Report Preview
              </h2>
              <button
                type="button"
                onClick={() => setReportData(null)}
                className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition"
              >
                Clear
              </button>
            </div>
            <pre className="text-xs whitespace-pre-wrap break-words text-[var(--text-muted)] leading-relaxed">
              {JSON.stringify(reportData, null, 2)}
            </pre>
          </div>
        ) : null}

        {/* ── Pain Points Section ── */}


        {/* ── Success Stories ── */}
        <SuccessStoriesSection />

        {/* ── Firm Logos Carousel ── */}
        <FirmLogosSection />


      </div>
    </div>
  );
}

function PremiumFeatureCard({ title, icon, cta }) {
  return (
    <div className="relative rounded-2xl bg-white dark:bg-slate-900 overflow-hidden group shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="absolute inset-0 opacity-30 dark:opacity-20 grayscale transition-all duration-500 pointer-events-none p-6 flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div>
                <div className="w-20 h-3 bg-slate-200 dark:bg-slate-700 rounded mb-1.5" />
                <div className="w-12 h-2 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            </div>
            <div className="w-16 h-5 bg-green-200 dark:bg-green-900/30 rounded" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 backdrop-blur-[3px] bg-white/70 dark:bg-slate-950/70" />

      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center h-full min-h-[250px]">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg font-black text-[var(--text)] mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 max-w-[220px] leading-relaxed">
          Available exclusively for authenticated investors.
        </p>
        <button className="flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-xs sm:text-sm font-extrabold shadow-sm active:scale-95 transition-all outline-none">
          {cta}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function TimelineCard({ category, time, title, description, ticker, price, change, changeType, tag }) {
  const isDown = changeType === "down";
  return (
    <div className="relative group pl-6 sm:pl-8">
      <div className="absolute left-[-5px] sm:left-[-1px] top-6 w-3 h-3 bg-white dark:bg-slate-950 border-2 border-[var(--accent)] rounded-full z-10 group-hover:scale-[1.3] transition-transform shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" />

      <div className="rounded-2xl bg-[var(--card-bg)] p-5 sm:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block rounded-md bg-blue-50 dark:bg-blue-900/40 text-[var(--accent)] text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
              {tag}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {time}
            </span>
          </div>
        </div>

        <h3 className="text-base font-extrabold text-[var(--text)] leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-[var(--text)] bg-[var(--hover)] rounded-md px-2 py-1.5">
              {ticker}
            </span>
            <span className="text-xs font-bold text-[var(--text)]">₹{price}</span>
            <span className={`flex items-center gap-1 text-xs font-bold ${isDown ? "text-red-500" : "text-green-500"}`}>
              {isDown ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
              {change}
            </span>
          </div>
          <button
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--hover)] transition-colors"
            aria-label="Bookmark"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-3.5 h-3.5 ${n <= count ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ story, size = "normal" }) {
  const isFeatured = size === "featured";
  return (
    <div
      className={`relative rounded-xl flex flex-col bg-[var(--card-bg)] shadow-sm hover:shadow-lg transition-all duration-200 group
        ${isFeatured ? "p-6 sm:p-7" : "p-5"}`}
    >


      {/* tag */}
      {/* <span className={`inline-flex self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold mb-3 ${story.tagColor}`}>
        {story.tag}
      </span> */}

      {/* headline */}
      {/* <h3 className={`font-extrabold text-[var(--text)] leading-snug mb-3 ${isFeatured ? "text-base sm:text-lg" : "text-sm"}`}>
        "{story.headline}"
      </h3> */}

      {/* review text */}
      <p className={`text-black leading-relaxed flex-grow ${isFeatured ? "text-sm" : "text-xs"}`}>
        {story.review}
      </p>

      {/* outcome pill */}
      <div className="mt-4 mb-4 flex items-center gap-2">
        <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">Result:</span>
        <span className={`text-xs font-extrabold ${story.outcomeColor}`}>{story.outcome}</span>
        <span className="text-[10px] text-[var(--text-muted)]">· {story.stock}</span>
      </div>

      {/* divider */}
      <div className="border-t border-[var(--border)] pt-4 flex items-center justify-between gap-3">
        {/* avatar + name */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${story.avatarColor} flex items-center justify-center text-white text-[11px] font-extrabold flex-shrink-0 shadow`}>
            {story.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[12px] font-bold text-[var(--text)]">{story.name}</p>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">{story.role} · {story.location}</p>
          </div>
        </div>

        {/* <div className="flex flex-col items-end gap-1">
          <StarRating count={story.rating} />
          <span className="text-[10px] text-[var(--text-muted)]">{story.date}</span>
        </div> */}
      </div>

      {/* helpful count */}
      {/* <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
        <ThumbsUp className="w-3 h-3" />
        <span>{story.helpful} people found this helpful</span>
      </div> */}
    </div>
  );
}

function SuccessStoriesSection() {
  const featured = SUCCESS_STORIES.filter((s) => s.featured);
  const regular = SUCCESS_STORIES.filter((s) => !s.featured);

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          {/* <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 px-3 py-1 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Verified Reviews</span>
          </div> */}
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text)] leading-tight">
            Success Stories.{" "}
            {/* <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Real results.
            </span> */}
          </h2>
          {/* <p className="mt-1.5 text-sm text-[var(--text-muted)] max-w-lg">
            Don't take our word for it. Here's what investors across India say after using SageAlpha reports to make smarter decisions.
          </p> */}
        </div>

        {/* aggregate rating badge */}
        {/* <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-violet-700 rounded-2xl px-5 py-4 text-white shadow-md text-center min-w-[130px]">
          <p className="text-3xl font-black leading-none">4.8</p>
          <StarRating count={5} />
          <p className="text-[10px] text-white/70 mt-1">from 1,200+ reviews</p>
        </div> */}
      </div>

      {/* Social proof stats bar */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] py-4 shadow-sm"
          >
            <div className={`${s.color}`}>{s.icon}</div>
            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-[var(--text-muted)] text-center leading-tight px-2">{s.label}</p>
          </div>
        ))}
      </div> */}

      {/* Featured reviews — 2 large cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {featured.map((story, i) => (
          <ReviewCard key={i} story={story} size="featured" />
        ))}
      </div>

      {/* Regular reviews — 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regular.slice(0, 2).map((story, i) => (
          <ReviewCard key={i} story={story} size="featured" />
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-base font-extrabold text-white">Join 12,400+ investors making smarter decisions</p>
          {/* <p className="text-sm text-slate-400 mt-0.5">Your first AI report is free. No credit card needed.</p> */}
        </div>
        <button
          type="button"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] transition px-6 py-3 text-sm font-extrabold text-slate-900 shadow"
        >
          <Sparkles className="w-4 h-4" />
          Try Free Report
        </button>
      </div>
    </section>
  );
}

function FirmLogosSection() {
  const logos = [
    { name: "Deloitte", url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg" },
    { name: "D E Shaw & Co", url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/D._E._Shaw_%26_Co._logo.svg" },
    { name: "Morgan Stanley", url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Morgan_Stanley_Logo_1.svg" },
    { name: "Vanguard", url: "https://upload.wikimedia.org/wikipedia/commons/4/47/The_Vanguard_Group_logo.svg" },
    { name: "Goldman Sachs", url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Goldman_Sachs.svg" },
    { name: "BlackRock", url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/BlackRock_logo.svg" },
    { name: "JPMorgan", url: "https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg" },
  ];

  return (
    <section className="py-12 pb-20 w-full overflow-hidden">
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="text-center mb-10">
        <h3 className="text-lg font-bold text-[var(--text)]">Used by Investment Professionals at Top Firms</h3>
      </div>

      {/* Marquee Wrapper with fading edges */}
      <div className="relative w-full max-w-5xl mx-auto flex items-center">
        {/* Fading left/right masks */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div
          className="flex w-max shrink-0 gap-12 sm:gap-20 items-center justify-center animate-[infinite-scroll_40s_linear_infinite]"
        >
          {/* Render logos directly - first pass */}
          {logos.map((logo, i) => (
            <img
              key={`logo1-${i}`}
              src={logo.url}
              alt={logo.name}
              className="h-6 sm:h-8 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
          {/* Render logos directly - duplicate for seamless loop */}
          {logos.map((logo, i) => (
            <img
              key={`logo2-${i}`}
              src={logo.url}
              alt={logo.name}
              className="h-6 sm:h-8 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InvestorDashboard;

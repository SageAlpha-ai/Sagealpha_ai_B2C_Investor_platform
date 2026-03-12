import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Star, BrainCircuit, Loader2, ChevronRight, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navbar';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ticker, setTicker] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('sagealpha_token');
        const userData = localStorage.getItem('sagealpha_user');

        if (!token || !userData) {
            navigate('/');
            return;
        }

        try {
            setUser(JSON.parse(userData));
        } catch (e) {
            navigate('/');
        }
    }, [navigate]);

    if (!user) return null;

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!ticker) return;
        setIsLoading(true);
        // Simulate generation for now or redirect logic
        setTimeout(() => {
            setIsLoading(false);
            alert(`Report generated for ${ticker}! (Integration required)`);
            setTicker('');
        }, 1500);
    };

    const STATS = [
        { label: 'Reports Generated', value: '12', icon: <FileText className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Watchlist Stocks', value: '4', icon: <Star className="w-5 h-5" />, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'AI Insights Viewed', value: '38', icon: <BrainCircuit className="w-5 h-5" />, color: 'text-violet-500', bg: 'bg-violet-50' },
    ];

    const RECENT_REPORTS = [
        { ticker: 'RELIANCE', name: 'Reliance Industries Ltd.', date: 'Today, 10:45 AM', sentiment: 'Bullish' },
        { ticker: 'TCS', name: 'Tata Consultancy Services', date: 'Yesterday', sentiment: 'Neutral' },
        { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd.', date: 'Mar 1, 2026', sentiment: 'Bullish' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {/* Header / Greeting */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome back, {user.name}
                    </h1>
                    <p className="text-slate-500 mt-1">Here is the latest overview of your portfolio and reports.</p>
                </div>

                {/* Action Bar (Search & Generate) */}
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
                                    placeholder="Enter ticker (e.g. INFY, ZOMATO)"
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
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area (Recent Reports) */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Reports</h2>
                        <div className="flex flex-col gap-3">
                            {RECENT_REPORTS.map((report, i) => (
                                <div key={i} className="group bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                                            {report.ticker.slice(0, 1)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{report.ticker}</h3>
                                            <p className="text-xs text-slate-500">{report.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs font-semibold text-slate-400">{report.date}</span>
                                        <span className="inline-flex px-2 py-1 rounded bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                                            {report.sentiment}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <button className="flex items-center justify-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 mt-2 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition">
                                View all reports <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Area (Quick Stats) */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Stats</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {STATS.map((stat, i) => (
                                <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                        {stat.icon}
                                    </div>
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

export default Dashboard;

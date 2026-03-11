import React from 'react';
import { Sparkles, Crown } from 'lucide-react';

export default function PlanBanner() {
    return (
        <div className="bg-gradient-to-r from-fintech-blue to-[#4f80f1] rounded-2xl p-6 mb-8 text-white shadow-lg shadow-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

            <div className="flex items-center gap-5 z-10 w-full md:w-auto">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 border border-white/30">
                    <Sparkles className="text-white" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1">You're enjoying Standard Plan</h2>
                    <p className="text-blue-100 font-medium">Full access to deep data & portfolio analytics</p>
                </div>
            </div>

            <button className="z-10 bg-white text-fintech-blue hover:bg-slate-50 transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm w-full md:w-auto justify-center">
                <Crown size={18} className="text-amber-500" />
                Get Professional
            </button>
        </div>
    );
}

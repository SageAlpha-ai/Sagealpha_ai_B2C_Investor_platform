import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DashboardHeader() {
    return (
        <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Good afternoon, VSTechs!
            </h1>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium rounded-full shrink-0 shadow-sm">
                <AlertTriangle size={16} className="text-amber-600" />
                Complete your profile to collect your first badge.
            </div>
        </div>
    );
}

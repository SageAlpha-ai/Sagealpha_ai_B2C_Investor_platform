import React from 'react';

export default function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col justify-between hover:shadow-md transition-shadow cursor-default h-full min-h-[160px]">
            <div>
                <h4 className="text-slate-500 font-medium text-sm mb-2">{title}</h4>
                <div className="text-5xl font-extrabold text-slate-900 tracking-tighter">
                    {value}
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    {icon}
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { year: '2020', value: 1000 },
    { year: '2021', value: 1200 },
    { year: '2022', value: 1100 },
    { year: '2023', value: 1600 },
    { year: '2024', value: 2100 },
    { year: '2025', value: 2400 },
];

export default function ForecastChartCard() {
    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col items-center justify-between h-full w-full min-h-[400px]">

            <div className="w-full bg-slate-50/50 rounded-2xl p-6 border border-slate-100 mb-8">
                <h3 className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Forecasting</h3>

                <div className="h-[180px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 0 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="text-center w-full max-w-sm">
                <p className="text-slate-600 mb-6 text-lg">Connect your portfolio and start asking questions to AI.</p>
                <button className="bg-fintech-blue hover:bg-fintech-dark text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-blue-500/20 w-auto hover:-translate-y-0.5">
                    Upgrade & Connect
                </button>
            </div>

        </div>
    );
}

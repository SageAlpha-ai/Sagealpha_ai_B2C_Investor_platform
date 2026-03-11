import React from 'react';
import StatCard from './StatCard';
import {
    Wand2,
    Rocket,
    Bookmark,
    BookOpen,
    FolderOpen,
    Monitor
} from 'lucide-react';

export default function StatsGrid() {
    const stats = [
        { title: 'AI Prompts', value: '0', icon: <Wand2 size={20} /> },
        { title: 'Stocks Researched', value: '0', icon: <Rocket size={20} /> },
        { title: 'Watchlisted Stocks', value: '0', icon: <Bookmark size={20} /> },
        { title: 'Stories Read', value: '0', icon: <BookOpen size={20} /> },
        { title: 'Buckets Visited', value: '0', icon: <FolderOpen size={20} /> },
        { title: 'Screens Created', value: '0', icon: <Monitor size={20} /> },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 h-full">
            {stats.map((stat, i) => (
                <StatCard
                    key={i}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                />
            ))}
        </div>
    );
}

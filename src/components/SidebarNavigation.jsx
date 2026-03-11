import React, { useState } from 'react';
import {
    MessageSquarePlus,
    LineChart,
    MessageCircle,
    ShieldCheck,
    ShieldAlert,
    Briefcase,
    Search,
    Bell,
    Moon,
    PanelLeftClose,
    PanelLeftOpen,
    MessageSquare
} from 'lucide-react';

export default function SidebarNavigation({ isCollapsed, setIsCollapsed }) {
    return (
        <div className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between ${isCollapsed ? 'w-20' : 'w-64'} z-50`}>
            <div className="flex flex-col h-full overflow-y-auto">
                <div className="p-4 flex items-center justify-between border-b border-slate-100 h-[73px]">
                    {!isCollapsed && (
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fintech-dark to-fintech-blue">
                            SageAlpha<span className="text-slate-400 font-medium text-sm">.ai</span>
                        </div>
                    )}
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 mx-auto">
                        {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                    </button>
                </div>

                <div className="flex-1 py-4 px-3 flex flex-col gap-1">
                    <button className={`flex items-center gap-3 p-3 rounded-xl bg-fintech-blue text-white hover:bg-fintech-dark transition-colors ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
                        <MessageSquarePlus size={20} />
                        {!isCollapsed && <span className="font-medium">New Chat</span>}
                    </button>

                    <div className="mt-4 flex flex-col gap-1">
                        <NavItem icon={<LineChart size={20} />} label="Research AI" isCollapsed={isCollapsed} active />
                        <NavItem icon={<MessageCircle size={20} />} label="Market Chatter" isCollapsed={isCollapsed} />
                        <NavItem icon={<ShieldCheck size={20} />} label="Compliance" isCollapsed={isCollapsed} />
                        <NavItem icon={<ShieldAlert size={20} />} label="Defender AI" isCollapsed={isCollapsed} />
                        <NavItem icon={<Briefcase size={20} />} label="Portfolio" isCollapsed={isCollapsed} />
                    </div>

                    <div className="mt-6 mb-4 px-1">
                        {isCollapsed ? (
                            <button className="w-full p-2 flex justify-center text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
                                <Search size={20} />
                            </button>
                        ) : (
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search chats..."
                                    className="w-full bg-slate-100 text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-fintech-blue/20 transition-all placeholder:text-slate-400"
                                />
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <div className="flex flex-col gap-1 text-slate-500">
                            <span className="px-3 text-xs font-semibold tracking-wider text-slate-400 mb-2 uppercase">Recent Chats</span>
                            <RecentChatItem label="research on tata" />
                            <RecentChatItem label="apple q3 earnings" />
                            <RecentChatItem label="nvidia growth potential" />
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-slate-100 p-3 flex flex-col gap-1">
                <NavItem icon={<Bell size={20} />} label="Alerts" isCollapsed={isCollapsed} />
                <NavItem icon={<Moon size={20} />} label="Dark Mode" isCollapsed={isCollapsed} />

                <div className={`mt-2 flex items-center p-2 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <div className="w-9 h-9 rounded-full bg-fintech-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                        VS
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold text-slate-900 truncate">VSTechs</span>
                            <span className="text-xs text-slate-500 truncate">user@vstechs.com</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function NavItem({ icon, label, isCollapsed, active }) {
    return (
        <button className={`flex items-center gap-3 p-3 text-sm rounded-xl transition-colors ${active ? 'text-slate-900 bg-slate-50 font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'} ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
            {icon}
            {!isCollapsed && <span>{label}</span>}
        </button>
    );
}

function RecentChatItem({ label }) {
    return (
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors w-full text-left truncate">
            <MessageSquare size={16} className="shrink-0 text-slate-400" />
            <span className="truncate">{label}</span>
        </button>
    );
}

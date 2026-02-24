'use client';

import { Search, Bell, Plus } from 'lucide-react';

export default function Header() {
    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar agendamento ou paciente..."
                    className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 transition-all outline-none"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl transition-all relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
                </button>
                <button
                    onClick={() => window.openBookingModal?.()}
                    className="bg-[#0088C8] hover:bg-[#0077b0] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#0088C8]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    Novo Agendamento
                </button>
            </div>
        </header>
    );
}

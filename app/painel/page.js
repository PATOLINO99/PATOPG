'use client';

import {
    Users,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle2,
    TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardHome() {
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [appRes, statsRes] = await Promise.all([
                    fetch('/api/appointments'),
                    fetch('/api/stats')
                ]);
                const appData = await appRes.json();
                const statsData = await statsRes.json();
                setAppointments(Array.isArray(appData) ? appData : []);
                setStats(statsData);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#0088C8] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm">Bem-vindo ao centro de controle da sua clínica.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Mensal"
                    value={`R$ ${(stats?.totalFaturado || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    trend="+12.5%"
                    icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
                />
                <StatCard
                    title="Agendamentos"
                    value={appointments.length}
                    trend="+5 hoje"
                    icon={<CalendarIcon className="w-5 h-5 text-blue-500" />}
                />
                <StatCard
                    title="Em Aberto"
                    value={appointments.filter(a => a.status === 'booked').length}
                    trend="Ação requerida"
                    icon={<Clock className="w-5 h-5 text-amber-500" />}
                />
                <StatCard
                    title="Finalizados"
                    value={appointments.filter(a => a.status === 'confirmed').length}
                    trend="Sucesso"
                    icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                />
            </div>

            {/* Performance Chart */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black text-gray-900">Desempenho Comercial</h3>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Evolução do faturamento (últimos 7 dias)</p>
                    </div>
                </div>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.graficoVendas || []}>
                            <defs>
                                <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0088C8" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#0088C8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="data" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }} />
                            <Area type="monotone" dataKey="valor" stroke="#0088C8" strokeWidth={3} fill="url(#primaryGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, icon }) {
    return (
        <div className="bg-white border border-gray-200 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#0088C8]/10 group-hover:scale-110 transition-all duration-300">{icon}</div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {trend}
                </span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight">{value}</p>
        </div>
    );
}

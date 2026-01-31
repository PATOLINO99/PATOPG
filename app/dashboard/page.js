'use client';


import { useEffect, useState } from 'react';
import { DollarSign, Users, TrendingUp, Clock, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatusBadge = ({ status }) => {
    const colors = {
        'Aprovado': 'bg-green-500/20 text-green-400 border-green-500/50',
        'Pendente': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        'Cancelado': 'bg-red-500/20 text-red-400 border-red-500/50',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/50'}`}>
            {status}
        </span>
    );
};

export default function DashboardStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/stats')
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setStats(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError('Erro ao carregar dados');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Carregando Dashboard Premium...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            ZapScale Dashboard
                        </h1>
                        <p className="text-gray-400 font-medium">Análise estratégica de faturamento real</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        Últimos 7 dias
                    </div>
                </div>

                {/* Cards de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Faturado</h3>
                        <p className="text-3xl font-extrabold text-white">
                            R$ {stats?.totalFaturado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 shadow-xl group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total de Leads</h3>
                        <p className="text-3xl font-extrabold text-white">{stats?.leads?.length || 0}</p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 shadow-xl group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Leads Pendentes</h3>
                        <p className="text-3xl font-extrabold text-white">
                            {stats?.leads?.filter(l => l.status_pagamento === 'Pendente').length || 0}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 shadow-xl group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Conversão Aprovada</h3>
                        <p className="text-3xl font-extrabold text-white">
                            {stats?.leads?.filter(l => l.status_pagamento === 'Aprovado').length || 0}
                        </p>
                    </div>
                </div>

                {/* Gráfico de Vendas */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 mb-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Desempenho de Vendas</h2>
                        <p className="text-xs text-blue-400 font-semibold bg-blue-500/10 px-2 py-1 rounded">AO VIVO</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.graficoVendas || []}>
                                <defs>
                                    <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis
                                    dataKey="data"
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `R$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                                    itemStyle={{ color: '#3b82f6' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="valor"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValor)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tabela de Leads */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Últimos Leads Registrados</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/50 text-gray-400">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Nome do Cliente</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Origem</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Valor da Venda</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Status Atual</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-right">Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {stats?.leads?.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-800/40 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold group-hover:text-blue-400 transition-colors">{lead.nome}</span>
                                                <span className="text-xs text-gray-500">{lead.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-medium">
                                            {lead.origem}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">
                                            R$ {parseFloat(lead.valor_venda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={lead.status_pagamento} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right font-mono">
                                            {new Date(lead.data_criacao).toLocaleDateString('pt-BR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

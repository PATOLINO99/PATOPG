'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/simples-agenda/Navbar';
import { ThemedTable, ThemedField } from '@/components/simples-agenda/DashboardComponents';
import { LayoutGrid, Users, Calendar, Plus, Search, Filter, ArrowRight } from 'lucide-react';

export default function SimplesDashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                setLeads(data.leads || []);
                setLoading(false);
            });
    }, []);

    const tableHeaders = ["Cliente", "Contato", "Origem", "Valor", "Status"];
    const tableData = leads.map(l => ({
        nome: l.nome,
        contato: l.email || l.telefone,
        origem: l.origem,
        valor: `R$ ${parseFloat(l.valor_venda).toFixed(2)}`,
        status: l.status_pagamento,
        id: l.id
    }));

    return (
        <div className="min-h-screen bg-[#F8F8F8]">
            <Navbar />

            <div className="bg-white border-b border-[#E6E6E6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-black text-[#232323] tracking-tight">Gestão de Clientes</h1>
                            <p className="text-sm text-[#666666] font-medium">Visualize e gerencie sua base de consumidores</p>
                        </div>
                        <button className="btn-primary !py-3 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            NOVO CADASTRO
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                {/* Filtros e Busca */}
                <div className="bg-white p-6 rounded-xl border border-[#E6E6E6] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E6E6E6] w-5 h-5" />
                        <input type="text" placeholder="Buscar por nome ou CPF..." className="input-simples !pl-10" />
                    </div>
                    <div className="flex gap-4 col-span-2">
                        <select className="input-simples !py-2 bg-white">
                            <option>Filtrar por Status</option>
                            <option>Aprovado</option>
                            <option>Pendente</option>
                        </select>
                        <button className="bg-[#F2F4F7] text-[#232323] px-6 py-2 rounded-lg font-bold text-sm border border-[#E6E6E6] flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Mais Filtros
                        </button>
                    </div>
                </div>

                {/* Listagem */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-black text-[#666666] uppercase tracking-[0.2em]">{leads.length} Resultados encontrados</span>
                    </div>
                    <ThemedTable headers={tableHeaders} data={tableData} onAction={(id) => console.log('Action on', id)} />
                </div>

                {/* Exemplo de Formulário (Mini-Card) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl border border-[#E6E6E6] shadow-sm space-y-8">
                        <div>
                            <h3 className="text-lg font-black text-[#232323]">Cadastro Rápido</h3>
                            <p className="text-xs text-[#666666] font-bold uppercase tracking-widest mt-1 text-[#0088C8]">Adicionar novo cliente agora</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <ThemedField label="Nome Completo" placeholder="Ex: João Silva" />
                            <ThemedField label="WhatsApp" placeholder="(00) 00000-0000" />
                            <ThemedField label="Email" placeholder="joao@email.com" />
                            <ThemedField label="CPF" placeholder="000.000.000-00" />
                        </div>
                        <button className="btn-primary w-full flex items-center justify-center gap-2">
                            SALVAR CLIENTE
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-[#0088C8] p-8 rounded-xl text-white flex flex-col justify-between relative overflow-hidden group">
                        <Calendar className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-black leading-tight">Agendamentos Pendentes</h3>
                            <p className="text-white/80 font-medium">Você tem 4 clientes aguardando confirmação para hoje.</p>
                        </div>
                        <button className="relative z-10 bg-white text-[#0088C8] font-black py-4 rounded-lg mt-8 hover:bg-[#F2F4F7] transition-all">
                            VER AGENDA COMPLETA
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}

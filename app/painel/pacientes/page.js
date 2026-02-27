'use client';

import {
    Users,
    Search,
    Plus,
    MoreHorizontal,
    Phone,
    Calendar,
    Eye,
    Edit,
    XCircle,
    Download
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function PacientesPage() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Buscamos dos agendamentos para extrair dados únicos dos pacientes
                const res = await fetch('/api/appointments');
                const data = await res.json();

                if (Array.isArray(data)) {
                    // Agrupando por telefone/nome para criar lista de "pacientes únicos"
                    const patientsMap = new Map();
                    data.forEach(app => {
                        const key = app.phone || app.name;
                        if (!patientsMap.has(key)) {
                            patientsMap.set(key, {
                                ...app,
                                appointmentCount: 1,
                                lastVisit: app.date
                            });
                        } else {
                            const existing = patientsMap.get(key);
                            existing.appointmentCount++;
                            if (new Date(app.date) > new Date(existing.lastVisit)) {
                                existing.lastVisit = app.date;
                            }
                        }
                    });
                    setPatients(Array.from(patientsMap.values()));
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone?.includes(searchTerm)
    );

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#0088C8] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Base de Pacientes</h1>
                    <p className="text-gray-500 text-sm">Gerencie o histórico e contatos de todos os seus pacientes.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-all">
                        <Download className="w-4 h-4" />
                        Exportar Listagem
                    </button>
                    <button className="bg-[#0088C8] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#0088C8]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Plus className="w-4 h-4" />
                        Novo Paciente
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Filtrar por nome ou telefone..."
                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 transition-all outline-none shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Patients Table */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#F9FAFB] border-b border-gray-200">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Paciente</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Contato</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Procedimento</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Última Visita</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-gray-400 tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-500 font-bold">Nenhum paciente encontrado para sua busca.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-[#F2F4F7] text-[#0088C8] rounded-2xl flex items-center justify-center font-black text-lg">
                                                    {patient.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 leading-tight uppercase tracking-tight">{patient.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">{patient.appointmentCount} ATENDIMENTOS</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                                    <Phone className="w-3.5 h-3.5 text-[#0088C8]" />
                                                    {patient.phone}
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-medium">whatsapp conectado</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                                                {patient.service}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center text-xs font-bold text-gray-500">
                                            {format(new Date(patient.lastVisit), 'dd/MM/yyyy')}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${patient.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {patient.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button className="p-2.5 text-gray-400 hover:text-[#0088C8] hover:bg-[#0088C8]/5 rounded-xl transition-all" title="Ver Detalhes"><Eye className="w-5 h-5" /></button>
                                                <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Editar"><Edit className="w-5 h-5" /></button>
                                                <button className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Remover"><XCircle className="w-5 h-5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

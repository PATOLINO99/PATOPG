'use client';

import {
    Calendar as CalendarIcon,
    MoreHorizontal,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Plus,
    Filter
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AgendamentosPage() {
    const [viewMode, setViewMode] = useState('list');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showModal, setShowModal] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();
            setAppointments(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // Exportar função para abrir modal globalmente (para o Header usar)
        window.openBookingModal = () => setShowModal(true);
        return () => { delete window.openBookingModal; };
    }, []);

    const handleCancel = async (id) => {
        if (!confirm('Deseja realmente cancelar este agendamento?')) return;
        try {
            const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setAppointments(prev => prev.filter(a => a.id !== id));
            }
        } catch (err) { }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#0088C8] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            {showModal && <BookingModal onClose={() => setShowModal(false)} onSave={loadData} />}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Agendamentos</h1>
                    <p className="text-gray-500 text-sm">Visualize e controle todos os agendamentos da clínica.</p>
                </div>
                <div className="bg-white border border-gray-200 p-1 rounded-xl flex shadow-sm">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-[#0088C8] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        LISTA
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'calendar' ? 'bg-[#0088C8] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        CALENDÁRIO
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Filtros Ativos</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#F9FAFB] border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Paciente</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Profissional</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Data & Hora</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Serviço</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-gray-400 tracking-widest">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-[#0088C8]/10 group-hover:text-[#0088C8] transition-all">
                                                    {(app.patientName || app.name || '?').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 leading-none">{app.patientName || app.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-medium mt-1">{app.patientPhone || app.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-[10px] font-black">
                                                    {(app.professionalName || 'P').charAt(0)}
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">{app.professionalName || 'Dr. Geral'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-sm font-bold text-gray-900">{format(new Date(app.date), 'dd/MM/yyyy')}</span>
                                                <span className="text-[10px] font-black text-[#0088C8] uppercase bg-blue-50 px-2 py-0.5 rounded mt-1">{app.time}h</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg italic">
                                                {app.service}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <Badge status={app.status} />
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-[#0088C8] transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                                                <button
                                                    onClick={() => handleCancel(app.id)}
                                                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <CalendarView
                        currentMonth={currentMonth}
                        onPrev={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        appointments={appointments}
                    />
                </div>
            )}
        </div>
    );
}

function BookingModal({ onClose, onSave }) {
    const [professionals, setProfessionals] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '09:00',
        professionalId: '',
        service: 'Consulta Geral'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/professionals')
            .then(res => res.json())
            .then(data => {
                setProfessionals(data);
                if (data.length > 0) setFormData(prev => ({ ...prev, professionalId: data[0].id }));
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (res.ok) {
                onSave();
                onClose();
            } else {
                setError(result.error || 'Erro ao realizar agendamento');
            }
        } catch (err) {
            setError('Falha na conexão.');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                <div className="bg-[#0088C8] p-8 text-white relative">
                    <h2 className="text-2xl font-black tracking-tight">Novo Agendamento</h2>
                    <p className="text-blue-100 text-sm mt-1">Preencha os dados para confirmar a reserva.</p>
                    <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-xs font-bold shadow-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Nome do Paciente" value={formData.name} onChange={v => setFormData({ ...formData, name: v })} placeholder="Nome Completo" />
                        <InputGroup label="Telefone / WhatsApp" value={formData.phone} onChange={v => setFormData({ ...formData, phone: v })} placeholder="(00) 00000-0000" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Data" type="date" value={formData.date} onChange={v => setFormData({ ...formData, date: v })} />
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Horário</label>
                            <select
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 shadow-inner appearance-none"
                            >
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <option key={i} value={`${String(9 + i).padStart(2, '0')}:00`}>{9 + i}:00h</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Especialista / Profissional</label>
                        <select
                            value={formData.professionalId}
                            onChange={e => setFormData({ ...formData, professionalId: e.target.value })}
                            className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 shadow-inner appearance-none"
                        >
                            {professionals.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancelar</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-[#0088C8] text-white py-4 rounded-2xl font-black shadow-xl shadow-[#0088C8]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {loading ? 'CONFIRMANDO...' : 'CONFIRMAR AGENDAMENTO'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function InputGroup({ label, placeholder, value, onChange, type = "text" }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 shadow-inner"
            />
        </div>
    );
}


function Badge({ status }) {
    const config = {
        'booked': { bg: 'bg-blue-50', text: 'text-blue-600', label: 'AGENDADO' },
        'confirmed': { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'CONFIRMADO' },
        'canceled': { bg: 'bg-rose-50', text: 'text-rose-600', label: 'CANCELADO' }
    };
    const s = config[status] || config['booked'];
    return (
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest border border-transparent ${s.bg} ${s.text}`}>
            {s.label}
        </span>
    );
}

function CalendarView({ currentMonth, onPrev, onNext, appointments }) {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                    {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                </h3>
                <div className="flex items-center gap-2">
                    <button onClick={onPrev} className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
                    <button onClick={onNext} className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                {weekDays.map(day => (
                    <div key={day} className="bg-gray-50 p-4 text-[10px] text-gray-400 text-center tracking-widest font-black">{day}</div>
                ))}
                {days.map((day, i) => {
                    const dayAppointments = appointments.filter(app => isSameDay(new Date(app.date), day));
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isToday = isSameDay(day, new Date());

                    return (
                        <div key={i} className={`min-h-[120px] bg-white p-2 flex flex-col gap-1 ${!isCurrentMonth ? 'opacity-30' : ''}`}>
                            <span className={`text-xs font-bold inline-flex items-center justify-center w-7 h-7 rounded-lg ${isToday ? 'bg-[#0088C8] text-white' : 'text-gray-900'}`}>
                                {format(day, 'd')}
                            </span>
                            <div className="flex-1 space-y-1 overflow-y-auto">
                                {dayAppointments.map(app => (
                                    <div key={app.id} className="bg-[#0088C8]/10 p-1.5 rounded border-l-2 border-[#0088C8]">
                                        <p className="text-[10px] font-black text-gray-900 truncate">{app.name}</p>
                                        <p className="text-[9px] font-bold text-[#0088C8]">{app.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

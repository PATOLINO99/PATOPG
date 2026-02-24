'use client';

import {
    Settings,
    Bell,
    Shield,
    Database,
    User,
    Save,
    Clock
} from 'lucide-react';
import { useState } from 'react';

export default function ConfiguracoesPage() {
    const [activeTab, setActiveTab] = useState('geral');

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Configurações do Sistema</h1>
                <p className="text-gray-500 text-sm">Gerencie preferências da clínica, usuários e integrações.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Tabs */}
                <aside className="lg:w-64 space-y-1">
                    <ConfigTab
                        icon={<Settings className="w-5 h-5" />}
                        label="Geral"
                        active={activeTab === 'geral'}
                        onClick={() => setActiveTab('geral')}
                    />
                    <ConfigTab
                        icon={<User className="w-5 h-5" />}
                        label="Meu Perfil"
                        active={activeTab === 'perfil'}
                        onClick={() => setActiveTab('perfil')}
                    />
                    <ConfigTab
                        icon={<Bell className="w-5 h-5" />}
                        label="Notificações"
                        active={activeTab === 'notificacoes'}
                        onClick={() => setActiveTab('notificacoes')}
                    />
                    <ConfigTab
                        icon={<Clock className="w-5 h-5" />}
                        label="Expediente"
                        active={activeTab === 'expediente'}
                        onClick={() => setActiveTab('expediente')}
                    />
                    <ConfigTab
                        icon={<Database className="w-5 h-5" />}
                        label="Profissionais"
                        active={activeTab === 'profissionais'}
                        onClick={() => setActiveTab('profissionais')}
                    />
                    <ConfigTab
                        icon={<Shield className="w-5 h-5" />}
                        label="Segurança"
                        active={activeTab === 'seguranca'}
                        onClick={() => setActiveTab('seguranca')}
                    />
                </aside>

                {/* Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-8">
                    {activeTab === 'geral' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-gray-900">Preferências Gerais</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Nome da Clínica" placeholder="Ex: Clínica Bem Estar" defaultValue="ZapScale Clinic" />
                                <InputGroup label="Email de Contato" placeholder="email@clinica.com" defaultValue="admin@zapscale.pro" />
                                <InputGroup label="Telefone Comercial" placeholder="(00) 00000-0000" defaultValue="(11) 98765-4321" />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Idioma do Sistema</label>
                                    <select className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none appearance-none font-bold">
                                        <option>Português (Brasil)</option>
                                        <option>English</option>
                                        <option>Español</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button className="bg-[#0088C8] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0088C8]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    <Save className="w-4 h-4" />
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'profissionais' && <ProfessionalsManager />}

                    {activeTab !== 'geral' && activeTab !== 'profissionais' && (
                        <div className="py-20 text-center text-gray-400 space-y-4">
                            <Database className="w-12 h-12 mx-auto opacity-20" />
                            <p className="font-bold">Em breve: Módulo de {activeTab.toUpperCase()} em desenvolvimento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProfessionalsManager() {
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState('');

    const loadProfessionals = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/professionals');
            const data = await res.json();
            setProfessionals(Array.isArray(data) ? data : []);
        } catch (err) { }
        setLoading(false);
    };

    useState(() => {
        loadProfessionals();
    }, []);

    const handleAdd = async () => {
        if (!newName) return;
        try {
            const res = await fetch('/api/professionals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });
            if (res.ok) {
                setNewName('');
                loadProfessionals();
            }
        } catch (err) { }
    };

    const handleDelete = async (id) => {
        if (!confirm('Deseja desativar este profissional?')) return;
        try {
            // Implementação simples de toggle active se preferir, ou delete
            // Aqui vamos apenas remover da lista para o MVP
            await fetch(`/api/professionals/${id}`, { method: 'DELETE' });
            loadProfessionals();
        } catch (err) { }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900">Gerenciar Equipe</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Nome do Profissional"
                        className="bg-gray-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold shadow-inner"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-[#0088C8] text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-[#0088C8]/20 hover:scale-105 transition-all"
                    >
                        ADICIONAR
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {loading ? (
                    <p className="text-center py-10 text-gray-400 font-bold animate-pulse">Carregando especialistas...</p>
                ) : professionals.length === 0 ? (
                    <p className="text-center py-10 text-gray-400 font-bold">Nenhum profissional cadastrado.</p>
                ) : professionals.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#0088C8]/30 transition-all group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-black text-[#0088C8] shadow-sm">
                                {p.name.charAt(0)}
                            </div>
                            <span className="font-bold text-gray-900">{p.name}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(p.id)}
                            className="text-gray-300 hover:text-rose-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Save className="w-4 h-4 rotate-45" /> {/* Usando Save rotacionado como X se não quiser importar mais ícones */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}


function ConfigTab({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-[#0088C8] text-white shadow-lg shadow-[#0088C8]/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
        >
            {icon}
            {label}
        </button>
    );
}

function InputGroup({ label, placeholder, defaultValue }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
            <input
                type="text"
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900"
            />
        </div>
    );
}

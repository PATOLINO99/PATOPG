'use client';

import { useState, useEffect } from 'react';
import { Save, ArrowLeft, Layout, CreditCard, Share2, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('geral');
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        heroTitle: '',
        heroSubtitle: '',
        whatsappLink: '',
        primaryColor: '#10b981',

        planStarterPrice: 197,
        planStarterOldPrice: '',
        planStarterFeatures: '',
        planStarterCheckout: '',

        planProPrice: 397,
        planProOldPrice: '',
        planProFeatures: '',
        planProCheckout: '',

        facebookPixelId: '',
        googleAnalyticsId: '',

        announcementActive: true,
        announcementText: '',
        announcementLink: '',

        footerCopyright: ''
    });

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                setFormData(prev => ({
                    ...prev,
                    ...data,
                    // Converter booleanos e nulos
                    planStarterOldPrice: data.planStarterOldPrice || '',
                    planProOldPrice: data.planProOldPrice || '',
                    announcementActive: data.announcementActive || false
                }));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
            } else {
                setMessage({ type: 'error', text: 'Erro ao salvar alterações.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro de conexão.' });
        }
        setSaving(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading) return <div className="text-white p-8">Carregando editor...</div>;

    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/painel" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <ArrowLeft className="w-6 h-6 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Editor do Site</h1>
                            <p className="text-gray-400 text-sm">Personalize sua Landing Page em tempo real</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar de Abas */}
                    <div className="space-y-2">
                        <TabButton id="geral" icon={Layout} label="Geral e Hero" />
                        <TabButton id="precos" icon={CreditCard} label="Planos e Preços" />
                        <TabButton id="marketing" icon={Activity} label="Pixel e Script" />
                        <TabButton id="anuncios" icon={Share2} label="Anúncios" />
                    </div>

                    {/* Área de Edição */}
                    <div className="md:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">

                        {/* Aba Geral */}
                        {activeTab === 'geral' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Layout className="w-5 h-5 text-blue-400" />
                                    Conteúdo Principal
                                </h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Título Principal (Hero)</label>
                                    <input
                                        type="text"
                                        name="heroTitle"
                                        value={formData.heroTitle}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Subtítulo</label>
                                    <textarea
                                        name="heroSubtitle"
                                        value={formData.heroSubtitle}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white h-24 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Link do WhatsApp</label>
                                    <input
                                        type="text"
                                        name="whatsappLink"
                                        value={formData.whatsappLink}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Cor Primária (Hex)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            name="primaryColor"
                                            value={formData.primaryColor}
                                            onChange={handleChange}
                                            className="h-10 w-10 rounded border-0 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            name="primaryColor"
                                            value={formData.primaryColor}
                                            onChange={handleChange}
                                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white uppercase focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Aba Preços */}
                        {activeTab === 'precos' && (
                            <div className="space-y-8">
                                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <h3 className="text-lg font-bold text-green-400 mb-4">Plano Starter</h3>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 uppercase">Preço Atual (R$)</label>
                                            <input type="number" name="planStarterPrice" value={formData.planStarterPrice} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 uppercase">Preço Antigo (Opcional)</label>
                                            <input type="number" name="planStarterOldPrice" value={formData.planStarterOldPrice} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs text-gray-400 uppercase mb-1">Link de Checkout (Pagamento)</label>
                                        <input type="text" name="planStarterCheckout" value={formData.planStarterCheckout} onChange={handleChange} placeholder="https://..." className="w-full bg-gray-900 border border-blue-500/30 rounded p-2 text-blue-300" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 uppercase mb-1">Recursos (um por linha)</label>
                                        <textarea name="planStarterFeatures" value={formData.planStarterFeatures} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white h-24" />
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <h3 className="text-lg font-bold text-purple-400 mb-4">Plano PRO</h3>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 uppercase">Preço Atual (R$)</label>
                                            <input type="number" name="planProPrice" value={formData.planProPrice} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 uppercase">Preço Antigo (Opcional)</label>
                                            <input type="number" name="planProOldPrice" value={formData.planProOldPrice} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs text-gray-400 uppercase mb-1">Link de Checkout (Pagamento)</label>
                                        <input type="text" name="planProCheckout" value={formData.planProCheckout} onChange={handleChange} placeholder="https://..." className="w-full bg-gray-900 border border-purple-500/30 rounded p-2 text-purple-300" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 uppercase mb-1">Recursos (um por linha)</label>
                                        <textarea name="planProFeatures" value={formData.planProFeatures} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white h-24" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Aba Marketing */}
                        {activeTab === 'marketing' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-red-400" />
                                    Rastreamento e Analytics
                                </h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Facebook Pixel ID</label>
                                    <input
                                        type="text"
                                        name="facebookPixelId"
                                        value={formData.facebookPixelId}
                                        onChange={handleChange}
                                        placeholder="Ex: 1234567890"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">O código será inserido automaticamente em todas as páginas.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Google Analytics ID (G-XXXX)</label>
                                    <input
                                        type="text"
                                        name="googleAnalyticsId"
                                        value={formData.googleAnalyticsId}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Aba Anúncios */}
                        {activeTab === 'anuncios' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Share2 className="w-5 h-5 text-yellow-400" />
                                    Barra de Anúncios (Topo)
                                </h2>

                                <label className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors">
                                    <input
                                        type="checkbox"
                                        name="announcementActive"
                                        checked={formData.announcementActive}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                                    />
                                    <span className="text-white font-medium">Ativar Barra de Topo</span>
                                </label>

                                {formData.announcementActive && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Texto do Anúncio</label>
                                            <input
                                                type="text"
                                                name="announcementText"
                                                value={formData.announcementText}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Link ao clicar</label>
                                            <input
                                                type="text"
                                                name="announcementLink"
                                                value={formData.announcementLink}
                                                onChange={handleChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

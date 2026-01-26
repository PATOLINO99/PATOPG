'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        if (authorized) fetchData();
    }, [authorized]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/config');
            const data = await res.json();
            if (!data.features) data.features = [];
            if (!data.faqs) data.faqs = [];
            setConfig(data);
        } catch (error) {
            alert('Erro ao carregar dados.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Sant@1210') setAuthorized(true);
        else alert('Senha incorreta.');
    };

    const handleSave = async () => {
        try {
            const res = await fetch('/api/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            if (res.ok) {
                const updated = await res.json();
                setConfig(updated);
                alert('Configurações salvas com sucesso!');
            }
        } catch (error) { alert('Erro ao salvar.'); }
    };

    // Helpers Básicos
    const updateConfig = (field: string, value: any) => setConfig({ ...config, [field]: value });

    // Helpers para Listas Dinâmicas (Features)
    const addFeature = () => {
        const newFeatures = [...(config?.features || []), { title: '', description: '', icon: 'bolt' }];
        setConfig({ ...config, features: newFeatures });
    };
    const removeFeature = (index: number) => {
        const newFeatures = config.features.filter((_: any, i: number) => i !== index);
        setConfig({ ...config, features: newFeatures });
    };
    const updateFeature = (index: number, field: string, value: string) => {
        const newFeatures = [...config.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setConfig({ ...config, features: newFeatures });
    };

    // Helpers para Listas Dinâmicas (FAQ)
    const addFAQ = () => {
        const newFAQ = [...(config?.faqs || []), { question: '', answer: '' }];
        setConfig({ ...config, faqs: newFAQ });
    };
    const removeFAQ = (index: number) => {
        const newFAQ = config.faqs.filter((_: any, i: number) => i !== index);
        setConfig({ ...config, faqs: newFAQ });
    };
    const updateFAQ = (index: number, field: string, value: string) => {
        const newFAQ = [...config.faqs];
        newFAQ[index] = { ...newFAQ[index], [field]: value };
        setConfig({ ...config, faqs: newFAQ });
    };

    if (!authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans text-slate-200">
                <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-800 text-center">
                    <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-widest">Painel ZapScale</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            className="w-full rounded-2xl bg-slate-950 border-slate-800 text-white p-4 border focus:border-emerald-500 transition-all outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua SENHA MASTER"
                        />
                        <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all">ACESSAR EDITOR PRO</button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 font-bold">Carregando central de edição...</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-32">
            {/* Header Fixo */}
            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white">Z</div>
                        <h1 className="font-bold text-lg">Menu Mestre <span className="text-emerald-500 text-[10px] ml-2 px-2 py-0.5 bg-emerald-500/10 rounded">PREMIUM</span></h1>
                    </div>
                    <div className="flex gap-3">
                        <a href="/" target="_blank" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm transition-all border border-slate-700">Ver Site</a>
                        <button onClick={handleSave} className="px-8 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all">SALVAR TUDO</button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-10 px-6 space-y-16">

                {/* --- 1. IDENTIDADE BÁSICA (HERO) --- */}
                <section className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                        1. Identidade & Hero Principal
                    </h2>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Título Principal (H1)</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-4 text-sm border focus:border-emerald-500 outline-none" value={config?.heroTitle || ''} onChange={e => updateConfig('heroTitle', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Subtítulo (Descrição)</label>
                                <textarea rows={3} className="w-full bg-slate-950 border-slate-800 rounded-xl p-4 text-sm border focus:border-emerald-500 outline-none" value={config?.heroSubtitle || ''} onChange={e => updateConfig('heroSubtitle', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">URL da Logo</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-4 text-sm border focus:border-emerald-500 outline-none" placeholder="https://..." value={config?.logoUrl || ''} onChange={e => updateConfig('logoUrl', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">WhatsApp Master</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-4 text-sm border focus:border-emerald-500 outline-none" placeholder="https://wa.me/..." value={config?.whatsappLink || ''} onChange={e => updateConfig('whatsappLink', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Cor Primária</label>
                                <input type="color" className="w-full h-12 bg-slate-950 border-slate-800 rounded-xl p-2 border cursor-pointer" value={config?.primaryColor || '#10b981'} onChange={e => updateConfig('primaryColor', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Cor de Destaque</label>
                                <input type="color" className="w-full h-12 bg-slate-950 border-slate-800 rounded-xl p-2 border cursor-pointer" value={config?.accentColor || '#06b6d4'} onChange={e => updateConfig('accentColor', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 2. BARRA DE ANÚNCIOS (MARKETING) --- */}
                <section className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                        2. Marketing & Promoção
                    </h2>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-8 shadow-xl">
                        <div className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                            <span className="font-bold text-sm">Barra de Topo (Anúncio)</span>
                            <button
                                onClick={() => updateConfig('announcementActive', !config.announcementActive)}
                                className={`w-12 h-6 rounded-full relative transition-all ${config?.announcementActive ? 'bg-emerald-500' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config?.announcementActive ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                        {config?.announcementActive && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">TEXTO DO ANÚNCIO</label>
                                    <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border focus:border-emerald-500 outline-none" value={config?.announcementText || ''} onChange={e => updateConfig('announcementText', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">COR DE FUNDO</label>
                                    <input type="color" className="w-full h-10 bg-slate-950 border-slate-800 rounded-xl p-1 border cursor-pointer" value={config?.announcementBgColor || '#10b981'} onChange={e => updateConfig('announcementBgColor', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">LINK (OPCIONAL)</label>
                                    <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border focus:border-emerald-500 outline-none" value={config?.announcementLink || ''} onChange={e => updateConfig('announcementLink', e.target.value)} />
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 mb-1 block">FACEBOOK PIXEL ID</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border focus:border-emerald-500 outline-none" value={config?.facebookPixelId || ''} onChange={e => updateConfig('facebookPixelId', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 mb-1 block">GOOGLE ANALYTICS ID</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border focus:border-emerald-500 outline-none" value={config?.googleAnalyticsId || ''} onChange={e => updateConfig('googleAnalyticsId', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 3. BENEFÍCIOS (FEATURES) --- */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            3. Seção de Benefícios (Cards)
                        </h2>
                        <button onClick={addFeature} className="text-xs bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all font-bold">+ NOVO CARD</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {config?.features?.map((f: any, i: number) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 relative group">
                                <button onClick={() => removeFeature(i)} className="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-bold">REMOVER</button>
                                <div className="flex gap-2">
                                    <select
                                        value={f.icon}
                                        onChange={e => updateFeature(i, 'icon', e.target.value)}
                                        className="bg-slate-950 border-slate-800 rounded-lg p-2 text-xs border outline-none text-white w-24"
                                    >
                                        <option value="bolt">⚡ Raio</option>
                                        <option value="clock">⏰ Tempo</option>
                                        <option value="cash">💰 Grana</option>
                                        <option value="robot">🤖 Atos</option>
                                        <option value="shield">🛡️ Seguro</option>
                                        <option value="star">⭐ Estrela</option>
                                    </select>
                                    <input placeholder="Título do Benefício" className="flex-1 bg-slate-950 border-slate-800 rounded-lg p-2 text-xs border outline-none text-white" value={f.title} onChange={e => updateFeature(i, 'title', e.target.value)} />
                                </div>
                                <textarea placeholder="Descrição rápida..." className="w-full bg-slate-950 border-slate-800 rounded-lg p-2 text-xs border outline-none text-white" rows={2} value={f.description} onChange={e => updateFeature(i, 'description', e.target.value)} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 4. PREÇOS (OFERTAS) --- */}
                <section className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                        4. Planos & Checkout
                    </h2>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-10 shadow-xl">
                        {/* Plano Starter */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-800 pb-2">Plano Starter</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Preço Final (R$)</label>
                                    <input type="number" step="0.01" className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none" value={config?.planStarterPrice || 0} onChange={e => updateConfig('planStarterPrice', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Preço Original (R$)</label>
                                    <input type="number" step="0.01" className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none text-slate-500" value={config?.planStarterOldPrice || ''} onChange={e => updateConfig('planStarterOldPrice', e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Link Checkout</label>
                                    <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-xs border outline-none font-mono" value={config?.planStarterCheckout || ''} onChange={e => updateConfig('planStarterCheckout', e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Recursos (Um por linha)</label>
                                    <textarea rows={4} className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none" value={config?.planStarterFeatures || ''} onChange={e => updateConfig('planStarterFeatures', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Plano Pro */}
                        <div className="space-y-4 pt-6 border-t border-slate-800">
                            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-2">Plano Pro (IA)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Preço Final (R$)</label>
                                    <input type="number" step="0.01" className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none" value={config?.planProPrice || 0} onChange={e => updateConfig('planProPrice', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Preço Original (R$)</label>
                                    <input type="number" step="0.01" className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none text-slate-500" value={config?.planProOldPrice || ''} onChange={e => updateConfig('planProOldPrice', e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Link Checkout</label>
                                    <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-xs border outline-none font-mono" value={config?.planProCheckout || ''} onChange={e => updateConfig('planProCheckout', e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase mb-1 block">Recursos (Um por linha)</label>
                                    <textarea rows={4} className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none" value={config?.planProFeatures || ''} onChange={e => updateConfig('planProFeatures', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 5. FAQ --- */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            5. Dúvidas Frequentes (FAQ)
                        </h2>
                        <button onClick={addFAQ} className="text-xs bg-purple-500/10 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-all font-bold">+ NOVA DUVIDA</button>
                    </div>
                    <div className="space-y-4">
                        {config?.faqs?.map((f: any, i: number) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 relative group">
                                <button onClick={() => removeFAQ(i)} className="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-bold">REMOVER</button>
                                <input placeholder="Pergunta?" className="w-full bg-slate-950 border-slate-800 rounded-lg p-3 text-xs border outline-none text-white font-bold" value={f.question} onChange={e => updateFAQ(i, 'question', e.target.value)} />
                                <textarea placeholder="Resposta..." className="w-full bg-slate-950 border-slate-800 rounded-lg p-3 text-xs border outline-none text-white" rows={2} value={f.answer} onChange={e => updateFAQ(i, 'answer', e.target.value)} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 6. RODAPÉ --- */}
                <section className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                        <span className="w-2 h-8 bg-slate-500 rounded-full"></span>
                        6. Rodapé & Social
                    </h2>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Instagram Link</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none" value={config?.socialInstagram || ''} onChange={e => updateConfig('socialInstagram', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">E-mail Suporte</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none" value={config?.supportEmail || ''} onChange={e => updateConfig('supportEmail', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Texto Copyright</label>
                                <input className="w-full bg-slate-950 border-slate-800 rounded-xl p-3 text-sm border outline-none" value={config?.footerCopyright || ''} onChange={e => updateConfig('footerCopyright', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BOTÃO FLUTUANTE DE SALVAR */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                    <button
                        onClick={handleSave}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl shadow-emerald-600/50 transition-all hover:scale-110 active:scale-95 border-2 border-white/20 whitespace-nowrap"
                    >
                        PUBLICAR TODAS AS MUDANÇAS 🚀
                    </button>
                </div>

            </main>
        </div>
    );
}

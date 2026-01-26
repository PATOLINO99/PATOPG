'use client';

import React, { useState, useEffect } from 'react';

interface LandingPageProps {
    settings: any;
    products: any[];
}

// Icon Helper
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
    switch (name) {
        case 'bolt': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
        case 'clock': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'cash': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'robot': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
        case 'shield': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
        case 'star': return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.383-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
        default: return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
    }
}

export default function LandingPageClient({ settings, products }: LandingPageProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Scripts de Marketing (Analytics & Pixel)
    useEffect(() => {
        if (settings?.facebookPixelId) {
            const fbScript = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${settings.facebookPixelId}');fbq('track', 'PageView');`;
            const script = document.createElement('script');
            script.innerHTML = fbScript;
            document.head.appendChild(script);
        }
    }, [settings?.facebookPixelId]);

    // Formatadores
    const formatPrice = (price?: number) => price !== undefined && price !== null && price > 0 ? `R$ ${price.toFixed(2).replace('.', ',')}` : "Grátis";

    const dynamicStyles = {
        '--color-primary': settings?.primaryColor || "#10b981",
        '--color-accent': settings?.accentColor || "#06b6d4",
    } as React.CSSProperties;

    return (
        <main className="min-h-screen bg-slate-950 font-sans text-slate-50 relative selection:bg-emerald-500 selection:text-white" style={dynamicStyles}>

            {/* --- TOP ANNOUNCEMENT BAR --- */}
            {settings?.announcementActive && (
                <div
                    className="fixed top-0 w-full z-[60] py-2 px-4 flex items-center justify-center text-center font-bold text-[10px] md:text-xs text-slate-950 uppercase tracking-widest"
                    style={{ backgroundColor: settings.announcementBgColor || 'var(--color-primary)' }}
                >
                    {settings.announcementLink ? (
                        <a href={settings.announcementLink} className="hover:opacity-80 flex items-center gap-2">
                            {settings.announcementText}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                    ) : (
                        <span>{settings.announcementText}</span>
                    )}
                </div>
            )}

            {/* --- NAVBAR --- */}
            <nav className={`fixed ${settings?.announcementActive ? 'top-8 md:top-8' : 'top-0'} w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 transition-all`}>
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2">
                        {settings?.logoUrl ? (
                            <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto" />
                        ) : (
                            <>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20" style={{ background: `linear-gradient(to bottom right, var(--color-primary), var(--color-accent))` }}>
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tighter">Zap<span style={{ color: 'var(--color-primary)' }}>Scale</span></span>
                            </>
                        )}
                    </a>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#beneficios" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Benefícios</a>
                        <a href="#planos" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Preços</a>
                        <a href="#faq" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Dúvidas</a>
                        <a href={settings?.whatsappLink} target="_blank" className="px-6 py-2.5 rounded-full font-bold text-xs text-slate-950 transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: 'var(--color-primary)' }}>Consultoria Grátis</a>
                    </div>
                </div>
            </nav>

            {/* --- HERO --- */}
            <section className="pt-48 lg:pt-64 pb-24 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-white">
                        {settings?.heroTitle || "Automatize seu WhatsApp"}
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
                        {settings?.heroSubtitle || "A solução completa para escalar seu atendimento."}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                        <a href="#planos" className="w-full sm:w-auto px-12 py-5 rounded-full text-slate-950 font-black text-lg hover:scale-105 transition-all shadow-xl shadow-emerald-500/20" style={{ backgroundColor: 'var(--color-primary)' }}>
                            ESCOLHER PLANO
                        </a>
                        <a href={settings?.whatsappLink} target="_blank" className="w-full sm:w-auto px-12 py-5 rounded-full border border-slate-800 text-white font-bold hover:bg-white/5 transition-all">
                            Falar com Consultor
                        </a>
                    </div>
                </div>
            </section>

            {/* --- 3. BENEFÍCIOS (RESTORED) --- */}
            <section id="beneficios" className="py-32 px-4 bg-slate-900/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">Tecnologia de Ponta</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Tudo o que você precisa para dominar o atendimento no WhatsApp.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {settings?.features?.length > 0 ? settings.features.map((f: any, i: number) => (
                            <div key={i} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800 hover:border-[var(--color-primary)]/40 transition-all group">
                                <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `var(--color-primary)10`, color: 'var(--color-primary)' }}>
                                    <IconRenderer name={f.icon} className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                            </div>
                        )) : (
                            <div className="col-span-3 text-center py-10 text-slate-600 border border-dashed border-slate-800 rounded-3xl">
                                Nenhuma feature cadastrada no painel.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- 4. PLANOS (PRICING) --- */}
            <section id="planos" className="py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Planos Flexíveis</h2>
                        <p className="text-slate-500">Escolha a escala ideal para o seu negócio hoje.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Starter */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-12 flex flex-col hover:border-slate-700 transition-all">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Essencial</span>
                            <h3 className="text-2xl font-bold mb-8 text-white">Plano Starter</h3>
                            <div className="mb-10">
                                {settings?.planStarterOldPrice && (
                                    <span className="text-slate-500 line-through text-lg block mb-1">{formatPrice(settings.planStarterOldPrice)}</span>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-white">{formatPrice(settings?.planStarterPrice)}</span>
                                    <span className="text-slate-500 text-sm">/mês</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-12 flex-1">
                                {String(settings?.planStarterFeatures || "").split('\n').filter(l => l.trim()).map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-400">
                                        <svg className="w-5 h-5 text-emerald-500/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        {item.replace(/^- /, '')}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={settings?.planStarterCheckout || settings?.whatsappLink}
                                target="_blank"
                                className="w-full py-5 text-center rounded-2xl font-black text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/10"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                ASSINAR AGORA
                            </a>
                        </div>

                        {/* Pro */}
                        <div className="bg-slate-900 border-2 border-[var(--color-primary)] rounded-[3rem] p-12 flex flex-col relative overflow-hidden shadow-2xl shadow-[var(--color-primary)]/10">
                            <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-950" style={{ backgroundColor: 'var(--color-primary)' }}>RECOMENDADO</div>
                            <span className="text-xs font-black text-[var(--color-primary)] uppercase tracking-widest mb-4">Escala Máxima</span>
                            <h3 className="text-2xl font-bold mb-8 text-white">Plano Pro (IA)</h3>
                            <div className="mb-10">
                                {settings?.planProOldPrice && (
                                    <span className="text-slate-500 line-through text-lg block mb-1">{formatPrice(settings.planProOldPrice)}</span>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-white">{formatPrice(settings?.planProPrice)}</span>
                                    <span className="text-slate-500 text-sm">/mês</span>
                                </div>
                            </div>
                            <ul className="space-y-4 mb-12 flex-1">
                                {String(settings?.planProFeatures || "").split('\n').filter(l => l.trim()).map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                                        <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        {item.replace(/^- /, '')}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={settings?.planProCheckout || settings?.whatsappLink}
                                target="_blank"
                                className="w-full py-5 text-center rounded-2xl font-black text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[var(--color-primary)]/20"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                ADQUIRIR AGORA
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. FAQ --- */}
            <section id="faq" className="py-32 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-white leading-tight underline decoration-[var(--color-primary)]/30 underline-offset-8">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {settings?.faqs?.map((f: any, i: number) => (
                            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer group hover:border-slate-700 transition-all" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <div className="p-8 flex justify-between items-center bg-slate-900/20 group-hover:bg-slate-900/30 transition-all">
                                    <span className="font-bold text-white text-base pr-4">{f.question}</span>
                                    <div className={`w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center transition-all ${openFaq === i ? 'rotate-180 bg-white/5' : ''}`}>
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                {openFaq === i && (
                                    <div className="p-8 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 animate-in fade-in slide-in-from-top-4 duration-300">
                                        {f.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 6. FOOTER --- */}
            <footer className="py-24 px-4 bg-slate-950 border-t border-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                        <div className="text-center md:text-left">
                            <span className="text-3xl font-black text-white tracking-tighter mb-4 block">ZapScale</span>
                            <p className="text-slate-500 text-sm max-w-xs">{settings?.heroSubtitle?.substring(0, 100)}...</p>
                        </div>
                        <div className="flex gap-10">
                            {settings?.socialInstagram && (
                                <a href={settings.socialInstagram} target="_blank" className="text-slate-400 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">Instagram</a>
                            )}
                            {settings?.supportEmail && (
                                <a href={`mailto:${settings.supportEmail}`} className="text-slate-400 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">Suporte</a>
                            )}
                        </div>
                    </div>
                    <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                            {settings?.footerCopyright || "© 2024 ZapScale Tecnologia. Todos os direitos reservados."}
                        </p>
                        <a href="/admin/site-editor" className="text-[10px] text-slate-800 hover:text-emerald-500 transition-colors uppercase font-bold tracking-widest">Acesso Restrito</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}

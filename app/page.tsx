"use client";

import { useState } from 'react';

/**
 * ZAPSCALE LANDING PAGE
 * Identidade Visual: Emerald Green (#10b981) + Slate Dark (#0f172a)
 */

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-emerald-500 selection:text-white">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Zap<span className="text-emerald-400">Scale</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="#solucao" className="hover:text-emerald-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Solução</a>
                                <a href="#beneficios" className="hover:text-emerald-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Benefícios</a>
                                <a href="#planos" className="hover:text-emerald-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Planos</a>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5">
                                Falar com Consultor
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/30 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur mb-8 animate-fade-in-up">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">API Oficial Meta Integrada</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white">
                        Transforme seu WhatsApp em uma <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Máquina de Vendas 24h
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                        Centralize seu time, elimine o risco de bloqueios e nunca mais deixe um cliente no vácuo.
                        Nossa IA usa a API Oficial para triar e responder cada mensagem instantaneamente.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Automatizar Agora
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-lg transition-all">
                            Ver Demonstração
                        </button>
                    </div>

                    <div className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span>Setup em 5 minutos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span>7 dias grátis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span>Sem cartão de crédito</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- PROBLEM SECTION --- */}
            <section className="py-24 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                            O Atendimento Manual é o <span className="text-red-400">Gargalo</span> do Seu Crescimento
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Se você ainda depende de celulares físicos e planilhas, você está deixando dinheiro na mesa todos os dias.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-red-500/30 transition-colors">
                            <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">O "Vácuo" que Mata Vendas</h3>
                            <p className="text-slate-400 leading-relaxed">
                                O cliente moderno não espera. Se você demora 10 minutos para responder, ele já comprou no concorrente. Manualmente, é impossível ser imediato sempre.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-red-500/30 transition-colors">
                            <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Risco de Bloqueio</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Usar ferramentas não oficiais ou vários atendentes no mesmo celular é pedir para ser banido. Perder seu número principal é um pesadelo.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-red-500/30 transition-colors">
                            <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Caixa Preta</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Sem métricas, você não sabe quem atende bem ou mal. Se um funcionário apaga a conversa, você perde o histórico e o cliente para sempre.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SOLUTION SECTION --- */}
            <section id="solucao" className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
                                🔥 A Revolução do Atendimento
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Sua Máquina de Vendas: <br />
                                <span className="text-emerald-400">Rápida, Segura e Inteligente</span>
                            </h2>
                            <p className="text-lg text-slate-400 mb-8">
                                A ZapScale une a segurança da API Oficial com a inteligência artificial para criar uma experiência de compra perfeita para seu cliente.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Resposta Imediata 24/7</h4>
                                        <p className="text-slate-400 text-sm mt-1">O Chatbot atende no primeiro segundo. Capture o cliente no pico do interesse, seja dia ou noite.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                        <span className="text-2xl">🛡️</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Anti-Bloqueio (API Oficial)</h4>
                                        <p className="text-slate-400 text-sm mt-1">Durma tranquilo usando a infraestrutura oficial da Meta. Estabilidade total para sua operação.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                        <span className="text-2xl">🤖</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Triagem com IA</h4>
                                        <p className="text-slate-400 text-sm mt-1">A IA qualifica o lead e só passa para o vendedor quem realmente quer comprar. Produtividade máxima.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Representation */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl transform rotate-3 blur-lg opacity-30"></div>
                            <div className="relative bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                                {/* Chat Simulation */}
                                <div className="space-y-4">

                                    {/* Message Received */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0"></div>
                                        <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 max-w-[80%]">
                                            <p className="text-slate-300 text-sm">Olá, gostaria de saber mais sobre os planos.</p>
                                        </div>
                                    </div>

                                    {/* Message Sent (IA) */}
                                    <div className="flex gap-3 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-[10px] text-white font-bold">IA</div>
                                        <div className="bg-emerald-600/20 p-3 rounded-2xl rounded-tr-none border border-emerald-500/20 max-w-[80%]">
                                            <p className="text-emerald-100 text-sm">Olá! 🚀 Claro. Sou a assistente virtual da ZapScale. Para te ajudar melhor, qual o tamanho da sua equipe de vendas hoje?</p>
                                        </div>
                                    </div>

                                    {/* Message Received */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0"></div>
                                        <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 max-w-[80%]">
                                            <p className="text-slate-300 text-sm">Tenho 5 vendedores.</p>
                                        </div>
                                    </div>

                                    {/* Message Sent (IA) */}
                                    <div className="flex gap-3 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-[10px] text-white font-bold">IA</div>
                                        <div className="bg-emerald-600/20 p-3 rounded-2xl rounded-tr-none border border-emerald-500/20 max-w-[80%]">
                                            <p className="text-emerald-100 text-sm">Perfeito! Para 5 vendedores, o plano PRO é o ideal. Ele centraliza todos em um número e inclui o Dashboard. Gostaria de ver uma demo?</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Painel Administrativo em Tempo Real</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- BENEFÍCIOS SECTION --- */}
            <section id="beneficios" className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Image / Graphic Side */}
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full point-events-none"></div>
                            <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                                        <span className="text-slate-400 font-medium">Taxa de Conversão</span>
                                        <span className="text-emerald-400 font-bold text-xl">+145%</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                                        <span className="text-slate-400 font-medium">Tempo de Resposta</span>
                                        <span className="text-emerald-400 font-bold text-xl">Imediato</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                                        <span className="text-slate-400 font-medium">Custo por Lead</span>
                                        <span className="text-emerald-400 font-bold text-xl">-30%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 font-medium">Satisfação (NPS)</span>
                                        <span className="text-emerald-400 font-bold text-xl">9.8/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                                Por que migrar para a <span className="text-emerald-400">ZapScale</span>?
                            </h2>
                            <p className="text-slate-400 text-lg mb-8">
                                Abandone o amadorismo. Veja o impacto real de uma operação profissional de WhatsApp no seu negócio.
                            </p>

                            <ul className="space-y-5">
                                {[
                                    { title: 'Aumento Real de Vendas', desc: 'Recupere carrinhos abandonados e converta leads frios automaticamente.' },
                                    { title: 'Agilidade Extrema', desc: 'Zere a fila de espera. Seu cliente nunca mais vai procurar o concorrente por demora.' },
                                    { title: 'Profissionalismo Total', desc: 'Padronize o tom de voz da sua empresa. Sem erros de português ou grosserias.' },
                                    { title: 'Gestão à Vista', desc: 'Tenha dashboards com métricas de cada vendedor e de cada campanha.' },
                                    { title: 'Escalabilidade', desc: 'Venda para 10 ou 10.000 pessoas simultaneamente sem contratar mais ninguém.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-1">
                                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">{item.title}</h4>
                                            <p className="text-slate-400 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS SECTION --- */}
            <section className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                            Como Funciona na Prática?
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Entenda o fluxo que transforma curiosos em clientes fiéis em 4 passos simples.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-800 via-emerald-500/50 to-slate-800 -translate-y-1/2 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">

                            {/* Step 1 */}
                            <div className="group relative bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-950 text-white font-bold text-lg mb-4 mx-auto md:mx-0 relative z-10 group-hover:bg-emerald-500 transition-colors">1</div>
                                <h3 className="text-xl font-bold text-white mb-2 text-center md:text-left">Mensagem do Cliente</h3>
                                <p className="text-slate-400 text-sm text-center md:text-left">
                                    O cliente envia um "Oi" no seu WhatsApp, Instagram ou Site, a qualquer hora do dia ou da noite.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="group relative bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-950 text-white font-bold text-lg mb-4 mx-auto md:mx-0 relative z-10 group-hover:bg-emerald-500 transition-colors">2</div>
                                <h3 className="text-xl font-bold text-white mb-2 text-center md:text-left">Processamento IA</h3>
                                <p className="text-slate-400 text-sm text-center md:text-left">
                                    Em milissegundos, a IA "lê" a intenção (compra, dúvida ou suporte) e consulta sua base de dados.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="group relative bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-950 text-white font-bold text-lg mb-4 mx-auto md:mx-0 relative z-10 group-hover:bg-emerald-500 transition-colors">3</div>
                                <h3 className="text-xl font-bold text-white mb-2 text-center md:text-left">Resposta Instantânea</h3>
                                <p className="text-slate-400 text-sm text-center md:text-left">
                                    O cliente recebe a resposta exata. Se for venda, recebe catálogo e link de pagamento na hora.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="group relative bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-950 text-white font-bold text-lg mb-4 mx-auto md:mx-0 relative z-10 group-hover:bg-emerald-500 transition-colors">4</div>
                                <h3 className="text-xl font-bold text-white mb-2 text-center md:text-left">Toque Humano</h3>
                                <p className="text-slate-400 text-sm text-center md:text-left">
                                    Se necessário, a IA transfere a conversa suavemente para um atendente, já com todo o histórico salvo.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECURITY SECTION --- */}
            <section className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                        🛡️ Segurança Empresarial
                    </div>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
                        Tecnologia de Gigantes, Acessível para Você
                    </h2>
                    <p className="text-lg text-slate-400 mb-12">
                        Não arrisque seu número principal com ferramentas "piratas" ou extensões instáveis.
                        A ZapScale opera 100% via <strong>API Oficial Meta (WhatsApp Business API)</strong>, a mesma infraestrutura utilizada por empresas como Uber, iFood e Nubank.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <div className="text-4xl mb-3">☁️</div>
                            <h3 className="text-white font-bold mb-2">99.9% de Uptime</h3>
                            <p className="text-slate-400 text-sm">Servidores de alta disponibilidade. Sua operação de vendas nunca sai do ar.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <div className="text-4xl mb-3">🔒</div>
                            <h3 className="text-white font-bold mb-2">Conformidade LGPD</h3>
                            <p className="text-slate-400 text-sm">Dados criptografados e tratados com segurança total para você e seus clientes.</p>
                        </div>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="text-white font-bold mb-2">Selo Oficial</h3>
                            <p className="text-slate-400 text-sm">Aumente a confiança do cliente com uma conta comercial verificada (Selo Verde opcional).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS SECTION --- */}
            <section className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                            Quem usa, recomenda
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Veja resultados reais de empresários que transformaram seu atendimento.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Marcos Oliveira",
                                role: "E-commerce de Moda",
                                text: "Minhas vendas subiram 40% no primeiro mês. O chatbot recuperou carrinhos abandonados de madrugada que eu nem sabia que estava perdendo. A integração foi super simples.",
                                initials: "MO"
                            },
                            {
                                name: "Fernanda Santos",
                                role: "Clínica de Estética",
                                text: "Antes minha recepção ficava louca só respondendo 'qual o preço'. Agora a IA tria, tira dúvidas e agenda. Minha equipe trabalha muito mais leve e focada no cliente presencial.",
                                initials: "FS"
                            },
                            {
                                name: "Ricardo Mendes",
                                role: "Diretor de Imobiliária",
                                text: "Centralizei 15 corretores num único número. O controle é total, sei exatamente o que é falado e não perdemos mais nenhum lead por demora no atendimento. Essencial.",
                                initials: "RM"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative hover:border-emerald-500/30 transition-colors">
                                <div className="absolute top-4 right-6 text-emerald-500/20 text-8xl font-serif leading-none select-none">"</div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold border border-slate-500">
                                        {item.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{item.name}</h4>
                                        <span className="text-emerald-400 text-xs uppercase tracking-wide">{item.role}</span>
                                    </div>
                                </div>
                                <p className="text-slate-300 leading-relaxed relative z-10">"{item.text}"</p>
                                <div className="mt-6 flex gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PLANS SECTION --- */}
            <section id="planos" className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                            Escolha o Plano Ideal para Sua Escala
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Sem taxas escondidas. Cancele quando quiser.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Starter Plan */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition-colors flex flex-col">
                            <div className="mb-4">
                                <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Starter</span>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">R$ 197</span>
                                    <span className="text-slate-500">/mês</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-4">Para quem está começando a organizar o atendimento.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    1 Número de WhatsApp
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Até 2 Atendentes
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Chatbot de Boas-vindas
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Configuração Inicial Inclusa
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-lg border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors">
                                Começar Basic
                            </button>
                        </div>

                        {/* Pro Plan (Featured) */}
                        <div className="bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8 transform md:-translate-y-4 shadow-2xl shadow-emerald-900/20 flex flex-col relative">
                            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MAIS POPULAR</div>
                            <div className="mb-4">
                                <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Professional</span>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">R$ 397</span>
                                    <span className="text-slate-500">/mês</span>
                                </div>
                                <p className="text-slate-300 text-sm mt-4">A suíte completa para turbinar suas vendas.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Até 10 Atendentes
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <strong>Chatbot com IA (GPT-4)</strong>
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Dashboard de Métricas
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Suporte Prioritário VIP
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Treinamento da Equipe Incluso
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25">
                                Quero o Plano Pro
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition-colors flex flex-col">
                            <div className="mb-4">
                                <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Enterprise</span>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">Sob Medida</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-4">Para grandes operações com necessidades específicas.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Atendentes Ilimitados
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    API Dedicada
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Gerente de Conta Exclusivo
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Integração com CRM/ERP
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-lg border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors">
                                Falar com Vendas
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- GUARANTEE SECTION --- */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                        <div className="flex-shrink-0 relative z-10">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="text-center md:text-left relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Risco Zero: Garantia Blindada de 7 Dias
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                Sua satisfação é nossa prioridade absoluta. Assine, configure e teste a vontade.
                                Se por qualquer motivo você achar que a <span className="text-emerald-400 font-semibold">ZapScale</span> não é para você,
                                nós devolvemos <span className="text-white font-bold decoration-emerald-500 underline decoration-2 underline-offset-2">100% do seu dinheiro</span>.
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                                <span>🛡️ Sem letras miúdas</span>
                                <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                                <span>Sem burocracia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                            Perguntas Frequentes
                        </h2>
                        <p className="text-lg text-slate-400">
                            Tire suas dúvidas sobre a automação oficial do WhatsApp.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Preciso de um número novo ou posso usar o meu atual?",
                                a: "Você pode migrar seu número atual para a API Oficial ou usar um número novo. Nós auxiliamos em todo o processo de portabilidade para garantir que você não perca contatos."
                            },
                            {
                                q: "Existe risco de bloqueio (banimento) do número?",
                                a: "Praticamente zero, desde que respeite as políticas de uso da Meta (sem spam massivo). Como usamos a API Oficial, sua empresa opera dentro das regras, com muito mais segurança que ferramentas não oficiais."
                            },
                            {
                                q: "O custo das mensagens do WhatsApp está incluso?",
                                a: "A Meta cobra uma pequena taxa por conversas iniciadas pela empresa (após 24h sem interação). Nosso sistema otimiza isso, e as primeiras 1.000 conversas por mês são gratuitas pela própria Meta."
                            },
                            {
                                q: "Consigo atender pelo celular e computador ao mesmo tempo?",
                                a: "Sim! Nossa plataforma é 100% em nuvem. Você e sua equipe acessam de qualquer lugar, via navegador ou app, simultaneamente e sem conflitos."
                            },
                            {
                                q: "E se eu não gostar? Tem fidelidade?",
                                a: "Não acreditamos em prender clientes. Nossos planos são mensais e você pode cancelar a qualquer momento sem multa. Oferecemos também 7 dias de garantia incondicional."
                            }
                        ].map((item, i) => (
                            <details key={i} className="group bg-slate-800 rounded-xl border border-slate-700 open:border-emerald-500/50 open:bg-slate-800/80 transition-all">
                                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-white select-none">
                                    {item.q}
                                    <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180">
                                        <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-24 bg-gradient-to-br from-emerald-900/50 to-slate-900 border-t border-emerald-900/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-bold mb-6 animate-pulse">
                        ⚠️ Aviso Importante: Vagas Limitadas
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Não atendemos em escala ilimitada.
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Cada projeto exige configuração personalizada e testes.
                        Empresas que entram agora garantem <span className="text-emerald-400 font-bold">prioridade na implantação</span> e <span className="text-emerald-400 font-bold">estrutura completa</span> em poucos dias.
                    </p>

                    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl max-w-xl mx-auto mb-10 text-left">
                        <p className="text-slate-400 text-sm mb-4 font-semibold uppercase tracking-wider">Garanta agora:</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-white"><svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Responder clientes automaticamente</li>
                            <li className="flex items-center gap-3 text-white"><svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Vender mais pelo WhatsApp</li>
                            <li className="flex items-center gap-3 text-white"><svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Profissionalizar seu atendimento</li>
                            <li className="flex items-center gap-3 text-white"><svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Parar de perder oportunidades</li>
                        </ul>
                        <p className="mt-6 text-sm text-red-400 font-medium border-t border-slate-700 pt-4">
                            ⚠️ Quando as vagas desta turma forem preenchidas, novas contratações só abrirão em uma próxima janela, sem data definida.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xl hover:scale-105 transition-all shadow-xl shadow-emerald-500/30">
                            QUERO AUTOMATIZAR MEU WHATSAPP AGORA
                        </button>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-950 py-12 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">ZapScale</span>
                    </div>

                    <p className="text-slate-500 text-sm">
                        &copy; 2024 ZapScale Tecnologia. Todos os direitos reservados.
                    </p>

                    <div className="flex gap-6">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Termos</a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacidade</a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Suporte</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}

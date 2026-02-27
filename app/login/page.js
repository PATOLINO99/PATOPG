'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Mail, Lock, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/painel');
            } else {
                setError(data.error || 'Erro ao realizar login.');
            }
        } catch (err) {
            setError('Falha na conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Logo Area */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0088C8] rounded-2xl shadow-xl shadow-[#0088C8]/20 text-white mb-6">
                        <Activity className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter italic">
                        ZapScale<span className="text-[#0088C8]">.</span>Clinic
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Portal Administrativo da Clínica</p>
                </div>

                {/* Card */}
                <div className="bg-white border border-gray-200 rounded-[32px] p-10 shadow-xl shadow-gray-200/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Profissional</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0088C8] transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 transition-all"
                                        placeholder="Ex: doutor@clinica.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0088C8] transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0088C8] hover:bg-[#0077b0] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#0088C8]/30 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>Acessar Painel <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                            Novo por aqui?
                            <Link href="/register" className="ml-2 text-[#0088C8] hover:underline">Solicite sua conta</Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    Powered by ZapScale Technology © 2026
                </p>
            </div>
        </div>
    );
}

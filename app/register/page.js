'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => router.push('/login'), 2000);
            } else {
                setError(data.error || 'Erro ao realizar cadastro.');
            }
        } catch (err) {
            setError('Falha na conexão com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200 mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic mb-2">Cadastro Realizado!</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Redirecionando para o login em segundos...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0088C8] rounded-2xl shadow-xl shadow-[#0088C8]/20 text-white mb-6">
                        <Activity className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter italic">
                        Abra sua <span className="text-[#0088C8]">Conta</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Inicie a digitalização da sua clínica hoje.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-[32px] p-10 shadow-xl shadow-gray-200/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0088C8] transition-colors" />
                                    <input
                                        type="text" required
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 transition-all"
                                        placeholder="Ex: Dr. José Silva"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Profissional</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0088C8] transition-colors" />
                                    <input
                                        type="email" required
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 transition-all"
                                        placeholder="seu@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Crie sua Senha</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0088C8] transition-colors" />
                                    <input
                                        type="password" required
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0088C8]/20 outline-none font-bold text-gray-900 transition-all"
                                        placeholder="Mínimo 8 caracteres"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                                <>Criar Minha Agenda <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                            Já tem conta?
                            <Link href="/login" className="ml-2 text-[#0088C8] hover:underline">Fazer Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

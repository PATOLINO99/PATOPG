'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, Check } from 'lucide-react';

export default function SetupPage() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSetup = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('As senhas não coincidem');
            return;
        }
        if (password.length < 4) {
            setError('A senha deve ter pelo menos 4 caracteres');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = '/painel';
            } else {
                setError(data.error || 'Erro ao configurar');
            }
        } catch (err) {
            setError('Erro de conexão');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                        <Key className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo(a)!</h1>
                    <p className="text-zinc-400">Defina uma senha mestra para proteger seu painel.</p>
                </div>

                <form onSubmit={handleSetup} className="space-y-4">
                    <div>
                        <label className="block text-zinc-500 text-sm mb-1">Nova Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-zinc-500 text-sm mb-1">Confirmar Senha</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? 'Salvando...' : (
                            <>
                                Definit Senha e Entrar <Check className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

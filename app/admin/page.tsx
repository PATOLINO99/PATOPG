'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState('');

    // Data States
    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);

    // Edit States
    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null); // null = creating new

    useEffect(() => {
        if (authorized) {
            fetchData();
        }
    }, [authorized]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [configRes, productsRes] = await Promise.all([
                fetch('/api/config'),
                fetch('/api/products')
            ]);
            const configData = await configRes.json();
            const productsData = await productsRes.json();
            setConfig(configData);
            setProducts(productsData);
        } catch (error) {
            console.error('Failed to fetch data', error);
            alert('Erro ao carregar dados.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Senha simplificada para demonstração. Em produção, use NextAuth ou Middleware.
        if (password === 'admin123') {
            setAuthorized(true);
        } else {
            alert('Senha incorreta (Dica: admin123)');
        }
    };

    const handleSaveConfig = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            if (res.ok) {
                alert('Configurações salvas!');
            } else {
                alert('Erro ao salvar.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Tem certeza que deseja remover este produto?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert('Erro ao deletar.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const isNew = !currentProduct.id;
        const url = isNew ? '/api/products' : `/api/products/${currentProduct.id}`;
        const method = isNew ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentProduct),
            });

            if (res.ok) {
                const savedProduct = await res.json();
                if (isNew) {
                    setProducts([savedProduct, ...products]);
                } else {
                    setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
                }
                setIsEditingProduct(false);
                setCurrentProduct(null);
            } else {
                alert('Erro ao salvar produto.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro na requisição.');
        }
    };

    // --- Render: Login Screen ---
    if (!authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Admin Acess</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Senha</label>
                            <input
                                type="password"
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite a senha..."
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- Render: Dashboard ---
    if (loading) return <div className="p-10 text-center">Carregando painel...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-slate-900">Painel Administrativo</h1>
                    <a href="/" target="_blank" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Ver Site &rarr;</a>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-10">

                {/* SECTION 1: Site Config */}
                <section className="bg-white shadow sm:rounded-lg p-6">
                    <h2 className="text-lg font-medium leading-6 text-slate-900 mb-4 border-b pb-2">Configurações Gerais do Site</h2>
                    <form onSubmit={handleSaveConfig} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-slate-700">Título Principal (Hero)</label>
                            <input
                                type="text"
                                value={config?.heroTitle || ''}
                                onChange={e => setConfig({ ...config, heroTitle: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-slate-700">Texto de Boas-Vindas (Badge)</label>
                            <input
                                type="text"
                                value={config?.welcomeText || ''}
                                onChange={e => setConfig({ ...config, welcomeText: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-slate-700">Descrição</label>
                            <textarea
                                rows={2}
                                value={config?.heroDescription || ''}
                                onChange={e => setConfig({ ...config, heroDescription: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-slate-700">Cor Primária (Hex)</label>
                            <div className="flex items-center mt-1">
                                <input
                                    type="color"
                                    value={config?.primaryColor || '#000000'}
                                    onChange={e => setConfig({ ...config, primaryColor: e.target.value })}
                                    className="h-9 w-14 rounded border border-gray-300 p-1 mr-2"
                                />
                                <input
                                    type="text"
                                    value={config?.primaryColor || ''}
                                    onChange={e => setConfig({ ...config, primaryColor: e.target.value })}
                                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6 flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Salvar Configurações
                            </button>
                        </div>
                    </form>
                </section>

                {/* SECTION 2: Products */}
                <section className="bg-white shadow sm:rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-2">
                        <h2 className="text-lg font-medium leading-6 text-slate-900">Gerenciar Produtos</h2>
                        <button
                            onClick={() => {
                                setCurrentProduct({ title: '', description: '', price: '', imageUrl: '' });
                                setIsEditingProduct(true);
                            }}
                            className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                        >
                            + Novo Produto
                        </button>
                    </div>

                    {/* Product List */}
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-slate-300">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900">Produto</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Preço</th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Ações</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-slate-900">{product.title}</div>
                                                    <div className="text-slate-500 truncate max-w-xs">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{product.price}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button
                                                onClick={() => { setCurrentProduct(product); setIsEditingProduct(true); }}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4 text-slate-500">Nenhum produto encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

            </main>

            {/* Product Modal (Simple absolute overlay for speed) */}
            {isEditingProduct && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
                        <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">
                            {currentProduct.id ? 'Editar Produto' : 'Novo Produto'}
                        </h3>
                        <form onSubmit={handleSaveProduct} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Título</label>
                                <input
                                    required
                                    type="text"
                                    value={currentProduct.title}
                                    onChange={e => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Descrição</label>
                                <textarea
                                    required
                                    value={currentProduct.description}
                                    onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Preço Visual (ex: R$ 49,90)</label>
                                <input
                                    required
                                    type="text"
                                    value={currentProduct.price}
                                    onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">URL da Imagem</label>
                                <input
                                    required
                                    type="text"
                                    value={currentProduct.imageUrl}
                                    onChange={e => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>
                            <div className="mt-5 sm:mt-6 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditingProduct(false)}
                                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none sm:text-sm"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

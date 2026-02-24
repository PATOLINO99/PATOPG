'use client';

import {
    LayoutDashboard,
    Calendar as CalendarIcon,
    Users,
    Settings,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.user) setUser(data.user);
            })
            .catch(() => { });
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const menuItems = [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/painel' },
        { icon: <CalendarIcon className="w-5 h-5" />, label: 'Agendamentos', href: '/painel/agendamentos' },
        { icon: <Users className="w-5 h-5" />, label: 'Pacientes', href: '/painel/pacientes' },
        { icon: <Settings className="w-5 h-5" />, label: 'Configurações', href: '/painel/configuracoes' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
            <div className="p-8">
                <Link href="/painel" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#0088C8] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0088C8]/20">
                        <CalendarIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-black text-gray-900 tracking-tighter">
                        ZapScale<span className="text-[#0088C8]">.</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}
            </nav>

            <div className="p-6 border-t border-gray-100">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0088C8]/10 text-[#0088C8] rounded-full flex items-center justify-center font-bold">
                        {user?.name?.substring(0, 2).toUpperCase() || '...'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Carregando...'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || 'Aguarde'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-rose-500 transition-colors"
                        title="Sair do Sistema"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}

function SidebarItem({ icon, label, href, active }) {
    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-[#0088C8]/10 text-[#0088C8]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
        >
            {icon}
            {label}
            {active && <div className="ml-auto w-1.5 h-1.5 bg-[#0088C8] rounded-full" />}
        </Link>
    );
}

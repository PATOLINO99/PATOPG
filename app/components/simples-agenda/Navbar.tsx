'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-[#E6E6E6] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-black tracking-tighter text-[#232323]">
                                Zap<span className="text-[#0088C8]">Scale</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <NavLink href="#" label="Produto" hasDropdown />
                            <NavLink href="#" label="Soluções" hasDropdown />
                            <Link href="#" className="text-sm font-bold text-[#232323] hover:text-[#0088C8] transition-colors">Preços</Link>
                            <Link href="#" className="text-sm font-bold text-[#232323] hover:text-[#0088C8] transition-colors">Blog</Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-bold text-[#232323] hover:text-[#0088C8] px-4 py-2">
                            Login
                        </Link>
                        <Link href="/experimente" className="btn-primary !py-2.5 !px-6 text-sm">
                            EXPERIMENTE GRÁTIS
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#232323]">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-[#E6E6E6] p-4 space-y-4">
                    <Link href="#" className="block text-sm font-bold text-[#232323]">Produto</Link>
                    <Link href="#" className="block text-sm font-bold text-[#232323]">Soluções</Link>
                    <Link href="#" className="block text-sm font-bold text-[#232323]">Preços</Link>
                    <Link href="/login" className="block text-sm font-bold text-[#232323]">Login</Link>
                    <Link href="/experimente" className="btn-primary block text-center">EXPERIMENTE GRÁTIS</Link>
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, label, hasDropdown }: { href: string; label: string; hasDropdown?: boolean }) {
    return (
        <Link href={href} className="flex items-center gap-1 text-sm font-bold text-[#232323] hover:text-[#0088C8] transition-colors">
            {label}
            {hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
        </Link>
    );
}

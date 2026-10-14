'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import type { SessionUser } from '@/lib/session'
import { handleLogout } from '@/app/actions/auth'
import { displayFont, monoFont } from '@/lib/yvyra'
import {
    PinhaoSpiral,
    GuaraniCross,
    KaingangDivider,
} from '@/app/components/YvyraOrnaments'

export function Topbar({ user }: { user: SessionUser | null }) {
    const { lang, setLang } = useLanguage()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)
    const langRef = useRef<HTMLDivElement>(null)

    const t = (pt: string, en: string) => (lang === 'pt' ? pt : en)

    // Detecta scroll para virar vidro musgo
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Fecha popovers ao clicar fora ou pressionar Esc
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const target = e.target as Node
            if (menuRef.current && !menuRef.current.contains(target)) setMenuOpen(false)
            if (langRef.current && !langRef.current.contains(target)) setLangOpen(false)
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMenuOpen(false)
                setLangOpen(false)
            }
        }
        document.addEventListener('mousedown', onClick)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onClick)
            document.removeEventListener('keydown', onKey)
        }
    }, [])

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-[background,border,backdrop-filter] duration-500 ${scrolled ? 'backdrop-blur-xl' : ''
                }`}
            style={{
                backgroundColor: scrolled ? 'rgba(14,23,18,0.72)' : 'transparent',
                borderBottom: `1px solid ${scrolled ? 'rgba(62,86,65,0.55)' : 'transparent'
                    }`,
            }}
        >
            {/* Filete de cobre — assinatura permanente no topo */}
            <div
                aria-hidden
                className="absolute top-0 inset-x-0 h-px opacity-60"
                style={{
                    background:
                        'linear-gradient(90deg, transparent, rgba(199,123,60,0.55), rgba(224,168,75,0.55), rgba(199,123,60,0.55), transparent)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">

                {/* ============================================================
                    LOGO
                   ============================================================ */}
                <Link
                    href="/"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            history.pushState('', document.title, window.location.pathname)
                        }
                    }}
                    className="flex items-center gap-3 group shrink-0"
                >
                    <span className="relative w-9 h-9 flex items-center justify-center">
                        <PinhaoSpiral
                            size={36}
                            color="#C77B3C"
                            className="opacity-70 group-hover:opacity-100 group-hover:rotate-[20deg] transition-all duration-700 ease-out"
                        />
                    </span>
                    <span
                        className={`${displayFont.className} text-3xl tracking-tight font-medium text-[#E6E1D3] group-hover:text-[#E0A84B] transition-colors duration-300`}
                    >
                        Griô
                    </span>
                </Link>



                {/* ============================================================
                    RIGHT ACTIONS
                   ============================================================ */}
                <div className="flex items-center gap-3 shrink-0">

                    {/* Language switcher */}
                    <div ref={langRef} className="relative">
                        <button
                            onClick={() => setLangOpen((v) => !v)}
                            aria-haspopup="true"
                            aria-expanded={langOpen}
                            className={`${monoFont.className} text-[10px] uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-lg border border-[#3E5641]/60 text-[#8FA88C] hover:text-[#E0A84B] hover:border-[#C77B3C]/50 transition cursor-pointer`}
                        >
                            {lang}
                        </button>
                        {langOpen && (
                            <div
                                className="absolute right-0 mt-2 min-w-[120px] rounded-xl border border-[#3E5641]/60 overflow-hidden shadow-xl shadow-black/40"
                                style={{
                                    backgroundColor: 'rgba(14,23,18,0.96)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                {(['pt', 'en'] as const).map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => {
                                            setLang(l)
                                            setLangOpen(false)
                                        }}
                                        className={`block w-full text-left px-3 py-2 text-[10px] uppercase tracking-[0.2em] ${monoFont.className} transition-colors cursor-pointer ${lang === l
                                            ? 'text-[#E0A84B] bg-[#C77B3C]/10'
                                            : 'text-[#8FA88C] hover:text-[#E6E1D3] hover:bg-[#3E5641]/20'
                                            }`}
                                    >
                                        {l === 'pt' ? 'Português' : 'English'}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {user ? (
                        <>
                            {/* New Timeline CTA */}
                            <button
                                onClick={() => console.log('nova timeline')}
                                className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E0A84B] hover:bg-[#f0b95c] text-[#0E1712] text-[11px] tracking-wide font-medium transition-all duration-300 shadow-lg shadow-[#E0A84B]/15 cursor-pointer ${monoFont.className}`}
                            >
                                <span className="text-base leading-none">+</span>
                                {t('Nova Timeline', 'New Timeline')}
                            </button>

                            {/* User dropdown */}
                            <div ref={menuRef} className="relative">
                                <button
                                    onClick={() => setMenuOpen((v) => !v)}
                                    aria-haspopup="true"
                                    aria-expanded={menuOpen}
                                    className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl border border-[#3E5641]/60 bg-[#14201A]/60 hover:border-[#C77B3C]/60 transition-all duration-300 group cursor-pointer"
                                >
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || 'Avatar'}
                                            width={30}
                                            height={30}
                                            className="w-[30px] h-[30px] rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div
                                            className={`w-[30px] h-[30px] rounded-lg bg-[#C77B3C]/15 border border-[#C77B3C]/30 flex items-center justify-center text-[#E0A84B] text-xs font-medium ${monoFont.className}`}
                                        >
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <span
                                        className={`hidden sm:block text-xs text-[#E6E1D3] group-hover:text-[#E0A84B] transition-colors ${monoFont.className}`}
                                    >
                                        {user.name.split(' ')[0]}
                                    </span>
                                    {/* Chevron */}
                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        stroke="currentColor"
                                        className={`text-[#8FA88C] transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''
                                            }`}
                                    >
                                        <path
                                            d="M2 4 L5 7 L8 4"
                                            strokeWidth="1.25"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {menuOpen && (
                                    <div
                                        className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#3E5641]/70 overflow-hidden shadow-2xl shadow-black/60"
                                        style={{
                                            backgroundColor: 'rgba(14,23,18,0.96)',
                                            backdropFilter: 'blur(24px)',
                                        }}
                                        role="menu"
                                    >
                                        {/* Cabeçalho interno do dropdown */}
                                        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                                            <GuaraniCross
                                                size={26}
                                                color="#C77B3C"
                                                className="opacity-80 shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <div
                                                    className={`text-[10px] uppercase tracking-[0.2em] text-[#C77B3C] ${monoFont.className}`}
                                                >
                                                    {t('Narrador', 'Storyteller')}
                                                </div>
                                                <div className="text-sm text-[#E6E1D3] truncate font-medium">
                                                    {user.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divisor Kaingang */}
                                        <div className="px-4">
                                            <KaingangDivider
                                                className="w-full h-2.5 opacity-30"
                                                color="#C77B3C"
                                            />
                                        </div>

                                        {/* Itens do menu */}
                                        <div className="p-2">
                                            {[
                                                {
                                                    href: '/dashboard',
                                                    label: t('Painel', 'Dashboard'),
                                                    icon: '◈',
                                                },
                                                {
                                                    href: '/gallery',
                                                    label: t('Minha Galeria', 'My Gallery'),
                                                    icon: '◉',
                                                },
                                                {
                                                    href: '/settings',
                                                    label: t('Configurações', 'Settings'),
                                                    icon: '⚙',
                                                },
                                            ].map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setMenuOpen(false)}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8FA88C] hover:text-[#E0A84B] hover:bg-[#3E5641]/25 transition-colors ${monoFont.className}`}
                                                    role="menuitem"
                                                >
                                                    <span className="text-[#C77B3C] text-base w-4 text-center">
                                                        {item.icon}
                                                    </span>
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Sign out */}
                                        <div className="border-t border-[#3E5641]/50 p-2">
                                            <form action={handleLogout}>
                                                <button
                                                    type="submit"
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8FA88C] hover:text-[#A63D2F] hover:bg-[#A63D2F]/10 transition-colors cursor-pointer text-left ${monoFont.className}`}
                                                    role="menuitem"
                                                >
                                                    <span className="text-[#A63D2F] text-base w-4 text-center">
                                                        ⏻
                                                    </span>
                                                    {t('Encerrar sessão', 'Sign out')}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className={`text-[11px] uppercase tracking-[0.2em] px-3 py-2 text-[#8FA88C] hover:text-[#E6E1D3] transition-colors ${monoFont.className}`}
                            >
                                {t('Entrar', 'Sign In')}
                            </Link>
                            <Link
                                href="/signup"
                                className={`px-4 py-2.5 rounded-xl bg-[#E0A84B] hover:bg-[#f0b95c] text-[#0E1712] text-[11px] tracking-wide font-medium transition-all duration-300 shadow-lg shadow-[#E0A84B]/15 ${monoFont.className}`}
                            >
                                {t('Criar Conta', 'Sign Up')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
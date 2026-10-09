'use client'

import Link from 'next/link'
import { useLanguage } from '@/app/context/LanguageContext'
import type { SessionUser } from '@/lib/session'
import Image from 'next/image'
import { handleLogout } from '@/app/actions/auth'


export function Topbar({ user }: { user: SessionUser | null }) {
    const { lang, setLang } = useLanguage()

    return (
        <header className="w-full border-b border-stone-800 bg-stone-950/60 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            history.pushState('', document.title, window.location.pathname)
                        }
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <span className="font-serif text-4xl tracking-tight text-stone-100 font-medium">
                        Griô
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* Pill do Usuário / Link para o Dashboard */}
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-stone-900/80 border border-stone-800/80 hover:border-amber-400/40 transition group"
                            >
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || 'Avatar'}
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-mono text-xs font-medium">
                                        {user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                                <span className="text-xs font-mono text-stone-200 group-hover:text-amber-400 transition">
                                    {user.name.split(' ')[0]}
                                </span>
                            </Link>

                            {/* Botão de Sair */}
                            <form action={handleLogout}>
                                <button
                                    type="submit"
                                    className="text-xs font-mono text-stone-400 hover:text-rose-400 transition px-2 py-2 cursor-pointer"
                                    title={lang === 'pt' ? 'Sair da conta' : 'Sign out'}
                                >
                                    {lang === 'pt' ? 'Sair' : 'Sign Out'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="text-xs font-mono text-stone-300 hover:text-stone-100 transition px-3 py-2"
                            >
                                {lang === 'pt' ? 'Entrar' : 'Sign In'}
                            </Link>
                            <Link
                                href="/signup"
                                className="text-xs font-mono bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2 rounded-xl font-medium transition shadow-sm"
                            >
                                {lang === 'pt' ? 'Criar Conta' : 'Sign Up'}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header >
    )
}
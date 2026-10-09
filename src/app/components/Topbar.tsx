'use client'

import Link from 'next/link'
import { handleLogout } from '@/app/actions/auth'
import { useLanguage } from '@/app/context/LanguageContext'
type SessionUser = {
    id: string
    name: string
    email: string
    image: string | null
    emailVerified: Date | null
} | null


export function Topbar({ user }: { user: SessionUser }) {



    const { lang, setLang } = useLanguage()

    return (
        <header className="w-full border-b border-stone-800 bg-stone-950/60 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-serif text-xl tracking-tight text-stone-100 font-medium">
                        Griô <span className="text-amber-400">🏺</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">

                    {user ? (
                        <>
                            <div className="flex">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center">
                                        <span className="text-xs font-bold text-stone-300">
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <span className="text-xs font-mono text-stone-300 px-3 py-2">
                                    {user.name}
                                </span>
                            </div>
                            <form action={handleLogout}>
                                <button
                                    type="submit"
                                    className="text-xs font-mono text-stone-300 hover:text-rose-400 transition px-3 py-2"
                                >
                                    {lang === 'pt' ? 'Sair' : 'Sign Out'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-xs font-mono text-stone-300 hover:text-stone-100 transition px-3 py-2"
                            >
                                {lang === 'pt' ? 'Entrar' : 'Sign In'}
                            </Link>
                            <Link
                                href="/signup"
                                className="text-xs font-mono text-stone-300 hover:text-stone-100 px-4 py-2 rounded-xl font-medium transition shadow-sm"
                            >
                                {lang === 'pt' ? 'Criar Conta' : 'Sign Up'}
                            </Link>
                        </>
                    )}
                    {lang === 'pt' ? (
                        <button
                            onClick={() => setLang('en')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-xs font-mono text-stone-300 transition shadow-sm"
                            title="Switch to English"
                        >
                            <span>🇺🇸</span>
                            <span className="hidden sm:inline">EN</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => setLang('pt')}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-xs font-mono text-stone-300 transition shadow-sm"
                            title="Mudar para Português"
                        >
                            <span>🇧🇷</span>
                            <span className="hidden sm:inline">BR</span>
                        </button>
                    )}

                </div>
            </div >
        </header >
    )
}
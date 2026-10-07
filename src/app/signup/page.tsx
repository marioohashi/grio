'use client'

import { useActionState } from 'react'
import { handleSignup } from '@/app/actions/auth'
import Link from 'next/link'

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(handleSignup, null)

    return (
        <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center px-6 py-12">
            <div className="w-full max-w-md bg-stone-900/80 border border-stone-800 p-8 rounded-2xl shadow-xl backdrop-blur-md">

                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-serif text-stone-100 font-medium mb-2">Criar Conta no Griô</h1>
                    <p className="text-xs text-stone-400 font-mono">Comece a preservar suas memórias com segurança.</p>
                </div>

                {/* Botão de Login com Google */}
                <button
                    type="button"
                    onClick={() => alert('Integração com Google Auth pronta para ser acoplada via NextAuth/Auth.js')}
                    className="w-full mb-6 py-3 px-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-200 text-sm font-medium flex items-center justify-center gap-3 transition"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.3 9 5 12 5z" />
                        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                        <path fill="#FBBC05" d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.9 6.4C.7 8.8 0 11.3 0 14s.7 5.2 1.9 7.6l3.7-2.9z" />
                        <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.8 5.6 7 10.1 7z" />
                    </svg>
                    Continuar com o Google
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-stone-800"></div>
                    <span className="px-3 text-xs font-mono text-stone-500 uppercase">ou com e-mail</span>
                    <div className="flex-grow border-t border-stone-800"></div>
                </div>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">Nome Completo</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Seu nome"
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                            required
                        />
                        {state?.errors?.name && <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.name[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="seu@email.com"
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                            required
                        />
                        {state?.errors?.email && <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.email[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">Senha Segura</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mín. 8 caracteres, maiúscula, número e símbolo"
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                            required
                        />
                        {state?.errors?.password && (
                            <div className="mt-2 space-y-1">
                                {state.errors.password.map((err: string, i: number) => (
                                    <p key={i} className="text-xs text-rose-400 font-mono">• {err}</p>
                                ))}
                            </div>
                        )}
                    </div>

                    {state?.message && <p className="text-xs text-rose-400 font-mono">{state.message}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-sm transition font-mono tracking-wide disabled:opacity-50"
                    >
                        {isPending ? 'Criando conta...' : 'Criar Conta'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-stone-400 font-mono">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="text-amber-400 hover:underline">
                        Entrar
                    </Link>
                </p>

            </div>
        </div>
    )
}
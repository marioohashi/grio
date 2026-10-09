'use client'

import { useActionState, useState, useMemo } from 'react'
import { handleSignup } from '@/app/actions/auth'
import Link from 'next/link'

type PasswordRule = {
    id: string
    label: string
    test: (value: string) => boolean
}

const PASSWORD_RULES: PasswordRule[] = [
    { id: 'min', label: 'A senha deve ter no mínimo 8 caracteres.', test: (v) => v.length >= 8 },
    { id: 'upper', label: 'A senha deve conter ao menos uma letra maiúscula.', test: (v) => /[A-Z]/.test(v) },
    { id: 'number', label: 'A senha deve conter ao menos um número.', test: (v) => /[0-9]/.test(v) },
    { id: 'symbol', label: 'A senha deve conter ao menos um símbolo.', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

function CheckEmailScreen({ email }: { email: string }) {
    return (
        <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center px-6 py-12">
            <div className="w-full max-w-md bg-stone-900/80 border border-stone-800 p-8 rounded-2xl shadow-xl backdrop-blur-md text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                </div>

                <h1 className="text-xl font-serif text-stone-100 mb-3">
                    Confirmar seu e-mail
                </h1>
                <p className="text-sm text-stone-400 font-mono leading-relaxed">
                    Enviamos um link de confirmação para
                </p>
                <p className="text-sm text-amber-400 font-mono mt-1 mb-6 break-all">
                    {email}
                </p>
                <p className="text-xs text-stone-500 font-mono leading-relaxed">
                    Abre a caixa de entrada (e o spam, vai) e clica no link pra ativar tua conta.
                </p>

                <div className="mt-8 pt-6 border-t border-stone-800">
                    <Link href="/login" className="text-xs text-stone-400 hover:text-amber-400 font-mono transition">
                        Já confirmei → Entrar
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(handleSignup, null)

    // Campos controlados para não perderem valor em erro de submit
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [passwordsMatchError, setPasswordsMatchError] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Requisitos ainda não cumpridos
    const pendingRules = useMemo(
        () => PASSWORD_RULES.filter((rule) => !rule.test(password)),
        [password]
    )

    const handleSubmit = (formData: FormData) => {
        if (password !== confirmPassword) {
            setPasswordsMatchError(true)
            return
        }
        setPasswordsMatchError(false)
        formAction(formData)
    }

    if (state?.status === 'sent') {
        return <CheckEmailScreen email={state.email} />
    }


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

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">Nome Completo</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                            required
                        />
                        {/* {state?.errors?.name && <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.name[0]}</p>} */}
                        {state?.status === 'error' && !state?.errors?.name && <p className="text-xs text-rose-400 mt-1 font-mono">{state.message}</p>}

                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                            required
                        />
                        {state?.status === 'error' && !state?.errors?.email && <p className="text-xs text-rose-400 mt-1 font-mono">{state.message}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">Senha Segura</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mín. 8 caracteres, maiúscula, número e símbolo"
                                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 pr-12 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-400 transition"
                                tabIndex={-1}
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Feedback em tempo real (cliente) */}
                        {password.length > 0 && pendingRules.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {pendingRules.map((rule) => (
                                    <p key={rule.id} className="text-xs text-rose-400 font-mono">
                                        {rule.label}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Erros do servidor só quando o cliente não está mostrando nada */}
                        {state?.status === 'error' && state.errors?.password && password.length === 0
                            && (
                                <div className="mt-2 space-y-1">
                                    {state.errors.password.map((err: string, i: number) => (
                                        <p key={i} className="text-xs text-rose-400 font-mono">{err}</p>
                                    ))}
                                </div>
                            )}
                    </div>

                    {/* Campo de Confirmação de Senha */}
                    {password.length > 0 && (
                        <div className="transition-all duration-300 animate-fadeIn">
                            <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">Confirmar Senha</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        if (passwordsMatchError) setPasswordsMatchError(false)
                                    }}
                                    placeholder="Digite a senha novamente"
                                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 pr-12 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-400 transition"
                                    tabIndex={-1}
                                    aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {(passwordsMatchError || (confirmPassword.length > 0 && password !== confirmPassword)) && (
                                <p className="text-xs text-rose-400 mt-1 font-mono">As senhas não coincidem.</p>
                            )}
                        </div>
                    )}

                    {state?.status === 'error' && state?.message && <p className="text-xs text-rose-400 font-mono">{state.message}</p>}

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
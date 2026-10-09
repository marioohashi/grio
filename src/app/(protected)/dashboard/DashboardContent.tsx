'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { updateUserProfile, type UserFormState } from '@/app/actions/user'
import Image from 'next/image'
import Link from 'next/link'
import type { SessionUser } from '@/lib/session'

interface DashboardContentProps {
    user: SessionUser
}

export function DashboardContent({ user }: DashboardContentProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'timelines' | 'settings'>('overview')
    const [state, formAction, isPending] = useActionState<UserFormState, FormData>(
        updateUserProfile,
        null
    )

    return (
        <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950">
            {/* Header do Dashboard */}
            <div className="border-b border-stone-800/60 bg-stone-900/40 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-inner flex items-center justify-center">
                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'Avatar'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-xl font-serif font-medium text-amber-400">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-medium text-stone-100">
                                Olá, {user?.name} 🏺
                            </h1>
                            <p className="text-xs font-mono text-stone-400 mt-1">
                                {user?.email} {user?.emailVerified && <span className="text-emerald-400 ml-2">● Verificado</span>}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="px-4 py-2 rounded-xl border border-stone-800 bg-stone-900/50 hover:bg-stone-800 text-stone-300 text-xs font-mono transition"
                        >
                            ← Voltar ao Início
                        </Link>
                    </div>
                </div>

                {/* Abas de Navegação */}
                <div className="max-w-6xl mx-auto px-6 flex gap-8 border-t border-stone-800/40">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-3 text-xs font-mono transition border-b-2 cursor-pointer ${activeTab === 'overview'
                            ? 'border-amber-400 text-amber-400'
                            : 'border-transparent text-stone-400 hover:text-stone-200'
                            }`}
                    >
                        Visão Geral
                    </button>
                    <button
                        onClick={() => setActiveTab('timelines')}
                        className={`py-3 text-xs font-mono transition border-b-2 cursor-pointer ${activeTab === 'timelines'
                            ? 'border-amber-400 text-amber-400'
                            : 'border-transparent text-stone-400 hover:text-stone-200'
                            }`}
                    >
                        Minhas Timelines
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`py-3 text-xs font-mono transition border-b-2 cursor-pointer ${activeTab === 'settings'
                            ? 'border-amber-400 text-amber-400'
                            : 'border-transparent text-stone-400 hover:text-stone-200'
                            }`}
                    >
                        Configurações da Conta
                    </button>
                </div>
            </div>

            {/* Conteúdo das Abas */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* ABA 1: VISÃO GERAL */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 shadow-lg">
                                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Timelines Ativas</span>
                                <p className="text-3xl font-serif font-medium text-stone-100 mt-2">0</p>
                                <p className="text-xs text-stone-400 mt-1 font-mono">Nenhuma linha do tempo criada ainda.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 shadow-lg">
                                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Memórias Guardadas</span>
                                <p className="text-3xl font-serif font-medium text-stone-100 mt-2">0</p>
                                <p className="text-xs text-stone-400 mt-1 font-mono">Momentos eternizados no cofre.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 shadow-lg">
                                <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Status da Conta</span>
                                <p className="text-3xl font-serif font-medium text-amber-400 mt-2">Ativa</p>
                                <p className="text-xs text-stone-400 mt-1 font-mono">Segurança padrão (JWT).</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-stone-900/80 to-stone-950 border border-stone-800">
                            <h3 className="text-xl font-serif text-stone-100 mb-2">Comece a sua jornada no Griô</h3>
                            <p className="text-sm text-stone-400 max-w-xl leading-relaxed mb-6 font-mono">
                                Crie sua primeira linha do tempo colaborativa para preservar memórias de família, viagens ou grandes capítulos da vida livre de ruídos algorítmicos.
                            </p>
                            <button
                                onClick={() => setActiveTab('timelines')}
                                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-medium transition cursor-pointer shadow-lg shadow-amber-400/10"
                            >
                                Criar Nova Timeline →
                            </button>
                        </div>
                    </div>
                )}

                {/* ABA 2: MINHAS TIMELINES */}
                {activeTab === 'timelines' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-serif text-stone-100">Suas Linhas do Tempo</h2>
                                <p className="text-xs font-mono text-stone-400 mt-1">Gerencie seus cofres digitais e convide colaboradores.</p>
                            </div>
                            <button
                                onClick={() => alert('Editor de nova timeline em breve!')}
                                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-medium transition cursor-pointer"
                            >
                                + Nova Timeline
                            </button>
                        </div>

                        <div className="p-12 text-center rounded-2xl border border-dashed border-stone-800 bg-stone-900/20">
                            <p className="text-stone-400 font-mono text-xs mb-4">Você ainda não possui nenhuma linha do tempo criada.</p>
                        </div>
                    </div>
                )}

                {/* ABA 3: CONFIGURAÇÕES DE PERFIL */}
                {activeTab === 'settings' && (
                    <div className="max-w-xl space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-serif text-stone-100">Configurações de Perfil</h2>
                            <p className="text-xs font-mono text-stone-400 mt-1">Atualize suas informações pessoais e foto de exibição.</p>
                        </div>

                        <form action={formAction} className="space-y-5 p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 shadow-xl">
                            {/* Mensagem de Sucesso */}
                            {state?.success && (
                                <p className="text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 p-3 rounded-xl">
                                    {state.message}
                                </p>
                            )}

                            {/* Mensagem de Erro */}
                            {state?.success === false && state?.message && (
                                <p className="text-xs font-mono text-rose-400 bg-rose-950/30 border border-rose-900/50 p-3 rounded-xl">
                                    {state.message}
                                </p>
                            )}

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={user?.name || ''}
                                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                                    required
                                />
                                {state?.errors?.name && (
                                    <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.name[0]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                    E-mail (Não editável)
                                </label>
                                <input
                                    type="email"
                                    disabled
                                    value={user?.email || ''}
                                    className="w-full bg-stone-950/50 border border-stone-900 rounded-xl px-4 py-3 text-stone-500 text-sm cursor-not-allowed select-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                    URL da Foto de Perfil (Avatar)
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    defaultValue={user?.image || ''}
                                    placeholder="https://exemplo.com/sua-foto.jpg"
                                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                                />
                                {state?.errors?.image && (
                                    <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.image[0]}</p>
                                )}
                                <span className="text-[10px] font-mono text-stone-500 mt-1 block">
                                    Cole o link direto de uma imagem online ou mantenha o avatar atual.
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-medium transition cursor-pointer disabled:opacity-50"
                            >
                                {isPending ? 'Salvando alterações...' : 'Salvar Alterações'}
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    )
}
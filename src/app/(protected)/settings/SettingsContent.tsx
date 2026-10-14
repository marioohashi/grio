'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { updateUserProfile, type UserFormState } from '@/app/actions/user'
import { ImageUpload } from '@/app/components/ImageUpload'
import Image from 'next/image'
import type { SessionUser } from '@/lib/session'

interface SettingsContentProps {
    user: SessionUser
}

export function SettingsContent({ user }: SettingsContentProps) {
    const [activeTab, setActiveTab] = useState<'user' | 'timelines'>('user')
    const [state, formAction, isPending] = useActionState<UserFormState, FormData>(
        updateUserProfile,
        null
    )

    return (
        <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950">
            {/* Header do Settings */}
            <div className="border-b border-stone-800/60 bg-stone-900/40 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-inner flex items-center justify-center">
                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'Avatar'}
                                    width={64}
                                    height={64}
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
                </div>

                {/* Abas de Navegação */}
                <div className="max-w-5xl mx-auto px-6 flex gap-8 border-t border-stone-800/40">
                    <button
                        onClick={() => setActiveTab('user')}
                        className={`py-3 text-xs font-mono transition border-b-2 cursor-pointer ${activeTab === 'user'
                            ? 'border-amber-400 text-amber-400'
                            : 'border-transparent text-stone-400 hover:text-stone-200'
                            }`}
                    >
                        Configurações de Usuário
                    </button>
                    <button
                        onClick={() => setActiveTab('timelines')}
                        className={`py-3 text-xs font-mono transition border-b-2 cursor-pointer ${activeTab === 'timelines'
                            ? 'border-amber-400 text-amber-400'
                            : 'border-transparent text-stone-400 hover:text-stone-200'
                            }`}
                    >
                        Configurações de Timelines
                    </button>
                </div>
            </div>

            {/* Conteúdo das Abas */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* ABA 1: CONFIGURAÇÕES DE USUÁRIO */}
                {activeTab === 'user' && (
                    <div className="max-w-2xl space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-serif text-stone-100">Gerenciar Conta</h2>
                            <p className="text-xs font-mono text-stone-400 mt-1">Atualize suas credenciais, dados pessoais e informações de acesso.</p>
                        </div>

                        <form action={formAction} className="space-y-6 p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 shadow-xl">
                            {/* Mensagem de Sucesso */}
                            {state?.success && (
                                <p className="text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 p-3.5 rounded-xl">
                                    {state.message}
                                </p>
                            )}

                            {/* Mensagem de Erro Geral */}
                            {state?.success === false && state?.message && (
                                <p className="text-xs font-mono text-rose-400 bg-rose-950/30 border border-rose-900/50 p-3.5 rounded-xl">
                                    {state.message}
                                </p>
                            )}

                            {/* SEÇÃO 1: DADOS PESSOAIS */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-medium pb-2 border-b border-stone-800">
                                    Informações Pessoais
                                </h3>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={user?.name || ''}
                                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition font-sans"
                                        required
                                    />
                                    {state?.errors?.name && (
                                        <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.name[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                        E-mail de Acesso
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={user?.email || ''}
                                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition font-mono"
                                        required
                                    />
                                    {state?.errors?.email && (
                                        <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.email[0]}</p>
                                    )}
                                </div>

                                {/* Componente Reutilizável de Upload de Imagem */}
                                <ImageUpload
                                    defaultValue={user?.image}
                                    name="image"
                                    label="Foto de Perfil (Avatar)"
                                />
                                {state?.errors?.image && (
                                    <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.image[0]}</p>
                                )}
                            </div>

                            {/* SEÇÃO 2: SEGURANÇA E SENHA */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-medium pb-2 border-b border-stone-800">
                                    Segurança e Senha
                                </h3>
                                <p className="text-xs text-stone-400 font-mono">
                                    Deixe os campos de senha em branco caso não deseje alterá-la.
                                </p>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                        Senha Atual
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        placeholder="••••••••"
                                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition font-mono"
                                    />
                                    {state?.errors?.currentPassword && (
                                        <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.currentPassword[0]}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                            Nova Senha
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="Mínimo 6 caracteres"
                                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition font-mono"
                                        />
                                        {state?.errors?.newPassword && (
                                            <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.newPassword[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                                            Confirmar Nova Senha
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Repita a nova senha"
                                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition font-mono"
                                        />
                                        {state?.errors?.confirmPassword && (
                                            <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.confirmPassword[0]}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-medium transition cursor-pointer disabled:opacity-50 shadow-lg shadow-amber-400/10"
                                >
                                    {isPending ? 'Salvando alterações...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ABA 2: CONFIGURAÇÕES DE TIMELINES */}
                {activeTab === 'timelines' && (
                    <div className="max-w-2xl space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-serif text-stone-100">Configurações de Timelines</h2>
                            <p className="text-xs font-mono text-stone-400 mt-1">Gerencie preferências globais para seus cofres e memórias.</p>
                        </div>

                        <div className="p-8 rounded-2xl bg-stone-900/50 border border-stone-800/80 shadow-xl space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
                                <span className="text-2xl">🏺</span>
                                <div>
                                    <h3 className="text-sm font-mono font-medium text-stone-200">Preferências Padrão de Cofres</h3>
                                    <p className="text-xs text-stone-400 font-mono">Defina o comportamento inicial ao criar novas linhas do tempo.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-start gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:border-stone-700 transition">
                                    <input type="checkbox" defaultChecked className="mt-0.5 rounded border-stone-800 bg-stone-900 text-amber-400 focus:ring-amber-400" />
                                    <div className="space-y-1">
                                        <span className="text-xs font-mono text-stone-200 block font-medium">Notificações de Colaboradores</span>
                                        <span className="text-[11px] text-stone-400 font-mono block">Receber aviso por e-mail quando alguém adicionar uma nova memória em suas timelines compartilhadas.</span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 p-4 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:border-stone-700 transition">
                                    <input type="checkbox" className="mt-0.5 rounded border-stone-800 bg-stone-900 text-amber-400 focus:ring-amber-400" />
                                    <div className="space-y-1">
                                        <span className="text-xs font-mono text-stone-200 block font-medium">Privacidade Rigorosa por Padrão</span>
                                        <span className="text-[11px] text-stone-400 font-mono block">Tornar novas timelines estritamente privadas (visíveis apenas para você) ao criá-las.</span>
                                    </div>
                                </label>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    onClick={() => alert('Preferências de timelines salvas com sucesso!')}
                                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-medium transition cursor-pointer"
                                >
                                    Salvar Preferências
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
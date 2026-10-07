'use client'

import { useState } from 'react'

export function UserForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            // Aqui entra a chamada para a Server Action de cadastro ou API
            setMessage('Usuário cadastrado com sucesso!')
            setName('')
            setEmail('')
        } catch (error) {
            setMessage('Erro ao cadastrar usuário.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-serif text-stone-100 mb-2">Junte-se ao Griô</h3>
            <p className="text-xs text-stone-400 font-mono mb-6">Crie seu perfil para começar a registrar timelines.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition"
                        required
                    />
                </div>

                {message && (
                    <p className="text-xs font-mono text-amber-400">{message}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-sm transition font-mono tracking-wide disabled:opacity-50"
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar na Home'}
                </button>
            </form>
        </div>
    )
}
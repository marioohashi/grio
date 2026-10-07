'use client'
import { useActionState } from 'react'
import { registerUser, UserFormState } from '@/app/actions/user'

const initialState: UserFormState = {
    success: false,
    message: '',
}

export function UserForm() {
    const [state, formAction, isPending] = useActionState(registerUser, initialState)

    return (
        <div className="p-6 md:p-8 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl backdrop-blur-md">
            <div className="mb-6">
                <h3 className="text-xl font-serif font-medium text-stone-100 mb-1">
                    Novo Membro do Cofre
                </h3>
                <p className="text-xs text-stone-400 font-mono">
                    Cadastre um novo perfil para começar a registrar timelines.
                </p>
            </div>

            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ex: Ana Clara Ohashi"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400 transition"
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
                        placeholder="ana@grio.app"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-400 transition"
                        required
                    />
                    {state?.errors?.email && (
                        <p className="text-xs text-rose-400 mt-1 font-mono">{state.errors.email[0]}</p>
                    )}
                </div>

                {state?.message && (
                    <div className={`p-3 rounded-xl text-xs font-mono border ${state.success
                        ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-800/50 text-rose-300'
                        }`}>
                        {state.message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-sm transition font-mono tracking-wide disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-400/10"
                >
                    {isPending ? 'Salvando no Banco...' : 'Cadastrar Usuário'}
                </button>
            </form>
        </div>
    )
}
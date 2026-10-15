'use client'

import { useState } from 'react'
import { YVYRA, displayFont, bodyFont, monoFont } from '@/lib/yvyra'
import { CornerBrackets, GuaraniCross, PinhaoSpiral } from '@/app/components/YvyraOrnaments'
import { createTimeline } from '@/app/actions/timeline'

interface CreateTimelineModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CreateTimelineModal({ isOpen, onClose }: CreateTimelineModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('PERSONAL')
    const [visibility, setVisibility] = useState<'PRIVATE' | 'PUBLIC' | 'SHARED'>('PRIVATE')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await createTimeline({
                title,
                description,
                category,
                visibility,
            })
            // Limpa formulário e fecha
            setTitle('')
            setDescription('')
            onClose()
        } catch (err: any) {
            setError(err.message || 'Erro ao criar a linha do tempo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-[#0E1712] z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div
                className="relative w-full max-w-xl rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl transition-all"
                style={{
                    backgroundColor: YVYRA.bgDeep,
                    border: `1px solid ${YVYRA.lichen}`,
                }}
            >
                <CornerBrackets color={YVYRA.copper} />

                {/* Cabeçalho */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4" style={{ borderBottom: `1px solid ${YVYRA.lichen}60` }}>
                    <div className="flex items-center gap-3">
                        <GuaraniCross size={22} color={YVYRA.copper} />
                        <h3 className={`${displayFont.className} text-xl md:text-2xl font-medium`} style={{ color: YVYRA.bone }}>
                            Plantar Nova Semente
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className={`${monoFont.className} text-xs uppercase hover:opacity-80 transition cursor-pointer`}
                        style={{ color: YVYRA.fern }}
                    >
                        ✕ Fechar
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg text-xs" style={{ backgroundColor: '#4a1515', color: '#fca5a5' }}>
                        {error}
                    </div>
                )}

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={`${monoFont.className} text-[10px] uppercase tracking-[0.2em] block mb-2`} style={{ color: YVYRA.copper }}>
                            Título da Linha do Tempo *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: Família Ohashi, Viagens, Projetos..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`${bodyFont.className} w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition`}
                            style={{
                                backgroundColor: `${YVYRA.surface}80`,
                                color: YVYRA.bone,
                                border: `1px solid ${YVYRA.lichen}`,
                            }}
                        />
                    </div>

                    <div>
                        <label className={`${monoFont.className} text-[10px] uppercase tracking-[0.2em] block mb-2`} style={{ color: YVYRA.copper }}>
                            Descrição / Propósito
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Descreva brevemente a história ou propósito desta linha viva..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`${bodyFont.className} w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition resize-none`}
                            style={{
                                backgroundColor: `${YVYRA.surface}80`,
                                color: YVYRA.bone,
                                border: `1px solid ${YVYRA.lichen}`,
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={`${monoFont.className} text-[10px] uppercase tracking-[0.2em] block mb-2`} style={{ color: YVYRA.copper }}>
                                Categoria
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`${monoFont.className} text-xs w-full px-3 py-3 rounded-xl focus:outline-none cursor-pointer`}
                                style={{
                                    backgroundColor: `${YVYRA.surface}80`,
                                    color: YVYRA.bone,
                                    border: `1px solid ${YVYRA.lichen}`,
                                }}
                            >
                                <option value="PERSONAL">Pessoal / Família</option>
                                <option value="TRAVEL">Viagens & Expedições</option>
                                <option value="PROJECT">Projetos & Legado</option>
                                <option value="MEMOIR">Memórias & Crônicas</option>
                            </select>
                        </div>

                        <div>
                            <label className={`${monoFont.className} text-[10px] uppercase tracking-[0.2em] block mb-2`} style={{ color: YVYRA.copper }}>
                                Visibilidade
                            </label>
                            <select
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value as any)}
                                className={`${monoFont.className} text-xs w-full px-3 py-3 rounded-xl focus:outline-none cursor-pointer`}
                                style={{
                                    backgroundColor: `${YVYRA.surface}80`,
                                    color: YVYRA.bone,
                                    border: `1px solid ${YVYRA.lichen}`,
                                }}
                            >
                                <option value="PRIVATE">Privada (Só membros)</option>
                                <option value="SHARED">Compartilhada (Com link)</option>
                                <option value="PUBLIC">Pública</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`${monoFont.className} text-xs px-5 py-3 rounded-xl uppercase tracking-wider transition cursor-pointer`}
                            style={{ color: YVYRA.fern }}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`${monoFont.className} inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs uppercase tracking-[0.2em] transition cursor-pointer disabled:opacity-50`}
                            style={{
                                backgroundColor: YVYRA.amber,
                                color: YVYRA.bg,
                                boxShadow: '0 10px 30px -10px rgba(224,168,75,0.4)',
                            }}
                        >
                            <PinhaoSpiral size={16} color={YVYRA.bg} className={loading ? 'animate-spin' : ''} />
                            {loading ? 'Cultivando...' : 'Criar Linha do Tempo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
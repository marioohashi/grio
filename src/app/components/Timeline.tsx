'use client'

import { useRef, useState } from 'react'
import type { TimelineData } from '@/app/types/timeline'
import { Memory } from './Memory'

interface TimelineProps {
    data: TimelineData
    showCta?: boolean
}

export function Timeline({ data, showCta = true }: TimelineProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const { title, description, memories, isExample, collaboratorCount, visibility } = data
    const firstDate = memories[0]?.date
    const lastDate = memories[memories.length - 1]?.date

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0))
        setScrollLeft(scrollRef.current?.scrollLeft || 0)
    }

    const handleMouseLeave = () => setIsDragging(false)
    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 1.5
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk
        }
    }

    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY
        }
    }

    return (
        <section className="w-full py-16 select-none">
            {/* Cabeçalho mantido dentro da largura máxima padrão para harmonia visual */}
            <div className="max-w-7xl mx-auto px-6 mb-10">
                {isExample && (
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-amber-400/80 border border-amber-400/20 bg-amber-400/5 rounded-full px-3 py-1 mb-4">
                        Exemplo de linha do tempo
                    </span>
                )}
                <div className="max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-100 mb-3 leading-tight">
                        {title}
                    </h2>
                    <p className="text-stone-400 text-base md:text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-stone-500">
                    <span><span className="text-stone-300">{memories.length}</span> memórias</span>
                    {firstDate && lastDate && (
                        <>
                            <span className="hidden md:inline">·</span>
                            <span>{firstDate} <span className="text-stone-600">→</span> {lastDate}</span>
                        </>
                    )}
                    {collaboratorCount !== undefined && (
                        <>
                            <span className="hidden md:inline">·</span>
                            <span><span className="text-stone-300">{collaboratorCount}</span> colaboradores</span>
                        </>
                    )}
                    {visibility && (
                        <>
                            <span className="hidden md:inline">·</span>
                            <span className={visibility === 'PRIVATE' ? 'text-emerald-400/80' : ''}>
                                {visibility === 'PRIVATE' && 'privada'}
                                {visibility === 'PUBLIC' && 'pública'}
                                {visibility === 'SHARED' && 'compartilhada'}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Container do carrossel ocupando 100% da largura da tela */}
            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onWheel={handleWheel}
                className="overflow-x-auto pb-12 pt-4 cursor-grab active:cursor-grabbing w-full"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* W-max e espaçamento lateral adaptativo para fluidez total */}
                <div className="relative inline-flex items-end gap-6 px-6 md:px-12 w-max">
                    <div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent"
                        style={{ top: '18px' }}
                    />
                    {memories.map((memory, index) => (
                        <Memory key={memory.id} memory={memory} index={index} />
                    ))}
                </div>
            </div>

            {/* Hint + CTA */}
            <div className="flex justify-center mt-2">
                <p className="text-[10px] text-stone-400 font-mono">
                    ← Arraste ou use o scroll para navegar →
                </p>
            </div>

            {showCta && (
                <div className="max-w-7xl mx-auto px-6 mt-8 flex justify-center">
                    <a
                        href="/signup"
                        className="text-xs font-mono uppercase tracking-widest text-stone-900 bg-amber-400 hover:bg-stone-400 transition px-6 py-3 border border-stone-800 rounded-xl hover:border-amber-400/40"
                    >
                        Criar minha própria linha do tempo →
                    </a>
                </div>
            )}
        </section>
    )
}
'use client'

import { useRef, useState } from 'react'
import type { TimelineData } from '@/app/types/timeline'
import { Memory } from './Memory'
import { YVYRA, displayFont, bodyFont, monoFont } from '@/lib/yvyra'
import {
    GuaraniCross,
    KaingangDivider,
    PinhaoSpiral,
} from '@/app/components/YvyraOrnaments'

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
        <section className={`w-full py-16 select-none ${bodyFont.className}`}>

            {/* ============================================================
                CABEÇALHO DA SEÇÃO
               ============================================================ */}
            <div className="max-w-7xl mx-auto px-6 mb-12">

                {/* Eyebrow — Cruz Guarani + badge "Exemplo" */}
                {isExample && (
                    <div className="flex items-center gap-3 mb-5">
                        <GuaraniCross size={22} color={YVYRA.copper} className="opacity-90" />
                        <span
                            className={`${monoFont.className} text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-full`}
                            style={{
                                color: YVYRA.amber,
                                border: `1px solid ${YVYRA.copper}50`,
                                backgroundColor: `${YVYRA.copper}10`,
                            }}
                        >
                            Exemplo de linha do tempo
                        </span>
                    </div>
                )}

                <div className="max-w-3xl">
                    <h2
                        className={`${displayFont.className} text-3xl md:text-5xl font-medium tracking-tight mb-4 leading-tight`}
                        style={{ color: YVYRA.bone }}
                    >
                        {title}
                    </h2>
                    <p
                        className={`${bodyFont.className} text-base md:text-lg leading-relaxed`}
                        style={{ color: YVYRA.fern }}
                    >
                        {description}
                    </p>
                </div>

                {/* Metadata — linha de instrumento */}
                <div className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs ${monoFont.className}`}>
                    <span style={{ color: YVYRA.fern }}>
                        <span style={{ color: YVYRA.bone }}>{memories.length}</span> memórias
                    </span>
                    {firstDate && lastDate && (
                        <>
                            <span style={{ color: YVYRA.lichen }}>·</span>
                            <span style={{ color: YVYRA.fern }}>
                                {firstDate}{' '}
                                <span style={{ color: YVYRA.copper }}>→</span>{' '}
                                {lastDate}
                            </span>
                        </>
                    )}
                    {collaboratorCount !== undefined && (
                        <>
                            <span style={{ color: YVYRA.lichen }}>·</span>
                            <span style={{ color: YVYRA.fern }}>
                                <span style={{ color: YVYRA.bone }}>{collaboratorCount}</span> colaboradores
                            </span>
                        </>
                    )}
                    {visibility && (
                        <>
                            <span style={{ color: YVYRA.lichen }}>·</span>
                            <span style={{ color: YVYRA.fern }}>
                                {visibility === 'PRIVATE' && 'privada'}
                                {visibility === 'PUBLIC' && 'pública'}
                                {visibility === 'SHARED' && 'compartilhada'}
                            </span>
                        </>
                    )}
                </div>

                {/* Divisor Kaingang */}
                <div className="mt-8">
                    <KaingangDivider
                        className="w-full h-3 opacity-25"
                        color={YVYRA.copper}
                    />
                </div>
            </div>

            {/* ============================================================
                CARROSSEL — Tronco Horizontal
               ============================================================ */}
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
                <div className="relative inline-flex items-end gap-8 px-6 md:px-12 w-max">

                    {/* Tronco horizontal — gradiente musgo → cobre */}
                    <div
                        aria-hidden
                        className="absolute left-0 right-0 h-px"
                        style={{
                            top: '18px',
                            background: `linear-gradient(90deg, ${YVYRA.lichen}00 0%, ${YVYRA.copper} 6%, ${YVYRA.copper} 94%, ${YVYRA.lichen}00 100%)`,
                        }}
                    />

                    {/* Linha Kaingang paralela — grafismo indígena */}
                    <div
                        aria-hidden
                        className="absolute left-0 right-0 h-[2px] opacity-30"
                        style={{
                            top: '25px',
                            backgroundImage: `repeating-linear-gradient(90deg, ${YVYRA.fern} 0, ${YVYRA.fern} 2px, transparent 2px, transparent 8px)`,
                        }}
                    />

                    {memories.map((memory, index) => (
                        <Memory key={memory.id} memory={memory} index={index} />
                    ))}
                </div>
            </div>

            {/* ============================================================
                HINT — Pinhão flanqueando o texto
               ============================================================ */}
            <div className="flex justify-center items-center gap-3 mt-2">
                <PinhaoSpiral size={12} color={YVYRA.copper} className="opacity-50" />
                <p
                    className={`${monoFont.className} text-[10px] uppercase tracking-[0.3em]`}
                    style={{ color: YVYRA.fern }}
                >
                    Arraste ou use o scroll para navegar
                </p>
                <PinhaoSpiral size={12} color={YVYRA.copper} className="opacity-50" />
            </div>

            {/* ============================================================
                CTA
               ============================================================ */}
            {showCta && (
                <div className="max-w-7xl mx-auto px-6 mt-10 flex justify-center">
                    <a
                        href="/signup"
                        className={`${monoFont.className} text-[11px] uppercase tracking-[0.25em] px-7 py-4 rounded-xl transition-all duration-300`}
                        style={{
                            backgroundColor: YVYRA.amber,
                            color: YVYRA.bg,
                            boxShadow: '0 14px 40px -12px rgba(224,168,75,0.45)',
                        }}
                    >
                        Criar minha própria linha do tempo →
                    </a>
                </div>
            )}
        </section>
    )
}
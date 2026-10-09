'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import HeroBackground from '@/app/components/HeroBackground'
import AnimatedGlow from './AnimatedGlow'
import { Timeline } from '@/app/components/Timeline'
import { MOCK_TIMELINE } from '@/app/mocks/timeline'

export function HomeContent() {
    const [showTimeline, setShowTimeline] = useState(false)

    // Sincroniza o estado com o hash da URL (#about)
    useEffect(() => {
        const checkHash = () => {
            setShowTimeline(window.location.hash === '#about')
        }

        checkHash() // Verifica ao carregar a página
        window.addEventListener('hashchange', checkHash)
        return () => window.removeEventListener('hashchange', checkHash)
    }, [])

    // Função para alternar o estado alterando o hash da URL suavemente
    const handleToggleTimeline = (show: boolean) => {
        if (show) {
            window.location.hash = 'about'
        } else {
            history.pushState('', document.title, window.location.pathname)
            setShowTimeline(false)
        }
    }

    return (
        <main className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 overflow-x-hidden relative">
            <HeroBackground />
            <AnimatedGlow />

            {/* Container principal edge-to-edge */}
            <div className="w-full pt-16 pb-24 relative z-10 min-h-[80vh] flex flex-col justify-center">
                <div className="relative">

                    {/* ESTADO 1: O Manifesto / Hero */}
                    <div
                        className={`transition-all duration-700 ease-in-out max-w-7xl mx-auto px-6 ${showTimeline
                            ? 'opacity-0 -translate-x-12 pointer-events-none absolute inset-x-0 top-0'
                            : 'opacity-100 translate-x-0 relative'
                            }`}
                    >
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-stone-100 mb-6 leading-tight">
                                Preserve what time{' '}
                                <span className="text-amber-400 italic">takes away.</span>
                            </h1>

                            <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-2xl">
                                A collaborative digital vault for life&apos;s most meaningful chapters,
                                free from algorithmic noise and social media clutter.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/login"
                                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-sm transition font-mono tracking-wide shadow-lg shadow-amber-400/10"
                                >
                                    Começar
                                </Link>
                                <button
                                    onClick={() => handleToggleTimeline(true)}
                                    className="px-6 py-3.5 rounded-xl border border-stone-700 hover:border-stone-500 text-stone-200 text-sm font-medium transition font-mono tracking-wide cursor-pointer bg-stone-900/50 backdrop-blur-sm"
                                >
                                    Sobre o Griô →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ESTADO 2: Exemplo da Timeline */}
                    <div
                        className={`transition-all duration-700 ease-in-out ${showTimeline
                            ? 'opacity-100 translate-x-0 relative'
                            : 'opacity-0 translate-x-12 pointer-events-none absolute inset-x-0 top-0'
                            }`}
                    >
                        <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800/80 pb-6">
                            <div>
                                <h2 className="text-4xl md:text-4xl font-serif font-medium tracking-tight text-stone-100 mb-2">
                                    Histórias que moldam quem somos, memórias que o tempo não apaga.
                                </h2>
                                <p className="text-stone-400 text-sm md:text-base max-w-2xl leading-relaxed">
                                    Um cofre digital colaborativo para os capítulos mais significativos da vida. Do registro dos primeiros passos de um bebê e a construção de um relacionamento até o legado de gerações da família, o Griô preserva o que importa de verdade, livre de ruídos algorítmicos.
                                </p>
                            </div>
                        </div>

                        {/* Componente Timeline edge-to-edge */}
                        <Timeline data={MOCK_TIMELINE} />
                    </div>

                </div>
            </div>
        </main>
    )
}
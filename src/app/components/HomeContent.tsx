'use client'

import Link from 'next/link'
import HeroBackground from './HeroBackground'
import AnimatedGlow from './AnimatedGlow'
import { Timeline } from '@/app/components/Timeline'
import { MOCK_TIMELINE } from '@/app/mocks/timeline'
import { YVYRA, displayFont, bodyFont, monoFont } from '@/lib/yvyra'
import {
    GuaraniCross,
    KaingangDivider,
    PinhaoSpiral,
    AstrolabeRose,
    Verticilo,
} from '@/app/components/YvyraOrnaments'

export function HomeContent() {
    return (
        <main
            className={`min-h-screen ${bodyFont.className} overflow-x-hidden relative`}
            style={{ color: YVYRA.bone }}
        >
            <HeroBackground />
            <AnimatedGlow />

            <div className="w-full pt-24 pb-28 relative z-10 min-h-[80vh] flex flex-col justify-center">
                <div className="relative">

                    {/* ============================================================
                        HERO
                       ============================================================ */}
                    <div className="max-w-7xl mx-auto px-6 relative">
                        <div className="max-w-3xl relative">

                            {/* Ornamento flutuante acima do eyebrow */}
                            <div className="flex items-center gap-4 mb-8">
                                <PinhaoSpiral
                                    size={22}
                                    color={YVYRA.amber}
                                    className="opacity-90"
                                />
                                <span
                                    className={`${monoFont.className} text-[10px] uppercase tracking-[0.35em]`}
                                    style={{ color: YVYRA.copper }}
                                >
                                    Griô · Arquivo Vivo · YVYRA
                                </span>
                            </div>

                            {/* Headline */}
                            <h1
                                className={`${displayFont.className} text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] mb-8`}
                                style={{ color: YVYRA.bone }}
                            >
                                Plante o que o tempo{' '}
                                <span
                                    className="italic"
                                    style={{ color: YVYRA.amber }}
                                >
                                    não apaga.
                                </span>
                            </h1>

                            {/* Sub */}
                            <p
                                className={`${bodyFont.className} text-lg md:text-xl leading-relaxed mb-10 max-w-2xl`}
                                style={{ color: YVYRA.fern }}
                            >
                                Um santuário digital para as sementes da sua história.
                                Cada memória é um{' '}
                                <span style={{ color: YVYRA.bone }}>pinhão</span> que viaja
                                entre gerações — longe do ruído algorítmico, perto do que é
                                eterno.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link
                                    href="/login"
                                    className={`${monoFont.className} px-7 py-4 rounded-xl text-sm tracking-wide transition`}
                                    style={{
                                        backgroundColor: YVYRA.amber,
                                        color: YVYRA.bg,
                                        boxShadow: '0 14px 40px -12px rgba(224,168,75,0.45)',
                                    }}
                                >
                                    Começar a plantar →
                                </Link>
                                <Link
                                    href="/concepts"
                                    className={`${monoFont.className} px-7 py-4 rounded-xl text-sm tracking-wide transition border`}
                                    style={{
                                        borderColor: YVYRA.lichen,
                                        color: YVYRA.fern,
                                    }}
                                >
                                    Ver o conceito
                                </Link>
                            </div>

                            {/* Nota discreta de rodapé do hero */}
                            <p
                                className={`${monoFont.className} text-[10px] uppercase tracking-[0.25em] mt-10`}
                                style={{ color: YVYRA.lichen }}
                            >
                                Um gesto por vez · uma semente por vez
                            </p>
                        </div>

                        {/* Rosácea de astrolábio flutuando à direita (desktop) */}
                        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.18] pointer-events-none">
                            <AstrolabeRose size={340} color={YVYRA.amber} />
                        </div>
                    </div>

                    {/* Divisor Kaingang entre hero e timeline */}
                    <div className="max-w-7xl mx-auto px-6 mt-28">
                        <KaingangDivider
                            className="w-full h-4 opacity-30"
                            color={YVYRA.copper}
                        />
                    </div>

                    {/* ============================================================
                        SEÇÃO TIMELINE
                       ============================================================ */}
                    <div className="mt-20">
                        <div className="max-w-7xl mx-auto px-6 mb-12">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="max-w-3xl">

                                    {/* Eyebrow de seção com Cruz Guarani */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <GuaraniCross
                                            size={28}
                                            color={YVYRA.copper}
                                            className="opacity-90"
                                        />
                                        <span
                                            className={`${monoFont.className} text-[10px] uppercase tracking-[0.3em]`}
                                            style={{ color: YVYRA.copper }}
                                        >
                                            Verticilos · Linha do Tempo
                                        </span>
                                    </div>

                                    {/* Headline da seção */}
                                    <h2
                                        className={`${displayFont.className} text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-5`}
                                        style={{ color: YVYRA.bone }}
                                    >
                                        Cada memória, um pinhão.{' '}
                                        <br className="hidden md:block" />
                                        Cada vida, uma{' '}
                                        <span style={{ color: YVYRA.amber }}>
                                            araucária
                                        </span>
                                        .
                                    </h2>

                                    {/* Parágrafo */}
                                    <p
                                        className={`${bodyFont.className} text-base leading-relaxed max-w-2xl`}
                                        style={{ color: YVYRA.fern }}
                                    >
                                        Assim como a araucária cresce em anéis concêntricos —
                                        verticilos que guardam o tempo —, sua história se
                                        desdobra em capítulos. Cada lembrança encontra seu
                                        lugar no tronco. Cada capítulo, uma semente que viaja
                                        entre gerações.
                                    </p>
                                </div>

                                {/* Verticilo decorativo à direita (desktop) */}
                                <div className="hidden md:block opacity-40">
                                    <Verticilo size={100} color={YVYRA.copper} />
                                </div>
                            </div>
                        </div>

                        <Timeline data={MOCK_TIMELINE} />
                    </div>

                </div>
            </div>
        </main>
    )
}
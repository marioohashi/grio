'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bricolage_Grotesque, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'

/* =========================================================
   FONTS — sem serifa
   ========================================================= */
const displayFont = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
})

const bodyFont = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
})

const monoFont = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-mono',
    display: 'swap',
})

/* =========================================================
   PALETA — YVYRA (Musgo + Cobre + Âmbar)
   ========================================================= */
const YVYRA = {
    bg: '#0E1712',          // Musgo Noturno
    bgDeep: '#0A100C',      // Musgo Profundo
    surface: '#14201A',     // Superfície
    surfaceHi: '#1A2A22',   // Superfície elevada
    lichen: '#3E5641',      // Verde Lichen (bordas)
    fern: '#8FA88C',        // Verde Samambaia (texto 2º)
    bone: '#E6E1D3',        // Osso de Ancião (texto)
    copper: '#C77B3C',      // Cobre do Astrolábio
    amber: '#E0A84B',       // Âmbar do Pinhão
    cinnabar: '#A63D2F',    // Cinábrio Ritual
}

/* =========================================================
   ORNAMENTOS SAGRADOS — SVGs inline
   ========================================================= */

/** Cruz Guarani (Mbyá) — cosmologia, memória selada */
function GuaraniCross({ className = '', size = 40 }: { className?: string; size?: number }) {
    return (
        <svg
            viewBox="0 0 40 40"
            width={size}
            height={size}
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
        >
            <circle cx="20" cy="20" r="18" strokeOpacity="0.4" />
            <circle cx="20" cy="20" r="13" strokeOpacity="0.8" />
            <line x1="20" y1="4" x2="20" y2="36" strokeOpacity="0.9" />
            <line x1="4" y1="20" x2="36" y2="20" strokeOpacity="0.9" />
            <circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="20" cy="7" r="1" fill="currentColor" stroke="none" />
            <circle cx="20" cy="33" r="1" fill="currentColor" stroke="none" />
            <circle cx="7" cy="20" r="1" fill="currentColor" stroke="none" />
            <circle cx="33" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
    )
}

/** Grafismo Kaingang — linhas paralelas + pontos (povos Jê do Paraná) */
function KaingangDivider({ className = '' }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 240 16"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            preserveAspectRatio="none"
        >
            <line x1="0" y1="4" x2="240" y2="4" strokeOpacity="0.7" />
            <line x1="0" y1="12" x2="240" y2="12" strokeOpacity="0.7" />
            {[20, 60, 100, 140, 180, 220].map((x, i) => (
                <g key={i}>
                    <circle cx={x} cy="8" r="1.5" fill="currentColor" stroke="none" />
                    <line x1={x} y1="4" x2={x} y2="12" strokeOpacity="0.5" />
                </g>
            ))}
        </svg>
    )
}

/** Espiral do Pinhão — Fibonacci / semente / marco */
function PinhaoSpiral({ className = '', size = 32 }: { className?: string; size?: number }) {
    return (
        <svg
            viewBox="0 0 40 40"
            width={size}
            height={size}
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
        >
            <path d="M20 20 m0 -2 a2 2 0 0 1 2 2 a4 4 0 0 1 -4 4 a6 6 0 0 1 -6 -6 a8 8 0 0 1 8 -8 a10 10 0 0 1 10 10 a12 12 0 0 1 -12 12 a14 14 0 0 1 -14 -14 a16 16 0 0 1 16 -16" />
        </svg>
    )
}

/** Rosácea de Astrolábio — instrumento de navegação cósmica */
function AstrolabeRose({ className = '', size = 80 }: { className?: string; size?: number }) {
    const ticks = Array.from({ length: 24 })
    return (
        <svg
            viewBox="0 0 80 80"
            width={size}
            height={size}
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
        >
            <circle cx="40" cy="40" r="38" strokeOpacity="0.25" />
            <circle cx="40" cy="40" r="30" strokeOpacity="0.5" />
            <circle cx="40" cy="40" r="22" strokeOpacity="0.8" />
            <circle cx="40" cy="40" r="12" strokeOpacity="0.5" />
            <circle cx="40" cy="40" r="3" fill="currentColor" stroke="none" />
            {ticks.map((_, i) => {
                const angle = ((i * 15) * Math.PI) / 180
                const x1 = 40 + Math.cos(angle) * 30
                const y1 = 40 + Math.sin(angle) * 30
                const x2 = 40 + Math.cos(angle) * 38
                const y2 = 40 + Math.sin(angle) * 38
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity="0.6" />
            })}
            <line x1="40" y1="8" x2="40" y2="72" strokeOpacity="0.35" />
            <line x1="8" y1="40" x2="72" y2="40" strokeOpacity="0.35" />
        </svg>
    )
}

/* =========================================================
   CORNER BRACKETS — cantoneiras de instrumento astronômico
   ========================================================= */
function CornerBrackets({ color = YVYRA.copper }: { color?: string }) {
    const corners = [
        'top-0 left-0',
        'top-0 right-0 rotate-90',
        'bottom-0 right-0 rotate-180',
        'bottom-0 left-0 -rotate-90',
    ]
    return (
        <>
            {corners.map((pos, i) => (
                <svg
                    key={i}
                    viewBox="0 0 16 16"
                    width="14"
                    height="14"
                    className={`absolute ${pos} pointer-events-none`}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.25"
                >
                    <path d="M0 6 L0 0 L6 0" />
                    <path d="M2.5 6 L2.5 2.5 L6 2.5" strokeOpacity="0.5" />
                </svg>
            ))}
        </>
    )
}

/* =========================================================
   PAGE
   ========================================================= */
export default function ConceptsPage() {
    const [activeTab, setActiveTab] = useState<'concept' | 'design' | 'ti'>('concept')

    const tabClass = (isActive: boolean) =>
        `relative px-5 py-3 text-xs transition border-b-2 cursor-pointer whitespace-nowrap tracking-wide ${isActive
            ? 'text-[#E0A84B] bg-[#E0A84B]/5 rounded-t-xl'
            : 'border-transparent text-[#8FA88C] hover:text-[#E6E1D3]'
        }`

    return (
        <div
            className={`min-h-screen ${bodyFont.className} text-[#E6E1D3] selection:bg-[#E0A84B] selection:text-[#0E1712] relative`}
            style={{
                backgroundColor: YVYRA.bg,
                // grade celestial analógica (dots)
                backgroundImage:
                    'radial-gradient(rgba(143,168,140,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }}
        >
            {/* ============ HEADER ============ */}
            <div
                className="border-b sticky top-0 z-20 backdrop-blur-md"
                style={{
                    borderColor: 'rgba(62,86,65,0.5)',
                    backgroundColor: 'rgba(14,23,18,0.75)',
                }}
            >
                <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Selo do instrumento */}
                        <div
                            className="w-14 h-14 rounded-2xl border flex items-center justify-center shadow-inner relative overflow-hidden"
                            style={{
                                borderColor: YVYRA.lichen,
                                backgroundColor: YVYRA.surface,
                                color: YVYRA.copper,
                            }}
                        >
                            <PinhaoSpiral className="opacity-30" size={40} />
                            <AstrolabeRose className="absolute inset-0 m-auto opacity-70" size={40} />
                        </div>
                        <div>
                            <span
                                className={`${monoFont.className} text-[10px] uppercase tracking-[0.25em] block`}
                                style={{ color: YVYRA.copper }}
                            >
                                Griô Project Handbook · YVYRA
                            </span>
                            <h1
                                className={`${displayFont.className} text-xl font-medium`}
                                style={{ color: YVYRA.bone }}
                            >
                                Conceptual, Visual &amp; Technical Architecture
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="max-w-5xl mx-auto px-6 flex gap-2 overflow-x-auto pb-0 pt-2">
                    <button
                        onClick={() => setActiveTab('concept')}
                        className={`${tabClass(activeTab === 'concept')} ${monoFont.className}`}
                        style={
                            activeTab === 'concept'
                                ? { borderBottomColor: YVYRA.amber }
                                : undefined
                        }
                    >
                        🌲 1. App Concept &amp; User Journey
                    </button>
                    <button
                        onClick={() => setActiveTab('design')}
                        className={`${tabClass(activeTab === 'design')} ${monoFont.className}`}
                        style={
                            activeTab === 'design'
                                ? { borderBottomColor: YVYRA.amber }
                                : undefined
                        }
                    >
                        🌀 2. Visual Design &amp; Concept
                    </button>
                    <button
                        onClick={() => setActiveTab('ti')}
                        className={`${tabClass(activeTab === 'ti')} ${monoFont.className}`}
                        style={
                            activeTab === 'ti'
                                ? { borderBottomColor: YVYRA.amber }
                                : undefined
                        }
                    >
                        ⚙️ 3. Architecture &amp; Tech Stack
                    </button>
                </div>
            </div>

            {/* ============ MAIN ============ */}
            <main className="max-w-5xl mx-auto px-6 py-12">

                {/* ==========================================
                    TAB 1 — APP CONCEPT & USER JOURNEY
                   ========================================== */}
                {activeTab === 'concept' && (
                    <div className="space-y-12 animate-in fade-in duration-300">
                        <section className="space-y-4">
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${monoFont.className}`}
                                style={{
                                    borderColor: 'rgba(199,123,60,0.3)',
                                    backgroundColor: 'rgba(199,123,60,0.08)',
                                    color: YVYRA.copper,
                                }}
                            >
                                <span>Practical Experience</span>
                            </div>
                            <h2
                                className={`text-3xl ${displayFont.className}`}
                                style={{ color: YVYRA.bone }}
                            >
                                How Users Interact with Griô
                            </h2>
                            <p
                                className="text-sm md:text-base leading-relaxed max-w-3xl"
                                style={{ color: YVYRA.fern }}
                            >
                                Griô is designed to be a living digital vault — an{' '}
                                <span style={{ color: YVYRA.bone }}>Araucária of memory</span>. Instead of a
                                noisy social feed, users interact with the platform by building, weaving, and
                                sharing structured timelines of their most cherished life chapters — each
                                one a pinhão (seed) that travels between generations.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: '📸',
                                    title: 'Timeline & Memories',
                                    body:
                                        'Users upload photos, organize memories chronologically, crop and adjust avatars or cards, and build comprehensive visual timelines of personal or family milestones.',
                                },
                                {
                                    icon: '🤝',
                                    title: 'Sharing Timelines',
                                    body:
                                        'Timelines can be shared securely with family members, close friends, or communities, turning private records into collaborative historical archives.',
                                },
                                {
                                    icon: '✏️',
                                    title: 'Collaborative Roles',
                                    body:
                                        'Invited participants can be granted permissions to either view memories exclusively or actively edit and add new chapters and photos to each timeline.',
                                },
                            ].map((c) => (
                                <div
                                    key={c.title}
                                    className="p-6 rounded-2xl border space-y-3 relative overflow-hidden"
                                    style={{
                                        backgroundColor: 'rgba(20,32,26,0.55)',
                                        borderColor: 'rgba(62,86,65,0.6)',
                                    }}
                                >
                                    <CornerBrackets />
                                    <span className="text-xl">{c.icon}</span>
                                    <h3
                                        className={`text-sm uppercase tracking-wider ${monoFont.className}`}
                                        style={{ color: YVYRA.amber }}
                                    >
                                        {c.title}
                                    </h3>
                                    <p
                                        className={`text-xs leading-relaxed ${monoFont.className}`}
                                        style={{ color: YVYRA.fern }}
                                    >
                                        {c.body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <section
                            className="p-8 rounded-2xl border space-y-4 relative overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(14,23,18,0.6)',
                                borderColor: 'rgba(62,86,65,0.5)',
                            }}
                        >
                            <CornerBrackets />
                            <KaingangDivider className="w-full h-3 opacity-40" />
                            <h3
                                className={`text-sm uppercase tracking-wider ${monoFont.className}`}
                                style={{ color: YVYRA.amber }}
                            >
                                Core Use Cases
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                {[
                                    {
                                        title: 'Family Archives',
                                        body:
                                            'Intergenerational timelines preserving old letters, photos, and ancestral stories.',
                                    },
                                    {
                                        title: 'Expeditions & Travel',
                                        body:
                                            'Overland trips, backpacking routes, and detailed logs mapped step-by-step.',
                                    },
                                    {
                                        title: 'Personal Biographies',
                                        body:
                                            'Collections of milestones, creative portfolios, and life chapters.',
                                    },
                                ].map((u) => (
                                    <div
                                        key={u.title}
                                        className={`p-4 rounded-xl border text-xs space-y-2 ${monoFont.className}`}
                                        style={{
                                            backgroundColor: YVYRA.bgDeep,
                                            borderColor: 'rgba(62,86,65,0.5)',
                                            color: YVYRA.fern,
                                        }}
                                    >
                                        <strong
                                            className={`block text-sm ${displayFont.className}`}
                                            style={{ color: YVYRA.bone }}
                                        >
                                            {u.title}
                                        </strong>
                                        <p>{u.body}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* ==========================================
                    TAB 2 — VISUAL DESIGN & CONCEPT
                   ========================================== */}
                {activeTab === 'design' && (
                    <div className="space-y-12 animate-in fade-in duration-300">
                        {/* --- Hero --- */}
                        <section className="space-y-4">
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${monoFont.className}`}
                                style={{
                                    borderColor: 'rgba(199,123,60,0.3)',
                                    backgroundColor: 'rgba(199,123,60,0.08)',
                                    color: YVYRA.copper,
                                }}
                            >
                                <span>Visual Identity &amp; Philosophy</span>
                            </div>
                            <h2
                                className={`text-3xl ${displayFont.className}`}
                                style={{ color: YVYRA.bone }}
                            >
                                The Storyteller &amp; Ancestral Retro-Futurism
                            </h2>
                            <p
                                className="text-sm md:text-base leading-relaxed max-w-3xl"
                                style={{ color: YVYRA.fern }}
                            >
                                Inspired by <em>griots</em> (keepers of collective memory) and the fluid
                                aesthetics of branching timelines, Griô combines deep organic metaphors with
                                robust analog technology. Rooted in the <em>Araucária angustifolia</em> — the
                                pine tree that gives Curitiba its name (&quot;many pinhões&quot;) — the visual
                                system fuses moss green, aged copper, and celestial astrolabe geometry.
                            </p>
                        </section>

                        {/* --- YVYRA: O NOME --- */}
                        <section
                            className="p-8 rounded-2xl border space-y-4 relative overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(20,32,26,0.5)',
                                borderColor: 'rgba(62,86,65,0.6)',
                            }}
                        >
                            <CornerBrackets />
                            <div className="flex items-center gap-3">
                                <GuaraniCross size={32} className="opacity-80" />
                                <div>
                                    <span
                                        className={`text-[10px] uppercase tracking-[0.25em] ${monoFont.className}`}
                                        style={{ color: YVYRA.copper }}
                                    >
                                        Codename
                                    </span>
                                    <h3
                                        className={`text-2xl ${displayFont.className}`}
                                        style={{ color: YVYRA.bone }}
                                    >
                                        YVYRA — Araucária Cósmica
                                    </h3>
                                </div>
                            </div>
                            <p
                                className="text-sm leading-relaxed max-w-3xl"
                                style={{ color: YVYRA.fern }}
                            >
                                O Griô é uma <strong style={{ color: YVYRA.bone }}>araucária cósmica</strong>.
                                Suas raízes são os ancestrais; o tronco é a linha do tempo principal; os{' '}
                                <em>verticilos</em> — galhos horizontais em anéis, padrão único da araucária —
                                são as ramificações de cada vida. O{' '}
                                <strong style={{ color: YVYRA.bone }}>pinhão</strong>, semente em espiral
                                Fibonacci, é o símbolo do arquivo: cada memória é uma semente que viaja entre
                                gerações. E o <strong style={{ color: YVYRA.bone }}>astrolábio</strong> é a
                                ferramenta do narrador-griô: mede o tempo, calibra a bússola emocional, aponta
                                direções.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                {[
                                    { icon: '🌲', label: 'Araucária', desc: 'Estrutura, verticalidade, resistência' },
                                    { icon: '🌀', label: 'Pinhão', desc: 'Espiral Fibonacci, arquivo-semente' },
                                    { icon: '⚙️', label: 'Astrolábio', desc: 'Instrumento, tempo mensurável' },
                                    { icon: '🔥', label: 'Fogo Ritual', desc: 'Guarani/Kaingang, lar da memória' },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className={`p-4 rounded-xl border text-xs space-y-1 ${monoFont.className}`}
                                        style={{
                                            backgroundColor: YVYRA.bgDeep,
                                            borderColor: 'rgba(62,86,65,0.5)',
                                        }}
                                    >
                                        <span className="text-lg">{s.icon}</span>
                                        <div
                                            className={`text-[11px] uppercase tracking-wider ${monoFont.className}`}
                                            style={{ color: YVYRA.amber }}
                                        >
                                            {s.label}
                                        </div>
                                        <p style={{ color: YVYRA.fern }}>{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* --- Filosofia & Essência --- */}
                        <section className="space-y-4">
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${monoFont.className}`}
                                style={{
                                    borderColor: 'rgba(199,123,60,0.3)',
                                    backgroundColor: 'rgba(199,123,60,0.08)',
                                    color: YVYRA.copper,
                                }}
                            >
                                <span>01</span>
                                <span>/</span>
                                <span>Philosophy &amp; Essence</span>
                            </div>
                            <h2
                                className={`text-3xl ${displayFont.className}`}
                                style={{ color: YVYRA.bone }}
                            >
                                The Storyteller Guardian
                            </h2>
                            <p
                                className="text-sm md:text-base leading-relaxed max-w-3xl"
                                style={{ color: YVYRA.fern }}
                            >
                                <strong style={{ color: YVYRA.amber }}>Griô</strong> is not just a timeline
                                management platform; it is a{' '}
                                <span
                                    className="underline underline-offset-4"
                                    style={{ color: YVYRA.bone, textDecorationColor: YVYRA.copper }}
                                >
                                    digital sanctuary for memory preservation
                                </span>
                                . Inspired by the ancestral figure of <em>griots</em> (storytellers and
                                keepers of collective memory), the application functions as a secure and
                                intimate vault for life chapters, family stories, and exploration journeys.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                {[
                                    {
                                        title: 'Anti-Algorithm Purpose',
                                        body:
                                            'A space focused on longevity, human depth, and timeless aesthetics, completely distancing itself from the industrial, noisy, and ephemeral visual style of traditional social media.',
                                    },
                                    {
                                        title: 'Emotional Tone',
                                        body:
                                            'Welcoming, reverent, poetic, secure, and technologically robust. Every detail conveys the feeling of touching something enduring and precious.',
                                    },
                                ].map((c) => (
                                    <div
                                        key={c.title}
                                        className="p-6 rounded-2xl border space-y-2 relative overflow-hidden"
                                        style={{
                                            backgroundColor: 'rgba(20,32,26,0.5)',
                                            borderColor: 'rgba(62,86,65,0.6)',
                                        }}
                                    >
                                        <CornerBrackets />
                                        <h3
                                            className={`text-sm uppercase tracking-wider ${monoFont.className}`}
                                            style={{ color: YVYRA.amber }}
                                        >
                                            {c.title}
                                        </h3>
                                        <p
                                            className={`text-xs leading-relaxed ${monoFont.className}`}
                                            style={{ color: YVYRA.fern }}
                                        >
                                            {c.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* --- Árvore da Vida + Linhas Ramificadas --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div
                                className="p-8 rounded-2xl border space-y-4 relative overflow-hidden"
                                style={{
                                    backgroundColor: 'rgba(20,32,26,0.5)',
                                    borderColor: 'rgba(62,86,65,0.6)',
                                }}
                            >
                                <CornerBrackets />
                                <div className="flex items-center gap-3">
                                    <PinhaoSpiral size={28} />
                                    <h3
                                        className={`text-lg ${displayFont.className}`}
                                        style={{ color: YVYRA.bone }}
                                    >
                                        The Araucária / Tree of Life
                                    </h3>
                                </div>
                                <p
                                    className={`text-xs leading-relaxed ${monoFont.className}`}
                                    style={{ color: YVYRA.fern }}
                                >
                                    Drawing from Yggdrasil, the Baobab (&quot;the tree of speech&quot; where
                                    elders gathered) and the Araucária — whose whorled rings echo the
                                    concentric geometry of an astrolabe.
                                </p>
                                <ul
                                    className={`space-y-2 text-xs ${monoFont.className}`}
                                    style={{ color: YVYRA.fern }}
                                >
                                    <li>
                                        <strong style={{ color: YVYRA.copper }}>● Roots:</strong> Ancestry,
                                        origins, and deeply stored memories.
                                    </li>
                                    <li>
                                        <strong style={{ color: YVYRA.copper }}>● Trunk:</strong> The core
                                        timeline (main life journey).
                                    </li>
                                    <li>
                                        <strong style={{ color: YVYRA.copper }}>● Verticilos:</strong> Whorled
                                        branches — ramifications, unfolding moments, expanding futures.
                                    </li>
                                    <li>
                                        <strong style={{ color: YVYRA.copper }}>● Pinhão:</strong> Each memory
                                        as a Fibonacci seed traveling between generations.
                                    </li>
                                </ul>
                            </div>

                            <div
                                className="p-8 rounded-2xl border space-y-4 relative overflow-hidden"
                                style={{
                                    backgroundColor: 'rgba(20,32,26,0.5)',
                                    borderColor: 'rgba(62,86,65,0.6)',
                                }}
                            >
                                <CornerBrackets />
                                <div className="flex items-center gap-3">
                                    <AstrolabeRose size={32} />
                                    <h3
                                        className={`text-lg ${displayFont.className}`}
                                        style={{ color: YVYRA.bone }}
                                    >
                                        Branching Timelines — Astrolabe Aesthetic
                                    </h3>
                                </div>
                                <p
                                    className={`text-xs leading-relaxed ${monoFont.className}`}
                                    style={{ color: YVYRA.fern }}
                                >
                                    Time is treated not as a rigid line, but as a living, interconnected
                                    organic organism — measured, angled, and calibrated like an ancient
                                    navigation instrument. Interfaces feature warm copper beams, moss-green
                                    shadows, and tactile analog elements.
                                </p>
                            </div>
                        </div>

                        {/* --- Ornamentos Sagrados --- */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <KaingangDivider className="flex-1 h-3 opacity-40" />
                                <span
                                    className={`text-[10px] uppercase tracking-[0.3em] whitespace-nowrap ${monoFont.className}`}
                                    style={{ color: YVYRA.copper }}
                                >
                                    Sacred Ornaments
                                </span>
                                <KaingangDivider className="flex-1 h-3 opacity-40" />
                            </div>
                            <h3
                                className={`text-xl ${displayFont.className}`}
                                style={{ color: YVYRA.bone }}
                            >
                                Xamânico &amp; Geométrico
                            </h3>
                            <p
                                className="text-xs max-w-2xl leading-relaxed"
                                style={{ color: YVYRA.fern }}
                            >
                                Grafismos do sul do Brasil cruzados com geometria cósmica analógica — nada de
                                adinkra genérico.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    {
                                        svg: <GuaraniCross size={48} />,
                                        name: 'Cruz Guarani (Mbyá)',
                                        use: 'Marca de memória selada · ícones',
                                    },
                                    {
                                        svg: <KaingangDivider className="w-full h-6" />,
                                        name: 'Grafismo Kaingang',
                                        use: 'Divisores · bordas laterais',
                                    },
                                    {
                                        svg: <PinhaoSpiral size={48} />,
                                        name: 'Espiral do Pinhão',
                                        use: 'Marcador de marco · hover',
                                    },
                                    {
                                        svg: <AstrolabeRose size={56} />,
                                        name: 'Rosácea de Astrolábio',
                                        use: 'Header · botão circular',
                                    },
                                    {
                                        svg: (
                                            <svg viewBox="0 0 48 48" width={48} height={48} fill="none" stroke="currentColor" strokeWidth="1">
                                                <circle cx="24" cy="24" r="20" strokeOpacity="0.4" />
                                                <circle cx="24" cy="24" r="14" />
                                                <circle cx="24" cy="24" r="8" strokeOpacity="0.7" />
                                                <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
                                            </svg>
                                        ),
                                        name: 'Anel de Crescimento',
                                        use: 'Sub-timeline · camadas · anos',
                                    },
                                    {
                                        svg: (
                                            <svg viewBox="0 0 48 48" width={48} height={48} fill="none" stroke="currentColor" strokeWidth="1">
                                                <line x1="24" y1="4" x2="24" y2="44" strokeOpacity="0.6" />
                                                <line x1="12" y1="16" x2="36" y2="16" strokeOpacity="0.8" />
                                                <line x1="8" y1="26" x2="40" y2="26" strokeOpacity="0.8" />
                                                <line x1="14" y1="36" x2="34" y2="36" strokeOpacity="0.8" />
                                                <circle cx="24" cy="4" r="2" fill="currentColor" stroke="none" />
                                                <circle cx="24" cy="44" r="2" fill="currentColor" stroke="none" />
                                            </svg>
                                        ),
                                        name: 'Verticilo',
                                        use: 'Estrutura da timeline principal',
                                    },
                                ].map((o) => (
                                    <div
                                        key={o.name}
                                        className="p-4 rounded-xl border space-y-3 relative overflow-hidden"
                                        style={{
                                            backgroundColor: YVYRA.bgDeep,
                                            borderColor: 'rgba(62,86,65,0.5)',
                                            color: YVYRA.amber,
                                        }}
                                    >
                                        <div className="flex items-center justify-center h-14">
                                            {o.svg}
                                        </div>
                                        <div>
                                            <div
                                                className={`text-[11px] uppercase tracking-wider ${monoFont.className}`}
                                                style={{ color: YVYRA.copper }}
                                            >
                                                {o.name}
                                            </div>
                                            <p
                                                className={`text-[10px] ${monoFont.className}`}
                                                style={{ color: YVYRA.fern }}
                                            >
                                                {o.use}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* --- Color Palette --- */}
                        <div className="space-y-6 pt-4">
                            <h3
                                className={`text-xl ${displayFont.className}`}
                                style={{ color: YVYRA.bone }}
                            >
                                Color Palette — Musgo &amp; Cobre
                            </h3>
                            <p
                                className="text-xs max-w-2xl leading-relaxed"
                                style={{ color: YVYRA.fern }}
                            >
                                Verde musgo frio contra cobre quente — instrumento contra floresta. A tensão
                                afrofuturista nasce aí.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { hex: YVYRA.bg, name: 'Musgo Noturno', role: 'Background', code: '#0E1712', swatchBorder: YVYRA.lichen },
                                    { hex: YVYRA.surface, name: 'Verde Lichen', role: 'Cards', code: '#14201A', swatchBorder: YVYRA.lichen },
                                    { hex: YVYRA.copper, name: 'Cobre do Astrolábio', role: 'Accent · CTA', code: '#C77B3C' },
                                    { hex: YVYRA.amber, name: 'Âmbar do Pinhão', role: 'Highlight', code: '#E0A84B' },
                                    { hex: YVYRA.cinnabar, name: 'Cinábrio Ritual', role: 'Sacred · Alert', code: '#A63D2F' },
                                    { hex: YVYRA.fern, name: 'Verde Samambaia', role: 'Text 2nd', code: '#8FA88C' },
                                    { hex: YVYRA.bone, name: 'Osso de Ancião', role: 'Text', code: '#E6E1D3', swatchBorder: YVYRA.lichen },
                                    { hex: YVYRA.lichen, name: 'Verde Musgo', role: 'Borders', code: '#3E5641' },
                                ].map((c) => (
                                    <div
                                        key={c.name}
                                        className="p-5 rounded-2xl border space-y-3 relative overflow-hidden"
                                        style={{
                                            backgroundColor: YVYRA.surface,
                                            borderColor: 'rgba(62,86,65,0.6)',
                                        }}
                                    >
                                        <CornerBrackets color={YVYRA.copper} />
                                        <div
                                            className="w-full h-16 rounded-xl shadow-inner"
                                            style={{
                                                backgroundColor: c.hex,
                                                border: `1px solid ${c.swatchBorder ?? 'transparent'}`,
                                            }}
                                        />
                                        <div>
                                            <span
                                                className={`text-[10px] uppercase tracking-wider block ${monoFont.className}`}
                                                style={{ color: YVYRA.fern }}
                                            >
                                                {c.role}
                                            </span>
                                            <h4
                                                className={`text-sm font-medium ${displayFont.className}`}
                                                style={{ color: YVYRA.bone }}
                                            >
                                                {c.name}
                                            </h4>
                                            <code
                                                className={`text-[11px] ${monoFont.className}`}
                                                style={{ color: YVYRA.amber }}
                                            >
                                                {c.code}
                                            </code>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- Typography --- */}
                        <section
                            className="p-8 rounded-2xl border space-y-6 relative overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(20,32,26,0.5)',
                                borderColor: 'rgba(62,86,65,0.6)',
                            }}
                        >
                            <CornerBrackets />
                            <div>
                                <span
                                    className={`text-[10px] uppercase tracking-[0.25em] block ${monoFont.className}`}
                                    style={{ color: YVYRA.copper }}
                                >
                                    Typography
                                </span>
                                <h3
                                    className={`text-xl ${displayFont.className}`}
                                    style={{ color: YVYRA.bone }}
                                >
                                    Sem Serifas — Geométrica, Analógica, Terrena
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div
                                    className="p-5 rounded-xl border space-y-2"
                                    style={{ backgroundColor: YVYRA.bgDeep, borderColor: 'rgba(62,86,65,0.5)' }}
                                >
                                    <span
                                        className={`text-[10px] uppercase tracking-wider ${monoFont.className}`}
                                        style={{ color: YVYRA.amber }}
                                    >
                                        Display
                                    </span>
                                    <p className={`text-2xl ${displayFont.className}`} style={{ color: YVYRA.bone }}>
                                        Bricolage Grotesque
                                    </p>
                                    <p className={`text-[11px] ${monoFont.className}`} style={{ color: YVYRA.fern }}>
                                        Headlines · construída, com alma, contemporânea
                                    </p>
                                </div>
                                <div
                                    className="p-5 rounded-xl border space-y-2"
                                    style={{ backgroundColor: YVYRA.bgDeep, borderColor: 'rgba(62,86,65,0.5)' }}
                                >
                                    <span
                                        className={`text-[10px] uppercase tracking-wider ${monoFont.className}`}
                                        style={{ color: YVYRA.amber }}
                                    >
                                        Body
                                    </span>
                                    <p className={`text-2xl ${bodyFont.className}`} style={{ color: YVYRA.bone }}>
                                        Space Grotesk
                                    </p>
                                    <p className={`text-[11px] ${monoFont.className}`} style={{ color: YVYRA.fern }}>
                                        Corpo · geométrica humanista, legível
                                    </p>
                                </div>
                                <div
                                    className="p-5 rounded-xl border space-y-2"
                                    style={{ backgroundColor: YVYRA.bgDeep, borderColor: 'rgba(62,86,65,0.5)' }}
                                >
                                    <span
                                        className={`text-[10px] uppercase tracking-wider ${monoFont.className}`}
                                        style={{ color: YVYRA.amber }}
                                    >
                                        Mono
                                    </span>
                                    <p className={`text-2xl ${monoFont.className}`} style={{ color: YVYRA.bone }}>
                                        IBM Plex Mono
                                    </p>
                                    <p className={`text-[11px] ${monoFont.className}`} style={{ color: YVYRA.fern }}>
                                        Dados · cheiro de instrumento analógico
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* ==========================================
                    TAB 3 — ARCHITECTURE & TECH STACK
                   ========================================== */}
                {activeTab === 'ti' && (
                    <div className="space-y-12 animate-in fade-in duration-300">
                        <section className="space-y-4">
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${monoFont.className}`}
                                style={{
                                    borderColor: 'rgba(199,123,60,0.3)',
                                    backgroundColor: 'rgba(199,123,60,0.08)',
                                    color: YVYRA.copper,
                                }}
                            >
                                <span>Engineering &amp; Stack</span>
                            </div>
                            <h2
                                className={`text-3xl ${displayFont.className}`}
                                style={{ color: YVYRA.bone }}
                            >
                                Technical Architecture &amp; Backend
                            </h2>
                            <p
                                className={`text-xs max-w-2xl ${monoFont.className}`}
                                style={{ color: YVYRA.fern }}
                            >
                                System specifications, frameworks, and data processing workflows.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Frontend & UI',
                                    items: ['Next.js App Router', 'Tailwind CSS (Design System)', 'Client/Server Components'],
                                },
                                {
                                    title: 'Backend & Database',
                                    items: [
                                        'PostgreSQL (Relational DB)',
                                        'Prisma ORM (Type-safe queries)',
                                        'Zod (Schema Validation)',
                                        'Next.js Server Actions',
                                    ],
                                },
                                {
                                    title: 'Media & Cloud',
                                    items: [
                                        'Cloudinary (Media CDN)',
                                        'Unsigned Upload (Client-Side)',
                                        'Local Canvas compression',
                                        'Strict edge-clamping logic',
                                    ],
                                },
                            ].map((c) => (
                                <div
                                    key={c.title}
                                    className="p-6 rounded-2xl border space-y-3 relative overflow-hidden"
                                    style={{
                                        backgroundColor: 'rgba(20,32,26,0.55)',
                                        borderColor: 'rgba(62,86,65,0.6)',
                                    }}
                                >
                                    <CornerBrackets />
                                    <h3
                                        className={`text-sm uppercase tracking-wider ${monoFont.className}`}
                                        style={{ color: YVYRA.amber }}
                                    >
                                        {c.title}
                                    </h3>
                                    <ul
                                        className={`space-y-2 text-xs ${monoFont.className}`}
                                        style={{ color: YVYRA.bone }}
                                    >
                                        {c.items.map((it) => (
                                            <li key={it}>• {it}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <section
                            className="p-8 rounded-2xl border space-y-4 relative overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(14,23,18,0.6)',
                                borderColor: 'rgba(62,86,65,0.5)',
                            }}
                        >
                            <CornerBrackets />
                            <KaingangDivider className="w-full h-3 opacity-40" />
                            <h3
                                className={`text-sm uppercase tracking-wider ${monoFont.className}`}
                                style={{ color: YVYRA.amber }}
                            >
                                Image Upload Technical Workflow
                            </h3>
                            <div className={`space-y-3 text-xs ${monoFont.className}`} style={{ color: YVYRA.fern }}>
                                {[
                                    <>User selects raw image file. Browser reads via <code style={{ color: YVYRA.amber }}>FileReader</code>.</>,
                                    <>Interactive panel applies zoom and drag with strict mathematical edge-clamping limits to prevent black borders.</>,
                                    <>The <code style={{ color: YVYRA.amber }}>&lt;canvas&gt;</code> renders a high-definition square version, converted to a Blob.</>,
                                    <>The optimized file is sent directly from the client to Cloudinary using environment variables (<code style={{ color: YVYRA.amber }}>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code>).</>,
                                    <>The generated secure URL (<code style={{ color: YVYRA.amber }}>secure_url</code>) is sent via Server Action to be persisted in PostgreSQL with Prisma.</>,
                                ].map((content, i) => (
                                    <div
                                        key={i}
                                        className="p-3 rounded-xl border flex items-start gap-3"
                                        style={{
                                            backgroundColor: YVYRA.bgDeep,
                                            borderColor: 'rgba(62,86,65,0.5)',
                                        }}
                                    >
                                        <span className="font-bold" style={{ color: YVYRA.copper }}>
                                            {String(i + 1).padStart(2, '0')}.
                                        </span>
                                        <p>{content}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

            </main>
        </div>
    )
}
import { db } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { YVYRA, displayFont, bodyFont, monoFont } from '@/lib/yvyra'
import {
    GuaraniCross,
    KaingangDivider,
    PinhaoSpiral,
    CornerBrackets,
    GrowthRing,
    Verticilo,
} from '@/app/components/YvyraOrnaments'

import { CreateTimelineButton } from '@/app/components/CreateTimelineButton'

export async function UserTimelines() {
    const user = await getSession()
    if (!user) redirect('/login')

    // ⚠️ Ajuste os nomes dos campos conforme seu schema Prisma
    // (owner_id, ownerId, userId, etc.)
    const timelines = await db.timeline.findMany({
        where: {
            members: {
                some: { user_id: user.id },
            },
        },
        include: {
            members: { include: { user: true } },
            memories: { orderBy: { date: 'desc' } },
        },
        orderBy: { created_at: 'desc' },
    })


    return (
        <section className={`relative ${bodyFont.className}`}>
            {/* ============================================================
                CABEÇALHO
               ============================================================ */}
            <div className="relative mb-14">
                <div className="flex items-center gap-3 mb-5">
                    <GuaraniCross size={26} color={YVYRA.copper} className="opacity-90" />
                    <span
                        className={`${monoFont.className} text-[10px] uppercase tracking-[0.3em]`}
                        style={{ color: YVYRA.copper }}
                    >
                        Verticilos · Linhas Vivas
                    </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2
                            className={`${displayFont.className} text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-4`}
                            style={{ color: YVYRA.bone }}
                        >
                            Olá, {user.name.split(' ')[0]}.
                            <br />
                            Suas linhas do tempo em cultivo
                        </h2>
                        <p
                            className={`${bodyFont.className} text-sm md:text-base leading-relaxed`}
                            style={{ color: YVYRA.fern }}
                        >
                            Cada tronco aqui é uma história que você decidiu não deixar o
                            tempo apagar.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Verticilo size={32} color={YVYRA.copper} className="opacity-50" />
                        <div
                            className={`${monoFont.className} text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full`}
                            style={{
                                color: YVYRA.copper,
                                border: `1px solid ${YVYRA.copper}40`,
                                backgroundColor: `${YVYRA.copper}10`,
                            }}
                        >
                            {timelines.length} {timelines.length === 1 ? 'ativa' : 'ativas'}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <KaingangDivider className="w-full h-3 opacity-25" color={YVYRA.copper} />
                </div>
            </div>

            {/* ============================================================
                ESTADO VAZIO
               ============================================================ */}
            {timelines.length === 0 ? (
                <div
                    className="relative text-center py-24 rounded-2xl overflow-hidden"
                    style={{
                        border: `1px dashed ${YVYRA.lichen}`,
                        backgroundColor: `${YVYRA.surface}50`,
                    }}
                >
                    <CornerBrackets color={YVYRA.copper} />
                    <div className="flex flex-col items-center gap-6">
                        <PinhaoSpiral size={56} color={YVYRA.copper} className="opacity-40" />
                        <div className="space-y-2">
                            <h3
                                className={`${displayFont.className} text-2xl`}
                                style={{ color: YVYRA.bone }}
                            >
                                Nenhuma semente plantada ainda.
                            </h3>
                            <p
                                className={`${monoFont.className} text-xs max-w-md mx-auto`}
                                style={{ color: YVYRA.fern }}
                            >
                                Toda araucária começa com um pinhão. Comece sua primeira
                                linha do tempo.
                            </p>
                        </div>
                        <CreateTimelineButton />
                    </div>
                </div>
            ) : (
                /* ============================================================
                   LISTA DE TIMELINES
                   ============================================================ */
                <div className="grid gap-10">
                    {timelines.map((timeline) => (
                        <article
                            key={timeline.id}
                            className="relative rounded-2xl overflow-hidden transition-all duration-500"
                            style={{
                                backgroundColor: `${YVYRA.surface}90`,
                                border: `1px solid ${YVYRA.lichen}`,
                                boxShadow: '0 30px 80px -40px rgba(0,0,0,0.7)',
                            }}
                        >
                            <CornerBrackets color={YVYRA.copper} />

                            {/* ---- Cabeçalho da Timeline ---- */}
                            <div
                                className="relative p-6 md:p-8"
                                style={{
                                    borderBottom: `1px solid ${YVYRA.lichen}80`,
                                    background: `linear-gradient(135deg, ${YVYRA.surface}CC, ${YVYRA.bgDeep}90)`,
                                }}
                            >
                                <div
                                    aria-hidden
                                    className="absolute -right-12 -top-12 opacity-[0.06] pointer-events-none"
                                >
                                    <GrowthRing size={220} color={YVYRA.amber} />
                                </div>

                                <div className="relative flex items-center justify-between gap-4 mb-5">
                                    <span
                                        className={`${monoFont.className} text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full`}
                                        style={{
                                            color: YVYRA.amber,
                                            border: `1px solid ${YVYRA.copper}50`,
                                            backgroundColor: `${YVYRA.copper}10`,
                                        }}
                                    >
                                        {timeline.category}
                                    </span>
                                    <span
                                        className={`${monoFont.className} text-[10px] uppercase tracking-[0.25em]`}
                                        style={{ color: YVYRA.fern }}
                                    >
                                        {timeline.visibility}
                                    </span>
                                </div>

                                <h3
                                    className={`${displayFont.className} text-2xl md:text-3xl font-medium mb-3 leading-tight`}
                                    style={{ color: YVYRA.bone }}
                                >
                                    {timeline.title}
                                </h3>

                                {timeline.description && (
                                    <p
                                        className={`${bodyFont.className} text-sm md:text-base leading-relaxed max-w-3xl`}
                                        style={{ color: YVYRA.fern }}
                                    >
                                        {timeline.description}
                                    </p>
                                )}
                            </div>

                            {/* ---- Corpo: Memórias ---- */}
                            <div
                                className="relative p-6 md:p-10"
                                style={{ backgroundColor: `${YVYRA.bgDeep}80` }}
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <PinhaoSpiral size={18} color={YVYRA.copper} className="opacity-80" />
                                    <h4
                                        className={`${monoFont.className} text-[10px] uppercase tracking-[0.3em]`}
                                        style={{ color: YVYRA.copper }}
                                    >
                                        Crônicas & Memórias · {timeline.memories.length}
                                    </h4>
                                </div>

                                {timeline.memories.length === 0 ? (
                                    <p
                                        className={`${monoFont.className} text-xs italic`}
                                        style={{ color: YVYRA.lichen }}
                                    >
                                        Nenhuma memória registrada ainda.
                                    </p>
                                ) : (
                                    <div className="relative pl-8 md:pl-12">
                                        {/* Tronco vertical */}
                                        <div
                                            aria-hidden
                                            className="absolute left-2 md:left-3 top-2 bottom-2 w-px"
                                            style={{
                                                background: `linear-gradient(180deg, ${YVYRA.lichen}00 0%, ${YVYRA.copper} 15%, ${YVYRA.copper} 85%, ${YVYRA.lichen}00 100%)`,
                                            }}
                                        />
                                        {/* Linha Kaingang */}
                                        <div
                                            aria-hidden
                                            className="absolute left-0 md:left-1 top-2 bottom-2 w-1 opacity-30"
                                            style={{
                                                backgroundImage: `repeating-linear-gradient(180deg, ${YVYRA.fern} 0, ${YVYRA.fern} 2px, transparent 2px, transparent 6px)`,
                                            }}
                                        />

                                        <div className="space-y-10">
                                            {timeline.memories.map((memory) => (
                                                <div key={memory.id} className="relative group">
                                                    {/* Nó do verticilo */}
                                                    <div
                                                        className="absolute -left-8 md:-left-12 top-2 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
                                                        style={{
                                                            backgroundColor: YVYRA.bgDeep,
                                                            border: `1.5px solid ${YVYRA.copper}`,
                                                            boxShadow: `0 0 0 4px ${YVYRA.bgDeep}, 0 0 20px -4px ${YVYRA.copper}`,
                                                        }}
                                                    >
                                                        <PinhaoSpiral
                                                            size={14}
                                                            color={YVYRA.amber}
                                                            className="opacity-90 group-hover:rotate-[20deg] transition-transform duration-500"
                                                        />
                                                    </div>

                                                    <div
                                                        aria-hidden
                                                        className="absolute -left-8 md:-left-12 top-5 h-px w-8 md:w-12"
                                                        style={{ backgroundColor: `${YVYRA.copper}80` }}
                                                    />

                                                    {/* Card da memória */}
                                                    <div
                                                        className="relative rounded-xl p-5 transition-all duration-300"
                                                        style={{
                                                            backgroundColor: `${YVYRA.surface}70`,
                                                            border: `1px solid ${YVYRA.lichen}80`,
                                                        }}
                                                    >
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                                            <h5
                                                                className={`${displayFont.className} text-base md:text-lg font-medium`}
                                                                style={{ color: YVYRA.bone }}
                                                            >
                                                                {memory.title}
                                                            </h5>
                                                            <time
                                                                className={`${monoFont.className} text-[10px] uppercase tracking-[0.2em] shrink-0`}
                                                                style={{ color: YVYRA.fern }}
                                                            >
                                                                {new Date(memory.date).toLocaleDateString('pt-BR', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                })}
                                                            </time>
                                                        </div>

                                                        {memory.description && (
                                                            <p
                                                                className={`${bodyFont.className} text-sm leading-relaxed mb-4`}
                                                                style={{ color: YVYRA.fern }}
                                                            >
                                                                {memory.description}
                                                            </p>
                                                        )}

                                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                                            {memory.mood && (
                                                                <span
                                                                    className={`${monoFont.className} text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full inline-flex items-center gap-1.5`}
                                                                    style={{
                                                                        color: YVYRA.amber,
                                                                        border: `1px solid ${YVYRA.copper}40`,
                                                                        backgroundColor: `${YVYRA.copper}10`,
                                                                    }}
                                                                >
                                                                    <span>✨</span>
                                                                    {memory.mood}
                                                                </span>
                                                            )}
                                                            {memory.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className={`${monoFont.className} text-[10px] px-2.5 py-1 rounded-full`}
                                                                    style={{
                                                                        color: YVYRA.fern,
                                                                        border: `1px solid ${YVYRA.lichen}80`,
                                                                        backgroundColor: `${YVYRA.bgDeep}80`,
                                                                    }}
                                                                >
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {memory.media_urls.length > 0 && (
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 max-w-2xl">
                                                                {memory.media_urls.map((url, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="relative aspect-square rounded-lg overflow-hidden"
                                                                        style={{
                                                                            backgroundColor: YVYRA.bgDeep,
                                                                            border: `1px solid ${YVYRA.lichen}80`,
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={url}
                                                                            alt={memory.title}
                                                                            className="object-cover w-full h-full hover:scale-105 transition duration-700"
                                                                        />
                                                                        <div
                                                                            aria-hidden
                                                                            className="absolute inset-0 pointer-events-none"
                                                                            style={{
                                                                                boxShadow: `inset 0 0 40px 8px ${YVYRA.bgDeep}80`,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Nó terminal */}
                                        <div className="relative mt-10">
                                            <div
                                                className="absolute -left-8 md:-left-12 top-0 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full"
                                                style={{
                                                    backgroundColor: YVYRA.bgDeep,
                                                    border: `1.5px dashed ${YVYRA.copper}`,
                                                }}
                                            >
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{ backgroundColor: YVYRA.copper }}
                                                />
                                            </div>
                                            <span
                                                className={`${monoFont.className} text-[10px] uppercase tracking-[0.3em] ml-2 md:ml-3`}
                                                style={{ color: YVYRA.lichen }}
                                            >
                                                A história continua
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
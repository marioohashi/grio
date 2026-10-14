import Link from 'next/link'
import { YVYRA, displayFont, bodyFont, monoFont } from '@/lib/yvyra'
import {
    PinhaoSpiral,
    GuaraniCross,
    KaingangDivider,
    AstrolabeRose,
} from '@/app/components/YvyraOrnaments'

export function Footer() {
    return (
        <footer
            className={`relative w-full overflow-hidden ${bodyFont.className}`}
            style={{
                backgroundColor: YVYRA.bgDeep,
                color: YVYRA.fern,
                borderTop: `1px solid ${YVYRA.lichen}`,
            }}
        >
            {/* Filete de cobre no topo — assinatura YVYRA */}
            <div
                aria-hidden
                className="absolute top-0 inset-x-0 h-px opacity-70"
                style={{
                    background:
                        'linear-gradient(90deg, transparent, rgba(199,123,60,0.55), rgba(224,168,75,0.55), rgba(199,123,60,0.55), transparent)',
                }}
            />

            {/* Rosácea de astrolábio como marca d'água gigante */}
            <div
                aria-hidden
                className="absolute -right-24 -bottom-24 opacity-[0.05] pointer-events-none"
            >
                <AstrolabeRose size={420} color={YVYRA.copper} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* ============================================================
                        COLUNA 1 & 2 — MARCA E MANIFESTO
                       ============================================================ */}
                    <div className="md:col-span-6 space-y-5">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <span className="relative w-9 h-9 flex items-center justify-center">
                                <PinhaoSpiral
                                    size={36}
                                    color={YVYRA.copper}
                                    className="opacity-70 group-hover:opacity-100 group-hover:rotate-[20deg] transition-all duration-700 ease-out"
                                />
                            </span>
                            <span
                                className={`${displayFont.className} text-3xl tracking-tight font-medium transition-colors duration-300`}
                                style={{ color: YVYRA.bone }}
                            >
                                Griô
                            </span>
                        </Link>

                        <p
                            className={`${bodyFont.className} text-base leading-relaxed max-w-md`}
                            style={{ color: YVYRA.fern }}
                        >
                            Um santuário digital para as sementes da sua história.
                            Cada memória é um{' '}
                            <span style={{ color: YVYRA.bone }}>pinhão</span> que
                            viaja entre gerações — longe do ruído algorítmico, perto
                            do que é eterno.
                        </p>

                        {/* Tagline poética */}
                        <div className="flex items-center gap-3 pt-2">
                            <GuaraniCross size={20} color={YVYRA.copper} className="opacity-70 shrink-0" />
                            <span
                                className={`${monoFont.className} text-[11px] uppercase tracking-[0.25em] italic`}
                                style={{ color: YVYRA.copper }}
                            >
                                Plante o que o tempo não apaga.
                            </span>
                        </div>
                    </div>

                    {/* ============================================================
                        COLUNA 3 — PLATAFORMA
                       ============================================================ */}
                    <div className="md:col-span-3 space-y-4">
                        <div className="flex items-center gap-3">
                            <span
                                className={`${monoFont.className} text-[10px] uppercase tracking-[0.28em]`}
                                style={{ color: YVYRA.amber }}
                            >
                                Plataforma
                            </span>
                        </div>
                        <KaingangDivider
                            className="w-full h-2.5 opacity-25"
                            color={YVYRA.copper}
                        />
                        <ul className={`space-y-3 text-sm ${monoFont.className}`}>
                            {[
                                { href: '/#timeline', label: 'Explorar Exemplo' },
                                { href: '/login', label: 'Entrar na Conta' },
                                { href: '/signup', label: 'Criar Conta' },
                                { href: '/concepts', label: 'Manifesto YVYRA' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-2 transition-colors duration-300 group"
                                        style={{ color: YVYRA.fern }}
                                    >
                                        <span
                                            className="w-1 h-1 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                                            style={{ backgroundColor: YVYRA.copper }}
                                        />
                                        <span className="group-hover:text-[#E0A84B] transition-colors">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ============================================================
                        COLUNA 4 — DESENVOLVIMENTO
                       ============================================================ */}
                    <div className="md:col-span-3 space-y-4">
                        <div className="flex items-center gap-3">
                            <span
                                className={`${monoFont.className} text-[10px] uppercase tracking-[0.28em]`}
                                style={{ color: YVYRA.amber }}
                            >
                                Artesão
                            </span>
                        </div>
                        <KaingangDivider
                            className="w-full h-2.5 opacity-25"
                            color={YVYRA.copper}
                        />

                        <p
                            className={`text-sm leading-relaxed ${bodyFont.className}`}
                            style={{ color: YVYRA.fern }}
                        >
                            Criado por{' '}
                            <strong
                                className="font-medium"
                                style={{ color: YVYRA.bone }}
                            >
                                Mario Ohashi
                            </strong>
                            .
                        </p>

                        {/* Redes sociais — botões como instrumentos */}
                        <div className="flex items-center gap-2 pt-1">
                            {[
                                {
                                    href: 'https://www.linkedin.com/in/marioohashi',
                                    title: 'LinkedIn',
                                    svg: (
                                        <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: 'https://github.com/marioohashi',
                                    title: 'GitHub',
                                    svg: (
                                        <svg stroke="currentColor" fill="currentColor" viewBox="0 0 496 512" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: 'mailto:mario.ohashi@gmail.com',
                                    title: 'Contato',
                                    svg: (
                                        <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                        </svg>
                                    ),
                                },
                            ].map((social) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    title={social.title}
                                    className="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                                    style={{
                                        backgroundColor: YVYRA.surface,
                                        border: `1px solid ${YVYRA.lichen}`,
                                        color: YVYRA.fern,
                                    }}
                                >
                                    {/* Hover fill cobre */}
                                    <span
                                        aria-hidden
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, ${YVYRA.copper}, ${YVYRA.amber})`,
                                        }}
                                    />
                                    <span className="relative z-10 group-hover:text-[#0E1712] transition-colors duration-300">
                                        {social.svg}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    RODAPÉ FINAL
                   ============================================================ */}
                <div className="pt-8 relative" style={{ borderTop: `1px solid ${YVYRA.lichen}50` }}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className={`${monoFont.className} text-[11px] tracking-wider flex items-center gap-3`}>
                            <PinhaoSpiral size={14} color={YVYRA.copper} className="opacity-60" />
                            <span style={{ color: YVYRA.fern }}>
                                © {new Date().getFullYear()} Griô · YVYRA
                            </span>
                            <span style={{ color: YVYRA.lichen }}>·</span>
                            <span style={{ color: YVYRA.fern }}>
                                Todos os direitos reservados.
                            </span>
                        </div>

                        <div className={`${monoFont.className} text-[10px] uppercase tracking-[0.3em] flex items-center gap-3`}>
                            <span style={{ color: YVYRA.lichen }}>Cultivado em Curitiba</span>
                            <span style={{ color: YVYRA.copper }}>·</span>
                            <span style={{ color: YVYRA.fern }}>PR · BR</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
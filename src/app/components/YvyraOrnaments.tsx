import type { CSSProperties } from 'react'
import { YVYRA } from '@/lib/yvyra'

type OrnProps = {
    className?: string
    size?: number
    style?: CSSProperties
    color?: string
}

/** Cruz Guarani (Mbyá) — memória selada, seção sagrada */
export function GuaraniCross({ className = '', size = 40, style, color = 'currentColor' }: OrnProps) {
    return (
        <svg viewBox="0 0 40 40" width={size} height={size}
            className={className} style={style}
            fill="none" stroke={color} strokeWidth="1.25" aria-hidden="true">
            <circle cx="20" cy="20" r="18" strokeOpacity="0.4" />
            <circle cx="20" cy="20" r="13" strokeOpacity="0.8" />
            <line x1="20" y1="4" x2="20" y2="36" strokeOpacity="0.9" />
            <line x1="4" y1="20" x2="36" y2="20" strokeOpacity="0.9" />
            <circle cx="20" cy="20" r="2.5" fill={color} stroke="none" />
            <circle cx="20" cy="7" r="1" fill={color} stroke="none" />
            <circle cx="20" cy="33" r="1" fill={color} stroke="none" />
            <circle cx="7" cy="20" r="1" fill={color} stroke="none" />
            <circle cx="33" cy="20" r="1" fill={color} stroke="none" />
        </svg>
    )
}

/** Grafismo Kaingang — divisor entre seções */
export function KaingangDivider({ className = '', style, color = 'currentColor' }: OrnProps) {
    return (
        <svg viewBox="0 0 240 16" className={className} style={style}
            fill="none" stroke={color} strokeWidth="1"
            preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="4" x2="240" y2="4" strokeOpacity="0.7" />
            <line x1="0" y1="12" x2="240" y2="12" strokeOpacity="0.7" />
            {[20, 60, 100, 140, 180, 220].map((x, i) => (
                <g key={i}>
                    <circle cx={x} cy="8" r="1.5" fill={color} stroke="none" />
                    <line x1={x} y1="4" x2={x} y2="12" strokeOpacity="0.5" />
                </g>
            ))}
        </svg>
    )
}

/** Espiral do Pinhão — Fibonacci, semente, marco */
export function PinhaoSpiral({ className = '', size = 32, style, color = 'currentColor' }: OrnProps) {
    return (
        <svg viewBox="0 0 40 40" width={size} height={size}
            className={className} style={style}
            fill="none" stroke={color} strokeWidth="1" aria-hidden="true">
            <path d="M20 20 m0 -2 a2 2 0 0 1 2 2 a4 4 0 0 1 -4 4 a6 6 0 0 1 -6 -6 a8 8 0 0 1 8 -8 a10 10 0 0 1 10 10 a12 12 0 0 1 -12 12 a14 14 0 0 1 -14 -14 a16 16 0 0 1 16 -16" />
        </svg>
    )
}

/** Rosácea de Astrolábio — instrumento cósmico */
export function AstrolabeRose({ className = '', size = 80, style, color = 'currentColor' }: OrnProps) {
    const ticks = Array.from({ length: 24 })
    return (
        <svg viewBox="0 0 80 80" width={size} height={size}
            className={className} style={style}
            fill="none" stroke={color} strokeWidth="0.75" aria-hidden="true">
            <circle cx="40" cy="40" r="38" strokeOpacity="0.25" />
            <circle cx="40" cy="40" r="30" strokeOpacity="0.5" />
            <circle cx="40" cy="40" r="22" strokeOpacity="0.8" />
            <circle cx="40" cy="40" r="12" strokeOpacity="0.5" />
            <circle cx="40" cy="40" r="3" fill={color} stroke="none" />
            {ticks.map((_, i) => {
                const a = ((i * 15) * Math.PI) / 180
                return (
                    <line key={i}
                        x1={40 + Math.cos(a) * 30} y1={40 + Math.sin(a) * 30}
                        x2={40 + Math.cos(a) * 38} y2={40 + Math.sin(a) * 38}
                        strokeOpacity="0.6" />
                )
            })}
            <line x1="40" y1="8" x2="40" y2="72" strokeOpacity="0.35" />
            <line x1="8" y1="40" x2="72" y2="40" strokeOpacity="0.35" />
        </svg>
    )
}

/** Anel de Crescimento — dendrocronologia, camadas */
export function GrowthRing({ className = '', size = 48, style, color = 'currentColor' }: OrnProps) {
    return (
        <svg viewBox="0 0 48 48" width={size} height={size}
            className={className} style={style}
            fill="none" stroke={color} strokeWidth="1" aria-hidden="true">
            <circle cx="24" cy="24" r="20" strokeOpacity="0.4" />
            <circle cx="24" cy="24" r="14" />
            <circle cx="24" cy="24" r="8" strokeOpacity="0.7" />
            <circle cx="24" cy="24" r="3" fill={color} stroke="none" />
        </svg>
    )
}

/** Verticilo — estrutura da araucária */
export function Verticilo({ className = '', size = 48, style, color = 'currentColor' }: OrnProps) {
    return (
        <svg viewBox="0 0 48 48" width={size} height={size}
            className={className} style={style}
            fill="none" stroke={color} strokeWidth="1" aria-hidden="true">
            <line x1="24" y1="4" x2="24" y2="44" strokeOpacity="0.6" />
            <line x1="12" y1="16" x2="36" y2="16" strokeOpacity="0.8" />
            <line x1="8" y1="26" x2="40" y2="26" strokeOpacity="0.8" />
            <line x1="14" y1="36" x2="34" y2="36" strokeOpacity="0.8" />
            <circle cx="24" cy="4" r="2" fill={color} stroke="none" />
            <circle cx="24" cy="44" r="2" fill={color} stroke="none" />
        </svg>
    )
}

/** Cantoneiras de cobre — cards como instrumentos astronômicos */
export function CornerBrackets({ color = YVYRA.copper }: { color?: string }) {
    const corners = [
        'top-0 left-0',
        'top-0 right-0 rotate-90',
        'bottom-0 right-0 rotate-180',
        'bottom-0 left-0 -rotate-90',
    ]
    return (
        <>
            {corners.map((pos, i) => (
                <svg key={i} viewBox="0 0 16 16" width="14" height="14"
                    className={`absolute ${pos} pointer-events-none`}
                    fill="none" stroke={color} strokeWidth="1.25" aria-hidden="true">
                    <path d="M0 6 L0 0 L6 0" />
                    <path d="M2.5 6 L2.5 2.5 L6 2.5" strokeOpacity="0.5" />
                </svg>
            ))}
        </>
    )
}
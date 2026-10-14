import { Bricolage_Grotesque, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'

export const displayFont = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
})

export const bodyFont = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
})

export const monoFont = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-mono',
    display: 'swap',
})

export const YVYRA = {
    bg: '#0E1712',
    bgDeep: '#0A100C',
    surface: '#14201A',
    surfaceHi: '#1A2A22',
    lichen: '#3E5641',
    fern: '#8FA88C',
    bone: '#E6E1D3',
    copper: '#C77B3C',
    amber: '#E0A84B',
    cinnabar: '#A63D2F',
} as const
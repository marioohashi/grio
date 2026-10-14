import Image from 'next/image'

export default function HeroBackground() {
    return (

        <div className="absolute inset-0 -z-10 overflow-hidden">

            {/* Imagem base */}
            <Image
                src="/hero-bg3.jpeg"
                fill
                priority
                className="object-cover"
                alt=""
            />

            <div
                className="absolute inset-0 mix-blend-soft-light"
                style={{
                    background:
                        'linear-gradient(135deg, rgba(224,168,75,0.28) 0%, rgba(199,123,60,0.18) 45%, transparent 100%)',
                }}
            />

            {/* Overlay musgo profundo */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(14,23,18,0.72)' }}
            />

            {/* Gradiente vertical — escurece topo e base, respira no meio */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(14,23,18,0.88) 0%, rgba(14,23,18,0.32) 35%, rgba(14,23,18,0.55) 65%, rgba(14,23,18,1) 100%)',
                }}
            />

            {/* Grade celestial analógica (dots musgo) */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                    backgroundImage:
                        'radial-gradient(rgba(143,168,140,0.15) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Vinheta analógica */}
            <div
                className="absolute inset-0"
                style={{
                    boxShadow: 'inset 0 0 260px 70px rgba(10,16,12,0.92)',
                }}
            />
        </div>
    )
}
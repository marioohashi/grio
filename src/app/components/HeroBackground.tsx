import Image from 'next/image'


export default function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10">
            <Image
                src="/hero-bg.jpg"
                fill
                priority
                className="object-cover"
                alt=""
            />
            <div className="absolute inset-0 bg-stone-950/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/70 to-stone-950" />
        </div>
    )
}




'use client'

import { useRef, useState } from 'react'

interface MemoryItem {
    id: string
    title: string
    date: string
    image: string
    location: string
}

const SAMPLE_MEMORIES: MemoryItem[] = [
    {
        id: '1',
        title: 'Expedição Chama Sagrada',
        date: 'Março 2026',
        location: 'Chapada Diamantina, BA',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: '2',
        title: 'Festival de Inverno & Tradições',
        date: 'Maio 2025',
        location: 'Antonina, PR',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: '3',
        title: 'Imersão em Arte Contemporânea',
        date: 'Fevereiro 2025',
        location: 'Brumadinho, MG',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: '4',
        title: 'Travessia e Caminhos na Serra',
        date: 'Janeiro 2026',
        location: 'Paraná, Brasil',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: '5',
        title: 'Registros e Arquivos de Família',
        date: 'Abril 2026',
        location: 'Curitiba, PR',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    },
]

export function FilmRollGallery() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0))
        setScrollLeft(scrollRef.current?.scrollLeft || 0)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 1.5 // Multiplicador de velocidade do arraste
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk
        }
    }

    // Permite rolar com a roda do mouse horizontalmente
    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY
        }
    }

    return (
        <div className="w-full py-6 select-none">
            <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                        Arquivo Visual • Rolo de Filme
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif text-stone-100 mt-1">
                        Capítulos do Tempo
                    </h2>
                </div>
                <p className="text-sm text-stone-400 font-mono">
                    ← Arraste ou use o scroll para navegar →
                </p>
            </div>

            {/* Trilha do rolo de filme */}
            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onWheel={handleWheel}
                className="flex gap-6 overflow-x-auto px-6 pb-12 pt-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {SAMPLE_MEMORIES.map((memory, index) => (
                    <div
                        key={memory.id}
                        className="flex-shrink-0 w-[300px] md:w-[420px] snap-center group relative bg-stone-900 border border-stone-800/80 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-amber-500/50 hover:shadow-amber-500/5"
                    >
                        {/* Detalhes de perfuração superior (estética de negativo de filme) */}
                        <div className="absolute top-2 left-0 right-0 px-4 flex justify-between z-20 pointer-events-none opacity-40">
                            <div className="flex gap-1.5">
                                <span className="w-1.5 h-3 bg-stone-950 rounded-sm"></span>
                                <span className="w-1.5 h-3 bg-stone-950 rounded-sm"></span>
                            </div>
                            <span className="text-[10px] font-mono text-stone-300 tracking-wider">
                                FRAME 0{index + 1}
                            </span>
                            <div className="flex gap-1.5">
                                <span className="w-1.5 h-3 bg-stone-950 rounded-sm"></span>
                                <span className="w-1.5 h-3 bg-stone-950 rounded-sm"></span>
                            </div>
                        </div>

                        {/* Imagem do Frame */}
                        <div className="relative h-[380px] md:h-[460px] w-full overflow-hidden bg-stone-950">
                            <img
                                src={memory.image}
                                alt={memory.title}
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />
                        </div>

                        {/* Informações da Memória */}
                        <div className="absolute bottom-0 inset-x-0 p-6 z-10 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                                    {memory.date}
                                </span>
                                <span className="text-xs text-stone-400 font-mono">
                                    {memory.location}
                                </span>
                            </div>
                            <h3 className="text-xl font-serif font-medium text-stone-100 group-hover:text-amber-300 transition-colors">
                                {memory.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
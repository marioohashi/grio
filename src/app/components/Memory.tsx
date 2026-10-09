import { TimelineMemory } from '@/app/types/timeline'
import Image from 'next/image'

interface MemoryProps {
    memory: TimelineMemory
    index: number
}

const TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1']

export function Memory({ memory, index }: MemoryProps) {
    const tilt = TILTS[index % TILTS.length]

    return (
        <div className="flex flex-col items-center">
            <div className="relative mt-4 flex flex-col items-center pb-8">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[10px] font-mono text-stone-400 mt-2">
                    {memory.date}
                </span>
            </div>
            <div
                className={`
                flex-shrink-0 w-[280px] md:w-[340px] snap-center
                bg-stone-50 rounded-sm p-3 pb-16
                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]
                transition-all duration-500 ease-out
                hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]
                // ${tilt}
            `}
            >
                {/* Foto */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-200">
                    <Image
                        src={memory.image}
                        alt={memory.title}
                        fill
                        sizes="(max-width: 768px) 280px, 340px"
                        className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
                        draggable={false}
                    />
                </div>

                {/* Pé da polaroid: texto sobre o branco */}
                <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-2">

                    <h3 className="text-base font-serif font-medium text-stone-900 leading-snug">
                        {memory.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-1">
                        {memory.date} *
                        <span className="text-xs font-mono text-stone-400 mt-1 truncate"> {memory.location}
                        </span>
                    </p>
                </div>

            </div>


        </div>
    )
}
'use client'

import { useState } from 'react'
import { monoFont, YVYRA } from '@/lib/yvyra'
import { CreateTimelineModal } from '@/app/components/CreateTimelineModal'

export function CreateTimelineButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={`${monoFont.className} inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[11px] uppercase tracking-[0.25em] transition cursor-pointer`}
                style={{
                    backgroundColor: YVYRA.amber,
                    color: YVYRA.bg,
                    boxShadow: '0 14px 40px -12px rgba(224,168,75,0.45)',
                }}
            >
                <span className="text-base leading-none">+</span>
                Plantar primeira semente
            </button>

            <CreateTimelineModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
'use client'

import { useEffect, useState } from 'react'

export function BackgroundGlow() {
    const [position, setPosition] = useState({ x: -500, y: -500 })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        let animationFrameId: number

        const handleMouseMove = (e: MouseEvent) => {
            // Usando requestAnimationFrame para performance otimizada
            cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY })
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    if (!isClient) return null

    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
            {/* Luz principal que segue o mouse */}
            <div
                className="absolute -inset-px transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(245, 158, 11, 0.07), transparent 80%)`,
                }}
            />

            {/* Brilho secundário difuso e estático para dar profundidade orgânica */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
    )
}
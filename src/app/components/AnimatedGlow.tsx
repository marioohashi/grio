'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedGlow() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let animationFrameId: number
        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        const targetMouse = { x: width / 2, y: height / 2 }
        const mouse = { x: width / 2, y: height / 2 }

        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.x = e.clientX
            targetMouse.y = e.clientY
        }
        window.addEventListener('mousemove', handleMouseMove)

        const orbs = [
            { x: width * 0.18, y: height * 0.28, radius: 380, color: 'rgba(224,168,75,0.055)', vx: 0.35, vy: 0.22 },
            { x: width * 0.82, y: height * 0.72, radius: 480, color: 'rgba(199,123,60,0.045)', vx: -0.28, vy: -0.18 },
            { x: width * 0.5, y: height * 0.5, radius: 540, color: 'rgba(62,86,65,0.060)', vx: 0.22, vy: -0.32 },
            { x: width * 0.35, y: height * 0.85, radius: 320, color: 'rgba(166,61,47,0.028)', vx: -0.18, vy: 0.24 },
        ]

        const render = () => {
            mouse.x += (targetMouse.x - mouse.x) * 0.05
            mouse.y += (targetMouse.y - mouse.y) * 0.05

            ctx.clearRect(0, 0, width, height)

            orbs.forEach((orb) => {
                orb.x += orb.vx
                orb.y += orb.vy

                if (orb.x < -150 || orb.x > width + 150) orb.vx *= -1
                if (orb.y < -150 || orb.y > height + 150) orb.vy *= -1

                const gradient = ctx.createRadialGradient(
                    orb.x, orb.y, 0,
                    orb.x, orb.y, orb.radius
                )
                gradient.addColorStop(0, orb.color)
                gradient.addColorStop(1, 'transparent')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
                ctx.fill()
            })

            // Orbe guiado pelo mouse — cobre do astrolábio
            const mouseGradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, 420
            )
            mouseGradient.addColorStop(0, 'rgba(199,123,60,0.075)')
            mouseGradient.addColorStop(0.5, 'rgba(224,168,75,0.035)')
            mouseGradient.addColorStop(1, 'transparent')

            ctx.fillStyle = mouseGradient
            ctx.beginPath()
            ctx.arc(mouse.x, mouse.y, 420, 0, Math.PI * 2)
            ctx.fill()

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
        />
    )
}
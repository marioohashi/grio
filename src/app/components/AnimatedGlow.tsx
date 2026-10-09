'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedGlow() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        // Mouse alvo (posição real) e mouse suavizado (lerp)
        const targetMouse = { x: width / 2, y: height / 2 }
        const mouse = { x: width / 2, y: height / 2 }

        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.x = e.clientX
            targetMouse.y = e.clientY
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Orbes de luz ambiente
        const orbs = [
            { x: width * 0.2, y: height * 0.3, radius: 350, color: 'rgba(245, 158, 11, 0.05)', vx: 0.5, vy: 0.3 },
            { x: width * 0.8, y: height * 0.7, radius: 450, color: 'rgba(120, 53, 15, 0.04)', vx: -0.4, vy: -0.2 },
            { x: width * 0.5, y: height * 0.5, radius: 500, color: 'rgba(217, 119, 6, 0.03)', vx: 0.3, vy: -0.5 },
        ]

        const render = () => {
            // Lerp do mouse
            mouse.x += (targetMouse.x - mouse.x) * 0.05
            mouse.y += (targetMouse.y - mouse.y) * 0.05

            ctx.clearRect(0, 0, width, height)

            // Orbes
            orbs.forEach((orb) => {
                orb.x += orb.vx
                orb.y += orb.vy

                if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1
                if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1

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

            // Orbe que segue o mouse
            const mouseGradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, 400
            )
            mouseGradient.addColorStop(0, 'rgba(245, 158, 11, 0.08)')
            mouseGradient.addColorStop(1, 'transparent')

            ctx.fillStyle = mouseGradient
            ctx.beginPath()
            ctx.arc(mouse.x, mouse.y, 400, 0, Math.PI * 2)
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
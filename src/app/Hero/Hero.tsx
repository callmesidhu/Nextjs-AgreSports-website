"use client"

import { useEffect, useRef } from "react"
import { metalMania } from "../fonts/metalMania"
import Header from "../Header/header"
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `rgba(169, 3, 252, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (canvas && (this.x < 0 || this.x > canvas.width)) {
          this.speedX = -this.speedX
        }

        if (canvas && (this.y < 0 || this.y > canvas.height)) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect particles with lines
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines if they are close enough
    const connectParticles = () => {
      if (!ctx) return
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(169, 3, 252, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-28">
      {/* Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      {/*Header section*/}
      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className={metalMania.className}>Dominate The </span>
              <span className={`${metalMania.className} text-[#a903fc]`}>Game</span>
            </h1>
            <p className={metalMania.className}>
              Join us on our journey to the top of competitive gaming. We are a professional esports organization
              competing at the highest level.
            </p>
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
            {/* <Image src="/placeholder.svg?height=500&width=500" alt="Gaming Team" fill className="object-contain" /> */}

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#a903fc]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#a903fc]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

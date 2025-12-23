"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroSectionProps {
  data: {
    titulo: string
    subtitulo: string
    descripcion?: string
    imagen: string
    boton?: {
      texto: string
      link: string
    }
  }
  negocio: {
    nombre: string
    eslogan: string
  }
}

export default function HeroSection({ data, negocio }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector(data.boton?.link || "#")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.imagen || "/placeholder.svg"}
          alt="Hero background"
          fill
          className="object-cover opacity-30"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/50 via-[#0A0E27]/80 to-[#0A0E27]"></div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-principal) 1px, transparent 1px), linear-gradient(90deg, var(--color-principal) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div
            className={`mb-8 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch-effect">
              <span
                className="bg-gradient-to-r from-[var(--color-principal)] via-[var(--color-acento)] to-[var(--color-secundario)] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 30px rgba(0, 217, 255, 0.5)",
                }}
              >
                {negocio.nombre}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-principal)] font-semibold">{negocio.eslogan}</p>
          </div>

          {/* Main content */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{data.titulo}</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-4">{data.subtitulo}</p>
            {data.descripcion && <p className="text-base md:text-lg text-gray-400 mb-8">{data.descripcion}</p>}

            {data.boton && (
              <a href={data.boton.link} onClick={handleScroll}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-[var(--color-principal)] hover:bg-[var(--color-acento)] text-[#0A0E27] font-bold transition-all duration-300 transform hover:scale-105 glow-effect"
                >
                  {data.boton.texto}
                </Button>
              </a>
            )}
          </div>

          {/* Stats */}
          <div
            className={`mt-16 grid grid-cols-3 gap-8 transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-principal)] mb-2">500+</div>
              <div className="text-sm md:text-base text-gray-400">Consolas Reparadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-secundario)] mb-2">5★</div>
              <div className="text-sm md:text-base text-gray-400">Calificación</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-acento)] mb-2">3 años</div>
              <div className="text-sm md:text-base text-gray-400">De Experiencia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-[var(--color-principal)] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[var(--color-principal)] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

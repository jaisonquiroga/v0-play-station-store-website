"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface ServicesSectionProps {
  data: {
    id: string
    titulo: string
    items: Array<{
      titulo: string
      descripcion: string
      icono: string
      imagen: string
    }>
  }
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll("[data-card-index]")
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(index))
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id={data.id} ref={sectionRef} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[var(--color-principal)] to-[var(--color-acento)] bg-clip-text text-transparent">
              {data.titulo}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-principal)] to-[var(--color-secundario)] mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((item, index) => (
            <div
              key={index}
              data-card-index={index}
              className={`transform transition-all duration-700 ${
                visibleCards.has(index) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Card className="group relative overflow-hidden bg-[#151b3f] border-[#2d3561] hover:border-[var(--color-principal)] transition-all duration-300 h-full">
                {/* Image Background */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                  <Image src={item.imagen || "/placeholder.svg"} alt={item.titulo} fill className="object-cover" />
                </div>

                <CardContent className="relative z-10 p-6 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-principal)] to-[var(--color-acento)] text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {item.icono}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-principal)] transition-colors">
                    {item.titulo}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">{item.descripcion}</p>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-principal)] rounded-lg transition-all duration-300 pointer-events-none"></div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-principal)] to-[var(--color-acento)] rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-principal)] opacity-5 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--color-secundario)] opacity-5 rounded-full blur-[100px] -z-10"></div>
      </div>
    </section>
  )
}

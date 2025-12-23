"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestimonialsSectionProps {
  data: {
    id: string
    titulo: string
    items: Array<{
      nombre: string
      texto: string
      estrellas: number
    }>
  }
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, data.items.length])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % data.items.length)
  }

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + data.items.length) % data.items.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section id={data.id} className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[var(--color-principal)] to-[var(--color-secundario)] bg-clip-text text-transparent">
              {data.titulo}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-principal)] to-[var(--color-secundario)] mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {data.items.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-[#151b3f] border-[#2d3561] neon-border">
                    <CardContent className="p-8 md:p-12 text-center">
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-6">
                        {Array.from({ length: testimonial.estrellas }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 fill-[var(--color-principal)] text-[var(--color-principal)]"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed italic">
                        "{testimonial.texto}"
                      </blockquote>

                      {/* Author */}
                      <div className="text-[var(--color-principal)] font-bold text-lg">— {testimonial.nombre}</div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
            <Button
              onClick={goToPrev}
              size="icon"
              className="pointer-events-auto bg-[var(--color-principal)] hover:bg-[var(--color-acento)] text-[#0A0E27] rounded-full w-12 h-12 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={goToNext}
              size="icon"
              className="pointer-events-auto bg-[var(--color-principal)] hover:bg-[var(--color-acento)] text-[#0A0E27] rounded-full w-12 h-12 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {data.items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[var(--color-principal)] w-8" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-principal)] opacity-5 rounded-full blur-[150px] -z-10"></div>
    </section>
  )
}

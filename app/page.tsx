"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import CatalogSection from "@/components/catalog-section"
import QuoteForm from "@/components/quote-form"
import GallerySection from "@/components/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"
import GameSection from "@/components/game-section"
import WhatsAppButton from "@/components/whatsapp-button"
import type { Config } from "@/lib/types"

export default function HomePage() {
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => {
        setConfig(data)
        setLoading(false)

        // Apply custom styles from config
        if (data.estilos) {
          document.documentElement.style.setProperty("--color-principal", data.estilos.colorPrincipal)
          document.documentElement.style.setProperty("--color-secundario", data.estilos.colorSecundario)
          document.documentElement.style.setProperty("--color-acento", data.estilos.colorAcento)
        }
      })
      .catch((error) => {
        console.error("[v0] Error loading config:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-principal,#00D9FF)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <p className="text-white text-lg">Error al cargar la configuración</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] relative overflow-x-hidden">
      <Navbar config={config} />

      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-principal,#00D9FF)] opacity-10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-secundario,#FF006E)] opacity-10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {config.secciones.map((seccion) => {
          switch (seccion.tipo) {
            case "banner":
              return <HeroSection key={seccion.id} data={seccion} negocio={config.negocio} />
            case "grid":
              return <ServicesSection key={seccion.id} data={seccion} />
            case "productos":
              return <CatalogSection key={seccion.id} data={seccion} />
            case "formulario":
              return <QuoteForm key={seccion.id} data={seccion} whatsapp={config.negocio.whatsapp} />
            case "galeria":
              return <GallerySection key={seccion.id} data={seccion} />
            case "carousel":
              return <TestimonialsSection key={seccion.id} data={seccion} />
            case "juego":
              return <GameSection key={seccion.id} data={seccion} whatsapp={config.negocio.whatsapp} />
            default:
              return null
          }
        })}
      </div>

      <Footer config={config} />

      {/* WhatsApp floating button */}
      {config.whatsappFlotante.activo && <WhatsAppButton config={config.whatsappFlotante} />}
    </div>
  )
}

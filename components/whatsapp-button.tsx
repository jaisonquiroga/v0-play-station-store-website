"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  config: {
    activo: boolean
    numero: string
    mensaje: string
    posicion: string
    color: string
  }
}

export default function WhatsAppButton({ config }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const numeroLimpio = config.numero.replace(/\D/g, "")
    const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(config.mensaje)}`
    window.open(url, "_blank")
  }

  if (!config.activo) return null

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className={`fixed ${positionClasses[config.posicion as keyof typeof positionClasses] || positionClasses["bottom-right"]} w-16 h-16 rounded-full shadow-2xl z-50 transition-all duration-300 ${
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } hover:scale-110 animate-pulse`}
      style={{
        backgroundColor: config.color,
      }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />

      {/* Ripple effect */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-75"
        style={{ backgroundColor: config.color }}
      ></span>
    </Button>
  )
}

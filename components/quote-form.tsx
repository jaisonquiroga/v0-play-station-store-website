"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Campo } from "@/lib/types"

interface QuoteFormProps {
  data: {
    id: string
    titulo: string
    subtitulo?: string
    campos: Campo[]
    botonEnvio: string
  }
  whatsapp: string
}

export default function QuoteForm({ data, whatsapp }: QuoteFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build WhatsApp message
    let mensaje = "¡Hola! Quiero cotizar una reparación:\n\n"

    data.campos.forEach((campo) => {
      const valor = formData[campo.name] || "No especificado"
      mensaje += `*${campo.label}:* ${valor}\n`
    })

    // Clean WhatsApp number (remove spaces, dashes, etc.)
    const numeroLimpio = whatsapp.replace(/\D/g, "")

    // Open WhatsApp with message
    const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`
    window.open(url, "_blank")
  }

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id={data.id} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-3xl">
        <Card className="bg-[#151b3f] border-[#2d3561] neon-border">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[var(--color-principal)] to-[var(--color-acento)] bg-clip-text text-transparent">
                {data.titulo}
              </span>
            </CardTitle>
            {data.subtitulo && <CardDescription className="text-gray-400 text-lg">{data.subtitulo}</CardDescription>}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {data.campos.map((campo, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={campo.name} className="text-white font-semibold">
                    {campo.label}
                  </Label>

                  {campo.tipo === "select" && (
                    <Select onValueChange={(value) => handleChange(campo.name, value)} required>
                      <SelectTrigger
                        id={campo.name}
                        className="bg-[#1e2749] border-[#2d3561] text-white focus:border-[var(--color-principal)]"
                      >
                        <SelectValue placeholder={`Selecciona ${campo.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e2749] border-[#2d3561]">
                        {campo.opciones?.map((opcion, i) => (
                          <SelectItem key={i} value={opcion} className="text-white hover:bg-[#2d3561]">
                            {opcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {campo.tipo === "textarea" && (
                    <Textarea
                      id={campo.name}
                      placeholder={campo.placeholder}
                      onChange={(e) => handleChange(campo.name, e.target.value)}
                      className="bg-[#1e2749] border-[#2d3561] text-white min-h-32 focus:border-[var(--color-principal)]"
                      required
                    />
                  )}

                  {campo.tipo === "text" && (
                    <Input
                      id={campo.name}
                      type="text"
                      placeholder={campo.placeholder}
                      onChange={(e) => handleChange(campo.name, e.target.value)}
                      className="bg-[#1e2749] border-[#2d3561] text-white focus:border-[var(--color-principal)]"
                      required
                    />
                  )}

                  {campo.tipo === "tel" && (
                    <Input
                      id={campo.name}
                      type="tel"
                      placeholder={campo.placeholder}
                      onChange={(e) => handleChange(campo.name, e.target.value)}
                      className="bg-[#1e2749] border-[#2d3561] text-white focus:border-[var(--color-principal)]"
                      required
                    />
                  )}
                </div>
              ))}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[var(--color-principal)] hover:bg-[var(--color-acento)] text-[#0A0E27] font-bold text-lg py-6 transition-all duration-300 transform hover:scale-105 glow-effect"
              >
                {data.botonEnvio}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-principal)] opacity-5 rounded-full blur-[150px] -z-10"></div>
      </div>
    </section>
  )
}

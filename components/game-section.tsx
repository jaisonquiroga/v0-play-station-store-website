"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PlatformGame from "@/components/platform-game"
import { Trophy, Play } from "lucide-react"

interface GameSectionProps {
  data: {
    id: string
    titulo: string
    subtitulo?: string
    config: {
      tipo: string
      dificultad: string
      instrucciones: string
      premio: string
      vidas: number
    }
  }
  whatsapp: string
}

export default function GameSection({ data, whatsapp }: GameSectionProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const handleGameWin = () => {
    setGameWon(true)

    // Send WhatsApp message with discount code
    const mensaje = `¡Felicidades! Has completado el juego y ganaste un ${data.config.premio}. Código: GAMER10`
    const numeroLimpio = whatsapp.replace(/\D/g, "")
    const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`

    setTimeout(() => {
      window.open(url, "_blank")
    }, 1000)
  }

  const handleGameOver = () => {
    setGameStarted(false)
  }

  return (
    <section id={data.id} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[var(--color-secundario)] via-[var(--color-acento)] to-[var(--color-principal)] bg-clip-text text-transparent">
              {data.titulo}
            </span>
          </h2>
          {data.subtitulo && <p className="text-gray-400 text-lg mb-6">{data.subtitulo}</p>}
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-secundario)] to-[var(--color-principal)] mx-auto"></div>
        </div>

        <Card className="bg-[#151b3f] border-[#2d3561] neon-border overflow-hidden">
          {!gameStarted && !gameWon && (
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-principal)] to-[var(--color-acento)] flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white mb-4">Instrucciones</CardTitle>
              <CardDescription className="text-gray-300 text-lg max-w-2xl mx-auto">
                {data.config.instrucciones}
              </CardDescription>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <kbd className="px-3 py-1 bg-[#1e2749] rounded border border-[var(--color-principal)]">←</kbd>
                  <span>Izquierda</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-3 py-1 bg-[#1e2749] rounded border border-[var(--color-principal)]">→</kbd>
                  <span>Derecha</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-3 py-1 bg-[#1e2749] rounded border border-[var(--color-principal)]">↑</kbd>
                  <span>Saltar</span>
                </div>
              </div>
            </CardHeader>
          )}

          <CardContent className="p-0">
            {!gameStarted && !gameWon && (
              <div className="p-8 text-center">
                <Button
                  size="lg"
                  onClick={() => setGameStarted(true)}
                  className="bg-[var(--color-principal)] hover:bg-[var(--color-acento)] text-[#0A0E27] font-bold text-xl px-12 py-6 glow-effect"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Iniciar Juego
                </Button>
              </div>
            )}

            {gameStarted && !gameWon && (
              <PlatformGame
                vidas={data.config.vidas}
                onWin={handleGameWin}
                onGameOver={handleGameOver}
                dificultad={data.config.dificultad}
              />
            )}

            {gameWon && (
              <div className="p-12 text-center">
                <div className="mb-6">
                  <Trophy className="w-24 h-24 mx-auto text-[var(--color-principal)] animate-bounce" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-4">¡Felicidades!</h3>
                <p className="text-xl text-gray-300 mb-6">
                  Has ganado un <span className="text-[var(--color-principal)] font-bold">{data.config.premio}</span>
                </p>
                <p className="text-gray-400 mb-8">Código: GAMER10</p>
                <Button
                  onClick={() => {
                    setGameWon(false)
                    setGameStarted(false)
                  }}
                  className="bg-[var(--color-secundario)] hover:bg-[var(--color-acento)] text-white"
                >
                  Jugar de Nuevo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

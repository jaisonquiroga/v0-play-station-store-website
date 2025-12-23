"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Heart } from "lucide-react"

interface PlatformGameProps {
  vidas: number
  onWin: () => void
  onGameOver: () => void
  dificultad: string
}

interface GameObject {
  x: number
  y: number
  width: number
  height: number
  velocityY?: number
  velocityX?: number
}

export default function PlatformGame({ vidas, onWin, onGameOver, dificultad }: PlatformGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [vidasRestantes, setVidasRestantes] = useState(vidas)
  const [score, setScore] = useState(0)
  const gameStateRef = useRef({
    player: { x: 50, y: 300, width: 40, height: 40, velocityY: 0, velocityX: 0, onGround: false },
    platforms: [] as GameObject[],
    enemies: [] as GameObject[],
    coins: [] as GameObject[],
    keys: { left: false, right: false, up: false },
    gameLoop: null as number | null,
    cameraX: 0,
    levelWidth: 3000,
  })

  const GRAVITY = 0.5
  const JUMP_STRENGTH = -12
  const MOVE_SPEED = 5
  const PLAYER_COLOR = "#00D9FF"
  const PLATFORM_COLOR = "#8338EC"
  const ENEMY_COLOR = "#FF006E"
  const COIN_COLOR = "#FFD700"

  // Initialize game
  const initGame = useCallback(() => {
    const state = gameStateRef.current
    const numEnemies = dificultad === "media" ? 5 : 8
    const numCoins = 10

    // Create platforms
    state.platforms = [
      { x: 0, y: 500, width: 200, height: 20 }, // Start platform
      { x: 250, y: 450, width: 150, height: 20 },
      { x: 450, y: 400, width: 150, height: 20 },
      { x: 650, y: 350, width: 150, height: 20 },
      { x: 850, y: 300, width: 200, height: 20 },
      { x: 1100, y: 350, width: 150, height: 20 },
      { x: 1300, y: 400, width: 150, height: 20 },
      { x: 1500, y: 450, width: 200, height: 20 },
      { x: 1750, y: 400, width: 150, height: 20 },
      { x: 1950, y: 350, width: 150, height: 20 },
      { x: 2150, y: 300, width: 150, height: 20 },
      { x: 2350, y: 350, width: 150, height: 20 },
      { x: 2550, y: 400, width: 200, height: 20 },
      { x: 2800, y: 450, width: 200, height: 20 }, // End platform
    ]

    // Create enemies
    state.enemies = Array.from({ length: numEnemies }, (_, i) => ({
      x: 300 + i * 400,
      y: 420,
      width: 30,
      height: 30,
      velocityX: 2,
    }))

    // Create coins
    state.coins = Array.from({ length: numCoins }, (_, i) => ({
      x: 200 + i * 250,
      y: 250 + Math.random() * 100,
      width: 20,
      height: 20,
    }))
  }, [dificultad])

  // Check collision
  const checkCollision = (obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    )
  }

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const state = gameStateRef.current
    const { player, platforms, enemies, coins, keys } = state

    // Clear canvas
    ctx.fillStyle = "#0A0E27"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update camera
    state.cameraX = Math.max(
      0,
      Math.min(player.x - canvas.width / 2 + player.width / 2, state.levelWidth - canvas.width),
    )

    // Player movement
    if (keys.left) player.velocityX = -MOVE_SPEED
    else if (keys.right) player.velocityX = MOVE_SPEED
    else player.velocityX = 0

    if (keys.up && player.onGround) {
      player.velocityY = JUMP_STRENGTH
      player.onGround = false
    }

    // Apply gravity
    player.velocityY += GRAVITY
    player.y += player.velocityY
    player.x += player.velocityX

    // Constrain player horizontally
    player.x = Math.max(0, Math.min(player.x, state.levelWidth - player.width))

    // Platform collision
    player.onGround = false
    platforms.forEach((platform) => {
      if (checkCollision(player, platform) && player.velocityY > 0) {
        player.y = platform.y - player.height
        player.velocityY = 0
        player.onGround = true
      }
    })

    // Check if player fell off
    if (player.y > canvas.height) {
      setVidasRestantes((prev) => {
        const newVidas = prev - 1
        if (newVidas <= 0) {
          onGameOver()
        } else {
          // Reset player position
          player.x = 50
          player.y = 300
          player.velocityY = 0
        }
        return newVidas
      })
    }

    // Update enemies
    enemies.forEach((enemy) => {
      enemy.x += enemy.velocityX || 0

      // Bounce enemies
      if (enemy.x <= state.cameraX || enemy.x >= state.cameraX + canvas.width - enemy.width) {
        enemy.velocityX = -(enemy.velocityX || 0)
      }

      // Check enemy collision
      if (checkCollision(player, enemy)) {
        setVidasRestantes((prev) => {
          const newVidas = prev - 1
          if (newVidas <= 0) {
            onGameOver()
          } else {
            // Reset player position
            player.x = Math.max(50, player.x - 100)
            player.y = 300
            player.velocityY = 0
          }
          return newVidas
        })
      }
    })

    // Collect coins
    coins.forEach((coin, index) => {
      if (checkCollision(player, coin)) {
        coins.splice(index, 1)
        setScore((prev) => prev + 10)
      }
    })

    // Check win condition
    if (player.x > state.levelWidth - 200) {
      onWin()
      return
    }

    // Draw platforms
    ctx.fillStyle = PLATFORM_COLOR
    platforms.forEach((platform) => {
      ctx.fillRect(platform.x - state.cameraX, platform.y, platform.width, platform.height)

      // Neon glow effect
      ctx.shadowBlur = 10
      ctx.shadowColor = PLATFORM_COLOR
      ctx.fillRect(platform.x - state.cameraX, platform.y, platform.width, platform.height)
      ctx.shadowBlur = 0
    })

    // Draw enemies
    ctx.fillStyle = ENEMY_COLOR
    enemies.forEach((enemy) => {
      ctx.beginPath()
      ctx.arc(enemy.x - state.cameraX + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2)
      ctx.fill()

      // Eyes
      ctx.fillStyle = "#FFF"
      ctx.beginPath()
      ctx.arc(enemy.x - state.cameraX + 10, enemy.y + 10, 4, 0, Math.PI * 2)
      ctx.arc(enemy.x - state.cameraX + 20, enemy.y + 10, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw coins
    ctx.fillStyle = COIN_COLOR
    coins.forEach((coin) => {
      ctx.beginPath()
      ctx.arc(coin.x - state.cameraX + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 15
      ctx.shadowColor = COIN_COLOR
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Draw player
    ctx.fillStyle = PLAYER_COLOR
    ctx.fillRect(player.x - state.cameraX, player.y, player.width, player.height)

    // Player glow
    ctx.shadowBlur = 20
    ctx.shadowColor = PLAYER_COLOR
    ctx.fillRect(player.x - state.cameraX, player.y, player.width, player.height)
    ctx.shadowBlur = 0

    // Draw goal
    const goalX = state.levelWidth - 100
    ctx.fillStyle = "#FFD700"
    ctx.fillRect(goalX - state.cameraX, 400, 50, 100)
    ctx.fillText("META", goalX - state.cameraX + 10, 390)

    // Continue loop
    state.gameLoop = requestAnimationFrame(gameLoop)
  }, [onWin, onGameOver])

  useEffect(() => {
    initGame()

    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current
      if (e.key === "ArrowLeft") state.keys.left = true
      if (e.key === "ArrowRight") state.keys.right = true
      if (e.key === "ArrowUp") state.keys.up = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const state = gameStateRef.current
      if (e.key === "ArrowLeft") state.keys.left = false
      if (e.key === "ArrowRight") state.keys.right = false
      if (e.key === "ArrowUp") state.keys.up = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    gameStateRef.current.gameLoop = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      if (gameStateRef.current.gameLoop) {
        cancelAnimationFrame(gameStateRef.current.gameLoop)
      }
    }
  }, [initGame, gameLoop])

  return (
    <div className="relative">
      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center px-4">
        <div className="flex gap-2">
          {Array.from({ length: vidasRestantes }).map((_, i) => (
            <Heart key={i} className="w-8 h-8 fill-[var(--color-secundario)] text-[var(--color-secundario)]" />
          ))}
        </div>
        <div className="bg-black/70 px-4 py-2 rounded-lg">
          <span className="text-[var(--color-principal)] font-bold text-xl">Score: {score}</span>
        </div>
      </div>

      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full border-2 border-[var(--color-principal)] rounded-lg"
      />
    </div>
  )
}

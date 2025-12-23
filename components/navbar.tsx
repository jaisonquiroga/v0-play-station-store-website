"use client"

import { useState, useEffect } from "react"
import { Menu, X, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Config } from "@/lib/types"

interface NavbarProps {
  config: Config
}

export default function Navbar({ config }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { label: "Inicio", href: "#hero" },
    { label: "Servicios", href: "#servicios" },
    { label: "Catálogo", href: "#catalogo" },
    { label: "Cotizador", href: "#cotizador" },
    { label: "Galería", href: "#galeria" },
    { label: "Juego", href: "#minijuego" },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0E27]/95 backdrop-blur-md shadow-lg shadow-[var(--color-principal,#00D9FF)]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#hero")
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Gamepad2 className="w-10 h-10 text-[var(--color-principal,#00D9FF)] group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-[var(--color-principal,#00D9FF)] blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg sm:text-xl font-bold text-white truncate max-w-[140px] sm:max-w-none">
                {config.negocio.nombre}
              </div>
              <div className="text-xs text-[var(--color-principal,#00D9FF)] hidden sm:block">
                {config.negocio.eslogan}
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-principal,#00D9FF)] to-[var(--color-secundario,#FF006E)] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <Button
              onClick={() => handleNavClick("#cotizador")}
              className="ml-4 bg-gradient-to-r from-[var(--color-principal,#00D9FF)] to-[var(--color-secundario,#FF006E)] hover:shadow-lg hover:shadow-[var(--color-principal,#00D9FF)]/50 transition-all"
            >
              Cotizar Ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-in slide-in-from-top">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={() => handleNavClick("#cotizador")}
                className="mt-2 w-full bg-gradient-to-r from-[var(--color-principal,#00D9FF)] to-[var(--color-secundario,#FF006E)]"
              >
                Cotizar Ahora
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

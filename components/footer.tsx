"use client"

import { Gamepad2, MapPin, Phone, Facebook, Instagram, Music } from "lucide-react"
import type { Config } from "@/lib/types"

interface FooterProps {
  config: Config
}

export default function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#050817] border-t border-white/5 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-principal,#00D9FF)] opacity-5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-secundario,#FF006E)] opacity-5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Gamepad2 className="w-10 h-10 text-[var(--color-principal,#00D9FF)]" />
                <div className="absolute inset-0 bg-[var(--color-principal,#00D9FF)] blur-xl opacity-50"></div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{config.negocio.nombre}</div>
                <div className="text-xs text-[var(--color-principal,#00D9FF)]">{config.negocio.eslogan}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Expertos en reparación y venta de consolas PlayStation, Xbox y Nintendo. Tu centro gamer de confianza en
              Armenia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[var(--color-principal,#00D9FF)] to-[var(--color-secundario,#FF006E)] rounded-full"></span>
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Inicio", href: "#hero" },
                { label: "Servicios", href: "#servicios" },
                { label: "Catálogo", href: "#catalogo" },
                { label: "Cotizador", href: "#cotizador" },
                { label: "Galería", href: "#galeria" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="text-white/60 hover:text-[var(--color-principal,#00D9FF)] transition-colors text-sm inline-block hover:translate-x-1 duration-200"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[var(--color-principal,#00D9FF)] to-[var(--color-secundario,#FF006E)] rounded-full"></span>
              Servicios
            </h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>• Reparación de Consolas</li>
              <li>• Venta de Juegos</li>
              <li>• Accesorios Gaming</li>
              <li>• Mantenimiento Preventivo</li>
              <li>• Garantía en todos los servicios</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[var(--color-principal,#00D9FF)] to-[var(--color-secundario,#FF006E)] rounded-full"></span>
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-[var(--color-principal,#00D9FF)] flex-shrink-0 mt-0.5" />
                <span>{config.negocio.ubicacion}</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-[var(--color-principal,#00D9FF)] flex-shrink-0" />
                <a
                  href={`tel:${config.negocio.whatsapp}`}
                  className="hover:text-[var(--color-principal,#00D9FF)] transition-colors"
                >
                  {config.negocio.whatsapp}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <p className="text-white/80 text-sm mb-3">Síguenos:</p>
              <div className="flex gap-3">
                <a
                  href={config.negocio.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[var(--color-principal,#00D9FF)]/20 flex items-center justify-center transition-all hover:scale-110 group"
                >
                  <Facebook className="w-5 h-5 text-white/60 group-hover:text-[var(--color-principal,#00D9FF)]" />
                </a>
                <a
                  href={config.negocio.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[var(--color-secundario,#FF006E)]/20 flex items-center justify-center transition-all hover:scale-110 group"
                >
                  <Instagram className="w-5 h-5 text-white/60 group-hover:text-[var(--color-secundario,#FF006E)]" />
                </a>
                <a
                  href={config.negocio.redes.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[var(--color-acento,#8338EC)]/20 flex items-center justify-center transition-all hover:scale-110 group"
                >
                  <Music className="w-5 h-5 text-white/60 group-hover:text-[var(--color-acento,#8338EC)]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
            <p>
              © {currentYear} {config.negocio.nombre}. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-2">
              Hecho con <span className="text-[var(--color-secundario,#FF006E)] animate-pulse">♥</span> para gamers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

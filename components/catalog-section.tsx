"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Producto } from "@/lib/types"

interface CatalogSectionProps {
  data: {
    id: string
    titulo: string
    productos: Producto[]
  }
}

export default function CatalogSection({ data }: CatalogSectionProps) {
  const [filter, setFilter] = useState<string>("todos")

  const categorias = ["todos", ...new Set(data.productos.map((p) => p.categoria).filter(Boolean))]

  const productosFiltrados = filter === "todos" ? data.productos : data.productos.filter((p) => p.categoria === filter)

  return (
    <section id={data.id} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[var(--color-secundario)] to-[var(--color-acento)] bg-clip-text text-transparent">
              {data.titulo}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-secundario)] to-[var(--color-acento)] mx-auto"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((categoria) => (
            <Button
              key={categoria}
              variant={filter === categoria ? "default" : "outline"}
              onClick={() => setFilter(categoria)}
              className={`${
                filter === categoria
                  ? "bg-[var(--color-secundario)] text-white hover:bg-[var(--color-acento)]"
                  : "border-[var(--color-secundario)] text-[var(--color-secundario)] hover:bg-[var(--color-secundario)] hover:text-white"
              } transition-all duration-300 capitalize`}
            >
              {categoria}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((producto, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-[#151b3f] border-[#2d3561] hover:border-[var(--color-secundario)] transition-all duration-300"
            >
              <CardHeader className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={producto.imagen || "/placeholder.svg"}
                    alt={producto.nombre}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {!producto.disponible && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        Agotado
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--color-secundario)] transition-colors">
                  {producto.nombre}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[var(--color-secundario)]">{producto.precio}</span>
                  {producto.categoria && (
                    <Badge variant="secondary" className="bg-[#1e2749] text-gray-300 capitalize">
                      {producto.categoria}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-[var(--color-secundario)] hover:bg-[var(--color-acento)] text-white"
                  disabled={!producto.disponible}
                >
                  {producto.disponible ? "Consultar" : "No disponible"}
                </Button>
              </CardFooter>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-secundario)] to-[var(--color-acento)] rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

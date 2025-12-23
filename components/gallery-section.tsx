"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import type { GaleriaImagen } from "@/lib/types"

interface GallerySectionProps {
  data: {
    id: string
    titulo: string
    subtitulo?: string
    imagenes: GaleriaImagen[]
  }
}

export default function GallerySection({ data }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GaleriaImagen | null>(null)

  return (
    <section id={data.id} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[var(--color-acento)] to-[var(--color-secundario)] bg-clip-text text-transparent">
              {data.titulo}
            </span>
          </h2>
          {data.subtitulo && <p className="text-gray-400 text-lg mb-6">{data.subtitulo}</p>}
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-acento)] to-[var(--color-secundario)] mx-auto"></div>
        </div>

        {/* Gallery Grid - Masonry style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.imagenes.map((imagen, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
              onClick={() => setSelectedImage(imagen)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={imagen.url || "/placeholder.svg"}
                  alt={imagen.descripcion}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm font-semibold">{imagen.descripcion}</p>
                </div>

                {/* Border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-acento)] rounded-lg transition-all duration-300"></div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-[var(--color-acento)] rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-[#0A0E27] border-[var(--color-acento)] p-0">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.descripcion}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="bg-[#151b3f] p-6">
                <p className="text-white text-lg font-semibold">{selectedImage.descripcion}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "La Estación del PlayStation | Tienda y Reparación de Consolas en Armenia",
  description:
    "Venta, reparación y mantenimiento de PlayStation, Xbox y Nintendo en Armenia, Quindío. Expertos en todas las generaciones de consolas.",
  keywords:
    "reparación consolas Armenia, PlayStation Armenia Quindío, Xbox reparación, Nintendo Switch, venta videojuegos",
  openGraph: {
    title: "La Estación del PlayStation - Tu Centro Gamer en Armenia",
    description: "Expertos en reparación y venta de consolas en Armenia, Quindío",
    locale: "es_CO",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#00D9FF",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${orbitron.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

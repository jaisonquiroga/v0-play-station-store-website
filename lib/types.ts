export interface Config {
  negocio: {
    nombre: string
    eslogan: string
    ubicacion: string
    whatsapp: string
    redes: {
      facebook: string
      instagram: string
      tiktok: string
    }
  }
  estilos: {
    colorPrincipal: string
    colorSecundario: string
    colorAcento: string
    tipografia: string
  }
  secciones: Seccion[]
  whatsappFlotante: {
    activo: boolean
    numero: string
    mensaje: string
    posicion: string
    color: string
  }
}

export interface Seccion {
  id: string
  tipo: string
  titulo: string
  subtitulo?: string
  descripcion?: string
  imagen?: string
  boton?: {
    texto: string
    link: string
  }
  items?: any[]
  productos?: Producto[]
  campos?: Campo[]
  botonEnvio?: string
  imagenes?: GaleriaImagen[]
  config?: any
}

export interface Producto {
  nombre: string
  precio: string
  imagen: string
  disponible: boolean
  categoria?: string
}

export interface Campo {
  tipo: string
  label: string
  name: string
  opciones?: string[]
  placeholder?: string
}

export interface GaleriaImagen {
  url: string
  descripcion: string
}

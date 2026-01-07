# La Estación del PlayStation - Tienda Gaming

Una página web moderna e interactiva para tienda de videojuegos completamente administrable desde un archivo JSON.

## Características

### Sistema JSON Configurable
- **Toda la página es administrable desde `public/config.json`**
- Control total sobre textos, imágenes, enlaces, secciones y estilos
- Fácil de actualizar sin tocar código

### Secciones Implementadas

1. **Hero Section** - Banner principal con animaciones y efectos parallax
2. **Servicios** - Grid de 4 servicios con hover effects y animaciones
3. **Catálogo de Productos** - Sistema de filtrado por categorías
4. **Cotizador** - Formulario que envía datos por WhatsApp
5. **Galería** - Lightbox para ver trabajos realizados
6. **Testimonios** - Carousel automático con navegación
7. **Mini-Juego** - Plataformero con premio de descuento
8. **WhatsApp Flotante** - Botón configurable con animación

### Diseño

- **Tema Gaming** con neones cyan, magenta y púrpura
- **Tipografía Orbitron** para look futurista
- **Animaciones suaves** en scroll y hover
- **Responsive design** para móvil, tablet y desktop
- **Efectos visuales** con glow, gradientes y parallax

### Mini-Juego Plataformero

- Control con flechas del teclado
- 3 vidas, enemigos móviles, monedas coleccionables
- Scroll lateral automático siguiendo al jugador
- Premio: código de descuento 10% enviado por WhatsApp

## Cómo Personalizar

### Editar Configuración

Todo se controla desde `public/config.json`:

```json
{
  "negocio": {
    "nombre": "Tu Tienda",
    "whatsapp": "+57 XXX XXX XXXX"
  },
  "estilos": {
    "colorPrincipal": "#00D9FF",
    "colorSecundario": "#FF006E",
    "colorAcento": "#8338EC"
  },
  "secciones": [...]
}
```

### Cambiar Colores

Los colores se aplican automáticamente desde el JSON a variables CSS:
- `colorPrincipal` → Color principal (cyan)
- `colorSecundario` → Color secundario (magenta)
- `colorAcento` → Color de acento (púrpura)

### Agregar/Quitar Secciones

Simplemente edita el array `secciones` en config.json. El orden determina cómo aparecen en la página.

### Actualizar Productos

```json
{
  "productos": [
    {
      "nombre": "Nuevo Producto",
      "precio": "$XXX.XXX",
      "imagen": "/ruta/imagen.jpg",
      "disponible": true,
      "categoria": "juegos"
    }
  ]
}
```

### Modificar Formulario de Cotización

Los campos son completamente configurables:

```json
{
  "campos": [
    {
      "tipo": "select",
      "label": "Mi Campo",
      "name": "campo",
      "opciones": ["Opción 1", "Opción 2"]
    }
  ]
}
```

Tipos soportados: `select`, `textarea`, `text`, `tel`

## WhatsApp Integration

### Cotizador
Envía automáticamente un mensaje formateado con todos los datos del formulario.

### Mini-Juego
Al ganar, envía el código de descuento directamente por WhatsApp.

### Botón Flotante
Configurable en posición, color y mensaje:

```json
{
  "whatsappFlotante": {
    "activo": true,
    "numero": "+573001234567",
    "mensaje": "Hola! Quiero información sobre",
    "posicion": "bottom-right",
    "color": "#25D366"
  }
}
```

## Tecnologías

- **Next.js 16** con App Router
- **React 19.2** con hooks modernos
- **TailwindCSS v4** para estilos
- **TypeScript** para type-safety
- **Canvas API** para el mini-juego
- **Shadcn/ui** componentes base

## SEO Optimizado

- Meta tags para búsqueda local (Armenia, Quindío)
- Títulos descriptivos y estructura semántica
- Open Graph para redes sociales
- Viewport optimizado para móviles

## Estructura del Proyecto

```
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout con fuentes
│   └── globals.css       # Estilos globales gaming
├── components/
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   ├── catalog-section.tsx
│   ├── quote-form.tsx
│   ├── gallery-section.tsx
│   ├── testimonials-section.tsx
│   ├── game-section.tsx
│   ├── platform-game.tsx
│   ├── whatsapp-button.tsx
│   └── ui/               # Componentes base
├── lib/
│   └── types.ts          # TypeScript interfaces
└── public/
    └── config.json       # ⭐ ARCHIVO DE CONFIGURACIÓN
```

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## Personalización Avanzada

### Modificar Dificultad del Juego

En `config.json`:
```json
{
  "config": {
    "dificultad": "media",  // o "alta"
    "vidas": 3
  }
}
```

### Cambiar Tipografía

Editar `app/layout.tsx` para importar otra fuente de Google Fonts y actualizar `app/globals.css`.

### Agregar Nuevas Secciones

1. Crear componente en `components/`
2. Agregar caso en el switch de `app/page.tsx`
3. Definir en `config.json` con tipo único
4. Actualizar interfaces en `lib/types.ts`

## Notas Importantes

- Las imágenes usan placeholders. Reemplazar con imágenes reales en `public/`
- El número de WhatsApp debe incluir código de país sin espacios
- El mini-juego funciona mejor en desktop con teclado
- Todos los textos son editables desde el JSON

## Soporte

Para personalización o soporte técnico, contactar al desarrollador.

---

**¡Página lista para usar y fácil de mantener!**

# Ohmio Calc

Ohmio Calc es una web de cálculos eléctricos diseñada como Progressive Web App (PWA) con Astro, React, TypeScript y Tailwind. Su objetivo es proporcionar herramientas de cálculo eléctricas accesibles y fiables siguiendo la arquitectura islands de Astro. La aplicación se despliega automáticamente en GitHub Pages mediante GitHub Actions.

## Características

- Página de inicio con tarjetas de subgrupos (Fundamentos, Conductores, Protecciones, Instalaciones, Energía, Renovables, Transformadores/Motores, Miscelánea).
- Acordeones para cada calculadora dentro de su subgrupo.
- Breadcrumb y botón “Volver al inicio” en todas las calculadoras.
- Arquitectura Astro + React islands + TypeScript + Tailwind.
- Accesible (WCAG 2.2 AA) y adaptable con dark mode e i18n (es/en).
- CI/CD con pnpm, Vitest, ESLint, build y deploy a GitHub Pages.

## Estructura del proyecto

```
/
├─ public/
│  └─ brand/            # Logotipos e iconos
├─ src/
│  ├─ pages/
│  │  ├─ index.astro    # Página de inicio
│  │  └─ calc/
│  │     └─ [grupo]/    # Subgrupos de calculadoras
│  │        └─ [herramienta].astro
│  ├─ components/       # Componentes UI (Accordion, Card, Breadcrumb, etc.)
│  ├─ features/
│  │  ├─ engine/        # Funciones puras TS para cálculos
│  │  ├─ workers/       # Web Workers para cálculos pesados
│  │  └─ groups/        # Metadatos de grupos y calculadoras
│  ├─ styles/           # Variables y configuración Tailwind
│  ├─ data/             # Tablas y datos (AWG↔mm², intensidades, etc.)
│  ├─ i18n/             # Textos traducidos es/en
│  └─ utils/            # Utilidades varias
├─ tests/               # Tests unitarios con Vitest
└─ .github/
   ├─ workflows/
   │  ├─ ci.yml         # Lint, test y build
   │  └─ deploy.yml     # Build y despliegue a GitHub Pages
   └─ PROGRESS.md       # Progreso del proyecto
```

## Instalación

> Este repositorio utiliza pnpm. Si no lo tienes instalado, primero ejecuta `npm install -g pnpm`.

Clona el repositorio y ejecuta:

```bash
pnpm install
pnpm run dev
```

Abre el navegador en `http://localhost:4321` para ver la aplicación en desarrollo.

## Uso

Navega a la página principal y selecciona un subgrupo para acceder a las calculadoras. Cada calculadora ofrece campos de entrada con validación en tiempo real, resultados claros y opciones para reiniciar o compartir los cálculos.

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Crea un Issue o discute tu idea en una issue existente.
2. Crea una rama a partir de `dev`: `git checkout -b feat/nombre-tarea`.
3. Asegúrate de que `pnpm run test` y `pnpm run build` se ejecuten correctamente.
4. Envía un Pull Request descriptivo.

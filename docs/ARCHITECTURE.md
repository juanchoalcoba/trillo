# Universo Trillo — Arquitectura Técnica

## 1. Visión Técnica
La web de Universo Trillo está concebida como una aplicación web de alto impacto visual y sensorial con rendimiento de nivel 2026/2027. La arquitectura se basa en una separación limpia de responsabilidades:

1. **Capa 3D / WebGL (`src/components/3d/`)**: Renderizado en canvas con Three.js aislado del DOM para no penalizar el render de React. Uso de RequestAnimationFrame optimizado y baja huella de memoria.
2. **Capa de Componentes de Experiencia (`src/components/`)**:
   - `common/SmoothScroll.jsx`: Configuración global de Lenis (Studio Freight / Darkroom Engineering) para scroll inercial suave sin colisión con el navegador.
   - `hero/`: HeroSection con animaciones Framer Motion, tipografía monumental y proporciones ajustadas al primer pantallazo.
   - `about/`: AboutSection / Manifiesto interactivo con reveal cinemático y tarjetas de los tres pilares.
   - `common/`: Navbar flotante, cursor magnético opcional, footer y badges.
3. **Capa de Estilos**:
   - Tailwind CSS v4 mediante `@theme` integrado nativamente con Vite (`@tailwindcss/vite`).
   - Microestilos en CSS puro para transiciones complejas o máscaras de recorte cuando sea requerido.

## 2. Árbol de Componentes (Fase 1)
```
<App>
  ├── <TrilloCanvas />        (Fondo 3D WebGL persistente e interactivo)
  ├── <Navbar />              (Header minimalista flotante con glassmorphism)
  ├── <main>
  │     ├── <HeroSection />   (Título Trillo, Animate a vivir, brújula/scroll)
  │     └── <AboutSection />  (Manifiesto, ¿Qué es Trillo?, Tríada de Pilares)
  └── <FooterMini />          (Cierre conceptual: "¿Te animás?")
</App>
```

## 3. Principios de Rendimiento
- **Lazy loading y optimización GPU**: Los efectos visuales 3D se pausan o reducen cuando no están en el viewport para ahorrar batería en laptops y móviles.
- **Microinteracciones sin jank**: Animaciones basadas estrictamente en `transform` y `opacity`.
- **Accesibilidad**: Respeto al modo `prefers-reduced-motion` del sistema operativo.

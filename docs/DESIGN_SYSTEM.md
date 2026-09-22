# Universo Trillo — Sistema de Diseño & Dirección de Arte

> *"Trillo es animarse a vivir."*

## 1. Filosofía Estética
El diseño de Universo Trillo no busca ser una plataforma de deportes corporativa ni un catálogo aséptico de maratones. Representa el interior de Uruguay, la autenticidad del campo, los ríos, las sierras y el monte, cruzados con una sensibilidad de diseño editorial vanguardista (nivel 2026/2027).

**Pilares visuales:**
* **Criolla & Auténtica**: No imita fórmulas de Silicon Valley ni el running comercial de neón. Utiliza texturas terrosas, aire, espacio abierto y tipografía sobria con aplomo.
* **Minimalista & Inmersiva**: El contenido respira. Mucho espacio negativo, contraste cinemático y foco absoluto en la emoción y la fotografía real.
* **Outdoor Contemporánea**: Fusión entre aventura agreste y diseño refinado de vanguardia.

---

## 2. Paleta Cromática (Tokens de Color)

| Token | Hex | Nombre Conceptual | Uso |
|---|---|---|---|
| `--color-bg-deep` | `#08090A` | Noche Campo | Fondo primario oscuro inmersivo |
| `--color-bg-card` | `#111315` | Sombra Monte | Fondos de tarjetas, superficies elevadas |
| `--color-surface` | `#1A1D20` | Piedra Sierra | Bordes sutiles, divisores, inputs |
| `--color-accent-amber` | `#E87A38` | Atardecer Yí | Acento cálido principal, botones, focos |
| `--color-accent-clay` | `#C65D28` | Arcilla Trillo | Acento secundario terroso profundo |
| `--color-moss` | `#2D4030` | Monte Nativo | Matices orgánicos para aventuras/naturaleza |
| `--color-text-main` | `#F4F3EF` | Blanco Hueso | Tipografía principal de máximo contraste |
| `--color-text-muted` | `#9B9E9F` | Niebla Río | Subtítulos, metadatos, coordenadas |
| `--color-text-dim` | `#585C60` | Carbón Suave | Microcopys, etiquetas secundarias |

---

## 3. Tipografía

* **Display / Hero**: Tipografía sans monumental con carácter estructurado y peso fuerte (`Outfit` / `Syne` / `Plus Jakarta Sans`).
* **Editorial / Acento**: Toques en itálica o serif sutil para frases reflexivas y el manifiesto (`Newsreader` / `Cormorant` / `Playfair Display`).
* **Cuerpo & UI**: Sans ultra legible, espaciamiento limpio y neutral (`Plus Jakarta Sans` / `Inter`).

---

## 4. Atmósfera WebGL & Movimiento

* **Three.js**:
  * Capa de fondo sutil con partículas orgánicas suspendidas que simulan el polvo en suspensión bajo la luz del atardecer o la brisa del campo.
  * Curvas de relieve topográfico en gradiente oscuro interactivo con el puntero.
* **Framer Motion**:
  * Revelación de títulos por máscaras de texto (stagger text reveal).
  * Parallax suave en capas con scroll inercial.
  * Tarjetas de interacción con inclinación 3D (tilt) e iluminación interactiva.

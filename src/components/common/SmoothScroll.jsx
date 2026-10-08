import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Configuración optimizada: respuesta ágil y sedosa sin fricción artificial pesada
    const lenis = new Lenis({
      lerp: 0.1, // Respuesta inmediata y ligera: elimina el retraso perceptible de movimiento
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: false, // Respeta la tasa de refresco nativa (120Hz) en smartphones y tablets
      infinite: false,
    });

    // Exponer globalmente para permitir scrollTo programático desde cualquier botón
    window.lenis = lenis;

    // RAF Loop sincronizado
    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Interceptar clicks en enlaces de anclaje (#hero, #about, #universo, etc.)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, {
            offset: -40,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return children;
}

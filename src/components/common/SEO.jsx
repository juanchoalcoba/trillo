import { useEffect } from 'react';

/**
 * Componente SEO para actualizar dinámicamente metadatos en Single Page Application (SPA).
 * Permite que Googlebot y redes sociales capturen el título y descripción únicos de cada ruta.
 */
export default function SEO({
  title,
  description,
  canonical,
  image = 'https://trilloeventos.com/logocorredores.png',
  keywords,
}) {
  useEffect(() => {
    // 1. Título de la pestaña y navegador
    const baseTitle = 'TRILLO — Eventos Deportivos, Carreras y Aventuras en Uruguay';
    document.title = title ? `${title} | TRILLO` : baseTitle;

    // Helper para actualizar o crear tags <meta>
    const updateMeta = (selector, attribute, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector
          .replace('meta[', '')
          .replace(']', '')
          .split('=')
          .map((s) => s.replace(/['"]/g, ''));
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    // 2. Metadatos estándar
    if (description) {
      updateMeta('meta[name="description"]', 'content', description);
    }
    if (keywords) {
      updateMeta('meta[name="keywords"]', 'content', keywords);
    }

    // 3. Open Graph (Redes y mensajería)
    if (title) {
      updateMeta('meta[property="og:title"]', 'content', `${title} | TRILLO`);
      updateMeta('meta[name="twitter:title"]', 'content', `${title} | TRILLO`);
    }
    if (description) {
      updateMeta('meta[property="og:description"]', 'content', description);
      updateMeta('meta[name="twitter:description"]', 'content', description);
    }
    if (canonical) {
      updateMeta('meta[property="og:url"]', 'content', canonical);
      updateMeta('meta[name="twitter:url"]', 'content', canonical);

      // 4. Canonical Link
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonical);
    }
    if (image) {
      updateMeta('meta[property="og:image"]', 'content', image);
      updateMeta('meta[name="twitter:image"]', 'content', image);
    }
  }, [title, description, canonical, image, keywords]);

  return null;
}

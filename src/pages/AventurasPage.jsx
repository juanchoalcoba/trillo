import React, { useEffect } from 'react';
import AventurasNavbar from '../components/aventuras/AventurasNavbar';
import AventurasHero from '../components/aventuras/AventurasHero';
import AventurasCategories from '../components/aventuras/AventurasCategories';
import AventurasPhilosophy from '../components/aventuras/AventurasPhilosophy';
import AventurasGallery from '../components/aventuras/AventurasGallery';
import AventurasCTA from '../components/aventuras/AventurasCTA';

export default function AventurasPage() {
  // Ajuste del título del documento para SEO y claridad
  useEffect(() => {
    document.title = 'Trillo Aventuras | Salimos a vivir el territorio';
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-[#4ade80] selection:text-black overflow-x-hidden">
      {/* Navegación de Trillo Aventuras */}
      <AventurasNavbar />

      {/* Contenido Principal */}
      <main className="relative z-10">
        {/* Hero Principal con Parallax en aventuras.JPG y Overlay Oscuro */}
        <AventurasHero />

        {/* Las 3 Categorías: Durazno, Nacionales e Internacionales */}
        <AventurasCategories />

        {/* Galería Fotográfica Real de Aventuras y Expediciones */}
        <AventurasGallery />

        {/* Filosofía, Seguridad, Protocolos WFR y Mínimo Impacto */}
        <AventurasPhilosophy />

        {/* Expediciones a Medida, FAQ y Conexión con Eventos y Club */}
        <AventurasCTA />
      </main>
    </div>
  );
}

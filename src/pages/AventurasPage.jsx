import React from 'react';
import AventurasNavbar from '../components/aventuras/AventurasNavbar';
import AventurasHero from '../components/aventuras/AventurasHero';
import AventurasCategories from '../components/aventuras/AventurasCategories';
import AventurasGallery from '../components/aventuras/AventurasGallery';
import ArmaTuAventura from '../components/aventuras/ArmaTuAventura';
import AventurasCTA from '../components/aventuras/AventurasCTA';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

export default function AventurasPage() {
  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-[#4ade80] selection:text-black overflow-x-hidden">
      <SEO
        title="Aventuras y Expediciones en la Naturaleza"
        description="Explorá el territorio con Trillo Aventuras: travesías de naturaleza, senderismo, ecoturismo y expediciones guiadas en Durazno, todo Uruguay y destinos internacionales."
        canonical="https://trilloeventos.com/aventuras"
        keywords="trillo aventuras, ecoturismo uruguay, senderismo durazno, expediciones naturaleza uruguay, trekking uruguay, turismo aventura"
      />
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

        {/* Servicio Interactivo: Armá tu Aventura a Medida */}
        <ArmaTuAventura />

        {/* Expediciones a Medida, FAQ y Conexión con Eventos y Club */}
        <AventurasCTA />
      </main>

      {/* Footer Global Unificado */}
      <Footer />
    </div>
  );
}

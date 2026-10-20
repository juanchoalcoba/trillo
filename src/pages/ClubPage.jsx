import React from 'react';
import ClubNavbar from '../components/club/ClubNavbar';
import ClubHero from '../components/club/ClubHero';
import ClubDisciplines from '../components/club/ClubDisciplines';
import ClubPricing from '../components/club/ClubPricing';
import ClubCommunity from '../components/club/ClubCommunity';
import ClubJoinSection from '../components/club/ClubJoinSection';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

export default function ClubPage() {
  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-amber-400 selection:text-black overflow-x-hidden">
      <SEO
        title="Club de Corredores y Entrenamiento"
        description="Unite al Club de Corredores Trillo en Durazno, Uruguay. Grupos de running, trail running, entrenamiento funcional y preparación física para carreras al aire libre."
        canonical="https://trilloeventos.com/club"
        keywords="club de corredores durazno, grupo de running durazno, entrenamiento trail uruguay, running uruguay, trillo club"
      />
      {/* Navegación de El Club */}
      <ClubNavbar />

      {/* Contenido Principal de El Club (100% alineado con Aventuras y Trillo, sin WebGL 3D) */}
      <main className="relative z-10">
        {/* Hero con Parallax en bgClub.jpg, overlay oscuro y logo redondeado logocorredores.png */}
        <ClubHero />

        {/* 4 Formas de Movernos: Running, Trail, Funcional, Trekking */}
        <ClubDisciplines />

        {/* Cuota Mensual de Afiliación & Beneficios Exclusivos */}
        <ClubPricing />

        {/* El Río Yí como Pista Natural & Valores del Club */}
        <ClubCommunity />

        {/* Clase de Prueba, Contacto por WhatsApp (+598 98 121 608) y Footer */}
        <ClubJoinSection />
      </main>

      {/* Footer Global Unificado */}
      <Footer />
    </div>
  );
}

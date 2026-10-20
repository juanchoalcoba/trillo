import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import SobreNosotrosSection from '../components/about/SobreNosotrosSection';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-[#e87a38] selection:text-black">
      <SEO
        title="Inicio — Animate a vivir"
        description="Trillo es una productora de experiencias deportivas y estilo de vida al aire libre en Uruguay. Carreras de trail running, eventos en la naturaleza y comunidad activa."
        canonical="https://trilloeventos.com/"
        keywords="Trillo, Universo Trillo, Trillo eventos, trail running uruguay, carreras uruguay, deportes durazno, rebollo, laberinto"
      />
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SobreNosotrosSection />
      </main>

      {/* Footer Global Unificado */}
      <Footer />
    </div>
  );
}

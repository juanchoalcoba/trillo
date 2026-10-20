import React from 'react';
import TiendaNavbar from '../components/tienda/TiendaNavbar';
import TiendaHero from '../components/tienda/TiendaHero';
import TiendaCatalog from '../components/tienda/TiendaCatalog';
import TiendaBanner from '../components/tienda/TiendaBanner';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

export default function TiendaPage() {
  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-violet-500 selection:text-white overflow-x-hidden">
      <SEO
        title="Tienda Oficial — Indumentaria y Equipamiento"
        description="Conocé la tienda oficial de Trillo: remeras técnicas de trail running, indumentaria deportiva de alta calidad y merchandising exclusivo en Uruguay."
        canonical="https://trilloeventos.com/tienda"
        keywords="tienda trillo, remeras trail running uruguay, ropa deportiva uruguay, indumentaria running uruguay"
      />
      {/* Navegación Tienda */}
      <TiendaNavbar />

      {/* Contenido Principal */}
      <main className="relative z-10">
        <TiendaHero />
        <TiendaCatalog />
        <TiendaBanner />
      </main>

      {/* Footer Global Unificado */}
      <Footer />
    </div>
  );
}

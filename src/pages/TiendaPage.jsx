import React, { useEffect } from 'react';
import TiendaNavbar from '../components/tienda/TiendaNavbar';
import TiendaHero from '../components/tienda/TiendaHero';
import TiendaCatalog from '../components/tienda/TiendaCatalog';
import TiendaBanner from '../components/tienda/TiendaBanner';

export default function TiendaPage() {
  useEffect(() => {
    document.title = 'Tienda Trillo | Indumentaria Oficial';
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-violet-500 selection:text-white overflow-x-hidden">
      {/* Navegación Tienda */}
      <TiendaNavbar />

      {/* Contenido Principal */}
      <main className="relative z-10">
        <TiendaHero />
        <TiendaCatalog />
        <TiendaBanner />
      </main>
    </div>
  );
}

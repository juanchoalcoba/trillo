import React, { useEffect } from 'react';
import EventosNavbar from '../components/eventos/EventosNavbar';
import EventosHero from '../components/eventos/EventosHero';
import EventosCards from '../components/eventos/EventosCards';
import EventosGallery from '../components/eventos/EventosGallery';
import EventosKits from '../components/eventos/EventosKits';
import EventosCTA from '../components/eventos/EventosCTA';

export default function EventosPage() {
  useEffect(() => {
    document.title = 'Trillo Eventos | Desafío Rebollo, Laberinto y San Pedro';
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-[#e87a38] selection:text-black overflow-x-hidden">
      {/* Navegación Oficial de Eventos */}
      <EventosNavbar />

      {/* Contenido Principal */}
      <main className="relative z-10">
        {/* Hero Monumental con eventosbg.png y accesos a los 3 eventos */}
        <EventosHero />

        {/* Las 3 Carreras Disponibles: Desafío Rebollo, Laberinto y San Pedro */}
        <EventosCards />

        {/* Galería Fotográfica Real de la Comunidad */}
        <EventosGallery />

        {/* Kits del Corredor, Medallas y Servicios */}
        <EventosKits />

        {/* Inscripciones, FAQ y Contacto */}
        <EventosCTA />
      </main>
    </div>
  );
}

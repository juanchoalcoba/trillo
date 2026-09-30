import React from 'react';
import EventosTrackCanvas from '../components/3d/EventosTrackCanvas';
import EventosNavbar from '../components/eventos/EventosNavbar';
import EventosHero from '../components/eventos/EventosHero';
import EventosTelemetry from '../components/eventos/EventosTelemetry';
import EventosGallery from '../components/eventos/EventosGallery';
import EventosKits from '../components/eventos/EventosKits';
import EventosCTA from '../components/eventos/EventosCTA';

export default function EventosPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0c10] text-[#f5f4f0] selection:bg-[#e87a38] selection:text-black overflow-x-hidden">
      {/* 3D WebGL Canvas: Topografía de San Pedro & Corredores Cinéticos */}
      <EventosTrackCanvas />

      {/* Navegación de Eventos */}
      <EventosNavbar />

      {/* Contenido Principal */}
      <main className="relative z-10">
        <EventosHero />
        <EventosTelemetry />
        <EventosGallery />
        <EventosKits />
        <EventosCTA />
      </main>
    </div>
  );
}

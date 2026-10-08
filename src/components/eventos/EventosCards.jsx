import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  MapPin,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { EVENTS } from '../../data/eventsData';
import { eventsApi } from '../../services/api';
import EventosDetailModal from './EventosDetailModal';

function normalizeEvent(e) {
  return {
    ...e,
    id: e.slug || e.id,
    image: e.image_url || e.image,
    date: e.date_text || e.date,
    shortDescription: e.short_description || e.shortDescription,
    description: e.description,
    kitIncludes: e.kit_includes || e.kitIncludes || [],
    accent: e.accent_color || e.accent || '#e87a38',
    accentBg: e.accentBg || 'bg-[#e87a38]/10 text-[#e87a38] border-[#e87a38]/30',
    btnBg: e.btnBg || 'bg-[#e87a38] text-black hover:bg-[#ff8a48] shadow-[#e87a38]/20',
    whatsappMsg: e.whatsapp_msg || e.whatsappMsg || 'Hola Trillo! Quiero información e inscribirme.',
    distances: Array.isArray(e.distances) ? e.distances : [],
    highlights: Array.isArray(e.highlights) ? e.highlights : [],
    schedule: Array.isArray(e.schedule) ? e.schedule : [],
  };
}

export default function EventosCards() {
  const [events, setEvents] = useState(EVENTS.map(normalizeEvent));
  const [activeEvent, setActiveEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await eventsApi.getPublished();
        if (res?.events && res.events.length > 0) {
          setEvents(res.events.map(normalizeEvent));
        }
      } catch (err) {
        // En caso de desconexión mantiene el catálogo estático como fallback
        console.warn('Usando catálogo estático de eventos (fallback offline):', err.message);
      }
    }
    fetchEvents();
  }, []);

  const handleOpenDetail = (event) => {
    setActiveEvent(event);
    setIsModalOpen(true);
  };

  return (
    <section id="catalogo-eventos" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header de Sección */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#8d9299] mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#e87a38]" />
            <span className="font-mono uppercase tracking-widest text-[11px] text-[#f5f4f0]">
              Calendario Oficial de Competencias
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight">
            Eventos para Desafiarte en el Territorio
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#8d9299] max-w-2xl">
            Desde el trail running más agreste en las sierras, hasta la velocidad táctica en el laberinto y la multitudinaria corrida nocturna de San Pedro.
          </p>
        </div>

        {/* Badge Informativo de Cupos */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0d1015]/90 border border-white/10 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e87a38] animate-pulse" />
          <span className="text-xs font-mono text-[#d8cfc4]">
            Inscripciones anticipadas disponibles
          </span>
        </div>
      </div>

      {/* Grid de Eventos Oficiales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {events.map((event, idx) => {
          const whatsappUrl = `https://wa.me/59898121608?text=${encodeURIComponent(event.whatsappMsg)}`;

          return (
            <div
              key={event.id}
              id={event.slug || event.id}
              className="scroll-mt-28 flex"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="w-full group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-white/25 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1.5"
              >
                {/* Contenedor Superior: Imagen & Badges */}
                <div>
                  <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.78] contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-black/50" />

                    {/* Badges superiores */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border font-bold backdrop-blur-md ${event.accentBg}`}
                      >
                        {event.badge}
                      </span>

                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#d8cfc4] border border-white/10 flex items-center gap-1 font-semibold">
                        <Calendar className="w-3 3 text-[#e87a38]" />
                        {event.season}
                      </span>
                    </div>

                    {/* Location Tag en la foto */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-[#d8cfc4] font-mono drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-[#e87a38] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <span
                        className="text-[11px] font-mono uppercase tracking-widest font-bold"
                        style={{ color: event.accent }}
                      >
                        {event.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] leading-snug group-hover:text-white transition-colors mb-3">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#8d9299] line-clamp-3 mb-5 leading-relaxed">
                      {event.shortDescription}
                    </p>

                    {/* Distancias */}
                    <div className="mb-5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d9299] block mb-2 font-bold">
                        Distancias:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {event.distances.map((dist, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white"
                          >
                            {dist}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Métricas Rápidas: Desnivel & Dificultad */}
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02]">
                        <TrendingUp className="w-3.5 h-3.5 text-[#8d9299] shrink-0" />
                        <div className="min-w-0">
                          <span className="block text-[9px] font-mono uppercase text-[#8d9299]">
                            Desnivel
                          </span>
                          <span className="text-[11px] font-semibold text-[#f5f4f0] truncate block">
                            {event.elevation}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02]">
                        <Trophy className="w-3.5 h-3.5 text-[#8d9299] shrink-0" />
                        <div className="min-w-0">
                          <span className="block text-[9px] font-mono uppercase text-[#8d9299]">
                            Dificultad
                          </span>
                          <span className="text-[11px] font-semibold text-[#f5f4f0] truncate block">
                            {event.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer de Acciones: Botón Modal y Botón WhatsApp */}
                <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                  <button
                    onClick={() => handleOpenDetail(event)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 transition-all duration-300 active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#e87a38]" />
                    <span>Ver Ficha</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95 ${event.btnBg}`}
                  >
                    <span>Inscribirme</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Modal Interactivo de Detalle del Evento */}
      <EventosDetailModal
        event={activeEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

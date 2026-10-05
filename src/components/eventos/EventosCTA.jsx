import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Trophy, HelpCircle, ArrowUp, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventosCTA() {
  const [selectedEvent, setSelectedEvent] = useState('san-pedro');

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const eventConfigs = {
    'rebollo': {
      nombre: 'Desafío Rebollo',
      tipo: 'Trail Running de Sierra',
      fecha: 'Mayo 2027 · Durazno',
      distancias: '7K · 15K · 25K',
      precio: '$ 950 - $ 1.350',
      clubDescuento: '20% OFF para Socios del Club Trillo',
      cupos: 'Inscripciones Apertura',
      whatsMsg: 'Hola Trillo! Quiero asegurar mi inscripción para el Desafío Rebollo de Trail en Durazno.',
      accent: '#f97316',
      items: [
        'Remera técnica de secado ultra-rápido Desafío Rebollo',
        'Chip digital descartable y número de corredor',
        'Medalla Finisher troquelada con cinta oficial',
        'Puestos de abastecimiento con isotónica en sierra',
        'Seguro médico y rescate en circuito de campo',
      ],
    },
    'laberinto': {
      nombre: 'Carrera del Laberinto',
      tipo: 'Cross Country & Agilidad',
      fecha: 'Agosto 2027 · Durazno',
      distancias: '5K · 10K',
      precio: '$ 850 - $ 1.100',
      clubDescuento: '20% OFF para Socios del Club Trillo',
      cupos: 'Cupos Limitados por Trazado',
      whatsMsg: 'Hola Trillo! Me interesa inscribirme a la Carrera del Laberinto en Durazno.',
      accent: '#eab308',
      items: [
        'Remera técnica oficial Carrera del Laberinto',
        'Chip electrónico con medición de vueltas',
        'Medalla Finisher artesanal de acero inoxidable',
        'Dorsal tyvek impermeable de alta resistencia',
        'Acceso al fogón finisher y tercer tiempo comunitario',
      ],
    },
    'san-pedro': {
      nombre: 'Corrida San Pedro',
      tipo: 'La Gran Carrera Nocturna',
      fecha: 'Sábado 21 de Noviembre · 18:30 HS',
      distancias: '5K · 10K',
      precio: '$ 950 - $ 1.250',
      clubDescuento: '20% OFF para Socios del Club Trillo',
      cupos: '82% Cupos Completos',
      whatsMsg: 'Hola Trillo! Quiero reservar mi dorsal para la Corrida San Pedro en Durazno.',
      accent: '#e87a38',
      items: [
        'Remera técnica oficial Corrida San Pedro Micro-Dry',
        'Dorsal oficial con chip descartable incorporado',
        'Medalla Finisher metálica de colección con relieve',
        'Hidratación en ruta cada 2.5K y en arco de meta',
        'Música en vivo, batucadas en ruta y fiesta comunitaria',
      ],
    },
  };

  const currentConfig = eventConfigs[selectedEvent];
  const whatsappUrl = `https://wa.me/59898121608?text=${encodeURIComponent(currentConfig.whatsMsg)}`;

  return (
    <section id="inscripcion" className="relative pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Tarjeta Gigante de Registro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl glass-panel border border-[#e87a38]/40 bg-gradient-to-b from-[#181512] to-[#0a0c10] p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden"
      >
        {/* Glow de Fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e87a38]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Lado Izquierdo: Convocatoria */}
          <div className="lg:col-span-7">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase bg-[#e87a38]/20 text-[#e87a38] border border-[#e87a38]/40 inline-block mb-4">
              Calendario Oficial Trillo 2026/2027
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Space_Grotesk'] uppercase text-[#f5f4f0] leading-tight">
              ELEGÍ TU RETO EN <span className="text-[#e87a38]">DURAZNO</span>
            </h2>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-[#8d9299] leading-relaxed max-w-xl">
              Los cupos son limitados en cada competencia para garantizar la máxima seguridad,
              servicios de primer nivel y la mística comunitaria que caracteriza a Trillo.
            </p>

            {/* Selector de Evento */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setSelectedEvent('rebollo')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  selectedEvent === 'rebollo'
                    ? 'bg-[#f97316] text-black font-bold shadow-lg shadow-[#f97316]/30'
                    : 'bg-white/5 text-[#8d9299] hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                Desafío Rebollo
              </button>

              <button
                onClick={() => setSelectedEvent('laberinto')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  selectedEvent === 'laberinto'
                    ? 'bg-[#eab308] text-black font-bold shadow-lg shadow-[#eab308]/30'
                    : 'bg-white/5 text-[#8d9299] hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                Laberinto
              </button>

              <button
                onClick={() => setSelectedEvent('san-pedro')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  selectedEvent === 'san-pedro'
                    ? 'bg-[#e87a38] text-white font-bold shadow-lg shadow-[#e87a38]/30'
                    : 'bg-white/5 text-[#8d9299] hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                San Pedro
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-[#8d9299]">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span>Estado: {currentConfig.cupos} · {currentConfig.fecha}</span>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta de Precio y Acción */}
          <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#8d9299] pb-3 border-b border-white/10">
                <span className="uppercase">{currentConfig.tipo}</span>
                <span className="text-[#e87a38] font-bold">{currentConfig.distancias}</span>
              </div>

              <div className="my-6">
                <span className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-[#f5f4f0]">
                  {currentConfig.precio} <span className="text-sm font-normal text-[#8d9299]">UYU</span>
                </span>

                <div className="mt-2 text-xs font-mono text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{currentConfig.clubDescuento}</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#8d9299] font-mono mb-8">
                {currentConfig.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e87a38] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full text-center text-xs font-bold uppercase tracking-wider text-black bg-[#f5f4f0] hover:bg-[#e87a38] hover:text-white transition-all duration-300 shadow-xl font-mono flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inscribirme en {currentConfig.nombre}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Preguntas Frecuentes Rápidas */}
      <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#8d9299]">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Space_Grotesk'] text-[#f5f4f0] flex items-center gap-1.5 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Qué distancias son para debutantes?
          </h4>
          <p className="leading-relaxed">
            Las modalidades de 5K y 7K están pensadas para corredores de cualquier nivel, incluso sin experiencia previa en carreras.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Space_Grotesk'] text-[#f5f4f0] flex items-center gap-1.5 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Cómo se retira el kit oficial?
          </h4>
          <p className="leading-relaxed">
            En la sede de Trillo en Durazno durante la semana previa, o el mismo día del evento en el campamento base de la carrera.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Space_Grotesk'] text-[#f5f4f0] flex items-center gap-1.5 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Tienen descuentos para grupos?
          </h4>
          <p className="leading-relaxed">
            Sí. Equipos de entrenamiento, gimnasios y grupos de más de 5 corredores cuentan con bonificaciones especiales y retiro conjunto.
          </p>
        </div>
      </div>

      {/* Footer Eventos */}
      <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8d9299]">
        <div className="flex items-center gap-3">
          <span className="font-['Space_Grotesk'] font-black tracking-widest text-[#f5f4f0] uppercase text-sm">
            TRILLO EVENTOS
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono">Rebollo · Laberinto · San Pedro · Durazno</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <Link to="/" className="text-[#8d9299] hover:text-white transition-colors">
            ← Universo Trillo
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/club" className="text-amber-400 hover:underline">
            El Club de Corredores →
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/aventuras" className="text-[#4ade80] hover:underline">
            Trillo Aventuras →
          </Link>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-[#f5f4f0] transition-colors p-2 rounded-full border border-white/10 hover:border-[#e87a38] cursor-pointer"
          title="Volver arriba"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#e87a38]" />
          <span className="font-mono uppercase text-[10px]">Arriba</span>
        </button>
      </footer>
    </section>
  );
}

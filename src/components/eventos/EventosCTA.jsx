import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, ChevronRight, HelpCircle, ArrowUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventosCTA() {
  const [selectedDist, setSelectedDist] = useState('21K');

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prices = {
    '5K': { precio: '$ 750', club: '$ 650', cupos: '90% completo' },
    '10K': { precio: '$ 950', club: '$ 800', cupos: '82% completo' },
    '21K': { precio: '$ 1.250', club: '$ 1.050', cupos: '75% completo' },
  };

  const currentPrice = prices[selectedDist];

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
              Edición Oficial San Pedro 2026/2027
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit'] uppercase text-[#f5f4f0] leading-tight">
              ASEGURÁ TU DORSAL EN <span className="text-[#e87a38]">SAN PEDRO</span>
            </h2>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-[#8d9299] leading-relaxed max-w-xl">
              Los cupos son estrictamente limitados para preservar la seguridad y la mística
              del sendero de campo y cerro. Incluye kit oficial, chip, cronometraje, seguro y fogón finisher.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase text-[#d8cfc4]">Seleccioná tu reto:</span>
              {['5K', '10K', '21K'].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setSelectedDist(dist)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedDist === dist
                      ? 'bg-[#e87a38] text-white font-bold shadow-lg shadow-[#e87a38]/30'
                      : 'bg-white/5 text-[#8d9299] hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-[#8d9299]">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span>Estado: {currentPrice.cupos} · Quedan los últimos dorsales</span>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta de Precio y Acción */}
          <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#8d9299] pb-3 border-b border-white/10">
                <span>Inscripción Distancia</span>
                <span className="text-[#e87a38] font-bold text-sm">{selectedDist}</span>
              </div>

              <div className="my-6">
                <span className="text-3xl sm:text-4xl font-black font-['Outfit'] text-[#f5f4f0]">
                  {currentPrice.precio} <span className="text-sm font-normal text-[#8d9299]">UYU</span>
                </span>

                <div className="mt-2 text-xs font-mono text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{currentPrice.club} UYU para socios de El Club Trillo</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#8d9299] font-mono mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e87a38]" />
                  <span>Dorsal y Chip descartable oficial</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e87a38]" />
                  <span>Remera técnica oficial Trillo San Pedro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e87a38]" />
                  <span>Medalla finisher de madera nativa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e87a38]" />
                  <span>Acceso al Fogón & Asado Finisher</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/?text=Hola%20Trillo!%20Quiero%20inscribirme%20a%20la%20Corrida%20San%20Pedro%20en%20la%20distancia%20de%20${selectedDist}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full text-center text-xs font-semibold uppercase tracking-wider text-black bg-[#f5f4f0] hover:bg-[#e87a38] hover:text-white transition-all duration-300 shadow-xl font-mono flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reservar Dorsal por WhatsApp</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Preguntas Rápidas */}
      <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#8d9299]">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Outfit'] text-[#f5f4f0] flex items-center gap-1.5 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Qué equipo es obligatorio?
          </h4>
          <p className="leading-relaxed">
            Para 21K es obligatorio contar con linterna frontal operativa y silbato de emergencia.
            En 5K y 10K es libre y recomendado.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Outfit'] text-[#f5f4f0] flex items-center gap-1.5 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Dónde se retira el kit?
          </h4>
          <p className="leading-relaxed">
            Viernes 20 en Durazno Capital (Sede Trillo) o el mismo sábado 21 en Plaza San Pedro hasta 1 hora antes de largada.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Outfit'] text-[#f5f4f0] flex items-center gap-1.5 mb-1.5">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Hay estacionamiento y duchas?
          </h4>
          <p className="leading-relaxed">
            Sí, predio vigilado en el Polideportivo de San Pedro con vestuarios, duchas calientes y guardarropa seguro.
          </p>
        </div>
      </div>

      {/* Footer Eventos */}
      <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8d9299]">
        <div className="flex items-center gap-3">
          <span className="font-['Outfit'] font-black tracking-widest text-[#f5f4f0] uppercase text-sm">
            TRILLO EVENTOS
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono">San Pedro · Durazno · Uruguay</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <Link to="/" className="text-[#8d9299] hover:text-white transition-colors">
            ← Universo Trillo
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/club" className="text-amber-400 hover:underline">
            El Club de Corredores →
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

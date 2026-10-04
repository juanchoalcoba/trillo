import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Flame, Clock, Award, ArrowDown, ChevronRight } from 'lucide-react';

export default function EventosHero() {
  // Countdown a la próxima carrera (Noviembre 2026)
  const targetDate = new Date('2026-11-21T18:30:00-03:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Banner Meta */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 text-xs text-[#8d9299]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-ping" />
          <span className="font-mono text-[#f5f4f0] uppercase tracking-wider text-[11px]">
            Inscripciones Abiertas · 82% Cupos
          </span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline text-[11px]">Durazno, Interior de Uruguay</span>
        </div>

        <div className="flex items-center gap-5 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-[#f5f4f0]">
            <Calendar className="w-3.5 h-3.5 text-[#e87a38]" />
            <span>Sábado 21 de Noviembre</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-[#8d9299]">
            <MapPin className="w-3.5 h-3.5 text-[#e87a38]" />
            <span>Plaza San Pedro · 18:30 HS</span>
          </div>
        </div>
      </motion.div>

      {/* Main Hero Header */}
      <div className="my-auto py-8 flex flex-col items-center md:items-start text-center md:text-left">
        {/* Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-4 border border-[#e87a38]/30 bg-[#e87a38]/10"
        >
          <Flame className="w-3.5 h-3.5 text-[#e87a38]" />
          <span className="tracking-widest uppercase text-[10px] font-mono text-[#f5f4f0]">
            Gran Carrera Nocturna & Atardecer
          </span>
        </motion.div>

        {/* Título Principal */}
        <div className="overflow-hidden py-1 mb-2">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 select-none"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase font-['Space_Grotesk'] tracking-tight text-[#f5f4f0]">
              SAN PEDRO
            </h1>
            <span className="text-2xl sm:text-4xl md:text-5xl font-['Newsreader'] italic font-light text-[#e87a38]">
              Trail & Desafío
            </span>
          </motion.div>
        </div>

        {/* Bajada Narrativa */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-[#8d9299] font-normal leading-relaxed mb-8"
        >
          El trail del interior donde la tierra ruge. Largamos al atardecer sobre los caminos de balastro
          y cerros de San Pedro, para cruzar el monte nativo y coronar la meta nocturna bajo el fuego
          de las antorchas y las estrellas de Durazno.
        </motion.p>

        {/* Bloque Cuenta Regresiva & Distancias */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8"
        >
          {/* Contador en Vivo */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 bg-[#0d1015]/80 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#e87a38]">
                <Clock className="w-3.5 h-3.5" />
                <span>Tiempo hasta la Largada</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#8d9299]">
                Durazno TZ
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
              {[
                { val: timeLeft.days, label: 'DÍAS' },
                { val: timeLeft.hours, label: 'HORAS' },
                { val: timeLeft.minutes, label: 'MIN' },
                { val: timeLeft.seconds, label: 'SEG' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-white/5 rounded-xl py-3 px-1 flex flex-col items-center"
                >
                  <span className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-[#8d9299] tracking-widest mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tres Distancias Oficiales */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-2.5 sm:gap-3">
            {[
              {
                dist: '5K',
                tipo: 'Participativa',
                terreno: 'Camino & Campo',
                accent: 'border-white/10 text-white',
                chip: 'bg-white/10 text-white',
              },
              {
                dist: '10K',
                tipo: 'Competitiva',
                terreno: 'Balastro & Vados',
                accent: 'border-[#e87a38]/40 text-[#e87a38]',
                chip: 'bg-[#e87a38]/15 text-[#e87a38]',
              },
              {
                dist: '21K',
                tipo: 'Trail Extremo',
                terreno: 'Cerro & Linterna',
                accent: 'border-amber-400/50 text-amber-400',
                chip: 'bg-amber-400/15 text-amber-300',
              },
            ].map((d, i) => (
              <div
                key={i}
                className={`p-3.5 sm:p-4 rounded-2xl glass-panel border bg-[#0d1015]/80 flex flex-col justify-between text-left transition-all duration-300 hover:border-[#e87a38] group`}
              >
                <div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${d.chip}`}>
                    {d.tipo}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0] mt-2 group-hover:text-[#e87a38] transition-colors">
                    {d.dist}
                  </h3>
                </div>
                <p className="text-[11px] text-[#8d9299] font-mono mt-2 leading-tight">
                  {d.terreno}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Acciones Principales */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap items-center gap-3 justify-center md:justify-start"
        >
          <a
            href="#inscripcion"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-[#f5f4f0] hover:bg-[#e87a38] hover:text-white transition-all duration-300 shadow-xl hover:shadow-[#e87a38]/25"
          >
            <span>Asegurar mi Lugar</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="#circuito"
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#f5f4f0] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 font-mono"
          >
            <span>Ver Circuito 3D</span>
          </a>

          <a
            href="#galeria"
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors font-mono"
          >
            <span>Galería de Fotos →</span>
          </a>
        </motion.div>
      </div>

      {/* Hero Footer Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-[#8d9299] font-mono"
      >
        <div className="hidden sm:flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-[#e87a38]" />
          <span>MEDALLA FINISHER DE MADERA NATIVA · CRONOMETRAJE CHIP OFICIAL</span>
        </div>

        <a
          href="#circuito"
          className="group mx-auto sm:mx-0 flex items-center gap-2 uppercase tracking-widest text-[10px] text-[#d8cfc4] hover:text-[#e87a38] transition-colors"
        >
          <span>Bajar al Circuito</span>
          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#e87a38] group-hover:translate-y-0.5 transition-all">
            <ArrowDown className="w-3 h-3 text-[#e87a38]" />
          </div>
        </a>

        <div className="hidden md:block">
          SAN PEDRO · DURAZNO · URUGUAY
        </div>
      </motion.div>
    </section>
  );
}

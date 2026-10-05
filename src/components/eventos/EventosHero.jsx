import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, ArrowDown, Award, Users, Timer, Sparkles, MapPin } from 'lucide-react';

export default function EventosHero() {
  const containerRef = useRef(null);

  // Efecto Parallax en el background y fundido cinematográfico
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100dvh] min-h-[550px] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#08090a]"
    >
      {/* 1. Background Image con Parallax & Overlay Oscuro Cinematográfico (eventosbg.png) */}
      <motion.div
        style={{ y: yBackground, scale: scaleBackground }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden pointer-events-none select-none z-0"
      >
        <img
          src="/eventosbg.png"
          alt="Trillo Eventos Comunidad San Pedro"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] saturate-[1.15]"
        />

        {/* Overlay oscuro para otorgar contraste y profundidad cinematográfica */}
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-[#08090a]/50"
        />

        {/* Degradé superior para integrar navbar y degradé inferior para fundir con la página */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/85 via-transparent to-[#08090a]" />

        {/* Viñeta radial oscura para concentrar la mirada en el contenido central */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#08090a_92%)] opacity-85" />
      </motion.div>

      {/* 2. Contenido Centrado Frontal - Estilo Monumental Trillo (Calce exacto en pantalla) */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col justify-between pt-16 sm:pt-20 pb-2 sm:pb-3 px-4 md:px-8 text-center"
      >
        {/* Meta Header Superior */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-1.5 text-xs text-[#8d9299] max-w-5xl mx-auto w-full shrink-0"
        >
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-pulse" />
            <span className="font-mono text-[#f5f4f0] uppercase tracking-wider text-[11px]">
              Competencias & Desafíos Oficiales
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[11px] text-[#8d9299]">Durazno · Interior de Uruguay</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-[#8d9299]">
            <div className="flex items-center gap-1.5 text-[#e87a38]">
              <Trophy className="w-3.5 h-3.5" />
              <span>3 Grandes Eventos Anuales</span>
            </div>
          </div>
        </motion.div>

        {/* Núcleo Central: Badge + Logo + Título Monumental + Manifiesto */}
        <div className="my-auto py-1 sm:py-2 flex flex-col items-center">
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full border border-[#e87a38]/30 bg-[#e87a38]/10 backdrop-blur-md mb-2 sm:mb-2.5"
          >
            <Sparkles className="w-3 h-3 text-[#e87a38]" />
            <span className="font-mono uppercase tracking-[0.2em] text-[9px] sm:text-[10px] text-[#f5f4f0] font-semibold">
              La energía de correr en comunidad
            </span>
          </motion.div>

          {/* Logo TRILLO de alta resolución */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-1.5 sm:mb-2"
          >
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="w-auto h-auto max-w-[190px] sm:max-w-[240px] md:max-w-[280px] max-h-[55px] sm:max-h-[70px] md:max-h-[85px] object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] mx-auto pointer-events-none"
              draggable="false"
            />
          </motion.div>

          {/* Título de la Sección */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto px-2"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-['Space_Grotesk'] font-black uppercase text-[#f5f4f0] tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              TRILLO EVENTOS
            </h1>
            <p className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-['Newsreader'] italic font-light text-[#e87a38] drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]">
              Carreras y desafíos que hacen vibrar a toda una ciudad
            </p>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#d8cfc4] font-normal leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Circuitos de monte nativo, travesías nocturnas y asfalto histórico. Viví la adrenalina de superar tus límites junto a cientos de corredores en Durazno.
            </p>
          </motion.div>

          {/* 3 Botones / Accesos Directos a los 3 Eventos Oficiales */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-2.5 sm:mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl"
          >
            <a
              href="#rebollo"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 hover:bg-black/90 text-xs text-[#f5f4f0] border border-[#f97316]/40 hover:border-[#f97316] transition-all duration-300 group shadow-xl backdrop-blur-md active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-[#f97316] group-hover:scale-125 transition-transform shrink-0" />
              <div className="text-left">
                <span className="block font-semibold tracking-wide text-white">Desafío Rebollo</span>
                <span className="block text-[10px] text-[#8d9299] font-mono">Trail & Sierras</span>
              </div>
            </a>

            <a
              href="#laberinto"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 hover:bg-black/90 text-xs text-[#f5f4f0] border border-[#eab308]/40 hover:border-[#eab308] transition-all duration-300 group shadow-xl backdrop-blur-md active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-[#eab308] group-hover:scale-125 transition-transform shrink-0" />
              <div className="text-left">
                <span className="block font-semibold tracking-wide text-white">Laberinto</span>
                <span className="block text-[10px] text-[#8d9299] font-mono">Cross Country</span>
              </div>
            </a>

            <a
              href="#san-pedro"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 hover:bg-black/90 text-xs text-[#f5f4f0] border border-[#e87a38]/40 hover:border-[#e87a38] transition-all duration-300 group shadow-xl backdrop-blur-md active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-[#e87a38] group-hover:scale-125 transition-transform shrink-0" />
              <div className="text-left">
                <span className="block font-semibold tracking-wide text-white">San Pedro</span>
                <span className="block text-[10px] text-[#8d9299] font-mono">Corrida Nocturna</span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Barra Inferior con Indicadores & Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 sm:pt-2.5 border-t border-white/10 max-w-5xl mx-auto w-full shrink-0"
        >
          {/* Credenciales rápidas */}
          <div className="flex items-center gap-4 text-[11px] text-[#8d9299] font-mono">
            <span className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-[#e87a38]" />
              Cronometraje con Chip Digital
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#e87a38]" />
              Kits & Medallas Finisher
            </span>
          </div>

          {/* Flecha de scroll */}
          <a
            href="#catalogo-eventos"
            className="group flex items-center gap-2 text-[11px] tracking-widest uppercase font-mono text-[#d8cfc4] hover:text-[#e87a38] transition-colors"
          >
            <span>Ver Carreras Disponibles</span>
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#e87a38] group-hover:translate-y-0.5 transition-all">
              <ArrowDown className="w-3.5 h-3.5 text-[#e87a38]" />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

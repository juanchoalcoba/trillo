import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, ArrowDown, MapPin, ShieldCheck, Users, Mountain } from 'lucide-react';

export default function AventurasHero() {
  const containerRef = useRef(null);

  // Parallax scroll effect con Framer Motion
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
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#08090a]"
    >
      {/* 1. Background Image con Parallax & Overlay Oscuro Cinematográfico */}
      <motion.div
        style={{ y: yBackground, scale: scaleBackground }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden pointer-events-none select-none z-0"
      >
        <img
          src="/aventuras-optimized.jpg"
          onError={(e) => {
            // Fallback a la imagen original si fuese necesario
            e.currentTarget.src = '/aventuras.JPG';
          }}
          alt="Trillo Aventuras Expediciones"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] saturate-[1.15]"
        />

        {/* Overlay oscuro para otorgar contraste y profundidad a la fotografía */}
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-[#08090a]/50"
        />

        {/* Degradé superior para integrar la barra de navegación y degradé inferior para fundir con la sección */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/85 via-transparent to-[#08090a]" />

        {/* Viñeta radial oscura para centrar la mirada en el contenido */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#08090a_92%)] opacity-85" />
      </motion.div>

      {/* 2. Contenido Centrado Frontal - Estilo Monumental Trillo */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 md:px-8 text-center"
      >
        {/* Meta Header Superior */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 text-xs text-[#8d9299] max-w-5xl mx-auto w-full"
        >
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="font-mono text-[#f5f4f0] uppercase tracking-wider text-[11px]">
              Expediciones & Turismo Aventura
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[11px] text-[#8d9299]">Durazno · Uruguay · Región</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-[#8d9299]">
            <div className="flex items-center gap-1.5 text-[#4ade80]">
              <Compass className="w-3.5 h-3.5" />
              <span>3 Categorías de Exploración</span>
            </div>
          </div>
        </motion.div>

        {/* Núcleo Central: Logo + Título Monumental + Manifiesto */}
        <div className="my-auto py-8 sm:py-12 flex flex-col items-center">
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 backdrop-blur-md mb-6"
          >
            <Mountain className="w-3.5 h-3.5 text-[#4ade80]" />
            <span className="font-mono uppercase tracking-[0.25em] text-[10px] sm:text-[11px] text-[#f5f4f0] font-semibold">
              Salimos a vivir el territorio
            </span>
          </motion.div>

          {/* Logo TRILLO de alta resolución */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="w-auto h-auto max-w-[220px] sm:max-w-[290px] md:max-w-[360px] max-h-[75px] sm:max-h-[95px] md:max-h-[115px] object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] mx-auto pointer-events-none"
              draggable="false"
            />
          </motion.div>

          {/* Título de la Sección */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto px-2"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-['Space_Grotesk'] font-black uppercase text-[#f5f4f0] tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              AVENTURAS
            </h1>
            <p className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-['Newsreader'] italic font-light text-[#4ade80] drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]">
              Experiencias auténticas fuera de lo cotidiano
            </p>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#d8cfc4] font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Trekking agreste, travesías fluviales en kayak, ascensos serranos y cordillera. No es una simple excursión: es conectar con lo salvaje y desafiarte en entornos naturales imponentes.
            </p>
          </motion.div>

          {/* 3 Botones / Accesos Directos a las 3 Categorías solicitadas */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl"
          >
            <a
              href="#durazno"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/60 hover:bg-black/90 text-xs sm:text-sm text-[#f5f4f0] border border-[#4ade80]/40 hover:border-[#4ade80] transition-all duration-300 group shadow-xl backdrop-blur-md active:scale-95"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] group-hover:scale-125 transition-transform shrink-0" />
              <div className="text-left">
                <span className="block font-semibold tracking-wide text-white">Durazno</span>
                <span className="block text-[10px] text-[#8d9299] font-mono">Río Yí & Montes</span>
              </div>
            </a>

            <a
              href="#nacionales"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/60 hover:bg-black/90 text-xs sm:text-sm text-[#f5f4f0] border border-[#38bdf8]/40 hover:border-[#38bdf8] transition-all duration-300 group shadow-xl backdrop-blur-md active:scale-95"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] group-hover:scale-125 transition-transform shrink-0" />
              <div className="text-left">
                <span className="block font-semibold tracking-wide text-white">Nacionales</span>
                <span className="block text-[10px] text-[#8d9299] font-mono">Quebradas, Sierras & Dunas</span>
              </div>
            </a>

            <a
              href="#internacionales"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/60 hover:bg-black/90 text-xs sm:text-sm text-[#f5f4f0] border border-[#f59e0b]/40 hover:border-[#f59e0b] transition-all duration-300 group shadow-xl backdrop-blur-md active:scale-95"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] group-hover:scale-125 transition-transform shrink-0" />
              <div className="text-left">
                <span className="block font-semibold tracking-wide text-white">Internacionales</span>
                <span className="block text-[10px] text-[#8d9299] font-mono">Andes & Patagonia</span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Barra Inferior con Indicadores & Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 max-w-5xl mx-auto w-full"
        >
          {/* Credenciales rápidas */}
          <div className="flex items-center gap-4 text-[11px] text-[#8d9299] font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
              Guías WFR Certificados
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#4ade80]" />
              Grupos Reducidos
            </span>
          </div>

          {/* Flecha de scroll */}
          <a
            href="#durazno"
            className="group flex items-center gap-2 text-[11px] tracking-widest uppercase font-mono text-[#d8cfc4] hover:text-[#4ade80] transition-colors"
          >
            <span>Ver Experiencias</span>
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#4ade80] group-hover:translate-y-0.5 transition-all">
              <ArrowDown className="w-3.5 h-3.5 text-[#4ade80]" />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

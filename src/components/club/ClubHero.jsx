import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Sparkles, ArrowDown, Footprints, ShieldCheck, ArrowUpRight, MessageCircle } from 'lucide-react';
import { CLOUDINARY_MEDIA } from '../../config/cloudinary';

export default function ClubHero() {
  const containerRef = useRef(null);

  // Parallax scroll effect con Framer Motion idéntico a Aventuras y Trillo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100dvh] min-h-[550px] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#08090a]"
    >
      {/* 1. Background Image con Parallax & Overlay Oscuro Cinematográfico */}
      <motion.div
        style={{ y: yBackground, scale: scaleBackground }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden pointer-events-none select-none z-0"
      >
        <img
          src={CLOUDINARY_MEDIA.HERO_CLUB_BG}
          alt="El Club de Corredores Trillo"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] saturate-[1.2]"
        />

        {/* Overlay oscuro para otorgar profundidad y contraste con el texto blanco y dorado */}
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-[#08090a]/50"
        />

        {/* Degradé superior para navbar y degradé inferior para fundir con la página */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/85 via-transparent to-[#08090a]" />

        {/* Viñeta radial oscura para concentrar la mirada en el centro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#08090a_92%)] opacity-85" />
      </motion.div>

      {/* 2. Contenido Centrado Frontal - Proporción Perfecta para Calzar en Pantalla */}
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
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[#f5f4f0] uppercase tracking-wider text-[11px]">
              Comunidad Activa · Durazno
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[11px] text-[#8d9299]">Ribera del Río Yí · Interior de Uruguay</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-[#8d9299]">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Sun className="w-3.5 h-3.5" />
              <span>Entrenamientos Todo el Año</span>
            </div>
          </div>
        </motion.div>

        {/* Núcleo Central: Logo Redondeado Agrandado + Frase Rectora */}
        <div className="my-auto py-1 sm:py-2 flex flex-col items-center">
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-md mb-2 sm:mb-3"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="font-mono uppercase tracking-[0.2em] text-[9px] sm:text-[10px] text-[#f5f4f0] font-semibold">
              Una comunidad que eligió moverse
            </span>
          </motion.div>

          {/* Logo Redondeado de Corredores (Escalado armoniosamente) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2 sm:mb-3 relative group"
          >
            <h1 className="sr-only">El Club de Corredores Durazno</h1>
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full p-1 bg-gradient-to-tr from-amber-500/50 via-white/20 to-amber-300/50 shadow-[0_10px_35px_rgba(245,158,11,0.3)] border border-white/25 backdrop-blur-md mx-auto flex items-center justify-center transition-transform duration-500 hover:scale-105">
              <img
                src="/logocorredores.png"
                alt="El Club de Corredores Durazno"
                className="w-full h-full object-contain rounded-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              />
            </div>
          </motion.div>

          {/* Manifiesto y Frase Rectora */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto px-2"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-['Newsreader'] italic font-light text-amber-400 leading-tight drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]">
              El deporte como estilo de vida<span className="text-[#f5f4f0]">.</span>
            </h2>
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-[#f5f4f0]/90 font-normal leading-relaxed max-w-lg mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Entrenamientos grupales semanales en Durazno, preparación física guiada por profesores y el Río Yí como nuestro patio natural.
            </p>
          </motion.div>

          {/* Botones / Accesos Directos a las Secciones */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-2.5 sm:mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl"
          >
            <a
              href="#disciplinas"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-xs text-[#f5f4f0] border border-white/20 hover:border-amber-400 transition-all duration-300 group shadow-lg backdrop-blur-md whitespace-nowrap active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">Disciplinas</span>
              <span className="text-[#d8cfc4] text-[11px] font-mono">· Running & Trail</span>
            </a>

            <a
              href="#membresia"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-xs text-amber-300 border border-amber-500/60 hover:border-amber-400 bg-amber-500/10 transition-all duration-300 group shadow-lg backdrop-blur-md whitespace-nowrap active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">Cuota & Beneficios</span>
              <span className="text-amber-200/80 text-[11px] font-mono">· $1.400/mes</span>
            </a>

            <a
              href="#rioyi"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-xs text-[#f5f4f0] border border-white/20 hover:border-amber-400 transition-all duration-300 group shadow-lg backdrop-blur-md whitespace-nowrap active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-stone-300 group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">El Río Yí</span>
              <span className="text-[#d8cfc4] text-[11px] font-mono">· Naturaleza</span>
            </a>

            <a
              href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20sumarme%20a%20El%20Club%20de%20Corredores%20en%20Durazno."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-400/20 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inscribirme</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Barra Inferior con Indicadores & Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-between pt-2 border-t border-white/10 shrink-0"
        >
          {/* Credenciales rápidas */}
          <div className="text-[10px] sm:text-[11px] text-[#8d9299] font-mono hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Profesores Certificados
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-amber-400" />
              Pase Libre Semanal
            </span>
          </div>

          {/* Flecha de scroll */}
          <a
            href="#disciplinas"
            className="group mx-auto sm:mx-0 flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase font-mono text-[#d8cfc4] hover:text-amber-400 transition-colors"
          >
            <span>Conocer el Club</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400 group-hover:translate-y-0.5 transition-all">
              <ArrowDown className="w-3 h-3 text-amber-400" />
            </div>
          </a>

          <div className="text-[10px] sm:text-[11px] text-[#8d9299] font-mono hidden md:block">
            DURAZNO · URUGUAY
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

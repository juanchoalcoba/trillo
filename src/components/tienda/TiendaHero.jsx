import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowDown, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function TiendaHero() {
  const containerRef = useRef(null);

  // Parallax suave al hacer scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[75vh] sm:min-h-[82vh] flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden text-center"
    >
      {/* 1. Grand Background Graphic: transtrillo.png con Parallax & Ambient Glow */}
      <motion.div
        style={{ y: yBackground, scale: scaleBackground }}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center"
      >
        {/* Glows ambientales sutiles */}
        <div className="absolute w-[500px] sm:w-[850px] h-[500px] sm:h-[850px] bg-violet-600/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none translate-y-20" />

        {/* Emblema geométrico transtrillo.png a escala monumental */}
        <motion.img
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 0.16, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src="/transtrillo.png"
          alt="Trillo Graphic"
          className="w-auto h-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[55vw] lg:max-w-[48vw] max-h-[85%] object-contain filter invert brightness-200 contrast-125 select-none pointer-events-none drop-shadow-[0_0_60px_rgba(168,85,247,0.18)]"
        />

        {/* Degradés de fundido para mantener contraste perfecto */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/90 via-transparent to-[#08090a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090a_88%)] opacity-75" />
      </motion.div>

      {/* 2. Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-2.5 text-xs text-[#8d9299] max-w-5xl mx-auto w-full"
      >
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-mono text-[#f5f4f0] uppercase tracking-wider text-[11px]">
            Indumentaria Deportiva & Lifestyle · Durazno
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[11px] text-[#8d9299]">Envíos a todo Uruguay</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-[#8d9299]">
          <div className="flex items-center gap-1.5 text-violet-400">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Colección 2026/2027</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Main Core */}
      <div className="relative z-10 my-auto py-3 sm:py-5 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md mb-3 sm:mb-4"
        >
          <Sparkles className="w-3 h-3 text-violet-400" />
          <span className="font-mono uppercase tracking-[0.25em] text-[10px] text-[#f5f4f0] font-semibold">
            Vanguardia & Identidad Trillo
          </span>
        </motion.div>

        {/* Logo Trillo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2 sm:mb-3"
        >
          <img
            src="/logoTrillo.png"
            alt="TRILLO"
            className="w-auto h-auto max-w-[170px] sm:max-w-[210px] md:max-w-[250px] max-h-[55px] sm:max-h-[65px] md:max-h-[75px] object-contain drop-shadow-[0_8px_35px_rgba(0,0,0,0.9)] mx-auto pointer-events-none"
            draggable="false"
          />
        </motion.div>

        {/* Título Monumental */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto px-2"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-['Space_Grotesk'] font-black uppercase text-[#f5f4f0] tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            TIENDA OFICIAL
          </h1>
          <p className="mt-2 sm:mt-2.5 text-lg sm:text-2xl font-['Newsreader'] italic font-light text-violet-300 drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]">
            Indumentaria técnica y streetwear con identidad de Durazno
          </p>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#d8cfc4] font-normal leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Remeras de carrera ultralivianas, indumentaria oficial del Club de Corredores y prendas urbanas oversize de algodón pesado.
          </p>
        </motion.div>
      </div>

      {/* 4. Bottom Bar con Beneficios */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-white/10 max-w-5xl mx-auto w-full"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#8d9299] font-mono">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-violet-400" />
            Envíos a todo el país (DAC / Mirtrans)
          </span>
          <span className="text-white/20 hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
            Cambio de talle garantizado
          </span>
        </div>

        <a
          href="#catalogo"
          className="group flex items-center gap-2 text-[11px] tracking-widest uppercase font-mono text-[#d8cfc4] hover:text-violet-400 transition-colors"
        >
          <span>Ver Colección</span>
          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-violet-400 group-hover:translate-y-0.5 transition-all">
            <ArrowDown className="w-3.5 h-3.5 text-violet-400" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

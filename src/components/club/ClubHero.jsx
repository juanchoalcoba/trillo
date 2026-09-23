import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles, MapPin, ArrowDown, Footprints, ShieldCheck } from 'lucide-react';

export default function ClubHero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 md:pt-32 pb-8 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-900/10 pb-4 text-xs text-amber-950/70"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
          <span className="font-mono uppercase tracking-wider font-semibold text-stone-900 text-[11px]">
            Comunidad Activa · Durazno
          </span>
          <span className="text-amber-900/20">|</span>
          <span className="text-[11px] font-mono hidden sm:inline text-amber-800">
            33°22'S 56°31'W · Ribera Río Yí
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-amber-900/80">
          <Sun className="w-3.5 h-3.5 text-amber-600" />
          <span>Atardecer en vivo</span>
        </div>
      </motion.div>

      {/* Hero Central Block */}
      <div className="my-auto py-6 md:py-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-amber-900/10 text-xs font-medium text-amber-900 mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span className="tracking-widest uppercase text-[10px] font-mono font-semibold">
            Expresión Cotidiana de Universo Trillo
          </span>
        </motion.div>

        {/* Título Monumental Luminoso */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-[11vw] md:text-[9vw] lg:text-[6.8rem] font-black tracking-[-0.03em] uppercase font-['Outfit'] leading-[0.88] text-stone-900 select-none"
          >
            CLUB DE CORREDORES
          </motion.h1>
        </div>

        {/* Subtítulo & Manifiesto Oficial */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Newsreader'] italic font-normal text-amber-950 leading-tight">
              El deporte como estilo de vida<span className="text-amber-600">.</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-stone-700 font-normal leading-relaxed">
              Somos una comunidad que entendemos la actividad física como una forma de vivir.
              Entrenamos en entornos naturales para todas las edades: estimulando el movimiento
              cotidiano y pregonando el cuidado y la conservación de nuestra tierra.
            </p>
          </motion.div>

          {/* Disciplinas Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-2 lg:justify-end"
          >
            <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/10 text-xs font-semibold text-stone-800 shadow-sm">
              • Running
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/10 text-xs font-semibold text-stone-800 shadow-sm">
              • Trail Running
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/10 text-xs font-semibold text-stone-800 shadow-sm">
              • Funcional
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/10 text-xs font-semibold text-stone-800 shadow-sm">
              • Trekking
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Sync Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="flex items-center justify-between pt-4 border-t border-amber-900/10"
      >
        <div className="text-[11px] text-amber-950/70 font-mono hidden sm:block">
          DURAZNO · URUGUAY · ENTORNO NATURAL
        </div>

        <div className="flex items-center gap-3 mx-auto sm:mx-0 text-xs font-mono text-amber-900">
          <span className="tracking-widest uppercase text-[11px] font-semibold">
            Desliza para ver la caída del sol sobre el Río Yí
          </span>
          <div className="w-7 h-7 rounded-full bg-amber-600/15 border border-amber-600/30 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 text-amber-700" />
          </div>
        </div>

        <div className="text-[11px] text-amber-950/70 font-mono hidden md:block">
          EDICIÓN CONTINUA 2026/2027
        </div>
      </motion.div>
    </section>
  );
}

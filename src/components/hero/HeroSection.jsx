import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX, Sparkles, MapPin, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);
  const [noiseNode, setNoiseNode] = useState(null);

  // Sintetizador procedural de viento sutil de campo con Web Audio API
  const toggleAmbientSound = () => {
    if (!ambientAudio) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Buffer de ruido blanco con filtro paso bajo para simular brisa de campo
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start(0);

        setAudioCtx(ctx);
        setNoiseNode(whiteNoise);
        setAmbientAudio(true);
      } catch (e) {
        console.error('Audio not available', e);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
      }
      setAmbientAudio(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:h-screen flex flex-col justify-between pt-20 md:pt-24 pb-4 md:pb-6 px-4 md:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Meta Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 md:pb-4 text-xs text-[#8d9299]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-ping" />
          <span className="font-mono text-[#f5f4f0] uppercase tracking-wider text-[11px]">
            Universo en movimiento
          </span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline text-[11px]">Interior de Uruguay</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#e87a38]" />
            <span>Durazno · Río Yí</span>
          </div>

          {/* Botón de Sonido Ambiental Procedural */}
          <button
            onClick={toggleAmbientSound}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 hover:border-[#e87a38]/50 text-[#f5f4f0] text-[11px] transition-all duration-300 hover:bg-white/5"
            title="Activar atmósfera de brisa de campo"
          >
            {ambientAudio ? (
              <>
                <Volume2 className="w-3 h-3 text-[#e87a38] animate-pulse" />
                <span className="text-[#e87a38] font-mono">Atmósfera activa</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-[#8d9299]" />
                <span className="font-mono text-[#8d9299]">Activar sonido</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Hero Central Content */}
      <div className="my-auto py-2 md:py-4 text-center md:text-left flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-3 md:mb-4 w-fit mx-auto md:mx-0"
        >
          <Sparkles className="w-3 h-3 text-[#e87a38]" />
          <span className="tracking-widest uppercase text-[10px] font-mono">
            Una filosofía de vida
          </span>
        </motion.div>

        {/* Título Monumental TRILLO */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="text-[14vw] md:text-[11vw] lg:text-[8rem] xl:text-[9.2rem] font-black tracking-[-0.04em] uppercase font-['Outfit'] leading-[0.82] text-transparent bg-clip-text bg-gradient-to-b from-[#f5f4f0] via-[#eceae5] to-[#8d9299] select-none"
          >
            TRILLO
          </motion.h1>
        </div>

        {/* Fila Manifiesto + Tres Items Alineados */}
        <div className="mt-4 md:mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-8">
          {/* Párrafo y Manifiesto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Newsreader'] italic font-light text-[#f5f4f0] leading-tight">
              Animate a vivir<span className="text-[#e87a38]">.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-[15px] text-[#8d9299] font-normal leading-relaxed">
              Nacidos en el interior de Uruguay para reivindicar una manera más simple,
              auténtica y activa de vivir: salir, moverse, conocer, compartir, desafiarse y
              reconectar con la tierra.
            </p>
          </motion.div>

          {/* Tres Items Alineados en Hilera Horizontal Prolija */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap sm:flex-row items-center gap-2.5 lg:justify-end"
          >
            <a
              href="#eventos"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-panel text-xs text-[#f5f4f0] border border-white/10 hover:border-[#e87a38]/50 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <span className="w-2 h-2 rounded-full bg-[#e87a38] group-hover:scale-125 transition-transform" />
              <span className="font-semibold tracking-wide">Trillo Eventos</span>
              <span className="text-[#8d9299] text-[11px] font-mono">· Carreras</span>
            </a>

            <a
              href="#aventuras"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-panel text-xs text-[#f5f4f0] border border-white/10 hover:border-[#4ade80]/50 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <span className="w-2 h-2 rounded-full bg-[#4ade80] group-hover:scale-125 transition-transform" />
              <span className="font-semibold tracking-wide">Trillo Aventuras</span>
              <span className="text-[#8d9299] text-[11px] font-mono">· Territorio</span>
            </a>

            <Link
              to="/club"
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-panel text-xs text-[#f5f4f0] border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300 group shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
              <span className="font-semibold tracking-wide">El Club</span>
              <span className="text-amber-300 text-[11px] font-mono">· Entrar</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/10"
      >
        <div className="text-[11px] text-[#8d9299] font-mono hidden sm:block">
          EXPERIENCIAS · COMUNIDAD · NATURALEZA
        </div>

        <a
          href="#about"
          className="group mx-auto sm:mx-0 flex items-center gap-2.5 text-[11px] tracking-widest uppercase font-mono text-[#d8cfc4] hover:text-[#e87a38] transition-colors duration-300"
        >
          <span>Descubrir el Universo</span>
          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#e87a38] group-hover:translate-y-0.5 transition-all duration-300">
            <ArrowDown className="w-3 h-3 text-[#e87a38]" />
          </div>
        </a>

        <div className="text-[11px] text-[#8d9299] font-mono hidden md:block">
          EDICIÓN 2026/2027
        </div>
      </motion.div>
    </section>
  );
}

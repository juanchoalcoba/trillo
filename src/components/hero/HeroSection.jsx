import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX, Sparkles, MapPin, Play } from 'lucide-react';

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
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Meta Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs text-[#8d9299]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-ping" />
          <span className="font-mono text-[#f5f4f0] uppercase tracking-wider">
            Universo en movimiento
          </span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline">Interior de Uruguay</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 font-mono">
            <MapPin className="w-3.5 h-3.5 text-[#e87a38]" />
            <span>Durazno · Río Yí</span>
          </div>

          {/* Botón de Sonido Ambiental Procedural */}
          <button
            onClick={toggleAmbientSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#e87a38]/50 text-[#f5f4f0] text-[11px] transition-all duration-300 hover:bg-white/5"
            title="Activar atmósfera de brisa de campo"
          >
            {ambientAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#e87a38] animate-pulse" />
                <span className="text-[#e87a38] font-mono">Atmósfera activa</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#8d9299]" />
                <span className="font-mono text-[#8d9299]">Activar sonido</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Hero Central Content */}
      <div className="my-auto py-12 lg:py-16 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e87a38]" />
          <span className="tracking-widest uppercase text-[11px] font-mono">
            Una filosofía de vida
          </span>
        </motion.div>

        {/* Título Monumental TRILLO */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-[17vw] md:text-[14vw] lg:text-[11.5rem] font-black tracking-[-0.04em] uppercase font-['Outfit'] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-[#f5f4f0] via-[#eceae5] to-[#8d9299] select-none"
          >
            TRILLO
          </motion.h1>
        </div>

        {/* Manifiesto Central "ANIMATE A VIVIR" */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Newsreader'] italic font-light text-[#f5f4f0] leading-tight">
              Animate a vivir<span className="text-[#e87a38]">.</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#8d9299] font-normal leading-relaxed max-w-xl">
              Nacidos en el interior de Uruguay para reivindicar una manera más simple,
              auténtica y activa de vivir: salir, moverse, conocer, compartir, desafiarse y
              reconectar con la tierra.
            </p>
          </motion.div>

          {/* Quick Tríada Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="flex flex-wrap md:flex-col gap-3 justify-center md:items-end"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-panel text-xs text-[#f5f4f0]">
              <span className="w-2 h-2 rounded-full bg-[#e87a38]" />
              <span className="font-semibold tracking-wide">Trillo Eventos</span>
              <span className="text-[#8d9299] text-[11px]">· Carreras</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-panel text-xs text-[#f5f4f0]">
              <span className="w-2 h-2 rounded-full bg-[#2e4033]" />
              <span className="font-semibold tracking-wide">Trillo Aventuras</span>
              <span className="text-[#8d9299] text-[11px]">· Territorio</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass-panel text-xs text-[#f5f4f0]">
              <span className="w-2 h-2 rounded-full bg-[#d8cfc4]" />
              <span className="font-semibold tracking-wide">El Club</span>
              <span className="text-[#8d9299] text-[11px]">· Comunidad</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="flex items-center justify-between pt-8 border-t border-white/10"
      >
        <div className="text-xs text-[#8d9299] font-mono hidden sm:block">
          EXPERIENCIAS · COMUNIDAD · NATURALEZA
        </div>

        <a
          href="#about"
          className="group mx-auto sm:mx-0 flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-[#d8cfc4] hover:text-[#e87a38] transition-colors duration-300"
        >
          <span>Descubrir el Universo</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#e87a38] group-hover:translate-y-1 transition-all duration-300">
            <ArrowDown className="w-3.5 h-3.5 text-[#e87a38]" />
          </div>
        </a>

        <div className="text-xs text-[#8d9299] font-mono hidden md:block">
          EDICIÓN 2026/2027
        </div>
      </motion.div>
    </section>
  );
}

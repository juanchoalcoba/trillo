import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX, Sparkles, MapPin, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [ambientAudio, setAmbientAudio] = useState(false);
  const audioCtxRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Sintetizador procedural de brisa de campo con Web Audio API
  const toggleAmbientSound = async () => {
    if (!ambientAudio) {
      try {
        let ctx = audioCtxRef.current;
        if (!ctx || ctx.state === 'closed') {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          ctx = new AudioContextClass();
          audioCtxRef.current = ctx;
        }

        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        // Simulación de viento sutil con filtro paso bajo y ruido blanco
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Filtro browniano suave para sonido de viento natural y orgánico
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        // Fade in suave
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.6);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start(0);

        sourceNodeRef.current = whiteNoise;
        gainNodeRef.current = gain;
        setAmbientAudio(true);
      } catch (e) {
        console.error('Audio not available', e);
      }
    } else {
      try {
        if (gainNodeRef.current && audioCtxRef.current && audioCtxRef.current.state === 'running') {
          const ctx = audioCtxRef.current;
          gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
          setTimeout(() => {
            if (sourceNodeRef.current) {
              try {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
              } catch (_) {}
              sourceNodeRef.current = null;
            }
          }, 450);
        } else if (audioCtxRef.current) {
          audioCtxRef.current.close().catch(() => {});
          audioCtxRef.current = null;
        }
      } catch (e) {
        console.error('Error closing audio', e);
      }
      setAmbientAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[580px] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-4 md:pb-6 px-4 md:px-8 max-w-7xl mx-auto z-10"
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
            type="button"
            onClick={toggleAmbientSound}
            className="relative z-30 cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 hover:border-[#e87a38]/50 text-[#f5f4f0] text-[11px] transition-all duration-300 hover:bg-white/10 active:scale-95 select-none"
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
      <div className="my-auto py-2 md:py-3 text-center md:text-left flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-2 sm:mb-3 w-fit mx-auto md:mx-0"
        >
          <Sparkles className="w-3 h-3 text-[#e87a38]" />
          <span className="tracking-widest uppercase text-[10px] font-mono">
            Una filosofía de vida
          </span>
        </motion.div>

        {/* Título Monumental TRILLO (Tipografía y trazo auténtico con escala equilibrada) */}
        <div className="overflow-hidden py-1">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex items-center justify-center md:justify-start select-none"
          >
            <span className="sr-only">TRILLO</span>
            <img
              src="/trillo-logo.png"
              alt="TRILLO"
              className="w-auto h-auto max-w-[210px] sm:max-w-[290px] md:max-w-[360px] lg:max-w-[430px] xl:max-w-[470px] max-h-[85px] sm:max-h-[110px] md:max-h-[130px] lg:max-h-[150px] object-contain drop-shadow-[0_4px_25px_rgba(255,255,255,0.08)] pointer-events-none"
              draggable="false"
            />
          </motion.h1>
        </div>

        {/* Fila Manifiesto + Tres Items Alineados */}
        <div className="mt-3 md:mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-6">
          {/* Párrafo y Manifiesto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl text-left"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-['Newsreader'] italic font-light text-[#f5f4f0] leading-tight">
              Animate a vivir<span className="text-[#e87a38]">.</span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#8d9299] font-normal leading-relaxed">
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
            className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 lg:justify-end shrink-0"
          >
            <a
              href="#eventos"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl glass-panel text-xs text-[#f5f4f0] border border-white/10 hover:border-[#e87a38]/50 hover:bg-white/[0.04] transition-all duration-300 group whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#e87a38] group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">Trillo Eventos</span>
              <span className="text-[#8d9299] text-[11px] font-mono">· Carreras</span>
            </a>

            <a
              href="#aventuras"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl glass-panel text-xs text-[#f5f4f0] border border-white/10 hover:border-[#4ade80]/50 hover:bg-white/[0.04] transition-all duration-300 group whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#4ade80] group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">Trillo Aventuras</span>
              <span className="text-[#8d9299] text-[11px] font-mono">· Territorio</span>
            </a>

            <Link
              to="/club"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl glass-panel text-xs text-[#f5f4f0] border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300 group shadow-sm whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shrink-0" />
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

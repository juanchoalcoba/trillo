import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX, Sparkles, MapPin, Play, Pause, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [ambientAudio, setAmbientAudio] = useState(false);
  const audioCtxRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Video State & Controls
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

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

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsVideoMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
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

      {/* Hero Central Content: Two-column layout with Space Between (Texts Left | Video Right) */}
      <div className="my-auto py-6 sm:py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
        {/* Left Column: Brand, Logo, Manifesto & Actions */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-3 sm:mb-4 w-fit"
          >
            <Sparkles className="w-3 h-3 text-[#e87a38]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">
              Una filosofía de vida
            </span>
          </motion.div>

          {/* Título Monumental TRILLO con el Logo Real en Alta Calidad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="mb-4 sm:mb-5 select-none"
          >
            <h1 className="sr-only">TRILLO</h1>
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="w-auto h-auto max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[380px] xl:max-w-[420px] max-h-[90px] sm:max-h-[115px] md:max-h-[135px] object-contain drop-shadow-[0_4px_30px_rgba(255,255,255,0.12)] pointer-events-none"
              draggable="false"
            />
          </motion.div>

          {/* Manifiesto y Copys */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="max-w-xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-['Newsreader'] italic font-light text-[#f5f4f0] leading-tight">
              Animate a vivir<span className="text-[#e87a38]">.</span>
            </h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#8d9299] font-normal leading-relaxed">
              Nacidos en el interior de Uruguay para reivindicar una manera más simple,
              auténtica y activa de vivir: salir, moverse, conocer, compartir, desafiarse y
              reconectar con la tierra.
            </p>
          </motion.div>

          {/* Tres Items / Accesos Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            <Link
              to="/eventos"
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl glass-panel text-xs text-[#f5f4f0] border border-white/10 hover:border-[#e87a38]/50 hover:bg-white/[0.04] transition-all duration-300 group whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#e87a38] group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">Trillo Eventos</span>
              <span className="text-[#8d9299] text-[11px] font-mono">· Carreras</span>
            </Link>

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

        {/* Right Column: High-Impact Hero Video Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-6 relative w-full flex items-center justify-center lg:justify-end"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute -inset-2 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-[#e87a38]/25 via-[#f49358]/10 to-transparent blur-3xl opacity-50 pointer-events-none -z-10" />

          {/* Cinematic Video Player Container */}
          <div className="relative w-full max-w-[620px] aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group backdrop-blur-md">
            {/* The Video */}
            <video
              ref={videoRef}
              src="/1003.mp4"
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              preload="auto"
              onCanPlay={(e) => {
                if (isVideoPlaying) {
                  e.currentTarget.play().catch(() => {});
                }
              }}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Subtle Gradient Overlays for Elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Top Badge: Status / Live Tag */}
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono text-[#f5f4f0] select-none">
              <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-pulse" />
              <span className="tracking-wider uppercase font-semibold">Trillo en Movimiento</span>
            </div>

            {/* Controls Bar (Glassmorphic) */}
            <div className="absolute bottom-3 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 z-20 flex items-center justify-between pointer-events-auto">
              {/* Play / Pause & Mute controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVideoPlay}
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[#f5f4f0] hover:text-[#e87a38] transition-all duration-300 active:scale-95 cursor-pointer"
                  title={isVideoPlaying ? 'Pausar video' : 'Reproducir video'}
                  aria-label={isVideoPlaying ? 'Pausar video' : 'Reproducir video'}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleVideoMute}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[#f5f4f0] transition-all duration-300 active:scale-95 cursor-pointer text-[10px] sm:text-[11px] font-mono"
                  title={isVideoMuted ? 'Activar sonido del video' : 'Silenciar sonido'}
                  aria-label={isVideoMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isVideoMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-[#8d9299]" />
                      <span className="text-[#8d9299] hidden sm:inline">Silenciado</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#e87a38] animate-pulse" />
                      <span className="text-[#e87a38] hidden sm:inline">Sonido ON</span>
                    </>
                  )}
                </button>
              </div>

              {/* Fullscreen button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/15 text-[#f5f4f0] hover:text-[#e87a38] transition-all duration-300 active:scale-95 cursor-pointer"
                title="Ver en pantalla completa"
                aria-label="Pantalla completa"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Loop Timeline Progress Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#e87a38] to-[#f49358] transition-all duration-200 ease-linear shadow-[0_0_8px_rgba(232,122,56,0.8)]"
                style={{ width: `${videoProgress}%` }}
              />
            </div>
          </div>
        </motion.div>
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


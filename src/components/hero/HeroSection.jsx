import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX, Sparkles, MapPin, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLOUDINARY_MEDIA } from '../../config/cloudinary';

export default function HeroSection() {
  const [ambientAudio, setAmbientAudio] = useState(false);
  const audioCtxRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Video State & Controls
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[540px] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#08090a]"
    >
      {/* 1. Full-Bleed Background Video - Bright, Crisp & Cinematic */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          src={CLOUDINARY_MEDIA.HERO_VIDEO}
          poster={CLOUDINARY_MEDIA.HERO_VIDEO_POSTER}
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          preload="metadata"
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          className="w-full h-full object-cover scale-100 transition-opacity duration-700"
        />

        {/* Capa de oscurecimiento suave para resaltar el video manteniendo contraste de texto */}
        <div className="absolute inset-0 bg-[#08090a]/40" />

        {/* Degradé superior para navbar y degradé inferior para fundir con la página */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a]/75 via-transparent to-[#08090a]/85" />

        {/* Viñeta sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090a_90%)] opacity-40" />
      </div>

      {/* 2. Foreground Hero Content Flow - Perfectly Proportionate to Screen */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col justify-between pt-24 sm:pt-28 pb-3 md:pb-4 px-4 md:px-8">
        {/* Top Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 text-xs text-[#8d9299] shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-ping" />
            <span className="font-mono text-[#f5f4f0] uppercase tracking-wider text-[10px] sm:text-[11px]">
              Universo en movimiento
            </span>
            <span className="text-white/20">|</span>
            <span className="hidden sm:inline text-[11px]">Interior de Uruguay</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#e87a38]" />
              <span>Durazno · Río Yí</span>
            </div>

            {/* Control de Sonido del Video */}
            <button
              type="button"
              onClick={toggleVideoMute}
              className="relative z-30 cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 hover:border-[#e87a38]/80 text-[#f5f4f0] text-[10px] sm:text-[11px] transition-all duration-300 bg-black/50 hover:bg-black/70 active:scale-95 select-none backdrop-blur-md shadow-sm"
              title={isVideoMuted ? 'Activar audio del video' : 'Silenciar audio'}
            >
              {isVideoMuted ? (
                <>
                  <VolumeX className="w-3 h-3 text-[#d8cfc4]" />
                  <span className="font-mono text-[#d8cfc4]">Audio OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 text-[#e87a38] animate-pulse" />
                  <span className="text-[#e87a38] font-mono font-medium">Audio ON</span>
                </>
              )}
            </button>

            {/* Botón de Sonido Brisa de Campo */}
            <button
              type="button"
              onClick={toggleAmbientSound}
              className="hidden md:flex relative z-30 cursor-pointer items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 hover:border-[#e87a38]/50 text-[#f5f4f0] text-[10px] sm:text-[11px] transition-all duration-300 bg-black/30 hover:bg-black/50 active:scale-95 select-none"
              title="Activar atmósfera de brisa de campo"
            >
              {ambientAudio ? (
                <>
                  <Volume2 className="w-3 h-3 text-[#e87a38] animate-pulse" />
                  <span className="text-[#e87a38] font-mono">Brisa ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-[#8d9299]" />
                  <span className="font-mono text-[#8d9299]">Brisa</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Hero Central Monumental Content (Scales to fit viewport) */}
        <div className="my-auto py-2 sm:py-3 text-center flex flex-col items-center justify-center max-w-3xl mx-auto shrink">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full glass-pill text-[10px] sm:text-xs font-medium text-[#f5f4f0] mb-2 sm:mb-3 shadow-lg bg-black/40 backdrop-blur-md border border-white/15"
          >
            <Sparkles className="w-3 h-3 text-[#e87a38]" />
            <span className="tracking-widest uppercase font-mono">
              Una filosofía de vida
            </span>
          </motion.div>

          {/* Logo Principal TRILLO (Alta Calidad Real con Mayor Presencia) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mb-2 sm:mb-2.5 select-none"
          >
            <h1 className="sr-only">TRILLO</h1>
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="w-auto h-auto max-w-[250px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[460px] max-h-[85px] sm:max-h-[105px] md:max-h-[125px] lg:max-h-[135px] object-contain drop-shadow-[0_8px_35px_rgba(0,0,0,0.9)] pointer-events-none"
              draggable="false"
            />
          </motion.div>

          {/* Manifiesto y Frase Principal con fuerte sombra para legibilidad cristalina */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-2xl px-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Newsreader'] italic font-light text-[#f5f4f0] leading-tight drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]">
              Animate a vivir<span className="text-[#e87a38]">.</span>
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-[#f5f4f0]/90 font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-lg mx-auto">
              El deporte, la aventura y la naturaleza como estilo de vida
            </p>
          </motion.div>

          {/* Cuatro Items / Accesos Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          >
            <Link
              to="/eventos"
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-xs sm:text-sm text-[#f5f4f0] border border-white/20 hover:border-[#e87a38] transition-all duration-300 group shadow-lg backdrop-blur-md whitespace-nowrap active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-[#e87a38] group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">Eventos</span>
            </Link>

            <Link
              to="/aventuras"
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-xs sm:text-sm text-[#f5f4f0] border border-white/20 hover:border-[#4ade80] transition-all duration-300 group shadow-lg backdrop-blur-md whitespace-nowrap active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-[#4ade80] group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">Aventuras</span>
            </Link>

            <Link
              to="/club"
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-xs sm:text-sm text-[#f5f4f0] border border-amber-500/60 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300 group shadow-lg backdrop-blur-md whitespace-nowrap active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">El Club</span>
            </Link>

            <Link
              to="/tienda"
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/60 hover:bg-black/80 text-xs sm:text-sm text-[#f5f4f0] border border-violet-500/60 hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300 group shadow-lg backdrop-blur-md whitespace-nowrap active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-violet-400 group-hover:scale-125 transition-transform shrink-0" />
              <span className="font-semibold tracking-wide">TiendaTrillo</span>
            </Link>
          </motion.div>

          {/* Canales Oficiales y Redes Sociales */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2 sm:gap-2.5"
          >
            {/* Instagram */}
            <a
              href="https://www.instagram.com/trillo.uy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial @trillo.uy"
              title="Instagram @trillo.uy"
              className="p-2 sm:p-2.5 rounded-xl bg-black/50 hover:bg-black/80 border border-white/15 hover:border-[#e87a38] text-[#d8cfc4] hover:text-[#e87a38] transition-all duration-300 shadow-md backdrop-blur-md hover:scale-110 active:scale-95 group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:scale-105"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/59898121608?text=Hola%20Trillo!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp oficial Trillo (+598 98 121 608)"
              title="WhatsApp Trillo"
              className="p-2 sm:p-2.5 rounded-xl bg-black/50 hover:bg-black/80 border border-white/15 hover:border-[#4ade80] text-[#d8cfc4] hover:text-[#4ade80] transition-all duration-300 shadow-md backdrop-blur-md hover:scale-110 active:scale-95 group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:scale-105"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label="YouTube oficial Trillo (Próximamente)"
              title="YouTube Trillo (Próximamente)"
              className="p-2 sm:p-2.5 rounded-xl bg-black/50 hover:bg-black/80 border border-white/15 hover:border-red-500/80 text-[#d8cfc4] hover:text-red-500 transition-all duration-300 shadow-md backdrop-blur-md hover:scale-110 active:scale-95 group cursor-pointer"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:scale-105"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar & Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-between pt-2 border-t border-white/10 shrink-0"
        >
          <div className="text-[10px] sm:text-[11px] text-[#8d9299] font-mono hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38] animate-pulse" />
            <span>EXPERIENCIAS · COMUNIDAD · NATURALEZA</span>
          </div>

          <a
            href="#about"
            className="group mx-auto sm:mx-0 flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase font-mono text-[#d8cfc4] hover:text-[#e87a38] transition-colors duration-300"
          >
            <span>Descubrir el Universo</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#e87a38] group-hover:translate-y-0.5 transition-all duration-300">
              <ArrowDown className="w-3 h-3 text-[#e87a38]" />
            </div>
          </a>

          <div className="text-[10px] sm:text-[11px] text-[#8d9299] font-mono hidden md:block">
            EDICIÓN 2026/2027
          </div>
        </motion.div>
      </div>
    </section>
  );
}


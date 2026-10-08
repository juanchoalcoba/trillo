import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Grid,
  Film,
  Flame,
} from 'lucide-react';
import { EVENTOS_GALLERIES } from '../../data/galeriasData';

const TABS = [
  {
    key: 'rebollo',
    label: 'Desafío Rebollo',
    tag: 'Trail & Sierras',
    badgeColor: 'bg-[#e87a38]/15 text-[#e87a38] border-[#e87a38]/30',
    activeBorder: 'border-[#e87a38]',
    accentHex: '#e87a38',
    subtitle: 'El rugir de la tierra en las sierras de San Pedro.',
  },
  {
    key: 'laberinto',
    label: 'Laberinto',
    tag: 'Cross Country',
    badgeColor: 'bg-amber-400/15 text-amber-400 border-amber-400/30',
    activeBorder: 'border-amber-400',
    accentHex: '#fbbf24',
    subtitle: 'Circuitos técnicos y adrenalina entre el monte nativo.',
  },
  {
    key: 'sanpedro',
    label: 'San Pedro',
    tag: 'Corrida Nocturna',
    badgeColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    activeBorder: 'border-orange-500',
    accentHex: '#f97316',
    subtitle: 'La marea de linternas, antorchas y fuego en la meta.',
  },
];

export default function EventosGallery() {
  const [activeTab, setActiveTab] = useState('rebollo');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState('featured'); // 'featured' | 'grid'

  const currentGallery = EVENTOS_GALLERIES[activeTab] || [];
  const currentTabMeta = TABS.find((t) => t.key === activeTab) || TABS[0];
  const activeImage = currentGallery[currentIndex] || currentGallery[0];

  // Resetea el índice al cambiar de pestaña
  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    if (currentGallery.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const prevSlide = () => {
    if (currentGallery.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightbox = () => {
    if (currentGallery.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const prevLightbox = () => {
    if (currentGallery.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  // Bloqueo de scroll y atajos de teclado para el Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    if (window.lenis) window.lenis.stop();
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouch;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, currentGallery.length]);

  return (
    <section id="galeria" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* 1. Cabecera Principal */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-3 border border-[#e87a38]/30">
            <Camera className="w-3.5 h-3.5 text-[#e87a38]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">
              Fotografía Oficial en Territorio
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Space_Grotesk'] uppercase text-[#f5f4f0] tracking-tight">
            MOMENTOS <span className="font-['Space_Grotesk'] font-medium text-[#e87a38]">REALES</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#8d9299] max-w-xl">
            Capturas auténticas de cada carrera. Hacé click en cualquier imagen para abrirla en alta definición.
          </p>
        </div>

        {/* Selector de Modo (Destacado / Mosaico) */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/10 self-start md:self-end">
          <button
            type="button"
            onClick={() => setViewMode('featured')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'featured'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-[#8d9299] hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cinemático</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'grid'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-[#8d9299] hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Cuadrícula</span>
          </button>
        </div>
      </div>

      {/* 2. Tres Subpestañas por Categoría */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = (EVENTOS_GALLERIES[tab.key] || []).length;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={`relative p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between group cursor-pointer ${
                isActive
                  ? `bg-[#0f1115] ${tab.activeBorder} shadow-lg shadow-black/50`
                  : 'bg-[#0a0c0f]/60 border-white/10 hover:border-white/20 hover:bg-[#0f1115]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${tab.badgeColor}`}>
                  {tab.tag}
                </span>
                <span className="text-[11px] font-mono text-[#8d9299]">
                  {count} {count === 1 ? 'foto' : 'fotos'}
                </span>
              </div>

              <div>
                <h3 className={`font-bold font-['Space_Grotesk'] text-base sm:text-lg transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                }`}>
                  {tab.label}
                </h3>
                <p className="text-[11px] text-[#8d9299] mt-0.5 truncate">
                  {tab.subtitle}
                </p>
              </div>

              {isActive && (
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ backgroundColor: tab.accentHex }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Contenido de la Galería Según Modo */}
      {viewMode === 'featured' ? (
        /* VISTA CINEMÁTICA: Visor Grande + Tira de Miniaturas */
        <div className="space-y-4">
          {/* Visor Principal Destacado */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0a0c0f] border border-white/10 shadow-2xl group min-h-[380px] sm:min-h-[500px] md:min-h-[580px] flex items-center justify-center">
            {activeImage && (
              <img
                src={activeImage.full || activeImage.url}
                alt={activeImage.title}
                onClick={() => openLightbox(currentIndex)}
                className="w-full h-full max-h-[620px] object-cover object-center cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.01]"
                loading="eager"
              />
            )}

            {/* Overlay sutil para legibilidad de botones */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Barra superior de info */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                {currentTabMeta.label} · {currentIndex + 1} de {currentGallery.length}
              </span>

              <button
                type="button"
                onClick={() => openLightbox(currentIndex)}
                className="pointer-events-auto p-2.5 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105 active:scale-95"
                title="Ver a pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Flechas de Navegación del Visor */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Tira Horizontal de Miniaturas */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
            {currentGallery.map((img, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative rounded-xl overflow-hidden shrink-0 w-20 h-14 sm:w-24 sm:h-16 border-2 transition-all cursor-pointer ${
                    isCurrent
                      ? `${currentTabMeta.activeBorder} scale-105 shadow-md shadow-black/80 opacity-100`
                      : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.thumbnail || img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* VISTA CUADRÍCULA: Todas las fotos visibles en mosaico */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {currentGallery.map((img, idx) => (
            <motion.div
              key={img.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0d1015] border border-white/10 hover:border-white/30 cursor-pointer shadow-lg transition-all hover:-translate-y-1"
            >
              <img
                src={img.thumbnail || img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 4. Modal Lightbox a Pantalla Completa (Portal) */}
      {isLightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] bg-[#08090a]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Cabecera del Lightbox */}
            <div
              className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-white/10 text-white border border-white/10">
                  {currentTabMeta.label}
                </span>
                <span className="font-mono text-xs text-[#8d9299]">
                  {lightboxIndex + 1} / {currentGallery.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                aria-label="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen Central en Alta Resolución */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {currentGallery[lightboxIndex] && (
                <img
                  src={currentGallery[lightboxIndex].full || currentGallery[lightboxIndex].url}
                  alt={currentGallery[lightboxIndex].title}
                  className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              )}

              {/* Controles de Navegación */}
              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Pie del Lightbox */}
            <div
              className="flex items-center justify-center text-xs font-mono text-[#8d9299] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Usá las flechas del teclado (← / →) o Escape para cerrar</span>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

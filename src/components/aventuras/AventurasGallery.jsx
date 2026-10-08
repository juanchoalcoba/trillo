import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Compass,
  Grid,
  Film,
} from 'lucide-react';
import { AVENTURAS_GALLERY } from '../../data/galeriasData';

export default function AventurasGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'featured'

  const gallery = AVENTURAS_GALLERY || [];
  const activeImage = gallery[currentIndex] || gallery[0];

  const nextSlide = () => {
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightbox = () => {
    if (gallery.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevLightbox = () => {
    if (gallery.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
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
  }, [isLightboxOpen, gallery.length]);

  if (!gallery.length) return null;

  return (
    <section id="galeria-aventuras" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* 1. Cabecera Principal */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-3 border border-[#4ade80]/30">
            <Compass className="w-3.5 h-3.5 text-[#4ade80]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">
              Expediciones & Vuelo Aéreo
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Space_Grotesk'] uppercase text-[#f5f4f0] tracking-tight">
            EL TERRITORIO EN <span className="font-['Space_Grotesk'] font-medium text-[#4ade80]">IMÁGENES</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#8d9299] max-w-xl">
            Tomas aéreas de drone, senderos agrestes y travesías reales por la geografía de Durazno y el interior.
          </p>
        </div>

        {/* Selector de Modo (Mosaico / Cinemático) */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/10 self-start md:self-end">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'grid'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-[#8d9299] hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-[#4ade80]" />
            <span>Mosaico</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('featured')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === 'featured'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-[#8d9299] hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-[#4ade80]" />
            <span>Cinemático</span>
          </button>
        </div>
      </div>

      {/* 2. Contenido Según Modo */}
      {viewMode === 'grid' ? (
        /* VISTA MOSAICO: Grid dinámico con proporción fotográfica */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, idx) => (
            <motion.div
              key={img.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0c0f] border border-white/10 hover:border-[#4ade80]/50 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={img.thumbnail || img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-mono text-white/90">
                    Aventura #{idx + 1}
                  </span>
                  <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-[#4ade80]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* VISTA CINEMÁTICA: Visor Grande + Miniaturas */
        <div className="space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#0a0c0f] border border-white/10 shadow-2xl group min-h-[380px] sm:min-h-[520px] md:min-h-[600px] flex items-center justify-center">
            {activeImage && (
              <img
                src={activeImage.full || activeImage.url}
                alt={activeImage.title}
                onClick={() => openLightbox(currentIndex)}
                className="w-full h-full max-h-[620px] object-cover object-center cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.01]"
                loading="eager"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                Trillo Aventuras · {currentIndex + 1} de {gallery.length}
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

            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Miniaturas */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
            {gallery.map((img, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative rounded-xl overflow-hidden shrink-0 w-20 h-14 sm:w-24 sm:h-16 border-2 transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-[#4ade80] scale-105 shadow-md shadow-black/80 opacity-100'
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
      )}

      {/* 3. Modal Lightbox a Pantalla Completa */}
      {isLightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] bg-[#08090a]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30">
                  Trillo Aventuras
                </span>
                <span className="font-mono text-xs text-[#8d9299]">
                  {lightboxIndex + 1} / {gallery.length}
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

            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery[lightboxIndex] && (
                <img
                  src={gallery[lightboxIndex].full || gallery[lightboxIndex].url}
                  alt={gallery[lightboxIndex].title}
                  className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              )}

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

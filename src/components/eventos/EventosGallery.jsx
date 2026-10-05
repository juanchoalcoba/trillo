import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Mountain,
  Flame,
  Pause,
  Play,
} from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 'comunidad-trillo',
    category: 'Comunidad Trillo',
    title: 'La Tribu Trillo al Completo',
    subtitle: 'Plaza San Pedro · Celebración & Pertenencia',
    description:
      'Cientos de corredores, familias y amigos celebrando juntos después de cruzar la meta. La esencia de Trillo es el latido compartido de una comunidad unida por el movimiento.',
    image: '/eventosbg.png',
    telemetry: {
      altitud: '84m',
      clima: 'Clima Festivo',
      terreno: 'Plaza San Pedro',
      destacado: 'Más de 500 atletas reunidos',
    },
  },
  {
    id: 'rebollo-finish',
    category: 'Desafío Rebollo',
    title: 'El Gozo de la Meta en Familia',
    subtitle: 'Sierra Agreste · Llegada Emocionante',
    description:
      'Cruzar la meta con una sonrisa genuina, escoltado por los tuyos. El trail running es superación personal pero también compañía y recuerdos imborrables.',
    image: '/eventosverti.jpg',
    telemetry: {
      altitud: '110m',
      clima: 'Sol de Otoño',
      terreno: 'Sierra & Pista Natural',
      destacado: 'Finisher Trail Trillo',
    },
  },
  {
    id: 'start',
    category: 'Largada',
    title: 'La Marea Humana al Ocaso',
    subtitle: 'Km 0.0 · Plaza San Pedro · 18:30 HS',
    description:
      'Más de 400 corredores listos sobre el camino vecinal. El polvo dorado se eleva con los primeros pasos mientras el sol de Durazno baña las colinas.',
    image: '/images/events/san_pedro_start.jpg',
    telemetry: {
      altitud: '84m',
      clima: '19°C · Viento Sur',
      terreno: 'Balastro Compacto',
      destacado: 'Largada Conjunta 5K y 10K',
    },
  },
  {
    id: 'night',
    category: 'Noche & Laberinto',
    title: 'El Haz que Corta la Penumbra',
    subtitle: 'Km 8.4 · Monte Nativo · 20:15 HS',
    description:
      'La noche se cierra y las linternas frontales cobran vida. Cada respiración resuena en el sendero entre espinillos y cielo estrellado.',
    image: '/images/events/san_pedro_night.jpg',
    telemetry: {
      altitud: '142m',
      clima: '14°C · Cielo Despejado',
      terreno: 'Huella de Animal & Piedra',
      destacado: 'Tramo de Máxima Concentración',
    },
  },
  {
    id: 'finish',
    category: 'Meta & Antorchas',
    title: 'El Fuego de la Llegada',
    subtitle: 'Arco de Meta · San Pedro',
    description:
      'Cruzar el arco de madera flanqueado por antorchas encendidas y aplausos. La emoción compartida de haber dejado el alma en el terreno.',
    image: '/images/events/san_pedro_finish.jpg',
    telemetry: {
      altitud: '88m',
      clima: '13°C · Emoción Pura',
      terreno: 'Arco de Maduración Criolla',
      destacado: 'Abrazo Finisher con Antorchas',
    },
  },
  {
    id: 'community',
    category: 'Tercer Tiempo',
    title: 'La Ronda del Fuego Finisher',
    subtitle: 'Post-Carrera · Puesto Central',
    description:
      'El trail no termina en la meta: continúa alrededor de la fogata. Historias compartidas, hidratación, asado criollo y miradas cómplices.',
    image: '/images/events/san_pedro_community.jpg',
    telemetry: {
      altitud: '86m',
      clima: 'Calor de Hogar',
      terreno: 'Pasto & Fogón',
      destacado: 'Comunidad Trillo Unida',
    },
  },
  {
    id: 'kit',
    category: 'Kits & Medalla',
    title: 'Materia Noble: Madera Grabada',
    subtitle: 'Recuerdo Tangible · Pieza Única',
    description:
      'Cada medalla finisher es tallada en madera nativa recuperada y quemada a fuego vivo con el cuño oficial de los eventos Trillo.',
    image: '/images/events/san_pedro_kit.jpg',
    telemetry: {
      altitud: 'Artesanal',
      clima: 'Identidad Trillo',
      terreno: 'Madera & Yute',
      destacado: 'Finisher Oficial Trillo',
    },
  },
];

export default function EventosGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = derecha, -1 = izquierda
  const containerRef = useRef(null);

  const total = GALLERY_ITEMS.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Pase automático suave de izquierda a derecha cada 4 segundos
  useEffect(() => {
    if (isPaused || selectedImage) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, selectedImage, currentIndex]);

  // Bloquear el scroll de la página y Lenis mientras el modal está abierto
  useEffect(() => {
    if (selectedImage) {
      if (window.lenis) {
        window.lenis.stop();
      }
      const prevOverflow = document.body.style.overflow;
      const prevTouch = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const handleModalKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedImage(null);
        } else if (e.key === 'ArrowRight') {
          const nextIdx = (currentIndex + 1) % total;
          setCurrentIndex(nextIdx);
          setSelectedImage(GALLERY_ITEMS[nextIdx]);
        } else if (e.key === 'ArrowLeft') {
          const prevIdx = (currentIndex - 1 + total) % total;
          setCurrentIndex(prevIdx);
          setSelectedImage(GALLERY_ITEMS[prevIdx]);
        }
      };

      window.addEventListener('keydown', handleModalKeyDown);

      return () => {
        if (window.lenis) {
          window.lenis.start();
        }
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouch;
        window.removeEventListener('keydown', handleModalKeyDown);
      };
    } else {
      // Manejar flechas del teclado en el carrusel normal cuando no hay modal abierto
      const handleNormalKeyDown = (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      };
      window.addEventListener('keydown', handleNormalKeyDown);
      return () => window.removeEventListener('keydown', handleNormalKeyDown);
    }
  }, [selectedImage, currentIndex, total]);

  const currentItem = GALLERY_ITEMS[currentIndex];

  return (
    <section id="galeria" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Cabecera de la Sección con Controles */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-3 border border-[#e87a38]/30">
            <Sparkles className="w-3 h-3 text-[#e87a38]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">
              Galería Cinematográfica en Movimiento
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Space_Grotesk'] uppercase text-[#f5f4f0] tracking-tight">
            LA EXPERIENCIA <span className="font-['Newsreader'] italic font-light text-[#e87a38]">San Pedro</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#8d9299] max-w-xl">
            Pase fotográfico continuo del circuito, la noche y la comunidad. Podés deslizar, usar las flechas
            o hacer click en cualquier foto para abrirla en alta definición.
          </p>
        </div>

        {/* Controles de Navegación (Anterior / Pausa / Siguiente) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs font-mono text-[#8d9299] mr-2 hidden sm:block">
            <span className="text-[#f5f4f0] font-bold">{currentIndex + 1}</span> / {total}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-10 h-10 rounded-full glass-panel border border-white/10 flex items-center justify-center text-[#8d9299] hover:text-[#f5f4f0] hover:border-white/30 transition-all cursor-pointer"
            title={isPaused ? 'Reanudar pase automático' : 'Pausar pase automático'}
            aria-label={isPaused ? 'Reanudar pase' : 'Pausar pase'}
          >
            {isPaused ? <Play className="w-4 h-4 text-[#e87a38]" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={prevSlide}
            className="w-11 h-11 rounded-full glass-panel border border-white/10 hover:border-[#e87a38] flex items-center justify-center text-[#f5f4f0] hover:bg-white/5 transition-all cursor-pointer active:scale-95 group shadow-lg"
            title="Foto anterior (Flecha izquierda)"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="w-11 h-11 rounded-full bg-[#e87a38] hover:bg-[#f49358] flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 group shadow-lg shadow-[#e87a38]/25"
            title="Siguiente foto (Flecha derecha)"
            aria-label="Siguiente foto"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Visor Cinematográfico Principal (Sin cortes, fluido de izquierda a derecha) */}
      <div
        className="relative rounded-3xl glass-panel border border-white/10 bg-[#0d1015]/90 overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        ref={containerRef}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[520px]">
          {/* Lado Imagen con Transición Animada */}
          <div className="lg:col-span-7 relative overflow-hidden bg-black flex items-center justify-center min-h-[280px] sm:min-h-[380px] lg:min-h-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setSelectedImage(currentItem)}
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradiente Viñeta */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Badge Superior */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-black/60 backdrop-blur-md text-[#e87a38] border border-[#e87a38]/40">
                    {currentItem.category}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:bg-[#e87a38] group-hover:border-transparent transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Subtitle en la foto */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <p className="text-xs font-mono text-[#d8cfc4] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e87a38]" />
                    <span>{currentItem.subtitle}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Flechas directas sobre la imagen (en móvil y desktop) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#e87a38] hover:border-transparent transition-all cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#e87a38] hover:border-transparent transition-all cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Lado Contenido & Telemetría Detallada */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0d1015]/95 border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#8d9299] mb-3">
                <span className="text-[#e87a38] uppercase font-bold tracking-wider">
                  Foto {currentIndex + 1} de {total}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPaused ? 'bg-amber-400' : 'bg-[#4ade80] animate-pulse'
                    }`}
                  />
                  {isPaused ? 'Pausado' : 'Reproduciendo'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0] leading-tight">
                    {currentItem.title}
                  </h3>

                  <p className="text-xs font-mono text-[#e87a38] mt-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentItem.subtitle}</span>
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#8d9299] leading-relaxed font-sans">
                    {currentItem.description}
                  </p>

                  {/* Ficha Técnica de Telemetría */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d8cfc4] block mb-3">
                      Telemetría Registrada en Terreno
                    </span>

                    <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-[#8d9299] block text-[10px] uppercase">Altitud</span>
                        <span className="text-[#f5f4f0] font-bold flex items-center gap-1 mt-0.5">
                          <Mountain className="w-3.5 h-3.5 text-[#e87a38]" />
                          {currentItem.telemetry.altitud}
                        </span>
                      </div>

                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-[#8d9299] block text-[10px] uppercase">Clima / Hora</span>
                        <span className="text-[#f5f4f0] font-bold flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-[#e87a38]" />
                          {currentItem.telemetry.clima}
                        </span>
                      </div>

                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 col-span-2">
                        <span className="text-[#8d9299] block text-[10px] uppercase">Superficie & Hito</span>
                        <span className="text-[#e87a38] font-bold block mt-0.5">
                          {currentItem.telemetry.terreno} · {currentItem.telemetry.destacado}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector de Miniaturas Interactivas (Para pasar haciendo click) */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <span className="text-[10px] font-mono text-[#8d9299] uppercase tracking-wider block mb-2.5">
                Hacé click para cambiar de foto:
              </span>

              <div className="grid grid-cols-5 gap-2">
                {GALLERY_ITEMS.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => goToSlide(idx)}
                      className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#e87a38] scale-105 shadow-md shadow-[#e87a38]/30'
                          : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                      title={item.title}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#e87a38]/15 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Progreso Inferior */}
        <div className="h-1 w-full bg-white/5">
          <motion.div
            key={currentIndex}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '100%' : '100%' }}
            transition={{
              duration: isPaused ? 0 : 4,
              ease: 'linear',
            }}
            className="h-full bg-gradient-to-r from-[#e87a38] to-[#f49358]"
          />
        </div>
      </div>

      {/* Lightbox / Modal Fullscreen al hacer click (Renderizado directamente en document.body con z-[999999] y scroll bloqueado) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl"
                onClick={() => setSelectedImage(null)}
              >
                {/* Tarjeta del Modal Centrada */}
                <motion.div
                  initial={{ scale: 0.94, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 15 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                  className="relative max-w-4xl w-full rounded-2xl sm:rounded-3xl glass-panel bg-[#0d1015] border border-white/20 shadow-2xl flex flex-col md:flex-row max-h-[85vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Botón Cerrar (Cruz) SIEMPRE visible, integrado en la esquina superior derecha de la tarjeta */}
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-10 h-10 rounded-full bg-black/80 hover:bg-[#e87a38] text-white border border-white/30 hover:border-transparent flex items-center justify-center transition-all duration-200 shadow-2xl cursor-pointer group active:scale-90 backdrop-blur-md"
                    title="Cerrar ventana (Esc)"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5 text-white stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
                  </button>

                  {/* Imagen en HD con navegación */}
                  <div className="md:w-3/5 relative min-h-[240px] sm:min-h-[300px] md:min-h-[460px] bg-black flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Flechas dentro de la imagen del modal */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = (currentIndex - 1 + total) % total;
                        setCurrentIndex(nextIdx);
                        setSelectedImage(GALLERY_ITEMS[nextIdx]);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-[#e87a38] transition-colors cursor-pointer shadow-lg active:scale-90"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIdx = (currentIndex + 1) % total;
                        setCurrentIndex(nextIdx);
                        setSelectedImage(GALLERY_ITEMS[nextIdx]);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-[#e87a38] transition-colors cursor-pointer shadow-lg active:scale-90"
                      aria-label="Siguiente foto"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Badge contador sobre la imagen */}
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-mono text-white/90">
                      {currentIndex + 1} / {total}
                    </div>
                  </div>

                  {/* Ficha Técnica Lateral */}
                  <div className="md:w-2/5 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-[#0d1015]/95">
                    <div>
                      {/* Cabecera con padding derecho para no solapar la cruz */}
                      <div className="flex items-center justify-between gap-2 pr-12">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#e87a38]/20 text-[#e87a38] border border-[#e87a38]/40">
                          {selectedImage.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#8d9299]">San Pedro · UY</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-[#f5f4f0] mt-3 leading-tight">
                        {selectedImage.title}
                      </h3>

                      <p className="text-xs font-mono text-[#e87a38] mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{selectedImage.subtitle}</span>
                      </p>

                      <p className="mt-3 text-xs sm:text-sm text-[#8d9299] leading-relaxed">
                        {selectedImage.description}
                      </p>

                      {/* Telemetría */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                        <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#d8cfc4]">
                          Telemetría de Punto de Carrera
                        </h4>

                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                            <span className="text-[#8d9299] block text-[9px] uppercase">Altitud</span>
                            <span className="text-[#f5f4f0] font-bold text-xs">{selectedImage.telemetry.altitud}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                            <span className="text-[#8d9299] block text-[9px] uppercase">Condición</span>
                            <span className="text-[#f5f4f0] font-bold text-xs">{selectedImage.telemetry.clima}</span>
                          </div>
                          <div className="bg-white/5 p-2 rounded-xl border border-white/5 col-span-2">
                            <span className="text-[#8d9299] block text-[9px] uppercase">Superficie & Hito</span>
                            <span className="text-[#e87a38] font-bold text-xs block mt-0.5">
                              {selectedImage.telemetry.terreno} · {selectedImage.telemetry.destacado}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8d9299] font-mono">
                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="hover:text-[#e87a38] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
                        title="Cerrar modal"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cerrar</span>
                      </button>
                      <a
                        href="#inscripcion"
                        onClick={() => setSelectedImage(null)}
                        className="text-[#e87a38] hover:underline font-bold"
                      >
                        Inscribirme →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Shield,
  Trophy,
  Flame,
} from 'lucide-react';

export default function EventosDetailModal({ event, isOpen, onClose }) {
  // Manejo de tecla ESC y bloqueo total de scroll (incluido Lenis)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      if (window.lenis) {
        window.lenis.stop();
      }
      const prevOverflow = document.body.style.overflow;
      const prevTouch = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (window.lenis) {
          window.lenis.start();
        }
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouch;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!event) return null;

  const whatsappUrl = `https://wa.me/59898121608?text=${encodeURIComponent(event.whatsappMsg)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 pt-20 pb-6 sm:pt-24 sm:pb-8 overflow-hidden"
        >
          {/* Backdrop con blur profundo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-3xl bg-[#0c0e12] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[78vh] sm:max-h-[80vh] flex flex-col overscroll-contain"
          >
            {/* Header con imagen de portada */}
            <div className="relative h-36 sm:h-44 md:h-48 w-full shrink-0 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
              />

              {/* Degradé protector */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-[#0c0e12]/40 to-black/60" />

              {/* Botón Cerrar Siempre Visible y con Alto Contraste */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-black text-white border border-white/30 flex items-center justify-center transition-all backdrop-blur-md shadow-2xl active:scale-95"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges y Meta sobre la foto */}
              <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-bold ${event.accentBg}`}
                  >
                    {event.badge}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                    {event.season}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] leading-tight drop-shadow-md">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#d8cfc4] font-medium line-clamp-1">
                  {event.subtitle}
                </p>
              </div>
            </div>

            {/* Ficha Técnica / Métricas Rápidas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:px-6 border-b border-white/10 bg-[#08090a]/80 shrink-0">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <Calendar className="w-4 h-4 text-[#8d9299] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase text-[#8d9299]">Fecha</span>
                  <span className="text-xs font-semibold text-[#f5f4f0] truncate block">{event.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <TrendingUp className="w-4 h-4 text-[#8d9299] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase text-[#8d9299]">Desnivel</span>
                  <span className="text-xs font-semibold text-[#f5f4f0] truncate block">{event.elevation}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <MapPin className="w-4 h-4 text-[#8d9299] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase text-[#8d9299]">Lugar</span>
                  <span className="text-xs font-semibold text-[#f5f4f0] truncate block">{event.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                <Trophy className="w-4 h-4 text-[#8d9299] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase text-[#8d9299]">Dificultad</span>
                  <span className="text-xs font-semibold text-[#f5f4f0] truncate block">{event.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Contenido Scrolleable */}
            <div
              data-lenis-prevent="true"
              className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 min-h-0 overscroll-contain"
            >
              {/* Distancias Oficiales */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8d9299] mb-2 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5" style={{ color: event.accent }} />
                  Distancias Habilitadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.distances.map((dist, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/5 border border-white/10 text-white"
                    >
                      {dist}
                    </span>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8d9299] mb-2 flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5" style={{ color: event.accent }} />
                  Sobre la Competencia
                </h4>
                <p className="text-sm sm:text-base text-[#d8cfc4] leading-relaxed">
                  {event.description}
                </p>
                <div className="mt-2 text-xs font-mono text-[#8d9299]">
                  <span className="text-white font-semibold">Tipo de Terreno: </span>
                  {event.terrain}
                </div>
              </div>

              {/* Puntos Destacados */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8d9299] mb-3">
                  Puntos Clave del Evento
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {event.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: event.accent }}
                      />
                      <span className="text-xs sm:text-sm text-[#f5f4f0] leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cronograma de la Jornada */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8d9299] mb-3 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" style={{ color: event.accent }} />
                  Cronograma & Horarios Oficiales
                </h4>
                <div className="space-y-3 border-l-2 border-white/10 pl-4 ml-2">
                  {event.schedule.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full border-2 border-[#0c0e12]"
                        style={{ backgroundColor: event.accent }}
                      />
                      <span className="text-xs font-mono uppercase font-bold text-white block">
                        {step.time}
                      </span>
                      <p className="text-xs sm:text-sm text-[#8d9299] mt-0.5 leading-relaxed">
                        {step.activity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qué Incluye el Kit */}
              <div className="pt-3 border-t border-white/10">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-2.5 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5" style={{ color: event.accent }} />
                    ¿Qué Incluye la Inscripción y Kit del Corredor?
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {event.kitIncludes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#d8cfc4]">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer con CTA de Consulta Directa */}
            <div className="p-3.5 sm:px-6 sm:py-4 border-t border-white/10 bg-[#08090a] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-mono text-[#8d9299] block">
                  ¿Querés asegurar tu cupo o inscribir a tu grupo / team?
                </span>
                <span className="text-xs text-white font-semibold">
                  Atención directa con la organización de Trillo Eventos
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="hidden sm:inline-flex px-4 py-2.5 rounded-full text-xs font-mono text-[#8d9299] hover:text-white border border-white/10 hover:border-white/20 transition-colors"
                >
                  Volver
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl ${event.btnBg}`}
                >
                  <span>Inscribirme por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

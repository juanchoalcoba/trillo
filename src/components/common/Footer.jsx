import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  X,
  FileText,
  Lock,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [legalModal, setLegalModal] = useState(null); // 'terms' | 'privacy' | null

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="relative z-10 bg-[#060709] border-t border-white/10 text-[#f5f4f0] overflow-hidden pt-16 sm:pt-20 pb-12">
        {/* Luces y glows ambientales de fondo */}
        <div className="absolute top-0 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e87a38]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#4ade80]/4 rounded-full blur-[150px] pointer-events-none" />

        {/* Textura sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Pre-Footer Banner de Llamado a la Acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl p-8 sm:p-12 mb-16 sm:mb-20 bg-gradient-to-br from-[#12151c]/90 via-[#0e1117]/95 to-[#08090a] border border-white/10 relative overflow-hidden backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#e87a38]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#e87a38]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wider">Comunidad · Territorio · Movimiento</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Space_Grotesk'] text-[#f5f4f0] uppercase tracking-tight leading-tight">
                  El camino se hace al andar.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e87a38] via-[#f59e0b] to-[#fbbf24]">
                    Animate a vivirlo como nosotros.
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-[#8d9299] leading-relaxed">
                  Entrenamientos grupales en El Club, carreras inolvidables y expediciones a los rincones más agrestes de Durazno y la región.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
                <a
                  href="https://wa.me/59898121608?text=Hola%20Trillo!%20Me%20contacto%20desde%20la%20web%20para%20conocer%20m%C3%A1s%20sobre%20sus%20actividades."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#4ade80] hover:bg-[#22c55e] transition-all duration-300 shadow-xl shadow-[#4ade80]/20 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp +598 98 121 608</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <Link
                  to="/club"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#f5f4f0] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <span>Conocer El Club</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 2. Cuerpo Principal en 4 Columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
            {/* Columna 1: Marca, Manifiesto y Redes (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-block group">
                <img
                  src="/logoTrillo.png"
                  alt="TRILLO"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_2px_15px_rgba(232,122,56,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <p className="text-xs sm:text-sm text-[#8d9299] leading-relaxed">
                Universo Trillo nace en Durazno, en el corazón del interior uruguayo y a orillas del Río Yí, desde una pasión genuina por el movimiento, el trail running y la vida en la naturaleza.
              </p>

              {/* Georreferencia */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#d8cfc4]">
                <MapPin className="w-3.5 h-3.5 text-[#e87a38]" />
                <span>33°22'S 56°31'W · Durazno, Uruguay</span>
              </div>

              {/* Redes Sociales Oficiales */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8d9299] block">
                  Canales Digitales
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.instagram.com/trillo.uy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de Trillo (@trillo.uy)"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#e87a38]/20 border border-white/10 hover:border-[#e87a38]/40 flex items-center justify-center text-[#d8cfc4] hover:text-[#e87a38] transition-all"
                  >
                    <svg
                      className="w-4 h-4"
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

                  <a
                    href="https://www.youtube.com/@ALTRANCOPODCAST/streams"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Al Tranco Podcast"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 flex items-center justify-center text-[#d8cfc4] hover:text-rose-400 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/59898121608"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Oficial Trillo (+598 98 121 608)"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#4ade80]/20 border border-white/10 hover:border-[#4ade80]/40 flex items-center justify-center text-[#d8cfc4] hover:text-[#4ade80] transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 2: Ecosistema Trillo (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#e87a38] block font-bold">
                Ecosistema Trillo
              </span>
              <ul className="space-y-2.5 text-xs text-[#8d9299] font-mono">
                <li>
                  <Link
                    to="/eventos"
                    className="hover:text-[#f5f4f0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38] group-hover:scale-125 transition-transform" />
                    <span>Trillo Eventos & Carreras</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aventuras"
                    className="hover:text-[#f5f4f0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] group-hover:scale-125 transition-transform" />
                    <span>Trillo Aventuras</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aventuras#arma-tu-aventura"
                    className="text-[#4ade80] hover:text-[#22c55e] transition-colors flex items-center gap-2 group font-semibold"
                  >
                    <Sparkles className="w-3 h-3 text-[#4ade80]" />
                    <span>Armá tu Aventura (A Medida)</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/club"
                    className="hover:text-[#f5f4f0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                    <span>El Club de Corredores</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tienda"
                    className="hover:text-[#f5f4f0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover:scale-125 transition-transform" />
                    <span>Tienda Oficial Trillo</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="/#nosotros"
                    className="hover:text-[#f5f4f0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
                    <span>Sobre Nosotros (Fundadores)</span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    className="hover:text-[#f5f4f0] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 group-hover:scale-125 transition-transform" />
                    <span>Contacto & Consultas</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Eventos & Travesías (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#f5f4f0] block font-bold">
                Experiencias
              </span>
              <ul className="space-y-2.5 text-xs text-[#8d9299]">
                <li>
                  <Link to="/eventos" className="hover:text-[#f5f4f0] transition-colors block">
                    Corrida San Pedro
                  </Link>
                </li>
                <li>
                  <Link to="/eventos" className="hover:text-[#f5f4f0] transition-colors block">
                    Desafío Rebollo
                  </Link>
                </li>
                <li>
                  <Link to="/eventos" className="hover:text-[#f5f4f0] transition-colors block">
                    Carrera del Laberinto
                  </Link>
                </li>
                <li>
                  <Link to="/aventuras#nacionales" className="hover:text-[#f5f4f0] transition-colors block">
                    Kayak en Río Yí
                  </Link>
                </li>
                <li>
                  <Link to="/aventuras#internacionales" className="hover:text-[#f5f4f0] transition-colors block">
                    Cruce de los Andes
                  </Link>
                </li>
                <li>
                  <Link to="/aventuras#durazno" className="hover:text-[#f5f4f0] transition-colors block">
                    Senderos de Durazno
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4: Contacto Directo & Operaciones (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4ade80] block font-bold">
                Contacto Directo
              </span>

              <div className="space-y-3.5 text-xs text-[#8d9299]">
                {/* Teléfono / WhatsApp */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#8d9299] block">
                    Línea Directa & WhatsApp
                  </span>
                  <a
                    href="https://wa.me/59898121608"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold font-mono text-[#f5f4f0] hover:text-[#4ade80] transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>+598 98 121 608</span>
                  </a>
                  <span className="text-[10px] font-mono text-[#4ade80] block">
                    Atención personalizada inmediata
                  </span>
                </div>

                {/* Base */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#e87a38] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#f5f4f0] font-medium">Base de Operaciones</span>
                    <span className="text-[11px]">Durazno · Río Yí · Interior de Uruguay</span>
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#f5f4f0] font-medium">Entrenamientos & Salidas</span>
                    <span className="text-[11px]">Lunes a Sábados (Turnos mañana y tarde)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Barra Inferior Legal & Sub-Footer (Sin enlaces a Backoffice) */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8d9299]">
            <div className="flex items-center gap-2 text-center md:text-left">
              <span>© {new Date().getFullYear()} TRILLO. Todos los derechos reservados.</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="hidden sm:inline">Durazno, Uruguay</span>
            </div>

            {/* Enlaces Legales (Modales) */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="hover:text-[#f5f4f0] underline-offset-4 hover:underline transition-colors cursor-pointer"
              >
                Términos y Condiciones
              </button>

              <span className="text-white/20">·</span>

              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[#f5f4f0] underline-offset-4 hover:underline transition-colors cursor-pointer"
              >
                Políticas de Privacidad
              </button>

              <span className="text-white/20">·</span>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#f5f4f0] transition-colors cursor-pointer hover:border-[#e87a38]"
                title="Volver al inicio de la página"
              >
                <ArrowUp className="w-3 h-3 text-[#e87a38]" />
                <span className="uppercase text-[10px]">Arriba</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Modales Legales Flotantes con Framer Motion */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl bg-[#0c0e12] border border-white/15 shadow-2xl flex flex-col"
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e87a38]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                      {legalModal === 'terms' ? 'Términos y Condiciones' : 'Políticas de Privacidad'}
                    </h3>
                    <span className="text-[11px] font-mono text-[#8d9299]">
                      Universo Trillo · Vigencia 2026
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8d9299] hover:text-white transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido con Scroll */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#b4bac2] leading-relaxed font-sans">
                {legalModal === 'terms' ? (
                  <>
                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        1. Objeto y Alcance del Servicio
                      </h4>
                      <p>
                        El presente documento establece las condiciones generales que regulan el uso de los servicios prestados por <strong>TRILLO</strong>, incluyendo la organización y ejecución de carreras, eventos deportivos, entrenamientos en El Club de Corredores, expediciones y servicios a medida de turismo aventura («Armá tu Aventura»).
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        2. Aptitud Física y Ficha Médica
                      </h4>
                      <p>
                        La participación en actividades deportivas agrestes y de media/alta exigencia (trail running, trekking de travesía, kayak fluvial y expediciones de montaña) requiere que cada participante cuente con aptitud física adecuada y certificado médico vigente. Cada participante declara encontrarse en condiciones de salud óptimas para la actividad a desarrollar y asume voluntariamente los riesgos inherentes al entorno natural.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        3. Seguridad, Logística y Protocolos WFR
                      </h4>
                      <p>
                        La seguridad es la máxima prioridad de Trillo. Todas las expediciones y carreras cuentan con planes de contingencia, comunicación satelital o radial y guías con certificación en primeros auxilios en zonas agrestes (WFR - Wilderness First Responder). Los participantes se comprometen a respetar las directivas de los guías y organizadores en todo momento.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        4. Contingencias Climáticas y Reprogramaciones
                      </h4>
                      <p>
                        En caso de alertas meteorológicas oficiales emitidas por INUMET, crecida extraordinaria del Río Yí o factores que pongan en riesgo la integridad física de los participantes, Trillo se reserva el derecho de reprogramar la fecha de la actividad o adaptar el circuito por senderos seguros alternativos, manteniendo siempre la validez de la inscripción o seña acordada.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        5. Uso de Imagen y Registro Fotográfico
                      </h4>
                      <p>
                        Al participar en los eventos y expediciones organizadas por Trillo, los participantes autorizan el uso de fotografías y registros audiovisuales tomados durante la actividad exclusivamente para fines de difusión institucional y deportiva en los canales oficiales de Trillo.
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        1. Marco Legal y Compromiso de Privacidad
                      </h4>
                      <p>
                        En cumplimiento de la <strong>Ley N° 18.331 de Protección de Datos Personales y Acción de Habeas Data</strong> de la República Oriental del Uruguay, <strong>TRILLO</strong> garantiza el tratamiento confidencial y seguro de los datos personales suministrados por los usuarios a través del sitio web oficial.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        2. Datos Recopilados y Finalidad
                      </h4>
                      <p>
                        Los datos recabados en los formularios de contacto, afiliación a El Club y solicitudes personalizadas de «Armá tu Aventura» (tales como nombre, teléfono, WhatsApp, correo electrónico y preferencias deportivas) son utilizados exclusivamente para:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li>Coordinar presupuestos y respuestas directas a las solicitudes recibidas.</li>
                        <li>Gestionar inscripciones y acreditaciones en carreras y expediciones.</li>
                        <li>Mantener informada a la comunidad sobre fechas, circuitos y novedades deportivas.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        3. No Cesión a Terceros
                      </h4>
                      <p>
                        Trillo no comercializa, alquila ni cede información personal a empresas terceras ajenas a la organización de las actividades. Los datos únicamente son tratados por el equipo de coordinación y dirección de Trillo.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="font-bold text-[#f5f4f0] text-sm uppercase tracking-wider font-mono">
                        4. Ejercicio de Derechos (Acceso, Rectificación y Supresión)
                      </h4>
                      <p>
                        Cualquier titular de los datos podrá solicitar en cualquier momento el acceso, rectificación o eliminación definitiva de su información de nuestras bases de datos comunicándose a través de nuestro WhatsApp oficial <strong>+598 98 121 608</strong> o por formulario de contacto web.
                      </p>
                    </section>
                  </>
                )}
              </div>

              {/* Footer del Modal */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8d9299]">
                  Durazno · Río Yí · Uruguay
                </span>
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Entendido / Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

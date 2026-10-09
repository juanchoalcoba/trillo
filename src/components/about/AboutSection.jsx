import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Compass, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  // Parallax scroll cinematográfico para la imagen de fondo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  const pillars = [
    {
      id: 'eventos',
      badge: '01 · Expresión',
      title: 'TRILLO EVENTOS',
      headline: 'Creamos experiencias que hacen vibrar a una ciudad.',
      description:
        'Carreras, desafíos y eventos deportivos que buscan ser mucho más que una competencia. Es la energía de cientos de personas compartiendo un mismo pulso en el asfalto o en el barro.',
      highlights: ['Corrida San Pedro (Durazno)', 'Carrera del Laberinto', 'Desafíos nocturnos y urbanos'],
      icon: Trophy,
      accent: '#e87a38',
      bgGradient: 'from-[#e87a38]/20 via-[#e87a38]/5 to-transparent',
      borderColor: 'border-[#e87a38]/40',
      actionText: 'Explorar Eventos',
      link: '/eventos',
    },
    {
      id: 'aventuras',
      badge: '02 · Expresión',
      title: 'TRILLO AVENTURAS',
      headline: 'Salimos a vivir el territorio.',
      description:
        'Trekking, senderismo, kayak, montaña y turismo aventura. No es una simple excursión: es vivir una experiencia auténtica, conocer rincones ocultos y animarse a salir de lo cotidiano.',
      highlights: ['Trekking & Senderismo agreste', 'Travesías en Kayak', 'Expediciones en Uruguay y la región'],
      icon: Compass,
      accent: '#4ade80',
      bgGradient: 'from-[#4ade80]/20 via-[#4ade80]/5 to-transparent',
      borderColor: 'border-[#4ade80]/40',
      actionText: 'Descubrir Aventuras',
      link: '/aventuras',
    },
    {
      id: 'club',
      badge: '03 · Expresión',
      title: 'EL CLUB',
      headline: 'Una comunidad que eligió moverse.',
      description:
        'El Club de Corredores es el corazón diario de Trillo. No se trata solo de entrenar para correr más rápido; se trata de compartir el proceso, encontrarse, desafiarse y hacer del movimiento un estilo de vida.',
      highlights: ['Entrenamientos grupales semanales', 'Planes guiados y running outdoor', 'Encuentros y vida social activa'],
      icon: Users,
      accent: '#f59e0b',
      bgGradient: 'from-[#f59e0b]/20 via-[#f59e0b]/5 to-transparent',
      borderColor: 'border-amber-400/40',
      actionText: 'Entrar a El Club',
      link: '/club',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-28 md:py-36 overflow-hidden bg-[#08090a]"
    >
      {/* 1. Background Image con Parallax, Textura Orgánica y Overlay Oscuro Cinematográfico */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <motion.div
          style={{ y: yBackground, scale: scaleBackground }}
          className="absolute inset-0 w-full h-[125%] -top-[12.5%]"
        >
          <img
            src="https://res.cloudinary.com/pglfifpm/image/upload/f_auto,q_auto,w_1920/v1791462578/trillo/ui/hero-backgrounds/aventuras-hero.jpg"
            alt="Territorio y Naturaleza Trillo"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] saturate-[1.1]"
            loading="lazy"
          />
        </motion.div>

        {/* Overlay oscuro para otorgar legibilidad y máxima riqueza visual */}
        <div className="absolute inset-0 bg-[#08090a]/75 backdrop-blur-[1px]" />

        {/* Gradiente superior suave: transición perfecta desde el video del Hero */}
        <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-[#08090a] to-transparent" />

        {/* Gradiente inferior suave: transición perfecta hacia el footer */}
        <div className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-[#08090a] to-transparent" />

        {/* Viñeta radial oscura para concentrar la atención en el centro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#08090a_88%)] opacity-90" />

        {/* Glow ambiental cálido de Trillo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-[#e87a38]/8 rounded-full blur-[140px]" />
      </div>

      {/* 2. Contenido Central */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
        {/* Divider con badge sutil */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-xs text-[#d8cfc4] shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38] animate-pulse" />
            <span className="font-mono uppercase tracking-widest text-[11px]">
              Manifiesto & Concepto Rector
            </span>
          </div>
        </div>

        {/* Narrativa Principal / Declaración */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[#e87a38] mb-4"
          >
            ¿Qué es Trillo?
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-2xl sm:text-3xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] leading-snug tracking-tight max-w-3xl mx-auto"
          >
            Trillo es una invitación a vivir la vida desde la aventura.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-[#d8cfc4] font-normal leading-relaxed max-w-3xl mx-auto"
          >
            Te ofrecemos un universo de experiencias que te harán dar todo en cada competencia, desafiarte en travesías inolvidables o llevarte a desconectar en entornos naturales de belleza absoluta.
          </motion.p>
        </div>

        {/* Tarjeta de Filosofía: La pregunta que define el diseño según Pablo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 rounded-3xl p-8 md:p-12 bg-[#0c0e12]/80 backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#e87a38]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8d9299]">
                Cambio de Perspectiva
              </span>
              <h3 className="mt-2 text-lg font-medium text-white/50 line-through">
                "¿Qué servicios ofrece Trillo?"
              </h3>
              <p className="mt-1 text-xs text-[#8d9299]">
                No es una lista comercial fría de servicios deportivos.
              </p>
            </div>

            <div className="md:col-span-8 md:pl-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e87a38]">
                La verdadera pregunta
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[#f5f4f0]">
                "¿Qué puedo vivir dentro del Universo Trillo?"
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#8d9299]">
                Trillo crea oportunidades para vivir experiencias transformadoras. Y cada una de nuestras tres expresiones es una puerta diferente para ingresar a este universo.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Las 3 Expresiones */}
        <div id="universo" className="pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#e87a38]">
                Las 3 Expresiones
              </span>
              <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mt-1">
                El Universo Trillo
              </h3>
            </div>
            <p className="text-sm text-[#8d9299] max-w-md">
              No son empresas independientes. Comparten la misma raíz, la misma comunidad y la misma obsesión por animarse a vivir.
            </p>
          </div>

          {/* Grilla de Pilares con Tarjetas de Vidrio Frosted */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activeTab === idx;

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onMouseEnter={() => setActiveTab(idx)}
                  className={`relative rounded-3xl p-8 bg-[#0c0e12]/85 backdrop-blur-xl border transition-all duration-500 flex flex-col justify-between group cursor-pointer shadow-xl ${
                    isSelected
                      ? `${pillar.borderColor} shadow-2xl bg-gradient-to-b ${pillar.bgGradient}`
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Top Bar of Card */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#8d9299]">
                        {pillar.badge}
                      </span>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${pillar.accent}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: pillar.accent }} />
                      </div>
                    </div>

                    {/* Title & Headline */}
                    <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-wide mb-3">
                      {pillar.title}
                    </h4>
                    <p className="text-base font-medium text-[#d8cfc4] mb-4 leading-snug">
                      {pillar.headline}
                    </p>
                    <p className="text-sm text-[#8d9299] leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    {/* Highlights Bullet List */}
                    <div className="pt-4 border-t border-white/10 space-y-2 mb-8">
                      {pillar.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#d8cfc4]">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: pillar.accent }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  {pillar.link.startsWith('/') ? (
                    <Link
                      to={pillar.link}
                      className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#f5f4f0] group-hover:text-amber-400 transition-colors"
                    >
                      <span>{pillar.actionText}</span>
                      <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:border-amber-400 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  ) : (
                    <a
                      href={pillar.link}
                      className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#f5f4f0] group-hover:text-[#e87a38] transition-colors"
                    >
                      <span>{pillar.actionText}</span>
                      <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#e87a38] group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cierre de sección: Manifiesto final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 text-center border-t border-white/10 pt-16"
        >
          <span className="text-xs font-mono tracking-widest text-[#8d9299] uppercase">
            Filosofía Trillo
          </span>
          <h4 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-['Newsreader'] italic font-normal text-[#f5f4f0]">
            Moverse. Explorar. Compartir. Vivir el proceso.
          </h4>
          <div className="mt-8 flex justify-center items-center gap-4">
            <span className="text-lg font-['Space_Grotesk'] font-black tracking-widest uppercase text-[#e87a38]">
              ¿Te animás?
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

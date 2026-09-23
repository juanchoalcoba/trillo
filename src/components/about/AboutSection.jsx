import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Compass, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

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
      bgGradient: 'from-[#e87a38]/15 via-transparent to-transparent',
      borderColor: 'border-[#e87a38]/30',
      actionText: 'Explorar Eventos',
      link: '#eventos',
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
      bgGradient: 'from-[#2e4033]/30 via-transparent to-transparent',
      borderColor: 'border-[#4ade80]/30',
      actionText: 'Descubrir Aventuras',
      link: '#aventuras',
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
      accent: '#d8cfc4',
      bgGradient: 'from-[#d8cfc4]/15 via-transparent to-transparent',
      borderColor: 'border-[#d8cfc4]/30',
      actionText: 'Entrar a El Club (Ruta Nueva)',
      link: '/club',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Divider with subtle glowing badge */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 glass-panel text-xs text-[#8d9299]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38]" />
          <span className="font-mono uppercase tracking-widest text-[11px]">
            Manifiesto & Concepto Rector
          </span>
        </div>
      </div>

      {/* Main Narrative / Statement */}
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

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-2xl sm:text-3xl md:text-5xl font-['Outfit'] font-bold text-[#f5f4f0] leading-snug tracking-tight"
        >
          TRILLO no es solo una empresa de eventos, un grupo de corredores o una agencia de aventuras.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-[#8d9299] font-['Newsreader'] italic font-light leading-relaxed"
        >
          "Todas esas cosas son formas de expresar el espíritu Trillo.
          Trillo es un estilo de vida: salir, moverse, conocer, compartir, desafiarse
          y estar en contacto con la naturaleza."
        </motion.p>
      </div>

      {/* Philosophy Shift Banner (La pregunta que define el diseño según Pablo) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20 rounded-3xl p-8 md:p-12 glass-panel border border-white/10 relative overflow-hidden"
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
            <h3 className="mt-2 text-2xl sm:text-3xl font-['Outfit'] font-bold text-[#f5f4f0]">
              "¿Qué puedo vivir dentro del Universo Trillo?"
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#8d9299]">
              Trillo crea oportunidades para vivir experiencias transformadoras. Y cada una de nuestras tres expresiones es una puerta diferente para ingresar a este universo.
            </p>
          </div>
        </div>
      </motion.div>

      {/* The 3 Pillars Section */}
      <div id="universo" className="pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#e87a38]">
              Las 3 Expresiones
            </span>
            <h3 className="text-3xl md:text-4xl font-['Outfit'] font-bold text-[#f5f4f0] mt-1">
              El Universo Trillo
            </h3>
          </div>
          <p className="text-sm text-[#8d9299] max-w-md">
            No son empresas independientes. Comparten la misma raíz, la misma comunidad y la misma obsesión por animarse a vivir.
          </p>
        </div>

        {/* Pillar Interactive Grid */}
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
                className={`relative rounded-3xl p-8 glass-panel border transition-all duration-500 flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? `${pillar.borderColor} shadow-2xl bg-gradient-to-b ${pillar.bgGradient}`
                    : 'border-white/5 hover:border-white/15'
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
                  <h4 className="text-2xl font-['Outfit'] font-bold text-[#f5f4f0] tracking-wide mb-3">
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
                    className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#f5f4f0] group-hover:text-amber-400 transition-colors"
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
        className="mt-24 text-center border-t border-white/10 pt-16"
      >
        <span className="text-xs font-mono tracking-widest text-[#8d9299] uppercase">
          Filosofía Trillo
        </span>
        <h4 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-['Newsreader'] italic font-normal text-[#f5f4f0]">
          Moverse. Explorar. Compartir. Vivir el proceso.
        </h4>
        <div className="mt-8 flex justify-center items-center gap-4">
          <span className="text-lg font-['Outfit'] font-black tracking-widest uppercase text-[#e87a38]">
            ¿Te animás?
          </span>
        </div>
      </motion.div>
    </section>
  );
}

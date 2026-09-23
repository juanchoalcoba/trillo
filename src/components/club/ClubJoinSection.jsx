import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, ArrowLeft, ArrowUp, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClubJoinSection() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const plans = [
    {
      name: 'Entrenamiento Presencial',
      badge: 'Durazno, UY',
      description: 'Sumate a nuestros grupos en la ribera del Río Yí, pista y senderos.',
      features: [
        'Grupos divididos por niveles y objetivos',
        'Horarios matutinos y vespertinos',
        'Entrenadores presenciales en cada sesión',
        'Acceso a fondos grupales de fin de semana',
        'Descuentos en carreras de Trillo Eventos',
      ],
      ctaText: 'Consultar Horarios Presenciales',
      highlighted: true,
    },
    {
      name: 'Plan a Distancia',
      badge: 'Todo Uruguay',
      description: 'Entrená con nuestra metodología estés donde estés con planificación a medida.',
      features: [
        'Planificación personalizada semanal o mensual',
        'Preparación específica para 10K, 21K y 42K',
        'Seguimiento directo con los profesores por WhatsApp',
        'Ajuste continuo según tu evolución y tiempos',
        'Comunidad online de corredores',
      ],
      ctaText: 'Solicitar Plan a Distancia',
      highlighted: false,
    },
  ];

  return (
    <section id="unirme" className="relative py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold bg-white/80 px-3 py-1 rounded-full border border-amber-900/10">
          Comenzar Hoy
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-black text-stone-900 mt-3">
          Sumate a El Club
        </h2>
        <p className="mt-3 text-base text-stone-700">
          No importa si estás dando tus primeros pasos o si buscás bajar tus marcas. Encontrá tu lugar en el pelotón.
        </p>
      </div>

      {/* Planes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
        {plans.map((p, idx) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 ${
              p.highlighted
                ? 'bg-gradient-to-b from-white to-amber-50/80 border-2 border-amber-600 shadow-xl'
                : 'bg-white/80 backdrop-blur-md border border-amber-900/10 shadow-lg'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  {p.badge}
                </span>
                {p.highlighted && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-600 font-bold font-mono">
                    <Sparkles className="w-3.5 h-3.5" /> Más popular
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-['Outfit'] font-bold text-stone-900 mb-2">
                {p.name}
              </h3>
              <p className="text-sm text-stone-600 mb-6">
                {p.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-amber-900/10 mb-8">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={`https://wa.me/59899360000?text=Hola!%20Quiero%20información%20sobre%20el%20${encodeURIComponent(
                p.name
              )}%20de%20El%20Club%20de%20Corredores`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md ${
                p.highlighted
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-600/25'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{p.ctaText}</span>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Footer del Club con Volver a Universo Trillo */}
      <div className="pt-12 border-t border-amber-900/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-amber-950/70">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-amber-800 hover:text-amber-600 transition-colors group"
        >
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center transition-transform group-hover:-translate-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span>← Volver a Universo Trillo</span>
        </Link>

        <div className="flex items-center gap-4 font-mono text-[11px] text-center">
          <span>Durazno · Río Yí</span>
          <span className="text-amber-900/20">|</span>
          <span className="text-amber-700 font-semibold">El deporte como estilo de vida</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-stone-900 transition-colors p-2 rounded-full border border-amber-900/15 bg-white/70"
          title="Volver arriba"
        >
          <ArrowUp className="w-3.5 h-3.5 text-amber-700" />
          <span className="font-mono uppercase text-[10px]">Arriba</span>
        </button>
      </div>
    </section>
  );
}

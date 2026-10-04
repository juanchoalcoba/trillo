import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Mountain, Dumbbell, Compass, ArrowRight } from 'lucide-react';

export default function ClubDisciplines() {
  const disciplines = [
    {
      id: 'running',
      icon: Footprints,
      badge: 'Pista & Calle',
      title: 'Running',
      headline: 'Aprender a correr y disfrutar el proceso.',
      description:
        'Entrenamientos estructurados por niveles: desde tus primeros pasos continuos hasta la preparación para 10K, medias maratones y maratón. Fondos compartidos donde el ritmo lo marca el grupo.',
      tags: ['Técnica de carrera', 'Fondos semanales', 'Planes guiados'],
      accent: '#f59e0b',
      borderColor: 'hover:border-amber-400/40',
    },
    {
      id: 'trail',
      icon: Mountain,
      badge: 'Territorio & Desafío',
      title: 'Trail Running',
      headline: 'Salir del asfalto hacia el monte y las sierras.',
      description:
        'Cuchillas, senderos agrestes, barro, arena y riberas del Río Yí. Desarrollamos la agilidad, fuerza excéntrica y la resistencia mental que solo la naturaleza salvaje puede enseñar.',
      tags: ['Senderos de monte', 'Altimetría', 'Desafíos nocturnos'],
      accent: '#10b981',
      borderColor: 'hover:border-emerald-400/40',
    },
    {
      id: 'funcional',
      icon: Dumbbell,
      badge: 'Fuerza & Prevención',
      title: 'Entrenamiento Funcional',
      headline: 'El cuerpo como herramienta fuerte y saludable.',
      description:
        'Sesiones al aire libre enfocadas en core, estabilidad articular, potencia y movilidad. La base física indispensable para correr sin dolores y disfrutar del movimiento cotidiano.',
      tags: ['Fuerza para corredores', 'Core y estabilidad', 'Prevención de lesiones'],
      accent: '#f97316',
      borderColor: 'hover:border-orange-400/40',
    },
    {
      id: 'trekking',
      icon: Compass,
      badge: 'Exploración & Comunidad',
      title: 'Trekking',
      headline: 'Caminar el territorio para reconectar.',
      description:
        'Experiencias activas para todas las edades. Caminatas grupales por paisajes del interior de Uruguay que invitan a bajar el ritmo, respirar aire puro y compartir el camino.',
      tags: ['Salidas grupales', 'Rincones del interior', 'Sin límite de edad'],
      accent: '#fbbf24',
      borderColor: 'hover:border-amber-300/40',
    },
  ];

  return (
    <section id="disciplinas" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* Header de Sección */}
      <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#8d9299] mb-4"
        >
          <Footprints className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono uppercase tracking-widest text-[11px] text-[#f5f4f0]">
            Nuestras 4 Formas de Movernos
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight"
        >
          El Movimiento en el Entorno Natural
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[#8d9299] leading-relaxed"
        >
          No creemos en fórmulas cerradas de gimnasio. En El Club combinamos cuatro pilares
          para que cada persona encuentre su propio ritmo y forme parte de la comunidad.
        </motion.p>
      </div>

      {/* Grid de 4 Disciplinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {disciplines.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className={`rounded-3xl p-8 sm:p-10 glass-panel border border-white/10 ${item.borderColor} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/90 font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    {item.badge}
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border border-white/10"
                    style={{ backgroundColor: `${item.accent}18` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-amber-400/90 mb-3">
                  {item.headline}
                </p>
                <p className="text-xs sm:text-sm text-[#8d9299] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-[#d8cfc4] font-mono border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors">
                <span>Conocer horarios y grupos</span>
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

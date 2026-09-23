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
      accent: '#d97706', // Ámbar intenso
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50/50',
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
      accent: '#15803d', // Verde monte
      bg: 'bg-gradient-to-br from-emerald-50 to-green-50/50',
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
      accent: '#ea580c', // Naranja fuego
      bg: 'bg-gradient-to-br from-orange-50 to-amber-50/50',
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
      accent: '#b45309', // Terracota cálido
      bg: 'bg-gradient-to-br from-stone-50 to-amber-50/40',
    },
  ];

  return (
    <section id="disciplinas" className="relative py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Header de Sección */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-900/10 text-xs font-semibold text-amber-800 mb-4 shadow-sm font-mono uppercase tracking-widest text-[11px]">
          Nuestras 4 Formas de Movernos
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-black text-stone-900 tracking-tight">
          El Movimiento en el Entorno Natural
        </h2>
        <p className="mt-4 text-base md:text-lg text-stone-700 leading-relaxed font-normal">
          No creemos en fórmulas cerradas de gimnasio. En El Club combinamos cuatro pilares
          para que cada persona encuentre su propio ritmo y forme parte de la comunidad.
        </p>
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
              className={`rounded-3xl p-8 md:p-10 ${item.bg} border border-amber-900/10 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-900/80 font-bold bg-white/80 px-3 py-1 rounded-full border border-amber-900/10">
                    {item.badge}
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: `${item.accent}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-['Outfit'] font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-base font-medium text-amber-950/80 mb-3">
                  {item.headline}
                </p>
                <p className="text-sm text-stone-700 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-amber-900/10">
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-white/90 text-stone-800 font-medium border border-amber-900/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-900/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-900 group-hover:text-amber-600 transition-colors">
                <span>Conocer horarios y grupos</span>
                <div className="w-7 h-7 rounded-full bg-white border border-amber-900/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

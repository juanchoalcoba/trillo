import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Leaf, Users, Radio, Compass, Award } from 'lucide-react';

export default function AventurasPhilosophy() {
  const pillars = [
    {
      icon: Shield,
      title: 'Seguridad Integral & WFR',
      description:
        'Todos nuestros líderes de expedición cuentan con certificación Wilderness First Responder (WFR). Llevamos botiquines de soporte agreste, protocolos de evacuación estudiados y seguro deportivo individual para cada integrante.',
      badge: 'Protocolo Médico',
      accent: '#4ade80',
    },
    {
      icon: Radio,
      title: 'Monitoreo & Telecomunicaciones',
      description:
        'En zonas remotas sin señal celular (cañones, islas fluviales, cordillera), contamos con comunicadores satelitales Garmin inReach con SOS bidireccional y radios VHF para el equipo técnico.',
      badge: 'Satelital 24/7',
      accent: '#38bdf8',
    },
    {
      icon: Leaf,
      title: 'Ética "No Deje Rastro"',
      description:
        'El territorio no nos pertenece, somos sus invitados. Minimizamos el impacto en el monte, no dejamos residuos, respetamos las fuentes de agua dulce y protegemos los sitios arqueológicos y biológicos.',
      badge: 'Conservación',
      accent: '#a3e635',
    },
    {
      icon: Users,
      title: 'Grupos Reducidos & Cultura Local',
      description:
        'No hacemos turismo masivo. Mantenemos grupos de 10 a 15 personas para cuidar la experiencia íntima con el paisaje, trabajar con pobladores locales, puesteros y pescadores de cada zona.',
      badge: 'Comunidad Real',
      accent: '#f59e0b',
    },
  ];

  return (
    <section id="filosofia" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#8d9299] mb-4"
        >
          <Award className="w-3.5 h-3.5 text-[#4ade80]" />
          <span className="font-mono uppercase tracking-widest text-[11px] text-[#f5f4f0]">
            Cómo Operamos Cada Salida
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight"
        >
          Aventura con Rigor, Seguridad y Respeto
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[#8d9299] leading-relaxed"
        >
          Animarse a vivir no significa improvisar. Detrás de cada sendero, remada o cumbre hay una planificación logística obsesiva para que solo te preocupes por disfrutar.
        </motion.p>
      </div>

      {/* Grid de 4 Pilares */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.accent}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d9299] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8d9299] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

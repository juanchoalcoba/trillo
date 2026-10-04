import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shirt, Cpu, HeartPulse, Flame, CheckCircle2 } from 'lucide-react';

export default function EventosKits() {
  const kitItems = [
    {
      icon: <Shirt className="w-5 h-5 text-[#e87a38]" />,
      title: 'Camiseta Técnica Oficial',
      desc: 'Tejido transpirable de secado rápido, corte ergonómico y reflectivos 360° para visibilidad en el tramo nocturno.',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      title: 'Medalla Finisher en Madera Viva',
      desc: 'Elaborada con rodajas de monte nativo de poda responsable, pirograbada a fuego con el blasón de San Pedro.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      title: 'Dorsal con Chip Electrónico',
      desc: 'Medición de tiempos netos y parciales en puntos de control intermedios con subida inmediata a la plataforma web.',
    },
    {
      icon: <Flame className="w-5 h-5 text-[#e87a38]" />,
      title: 'Fogón Finisher & Asado Criollo',
      desc: 'Acceso exclusivo al campamento de llegada con fogata abierta, hidratación isotónica y picada de bienvenida.',
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-emerald-400" />,
      title: 'Seguro Médico & Asistencia 4x4',
      desc: 'Equipo de paramédicos y vehículos todo terreno distribuidos a lo largo del circuito de tierra y cerro.',
    },
  ];

  return (
    <section id="kits" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Columna Izquierda: Imagen del Kit */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative rounded-3xl overflow-hidden glass-panel border border-white/10 group"
        >
          <img
            src="/images/events/san_pedro_kit.jpg"
            alt="Kit Oficial San Pedro"
            className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Badges Flotantes */}
          <div className="absolute top-5 left-5">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-black/70 backdrop-blur-md text-[#e87a38] border border-[#e87a38]/40">
              Kit de Edición Limitada
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
              Materia Criolla & Tecnología Deportiva
            </h3>
            <p className="text-xs text-[#8d9299] font-mono mt-1">
              Retiro de kits: Viernes 20 en Durazno Centro o Sábado 21 en Plaza San Pedro.
            </p>
          </div>
        </motion.div>

        {/* Columna Derecha: Lista de Ítems */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-3 border border-[#e87a38]/30">
              <Award className="w-3 h-3 text-[#e87a38]" />
              <span className="tracking-widest uppercase text-[10px] font-mono">
                Todo Incluido con tu Inscripción
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] uppercase text-[#f5f4f0] tracking-tight">
              LO QUE TE LLEVAS DE <span className="font-['Newsreader'] italic font-light text-[#e87a38]">San Pedro</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#8d9299] mb-6">
              Nos aseguramos de que cada detalle hable de la identidad de Trillo: materiales nobles,
              artesanía del interior y la máxima seguridad en carrera.
            </p>

            <div className="space-y-3.5">
              {kitItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/5 bg-[#0d1015]/70 flex items-start gap-4 hover:border-[#e87a38]/40 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#8d9299] mt-0.5 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

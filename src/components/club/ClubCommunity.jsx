import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, MapPin, Award, CheckCircle2, Camera } from 'lucide-react';

export default function ClubCommunity() {
  const values = [
    { label: 'Competir', desc: 'Desafiarnos con respeto hacia nosotros mismos y el entorno.' },
    { label: 'Compartir', desc: 'El esfuerzo se divide y la alegría de cruzar la meta se multiplica.' },
    { label: 'Pasear', desc: 'Aprender a mirar el paisaje de Durazno con ojos nuevos a cada zancada.' },
    { label: 'Disfrutar', desc: 'Porque si no hay sonrisa en el camino, no es el espíritu de El Club.' },
  ];

  return (
    <section id="rioyi" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* El Río Yí como Escenario */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-8 sm:p-12 md:p-14 glass-panel border border-amber-400/30 text-white shadow-2xl relative overflow-hidden mb-20 bg-gradient-to-br from-amber-500/15 via-[#0d1015] to-[#08090a]"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-xs font-semibold mb-6 uppercase tracking-wider font-mono text-amber-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>El Territorio de Durazno</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold leading-tight mb-4 text-[#f5f4f0]">
            El Río Yí es Nuestra Pista Natural
          </h3>

          <p className="text-base sm:text-lg text-[#d8cfc4] font-normal leading-relaxed mb-8">
            Nuestros entrenamientos cotidianos suceden entre los arenales, los montes nativos y
            las riberas del Río Yí. La brisa del agua al atardecer, el crujido de las ramas bajo las zapatillas
            y el silencio del campo uruguayo convierten cada sesión en un retiro de energía vital.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center">
            <div>
              <span className="block text-3xl font-black font-['Space_Grotesk'] text-amber-400">+10</span>
              <span className="text-xs text-[#8d9299] font-mono">Años de historia</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-['Space_Grotesk'] text-amber-400">+500</span>
              <span className="text-xs text-[#8d9299] font-mono">Corredores formados</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-['Space_Grotesk'] text-amber-400">100%</span>
              <span className="text-xs text-[#8d9299] font-mono">Entorno Natural</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-['Space_Grotesk'] text-amber-400">Durazno</span>
              <span className="text-xs text-[#8d9299] font-mono">Corazón de Uruguay</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Los 4 Valores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block mb-2">
                0{i + 1} · Valor
              </span>
              <h4 className="text-xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-2">
                {v.label}
              </h4>
              <p className="text-xs sm:text-sm text-[#8d9299] leading-relaxed">
                {v.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

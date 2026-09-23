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
    <section id="rioyi" className="relative py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* El Río Yí como Escenario */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-8 md:p-14 bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-2xl relative overflow-hidden mb-20"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-6 uppercase tracking-wider font-mono">
            <MapPin className="w-3.5 h-3.5 text-amber-200" />
            <span>El Territorio de Durazno</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-black leading-tight mb-4">
            El Río Yí es Nuestra Pista Natural
          </h3>

          <p className="text-base sm:text-lg text-amber-100 font-light leading-relaxed mb-8">
            Nuestros entrenamientos cotidianos suceden entre los arenales, los montes nativos y
            las riberas del Río Yí. La brisa del agua al atardecer, el crujido de las ramas bajo las zapatillas
            y el silencio del campo uruguayo convierten cada sesión en un retiro de energía vital.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20 text-center">
            <div>
              <span className="block text-3xl font-black font-['Outfit']">+10</span>
              <span className="text-xs text-amber-200 font-mono">Años de historia</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-['Outfit']">+500</span>
              <span className="text-xs text-amber-200 font-mono">Corredores formados</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-['Outfit']">100%</span>
              <span className="text-xs text-amber-200 font-mono">Entorno Natural</span>
            </div>
            <div>
              <span className="block text-3xl font-black font-['Outfit']">Durazno</span>
              <span className="text-xs text-amber-200 font-mono">Corazón de Uruguay</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Valores y Filosofía Oficial */}
      <div id="comunidad" className="pt-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold bg-white/70 px-3 py-1 rounded-full border border-amber-900/10">
            Nuestra Filosofía
          </span>
          <h3 className="text-3xl sm:text-4xl font-['Outfit'] font-bold text-stone-900 mt-3">
            Cuatro Palabras que Guían Cada Paso
          </h3>
          <p className="text-sm text-stone-600 mt-2">
            El mantra que repetimos en cada entrenamiento, carrera y encuentro en Durazno.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-7 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-900/10 shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-800 font-bold font-mono text-sm mb-4">
                0{i + 1}
              </div>
              <h4 className="text-xl font-['Outfit'] font-bold text-stone-900 mb-2">
                {v.label}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cita de Cierre de Comunidad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-amber-900/10 max-w-3xl mx-auto"
        >
          <p className="text-xl sm:text-2xl font-['Newsreader'] italic text-amber-950 font-normal">
            "Repetir. Repetir. Repetir. Siempre hacia adelante."
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-amber-800">
            <svg className="w-4 h-4 fill-amber-600" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <a
              href="https://www.instagram.com/corredoresclub.durazno/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-semibold"
            >
              @corredoresclub.durazno
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

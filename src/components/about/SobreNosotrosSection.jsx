import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, MapPin, Award, Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SobreNosotrosSection() {
  const founders = [
    {
      name: 'Pablo Salazar',
      role: 'Co-Fundador · Dirección & Experiencias',
      bio: 'Impulsor del universo Trillo, apasionado por el running y el desarrollo de eventos deportivos que unen a la comunidad.',
      initials: 'PS',
      accent: '#e87a38',
    },
    {
      name: 'Robert Acosta',
      role: 'Co-Fundador · Logística & Territorio',
      bio: 'Explorador y planificador técnico de circuitos, senderos y travesías agrestes a lo largo del Río Yí y el país.',
      initials: 'RA',
      accent: '#f59e0b',
    },
  ];

  return (
    <section
      id="nosotros"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#08090a] border-t border-white/5"
    >
      {/* Glow ambiental sutil */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#e87a38]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda: Historia & Personas (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Badge de Origen */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#d8cfc4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38] animate-pulse" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                Origen & Identidad · Durazno, Uruguay
              </span>
            </div>

            {/* Título Principal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#f5f4f0] font-['Space_Grotesk'] leading-[1.15] tracking-tight">
              Quiénes estamos detrás de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e87a38] via-[#f59e0b] to-[#fbbf24]">
                Trillo
              </span>
            </h2>

            {/* Manifiesto Breve */}
            <p className="text-base sm:text-lg text-[#d8cfc4] leading-relaxed font-normal">
              Trillo nace en Durazno, en el corazón del interior uruguayo y a orillas del Río Yí, desde una pasión
              genuina por el movimiento, el trail running y la vida al aire libre. No somos una estructura lejana:
              somos personas que entrenan en los mismos senderos, corren las mismas carreras y creen en el poder del
              deporte para transformar y unir a nuestra gente.
            </p>

            {/* Tarjetas de los Fundadores (Borrador) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="p-5 rounded-2xl bg-[#0c0e12]/80 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-['Space_Grotesk'] text-sm border border-white/10 transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${founder.accent}15`,
                        color: founder.accent,
                      }}
                    >
                      {founder.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#f5f4f0] text-sm font-['Space_Grotesk']">
                        {founder.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#8d9299] block">
                        {founder.role}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#8d9299] leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>

            {/* Pilares Clave de Experiencia */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#8d9299]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e87a38]" />
                <span>Río Yí como pista natural</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>+10 años de experiencia activa</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Comunidad en movimiento</span>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha: Tarjeta Visual de Naturaleza & Territorio (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0e12] shadow-2xl group">
              {/* Imagen representativa real de Trillo / Durazno */}
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/pglfifpm/image/upload/f_auto,q_auto,w_1000/v1791492020/trillo/galeria/aventuras/_MG_7852.jpg"
                  alt="Trillo Durazno Naturaleza y Deporte"
                  className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Overlay degradé inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-transparent to-transparent opacity-80" />

              {/* Tarjeta Flotante Inferior de Vidrio */}
              <div className="absolute bottom-5 left-5 right-5 p-4.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between text-xs font-mono text-[#8d9299] mb-1">
                  <span className="flex items-center gap-1 text-[#e87a38]">
                    <Compass className="w-3.5 h-3.5" />
                    <span>33°22'S 56°31'W</span>
                  </span>
                  <span>Durazno · Uruguay</span>
                </div>
                <h4 className="text-sm font-bold text-[#f5f4f0] font-['Space_Grotesk']">
                  Deporte, Naturaleza y Comunidad
                </h4>
                <p className="text-[11px] text-[#8d9299] mt-0.5">
                  Senderos, río y camaradería en cada paso.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

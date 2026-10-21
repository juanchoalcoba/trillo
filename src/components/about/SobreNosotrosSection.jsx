import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  MapPin,
  Mountain,
  Waves,
  Quote,
  Sparkles,
  ArrowRight,
  Heart,
  Award,
  Footprints,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SobreNosotrosSection() {
  return (
    <section
      id="nosotros"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#08090a] border-t border-white/5 scroll-mt-24"
    >
      {/* Luces y glows ambientales */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e87a38]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#f59e0b]/6 rounded-full blur-[150px] pointer-events-none" />

      {/* Sutil cuadrícula decorativa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 z-10">
        {/* Cabecera de la Sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4"
        >
          {/* Badge de Origen e Identidad */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-xs text-[#d8cfc4]">
            <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[11px]">
              Origen & Equipo · Durazno, Uruguay
            </span>
          </div>

          {/* Título Principal */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-[#f5f4f0] font-['Space_Grotesk'] leading-[1.1] tracking-tight">
            Quiénes estamos detrás de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e87a38] via-[#f59e0b] to-[#fbbf24]">
              Trillo
            </span>
          </h2>

          {/* Manifiesto Breve */}
          <p className="text-base sm:text-lg text-[#d8cfc4] leading-relaxed font-normal pt-2">
            Trillo nace en Durazno, en el corazón del interior uruguayo y a orillas del Río Yí, desde una pasión
            genuina por el movimiento, el trail running y la vida al aire libre. No somos una estructura lejana:
            somos quienes recorremos los senderos, remamos las aguas y compartimos con vos cada paso de esta aventura.
          </p>

          {/* Datos geográficos y de identidad */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#8d9299]">
            <span className="inline-flex items-center gap-1.5 text-[#e87a38]">
              <Compass className="w-3.5 h-3.5" />
              <span>33°22'S 56°31'W</span>
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Río Yí · Durazno</span>
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Espíritu de Aventura</span>
            </span>
          </div>
        </motion.div>

        {/* Tarjetas Principales de Pablo Salazar & Robert Acosta */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 1: Pablo Salazar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-3xl bg-gradient-to-b from-[#101318]/90 to-[#0a0c10]/95 border border-white/10 hover:border-[#e87a38]/40 transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(232,122,56,0.12)]"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#e87a38]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#e87a38]/20 transition-all duration-700" />

            <div>
              {/* Imagen Fotográfica Oficial de Pablo Salazar */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#060708]">
                <img
                  src="/pablo.jpeg"
                  alt="Pablo Salazar - Fundador de Trillo"
                  className="w-full h-full object-cover object-[center_35%] filter brightness-[0.93] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradiente cinemático para transición suave */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101318] via-[#101318]/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                {/* Badges Flotantes sobre la Imagen */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-[#f5f4f0]">
                    <span className="w-2 h-2 rounded-full bg-[#e87a38] animate-pulse" />
                    <span className="font-bold tracking-wider uppercase">Fundador</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#d8cfc4]">
                    <Mountain className="w-3.5 h-3.5 text-[#e87a38]" />
                    <span>Montaña & Senderos</span>
                  </div>
                </div>

                {/* Subtítulo flotante al pie de la foto */}
                <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#e87a38] font-semibold drop-shadow">
                    Pablo Salazar · Visión Trillo
                  </span>
                </div>
              </div>

              {/* Contenido Editorial de Pablo */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                 
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f5f4f0] font-['Space_Grotesk'] tracking-tight">
                    Pablo Salazar
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#8d9299] mt-0.5">
                    Fundador · Dirección & Estilo de Vida
                  </p>
                </div>

                {/* Cita Principal */}
                <div className="relative space-y-4">
                  <Quote className="w-9 h-9 text-[#e87a38]/30 shrink-0 -mb-2" />
                  <p className="text-base sm:text-lg text-[#f5f4f0] font-medium leading-relaxed">
                    “El amor por el deporte, la naturaleza y aventura fueron creando un estilo de vida que tras años de caminos recorridos terminó en la creación de esta nueva aventura que decidí llamar <span className="text-[#e87a38] font-bold">TRILLO</span>.”
                  </p>

                  {/* Resalte de Invitación Personal */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#e87a38]/15 via-[#e87a38]/5 to-transparent border-l-2 border-[#e87a38] border-y border-r border-white/5 backdrop-blur-sm">
                    <p className="text-sm sm:text-base text-[#d8cfc4] italic leading-relaxed">
                      “Bienvenidos a mi forma de ver el mundo, animate a vivirla como nosotros.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags de Pilares */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#8d9299]">
                  Estilo de Vida
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#8d9299]">
                  Trail & Running
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#8d9299]">
                  Espíritu Aventurero
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#e87a38]/10 border border-[#e87a38]/30 text-[11px] font-mono text-[#e87a38]">
                  Comunidad Trillo
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Robert Acosta */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative rounded-3xl bg-gradient-to-b from-[#101318]/90 to-[#0a0c10]/95 border border-white/10 hover:border-amber-400/40 transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)]"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700" />

            <div>
              {/* Imagen Fotográfica Oficial de Robert Acosta */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#060708]">
                <img
                  src="/robert.jpeg"
                  alt="Robert Acosta - Co-Fundador y Entrenador de Trillo"
                  className="w-full h-full object-cover object-[center_55%] filter brightness-[0.93] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradiente cinemático para transición suave */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101318] via-[#101318]/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                {/* Badges Flotantes sobre la Imagen */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-[#f5f4f0]">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-bold tracking-wider uppercase">Coordinador</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#d8cfc4]">
                    <Waves className="w-3.5 h-3.5 text-sky-400" />
                    <span>Río Yí & Kayak</span>
                  </div>
                </div>

                {/* Subtítulo flotante al pie de la foto */}
                <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-semibold drop-shadow">
                    Robert Acosta · Territorio & Entrenamiento
                  </span>
                </div>
              </div>

              {/* Contenido Editorial de Robert */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f5f4f0] font-['Space_Grotesk'] tracking-tight">
                    Robert Acosta
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#8d9299] mt-0.5">
                    Docente de Educación Física · Entrenador de running y trail running
                  </p>
                </div>

                {/* Mensaje Oficial de Robert */}
                <div className="relative space-y-3.5 text-[#d8cfc4]">
                  <Quote className="w-9 h-9 text-amber-400/30 shrink-0 -mb-2" />

                  <p className="text-sm sm:text-base leading-relaxed">
                    “Soy docente de Educación Física y entrenador de running y trail running, apasionado por el movimiento, la aventura y el contacto con la naturaleza.”
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-[#b4bac2]">
                    “El monte, los senderos, el río y los paisajes naturales son parte de lo que me inspira. Disfruto del trekking, correr por nuevos caminos, la pesca deportiva y el kayak, actividades que me permiten conectar con el entorno y descubrir nuevas experiencias.”
                  </p>

                  {/* Resalte de Misión en Trillo */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-400/15 via-amber-400/5 to-transparent border-l-2 border-amber-400 border-y border-r border-white/5 backdrop-blur-sm">
                    <p className="text-xs sm:text-sm text-[#f5f4f0] italic leading-relaxed">
                      “En Trillo busco transmitir esa pasión por la naturaleza y el movimiento, brindando lo mejor de mí en cada experiencia, compartiendo conocimientos y acompañando a otros a descubrir todo lo que el entorno natural tiene para ofrecer.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags de Pilares */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#8d9299]">
                  Docente Ed. Física
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#8d9299]">
                  Entrenador Trail Running
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#8d9299]">
                  Kayak & Río Yí
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#8d9299]">
                  Trekking Agreste
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-[11px] font-mono text-amber-300">
                  Pesca Deportiva
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Barra Inferior Unificadora de Valores y Llamado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 md:mt-16 p-6 sm:p-8 rounded-3xl bg-[#0c0e12]/80 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#e87a38]">
              <Footprints className="w-4 h-4" />
              <span className="uppercase tracking-wider">Un estilo de vida compartido</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
              Viví la experiencia Trillo junto a nosotros
            </h4>
            <p className="text-xs sm:text-sm text-[#8d9299] max-w-xl">
              Entrenamientos semanales en el Club, travesías por el territorio y carreras inolvidables.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/club"
              className="px-5 py-2.5 rounded-full bg-[#e87a38] hover:bg-[#ff8a48] text-black font-semibold text-xs uppercase tracking-wider font-mono transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,122,56,0.4)] flex items-center gap-1.5"
            >
              <span>Sumate al Club</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/aventuras"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#f5f4f0] font-semibold text-xs uppercase tracking-wider font-mono transition-all duration-300"
            >
              <span>Ver Aventuras</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

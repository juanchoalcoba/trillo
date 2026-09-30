import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Droplets, ShieldAlert, Award, Compass, Zap } from 'lucide-react';

const COURSES = {
  '21K': {
    distancia: '21.4 Km',
    desnivel: '+340m D+',
    puntosHidratacion: '4 Puestos',
    dificultad: 'Técnica Media-Alta',
    terreno: 'Balastro 45% · Sendero 40% · Piedra 15%',
    luzObligatoria: 'Sí (Frontal desde 19:45 HS)',
    puntos: [
      { km: 0, alt: 84, name: 'Largada Plaza San Pedro', desc: 'Salida neutralizada sobre camino ancho' },
      { km: 4, alt: 62, name: 'Vado de Paso del Sauce', desc: 'Puesto Hidratación 1 · Cruce bajo de agua' },
      { km: 9, alt: 242, name: 'Cima Cerro de los Zorros', desc: 'Máximo desnivel +180m · Vista panorámica' },
      { km: 14, alt: 110, name: 'Monte Nativo & Puesto 2', desc: 'Sendero cerrado entre espinillos nativos' },
      { km: 18, alt: 95, name: 'Tramo Nocturno de Antorchas', desc: 'Encendido obligatorio de linternas' },
      { km: 21, alt: 88, name: 'Arco de Llegada & Fogón', desc: 'Meta Finisher · Medalla y Asado' },
    ],
  },
  '10K': {
    distancia: '10.2 Km',
    desnivel: '+160m D+',
    puntosHidratacion: '2 Puestos',
    dificultad: 'Media',
    terreno: 'Balastro 70% · Sendero 30%',
    luzObligatoria: 'Recomendada',
    puntos: [
      { km: 0, alt: 84, name: 'Largada Plaza San Pedro', desc: 'Salida con toda la marea de corredores' },
      { km: 3, alt: 62, name: 'Vado Paso del Sauce', desc: 'Puesto Hidratación 1' },
      { km: 6, alt: 155, name: 'Loma de San Pedro', desc: 'Tramo de repecho y tierra colorada' },
      { km: 10, alt: 88, name: 'Arco de Llegada', desc: 'Meta Finisher con aplausos y medalla' },
    ],
  },
  '5K': {
    distancia: '5.1 Km',
    desnivel: '+75m D+',
    puntosHidratacion: '1 Puesto',
    dificultad: 'Accesible / Participativa',
    terreno: 'Camino Firme & Balastro 90%',
    luzObligatoria: 'No necesaria',
    puntos: [
      { km: 0, alt: 84, name: 'Largada Plaza San Pedro', desc: 'Inicio accesible para todo público' },
      { km: 2.5, alt: 98, name: 'Retorno del Molino', desc: 'Puesto de hidratación & Frutas' },
      { km: 5.1, alt: 88, name: 'Arco de Llegada', desc: 'Celebración y bienvenida a meta' },
    ],
  },
};

export default function EventosTelemetry() {
  const [selectedCourse, setSelectedCourse] = useState('21K');
  const [activePoint, setActivePoint] = useState(COURSES['21K'].puntos[2]);

  const course = COURSES[selectedCourse];

  return (
    <section id="circuito" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[#d8cfc4] mb-3 border border-[#e87a38]/30">
            <Compass className="w-3 h-3 text-[#e87a38]" />
            <span className="tracking-widest uppercase text-[10px] font-mono">
              Altimetría y Topografía de Carrera
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit'] uppercase text-[#f5f4f0] tracking-tight">
            PERFIL DEL CIRCUITO <span className="font-['Newsreader'] italic font-light text-[#e87a38]">San Pedro</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#8d9299] max-w-xl">
            Conocé el relieve del terreno, desniveles acumulados y puntos clave de asistencia.
            Hacé click en las distancias para cambiar de trazado.
          </p>
        </div>

        {/* Selector de Distancia */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-full border border-white/10">
          {['5K', '10K', '21K'].map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedCourse(d);
                setActivePoint(COURSES[d].puntos[Math.floor(COURSES[d].puntos.length / 2)]);
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCourse === d
                  ? 'bg-[#e87a38] text-white shadow-lg shadow-[#e87a38]/30 font-bold'
                  : 'text-[#8d9299] hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjeta Altimétrica Principal */}
      <div className="rounded-3xl glass-panel border border-white/10 bg-[#0d1015]/85 p-6 sm:p-8 shadow-2xl">
        {/* Métricas Resumen */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono uppercase text-[#8d9299]">Distancia Oficial</span>
            <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#f5f4f0] mt-1">
              {course.distancia}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8d9299]">Desnivel Positivo</span>
            <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#e87a38] mt-1 flex items-center gap-1.5">
              <Mountain className="w-5 h-5 text-[#e87a38]" />
              <span>{course.desnivel}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8d9299]">Hidratación</span>
            <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#f5f4f0] mt-1 flex items-center gap-1.5">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span>{course.puntosHidratacion}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#8d9299]">Dificultad</span>
            <div className="text-lg sm:text-xl font-bold font-['Outfit'] text-amber-300 mt-2">
              {course.dificultad}
            </div>
          </div>
        </div>

        {/* Gráfico SVG de Elevación Interactivo */}
        <div className="pt-8">
          <div className="flex items-center justify-between text-xs font-mono text-[#8d9299] mb-3">
            <span>PERFIL DE ELEVACIÓN (MTS SOBRE NIVEL DEL MAR)</span>
            <span className="text-[#e87a38]">Hacé click en los hitos para ver detalles</span>
          </div>

          <div className="relative h-[220px] w-full bg-black/40 rounded-2xl p-4 border border-white/5 overflow-hidden">
            {/* Curva SVG */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e87a38" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#e87a38" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Área bajo la curva */}
              <path
                d={
                  selectedCourse === '21K'
                    ? 'M 0 140 Q 150 180, 250 160 T 400 30 T 550 130 T 700 140 L 800 135 L 800 200 L 0 200 Z'
                    : selectedCourse === '10K'
                    ? 'M 0 140 Q 200 180, 400 110 T 800 135 L 800 200 L 0 200 Z'
                    : 'M 0 140 Q 400 110, 800 135 L 800 200 L 0 200 Z'
                }
                fill="url(#elevationGrad)"
              />

              {/* Línea de relieve */}
              <path
                d={
                  selectedCourse === '21K'
                    ? 'M 0 140 Q 150 180, 250 160 T 400 30 T 550 130 T 700 140 L 800 135'
                    : selectedCourse === '10K'
                    ? 'M 0 140 Q 200 180, 400 110 T 800 135'
                    : 'M 0 140 Q 400 110, 800 135'
                }
                fill="none"
                stroke="#e87a38"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Checkpoints interactivos sobre el gráfico */}
            <div className="absolute inset-x-8 bottom-6 top-8 flex justify-between items-end pointer-events-none">
              {course.puntos.map((pt, idx) => {
                const isActive = activePoint?.name === pt.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePoint(pt)}
                    className={`pointer-events-auto flex flex-col items-center group transition-all duration-300 ${
                      isActive ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isActive
                          ? 'bg-white border-[#e87a38] shadow-[0_0_15px_#e87a38]'
                          : 'bg-[#e87a38] border-[#0d1015] group-hover:bg-white'
                      }`}
                    />
                    <span className="text-[10px] font-mono text-[#f5f4f0] mt-2 font-bold whitespace-nowrap">
                      Km {pt.km}
                    </span>
                    <span className="text-[9px] font-mono text-[#8d9299] whitespace-nowrap">
                      {pt.alt}m
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ficha del Checkpoint Seleccionado */}
        {activePoint && (
          <motion.div
            key={activePoint.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
          >
            <div>
              <span className="text-[#e87a38] uppercase font-bold text-[10px]">
                Hito Seleccionado · Km {activePoint.km} ({activePoint.alt}m de altitud)
              </span>
              <h4 className="text-base font-bold font-['Outfit'] text-[#f5f4f0] mt-0.5">
                {activePoint.name}
              </h4>
              <p className="text-[#8d9299] mt-0.5">{activePoint.desc}</p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#d8cfc4] text-[11px]">
                Superficie: {course.terreno.split('·')[0]}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

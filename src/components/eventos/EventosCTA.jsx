import React from 'react';
import { HelpCircle, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventosCTA() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="relative pt-12 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Preguntas Frecuentes Rápidas */}
      <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#8d9299]">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Space_Grotesk'] text-[#f5f4f0] flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Qué distancias son para debutantes?
          </h4>
          <p className="leading-relaxed">
            Las modalidades de 5K y 7K están pensadas para corredores de cualquier nivel, incluso sin experiencia previa en carreras.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Space_Grotesk'] text-[#f5f4f0] flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Cómo se retira el kit oficial?
          </h4>
          <p className="leading-relaxed">
            En la sede de Trillo en Durazno durante la semana previa, o el mismo día del evento en el campamento base de la carrera.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
          <h4 className="text-sm font-bold font-['Space_Grotesk'] text-[#f5f4f0] flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#e87a38]" />
            ¿Tienen descuentos para grupos?
          </h4>
          <p className="leading-relaxed">
            Sí. Equipos de entrenamiento, gimnasios y grupos de más de 5 corredores cuentan con bonificaciones especiales y retiro conjunto.
          </p>
        </div>
      </div>

      {/* Footer Eventos */}
      <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8d9299]">
        <div className="flex items-center gap-3">
          <span className="font-['Space_Grotesk'] font-black tracking-widest text-[#f5f4f0] uppercase text-sm">
            TRILLO EVENTOS
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono">Rebollo · Laberinto · San Pedro · Durazno</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <Link to="/" className="text-[#8d9299] hover:text-white transition-colors">
            ← Universo Trillo
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/club" className="text-amber-400 hover:underline">
            El Club de Corredores →
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/aventuras" className="text-[#4ade80] hover:underline">
            Trillo Aventuras →
          </Link>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-[#f5f4f0] transition-colors p-2 rounded-full border border-white/10 hover:border-[#e87a38] cursor-pointer"
          title="Volver arriba"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#e87a38]" />
          <span className="font-mono uppercase text-[10px]">Arriba</span>
        </button>
      </footer>
    </section>
  );
}

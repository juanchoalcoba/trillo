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
    </section>
  );
}

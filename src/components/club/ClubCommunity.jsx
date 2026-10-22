import React from 'react';

export default function ClubCommunity() {
  const values = [
    { label: 'Competir', desc: 'Desafiarnos con respeto hacia nosotros mismos y el entorno.' },
    { label: 'Compartir', desc: 'El esfuerzo se divide y la alegría de cruzar la meta se multiplica.' },
    { label: 'Pasear', desc: 'Aprender a mirar el paisaje de Durazno con ojos nuevos a cada zancada.' },
    { label: 'Disfrutar', desc: 'Porque si no hay sonrisa en el camino, no es el espíritu de El Club.' },
  ];

  return (
    <section id="rioyi" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
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

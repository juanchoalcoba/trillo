import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

export default function ClubJoinSection() {
  return (
    <section id="unirme" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* Banner Final de Conversión */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-8 sm:p-12 lg:p-16 glass-panel border border-amber-400/40 relative overflow-hidden mb-20 bg-gradient-to-br from-amber-500/20 via-[#0d1015] to-[#08090a]"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4 border border-amber-400/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Afiliación Inmediata</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight leading-tight">
            Empezá a Entrenar con Nosotros Esta Semana
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#d8cfc4] leading-relaxed">
            No importa tu nivel actual ni si nunca corriste antes. Te invitamos a una clase de prueba sin costo para que conozcas al grupo, a los profes y el ritmo de los entrenamientos.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20coordinar%20mi%20primera%20clase%20de%20prueba%20en%20El%20Club%20de%20Corredores."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-all duration-300 shadow-xl shadow-amber-400/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir Clase de Prueba Gratis</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="text-xs text-[#8d9299] font-mono">
              Contacto directo: +598 98 121 608 · Durazno
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

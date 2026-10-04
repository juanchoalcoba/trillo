import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MessageCircle, ChevronDown, Sparkles, MapPin, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AventurasCTA() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: '¿Se requiere experiencia previa en kayak o montañismo?',
      a: 'Para las experiencias en Durazno y la mayoría de las Nacionales, no se requiere experiencia técnica previa; solo una condición física saludable y entusiasmo. En las expediciones de Alta Montaña (como el Cruce de los Andes) solicitamos un apto médico y experiencia previa en caminatas de media montaña.',
    },
    {
      q: '¿Qué sucede si las condiciones climáticas son adversas?',
      a: 'La seguridad es innegociable. Si el pronóstico emite alertas de tormentas severas o crecida extraordinaria del Río Yí, la actividad se reprograma de mutuo acuerdo o se adapta el circuito por senderos seguros alternativos.',
    },
    {
      q: '¿Podemos armar una aventura privada para un grupo o empresa?',
      a: '¡Totalmente! Diseñamos travesías exclusivas para grupos de amigos, familias, equipos corporativos o clubes deportivos, adaptando el nivel de exigencia, los días y la gastronomía.',
    },
    {
      q: '¿Cómo reservo mi lugar para una fecha abierta?',
      a: 'Escribinos directo a nuestro WhatsApp. Te enviamos la ficha médica, el detalle de lo que tenés que empacar y coordinamos la seña para congelar tu lugar en el grupo reducido.',
    },
  ];

  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Banner de Expedición a Medida */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-8 sm:p-12 lg:p-16 glass-panel border border-[#4ade80]/30 relative overflow-hidden mb-20 bg-gradient-to-br from-[#4ade80]/10 via-[#0c0e12] to-[#08090a]"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-[#4ade80]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-xs font-mono uppercase tracking-wider mb-4 border border-[#4ade80]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salidas Privadas & Corporativas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight leading-tight">
            ¿Tenés un grupo o querés diseñar tu propia expedición?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#d8cfc4] leading-relaxed">
            Armamos travesías a medida para grupos cerrados, familias y empresas. Vos elegís el destino (Durazno, sierras del interior o cordillera) y nosotros nos encargamos de los guías, la logística, los campamentos y la seguridad.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/59899360000?text=Hola%20Trillo!%20Quiero%20consultar%20por%20una%20expedici%C3%B3n%20a%20medida%20para%20un%20grupo%20privado."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#4ade80] hover:bg-[#22c55e] transition-all duration-300 shadow-xl shadow-[#4ade80]/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Coordinar Aventura Privada</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="text-xs text-[#8d9299] font-mono">
              Respuesta en el día · Asesoramiento personalizado
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preguntas Frecuentes Rápidas */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8d9299]">
            Despejá tus Dudas
          </span>
          <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mt-1">
            Preguntas Frecuentes
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-medium text-[#f5f4f0]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#4ade80] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-[#8d9299] leading-relaxed border-t border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Conexión Universo Trillo */}
      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8d9299]">
        <div className="flex items-center gap-3">
          <img
            src="/logoTrillo.png"
            alt="TRILLO"
            className="h-6 w-auto max-w-[90px] object-contain opacity-80"
          />
          <span className="text-[11px] font-mono">
            TRILLO AVENTURAS © {new Date().getFullYear()} · Durazno, Uruguay
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
          <Link to="/eventos" className="hover:text-[#e87a38] transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38]" />
            Trillo Eventos (San Pedro)
          </Link>
          <Link to="/club" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            El Club de Corredores
          </Link>
          <Link to="/" className="hover:text-white transition-colors">
            Inicio Trillo
          </Link>
        </div>
      </div>
    </section>
  );
}

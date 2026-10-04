import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TiendaBanner() {
  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Banner de Pedidos Especiales & Equipos */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl p-8 sm:p-12 lg:p-16 glass-panel border border-violet-500/30 relative overflow-hidden mb-20 bg-gradient-to-br from-violet-600/15 via-[#0d1015] to-[#08090a]"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4 border border-violet-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pedidos para Equipos & Grupos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight leading-tight">
            ¿Querés indumentaria personalizada para tu grupo o empresa?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#d8cfc4] leading-relaxed">
            Diseñamos y confeccionamos remeras técnicas, musculosas, camperas y accesorios para equipos de running, grupos de aventura, empresas e instituciones deportivas con la calidad de Trillo.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20consultar%20por%20confecci%C3%B3n%20de%20indumentaria%20para%20un%20equipo/empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 transition-all duration-300 shadow-xl shadow-violet-600/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por Diseños Especiales</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="text-xs text-[#8d9299] font-mono">
              Atención personalizada: +598 98 121 608
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Confianza en Compra */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-1">
              Envíos a Todo el País
            </h4>
            <p className="text-xs text-[#8d9299] leading-relaxed">
              Despachamos por DAC o Mirtrans a tu domicilio o agencia más cercana en 24 a 48 hs hábiles.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-1">
              Cambio de Talle Fácil
            </h4>
            <p className="text-xs text-[#8d9299] leading-relaxed">
              Si no te queda como esperabas, coordinamos el cambio de talle sin complicaciones.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-1">
              Retiro Gratuito en Durazno
            </h4>
            <p className="text-xs text-[#8d9299] leading-relaxed">
              Podés retirar tu pedido sin costo en los entrenamientos semanales de El Club de Corredores.
            </p>
          </div>
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
            TIENDA TRILLO © {new Date().getFullYear()} · Durazno, Uruguay
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
          <Link to="/eventos" className="hover:text-[#e87a38] transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38]" />
            Trillo Eventos
          </Link>
          <Link to="/aventuras" className="hover:text-[#4ade80] transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            Trillo Aventuras
          </Link>
          <Link to="/club" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            El Club
          </Link>
          <Link to="/" className="hover:text-white transition-colors">
            Inicio Trillo
          </Link>
        </div>
      </div>
    </section>
  );
}

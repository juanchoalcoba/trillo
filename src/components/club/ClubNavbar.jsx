import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Menu, X, Sun, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClubNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-500 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-500 pointer-events-auto ${
          scrolled
            ? 'glass-panel shadow-2xl border-white/10 bg-[#08090a]/90 backdrop-blur-xl'
            : 'bg-[#08090a]/75 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Left: Brand Identidad Club de Corredores con logo redondeado */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-[#8d9299] hover:text-[#f5f4f0] transition-colors font-mono tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-amber-400" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>

          <div className="h-4 w-px bg-white/15 hidden sm:block" />

          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400/40 p-0.5 bg-black/40 group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/logocorredores.png"
                alt="El Club de Corredores"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-['Space_Grotesk'] font-bold tracking-wider text-xs sm:text-sm text-[#f5f4f0] uppercase">
                  EL CLUB
                </span>
                <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded-full font-mono font-bold tracking-wider border border-amber-500/30">
                  DURAZNO
                </span>
              </div>
              <span className="text-[9px] tracking-wider text-[#8d9299] font-mono -mt-0.5 hidden sm:block">
                Comunidad Activa
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <a
            href="#disciplinas"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            Disciplinas
          </a>
          <a
            href="#membresia"
            className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Cuota & Beneficios
          </a>
          <a
            href="#rioyi"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            El Río Yí
          </a>
          <a
            href="#unirme"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            Sumarme
          </a>
        </nav>

        {/* Right CTA con Teléfono Real */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#8d9299] font-mono">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>PASE LIBRE SEMANAL</span>
          </div>

          <a
            href="https://wa.me/59898121608?text=Hola!%20Quiero%20sumarme%20a%20El%20Club%20de%20Corredores%20en%20Durazno"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-400/20 active:scale-95"
          >
            <span>Unirme al Club</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#f5f4f0] hover:text-amber-400 transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto lg:hidden mt-2 mx-auto max-w-7xl glass-panel rounded-2xl p-6 flex flex-col gap-4 border border-white/10 bg-[#08090a]/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                El Club de Corredores
              </span>
              <span className="text-[11px] font-mono text-[#8d9299]">Durazno</span>
            </div>

            <a
              href="#disciplinas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-amber-400 transition-colors font-medium"
            >
              Disciplinas (Running, Trail, Funcional)
            </a>

            <a
              href="#membresia"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-amber-300 hover:text-amber-200 transition-colors font-medium flex items-center justify-between"
            >
              <span>Cuota Mensual & Beneficios</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-mono">
                Afiliación
              </span>
            </a>

            <a
              href="#rioyi"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-amber-400 transition-colors font-medium"
            >
              El Río Yí & Territorio
            </a>

            <a
              href="#unirme"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-amber-400 transition-colors font-medium"
            >
              Planes & Formulario
            </a>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="https://wa.me/59898121608?text=Hola!%20Quiero%20sumarme%20a%20El%20Club%20de%20Corredores%20en%20Durazno"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full text-center text-xs font-semibold bg-amber-400 text-black hover:bg-amber-300 transition-colors"
              >
                Inscribirme por WhatsApp
              </a>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 rounded-full text-center text-xs font-mono text-[#8d9299] hover:text-white"
              >
                Volver a la Portada Trillo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

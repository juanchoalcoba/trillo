import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Menu, X, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventosNavbar() {
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
            ? 'glass-panel shadow-2xl border-white/10 bg-[#0d1015]/90 backdrop-blur-xl'
            : 'bg-[#0d1015]/75 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Left: Brand Identidad San Pedro */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-[#e87a38]/20 border border-[#e87a38]/50 flex items-center justify-center text-[#e87a38] group-hover:scale-105 group-hover:bg-[#e87a38]/30 transition-all">
            <Flame className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-['Outfit'] font-black tracking-widest text-sm text-[#f5f4f0] uppercase">
                TRILLO
              </span>
              <span className="text-[10px] bg-[#e87a38]/20 text-[#e87a38] px-1.5 py-0.2 rounded font-mono font-bold tracking-wider">
                EVENTOS
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-[#8d9299] font-mono -mt-0.5">
              San Pedro · Durazno
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links (Espaciados y limpios) */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#circuito"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            Circuito & Altimetría
          </a>
          <a
            href="#galeria"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors flex items-center gap-1.5"
          >
            Galería
            <span className="text-[9px] bg-white/10 text-[#d8cfc4] px-1.5 py-0.5 rounded-full font-mono">
              Fotos
            </span>
          </a>
          <a
            href="#kits"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            Kits & Medalla
          </a>
          <Link
            to="/club"
            className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            El Club →
          </Link>
        </nav>

        {/* Right: Acciones (Volver a Universo + Botón Inscribirme) */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/"
            className="text-xs font-mono text-[#8d9299] hover:text-white transition-colors flex items-center gap-1.5"
            title="Volver a la portada de Universo Trillo"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Universo Trillo</span>
          </Link>

          <a
            href="#inscripcion"
            className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#e87a38] to-[#c65d28] hover:shadow-lg hover:shadow-[#e87a38]/30 transition-all duration-300 active:scale-95"
          >
            <span>Inscribirme</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#inscripcion"
            className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white bg-[#e87a38]"
          >
            Inscribirme
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#f5f4f0] hover:text-[#e87a38] transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto md:hidden mt-2 mx-auto max-w-7xl glass-panel bg-[#0d1015]/95 rounded-2xl p-6 flex flex-col gap-4 border border-white/10 shadow-2xl"
          >
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors"
            >
              Largada & San Pedro
            </a>
            <a
              href="#circuito"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors"
            >
              Circuito & Altimetría
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors"
            >
              Galería de Fotos
            </a>
            <a
              href="#kits"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors"
            >
              Kits & Medalla Finisher
            </a>
            <Link
              to="/club"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-amber-400 hover:text-amber-300 transition-colors"
            >
              El Club de Corredores →
            </Link>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#8d9299] font-mono hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Universo Trillo</span>
              </Link>
              <a
                href="#inscripcion"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#e87a38] text-white"
              >
                Inscribirme
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

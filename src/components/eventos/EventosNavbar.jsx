import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Menu, X, Flame, Trophy } from 'lucide-react';
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

  const whatsappUrl =
    'https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20inscribirme%20o%20consultar%20por%20las%20pr%C3%B3ximas%20carreras%20y%20eventos.';

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-500 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-500 pointer-events-auto ${
          scrolled
            ? 'glass-panel shadow-2xl border-white/10 bg-[#08090a]/90 backdrop-blur-xl'
            : 'bg-[#08090a]/75 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Left: Brand Identidad Trillo Eventos */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-[#8d9299] hover:text-[#f5f4f0] transition-colors font-mono tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#e87a38]" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>

          <div className="h-4 w-px bg-white/15 hidden sm:block" />

          <a href="#hero" className="flex items-center gap-2.5 group">
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="h-6 sm:h-7 w-auto max-w-[100px] object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-[10px] bg-[#e87a38]/15 text-[#e87a38] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider border border-[#e87a38]/30 uppercase">
              Eventos
            </span>
          </a>
        </div>

        {/* Center: Desktop Navigation Categorías / 3 Eventos */}
        <nav className="hidden lg:flex items-center gap-7">
          <a
            href="#rebollo"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f97316] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
            Desafío Rebollo
          </a>
          <a
            href="#laberinto"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#eab308] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
            Laberinto
          </a>
          <a
            href="#san-pedro"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#e87a38] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38]" />
            San Pedro
          </a>
          <a
            href="#galeria"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            Galería
          </a>
          <a
            href="#kits"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            Kits & Remeras
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#8d9299] font-mono">
            <Trophy className="w-3.5 h-3.5 text-[#e87a38]" />
            <span>CALENDARIO 2026/2027</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#e87a38] to-[#ea580c] hover:from-[#f97316] hover:to-[#e87a38] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#e87a38]/20 active:scale-95"
          >
            <span>Inscribirme</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase font-mono tracking-wider text-white bg-[#e87a38] flex items-center gap-1"
          >
            <span>Inscribirme</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto lg:hidden mt-2 mx-auto max-w-7xl glass-panel rounded-2xl p-6 flex flex-col gap-4 border border-white/10 bg-[#08090a]/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="text-[11px] font-mono text-[#8d9299] uppercase tracking-widest border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Eventos Oficiales Trillo</span>
              <span className="text-[#e87a38]">3 Carreras</span>
            </div>

            <nav className="flex flex-col gap-3 font-mono text-sm">
              <a
                href="#rebollo"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f5f4f0] hover:text-[#f97316] transition-colors flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                  <span>Desafío Rebollo</span>
                </div>
                <span className="text-xs text-[#8d9299]">Trail</span>
              </a>

              <a
                href="#laberinto"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f5f4f0] hover:text-[#eab308] transition-colors flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                  <span>Carrera del Laberinto</span>
                </div>
                <span className="text-xs text-[#8d9299]">Cross</span>
              </a>

              <a
                href="#san-pedro"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f5f4f0] hover:text-[#e87a38] transition-colors flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e87a38]" />
                  <span>Corrida San Pedro</span>
                </div>
                <span className="text-xs text-[#8d9299]">Oficial</span>
              </a>

              <a
                href="#galeria"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8d9299] hover:text-white transition-colors py-1"
              >
                Galería de Fotos
              </a>

              <a
                href="#kits"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8d9299] hover:text-white transition-colors py-1"
              >
                Kits & Remeras
              </a>
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e87a38] to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg shadow-[#e87a38]/20"
              >
                <Flame className="w-4 h-4" />
                <span>Inscribirme por WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs text-[#8d9299] hover:text-white py-1.5 font-mono"
              >
                ← Volver a Universo Trillo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Menu, X, Compass, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AventurasNavbar() {
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
        {/* Left: Brand Identidad Trillo Aventuras */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-[#8d9299] hover:text-[#f5f4f0] transition-colors font-mono tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#4ade80]" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>

          <div className="h-4 w-px bg-white/15 hidden sm:block" />

          <a href="#hero" className="flex items-center gap-2.5 group">
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="h-6 sm:h-7 w-auto max-w-[100px] object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-[10px] bg-[#4ade80]/15 text-[#4ade80] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider border border-[#4ade80]/30 uppercase">
              Aventuras
            </span>
          </a>
        </div>

        {/* Center: Desktop Navigation Categorías */}
        <nav className="hidden lg:flex items-center gap-7">
          <a
            href="#durazno"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#4ade80] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            Durazno
          </a>
          <a
            href="#nacionales"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            Nacionales
          </a>
          <a
            href="#internacionales"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f59e0b] transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            Internacionales
          </a>
          <a
            href="#galeria-aventuras"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#4ade80] transition-colors"
          >
            Galería
          </a>
          <a
            href="#filosofia"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors"
          >
            Seguridad & Guías
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#8d9299] font-mono">
            <Compass className="w-3.5 h-3.5 text-[#4ade80]" />
            <span>EXPEDICIONES 2026/2027</span>
          </div>

          <a
            href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20consultar%20por%20las%20pr%C3%B3ximas%20expediciones%20de%20Trillo%20Aventuras."
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-[#4ade80] hover:bg-[#22c55e] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#4ade80]/20 active:scale-95"
          >
            <span>Consultar Salidas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#f5f4f0] hover:text-[#4ade80] transition-colors"
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
              <span className="text-xs font-mono uppercase tracking-widest text-[#4ade80]">
                Trillo Aventuras
              </span>
              <span className="text-[11px] font-mono text-[#8d9299]">Exploración</span>
            </div>

            <a
              href="#durazno"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#4ade80] transition-colors font-medium flex items-center justify-between"
            >
              <span>Experiencias en Durazno</span>
              <span className="text-xs bg-[#4ade80]/20 text-[#4ade80] px-2 py-0.5 rounded-full font-mono">
                Río Yí & Montes
              </span>
            </a>

            <a
              href="#nacionales"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#38bdf8] transition-colors font-medium flex items-center justify-between"
            >
              <span>Experiencias Nacionales</span>
              <span className="text-xs bg-[#38bdf8]/20 text-[#38bdf8] px-2 py-0.5 rounded-full font-mono">
                Uruguay Salvaje
              </span>
            </a>

            <a
              href="#internacionales"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#f59e0b] transition-colors font-medium flex items-center justify-between"
            >
              <span>Experiencias Internacionales</span>
              <span className="text-xs bg-[#f59e0b]/20 text-[#f59e0b] px-2 py-0.5 rounded-full font-mono">
                Andes & Patagonia
              </span>
            </a>

            <a
              href="#galeria-aventuras"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#4ade80] transition-colors font-medium flex items-center justify-between"
            >
              <span>Galería de Expediciones</span>
              <span className="text-xs bg-[#4ade80]/20 text-[#4ade80] px-2 py-0.5 rounded-full font-mono">
                Fotos Reales
              </span>
            </a>

            <a
              href="#filosofia"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-white transition-colors font-medium"
            >
              Seguridad, Logística & Protocolos
            </a>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20consultar%20por%20las%20pr%C3%B3ximas%20expediciones%20de%20Trillo%20Aventuras."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full text-center text-xs font-semibold bg-[#4ade80] text-black hover:bg-[#22c55e] transition-colors"
              >
                Consultar por WhatsApp
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

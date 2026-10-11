import React, { useState, useEffect } from 'react';
import { Compass, ArrowUpRight, Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-500 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-3.5 rounded-full transition-all duration-500 pointer-events-auto ${
          scrolled
            ? 'glass-panel shadow-2xl border-white/10'
            : 'bg-black/30 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center group py-0.5 select-none" aria-label="TRILLO Inicio">
          <img
            src="/logoTrillo.png"
            alt="TRILLO"
            className="h-7 sm:h-8 w-auto max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
          />
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          <a
            href="#about"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            Qué es Trillo
          </a>
          <Link
            to="/eventos"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            Eventos
          </Link>
          <Link
            to="/aventuras"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            Aventuras
          </Link>
          <Link
            to="/club"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            El Club
          </Link>
          <a
            href="#nosotros"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            Sobre Nosotros
          </a>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8d9299] hover:text-violet-300 transition-colors duration-200 tracking-wide group"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-violet-400/80 group-hover:text-violet-300 transition-all duration-200 group-hover:scale-110" />
            <span>TiendaTrillo</span>
          </Link>
        </nav>

        {/* Right CTA & Coordinates */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-xs text-[#8d9299] font-mono">
            <Compass className="w-3.5 h-3.5 text-[#e87a38]" />
            <span>33°22'S 56°31'W</span>
          </div>

          <Link
            to="/contacto"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-[#f5f4f0] hover:bg-[#e87a38] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#e87a38]/20"
          >
            <span>Contactanos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#f5f4f0] hover:text-[#e87a38] transition-colors"
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
            className="pointer-events-auto md:hidden mt-2 mx-auto max-w-7xl rounded-2xl p-6 flex flex-col gap-4 border border-white/15 bg-[#0b0d11]/98 backdrop-blur-2xl shadow-2xl shadow-black/90"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#e87a38] font-semibold">
                Menú Trillo
              </span>
              <span className="text-[11px] font-mono text-[#8d9299]">Durazno, Uruguay</span>
            </div>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium py-0.5"
            >
              Qué es Trillo
            </a>
            <Link
              to="/eventos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium py-0.5"
            >
              Eventos
            </Link>
            <Link
              to="/aventuras"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#4ade80] transition-colors font-medium py-0.5"
            >
              Aventuras
            </Link>
            <Link
              to="/club"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-amber-400 transition-colors font-medium py-0.5"
            >
              El Club
            </Link>
            <a
              href="#nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium py-0.5"
            >
              Sobre Nosotros
            </a>
            <Link
              to="/tienda"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 text-base text-[#f5f4f0] hover:text-violet-400 transition-colors font-medium py-0.5"
            >
              <ShoppingBag className="w-4 h-4 text-violet-400" />
              <span>TiendaTrillo</span>
            </Link>
            <Link
              to="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#e87a38] hover:text-white transition-colors font-medium py-0.5"
            >
              Contactanos
            </Link>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#8d9299] font-mono">33°22'S 56°31'W</span>
              <Link
                to="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#e87a38] text-white shadow-md hover:bg-[#ea580c] transition-colors"
              >
                Contactanos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

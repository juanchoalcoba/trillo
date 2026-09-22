import React, { useState, useEffect } from 'react';
import { Compass, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-3.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass-panel shadow-2xl border-white/10'
            : 'bg-black/30 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-[#14171c] border border-[#e87a38]/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#e87a38]">
            <span className="w-2.5 h-2.5 rotate-45 bg-[#e87a38] transition-all duration-300 group-hover:bg-[#f49358]" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Outfit'] font-black tracking-[0.25em] text-lg text-[#f5f4f0] uppercase">
              TRILLO
            </span>
            <span className="text-[9px] tracking-widest text-[#8d9299] uppercase -mt-1 font-mono">
              Universo · UY
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            Qué es Trillo
          </a>
          <a
            href="#universo"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            Universo
          </a>
          <a
            href="#eventos"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide flex items-center gap-1.5"
          >
            Eventos
            <span className="text-[10px] bg-[#e87a38]/15 text-[#e87a38] px-1.5 py-0.5 rounded-full border border-[#e87a38]/30">
              San Pedro
            </span>
          </a>
          <a
            href="#aventuras"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            Aventuras
          </a>
          <a
            href="#club"
            className="text-sm font-medium text-[#8d9299] hover:text-[#f5f4f0] transition-colors duration-200 tracking-wide"
          >
            El Club
          </a>
        </nav>

        {/* Right CTA & Coordinates */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-xs text-[#8d9299] font-mono">
            <Compass className="w-3.5 h-3.5 text-[#e87a38]" />
            <span>33°22'S 56°31'W</span>
          </div>

          <a
            href="#about"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-[#f5f4f0] hover:bg-[#e87a38] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#e87a38]/20"
          >
            <span>Animate a vivir</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
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
            className="md:hidden mt-2 mx-auto max-w-7xl glass-panel rounded-2xl p-6 flex flex-col gap-4 border border-white/10"
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium"
            >
              Qué es Trillo
            </a>
            <a
              href="#universo"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium"
            >
              Universo Trillo
            </a>
            <a
              href="#eventos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium"
            >
              Trillo Eventos
            </a>
            <a
              href="#aventuras"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium"
            >
              Trillo Aventuras
            </a>
            <a
              href="#club"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-[#e87a38] transition-colors font-medium"
            >
              El Club
            </a>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#8d9299] font-mono">Durazno, Uruguay</span>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#e87a38] text-white"
              >
                Animate a vivir
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

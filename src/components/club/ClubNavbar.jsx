import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Menu, X, Sun, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClubNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-3.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-amber-900/10'
            : 'bg-white/50 backdrop-blur-md border border-amber-900/5'
        }`}
      >
        {/* Left: Volver a Universo Trillo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-950/70 hover:text-amber-600 transition-colors group"
        >
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center transition-transform group-hover:-translate-x-1">
            <ArrowLeft className="w-3.5 h-3.5 text-amber-800" />
          </div>
          <span className="hidden sm:inline font-mono">Universo Trillo</span>
        </Link>

        {/* Center: Brand Club de Corredores */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-md">
            <Sun className="w-4 h-4 text-white animate-spin-slow" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-['Outfit'] font-extrabold tracking-wider text-sm text-stone-900 uppercase">
              EL CLUB
            </span>
            <span className="text-[9px] tracking-widest text-amber-800/80 font-mono -mt-1 uppercase">
              Durazno · Río Yí
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-stone-700">
          <a href="#disciplinas" className="hover:text-amber-600 transition-colors">
            Disciplinas
          </a>
          <a href="#rioyi" className="hover:text-amber-600 transition-colors">
            El Río Yí
          </a>
          <a href="#comunidad" className="hover:text-amber-600 transition-colors">
            Comunidad
          </a>
          <a href="#unirme" className="hover:text-amber-600 transition-colors">
            Entrenar
          </a>
        </nav>

        {/* Right CTA WhatsApp */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/59899360000?text=Hola!%20Quiero%20sumarme%20a%20El%20Club%20de%20Corredores%20en%20Durazno"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 transition-all shadow-md hover:shadow-lg shadow-amber-600/20"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Sumarme al Club</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-stone-800 hover:text-amber-600"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 max-w-7xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-amber-900/10 flex flex-col gap-4 text-stone-800"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-amber-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Universo Trillo</span>
            </Link>
            <a
              href="#disciplinas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium hover:text-amber-600"
            >
              Disciplinas (Running, Trail, Funcional)
            </a>
            <a
              href="#rioyi"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium hover:text-amber-600"
            >
              El Río Yí como escenario
            </a>
            <a
              href="#comunidad"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium hover:text-amber-600"
            >
              Nuestra Comunidad
            </a>
            <div className="pt-3 border-t border-stone-200">
              <a
                href="https://wa.me/59899360000?text=Hola!%20Quiero%20sumarme%20a%20El%20Club%20de%20Corredores%20en%20Durazno"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-amber-600"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Sumarme al Club por WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

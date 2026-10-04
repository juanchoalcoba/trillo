import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function TiendaNavbar() {
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
        {/* Left: Brand Identidad Tienda Trillo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-[#8d9299] hover:text-[#f5f4f0] transition-colors font-mono tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-violet-400" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>

          <div className="h-4 w-px bg-white/15 hidden sm:block" />

          <a href="#hero" className="flex items-center gap-2.5 group">
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="h-6 sm:h-7 w-auto max-w-[95px] object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full font-mono font-bold tracking-wider border border-violet-500/30 uppercase">
              Tienda
            </span>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <a
            href="#catalogo"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-white transition-colors"
          >
            Catálogo
          </a>
          <a
            href="#catalogo"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-amber-400 transition-colors"
          >
            Colección Club
          </a>
          <a
            href="#catalogo"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-red-400 transition-colors"
          >
            Edición San Pedro
          </a>
          <a
            href="#catalogo"
            className="text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-purple-300 transition-colors"
          >
            Streetwear
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#8d9299] font-mono">
            <ShoppingBag className="w-3.5 h-3.5 text-violet-400" />
            <span>ENVÍOS A TODO URUGUAY</span>
          </div>

          <a
            href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20hacer%20un%20pedido%20o%20consulta%20en%20Tienda%20Trillo."
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-violet-600/25 active:scale-95"
          >
            <span>Consultar Stock</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#f5f4f0] hover:text-violet-400 transition-colors"
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
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
                Tienda Trillo Oficial
              </span>
              <span className="text-[11px] font-mono text-[#8d9299]">Durazno</span>
            </div>

            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#f5f4f0] hover:text-violet-400 transition-colors font-medium"
            >
              Catálogo de Ropa Oficial
            </a>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quiero%20hacer%20un%20pedido%20en%20Tienda%20Trillo."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full text-center text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-colors"
              >
                Comprar por WhatsApp
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

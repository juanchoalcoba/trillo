import React from 'react';
import TrilloCanvas from '../components/3d/TrilloCanvas';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-[#e87a38] selection:text-black">
      {/* 3D WebGL Atmosphere Canvas (Luna Hiperreal & Estrellas nocturnas) */}
      <TrilloCanvas />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
      </main>

      {/* Footer Minimalista */}
      <footer className="relative z-10 border-t border-white/10 bg-[#08090a]/80 backdrop-blur-md py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8d9299]">
          <div className="flex items-center gap-3">
            <span className="font-['Outfit'] font-black tracking-widest text-[#f5f4f0] uppercase text-sm">
              TRILLO
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono">Universo Trillo · Interior de Uruguay</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Durazno · San Pedro · Laberinto</span>
            <span className="text-white/20">|</span>
            <Link to="/club" className="text-[#e87a38] hover:underline font-semibold">
              Conocer El Club →
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#f5f4f0] transition-colors p-2 rounded-full border border-white/10 hover:border-[#e87a38]"
            title="Volver arriba"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#e87a38]" />
            <span className="font-mono uppercase text-[10px]">Arriba</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

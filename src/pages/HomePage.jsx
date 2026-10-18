import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import SobreNosotrosSection from '../components/about/SobreNosotrosSection';
import Footer from '../components/common/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-[#e87a38] selection:text-black">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SobreNosotrosSection />
      </main>

      {/* Footer Global Unificado */}
      <Footer />
    </div>
  );
}

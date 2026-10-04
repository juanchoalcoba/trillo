import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  MapPin,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Users,
  Eye,
  Sparkles,
  ChevronRight,
  Check,
} from 'lucide-react';
import { ADVENTURE_CATEGORIES, ADVENTURES } from '../../data/adventuresData';
import AventurasDetailModal from './AventurasDetailModal';

export default function AventurasCategories() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeAdventure, setActiveAdventure] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (adventure) => {
    setActiveAdventure(adventure);
    setIsModalOpen(true);
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? ADVENTURE_CATEGORIES
      : ADVENTURE_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header de Sección con Tabs de Filtro Rápido */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#8d9299] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#4ade80]" />
            <span className="font-mono uppercase tracking-widest text-[11px] text-[#f5f4f0]">
              Catálogo de Expediciones
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight">
            Nuestras 3 Expresiones de Aventura
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#8d9299] max-w-2xl">
            Desde la intimidad de los montes y ríos de Durazno, hasta las grandes travesías nacionales y la inmensidad de los Andes. Elegí tu próximo desafío.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0d1015]/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-[#8d9299] hover:text-white'
            }`}
          >
            Todas (9)
          </button>
          {ADVENTURE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-[#8d9299] hover:text-white'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: cat.accent }}
              />
              <span>{cat.name.replace('Experiencias en ', '').replace('Experiencias ', '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Renderizado por Categorías */}
      <div className="space-y-24">
        {filteredCategories.map((category) => {
          const categoryAdventures = ADVENTURES.filter(
            (adv) => adv.category === category.id
          );

          return (
            <div key={category.id} id={category.id} className="scroll-mt-28">
              {/* Header de la Categoría */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: category.accent }}
                  />
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[#f5f4f0]">
                        {category.name}
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 text-[#d8cfc4] bg-white/5">
                        {category.count} Opciones
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#8d9299] mt-1 font-mono">
                      {category.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#8d9299] max-w-md">
                  {category.description}
                </p>
              </div>

              {/* Grid de Tarjetas de Aventura */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {categoryAdventures.map((adventure, idx) => (
                  <motion.div
                    key={adventure.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                    className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-white/25 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1.5"
                  >
                    {/* Contenedor Superior: Imagen & Tags */}
                    <div>
                      <div className="relative h-56 sm:h-60 w-full overflow-hidden">
                        <img
                          src={adventure.image}
                          alt={adventure.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.8] contrast-[1.05]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-black/40" />

                        {/* Badges superiores */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15 font-semibold">
                            {adventure.badge}
                          </span>

                          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#d8cfc4] border border-white/10 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#4ade80]" />
                            {adventure.duration}
                          </span>
                        </div>

                        {/* Location Tag flotante en la imagen */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-[#d8cfc4] font-mono drop-shadow-md">
                          <MapPin className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
                          <span className="truncate">{adventure.location}</span>
                        </div>
                      </div>

                      {/* Info & Contenido de la Tarjeta */}
                      <div className="p-6">
                        <h4 className="text-xl sm:text-2xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] group-hover:text-white transition-colors leading-snug">
                          {adventure.title}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-[#8d9299] line-clamp-2 leading-relaxed">
                          {adventure.description}
                        </p>

                        {/* Métricas Técnicas Rápidas */}
                        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-xs font-mono text-[#8d9299]">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">Nivel: {adventure.difficulty}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                            <span className="truncate">{adventure.groupSize}</span>
                          </div>
                        </div>

                        {/* Bullets de Puntos Clave */}
                        <div className="mt-4 space-y-1.5">
                          {adventure.highlights.slice(0, 2).map((h, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-[#d8cfc4]"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: category.accent }}
                              />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Acciones de la Tarjeta */}
                    <div className="p-6 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDetail(adventure)}
                        className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#f5f4f0] bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-2 group-hover:border-white/30"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#4ade80]" />
                        <span>Ver Ficha Completa</span>
                      </button>

                      <a
                        href={`https://wa.me/59898121608?text=${encodeURIComponent(
                          adventure.whatsappMsg
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl text-black bg-[#4ade80] hover:bg-[#22c55e] transition-all flex items-center justify-center shadow-md hover:scale-105 active:scale-95"
                        title="Consultar por WhatsApp"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal con Dossier Completo */}
      <AventurasDetailModal
        adventure={activeAdventure}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

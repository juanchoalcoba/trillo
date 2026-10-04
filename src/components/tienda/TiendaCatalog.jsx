import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, MessageCircle, ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { TIENDA_CATEGORIES, PRODUCTS } from '../../data/tiendaData';
import TiendaProductModal from './TiendaProductModal';

export default function TiendaCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Control de vista frente/dorso individual por tarjeta
  const [cardViews, setCardViews] = useState({});

  const handleToggleView = (productId, view, e) => {
    e.stopPropagation();
    setCardViews((prev) => ({ ...prev, [productId]: view }));
  };

  const handleOpenModal = (product) => {
    setActiveProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalogo" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header con Filtros */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#8d9299] mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-mono uppercase tracking-widest text-[11px] text-[#f5f4f0]">
              Colección Trillo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight">
            Indumentaria & Artículos Oficiales
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#8d9299] max-w-2xl">
            Prendas confeccionadas con materiales de primera línea. Hacé tu pedido directo por WhatsApp con entrega en Durazno o envíos a cualquier punto del país.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0d1015]/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
          {TIENDA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-[#8d9299] hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product, idx) => {
          const currentView = cardViews[product.id] || 'front';
          const displayedImage =
            currentView === 'front' ? product.frontImage : product.backImage;
          const hasTwoViews = product.frontImage !== product.backImage;
          const defaultWhatsappMsg = `Hola Trillo! Quiero consultar / encargar la prenda: ${product.name} (${product.price} ${product.currency}). ¿Qué talles tienen en stock?`;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-violet-500/40 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-violet-950/20 hover:-translate-y-1.5 bg-[#0c0e12]"
            >
              {/* Contenedor Superior: Imagen y Badges */}
              <div>
                <div
                  onClick={() => handleOpenModal(product)}
                  className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-b from-[#151922] via-[#0f1218] to-[#0c0e12] flex items-center justify-center p-6 cursor-pointer"
                >
                  {/* Imagen de la Prenda */}
                  <motion.img
                    key={displayedImage}
                    initial={{ opacity: 0.6, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={displayedImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges superiores */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border font-bold backdrop-blur-md ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>

                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#d8cfc4] border border-white/10 font-bold">
                      {product.price} {product.currency}
                    </span>
                  </div>

                  {/* Toggle Frente / Dorso en la Tarjeta */}
                  {hasTwoViews && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/75 p-1 rounded-xl border border-white/15 backdrop-blur-md z-10"
                    >
                      <button
                        onClick={(e) => handleToggleView(product.id, 'front', e)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                          currentView === 'front'
                            ? 'bg-white text-black font-bold'
                            : 'text-[#8d9299] hover:text-white'
                        }`}
                      >
                        Frente
                      </button>
                      <button
                        onClick={(e) => handleToggleView(product.id, 'back', e)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                          currentView === 'back'
                            ? 'bg-white text-black font-bold'
                            : 'text-[#8d9299] hover:text-white'
                        }`}
                      >
                        Dorso
                      </button>
                    </div>
                  )}
                </div>

                {/* Info & Contenido de la Tarjeta */}
                <div className="p-6">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold block mb-1">
                    {product.subtitle}
                  </span>

                  <h3
                    onClick={() => handleOpenModal(product)}
                    className="text-xl sm:text-2xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] group-hover:text-white transition-colors leading-snug cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#8d9299] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Talles disponibles */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-[#8d9299]">
                      Talles:
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      {product.sizes.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#d8cfc4]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones de la Tarjeta */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#f5f4f0] bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-2 group-hover:border-white/30"
                >
                  <Eye className="w-3.5 h-3.5 text-violet-400" />
                  <span>Ver Ficha & Talles</span>
                </button>

                <a
                  href={`https://wa.me/59898121608?text=${encodeURIComponent(defaultWhatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-white bg-violet-600 hover:bg-violet-500 transition-all flex items-center justify-center shadow-md hover:scale-105 active:scale-95"
                  title="Comprar / Consultar por WhatsApp"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal con Dossier Completo */}
      <TiendaProductModal
        product={activeProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

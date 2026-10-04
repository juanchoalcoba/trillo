import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MessageCircle, ArrowUpRight, ShieldCheck, Ruler, Truck } from 'lucide-react';

export default function TiendaProductModal({ product, isOpen, onClose }) {
  const [selectedView, setSelectedView] = useState('front');
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[1] || product.sizes[0]);
    }
    setSelectedView('front');
  }, [product]);

  // Manejo de tecla ESC y bloqueo total de scroll (incluido Lenis)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      if (window.lenis) {
        window.lenis.stop();
      }
      const prevOverflow = document.body.style.overflow;
      const prevTouch = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (window.lenis) {
          window.lenis.start();
        }
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouch;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!product) return null;

  const currentImage = selectedView === 'front' ? product.frontImage : product.backImage;
  const whatsappMsg = `Hola Trillo! Quiero comprar / encargar la prenda: ${product.name} en talle ${selectedSize} (${product.price} ${product.currency}). ¿Cómo coordinamos el pago y envío?`;
  const whatsappUrl = `https://wa.me/59898121608?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 pt-20 pb-6 sm:pt-24 sm:pb-8 overflow-hidden"
        >
          {/* Backdrop con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-3xl bg-[#0c0e12] border border-white/20 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[78vh] sm:max-h-[80vh] flex flex-col md:flex-row overscroll-contain"
          >
            {/* Botón Cerrar Siempre Visible */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/85 hover:bg-black text-white border border-white/30 flex items-center justify-center transition-all backdrop-blur-md shadow-2xl active:scale-95"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lado Izquierdo: Visualizador de Prenda (Frente / Dorso) */}
            <div className="md:w-5/12 p-4 sm:p-5 bg-gradient-to-b from-[#14171f] to-[#0c0e12] flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-white/10 relative shrink-0">
              {/* Badge de Categoría */}
              <div className="w-full flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-bold ${product.badgeColor}`}
                >
                  {product.badge}
                </span>

                {/* Toggle Frente / Dorso si aplica */}
                {product.frontImage !== product.backImage && (
                  <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/15">
                    <button
                      onClick={() => setSelectedView('front')}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        selectedView === 'front'
                          ? 'bg-white text-black shadow-md'
                          : 'text-[#8d9299] hover:text-white'
                      }`}
                    >
                      Frente
                    </button>
                    <button
                      onClick={() => setSelectedView('back')}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        selectedView === 'back'
                          ? 'bg-white text-black shadow-md'
                          : 'text-[#8d9299] hover:text-white'
                      }`}
                    >
                      Dorso
                    </button>
                  </div>
                )}
              </div>

              {/* Imagen de la Prenda */}
              <div className="my-auto py-2 w-full flex items-center justify-center relative min-h-[160px] sm:min-h-[200px]">
                <motion.img
                  key={currentImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={currentImage}
                  alt={`${product.name} - ${selectedView}`}
                  className="max-h-[170px] sm:max-h-[210px] md:max-h-[240px] w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="text-center text-[10px] font-mono text-[#8d9299]">
                Vista: {selectedView === 'front' ? 'Frente de la prenda' : 'Dorso de la prenda'}
              </div>
            </div>

            {/* Lado Derecho: Detalles, Talles y Compra Directa */}
            <div
              data-lenis-prevent="true"
              className="md:w-7/12 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto min-h-0 overscroll-contain"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  {product.subtitle}
                </span>

                <h3 className="text-xl sm:text-2xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] leading-tight mb-2">
                  {product.name}
                </h3>

                {/* Precio */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-black text-white">
                    {product.price}
                  </span>
                  <span className="text-xs font-mono text-[#8d9299]">
                    {product.currency}
                  </span>
                </div>

                {/* Descripción */}
                <p className="text-xs sm:text-sm text-[#d8cfc4] leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Selector de Talle */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                      Seleccionar Talle:
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      Talle estándar unisex
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center border ${
                          selectedSize === s
                            ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20 scale-105'
                            : 'bg-white/5 text-[#f5f4f0] border-white/15 hover:border-white/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Características Clave */}
                <div className="space-y-1.5 mb-4 pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d9299] font-bold block mb-1">
                    Especificaciones Técnicas:
                  </span>
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#d8cfc4]">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón WhatsApp & Garantía */}
              <div className="pt-3 border-t border-white/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Comprar Talle {selectedSize} por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="mt-2.5 flex items-center justify-center gap-3 text-[10px] font-mono text-[#8d9299]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-amber-400" />
                    Envíos a todo Uruguay
                  </span>
                  <span>•</span>
                  <span>Retiro gratis en Durazno</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

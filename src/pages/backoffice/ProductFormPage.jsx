import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productsApi } from '../../services/api';
import ImageUploader from '../../components/backoffice/ImageUploader';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Único'];

export default function ProductFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    category: 'club',
    name: '',
    slug: '',
    subtitle: '',
    price: 1890,
    currency: 'UYU',
    badge: 'Nueva Colección',
    front_image_url: '',
    back_image_url: '',
    full_mockup_url: '',
    description: '',
    features: ['Tejido respirable microperforado', 'Secado ultra-rápido DryFit', 'Estampado de alta durabilidad'],
    sizes: ['S', 'M', 'L', 'XL'],
    size_guide: [],
    stock_status: 'available',
    status: 'published',
    order_index: 0,
  });

  const [autoSlug, setAutoSlug] = useState(!isEditing);

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await productsApi.getBySlugOrId(id);
      const data = res.product || res.data || {};
      setFormData({
        category: data.category || 'club',
        name: data.name || '',
        slug: data.slug || '',
        subtitle: data.subtitle || '',
        price: data.price ? Number(data.price) : 0,
        currency: data.currency || 'UYU',
        badge: data.badge || '',
        front_image_url: data.front_image_url || '',
        back_image_url: data.back_image_url || '',
        full_mockup_url: data.full_mockup_url || '',
        description: data.description || '',
        features: Array.isArray(data.features) ? data.features : [],
        sizes: Array.isArray(data.sizes) ? data.sizes : [],
        size_guide: Array.isArray(data.size_guide) ? data.size_guide : [],
        stock_status: data.stock_status || 'available',
        status: data.status || 'published',
        order_index: data.order_index ?? 0,
      });
      setAutoSlug(false);
    } catch (err) {
      setError(err.message || 'Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: autoSlug ? slugify(val) : prev.slug,
    }));
  };

  // Toggle de talles
  const handleToggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      const nextSizes = exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size];
      return { ...prev, sizes: nextSizes };
    });
  };

  // Manejo de features
  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, 'Nueva característica'],
    }));
  };

  const handleUpdateFeature = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated[index] = value;
      return { ...prev, features: updated };
    });
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!formData.name.trim()) {
      setError('El nombre de la prenda es obligatorio');
      return;
    }
    if (!formData.slug.trim()) {
      setError('El slug es obligatorio');
      return;
    }
    if (!formData.front_image_url) {
      setError('Debes subir al menos la foto frontal del producto');
      return;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      setError('El precio debe ser un número válido mayor a 0');
      return;
    }

    try {
      setSaving(true);
      if (isEditing) {
        await productsApi.update(id, formData);
        setSuccessMsg('¡Producto actualizado exitosamente!');
      } else {
        await productsApi.create(formData);
        setSuccessMsg('¡Producto creado exitosamente!');
      }

      setTimeout(() => {
        navigate('/backoffice/products');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Error al guardar el producto en Supabase');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0e1014] border border-neutral-800 rounded-2xl p-12 text-center">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-neutral-400">Cargando producto de la tienda...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Encabezado fijo (Sticky) */}
      <div className="sticky top-0 z-30 bg-[#08090a]/95 backdrop-blur-md py-4 border-b border-white/10 flex items-center justify-between -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/backoffice/products"
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700"
            title="Volver al catálogo"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
              {isEditing ? `Editar: ${formData.name || 'Prenda'}` : 'Nuevo Producto en Tienda'}
            </h1>
            <p className="text-xs text-neutral-400 hidden sm:block">
              {isEditing ? 'Modifica precios, talles, stock e imágenes del producto.' : 'Sube indumentaria y accesorios oficiales de Trillo.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/backoffice/products"
            className="px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#e87a38] hover:bg-[#ff8a48] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#e87a38]/30 flex items-center gap-2 cursor-pointer border border-[#ff9d66]"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span>{isEditing ? 'Guardar Cambios' : 'Publicar Producto'}</span>
          </button>
        </div>
      </div>

      {/* Banners */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
          {successMsg}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BLOQUE 1: IDENTIFICACIÓN Y CATEGORÍA */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            1. Datos de la Prenda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Categoría *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
              >
                <option value="club">Línea Club</option>
                <option value="carreras">Línea Carreras</option>
                <option value="streetwear">Streetwear</option>
                <option value="abrigo">Abrigo & Accesorios</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Badge de Etiqueta (opcional)</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Ej: Nuevo / Edición Limitada"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Orden</label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Nombre del Producto *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Ej: Remera Técnica Trillo Official 2026"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-neutral-300">Slug (URL) *</label>
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(true);
                    setFormData((prev) => ({ ...prev, slug: slugify(prev.name) }));
                  }}
                  className="text-[11px] text-primary hover:underline"
                >
                  Regenerar desde nombre
                </button>
              </div>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
                }}
                placeholder="remera-tecnica-trillo-2026"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Subtítulo o Detalles Principales</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Ej: Diseño de alto rendimiento con tecnología anti-fricción"
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* BLOQUE 2: PRECIOS Y STOCK */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            2. Precio, Disponibilidad y Talles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Precio en Pesos ($ UYU) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="10"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#14161c] border border-neutral-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Moneda</label>
              <input
                type="text"
                disabled
                value="UYU"
                className="w-full bg-[#14161c]/50 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-neutral-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Disponibilidad de Stock</label>
              <select
                value={formData.stock_status}
                onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
              >
                <option value="available">En Stock Inmediato</option>
                <option value="preorder">En Preventa</option>
                <option value="out_of_stock">Agotado Temporalmente</option>
              </select>
            </div>
          </div>

          {/* Selector de talles */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-neutral-300 mb-2">Talles Disponibles</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleToggleSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-primary text-black shadow-md shadow-primary/20 scale-105'
                        : 'bg-[#14161c] border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {size} {isSelected ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BLOQUE 3: IMÁGENES CLOUDINARY */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            3. Galería de Imágenes (Cloudinary)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageUploader
              label="Foto Frontal (Principal) *"
              folder="trillo/products"
              value={formData.front_image_url}
              onChange={(url) => setFormData({ ...formData, front_image_url: url })}
            />

            <ImageUploader
              label="Foto Dorsal (Espalda)"
              folder="trillo/products"
              value={formData.back_image_url}
              onChange={(url) => setFormData({ ...formData, back_image_url: url })}
            />

            <ImageUploader
              label="Mockup Completo / Detalle"
              folder="trillo/products"
              value={formData.full_mockup_url}
              onChange={(url) => setFormData({ ...formData, full_mockup_url: url })}
            />
          </div>
        </div>

        {/* BLOQUE 4: DESCRIPCIÓN Y ESPECIFICACIONES */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            4. Descripción y Características Técnicas
          </h2>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Descripción del Producto</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Materiales, calce, sensaciones y detalles de confección..."
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Características Técnicas de la Tela / Producto
              </label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Característica
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-1.5">
                  <span className="text-primary text-xs font-mono">•</span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-neutral-500 hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botones inferiores */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-800">
          <Link
            to="/backoffice/products"
            className="px-5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-sm font-semibold text-neutral-300 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-[#e87a38] hover:bg-[#ff8a48] active:scale-95 text-black font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#e87a38]/30 flex items-center gap-2 cursor-pointer border border-[#ff9d66]"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span>{isEditing ? 'Guardar Cambios' : 'Publicar Prenda'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

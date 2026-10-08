import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { adventuresApi } from '../../services/api';
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

export default function AdventureFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    category: 'durazno',
    title: '',
    slug: '',
    subtitle: '',
    badge: 'Aventura Exclusiva',
    location: '',
    duration: 'Jornada Completa',
    difficulty: 'Baja - Apta todo público',
    distance: '12 km',
    elevation: '+150m',
    group_size: 'Máx. 16 personas',
    image_url: '',
    description: '',
    highlights: ['Guías especializados certificados', 'Equipo técnico de seguridad incluido'],
    itinerary: [
      { day: 'Día 1', title: 'Encuentro y travesía', description: 'Punto de reunión, charla de seguridad y comienzo.' }
    ],
    included: ['Guías profesionales', 'Seguro de asistencia', 'Refrigerio de marcha'],
    requirements: ['Calzado cómodo de trekking', 'Botella de agua recargable', 'Protector solar'],
    whatsapp_msg: 'Hola! Quiero consultar disponibilidad para la expedición con Trillo.',
    status: 'published',
    order_index: 0,
  });

  const [autoSlug, setAutoSlug] = useState(!isEditing);

  useEffect(() => {
    if (isEditing) {
      loadAdventure();
    }
  }, [id]);

  const loadAdventure = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adventuresApi.getBySlugOrId(id);
      const data = res.adventure || res.data || {};
      setFormData({
        category: data.category || 'durazno',
        title: data.title || '',
        slug: data.slug || '',
        subtitle: data.subtitle || '',
        badge: data.badge || 'Aventura Exclusiva',
        location: data.location || '',
        duration: data.duration || '',
        difficulty: data.difficulty || 'Baja - Apta todo público',
        distance: data.distance || '',
        elevation: data.elevation || '',
        group_size: data.group_size || '',
        image_url: data.image_url || '',
        description: data.description || '',
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
        itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
        included: Array.isArray(data.included) ? data.included : [],
        requirements: Array.isArray(data.requirements) ? data.requirements : [],
        whatsapp_msg: data.whatsapp_msg || '',
        status: data.status || 'published',
        order_index: data.order_index ?? 0,
      });
      setAutoSlug(false);
    } catch (err) {
      setError(err.message || 'Error al cargar la aventura');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug ? slugify(val) : prev.slug,
    }));
  };

  // Manejo de arrays simples (highlights, included, requirements)
  const handleAddArrayItem = (field, defaultVal = '') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultVal],
    }));
  };

  const handleUpdateArrayItem = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Manejo de Itinerario
  const handleAddItineraryItem = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: `Día ${prev.itinerary.length + 1}`, title: 'Nueva etapa', description: '' },
      ],
    }));
  };

  const handleUpdateItineraryItem = (index, subfield, value) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];
      // Si era string simple lo normalizamos a objeto
      const current = typeof updated[index] === 'string'
        ? { day: `Etapa ${index + 1}`, title: updated[index], description: '' }
        : updated[index];
      updated[index] = { ...current, [subfield]: value };
      return { ...prev, itinerary: updated };
    });
  };

  const handleRemoveItineraryItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!formData.title.trim()) {
      setError('El título de la aventura es obligatorio');
      return;
    }
    if (!formData.slug.trim()) {
      setError('El slug es obligatorio');
      return;
    }
    if (!formData.image_url) {
      setError('Debes subir o asignar una imagen de portada');
      return;
    }

    try {
      setSaving(true);
      if (isEditing) {
        await adventuresApi.update(id, formData);
        setSuccessMsg('¡Aventura actualizada exitosamente!');
      } else {
        await adventuresApi.create(formData);
        setSuccessMsg('¡Aventura creada exitosamente!');
      }

      setTimeout(() => {
        navigate('/backoffice/adventures');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Error al guardar la aventura en Supabase');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0e1014] border border-neutral-800 rounded-2xl p-12 text-center">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-neutral-400">Cargando datos de la expedición...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Barra superior con navegación y acción fija (Sticky) */}
      <div className="sticky top-0 z-30 bg-[#08090a]/95 backdrop-blur-md py-4 border-b border-white/10 flex items-center justify-between -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/backoffice/adventures"
            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700"
            title="Volver al listado"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
              {isEditing ? `Editar: ${formData.title || 'Aventura'}` : 'Crear Nueva Aventura'}
            </h1>
            <p className="text-xs text-neutral-400 hidden sm:block">
              {isEditing ? 'Modifica itinerario, cupos, fotos y guarda los cambios.' : 'Completa la ficha técnica para publicar una nueva expedición.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/backoffice/adventures"
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
            <span>{isEditing ? 'Guardar Cambios' : 'Publicar Aventura'}</span>
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
        {/* BLOQUE 1: CATEGORÍA Y DATOS BÁSICOS */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            1. Categoría y Título
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Categoría Principal *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
              >
                <option value="durazno">Durazno & Río Negro</option>
                <option value="nacionales">Travesías Nacionales</option>
                <option value="internacionales">Expediciones Internacionales</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Badge de Etiqueta</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Ej: Aventura de Fin de Semana"
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
              <label className="block text-xs font-medium text-neutral-300 mb-1">Título de la Aventura *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Ej: Travesía Kayak Río Negro Salvaje"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-neutral-300">Slug (URL amigable) *</label>
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(true);
                    setFormData((prev) => ({ ...prev, slug: slugify(prev.title) }));
                  }}
                  className="text-[11px] text-primary hover:underline"
                >
                  Regenerar desde título
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
                placeholder="travesia-kayak-rio-negro"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Subtítulo o Resumen Corto</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Ej: Navegación de 2 días con campamento agreste en islas solitarias"
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* BLOQUE 2: FICHA TÉCNICA */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            2. Logística y Características Técnicas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Ubicación / Destino</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ej: San Gregorio de Polanco, Tacuarembó"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Duración</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ej: 2 Días / 1 Noche"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Dificultad</label>
              <input
                type="text"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                placeholder="Ej: Media (Remo continuo)"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Distancia Total</label>
              <input
                type="text"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                placeholder="Ej: 32 km de remo"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Desnivel / Altura</label>
              <input
                type="text"
                value={formData.elevation}
                onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                placeholder="Ej: Plano / Cauce fluvial"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Cupos / Tamaño del Grupo</label>
              <input
                type="text"
                value={formData.group_size}
                onChange={(e) => setFormData({ ...formData, group_size: e.target.value })}
                placeholder="Ej: Grupo reducido (Máx. 14 personas)"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 3: PORTADA Y DESCRIPCIÓN */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            3. Foto de Portada y Relato
          </h2>

          <ImageUploader
            label="Foto de Portada de la Aventura (Cloudinary)"
            folder="trillo/adventures"
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
          />

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Descripción Completa</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe la magia de la experiencia, el contacto con la naturaleza y los servicios incluidos..."
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* BLOQUE 4: ITINERARIO, INCLUYE Y REQUISITOS */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            4. Itinerario, Servicios y Requisitos
          </h2>

          {/* Highlights */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Puntos Destacados</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('highlights', 'Nuevo destaque')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Destaque
              </button>
            </div>
            <div className="space-y-2">
              {formData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-1.5">
                  <span className="text-primary text-xs">★</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateArrayItem('highlights', idx, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('highlights', idx)}
                    className="text-neutral-500 hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerario */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Itinerario / Etapas</label>
              <button
                type="button"
                onClick={handleAddItineraryItem}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Etapa / Día
              </button>
            </div>
            <div className="space-y-3">
              {formData.itinerary.map((item, idx) => {
                const dayLabel = typeof item === 'object' ? item.day : `Etapa ${idx + 1}`;
                const titleVal = typeof item === 'object' ? item.title : item;
                const descVal = typeof item === 'object' ? item.description || '' : '';

                return (
                  <div key={idx} className="bg-[#14161c] border border-neutral-800 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Día 1 / Etapa 1"
                        value={dayLabel}
                        onChange={(e) => handleUpdateItineraryItem(idx, 'day', e.target.value)}
                        className="w-28 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-primary font-mono focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Título de la etapa..."
                        value={titleVal}
                        onChange={(e) => handleUpdateItineraryItem(idx, 'title', e.target.value)}
                        className="flex-1 bg-transparent px-2 text-xs text-white font-medium focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryItem(idx)}
                        className="text-neutral-500 hover:text-red-400 text-xs p-1"
                      >
                        ✕
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Detalle de actividades, horarios y paradas de esta etapa..."
                      value={descVal}
                      onChange={(e) => handleUpdateItineraryItem(idx, 'description', e.target.value)}
                      className="w-full bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-2 text-xs text-neutral-300 focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Qué Incluye */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">¿Qué Incluye el Servicio?</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('included', 'Servicio incluido')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Ítem
              </button>
            </div>
            <div className="space-y-2">
              {formData.included.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-1.5">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateArrayItem('included', idx, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('included', idx)}
                    className="text-neutral-500 hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Requisitos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Requisitos y Equipamiento Sugerido</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('requirements', 'Requisito')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Requisito
              </button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-1.5">
                  <span className="text-amber-400 text-xs">!</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateArrayItem('requirements', idx, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('requirements', idx)}
                    className="text-neutral-500 hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BLOQUE 5: WHATSAPP DIRECTO */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            5. Mensaje Predeterminado de WhatsApp
          </h2>
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Texto predefinido que el usuario enviará a Trillo por WhatsApp al tocar "Reservar / Consultar"
            </label>
            <textarea
              rows={2}
              value={formData.whatsapp_msg}
              onChange={(e) => setFormData({ ...formData, whatsapp_msg: e.target.value })}
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Botones inferiores */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-800">
          <Link
            to="/backoffice/adventures"
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
            <span>{isEditing ? 'Guardar Cambios' : 'Publicar Aventura'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { eventsApi } from '../../services/api';
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

export default function EventFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    badge: 'Trail & Aventura',
    season: 'Temporada 2026',
    date_text: '',
    location: '',
    elevation: '',
    difficulty: 'Media',
    terrain: '',
    image_url: '',
    accent_color: '#f97316',
    short_description: '',
    description: '',
    distances: ['10K', '21K'],
    highlights: ['Paisajes vírgenes', 'Cronometraje con chip', 'Medalla finisher'],
    kit_includes: ['Remera técnica oficial Trillo', 'Número con chip', 'Hidratación y fruta'],
    schedule: [
      { time: '08:00', activity: 'Apertura de acreditaciones' },
      { time: '09:30', activity: 'Charla técnica' },
      { time: '10:00', activity: 'Largada general' },
    ],
    whatsapp_msg: 'Hola! Quiero información e inscribirme a la carrera de Trillo.',
    status: 'published',
    order_index: 0,
  });

  const [autoSlug, setAutoSlug] = useState(!isEditing);

  // Cargar datos en edición
  useEffect(() => {
    if (isEditing) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await eventsApi.getBySlugOrId(id);
      const data = res.event || res.data || {};
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        subtitle: data.subtitle || '',
        badge: data.badge || 'Trail & Aventura',
        season: data.season || 'Temporada 2026',
        date_text: data.date_text || '',
        location: data.location || '',
        elevation: data.elevation || '',
        difficulty: data.difficulty || 'Media',
        terrain: data.terrain || '',
        image_url: data.image_url || '',
        accent_color: data.accent_color || '#f97316',
        short_description: data.short_description || '',
        description: data.description || '',
        distances: Array.isArray(data.distances) ? data.distances : [],
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
        kit_includes: Array.isArray(data.kit_includes) ? data.kit_includes : [],
        schedule: Array.isArray(data.schedule) ? data.schedule : [],
        whatsapp_msg: data.whatsapp_msg || '',
        status: data.status || 'published',
        order_index: data.order_index ?? 0,
      });
      setAutoSlug(false);
    } catch (err) {
      setError(err.message || 'Error al cargar el evento');
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

  // Manejo de arrays simples (distances, highlights, kit_includes)
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

  // Manejo de Cronograma (schedule)
  const handleAddScheduleItem = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { time: '12:00', activity: 'Nueva actividad' }],
    }));
  };

  const handleUpdateScheduleItem = (index, subfield, value) => {
    setFormData((prev) => {
      const updated = [...prev.schedule];
      updated[index] = { ...updated[index], [subfield]: value };
      return { ...prev, schedule: updated };
    });
  };

  const handleRemoveScheduleItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!formData.title.trim()) {
      setError('El título del evento es obligatorio');
      return;
    }
    if (!formData.slug.trim()) {
      setError('El slug del evento es obligatorio');
      return;
    }
    if (!formData.image_url) {
      setError('Debes subir o asignar una imagen principal para el evento');
      return;
    }

    try {
      setSaving(true);
      if (isEditing) {
        await eventsApi.update(id, formData);
        setSuccessMsg('¡Evento actualizado exitosamente!');
      } else {
        await eventsApi.create(formData);
        setSuccessMsg('¡Evento creado exitosamente!');
      }

      setTimeout(() => {
        navigate('/backoffice/events');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Error al guardar el evento en Supabase');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0e1014] border border-neutral-800 rounded-2xl p-12 text-center">
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-neutral-400">Cargando información del evento...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Barra superior con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/backoffice/events"
            className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-display">
              {isEditing ? `Editar Evento: ${formData.title}` : 'Crear Nuevo Evento'}
            </h1>
            <p className="text-xs text-neutral-400">
              {isEditing ? 'Modifica los detalles, distancias y kits de la carrera.' : 'Completa la ficha técnica para publicar una nueva competencia.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/backoffice/events"
            className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-xs transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2"
          >
            {saving && <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
            {isEditing ? 'Guardar Cambios' : 'Publicar Evento'}
          </button>
        </div>
      </div>

      {/* Banners de estado */}
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
        {/* BLOQUE 1: INFORMACIÓN PRINCIPAL */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            1. Datos Generales de la Carrera
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Título del Evento *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Ej: Trillo Lunarejo Trail"
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
                placeholder="trillo-lunarejo-trail"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Subtítulo o Bajada</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Ej: Desafío en Quebradas y Sendero de Montaña"
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Badge Superior</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Trail & Aventura"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Temporada</label>
              <input
                type="text"
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                placeholder="Temporada 2026"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              >
                <option value="published">Publicado</option>
                <option value="draft">Borrador</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Orden (Prioridad)</label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: FICHA TÉCNICA */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            2. Ficha Técnica y Ubicación
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Fecha del Evento</label>
              <input
                type="text"
                value={formData.date_text}
                onChange={(e) => setFormData({ ...formData, date_text: e.target.value })}
                placeholder="Ej: 18 Octubre 2026"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Ubicación</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ej: Valle del Lunarejo, Rivera"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Dificultad</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Media-Alta">Media-Alta</option>
                <option value="Alta">Alta</option>
                <option value="Extrema">Extrema</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Altimetría / Desnivel</label>
              <input
                type="text"
                value={formData.elevation}
                onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                placeholder="Ej: +620m Desnivel Positivo"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Tipo de Terreno</label>
              <input
                type="text"
                value={formData.terrain}
                onChange={(e) => setFormData({ ...formData, terrain: e.target.value })}
                placeholder="Ej: Sendero serrano, piedra y cruce de quebradas"
                className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 3: IMAGEN Y DESCRIPCIÓN */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            3. Imagen Principal y Descripción
          </h2>

          <ImageUploader
            label="Foto de Portada del Evento (Subida directa a Cloudinary)"
            folder="trillo/events"
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
          />

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Descripción Breve (Para tarjetas)</label>
            <textarea
              rows={2}
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Resumen atractivo de 1-2 líneas para la grilla de eventos..."
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Descripción Detallada</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detalle completo de la experiencia, circuitos, recomendaciones y entorno..."
              className="w-full bg-[#14161c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* BLOQUE 4: DISTANCIAS, DESTACADOS Y KIT */}
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            4. Distancias, Puntos Destacados y Kit Oficial
          </h2>

          {/* Distancias */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Distancias de Carrera</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('distances', 'Nueva Distancia')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Distancia
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {formData.distances.map((dist, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-[#14161c] border border-neutral-800 rounded-xl p-1.5">
                  <input
                    type="text"
                    value={dist}
                    onChange={(e) => handleUpdateArrayItem('distances', idx, e.target.value)}
                    className="flex-1 bg-transparent px-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('distances', idx)}
                    className="p-1 text-neutral-500 hover:text-red-400 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Puntos Destacados (Highlights)</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('highlights', 'Nuevo destaque')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Destacado
              </button>
            </div>
            <div className="space-y-2">
              {formData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-1.5">
                  <span className="text-neutral-500 text-xs font-mono">•</span>
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

          {/* Kit Includes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">El Kit del Corredor Incluye</label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('kit_includes', 'Elemento del kit')}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Ítem de Kit
              </button>
            </div>
            <div className="space-y-2">
              {formData.kit_includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#14161c] border border-neutral-800 rounded-xl px-3 py-1.5">
                  <span className="text-primary text-xs">✓</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateArrayItem('kit_includes', idx, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('kit_includes', idx)}
                    className="text-neutral-500 hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cronograma / Schedule */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Cronograma del Día</label>
              <button
                type="button"
                onClick={handleAddScheduleItem}
                className="text-xs text-primary hover:underline font-medium"
              >
                + Agregar Horario
              </button>
            </div>
            <div className="space-y-2">
              {formData.schedule.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#14161c] border border-neutral-800 rounded-xl p-2">
                  <input
                    type="text"
                    placeholder="Hora (ej: 08:30)"
                    value={item.time}
                    onChange={(e) => handleUpdateScheduleItem(idx, 'time', e.target.value)}
                    className="w-24 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-primary font-mono focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Actividad..."
                    value={item.activity}
                    onChange={(e) => handleUpdateScheduleItem(idx, 'activity', e.target.value)}
                    className="flex-1 bg-transparent px-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveScheduleItem(idx)}
                    className="text-neutral-500 hover:text-red-400 text-xs p-1"
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
              Texto que se abrirá en WhatsApp cuando el corredor pulse en "Inscribirme / Consultar"
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
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/backoffice/events"
            className="px-5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-sm font-semibold text-neutral-300 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-sm transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2"
          >
            {saving && <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
            {isEditing ? 'Guardar Cambios' : 'Publicar Evento'}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Check,
  Edit3,
  X,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Save,
  HelpCircle,
} from 'lucide-react';
import { clubPlansApi } from '../../services/api';

export default function ClubPlansPage() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado del modal de edición
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    badge: '',
    price: '',
    period: '',
    tagline: '',
    highlighted: false,
    accent_color: '#f59e0b',
    features: [],
    whatsapp_msg: '',
    status: 'published',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Cargar planes
  async function loadPlans() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await clubPlansApi.getAllAdmin();
      if (res?.plans) {
        setPlans(res.plans);
      }
    } catch (err) {
      setError('No se pudieron cargar los planes. Asegurate de que el backend esté conectado a la base de datos.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  // Abrir modal de edición
  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setSaveSuccessMsg(null);
    setNewFeatureText('');
    setFormData({
      name: plan.name || '',
      badge: plan.badge || '',
      price: plan.price || '',
      period: plan.period || '',
      tagline: plan.tagline || '',
      highlighted: Boolean(plan.highlighted),
      accent_color: plan.accent_color || '#f59e0b',
      features: Array.isArray(plan.features) ? [...plan.features] : [],
      whatsapp_msg: plan.whatsapp_msg || '',
      status: plan.status || 'published',
    });
  };

  const handleCloseModal = () => {
    setEditingPlan(null);
    setSaveSuccessMsg(null);
    setNewFeatureText('');
  };

  // Manejo de features/beneficios
  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeatureText.trim()],
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateFeature = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated[index] = value;
      return { ...prev, features: updated };
    });
  };

  // Guardar cambios
  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingPlan) return;

    setIsSaving(true);
    setSaveSuccessMsg(null);
    try {
      const res = await clubPlansApi.update(editingPlan.id, formData);
      if (res?.plan) {
        // Actualizar en el estado local
        setPlans((prev) =>
          prev.map((p) => (p.id === editingPlan.id ? res.plan : p))
        );
        setSaveSuccessMsg('¡Plan actualizado con éxito!');
        setTimeout(() => {
          handleCloseModal();
        }, 1200);
      }
    } catch (err) {
      alert(err.message || 'Error al guardar el plan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header de Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-xs text-amber-300 font-mono mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>El Club de Corredores</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-white tracking-tight">
            Planes & Membresías
          </h1>
          <p className="text-xs sm:text-sm text-[#8d9299] mt-1 max-w-2xl leading-relaxed">
            Administrá los precios de las cuotas, promociones bonificadas, beneficios incluidos y mensajes de WhatsApp que ven los corredores en la web pública.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/club#membresia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-amber-400/50 bg-[#12151c] text-xs font-medium text-[#d8cfc4] hover:text-white transition-all shadow-sm active:scale-95"
            title="Ver sección en la web en vivo"
          >
            <span>Ver en la Web</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#e87a38]" />
          </a>
        </div>
      </div>

      {/* 2. Mensajes de Estado */}
      {error && (
        <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 flex items-start gap-3 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-400/80">
              Asegurate de que la tabla <code className="bg-black/40 px-1.5 py-0.5 rounded font-mono">club_plans</code> esté creada en Supabase.
            </p>
          </div>
        </div>
      )}

      {/* 3. Grid de Tarjetas de Planes */}
      {isLoading ? (
        <div className="p-16 flex flex-col items-center justify-center gap-3 text-[#8d9299]">
          <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
          <span className="text-xs font-mono">Cargando planes del Club...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlighted
                  ? 'border-amber-400/50 bg-gradient-to-b from-amber-500/15 via-[#0d1015] to-[#08090a] shadow-xl shadow-amber-500/10'
                  : 'border-white/10 bg-[#0d1015]/80 hover:border-white/20'
              }`}
            >
              {/* Badge Recomendado si está activo */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[9px] font-mono font-bold uppercase tracking-wider shadow-md">
                  Recomendado
                </div>
              )}

              <div>
                {/* Header de la Tarjeta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 font-semibold truncate max-w-[190px]">
                    {plan.badge || 'Plan Activo'}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${
                      plan.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'
                    }`}
                  >
                    {plan.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </div>

                <h3 className="text-xl font-['Space_Grotesk'] font-bold text-white mb-1.5">
                  {plan.name}
                </h3>

                <p className="text-xs text-[#8d9299] mb-5 line-clamp-2 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Precio */}
                <div className="py-3.5 border-y border-white/10 mb-5 flex items-baseline gap-2">
                  <span className="text-3xl font-['Space_Grotesk'] font-black text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs font-mono text-[#8d9299]">
                    {plan.period}
                  </span>
                </div>

                {/* Lista de Beneficios */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-mono uppercase text-[#d8cfc4] font-bold block mb-1">
                    Beneficios ({Array.isArray(plan.features) ? plan.features.length : 0}):
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {(Array.isArray(plan.features) ? plan.features : []).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#d8cfc4]">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview de WhatsApp */}
                {plan.whatsapp_msg && (
                  <div className="mb-6 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-[#8d9299]">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono mb-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>Mensaje WhatsApp:</span>
                    </div>
                    <p className="italic line-clamp-2">"{plan.whatsapp_msg}"</p>
                  </div>
                )}
              </div>

              {/* Botón Editar */}
              <button
                type="button"
                onClick={() => handleOpenEdit(plan)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                  plan.highlighted
                    ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Tarjeta</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 4. Modal de Edición de Plan */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0f1217] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[92vh] flex flex-col">
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-['Space_Grotesk'] font-bold text-white">
                    Editar {editingPlan.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#8d9299]">
                    Slug ID: {editingPlan.slug}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 rounded-full hover:bg-white/10 text-[#8d9299] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alerta de Éxito al guardar */}
            {saveSuccessMsg && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">{saveSuccessMsg}</span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSave} className="space-y-5 overflow-y-auto pr-1 py-4 flex-1">
              {/* Nombre del Plan */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#d8cfc4] mb-1.5">
                  Nombre del Plan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ej: Plan Mensual Pase Libre"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Precio y Período en 2 columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#d8cfc4] mb-1.5">
                    Precio a Mostrar *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="ej: $ 1.400"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono font-bold focus:border-amber-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#d8cfc4] mb-1.5">
                    Período / Detalle de Cuota *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="ej: UYU / mes ó UYU / mes (Abono semestral)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Badge y Toggle de Destacado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#d8cfc4] mb-1.5">
                    Etiqueta / Badge (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="ej: Más Elegido · Presencial"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10 cursor-pointer hover:border-amber-400/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.highlighted}
                      onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-white block">Marcar como Recomendado</span>
                      <span className="text-[10px] text-[#8d9299]">
                        Aparecerá con resplandor dorado y etiqueta superior.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Bajada / Tagline */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#d8cfc4] mb-1.5">
                  Bajada descriptiva / Resumen
                </label>
                <textarea
                  rows={2}
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="ej: Acceso total a todos los días, turnos y grupos de entrenamiento en Durazno."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Beneficios Incluidos (Lista dinámica) */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-[#d8cfc4] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Beneficios incluidos en la cuota ({formData.features.length})</span>
                  </label>
                </div>

                {/* Lista de viñetas */}
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {formData.features.map((feat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleUpdateFeature(index, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Eliminar beneficio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Input para agregar nuevo beneficio */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="Escribí un nuevo beneficio y presiona '+ Agregar'..."
                    className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-white text-xs placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="flex items-center gap-1 px-3.5 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>

              {/* Mensaje de WhatsApp */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#d8cfc4] mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mensaje predeterminado de WhatsApp</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.whatsapp_msg}
                  onChange={(e) => setFormData({ ...formData, whatsapp_msg: e.target.value })}
                  placeholder="ej: Hola Trillo! Quiero afiliarme a El Club de Corredores con el Plan Mensual Pase Libre..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-emerald-400 focus:outline-none transition-colors resize-none leading-relaxed"
                />
                <span className="text-[10px] text-[#8d9299] block mt-1">
                  Este mensaje se precarga automáticamente en el WhatsApp del socio al hacer clic en "Consultar o Inscribirme".
                </span>
              </div>

              {/* Estado */}
              <div className="flex items-center gap-4 pt-1">
                <label className="text-xs font-mono uppercase text-[#d8cfc4]">Estado:</label>
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="plan_status"
                      value="published"
                      checked={formData.status === 'published'}
                      onChange={() => setFormData({ ...formData, status: 'published' })}
                      className="accent-emerald-500"
                    />
                    <span className="text-emerald-300 font-semibold">Publicado (Visible en la web)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="plan_status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData({ ...formData, status: 'draft' })}
                      className="accent-zinc-500"
                    />
                    <span className="text-zinc-400">Borrador (Oculto)</span>
                  </label>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 shrink-0">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-[#d8cfc4] font-medium transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

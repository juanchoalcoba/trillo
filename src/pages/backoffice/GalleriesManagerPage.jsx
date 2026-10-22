import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Edit2,
  Check,
  X,
  Loader2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { galleriesApi, uploadApi } from '../../services/api';

const GALLERY_TABS = [
  {
    id: 'aventuras',
    label: 'Aventuras',
    category: 'aventuras',
    section: 'general',
    folder: 'trillo/galeria/aventuras',
    badge: 'Expediciones',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accentColor: '#10b981',
    description: 'Fotografías que se muestran en la sección Aventuras de la web pública.',
  },
  {
    id: 'rebollo',
    label: 'Desafío Rebollo',
    category: 'eventos',
    section: 'rebollo',
    folder: 'trillo/galeria/eventos/rebollo',
    badge: 'Trail & Sierras',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    accentColor: '#f97316',
    description: 'Galería de fotos de la carrera Desafío Rebollo en la sección Eventos.',
  },
  {
    id: 'laberinto',
    label: 'Laberinto',
    category: 'eventos',
    section: 'laberinto',
    folder: 'trillo/galeria/eventos/laberinto',
    badge: 'Cross Country',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    accentColor: '#f59e0b',
    description: 'Galería de fotos de la Carrera del Laberinto en la sección Eventos.',
  },
  {
    id: 'sanpedro',
    label: 'San Pedro',
    category: 'eventos',
    section: 'sanpedro',
    folder: 'trillo/galeria/eventos/sanpedro',
    badge: 'Corrida Nocturna',
    badgeColor: 'bg-orange-600/10 text-orange-400 border-orange-600/20',
    accentColor: '#ea580c',
    description: 'Galería de fotos de la Corrida San Pedro en la sección Eventos.',
  },
];

export default function GalleriesManagerPage() {
  const [activeTabId, setActiveTabId] = useState('aventuras');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de subida
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef(null);

  // Estados de edición de título
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  // Estados de eliminación
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTab = GALLERY_TABS.find((t) => t.id === activeTabId) || GALLERY_TABS[0];

  useEffect(() => {
    loadGalleries();
  }, [activeTabId]);

  const loadGalleries = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await galleriesApi.getAllAdmin({
        category: currentTab.category,
        section: currentTab.section,
      });
      setItems(res.items || []);
    } catch (err) {
      console.error('Error al cargar fotos de la galería:', err);
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Subir una o varias fotos directamente a Cloudinary y registrarlas en la BD
  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validar formato de imagen
    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      alert('Por favor selecciona archivos de imagen válidos (JPG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    setUploadProgress({ current: 0, total: validFiles.length });

    let successCount = 0;
    const errors = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadProgress({ current: i + 1, total: validFiles.length });

      try {
        // 1. Subir a Cloudinary en la carpeta correspondiente
        const secureUrl = await uploadApi.uploadDirectToCloudinary(file, currentTab.folder);

        // 2. Registrar en la base de datos
        const defaultTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        await galleriesApi.create({
          category: currentTab.category,
          section: currentTab.section,
          title: defaultTitle,
          image_url: secureUrl,
        });

        successCount++;
      } catch (err) {
        console.error(`Error al subir ${file.name}:`, err);
        errors.push(`${file.name}: ${err.message}`);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (errors.length > 0) {
      alert(`Se subieron ${successCount} fotos con éxito. Errores:\n${errors.join('\n')}`);
    }

    // Recargar lista actualizada
    loadGalleries();
  };

  // Alternar visibilidad (Activa / Oculta)
  const handleToggleStatus = async (item) => {
    const nextStatus = !item.is_active;
    try {
      await galleriesApi.toggleStatus(item.id, nextStatus);
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, is_active: nextStatus } : it))
      );
    } catch (err) {
      alert(`Error al cambiar visibilidad: ${err.message}`);
    }
  };

  // Guardar edición de título
  const handleSaveTitle = async (item) => {
    try {
      setSavingEdit(true);
      await galleriesApi.update(item.id, { title: editTitle.trim() });
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, title: editTitle.trim() } : it))
      );
      setEditingItem(null);
    } catch (err) {
      alert(`Error al actualizar el título: ${err.message}`);
    } finally {
      setSavingEdit(false);
    }
  };

  // Confirmar eliminación
  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      await galleriesApi.delete(deletingId);
      setItems((prev) => prev.filter((it) => it.id !== deletingId));
      setDeletingId(null);
    } catch (err) {
      alert(`Error al eliminar la fotografía: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const activeCount = items.filter((it) => it.is_active).length;
  const inactiveCount = items.filter((it) => !it.is_active).length;

  return (
    <div className="space-y-8">
      {/* 1. Header Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#e87a38]">
              Gestión Multimedia
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0] flex items-center gap-3">
            <Camera className="w-8 h-8 text-[#e87a38]" />
            Galerías de Fotografías
          </h1>
          <p className="text-xs sm:text-sm text-[#8d9299] mt-1 max-w-2xl">
            Controlá las fotos que se muestran en la web pública. Subí fotos nuevas, cambiá el título, ocultalas temporalmente o eliminalas.
          </p>
        </div>

        {/* Botón de recarga rápida */}
        <button
          onClick={loadGalleries}
          disabled={loading || isUploading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#d8cfc4] hover:text-white transition-all self-start sm:self-auto disabled:opacity-50"
          title="Actualizar listado"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#e87a38]' : ''}`} />
          Sincronizar
        </button>
      </div>

      {/* 2. Pestañas de Navegación por Galería */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {GALLERY_TABS.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium font-mono transition-all ${
                isActive
                  ? 'bg-white/10 text-white border border-white/20 shadow-lg'
                  : 'bg-black/30 text-[#8d9299] hover:text-[#f5f4f0] hover:bg-white/5 border border-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tab.accentColor }}
              />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${tab.badgeColor}`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Panel de Carga / Subida de Nuevas Fotos */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1015] p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-mono ${currentTab.badgeColor}`}>
                {currentTab.label}
              </span>
              <span className="text-xs text-[#8d9299] font-mono">
                {currentTab.description}
              </span>
            </div>
            <h2 className="text-lg font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
              Agregar Fotografías a esta Galería
            </h2>
            <p className="text-xs text-[#8d9299]">
              Formatos soportados: JPG, PNG o WebP. Podés seleccionar varias fotos juntas. Se suben directo a Cloudinary optimizadas.
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFilesSelected}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#e87a38] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#e87a38]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subiendo ({uploadProgress.current}/{uploadProgress.total})...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Subir Fotos a {currentTab.label}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Barra de progreso visual si está subiendo */}
        {isUploading && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-[#8d9299] mb-1.5">
              <span>Procesando fotografías en Cloudinary...</span>
              <span className="text-emerald-400 font-bold">
                {uploadProgress.current} de {uploadProgress.total}
              </span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{
                  width: `${(uploadProgress.current / uploadProgress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. Barra de Estadísticas de la Galería Activa */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
          <span className="text-xs text-[#8d9299] font-mono block mb-1">Total de Fotos</span>
          <span className="text-2xl font-black font-['Space_Grotesk'] text-[#f5f4f0]">
            {items.length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
          <span className="text-xs text-emerald-400 font-mono block mb-1">Visibles en Web</span>
          <span className="text-2xl font-black font-['Space_Grotesk'] text-emerald-400">
            {activeCount}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-white/5">
          <span className="text-xs text-[#8d9299] font-mono block mb-1">Ocultas / Pausadas</span>
          <span className="text-2xl font-black font-['Space_Grotesk'] text-[#8d9299]">
            {inactiveCount}
          </span>
        </div>
      </div>

      {/* 5. Estado de Carga o Error */}
      {loading && (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#e87a38] mx-auto mb-3" />
          <p className="text-xs font-mono text-[#8d9299]">Cargando fotografías de {currentTab.label}...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 6. Mosaico de Fotografías */}
      {!loading && !error && items.length === 0 && (
        <div className="py-20 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
          <ImageIcon className="w-12 h-12 text-[#8d9299]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold font-['Space_Grotesk'] text-[#f5f4f0] mb-1">
            Esta galería no tiene fotos todavía
          </h3>
          <p className="text-xs text-[#8d9299] mb-4">
            Usá el botón de arriba para subir la primera fotografía a {currentTab.label}.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono"
          >
            <Plus className="w-3.5 h-3.5" /> Subir Fotos
          </button>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((item, index) => {
            const isEditingThis = editingItem?.id === item.id;
            return (
              <div
                key={item.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                  item.is_active
                    ? 'border-white/10 bg-[#0d1015] hover:border-white/20 hover:shadow-xl'
                    : 'border-white/5 bg-black/40 opacity-70'
                }`}
              >
                {/* Imagen Preview con Badges */}
                <div className="relative aspect-[4/3] bg-black/60 overflow-hidden">
                  <img
                    src={item.thumbnail_url || item.image_url}
                    alt={item.title || 'Foto de galería'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Estado de Visibilidad */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-md backdrop-blur-md border ${
                        item.is_active
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                          : 'bg-stone-900/80 text-stone-400 border-stone-500/30'
                      }`}
                    >
                      {item.is_active ? (
                        <>
                          <Eye className="w-2.5 h-2.5" /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-2.5 h-2.5" /> Oculta
                        </>
                      )}
                    </span>
                  </div>

                  {/* Índice de posición */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-mono text-[#8d9299] border border-white/10 backdrop-blur-md">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Enlace para ver foto completa */}
                  <a
                    href={item.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 hover:bg-black text-[#d8cfc4] hover:text-white border border-white/10 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    title="Ver en resolución completa"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Info y Edición de Título */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  {isEditingThis ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Pie de foto..."
                        className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs text-white focus:outline-none focus:border-[#e87a38]"
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveTitle(item)}
                          disabled={savingEdit}
                          className="px-2.5 py-1 rounded-md bg-[#e87a38] text-black font-mono text-[10px] font-bold hover:bg-[#ea580c] flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Guardar
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="px-2.5 py-1 rounded-md bg-white/10 text-white font-mono text-[10px] hover:bg-white/15"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold text-[#f5f4f0] line-clamp-2">
                        {item.title || <span className="text-[#8d9299] italic">Sin título</span>}
                      </p>
                      <span className="text-[10px] font-mono text-[#8d9299] block mt-1">
                        {new Date(item.created_at).toLocaleDateString('es-UY')}
                      </span>
                    </div>
                  )}

                  {/* Botonera de Acciones Rápidas */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    {/* Botón Ocultar / Mostrar */}
                    <button
                      onClick={() => handleToggleStatus(item)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                        item.is_active
                          ? 'text-[#8d9299] hover:text-white hover:bg-white/5'
                          : 'text-emerald-400 hover:bg-emerald-500/10'
                      }`}
                      title={item.is_active ? 'Ocultar de la web' : 'Hacer visible en la web'}
                    >
                      {item.is_active ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Ocultar
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Mostrar
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      {/* Botón Editar Título */}
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setEditTitle(item.title || '');
                        }}
                        className="p-1.5 rounded-lg text-[#8d9299] hover:text-white hover:bg-white/10 transition-all"
                        title="Editar pie de foto"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => setDeletingId(item.id)}
                        className="p-1.5 rounded-lg text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                        title="Eliminar fotografía"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 7. Modal de Confirmación de Eliminación */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-white">
                ¿Eliminar esta fotografía?
              </h3>
              <p className="text-xs text-[#8d9299] mt-1 leading-relaxed">
                Esta acción quitará la fotografía de la galería {currentTab.label} de forma permanente. No se mostrará más en la web pública.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-mono text-[#8d9299] hover:text-white hover:bg-white/5 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-rose-600/20 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Eliminando...
                  </>
                ) : (
                  'Sí, Eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

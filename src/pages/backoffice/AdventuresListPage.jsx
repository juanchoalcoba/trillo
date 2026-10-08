import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adventuresApi } from '../../services/api';

const CATEGORY_LABELS = {
  all: 'Todas',
  durazno: 'Durazno & Río Negro',
  nacionales: 'Travesías Nacionales',
  internacionales: 'Expediciones Internacionales',
};

export default function AdventuresListPage() {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadAdventures();
  }, []);

  const loadAdventures = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adventuresApi.getAllAdmin();
      setAdventures(res.adventures || res.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar las aventuras');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (adv) => {
    const newStatus = adv.status === 'published' ? 'draft' : 'published';
    try {
      setActionLoading(true);
      await adventuresApi.toggleStatus(adv.id, newStatus);
      setAdventures((prev) =>
        prev.map((a) => (a.id === adv.id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      alert(`Error al actualizar estado: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      setActionLoading(true);
      await adventuresApi.delete(deletingId);
      setAdventures((prev) => prev.filter((a) => a.id !== deletingId));
      setDeletingId(null);
    } catch (err) {
      alert(`Error al eliminar aventura: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredAdventures = adventures.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || a.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-display">
            Gestión de Aventuras y Expediciones
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Administra travesías en kayak, trekking, expediciones nacionales e internacionales.
          </p>
        </div>
        <Link
          to="/backoffice/adventures/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-sm transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Aventura
        </Link>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-80">
          <svg
            className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, lugar..."
            className="w-full bg-[#14161c] border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategoryFilter(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                categoryFilter === key
                  ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filtro estado */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#14161c] border border-neutral-800 text-neutral-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary"
          >
            <option value="all">Todos los estados</option>
            <option value="published">Publicados</option>
            <option value="draft">Borradores</option>
          </select>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-12 text-center">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-400">Cargando aventuras desde Supabase...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center text-red-300">
          <p className="font-semibold">{error}</p>
          <button
            onClick={loadAdventures}
            className="mt-3 px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-medium text-red-200 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : filteredAdventures.length === 0 ? (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-3 text-neutral-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          <p className="text-base font-semibold text-white">No se encontraron aventuras</p>
          <p className="text-sm text-neutral-400 mt-1">Intenta con otros filtros o crea una nueva expedición.</p>
        </div>
      ) : (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-neutral-800 bg-[#12141a] text-neutral-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Aventura / Destino</th>
                  <th className="py-4 px-5">Categoría</th>
                  <th className="py-4 px-5 whitespace-nowrap">Duración & Nivel</th>
                  <th className="py-4 px-5 whitespace-nowrap">Cupos</th>
                  <th className="py-4 px-5 text-center">Estado</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-sm">
                {filteredAdventures.map((adv) => (
                  <tr key={adv.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Thumbnail + Título + Ubicación */}
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={adv.image_url}
                          alt={adv.title}
                          className="w-14 h-14 rounded-xl object-cover border border-neutral-800/80 bg-neutral-900 shrink-0 shadow-md group-hover:border-neutral-700 transition-colors"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm group-hover:text-primary transition-colors truncate max-w-sm">
                            {adv.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1 truncate max-w-sm">
                            <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span className="truncate">{adv.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Categoría Badge */}
                    <td className="py-4.5 px-5 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#161820] text-neutral-300 border border-neutral-700/60">
                        {CATEGORY_LABELS[adv.category] || adv.category}
                      </span>
                    </td>

                    {/* Duración y Dificultad */}
                    <td className="py-4.5 px-5 whitespace-nowrap">
                      <div className="text-xs text-neutral-200 font-semibold">{adv.duration}</div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-1">{adv.difficulty}</div>
                    </td>

                    {/* Cupos / Grupo */}
                    <td className="py-4.5 px-5 whitespace-nowrap">
                      <span className="text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-lg">
                        {adv.group_size || 'Cupo limitado'}
                      </span>
                    </td>

                    {/* Estado toggle */}
                    <td className="py-4.5 px-5 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(adv)}
                        disabled={actionLoading}
                        title={`Click para alternar a ${adv.status === 'published' ? 'Borrador' : 'Publicado'}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          adv.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            adv.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        {adv.status === 'published' ? 'Publicado' : 'Borrador'}
                      </button>
                    </td>

                    {/* Acciones */}
                    <td className="py-4.5 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/backoffice/adventures/${adv.id}/edit`}
                          className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700/50"
                          title="Editar aventura"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingId(adv.id)}
                          className="p-2 rounded-xl bg-neutral-800/80 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors border border-neutral-700/50"
                          title="Eliminar aventura"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Borrado */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141a] border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">¿Confirmas la eliminación?</h3>
              <p className="text-sm text-neutral-400 mt-1">
                Esta acción eliminará la aventura permanentemente de la base de datos de Supabase.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-sm font-medium text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-semibold text-white transition-colors flex items-center gap-2"
              >
                {actionLoading && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Eliminar definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

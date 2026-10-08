import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventsApi } from '../../services/api';

export default function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await eventsApi.getAllAdmin();
      setEvents(res.events || res.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar los eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (event) => {
    const newStatus = event.status === 'published' ? 'draft' : 'published';
    try {
      setActionLoading(true);
      await eventsApi.toggleStatus(event.id, newStatus);
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, status: newStatus } : e))
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
      await eventsApi.delete(deletingId);
      setEvents((prev) => prev.filter((e) => e.id !== deletingId));
      setDeletingId(null);
    } catch (err) {
      alert(`Error al eliminar evento: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-display">
            Gestión de Eventos y Carreras
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Administra las carreras, cronogramas, kits y estados de publicación.
          </p>
        </div>
        <Link
          to="/backoffice/events/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-sm transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Evento
        </Link>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
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
            placeholder="Buscar por título, lugar o slug..."
            className="w-full bg-[#14161c] border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-neutral-400 font-medium">Estado:</span>
          <div className="inline-flex rounded-xl bg-[#14161c] p-1 border border-neutral-800">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-primary text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Todos ({events.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'published' ? 'bg-emerald-500 text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Publicados ({events.filter((e) => e.status === 'published').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'draft' ? 'bg-amber-500 text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Borradores ({events.filter((e) => e.status === 'draft').length})
            </button>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      {loading ? (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-12 text-center">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-400">Cargando eventos desde la base de datos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center text-red-300">
          <p className="font-semibold">{error}</p>
          <button
            onClick={loadEvents}
            className="mt-3 px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-medium text-red-200 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-3 text-neutral-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-white">No se encontraron eventos</p>
          <p className="text-sm text-neutral-400 mt-1">
            {search || statusFilter !== 'all' ? 'Intenta modificar los filtros de búsqueda.' : 'Crea tu primer evento para comenzar.'}
          </p>
        </div>
      ) : (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-neutral-800 bg-[#12141a] text-neutral-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Carrera / Evento</th>
                  <th className="py-4 px-5">Etiqueta & Temporada</th>
                  <th className="py-4 px-5 whitespace-nowrap">Fecha</th>
                  <th className="py-4 px-5">Distancias</th>
                  <th className="py-4 px-5 text-center">Estado</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-sm">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Thumbnail + Título + Lugar */}
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-14 h-14 rounded-xl object-cover border border-neutral-800/80 bg-neutral-900 shrink-0 shadow-md group-hover:border-neutral-700 transition-colors"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm group-hover:text-primary transition-colors truncate max-w-sm">
                            {event.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1 truncate max-w-sm">
                            <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Badge & Temporada */}
                    <td className="py-4.5 px-5">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#161820] text-neutral-300 border border-neutral-700/60 whitespace-nowrap">
                        {event.badge}
                      </span>
                      <div className="text-[11px] font-mono text-[#e87a38] mt-1.5 whitespace-nowrap">
                        {event.season}
                      </div>
                    </td>

                    {/* Fecha */}
                    <td className="py-4.5 px-5 whitespace-nowrap">
                      <span className="text-xs text-neutral-200 font-medium">
                        {event.date_text}
                      </span>
                    </td>

                    {/* Distancias */}
                    <td className="py-4.5 px-5">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {Array.isArray(event.distances) &&
                          event.distances.map((d, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[11px] bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono whitespace-nowrap"
                            >
                              {d}
                            </span>
                          ))}
                      </div>
                    </td>

                    {/* Estado con switch rápido */}
                    <td className="py-4.5 px-5 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(event)}
                        disabled={actionLoading}
                        title={`Click para cambiar a ${event.status === 'published' ? 'Borrador' : 'Publicado'}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          event.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            event.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        {event.status === 'published' ? 'Publicado' : 'Borrador'}
                      </button>
                    </td>

                    {/* Acciones */}
                    <td className="py-4.5 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/backoffice/events/${event.id}/edit`}
                          className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700/50"
                          title="Editar evento"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingId(event.id)}
                          className="p-2 rounded-xl bg-neutral-800/80 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors border border-neutral-700/50"
                          title="Eliminar evento"
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

      {/* Modal de Confirmación de Borrado */}
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
                Esta acción eliminará el evento de la base de datos de Supabase de forma permanente.
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

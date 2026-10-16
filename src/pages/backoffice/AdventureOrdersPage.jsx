import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  MessageCircle,
  RefreshCw,
  Loader2,
  Tag,
  FileText,
  Save,
  Check,
  Users,
  MapPin,
  Globe,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { adventureOrdersApi } from '../../services/api';

const DESTINATION_LABELS = {
  durazno: {
    label: 'Durazno',
    tagline: 'Río Yí & Local',
    badgeClass: 'bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/40',
    icon: Compass,
  },
  interior_uruguay: {
    label: 'Interior de Uruguay',
    tagline: 'Sierras & Quebradas',
    badgeClass: 'bg-amber-400/15 text-amber-400 border-amber-400/40',
    icon: MapPin,
  },
  internacional: {
    label: 'Internacional',
    tagline: 'Cordillera & Exterior',
    badgeClass: 'bg-sky-400/15 text-sky-400 border-sky-400/40',
    icon: Globe,
  },
};

const STATUS_LABELS = {
  pending: {
    label: 'Pendiente',
    badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    dotClass: 'bg-rose-500',
  },
  contacted: {
    label: 'En Gestión',
    badgeClass: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    dotClass: 'bg-amber-400',
  },
  confirmed: {
    label: 'Confirmado',
    badgeClass: 'bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/30',
    dotClass: 'bg-[#4ade80]',
  },
  cancelled: {
    label: 'Cancelado',
    badgeClass: 'bg-white/5 text-[#8d9299] border-white/10',
    dotClass: 'bg-neutral-500',
  },
};

export default function AdventureOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [destFilter, setDestFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adventureOrdersApi.getAllAdmin();
      setOrders(res.orders || res.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar los pedidos de aventuras.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Formateador de teléfono para enlace directo a WhatsApp (Uruguay +598)
  const formatWhatsAppUrl = (order) => {
    if (!order.phone) return '#';
    let clean = order.phone.replace(/[^0-9]/g, '');

    if (clean.startsWith('09') && clean.length === 9) {
      clean = '598' + clean.slice(1);
    } else if (clean.startsWith('9') && clean.length === 8) {
      clean = '598' + clean;
    } else if (!clean.startsWith('598') && clean.length <= 9) {
      clean = '598' + clean;
    }

    const destName = DESTINATION_LABELS[order.destination]?.label || order.destination;
    const prefilledText = encodeURIComponent(
      `Hola ${order.name}! Te escribo desde Trillo respecto a tu solicitud para armar una aventura en *${destName}* (${order.people_count} personas, ${order.duration_days}). ¿Cómo estás? Te comparto los detalles y opciones disponibles.`
    );

    return `https://wa.me/${clean}?text=${prefilledText}`;
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setActionLoading(id);
      await adventureOrdersApi.updateStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert(`Error al actualizar estado: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenWhatsApp = (order) => {
    const url = formatWhatsAppUrl(order);
    window.open(url, '_blank', 'noopener,noreferrer');
    if (order.status === 'pending') {
      handleUpdateStatus(order.id, 'contacted');
    }
  };

  const handleSaveNotes = async (id) => {
    try {
      setActionLoading(id);
      await adventureOrdersApi.updateStatus(id, undefined, tempNotes);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, admin_notes: tempNotes } : o))
      );
      setEditingNotesId(null);
    } catch (err) {
      alert(`Error al guardar notas: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Confirmás eliminar este pedido de aventura?')) return;
    try {
      setDeletingId(id);
      await adventureOrdersApi.delete(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      alert(`Error al eliminar pedido: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtrado de pedidos
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      search === '' ||
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.phone?.toLowerCase().includes(search.toLowerCase()) ||
      o.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.notes?.toLowerCase().includes(search.toLowerCase()) ||
      o.activity_type?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesDest = destFilter === 'all' || o.destination === destFilter;

    return matchesSearch && matchesStatus && matchesDest;
  });

  // Métricas
  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const contactedCount = orders.filter((o) => o.status === 'contacted').length;
  const confirmedCount = orders.filter((o) => o.status === 'confirmed').length;

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header con Título y Botón de Recarga */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ade80]/15 text-[#4ade80] text-[11px] font-mono uppercase tracking-wider mb-2 border border-[#4ade80]/30">
            <Compass className="w-3.5 h-3.5" />
            <span>Módulo de Pedidos Personalizados</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0] uppercase tracking-tight">
            Pedidos · Armá tu Aventura
          </h1>
          <p className="text-xs sm:text-sm text-[#8d9299] mt-1">
            Gestión y seguimiento de solicitudes de expediciones a medida recibidas desde la web.
          </p>
        </div>

        <button
          onClick={loadOrders}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#d8cfc4] hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#4ade80]' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* 2. Tarjetas de Métricas (KPIs) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c0e12] border border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d9299] block mb-1">
            Total Solicitudes
          </span>
          <span className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0]">
            {totalCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c0e12] border border-rose-500/30 relative overflow-hidden">
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 block mb-1">
            Pendientes
          </span>
          <span className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-rose-400">
            {pendingCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c0e12] border border-amber-400/30">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block mb-1">
            En Gestión
          </span>
          <span className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-amber-400">
            {contactedCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c0e12] border border-[#4ade80]/30">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#4ade80] block mb-1">
            Confirmados
          </span>
          <span className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#4ade80]">
            {confirmedCount}
          </span>
        </div>
      </div>

      {/* 3. Filtros y Barra de Búsqueda */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0c0e12] border border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8d9299] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente, teléfono, notas o actividades..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 focus:border-[#4ade80] focus:outline-none text-xs text-[#f5f4f0] placeholder:text-[#8d9299]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filtro de Estado */}
          <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-xl px-2.5 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#8d9299]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-[#d8cfc4] focus:outline-none cursor-pointer py-1"
            >
              <option value="all" className="bg-[#0c0e12] text-white">Todos los estados</option>
              <option value="pending" className="bg-[#0c0e12] text-white">Pendientes</option>
              <option value="contacted" className="bg-[#0c0e12] text-white">En Gestión</option>
              <option value="confirmed" className="bg-[#0c0e12] text-white">Confirmados</option>
              <option value="cancelled" className="bg-[#0c0e12] text-white">Cancelados</option>
            </select>
          </div>

          {/* Filtro de Destino */}
          <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-xl px-2.5 py-1 text-xs">
            <Compass className="w-3.5 h-3.5 text-[#8d9299]" />
            <select
              value={destFilter}
              onChange={(e) => setDestFilter(e.target.value)}
              className="bg-transparent text-xs text-[#d8cfc4] focus:outline-none cursor-pointer py-1"
            >
              <option value="all" className="bg-[#0c0e12] text-white">Todos los destinos</option>
              <option value="durazno" className="bg-[#0c0e12] text-white">Durazno</option>
              <option value="interior_uruguay" className="bg-[#0c0e12] text-white">Interior de Uruguay</option>
              <option value="internacional" className="bg-[#0c0e12] text-white">Internacional</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Lista de Pedidos */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#4ade80] animate-spin mx-auto" />
          <p className="text-xs font-mono uppercase tracking-wider text-[#8d9299]">
            Cargando pedidos de aventuras...
          </p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p className="text-sm text-rose-300 font-semibold">{error}</p>
          <button
            onClick={loadOrders}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white mt-2"
          >
            Reintentar
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-20 text-center p-8 rounded-3xl bg-[#0c0e12]/60 border border-white/10 space-y-3">
          <Compass className="w-10 h-10 text-white/20 mx-auto" />
          <h3 className="text-base font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
            No se encontraron pedidos
          </h3>
          <p className="text-xs text-[#8d9299] max-w-sm mx-auto">
            {search || statusFilter !== 'all' || destFilter !== 'all'
              ? 'Probá ajustando los filtros o el término de búsqueda.'
              : 'Aún no se han recibido solicitudes a través de "Armá tu Aventura".'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const destInfo = DESTINATION_LABELS[order.destination] || {
              label: order.destination,
              tagline: '',
              badgeClass: 'bg-white/10 text-white border-white/20',
              icon: Compass,
            };
            const statusInfo = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
            const DestIcon = destInfo.icon;
            const isEditingNotes = editingNotesId === order.id;

            return (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-[#0c0e12] border border-white/10 hover:border-white/20 transition-all space-y-5 shadow-xl"
              >
                {/* Cabecera de la Tarjeta del Pedido */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#4ade80] shrink-0 font-['Space_Grotesk'] font-bold text-base">
                      {order.name ? order.name.slice(0, 2).toUpperCase() : 'AV'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                          {order.name}
                        </h3>
                        {/* Badge de Estado */}
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold ${statusInfo.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                          <span>{statusInfo.label}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#8d9299] font-mono mt-0.5">
                        <span className="flex items-center gap-1 text-[#4ade80]">
                          <Phone className="w-3 h-3" />
                          <span>{order.phone}</span>
                        </span>
                        {order.email && (
                          <>
                            <span className="text-white/20">·</span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span>{order.email}</span>
                            </span>
                          </>
                        )}
                        <span className="text-white/20">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(order.created_at).toLocaleDateString('es-UY', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones Rápidas de Cabecera: WhatsApp & Selector de Estado */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleOpenWhatsApp(order)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4ade80] hover:bg-[#22c55e] text-black font-bold text-xs uppercase tracking-wider font-mono transition-all shadow-lg shadow-[#4ade80]/15"
                      title="Abrir conversación en WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <select
                      value={order.status}
                      disabled={actionLoading === order.id}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono uppercase text-[#d8cfc4] focus:outline-none cursor-pointer"
                    >
                      <option value="pending">Marcar Pendiente</option>
                      <option value="contacted">Marcar En Gestión</option>
                      <option value="confirmed">Marcar Confirmado</option>
                      <option value="cancelled">Marcar Cancelado</option>
                    </select>

                    <button
                      onClick={() => handleDelete(order.id)}
                      disabled={deletingId === order.id}
                      className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-[#8d9299] hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-colors"
                      title="Eliminar pedido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Especificaciones de la Aventura Solicitada */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  {/* Destino */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#8d9299] uppercase block">Destino</span>
                    <div className="flex items-center gap-1.5 font-bold text-[#f5f4f0]">
                      <DestIcon className="w-3.5 h-3.5 text-[#4ade80]" />
                      <span>{destInfo.label}</span>
                    </div>
                  </div>

                  {/* Grupo / Personas */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#8d9299] uppercase block">Grupo</span>
                    <div className="flex items-center gap-1.5 font-bold text-[#f5f4f0]">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{order.people_count} personas</span>
                    </div>
                  </div>

                  {/* Duración */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#8d9299] uppercase block">Duración</span>
                    <div className="flex items-center gap-1.5 font-bold text-[#f5f4f0]">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{order.duration_days}</span>
                    </div>
                  </div>

                  {/* Fecha Tentativa */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#8d9299] uppercase block">Fecha Estimada</span>
                    <div className="flex items-center gap-1.5 font-semibold text-[#f5f4f0]">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>{order.estimated_date || 'A convenir'}</span>
                    </div>
                  </div>
                </div>

                {/* Actividades Elegidas */}
                {order.activity_type && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                    <span className="text-[10px] uppercase text-[#8d9299] mr-1">Actividades:</span>
                    {order.activity_type.split(',').map((act, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#d8cfc4]"
                      >
                        {act.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Comentarios o Requerimientos del Cliente */}
                {order.notes && (
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[#8d9299] block">
                      Mensaje o Requerimientos del Solicitante:
                    </span>
                    <p className="text-[#f5f4f0] leading-relaxed italic">
                      "{order.notes}"
                    </p>
                  </div>
                )}

                {/* Notas Internas de Administración */}
                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex-1 w-full">
                    {isEditingNotes ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Añadir nota interna de seguimiento (ej: hablado por WhatsApp, presupuesto enviado...)"
                          className="flex-1 px-3 py-1.5 rounded-xl bg-black/60 border border-white/20 focus:border-[#4ade80] focus:outline-none text-xs text-[#f5f4f0]"
                        />
                        <button
                          onClick={() => handleSaveNotes(order.id)}
                          disabled={actionLoading === order.id}
                          className="px-3 py-1.5 rounded-xl bg-[#4ade80] text-black font-bold text-xs flex items-center gap-1 shrink-0"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Guardar</span>
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 text-[#8d9299] hover:text-white text-xs shrink-0"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-mono text-[#8d9299]">
                        <FileText className="w-3.5 h-3.5 text-[#4ade80]" />
                        <span className="text-[#d8cfc4]">
                          {order.admin_notes ? (
                            <span>Nota interna: <em>{order.admin_notes}</em></span>
                          ) : (
                            <span className="text-[#8d9299]/60">Sin notas internas</span>
                          )}
                        </span>
                        <button
                          onClick={() => {
                            setEditingNotesId(order.id);
                            setTempNotes(order.admin_notes || '');
                          }}
                          className="text-[#4ade80] hover:underline text-[11px] ml-2"
                        >
                          {order.admin_notes ? 'Editar nota' : '+ Agregar nota'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

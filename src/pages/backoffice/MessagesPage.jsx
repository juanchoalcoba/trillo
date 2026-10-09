import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Archive,
  Trash2,
  ExternalLink,
  MessageCircle,
  RefreshCw,
  Loader2,
  Tag,
  FileText,
  Save,
  Check,
} from 'lucide-react';
import { contactApi } from '../../services/api';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'unread', 'read', 'archived'
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null); // id of current item being modified
  const [deletingId, setDeletingId] = useState(null);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await contactApi.getAllAdmin();
      setMessages(res.messages || res.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar los mensajes de contacto.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Formateador de teléfono a formato internacional de WhatsApp (Uruguay +598)
  const formatWhatsAppUrl = (phone, name, subject) => {
    if (!phone) return '#';
    // Remover espacios, guiones, paréntesis
    let clean = phone.replace(/[^0-9]/g, '');

    // Si empieza con 09 (celular uruguayo ej: 099123456), quitar el 0 y agregar 598
    if (clean.startsWith('09') && clean.length === 9) {
      clean = '598' + clean.slice(1);
    } else if (clean.startsWith('9') && clean.length === 8) {
      clean = '598' + clean;
    } else if (!clean.startsWith('598') && clean.length <= 9) {
      clean = '598' + clean;
    }

    const prefilledText = encodeURIComponent(
      `Hola ${name || ''}! Te escribo desde Trillo en respuesta a tu consulta sobre "${subject || 'General'}" que nos dejaste en la web. ¿Cómo te podemos ayudar?`
    );

    return `https://wa.me/${clean}?text=${prefilledText}`;
  };

  // Cambiar estado (unread, read, archived)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setActionLoading(id);
      await contactApi.updateStatus(id, newStatus);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
    } catch (err) {
      alert(`Error al actualizar estado: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Abrir WhatsApp y automáticamente marcar como leído
  const handleOpenWhatsApp = (msg) => {
    const url = formatWhatsAppUrl(msg.phone, msg.name, msg.subject);
    window.open(url, '_blank', 'noopener,noreferrer');
    if (msg.status === 'unread') {
      handleUpdateStatus(msg.id, 'read');
    }
  };

  // Guardar notas internas
  const handleSaveNotes = async (id) => {
    try {
      setActionLoading(id);
      await contactApi.updateStatus(id, undefined, tempNotes);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, admin_notes: tempNotes } : m))
      );
      setEditingNotesId(null);
    } catch (err) {
      alert(`Error al guardar notas: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Eliminar mensaje
  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      setActionLoading(deletingId);
      await contactApi.delete(deletingId);
      setMessages((prev) => prev.filter((m) => m.id !== deletingId));
      setDeletingId(null);
    } catch (err) {
      alert(`Error al eliminar mensaje: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Filtrado de mensajes
  const filteredMessages = messages.filter((msg) => {
    // Filtro por estado
    if (statusFilter === 'unread' && msg.status !== 'unread') return false;
    if (statusFilter === 'read' && msg.status !== 'read') return false;
    if (statusFilter === 'archived' && msg.status !== 'archived') return false;
    if (statusFilter === 'all' && msg.status === 'archived') return false; // Por defecto 'all' no muestra archivados a menos que se seleccione

    // Filtro por motivo / subject
    if (subjectFilter !== 'all' && msg.subject !== subjectFilter) return false;

    // Filtro por búsqueda de texto
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = msg.name?.toLowerCase().includes(q);
      const matchPhone = msg.phone?.toLowerCase().includes(q);
      const matchEmail = msg.email?.toLowerCase().includes(q);
      const matchMessage = msg.message?.toLowerCase().includes(q);
      const matchSubject = msg.subject?.toLowerCase().includes(q);
      return matchName || matchPhone || matchEmail || matchMessage || matchSubject;
    }

    return true;
  });

  const unreadCount = messages.filter((m) => m.status === 'unread').length;
  const readCount = messages.filter((m) => m.status === 'read').length;
  const archivedCount = messages.filter((m) => m.status === 'archived').length;

  // Lista única de motivos para el filtro
  const availableSubjects = Array.from(new Set(messages.map((m) => m.subject).filter(Boolean)));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header de Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs text-[#e87a38] uppercase tracking-wider font-semibold">
              Bandeja de Contacto
            </span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#e87a38] text-black animate-pulse">
                {unreadCount} {unreadCount === 1 ? 'NUEVO' : 'NUEVOS'}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f5f4f0] font-['Space_Grotesk'] mt-1">
            Mensajes & Consultas Web
          </h1>
          <p className="text-xs text-[#8d9299] mt-1">
            Consultas recibidas en tiempo real desde el formulario de contacto público.
          </p>
        </div>

        <button
          onClick={loadMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#d8cfc4] hover:text-white transition-all self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* 2. Métricas Rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-[#121417] border-[#e87a38] shadow-lg shadow-[#e87a38]/10'
              : 'bg-[#121417]/50 border-white/5 hover:border-white/15'
          }`}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d9299] block">
            Activos
          </span>
          <span className="text-2xl font-black text-[#f5f4f0] font-['Space_Grotesk'] mt-1 block">
            {unreadCount + readCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('unread')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'unread'
              ? 'bg-[#121417] border-[#e87a38] shadow-lg shadow-[#e87a38]/10'
              : 'bg-[#121417]/50 border-white/5 hover:border-white/15'
          }`}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#e87a38] block flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38]" />
            No Leídos
          </span>
          <span className="text-2xl font-black text-[#e87a38] font-['Space_Grotesk'] mt-1 block">
            {unreadCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('read')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'read'
              ? 'bg-[#121417] border-[#4ade80] shadow-lg shadow-[#4ade80]/10'
              : 'bg-[#121417]/50 border-white/5 hover:border-white/15'
          }`}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#4ade80] block">
            Leídos
          </span>
          <span className="text-2xl font-black text-[#4ade80] font-['Space_Grotesk'] mt-1 block">
            {readCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('archived')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'archived'
              ? 'bg-[#121417] border-white/30 shadow-lg'
              : 'bg-[#121417]/50 border-white/5 hover:border-white/15'
          }`}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d9299] block">
            Archivados
          </span>
          <span className="text-2xl font-black text-[#8d9299] font-['Space_Grotesk'] mt-1 block">
            {archivedCount}
          </span>
        </button>
      </div>

      {/* 3. Barra de Búsqueda y Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8d9299] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, celular, tema o mensaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121417] border border-white/10 text-xs text-[#f5f4f0] placeholder-[#8d9299]/60 focus:border-[#e87a38] outline-none transition-all"
          />
        </div>

        {availableSubjects.length > 0 && (
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#8d9299]" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-[#121417] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#d8cfc4] focus:border-[#e87a38] outline-none"
            >
              <option value="all">Todos los temas</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 4. Lista de Mensajes */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#8d9299]">
          <Loader2 className="w-8 h-8 animate-spin text-[#e87a38] mb-3" />
          <span className="text-xs font-mono uppercase tracking-wider">Cargando mensajes...</span>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="py-16 text-center bg-[#121417]/40 border border-white/5 rounded-3xl p-8">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#8d9299] mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#f5f4f0] uppercase tracking-wider font-['Space_Grotesk']">
            No hay mensajes en esta sección
          </h3>
          <p className="text-xs text-[#8d9299] mt-1 max-w-sm mx-auto">
            {search
              ? 'No se encontraron resultados para la búsqueda actual.'
              : 'La bandeja de entrada está al día. Las nuevas consultas que envíen desde la web aparecerán aquí automáticamente.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const isUnread = msg.status === 'unread';
            const isArchived = msg.status === 'archived';
            const formattedDate = new Date(msg.created_at).toLocaleString('es-UY', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={msg.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative ${
                  isUnread
                    ? 'bg-[#14171c] border-[#e87a38]/40 shadow-lg shadow-[#e87a38]/5'
                    : isArchived
                    ? 'bg-[#101215]/60 border-white/5 opacity-70'
                    : 'bg-[#121417] border-white/10'
                }`}
              >
                {/* Header de la tarjeta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-base text-[#f5f4f0]">{msg.name}</span>

                    {/* Badge de Tema */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-[#d8cfc4] border border-white/10">
                      <Tag className="w-3 h-3 text-[#e87a38]" />
                      <span>{msg.subject || 'General'}</span>
                    </span>

                    {/* Badge de Estado */}
                    {isUnread ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#e87a38] text-black">
                        NO LEÍDO
                      </span>
                    ) : isArchived ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#8d9299]">
                        ARCHIVADO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30">
                        LEÍDO
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8d9299]">
                    <Clock className="w-3.5 h-3.5 text-[#e87a38]" />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Datos de contacto y mensaje */}
                <div className="my-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[#4ade80] font-mono font-medium">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{msg.phone}</span>
                    </div>

                    {msg.email && (
                      <div className="flex items-center gap-1.5 text-[#8d9299] font-mono">
                        <Mail className="w-3.5 h-3.5 text-[#8d9299]" />
                        <span>{msg.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Cuerpo del Mensaje */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm text-[#e4e4e7] leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </div>

                  {/* Notas Internas de Administración si existen */}
                  {msg.admin_notes && editingNotesId !== msg.id && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                        <div>
                          <span className="font-bold block text-[10px] uppercase font-mono tracking-wider text-amber-400">
                            Nota interna:
                          </span>
                          <span>{msg.admin_notes}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesId(msg.id);
                          setTempNotes(msg.admin_notes || '');
                        }}
                        className="text-[11px] underline text-amber-400 hover:text-white"
                      >
                        Editar
                      </button>
                    </div>
                  )}

                  {/* Editor de notas internas inline */}
                  {editingNotesId === msg.id && (
                    <div className="p-3 rounded-lg bg-black/50 border border-amber-500/40 space-y-2">
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Escribí una nota interna (ej: 'Contactado por WhatsApp', 'Interesado en Plan Semestral')..."
                        className="w-full text-xs p-2.5 rounded-lg bg-[#121417] border border-white/10 text-white outline-none focus:border-amber-400 resize-none"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2.5 py-1 text-xs text-[#8d9299] hover:text-white"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveNotes(msg.id)}
                          className="px-3 py-1 rounded bg-amber-400 text-black text-xs font-bold hover:bg-amber-300"
                        >
                          Guardar Nota
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Barra de Acciones */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                  {/* Botón WhatsApp Inteligente */}
                  <button
                    onClick={() => handleOpenWhatsApp(msg)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#4ade80] hover:bg-[#3ec470] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Responder por WhatsApp</span>
                  </button>

                  {/* Acciones Secundarias */}
                  <div className="flex items-center gap-2">
                    {/* Marcar leído / no leído */}
                    <button
                      onClick={() => handleUpdateStatus(msg.id, isUnread ? 'read' : 'unread')}
                      disabled={actionLoading === msg.id}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#d8cfc4] hover:text-white transition-all cursor-pointer"
                      title={isUnread ? 'Marcar como leído' : 'Marcar como no leído'}
                    >
                      {isUnread ? 'Marcar como leído' : 'Marcar como no leído'}
                    </button>

                    {/* Agregar Nota si no tiene */}
                    {!msg.admin_notes && editingNotesId !== msg.id && (
                      <button
                        onClick={() => {
                          setEditingNotesId(msg.id);
                          setTempNotes('');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#d8cfc4] hover:text-white transition-all cursor-pointer"
                      >
                        + Nota
                      </button>
                    )}

                    {/* Archivar / Desarchivar */}
                    <button
                      onClick={() => handleUpdateStatus(msg.id, isArchived ? 'read' : 'archived')}
                      disabled={actionLoading === msg.id}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8d9299] hover:text-white transition-all cursor-pointer"
                      title={isArchived ? 'Desarchivar' : 'Archivar'}
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => setDeletingId(msg.id)}
                      disabled={actionLoading === msg.id}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                      title="Eliminar mensaje"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121417] border border-white/10 rounded-2xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white uppercase tracking-wider font-['Space_Grotesk']">
                ¿Eliminar este mensaje?
              </h4>
              <p className="text-xs text-[#8d9299] mt-1.5 leading-relaxed">
                Esta acción no se puede deshacer. Se removerá permanentemente de la base de datos.
              </p>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-mono uppercase tracking-wider text-white font-bold transition-all"
              >
                Confirmar y Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

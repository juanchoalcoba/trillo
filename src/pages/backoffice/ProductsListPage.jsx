import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../../services/api';

const CATEGORY_LABELS = {
  all: 'Todas',
  club: 'Línea Club',
  carreras: 'Línea Carreras',
  streetwear: 'Streetwear',
  abrigo: 'Abrigo & Accesorios',
};

const STOCK_STATUS_LABELS = {
  available: { label: 'En Stock', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  preorder: { label: 'Preventa', class: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  out_of_stock: { label: 'Agotado', class: 'bg-red-500/10 text-red-400 border-red-500/30' },
};

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await productsApi.getAllAdmin();
      setProducts(res.products || res.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (prod) => {
    const newStatus = prod.status === 'published' ? 'draft' : 'published';
    try {
      setActionLoading(true);
      await productsApi.toggleStatus(prod.id, newStatus);
      setProducts((prev) =>
        prev.map((p) => (p.id === prod.id ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      alert(`Error al cambiar estado: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      setActionLoading(true);
      await productsApi.delete(deletingId);
      setProducts((prev) => prev.filter((p) => p.id !== deletingId));
      setDeletingId(null);
    } catch (err) {
      alert(`Error al eliminar producto: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-display">
            Tienda Trillo - Indumentaria Oficial
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Administra prendas oficiales, stock, fotos frontal/dorso, talles y precios en UYU.
          </p>
        </div>
        <Link
          to="/backoffice/products/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-sm transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Producto
        </Link>
      </div>

      {/* Filtros */}
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
            placeholder="Buscar prenda por nombre..."
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

        {/* Estado */}
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
          <p className="text-sm text-neutral-400">Cargando productos de la tienda...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center text-red-300">
          <p className="font-semibold">{error}</p>
          <button
            onClick={loadProducts}
            className="mt-3 px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-medium text-red-200 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-3 text-neutral-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-white">No se encontraron productos</p>
          <p className="text-sm text-neutral-400 mt-1">Prueba cambiando los filtros o publica una nueva prenda oficial.</p>
        </div>
      ) : (
        <div className="bg-[#0e1014] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 bg-[#13151a] text-neutral-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Prenda / Producto</th>
                  <th className="py-3.5 px-4">Categoría</th>
                  <th className="py-3.5 px-4">Precio (UYU)</th>
                  <th className="py-3.5 px-4">Talles / Stock</th>
                  <th className="py-3.5 px-4 text-center">Estado</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850 text-sm">
                {filteredProducts.map((prod) => {
                  const stockMeta = STOCK_STATUS_LABELS[prod.stock_status] || STOCK_STATUS_LABELS.available;

                  return (
                    <tr key={prod.id} className="hover:bg-[#12141a]/60 transition-colors">
                      {/* Imagen + Título */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.front_image_url}
                            alt={prod.name}
                            className="w-14 h-14 rounded-xl object-contain bg-[#171920] border border-neutral-800 shrink-0 p-1"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80';
                            }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-white truncate max-w-xs">{prod.name}</p>
                              {prod.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 truncate max-w-xs">{prod.subtitle}</p>
                            <span className="text-[11px] font-mono text-neutral-500">/{prod.slug}</span>
                          </div>
                        </div>
                      </td>

                      {/* Categoría */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#1a1c24] text-neutral-300 border border-neutral-700/60">
                          {CATEGORY_LABELS[prod.category] || prod.category}
                        </span>
                      </td>

                      {/* Precio */}
                      <td className="py-4 px-4">
                        <div className="font-mono text-white font-bold text-base">
                          $ {Number(prod.price).toLocaleString('es-UY')}
                        </div>
                        <span className="text-[10px] text-neutral-500 uppercase">{prod.currency || 'UYU'}</span>
                      </td>

                      {/* Talles y Stock */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold border ${stockMeta.class}`}>
                          {stockMeta.label}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {Array.isArray(prod.sizes) &&
                            prod.sizes.map((s, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-800 text-neutral-300 font-mono"
                              >
                                {s}
                              </span>
                            ))}
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(prod)}
                          disabled={actionLoading}
                          title={`Click para cambiar a ${prod.status === 'published' ? 'Borrador' : 'Publicado'}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                            prod.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              prod.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          {prod.status === 'published' ? 'Publicado' : 'Borrador'}
                        </button>
                      </td>

                      {/* Acciones */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/backoffice/products/${prod.id}/edit`}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                            title="Editar prenda"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingId(prod.id)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                            title="Eliminar producto"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
                Esta acción eliminará el producto definitivamente de la tienda oficial.
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

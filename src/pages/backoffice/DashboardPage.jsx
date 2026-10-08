import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Compass,
  ShoppingBag,
  Plus,
  ArrowUpRight,
  Database,
  Cloud,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { eventsApi, adventuresApi, productsApi } from '../../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    eventsCount: 0,
    eventsPublished: 0,
    adventuresCount: 0,
    productsCount: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [eventsRes, advRes, prodRes] = await Promise.all([
          eventsApi.getAllAdmin().catch(() => ({ events: [] })),
          adventuresApi.getAllAdmin().catch(() => ({ adventures: [] })),
          productsApi.getAllAdmin().catch(() => ({ products: [] })),
        ]);

        const events = eventsRes.events || [];
        const adventures = advRes.adventures || [];
        const products = prodRes.products || [];

        setStats({
          eventsCount: events.length,
          eventsPublished: events.filter((e) => e.status === 'published').length,
          adventuresCount: adventures.length,
          productsCount: products.length,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error: 'No se pudieron cargar las métricas en tiempo real.',
        }));
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Header con Bienvenida y Acciones Rápidas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#e87a38] block mb-1">
            Panel de Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0] tracking-tight">
            Gestión Integral TRILLO
          </h1>
          <p className="text-xs sm:text-sm text-[#8d9299] mt-1">
            Administra carreras, expediciones y la tienda oficial desde un único lugar.
          </p>
        </div>

        {/* Acciones directas */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/backoffice/events/new"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#e87a38] hover:bg-[#ea580c] text-black font-bold text-xs transition-colors shadow-lg shadow-[#e87a38]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Evento</span>
          </Link>
          <Link
            to="/backoffice/products/new"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Prenda</span>
          </Link>
        </div>
      </div>

      {/* 2. Tarjetas de Métricas Nucleares */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card: Eventos */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1015] p-6 flex flex-col justify-between hover:border-[#e87a38]/40 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-2xl bg-[#e87a38]/10 text-[#e87a38] border border-[#e87a38]/20">
                <Trophy className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-[#8d9299]">
                Durazno
              </span>
            </div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8d9299]">
              Eventos & Carreras
            </h3>
            <div className="text-3xl sm:text-4xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mt-2">
              {stats.isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.eventsCount}
            </div>
            <p className="text-xs text-[#8d9299] mt-2">
              {stats.eventsPublished} publicadas en la web
            </p>
          </div>
          <Link
            to="/backoffice/events"
            className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#e87a38] group-hover:underline font-semibold"
          >
            <span>Administrar carreras</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card: Aventuras */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1015] p-6 flex flex-col justify-between hover:border-[#4ade80]/40 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-2xl bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20">
                <Compass className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-[#8d9299]">
                3 Regiones
              </span>
            </div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8d9299]">
              Trillo Aventuras
            </h3>
            <div className="text-3xl sm:text-4xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mt-2">
              {stats.isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.adventuresCount}
            </div>
            <p className="text-xs text-[#8d9299] mt-2">
              Durazno, Nacionales e Internacionales
            </p>
          </div>
          <Link
            to="/backoffice/adventures"
            className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#4ade80] group-hover:underline font-semibold"
          >
            <span>Administrar expediciones</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card: Tienda */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1015] p-6 flex flex-col justify-between hover:border-violet-400/40 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-[#8d9299]">
                Catálogo
              </span>
            </div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8d9299]">
              Tienda Oficial
            </h3>
            <div className="text-3xl sm:text-4xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mt-2">
              {stats.isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.productsCount}
            </div>
            <p className="text-xs text-[#8d9299] mt-2">
              Prendas activas para venta por WhatsApp
            </p>
          </div>
          <Link
            to="/backoffice/products"
            className="mt-6 inline-flex items-center gap-1.5 text-xs text-violet-400 group-hover:underline font-semibold"
          >
            <span>Administrar indumentaria</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. Estado de la Infraestructura */}
      <div className="rounded-3xl border border-white/10 bg-[#0d1015] p-6 sm:p-8">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#8d9299] mb-4">
          Infraestructura Conectada
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supabase */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">
                  PostgreSQL en Supabase
                </span>
                <span className="block text-[11px] font-mono text-[#8d9299]">
                  Transaction Pooler (Puerto 6543)
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Operativo
            </span>
          </div>

          {/* Cloudinary */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">
                  Cloudinary CDN
                </span>
                <span className="block text-[11px] font-mono text-[#8d9299]">
                  Signed Uploads Directos
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Conectado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

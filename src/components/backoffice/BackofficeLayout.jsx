import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Trophy,
  Compass,
  ShoppingBag,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
  Shield,
  Sparkles,
} from 'lucide-react';

export default function BackofficeLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/backoffice/login');
  };

  const navItems = [
    { to: '/backoffice', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/backoffice/events', label: 'Eventos & Carreras', icon: Trophy },
    { to: '/backoffice/adventures', label: 'Aventuras', icon: Compass },
    { to: '/backoffice/products', label: 'Tienda Trillo', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f5f4f0] flex">
      {/* 1. Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-white/10 bg-[#0c0e12]/80 backdrop-blur-md p-6 shrink-0 sticky top-0 h-screen">
        <div className="space-y-8">
          {/* Logo y Marca Oficial */}
          <Link to="/backoffice" className="flex items-center gap-3 group">
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="h-10 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(232,122,56,0.3)] transition-transform group-hover:scale-105"
            />
            <div className="border-l border-white/10 pl-3">
              <span className="font-['Space_Grotesk'] font-black tracking-wider text-xs block text-white">
                TRILLO
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#e87a38] uppercase block">
                Backoffice
              </span>
            </div>
          </Link>

          {/* Navegación Principal */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8d9299] px-3 block mb-2">
              Gestión de Contenido
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#e87a38] text-black font-bold shadow-lg shadow-[#e87a38]/20'
                        : 'text-[#8d9299] hover:text-[#f5f4f0] hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar: Admin info y Logout */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-[#8d9299] hover:text-[#f5f4f0] px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#e87a38]" />
              Ver web pública
            </span>
            <span className="text-[10px] font-mono text-white/30">↗</span>
          </Link>

          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#e87a38]">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold truncate text-[#f5f4f0]">
                  {admin?.name || 'Administrador'}
                </span>
                <span className="block text-[10px] font-mono text-[#8d9299] truncate">
                  {admin?.email}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#8d9299] hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 ml-1"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Contenedor Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Mobile */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0c0e12] sticky top-0 z-30">
          <Link to="/backoffice" className="flex items-center gap-2">
            <img
              src="/logoTrillo.png"
              alt="TRILLO"
              className="h-8 w-auto object-contain"
            />
            <span className="font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider text-white">
              BACKOFFICE
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Drawer Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#0c0e12] p-4 space-y-3 z-20">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                        isActive ? 'bg-[#e87a38] text-black font-bold' : 'text-[#8d9299]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#8d9299]">{admin?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-red-400 font-mono"
              >
                <LogOut className="w-3.5 h-3.5" /> Salir
              </button>
            </div>
          </div>
        )}

        {/* Contenido Dinámico de la Ruta */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

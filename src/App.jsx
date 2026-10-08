import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import SmoothScroll from './components/common/SmoothScroll';
import { AuthProvider } from './context/AuthContext';

// Páginas Públicas
import HomePage from './pages/HomePage';
import ClubPage from './pages/ClubPage';
import EventosPage from './pages/EventosPage';
import AventurasPage from './pages/AventurasPage';
import TiendaPage from './pages/TiendaPage';

// Backoffice
import ProtectedRoute from './components/backoffice/ProtectedRoute';
import BackofficeLayout from './components/backoffice/BackofficeLayout';
import LoginPage from './pages/backoffice/LoginPage';
import DashboardPage from './pages/backoffice/DashboardPage';
import EventsListPage from './pages/backoffice/EventsListPage';
import EventFormPage from './pages/backoffice/EventFormPage';
import AdventuresListPage from './pages/backoffice/AdventuresListPage';
import AdventureFormPage from './pages/backoffice/AdventureFormPage';
import ProductsListPage from './pages/backoffice/ProductsListPage';
import ProductFormPage from './pages/backoffice/ProductFormPage';

// Resetea el scroll al cambiar de página en el sitio público
function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

// Layout para páginas públicas con Lenis Smooth Scroll
function PublicLayout() {
  return (
    <SmoothScroll>
      <ScrollReset />
      <Outlet />
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 1. RUTAS PÚBLICAS (Con SmoothScroll) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/club" element={<ClubPage />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/aventuras" element={<AventurasPage />} />
            <Route path="/tienda" element={<TiendaPage />} />
          </Route>

          {/* 2. LOGIN ADMINISTRATIVO */}
          <Route path="/backoffice/login" element={<LoginPage />} />

          {/* 3. RUTAS PROTEGIDAS DEL BACKOFFICE */}
          <Route
            path="/backoffice"
            element={
              <ProtectedRoute>
                <BackofficeLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard principal */}
            <Route index element={<DashboardPage />} />

            {/* Gestión de Eventos */}
            <Route path="events" element={<EventsListPage />} />
            <Route path="events/new" element={<EventFormPage />} />
            <Route path="events/:id/edit" element={<EventFormPage />} />

            {/* Gestión de Aventuras */}
            <Route path="adventures" element={<AdventuresListPage />} />
            <Route path="adventures/new" element={<AdventureFormPage />} />
            <Route path="adventures/:id/edit" element={<AdventureFormPage />} />

            {/* Gestión de Tienda */}
            <Route path="products" element={<ProductsListPage />} />
            <Route path="products/new" element={<ProductFormPage />} />
            <Route path="products/:id/edit" element={<ProductFormPage />} />
          </Route>

          {/* 4. ALIAS Y REDIRECCIONES */}
          <Route path="/backend" element={<Navigate to="/backoffice" replace />} />
          <Route path="/admin" element={<Navigate to="/backoffice" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

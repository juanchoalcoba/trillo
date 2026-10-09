import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import SmoothScroll from './components/common/SmoothScroll';
import { AuthProvider } from './context/AuthContext';

// Páginas Públicas (HomePage inmediata, demás diferidas bajo demanda)
import HomePage from './pages/HomePage';
const ClubPage = lazy(() => import('./pages/ClubPage'));
const EventosPage = lazy(() => import('./pages/EventosPage'));
const AventurasPage = lazy(() => import('./pages/AventurasPage'));
const TiendaPage = lazy(() => import('./pages/TiendaPage'));
const ContactoPage = lazy(() => import('./pages/ContactoPage'));

// Backoffice (100% diferido: cero impacto en visitantes públicos)
import ProtectedRoute from './components/backoffice/ProtectedRoute';
const BackofficeLayout = lazy(() => import('./components/backoffice/BackofficeLayout'));
const LoginPage = lazy(() => import('./pages/backoffice/LoginPage'));
const DashboardPage = lazy(() => import('./pages/backoffice/DashboardPage'));
const EventsListPage = lazy(() => import('./pages/backoffice/EventsListPage'));
const EventFormPage = lazy(() => import('./pages/backoffice/EventFormPage'));
const AdventuresListPage = lazy(() => import('./pages/backoffice/AdventuresListPage'));
const AdventureFormPage = lazy(() => import('./pages/backoffice/AdventureFormPage'));
const ProductsListPage = lazy(() => import('./pages/backoffice/ProductsListPage'));
const ProductFormPage = lazy(() => import('./pages/backoffice/ProductFormPage'));
const ClubPlansPage = lazy(() => import('./pages/backoffice/ClubPlansPage'));
const MessagesPage = lazy(() => import('./pages/backoffice/MessagesPage'));


// Indicador de carga ultra liviano y elegante para transiciones de ruta
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#e87a38]/30 border-t-[#e87a38] animate-spin" />
    </div>
  );
}

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
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
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
            <Route path="/contacto" element={<ContactoPage />} />
          </Route>

          {/* 2. LOGIN ADMINISTRATIVO */}
          <Route
            path="/backoffice/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            }
          />

          {/* 3. RUTAS PROTEGIDAS DEL BACKOFFICE */}
          <Route
            path="/backoffice"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <BackofficeLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            {/* Dashboard principal */}
            <Route index element={<DashboardPage />} />

            {/* Gestión de Mensajes de Contacto */}
            <Route path="messages" element={<MessagesPage />} />

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

            {/* Gestión de Planes del Club */}
            <Route path="club-plans" element={<ClubPlansPage />} />
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

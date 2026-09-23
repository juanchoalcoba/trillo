import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/common/SmoothScroll';
import HomePage from './pages/HomePage';
import ClubPage from './pages/ClubPage';

// Resetea el scroll suave al cambiar de página
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

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollReset />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/club" element={<ClubPage />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}

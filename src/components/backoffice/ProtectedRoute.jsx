import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { admin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08090a] flex flex-col items-center justify-center gap-4 text-[#f5f4f0]">
        <div className="relative">
          <Loader2 className="w-10 h-10 text-[#e87a38] animate-spin" />
          <div className="absolute inset-0 bg-[#e87a38]/20 blur-xl rounded-full" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#8d9299]">
          Verificando credenciales...
        </p>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/backoffice/login" state={{ from: location }} replace />;
  }

  return children;
}

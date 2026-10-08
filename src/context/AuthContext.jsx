import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar sesión existente mediante /api/auth/me
  const checkAuth = useCallback(async () => {
    try {
      const data = await authApi.getMe();
      if (data?.user) {
        setAdmin(data.user);
      } else {
        setAdmin(null);
      }
    } catch (err) {
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Inicio de sesión
  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    if (data?.user) {
      setAdmin(data.user);
    }
    return data;
  };

  // Cierre de sesión
  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setAdmin(null);
    }
  };

  const value = {
    admin,
    isAuthenticated: Boolean(admin),
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}

export default AuthContext;

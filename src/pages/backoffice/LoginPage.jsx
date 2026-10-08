import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/backoffice';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifique sus credenciales.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f5f4f0] flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#e87a38] selection:text-black">
      {/* Fondo con brillo ambiental sutil */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#e87a38]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Cabecera / Identidad */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e87a38] to-[#ea580c] text-black font-['Space_Grotesk'] font-black text-2xl shadow-xl shadow-[#e87a38]/20 mb-4">
            T
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight">
            TRILLO BACKOFFICE
          </h1>
          <p className="text-xs font-mono text-[#8d9299] mt-1.5 uppercase tracking-widest">
            Acceso Privado de Administración
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1015]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
                <span className="shrink-0 text-base">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8d9299] mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8d9299]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@trilloeventos.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#f5f4f0] placeholder:text-white/20 text-sm focus:outline-none focus:border-[#e87a38] transition-colors"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8d9299] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8d9299]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#f5f4f0] placeholder:text-white/20 text-sm focus:outline-none focus:border-[#e87a38] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8d9299] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#e87a38] to-[#ea580c] hover:from-[#f97316] hover:to-[#e87a38] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#e87a38]/25 transition-all disabled:opacity-50 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer de seguridad */}
          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] font-mono text-[#8d9299]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sesión encriptada con JWT + HttpOnly Cookies</span>
          </div>
        </div>
      </div>
    </div>
  );
}

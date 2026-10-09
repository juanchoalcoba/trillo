import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Compass,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { contactApi } from '../services/api';

const TOPICS = [
  { id: 'General', label: 'Consulta General' },
  { id: 'El Club de Corredores', label: 'El Club de Corredores' },
  { id: 'Eventos & Carreras', label: 'Eventos (San Pedro)' },
  { id: 'Trillo Aventuras', label: 'Aventuras & Expediciones' },
  { id: 'Tienda Oficial', label: 'TiendaTrillo' },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    document.title = 'Contacto | TRILLO Durazno';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSelectTopic = (topicId) => {
    setFormData((prev) => ({ ...prev, subject: topicId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Por favor ingresá tu nombre.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Por favor ingresá tu teléfono o celular de contacto.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Por favor escribí el mensaje o consulta.');
      return;
    }

    setIsSubmitting(true);
    try {
      await contactApi.submit({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        subject: formData.subject,
        message: formData.message.trim(),
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General',
        message: '',
      });
    } catch (err) {
      setErrorMessage(
        err.message || 'Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo o escribinos por WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f5f4f0] selection:bg-[#e87a38] selection:text-white relative overflow-x-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#e87a38]/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#f59e0b]/5 blur-[150px]" />
      </div>

      {/* Navbar Superior */}
      <header className="sticky top-0 z-40 bg-[#08090a]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8d9299] hover:text-[#f5f4f0] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-[#e87a38] transition-transform group-hover:-translate-x-1" />
              <span>Volver a Inicio</span>
            </Link>

            <div className="h-4 w-px bg-white/15 hidden sm:block" />

            <Link to="/" className="flex items-center">
              <img
                src="/logoTrillo.png"
                alt="Trillo"
                className="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden md:flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-[#8d9299]">
              <Link to="/eventos" className="hover:text-[#f5f4f0] transition-colors">
                Eventos
              </Link>
              <Link to="/aventuras" className="hover:text-[#f5f4f0] transition-colors">
                Aventuras
              </Link>
              <Link to="/club" className="hover:text-[#f5f4f0] transition-colors">
                El Club
              </Link>
              <Link to="/tienda" className="hover:text-[#f5f4f0] transition-colors">
                Tienda
              </Link>
            </nav>

            <a
              href="https://wa.me/59898121608?text=Hola%20Trillo!%20Quisiera%20hacerles%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#4ade80] bg-[#4ade80]/10 hover:bg-[#4ade80]/20 border border-[#4ade80]/30 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Cabecera */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-[#e87a38] bg-[#e87a38]/10 border border-[#e87a38]/30 mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contacto Oficial · Trillo Durazno</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#f5f4f0] font-['Space_Grotesk'] leading-[1.1]">
            Hablemos de tu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e87a38] to-[#fbbf24]">
              próximo paso
            </span>
          </h1>

          <p className="mt-4 text-[#8d9299] text-base sm:text-lg leading-relaxed">
            ¿Tenés dudas sobre una carrera, querés sumarte a los entrenamientos del Club, coordinar una expedición o
            proponer una alianza? Dejanos tu consulta y te responderemos en el día.
          </p>
        </div>

        {/* Grilla 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Formulario (7 columnas) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121417]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#4ade80]/20 border border-[#4ade80]/40 flex items-center justify-center text-[#4ade80] mb-5 shadow-lg shadow-[#4ade80]/10">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-bold uppercase tracking-wider text-[#f5f4f0] font-['Space_Grotesk']">
                      ¡Mensaje Recibido!
                    </h3>

                    <p className="mt-3 text-sm text-[#8d9299] max-w-md leading-relaxed">
                      Muchas gracias por comunicarte con Trillo. Tu consulta ya fue registrada y te estaremos
                      contactando por WhatsApp o teléfono a la brevedad.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-[#f5f4f0] border border-white/20 transition-all"
                      >
                        Enviar otra consulta
                      </button>

                      <a
                        href="https://wa.me/59898121608"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#4ade80] hover:bg-[#3ec470] text-black font-bold transition-all shadow-md"
                      >
                        Abrir WhatsApp
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-wider text-[#8d9299] mb-2">
                        Motivo de consulta
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map((topic) => (
                          <button
                            type="button"
                            key={topic.id}
                            onClick={() => handleSelectTopic(topic.id)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                              formData.subject === topic.id
                                ? 'bg-[#e87a38] text-white shadow-md shadow-[#e87a38]/30 font-semibold'
                                : 'bg-white/5 hover:bg-white/10 text-[#8d9299] hover:text-[#f5f4f0] border border-white/10'
                            }`}
                          >
                            {topic.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Nombre */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-mono uppercase tracking-wider text-[#8d9299] mb-2"
                        >
                          Nombre y Apellido <span className="text-[#e87a38]">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre completo"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-[#f5f4f0] placeholder-[#8d9299]/50 focus:border-[#e87a38] focus:ring-1 focus:ring-[#e87a38] transition-all text-sm outline-none"
                        />
                      </div>

                      {/* Celular / WhatsApp */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-mono uppercase tracking-wider text-[#8d9299] mb-2"
                        >
                          Teléfono / Celular <span className="text-[#e87a38]">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="099 123 456"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-[#f5f4f0] placeholder-[#8d9299]/50 focus:border-[#e87a38] focus:ring-1 focus:ring-[#e87a38] transition-all text-sm outline-none"
                        />
                      </div>
                    </div>

                    {/* Email Opcional */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-[#8d9299] mb-2"
                      >
                        Correo Electrónico <span className="text-xs text-[#8d9299]/60 font-sans normal-case">(Opcional)</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tuemail@ejemplo.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-[#f5f4f0] placeholder-[#8d9299]/50 focus:border-[#e87a38] focus:ring-1 focus:ring-[#e87a38] transition-all text-sm outline-none"
                      />
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-mono uppercase tracking-wider text-[#8d9299] mb-2"
                      >
                        Mensaje o Consulta <span className="text-[#e87a38]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Contanos qué tenés en mente o en qué te podemos ayudar..."
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-[#f5f4f0] placeholder-[#8d9299]/50 focus:border-[#e87a38] focus:ring-1 focus:ring-[#e87a38] transition-all text-sm outline-none resize-none"
                      />
                    </div>

                    {/* Mensaje de Error si aplica */}
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Botón de Envío */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e87a38] to-[#fbbf24] hover:opacity-95 text-black font-bold uppercase tracking-wider text-xs font-mono transition-all duration-300 shadow-lg shadow-[#e87a38]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Enviando mensaje...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black" />
                          <span>Enviar Consulta</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Columna Derecha: Tarjetas de Información Directa (5 columnas) */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Card Prominente */}
            <div className="bg-gradient-to-br from-[#121417] to-[#1c1f24] border border-[#4ade80]/20 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ade80]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80]">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#4ade80]/20 text-[#4ade80] font-bold border border-[#4ade80]/30">
                  Respuesta Inmediata
                </span>
              </div>

              <h3 className="text-lg font-bold uppercase tracking-wider text-[#f5f4f0] font-['Space_Grotesk']">
                ¿Preferís chatear directo?
              </h3>
              <p className="mt-1.5 text-xs text-[#8d9299] leading-relaxed">
                Contactate con Pablo Trillo y el equipo de coordinación directamente a través de nuestro WhatsApp oficial.
              </p>

              <div className="mt-5">
                <a
                  href="https://wa.me/59898121608?text=Hola%20Trillo!%20Me%20contacto%20desde%20la%20web%20para%20hacerles%20una%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#4ade80] hover:bg-[#3ec470] text-black font-bold text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-md group-hover:shadow-[#4ade80]/20 group-hover:scale-[1.02]"
                >
                  <span>Chatear al +598 98 121 608</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Datos de Localización y Base Trillo */}
            <div className="bg-[#121417]/70 border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#e87a38] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Base de Operaciones</span>
              </h4>

              <div className="space-y-3.5 text-xs text-[#8d9299]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#f5f4f0] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#f5f4f0] font-medium">Durazno, Río Yí, Uruguay</span>
                    <span className="text-[11px] font-mono text-[#8d9299]">Coordenadas: 33°22'S 56°31'W</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#f5f4f0] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#f5f4f0] font-medium">Entrenamientos y Actividades</span>
                    <span className="text-[11px]">Lunes a Sábados (Turnos mañana y tarde)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#f5f4f0] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#f5f4f0] font-medium">Canales Digitales</span>
                    <div className="flex items-center gap-3 mt-1 text-[#d8cfc4]">
                      <a
                        href="https://www.instagram.com/trillo.uy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#e87a38] transition-colors"
                      >
                        Instagram @trillo.uy
                      </a>
                      <span>·</span>
                      <a
                        href="https://www.youtube.com/@ALTRANCOPODCAST/streams"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-400 transition-colors"
                      >
                        YouTube Podcast
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro banner de El Club */}
            <div className="bg-[#121417]/50 border border-amber-500/20 rounded-2xl p-4.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block font-bold">
                  ¿Buscás sumarte a entrenar?
                </span>
                <span className="text-xs text-[#d8cfc4]">Conocé las cuotas y planes de El Club</span>
              </div>
              <Link
                to="/club#planes"
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-mono font-medium border border-amber-500/30 transition-all"
              >
                Ver Planes
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="relative z-10 border-t border-white/10 mt-16 py-8 text-center text-xs font-mono text-[#8d9299]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>TRILLO · Universo en Movimiento · Durazno, Uruguay</span>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/" className="hover:text-[#f5f4f0] transition-colors">
              Inicio
            </Link>
            <Link to="/eventos" className="hover:text-[#f5f4f0] transition-colors">
              Eventos
            </Link>
            <Link to="/aventuras" className="hover:text-[#f5f4f0] transition-colors">
              Aventuras
            </Link>
            <Link to="/club" className="hover:text-[#f5f4f0] transition-colors">
              El Club
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

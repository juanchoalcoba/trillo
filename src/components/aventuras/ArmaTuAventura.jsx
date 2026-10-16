import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  Mountain,
  Waves,
  Globe,
  Plus,
  Minus,
  Footprints,
  Tent,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { adventureOrdersApi } from '../../services/api';

const DESTINATIONS = [
  {
    id: 'durazno',
    title: 'Durazno',
    tagline: 'Río Yí & Territorio Local',
    description: 'Senderos agrestes, monte nativo, travesías en kayak por el Río Yí y campamentos en la naturaleza.',
    icon: Compass,
    accent: '#4ade80',
    badge: 'Origen Trillo',
    image: 'https://res.cloudinary.com/pglfifpm/image/upload/f_auto,q_auto,w_800/v1791735018/trillo/ui/about/durazno.jpg',
  },
  {
    id: 'interior_uruguay',
    title: 'Interior de Uruguay',
    tagline: 'Sierras, Quebradas & Ríos',
    description: 'Expediciones en los rincones más salvajes del país: Sierras de Minas, Quebrada de los Cuervos, Valle del Lunarejo y más.',
    icon: MapPin,
    accent: '#f59e0b',
    badge: 'Territorio Nacional',
    image: 'https://res.cloudinary.com/pglfifpm/image/upload/f_auto,q_auto,w_800/v1791462578/trillo/ui/hero-backgrounds/aventuras-hero.jpg',
  },
  {
    id: 'internacional',
    title: 'Internacional / Exterior',
    tagline: 'Cordillera & Alta Montaña',
    description: 'Cruce de los Andes, volcanes, cordillera patagónica y desafíos de altura con logística y guías de montaña certificados.',
    icon: Globe,
    accent: '#38bdf8',
    badge: 'Gran Travesía',
    image: '/pablo.jpeg',
  },
];

const DURATION_OPTIONS = [
  { id: '1 día (Full Day)', label: '1 Día', sub: 'Full Day' },
  { id: '2 días (Fin de semana)', label: '2 Días', sub: 'Fin de semana' },
  { id: '3 a 5 días (Travesía)', label: '3 a 5 Días', sub: 'Travesía' },
  { id: 'Más de 5 días (Expedición)', label: '+5 Días', sub: 'Expedición' },
];

const ACTIVITY_TAGS = [
  { id: 'Trekking & Senderos', icon: Footprints },
  { id: 'Kayak & Río', icon: Waves },
  { id: 'Trail Running', icon: Mountain },
  { id: 'Campamento Agreste', icon: Tent },
  { id: 'Pesca Deportiva', icon: Flame },
  { id: 'Combinada / Mixta', icon: Sparkles },
];

export default function ArmaTuAventura() {
  const [destination, setDestination] = useState('durazno');
  const [peopleCount, setPeopleCount] = useState(4);
  const [durationDays, setDurationDays] = useState('2 días (Fin de semana)');
  const [selectedActivities, setSelectedActivities] = useState(['Trekking & Senderos']);
  
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    estimatedDate: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const currentDestObj = DESTINATIONS.find((d) => d.id === destination) || DESTINATIONS[0];

  const handleToggleActivity = (actId) => {
    setSelectedActivities((prev) =>
      prev.includes(actId)
        ? prev.length > 1
          ? prev.filter((a) => a !== actId)
          : prev
        : [...prev, actId]
    );
  };

  const handlePeopleChange = (delta) => {
    setPeopleCount((prev) => Math.max(1, Math.min(60, prev + delta)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!contactData.name.trim()) {
      setErrorMessage('Por favor indicá tu nombre y apellido.');
      return;
    }

    if (!contactData.phone.trim()) {
      setErrorMessage('Por favor indicá un número de WhatsApp o teléfono para contactarte.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: contactData.name.trim(),
        phone: contactData.phone.trim(),
        email: contactData.email.trim() || null,
        destination,
        people_count: peopleCount,
        duration_days: durationDays,
        activity_type: selectedActivities.join(', '),
        estimated_date: contactData.estimatedDate.trim() || null,
        notes: contactData.notes.trim() || null,
      };

      const res = await adventureOrdersApi.submit(payload);

      setSubmittedData({
        ...payload,
        destinationTitle: currentDestObj.title,
        id: res.data?.id,
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Error enviando pedido de aventura:', err);
      setErrorMessage(
        err.message || 'Ocurrió un error al enviar tu solicitud. Podés escribirnos directo por WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    if (!submittedData) return '#';
    const text = `¡Hola Trillo! Quiero coordinar mi aventura personalizada:%0A%0A` +
      `📍 *Destino:* ${submittedData.destinationTitle}%0A` +
      `👥 *Personas:* ${submittedData.people_count}%0A` +
      `⏱️ *Duración:* ${submittedData.duration_days}%0A` +
      `🏕️ *Actividades:* ${submittedData.activity_type}%0A` +
      (submittedData.estimated_date ? `📅 *Fecha tentativa:* ${submittedData.estimated_date}%0A` : '') +
      `👤 *Nombre:* ${submittedData.name}%0A` +
      `📞 *Teléfono:* ${submittedData.phone}%0A` +
      (submittedData.notes ? `📝 *Detalles:* ${submittedData.notes}%0A` : '');
    return `https://wa.me/59898121608?text=${text}`;
  };

  return (
    <section id="arma-tu-aventura" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4ade80]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header de la Sección */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 text-xs text-[#4ade80] font-mono uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Servicio Exclusivo a Medida</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-['Space_Grotesk'] text-[#f5f4f0] tracking-tight uppercase leading-[1.1]">
          Armá tu{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] via-[#22c55e] to-amber-400">
            Aventura
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#d8cfc4] leading-relaxed">
          Elegí el territorio, la cantidad de días y quiénes te acompañan. Nosotros nos encargamos de los guías, la logística, los campamentos y la seguridad para crear una experiencia inolvidable.
        </p>
      </motion.div>

      {/* Estado de Éxito al Enviar */}
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0c0e12]/95 border border-[#4ade80]/40 backdrop-blur-xl shadow-2xl text-center space-y-6"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#4ade80]/15 border border-[#4ade80]/40 flex items-center justify-center text-[#4ade80]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4ade80]">
                ¡Solicitud Recibida con Éxito!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0]">
                Tu aventura ya comenzó a tomar forma
              </h3>
              <p className="text-sm text-[#d8cfc4] max-w-lg mx-auto">
                Muchas gracias, <strong className="text-white">{submittedData?.name}</strong>. Hemos recibido tu pedido para{' '}
                <strong className="text-[#4ade80]">{submittedData?.destinationTitle}</strong> con un grupo de{' '}
                <strong className="text-white">{submittedData?.people_count} personas</strong> por{' '}
                <strong className="text-white">{submittedData?.duration_days}</strong>.
              </p>
            </div>

            {/* Resumen de la Solicitud */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#8d9299]">
                <span>Destino:</span>
                <span className="text-[#f5f4f0] font-semibold">{submittedData?.destinationTitle}</span>
              </div>
              <div className="flex justify-between text-[#8d9299]">
                <span>Personas:</span>
                <span className="text-[#f5f4f0] font-semibold">{submittedData?.people_count} aventureros</span>
              </div>
              <div className="flex justify-between text-[#8d9299]">
                <span>Duración:</span>
                <span className="text-[#f5f4f0] font-semibold">{submittedData?.duration_days}</span>
              </div>
              <div className="flex justify-between text-[#8d9299]">
                <span>Actividades:</span>
                <span className="text-[#4ade80] font-semibold">{submittedData?.activity_type}</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#4ade80] hover:bg-[#22c55e] text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#4ade80]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setContactData({ name: '', phone: '', email: '', estimatedDate: '', notes: '' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#d8cfc4] transition-colors"
              >
                Armar otra aventura
              </button>
            </div>
          </motion.div>
        ) : (
          /* Formulario Principal Interactivo */
          <motion.form
            key="adventure-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Columna Izquierda: Configuración Interactiva (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* PASO 1: Elegir Destino */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0e12]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4ade80] text-black font-bold font-mono text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                    ¿Dónde querés hacer la aventura?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {DESTINATIONS.map((dest) => {
                    const isSelected = destination === dest.id;
                    const Icon = dest.icon;
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => setDestination(dest.id)}
                        className={`text-left p-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-gradient-to-b from-[#18231c] to-[#0c0e12] border-[#4ade80] shadow-[0_0_25px_rgba(74,222,128,0.18)] scale-[1.02]'
                            : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-[#4ade80] text-black'
                                : 'bg-white/5 text-[#8d9299] group-hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                              isSelected
                                ? 'bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/40'
                                : 'bg-white/5 text-[#8d9299] border-white/10'
                            }`}
                          >
                            {dest.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-sm sm:text-base font-['Space_Grotesk'] text-[#f5f4f0]">
                            {dest.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#8d9299] block mt-0.5">
                            {dest.tagline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explicación del destino seleccionado */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-[#b4bac2]">
                  <Compass className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <p>{currentDestObj.description}</p>
                </div>
              </div>

              {/* PASO 2: Personas y Días */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Cantidad de Personas */}
                <div className="p-6 rounded-3xl bg-[#0c0e12]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4ade80] text-black font-bold font-mono text-xs flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                      ¿Cuántas personas son?
                    </h3>
                  </div>

                  {/* Contador Interactivo */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-black/60 border border-white/10">
                    <button
                      type="button"
                      onClick={() => handlePeopleChange(-1)}
                      disabled={peopleCount <= 1}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#f5f4f0] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="text-center">
                      <span className="text-3xl font-black font-['Space_Grotesk'] text-[#f5f4f0]">
                        {peopleCount}
                      </span>
                      <span className="text-[10px] font-mono text-[#8d9299] block uppercase tracking-wider">
                        {peopleCount === 1 ? 'Aventurero' : 'Aventureros'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePeopleChange(1)}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#f5f4f0] transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pills de Acceso Rápido */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {[
                      { n: 1, label: 'Solo' },
                      { n: 2, label: 'Dúo' },
                      { n: 5, label: 'Grupo (5)' },
                      { n: 10, label: 'Grupo (10+)' },
                    ].map((item) => (
                      <button
                        key={item.n}
                        type="button"
                        onClick={() => setPeopleCount(item.n)}
                        className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono transition-colors border ${
                          peopleCount === item.n
                            ? 'bg-[#4ade80]/20 text-[#4ade80] border-[#4ade80]/40'
                            : 'bg-white/5 text-[#8d9299] border-white/5 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cantidad de Días */}
                <div className="p-6 rounded-3xl bg-[#0c0e12]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4ade80] text-black font-bold font-mono text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                      ¿Cuánto querés que dure?
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {DURATION_OPTIONS.map((opt) => {
                      const isSelected = durationDays === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDurationDays(opt.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#4ade80]/15 border-[#4ade80] text-[#f5f4f0]'
                              : 'bg-black/40 border-white/10 text-[#8d9299] hover:text-white hover:border-white/20'
                          }`}
                        >
                          <span className="block text-xs font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                            {opt.label}
                          </span>
                          <span className="block text-[10px] font-mono text-[#8d9299]">
                            {opt.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PASO 3: Actividades de Interés */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0e12]/90 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4ade80] text-black font-bold font-mono text-xs flex items-center justify-center">
                      4
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-[#f5f4f0]">
                      ¿Qué actividades te gustaría incluir?
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#8d9299]">
                    Podés elegir varias
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {ACTIVITY_TAGS.map((act) => {
                    const isSelected = selectedActivities.includes(act.id);
                    const Icon = act.icon;
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => handleToggleActivity(act.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#4ade80]/15 border-[#4ade80] text-[#4ade80] font-semibold'
                            : 'bg-black/40 border-white/10 text-[#8d9299] hover:text-[#f5f4f0] hover:border-white/20'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{act.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Resumen & Formulario de Contacto (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Tarjeta de Resumen en Tiempo Real */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#141820] to-[#0c0e12] border border-[#4ade80]/30 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-5">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-[#4ade80]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#4ade80]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#d8cfc4]">
                      Tu Aventura Personalizada
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-mono uppercase font-bold">
                    Trillo Custom
                  </span>
                </div>

                {/* Resumen de opciones seleccionadas */}
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8d9299]">Destino:</span>
                    <span className="text-[#f5f4f0] font-bold">{currentDestObj.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8d9299]">Aventureros:</span>
                    <span className="text-[#f5f4f0] font-bold">{peopleCount} personas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8d9299]">Duración:</span>
                    <span className="text-[#f5f4f0] font-bold">{durationDays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8d9299]">Actividades:</span>
                    <span className="text-[#4ade80] font-bold truncate max-w-[180px] text-right">
                      {selectedActivities.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Formulario de Contacto del Solicitante */}
                <div className="pt-4 border-t border-white/10 space-y-3.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#f5f4f0] block">
                    Completá tus datos para cotizar:
                  </span>

                  <div>
                    <label className="text-[11px] font-mono text-[#8d9299] block mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={contactData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#4ade80] focus:outline-none text-xs text-[#f5f4f0] placeholder:text-white/20 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-[#8d9299] block mb-1">
                        WhatsApp / Celular *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={contactData.phone}
                        onChange={handleInputChange}
                        placeholder="Ej: 099 123 456"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#4ade80] focus:outline-none text-xs text-[#f5f4f0] placeholder:text-white/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-[#8d9299] block mb-1">
                        Email (Opcional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactData.email}
                        onChange={handleInputChange}
                        placeholder="correo@ejemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#4ade80] focus:outline-none text-xs text-[#f5f4f0] placeholder:text-white/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#8d9299] block mb-1">
                      Fecha o época tentativa
                    </label>
                    <input
                      type="text"
                      name="estimatedDate"
                      value={contactData.estimatedDate}
                      onChange={handleInputChange}
                      placeholder="Ej: Noviembre / Fin de semana largo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#4ade80] focus:outline-none text-xs text-[#f5f4f0] placeholder:text-white/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#8d9299] block mb-1">
                      Comentarios o requerimientos particulares
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={contactData.notes}
                      onChange={handleInputChange}
                      placeholder="Ej: Es un grupo de amigos, queremos acampar cerca del río..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-[#4ade80] focus:outline-none text-xs text-[#f5f4f0] placeholder:text-white/20 transition-colors resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#4ade80] hover:bg-[#22c55e] text-black font-bold text-xs uppercase tracking-wider font-mono transition-all duration-300 shadow-xl shadow-[#4ade80]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Enviando solicitud...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Solicitar Aventura a Medida</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#8d9299] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>Sin compromiso · Respuesta y asesoramiento personalizado</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}

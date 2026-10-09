import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, MessageCircle, ArrowUpRight, ShieldCheck, HeartHandshake, Zap, Trophy } from 'lucide-react';
import { clubPlansApi } from '../../services/api';

const DEFAULT_PLANS = [
  {
    id: 'mensual',
    slug: 'mensual',
    name: 'Plan Mensual Pase Libre',
    badge: 'Más Elegido · Presencial',
    price: '$ 1.400',
    period: 'UYU / mes',
    tagline: 'Acceso total a todos los días, turnos y grupos de entrenamiento en Durazno.',
    highlighted: true,
    accent: '#f59e0b',
    features: [
      'Pase libre a todos los entrenamientos presenciales (Lunes a Sábado)',
      'Profesores de educación física guiando cada sesión en vivo',
      'Planificación deportiva según tus metas (desde iniciación a maratón)',
      'Entrenamientos en pista, ribera del Río Yí y senderos',
      'Descuento exclusivo en inscripciones a Trillo Eventos (San Pedro)',
      'Acceso preferencial a expediciones de Trillo Aventuras',
      'Fondos grupales y tercer tiempo de camaradería los fines de semana',
      'Seguro deportivo de accidentes personales incluido',
    ],
    whatsapp_msg: 'Hola Trillo! Quiero afiliarme a El Club de Corredores con el Plan Mensual Pase Libre ($1.400/mes). ¿Cuáles son los próximos pasos?',
  },
  {
    id: 'semestral',
    slug: 'semestral',
    name: 'Plan Semestral Bonificado',
    badge: 'Remera Oficial Incluida',
    price: '$ 1.200',
    period: 'UYU / mes (Abono semestral)',
    tagline: 'Para quienes hacen del movimiento un estilo de vida continuo todo el año.',
    highlighted: false,
    accent: '#fbbf24',
    features: [
      'Todos los beneficios del Plan Mensual Pase Libre',
      'Remera técnica oficial de entrenamiento del Club de regalo',
      'Ahorro directo en la cuota mensual',
      '20% de descuento asegurado en la Corrida San Pedro',
      'Congelamiento de cuota por 6 meses',
      'Prioridad absoluta en indumentaria y cupos de eventos',
    ],
    whatsapp_msg: 'Hola Trillo! Quiero afiliarme con el Plan Semestral Bonificado de El Club de Corredores.',
  },
  {
    id: 'distancia',
    slug: 'distancia',
    name: 'Plan a Distancia',
    badge: 'Todo Uruguay',
    price: '$ 1.100',
    period: 'UYU / mes',
    tagline: 'Entrená con nuestra metodología y seguimiento estés donde estés en el país.',
    highlighted: false,
    accent: '#d8cfc4',
    features: [
      'Planificación semanal personalizada según tus tiempos y objetivos',
      'Preparación específica para 5K, 10K, 21K, 42K o Trail',
      'Contacto directo y feedback semanal con los entrenadores',
      'Ajustes continuos de ritmos según datos de tu reloj o app',
      'Descuentos en carreras del circuito Trillo',
      'Comunidad online y apoyo constante',
    ],
    whatsapp_msg: 'Hola Trillo! Me interesa contratar el Plan a Distancia de El Club de Corredores.',
  },
];

export default function ClubPricing() {
  const [plans, setPlans] = useState(DEFAULT_PLANS);

  useEffect(() => {
    let isMounted = true;
    async function loadPlans() {
      try {
        const res = await clubPlansApi.getPublished();
        if (isMounted && res?.plans && res.plans.length > 0) {
          setPlans(res.plans);
        }
      } catch (err) {
        // En caso de corte o red lenta se conservan los DEFAULT_PLANS
        console.warn('Usando planes locales de respaldo del Club:', err.message);
      }
    }
    loadPlans();
    return () => {
      isMounted = false;
    };
  }, []);


  const benefitsGrid = [
    {
      icon: ShieldCheck,
      title: 'Entrenadores Profesionales en Vivo',
      desc: 'No te dejamos solo con una planilla de internet. Hay profesores acompañándote, corrigiendo tu postura y dosificando las cargas para evitar lesiones.',
    },
    {
      icon: HeartHandshake,
      title: 'Comunidad Real & Pelotón Compartido',
      desc: 'Correr en grupo cambia la experiencia por completo. Los kilómetros pasan volando, el aliento mutuo te hace superar días difíciles y nacen amistades para toda la vida.',
    },
    {
      icon: Zap,
      title: 'El Río Yí como Gimnasio Natural',
      desc: 'Combinamos césped, arena, asfalto y ribera natural. El contacto con la naturaleza de Durazno oxigena la mente y reduce radicalmente los niveles de estrés diario.',
    },
    {
      icon: Trophy,
      title: 'Integración al Universo Trillo',
      desc: 'Al ser socio de El Club tenés tarifa preferencial en las carreras de Trillo Eventos y acceso exclusivo con prioridad a las travesías y kayak de Trillo Aventuras.',
    },
  ];

  return (
    <section id="membresia" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-24">
      {/* Header de Sección */}
      <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-xs text-amber-300 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono uppercase tracking-widest text-[11px] font-semibold">
            Cuota Mensual & Afiliación
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] tracking-tight"
        >
          Invertí en tu Salud, Energía y Pertenencia
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[#8d9299] leading-relaxed"
        >
          Una cuota accesible pensada para que no haya excusas. Pase libre a todos los entrenamientos semanales, profesores en cada sesión y la mejor comunidad de corredores del interior del país.
        </motion.p>
      </div>

      {/* Grid de Planes & Cuotas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`rounded-3xl p-8 glass-panel border flex flex-col justify-between transition-all duration-500 relative ${
              plan.highlighted
                ? 'border-amber-400/60 bg-gradient-to-b from-amber-500/15 via-[#0d1015] to-[#08090a] shadow-2xl shadow-amber-500/10 scale-100 lg:-translate-y-2'
                : 'border-white/10 hover:border-white/20 bg-[#0d1015]/70'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                Recomendado
              </div>
            )}

            <div>
              {/* Header de la Tarjeta */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 font-semibold">
                  {plan.badge}
                </span>
              </div>

              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-2">
                {plan.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#8d9299] mb-6 leading-relaxed">
                {plan.tagline}
              </p>

              {/* Precio Grande */}
              <div className="py-4 border-y border-white/10 mb-6 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-['Space_Grotesk'] font-black text-[#f5f4f0]">
                  {plan.price}
                </span>
                <span className="text-xs font-mono text-[#8d9299]">
                  {plan.period}
                </span>
              </div>

              {/* Lista de Beneficios */}
              <div className="space-y-3 mb-8">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#d8cfc4] font-bold">
                  Beneficios incluidos:
                </span>
                {(Array.isArray(plan.features) ? plan.features : []).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#d8cfc4]">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-amber-400" />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón WhatsApp con Teléfono Real */}
            <a
              href={`https://wa.me/59898121608?text=${encodeURIComponent(plan.whatsapp_msg || plan.whatsappMsg || 'Hola Trillo! Quiero afiliarme a El Club de Corredores.')}`}
              target="_blank"

              rel="noopener noreferrer"
              className={`w-full py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                plan.highlighted
                  ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/25'
                  : 'bg-white/10 hover:bg-white/20 text-[#f5f4f0] border border-white/15'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar o Inscribirme</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* 4 Grandes Beneficios de Pertenecer */}
      <div className="pt-12 border-t border-white/10">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8d9299]">
            ¿Por qué afiliarte?
          </span>
          <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk'] font-bold text-[#f5f4f0] mt-1">
            Los Beneficios de Correr con El Club
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsGrid.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-['Space_Grotesk'] font-bold text-[#f5f4f0] mb-2">
                    {b.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8d9299] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

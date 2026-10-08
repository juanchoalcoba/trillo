import cloudinaryMap from './cloudinaryUrls.json';

/**
 * Genera una URL de Cloudinary con transformaciones automáticas de formato y calidad.
 * @param {string} key Identificador del archivo en cloudinaryUrls.json (ej: '1003', 'clubfondook')
 * @param {string} transforms Transformaciones de Cloudinary (default: 'f_auto,q_auto')
 * @returns {string} URL optimizada de entrega
 */
export function getOptimizedMediaUrl(key, transforms = 'f_auto,q_auto') {
  const item = cloudinaryMap[key];
  if (!item) {
    console.warn(`[Cloudinary] Clave no encontrada: ${key}`);
    return '';
  }

  // Si tiene transforms, los inyectamos después de '/upload/'
  if (transforms && item.secureUrl.includes('/upload/')) {
    return item.secureUrl.replace('/upload/', `/upload/${transforms}/`);
  }

  return item.secureUrl;
}

// Constantes globales de multimedia clave
export const CLOUDINARY_MEDIA = {
  // Video Principal y Poster Liviano
  HERO_VIDEO: getOptimizedMediaUrl('1003', 'f_auto,q_auto'),
  HERO_VIDEO_POSTER: 'https://res.cloudinary.com/pglfifpm/video/upload/so_1,w_1280,f_auto,q_auto/v1791462575/trillo/ui/videos/1003.jpg',

  // Fondos Hero
  HERO_CLUB_BG: getOptimizedMediaUrl('clubfondook', 'f_auto,q_auto,w_1920'),
  HERO_AVENTURAS_BG: getOptimizedMediaUrl('aventuras-hero', 'f_auto,q_auto,w_1920'),
  HERO_EVENTOS_BG: getOptimizedMediaUrl('eventos-hero', 'f_auto,q_auto,w_1920'),

  // Eventos
  EVENTOS_VERTI: getOptimizedMediaUrl('eventosverti', 'f_auto,q_auto,w_1200'),
  EVENTOS_SAN_PEDRO_START: getOptimizedMediaUrl('san_pedro_start', 'f_auto,q_auto,w_1200'),
  EVENTOS_SAN_PEDRO_NIGHT: getOptimizedMediaUrl('san_pedro_night', 'f_auto,q_auto,w_1200'),
  EVENTOS_SAN_PEDRO_FINISH: getOptimizedMediaUrl('san_pedro_finish', 'f_auto,q_auto,w_1200'),
  EVENTOS_SAN_PEDRO_COMMUNITY: getOptimizedMediaUrl('san_pedro_community', 'f_auto,q_auto,w_1200'),
  EVENTOS_SAN_PEDRO_KIT: getOptimizedMediaUrl('san_pedro_kit', 'f_auto,q_auto,w_1200'),

  // Tienda
  TIENDA_SAN_PEDRO_FRONT: getOptimizedMediaUrl('remera-sanpedro-front', 'f_auto,q_auto,w_800'),
  TIENDA_SAN_PEDRO_BACK: getOptimizedMediaUrl('remera-sanpedro-back', 'f_auto,q_auto,w_800'),
  TIENDA_SAN_PEDRO_MOCKUP: getOptimizedMediaUrl('remeras2-mockup', 'f_auto,q_auto,w_1000'),

  TIENDA_MAGMA_FRONT: getOptimizedMediaUrl('remera-cdc-magma-front', 'f_auto,q_auto,w_800'),
  TIENDA_MAGMA_BACK: getOptimizedMediaUrl('remera-cdc-magma-back', 'f_auto,q_auto,w_800'),
  TIENDA_MAGMA_MOCKUP: getOptimizedMediaUrl('remeras-cdc-mockup', 'f_auto,q_auto,w_1000'),

  TIENDA_INDIGO_FRONT: getOptimizedMediaUrl('remera-cdc-blue-front', 'f_auto,q_auto,w_800'),
  TIENDA_INDIGO_BACK: getOptimizedMediaUrl('remera-cdc-blue-back', 'f_auto,q_auto,w_800'),

  TIENDA_OVERSIZE_FRONT: getOptimizedMediaUrl('remera-oversize-front', 'f_auto,q_auto,w_800'),
  TIENDA_OVERSIZE_BACK: getOptimizedMediaUrl('remera-oversize-back', 'f_auto,q_auto,w_800'),
  TIENDA_OVERSIZE_MOCKUP: getOptimizedMediaUrl('remeras3-mockup', 'f_auto,q_auto,w_1000'),

  TIENDA_CAMPERA: getOptimizedMediaUrl('campera-club', 'f_auto,q_auto,w_800'),
  TIENDA_CAMPERA_MOCKUP: getOptimizedMediaUrl('remeras4-mockup', 'f_auto,q_auto,w_1000'),
};

export default CLOUDINARY_MEDIA;

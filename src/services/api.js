// URL base de la API del backend (limpia barras finales para evitar doble barra //api)
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.API_BASE_URL || 'http://localhost:4000';
export const API_BASE_URL = String(rawBaseUrl).trim().replace(/\/+$/, '');

/**
 * Cliente HTTP base que maneja JSON y envía cookies HttpOnly automáticamente.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // Imprescindible para enviar y recibir la cookie trillo_admin_token
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch (networkError) {
    throw new Error('No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data?.error?.message || data?.message || `Error del servidor (${response.status})`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.code = data?.error?.code;
    throw error;
  }

  return data;
}

// ==========================================
// 1. SERVICIOS DE AUTENTICACIÓN
// ==========================================
export const authApi = {
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request('/api/auth/logout', {
      method: 'POST',
    }),

  getMe: () =>
    request('/api/auth/me', {
      method: 'GET',
    }),
};

// ==========================================
// 2. SERVICIOS DE EVENTOS
// ==========================================
export const eventsApi = {
  getPublished: () => request('/api/events'),
  getBySlugOrId: (slugOrId) => request(`/api/events/${slugOrId}`),

  // Métodos administrativos
  getAllAdmin: () => request('/api/events/admin/all'),
  create: (data) =>
    request('/api/events/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/api/events/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    request(`/api/events/admin/${id}`, {
      method: 'DELETE',
    }),
  toggleStatus: (id, status) =>
    request(`/api/events/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ==========================================
// 3. SERVICIOS DE AVENTURAS
// ==========================================
export const adventuresApi = {
  getPublished: (category) =>
    request(`/api/adventures${category && category !== 'all' ? `?category=${category}` : ''}`),
  getBySlugOrId: (slugOrId) => request(`/api/adventures/${slugOrId}`),

  // Métodos administrativos
  getAllAdmin: () => request('/api/adventures/admin/all'),
  create: (data) =>
    request('/api/adventures/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/api/adventures/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    request(`/api/adventures/admin/${id}`, {
      method: 'DELETE',
    }),
  toggleStatus: (id, status) =>
    request(`/api/adventures/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ==========================================
// 4. SERVICIOS DE TIENDA / PRODUCTOS
// ==========================================
export const productsApi = {
  getPublished: (category) =>
    request(`/api/products${category && category !== 'all' ? `?category=${category}` : ''}`),
  getBySlugOrId: (slugOrId) => request(`/api/products/${slugOrId}`),

  // Métodos administrativos
  getAllAdmin: () => request('/api/products/admin/all'),
  create: (data) =>
    request('/api/products/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/api/products/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    request(`/api/products/admin/${id}`, {
      method: 'DELETE',
    }),
  toggleStatus: (id, status) =>
    request(`/api/products/admin/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ==========================================
// 5. SERVICIO DE SUBIDA DIRECTA A CLOUDINARY
// ==========================================
export const uploadApi = {
  /**
   * Sube un archivo directamente a Cloudinary solicitando firma previa al backend.
   * @param {File} file Archivo seleccionado en el navegador
   * @param {string} folder Carpeta destino (ej: 'trillo/events')
   * @returns {Promise<string>} URL segura optimizada de Cloudinary
   */
  uploadDirectToCloudinary: async (file, folder = 'trillo/general') => {
    // 1. Solicitar firma criptográfica a nuestro backend
    const signData = await request('/api/uploads/signature', {
      method: 'POST',
      body: JSON.stringify({ folder }),
    });

    // 2. Preparar FormData para la API pública de Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signData.apiKey);
    formData.append('timestamp', String(signData.timestamp));
    formData.append('signature', signData.signature);
    formData.append('folder', signData.folder);

    // 3. Subir directamente al CDN de Cloudinary
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const uploadJson = await uploadRes.json();

    if (!uploadRes.ok) {
      throw new Error(uploadJson.error?.message || 'Error al subir la imagen a Cloudinary.');
    }

    return uploadJson.secure_url;
  },
};

// ==========================================
// 6. SERVICIOS DE PLANES DEL CLUB
// ==========================================
export const clubPlansApi = {
  getPublished: () => request('/api/club-plans'),
  getBySlugOrId: (slugOrId) => request(`/api/club-plans/${slugOrId}`),

  // Métodos administrativos
  getAllAdmin: () => request('/api/club-plans/admin/all'),
  update: (id, data) =>
    request(`/api/club-plans/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export default {
  auth: authApi,
  events: eventsApi,
  adventures: adventuresApi,
  products: productsApi,
  clubPlans: clubPlansApi,
  upload: uploadApi,
};


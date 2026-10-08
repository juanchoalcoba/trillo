import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga todas las variables de entorno sin importar el prefijo
  const env = loadEnv(mode, process.cwd(), '')

  const apiBaseUrl = env.VITE_API_BASE_URL || env.API_BASE_URL || process.env.API_BASE_URL || ''

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Permite que Vite exponga tanto variables VITE_ como API_
    envPrefix: ['VITE_', 'API_'],
    define: {
      'import.meta.env.API_BASE_URL': JSON.stringify(apiBaseUrl),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
          },
        },
      },
    },
  }
})

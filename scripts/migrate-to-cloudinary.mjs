import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');

// Cargar credenciales desde .env.local
dotenv.config({ path: path.join(frontendDir, '.env.local') });

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'pglfifpm';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '294358133435788';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'VYhyRkQv7sAnamZw-Bd4WNstvys';

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('❌ Error: Faltan credenciales de Cloudinary');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

console.log(' Conectado a Cloudinary:', CLOUDINARY_CLOUD_NAME);

// Inventario de archivos a migrar
const filesToMigrate = [
  // 1. Video Hero Principal
  {
    localPath: 'public/1003.mp4',
    folder: 'trillo/ui/videos',
    publicId: '1003',
    resourceType: 'video',
    description: 'Video Hero Principal',
  },
  // 2. Fondos Hero
  {
    localPath: 'public/clubfondook.jpg',
    folder: 'trillo/ui/hero-backgrounds',
    publicId: 'clubfondook',
    resourceType: 'image',
    description: 'Fondo Hero Club de Corredores',
  },
  {
    localPath: 'public/aventuras-optimized.jpg',
    folder: 'trillo/ui/hero-backgrounds',
    publicId: 'aventuras-hero',
    resourceType: 'image',
    description: 'Fondo Hero Trillo Aventuras',
  },
  {
    localPath: 'public/eventosbg.png',
    folder: 'trillo/ui/hero-backgrounds',
    publicId: 'eventos-hero',
    resourceType: 'image',
    description: 'Fondo Hero Trillo Eventos',
  },
  // 3. Eventos y Galería
  {
    localPath: 'public/eventosverti.jpg',
    folder: 'trillo/events',
    publicId: 'eventosverti',
    resourceType: 'image',
    description: 'Foto Desafío Rebollo',
  },
  {
    localPath: 'public/images/events/san_pedro_start.jpg',
    folder: 'trillo/events',
    publicId: 'san_pedro_start',
    resourceType: 'image',
    description: 'Largada San Pedro',
  },
  {
    localPath: 'public/images/events/san_pedro_night.jpg',
    folder: 'trillo/events',
    publicId: 'san_pedro_night',
    resourceType: 'image',
    description: 'Carrera Laberinto / Nocturna',
  },
  {
    localPath: 'public/images/events/san_pedro_finish.jpg',
    folder: 'trillo/events',
    publicId: 'san_pedro_finish',
    resourceType: 'image',
    description: 'Llegada San Pedro',
  },
  {
    localPath: 'public/images/events/san_pedro_community.jpg',
    folder: 'trillo/events',
    publicId: 'san_pedro_community',
    resourceType: 'image',
    description: 'Comunidad Trillo',
  },
  {
    localPath: 'public/images/events/san_pedro_kit.jpg',
    folder: 'trillo/events',
    publicId: 'san_pedro_kit',
    resourceType: 'image',
    description: 'Kit Oficial San Pedro',
  },
  // 4. Productos de Tienda
  {
    localPath: 'public/tienda/remera-sanpedro-front.png',
    folder: 'trillo/products',
    publicId: 'remera-sanpedro-front',
    resourceType: 'image',
    description: 'Remera San Pedro (Frente)',
  },
  {
    localPath: 'public/tienda/remera-sanpedro-back.png',
    folder: 'trillo/products',
    publicId: 'remera-sanpedro-back',
    resourceType: 'image',
    description: 'Remera San Pedro (Dorso)',
  },
  {
    localPath: 'public/remeras2.png',
    folder: 'trillo/products',
    publicId: 'remeras2-mockup',
    resourceType: 'image',
    description: 'Mockup Remera San Pedro',
  },
  {
    localPath: 'public/tienda/remera-cdc-magma-front.png',
    folder: 'trillo/products',
    publicId: 'remera-cdc-magma-front',
    resourceType: 'image',
    description: 'Remera CDC Magma (Frente)',
  },
  {
    localPath: 'public/tienda/remera-cdc-magma-back.png',
    folder: 'trillo/products',
    publicId: 'remera-cdc-magma-back',
    resourceType: 'image',
    description: 'Remera CDC Magma (Dorso)',
  },
  {
    localPath: 'public/remeras.png',
    folder: 'trillo/products',
    publicId: 'remeras-cdc-mockup',
    resourceType: 'image',
    description: 'Mockup Remeras CDC',
  },
  {
    localPath: 'public/tienda/remera-cdc-blue-front.png',
    folder: 'trillo/products',
    publicId: 'remera-cdc-blue-front',
    resourceType: 'image',
    description: 'Remera CDC Indigo Wave (Frente)',
  },
  {
    localPath: 'public/tienda/remera-cdc-blue-back.png',
    folder: 'trillo/products',
    publicId: 'remera-cdc-blue-back',
    resourceType: 'image',
    description: 'Remera CDC Indigo Wave (Dorso)',
  },
  {
    localPath: 'public/tienda/remera-oversize-front.png',
    folder: 'trillo/products',
    publicId: 'remera-oversize-front',
    resourceType: 'image',
    description: 'Remera Oversize (Frente)',
  },
  {
    localPath: 'public/tienda/remera-oversize-back.png',
    folder: 'trillo/products',
    publicId: 'remera-oversize-back',
    resourceType: 'image',
    description: 'Remera Oversize (Dorso)',
  },
  {
    localPath: 'public/remeras3.png',
    folder: 'trillo/products',
    publicId: 'remeras3-mockup',
    resourceType: 'image',
    description: 'Mockup Remera Oversize',
  },
  {
    localPath: 'public/tienda/campera-club.png',
    folder: 'trillo/products',
    publicId: 'campera-club',
    resourceType: 'image',
    description: 'Campera Club de Corredores',
  },
  {
    localPath: 'public/remeras4.png',
    folder: 'trillo/products',
    publicId: 'remeras4-mockup',
    resourceType: 'image',
    description: 'Mockup Campera Club',
  },
];

async function migrateAll() {
  console.log(` Iniciando migración de ${filesToMigrate.length} archivos a Cloudinary...\n`);
  const results = {};

  for (let i = 0; i < filesToMigrate.length; i++) {
    const item = filesToMigrate[i];
    const fullPath = path.join(frontendDir, item.localPath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Archivo local no encontrado: ${item.localPath}. Saltando...`);
      continue;
    }

    const stat = fs.statSync(fullPath);
    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`[${i + 1}/${filesToMigrate.length}] Subiendo ${item.description} (${sizeMB} MB)...`);

    try {
      const uploadOptions = {
        folder: item.folder,
        public_id: item.publicId,
        overwrite: true,
        resource_type: item.resourceType,
      };

      const res = await cloudinary.uploader.upload(fullPath, uploadOptions);
      console.log(`   ✅ Éxito: ${res.secure_url}`);

      results[item.publicId] = {
        publicId: res.public_id,
        secureUrl: res.secure_url,
        format: res.format,
        bytes: res.bytes,
        resourceType: item.resourceType,
        originalLocalPath: item.localPath,
      };
    } catch (err) {
      console.error(`   ❌ Error al subir ${item.localPath}:`, err.message);
      process.exit(1);
    }
  }

  // Guardar archivo de mapeo de URLs
  const outputDir = path.join(frontendDir, 'src', 'config');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'cloudinaryUrls.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n🎉 Migración completada con éxito.`);
  console.log(`📄 Mapeo de URLs guardado en: ${outputPath}`);
}

migrateAll();

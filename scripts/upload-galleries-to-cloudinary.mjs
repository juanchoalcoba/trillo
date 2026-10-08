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

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

console.log('🚀 Iniciando subida a Cloudinary...');
console.log('📌 Cloud Name:', CLOUDINARY_CLOUD_NAME);

const GALLERY_FOLDERS = [
  {
    categoryKey: 'aventuras',
    localDir: path.join(frontendDir, 'public', 'aventuras'),
    cloudinaryFolder: 'trillo/galeria/aventuras',
    namePrefix: 'Aventura Trillo',
  },
  {
    categoryKey: 'rebollo',
    localDir: path.join(frontendDir, 'public', 'eventosrebollo'),
    cloudinaryFolder: 'trillo/galeria/eventos/rebollo',
    namePrefix: 'Desafío Rebollo',
  },
  {
    categoryKey: 'laberinto',
    localDir: path.join(frontendDir, 'public', 'eventoslaberinto'),
    cloudinaryFolder: 'trillo/galeria/eventos/laberinto',
    namePrefix: 'Laberinto Cross Country',
  },
  {
    categoryKey: 'sanpedro',
    localDir: path.join(frontendDir, 'public', 'eventossanpedro'),
    cloudinaryFolder: 'trillo/galeria/eventos/sanpedro',
    namePrefix: 'San Pedro Nocturna',
  },
];

const VALID_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const results = {
  aventuras: [],
  rebollo: [],
  laberinto: [],
  sanpedro: [],
};

for (const group of GALLERY_FOLDERS) {
  if (!fs.existsSync(group.localDir)) {
    console.warn(`⚠️ Directorio no existe: ${group.localDir}`);
    continue;
  }

  const files = fs
    .readdirSync(group.localDir)
    .filter((f) => VALID_EXTS.includes(path.extname(f).toLowerCase()));

  console.log(`\n📁 Procesando ${group.categoryKey}: ${files.length} archivos válidos encontrados...`);

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const fullPath = path.join(group.localDir, fileName);
    const parsedName = path.parse(fileName).name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const publicId = `${group.cloudinaryFolder}/${parsedName}`;
    const localWebPath = `/${path.basename(group.localDir)}/${fileName}`;

    console.log(`  [${i + 1}/${files.length}] Subiendo ${fileName}...`);

    try {
      const uploadRes = await cloudinary.uploader.upload(fullPath, {
        public_id: publicId,
        overwrite: false, // Si ya existe no sobreescribir innecesariamente
        resource_type: fileName.toLowerCase().endsWith('.gif') ? 'image' : 'image',
      });

      const secureUrl = uploadRes.secure_url;
      // Generar transformaciones automáticas Cloudinary
      const thumbUrl = secureUrl.replace('/upload/', '/upload/f_auto,q_auto,w_800,c_limit/');
      const fullUrl = secureUrl.replace('/upload/', '/upload/f_auto,q_auto,w_1920,c_limit/');

      results[group.categoryKey].push({
        id: `${group.categoryKey}-${i + 1}`,
        title: `${group.namePrefix} #${i + 1}`,
        fileName,
        localPath: localWebPath,
        url: secureUrl,
        thumbnail: thumbUrl,
        full: fullUrl,
        publicId: uploadRes.public_id,
        format: uploadRes.format,
        width: uploadRes.width,
        height: uploadRes.height,
      });

      console.log(`     ✅ OK: ${uploadRes.public_id}`);
    } catch (err) {
      console.error(`     ❌ Error subiendo ${fileName}:`, err.message);
      // Fallback a ruta local
      results[group.categoryKey].push({
        id: `${group.categoryKey}-${i + 1}`,
        title: `${group.namePrefix} #${i + 1}`,
        fileName,
        localPath: localWebPath,
        url: localWebPath,
        thumbnail: localWebPath,
        full: localWebPath,
      });
    }
  }
}

// Guardar resultados en src/data/galeriasData.js
const outJsPath = path.join(frontendDir, 'src', 'data', 'galeriasData.js');
const jsContent = `// Archivo generado automáticamente con fotos reales y optimización Cloudinary
export const AVENTURAS_GALLERY = ${JSON.stringify(results.aventuras, null, 2)};

export const EVENTOS_GALLERIES = {
  rebollo: ${JSON.stringify(results.rebollo, null, 2)},
  laberinto: ${JSON.stringify(results.laberinto, null, 2)},
  sanpedro: ${JSON.stringify(results.sanpedro, null, 2)},
};

export default {
  AVENTURAS_GALLERY,
  EVENTOS_GALLERIES,
};
`;

fs.writeFileSync(outJsPath, jsContent, 'utf-8');
console.log(`\n🎉 ¡Finalizado con éxito! Datos guardados en ${outJsPath}`);

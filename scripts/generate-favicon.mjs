import sharp from 'sharp';
import fs from 'fs';

async function generateFavicons() {
  const size = 512;
  const trimmedLogo = await sharp('public/logoTrillo.png').trim().toBuffer();

  // Refined: Clean dark background with subtle Trillo orange border (#e87a38)
  const logoWidth = 450;
  const logoResized = await sharp(trimmedLogo)
    .resize({ width: logoWidth, fit: 'inside' })
    .toBuffer();

  const logoMeta = await sharp(logoResized).metadata();
  const top = Math.round((size - logoMeta.height) / 2) - 4;
  const left = Math.round((size - logoMeta.width) / 2) + 8;

  const bgSvg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${size}" height="${size}" rx="104" fill="#08090a" />
      <rect x="12" y="12" width="${size - 24}" height="${size - 24}" rx="92" fill="none" stroke="#e87a38" stroke-width="14" opacity="0.95" />
    </svg>
  `;

  const canvas512 = await sharp(Buffer.from(bgSvg))
    .composite([{ input: logoResized, top, left }])
    .png()
    .toBuffer();


  // Save 512x512 (PWA / Android)
  await sharp(canvas512).toFile('public/favicon-512.png');

  // Save 192x192
  await sharp(canvas512).resize(192, 192).toFile('public/favicon-192.png');

  // Save apple-touch-icon (180x180)
  await sharp(canvas512).resize(180, 180).toFile('public/apple-touch-icon.png');

  // Save favicon-32.png and favicon.png (64x64 or 32x32)
  await sharp(canvas512).resize(64, 64).toFile('public/favicon.png');
  await sharp(canvas512).resize(32, 32).toFile('public/favicon-32.png');

  // Generate SVG favicon with embedded base64 PNG or clean vector
  const base64Png = canvas512.toString('base64');
  const svgFavicon = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,${base64Png}" width="64" height="64" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgFavicon);

  // Also generate favicon.ico (using 32x32 PNG)
  await sharp(canvas512).resize(32, 32).toFile('public/favicon.ico');

  console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error);

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public';
const svgFile = path.join(publicDir, 'icon.svg');

const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 192, name: 'pwa-maskable-192x192.png' },
  { size: 512, name: 'pwa-maskable-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

async function generateIcons() {
  try {
    console.log('Reading SVG file...');
    const svgBuffer = await fs.readFile(svgFile);

    for (const { size, name } of sizes) {
      const outputPath = path.join(publicDir, name);
      console.log(`Generating ${name} (${size}x${size})...`);
      
      await sharp(svgBuffer, { density: 384 })
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .png()
        .toFile(outputPath);
    }

    console.log('✓ All icons generated successfully!');
    console.log('\nGenerated files:');
    sizes.forEach(({ name }) => console.log(`  - ${name}`));
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();

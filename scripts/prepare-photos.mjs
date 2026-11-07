import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve('public/photos');
const files = (await readdir(directory)).filter(name => /^\d+\.jpg$/.test(name)).sort();
const dimensions = {};
for (const file of files) {
  const source = path.join(directory, file);
  const key = file.replace('.jpg', '');
  const meta = await sharp(source).metadata();
  dimensions[Number(key)] = { width: meta.width, height: meta.height };
  for (const width of [480, 960]) {
    await sharp(source).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 }).toFile(path.join(directory, `${key}-${width}.webp`));
  }
}
await mkdir('src/data', { recursive: true });
await writeFile('src/data/photo-dimensions.json', JSON.stringify(dimensions, null, 2));
await mkdir('public/art', { recursive: true });
await sharp('assets/heart-petals.png').resize(720).webp({ quality: 85 }).toFile('public/art/heart-petals.webp');
console.log(`${files.length} fotos preparadas em 2 tamanhos. Originais preservados.`);

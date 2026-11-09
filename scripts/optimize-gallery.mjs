import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDirectory = path.join(root, "public", "assets", "photos", "gallery-photos");
const outputDirectory = path.join(root, "public", "assets", "photos", "gallery-optimized");
const supportedExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const entries = await readdir(sourceDirectory, { withFileTypes: true });
const photos = entries.filter((entry) =>
  entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()),
);

for (const photo of photos) {
  const sourcePath = path.join(sourceDirectory, photo.name);
  const baseName = path.basename(photo.name, path.extname(photo.name));
  const outputPath = path.join(outputDirectory, `${baseName}.webp`);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);
}

console.log(`Optimized ${photos.length} gallery photos into ${path.relative(root, outputDirectory)}.`);

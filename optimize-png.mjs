// Second pass — palette quantization for photo-PNGs (pngquant-style).
// Keeps .png filename (no code changes). Quality 90 = visually indistinguishable.
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import path from "path";

const DIR = "public/assets";
const MAX = 2048;
const THRESHOLD = 800 * 1024; // only touch PNGs bigger than 800 KB

let before = 0, after = 0, count = 0;
const files = await readdir(DIR);

for (const file of files) {
  if (path.extname(file).toLowerCase() !== ".png") continue;
  const full = path.join(DIR, file);
  const orig = await stat(full);
  if (orig.size < THRESHOLD) continue;

  const tmp = full + ".q-tmp";
  try {
    await sharp(full)
      .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
      .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
      .toFile(tmp);
  } catch (e) {
    console.log(`⚠  skip ${file} (${e.message})`);
    continue;
  }

  const opt = await stat(tmp);
  if (opt.size < orig.size) {
    await rename(tmp, full);
    before += orig.size; after += opt.size; count++;
    console.log(`${file.padEnd(20)} ${(orig.size/1024).toFixed(0).padStart(6)} KB → ${(opt.size/1024).toFixed(0).padStart(6)} KB`);
  } else {
    await unlink(tmp);
  }
}
console.log(`\nQuantized ${count} PNGs:  ${(before/1048576).toFixed(1)} MB → ${(after/1048576).toFixed(1)} MB`);

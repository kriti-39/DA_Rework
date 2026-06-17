// One-time image optimizer — resize to max 2048px + high-quality re-encode.
// Visually lossless: the resize only removes pixels no screen ever displays.
// Originals are safe in git; run `git checkout -- public/assets` to restore.
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import path from "path";

const DIR    = "public/assets";
const MAX    = 2048;   // cap longest side — larger than any display, even retina
const JPEG_Q = 88;     // visually lossless for photos
const EXTS   = new Set([".jpg", ".jpeg", ".png"]);

let before = 0, after = 0, count = 0, skipped = 0;

const files = await readdir(DIR);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;

  const full = path.join(DIR, file);
  const orig = await stat(full);
  const tmp  = full + ".opt-tmp";

  let pipe = sharp(full)
    .rotate() // honour EXIF orientation from phone cameras
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true });

  pipe = ext === ".png"
    ? pipe.png({ compressionLevel: 9, palette: false }) // lossless
    : pipe.jpeg({ quality: JPEG_Q, mozjpeg: true });

  try {
    await pipe.toFile(tmp);
  } catch (e) {
    console.log(`⚠  skip ${file} (${e.message})`);
    continue;
  }

  const opt = await stat(tmp);

  // Only replace if the new file is actually smaller
  if (opt.size < orig.size) {
    await rename(tmp, full);
    before += orig.size;
    after  += opt.size;
    count++;
    console.log(
      `${file.padEnd(22)} ${(orig.size / 1024).toFixed(0).padStart(6)} KB → ${(opt.size / 1024).toFixed(0).padStart(6)} KB`
    );
  } else {
    await unlink(tmp);
    before += orig.size;
    after  += orig.size;
    skipped++;
  }
}

console.log("\n────────────────────────────────────────");
console.log(`Optimized: ${count}   Already small (kept): ${skipped}`);
console.log(`TOTAL: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`);
console.log(`Saved:  ${((1 - after / before) * 100).toFixed(0)}%`);

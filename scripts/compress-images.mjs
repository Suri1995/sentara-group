import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = "public";
const BACKUP = path.resolve("..", "sentara-originals"); // D:\sentara-originals, outside the repo
const LIMIT = 2 * 1024 * 1024; // only touch files bigger than 2 MB
const MAX_WIDTH = 2400;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const targets = walk(ROOT).filter(
  (f) => /\.(png|jpe?g)$/i.test(f) && fs.statSync(f).size > LIMIT
);

if (!targets.length) console.log("Nothing to compress.");

for (const file of targets) {
  const before = fs.statSync(file).size;
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");

  await sharp(file, { limitInputPixels: false })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);

  // copy the original to the backup folder, then remove it from the project
  const backupPath = path.join(BACKUP, path.relative(ROOT, file));
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.copyFileSync(file, backupPath);
  fs.unlinkSync(file);

  const after = fs.statSync(out).size;
  console.log(
    `${file.replaceAll("\\", "/")}  ->  ${out.replaceAll("\\", "/")}  (${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(2)} MB)`
  );
}

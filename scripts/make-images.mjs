// Optimises client photos from img-src/ into public/img (AVIF + WebP, responsive widths). Run: node scripts/make-images.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
mkdirSync("public/img", { recursive: true });
// name, source, crop {left,top,width,height} in source pixels, output widths
const jobs = [
  ["hero-wide", "hero-h.webp", { left: 0, top: 0, width: 1536, height: 668 }, [768, 1152, 1536]],
  ["hero-narrow", "hero-h.webp", { left: 0, top: 110, width: 1100, height: 564 }, [480, 780, 1100]],
  ["stay", "gal-1-5.webp", { left: 0, top: 0, width: 768, height: 960 }, [480, 768]],
  ["place-air", "hero-v.webp", { left: 0, top: 560, width: 1024, height: 768 }, [640, 1024]],
  ["place-room", "room-light.webp", { left: 0, top: 0, width: 768, height: 960 }, [480, 768]],
  ["program", "gal-4.webp", { left: 0, top: 200, width: 768, height: 576 }, [480, 768]],
];
for (const [name, src, crop, widths] of jobs) {
  for (const w of widths) {
    const base = sharp(`img-src/${src}`).extract(crop).resize({ width: w });
    await base.clone().avif({ quality: 48, effort: 6 }).toFile(`public/img/${name}-${w}.avif`);
    await base.clone().webp({ quality: 74 }).toFile(`public/img/${name}-${w}.webp`);
  }
}
const l = await sharp("img-src/logo.svg").metadata();
console.log("logo", l.width, l.height);

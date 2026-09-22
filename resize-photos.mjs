/* Resize every photo in public/photos to a web-friendly size (sharp + light).
   Run after adding/replacing photos:   npm run photos
*/
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const dir = 'public/photos'
const MAX = 1200          // longest side in px — đủ nét cho mọi màn hình kể cả retina 3x
const QUALITY = 92        // cao hơn → nét hơn, ít artifact hơn

const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f))
if (files.length === 0) {
  console.log('No images found in', dir)
  process.exit(0)
}

for (const f of files) {
  const p = path.join(dir, f)
  const before = fs.statSync(p).size
  // already small enough? skip to avoid re-compressing
  if (before < 400 * 1024) {
    console.log(`${f}: ${(before / 1024).toFixed(0)}KB (đã nhẹ, bỏ qua)`)
    continue
  }
  const input = fs.readFileSync(p)
  const out = await sharp(input)
    .rotate()
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: false, chromaSubsampling: '4:4:4' })
    .toBuffer()
  // write as .jpg (and remove a .png original if we converted it)
  const target = p.replace(/\.png$/i, '.jpg')
  fs.writeFileSync(target, out)
  if (target !== p) fs.unlinkSync(p)
  console.log(`${f}: ${(before / 1048576).toFixed(1)}MB -> ${(out.length / 1024).toFixed(0)}KB`)
}
console.log('Done. Tải lại trang (Ctrl+Shift+R).')

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import AnimatedText from './AnimatedText'
import Reveal from './Reveal'

/* Ported from the original "Hoa Mộc Xanh" (boho-floral-green) gallery + lightbox carousel.
   Drop album photos into  public/photos/  as album-1.jpg … album-8.jpg
   (missing ones show a coloured placeholder). Change ALBUM_COUNT to add more. */

const PRIMARY = '#30530F'
const titleStyle = {
  color: PRIMARY,
  fontFamily: '"Times New Roman", serif',
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '1px',
}

const ALBUM_COUNT = 15
const GRADS = [
  'linear-gradient(135deg, #c8e6c0, #8dc47a)',
  'linear-gradient(135deg, #e8d5f0, #c8a8e0)',
  'linear-gradient(135deg, #f5e6d0, #e8c5a0)',
  'linear-gradient(135deg, #d0e8f5, #90c0e0)',
  'linear-gradient(135deg, #d8ead0, #a8c890)',
  'linear-gradient(135deg, #f0e0d8, #d8b8a0)',
  'linear-gradient(135deg, #e0e8d0, #b8c890)',
  'linear-gradient(135deg, #d8e0f0, #a8b8d8)',
]
const photos = Array.from({ length: ALBUM_COUNT }, (_, i) => ({
  id: i + 1,
  src: `/photos/album-${i + 1}.jpg`,
  gradient: GRADS[i % GRADS.length],
}))
const hideOnError = (e) => { e.currentTarget.style.display = 'none' }

export default function Gallery() {
  const [idx, setIdx] = useState(null)
  const open = idx !== null

  const prev = useCallback(() => setIdx((i) => (i - 1 + ALBUM_COUNT) % ALBUM_COUNT), [])
  const next = useCallback(() => setIdx((i) => (i + 1) % ALBUM_COUNT), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIdx(null)
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, prev, next])

  return (
    <section
      id="anh-cuoi"
      className="relative flex flex-col items-center px-6 md:px-10 pt-10 md:pt-14 pb-10 md:pb-12 overflow-visible z-10"
    >
      <Reveal as="h2" className="uppercase font-bold text-center" style={titleStyle}>
        <AnimatedText text="Album Ảnh Cưới" charDelay={45} from="sides" />
      </Reveal>

      <div className="mt-6 w-full px-2 max-w-[340px] sm:max-w-[390px] md:max-w-[560px] relative z-10">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          {photos.slice(0, 4).map((p, i) => (
            <Reveal
              key={p.id}
              variant={i % 2 === 0 ? 'left' : 'right'}
              delay={`${i * 80}ms`}
              onClick={() => setIdx(i)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-md border"
              style={{ borderColor: '#30530F30', background: p.gradient }}
            >
              <img src={p.src} alt="" onError={hideOnError} className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
              {i === 3 && ALBUM_COUNT > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-white text-3xl font-medium">
                  +{ALBUM_COUNT - 4}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox carousel — portalled to <body> so it covers the whole page */}
      {open && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/90" onClick={() => setIdx(null)}>
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-white text-sm md:text-base">
            <span>{idx + 1} / {ALBUM_COUNT}</span>
            <button aria-label="Đóng" className="text-2xl md:text-3xl leading-none hover:opacity-70" onClick={() => setIdx(null)}>✕</button>
          </div>

          {/* main image — clicking the dark area around the photo closes the lightbox */}
          <div className="relative flex flex-1 items-center justify-center px-12 md:px-20 min-h-0">
            <button aria-label="Trước" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 md:left-6 text-white text-4xl md:text-5xl px-2 hover:opacity-70 z-10">‹</button>
            <img src={photos[idx].src} alt="" onError={hideOnError} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full rounded-xl object-contain shadow-2xl" />
            <button aria-label="Sau" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 md:right-6 text-white text-4xl md:text-5xl px-2 hover:opacity-70 z-10">›</button>
          </div>

          {/* thumbnails */}
          <div className="flex gap-2 md:gap-3 justify-start md:justify-center overflow-x-auto px-4 py-4" onClick={(e) => e.stopPropagation()}>
            {photos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setIdx(i)}
                ref={(el) => { if (el && i === idx) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }}
                className={`shrink-0 h-12 w-12 md:h-16 md:w-16 rounded-md overflow-hidden transition ${i === idx ? 'ring-2 ring-white scale-105' : 'opacity-60 hover:opacity-100'}`}
                style={{ background: p.gradient }}
              >
                <img src={p.src} alt="" onError={hideOnError} className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

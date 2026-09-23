import { useEffect, useState } from 'react'
import flowerImg from '../assets/flower.webp'
import './RedEnvelope.css'

/* Ported from the original "Hoa Mộc Xanh" (boho-floral-green) gift/bank section (m.p5):
   red envelope with floating coins → opens a modal with two VietQR codes. */

const PRIMARY = '#30530F'
const SERIF = '"Baskerville", "Times New Roman", serif'

const titleStyle = {
  color: PRIMARY,
  fontFamily: '"Times New Roman", serif',
  fontSize: '20px',
  fontWeight: 700,
  letterSpacing: '1px',
}

const accounts = [
  // { label: 'Chú Rể - Hà Việt Dũng  ',        qr: '/photos/qr-groom.jpg', bank: 'VPBank', number: '0941735992',   name: 'TRAN DUC LINH' },
  // { label: 'Cô Dâu - Bùi Như Thuận ',  qr: '/photos/qr-bride.jpg', bank: 'MB Bank', number: '9389826551', name: 'BUI NHU LUAN' },
  { label: 'Mẹ Chú Rể - Hà Việt Dũng  ',        qr: '/photos/qr-grooms mother.jpg', bank: 'VietTinBank', number: '101000260338',   name: 'PHAN THI THANH TAM' },
 ]

/* Greek-key (fret) gold corner bracket */
function CornerBracket({ className, flipX, flipY }) {
  return (
    <svg className={`absolute w-6 h-6 ${className}`} viewBox="0 0 28 28" fill="none"
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}>
      <path d="M3 16 V3 H16" stroke="#fbbf24" strokeWidth="2.4" strokeLinecap="square" />
      <path d="M8 16 V8 H16" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="square" opacity="0.85" />
    </svg>
  )
}

/* Gold cash coin — `idx` drives its float timing (CSS), position/size via props */
function Coin({ idx, size, pos }) {
  const hole = size * 0.3
  return (
    <span className={`env-coin env-coin-${idx} absolute`} style={{ ...pos, width: size, height: size, zIndex: 5 }}>
      <span className="block w-full h-full rounded-full" style={{
        position: 'relative',
        background: 'radial-gradient(circle at 36% 30%, #fff3c8 0%, #f3d271 38%, #e0b24a 76%, #c2922f 100%)',
        boxShadow: 'inset 0 1px 2px rgba(255,248,210,.9), inset 0 -3px 6px rgba(150,100,20,.5), 0 3px 6px rgba(0,0,0,.28)',
      }}>
        <span style={{ position: 'absolute', inset: size * 0.12, borderRadius: '50%', border: '1px solid rgba(150,100,20,.4)' }} />
        <span style={{
          position: 'absolute', left: '50%', top: '50%', width: hole, height: hole,
          transform: 'translate(-50%,-50%)',
          background: 'linear-gradient(135deg, #c2922f, #9a6f1f)',
          boxShadow: 'inset 0 1px 2px rgba(80,50,5,.85)', borderRadius: 1.5,
        }} />
        <span style={{ position: 'absolute', left: '24%', top: '18%', width: size * 0.24, height: size * 0.15, background: 'rgba(255,255,255,.75)', borderRadius: '50%', filter: 'blur(1px)' }} />
      </span>
    </span>
  )
}

/* Coins use % so they scale with the envelope wrapper and never overflow on mobile */
const COINS = [
  { idx: 1, size: 28, pos: { top: '-6%',  right: '-10%' } },
  { idx: 2, size: 24, pos: { top: '14%',  left:  '-12%' } },
  { idx: 3, size: 26, pos: { bottom: '14%', right: '-11%' } },
  { idx: 4, size: 22, pos: { bottom: '2%', left:  '-10%' } },
  { idx: 5, size: 20, pos: { top: '46%',  right: '-14%' } },
]

export default function RedEnvelope({ open, setOpen }) {
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <section id="mung-cuoi" className="relative z-10 flex flex-col items-center text-center pt-8 md:pt-12 pb-10 md:pb-14 px-6">
      <h2 className="uppercase" style={titleStyle}>Phong Bao Mừng Cưới</h2>

      {/* Envelope + floating coins (hover → coins fly up & spin) */}
      <div className="env-group relative my-8" style={{ width: 'min(150px, 42vw)', height: 'min(210px, 58vw)' }}>
        {/* soft gold glow behind */}
        <span className="absolute -inset-10 -z-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,206,92,.5), rgba(255,206,92,0) 70%)' }} />

        {COINS.map((c) => <Coin key={c.idx} {...c} />)}

        <button
          onClick={() => setOpen(true)}
          aria-label="Mở phong bao mừng cưới"
          className="env-shake env-glow relative w-full h-full rounded-xl cursor-pointer"
          style={{
            background: 'linear-gradient(160deg, #d3262b 0%, #b91c1c 60%, #9a1418 100%)',
            border: '2px solid #fbbf24',
            zIndex: 20,
          }}
        >
          <span className="absolute inset-[9px] rounded-lg" style={{ border: '1px solid rgba(251,191,36,.55)' }} />
          <CornerBracket className="left-2 top-2" />
          <CornerBracket className="right-2 top-2" flipX />
          <CornerBracket className="left-2 bottom-2" flipY />
          <CornerBracket className="right-2 bottom-2" flipX flipY />
          {/* center seal 囍 with cream ring */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
            style={{ width: 72, height: 72, background: '#fff7e6', boxShadow: '0 2px 10px rgba(0,0,0,.2)' }}>
            <span className="flex items-center justify-center rounded-full" style={{ width: 58, height: 58, background: 'radial-gradient(circle at 38% 32%, #ffe9a8, #e6b94e)', boxShadow: 'inset 0 0 0 2px rgba(180,130,30,.5)' }}>
              <span style={{ color: '#b91c1c', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>囍</span>
            </span>
          </span>
        </button>
      </div>

      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: PRIMARY }}>Nhấn để mở</p>

      <p className="mt-6 italic text-sm md:text-base max-w-[460px]" style={{ color: PRIMARY, fontFamily: SERIF }}>
        Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
      </p>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="relative z-[10000] w-full max-w-[640px] overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: PRIMARY }}>
              <h3 className="text-lg md:text-xl text-white" style={{ fontFamily: SERIF }}>Phong Bao Mừng Cưới</h3>
              <button onClick={() => setOpen(false)} aria-label="Đóng" className="text-white text-2xl leading-none hover:opacity-70">✕</button>
            </div>

            <div className="flex justify-center gap-2 md:gap-4 p-3 md:p-6" style={{ color: PRIMARY, fontFamily: SERIF }}>
              {accounts.map((a) => (
                <div key={a.number} className="flex w-full max-w-[360px] flex-col items-center text-center">
                  <p className="text-xs md:text-base font-medium mb-2">{a.label}</p>
                  <div className="rounded-xl bg-white p-2 md:p-3 shadow-sm" style={{ border: `2px solid ${PRIMARY}20`, width: 'min(200px, 55vw)', height: 'min(200px, 55vw)' }}>
                    <img src={a.qr} alt={`QR ${a.bank}`} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <p className="mt-3 text-sm">{a.bank}</p>
                  <p className="text-sm font-mono">{a.number}</p>
                  <p className="text-sm font-semibold">{a.name}</p>
                  <a
                    href={a.qr}
                    download={`QR-${a.bank}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs hover:opacity-70"
                    style={{ borderColor: `${PRIMARY}66`, color: PRIMARY }}
                  >
                    ⤓ Lưu QR
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* faint jasmine, top-right of the section */}
      <img src={flowerImg} alt="" className="sec-flower fbg-env" />
    </section>
  )
}

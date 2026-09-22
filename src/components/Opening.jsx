import { useState, useMemo } from 'react'
import flowerImg from '../assets/flower.webp'
import AnimatedText from './AnimatedText'
import './Opening.css'

/* Generate burst particles (petals, leaves, flowers) flying outward */
function makeBurst() {
  const particles = []
  const total = 38
  for (let i = 0; i < total; i++) {
    // Spread evenly in a circle with some randomness
    const baseAngle = (i / total) * Math.PI * 2
    const angle = baseAngle + (Math.random() - 0.5) * 0.6
    const dist = 260 + Math.random() * 420 // travel distance in px
    const tx = Math.cos(angle) * dist
    const ty = Math.sin(angle) * dist - 60 // bias slightly upward
    const r = Math.random()
    const type = r < 0.5 ? 'petal' : r < 0.78 ? 'leaf' : 'flower'
    particles.push({
      id: i,
      type,
      tx: `${tx}px`,
      ty: `${ty}px`,
      rot: `${(Math.random() - 0.5) * 720}deg`,
      scale: 1.1 + Math.random() * 1.8,
      delay: `${Math.random() * 0.12}s`,
      dur: `${1.0 + Math.random() * 0.6}s`,
      size: type === 'flower' ? 70 + Math.random() * 60 : 18 + Math.random() * 18,
    })
  }
  return particles
}

export default function Opening({ onOpen }) {
  const [closing, setClosing] = useState(false)
  const [bursting, setBursting] = useState(false)
  const [ripples, setRipples] = useState([])
  const burst = useMemo(() => makeBurst(), [])

  function handleOpen(e) {
    if (bursting) return
    // Ripple at click point
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples(r => [...r, { id, x, y }])

    // Trigger flower burst
    setBursting(true)
    // Card scales up & fades shortly after burst starts
    setTimeout(() => setClosing(true), 450)
    // Finish
    setTimeout(onOpen, 1700)
  }

  const leaves = Array.from({ length: 10 }, () => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${8 + Math.random() * 7}s`,
    width: `${5 + Math.random() * 8}px`,
    height: `${9 + Math.random() * 11}px`,
    background: Math.random() > 0.5
      ? 'linear-gradient(135deg, rgba(120,180,80,0.6), rgba(70,120,40,0.4))'
      : 'linear-gradient(135deg, rgba(90,140,55,0.5), rgba(50,95,25,0.35))',
    opacity: 0.4 + Math.random() * 0.35,
  }))

  return (
    <div className={`opening${closing ? ' opening--closing' : ''}`}>
      <div className="opening-leaves-bg">
        {leaves.map((s, i) => (
          <div key={i} className="opening-leaf" style={s} />
        ))}
      </div>

      <div className={`opening-card${bursting ? ' opening-card--burst' : ''}`}>
        {/* Real watercolor flower images in corners */}
        <img src={flowerImg} alt="" className="opening-flower opening-flower--tl" />
        <img src={flowerImg} alt="" className="opening-flower opening-flower--br" />

        {/* Text content */}
        <div className="opening-content">
          <div className="opening-heart-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>

          <p className="opening-groom">
            <AnimatedText text="Việt Dũng " delay={200} charDelay={90} from="grand" />
          </p>
          <span className="opening-amp">
            <AnimatedText text="&" delay={950} charDelay={0} from="grand" />
          </span>
          <p className="opening-bride">
            <AnimatedText text="Như Thuận " delay={1150} charDelay={90} from="grand" />
          </p>

          <div className="opening-divider">
            <span className="opening-divider-line" />
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M12 3C9 3 6 5.5 6 9c0 5 6 10 6 10s6-5 6-10c0-3.5-3-6-6-6z" fill="#9CC484" opacity="0.85"/>
            </svg>
            <span className="opening-divider-line" />
          </div>

          <p className="opening-date-text">
            <AnimatedText text="25 tháng 10, 2026" delay={2050} charDelay={40} />
          </p>
          <p className="opening-than-moi">
            <AnimatedText text="Thân Mời" delay={2550} charDelay={70} />
          </p>

          <button className="opening-btn" onClick={handleOpen}>
            {ripples.map(r => (
              <span key={r.id} className="opening-btn-ripple" style={{ left: r.x, top: r.y }} />
            ))}
            <span>Mở thiệp</span>
          </button>
        </div>
      </div>

      {/* ── Flower burst overlay ── */}
      {bursting && (
        <div className="burst">
          {/* Big blooming central flower */}
          <img src={flowerImg} alt="" className="burst-bloom" />
          {/* Scattered particles */}
          {burst.map(p => (
            <span
              key={p.id}
              className={`burst-particle burst-${p.type}`}
              style={{
                '--tx': p.tx,
                '--ty': p.ty,
                '--rot': p.rot,
                '--scale': p.scale,
                animationDelay: p.delay,
                animationDuration: p.dur,
                width: `${p.size}px`,
                height: p.type === 'flower' ? 'auto' : `${p.size * 1.35}px`,
              }}
            >
              {p.type === 'flower' && <img src={flowerImg} alt="" />}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

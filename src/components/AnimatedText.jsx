import { useEffect, useRef, useState } from 'react'
import './AnimatedText.css'

/* Split-char animated text: each character flies in one by one.
   Props:
     text      – string to animate
     className – extra class on wrapper
     style     – inline style on wrapper
     delay     – base delay before first char (ms), default 0
     charDelay – delay between each char (ms), default 60
     from      – entry direction: 'up' (default) | 'sides'
                 'sides' = characters glide in alternately from left & right
     as        – wrapper tag, default "span"
*/
export default function AnimatedText({
  text = '',
  className = '',
  style,
  delay = 0,
  charDelay = 60,
  from = 'up',
  as: Tag = 'span',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const chars = Array.from(text)   // handles multi-byte (e.g. Vietnamese)

  return (
    <Tag ref={ref} className={`anim-text anim-text--${from} ${className}`} style={style} aria-label={text}>
      {chars.map((ch, i) => {
        // For 'sides' mode, alternate the incoming direction per character
        const dirClass =
          from === 'sides' ? (i % 2 === 0 ? 'anim-char--from-left' : 'anim-char--from-right') : ''
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`anim-char ${dirClass} ${visible ? 'anim-char--in' : ''} ${ch === ' ' ? 'anim-space' : ''}`}
            style={{ animationDelay: `${delay + i * charDelay}ms` }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        )
      })}
    </Tag>
  )
}

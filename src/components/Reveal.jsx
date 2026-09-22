import { useEffect, useRef } from 'react'
import './Reveal.css'

/* Universal scroll-reveal wrapper.
   variant: 'up' | 'scale' | 'left' | 'right'  (default: 'up')
   delay:   ms string, e.g. '200ms'
   as:      tag name, default 'div'
*/
export default function Reveal({ children, variant = 'up', delay = '0ms', as: Tag = 'div', className = '', style, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('rv--in'); obs.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`rv rv--${variant} ${className}`} style={{ ...style, animationDelay: delay }} {...rest}>
      {children}
    </Tag>
  )
}

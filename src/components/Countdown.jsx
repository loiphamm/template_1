import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Countdown.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft(target) {
  const now = new Date().getTime()
  const diff = new Date(target).getTime() - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    passed: false,
  }
}

function CountBox({ value, label }) {
  return (
    <div className="cdown-box">
      <div className="cdown-value">{pad(value)}</div>
      <div className="cdown-label">{label}</div>
    </div>
  )
}

export default function Countdown({ weddingDate }) {
  const [time, setTime] = useState(() => getTimeLeft(weddingDate))
  const ref = useScrollReveal()

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(weddingDate)), 1000)
    return () => clearInterval(id)
  }, [weddingDate])

  return (
    <section className="cdown" id="countdown">
      <div className="cdown-deco-top" />
      <div className="container">
        <div className="cdown-inner reveal" ref={ref}>
          <p className="cdown-pre">Còn lại</p>
          <h2 className="cdown-title">Đếm Ngược Đến Ngày Cưới</h2>
          <div className="cdown-divider">
            <span /><span className="cdown-star">✦</span><span />
          </div>
          {time.passed ? (
            <p className="cdown-passed">Hôm nay là ngày hạnh phúc của chúng tôi! 🎉</p>
          ) : (
            <div className="cdown-boxes">
              <CountBox value={time.days} label="Ngày" />
              <div className="cdown-sep">:</div>
              <CountBox value={time.hours} label="Giờ" />
              <div className="cdown-sep">:</div>
              <CountBox value={time.minutes} label="Phút" />
              <div className="cdown-sep">:</div>
              <CountBox value={time.seconds} label="Giây" />
            </div>
          )}
          <p className="cdown-date-display">09 · 07 · 2026</p>
        </div>
      </div>
      <div className="cdown-deco-bottom" />
    </section>
  )
}

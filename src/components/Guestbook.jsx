import { useState, useEffect } from 'react'
import flowerImg from '../assets/flower.webp'
import { SHEET_API_URL } from '../config.js'

/* Lời chúc lưu vào Google Sheet qua Apps Script (nếu đã điền SHEET_API_URL trong src/config.js).
   Fallback về localStorage khi chưa cấu hình hoặc mất mạng. */

const PRIMARY = '#30530F'
const SERIF   = '"Baskerville", "Times New Roman", serif'
const titleStyle = {
  color: PRIMARY, fontFamily: '"Times New Roman", serif',
  fontSize: '24px', fontWeight: 700, letterSpacing: '1px',
}
const LS_KEY  = 'wedding_messages'

function nowStr() {
  const d = new Date(), p = n => String(n).padStart(2, '0')
  return `${p(d.getDate())}.${p(d.getMonth()+1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
}

const useSheet = () => SHEET_API_URL && SHEET_API_URL.startsWith('https://')

// ── Đọc lời chúc ─────────────────────────────────────────────
async function fetchMessages() {
  if (useSheet()) {
    const r = await fetch(SHEET_API_URL)
    return await r.json()
  }
  // localStorage fallback
  const saved = localStorage.getItem(LS_KEY)
  if (saved) return JSON.parse(saved)
  const r = await fetch('/guestbook.json')
  const data = await r.json()
  localStorage.setItem(LS_KEY, JSON.stringify(data))
  return data
}

// ── Gửi lời chúc ─────────────────────────────────────────────
async function postMessage(msg) {
  if (useSheet()) {
    await fetch(SHEET_API_URL, {
      method: 'POST',
      body: JSON.stringify(msg),
    })
    return
  }
  // localStorage fallback
  const saved = localStorage.getItem(LS_KEY)
  const list  = saved ? JSON.parse(saved) : []
  const updated = [msg, ...list]
  localStorage.setItem(LS_KEY, JSON.stringify(updated))
}

export default function Guestbook() {
  const [name, setName]         = useState('')
  const [text, setText]         = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(true)
  const [sending, setSending]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    fetchMessages()
      .then(setMessages)
      .catch(() => setMessages([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setSending(true); setError('')
    const msg = { id: Date.now(), name: name.trim(), text: text.trim(), time: nowStr() }
    try {
      await postMessage(msg)
      setMessages(prev => [msg, ...prev])
      setName(''); setText('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3500)
    } catch {
      setError('Gửi thất bại, vui lòng thử lại.')
    } finally {
      setSending(false)
    }
  }

  const inputStyle = { borderColor: PRIMARY, color: PRIMARY, backgroundColor: '#30530F0a', fontFamily: SERIF }

  return (
    <section id="so-luu-but" className="relative px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10 z-10" style={{ color: PRIMARY, fontFamily: SERIF }}>
      <img src={flowerImg} alt="" className="sec-flower fbg-gb" />

      <div className="text-center">
        <h2 className="uppercase" style={titleStyle}>Sổ Lưu Bút</h2>
        <p className="mt-2 italic text-sm md:text-base" style={{ color: PRIMARY }}>Gửi lời chúc mừng tới cô dâu &amp; chú rể</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
        <div className="rounded-lg border p-6 shadow-sm" style={{ borderColor: '#30530F40', backgroundColor: '#30530F08' }}>
          <div className="mb-4">
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Nhập tên của bạn*"
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
              style={inputStyle} required
            />
          </div>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder="Nhập lời chúc của bạn*"
            rows={4}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
            style={{ ...inputStyle, resize: 'none' }} required
          />
          <div className="mt-4 flex items-center justify-end gap-3 flex-wrap">
            {success && <span className="text-sm" style={{ color: PRIMARY }}>✓ Đã gửi lời chúc!</span>}
            {error   && <span className="text-sm text-red-500">{error}</span>}
            <button
              type="submit" disabled={sending}
              className="rounded-[10px] px-6 py-2 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 disabled:opacity-60"
              style={{ backgroundColor: PRIMARY }}
            >
              {sending ? 'Đang gửi…' : 'Gửi lời chúc'}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 w-full space-y-3 mx-auto max-w-full md:max-w-[600px]">
        {loading && <p className="text-center text-sm opacity-60">Đang tải lời chúc…</p>}
        {!loading && messages.length === 0 && (
          <p className="text-center text-sm opacity-60">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
        )}
        {messages.map(m => (
          <div key={m.id} className="rounded-lg border p-4 text-sm shadow-sm"
            style={{ borderColor: '#30530F40', backgroundColor: '#30530F05' }}>
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold" style={{ color: PRIMARY }}>{m.name}</span>
              <span className="text-xs opacity-60 shrink-0">{m.time}</span>
            </div>
            <p className="mt-2 leading-relaxed">{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

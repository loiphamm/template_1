import { useState } from 'react'
import flowerImg from '../assets/flower.webp'
import { SHEET_API_URL } from '../config.js'
import './RSVP.css'

/* Xác nhận tham dự → lưu vào Google Sheet (tab riêng "Xac nhan tham du")
   qua Apps Script. Fallback localStorage khi chưa cấu hình SHEET_API_URL. */

const PRIMARY = '#30530F'
const SERIF = '"Baskerville", "Times New Roman", serif'

const titleStyle = {
  color: PRIMARY,
  fontFamily: '"Times New Roman", serif',
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '1px',
}

const OPTIONS = [
  { value: 'yes',   label: 'Tôi sẽ tham gia' },
  { value: 'no',    label: 'Rất tiếc, tôi bận mất rồi' },
  { value: 'maybe', label: 'Tôi sẽ nhắn lại sau nhé' },
]

const LS_KEY = 'wedding_rsvp'
const useSheet = () => SHEET_API_URL && SHEET_API_URL.startsWith('https://')

function nowStr() {
  const d = new Date(), p = n => String(n).padStart(2, '0')
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
}

async function postRSVP(payload) {
  if (useSheet()) {
    await fetch(SHEET_API_URL, { method: 'POST', body: JSON.stringify(payload) })
    return
  }
  // localStorage fallback (offline mode)
  const saved = localStorage.getItem(LS_KEY)
  const list = saved ? JSON.parse(saved) : []
  localStorage.setItem(LS_KEY, JSON.stringify([payload, ...list]))
}

export default function RSVP() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('yes')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Vui lòng nhập họ và tên'); return }
    setSending(true); setError('')
    const opt = OPTIONS.find(o => o.value === attendance)
    const payload = {
      type: 'rsvp',
      id: Date.now(),
      name: name.trim(),
      attendance,
      attendanceLabel: opt ? opt.label : '',
      message: message.trim(),
      time: nowStr(),
    }
    try {
      await postRSVP(payload)
      setSuccess(true)
    } catch {
      setError('Gửi thất bại, vui lòng thử lại.')
    } finally {
      setSending(false)
    }
  }

  function resetForm() {
    setName(''); setAttendance('yes'); setMessage('')
    setSuccess(false); setError('')
  }

  const inputStyle = { borderColor: '#30530F40', color: PRIMARY, backgroundColor: '#30530F0a', fontFamily: SERIF }

  return (
    <section
      id="xac-nhan-tham-du"
      className="relative z-10 px-6 md:px-10 pt-10 md:pt-12 pb-2"
      style={{ color: PRIMARY, fontFamily: SERIF }}
    >
      <img src={flowerImg} alt="" className="sec-flower fbg-rsvp" />

      <div className="text-center">
        <h2 className="uppercase" style={titleStyle}>Xác Nhận Tham Dự</h2>
        <p className="mt-2 italic text-sm md:text-base max-w-[460px] mx-auto" style={{ color: PRIMARY }}>
          Hãy xác nhận tham dự để chúng mình chuẩn bị đón tiếp thật chu đáo nhé
        </p>
      </div>

      <div className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]">
        <div className="rounded-2xl border p-6 md:p-8 shadow-sm" style={{ borderColor: '#30530F40', backgroundColor: '#30530F08' }}>
          {success ? (
            <div className="text-center py-6">
              <div className="rsvp-check mx-auto" aria-hidden="true">✓</div>
              <h3 className="mt-4 text-lg md:text-xl font-semibold" style={{ color: PRIMARY }}>
                Cảm ơn {name || 'bạn'}!
              </h3>
              <p className="mt-2 italic text-sm md:text-base" style={{ color: PRIMARY }}>
                {attendance === 'yes'
                  ? 'Chúng mình rất vui khi được đón tiếp bạn trong ngày trọng đại. Hẹn gặp lại nhé!'
                  : attendance === 'maybe'
                    ? 'Cảm ơn bạn đã phản hồi. Mong sớm nhận được tin vui từ bạn!'
                    : 'Cảm ơn bạn đã phản hồi. Chúng mình sẽ nhớ bạn trong ngày đặc biệt này.'}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-5 text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: PRIMARY }}
              >
                Gửi xác nhận khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); if (error) setError('') }}
                  placeholder="Họ và tên*"
                  className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                  style={inputStyle}
                  required
                />
              </div>

              <div className="rsvp-options mb-4">
                {OPTIONS.map(opt => (
                  <label
                    key={opt.value}
                    className={`rsvp-option ${attendance === opt.value ? 'rsvp-option--active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={opt.value}
                      checked={attendance === opt.value}
                      onChange={() => setAttendance(opt.value)}
                    />
                    <span className="rsvp-dot" aria-hidden="true" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>

              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Lời nhắn (tuỳ chọn)"
                rows={4}
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none"
                style={{ ...inputStyle, resize: 'none' }}
              />

              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="mt-5 w-full rounded-[10px] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
                style={{ backgroundColor: PRIMARY }}
              >
                {sending ? 'Đang gửi…' : 'Gửi xác nhận'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

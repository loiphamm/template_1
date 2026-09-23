import flowerImg from '../assets/flower.webp'
import AnimatedText from './AnimatedText'
import Reveal from './Reveal'

/* Ported 1:1 from the original "Hoa Mộc Xanh" (boho-floral-green) reception (m.zp) + mini calendar (tj). */

const PRIMARY = '#30530F'
const SERIF = '"Baskerville", "Times New Roman", serif'
const CAL_BORDER = 'color-mix(in srgb, #30530F 27%, transparent)'

const titleStyle = {
  color: PRIMARY,
  fontFamily: '"Times New Roman", serif',
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '1px',
}

const CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Tiệc+cưới+Đức+Linh+%26+Linh+Đan&dates=20260709T040000Z/20260709T070000Z&location=Khách+sạn+Sailing,+Hà+Tĩnh'

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

function MiniCalendar({ year, month, day }) {
  const lead = (new Date(year, month - 1, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells = []
  for (let i = 0; i < lead; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div
      className="w-full max-w-[260px] sm:max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden border mt-2"
      style={{ borderColor: CAL_BORDER, color: PRIMARY }}
    >
      <div className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold border-b tracking-wide" style={{ borderColor: CAL_BORDER }}>
        Tháng {month} / {year}
      </div>
      <div className="grid grid-cols-7 border-b-2" style={{ borderColor: PRIMARY }}>
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
        {cells.map((d, i) => (
          <div key={i} className="flex items-center justify-center h-[30px] md:h-[34px]">
            {d === day ? (
              <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill={PRIMARY}>
                  <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                </svg>
                <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: '#fff' }}>{d}</span>
              </div>
            ) : d !== null ? (
              <span className="text-[12px] md:text-[13px]">{d}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

const Bar = () => <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: PRIMARY }} />

export default function Reception() {
  return (
    <section id="tiec-cuoi" className="relative">
      <img src={flowerImg} alt="" className="sec-flower fbg-rc8" />
      <img src={flowerImg} alt="" className="sec-flower fbg-rc9" />
      <img src={flowerImg} alt="" className="sec-flower fbg-rcr" />

      <Reveal as="h2" className="text-center uppercase mt-10 md:mt-12 mb-6 md:mb-8 px-4" style={titleStyle}>
        <AnimatedText text="Thông Tin Tiệc Cưới" charDelay={42} from="sides" />
      </Reveal>

      <Reveal className="flex flex-col items-center gap-4 md:gap-5 text-center" style={{ fontFamily: SERIF, color: PRIMARY }}>
        <h3 className="font-normal uppercase text-[20px] md:text-[26px]">Tiệc cưới sẽ diễn ra vào lúc:</h3>
        <div className="text-[20px] md:text-[30px]">10:30</div>

        <div className="flex items-center gap-3 md:gap-6">
          <span className="text-[11px] md:text-[16px] uppercase text-right" style={{ fontWeight: 600 }}>Chủ Nhật</span>
          <Bar />
          <span className="text-[26px] md:text-[40px]" style={{ fontWeight: 600 }}>25</span>
          <Bar />
          <span className="text-[11px] md:text-[16px] uppercase text-left" style={{ fontWeight: 600 }}>Tháng 10</span>
        </div>

        <div className="text-[18px] md:text-[24px]">2026</div>
        <div className="text-xs md:text-base uppercase tracking-[0.25em]">(Tức ngày 16/09 năm Bính Ngọ)</div>

        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider">Đón khách</span>
            <span className="text-lg md:text-xl mt-1" style={{ fontWeight: 600 }}>10:15</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider">Khai tiệc</span>
            <span className="text-lg md:text-xl mt-1" style={{ fontWeight: 600 }}>10:45</span>
          </div>
        </div>

        <MiniCalendar year={2026} month={10} day={25} />

        {/* <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center text-sm tracking-wider underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
          style={{ color: PRIMARY }}
        >
          Thêm vào lịch
        </a> */}
      </Reveal>
    </section>
  )
}

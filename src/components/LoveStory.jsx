import flowerImg from '../assets/flower.webp'
import AnimatedText from './AnimatedText'
import Reveal from './Reveal'

/* Ported 1:1 from the original "Hoa Mộc Xanh" (boho-floral-green) timeline (m.xU).
   3-column grid: [time (right) | dot+connecting line | label (left)]. */

const PRIMARY = '#30530F'
const SERIF = '"Baskerville", "Times New Roman", serif'
const LINE = 'color-mix(in srgb, #30530F 40%, transparent)'

const titleStyle = {
  color: PRIMARY,
  fontFamily: '"Times New Roman", serif',
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '1px',
}

const events = [
  { id: 1, time: '10:30', label: 'Đón khách' },
  { id: 2, time: '11:00', label: 'Khai tiệc' },
  { id: 3, time: '11:20', label: 'Rót rượu, cắt bánh' },
  { id: 4, time: '11:40', label: 'Phục vụ món chính' },
  { id: 5, time: '13:40', label: 'Kết thúc tiệc' },
]

export default function LoveStory() {
  return (
    <section
      id="lich-trinh"
      className="relative z-10 flex flex-col gap-6 md:gap-8 px-2 md:px-4 mt-10 md:mt-12 mb-10 md:mb-12"
      style={{ fontFamily: SERIF }}
    >
      <img src={flowerImg} alt="" className="sec-flower fbg-ti10" />

      <Reveal as="h2" className="uppercase font-bold text-center px-2 md:px-4" style={titleStyle}>
        <AnimatedText text="Lịch Trình Ngày Cưới" charDelay={42} from="sides" />
      </Reveal>

      <ol className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10">
        {events.map((ev, i) => {
          const isFirst = i === 0
          const isLast = i === events.length - 1
          return (
            <Reveal key={ev.id} as="li" variant="up" delay={`${i * 100}ms`} className="contents">
              <span className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug" style={{ color: PRIMARY }}>
                {ev.time}
              </span>
              <span aria-hidden className="relative flex items-center justify-center self-stretch">
                <span
                  className={`absolute left-1/2 -translate-x-1/2 w-px ${isFirst ? 'top-1/2' : '-top-8 md:-top-10'} ${isLast ? 'bottom-1/2' : '-bottom-8 md:-bottom-10'}`}
                  style={{ backgroundColor: LINE }}
                />
                <span
                  className="relative block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: PRIMARY, boxShadow: `0 0 0 2px color-mix(in srgb, ${PRIMARY} 13%, transparent)` }}
                />
              </span>
              <span className="pt-0.5 text-left text-[17px] md:text-[19px] font-medium leading-snug" style={{ color: PRIMARY }}>
                {ev.label}
              </span>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}

import AnimatedText from './AnimatedText'
import Reveal from './Reveal'

const PRIMARY = '#30530F'
const GREY = '#464646'
const SERIF = '"Baskerville", "Times New Roman", serif'
const QELLIA = '"Fz Qellia", serif'
const AMP = '"UNI Chu truyen thong", "Times New Roman", serif'

const titleStyle = {
  color: PRIMARY, fontFamily: '"Times New Roman", serif',
  fontSize: '24px', fontWeight: 700, letterSpacing: '1px',
}

function FamilySide({ title, father, mother, address }) {
  return (
    <div className="flex flex-col gap-2 drop-shadow-[0_1px_5px_rgba(255,255,255,0.8)]">
      <span style={{ color: PRIMARY, fontFamily: SERIF }}>{title}</span>
      <span className="text-[14px] md:text-[23px] leading-tight" style={{ color: PRIMARY, fontFamily: SERIF, fontWeight: 600 }}>{father}</span>
      <span className="text-[14px] md:text-[23px] leading-tight" style={{ color: PRIMARY, fontFamily: SERIF, fontWeight: 600 }}>{mother}</span>
      <div className="mt-1 w-full md:w-[90%] mx-auto whitespace-pre-line flex flex-col leading-relaxed" style={{ color: PRIMARY, fontFamily: SERIF, fontSize: '11px' }}>{address}</div>
    </div>
  )
}

const Name = ({ children }) => (
  <h3 className="w-full flex items-center justify-center whitespace-nowrap leading-[55px] md:leading-[80px]"
    style={{ fontFamily: QELLIA, color: PRIMARY, fontSize: 'clamp(28px, 8vw, 64px)' }}>
    {children}
  </h3>
)

const BirthOrder = ({ children }) => (
  <div className="uppercase" style={{ color: PRIMARY, fontFamily: SERIF, fontSize: '10px', letterSpacing: '0.1em' }}>{children}</div>
)

function CeremonyBlock({ header, address, mapsQuery, time, weekday, day, month, year, lunar }) {
  return (
    <Reveal className="relative flex flex-col items-center gap-4 md:gap-5 text-center mt-6 md:mt-8" style={{ fontFamily: SERIF }}>
      <div className="flex flex-col items-center gap-2" style={{ color: PRIMARY }}>
        <div className="font-normal text-[16px] md:text-[18px] whitespace-pre-line text-center uppercase">
          {header}
        </div>
        {address && (
          <div className="font-normal text-[12px] md:text-[15px] whitespace-pre-line text-center">
            {address}
          </div>
        )}
        <p className="font-normal text-[16px] md:text-[18px] mb-2 uppercase">Vào Lúc</p>
      </div>
      <div className="text-[20px] md:text-[30px]" style={{ color: PRIMARY, fontFamily: SERIF }}>{time}</div>
      <div className="flex items-center gap-6" style={{ color: PRIMARY }}>
        <span className="text-[12px] md:text-[16px] text-right" style={{ fontFamily: SERIF, fontWeight: 600 }}>{weekday}</span>
        <span className="text-[20px] md:text-[28px] leading-none opacity-50" style={{ fontFamily: SERIF }}>|</span>
        <span className="text-[30px] md:text-[40px]" style={{ fontFamily: SERIF, fontWeight: 600 }}>{day}</span>
        <span className="text-[20px] md:text-[28px] leading-none opacity-50" style={{ fontFamily: SERIF }}>|</span>
        <span className="text-[12px] md:text-[16px] text-left" style={{ fontFamily: SERIF, fontWeight: 600 }}>{month}</span>
      </div>
      <div className="text-[18px] md:text-[24px]" style={{ color: PRIMARY, fontFamily: SERIF }}>{year}</div>
      {lunar && (
        <div className="text-xs md:text-sm uppercase tracking-[0.25em]" style={{ color: PRIMARY, fontFamily: SERIF }}>{lunar}</div>
      )}
      {/* {mapsQuery && (
        <a
          href={`https://www.google.com/maps?q=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm tracking-wider underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
          style={{ color: PRIMARY }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
          Xem chỉ đường
        </a>
      )} */}
    </Reveal>
  )
}

export default function WeddingInfo() {
  return (
    <section id="thong-tin" className="relative">

      <Reveal as="h2" className="text-center uppercase mt-10 md:mt-[148px] mb-6 md:mb-8 px-4" style={titleStyle}>
        <AnimatedText text="Thông Tin Lễ Cưới" charDelay={42} from="sides" />
      </Reveal>

      {/* Family info */}
      <Reveal className="mb-6 md:mb-8">
        <div className="relative grid grid-cols-2 gap-2 md:gap-3 text-center">
          <Reveal variant="left" delay="0ms">
            <FamilySide title="Bố Mẹ Chú Rể" father="Hà Trọng Đại" mother="Phan Thanh Tâm"
              address={'Tổ 39, Phường Hòa Bình\nTỉnh Phú Thọ'} />
          </Reveal>
          <Reveal variant="right" delay="100ms">
            <FamilySide title="Bố Mẹ Cô Dâu" father="Bùi Văn Dưng" mother="Bùi Thị Thanh"
              address={'Cây số 9, Xóm Re, Xã Đại Đồng\n Tỉnh Phú Thọ'} />
          </Reveal>
        </div>
      </Reveal>

      {/* Announcement */}
      <Reveal as="div" className="text-center text-[15px] md:text-[18px] flex flex-col gap-1 mb-6 md:mb-8 uppercase"
        style={{ fontFamily: SERIF, color: PRIMARY }}>
        <span>Trân Trọng Kính Mời</span>
        <span>Tới Dự Bữa Tiệc Mừng Lễ Thành Hôn Của Con Chúng Tôi</span>
      </Reveal>

      {/* Couple names */}
      <div className="relative flex flex-col items-center text-center gap-3 md:gap-4">
        <Name><AnimatedText text="Hà Việt Dũng  " charDelay={55} /></Name>
        <Reveal as="span"><BirthOrder>Trưởng Nam</BirthOrder></Reveal>
        <Reveal><div className="text-[35px] md:text-[42px]" style={{ fontFamily: AMP, color: PRIMARY }}>&amp;</div></Reveal>
        <Name><AnimatedText text="Bùi Như Thuận " charDelay={40} /></Name>
        <Reveal as="span"><BirthOrder>Thứ Nữ</BirthOrder></Reveal>
      </div>

      {/* Engagement ceremony (Lễ Đính Hôn) — above the wedding ceremony */}
      {/* <CeremonyBlock
        header={'Lễ Đính Hôn Được Cử Hành Tại\nNhà Chú Rể'}
        address={'Tổ 12 - Phường Hòa Bình - Tỉnh Phú Thọ'}
        mapsQuery="Truong+Cao+Dang+Nguyen+Du+Hoang+Xuan+Han+Dai+Nai+Thanh+Sen+Ha+Tinh"
        time="10:30"
        weekday="Chủ Nhật"
        day="25"
        month="Tháng 10"
        year="2026"
      /> */}

      {/* Divider between the two ceremonies */}
      <div className="mx-auto my-6 md:my-8 h-px w-24 md:w-32" style={{ backgroundColor: 'color-mix(in srgb, #30530F 30%, transparent)' }} />

      {/* Wedding ceremony (Lễ Thành Hôn) */}
      <CeremonyBlock
        header={'Lễ Thành Hôn Được Cử Hành Tại\nNhà Chú Rể'}
        time="10:30"
        weekday="Chủ Nhật"
        day="25"
        month="Tháng 10"
        year="2026"
        lunar="(Tức ngày 16/09 năm Bính Ngọ)"
      />
    </section>
  )
}

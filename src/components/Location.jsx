import flowerImg from '../assets/flower.webp'
import AnimatedText from './AnimatedText'
import Reveal from './Reveal'

const PRIMARY = '#30530F'
const SERIF = '"Baskerville", "Times New Roman", serif'
const sectionTitleStyle = {
  color: PRIMARY, fontFamily: '"Times New Roman", serif',
  fontSize: '20px', fontWeight: 700, letterSpacing: '1px',
}
const ADDRESS = 'Tại Gia Đình Chú Rể\nTổ 12 - Phường Hòa Bình - Tỉnh Phú Thọ'
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4622.637162209228!2d105.3285509!3d20.8241829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDQ5JzI3LjEiTiAxMDXCsDE5JzQyLjgiRQ!5e1!3m2!1svi!2s!4v1790058876180!5m2!1svi!2s'

export default function Location() {
  return (
    <section id="dia-diem" className="relative pt-10 md:pt-12">
      <img src={flowerImg} alt="" className="sec-flower fbg-lo11" />

      <Reveal as="h2" className="text-center uppercase" style={sectionTitleStyle}>
        <AnimatedText text="Tiệc Cưới Sẽ Tổ Chức" charDelay={38} from="sides" />
      </Reveal>

      <Reveal className="mx-auto mt-3 max-w-sm md:max-w-[500px] text-center text-sm md:text-base tracking-wide whitespace-pre-line flex flex-col items-center pb-3"
        style={{ color: PRIMARY, fontFamily: SERIF }}>
        {ADDRESS}
      </Reveal>

      <Reveal variant="scale" delay="100ms"
        className="h-[267px] md:h-[380px] w-full max-w-[338px] md:max-w-[560px] rounded-[15px] overflow-hidden mx-auto border"
        style={{ borderColor: PRIMARY }}>
        <iframe
          title="Bản đồ địa điểm tiệc cưới"
          src={MAPS_EMBED_URL}
          className="w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  )
}

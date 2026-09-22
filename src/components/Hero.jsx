import heroImg from '../assets/hero.png'
import barImg from '../assets/decoration_bar.webp'
import Reveal from './Reveal'
import './Hero.css'

const GROOM_PHOTO = '/photos/groom.jpg'
const BRIDE_PHOTO = '/photos/bride.jpg'
const onPhotoError = (e) => { e.currentTarget.src = heroImg }

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-couple">
        <div className="hero-band">
          <img src={barImg} alt="" />
        </div>

        {/* Groom — photo uses CSS animation (avoids conflict with rotate transform) */}
        <div className="hero-person hero-person--groom">
          <div className="hero-photo hero-photo--animate-groom">
            <img src={GROOM_PHOTO} alt="Bùi Việt Dũng " onError={onPhotoError} />
          </div>
          <Reveal variant="right" delay="600ms" className="hero-name-block">
            <span className="hero-birthorder">Trưởng Nam</span>
            <span className="hero-name">Việt Dũng </span>
          </Reveal>
        </div>

        {/* Bride */}
        <div className="hero-person hero-person--bride">
          <div className="hero-photo hero-photo--animate-bride">
            <img src={BRIDE_PHOTO} alt="Bùi Như Thuận " onError={onPhotoError} />
          </div>
          <Reveal variant="left" delay="800ms" className="hero-name-block">
            <span className="hero-birthorder">Thứ Nữ</span>
            <span className="hero-name">Như Thuận </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

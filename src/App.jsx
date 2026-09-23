import { useState } from 'react'
import Opening from './components/Opening'
import Hero from './components/Hero'
import WeddingInfo from './components/WeddingInfo'
import Gallery from './components/Gallery'
import Reception from './components/Reception'
import Location from './components/Location'
import LoveStory from './components/LoveStory'
import RSVP from './components/RSVP'
import Guestbook from './components/Guestbook'
import RedEnvelope from './components/RedEnvelope'
import AudioPlayer from './components/AudioPlayer'
import Footer from './components/Footer'
import flowerImg from './assets/flower.webp'
import './App.css'

/* Decorative jasmine layer — ported 1:1 from the original "Hoa Mộc Xanh"
   (boho-floral-green) theme. All positions/sizes/transforms live in App.css
   (.fbg-1 … .fbg-12) with the SAME mobile / md(≥768) / lg(≥1024) breakpoints as
   the original, anchored to the top of the 900px card. */
/* Upper-half flowers (Hero / Thông tin / Album region) stay anchored to the card
   at the original pixel positions — these align well. Lower-half flowers live
   inside Reception / Location / Timeline / Footer so they track that content
   regardless of small height differences. */
function FlowerBackground() {
  const ids = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className="flower-bg" aria-hidden="true">
      {ids.map((n) => (
        <img key={n} src={flowerImg} alt="" className={`flower-bg-item fbg-${n}`} />
      ))}
    </div>
  )
}

function App() {
  const [opened, setOpened] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const modalOpen = giftOpen || galleryOpen

  return (
    <div className="app">
      {!opened && <Opening onOpen={() => setOpened(true)} />}
      <div className={`main-content ${opened ? 'main-content--visible' : ''}`}>
        <div className="main-content-inner">
          <FlowerBackground />
          <Hero />
          <WeddingInfo />
          <Gallery onLightboxToggle={setGalleryOpen} />
          <Reception />
          <Location />
          <LoveStory />
          {/* <RSVP /> */}
          {/* <Guestbook /> */}
          <RedEnvelope open={giftOpen} setOpen={setGiftOpen} />
          <Footer />
        </div>
        <AudioPlayer autoPlay={opened} hidden={modalOpen} />
      </div>
    </div>
  )
}

export default App

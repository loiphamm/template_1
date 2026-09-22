import { useState, useRef, useEffect } from 'react'
import './AudioPlayer.css'

export default function AudioPlayer({ autoPlay = false }) {
  const [playing, setPlaying]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume]     = useState(0.6)
  const [noFile, setNoFile]     = useState(false)
  const audioRef = useRef(null)
  const didAutoPlay = useRef(false)

  /* Bind audio events */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    const onError      = () => setNoFile(true)
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    }
    const onEnded = () => { setPlaying(false); setProgress(0) }
    audio.addEventListener('error',      onError)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended',      onEnded)
    return () => {
      audio.removeEventListener('error',      onError)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended',      onEnded)
    }
  }, [volume])

  /* Auto-play once after user opened the invitation (user-gesture chain) */
  useEffect(() => {
    if (!autoPlay || didAutoPlay.current) return
    didAutoPlay.current = true
    const audio = audioRef.current
    if (!audio || noFile) return
    audio.play().then(() => setPlaying(true)).catch(() => {})
  }, [autoPlay, noFile])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio || noFile) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setNoFile(true))
    }
  }

  function handleVolume(e) {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  function handleSeek(e) {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const pct = parseFloat(e.target.value)
    audio.currentTime = (pct / 100) * audio.duration
    setProgress(pct)
  }

  return (
    <div className={`aplayer ${playing ? 'aplayer--playing' : ''}`}>
      <audio ref={audioRef} src="https://cdn.chungdoi.com/music/my-love-westlife.mp3" preload="none" />

      {/* Play/Pause button — single fixed-size SVG, no layout shift */}
      <button className="aplayer-disc" onClick={togglePlay}
        title={playing ? 'Tạm dừng' : 'Phát nhạc'}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white"
          style={{ display:'block', flexShrink:0 }}>
          {playing
            ? <><rect x="4" y="3" width="4" height="14" rx="1"/><rect x="12" y="3" width="4" height="14" rx="1"/></>
            : <polygon points="5,2 17,10 5,18"/>}
        </svg>
      </button>

      {playing && <div className="aplayer-note-1">♪</div>}
    </div>
  )
}

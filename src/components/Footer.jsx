import './Footer.css'

function FooterFlower() {
  return (
    <svg className="footer-flower" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(60,60)">
        {[0,45,90,135,180,225,270,315].map((a, i) => (
          <ellipse key={i} cx="0" cy="-22" rx="9" ry="18"
            fill={i % 2 === 0 ? 'rgba(135,199,122,0.35)' : 'rgba(74,144,64,0.25)'}
            transform={`rotate(${a})`}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r="10" fill="rgba(196,154,60,0.5)"/>
      <circle cx="60" cy="60" r="5" fill="rgba(196,154,60,0.7)"/>
    </svg>
  )
}

const navLinks = [
  { href: '#thong-tin', label: 'Lễ cưới' },
  { href: '#anh-cuoi', label: 'Album' },
  { href: '#tiec-cuoi', label: 'Tiệc cưới' },
  { href: '#dia-diem', label: 'Địa điểm' },
  { href: '#lich-trinh', label: 'Lịch trình' },
  // { href: '#xac-nhan-tham-du', label: 'Xác nhận' },
  // { href: '#so-luu-but', label: 'Lưu bút' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top-wave" />

      <div className="footer-flowers">
        <FooterFlower />
        <FooterFlower />
        <FooterFlower />
      </div>

      <div className="container footer-content">
        <div className="footer-names">
          <span className="footer-name">Việt Dũng </span>
          <span className="footer-heart">♡</span>
          <span className="footer-name">Như Thuận </span>
        </div>

        <p className="footer-date-str">25 · 10 · 2026</p>
        <p className="footer-tagline">
          "Hẹn gặp lại trong ngày trọng đại của con chúng tôi"
        </p>

        <div className="footer-divider">
          <span /><span className="footer-star">✦</span><span />
        </div>

        <nav className="footer-nav">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="footer-nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer-bottom">
        
   
        </div>
      </div>
    </footer>
  )
}

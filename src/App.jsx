import { useState, useEffect, useCallback } from 'react'
import FloatingHearts from './components/FloatingHearts'
import ScrollReveal from './components/ScrollReveal'
import translations from './translations'
import './App.css'

function TypeWriter({ text, speed = 60, delay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setDisplayText('')
    setStarted(false)
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay, text])

  useEffect(() => {
    if (!started) return
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, started])

  return (
    <span className="typewriter">
      {displayText}
      <span className="typewriter-cursor">|</span>
    </span>
  )
}

function PulsingHeart() {
  return (
    <div className="pulsing-heart-container">
      <div className="pulsing-heart">
        <span className="heart-glow">💗</span>
      </div>
      <div className="heart-rings">
        <div className="heart-ring heart-ring--1"></div>
        <div className="heart-ring heart-ring--2"></div>
        <div className="heart-ring heart-ring--3"></div>
      </div>
    </div>
  )
}

function ConfettiExplosion() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      emoji: ['💕', '💗', '💖', '🌸', '✨', '🎀', '💐'][Math.floor(Math.random() * 7)],
      x: (Math.random() - 0.5) * 600,
      y: -(Math.random() * 500 + 100),
      rotation: Math.random() * 720 - 360,
      scale: 0.5 + Math.random() * 1,
      delay: Math.random() * 0.5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti-particle"
          style={{
            '--x': `${p.x}px`,
            '--y': `${p.y}px`,
            '--rotation': `${p.rotation}deg`,
            '--scale': p.scale,
            '--delay': `${p.delay}s`,
            fontSize: `${16 + Math.random() * 16}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function LanguageSwitcher({ currentLang, onChangeLang }) {
  const langs = ['pt-BR', 'en', 'zh']

  return (
    <div className="language-switcher">
      {langs.map((lang) => (
        <button
          key={lang}
          className={`lang-btn ${currentLang === lang ? 'lang-btn--active' : ''}`}
          onClick={() => onChangeLang(lang)}
          aria-label={translations[lang].label}
        >
          <span className="lang-flag">{translations[lang].flag}</span>
          <span className="lang-label">{translations[lang].label}</span>
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState('pt-BR')
  const [showContent, setShowContent] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [rejectCount, setRejectCount] = useState(0)
  const [rejectPosition, setRejectPosition] = useState(null)

  const t = translations[lang]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleReject = useCallback(() => {
    setRejectCount((prev) => prev + 1)
    // Keep movement small so button stays inside the card on mobile
    const maxX = window.innerWidth < 480 ? 60 : 100
    const maxY = 30
    const newX = Math.random() * maxX * 2 - maxX
    const newY = Math.random() * maxY * 2 - maxY
    setRejectPosition({ x: newX, y: newY })
  }, [])

  return (
    <div className="app">
      <FloatingHearts />
      <LanguageSwitcher currentLang={lang} onChangeLang={setLang} />

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="hero-section">
        <div className="hero-bg-shapes">
          <div className="hero-blob hero-blob--1"></div>
          <div className="hero-blob hero-blob--2"></div>
          <div className="hero-blob hero-blob--3"></div>
        </div>

        <div className={`hero-content ${showContent ? 'hero-content--visible' : ''}`}>
          <PulsingHeart />

          <h1 className="hero-title">
            <span className="hero-title-line hero-title-line--1">{t.heroTitle1}</span>
            <span className="hero-title-line hero-title-line--2">{t.heroTitle2}</span>
            <span className="hero-title-line hero-title-line--3">❤️</span>
          </h1>

          <p className="hero-subtitle">
            <TypeWriter
              text={t.heroSubtitle}
              speed={50}
              delay={1500}
            />
          </p>

          <a href="#mensagem" className="hero-cta">
            <span>{t.heroCta}</span>
            <svg className="hero-cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>

          <div className="scroll-indicator-phone">
            <span className="phone-icon">📱</span>
            <span className="scroll-indicator-text">{t.scrollText}</span>
            <svg className="scroll-chevron" width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 1l7 7 7-7" stroke="var(--pink-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== MENSAGEM SECTION ===== */}
      <section id="mensagem" className="message-section">
        <div className="section-container">
          <ScrollReveal>
            <div className="section-badge">{t.letterBadge}</div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="letter-card">
              <div className="letter-header">
                <span className="letter-icon">📝</span>
                <span className="letter-date">{t.letterDate}</span>
              </div>
              <div className="letter-body">
                <p>{t.letterGreeting}</p>
                <p>{t.letterP1}</p>
                <p>{t.letterP2}</p>
                <p>{t.letterP3}</p>
                <p>{t.letterP4}</p>
                <p className="letter-signature">
                  {t.letterClosing} <br />
                  <span className="signature-name">{t.letterSignature}</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== REASONS SECTION ===== */}
      <section id="motivos" className="reasons-section">
        <div className="section-container">
          <ScrollReveal>
            <div className="section-badge">{t.reasonsBadge}</div>
            <h2 className="section-title">{t.reasonsTitle}</h2>
          </ScrollReveal>

          <div className="reasons-grid">
            {t.reasons.map((reason, index) => (
              <ScrollReveal key={index} delay={index * 150} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="reason-card">
                  <div className="reason-emoji">{reason.emoji}</div>
                  <h3 className="reason-title">{reason.title}</h3>
                  <p className="reason-text">{reason.text}</p>
                  <div className="reason-card-glow"></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE SECTION ===== */}
      <section id="timeline" className="timeline-section">
        <div className="section-container">
          <ScrollReveal>
            <div className="section-badge">{t.timelineBadge}</div>
            <h2 className="section-title">{t.timelineTitle}</h2>
          </ScrollReveal>

          <div className="timeline">
            {t.timeline.map((item, index) => (
              <ScrollReveal key={index} delay={index * 250}>
                <div className="timeline-item">
                  <div className="timeline-dot">
                    <span>{item.emoji}</span>
                  </div>
                  <div className="timeline-content">
                    <p>{item.text}</p>
                  </div>
                  {index < t.timeline.length - 1 && (
                    <div className="timeline-line"></div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section id="resposta" className="cta-section">
        <div className="section-container">
          <ScrollReveal>
            <div className="cta-card">
              {!accepted ? (
                <>
                  <div className="cta-emoji">🥺</div>
                  <h2 className="cta-title">{t.ctaTitle}</h2>
                  <p className="cta-subtitle">{t.ctaSubtitle}</p>
                  <div className="cta-buttons">
                    <button
                      id="accept-button"
                      className="btn btn--accept"
                      onClick={() => setAccepted(true)}
                    >
                      <span>{t.ctaAccept}</span>
                    </button>
                    <button
                      id="reject-button"
                      className="btn btn--reject"
                      onClick={handleReject}
                      style={
                        rejectPosition
                          ? {
                            transform: `translate(${rejectPosition.x}px, ${rejectPosition.y}px)`,
                            transition: 'transform 0.3s var(--ease-bounce)',
                          }
                          : {}
                      }
                    >
                      <span>
                        {t.ctaReject[Math.min(rejectCount, t.ctaReject.length - 1)]}
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="accepted-state">
                  <ConfettiExplosion />
                  <div className="accepted-emoji">😊💕</div>
                  <h2 className="accepted-title">{t.acceptedTitle}</h2>
                  <p className="accepted-text">{t.acceptedText}</p>
                  <div className="accepted-hearts">
                    {['💕', '💗', '💖', '💝', '🌸', '✨', '💕', '💗'].map((h, i) => (
                      <span
                        key={i}
                        className="bounce-heart"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>{t.footerText}</p>
        <p className="footer-small">{t.footerSmall}</p>
      </footer>
    </div>
  )
}

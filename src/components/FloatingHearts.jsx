import { useEffect, useState } from 'react'
import './FloatingHearts.css'

const HEART_EMOJIS = ['💕', '💗', '💖', '💝', '🌸', '✨', '💐', '🦋']

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const initialHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 15,
      size: 14 + Math.random() * 24,
      opacity: 0.15 + Math.random() * 0.35,
    }))
    setHearts(initialHearts)
  }, [])

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}

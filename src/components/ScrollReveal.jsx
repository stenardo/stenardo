import { useEffect, useRef, useState } from 'react'
import './ScrollReveal.css'

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.15,
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${direction} ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

import { useState, useEffect } from 'react'

const Hero = () => {
  const words = ['scalable web experiences', 'modern UI/UX', 'full-stack apps', 'clean code']
  const [currentWord, setCurrentWord] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWord]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.substring(0, displayText.length + 1))
        if (displayText.length === word.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setDisplayText(word.substring(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setCurrentWord((currentWord + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWord, words])

  return (
    <section id="hero" className="hero">
      <div className="animated-bg"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <div className="hero-content">
        <h1>Swati</h1>
        <div className="typing-text">
          I build <span className="typed-word">{displayText}</span>
        </div>
        <button className="cta-btn" onClick={() => alert('Contact: swati@example.com')}>
          Contact Me ✨
        </button>
      </div>
    </section>
  )
}

export default Hero
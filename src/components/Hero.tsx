import { useEffect, useRef } from 'react'
import { FiDownload, FiArrowRight, FiExternalLink } from 'react-icons/fi'
import gsap from 'gsap'
import FloatingElements from './FloatingElements'

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(subtitleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.4')
      .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(buttonsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingElements />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 0 12px rgba(255,255,255,0.3)',
              animation: 'pulse-glow 2s infinite',
            }}
          />
          <span style={{ color: '#A1A1AA', fontSize: 13 }}>
            Available for projects
          </span>
        </div>

        <h1
          ref={headingRef}
          style={{
            color: '#FFFFFF',
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}
        >
          Hi, I'm{' '}
          <span className="gradient-text">Ifediora Precious</span>{' '}
          Chidiebere
        </h1>

        <span
          ref={subtitleRef}
          style={{
            display: 'inline-block',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 700,
            color: '#A1A1AA',
            marginBottom: 16,
            letterSpacing: '-0.01em',
          }}
        >
          Frontend Developer
        </span>

        <p
          ref={descRef}
          style={{
            color: '#A1A1AA',
            fontSize: 17,
            maxWidth: 600,
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          Turning ideas into powerful digital experiences. I build high-performance web
          interfaces with beautiful, modern designs.
        </p>

        <div
          ref={buttonsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: 16 }}
          >
            Hire Me <FiArrowRight size={18} />
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-ghost"
            style={{ padding: '14px 32px', fontSize: 16 }}
          >
            View Projects <FiExternalLink size={18} />
          </a>
          <a href="/resume.html" target="_blank" className="btn-ghost" style={{ padding: '14px 32px', fontSize: 16 }}>
            <FiDownload size={18} /> Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

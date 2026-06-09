import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const move = (e: MouseEvent) => {
      gsap.to(outer, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.2,
        ease: 'power2.out',
      })
      gsap.to(inner, {
        x: e.clientX - 3,
        y: e.clientY - 3,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    document.addEventListener('mousemove', move)

    const hoverables = document.querySelectorAll('a, button, [data-cursor]')
    const hoverIn = () => {
      gsap.to(outer, { scale: 1.8, borderColor: '#FFFFFF', boxShadow: '0 0 20px rgba(255,255,255,0.2)', duration: 0.3 })
      gsap.to(inner, { scale: 1.5, duration: 0.3 })
    }
    const hoverOut = () => {
      gsap.to(outer, { scale: 1, borderColor: 'rgba(255,255,255,0.3)', boxShadow: 'none', duration: 0.3 })
      gsap.to(inner, { scale: 1, duration: 0.3 })
    }

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', hoverIn)
      el.addEventListener('mouseleave', hoverOut)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', hoverIn)
        el.removeEventListener('mouseleave', hoverOut)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={outerRef}
        style={{
          width: 32,
          height: 32,
          border: '1.5px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          left: 0,
          top: 0,
          transition: 'border-color 0.2s',
        }}
        className="hidden md:block"
      />
      <div
        ref={innerRef}
        style={{
          width: 6,
          height: 6,
          background: '#FFFFFF',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          left: 0,
          top: 0,
          boxShadow: '0 0 10px rgba(255,255,255,0.4)',
        }}
        className="hidden md:block"
      />
    </>
  )
}

export default CustomCursor

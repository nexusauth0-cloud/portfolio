import { useEffect, useRef } from 'react'
import { SiReact, SiTailwindcss, SiNodedotjs, SiThreedotjs, SiNextdotjs } from 'react-icons/si'
import { TbBrandFramer } from 'react-icons/tb'
import { FaJs, FaPython } from 'react-icons/fa'
import gsap from 'gsap'

const floatingIcons = [
  { Icon: SiReact, color: '#FFFFFF', size: 28 },
  { Icon: SiTailwindcss, color: '#D4D4D8', size: 28 },
  { Icon: SiNodedotjs, color: '#A1A1AA', size: 28 },
  { Icon: SiThreedotjs, color: '#FFFFFF', size: 28 },
  { Icon: TbBrandFramer, color: '#D4D4D8', size: 28 },
  { Icon: FaJs, color: '#A1A1AA', size: 28 },
  { Icon: SiNextdotjs, color: '#FFFFFF', size: 28 },
  { Icon: FaPython, color: '#D4D4D8', size: 28 },
]

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.float-item')
    elements.forEach((el, i) => {
      gsap.to(el, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        rotation: `random(-10, 10)`,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {floatingIcons.map((item, i) => {
        const { Icon, color, size } = item
        return (
          <div
            key={i}
            className="float-item"
            style={{
              position: 'absolute',
              left: `${15 + (i * 10) % 80}%`,
              top: `${20 + (i * 15 + 10) % 70}%`,
              opacity: 0.15 + Math.random() * 0.15,
            }}
          >
            <Icon size={size} color={color} />
          </div>
        )
      })}
      {/* Gradient dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`dot-${i}`}
          className="float-item"
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
            borderRadius: '50%',
            background: '#FFFFFF',
            opacity: 0.05 + Math.random() * 0.1,
            boxShadow: '0 0 10px rgba(255,255,255,0.3)',
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements

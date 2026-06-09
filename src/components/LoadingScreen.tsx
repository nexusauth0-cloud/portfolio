import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(200, 200)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Main torus knot
    const mainGeo = new THREE.TorusKnotGeometry(1, 0.3, 128, 16)
    const mainMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const mainMesh = new THREE.Mesh(mainGeo, mainMat)
    scene.add(mainMesh)

    // Inner solid shape
    const innerGeo = new THREE.IcosahedronGeometry(0.6, 1)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: false,
      transparent: true,
      opacity: 0.15,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    scene.add(innerMesh)

    // Outer ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.03, 32, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xA1A1AA,
      transparent: true,
      opacity: 0.3,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    // Orbiting particles
    const particleCount = 60
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 2.2 + Math.random() * 0.3
      particlePos[i * 3] = Math.cos(angle) * radius
      particlePos[i * 3 + 1] = Math.sin(angle) * radius
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    let start: number | null = null
    const duration = 2500

    const animate = (time: number) => {
      if (!start) start = time
      const elapsed = time - start
      const progress = Math.min(elapsed / duration, 1)

      mainMesh.rotation.x = progress * Math.PI * 4
      mainMesh.rotation.y = progress * Math.PI * 3
      innerMesh.rotation.x = -progress * Math.PI * 2
      innerMesh.rotation.y = progress * Math.PI * 3
      ring.rotation.z = progress * Math.PI * 1.5
      particles.rotation.y = progress * Math.PI * 2

      const eased = 1 - Math.pow(1 - progress, 3)
      const percent = Math.round(eased * 100)
      if (counterRef.current) {
        counterRef.current.textContent = `${percent}%`
      }

      renderer.render(scene, camera)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Fade out overlay
        if (overlayRef.current) {
          overlayRef.current.style.transition = 'opacity 0.5s ease'
          overlayRef.current.style.opacity = '0'
        }
        setTimeout(onComplete, 600)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      mainGeo.dispose()
      mainMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: 200,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div
        ref={counterRef}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 300,
          fontSize: 16,
          color: '#52525B',
          letterSpacing: '0.15em',
        }}
      >
        0%
      </div>
    </div>
  )
}

export default LoadingScreen

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Starfield = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Starfield
    const starCount = 6000
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      const radius = Math.random() * 500 + 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      starPos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPos[i3 + 2] = radius * Math.cos(phi)

      const brightness = 0.5 + Math.random() * 0.5
      starColors[i3] = brightness; starColors[i3 + 1] = brightness; starColors[i3 + 2] = brightness
      starSizes[i] = Math.random() * 1.5 + 0.3
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))

    const starMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })

    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // Floating particles
    const particleCount = 2000
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      particlePos[i] = (Math.random() - 0.5) * 200
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    camera.position.z = 200

    let mouseX = 0, mouseY = 0
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    document.addEventListener('mousemove', handleMouse)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.0005

      stars.rotation.y += 0.00015
      stars.rotation.x += 0.00005
      particles.rotation.y += 0.0003
      particles.rotation.x += 0.0001

      stars.rotation.x += (mouseY * 0.02 - stars.rotation.x) * 0.005
      stars.rotation.y += (mouseX * 0.02 - stars.rotation.y) * 0.005
      particles.rotation.x += (mouseY * 0.03 - particles.rotation.x) * 0.005
      particles.rotation.y += (mouseX * 0.03 - particles.rotation.y) * 0.005

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      starGeo.dispose()
      starMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}

export default Starfield

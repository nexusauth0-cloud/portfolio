import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiImage } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  name: string
  description: string
  language: string
  html_url: string
  live_url: string
  topics: string[]
  screenshot: string | null
}

const projectsData: Project[] = [
  {
    id: 1,
    name: 'Kings Cut',
    description: 'A premium, responsive landing page for a modern barbershop, built entirely with vanilla web technologies. Designed with a raw, editorial aesthetic — a stark midnight palette paired with sharp typography and muted gold accents to evoke a masculine, high-end atmosphere. Rejecting heavy frameworks, it relies on semantic HTML5, modern CSS Grid and Flexbox for a flawless responsive gallery, and lightweight JavaScript to power interactive elements. A masterclass in how clean, unbloated code delivers a luxury user experience.',
    language: 'CSS',
    html_url: 'https://github.com/nexusauth0-cloud/kings-cut',
    live_url: 'https://kings-cut-sepia.vercel.app/',
    topics: ['HTML5', 'CSS3', 'JavaScript', 'Responsive', 'Barbershop'],
    screenshot: null,
  },
  {
    id: 2,
    name: 'Marcus Ellis Site',
    description: 'A polished personal brand website for Marcus Ellis — blending bold typography with a clean, modern layout to establish a commanding online presence. Built with semantic HTML and custom CSS, the site delivers a fast, accessible experience that puts content first. Every section is crafted to guide the visitor through a compelling narrative, from hero to call-to-action, proving that purposeful design and lightweight code create the most memorable digital impressions.',
    language: 'HTML',
    html_url: 'https://github.com/nexusauth0-cloud/marcus-ellis-site',
    live_url: 'https://marcus-ellis-site.vercel.app/',
    topics: ['HTML5', 'CSS3', 'Responsive', 'Brand'],
    screenshot: null,
  },
  {
    id: 3,
    name: 'Glow Studio',
    description: 'A visually stunning, ultra-clean landing page designed for a luxury nail and lash salon. Built using pure HTML and custom CSS, the site embodies a high-end spa experience with a soft, feminine palette of blush pink, rich cream, and delicate gold accents. It prioritizes a seamless user experience with custom-styled service menus, intuitive iconography, elegant pricing cards, and a high-resolution photo gallery that puts the studio\'s craftsmanship front and center. A prime example of lightweight, framework-free code delivering a premium editorial brand identity.',
    language: 'HTML',
    html_url: 'https://github.com/nexusauth0-cloud/glow-studio',
    live_url: 'https://glow-studio-one.vercel.app/',
    topics: ['HTML5', 'CSS3', 'Responsive', 'Luxury', 'Salon'],
    screenshot: null,
  },
  {
    id: 4,
    name: 'Calc Pro',
    description: 'A modern, mobile-first Progressive Web App combining a scientific calculator, unit converter, and math tools with full offline support. Features four calculator modes (Standard, Scientific, Programmer, Graphing), 14 unit categories with 22 live currencies, a BMI calculator, equation solver, scientific constants library, and 6 customizable themes. Built with vanilla JavaScript and service workers for true offline functionality — a powerhouse of utility wrapped in a clean, intuitive interface.',
    language: 'JavaScript',
    html_url: 'https://github.com/nexusauth0-cloud/calc-pro',
    live_url: 'https://calc-pro-mu.vercel.app/',
    topics: ['PWA', 'Calculator', 'Offline', 'JavaScript'],
    screenshot: null,
  },
  {
    id: 5,
    name: 'NexusAuth',
    description: 'A sleek, responsive portfolio showcasing secure web solutions and modern UI/UX design. NexusAuth represents the intersection of robust authentication and seamless user experience — demonstrating expertise in building secure, user-friendly web interfaces with contemporary design principles and clean, maintainable code.',
    language: 'CSS',
    html_url: 'https://github.com/nexusauth0-cloud/nexusauth',
    live_url: 'https://nexusauth0-cloud.github.io/nexusauth/#home',
    topics: ['Authentication', 'UI/UX', 'Responsive', 'Portfolio'],
    screenshot: null,
  },
  {
    id: 6,
    name: 'StudyGroup Organizer',
    description: 'A collaborative study group management tool designed to streamline academic coordination. Helps students organize study sessions, track progress, share resources, and communicate effectively within groups. Built with a focus on clean UI and intuitive workflows — making group study planning as seamless as possible for university students juggling multiple courses and deadlines.',
    language: 'TypeScript',
    html_url: 'https://github.com/nexusauth0-cloud/studygroup-organizer',
    live_url: 'https://study-group-organizer.onrender.com',
    topics: ['React', 'TypeScript', 'Collaboration', 'Education'],
    screenshot: null,
  },
  {
    id: 7,
    name: 'PresentFoods',
    description: 'A modern, mouthwatering food ordering and discovery platform that brings restaurant-quality meals straight to your doorstep. Features an intuitive menu browsing experience, seamless ordering flow, and responsive design optimized for both mobile and desktop. Built with performance and user experience at its core — fast load times, smooth navigation, and a clean interface that makes food selection feel effortless.',
    language: 'TypeScript',
    html_url: 'https://github.com/nexusauth0-cloud/presentfoods',
    live_url: 'https://presentfoods.vercel.app/',
    topics: ['React', 'TypeScript', 'Food', 'Ordering', 'Responsive'],
    screenshot: null,
  },
]

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData)
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchScreenshots = async () => {
      const updated = await Promise.all(
        projectsData.map(async (p) => {
          if (!p.live_url || p.live_url === '#') return p
          try {
            const res = await fetch(
              `https://api.microlink.io/?url=${encodeURIComponent(p.live_url)}&screenshot=true&meta=false`
            )
            const data = await res.json()
            if (data?.data?.screenshot?.url) {
              return { ...p, screenshot: data.data.screenshot.url }
            }
          } catch {
            // silently fail — fallback handled in render
          }
          return p
        })
      )
      setProjects(updated)
    }
    fetchScreenshots()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth
      const viewWidth = window.innerWidth - 48

      gsap.to(track, {
        x: () => -(totalWidth - viewWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ padding: '0 24px', maxWidth: 1200, margin: '0 auto 48px' }}
      >
        <span className="section-label">MY WORK</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
          }}
        >
          Featured{' '}
          <span className="gradient-text">Projects</span>
        </h2>
      </motion.div>

      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: 24,
          padding: '0 24px',
          width: 'max-content',
        }}
      >
        {projects.map((repo) => (
          <div
            key={repo.id}
            onClick={() => toggleFlip(repo.id)}
            className={`project-card ${flipped[repo.id] ? 'flipped' : ''}`}
            style={{
              perspective: 1200,
              cursor: 'pointer',
              width: 360,
              height: 420,
              flexShrink: 0,
            }}
          >
            <div
              className="project-card-inner"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: flipped[repo.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front — Screenshot Preview */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {repo.screenshot ? (
                  <img
                    src={repo.screenshot}
                    alt={`${repo.name} preview`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                    }}
                  >
                    <FiImage size={48} color="#52525B" />
                    <span style={{ color: '#52525B', fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                      Loading preview...
                    </span>
                  </div>
                )}
                {/* Overlay gradient + info */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 20px 16px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                  }}
                >
                  <h3 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                    {repo.name}
                  </h3>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        color: '#D4D4D8',
                        fontSize: 11,
                        padding: '2px 10px',
                        borderRadius: 100,
                      }}
                    >
                      {repo.language}
                    </span>
                    {repo.topics.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: '#A1A1AA',
                          fontSize: 11,
                          padding: '2px 10px',
                          borderRadius: 100,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {repo.topics.length > 2 && (
                      <span style={{ color: '#52525B', fontSize: 11 }}>
                        +{repo.topics.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Back — Description + Links */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'rgba(10,10,20,0.96)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: 16,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                    {repo.name}
                  </h3>
                  <p
                    style={{
                      color: '#A1A1AA',
                      fontSize: 13,
                      lineHeight: 1.7,
                      marginBottom: 16,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 7,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {repo.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {repo.topics.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: '#A1A1AA',
                          fontSize: 11,
                          padding: '3px 10px',
                          borderRadius: 100,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a
                    href={repo.live_url !== '#' ? repo.live_url : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-primary"
                    style={{ padding: '10px 18px', fontSize: 13 }}
                  >
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-ghost"
                    style={{ padding: '10px 18px', fontSize: 13 }}
                  >
                    <FiGithub size={14} /> Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects

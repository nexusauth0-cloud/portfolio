import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  SiReact, SiTailwindcss, SiThreedotjs, SiNextdotjs, SiTypescript,
  SiNodedotjs, SiFramer,
} from 'react-icons/si'
import { TbBrandGatsby } from 'react-icons/tb'
import { FaJs, FaPython } from 'react-icons/fa'
import gsap from 'gsap'

const skillIcons = [
  { icon: SiReact, name: 'React', color: '#FFFFFF' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#D4D4D8' },
  { icon: TbBrandGatsby, name: 'GSAP', color: '#A1A1AA' },
  { icon: SiThreedotjs, name: 'Three.js', color: '#FFFFFF' },
  { icon: SiFramer, name: 'Framer Motion', color: '#D4D4D8' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#FFFFFF' },
  { icon: FaJs, name: 'JavaScript', color: '#D4D4D8' },
  { icon: SiTypescript, name: 'TypeScript', color: '#A1A1AA' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#FFFFFF' },
  { icon: FaPython, name: 'Python', color: '#D4D4D8' },
]

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', percent: 95 },
      { name: 'Next.js', percent: 90 },
      { name: 'TypeScript', percent: 88 },
      { name: 'Tailwind CSS', percent: 95 },
      { name: 'JavaScript', percent: 95 },
    ],
  },
  {
    title: 'Animation & 3D',
    skills: [
      { name: 'Three.js', percent: 75 },
      { name: 'GSAP', percent: 85 },
      { name: 'Framer Motion', percent: 90 },
      { name: 'WebGL', percent: 70 },
    ],
  },
  {
    title: 'Backend & Tools',
    skills: [
      { name: 'Node.js', percent: 85 },
      { name: 'Express.js', percent: 80 },
      { name: 'MongoDB', percent: 80 },
      { name: 'PostgreSQL', percent: 75 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', percent: 70 },
      { name: 'AWS', percent: 65 },
      { name: 'Git', percent: 90 },
      { name: 'CI/CD', percent: 75 },
    ],
  },
]

const Skills = () => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current) return
    const cards = marqueeRef.current.querySelectorAll('.skill-card')
    cards.forEach((card) => {
      gsap.to(card, {
        y: -10,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <section
      id="skills"
      style={{
        padding: '100px 24px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">MY SKILLS</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 48,
          }}
        >
          Skills & Technologies
        </h2>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          overflow: 'hidden',
          marginBottom: 48,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: '20px 0',
        }}
      >
        <div className="animate-marquee" style={{ display: 'flex', gap: 48, width: 'max-content' }}>
          {[...skillIcons, ...skillIcons].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: '#A1A1AA',
                  fontSize: 15,
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={24} color={item.color} />
                {item.name}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Skill Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
        }}
        ref={marqueeRef}
      >
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            className="skill-card glass glass-hover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            style={{ padding: 28, cursor: 'default' }}
          >
            <h3
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              {group.title}
            </h3>
            {group.skills.map((skill) => (
              <div key={skill.name} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: 14 }}>{skill.name}</span>
                  <span style={{ color: '#A1A1AA', fontSize: 13 }}>{skill.percent}%</span>
                </div>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 100,
                    height: 6,
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    style={{
                      background: 'linear-gradient(90deg, #FFFFFF, #A1A1AA)',
                      borderRadius: 100,
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills

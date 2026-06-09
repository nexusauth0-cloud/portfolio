import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Frontend Developer',
    company: 'Freelance',
    date: '2022 – Present',
    side: 'left',
    bullets: [
      'Building modern web applications for diverse clients using React, Next.js, and Tailwind CSS.',
      'Implementing pixel-perfect UIs from Figma designs with a focus on performance and accessibility.',
      'Developing interactive 3D experiences using Three.js and scroll-based animations with GSAP.',
      'Delivering projects on time with clear client communication throughout the development cycle.',
    ],
  },
  {
    role: 'Assistant Instructor',
    company: 'Click & Smile — Abuja, Nigeria',
    date: 'Aug 2021 – Jan 2025',
    side: 'right',
    bullets: [
      'Assisted in teaching and mentoring students in computer fundamentals and digital literacy.',
      'Developed instructional materials and practice exercises to reinforce learning.',
      'Provided one-on-one support to students, improving overall class performance.',
      'Gained strong communication, patience, and leadership skills working with diverse learners.',
    ],
  },
]

const Experience = () => {
  return (
    <section
      id="experience"
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
        <span className="section-label">EXPERIENCE</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 48,
          }}
        >
          Where I've{' '}
          <span className="gradient-text">Worked</span>
        </h2>
      </motion.div>

      <div style={{ position: 'relative' }}>
        {/* Center line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, #FFFFFF, #A1A1AA)',
            transform: 'translateX(-50%)',
            display: 'none',
          }}
          className="md:block"
        />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: exp.side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{
              display: 'flex',
              justifyContent: exp.side === 'left' ? 'flex-start' : 'flex-end',
              marginBottom: 32,
              position: 'relative',
            }}
            className={`${exp.side === 'right' ? 'md:justify-end' : 'md:justify-start'} justify-start`}
          >
            <div
              className="glass glass-hover"
              style={{
                padding: 28,
                width: '100%',
                maxWidth: 500,
                position: 'relative',
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  [exp.side === 'left' ? 'right' : 'left']: -36,
                  top: 32,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#A1A1AA',
                  border: '4px solid #000',
                  boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                  display: 'none',
                }}
                className="md:block"
              />
              <h3 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>{exp.role}</h3>
              <p style={{ color: '#A1A1AA', fontSize: 14, fontWeight: 500, marginTop: 4 }}>
                {exp.company}
              </p>
              <p
                style={{
                  color: '#52525B',
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  marginTop: 4,
                  marginBottom: 16,
                }}
              >
                {exp.date}
              </p>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 1.7, marginBottom: 4 }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience

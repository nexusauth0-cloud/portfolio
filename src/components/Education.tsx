import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'

const education = [
  {
    institution: 'University of Abuja',
    degree: 'Bachelor of Science in Computer Science',
    location: 'Gwagwalada, Abuja, Nigeria',
    status: 'Currently Enrolled (100 Level)',
    year: '2024 – Present',
  },
  {
    institution: 'Online Certifications',
    degree: 'Various Platforms (Udemy, Coursera, etc.)',
    location: 'Remote',
    status: 'In Progress',
    year: 'Ongoing',
    items: [
      'React & TypeScript Advanced Patterns',
      'Full-Stack Web Development',
      'Three.js & WebGL Fundamentals',
    ],
  },
]

const Education = () => {
  return (
    <section
      id="education"
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
        <span className="section-label">EDUCATION</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 48,
          }}
        >
          Academic{' '}
          <span className="gradient-text">Background</span>
        </h2>
      </motion.div>

      <div style={{ position: 'relative', paddingLeft: 24 }}>
        <div
          style={{
            position: 'absolute',
            left: 11,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, #FFFFFF, #A1A1AA)',
            borderRadius: 100,
          }}
        />

        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            style={{
              position: 'relative',
              marginBottom: 32,
              marginLeft: 24,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -33,
                top: 28,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#A1A1AA',
                border: '3px solid #000',
                boxShadow: '0 0 15px rgba(255,255,255,0.2)',
              }}
            />
            <div className="glass glass-hover" style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ color: '#A1A1AA', flexShrink: 0, marginTop: 2 }}>
                  <FiBookOpen size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700 }}>{edu.institution}</h3>
                  <p style={{ color: '#A1A1AA', fontSize: 15, marginTop: 4 }}>{edu.degree}</p>
                  <p style={{ color: '#52525B', fontSize: 13, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>
                    {edu.location} · {edu.year}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 12,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#A1A1AA',
                      fontSize: 12,
                      padding: '4px 14px',
                      borderRadius: 100,
                    }}
                  >
                    {edu.status}
                  </span>
                  {edu.items && (
                    <ul style={{ marginTop: 12, paddingLeft: 20 }}>
                      {edu.items.map((item, ii) => (
                        <li key={ii} style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 1.7 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Education

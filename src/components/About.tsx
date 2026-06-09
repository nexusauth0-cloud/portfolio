import { useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { number: '3+', label: 'YEARS EXPERIENCE' },
  { number: '30+', label: 'PROJECTS COMPLETED' },
  { number: '15+', label: 'TECHNOLOGIES' },
  { number: '100%', label: 'DEDICATION' },
]

const About = () => {
  const [imgErr, setImgErr] = useState(false)

  return (
    <section
      id="about"
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
        <span className="section-label">ABOUT ME</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 48,
          }}
        >
          Turning Vision Into{' '}
          <span className="gradient-text">Reality</span>
        </h2>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 24,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {imgErr ? (
              <div
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 80,
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.2)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                P
              </div>
            ) : (
              <img
                src="/assets/profile.jpg"
                alt="Ifediora Precious Chidiebere"
                onError={() => setImgErr(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p
            style={{
              color: '#A1A1AA',
              fontSize: 16,
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            I am a passionate Frontend Developer currently studying Computer Science at the
            University of Abuja. I specialize in building scalable web applications, modern
            user interfaces, and immersive digital experiences using cutting-edge technologies.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass glass-hover"
                style={{
                  padding: 20,
                  textAlign: 'center',
                }}
              >
                <div
                  className="gradient-text"
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    color: '#52525B',
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    fontFamily: "'JetBrains Mono', monospace",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

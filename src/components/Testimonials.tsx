import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Sarah Johnson',
    company: 'TechVentures Inc.',
    text: 'Precious delivered an exceptional website that exceeded our expectations. His attention to detail and modern design approach made our brand stand out.',
    rating: 5,
  },
  {
    name: 'Michael Okonkwo',
    company: 'StartupHub Nigeria',
    text: 'Working with Precious was a great experience. He understood our vision perfectly and delivered a fast, responsive application that our users love.',
    rating: 5,
  },
  {
    name: 'Aisha Bello',
    company: 'Digital Solutions Ltd',
    text: 'The level of professionalism and technical skill Precious brings is outstanding. He transformed our outdated site into a modern, high-performance platform.',
    rating: 5,
  },
]

const Testimonials = () => {
  return (
    <section
      id="testimonials"
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
        <span className="section-label">TESTIMONIALS</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 48,
          }}
        >
          What Clients{' '}
          <span className="gradient-text">Say</span>
        </h2>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass glass-hover"
            style={{
              padding: 32,
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
              {Array.from({ length: t.rating }).map((_, ri) => (
                <FiStar key={ri} size={16} color="#FBBF24" fill="#FBBF24" />
              ))}
            </div>
            <p
              style={{
                color: '#A1A1AA',
                fontSize: 14,
                lineHeight: 1.8,
                fontStyle: 'italic',
                marginBottom: 20,
              }}
            >
              "{t.text}"
            </p>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFFFFF, #A1A1AA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
                color: '#FFFFFF',
                marginBottom: 12,
              }}
            >
              {t.name.charAt(0)}
            </div>
            <div>
              <p style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 600 }}>{t.name}</p>
              <p style={{ color: '#52525B', fontSize: 13 }}>{t.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials

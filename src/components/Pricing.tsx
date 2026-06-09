import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const services = [
  {
    title: 'Quick Fix',
    price: '$20 – $50',
    description: 'A tiny bug fix, a small CSS tweak, or a quick content update. No scope creep — in and out fast.',
    features: ['Single fix/update', 'Same-day delivery', 'Minimal changes', 'Email support'],
  },
  {
    title: 'Starter Site',
    price: '$50 – $100',
    description: 'A one-page starter for side projects, freelancers, or anyone getting online for the first time.',
    features: ['Single page', 'Basic responsive design', 'Contact form', 'Simple animations'],
  },
  {
    title: 'Small Project',
    price: '$100 – $300',
    description: 'Perfect for a simple landing page or a small personal website with basic functionality.',
    features: ['Up to 3 pages', 'Responsive design', 'Basic animations', 'Contact form'],
  },
  {
    title: 'Medium Project',
    price: '$300 – $800',
    description: 'Ideal for multi-page business websites or web applications with moderate complexity.',
    features: ['Up to 5 pages', 'Advanced animations', 'CMS integration', 'SEO optimization'],
  },
  {
    title: 'Large Project',
    price: '$800 – $2,500+',
    description: 'Full-scale web applications, dashboards, e-commerce platforms, or SaaS products.',
    features: ['Custom development', 'Database integration', 'Authentication', 'API development'],
  },
]

const Pricing = () => {
  return (
    <section
      id="pricing"
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
        <span className="section-label">PRICING</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 48,
          }}
        >
          Services &{' '}
          <span className="gradient-text">Pricing</span>
        </h2>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass glass-hover"
            style={{
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              {service.title}
            </h3>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 16,
              }}
              className="gradient-text"
            >
              {service.price}
            </div>
            <p style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              {service.description}
            </p>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', flex: 1, marginBottom: 24 }}>
              {service.features.map((f, fi) => (
                <li
                  key={fi}
                  style={{
                    color: '#A1A1AA',
                    fontSize: 14,
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ color: '#A1A1AA' }}>✦</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: 14,
                textDecoration: 'none',
              }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Request a Quote <FiArrowRight size={16} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Pricing

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaGithub, FaFacebook } from 'react-icons/fa'
import SuccessOverlay from './SuccessOverlay'

const Contact = () => {
  const [sending, setSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    setSending(true)
    setError('')

    const text = `*New Message from ${name}*\n\n*Email:* ${email}\n*Subject:* ${subject || '(none)'}\n\n${message}`

    try {
      await navigator.clipboard.writeText(text)
    } catch {}

    setSending(false)
    setShowSuccess(true)

    window.open(`https://wa.me/2348082563629?text=${encodeURIComponent(text)}`, '_blank')
    form.reset()
  }

  return (
    <section
      id="contact"
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
        <span className="section-label">GET IN TOUCH</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          Let's Build the{' '}
          <span className="gradient-text">Future</span>
        </h2>
        <p style={{ color: '#A1A1AA', fontSize: 16, marginBottom: 48, maxWidth: 480 }}>
          Have a project in mind or just want to say hi? Drop a message — I usually reply within a few hours.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass" style={{ padding: 32, marginBottom: 24 }}>
            <h3 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
              Contact Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiMail size={16} color="#A1A1AA" />
                </div>
                <div>
                  <p style={{ color: '#52525B', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>EMAIL</p>
                  <a href="mailto:nexusauth0@gmail.com" style={{ color: '#FFFFFF', fontSize: 14, textDecoration: 'none' }}>
                    nexusauth0@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiPhone size={16} color="#A1A1AA" />
                </div>
                <div>
                  <p style={{ color: '#52525B', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>PHONE</p>
                  <p style={{ color: '#FFFFFF', fontSize: 14 }}>08082563629 / 08135692333</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiMapPin size={16} color="#A1A1AA" />
                </div>
                <div>
                  <p style={{ color: '#52525B', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>LOCATION</p>
                  <p style={{ color: '#FFFFFF', fontSize: 14 }}>Gwagwalada, Abuja, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/2348082563629"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              fontSize: 16,
              marginBottom: 16,
              textDecoration: 'none',
            }}
          >
            <FaWhatsapp size={20} /> Chat on WhatsApp
          </a>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <a href="http://instagram.com/ifediorapreciouschidiebere" target="_blank" rel="noopener noreferrer" style={{ color: '#A1A1AA', transition: 'color 0.3s' }} aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://github.com/nexusauth0-cloud" target="_blank" rel="noopener noreferrer" style={{ color: '#A1A1AA', transition: 'color 0.3s' }} aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://facebook.com/ifediorapreciouschidiebere" target="_blank" rel="noopener noreferrer" style={{ color: '#A1A1AA', transition: 'color 0.3s' }} aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
          </div>
        </motion.div>

        {/* Right - Custom Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass" style={{ padding: 28 }}>
            <h3 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiSend size={16} color="#A1A1AA" /> Send a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    padding: '14px 16px',
                    color: '#FFFFFF',
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                  aria-label="Your name"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    padding: '14px 16px',
                    color: '#FFFFFF',
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                  aria-label="Your email"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '14px 16px',
                  color: '#FFFFFF',
                  fontSize: 14,
                  outline: 'none',
                  width: '100%',
                  marginBottom: 16,
                  fontFamily: 'inherit',
                }}
                aria-label="Subject"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={5}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '14px 16px',
                  color: '#FFFFFF',
                  fontSize: 14,
                  outline: 'none',
                  width: '100%',
                  resize: 'vertical',
                  marginBottom: 16,
                  fontFamily: 'inherit',
                }}
                aria-label="Your message"
              />
              {error && (
                <p style={{ color: '#A1A1AA', fontSize: 13, marginBottom: 12 }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: 15,
                  opacity: sending ? 0.7 : 1,
                }}
              >
                <FiSend size={16} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Live Map */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ marginTop: 48 }}
      >
        <div className="section-label" style={{ marginBottom: 12, textAlign: 'center' }}>
          MY LOCATION
        </div>
        <div
          className="glass"
          style={{
            overflow: 'hidden',
            borderRadius: 16,
            height: 300,
            width: '100%',
          }}
        >
          <iframe
            title="Gwagwalada Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=7.05%2C8.92%2C7.12%2C8.97&amp;layer=mapnik&amp;marker=8.9433%2C7.0767"
            width="100%"
            height="100%"
            style={{ border: 'none', filter: 'invert(0.9) hue-rotate(180deg)' }}
            loading="lazy"
            aria-label="Map showing location in Gwagwalada, Abuja, Nigeria"
          />
        </div>
        <p
          style={{
            color: '#52525B',
            fontSize: 13,
            textAlign: 'center',
            marginTop: 8,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Gwagwalada, Abuja, Nigeria
        </p>
      </motion.div>

      <SuccessOverlay show={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  )
}

export default Contact

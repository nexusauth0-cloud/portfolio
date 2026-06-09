import { FaInstagram, FaGithub, FaFacebook, FaHeart } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 24px 32px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 32,
            marginBottom: 40,
          }}
        >
          <div>
            <span
              style={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: '0.03em',
              }}
            >
              PRECIOUS.DEV
            </span>
            <p
              style={{
                color: '#52525B',
                fontSize: 13,
                marginTop: 8,
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              Showcasing code, creativity, and innovation in every project.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <a href="http://instagram.com/ifediorapreciouschidiebere" target="_blank" rel="noopener noreferrer" style={{ color: '#A1A1AA', transition: 'color 0.3s' }} aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://github.com/nexusauth0-cloud" target="_blank" rel="noopener noreferrer" style={{ color: '#A1A1AA', transition: 'color 0.3s' }} aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://facebook.com/ifediorapreciouschidiebere" target="_blank" rel="noopener noreferrer" style={{ color: '#A1A1AA', transition: 'color 0.3s' }} aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: '#52525B', fontSize: 13 }}>
            © 2026 Ifediora Precious Chidiebere. All Rights Reserved.
          </p>
          <p style={{ color: '#52525B', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            Made with <FaHeart size={12} color="#A1A1AA" /> using React & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

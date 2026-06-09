import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi'
import { blogPosts } from '../data/blogPosts'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.id === slug)

  if (!post) {
    return (
      <div style={{ padding: '100px 24px', textAlign: 'center', color: '#A1A1AA' }}>
        <h1 style={{ fontSize: 32, color: '#fff', marginBottom: 16 }}>Post not found</h1>
        <Link to="/" style={{ color: '#A1A1AA', textDecoration: 'underline' }}>Back to home</Link>
      </div>
    )
  }

  // Render content with code blocks, paragraphs, headings
  const renderContent = (text: string) => {
    const lines = text.split('\n')
    const elements: React.ReactNode[] = []
    let inCode = false
    let codeBuffer: string[] = []
    lines.forEach((line, i) => {
      if (line.startsWith('\\\`\\\`\\\`')) {
        if (inCode) {
          elements.push(
            <pre
              key={`code-${i}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 20,
                overflow: 'auto',
                fontSize: 13,
                lineHeight: 1.7,
                color: '#D4D4D8',
                fontFamily: "'JetBrains Mono', monospace",
                margin: '16px 0',
              }}
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          )
          codeBuffer = []
          inCode = false
        } else {
          inCode = true
        }
        return
      }
      if (inCode) {
        codeBuffer.push(line)
        return
      }

      const trimmed = line.trim()

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={i} style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 28, marginBottom: 8 }}>
            {trimmed.slice(4)}
          </h3>
        )
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={i} style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginTop: 32, marginBottom: 10 }}>
            {trimmed.slice(3)}
          </h2>
        )
      } else if (trimmed.startsWith('- ')) {
        elements.push(
          <li key={i} style={{ color: '#A1A1AA', fontSize: 15, lineHeight: 1.8, marginLeft: 20 }}>
            {trimmed.slice(2)}
          </li>
        )
      } else if (trimmed === '') {
        elements.push(<div key={i} style={{ height: 8 }} />)
      } else {
        elements.push(
          <p key={i} style={{ color: '#A1A1AA', fontSize: 15, lineHeight: 1.8, marginBottom: 4 }}>
            {trimmed}
          </p>
        )
      }
    })

    return elements
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {/* Nav bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#A1A1AA',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            transition: 'color 0.2s',
          }}
        >
          <FiArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>

      <article style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {post.tags.map((t) => (
              <span
                key={t}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  padding: '4px 14px',
                  fontSize: 12,
                  color: '#A1A1AA',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: 12,
              letterSpacing: '-0.02em',
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              color: '#52525B',
              fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 32,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiCalendar size={14} /> {post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiClock size={14} /> {post.readTime}
            </span>
          </div>

          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 16,
              marginBottom: 40,
            }}
          />

          <div className="blog-content">{renderContent(post.content)}</div>

          <div
            style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
            }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#A1A1AA',
                textDecoration: 'none',
                fontSize: 14,
                transition: 'color 0.2s',
              }}
            >
              <FiArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  )
}

export default BlogPost

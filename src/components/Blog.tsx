import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiMessageSquare, FiClock, FiCalendar, FiExternalLink } from 'react-icons/fi'

interface Comment {
  name: string
  text: string
  date: string
}

interface PostData {
  liked: boolean
  likes: number
  comments: Comment[]
}

const posts = [
  {
    id: 'building-modern-web-apps',
    title: 'Building Modern Web Apps with React 19',
    excerpt:
      'React 19 introduces groundbreaking features like Actions, Server Components, and the new use() hook. In this post, I break down what these mean for frontend developers and how to get started.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: '6 min read',
    date: 'May 28, 2026',
  },
  {
    id: 'threejs-3d-portfolio',
    title: 'Why I Use Three.js for My Portfolio',
    excerpt:
      'Adding 3D elements to a portfolio creates an unforgettable first impression. Here is how I built the interactive starfield and loading animation using Three.js and React Three Fiber.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    tags: ['Three.js', '3D', 'Animation'],
    readTime: '5 min read',
    date: 'May 15, 2026',
  },
  {
    id: 'tailwind-tips',
    title: 'Tailwind CSS v4 — What Changed and Why It Matters',
    excerpt:
      'Tailwind CSS v4 is a complete rewrite with CSS-first configuration, native cascade layers, and lightning-fast builds. A deep dive into the breaking changes and shiny new features.',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80',
    tags: ['Tailwind CSS', 'CSS', 'Design'],
    readTime: '4 min read',
    date: 'April 30, 2026',
  },
  {
    id: 'gsap-animations',
    title: 'GSAP Scroll Animations That Wow Users',
    excerpt:
      'GreenSock is still the gold standard for performant scroll-driven animations. Learn how I created the pinned horizontal scroll and floating elements on this very portfolio.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    tags: ['GSAP', 'Animation', 'UX'],
    readTime: '7 min read',
    date: 'April 12, 2026',
  },
  {
    id: 'self-taught-dev-journey',
    title: 'From Self-Taught to Shipping: My Dev Journey',
    excerpt:
      'No CS degree, no bootcamp — just curiosity, late nights, and a willingness to break things. My story from teaching assistant to freelance frontend developer.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80',
    tags: ['Career', 'Self-Taught', 'Motivation'],
    readTime: '6 min read',
    date: 'March 20, 2026',
  },
]

function loadData(id: string): PostData {
  try {
    const raw = localStorage.getItem(`blog_${id}`)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { liked: false, likes: Math.floor(Math.random() * 20) + 8, comments: [] }
}

function saveData(id: string, data: PostData) {
  localStorage.setItem(`blog_${id}`, JSON.stringify(data))
}

const Blog = () => {
  const [data, setData] = useState<Record<string, PostData>>({})

  useEffect(() => {
    const initial: Record<string, PostData> = {}
    posts.forEach((p) => {
      initial[p.id] = loadData(p.id)
    })
    setData(initial)
  }, [])

  const toggleLike = (id: string) => {
    setData((prev) => {
      const d = { ...prev }
      const cur = { ...d[id] }
      cur.liked = !cur.liked
      cur.likes += cur.liked ? 1 : -1
      d[id] = cur
      saveData(id, cur)
      return d
    })
  }

  const addComment = (id: string, name: string, text: string) => {
    setData((prev) => {
      const d = { ...prev }
      const cur = { ...d[id] }
      cur.comments = [
        ...cur.comments,
        { name: name || 'Anonymous', text, date: new Date().toLocaleDateString() },
      ]
      d[id] = cur
      saveData(id, cur)
      return d
    })
  }

  return (
    <section
      id="blog"
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
        <span className="section-label">BLOG</span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          Thoughts & <span className="gradient-text">Tutorials</span>
        </h2>
        <p style={{ color: '#A1A1AA', fontSize: 16, marginBottom: 48, maxWidth: 480 }}>
          Insights on web development, design, and the tools I use to build modern experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, i) => {
          const d = data[post.id]
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 100,
                        padding: '2px 12px',
                        fontSize: 11,
                        color: '#A1A1AA',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3
                  style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h3>

                <p style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 1.7, flex: 1 }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: '#52525B', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiCalendar size={12} /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FiClock size={12} /> {post.readTime}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    style={{
                      marginLeft: 'auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      color: '#A1A1AA',
                      fontSize: 12,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    Read full article <FiExternalLink size={12} />
                  </Link>
                </div>

                {d && (
                  <>
                    <div style={{ display: 'flex', gap: 16, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <button
                        onClick={() => toggleLike(post.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          color: d.liked ? '#FFFFFF' : '#52525B',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontFamily: 'inherit',
                          transition: 'color 0.2s',
                        }}
                        aria-label="Like this post"
                      >
                        <FiHeart size={15} fill={d.liked ? '#FFFFFF' : 'none'} />
                        {d.likes}
                      </button>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          color: '#52525B',
                          fontSize: 13,
                        }}
                      >
                        <FiMessageSquare size={15} />
                        {d.comments.length}
                      </span>
                    </div>

                    <CommentSection
                      postId={post.id}
                      comments={d.comments}
                      onAdd={addComment}
                    />
                  </>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

const CommentSection = ({
  postId,
  comments,
  onAdd,
}: {
  postId: string
  comments: Comment[]
  onAdd: (id: string, name: string, text: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(postId, name.trim(), text.trim())
    setName('')
    setText('')
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#A1A1AA',
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'inherit',
          padding: 0,
        }}
      >
        {open ? 'Hide comments' : `${comments.length > 0 ? `View ${comments.length} comment${comments.length > 1 ? 's' : ''}` : 'Add a comment'}`}
      </button>

      {open && (
        <div style={{ marginTop: 12 }}>
          {comments.map((c, i) => (
            <div
              key={i}
              style={{
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                fontSize: 13,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A1A1AA', fontSize: 11, marginBottom: 2 }}>
                <strong style={{ color: '#D4D4D8' }}>{c.name}</strong>
                <span>{c.date}</span>
              </div>
              <p style={{ color: '#A1A1AA', margin: 0 }}>{c.text}</p>
            </div>
          ))}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '10px 12px',
                color: '#FFFFFF',
                fontSize: 13,
                outline: 'none',
                fontFamily: 'inherit',
              }}
              aria-label="Your name"
            />
            <textarea
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={2}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '10px 12px',
                color: '#FFFFFF',
                fontSize: 13,
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              aria-label="Write a comment"
            />
            <button
              type="submit"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#FFFFFF',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
                alignSelf: 'flex-end',
              }}
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Blog

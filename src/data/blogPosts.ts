export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  tags: string[]
  readTime: string
  date: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'building-modern-web-apps',
    title: 'Building Modern Web Apps with React 19',
    excerpt:
      'React 19 introduces groundbreaking features like Actions, Server Components, and the new use() hook. In this post, I break down what these mean for frontend developers and how to get started.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: '6 min read',
    date: 'May 28, 2026',
    content: `
React 19 is here, and it's packed with features that fundamentally change how we build web applications. After spending the last few weeks experimenting with the release candidate, here is my breakdown of the most impactful changes.

## What's New in React 19

### React Actions

Actions are the biggest mental model shift since hooks. They let you handle form submissions, pending states, and optimistic updates in a declarative way:

\\\`\\\`\\\`tsx
function CommentForm() {
  const [state, formAction] = useActionState(async (prev, formData) => {
    const res = await fetch('/api/comment', {
      method: 'POST',
      body: formData,
    })
    return { success: res.ok }
  }, { success: false })

  return (
    <form action={formAction}>
      <textarea name="content" required />
      <button type="submit">Submit</button>
      {state.success && <p>Comment posted!</p>}
    </form>
  )
}
\\\`\\\`\\\` 

No more manual \`useState\` for loading, \`useEffect\` for submission, or error state handling. The \`useActionState\` hook handles it all.

### The \`use()\` Hook

This is subtle but powerful. \`use()\` lets you read a promise or context directly inside render — no hooks, no conditionals:

\\\`\\\`\\\`tsx
function Comments({ promise }) {
  const comments = use(promise)
  return comments.map(c => <Comment key={c.id} {...c} />)
}
\\\`\\\`\\\` 

Combined with Server Components, this enables seamless data fetching without \`useEffect\` waterfalls.

### Server Components (Stable)

Server Components are now production-ready. Components marked with \`.server.js\` run exclusively on the server, reducing the JavaScript bundle sent to the client.

## Should You Upgrade?

If you are starting a new project today, absolutely use React 19. For existing projects, the upgrade path is smooth — most breaking changes are around deprecated APIs like \`componentWillMount\` and legacy context.

The ecosystem (Next.js, Remix, Vite) already supports it. My portfolio here is built on React 19 with Vite, and the developer experience is noticeably smoother.

## Key Takeaways

- Actions simplify form handling dramatically
- \`use()\` eliminates the need for \`useEffect\` in data-fetching patterns
- Server Components reduce client-side JavaScript
- The upgrade is worth it for new and existing projects alike

Give it a try — your future self will thank you.
    `.trim(),
  },
  {
    id: 'threejs-3d-portfolio',
    title: 'Why I Use Three.js for My Portfolio',
    excerpt:
      'Adding 3D elements to a portfolio creates an unforgettable first impression. Here is how I built the interactive starfield and loading animation using Three.js and React Three Fiber.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    tags: ['Three.js', '3D', 'Animation'],
    readTime: '5 min read',
    date: 'May 15, 2026',
    content: `
When someone lands on your portfolio, you have roughly three seconds to make an impression. A starfield that responds to mouse movement and a 3D loading animation accomplishes that instantly.

## Why Three.js?

Three.js is the most mature WebGL library for JavaScript. It abstracts the complexity of raw WebGL while giving you full control over the rendering pipeline. For a portfolio, it strikes the perfect balance between visual impact and development speed.

## The Starfield

The background of this site uses 6,000 white stars and 2,000 additional particles distributed across a wide volume. Here's the core setup:

\\\`\\\`\\\`typescript
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 2000
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
\\\`\\\`\\\` 

Mouse parallax is achieved by mapping cursor coordinates to camera rotation:

\\\`\\\`\\\`typescript
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 0.5
  const y = (e.clientY / window.innerHeight - 0.5) * 0.3
  camera.position.x += (x - camera.position.x) * 0.05
  camera.position.y += (-y - camera.position.y) * 0.05
  camera.lookAt(0, 0, 0)
})
\\\`\\\`\\\` 

## The 3D Loading Screen

The loading screen features a rotating torus knot alongside an icosahedron with a ring of orbiting particles. This was built using a single \`useFrame\` loop in React Three Fiber:

\\\`\\\`\\\`typescript
useFrame((state) => {
  knot.rotation.x += 0.005
  knot.rotation.y += 0.01
  icosahedron.rotation.x += 0.008
  icosahedron.rotation.y -= 0.006
  particles.children.forEach((p, i) => {
    const angle = (i / 60) * Math.PI * 2 + state.clock.elapsedTime * 0.5
    p.position.x = Math.cos(angle) * 3
    p.position.z = Math.sin(angle) * 3
  })
})
\\\`\\\`\\\` 

## Performance Considerations

Three.js is remarkably performant when done right. Key optimizations:
- Use BufferGeometry (always)
- Limit draw calls by merging geometries
- Use \`PointsMaterial\` instead of individual meshes for particles
- Set \`frustumCulled = false\` on static objects

The starfield runs at a consistent 60fps alongside all the React components and GSAP animations on this page.

## Final Thoughts

Three.js transforms a portfolio from a list of links into an experience. It signals that you understand both the technical and creative sides of web development — exactly the message you want to send to potential clients or employers.
    `.trim(),
  },
  {
    id: 'tailwind-tips',
    title: 'Tailwind CSS v4 — What Changed and Why It Matters',
    excerpt:
      'Tailwind CSS v4 is a complete rewrite with CSS-first configuration, native cascade layers, and lightning-fast builds. A deep dive into the breaking changes and shiny new features.',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&q=80',
    tags: ['Tailwind CSS', 'CSS', 'Design'],
    readTime: '4 min read',
    date: 'April 30, 2026',
    content: `
Tailwind CSS v4 is not just an incremental update — it's a ground-up rewrite that changes how you configure and use the framework. This portfolio uses Tailwind v4, and here is what I learned migrating.

## CSS-First Configuration

The biggest change: \`tailwind.config.js\` is gone. You now configure everything in CSS using \`@theme\` directives:

\\\`\\\`\\\`css
@import "tailwindcss";

@theme {
  --color-glass: rgba(255, 255, 255, 0.04);
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
\\\`\\\`\\\` 

This means no more context-switching between CSS and JavaScript config files. Your design tokens live alongside your styles.

## Lightning-Fast Builds

Tailwind v4 uses a new Rust-based engine under the hood. Build times dropped from ~800ms to ~50ms in my experience. For larger projects, the difference is even more dramatic.

## Native Cascade Layers

Utility classes and component styles now use \`@layer\` under the hood:

\\\`\\\`\\\`css
@layer base {
  body { background: #000; color: #fff; }
}

@layer components {
  .glass {
    background: var(--color-glass);
    border: 1px solid var(--color-glass-border);
  }
}
\\\`\\\`\\\` 

This eliminates specificity battles between utilities and custom styles.

## Breaking Changes to Watch

- \`@tailwind\` directives replaced with \`@import "tailwindcss"\`
- \`@apply\` still works but is discouraged in favor of CSS cascade layers
- Some utility classes have been renamed (check the migration guide)
- Dark mode is now configured via \`@variant dark\`

## My Setup

I'm using the \`@tailwindcss/vite\` plugin which handles everything automatically. No PostCSS config needed:

\\\`\\\`\\\`ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    // ...
  ],
})
\\\`\\\`\\\` 

## Should You Upgrade?

If you're starting fresh, absolutely use v4. If you have an existing Tailwind project, the migration is straightforward but plan for a few hours to update your config. The performance gains alone make it worthwhile.
    `.trim(),
  },
  {
    id: 'gsap-animations',
    title: 'GSAP Scroll Animations That Wow Users',
    excerpt:
      'GreenSock is still the gold standard for performant scroll-driven animations. Learn how I created the pinned horizontal scroll and floating elements on this very portfolio.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    tags: ['GSAP', 'Animation', 'UX'],
    readTime: '7 min read',
    date: 'April 12, 2026',
    content: `
Animations should serve the user experience, not distract from it. GSAP (GreenSock Animation Platform) excels at this because it gives you frame-perfect control over every animation while staying performant.

## The Horizontal Pinned Scroll

The projects section on this portfolio uses GSAP's ScrollTrigger with horizontal scrolling — a setup that always impresses visitors:

\\\`\\\`\\\`typescript
useEffect(() => {
  const container = projectsRef.current
  const cards = container?.querySelector('.cards-track')
  if (!container || !cards) return

  const scrollWidth = cards.scrollWidth - container.clientWidth
  
  gsap.to(cards, {
    x: () => -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => \`+=\${scrollWidth}\`,
      invalidateOnRefresh: true,
    },
  })

  return () => ScrollTrigger.killAll()
}, [])
\\\`\\\`\\\` 

The key insight: \`pin: true\` keeps the section fixed while the inner track moves horizontally. The \`scrub: 1\` creates a smooth 1:1 tie between scroll position and animation progress.

## Floating Elements Animation

In the hero section, 8 tech icons and 20 gradient dots float upward using a \`FloatAnimation\` helper:

\\\`\\\`\\\`typescript
function floatAnimation(element: Element, index: number) {
  gsap.to(element, {
    y: -30 - Math.random() * 20,
    x: (Math.random() - 0.5) * 40,
    rotation: (Math.random() - 0.5) * 20,
    opacity: 0.6,
    duration: 3 + Math.random() * 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: index * 0.2,
  })
}
\\\`\\\`\\\` 

Each element moves independently thanks to randomized duration, offset, and distance — creating a natural, organic feel.

## GSAP vs CSS Animations

CSS animations are great for simple transitions (hover effects, fade-ins). But GSAP wins for:

- **Scroll-linked animations**: ScrollTrigger is unparalleled
- **Complex timelines**: Sequence animations with precise control
- **Performance**: GSAP uses \`requestAnimationFrame\` and avoids layout thrashing
- **Cross-browser consistency**: No prefix headaches

## Performance Tips

- Always use \`will-change: transform\` on animated elements
- Animate transforms and opacity only (they trigger compositing, not layout)
- Use \`ScrollTrigger.normalizeScroll()\` for smooth mobile scrolling
- Kill scroll triggers on component unmount to prevent memory leaks

## Final Thoughts

GSAP transformed my portfolio from a static page into an interactive experience. The learning curve is gentle — a few hours with their docs and you'll be creating animations that genuinely impress users.
    `.trim(),
  },
  {
    id: 'self-taught-dev-journey',
    title: 'From Self-Taught to Shipping: My Dev Journey',
    excerpt:
      'No CS degree, no bootcamp — just curiosity, late nights, and a willingness to break things. Here is my story from teaching assistant to freelance frontend developer.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80',
    tags: ['Career', 'Self-Taught', 'Motivation'],
    readTime: '6 min read',
    date: 'March 20, 2026',
    content: `
I didn't take the traditional route into software development. No computer science degree (well, I'm working on one now at the University of Abuja), no bootcamp certificate, no connections in tech. Just a browser, a text editor, and an stubborn belief that I could figure it out.

## How It Started

Back in 2021, I was working as an Assistant Instructor at Click & Smile. My job was teaching students computer fundamentals — basic typing, Microsoft Office, how to browse the web. Nothing glamorous, but it taught me something crucial: I loved helping people understand technology.

One day, a student asked me how websites were made. I gave the usual vague answer, went home, and Googled "how to build a website." That night, I wrote my first HTML file:

\\\`\\\`\\\`html
<!DOCTYPE html>
<html>
<head><title>My First Page</title></head>
<body><h1>Hello World</h1></body>
</html>
\\\`\\\`\\\` 

It wasn't much, but opening that file in a browser and seeing my words on screen felt like magic. I was hooked.

## The Self-Taught Grind

The next two years were a blur of tutorials, documentation rabbit holes, and broken projects. I started with freeCodeCamp, then moved to YouTube tutorials, then to building things that actually mattered to me.

My first real project was a calculator app. It was ugly, buggy, and took me three weeks. But it worked. I showed it to a friend, then another, and soon I had my first freelance gig — a simple landing page for a local business.

I charged almost nothing, but I didn't care. Someone paid me to write code.

## The Turning Point

By 2023, I had built enough small projects to feel confident. I learned React, then Next.js, then TypeScript. Each new technology felt impossible until I broke it down into small pieces:

1. Understand the "why" — what problem does this solve?
2. Build the smallest possible example
3. Break it, fix it, understand it
4. Build something real with it

This pattern has never failed me.

## Balancing University and Code

Starting my B.Sc. in Computer Science at the University of Abuja in 2025 was a deliberate choice. I wanted the theory, the structure, and the credentials. But balancing lectures with client work is the hardest thing I've done.

My day looks like this:
- Morning: lectures
- Afternoon: client work or personal projects
- Evening: study, documentation reading, experimenting with new tools

Weekends are for deep work — the kind where you lose track of time refactoring a component or debugging a tricky bug.

## What I've Learned

The biggest lesson: you don't need permission to start. No one is going to hand you a roadmap. You have to build your own.

Some concrete advice for other self-taught developers:

- **Build in public**: Share what you're learning on social media. It opens doors you can't predict.
- **Finish things**: Half-built projects teach you nothing. Ship something imperfect rather than perfecting nothing.
- **Specialize early**: I focused on frontend with React. Depth beats breadth when you're starting out.
- **Find community**: Discord servers, Twitter, local meetups — other devs are the fastest way to level up.

## Where I Am Now

Today I build production applications with React, TypeScript, Three.js, and modern CSS. I've shipped projects for real clients, built a portfolio with 3D animations, and I'm studying Computer Science at university.

I'm not where I want to be yet. But I'm miles from where I started.

And if you're reading this wondering if you can do it too — the answer is yes. Just open your editor and start.
    `.trim(),
  },
]

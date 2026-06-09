import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import About from '../components/About'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Testimonials from '../components/Testimonials'
import Blog from '../components/Blog'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import Starfield from '../components/Starfield'

const Home = () => {
  return (
    <>
      <Starfield />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Testimonials />
        <Blog />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home

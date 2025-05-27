import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Welcome from "../components/Welcome";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
function Home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
    </div>
  )
}

export default Home
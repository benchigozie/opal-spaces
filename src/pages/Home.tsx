import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Welcome from "../components/Welcome";
import Testimonials
 from "../components/Testimonials";
function Home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <Services />
      <Projects />
      <Testimonials />
    </div>
  )
}

export default Home
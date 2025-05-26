import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Welcome from "../components/Welcome";

function Home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <Services />
      <Projects />
    </div>
  )
}

export default Home
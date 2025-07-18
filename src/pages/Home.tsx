import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Welcome from "../components/Welcome";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import FeaturedProducts from "../components/FeaturedProducts";
import SignUp from "../components/NewsSignUp";



function Home() {

  return (
    <div>
      <Hero />
      <Welcome />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
      <FeaturedProducts />
      <SignUp />
    </div>
  )
}

export default Home
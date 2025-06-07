import OurPhilosophy from "../components/OurPhilosophy"
import WhoWeAre from "../components/WhoWeAre"
import WhyChooseUS from "../components/WhyChooseUS"
function About() {
  return (
    <div className="pt-12 bg-my-white">
      <WhoWeAre />
      <OurPhilosophy />
      <WhyChooseUS />
    </div>
  )
}

export default About
import Testimonial from "./Testimonial";

function Testimonials() {
  return (
    <section className="py-12 bg-very-light-wood px-4">
    <div className='max-w-[1300px] mx-auto flex flex-col gap-12'>
      <div className="flex flex-col items-center">
        <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Testimonials</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <Testimonial name="Vanessa A." comment="I wasn’t sure what style to go with, but they helped me find my style. Now I never want to leave my home." />
        <Testimonial name="David K." comment="Opal Spaces transformed my apartment into something out of a magazine. The attention to detail was next level" />
        <Testimonial name="Lana M." comment="Every piece I ordered arrived on time and looked even better in person. I'm obsessed with the quality." />
        <Testimonial name="Tolu R." comment="Opal Spaces gave my living room a total glow-up. My friends keep asking who styled it." />
        <Testimonial name="Chinedu O." comment="I had a few scattered ideas, but they somehow turned it all into a space that feels so me. I honestly didn’t think it could look this good." />
        <Testimonial name="Amara B." comment="Working with them was super easy. They really listened and just got it. The whole process felt smooth from start to finish." />
      </div>
    </div>
  </section>
  )
}

export default Testimonials
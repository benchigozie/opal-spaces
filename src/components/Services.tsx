import Service from '../components/Service';
import spacePlanning from '../assets/images/space-planning.webp';
import interiorDesign from '../assets/images/interior-design.webp';
import virtualDesign from '../assets/images/design-consultation.webp';
import opalStore from '../assets/images/opal-store.webp';
import residentialDesign from '../assets/images/residential.webp';
import stylingGuide from '../assets/images/design-guide.webp';

function Services() {
  return (
    <section className="py-12 bg-very-light-wood px-4">
      <div className='max-w-[1300px] mx-auto flex flex-col gap-12'>
        <div className="flex flex-col items-center">
          <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Our <span className="text-light-wood">Core</span> Services</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          <Service image={spacePlanning} name='Space Planning' description='Functional and aesthetic floor plans tailored to your lifestyle. Ideal for maximizing small or challenging spaces.' />
          <Service image={interiorDesign} name='Interior Design and Styling' description='Full or partial room transformations with curated layouts, color schemes, and personalized decor.' />
          <Service image={virtualDesign} name='Virtual Design Consultations' description='Personalized remote sessions offering expert guidance on layout andstyling.' />
          <Service image={opalStore} name='The Opal Store' description='An exclusive online selection of curated furnishings, lighting, and décor available on our store' />
          <Service image={residentialDesign} name='Residential Design Packages' description='End-to-end design support for home renovations, new builds, or room transformations aligned with your lifestyle and budget.' />
          <Service image={stylingGuide} name='Styling Guides' description='moodboards and room inspirations to help you confidently select the right pieces for your space.' />
        </div>
      </div>
    </section>
  )
}

export default Services;
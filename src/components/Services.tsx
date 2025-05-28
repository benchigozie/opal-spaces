import Service from '../components/Service';
import spacePlanning from '../assets/images/space-planning.webp';
import interiorDesign from '../assets/images/interior-design.webp';
import virtualDesign from '../assets/images/design-consultation.webp';
import opalStore from '../assets/images/opal-store.webp';
import residentialDesign from '../assets/images/residential.webp';
import stylingGuide from '../assets/images/design-guide.webp';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const servicesArray = [
  {
    name: 'Space Planning',
    description: 'Functional and aesthetic floor plans tailored to your lifestyle. Ideal for maximizing small or challenging spaces.',
    image: spacePlanning,
  },
  {
    name: 'Interior Design and Styling',
    description: 'Full or partial room transformations with curated layouts, color schemes, and personalized decor.',
    image: interiorDesign,
  },
  {
    name: 'Virtual Design Consultations',
    description: 'Personalized remote sessions offering expert guidance on layout and styling.',
    image: virtualDesign,
  },
  {
    name: 'The Opal Store',
    description: 'An exclusive online selection of curated furnishings, lighting, and décor available on our store.',
    image: opalStore,
  },
  {
    name: 'Residential Design Packages',
    description: 'End-to-end design support for home renovations, new builds, or room transformations aligned with your lifestyle and budget.',
    image: residentialDesign,
  },
  {
    name: 'Styling Guides',
    description: 'Moodboards and room inspirations to help you confidently select the right pieces for your space.',
    image: stylingGuide,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};


const cardVariants = {
  hidden: { opacity: 0, y: -70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function Services() {

  const servicesDivRef = useRef(null);
  const isInView = useInView(servicesDivRef, { once: true, margin: '-100px' });

  return (
    <section className="py-12 bg-very-light-wood px-4">
      <div className='max-w-[1300px] mx-auto flex flex-col gap-12'>
        <div className="flex flex-col items-center">
          <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Our <span className="text-light-wood">Core</span> Services</h2>
        </div>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
          ref={servicesDivRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {servicesArray.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Service
                key={index}
                name={service.name}
                description={service.description}
                image={service.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services;
import heroImage from "../assets/images/hero-image.webp";
import { motion } from "framer-motion"

function ShopHero() {
  return (
    <section
      className="relative flex items-center justify-center h-[80vh] md:h-screen bg-cover bg-center text-center text-my-white bg-[url('../assets/images/hero-bg.webp')] font-Inter px-4 md:px-0 z-0"
      style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="flex flex-col items-center justify-center max-w-[800px] gap-6 z-10 bg-my-brown/40 px-12 py-24 rounded-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -80 }}  
          animate={{ opacity: 1, y: 0 }}     
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold font-Inria"
        >Shop Our Interior Pieces</motion.h1>
      </div>
      <div className="absolute bg-my-black/50 w-full h-full"></div>
    </section>
  )
}

export default ShopHero;
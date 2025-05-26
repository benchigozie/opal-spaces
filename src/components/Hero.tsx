import Button from "./Button";
import heroImage from "../assets/images/hero-image.webp";
import { motion } from "framer-motion"

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center h-[80vh] md:h-screen bg-cover bg-center text-center text-my-white bg-[url('../assets/images/hero-bg.webp')] font-Inter px-4 md:px-0 z-0"
      style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="flex flex-col items-center justify-center max-w-[800px] gap-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -80 }}  
          animate={{ opacity: 1, y: 0 }}     
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold font-Inria"
        >Elevate Your Home into a Space You Love to Live In</motion.h1>
        <motion.p
        initial={{ opacity: 0}}  
        animate={{ opacity: 1}}     
        transition={{ duration: 1, ease: 'easeOut' }}
        >From full-service interior design to curated furniture, Opal Spaces brings elegance and intention to every detail of your home</motion.p>
        <motion.div 
         initial={{ opacity: 0, y: 80 }}  
         animate={{ opacity: 1, y: 0 }}     
         transition={{ duration: 1, ease: 'easeOut' }}
        className="flex gap-3"
        >
          <Button btnText="Start Project" className="bg-light-wood hover:bg-light-wood/0 hover:text-light-wood rounded-full border-1 border-light-wood hover:cursor-pointer" />
          <Button btnText="Shop Decor" className="hover:bg-light-wood rounded-full border-1 border-light-wood text-light-wood hover:text-my-white hover:cursor-pointer" />
        </motion.div>
      </div>
      <div className="absolute bg-my-black/50 w-full h-full"></div>
    </section>
  )
}

export default Hero
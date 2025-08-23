
function Welcome() {
 
  return (
    <section className="flex flex-col items-center py-12 px-4 bg-my-white relative overflow-clip">
        <div className="flex flex-col items-center font-Inter max-w-[800px] gap-2 z-10">
            <p className="text-my-black font-bold text-2xl">Beautiful Spaces. Designed To Suit Your Lifestyle</p>
            <p className="text-my-gray">At Opal Spaces, we blend creativity and functionality to transform interiors into timeless works of art. Whether you're looking to elevate your home, office, or boutique, our offerings bring your vision to life.</p>
        </div>
        <div className="rotate-45 absolute right-0 md:right-4">
            <div className="h-18 w-18 bg-light-wood/80 rounded-xl"></div>
            <div className="h-18 w-18 bg-my-gray/20 rounded-xl relative -top-15 -right-4"></div>
        </div>
    </section>
  )
}

export default Welcome
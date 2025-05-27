import Button from "../components/Button"

function CTA() {
  return (
    <section className="bg-gray-100 py-18 px-5 md:px-6 font-Inter relative z-0">
      <div className="max-w-[1300px] mx-auto">
        <div className="absolute -left-4 md:left-16 -rotate-45 -z-10">
          <div className="h-18 w-18 bg-light-wood/70 rounded-xl"></div>
          <div className="h-18 w-18 bg-my-gray/20 rounded-xl relative -top-15 -right-4"></div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="font-bold text-2xl text-my-black">Ready To Elevate Your Space?</p>
          <p className="text-my-gray">Let’s bring your vision to life. whether it’s a full makeover or just a few pieces that make a difference.</p>
          <Button btnText="Book a Consultation" className="bg-light-wood rounded-full text-my-white" />
        </div>
      </div>
    </section>
  )
}

export default CTA;
import Button from "./Button"

function CTA() {
  return (
    <section className="bg-gray-100 py-18 px-5 md:px-6 font-Inter">
        <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-2xl">Ready To Elevate Your Space?</p>
            <p>Let’s bring your vision to life. whether it’s a full makeover or just a few pieces that make a difference.</p>
            <Button btnText="Book a Consultation" className="bg-light-wood rounded-full text-my-white"/>
        </div>
    </section>
  )
}

export default CTA;
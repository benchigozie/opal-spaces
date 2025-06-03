import Button from "../components/Button";
import emailIcon from "../assets/images/email-icon.png"
import phoneIcon from "../assets/images/phone-icon.png"
import locationIcon from "../assets/images/location-icon.png"
import facebookIcon from "../assets/images/facebook-icon.png"
import instagramIcon from "../assets/images/instagram-icon.png"
import linkedinIcon from "../assets/images/linkedin-icon.png"

function Contact() {
  return (
    <section className="px-4 py-16 md:py-24 bg-my-white font-Inter text-my-gray">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Get In Touch</h2>
          </div>
          <p className="md:w-1/2 text-center">Have questions? Want to start styling your space? We’d love to hear from you. Fill out the form below or reach out directly and we’ll give you a call soon.</p>
        </div>
        <div className="shadow-md shadow-light-wood/50 bg-my-white rounded-2xl grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 min-h-[500px]">
          <div className="bg-light-wood text-my-white px-10 py-12 flex flex-col gap-8 rounded-2xl order-2 md:order-1">
            <h3 className="text-center font-bold">Contact Information</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <img src={emailIcon} alt="" className="w-10" />
                <p>opalspaces@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src={phoneIcon} alt="" className="w-10" />
                <a href="tel:+2347012345678" className="hover:underline">
                  +234 701 234 5678
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <img src={locationIcon} alt="" className="w-10" />
                <p>Location</p>
              </div>
            </div>
            <div className="h-full flex flex-col justify-end gap-2">
              <h4 className="text-center font-bold">Follow Us</h4>
              <div className="flex justify-center gap-4">
                <a href="#" className="hover:opacity-80">
                  <img src={facebookIcon} alt="Facebook" className="w-8" />
                </a>
                <a href="#" className="hover:opacity-80">
                  <img src={instagramIcon} alt="Instagram" className="w-8" />
                </a>
                <a href="#" className="hover:opacity-80">
                  <img src={linkedinIcon} alt="LinkedIn" className="w-8" />
                </a>
              </div>
            </div>
          </div>
          <form action="" className="order-1 md:order-2">
            <div className="py-12 px-8 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="first-name" className="text-my-brown">First Name</label>
                <input type="text" id="first-name" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="last-name" className="text-my-brown">Last Name</label>
                <input type="text" id="last-name" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-my-brown">Email</label>
                <input type="text" id="email" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone-number" className="text-my-brown">Phone Number</label>
                <input type="text" id="phone-number" className="rounded-full py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-my-brown">Message</label>
                <textarea id="message" rows={4} className="rounded-2xl resize-none py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown"></textarea>
              </div>
              <div className="flex justify-center pt-8">
                <Button btnText="Send Message" className="rounded-full text-my-white bg-light-wood" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
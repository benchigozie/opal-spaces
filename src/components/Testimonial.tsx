import quote from '../assets/images/quote.webp'

type TestimonialProps = {
    name : string,
    comment: string,
};

function Testimonial( { name, comment} : TestimonialProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-Inter bg-white rounded-xl py-12 px-8 md:px-10 shadow-md">
        <div>
            <img src={quote} alt="" className='rotate-180' />
        </div>
        <p className="text-my-gray">{comment}</p>
        <p className="font-bold text-my-black">- {name} -</p>
        <div>
            <img src={quote} alt="" />
        </div>
    </div>
  )
}

export default Testimonial
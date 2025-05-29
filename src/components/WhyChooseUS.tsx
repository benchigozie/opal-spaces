import whyChooseUs from '../assets/images/whychooseus.webp'

function WhyChooseUS() {
    return (
        <section className="bg-my-white py-12 px-4 font-Inter">
            <div className="flex flex-col gap-12 max-w-[1300px] mx-auto items-center">
                <div className="flex flex-col items-center  text-my-black">
                    <h2 className="font-Inria font-bold text-2xl md:text-3xl">Why Choose Us?</h2>
                </div>
                <div className='shadow-lg shadow-my-brown'>
                    <img src={whyChooseUs} alt="" />
                </div>
                <div className="text-my-gray">
                    <ul className="border-t-2 border-b-2 divide-y-2 border-light-wood divide-light-wood list-disc list-inside marker:text-light-wood">
                        <li className="px-4 py-1">Timeless, warm minimalism that elevates everyday living.</li>
                        <li className="px-4 py-1">A curated collection of furnishings designed to work beautifully together.</li>
                        <li className="px-4 py-1">Collaborative design with your lifestyle at the center.</li>
                        <li className="px-4 py-1">End-to-end experience. No need to hunt for pieces elsewhere.</li>
                        <li className="px-4 py-1">A small, dedicated team that cares about the details.</li>
                    </ul>
                    <p></p>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUS
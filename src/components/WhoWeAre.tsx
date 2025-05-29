import whoWeAre from '../assets/images/whoweare.webp'

function WhoWeAre() {
    return (
        <section className="bg-my-white py-12 px-4">
            <div className="flex flex-col gap-12 max-w-[1300px] mx-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Who We Are</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-my-gray font-Inter'>
                    <div className='px-6 md:px-10 border-l-4 border-l-light-wood h-full flex items-center'>
                        <p>At Opal Spaces, we believe that great design begins with feeling how a space holds you, moves you, and reflects your way ofliving. We’re a boutique interior studio crafting environments that blend calm simplicity with elevated style. We don’t chase trends. Instead, we design spaces that feel timeless and special, curated with care, layered with intention, and tailored to how you live. Whether you’re furnishing a new home or refreshing a favorite corner, we bring a thoughtful, collaborative approach that centers on what truly matters: how you feel in your space, how it supports your routine, and how it reflects who you are.</p>
                    </div>
                    <div className='relative'>
                        <div className="absolute top-3 left-3 w-full h-full bg-my-brown" />
                        <img src={whoWeAre} alt="" className='relative'/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhoWeAre
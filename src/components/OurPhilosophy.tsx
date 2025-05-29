import philosophy from '../assets/images/philosophy.webp'

function OurPhilosophy() {
    return (
        <section className="bg-very-light-wood py-12 px-4">
            <div className="flex flex-col gap-12 max-w-[1300px] mx-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-my-black font-Inria font-bold text-2xl md:text-3xl">Our Philosophy</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-my-gray font-Inter'>
                    <div className='px-6 md:px-10 border-l-4 border-l-light-wood h-full flex items-center'>
                        <p>We design with intention always prioritizing comfort, and clarity. <br /> <br />Our interiors are built around quality and ease, using our own collection of timeless pieces to bring every space to life. By keeping everything under one roof, from vision to final styling, we make the process seamless and cohesive. It’s not about following trends. It’s about creating a space that works for your life, and feels like home.</p>
                    </div>
                    <div className='relative'>
                        <div className="absolute top-3 left-3 w-full h-full bg-my-brown" />
                        <img src={philosophy} alt="" className='relative' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurPhilosophy
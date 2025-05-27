import logo from '../assets/images/logo.png'

function Footer() {
    return (
        <footer className='px-4 pt-20 bg-dull-brown text-my-white font-Inter'>
            <div className='max-w-[1300px] flex flex-col gap-3 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] mb-16'>
                    <div>
                        <img src={logo} alt="" className="h-14 md:h-24" />
                    </div>
                    <div className='flex justify-between md:justify-around'>
                        <div className='flex flex-col gap-2'>
                            <h4 className='font-bold'>Company</h4>
                            <ul>
                                <li>About Us</li>
                                <li>Portfolio</li>
                                <li>Services</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='font-bold'>Shop</h4>
                            <ul>
                                <li>Sofas</li>
                                <li>Coffee Tables</li>
                                <li>Chairs</li>
                                <li>Accessories</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h4 className='font-bold'>Connect</h4>
                            <ul>
                                <li>Instagram</li>
                                <li>Facebook</li>
                                <li>Email</li>
                                <li>Call Us Now</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className='h-[2px] bg-my-white' />
                <div className='mb-3'>
                    <p>&copy; 2025 Opal Spaces. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
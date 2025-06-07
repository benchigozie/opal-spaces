import trash from "../assets/images/trash.png"

function CartItem() {
    return (
        <div className='bg-white shadow-md rounded-lg p-6 gap-3 md:gap-5 flex'>
            <div>
                <img src="" alt="" className='bg-gray-200 w-25 h-25 rounded-lg' />
            </div>
            <div className='w-full'>
                <div>
                    <p className='font-Inria font-bold text-lg'>Product Name</p>
                </div>
                <div>
                    <p>Variation</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-light-wood font-semibold'>Price</p>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className='w-20 md:w-24 flex justify-between items-center'>
                            <button className='rounded-full outline-1 outline-light-wood/40 w-6 h-6 md:w-7 md:h-7 cursor-pointer'>-</button>
                            <span className=''>1</span>
                            <button className='rounded-full outline-1 outline-light-wood/40 w-6 h-6 md:w-7 md:h-7 cursor-pointer'>+</button>
                        </div>
                        <button>
                            <img src={trash} alt="" className="w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
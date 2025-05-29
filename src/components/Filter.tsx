import { FaSearch } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';


function Filter() {

    const options = ['Most Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'];

    const [selectedSort, setSelectedSort] = useState(options[0]);

    return (
        <div className="bg-my-white font-Inter flex justify-center shadow-md sticky top-14 z-20">
            <div className=' py-2 px-4 w-full'>
                <div className="max-w-[1300px] w-full flex justify-between">
                    <div className="flex items-center  bg-my-white outline-1 outline-light-wood rounded-full px-4 py-2">
                        <button>
                            <FaSearch className="text-gray-500 mr-2" />
                        </button>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="outline-none bg-transparent caret-light-wood text-my-gray"
                        />
                    </div>
                    <div className='flex items-center text-my-gray'>
                        <div>
                            <button>Most Popular</button>
                            <div className='absolute top-full bg-my-white flex flex-col'>
                                <div className='hover:bg-gray-300 py-[6px] px-3'><a href="">Most Popular</a></div>
                                <div className='hover:bg-gray-300 py-[6px] px-3'><a href="">Newest</a></div>
                                <div className='hover:bg-gray-300 py-[6px] px-3'><a href="">Price:Lowest to Highest</a></div>
                                <div className='hover:bg-gray-300 py-[6px] px-3'><a href="">Price:Highest to Lowest</a></div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter
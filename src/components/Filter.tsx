import { FaSearch } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';


function Filter() {

    const options = ['Most Popular', 'Newest', 'Price: Low to High', 'Price: High to Low'];

    const [filterMenuState, setFilterMenuState] = useState(true);
    const toggleFilterMenuState = () => setFilterMenuState(!filterMenuState);
    const dropDownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (!filterMenuState) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setFilterMenuState(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterMenuState]);

    return (
        <div className="bg-my-white font-Inter flex justify-center shadow-md sticky top-[44px] md:top-14 z-20">
            <div className=' py-2 px-4 w-full flex justify-center'>
                <div className="max-w-[1300px] w-full flex justify-between gap-4">
                    <div className="flex items-center  bg-my-white outline-1 outline-light-wood rounded-full px-4 py-2">
                        <button>
                            <FaSearch className="text-gray-500 mr-2" />
                        </button>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="outline-none bg-transparent caret-light-wood text-my-gray w-full"
                        />
                    </div>
                    <div className='flex items-center text-my-gray' >
                        <div className='outline-none' ref={dropDownRef}>
                            <button className="flex gap-4 items-center outline-none" onClick={toggleFilterMenuState}>
                                Most Popular <FaChevronDown />
                            </button>
                            {
                                filterMenuState && (
                                    <div className="absolute top-full bg-my-white flex flex-col shadow-md outline-none border-0">
                                        <div className="hover:bg-light-wood/50 px-4 py-[6px]">
                                            <a href="">Most Popular</a>
                                        </div>
                                        <div className="hover:bg-light-wood/50 px-4 py-[6px]">
                                            <a href="">Newest</a>
                                        </div>
                                        <div className="hover:bg-light-wood/50 px-4 py-[6px]">
                                            <a href="">Price: Low to High</a>
                                        </div>
                                        <div className="hover:bg-light-wood/50 px-4 py-[6px]">
                                            <a href="">Price: High to Low</a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter
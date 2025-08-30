import { FaChevronDown } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';


function Sort({ sortOption, setSortOption }: { sortOption: string, setSortOption: (option: string) => void }) {

    const [sortMenuState, setSortMenuState] = useState(false);
    const toggleFilterMenuState = () => setSortMenuState(!sortMenuState);
    const dropDownRef = useRef<HTMLDivElement | null>(null);

    const handleSortChange = (value: string) => {
        setSortOption(value);
        setSortMenuState(false);
    };

    useEffect(() => {

        if (!sortMenuState) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setSortMenuState(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sortMenuState]);

    return (
        <div className="bg-my-white font-Inter flex justify-center shadow-md sticky top-[44px] md:top-14">
            <div className=' py-2 px-4 w-full flex justify-center'>
                <div className="max-w-[1300px] w-full flex justify-between gap-4">
                    <SearchBar />
                    <div className='flex items-center text-my-gray' >
                        <div className='outline-none' ref={dropDownRef}>
                            <button onClick={toggleFilterMenuState} className="flex gap-4 items-center">
                                {sortOption === "popular" ? "Most Popular" :
                                    sortOption === "newest" ? "Newest" :
                                        sortOption === "oldest" ? "Oldest" :
                                            sortOption === "low-high" ? "Price: Low to High" :
                                                "Price: High to Low"} <FaChevronDown />
                            </button>
                            {sortMenuState && (
                                <div className="absolute top-full right-0 bg-my-white flex flex-col shadow-md">
                                    <button onClick={() => handleSortChange("popular")} className="px-4 w-full py-2 hover:bg-light-wood/50 text-left">Most Popular</button>
                                    <button onClick={() => handleSortChange("newest")} className="px-4 w-full py-2 hover:bg-light-wood/50 text-left">Newest</button>
                                    <button onClick={() => handleSortChange("oldest")} className="px-4 w-full py-2 hover:bg-light-wood/50 text-left">Oldest</button>
                                    <button onClick={() => handleSortChange("low-high")} className="px-4 w-full py-2 hover:bg-light-wood/50 text-left">Price: Low to High</button>
                                    <button onClick={() => handleSortChange("high-low")} className="px-4 w-full py-2 hover:bg-light-wood/50 text-left">Price: High to Low</button>
                                </div>
                            )}
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sort;
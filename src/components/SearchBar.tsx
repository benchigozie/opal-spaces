import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent } from 'react';

function SearchBar() {

    const [query, setQuery] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault(); 
        if (!query.trim()) return;

        navigate(`/search?q=${encodeURIComponent(query)}`);
    };


    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center bg-my-white outline-1 outline-light-wood rounded-full px-4 py-2"
        >
            <button type="submit">
                <FaSearch className="text-gray-500 mr-2" />
            </button>
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="outline-none bg-transparent caret-light-wood text-my-gray w-full"
            />
        </form>
    )
}

export default SearchBar;
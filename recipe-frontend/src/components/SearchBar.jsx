import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "all");

    const handleSearch = (e) => {
        e.preventDefault();

        // Build query string
        const params = new URLSearchParams();
        if (searchTerm) params.append("q", searchTerm);
        if (cuisine && cuisine !== "all") params.append("cuisine", cuisine);

        // Navigate to search results
        navigate(`/recipes?${params.toString()}`);
    };

    return (
        <div className="mb-8 rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800">
            <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="search"
                        placeholder="Search recipes..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 pl-9 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <select
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        className="h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white md:w-[180px]"
                    >
                        <option value="all">All Cuisines</option>
                        <option value="italian">Italian</option>
                        <option value="mexican">Mexican</option>
                        <option value="indian">Indian</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                        <option value="american">American</option>
                        <option value="french">French</option>
                        <option value="thai">Thai</option>
                        <option value="mediterranean">Mediterranean</option>
                    </select>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>

                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-[100px]"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
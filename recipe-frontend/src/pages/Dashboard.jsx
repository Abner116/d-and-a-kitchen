import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DashboardPage() {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        role: "user",
    });

    // In a real app, you would fetch the user data from your API
    useEffect(() => {
        // Simulate API call
        const fetchUser = async () => {
            // This would be replaced with an actual API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // In a real app, this would come from your authentication system
            setUser({
                name: "John Doe",
                email: "john@example.com",
                role: "user",
            });
        };

        fetchUser();
    }, []);

    const [activeTab, setActiveTab] = useState('saved');

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <Link to="/recipes/create" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Create Recipe
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="border rounded-lg p-4 shadow-sm">
                    <div className="pb-2">
                        <h2 className="text-xl font-semibold">Welcome back</h2>
                        <p className="text-sm text-gray-500">
                            {user.name} ({user.email})
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">
                            You are logged in as a {user.role}.
                        </p>
                    </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <div className="pb-2">
                        <h2 className="text-xl font-semibold">Saved Recipes</h2>
                        <p className="text-sm text-gray-500">
                            Your favorite recipes
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-gray-600">
                            You have 12 saved recipes
                        </p>
                    </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <div className="pb-2">
                        <h2 className="text-xl font-semibold">Your Recipes</h2>
                        <p className="text-sm text-gray-500">
                            Recipes you've created
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-gray-600">
                            You have created 5 recipes
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'saved'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Saved Recipes
                        </button>
                        <button
                            onClick={() => setActiveTab('created')}
                            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'created'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Your Recipes
                        </button>
                    </nav>
                </div>

                <div className="mt-4">
                    {activeTab === 'saved' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* This would typically be replaced with actual recipe data */}
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="border rounded-lg overflow-hidden shadow-sm">
                                    <div className="h-48 bg-gray-200"></div>
                                    <div className="p-4">
                                        <h3 className="font-medium">Sample Recipe {item}</h3>
                                        <p className="text-sm text-gray-600 mt-1">A delicious recipe sample</p>
                                        <div className="flex items-center mt-2">
                                            <span className="text-yellow-500">★★★★☆</span>
                                            <span className="ml-1 text-sm text-gray-600">4.0</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'created' && (
                        <div className="text-center py-8">
                            <h3 className="text-lg font-medium mb-2">You haven't created any recipes yet</h3>
                            <p className="text-gray-600 mb-4">Start sharing your culinary creations with the world</p>
                            <Link
                                to="/recipes/create"
                                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Create Recipe
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
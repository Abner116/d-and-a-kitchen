import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function DashboardPage() {
    const { user, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('saved');
    const [recipeStats] = useState({
        saved: 12,
        created: 5
    });

    // Check if user has admin role
    const isAdmin = user?.role === 'admin';

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <Link to="/recipes/create" className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Create Recipe
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="border border-orange-100 rounded-lg p-4 shadow-sm">
                    <div className="pb-2">
                        <h2 className="text-xl font-semibold">Welcome back</h2>
                        <p className="text-sm text-gray-500">
                            {user?.username || 'User'} ({user?.email || 'Not available'})
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">
                            You are logged in as a {user?.role || 'user'}.
                        </p>
                        {isAdmin && (
                            <Link to="/admin" className="mt-2 inline-block text-sm text-orange-500 hover:underline">
                                Go to Admin Panel
                            </Link>
                        )}
                    </div>
                </div>

                <div className="border border-orange-100 rounded-lg p-4 shadow-sm">
                    <div className="pb-2">
                        <h2 className="text-xl font-semibold">Saved Recipes</h2>
                        <p className="text-sm text-gray-500">
                            Your favorite recipes
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-orange-500">{recipeStats.saved}</p>
                        <p className="text-sm text-gray-600">
                            You have {recipeStats.saved} saved recipes
                        </p>
                    </div>
                </div>

                <div className="border border-orange-100 rounded-lg p-4 shadow-sm">
                    <div className="pb-2">
                        <h2 className="text-xl font-semibold">Your Recipes</h2>
                        <p className="text-sm text-gray-500">
                            Recipes you've created
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-orange-500">{recipeStats.created}</p>
                        <p className="text-sm text-gray-600">
                            You have created {recipeStats.created} recipes
                        </p>
                    </div>
                </div>
            </div>

            {isAdmin && (
                <div className="mt-6 border border-orange-100 rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold mb-3">Admin Quick Actions</h2>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            to="/admin"
                            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                        >
                            Manage Recipes
                        </Link>
                        <Link
                            to="/admin?section=users"
                            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                        >
                            Manage Users
                        </Link>
                        <Link
                            to="/admin?section=settings"
                            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                        >
                            Site Settings
                        </Link>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'saved'
                                ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Saved Recipes
                        </button>
                        <button
                            onClick={() => setActiveTab('created')}
                            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'created'
                                ? 'border-orange-500 text-orange-600'
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
                                <div key={item} className="border border-orange-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-48 bg-orange-100"></div>
                                    <div className="p-4">
                                        <h3 className="font-medium">Sample Recipe {item}</h3>
                                        <p className="text-sm text-gray-600 mt-1">A delicious recipe sample</p>
                                        <div className="flex items-center mt-2">
                                            <span className="text-orange-400">★★★★☆</span>
                                            <span className="ml-1 text-sm text-gray-600">4.0</span>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <Link to={`/recipes/${item}`} className="text-sm text-orange-500 hover:text-orange-600">
                                                View
                                            </Link>
                                            <button className="text-sm text-red-500 hover:text-red-600">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'created' && (
                        <>
                            {recipeStats.created > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* This would be replaced with actual created recipes */}
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div key={item} className="border border-orange-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <div className="h-48 bg-orange-50"></div>
                                            <div className="p-4">
                                                <h3 className="font-medium">My Recipe {item}</h3>
                                                <p className="text-sm text-gray-600 mt-1">Created by you</p>
                                                <div className="flex items-center mt-2">
                                                    <span className="text-orange-400">★★★★☆</span>
                                                    <span className="ml-1 text-sm text-gray-600">4.0</span>
                                                </div>
                                                <div className="flex gap-2 mt-3">
                                                    <Link to={`/recipes/${item}`} className="text-sm text-orange-500 hover:text-orange-600">
                                                        View
                                                    </Link>
                                                    <Link to={`/recipes/edit/${item}`} className="text-sm text-blue-500 hover:text-blue-600">
                                                        Edit
                                                    </Link>
                                                    <button className="text-sm text-red-500 hover:text-red-600">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                    <div className="text-center py-8">
                                        <h3 className="text-lg font-medium mb-2">You haven't created any recipes yet</h3>
                                        <p className="text-gray-600 mb-4">Start sharing your culinary creations with the world</p>
                                        <Link
                                            to="/recipes/create"
                                            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                                        >
                                            Create Recipe
                                        </Link>
                                    </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
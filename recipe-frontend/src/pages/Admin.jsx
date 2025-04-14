import React, { useState, useEffect } from 'react';

function AdminDashboard() {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('recipes');

	useEffect(() => {
		// Simple fetch for recipes
		const fetchRecipes = async () => {
			try {
				const response = await fetch('https://dummyjson.com/recipes?limit=10');
				const data = await response.json();
				setRecipes(data.recipes || []);
			} catch (error) {
				console.error('Error fetching recipes:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, []);

	// Simple delete handler
	const handleDelete = (id) => {
		setRecipes(recipes.filter(recipe => recipe.id !== id));
		alert(`Recipe ${id} deleted`);
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Header */}
			<div className="bg-white border-b shadow-sm">
				<div className="container mx-auto px-4 py-6">
					<h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
				</div>
			</div>

			<div className="container mx-auto px-4 py-6">
				{/* Modern tabs */}
				<div className="bg-white rounded-lg shadow-sm mb-6">
					<div className="flex border-b">
						<button
							className={`px-6 py-3 font-medium text-sm transition-colors duration-200 relative ${
								activeTab === 'recipes' 
									? 'text-orange-600 font-bold' 
									: 'text-gray-600 hover:text-orange-500'
							}`}
							onClick={() => setActiveTab('recipes')}
						>
							Recipes
							{activeTab === 'recipes' && (
								<span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
							)}
						</button>
						<button
							className={`px-6 py-3 font-medium text-sm transition-colors duration-200 relative ${
								activeTab === 'users' 
									? 'text-orange-600 font-bold' 
									: 'text-gray-600 hover:text-orange-500'
							}`}
							onClick={() => setActiveTab('users')}
						>
							Users
							{activeTab === 'users' && (
								<span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
							)}
						</button>
						<button
							className={`px-6 py-3 font-medium text-sm transition-colors duration-200 relative ${
								activeTab === 'settings' 
									? 'text-orange-600 font-bold' 
									: 'text-gray-600 hover:text-orange-500'
							}`}
							onClick={() => setActiveTab('settings')}
						>
							Settings
							{activeTab === 'settings' && (
								<span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
							)}
						</button>
					</div>
				</div>

				{/* Content based on active tab */}
				<div className="bg-white rounded-lg shadow-sm p-6">
					{activeTab === 'recipes' && (
						<div>
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-semibold text-gray-800">Manage Recipes</h2>
								<button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
									</svg>
									Add New Recipe
								</button>
							</div>

							{loading ? (
								<div className="flex justify-center py-8">
									<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
								</div>
							) : (
								<div className="overflow-x-auto rounded-lg border border-gray-200">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuisine</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{recipes.map((recipe) => (
												<tr key={recipe.id} className="hover:bg-gray-50 transition-colors duration-150">
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{recipe.id}</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<img src={recipe.image} alt={recipe.name} className="h-12 w-12 object-cover rounded-md shadow-sm" />
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{recipe.name}</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{recipe.cuisine}</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm">
														<button className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1.5 rounded-md mr-2 transition-colors duration-300">
															Edit
														</button>
														<button
															className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-md transition-colors duration-300"
															onClick={() => handleDelete(recipe.id)}
														>
															Delete
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					)}

					{activeTab === 'users' && (
						<div>
							<h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Users</h2>
							<div className="bg-orange-50 border border-orange-100 rounded-md p-5 text-orange-800">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<div className="ml-3">
										<p className="text-sm">User management functionality will be implemented here.</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'settings' && (
						<div>
							<h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
							<div className="space-y-6">
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-700">Site Title</label>
									<input 
										type="text" 
										defaultValue="Recipe Book" 
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
									/>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
									<textarea 
										defaultValue="A collection of delicious recipes" 
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										rows="4"
									></textarea>
								</div>
								<button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition-colors duration-300">
									Save Settings
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
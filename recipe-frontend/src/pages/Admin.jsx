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
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

			{/* Simple tabs */}
			<div className="flex border-b mb-6">
				<button
					className={`px-4 py-2 ${activeTab === 'recipes' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
					onClick={() => setActiveTab('recipes')}
				>
					Recipes
				</button>
				<button
					className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
					onClick={() => setActiveTab('users')}
				>
					Users
				</button>
				<button
					className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
					onClick={() => setActiveTab('settings')}
				>
					Settings
				</button>
			</div>

			{/* Content based on active tab */}
			{activeTab === 'recipes' && (
				<div>
					<div className="flex justify-between mb-4">
						<h2 className="text-xl font-semibold">Manage Recipes</h2>
						<button className="bg-green-500 text-white px-4 py-2 rounded">Add New Recipe</button>
					</div>

					{loading ? (
						<p>Loading recipes...</p>
					) : (
						<div className="overflow-x-auto">
							<table className="min-w-full bg-white border">
								<thead className="bg-gray-100">
									<tr>
										<th className="border px-4 py-2">ID</th>
										<th className="border px-4 py-2">Image</th>
										<th className="border px-4 py-2">Name</th>
										<th className="border px-4 py-2">Cuisine</th>
										<th className="border px-4 py-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{recipes.map((recipe) => (
										<tr key={recipe.id}>
											<td className="border px-4 py-2">{recipe.id}</td>
											<td className="border px-4 py-2">
												<img src={recipe.image} alt={recipe.name} className="h-12 w-12 object-cover" />
											</td>
											<td className="border px-4 py-2">{recipe.name}</td>
											<td className="border px-4 py-2">{recipe.cuisine}</td>
											<td className="border px-4 py-2">
												<button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
												<button
													className="bg-red-500 text-white px-2 py-1 rounded"
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
					<h2 className="text-xl font-semibold mb-4">Manage Users</h2>
					<p>User management functionality will be implemented here.</p>
				</div>
			)}

			{activeTab === 'settings' && (
				<div>
					<h2 className="text-xl font-semibold mb-4">Settings</h2>
					<div className="bg-white p-4 border rounded">
						<div className="mb-4">
							<label className="block mb-1 font-medium">Site Title</label>
							<input type="text" defaultValue="Recipe Book" className="w-full border p-2 rounded" />
						</div>
						<div className="mb-4">
							<label className="block mb-1 font-medium">Description</label>
							<textarea defaultValue="A collection of delicious recipes" className="w-full border p-2 rounded"></textarea>
						</div>
						<button className="bg-blue-500 text-white px-4 py-2 rounded">Save Settings</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminDashboard;
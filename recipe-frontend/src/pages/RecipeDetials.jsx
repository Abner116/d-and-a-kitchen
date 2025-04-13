import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/recipes/${id}`);
                if (!response.ok) throw new Error('Failed to fetch recipe');
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const toggleSave = () => {
        setIsSaved(!isSaved);
        // In a real app, you would call your API to save/unsave the recipe
    };

    if (loading) {
        return <RecipeDetailSkeleton />;
    }

    if (!recipe) {
        return (
            <div className="container mx-auto py-16 text-center">
                <h1 className="text-2xl font-bold">Recipe not found</h1>
                <p className="mt-4">The recipe you're looking for doesn't exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                    <img
                        src={recipe.image || "/placeholder.svg?height=400&width=600"}
                        alt={recipe.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div>
                    <h1 className="mb-2 text-3xl font-bold">{recipe.name}</h1>

                    <div className="mb-4 flex flex-wrap gap-2">
                        {recipe.tags.map(tag => (
                            <span key={tag} className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm">
                                {tag}
                            </span>
                        ))}
                        <span className="inline-block rounded-full border border-gray-300 px-3 py-1 text-sm">
                            {recipe.cuisine}
                        </span>
                        {recipe.mealType.map(type => (
                            <span key={type} className="inline-block rounded-full border border-gray-300 px-3 py-1 text-sm">
                                {type}
                            </span>
                        ))}
                    </div>

                    <div className="mb-6 flex items-center gap-2">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}>
                                    {star <= Math.round(recipe.rating) ? "★" : "☆"}
                                </span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">({recipe.reviewCount} reviews)</span>
                        <div className="ml-4">
                            <span className={`inline-block rounded px-2 py-1 text-xs font-bold text-white ${recipe.difficulty === "Easy"
                                    ? "bg-green-500"
                                    : recipe.difficulty === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                }`}>
                                {recipe.difficulty}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex flex-col items-center rounded-lg bg-gray-100 p-3">
                            <span className="mb-1 text-gray-500">⏱️</span>
                            <span className="text-sm font-medium">Prep Time</span>
                            <span className="text-sm">{recipe.prepTimeMinutes} min</span>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-100 p-3">
                            <span className="mb-1 text-gray-500">🔥</span>
                            <span className="text-sm font-medium">Cook Time</span>
                            <span className="text-sm">{recipe.cookTimeMinutes} min</span>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-100 p-3">
                            <span className="mb-1 text-gray-500">👥</span>
                            <span className="text-sm font-medium">Servings</span>
                            <span className="text-sm">{recipe.servings}</span>
                        </div>
                        <div className="flex flex-col items-center rounded-lg bg-gray-100 p-3">
                            <span className="mb-1 text-gray-500">👨‍🍳</span>
                            <span className="text-sm font-medium">Calories</span>
                            <span className="text-sm">{recipe.caloriesPerServing}</span>
                        </div>
                    </div>

                    <button
                        onClick={toggleSave}
                        className={`w-full rounded-md py-2 px-4 font-medium ${isSaved
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        {isSaved ? "Saved to Favorites" : "Save to Favorites"}
                    </button>
                </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div className="border rounded-lg p-6 shadow-sm">
                    <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>
                    <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                                <span className="mr-2 mt-1 block h-2 w-2 rounded-full bg-blue-600"></span>
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="border rounded-lg p-6 shadow-sm">
                    <h2 className="mb-4 text-2xl font-bold">Instructions</h2>
                    <ol className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex">
                                <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                                    {index + 1}
                                </span>
                                <p>{instruction}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

function RecipeDetailSkeleton() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="aspect-video w-full rounded-lg bg-gray-200 animate-pulse"></div>

                <div>
                    <div className="mb-2 h-10 w-3/4 bg-gray-200 animate-pulse rounded"></div>

                    <div className="mb-4 flex flex-wrap gap-2">
                        <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>

                    <div className="mb-6">
                        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
                        <div className="mt-1 h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="h-20 rounded-lg bg-gray-200 animate-pulse"></div>
                        <div className="h-20 rounded-lg bg-gray-200 animate-pulse"></div>
                        <div className="h-20 rounded-lg bg-gray-200 animate-pulse"></div>
                        <div className="h-20 rounded-lg bg-gray-200 animate-pulse"></div>
                    </div>

                    <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse"></div>
                </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div className="h-64 rounded-lg bg-gray-200 animate-pulse"></div>
                <div className="h-64 rounded-lg bg-gray-200 animate-pulse"></div>
            </div>
        </div>
    );
}

export default RecipeDetailPage;
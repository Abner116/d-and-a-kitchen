import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function RecipeList({ limit = 12, searchTerm = "", cuisine = "" }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, cuisine]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        let url;
        if (searchTerm && searchTerm.trim() !== "") {
          url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm.trim())}`;
          console.log("Searching with term:", searchTerm);
        } else {
          url = `https://dummyjson.com/recipes?limit=${limit}&skip=${(currentPage - 1) * limit}`;
        }

        console.log("Fetching recipes from URL:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        console.log("API response:", data);

        // Filter by cuisine if specified (client-side filtering)
        let filteredRecipes = data.recipes || [];
        if (cuisine && cuisine !== "all") {
          console.log("Filtering by cuisine:", cuisine);
          filteredRecipes = filteredRecipes.filter(
            (recipe) => recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
          );

          setTotalPages(Math.max(1, Math.ceil(filteredRecipes.length / limit)));
        } else {
          setTotalPages(Math.max(1, Math.ceil(data.total / limit)));
        }

        setRecipes(filteredRecipes);
        console.log("Filtered recipes count:", filteredRecipes.length);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError(error.message);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage, limit, searchTerm, cuisine]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {Array.from({ length: limit }).map((_, index) => (
          <RecipeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-2">Error loading recipes</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-2">No recipes found</h3>
        <p className="text-gray-600 mb-6">
          {searchTerm || cuisine !== "all"
            ? "Try adjusting your search or filter criteria"
            : "There are no recipes available at this time"}
        </p>
        {(searchTerm || cuisine !== "all") && (
          <Link to="/recipes" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
            View all recipes
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      {searchTerm && (
        <p className="mb-4 text-gray-700">
          Showing results for: <span className="font-semibold">"{searchTerm}"</span>
          {cuisine && cuisine !== "all" && (
            <span> in <span className="font-semibold">{cuisine}</span> cuisine</span>
          )}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 my-8">
          <button
            className="px-4 py-2 rounded bg-white border border-gray-300 hover:border-orange-500 disabled:opacity-50 disabled:hover:border-gray-300"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-300 hover:border-orange-500"
                  }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 rounded bg-white border border-gray-300 hover:border-orange-500 disabled:opacity-50 disabled:hover:border-gray-300"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <LazyLoadImage
          alt={recipe.name}
          effect="blur"
          src={recipe.image || "https://placehold.co/600x400/orange/white?text=Recipe"}
          className="w-full h-full object-cover"
        />

      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">{recipe.cuisine}</span>
          {recipe.tags && recipe.tags.slice(0, 1).map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{recipe.name}</h3>
        <div className="flex text-amber-400 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`${i < recipe.difficulty ? "text-amber-400" : "text-gray-300"}`}>★</span>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat size={16} />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link
          to={`/recipes/${recipe.id}`}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-md transition-colors"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}

function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <span className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></span>
          <span className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></span>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}

export default RecipeList;
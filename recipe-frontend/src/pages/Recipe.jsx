import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { useSearchParams } from 'react-router-dom';

function RecipesPage() {
    // Get search parameters from URL
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("q") || "";
    const cuisine = searchParams.get("cuisine") || "all";

    return (
        <div className="container mx-auto py-8">
            <h1 className="mb-6 text-3xl font-bold">All Recipes</h1>

            <SearchBar />

            <RecipeList searchTerm={searchTerm} cuisine={cuisine} />
        </div>
    );
}

export default RecipesPage;
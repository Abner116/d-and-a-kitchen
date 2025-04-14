import React from 'react';
import HeroSection from '../components/HeroSection';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import { FeaturedCategories } from '../components/FeaturedCategories';

function HomePage() {
    return (
        <div>
            <HeroSection />

            <div className="container mx-auto py-12">
                <SearchBar />

                <FeaturedCategories />

                <section className="mt-12">
                    <h2 className="mb-6 text-3xl font-bold">Popular Recipes</h2>
                    <RecipeList limit={6} searchTerm="" cuisine="all" />
                </section>
            </div>
        </div>
    );
}

export default HomePage;
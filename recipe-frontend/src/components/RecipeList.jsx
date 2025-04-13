// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Clock, ChefHat } from 'lucide-react';

// function RecipeList({ limit = 12, searchTerm = "", cuisine = "" }) {
//     const [recipes, setRecipes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             try {
//                 setLoading(true);

//                 // Build the API URL with query parameters
//                 let url = `https://dummyjson.com/recipes?limit=${limit}&skip=${(currentPage - 1) * limit}`;

//                 if (searchTerm) {
//                     url += `&q=${encodeURIComponent(searchTerm)}`;
//                 }

//                 const response = await fetch(url);
//                 if (!response.ok) throw new Error('Failed to fetch recipes');
//                 const data = await response.json();

//                 // Filter by cuisine if specified (client-side filtering since the API doesn't support it)
//                 let filteredRecipes = data.recipes || [];
//                 if (cuisine && cuisine !== "all") {
//                     filteredRecipes = filteredRecipes.filter(
//                         (recipe) => recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
//                     );
//                 }

//                 setRecipes(filteredRecipes);
//                 setTotalPages(Math.ceil(data.total / limit));
//             } catch (error) {
//                 console.error('Error fetching recipes:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecipes();
//     }, [currentPage, limit, searchTerm, cuisine]);

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="recipe-grid">
//                 {Array.from({ length: limit }).map((_, index) => (
//                     <RecipeCardSkeleton key={index} />
//                 ))}
//             </div>
//         );
//     }

//     if (recipes.length === 0) {
//         return (
//             <div className="no-recipes">
//                 <h3>No recipes found</h3>
//                 <p>Try adjusting your search or filter criteria</p>
//                 <Link to="/recipes" className="view-all-button">
//                     View all recipes
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="recipe-grid">
//                 {recipes.map((recipe) => (
//                     <RecipeCard key={recipe.id} recipe={recipe} />
//                 ))}
//             </div>

//             {totalPages > 1 && (
//                 <div className="pagination">
//                     <button
//                         className="pagination-button"
//                         onClick={handlePreviousPage}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     <div className="page-numbers">
//                         {Array.from({ length: totalPages }, (_, i) => (
//                             <button
//                                 key={i}
//                                 className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
//                                 onClick={() => setCurrentPage(i + 1)}
//                             >
//                                 {i + 1}
//                             </button>
//                         ))}
//                     </div>
//                     <button
//                         className="pagination-button"
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// function RecipeCard({ recipe }) {
//     return (
//         <div className="recipe-card">
//             <div className="recipe-image-container">
//                 <img
//                     src={recipe.image || "/placeholder.svg?height=400&width=600"}
//                     alt={recipe.name}
//                     className="recipe-image"
//                 />
//             </div>
//             <div className="recipe-content">
//                 <div className="recipe-badges">
//                     <span className="badge">{recipe.cuisine}</span>
//                     {recipe.tags && recipe.tags.slice(0, 1).map(tag => (
//                         <span key={tag} className="badge badge-outline">{tag}</span>
//                     ))}
//                 </div>
//                 <h3 className="recipe-title">{recipe.name}</h3>
//                 <div className="recipe-rating">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                         <span key={i} className={`star ${i < recipe.difficulty ? "filled" : ""}`}>★</span>
//                     ))}
//                 </div>
//                 <div className="recipe-meta">
//                     <div className="recipe-time">
//                         <Clock className="icon" />
//                         <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
//                     </div>
//                     <div className="recipe-servings">
//                         <ChefHat className="icon" />
//                         <span>{recipe.servings} servings</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="recipe-footer">
//                 <Link
//                     to={`/recipes/${recipe.id}`}
//                     className="view-recipe-button"
//                 >
//                     View Recipe
//                 </Link>
//             </div>
//         </div>
//     );
// }

// function RecipeCardSkeleton() {
//     return (
//         <div className="recipe-card skeleton">
//             <div className="recipe-image-container skeleton-image"></div>
//             <div className="recipe-content">
//                 <div className="recipe-badges">
//                     <span className="skeleton-badge"></span>
//                     <span className="skeleton-badge"></span>
//                 </div>
//                 <div className="skeleton-title"></div>
//                 <div className="skeleton-rating"></div>
//                 <div className="recipe-meta">
//                     <div className="skeleton-meta"></div>
//                     <div className="skeleton-meta"></div>
//                 </div>
//             </div>
//             <div className="recipe-footer">
//                 <div className="skeleton-button"></div>
//             </div>
//         </div>
//     );
// }

// export default RecipeList;
import React from 'react'

const RecipeList = () => {
  return (
    <div>RecipeList</div>
  )
}

export default RecipeList
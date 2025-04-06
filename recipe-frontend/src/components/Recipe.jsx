"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ChefHat } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StarRating } from "@/components/star-rating"

interface Recipe {
    id: number
    name: string
    prepTimeMinutes: number
    cookTimeMinutes: number
    servings: number
    difficulty: string
    cuisine: string
    tags: string[]
    image: string
    rating: number
}

interface RecipeListProps {
    limit?: number
    searchTerm?: string
    cuisine?: string
}

export function RecipeList({ limit = 12, searchTerm = "", cuisine = "" }: RecipeListProps) {
    const [recipes, setRecipes] = useState < Recipe[] > ([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true)

                // Build the API URL with query parameters
                let url = `https://dummyjson.com/recipes?limit=${limit}&skip=${(currentPage - 1) * limit}`

                if (searchTerm) {
                    url += `&q=${encodeURIComponent(searchTerm)}`
                }

                const response = await fetch(url)
                if (!response.ok) throw new Error("Failed to fetch recipes")
                const data = await response.json()

                // Filter by cuisine if specified (client-side filtering since the API doesn't support it)
                let filteredRecipes = data.recipes || []
                if (cuisine && cuisine !== "all") {
                    filteredRecipes = filteredRecipes.filter(
                        (recipe: Recipe) => recipe.cuisine.toLowerCase() === cuisine.toLowerCase(),
                    )
                }

                setRecipes(filteredRecipes)
                setTotalPages(Math.ceil(data.total / limit))
            } catch (error) {
                console.error("Error fetching recipes:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecipes()
    }, [currentPage, limit, searchTerm, cuisine])

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: limit }).map((_, index) => (
                    <RecipeCardSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (recipes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="mb-2 text-xl font-medium">No recipes found</h3>
                <p className="mb-6 text-muted-foreground">Try adjusting your search or filter criteria</p>
                <Button asChild variant="outline">
                    <Link href="/recipes">View all recipes</Link>
                </Button>
            </div>
        )
    }

    return (
        <div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i}
                                variant={currentPage === i + 1 ? "default" : "outline"}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <Card className="overflow-hidden">
            <div className="relative aspect-video">
                <Image
                    src={recipe.image || "/placeholder.svg?height=400&width=600"}
                    alt={recipe.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <CardContent className="p-4">
                <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{recipe.cuisine}</Badge>
                    {recipe.tags &&
                        recipe.tags.slice(0, 1).map((tag) => (
                            <Badge key={tag} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                </div>
                <h3 className="mb-2 line-clamp-1 text-xl font-bold">{recipe.name}</h3>
                <div className="mb-2">
                    <StarRating rating={recipe.difficulty} />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        <span>{recipe.servings} servings</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link
                    href={`/recipes/${recipe.id}`}
                    className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    View Recipe
                </Link>
            </CardFooter>
        </Card>
    )
}

function RecipeCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <CardContent className="p-4">
                <div className="mb-2 flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-2 h-4 w-24" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Skeleton className="h-9 w-full" />
            </CardFooter>
        </Card>
    )
}


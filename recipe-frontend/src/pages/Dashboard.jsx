"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecipeList } from "@/components/recipe-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function DashboardPage() {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        role: "user",
    })

    // In a real app, you would fetch the user data from your API
    useEffect(() => {
        // Simulate API call
        const fetchUser = async () => {
            // This would be replaced with an actual API call
            await new Promise((resolve) => setTimeout(resolve, 500))

            // In a real app, this would come from your authentication system
            setUser({
                name: "John Doe",
                email: "john@example.com",
                role: "user",
            })
        }

        fetchUser()
    }, [])

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Recipe
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>
                            {user.name} ({user.email})
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">You are logged in as a {user.role}.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Saved Recipes</CardTitle>
                        <CardDescription>Your favorite recipes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">You have 12 saved recipes</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Your Recipes</CardTitle>
                        <CardDescription>Recipes you've created</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-muted-foreground">You have created 5 recipes</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="saved" className="mt-8">
                <TabsList>
                    <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
                    <TabsTrigger value="created">Your Recipes</TabsTrigger>
                </TabsList>
                <TabsContent value="saved" className="mt-4">
                    <RecipeList limit={6} />
                </TabsContent>
                <TabsContent value="created" className="mt-4">
                    <div className="text-center py-8">
                        <h3 className="text-lg font-medium mb-2">You haven't created any recipes yet</h3>
                        <p className="text-muted-foreground mb-4">Start sharing your culinary creations with the world</p>
                        <Link
                            href="/recipes/create"
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            Create Recipe
                        </Link>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}


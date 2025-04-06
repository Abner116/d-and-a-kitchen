import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedCategories() {
    const categories = [
        {
            name: "Italian",
            image: "/placeholder.svg?height=200&width=200",
            link: "/recipes?cuisine=italian",
        },
        {
            name: "Mexican",
            image: "/placeholder.svg?height=200&width=200",
            link: "/recipes?cuisine=mexican",
        },
        {
            name: "Indian",
            image: "/placeholder.svg?height=200&width=200",
            link: "/recipes?cuisine=indian",
        },
        {
            name: "Chinese",
            image: "/placeholder.svg?height=200&width=200",
            link: "/recipes?cuisine=chinese",
        },
    ]

    return (
        <section className="mt-12">
            <h2 className="mb-6 text-3xl font-bold">Popular Cuisines</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {categories.map((category) => (
                    <Link key={category.name} href={category.link}>
                        <Card className="overflow-hidden transition-all hover:shadow-md">
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="text-center text-lg font-medium">{category.name}</h3>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}


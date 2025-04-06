import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Discover Delicious Recipes for Every Occasion
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Find, save, and share your favorite recipes from around the world. Join our community of food lovers
                                today.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href="/recipes">
                                <Button size="lg" className="px-8">
                                    Explore Recipes
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="lg" variant="outline" className="px-8">
                                    Join Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-sm gap-4 sm:grid-cols-2 sm:max-w-none md:gap-6">
                        <div className="grid gap-4 md:gap-6">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/placeholder.svg?height=400&width=300"
                                    width={300}
                                    height={400}
                                    alt="Delicious pasta dish"
                                    className="aspect-[3/4] object-cover"
                                />
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/placeholder.svg?height=300&width=300"
                                    width={300}
                                    height={300}
                                    alt="Fresh salad"
                                    className="aspect-square object-cover"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 md:gap-6">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/placeholder.svg?height=300&width=300"
                                    width={300}
                                    height={300}
                                    alt="Homemade bread"
                                    className="aspect-square object-cover"
                                />
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src="/placeholder.svg?height=400&width=300"
                                    width={300}
                                    height={400}
                                    alt="Chocolate dessert"
                                    className="aspect-[3/4] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


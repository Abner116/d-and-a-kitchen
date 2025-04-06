"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChefHat, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    // In a real app, you would get this from your auth context
    const isLoggedIn = false
    const userRole = "user" // or "admin"

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const isActive = (path: string) => {
        return pathname === path
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <ChefHat className="h-6 w-6" />
                    <span className="text-lg font-bold">RecipeBook</span>
                </Link>

                <nav className="hidden md:ml-auto md:flex md:items-center md:gap-6">
                    <Link
                        href="/"
                        className={`text-sm font-medium ${isActive("/") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/recipes"
                        className={`text-sm font-medium ${isActive("/recipes") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Recipes
                    </Link>
                    <Link
                        href="/contact"
                        className={`text-sm font-medium ${isActive("/contact") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Contact
                    </Link>

                    {isLoggedIn ? (
                        <>
                            {userRole === "admin" && (
                                <Link
                                    href="/admin"
                                    className={`text-sm font-medium ${isActive("/admin") ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    Admin
                                </Link>
                            )}

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <User className="h-5 w-5" />
                                        <span className="sr-only">User menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/logout">Logout</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </nav>

                <div className="ml-auto md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>

                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-16 z-50 bg-background p-4 md:hidden">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className={`text-sm font-medium ${isActive("/") ? "text-foreground" : "text-muted-foreground"}`}
                                onClick={closeMenu}
                            >
                                Home
                            </Link>
                            <Link
                                href="/recipes"
                                className={`text-sm font-medium ${isActive("/recipes") ? "text-foreground" : "text-muted-foreground"}`}
                                onClick={closeMenu}
                            >
                                Recipes
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-sm font-medium ${isActive("/contact") ? "text-foreground" : "text-muted-foreground"}`}
                                onClick={closeMenu}
                            >
                                Contact
                            </Link>

                            {isLoggedIn ? (
                                <>
                                    {userRole === "admin" && (
                                        <Link
                                            href="/admin"
                                            className={`text-sm font-medium ${isActive("/admin") ? "text-foreground" : "text-muted-foreground"}`}
                                            onClick={closeMenu}
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <Link
                                        href="/dashboard"
                                        className={`text-sm font-medium ${isActive("/dashboard") ? "text-foreground" : "text-muted-foreground"}`}
                                        onClick={closeMenu}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className={`text-sm font-medium ${isActive("/profile") ? "text-foreground" : "text-muted-foreground"}`}
                                        onClick={closeMenu}
                                    >
                                        Profile
                                    </Link>
                                    <Link href="/logout" className="text-sm font-medium text-muted-foreground" onClick={closeMenu}>
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-2">
                                    <Link href="/login" onClick={closeMenu}>
                                        <Button variant="outline" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={closeMenu}>
                                        <Button className="w-full">Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}


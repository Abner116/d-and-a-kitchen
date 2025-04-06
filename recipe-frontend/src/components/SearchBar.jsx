"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchBar() {
    const searchParams = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
    const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "all")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        // Build query string
        const params = new URLSearchParams()
        if (searchTerm) params.append("q", searchTerm)
        if (cuisine && cuisine !== "all") params.append("cuisine", cuisine)

        // Navigate to search results
        router.push(`/recipes?${params.toString()}`)
    }

    return (
        <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
            <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search recipes..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Cuisines</SelectItem>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="thai">Thai</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                </Select>

                <Button type="submit" className="md:w-[100px]">
                    Search
                </Button>
            </form>
        </div>
    )
}


import { Star } from "lucide-react"

interface StarRatingProps {
    rating: number | string
    maxRating?: number
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
    // Convert rating to number if it's a string
    const numericRating = typeof rating === "string" ? convertDifficultyToRating(rating) : rating

    // Ensure rating is between 0 and maxRating
    const normalizedRating = Math.min(Math.max(0, numericRating), maxRating)

    // Calculate the filled width as a percentage
    const filledWidth = (normalizedRating / maxRating) * 100

    return (
        <div className="relative inline-flex">
            {/* Background stars (empty) */}
            <div className="flex">
                {Array.from({ length: maxRating }).map((_, i) => (
                    <Star key={`empty-${i}`} className="h-4 w-4 text-muted" />
                ))}
            </div>

            {/* Foreground stars (filled) - absolute positioned over the background */}
            <div className="absolute top-0 flex overflow-hidden" style={{ width: `${filledWidth}%` }}>
                {Array.from({ length: maxRating }).map((_, i) => (
                    <Star key={`filled-${i}`} className="h-4 w-4 text-yellow-400" />
                ))}
            </div>
        </div>
    )
}

// Helper function to convert difficulty string to rating number
function convertDifficultyToRating(difficulty: string): number {
    switch (difficulty.toLowerCase()) {
        case "very easy":
            return 1
        case "easy":
            return 2
        case "medium":
            return 3
        case "hard":
            return 4
        case "very hard":
            return 5
        default:
            return 3 // Default to medium
    }
}


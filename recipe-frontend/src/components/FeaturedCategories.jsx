import React from 'react';

export function FeaturedCategories() {
    const categories = [
        { id: 1, name: 'Breakfast', image: '/images/breakfast.jpg' },
        { id: 2, name: 'Lunch', image: '/images/lunch.jpg' },
        { id: 3, name: 'Dinner', image: '/images/dinner.jpg' },
        { id: 4, name: 'Desserts', image: '/images/desserts.jpg' },
    ];

    return (
        <section className="mt-8">
            <h2 className="mb-6 text-2xl font-bold">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(category => (
                    <div key={category.id} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <div className="h-36 bg-gray-200"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-semibold text-xl">{category.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


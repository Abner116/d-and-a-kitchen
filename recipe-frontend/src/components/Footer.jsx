import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

function Footer() {
    return (
        <footer className="border-t border-orange-100 bg-white w-full">
            <div className="max-w-[1400px] mx-auto py-8 md:py-12 px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link to="/" className="mb-4 flex items-center gap-2">
                            <ChefHat className="h-6 w-6 text-orange-500" />
                            <span className="text-lg font-bold text-orange-500">RecipeBook</span>
                        </Link>
                        <p className="text-sm text-gray-600 text-left">
                            Discover and share delicious recipes from around the world.
                        </p>
                    </div>

                    <div className="text-left">
                        <h3 className="mb-4 text-sm font-semibold text-gray-800">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-orange-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/recipes" className="text-gray-600 hover:text-orange-500">
                                    Recipes
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-orange-500">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="text-left">
                        <h3 className="mb-4 text-sm font-semibold text-gray-800">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/privacy" className="text-gray-600 hover:text-orange-500">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-600 hover:text-orange-500">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies" className="text-gray-600 hover:text-orange-500">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="text-left">
                        <h3 className="mb-4 text-sm font-semibold text-gray-800">Connect</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-orange-500">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-orange-500">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-orange-500">
                                    Facebook
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-orange-100 pt-8 text-center text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} RecipeBook. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
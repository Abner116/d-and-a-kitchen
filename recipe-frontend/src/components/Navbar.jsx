import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { theme } = useTheme();
	const { user, isAuthenticated, logout } = useAuth();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleProfileMenu = () => {
		setIsProfileMenuOpen(!isProfileMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
		setIsProfileMenuOpen(false);
	};

	const handleLogout = () => {
		logout();
		closeMenu();
		navigate('/');
	};

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<header className="w-full bg-white shadow-sm border-b border-orange-100">
			{/* Fixed width outer container */}
			<div className="max-w-7xl mx-auto">
				{/* Single horizontal flex container for all navbar elements */}
				<div className="flex flex-row items-center justify-between h-16 px-4 gap-4">
					{/* Logo */}
					<Link to="/" className="flex items-center" onClick={closeMenu}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
							<path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
							<line x1="6" y1="17" x2="18" y2="17"></line>
						</svg>
						<span className="ml-2 text-lg font-bold text-orange-500">RecipeBook</span>
					</Link>

					{/* Nav Links - always in a horizontal row */}
					<div className="flex flex-row items-center">
						<Link
							to="/"
							className={`px-3 py-2 text-sm font-medium ${isActive('/') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
						>
							Home
						</Link>
						<Link
							to="/recipes"
							className={`px-3 py-2 text-sm font-medium ${isActive('/recipes') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
						>
							Recipes
						</Link>
						<Link
							to="/contact"
							className={`px-3 py-2 text-sm font-medium ${isActive('/contact') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
						>
							Contact
						</Link>
					</div>

					{/* Auth buttons - always horizontal */}
					{isAuthenticated ? (
						<div className="flex flex-row items-center">
							<div className="relative">
								<button
									onClick={toggleProfileMenu}
									className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 hover:text-orange-500"
								>
									<span>Hi, {user?.username || 'User'}</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<polyline points="6 9 12 15 18 9"></polyline>
									</svg>
								</button>
								{isProfileMenuOpen && (
									<div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-10">
										<Link
											to="/dashboard"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={closeMenu}
										>
											Dashboard
										</Link>
										{user?.role === 'admin' && (
											<Link
												to="/admin"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={closeMenu}
											>
												Admin Panel
											</Link>
										)}
										<button
											onClick={handleLogout}
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign Out
										</button>
									</div>
								)}
							</div>
						</div>
					) : (
							<div className="flex flex-row items-center gap-2">
								<Link to="/login">
									<button className="px-3 py-1 text-sm font-medium text-orange-500 hover:text-orange-600">
										Login
									</button>
								</Link>
								<Link to="/signup">
									<button className="px-3 py-1 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
									Sign Up
								</button>
							</Link>
						</div>
					)}

					{/* Mobile menu toggle - only visible on mobile */}
					<div className="block md:hidden">
						<button
							className="p-2 text-orange-500"
							onClick={toggleMenu}
							aria-expanded={isMenuOpen}
							aria-label="Toggle navigation menu"
						>
							{isMenuOpen ? (
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<line x1="3" y1="12" x2="21" y2="12"></line>
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="3" y1="18" x2="21" y2="18"></line>
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu - Only shown when toggled */}
				{isMenuOpen && (
					<div className="block md:hidden absolute left-0 right-0 z-50 bg-white shadow-md border-b">
						<nav className="flex flex-col p-4">
							<Link
								to="/"
								className={`px-3 py-2 text-sm font-medium ${isActive('/') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
								onClick={closeMenu}
							>
								Home
							</Link>
							<Link
								to="/recipes"
								className={`px-3 py-2 text-sm font-medium ${isActive('/recipes') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
								onClick={closeMenu}
							>
								Recipes
							</Link>
							<Link
								to="/contact"
								className={`px-3 py-2 text-sm font-medium ${isActive('/contact') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
								onClick={closeMenu}
							>
								Contact
							</Link>

							{isAuthenticated ? (
								<div className="flex flex-col space-y-2 mt-2">
									<Link to="/dashboard" onClick={closeMenu}>
										<button className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
											Dashboard
										</button>
									</Link>
									{user?.role === 'admin' && (
										<Link to="/admin" onClick={closeMenu}>
											<button className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
												Admin Panel
											</button>
										</Link>
									)}
									<button
										onClick={handleLogout}
										className="w-full px-4 py-2 text-sm font-medium text-left text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50"
									>
										Sign Out
									</button>
								</div>
							) : (
									<div className="flex flex-col space-y-2 mt-2">
										<Link to="/login" onClick={closeMenu}>
											<button className="w-full px-4 py-2 text-sm font-medium text-orange-500 bg-white border border-orange-300 rounded-md hover:bg-orange-50">
												Login
											</button>
										</Link>
										<Link to="/signup" onClick={closeMenu}>
											<button className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
												Sign Up
											</button>
										</Link>
									</div>
							)}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}

export default Navbar;
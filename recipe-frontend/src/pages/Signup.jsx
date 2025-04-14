import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client' // Default role is client
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!formData.name) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        // Validate email
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const result = await signup(formData);

            if (result.success) {
                // Show success message
                alert("Account created successfully! Please login.");

                // Redirect to login
                navigate("/login");
            } else {
                setApiError(result.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            setApiError("An unexpected error occurred. Please try again.");
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-12">
            <div className="mx-auto max-w-md">
                <div className="rounded-lg border bg-white p-8 shadow-sm">
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <line x1="19" y1="8" x2="19" y2="14"></line>
                                <line x1="16" y1="11" x2="22" y2="11"></line>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold">Create an account</h2>
                        <p className="text-gray-600">
                            Enter your information to create an account
                        </p>
                    </div>

                    {apiError && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 flex justify-center">
                                Account Type
                            </label>
                            <div className="mt-1">
                                <div className="flex items-center space-x-4 justify-center pt-4">
                                    <div className="flex items-center">
                                        <input
                                            id="role-client"
                                            name="role"
                                            type="radio"
                                            value="client"
                                            checked={formData.role === "client"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                                        />
                                        <label htmlFor="role-client" className="ml-2 block text-sm text-gray-700">
                                            Client
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="role-admin"
                                            name="role"
                                            type="radio"
                                            value="admin"
                                            checked={formData.role === "admin"}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                                        />
                                        <label htmlFor="role-admin" className="ml-2 block text-sm text-gray-700">
                                            Admin
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-md bg-orange-500 py-2 px-4 text-white font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-orange-600 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default SignupPage;
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, signup, logout } from '../services/authService';

// Create the auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is already logged in on app load
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                // Get user data from token (in a real app, you might want to validate the token with the server)
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setIsLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    // Login function
    const handleLogin = async (credentials) => {
        try {
            const data = await login(credentials);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message || 'Login failed' };
        }
    };

    // Signup function
    const handleSignup = async (userData) => {
        try {
            await signup(userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message || 'Signup failed' };
        }
    };

    // Logout function
    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
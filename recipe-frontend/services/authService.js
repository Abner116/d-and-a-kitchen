// API base URL - this should match your backend server
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }

  return data;
};

// Register a new user
export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "client", // Include the role field with a default
    }),
  });

  return handleResponse(response);
};

// Login with credentials
export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  return handleResponse(response);
};

// Logout (client-side only for now)
export const logout = async () => {
  // In a real app, you might want to notify the server about the logout
  return Promise.resolve();
};

// Get current user from token
export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Check if a user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

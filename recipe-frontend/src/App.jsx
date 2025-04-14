import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from '../context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import RecipesPage from './pages/Recipe';
import RecipeDetailPage from './pages/RecipeDetials';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ContactPage from './pages/Contact';
import DashboardPage from './pages/Dashboard';
import AdminPage from './pages/Admin';
import AuthCallbackPage from './pages/auth/Callback';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="recipe-book-theme">
          <div className="flex min-h-screen flex-col bg-white w-full">
            <Navbar />
            <main className="flex-1 bg-white text-gray-800 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
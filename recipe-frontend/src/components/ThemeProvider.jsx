import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => null,
});

export function ThemeProvider({
    children,
    defaultTheme = 'light', // Always default to light theme
    storageKey = 'theme',
}) {
    const [theme, setTheme] = useState(() => {
        // Always use light theme for our orange and white design
        return 'light';
    });

    // Update theme in localStorage when it changes
    useEffect(() => {
        localStorage.setItem(storageKey, theme);

        // Also update the document element class for styling
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add('light'); // Always use light theme

        // Add custom theme color variable
        document.documentElement.style.setProperty('--primary-color', '#f97316');
        document.documentElement.style.setProperty('--primary-hover', '#ea580c');
        document.documentElement.style.setProperty('--background-color', '#ffffff');
    }, [theme, storageKey]);

    const value = {
        theme: 'light', // Always light for our orange/white theme
        setTheme: (newTheme) => setTheme('light'), // Always set to light
        toggleTheme: () => { }, // No-op since we're always using light theme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
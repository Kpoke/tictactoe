/**
 * Theme context for managing dark/light mode throughout the application.
 * Persists theme preference to localStorage.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "app_theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme provider component that manages theme state and persistence
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return stored as Theme;
      }
    } catch (error) {
      // localStorage might not be available
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    
    return "light";
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute("data-theme", theme);
    // Store theme preference in localStorage directly (simpler than using storage service)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // localStorage might not be available
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access theme context
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

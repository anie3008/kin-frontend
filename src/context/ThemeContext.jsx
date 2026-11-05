"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isInitialized, setIsInitialized] = useState(false);

  // Read the saved theme when the app first loads
  useEffect(() => {
    const savedTheme = localStorage.getItem("kin-theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }

    setIsInitialized(true);
  }, []);

  // Apply and save the theme
  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("kin-theme", theme);
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
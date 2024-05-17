import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme

  // Check for stored theme preference in local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.body.setAttribute("data-theme", "dark");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Persist theme preference
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      {/* {children} */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

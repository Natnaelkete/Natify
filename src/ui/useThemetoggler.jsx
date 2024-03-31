import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  function getThemeFromLocalStorage() {
    return localStorage.getItem("theme");
  }

  const [dark, setDark] = useState(true);
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  function handleClick() {
    const currentTheme = theme === "light" ? "dark" : "light";

    setTheme(currentTheme);
    setDark(!dark);
  }
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ dark, handleClick, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within the ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };

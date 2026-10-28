import { useState, useEffect, useMemo, useCallback, type ReactNode } from "react";
import { ThemeContext } from "./theme";

// index.html applies the saved theme before first paint; start from what it chose
const readInitialTheme = () =>
  document.documentElement.classList.contains("dark");

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkTheme);
    try {
      localStorage.setItem("theme", darkTheme ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit
    }
  }, [darkTheme]);

  const toggleTheme = useCallback(() => {
    setDarkTheme((previous) => !previous);
  }, []);

  const value = useMemo(
    () => ({ darkTheme, toggleTheme }),
    [darkTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

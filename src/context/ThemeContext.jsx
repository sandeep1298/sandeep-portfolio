import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkTheme);
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
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

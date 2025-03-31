import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    });

    // Apply theme to document root
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

export default ThemeToggle;

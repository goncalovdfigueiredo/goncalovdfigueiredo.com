import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  lightIconColor?: string; // Tailwind class, ex: "text-blue-500"
  darkIconColor?: string;  // Tailwind class, ex: "text-yellow-400"
  lightBg?: string;        // Tailwind class, ex: "bg-gray-100 hover:bg-gray-200"
  darkBg?: string;         // Tailwind class, ex: "bg-gray-700 hover:bg-gray-600"
}

export default function ThemeToggle({
  lightIconColor = "text-emerald-500",
  darkIconColor = "text-yellow-400",
  lightBg = "bg-gray-200 hover:bg-gray-300",
  darkBg = "bg-gray-800 hover:bg-gray-700",
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full cursor-pointer transition-colors duration-300 ${
        theme === "light" ? lightBg : darkBg
      }`}
    >
      {theme === "light" ? (
        <Moon className={`h-5 w-5 ${lightIconColor} transition-colors duration-300`} />
      ) : (
        <Sun className={`h-5 w-5 ${darkIconColor} transition-colors duration-300`} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

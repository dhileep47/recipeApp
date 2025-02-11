import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react"; // Icons for dark/light mode

const Navbar = () => {
  const navigation = useNavigate();
  const favoriteCount = useSelector(
    (state) => state.favorites.favorites.length
  );

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="navbar bg-primary text-primary-content py-3 px-9 flex justify-between items-center">
      <button className="btn btn-ghost text-xl" onClick={() => navigation("/")}>
        🍽️ RecipeNest
      </button>
      <div className="flex items-center gap-4">
        <button
          className="btn btn-circle"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
        <div className="indicator relative">
          {favoriteCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
              {favoriteCount}
            </span>
          )}
          <button
            className="btn"
            onClick={() => navigation("/recipe/favorites")}
          >
            Favorites
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

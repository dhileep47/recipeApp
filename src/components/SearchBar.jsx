import { useState } from "react";
import { fetchRecipes } from "../api/recipeApi";
import { useDispatch } from "react-redux";
import { addRecipes } from "../store/recipeSlice";

const SearchBar = ({ setIsLoading }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setError(null);
    try {
      setIsLoading(true);

      if (!query || query.trim().length === 0) {
        setError("Please enter a search term.");
        setIsLoading(false);
        return;
      }

      const response = await fetchRecipes(query);
      dispatch(addRecipes(response));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className={`p-2 rounded-lg w-[300px] border ${
            error && query.length <= 0 ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button onClick={handleSearch} className="btn btn-outline">
          Search
        </button>
      </div>
      {error && query.length <= 0 && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;

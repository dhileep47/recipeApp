import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Your Favorite Recipes ❤️
      </h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">
          No favorites yet. Start adding some!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.uri} data={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

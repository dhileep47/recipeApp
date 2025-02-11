import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Clock, Heart, ShoppingBasket, Users } from "lucide-react";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const recipeData = recipes.find(
    (r) => r.recipe.uri === decodeURIComponent(id)
  );
  if (!recipeData) {
    return <p className="text-center text-red-500 text-lg">Recipe not found</p>;
  }

  const { recipe } = recipeData;

  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorited = favorites.some((r) => r.uri === recipe.uri);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      dispatch(removeFavorite(recipe));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-base-300 text-center shadow-lg rounded-lg min-h-screen">
      <div className="flex gap-2 items-center justify-center">
        <h1 className="text-4xl font-bold text-primary">{recipe.label}</h1>
        <div>
          <button
            className=" p-2 rounded-full bg-black/50 text-white"
            onClick={toggleFavorite}
          >
            {isFavorited ? (
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            ) : (
              <Heart className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-white mx-auto max-w-4xl">
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-6 text-lg mt-4">
            <div className="flex flex-col items-center">
              <ShoppingBasket size={24} />
              <span>{recipe.ingredients.length}</span>
              <span className="text-sm">Ingredients</span>
            </div>
            <div className="flex flex-col items-center">
              <Users size={24} />
              <span>{recipe.yield}</span>
              <span className="text-sm">Servings</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock size={24} />
              <span>{recipe.totalTime || "N/A"}</span>
              <span className="text-sm">Minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left mx-auto max-w-xl">
        <h2 className="text-2xl font-semibold mb-3">Ingredients:</h2>
        <ul className="list-disc list-inside text-lg space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      </div>

      <div className="text-center mx-auto max-w-xl">
        <h2 className="text-2xl font-semibold mb-3">Instructions:</h2>
        <p className="text-lg text-primary">
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Click here for the full recipe
          </a>
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;

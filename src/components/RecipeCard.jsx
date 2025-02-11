import { Utensils, Users, Heart } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";

const RecipeCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorited = favorites.some((recipe) => recipe.uri === data.uri);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      dispatch(removeFavorite(data));
    } else {
      dispatch(addFavorite(data));
    }
  };

  return (
    <div
      className="card w-full max-w-sm bg-base-300 shadow-xl cursor-pointer hover:shadow-slate-950"
      onClick={() => navigate(`/recipe/${encodeURIComponent(data.uri)}`)}
    >
      <figure className="relative aspect-video w-full">
        <img
          src={data.image}
          alt={data.label}
          className="object-cover w-full h-full rounded-t-lg"
        />
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
          {data.mealType} • {data.dishType}
        </div>
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white"
          onClick={toggleFavorite}
        >
          {isFavorited ? (
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          ) : (
            <Heart className="w-6 h-6 text-white" />
          )}
        </button>
      </figure>

      <div className="card-body p-4">
        <h2 className="text-lg text-left font-semibold leading-tight">
          {data.label}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1 text-xs">
            {data?.dietLabels.map((label) => (
              <div key={label} className="badge badge-secondary px-2">
                {label}
              </div>
            ))}
          </div>
          <div className="badge badge-outline rounded-lg px-2 py-0 h-fit w-fit text-xs">
            {data.cuisineType}
          </div>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <div className="flex items-center gap-1 text-gray-500">
            <Utensils className="h-4 w-4" />
            <span>{data.ingredients.length} ingredients</span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{`Servings: ${data.yield}`}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-2 mt-2">
          <div className="flex items-center gap-1">
            <span className="font-medium">{Math.round(data.calories)}</span>
            <span className="text-gray-500">calories</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

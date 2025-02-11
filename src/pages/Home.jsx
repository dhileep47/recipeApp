import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import { RecipeCard } from "../components/recipeCard";
import Filters from "../components/Filters";
import CardSkeleton from "../components/skeleton/CardSkeleton";
import FilterSkeleton from "../components/skeleton/FilterSkeleton";

const Home = () => {
  const recipes = useSelector((state) => state.recipes);
  const [isloading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    mealType: [],
    cuisine: [],
    dishTypes: [],
  });

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const { mealType, dishType, cuisineType } = recipe?.recipe;
      return (
        (filters.mealType.length === 0 ||
          filters.mealType.some((m) => mealType?.includes(m))) &&
        (filters.dishTypes.length === 0 ||
          filters.dishTypes.some((d) => dishType?.includes(d))) &&
        (filters.cuisine.length === 0 ||
          filters.cuisine.some((c) => cuisineType?.includes(c)))
      );
    });
  }, [recipes, filters]);

  return (
    <div className="p-4 mx-auto flex flex-col items-center gap-6 text-center w-full">
      <h1 className="text-3xl font-bold text-primary">
        🍽️ Discover Delicious Recipes!
      </h1>
      <p className="text-lg text-gray-500">
        Type an ingredient or dish name and find amazing recipes to try. Your
        next favorite meal is just a search away! ✨
      </p>
      <SearchBar setIsLoading={setIsLoading} />
      <div className="flex w-full gap-6">
        <div className="w-[250px]">
          {isloading ? (
            <FilterSkeleton />
          ) : (
            recipes?.length > 0 && (
              <Filters filters={filters} setFilters={setFilters} />
            )
          )}
        </div>
        {isloading ? (
          <CardSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-grow h-fit">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.recipe.uri} data={recipe.recipe} />
              ))
            ) : (
              <p className="text-gray-500 italic text-center col-span-3">
                No recipes found. Try a different search or filter!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

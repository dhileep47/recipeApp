import React, { useState } from "react";
import { cuisines, dishTypes, mealTypes } from "../utils/constants";

const Filters = ({ filters, setFilters }) => {
  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <div className="hidden md:flex flex-col gap-4 w-[250px] p-4 bg-base-200 rounded-lg">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Meal Type Filters */}
      <div>
        <p className="font-semibold my-2">Meal Type:</p>
        <div className="flex flex-col gap-2">
          {mealTypes.map((meal) => (
            <label key={meal} className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={filters.mealType.includes(meal.toLowerCase())}
                onChange={() =>
                  handleCheckboxChange("mealType", meal.toLowerCase())
                }
              />
              {meal}
            </label>
          ))}
        </div>
      </div>

      {/* Cuisine Filters */}
      <div>
        <p className="font-semibold my-2">Cuisine:</p>
        <div className="flex flex-col gap-2">
          {cuisines.map((cuisine) => (
            <label key={cuisine} className="cursor-pointer flex gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={filters.cuisine.includes(cuisine.toLowerCase())}
                onChange={() =>
                  handleCheckboxChange("cuisine", cuisine.toLowerCase())
                }
              />
              {cuisine}
            </label>
          ))}
        </div>
      </div>
      {/* DishType Filters */}
      <div>
        <p className="font-semibold my-2">Dish Types:</p>
        <div className="flex flex-col gap-2">
          {dishTypes.map((dish) => (
            <label key={dish} className="cursor-pointer flex gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={filters.dishTypes.includes(dish.toLowerCase())}
                onChange={() =>
                  handleCheckboxChange("dishTypes", dish.toLowerCase())
                }
              />
              {dish}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipes: (state, action) => action.payload,
  },
});

export const { addRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;

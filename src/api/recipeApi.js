import axiosInstance from "./api.interceptor";

export const fetchRecipes = async (query) => {
  try {
    const response = await axiosInstance.get("", {
      params: { q: query },
    });
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

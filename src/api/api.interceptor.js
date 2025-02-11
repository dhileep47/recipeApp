import axios from "axios";

const BASE_URL = "https://api.edamam.com/api/recipes/v2?type=public";
const APP_ID = "YOUR_APP_ID";
const APP_KEY = "YOUR_APP_KEY";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      app_id: import.meta.env.VITE_EDAMAM_APP_ID,
      app_key: import.meta.env.VITE_EDAMAM_APP_KEY,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <Provider store={store}>
      <Analytics />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/recipe/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </Provider>
  );
}

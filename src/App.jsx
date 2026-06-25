import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favourites from "./pages/Favourites";
import { FavouritesProvider } from "./context/FavouritesContext";

function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  );
}

export default App;

import { useEffect, useState } from "react";
import { FavouritesContext } from "./FavouritesContextValue";

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (property) => {
    setFavourites((prev) => {
      if (prev.some((item) => item.id === property.id)) {
        return prev;
      }

      return [...prev, property];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavourite = (id) => {
    return favourites.some((item) => item.id === id);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

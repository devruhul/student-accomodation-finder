import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContextValue";
import { accommodations } from "../data/accommodations";

function Details() {
  const { id } = useParams();
  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);

  const accommodation = accommodations.find((item) => item.id === Number(id));

  if (!accommodation) {
    return (
      <main className="page-shell">
        <nav className="top-nav">
          <Link to="/" className="brand">
            Student Accommodation Finder
          </Link>
          <Link to="/favourites" className="nav-link">
            Favourites
          </Link>
        </nav>
        <p className="status error">Accommodation not found.</p>
      </main>
    );
  }

  const saved = isFavourite(accommodation.id);

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link to="/" className="brand">
          Student Accommodation Finder
        </Link>
        <Link to="/favourites" className="nav-link">
          Favourites
        </Link>
      </nav>

      <section className="details-layout">
        <img src={accommodation.image} alt={accommodation.title} />

        <div className="details-content">
          <p className="meta">{accommodation.city}</p>
          <h1>{accommodation.title}</h1>
          <div className="detail-stats">
            <span>£{accommodation.price}/month</span>
            <span>{accommodation.type}</span>
          </div>
          <p>{accommodation.description}</p>

          <button
            className="button"
            type="button"
            onClick={() =>
              saved
                ? removeFavourite(accommodation.id)
                : addFavourite(accommodation)
            }
          >
            {saved ? "Remove from favourites" : "Save property"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default Details;

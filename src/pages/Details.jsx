import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContextValue";
import { fetchPropertyById } from "../services/api";
import { findLocalPropertyById } from "../services/localProperties";

function Details() {
  const { id } = useParams();
  const { addFavourite, removeFavourite, isFavourite } =
    useContext(FavouritesContext);
  const [accommodation, setAccommodation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadProperty() {
      setIsLoading(true);
      setError("");
      setNotice("");

      try {
        const data = await fetchPropertyById(id);

        if (isActive) {
          setAccommodation(data);
        }
      } catch {
        if (isActive) {
          const localProperty = findLocalPropertyById(id);

          if (localProperty) {
            setNotice("Backend is offline, showing local sample data.");
            setAccommodation(localProperty);
          } else {
            setError("Accommodation not found.");
            setAccommodation(null);
          }
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProperty();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (isLoading || error || !accommodation) {
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
        {isLoading && <p className="status">Loading accommodation...</p>}
        {error && <p className="status error">{error}</p>}
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
          {notice && <p className="status warning">{notice}</p>}
          <p className="meta">{accommodation.city}</p>
          <h1>{accommodation.title}</h1>
          <div className="detail-stats">
            <span>£{accommodation.price}/month</span>
            <span>{accommodation.type}</span>
            <span>{accommodation.distanceFromUniversityKm}km from uni</span>
            <span>Available {accommodation.availabilityDate}</span>
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

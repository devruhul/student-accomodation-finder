import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContextValue";

function Favourites() {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

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

      <section className="intro">
        <h1>Saved properties</h1>
        <p>Your favourites are saved in this browser.</p>
      </section>

      {favourites.length === 0 && (
        <p className="status">You have not saved any properties yet.</p>
      )}

      {favourites.length > 0 && (
        <section className="card-grid" aria-label="Saved accommodation">
          {favourites.map((item) => (
            <article className="property-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <p className="meta">{item.city}</p>
                <h2>{item.title}</h2>
                <div className="card-footer">
                  <span>£{item.price}/month</span>
                  <span>{item.type}</span>
                </div>
                <div className="actions">
                  <Link className="button" to={`/details/${item.id}`}>
                    View details
                  </Link>
                  <button
                    className="button secondary"
                    type="button"
                    onClick={() => removeFavourite(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Favourites;

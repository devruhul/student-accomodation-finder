import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { accommodations } from "../data/accommodations";

function Home() {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("1000");
  const [roomType, setRoomType] = useState("All");
  const [isLoading] = useState(false);

  const hasDataError = !Array.isArray(accommodations);

  const roomTypes = useMemo(() => {
    if (hasDataError) {
      return ["All"];
    }

    return ["All", ...new Set(accommodations.map((item) => item.type))];
  }, [hasDataError]);

  const filtered = hasDataError
    ? []
    : accommodations.filter(
        (item) =>
          item.city.toLowerCase().includes(search.toLowerCase()) &&
          item.price <= Number(maxPrice) &&
          (roomType === "All" || item.type === roomType),
      );

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
        <h1>Find student accommodation</h1>
        <p>Search available rooms by city, budget, and room type.</p>
      </section>

      <section className="filters" aria-label="Accommodation filters">
        <label>
          <span>City</span>
          <input
            type="search"
            placeholder="Search city"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label>
          <span>Max price: £{maxPrice}</span>
          <input
            type="range"
            min="500"
            max="1000"
            step="50"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </label>

        <label>
          <span>Room type</span>
          <select
            value={roomType}
            onChange={(event) => setRoomType(event.target.value)}
          >
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </section>

      {isLoading && <p className="status">Loading accommodation...</p>}

      {hasDataError && (
        <p className="status error">Sorry, accommodation data could not load.</p>
      )}

      {!isLoading && !hasDataError && filtered.length === 0 && (
        <p className="status">No accommodation matches your filters.</p>
      )}

      {!isLoading && !hasDataError && filtered.length > 0 && (
        <section className="card-grid" aria-label="Accommodation results">
          {filtered.map((item) => (
            <article className="property-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <p className="meta">{item.city}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="card-footer">
                  <span>£{item.price}/month</span>
                  <span>{item.type}</span>
                </div>
                <Link className="button" to={`/details/${item.id}`}>
                  View details
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Home;

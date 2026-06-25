import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProperties } from "../services/api";
import { searchLocalProperties } from "../services/localProperties";

function Home() {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("1000");
  const [roomType, setRoomType] = useState("All");
  const [maxDistance, setMaxDistance] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadProperties() {
      setIsLoading(true);
      setNotice("");

      const filters = {
        city: search,
        maxPrice,
        type: roomType,
        maxDistance,
        availableFrom,
      };

      try {
        const data = await fetchProperties(filters);

        if (isActive) {
          setProperties(data);
        }
      } catch {
        if (isActive) {
          setNotice("Backend is offline, showing local sample data.");
          setProperties(searchLocalProperties(filters));
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProperties();

    return () => {
      isActive = false;
    };
  }, [availableFrom, maxDistance, maxPrice, roomType, search]);

  const roomTypes = useMemo(() => {
    return ["All", ...new Set(properties.map((item) => item.type))];
  }, [properties]);

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
        <h1>StudentStay UK</h1>
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

        <label>
          <span>Max distance</span>
          <select
            value={maxDistance}
            onChange={(event) => setMaxDistance(event.target.value)}
          >
            <option value="">Any distance</option>
            <option value="1">Within 1km</option>
            <option value="2">Within 2km</option>
            <option value="3">Within 3km</option>
          </select>
        </label>

        <label>
          <span>Available from</span>
          <input
            type="date"
            value={availableFrom}
            onChange={(event) => setAvailableFrom(event.target.value)}
          />
        </label>
      </section>

      {isLoading && <p className="status">Loading accommodation...</p>}

      {notice && <p className="status warning">{notice}</p>}

      {!isLoading && properties.length === 0 && (
        <p className="status">No accommodation matches your filters.</p>
      )}

      {!isLoading && properties.length > 0 && (
        <section className="card-grid" aria-label="Accommodation results">
          {properties.map((item) => (
            <article className="property-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <p className="meta">{item.city}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="card-footer">
                  <span>£{item.price}/month</span>
                  <span>{item.type}</span>
                  <span>{item.distanceFromUniversityKm}km from uni</span>
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

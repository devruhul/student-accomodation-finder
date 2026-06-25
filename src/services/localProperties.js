import { accommodations } from "../data/accommodations.js";

function parseOptionalNumber(value) {
  if (value === "" || value == null) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

export function searchLocalProperties(filters = {}) {
  const city = filters.city?.trim().toLowerCase();
  const maxPrice = parseOptionalNumber(filters.maxPrice);
  const type = filters.type?.trim();
  const maxDistance = parseOptionalNumber(filters.maxDistance);
  const availableFrom = filters.availableFrom
    ? new Date(filters.availableFrom)
    : null;

  return accommodations.filter((property) => {
    const matchesCity = city ? property.city.toLowerCase().includes(city) : true;
    const matchesPrice = maxPrice != null ? property.price <= maxPrice : true;
    const matchesType = type && type !== "All" ? property.type === type : true;
    const matchesDistance = maxDistance != null
      ? property.distanceFromUniversityKm <= maxDistance
      : true;
    const matchesDate = availableFrom
      ? new Date(property.availabilityDate) >= availableFrom
      : true;

    return (
      matchesCity &&
      matchesPrice &&
      matchesType &&
      matchesDistance &&
      matchesDate
    );
  });
}

export function findLocalPropertyById(id) {
  return accommodations.find((property) => property.id === Number(id));
}

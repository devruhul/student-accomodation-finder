const properties = [
  {
    id: 1,
    title: "London Student Residence",
    city: "London",
    price: 850,
    type: "En-suite",
    distanceFromUniversityKm: 1.2,
    availabilityDate: "2026-09-01",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    description: "Modern student accommodation near major universities.",
  },
  {
    id: 2,
    title: "Manchester Student Village",
    city: "Manchester",
    price: 650,
    type: "Studio",
    distanceFromUniversityKm: 2.4,
    availabilityDate: "2026-08-15",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    description: "Affordable student studios with bills included.",
  },
  {
    id: 3,
    title: "Birmingham Student Hub",
    city: "Birmingham",
    price: 700,
    type: "Shared",
    distanceFromUniversityKm: 1.8,
    availabilityDate: "2026-09-10",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    description: "Shared accommodation with modern facilities.",
  },
  {
    id: 4,
    title: "Leeds Riverside Rooms",
    city: "Leeds",
    price: 575,
    type: "Shared",
    distanceFromUniversityKm: 2.1,
    availabilityDate: "2026-07-20",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    description: "Bright shared rooms close to transport and student cafés.",
  },
  {
    id: 5,
    title: "Glasgow City Studio",
    city: "Glasgow",
    price: 780,
    type: "Studio",
    distanceFromUniversityKm: 1.5,
    availabilityDate: "2026-08-01",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    description: "Private studio with study space and fast Wi-Fi.",
  },
];

function parseOptionalNumber(value) {
  if (value === "" || value == null) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

export function searchProperties(filters = {}) {
  const city = filters.city?.trim().toLowerCase();
  const maxPrice = parseOptionalNumber(filters.maxPrice);
  const type = filters.type?.trim();
  const maxDistance = parseOptionalNumber(filters.maxDistance);
  const availableFrom = filters.availableFrom
    ? new Date(filters.availableFrom)
    : null;

  return properties.filter((property) => {
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

export function findPropertyById(id) {
  return properties.find((property) => property.id === id);
}

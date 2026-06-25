import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function fetchProperties(filters = {}) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "" && value != null),
  );
  const response = await api.get("/properties", { params });

  return response.data;
}

export async function fetchPropertyById(id) {
  const response = await api.get(`/properties/${id}`);

  return response.data;
}

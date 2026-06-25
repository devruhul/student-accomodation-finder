import {
  findPropertyById,
  searchProperties,
} from "../models/propertyModel.js";

export function getProperties(req, res) {
  const properties = searchProperties(req.query);

  res.json(properties);
}

export function getPropertyById(req, res) {
  const property = findPropertyById(Number(req.params.id));

  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  return res.json(property);
}

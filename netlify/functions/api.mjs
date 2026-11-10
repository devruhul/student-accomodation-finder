import {
  findPropertyById,
  searchProperties,
} from "../../backend/src/models/propertyModel.js";

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

export default async function api(request, context) {
  if (request.method !== "GET") {
    return jsonResponse(
      { message: "Method not allowed" },
      405,
      { allow: "GET" },
    );
  }

  const pathname = new URL(request.url).pathname;

  if (pathname === "/api/health") {
    return jsonResponse({ status: "ok", service: "StudentStay UK API" });
  }

  if (pathname === "/api/properties") {
    const filters = Object.fromEntries(new URL(request.url).searchParams);
    return jsonResponse(searchProperties(filters));
  }

  const id = context.params?.id ?? pathname.split("/").at(-1);
  const property = findPropertyById(Number(id));

  if (property) {
    return jsonResponse(property);
  }

  return jsonResponse({ message: "Property not found" }, 404);
}

export const config = {
  method: ["GET"],
  path: ["/api/health", "/api/properties", "/api/properties/:id"],
};

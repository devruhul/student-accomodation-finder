import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

const server = app.listen(0, async () => {
  const address = server.address();

  if (!address) {
    return;
  }

  const { port } = address;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const propertiesResponse = await fetch(`${baseUrl}/api/properties`);
    const properties = await propertiesResponse.json();

    if (!propertiesResponse.ok || !Array.isArray(properties)) {
      throw new Error("Properties list endpoint failed");
    }

    const propertyResponse = await fetch(`${baseUrl}/api/properties/1`);
    const property = await propertyResponse.json();

    if (!propertyResponse.ok || property.id !== 1) {
      throw new Error("Single property endpoint failed");
    }

    console.log("Backend smoke test passed");
  } finally {
    server.close();
  }
});

server.on("error", (error) => {
  console.error(`Backend smoke test could not start: ${error.message}`);
  process.exitCode = 1;
});

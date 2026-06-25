import cors from "cors";
import express from "express";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "StudentStay UK API" });
});

app.use("/api/properties", propertyRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;

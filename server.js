import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Student Accommodation API is running!");
});

app.get("/api/students", (req, res) => {
  res.json([
    { id: 1, name: "Ruhul" },
    { id: 2, name: "Alex" },
  ]);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});

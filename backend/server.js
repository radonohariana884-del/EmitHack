const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routeRoutes = require("./routes/routeRoutes");
const signalementRoutes = require("./routes/signalementRoutes");
const assistantRoutes = require("./routes/assistantRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Smart Traffic Assistant API",
  });
});

app.use("/routes", routeRoutes);
app.use("/signalements", signalementRoutes);
app.use("/assistant", assistantRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route introuvable",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
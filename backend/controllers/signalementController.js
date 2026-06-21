const SignalementModel = require("../models/signalementModel");

const getSignalements = (req, res) => {
  const ville = req.query.ville;

  if (ville) {
    SignalementModel.getSignalementsByVille(ville, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Impossible de récupérer les signalements",
          error: err.message,
        });
      }
      res.json(result || []);
    });
  } else {
    SignalementModel.getAllSignalements((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Impossible de récupérer les signalements",
          error: err.message,
        });
      }
      res.json(result);
    });
  }
};

const createSignalement = (req, res) => {
  const { utilisateur_id, route_id, type, description } = req.body;

  if (!utilisateur_id || !route_id || !type || !description) {
    return res.status(400).json({
      message: "Tous les champs sont requis pour créer un signalement",
    });
  }

  SignalementModel.createSignalement(
    { utilisateur_id, route_id, type, description },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Impossible d’ajouter le signalement",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Signalement ajouté",
        id: result.insertId,
      });
    }
  );
};

module.exports = {
  getSignalements,
  createSignalement,
};
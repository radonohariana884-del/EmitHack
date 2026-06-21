const AssistantModel = require("../models/assistantModel");

function calculateDistance(depart, arrivee) {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371;
  const dLat = toRadians(arrivee.lat - depart.lat);
  const dLon = toRadians(arrivee.lng - depart.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(depart.lat)) * Math.cos(toRadians(arrivee.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const askAssistant = (req, res) => {
  const { route_id, depart, arrivee, distance } = req.body;

  if (route_id) {
    const routeId = Number(route_id);

    if (!routeId || Number.isNaN(routeId)) {
      return res.status(400).json({
        message: "route_id manquant ou invalide",
      });
    }

    return AssistantModel.getRouteById(routeId, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Impossible de récupérer la route",
          error: err.message,
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Route introuvable",
        });
      }

      const route = result[0];
      let conseil = "Route recommandée. Circulation fluide.";

      if (route.niveau_trafic >= 70) {
        conseil = "Embouteillage élevé. Route déconseillée.";
      } else if (route.niveau_trafic >= 40) {
        conseil = "Trafic moyen. Prudence.";
      }

      return res.json({
        route_id: route.id,
        niveau_trafic: route.niveau_trafic,
        conseil,
      });
    });
  }

  if (!depart || !arrivee) {
    return res.status(400).json({
      message: "Les points de départ et d'arrivée sont requis.",
    });
  }

  if (
    typeof depart.lat !== "number" ||
    typeof depart.lng !== "number" ||
    typeof arrivee.lat !== "number" ||
    typeof arrivee.lng !== "number"
  ) {
    return res.status(400).json({
      message: "Format de coordonnées invalide.",
    });
  }

  const calculatedDistance = distance || calculateDistance(depart, arrivee);
  let conseil = "Trafic fluide pour ce trajet.";

  if (calculatedDistance >= 30) {
    conseil = "Trajet long : prévoyez un temps de déplacement plus élevé.";
  } else if (calculatedDistance >= 15) {
    conseil = "Trafic modéré : soyez prudent et anticipez quelques ralentissements.";
  } else {
    conseil = "Trajet court : circulation généralement fluide.";
  }

  return res.json({
    depart,
    arrivee,
    distance: Math.round(calculatedDistance * 100) / 100,
    conseil,
  });
};

module.exports = {
  askAssistant,
};
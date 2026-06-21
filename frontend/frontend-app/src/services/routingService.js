const OSRM_BASE = "https://router.project-osrm.org";
const OSRM_PROFILE = "driving";

function convertCoordinates(coordinates) {
  return coordinates.map(([lng, lat]) => [lat, lng]);
}

function formatInstructions(legs) {
  return legs.flatMap((leg) =>
    leg.steps.map((step) => {
      if (step.maneuver && step.maneuver.instruction) {
        return step.maneuver.instruction;
      }
      if (step.name) {
        return `${step.mode} vers ${step.name}`;
      }
      return step.type || "Suivre la route";
    })
  );
}

export async function fetchRoutes(depart, arrivee) {
  const start = `${depart[1]},${depart[0]}`;
  const end = `${arrivee[1]},${arrivee[0]}`;
  const url = `${OSRM_BASE}/route/v1/${OSRM_PROFILE}/${start};${end}?overview=full&geometries=geojson&steps=true&alternatives=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Impossible de récupérer les itinéraires.");
  }

  const data = await response.json();
  if (!data.routes || data.routes.length === 0) {
    throw new Error("Aucun itinéraire disponible pour ce trajet.");
  }

  return data.routes.map((route, index) => ({
    id: String.fromCharCode(65 + index),
    nom: index === 0 ? "Route principale" : `Alternative ${index}`,
    distance: route.distance / 1000,
    durationSec: route.duration,
    waypoints: convertCoordinates(route.geometry.coordinates),
    geometry: route.geometry,
    steps: formatInstructions(route.legs || []),
  }));
}

export function calculateRouteDistance(waypoints) {
  let totalDistance = 0;
  const R = 6371;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const [lat1, lng1] = waypoints[i];
    const [lat2, lng2] = waypoints[i + 1];
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalDistance += R * c;
  }

  return totalDistance;
}

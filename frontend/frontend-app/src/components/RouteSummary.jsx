import React from "react";

export default function RouteSummary({ selectedRoute }) {
  if (!selectedRoute) {
    return null;
  }

  return (
    <div className="route-summary-card">
      <h3>Itinéraire sélectionné</h3>
      <div className="route-summary-details">
        <div>
          <span>Distance</span>
          <strong>{selectedRoute.distance.toFixed(1)} km</strong>
        </div>
        <div>
          <span>Temps estimé</span>
          <strong>{selectedRoute.time} min</strong>
        </div>
        <div>
          <span>Trafic</span>
          <strong>{selectedRoute.traffic.niveau}</strong>
        </div>
      </div>
    </div>
  );
}

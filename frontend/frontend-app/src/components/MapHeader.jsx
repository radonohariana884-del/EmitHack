import React from "react";

export default function MapHeader({ ville }) {
  return (
    <div className="map-header">
      <div>
        <h1>Smart Traffic Assistant</h1>
        <p>Ville sélectionnée : <strong>{ville}</strong></p>
      </div>
    </div>
  );
}

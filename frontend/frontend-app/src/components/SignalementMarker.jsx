import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const icons = {
  Embouteillage: new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  Accident: new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  "Route bloquée": new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  Travaux: new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

export default function SignalementMarker({ signalement, onVote }) {
  const icon = icons[signalement.type] || icons.Travaux;

  const up = signalement.votes?.up || 0;
  const down = signalement.votes?.down || 0;

  return (
    <Marker position={[parseFloat(signalement.latitude), parseFloat(signalement.longitude)]} icon={icon}>
      <Popup>
        <strong className="block mb-1">{signalement.type}</strong>
        <p className="text-sm mb-2">{signalement.description || "Aucun détail"}</p>
        <div className="flex items-center gap-3">
          <button
            className="rounded-md bg-emerald-500/90 px-3 py-1 text-white text-sm"
            onClick={() => onVote && onVote(signalement.id, true)}
          >
            👍 Vrai ({up})
          </button>
          <button
            className="rounded-md bg-rose-500/90 px-3 py-1 text-white text-sm"
            onClick={() => onVote && onVote(signalement.id, false)}
          >
            👎 Faux ({down})
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

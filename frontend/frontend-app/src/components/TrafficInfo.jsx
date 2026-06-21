import { MapPin, Clock, Signal } from "lucide-react";

export default function TrafficInfo({ traffic, distance, estimatedTime }) {
  const getTrafficLabel = (level) => {
    if (level === "élevé") return "Embouteillage";
    if (level === "moyen") return "Trafic moyen";
    return "Circulation fluide";
  };

  const getTrafficDescription = (level) => {
    if (level === "élevé") return "Vitesse moyenne: 10 km/h";
    if (level === "moyen") return "Vitesse moyenne: 20 km/h";
    return "Vitesse moyenne: 30 km/h";
  };

  return (
    <div className="traffic-info">
      <div className="traffic-summary-grid">
        <div className="traffic-summary-card">
          <div className="traffic-summary-title">
            <MapPin className="traffic-summary-icon" /> Distance
          </div>
          <div className="traffic-summary-value">{distance.toFixed(1)} km</div>
        </div>

        <div className="traffic-summary-card">
          <div className="traffic-summary-title">
            <Clock className="traffic-summary-icon" /> Temps estimé
          </div>
          <div className="traffic-summary-value">{estimatedTime} min</div>
        </div>
      </div>

      <div className="traffic-status-card">
        <div className="traffic-status-row">
          <Signal className="traffic-status-icon" />
          <div>
            <strong>{getTrafficLabel(traffic.niveau)}</strong>
            <div className="traffic-status-detail">{getTrafficDescription(traffic.niveau)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle, MapPin, TrafficCone, Wrench } from "lucide-react";

export default function AlertCard({ signalements, trafficLevel }) {
  if (signalements.length === 0) {
    return null;
  }

  const getAlertIcon = (type) => {
    if (type === "Accident") return <AlertTriangle className="alert-icon" />;
    if (type === "Embouteillage") return <TrafficCone className="alert-icon" />;
    if (type === "Route bloquée") return <Wrench className="alert-icon" />;
    return <MapPin className="alert-icon" />;
  };

  const getAlertColor = (level) => {
    if (level === "élevé") return "#ef4444";
    if (level === "moyen") return "#f97316";
    return "#22c55e";
  };

  return (
    <div
      className="alert-card"
      style={{
        borderLeft: `4px solid ${getAlertColor(trafficLevel)}`,
        backgroundColor: trafficLevel === "élevé" ? "#fef2f2" : "#fffbeb",
      }}
    >
      <div className="alert-card-header">
        <div className="alert-card-title">
          {trafficLevel === "élevé" ? "Alertes actives" : "Signalements sur votre trajet"}
        </div>
        <span className="alert-level" style={{ color: getAlertColor(trafficLevel) }}>
          {trafficLevel === "élevé" ? "Élevé" : "Modéré"}
        </span>
      </div>
      <ul className="alert-list">
        {signalements.map((sig, idx) => (
          <li key={idx} className="alert-item">
            <div className="alert-item-header">
              {getAlertIcon(sig.type)}
              <strong>{sig.type}</strong>
            </div>
            <small>{sig.description || "Aucune description"}</small>
            <small className="alert-distance">À {Math.round(sig.distance * 1000)} m</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

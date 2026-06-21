export default function AlertCard({ signalements, trafficLevel }) {
  if (signalements.length === 0) {
    return null;
  }

  const getAlertIcon = (type) => {
    if (type === "Accident") return "🚗";
    if (type === "Embouteillage") return "🚦";
    if (type === "Route bloquée") return "🚧";
    return "⚠️";
  };

  const getAlertColor = (level) => {
    if (level === "élevé") return "#ef4444"; // rouge
    if (level === "moyen") return "#f97316"; // orange
    return "#22c55e"; // vert
  };

  return (
    <div
      className="alert-card"
      style={{
        borderLeft: `4px solid ${getAlertColor(trafficLevel)}`,
        backgroundColor: trafficLevel === "élevé" ? "#fef2f2" : "#fffbeb",
      }}
    >
      <h3 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>
        {trafficLevel === "élevé" ? "🚨 Alertes actives" : "⚠️ Signalements sur votre trajet"}
      </h3>
      <ul
        style={{
          margin: "0",
          paddingLeft: "20px",
          listStyle: "none",
        }}
      >
        {signalements.map((sig, idx) => (
          <li key={idx} style={{ fontSize: "14px", marginBottom: "6px", color: "#475569" }}>
            <strong>
              {getAlertIcon(sig.type)} {sig.type}
            </strong>
            <br />
            <small>
              {sig.description || "Aucune description"} • À {Math.round(sig.distance * 1000)}m
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

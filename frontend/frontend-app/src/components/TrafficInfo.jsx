export default function TrafficInfo({ traffic, distance, estimatedTime }) {
  const getTrafficEmoji = (level) => {
    if (level === "élevé") return "🔴";
    if (level === "moyen") return "🟠";
    return "🟢";
  };

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        {/* Distance */}
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            borderLeft: "3px solid #2563eb",
          }}
        >
          <small style={{ color: "#64748b", fontSize: "12px" }}>Distance</small>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginTop: "4px",
            }}
          >
            {distance.toFixed(1)} km
          </div>
        </div>

        {/* Temps estimé */}
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            borderLeft: "3px solid #8b5cf6",
          }}
        >
          <small style={{ color: "#64748b", fontSize: "12px" }}>Temps estimé</small>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#0f172a",
              marginTop: "4px",
            }}
          >
            {estimatedTime} min
          </div>
        </div>
      </div>

      {/* Trafic */}
      <div
        style={{
          padding: "12px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          borderLeft: "3px solid #f97316",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>{getTrafficEmoji(traffic.niveau)}</span>
          <div>
            <strong style={{ fontSize: "14px" }}>{getTrafficLabel(traffic.niveau)}</strong>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
              {getTrafficDescription(traffic.niveau)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

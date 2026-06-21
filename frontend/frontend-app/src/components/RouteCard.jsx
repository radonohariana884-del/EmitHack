export default function RouteCard({ route, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`route-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(route)}
    >
      <div className="route-card-title">{route.nom || `Route ${route.id}`}</div>
      <div className="route-card-meta">
        <span>Trafic : {route.niveau_trafic ?? "N/A"}</span>
        <span>Ville : {route.ville || "-"}</span>
      </div>
    </button>
  );
}

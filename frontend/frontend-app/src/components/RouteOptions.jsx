import React from "react";

/**
 * Affiche les options de routes (A, B, C) avec détails et sélection
 */
export default function RouteOptions({ 
  routes, 
  selectedRouteId, 
  onSelectRoute, 
  recommendedRouteId 
}) {
  if (!routes || routes.length === 0) {
    return null;
  }

  const getTrafficEmoji = (niveau) => {
    if (niveau === 'élevé') return '🔴';
    if (niveau === 'moyen') return '🟠';
    return '🟢';
  };

  const getRecommendationBadge = (routeId) => {
    if (routeId === recommendedRouteId) {
      return <span className="recommendation-badge">⭐ Recommandée</span>;
    }
    return null;
  };

  return (
    <div className="route-options-container">
      <h3 className="route-options-title">📍 Itinéraires disponibles</h3>
      <div className="route-options-list">
        {routes.map((route) => (
          <div
            key={route.id}
            className={`route-option-card ${
              selectedRouteId === route.id ? "selected" : ""
            } ${recommendedRouteId === route.id ? "recommended" : ""}`}
            onClick={() => onSelectRoute(route.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectRoute(route.id);
              }
            }}
          >
            <div className="route-option-header">
              <div className="route-option-id">{route.id}</div>
              <div className="route-option-name">{route.nom}</div>
              {getRecommendationBadge(route.id)}
            </div>

            <div className="route-option-details">
              <div className="route-detail">
                <span className="route-detail-label">Distance:</span>
                <span className="route-detail-value">{route.distance.toFixed(1)} km</span>
              </div>
              <div className="route-detail">
                <span className="route-detail-label">Temps:</span>
                <span className="route-detail-value">{route.time} min</span>
              </div>
              <div className="route-detail">
                <span className="route-detail-label">Trafic:</span>
                <span className={`traffic-badge ${route.traffic.niveau}`}>
                  {getTrafficEmoji(route.traffic.niveau)} {route.traffic.niveau}
                </span>
              </div>
            </div>

            {route.traffic.signalements.length > 0 && (
              <div className="route-incidents">
                <strong>⚠️ Alertes:</strong>
                <ul className="incidents-list">
                  {route.traffic.signalements.map((incident, idx) => (
                    <li key={idx} className="incident-item">
                      {incident.type} ({incident.distance.toFixed(1)} km)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="route-option-cta">
              {selectedRouteId === route.id && (
                <span className="selected-indicator">✓ Sélectionnée</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

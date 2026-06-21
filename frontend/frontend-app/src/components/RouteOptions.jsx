import React from "react";
import { AlertTriangle, MapPin, Clock, TrendingUp, ShieldAlert, Star } from "lucide-react";

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

  const getTrafficBadge = (niveau) => {
    const labels = {
      élevé: "Élevé",
      moyen: "Moyen",
      faible: "Faible",
    };
    return (
      <span className={`traffic-badge ${niveau}`}>
        <ShieldAlert className="traffic-icon" /> {labels[niveau] || niveau}
      </span>
    );
  };

  const getRecommendationBadge = (routeId) => {
    if (routeId === recommendedRouteId) {
      return (
        <span className="recommendation-badge">
          <Star className="badge-icon" /> Recommandée
        </span>
      );
    }
    return null;
  };

  return (
    <div className="route-options-container">
      <h3 className="route-options-title">
        <MapPin className="route-options-title-icon" /> Itinéraires disponibles
      </h3>
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
                <span className="route-detail-label">
                  <MapPin className="route-detail-icon" /> Distance
                </span>
                <span className="route-detail-value">{route.distance.toFixed(1)} km</span>
              </div>
              <div className="route-detail">
                <span className="route-detail-label">
                  <Clock className="route-detail-icon" /> Temps
                </span>
                <span className="route-detail-value">{route.time} min</span>
              </div>
              <div className="route-detail">
                <span className="route-detail-label">
                  <TrendingUp className="route-detail-icon" /> Trafic
                </span>
                {getTrafficBadge(route.traffic.niveau)}
              </div>
            </div>

            {route.traffic.signalements.length > 0 && (
              <div className="route-incidents">
                <strong>
                  <AlertTriangle className="route-alert-icon" /> Alertes:
                </strong>
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
                <span className="selected-indicator">Sélectionnée</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

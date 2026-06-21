import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "./services/api";
import { villes, villeCoords } from "./services/cityService";
import { fetchRoutes } from "./services/routingService";
import { evaluateRoute, recommendBestRoute, generateMultiRouteAdvice } from "./services/trafficService";
import CitySelect from "./components/CitySelect";
import RouteOptions from "./components/RouteOptions";
import AlertCard from "./components/AlertCard";
import RouteSummary from "./components/RouteSummary";
import MapAnimator from "./components/MapAnimator";
import MapHeader from "./components/MapHeader";
import SignalementMarker from "./components/SignalementMarker";

const startIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const endIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick([event.latlng.lat, event.latlng.lng]);
    },
  });
  return null;
}

export default function MapView() {
  const [selectedVille, setSelectedVille] = useState("Antananarivo");
  const [depart, setDepart] = useState(null);
  const [arrivee, setArrivee] = useState(null);
  const [signalements, setSignalements] = useState([]);
  const [loadingSignals, setLoadingSignals] = useState(false);
  const [allRoutes, setAllRoutes] = useState([]);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [error, setError] = useState("");
  const [reportMode, setReportMode] = useState(false);
  const [localVotes, setLocalVotes] = useState({});
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [mapZoom, setMapZoom] = useState(13);

  const mapCenter = useMemo(() => villeCoords[selectedVille], [selectedVille]);

  useEffect(() => {
    if (!depart || !arrivee) {
      setAllRoutes([]);
      return;
    }

    let active = true;
    setLoadingRoutes(true);
    setError("");

    fetchRoutes(depart, arrivee)
      .then((routes) => {
        if (!active) return;
        setAllRoutes(routes);
        setSelectedRouteId(routes[0]?.id || null);
      })
      .catch((err) => {
        if (!active) return;
        console.error(err);
        setAllRoutes([]);
        setError(err.message || "Impossible de calculer les itinéraires.");
      })
      .finally(() => {
        if (!active) return;
        setLoadingRoutes(false);
      });

    return () => {
      active = false;
    };
  }, [depart, arrivee]);

  const evaluatedRoutes = useMemo(() => {
    if (!allRoutes.length) return [];
    return allRoutes.map((route) => evaluateRoute(route, signalements));
  }, [allRoutes, signalements]);

  const recommendedRoute = useMemo(() => {
    if (!evaluatedRoutes.length) return null;
    return recommendBestRoute(evaluatedRoutes);
  }, [evaluatedRoutes]);

  useEffect(() => {
    if (recommendedRoute && !selectedRouteId) {
      setSelectedRouteId(recommendedRoute.id);
    }
  }, [recommendedRoute, selectedRouteId]);

  const selectedRoute = useMemo(() => {
    return evaluatedRoutes.find((route) => route.id === selectedRouteId) || recommendedRoute;
  }, [evaluatedRoutes, selectedRouteId, recommendedRoute]);

  // auto-reroute: si la route sélectionnée devient significativement pire, basculer
  useEffect(() => {
    if (!selectedRoute || !recommendedRoute) return;
    if (selectedRoute.id === recommendedRoute.id) return;

    // if selected route score is worse by a threshold, switch
    const threshold = 8; // points (minutes) or score units depending on scoring
    if (selectedRoute.score - recommendedRoute.score > threshold) {
      setSelectedRouteId(recommendedRoute.id);
    }
  }, [selectedRoute, recommendedRoute]);

  const advice = useMemo(() => {
    if (!selectedRoute) return null;
    return generateMultiRouteAdvice(evaluatedRoutes, selectedRoute);
  }, [selectedRoute, evaluatedRoutes]);

  useEffect(() => {
    setLoadingSignals(true);
    api
      .get("/signalements", { params: { ville: selectedVille } })
      .then((res) => {
        const fetched = Array.isArray(res.data) ? res.data : [];
        // attach local votes if any
        const withVotes = fetched.map((s) => ({
          ...s,
          votes: localVotes[s.id] || { up: 0, down: 0 },
        }));
        setSignalements(withVotes);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setSignalements([]);
        setError("Impossible de charger les signalements.");
      })
      .finally(() => setLoadingSignals(false));
  }, [selectedVille]);

  const handleCityChange = (event) => {
    const ville = event.target.value;
    setSelectedVille(ville);
    setDepart(null);
    setArrivee(null);
    setSelectedRouteId(null);
    setMapZoom(13);
    setError("");
  };

  const handleMapClick = (position) => {
    if (reportMode) {
      handleAddSignalement(position);
      return;
    }

    if (!depart) {
      setDepart(position);
      return;
    }
    if (!arrivee) {
      setArrivee(position);
      return;
    }
    setDepart(position);
    setArrivee(null);
    setSelectedRouteId(null);
  };

  const handleAddSignalement = async (position) => {
    try {
      const type = window.prompt('Type de signalement (Embouteillage, Accident, Travaux, Route bloquée):', 'Embouteillage');
      if (!type) return;
      const description = window.prompt('Description (optionnelle):', '');

      // Post minimal payload (hackathon: utilisateur_id & route_id set to 0)
      await api.post('/signalements', {
        utilisateur_id: 0,
        route_id: 0,
        type,
        description: description || '',
        latitude: position[0],
        longitude: position[1],
        ville: selectedVille,
      }).catch((e) => {
        // backend may not accept latitude/longitude; fallback to local add
        console.warn('POST signalement failed, adding locally', e?.message || e);
      });

      // Add locally so user sees immediate feedback
      const localId = `local-${Date.now()}`;
      const newS = {
        id: localId,
        type,
        description: description || '',
        latitude: String(position[0]),
        longitude: String(position[1]),
        votes: { up: 0, down: 0 },
      };
      setSignalements((s) => [newS, ...s]);
      setReportMode(false);
    } catch (err) {
      console.error(err);
      alert('Impossible d’ajouter le signalement.');
    }
  };

  const handleVote = (signalementId, isUp) => {
    setLocalVotes((prev) => {
      const curr = prev[signalementId] || { up: 0, down: 0 };
      const updated = isUp ? { ...curr, up: curr.up + 1 } : { ...curr, down: curr.down + 1 };
      // update signalements array to reflect votes in popup
      setSignalements((arr) => arr.map((s) => (s.id === signalementId ? { ...s, votes: updated } : s)));
      return { ...prev, [signalementId]: updated };
    });
  };

  const handleSelectRoute = (routeId) => {
    setSelectedRouteId(routeId);
  };

  return (
    <div className="map-app">
      <aside className="panel">
        <MapHeader ville={selectedVille} />

        <div className="panel-actions">
          <button
            type="button"
            onClick={() => setReportMode((v) => !v)}
            className={`action-button report-button ${reportMode ? "active-report" : ""}`}
          >
            {reportMode ? "Annuler signalement" : "Signaler embouteillage"}
          </button>
          <p className="panel-action-note">
            {reportMode
              ? "Cliquez sur la carte pour signaler un incident."
              : "Placez un signalement directement depuis le panneau de contrôle."}
          </p>
        </div>

        <CitySelect villes={villes} selectedVille={selectedVille} onChange={handleCityChange} />

        {loadingSignals && <div className="loading-text">Chargement des signalements...</div>}

        <div className="panel-status">
          <div>
            <small>Départ</small>
            <div>{depart ? `${depart[0].toFixed(5)}, ${depart[1].toFixed(5)}` : "Cliquez sur la carte"}</div>
          </div>
          <div>
            <small>Arrivée</small>
            <div>{arrivee ? `${arrivee[0].toFixed(5)}, ${arrivee[1].toFixed(5)}` : "Choisissez la destination"}</div>
          </div>
        </div>

        {evaluatedRoutes.length > 0 && (
          <>
            <RouteSummary selectedRoute={selectedRoute} />
            <RouteOptions
              routes={evaluatedRoutes}
              selectedRouteId={selectedRouteId}
              onSelectRoute={handleSelectRoute}
              recommendedRouteId={recommendedRoute?.id}
            />
          </>
        )}

        {selectedRoute?.traffic?.signalements?.length > 0 && (
          <AlertCard signalements={selectedRoute.traffic.signalements} trafficLevel={selectedRoute.traffic.niveau} />
        )}

        {advice && (
          <div className="advice-box">
            <h3>Assistant intelligent</h3>
            <p>{advice}</p>
          </div>
        )}

        {!depart && (
          <div className="instructions">
            <strong>1. Définir le départ</strong>
            <p>Cliquez sur la carte pour placer le point de départ.</p>
          </div>
        )}

        {depart && !arrivee && (
          <div className="instructions">
            <strong>2. Définir la destination</strong>
            <p>Cliquez sur la carte pour placer votre arrivée.</p>
          </div>
        )}

        {depart && arrivee && evaluatedRoutes.length === 0 && (
          <div className="instructions">
            <strong>3. Analyse en cours</strong>
            <p>Calcul de plusieurs itinéraires et évaluation du trafic.</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </aside>

      <main className="map-container">
        <MapContainer center={mapCenter} zoom={mapZoom} className="map-view">
          <MapAnimator center={mapCenter} zoom={mapZoom} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationClickHandler onMapClick={handleMapClick} />

          {depart && (
            <Marker position={depart} icon={startIcon}>
              <Popup>
                <strong>Point de départ</strong>
                <br />Lat : {depart[0].toFixed(5)}
                <br />Lng : {depart[1].toFixed(5)}
              </Popup>
            </Marker>
          )}

          {arrivee && (
            <Marker position={arrivee} icon={endIcon}>
              <Popup>
                <strong>Destination</strong>
                <br />Lat : {arrivee[0].toFixed(5)}
                <br />Lng : {arrivee[1].toFixed(5)}
              </Popup>
            </Marker>
          )}

          {evaluatedRoutes.map((route) => {
            const routeColor = route.traffic?.niveau === 'élevé'
              ? '#ef4444'
              : route.traffic?.niveau === 'moyen'
              ? '#f97316'
              : '#22c55e';
            return (
              <Polyline
                key={route.id}
                positions={route.waypoints}
                pathOptions={{
                  color: routeColor,
                  weight: selectedRouteId === route.id ? 6 : 4,
                  opacity: selectedRouteId === route.id ? 0.98 : 0.5,
                  dashArray: route.traffic.niveau === "élevé" ? "6, 6" : "",
                  interactive: true,
                  className: 'cursor-pointer',
                }}
                eventHandlers={{
                  click: () => handleSelectRoute(route.id),
                }}
              />
            );
          })}

          {signalements.map((signalement) => (
            <SignalementMarker key={signalement.id} signalement={signalement} onVote={handleVote} />
          ))}
        </MapContainer>
      </main>
    </div>
  );
}
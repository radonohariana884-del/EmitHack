/**
 * Service de gestion du trafic basé sur les signalements.
 * Détermine le niveau de trafic et génère des conseils intelligents.
 */

const R = 6371; // Rayon Terre en km

/**
 * Distance entre deux coordonnées en km.
 */
function getDistanceBetween([lat1, lng1], [lat2, lng2]) {
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calcule le trafic moyen sur une route basé sur les signalements.
 * Retourne : { niveau: 'faible'|'moyen'|'élevé', score: 0-100, signalements: [] }
 */
export function calculateTraffic(waypoints, signalements = []) {
  const relevantSignalements = [];
  let trafficScore = 0; // 0-100
  
  // Vérifier quels signalements sont près de la route (rayon de 1km)
  for (const signalement of signalements) {
    const [lat, lng] = [parseFloat(signalement.latitude), parseFloat(signalement.longitude)];
    const coordSignal = [lat, lng];
    
    // Distance minimale du signalement à la route
    let minDistance = Infinity;
    for (const wp of waypoints) {
      const dist = getDistanceBetween(wp, coordSignal);
      minDistance = Math.min(minDistance, dist);
    }
    
    // Si le signalement est à moins de 1.5 km de la route
    if (minDistance < 1.5) {
      relevantSignalements.push({ ...signalement, distance: minDistance });
      
      // ajouter au score en fonction du type
      // ajuster l'impact selon les votes locaux si fournis
      const votes = signalement.votes || { up: 0, down: 0 };
      let multiplier = 1;
      if (votes.down > votes.up) multiplier = 0.5; // signalement potentiellement faux
      else if (votes.up > votes.down) multiplier = 1.2; // confirmé

      if (signalement.type === 'Embouteillage') trafficScore += 40 * multiplier;
      else if (signalement.type === 'Accident') trafficScore += 35 * multiplier;
      else if (signalement.type === 'Route bloquée') trafficScore += 50 * multiplier;
      else trafficScore += 20 * multiplier;
    }
  }
  
  // Normaliser le score (max 100)
  trafficScore = Math.min(100, trafficScore);
  
  // Ajouter un peu de trafic de base (les villes ont du trafic)
  trafficScore = Math.max(20, trafficScore);
  
  let niveau = 'faible';
  if (trafficScore > 65) niveau = 'élevé';
  else if (trafficScore > 40) niveau = 'moyen';
  
  return {
    niveau,
    score: trafficScore,
    signalements: relevantSignalements,
  };
}

/**
 * Calcule la vitesse moyenne selon le niveau de trafic.
 */
export function getAverageSpeed(trafficNiveau) {
  const speeds = {
    faible: 30,  // 30 km/h
    moyen: 20,   // 20 km/h
    élevé: 10,   // 10 km/h
  };
  return speeds[trafficNiveau] || 20;
}

/**
 * Calcule le temps estimé en minutes.
 */
export function calculateEstimatedTime(distanceKm, trafficNiveau) {
  const speedKmh = getAverageSpeed(trafficNiveau);
  const hours = distanceKm / speedKmh;
  return Math.round(hours * 60); // retourner en minutes
}

/**
 * Génère un conseil intelligent basé sur le trafic et les signalements.
 */
export function generateTrafficAdvice(distance, traffic, signalements) {
  const timeMin = calculateEstimatedTime(distance, traffic.niveau);
  
  let advice = "";
  const alertCount = signalements.length;
  
  if (traffic.niveau === 'élevé') {
    advice = `🚨 Embouteillage détecté! `;
    if (alertCount > 0) {
      const types = [...new Set(signalements.map((s) => s.type))];
      advice += `Problèmes signalés: ${types.join(', ')}. `;
    }
    advice += `Temps estimé: ${timeMin} minutes. `;
    advice += "Il est recommandé de partir maintenant ou d'attendre 30 minutes.";
  } else if (traffic.niveau === 'moyen') {
    advice = `⚠️ Trafic modéré détecté. `;
    if (alertCount > 0) {
      advice += `${alertCount} incident(s) sur votre trajet. `;
    }
    advice += `Temps estimé: ${timeMin} minutes. Départ conseillé dans 10 minutes.`;
  } else {
    advice = `✅ Circulation fluide. `;
    advice += `Temps estimé: ${timeMin} minutes. Vous pouvez partir immédiatement.`;
  }
  
  return advice;
}

/**
 * Détermine la couleur de la polyline selon le trafic.
 */
export function getTrafficColor(trafficNiveau) {
  const colors = {
    faible: '#22c55e',   // vert
    moyen: '#f97316',    // orange
    élevé: '#ef4444',    // rouge
    embouteillage: '#ef4444',
    accident: '#ef4444',
    travaux: '#f97316',
    'route bloquée': '#ef4444',
  };
  return colors[trafficNiveau] || '#22c55e';
}

/**
 * Évalue une seule route avec ses données de trafic
 */
export function evaluateRoute(route, signalements = []) {
  const traffic = calculateTraffic(route.waypoints, signalements);
  const timeMin = calculateEstimatedTime(route.distance, traffic.niveau);
  // appliquer une pénalité temporelle basée sur le score de trafic
  // score 0-100 -> penalty minutes = round(score / 10)
  const penaltyMinutes = Math.round(traffic.score / 10);
  const finalTimeMin = timeMin + penaltyMinutes;

  return {
    id: route.id,
    nom: route.nom,
    waypoints: route.waypoints,
    distance: route.distance,
    time: finalTimeMin,
    baseTime: timeMin,
    penaltyMinutes,
    traffic: traffic,
    color: getTrafficColor(traffic.niveau),
    score: calculateRouteScore(route.distance, finalTimeMin, traffic.score, traffic.signalements.length)
  };
}

/**
 * Calcule un score pour une route (utilisé pour recommandation)
 * Score bas = meilleur
 */
function calculateRouteScore(distance, timeMin, trafficScore, incidentCount) {
  // Score = temps + pénalité trafic + pénalité incidents
  let score = timeMin;
  
  // Pénalité selon le trafic
  if (trafficScore > 65) score += 20;
  else if (trafficScore > 40) score += 10;
  
  // Pénalité pour chaque incident
  score += incidentCount * 5;
  
  return score;
}

/**
 * Recommande la meilleure route parmi plusieurs
 */
export function recommendBestRoute(evaluatedRoutes) {
  if (!evaluatedRoutes || evaluatedRoutes.length === 0) return null;
  
  // Trouver la route avec le score le plus bas
  let bestRoute = evaluatedRoutes[0];
  let bestScore = bestRoute.score;
  
  for (const route of evaluatedRoutes) {
    if (route.score < bestScore) {
      bestScore = route.score;
      bestRoute = route;
    }
  }
  
  return bestRoute;
}

/**
 * Génère un conseil pour plusieurs routes
 */
export function generateMultiRouteAdvice(evaluatedRoutes, recommendedRoute) {
  const best = recommendedRoute;
  const timeMin = best.time;
  const traffic = best.traffic;
  let advice = "";
  
  if (traffic.niveau === 'élevé') {
    advice = `🚨 Route ${best.id} : Embouteillage détecté. `;
    advice += `Temps: ${timeMin} min. `;
    advice += `Considérez les autres routes pour éviter le trafic.`;
  } else if (traffic.niveau === 'moyen') {
    advice = `⚠️ Route ${best.id} recommandée. `;
    advice += `Trafic modéré, temps: ${timeMin} min. `;
    if (traffic.signalements.length > 0) {
      advice += `${traffic.signalements.length} incident(s) détecté(s).`;
    }
  } else {
    advice = `✅ Route ${best.id} recommandée. `;
    advice += `Circulation fluide, temps: ${timeMin} min. `;
    advice += `Vous pouvez partir immédiatement!`;
  }
  
  return advice;
}

# 🚗 Smart Traffic Assistant - Application Hackathon

Une application intelligente de gestion du trafic urbain pour Madagascar qui démontre une solution complète contre les embouteillages.

## 🎯 Objectif Principal

Transformer les problèmes d'embouteillage urbain en intelligence décisionnelle en utilisant :
- **Calcul d'itinéraires réalistes** (avec waypoints, pas juste une ligne droite)
- **Système de trafic dynamique** (basé sur les signalements en temps réel)
- **Visualisation intelligente** (couleurs selon le niveau de trafic)
- **Conseils générés intelligemment** (adaptés à la situation du trafic)
- **Alertes visuelles** (pour tous les incidents détectés)

## ✨ Fonctionnalités Clés

### 1. Interface Intuitive Moderne
```
┌─────────────────────┬──────────────────────────────────┐
│                     │                                  │
│  Sélection Ville    │                                  │
│  Infos Trafic       │      OPENSTREETMAP               │
│  Alertes            │      PLEIN ÉCRAN                 │
│  Conseils           │                                  │
│                     │      🟢 Départ                   │
│                     │      🔴 Destination              │
│                     │      ═════ Itinéraire            │
│                     │      ⭕ Signalements             │
│                     │                                  │
└─────────────────────┴──────────────────────────────────┘
```

### 2. Système de Trafic Couleur

| Couleur | État | Vitesse | Description |
|---------|------|---------|-------------|
| 🟢 Vert | Fluide | 30 km/h | Circulation normale |
| 🟠 Orange | Moyen | 20 km/h | Trafic modéré, quelques incidents |
| 🔴 Rouge | Élevé | 10 km/h | Embouteillage, plusieurs incidents |

### 3. Calcul Intelligent du Temps

```javascript
Temps estimé = Distance / Vitesse_moyenne_selon_trafic

Exemple pour 10 km:
- Trafic fluide   → 10 ÷ 30 = 20 minutes
- Trafic moyen    → 10 ÷ 20 = 30 minutes
- Trafic élevé    → 10 ÷ 10 = 60 minutes
```

### 4. Détection d'Incidents

- **Rayon de détection**: 1.5 km de part et d'autre de la route
- **Types d'incidents**: Accidents, Embouteillages, Routes bloquées
- **Score impact**: 20-50 points selon la gravité
- **Affichage**: Cercles colorés sur la carte

### 5. Conseils Générés Dynamiquement

```
Circulation Fluide ✅
"Circulation fluide. Temps estimé: 20 minutes. 
 Vous pouvez partir immédiatement."

Trafic Moyen ⚠️
"Trafic modéré détecté. 1 incident sur votre trajet. 
 Temps estimé: 30 minutes. Départ conseillé dans 10 minutes."

Embouteillage 🚨
"Embouteillage détecté! Problèmes signalés: Accident, Route bloquée. 
 Temps estimé: 60 minutes. 
 Il est recommandé de partir maintenant ou d'attendre 30 minutes."
```

## 🏗️ Architecture Technique

### Frontend (React + Leaflet)
```
src/
├── MapView.jsx                 ← Composant principal
├── App.jsx                     ← Wrapper
├── App.css                     ← Styles
├── services/
│   ├── api.js                  ← Requêtes HTTP
│   ├── routingService.js       ← Calcul itinéraires
│   └── trafficService.js       ← Évaluation trafic
└── components/
    ├── CitySelect.jsx
    ├── TrafficInfo.jsx         ← Infos distance/temps/trafic
    ├── AlertCard.jsx           ← Alertes incidents
    ├── AdviceCard.jsx          ← Conseils
    ├── TripInfo.jsx            ← Infos basiques
    └── RouteCard.jsx
```

### Backend (Node.js + Express + MySQL)
```
backend/
├── server.js
├── controllers/
│   ├── routeController.js
│   ├── signalementController.js ← Route GET /signalements?ville=X
│   └── assistantController.js
├── models/
│   ├── routeModel.js
│   ├── signalementModel.js    ← getSignalementsByVille()
│   └── assistantModel.js
└── routes/
    ├── routeRoutes.js
    ├── signalementRoutes.js    ← GET, POST
    └── assistantRoutes.js
```

## 🚀 Guide de Démarrage

### Prérequis
- Node.js 16+
- MySQL 5.7+
- npm ou yarn

### Installation

**1. Clone et dépendances**
```bash
cd EmitHack

# Backend
cd backend
npm install

# Frontend
cd ../frontend/frontend-app
npm install
```

**2. Configuration BD**
```sql
-- Créer les tables (si pas déjà fait)
CREATE TABLE route (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255),
  ville VARCHAR(100),
  niveau_trafic INT
);

CREATE TABLE signalement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_id INT,
  type VARCHAR(100),
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES route(id)
);

CREATE TABLE utilisateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255)
);
```

**3. Fichier `.env` backend**
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=traffic_db
```

**4. Lancer l'app**
```bash
# Terminal 1 - Backend (depuis backend/)
npm start
# → Serveur écoute sur http://localhost:3000

# Terminal 2 - Frontend (depuis frontend/frontend-app/)
npm run dev
# → App disponible sur http://localhost:5173
```

## 📍 Guide Utilisateur

### Étape 1 : Choisir une Ville
- Sélectionner l'une des 7 villes : Antananarivo, Toamasina, Fianarantsoa, Mahajanga, Toliara, Antsiranana, Antsirabe
- La carte se centre automatiquement sur la ville

### Étape 2 : Marquer le Point de Départ
- **Cliquez une première fois** sur la carte
- Un marqueur 🟢 (vert) apparaît

### Étape 3 : Marquer la Destination
- **Cliquez une deuxième fois** sur la carte
- Un marqueur 🔴 (rouge) apparaît
- Un itinéraire s'affiche automatiquement

### Étape 4 : Analyser le Trafic
Le système affiche automatiquement :
- **Distance** en km
- **Temps estimé** en minutes
- **Niveau de trafic** avec couleur
- **Alertes** si incidents sur le trajet

### Étape 5 : Obtenir les Conseils
- Cliquez **"📍 Obtenir les conseils"**
- Un conseil personnalisé s'affiche basé sur le trafic

## 🔬 Données de Test

### Signalements Disponibles
```sql
-- Antananarivo
INSERT INTO signalement (route_id, type, description, latitude, longitude)
VALUES 
  (1, 'Embouteillage', 'Embouteillage à Analakely', -18.8792, 47.5079),
  (1, 'Accident', 'Accident à Ankorondrano', -18.8850, 47.5150),
  (2, 'Route bloquée', 'Route bloquée à Ivandry', -18.8700, 47.5200);

-- Toamasina
INSERT INTO signalement (route_id, type, description, latitude, longitude)
VALUES 
  (3, 'Embouteillage', 'Trafic dense avenue 26 juin', -18.1492, 49.4023),
  (4, 'Accident', 'Véhicule en panne', -18.1500, 49.4050);
```

## 📊 Cas d'Usage Démo

### Scénario 1 : Trafic Fluide ✅
```
Sélectionner: Antananarivo
Départ: Analakely [-18.8792, 47.5079]
Arrivée: Andohalo [-18.8750, 47.5130]
Distance: ~2.5 km
Temps: ~5 min (trafic fluide)
Conseil: "Vous pouvez partir immédiatement"
```

### Scénario 2 : Trafic Moyen ⚠️
```
Sélectionner: Antananarivo
Départ: Analakely [-18.8792, 47.5079]
Arrivée: Ivandry [-18.8700, 47.5200]
Distance: ~6 km
Incidents: 1 (Accident à Ankorondrano)
Temps: ~18 min
Trafic: Orange (moyen)
Conseil: "Trafic modéré. Attendre 10 min ou partir maintenant"
```

### Scénario 3 : Embouteillage 🚨
```
Sélectionner: Antananarivo
Départ: Ouest [-18.9000, 47.4800]
Arrivée: Est [-18.8500, 47.5300]
Distance: ~10 km
Incidents: 2-3 signalements
Temps: ~60 min
Trafic: Rouge (élevé)
Polyline: Pointillée rouge
Conseil: "Embouteillage. Attendre 30 minutes recommandé"
```

## 🎓 Approche Hackathon

Cette application démontre :

1. **Intégration de données en temps réel**
   - Récupération des signalements depuis la BD
   - Filtrage par proximité géographique

2. **Algorithmes sophistiqués**
   - Calcul haversine pour distances réelles
   - Génération de waypoints pour routes réalistes
   - Scoring dynamique du trafic

3. **Visualisation spatiale**
   - Polylines colorées selon trafic
   - Marqueurs iconographiques
   - Alertes visuelles avec cercles

4. **Intelligence décisionnelle**
   - Conseils basés sur données
   - Estimations adaptées à la situation
   - Messages contextuels

5. **UX/UI moderne**
   - Interface type GPS
   - Responsive design
   - Feedback instantané

## 🐛 Dépannage

### "Impossible de charger les signalements"
- Vérifier que le backend tourne (port 3000)
- Vérifier la BD est accessible
- Vérifier la table `signalement` a des données

### "La carte ne charge pas"
- Vérifier votre connexion internet (OpenStreetMap)
- Vérifier les logs du navigateur (F12)

### "Aucun itinéraire"
- Vous devez cliquer 2 fois sur la carte
- 1er clic = départ, 2e clic = destination

## 📝 Fichiers Clés Modifiés

- `frontend/frontend-app/src/MapView.jsx` - Composant principal refactorisé
- `frontend/frontend-app/src/services/routingService.js` - Nouveau service
- `frontend/frontend-app/src/services/trafficService.js` - Nouveau service
- `frontend/frontend-app/src/components/TrafficInfo.jsx` - Nouveau composant
- `frontend/frontend-app/src/components/AlertCard.jsx` - Nouveau composant
- `frontend/frontend-app/src/App.css` - Styles améliorés
- `backend/models/signalementModel.js` - Support filtre par ville
- `backend/controllers/signalementController.js` - Route GET /signalements?ville=X

## 🎉 Points Forts de la Présentation

✅ **Logique métier réelle** - Pas juste une démo, vraiment utile  
✅ **Intégration données** - Utilise les signalements de la BD  
✅ **Visualisation intelligente** - Couleurs significatives  
✅ **UX moderne** - Ressemble à un vrai produit  
✅ **Scalable** - Architecture propre, facile à étendre  
✅ **Démonstrable** - Résultats visuels immédiats  

---

**Bonne présentation ! 🚀**

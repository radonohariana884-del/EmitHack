# Smart Traffic Assistant - Guide Fonctionnel

## 🎯 Vision

Application intelligente de gestion du trafic urbain à Madagascar. Au lieu d'afficher simplement une ligne entre deux points, l'application :

- Calcule des itinéraires réalistes avec waypoints
- Évalue le trafic en temps réel basé sur les signalements
- Affiche des alertes visuelles pour les incidents
- Génère des conseils intelligents adaptés à la situation du trafic
- Propose des estimations de temps d'arrivée réalistes

## 🚀 Fonctionnalités Implémentées

### 1. **Sélection de Ville**
- Utilisateur choisit parmi 7 villes malgaches
- Carte centrée automatiquement sur la ville

### 2. **Pointage du Trajet**
- Clic 1 : Marquer le point de départ (🟢 vert)
- Clic 2 : Marquer la destination (🔴 rouge)

### 3. **Calcul d'Itinéraire Réaliste**
- Génération de waypoints (2-4 points intermédiaires)
- Simule un vrai parcours urbain, pas une ligne droite
- Distance calculée avec formule haversine

### 4. **Système de Trafic Dynamique**
- Récupération des signalements de la base de données
- Détection des incidents dans un rayon de 1.5 km de la route
- Évaluation du trafic (faible/moyen/élevé)

### 5. **Visualisation du Trafic**
```
Vert   🟢 → Circulation fluide (vitesse 30 km/h)
Orange 🟠 → Trafic moyen (vitesse 20 km/h)
Rouge  🔴 → Embouteillage (vitesse 10 km/h)
```

- Polyline change de couleur selon le niveau
- Ligne pointillée si embouteillage (🔴)
- Cercles pour afficher les signalements pertinents

### 6. **Calcul du Temps Estimé**
```
Temps = Distance / Vitesse_moyenne_selon_trafic

Exemples:
- 10 km + Trafic faible = 20 min (30 km/h)
- 10 km + Trafic moyen  = 30 min (20 km/h)
- 10 km + Trafic élevé  = 60 min (10 km/h)
```

### 7. **Panneau d'Informations Détaillé**
Affiche en temps réel :
- Distance totale en km
- Temps estimé en minutes
- Niveau de trafic avec indicateur visuel
- Vitesse moyenne estimée

### 8. **Alertes Visuelles**
- Cadre d'alerte avec background coloré
- Liste des signalements sur le trajet
- Types : Accident 🚗, Embouteillage 🚦, Route bloquée 🚧
- Distance du signalement par rapport à la route

### 9. **Conseils Intelligents Générés**
```
Circulation fluide:
✅ "Circulation fluide. Temps estimé: 20 minutes. 
    Vous pouvez partir immédiatement."

Trafic moyen:
⚠️ "Trafic modéré détecté. 1 incident sur votre trajet. 
    Temps estimé: 30 minutes. Départ conseillé dans 10 minutes."

Embouteillage:
🚨 "Embouteillage détecté! Problèmes signalés: Accident, Embouteillage. 
    Temps estimé: 60 minutes. 
    Il est recommandé de partir maintenant ou d'attendre 30 minutes."
```

## 📊 Données Intégrées

### Signalements Utilisés
```javascript
Type de signalement → Impact trafic
Embouteillage      → +40 points
Accident           → +35 points
Route bloquée      → +50 points
Autre              → +20 points
```

### Score de Trafic (0-100)
```
0-40   → 🟢 Circulation fluide (30 km/h)
40-65  → 🟠 Trafic moyen (20 km/h)
65-100 → 🔴 Embouteillage (10 km/h)
```

## 🛠️ Architecture Technique

### Services Frontend
- **routingService.js** : Calcul d'itinéraire avec waypoints
- **trafficService.js** : Évaluation du trafic et génération des conseils

### Composants Réutilisables
- **CitySelect.jsx** : Sélection de ville
- **TrafficInfo.jsx** : Affichage des infos trafic
- **AlertCard.jsx** : Affichage des alertes
- **AdviceCard.jsx** : Affichage des conseils

### Backend Routes
- `GET /signalements?ville=Antananarivo` → Signalements filtrés par ville
- `GET /routes?ville=Antananarivo` → Routes de la ville
- `POST /assistant` → Conseil intelligent

## 💡 Cas d'Usage Hackathon

### Scénario 1 : Circulation Fluide
1. Sélectionner Antananarivo
2. Cliquer départ/arrivée proches
3. Voir : Distance courte, temps rapide, trafic vert
4. Conseil : "Allez-y maintenant"

### Scénario 2 : Trafic Moyen avec Incident
1. Sélectionner Antananarivo
2. Tracer itinéraire de 5 km
3. Voir : 1-2 signalements sur la route
4. Couleur orange, temps estimé 15 min
5. Conseil : "Attendez 10 min ou partez maintenant"

### Scénario 3 : Embouteillage Majeur
1. Sélectionner Antananarivo
2. Tracer itinéraire de 10 km
3. Voir : Multiples incidents, couleur rouge pointillée
4. Temps estimé 60+ minutes
5. Alerte : "Embouteillage détecté - attendre 30 minutes"

## 📱 Interface Utilisateur

### Left Panel (360px)
- Titre + Description
- Sélecteur de ville
- Infos trafic (distance, temps, niveau)
- Alertes (si incidents)
- Bouton "Obtenir les conseils"
- Conseils intelligents
- Instructions contextuelles

### Right Panel (Map)
- OpenStreetMap plein écran
- Marqueur vert = départ
- Marqueur rouge = destination
- Polyline colorée = itinéraire
- Cercles = signalements avec popup
- Zoom 12 pour vue urbaine

## 🎓 Apprentissages pour le Hackathon

Cette application démontre :
1. **Intégration de données en temps réel**
2. **Algorithmes de routage et calcul de distances**
3. **Visualisation de données spatiales**
4. **Logique de recommendation intelligente**
5. **UX moderne type GPS**
6. **Architecture frontend/backend scalable**

---

**Pour démarrer l'app:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend/frontend-app
npm run dev
```

**Puis ouvrir:** `http://localhost:5173`

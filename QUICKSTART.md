# ⚡ QUICKSTART - Smart Traffic Assistant

## 🚀 Lancer l'App en 5 Minutes

### Étape 1: Préparer la Base de Données

```bash
# Ouvrir MySQL
mysql -u root -p

# Copier-coller le contenu de SQL_DONNEES_TEST.md (section "Script SQL Complet")
# Ou exécuter:
```

```sql
CREATE DATABASE IF NOT EXISTS traffic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE traffic_db;

-- [Copier les CREATE TABLE statements de SQL_DONNEES_TEST.md]
-- [Copier les INSERT statements de SQL_DONNEES_TEST.md]
```

**Vérifier:**
```sql
SELECT COUNT(*) FROM route; -- Doit afficher 17
SELECT COUNT(*) FROM signalement; -- Doit afficher 28
SELECT COUNT(*) FROM utilisateur; -- Doit afficher 3
EXIT;
```

---

### Étape 2: Configurer le Backend

```bash
cd backend

# Créer/mettre à jour .env
cat > .env << EOF
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=traffic_db
NODE_ENV=development
EOF

# Installer dépendances
npm install

# Lancer le serveur
npm start
```

**✅ Succès:** Message "Server running on port 3000"

---

### Étape 3: Configurer le Frontend

```bash
# Dans un NOUVEAU terminal
cd frontend/frontend-app

# Installer dépendances (si pas déjà fait)
npm install

# Lancer le dev server
npm run dev
```

**✅ Succès:** Message "Local: http://localhost:5173"

---

### Étape 4: Ouvrir l'App

- Ouvrir navigateur
- Aller à: **http://localhost:5173**
- Attendre le chargement de la carte

---

## 🎮 Premier Test

### Cas Simple (Trafic Fluide)

1. **Sélectionner une ville**: Antananarivo
2. **Cliquer sur la carte** pour placer départ (marqueur 🟢)
3. **Cliquer à nouveau** pour placer destination (marqueur 🔴)
4. Observer:
   - ✅ Itinéraire apparaît
   - ✅ Couleur polyline (vert/orange/rouge)
   - ✅ Distance et temps affichés
   - ✅ Alertes si incidents détectés
5. **Cliquer "📍 Obtenir les conseils"**
6. Observer conseil intelligent

---

## 🔧 Dépannage Rapide

| Problème | Solution |
|----------|----------|
| "Cannot GET /" | Vérifier port 5173 (frontend) |
| "Cannot POST /signalements" | Vérifier port 3000 (backend running) |
| Carte vide | Attendre 2-3 secondes, vérifier internet |
| "Database connection error" | Vérifier MySQL running, .env valide |
| Pas d'incidents affichés | Vérifier table signalement a données (voir SQL_DONNEES_TEST.md) |

---

## 📊 Tester les 3 Scénarios

### Scénario 1: Trafic Fluide ✅

```
Ville: Antananarivo
Départ: Cliquer près de [-18.88, 47.51]
Arrivée: Cliquer près de [-18.87, 47.52]
Distance: ~2 km
Temps: ~4 min
Trafic: VERT 🟢
Conseil: "Vous pouvez partir immédiatement"
```

### Scénario 2: Trafic Moyen ⚠️

```
Ville: Antananarivo
Départ: Route sud [-18.90, 47.50]
Arrivée: Route nord [-18.87, 47.52]
Distance: ~5 km
Temps: ~15 min
Trafic: ORANGE 🟠
Incidents: 1-2 signalements
Conseil: "Trafic modéré... attendre 10 min ou partir"
```

### Scénario 3: Embouteillage 🚨

```
Ville: Antananarivo
Départ: Ouest [-18.90, 47.48]
Arrivée: Est [-18.85, 47.53]
Distance: ~10 km
Temps: ~60 min
Trafic: ROUGE 🔴
Polyline: POINTILLÉE
Incidents: 3+ signalements
Conseil: "Embouteillage détecté... attendre 30 min recommandé"
```

---

## 📱 Interface Tour

### Panel Gauche (360px)
```
┌─────────────────────────────────────┐
│  Smart Traffic Assistant            │
│  Une logique de circulation urbaine  │
│  intelligente pour Madagascar       │
│                                      │
│  🏙️ Sélectionner Ville              │
│     [Antananarivo ▼]                │
│                                      │
│  📍 Infos Trafic                    │
│     Distance: 5.2 km                │
│     Temps estimé: 16 min            │
│     Niveau: Moyen 🟠                │
│                                      │
│  ⚠️ Alertes                         │
│     • Accident (0.8 km)             │
│     • Embouteillage (1.2 km)        │
│                                      │
│  [📍 Obtenir les conseils]          │
│                                      │
│  💡 Conseil                         │
│     "Trafic modéré détecté..."      │
│                                      │
│  📋 Instructions                    │
│     1. Partir dans 10 minutes       │
│     2. Rester vigilant              │
│     3. Prévoir temps buffer         │
└─────────────────────────────────────┘
```

### Map (Reste)
```
OpenStreetMap
- Zoom 12 (vue urbaine)
- Marqueur 🟢 départ
- Marqueur 🔴 destination
- Polyline colorée (itinéraire)
- Cercles (signalements)
- Popup au survol
```

---

## 🔍 Vérifier que Tout Marche

### Checklist Rapide

```
Backend:
  ☑️ npm start répond
  ☑️ Port 3000 réachable
  ☑️ GET /routes?ville=Antananarivo répond
  ☑️ GET /signalements?ville=Antananarivo répond
  ☑️ BD a 17 routes + 28 signalements

Frontend:
  ☑️ npm run dev répond
  ☑️ Port 5173 chargeable
  ☑️ Carte s'affiche
  ☑️ Sélection ville marche
  ☑️ Clic carte place marqueurs
  ☑️ Itinéraire s'affiche
  ☑️ Couleur polyline change selon trafic
  ☑️ Infos trafic affichées
  ☑️ Alertes affichées
  ☑️ Conseils générés
```

---

## 💻 Commandes Clés

```bash
# Backend - démarrer
cd backend && npm start

# Frontend - démarrer
cd frontend/frontend-app && npm run dev

# MySQL - lancer (si pas en service)
mysql -u root -p

# Vérifier BD
mysql -u root -p traffic_db -e "SELECT COUNT(*) FROM route;"

# Tuer processus port 3000 (si bloqué)
lsof -ti:3000 | xargs kill -9

# Tuer processus port 5173 (si bloqué)
lsof -ti:5173 | xargs kill -9
```

---

## 🎯 Objectifs de Présentation Hackathon

Après lancement, vous pouvez montrer:

✨ **Logique Intelligente**
- Pas juste une ligne droite, un vrai itinéraire
- Calcul réaliste des temps
- Évaluation dynamique du trafic

✨ **Données Temps Réel**
- Récupération des signalements BD
- Filtrage par proximité
- Détection automatique d'incidents

✨ **UX Moderne**
- Comme une vraie app GPS
- Design cohérent
- Retours visuels immédats

✨ **Extensible**
- Architecture propre
- Services réutilisables
- Facile d'ajouter features

---

## ❓ Questions Fréquentes

**Q: Pourquoi ma carte est grise?**
A: Attendre 2-3 sec, ou vérifier internet (OpenStreetMap externe)

**Q: Pas de marqueurs après clic?**
A: Vérifier console (F12) pour erreurs, refresher page

**Q: Pas de trafic (tout vert)?**
A: Vérifier signalements existe (voir SQL_DONNEES_TEST.md), ou route trop courte

**Q: "Cannot connect to MySQL"?**
A: Vérifier .env, MySQL running, créé BD

**Q: Port déjà utilisé?**
A: Utiliser autre port dans .env, ou tuer processus (lsof)

---

## 🚀 Prêt!

Si tout s'affiche correctement, c'est prêt pour la présentation! 

**Bonne chance au Hackathon! 🎉**

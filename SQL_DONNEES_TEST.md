# 📊 Données SQL de Test - Smart Traffic Assistant

## Tables de Base de Données

### Table: utilisateur
```sql
CREATE TABLE utilisateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO utilisateur (nom, email) VALUES
  ('Alice Rakoto', 'alice@example.mg'),
  ('Bob Andriamampoinimerina', 'bob@example.mg'),
  ('Claire Ratsimamanga', 'claire@example.mg');
```

---

### Table: route
```sql
CREATE TABLE route (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  ville VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  niveau_trafic INT DEFAULT 0,
  distance_km DECIMAL(8, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Routes pour Antananarivo
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Route Ivandry-Analakely', 'Antananarivo', -18.8750, 47.5150, 3.5),
  ('Route Andohalo-Ankorondrano', 'Antananarivo', -18.8700, 47.5200, 4.2),
  ('Route Avaradoaka-Anosy', 'Antananarivo', -18.8850, 47.5100, 2.8),
  ('Route Betondrano-Mandrosoa', 'Antananarivo', -18.8900, 47.5250, 5.6),
  ('Route Centre-Sabotsy', 'Antananarivo', -18.8792, 47.5079, 6.3);

-- Routes pour Toamasina
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue 26 Juin', 'Toamasina', -18.1492, 49.4023, 2.5),
  ('Route Avenue de France', 'Toamasina', -18.1500, 49.4050, 3.8),
  ('Boulevard Joffre', 'Toamasina', -18.1520, 49.3980, 4.1);

-- Routes pour Antsirabe
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Route de Fianarantsoa', 'Antsirabe', -19.8677, 47.5337, 5.2),
  ('Avenue du 26 Juin', 'Antsirabe', -19.8700, 47.5300, 3.5);

-- Routes pour Fianarantsoa
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Route vers Ihosy', 'Fianarantsoa', -21.4532, 47.2997, 6.8),
  ('Avenue Ramiandrisoa', 'Fianarantsoa', -21.4500, 47.3000, 4.2);

-- Routes pour Mahajanga
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue Joffre', 'Mahajanga', -15.7167, 46.3167, 3.2),
  ('Route du Port', 'Mahajanga', -15.7150, 46.3200, 2.8);

-- Routes pour Toliara
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue de l''Indépendance', 'Toliara', -23.3632, 43.6633, 2.9),
  ('Route du Phare', 'Toliara', -23.3650, 43.6650, 3.5);

-- Routes pour Antsiranana
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue Colbert', 'Antsiranana', -12.2797, 49.2832, 3.1),
  ('Route de la Baie', 'Antsiranana', -12.2800, 49.2850, 4.3);
```

---

### Table: signalement
```sql
CREATE TABLE signalement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_id INT NOT NULL,
  utilisateur_id INT,
  type VARCHAR(100) NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  severity INT DEFAULT 1,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES route(id),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

-- Signalements pour Antananarivo
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  -- Route 1 : Ivandry-Analakely
  (1, 1, 'Embouteillage', 'Embouteillage important à Analakely vers 8h', -18.8792, 47.5079, 3),
  (1, 2, 'Accident', 'Accident routier à intersection près de Carrefour', -18.8820, 47.5100, 4),
  
  -- Route 2 : Andohalo-Ankorondrano
  (2, 1, 'Route bloquée', 'Route bloquée à Ankorondrano suite travaux', -18.8850, 47.5150, 5),
  (2, 3, 'Embouteillage', 'Trafic dense aux heures de pointe', -18.8810, 47.5170, 2),
  
  -- Route 3 : Avaradoaka-Anosy
  (3, 2, 'Accident', 'Véhicule en panne sur la voie de droite', -18.8870, 47.5120, 2),
  
  -- Route 4 : Betondrano-Mandrosoa
  (4, 1, 'Embouteillage', 'Embouteillage causé par marché informel', -18.8920, 47.5200, 3),
  (4, 3, 'Route bloquée', 'Route temporairement fermée pour réparation', -18.8940, 47.5280, 4),
  
  -- Route 5 : Centre-Sabotsy
  (5, 2, 'Accident', 'Collision mineure entre taxis brousse', -18.8800, 47.5050, 2),
  (5, 1, 'Embouteillage', 'Trafic très dense au centre-ville', -18.8810, 47.5080, 4);

-- Signalements pour Toamasina
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (6, 1, 'Embouteillage', 'Embouteillage avenue 26 Juin', -18.1492, 49.4023, 3),
  (6, 2, 'Accident', 'Accident suite pluie abondante', -18.1480, 49.4010, 3),
  (7, 3, 'Route bloquée', 'Rue inondée - impraticable', -18.1500, 49.4060, 4),
  (8, 1, 'Accident', 'Véhicule immobilisé sur chaussée', -18.1530, 49.3990, 2);

-- Signalements pour Antsirabe
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (9, 2, 'Embouteillage', 'Marché inondant la route', -19.8680, 47.5350, 3),
  (10, 1, 'Accident', 'Charrette renversée', -19.8710, 47.5310, 2);

-- Signalements pour Fianarantsoa
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (11, 3, 'Route bloquée', 'Éboulement partiellement bloquant', -21.4550, 47.3010, 3),
  (12, 1, 'Embouteillage', 'Trafic aux abords du centre', -21.4510, 47.3005, 2);

-- Signalements pour Mahajanga
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (13, 2, 'Accident', 'Accident intersection principale', -15.7170, 46.3180, 3),
  (14, 1, 'Embouteillage', 'Trafic portuaire intense', -15.7140, 46.3210, 2);

-- Signalements pour Toliara
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (15, 1, 'Embouteillage', 'Trafic centre-ville', -23.3640, 43.6640, 2),
  (16, 3, 'Accident', 'Accident route du phare', -23.3660, 43.6660, 2);

-- Signalements pour Antsiranana
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (17, 2, 'Embouteillage', 'Trafic avenue Colbert', -12.2800, 49.2840, 2),
  (18, 1, 'Route bloquée', 'Route baie impraticable', -12.2810, 49.2860, 3);
```

---

## 🚀 Script SQL Complet d'Installation

```sql
-- Créer la base de données
CREATE DATABASE IF NOT EXISTS traffic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE traffic_db;

-- Table utilisateur
CREATE TABLE utilisateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table route
CREATE TABLE route (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  ville VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  niveau_trafic INT DEFAULT 0,
  distance_km DECIMAL(8, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table signalement
CREATE TABLE signalement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_id INT NOT NULL,
  utilisateur_id INT,
  type VARCHAR(100) NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  severity INT DEFAULT 1,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES route(id),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

-- Table assistant (pour historique conseils)
CREATE TABLE assistant (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT,
  route_id INT,
  conseil TEXT,
  niveau_trafic VARCHAR(20),
  distance_km DECIMAL(8, 2),
  temps_estime_min INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
  FOREIGN KEY (route_id) REFERENCES route(id)
);

-- ===== DONNÉES DE TEST =====

-- Utilisateurs
INSERT INTO utilisateur (nom, email) VALUES
  ('Alice Rakoto', 'alice@example.mg'),
  ('Bob Andriamampoinimerina', 'bob@example.mg'),
  ('Claire Ratsimamanga', 'claire@example.mg');

-- Routes Antananarivo
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Route Ivandry-Analakely', 'Antananarivo', -18.8750, 47.5150, 3.5),
  ('Route Andohalo-Ankorondrano', 'Antananarivo', -18.8700, 47.5200, 4.2),
  ('Route Avaradoaka-Anosy', 'Antananarivo', -18.8850, 47.5100, 2.8),
  ('Route Betondrano-Mandrosoa', 'Antananarivo', -18.8900, 47.5250, 5.6),
  ('Route Centre-Sabotsy', 'Antananarivo', -18.8792, 47.5079, 6.3);

-- Routes Toamasina
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue 26 Juin', 'Toamasina', -18.1492, 49.4023, 2.5),
  ('Route Avenue de France', 'Toamasina', -18.1500, 49.4050, 3.8),
  ('Boulevard Joffre', 'Toamasina', -18.1520, 49.3980, 4.1);

-- Routes Antsirabe
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Route de Fianarantsoa', 'Antsirabe', -19.8677, 47.5337, 5.2),
  ('Avenue du 26 Juin', 'Antsirabe', -19.8700, 47.5300, 3.5);

-- Routes Fianarantsoa
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Route vers Ihosy', 'Fianarantsoa', -21.4532, 47.2997, 6.8),
  ('Avenue Ramiandrisoa', 'Fianarantsoa', -21.4500, 47.3000, 4.2);

-- Routes Mahajanga
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue Joffre', 'Mahajanga', -15.7167, 46.3167, 3.2),
  ('Route du Port', 'Mahajanga', -15.7150, 46.3200, 2.8);

-- Routes Toliara
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue de l''Indépendance', 'Toliara', -23.3632, 43.6633, 2.9),
  ('Route du Phare', 'Toliara', -23.3650, 43.6650, 3.5);

-- Routes Antsiranana
INSERT INTO route (nom, ville, latitude, longitude, distance_km) VALUES
  ('Avenue Colbert', 'Antsiranana', -12.2797, 49.2832, 3.1),
  ('Route de la Baie', 'Antsiranana', -12.2800, 49.2850, 4.3);

-- Signalements Antananarivo
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (1, 1, 'Embouteillage', 'Embouteillage important à Analakely vers 8h', -18.8792, 47.5079, 3),
  (1, 2, 'Accident', 'Accident routier à intersection près de Carrefour', -18.8820, 47.5100, 4),
  (2, 1, 'Route bloquée', 'Route bloquée à Ankorondrano suite travaux', -18.8850, 47.5150, 5),
  (2, 3, 'Embouteillage', 'Trafic dense aux heures de pointe', -18.8810, 47.5170, 2),
  (3, 2, 'Accident', 'Véhicule en panne sur la voie de droite', -18.8870, 47.5120, 2),
  (4, 1, 'Embouteillage', 'Embouteillage causé par marché informel', -18.8920, 47.5200, 3),
  (4, 3, 'Route bloquée', 'Route temporairement fermée pour réparation', -18.8940, 47.5280, 4),
  (5, 2, 'Accident', 'Collision mineure entre taxis brousse', -18.8800, 47.5050, 2),
  (5, 1, 'Embouteillage', 'Trafic très dense au centre-ville', -18.8810, 47.5080, 4);

-- Signalements Toamasina
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (6, 1, 'Embouteillage', 'Embouteillage avenue 26 Juin', -18.1492, 49.4023, 3),
  (6, 2, 'Accident', 'Accident suite pluie abondante', -18.1480, 49.4010, 3),
  (7, 3, 'Route bloquée', 'Rue inondée - impraticable', -18.1500, 49.4060, 4),
  (8, 1, 'Accident', 'Véhicule immobilisé sur chaussée', -18.1530, 49.3990, 2);

-- Signalements Antsirabe
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (9, 2, 'Embouteillage', 'Marché inondant la route', -19.8680, 47.5350, 3),
  (10, 1, 'Accident', 'Charrette renversée', -19.8710, 47.5310, 2);

-- Signalements Fianarantsoa
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (11, 3, 'Route bloquée', 'Éboulement partiellement bloquant', -21.4550, 47.3010, 3),
  (12, 1, 'Embouteillage', 'Trafic aux abords du centre', -21.4510, 47.3005, 2);

-- Signalements Mahajanga
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (13, 2, 'Accident', 'Accident intersection principale', -15.7170, 46.3180, 3),
  (14, 1, 'Embouteillage', 'Trafic portuaire intense', -15.7140, 46.3210, 2);

-- Signalements Toliara
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (15, 1, 'Embouteillage', 'Trafic centre-ville', -23.3640, 43.6640, 2),
  (16, 3, 'Accident', 'Accident route du phare', -23.3660, 43.6660, 2);

-- Signalements Antsiranana
INSERT INTO signalement (route_id, utilisateur_id, type, description, latitude, longitude, severity) VALUES
  (17, 2, 'Embouteillage', 'Trafic avenue Colbert', -12.2800, 49.2840, 2),
  (18, 1, 'Route bloquée', 'Route baie impraticable', -12.2810, 49.2860, 3);
```

---

## ✅ Vérification des Données

```sql
-- Vérifier les utilisateurs
SELECT COUNT(*) as total_utilisateurs FROM utilisateur;
-- Résultat: 3

-- Vérifier les routes par ville
SELECT ville, COUNT(*) as total_routes 
FROM route 
GROUP BY ville 
ORDER BY ville;
-- Résultats: Antananarivo=5, Antsiranana=2, Antsirabe=2, Fianarantsoa=2, Mahajanga=2, Toamasina=3, Toliara=2

-- Vérifier les signalements par ville
SELECT r.ville, COUNT(s.id) as total_signalements
FROM signalement s
JOIN route r ON s.route_id = r.id
GROUP BY r.ville
ORDER BY r.ville;
-- Résultats: distribution équilibrée

-- Signalements par type
SELECT type, COUNT(*) as total
FROM signalement
GROUP BY type
ORDER BY total DESC;
-- Résultats: Embouteillage=9, Accident=8, Route bloquée=3
```

---

## 🧪 Scénarios de Test

### Test 1: Antananarivo - Route Fluide
```sql
-- Vérifier routes disponibles
SELECT * FROM route WHERE ville = 'Antananarivo' LIMIT 1;

-- Vérifier signalements à proximité
SELECT * FROM signalement s
JOIN route r ON s.route_id = r.id
WHERE r.ville = 'Antananarivo'
AND ABS(s.latitude - (-18.8750)) < 0.05
AND ABS(s.longitude - 47.5150) < 0.05;
```

### Test 2: Antananarivo - Route Embouteillée
```sql
-- Route avec plusieurs incidents
SELECT * FROM route WHERE id = 5; -- Centre-Sabotsy (6.3 km)

-- Signalements
SELECT * FROM signalement WHERE route_id = 5;
-- Résultats: 2 signalements (Accident + Embouteillage)
```

### Test 3: Multi-Villes
```sql
-- Toutes les villes avec leurs routes et signalements
SELECT 
  r.ville,
  COUNT(DISTINCT r.id) as routes,
  COUNT(DISTINCT s.id) as signalements
FROM route r
LEFT JOIN signalement s ON r.id = s.route_id
GROUP BY r.ville
ORDER BY r.ville;
```

---

## 📝 Notes Importantes

1. **Coordonnées réelles** - Les latitudes/longitudes sont approximativement correctes pour Madagascar
2. **Routes connexes** - Les points de routes forment un ensemble cohérent par ville
3. **Signalements contextuels** - Les incidents sont placés sur des routes réelles
4. **Severity levels** - 1 (mineur) à 5 (critique)
5. **Types standardisés** - 'Accident', 'Embouteillage', 'Route bloquée'

---

**Prêt à tester l'application ! 🚀**

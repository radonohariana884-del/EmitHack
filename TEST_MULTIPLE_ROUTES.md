# 🧪 Guide de Test : Multiple Routes Improvement

## 🚀 Démarrer Rapidement

### Terminal 1 - Backend
```bash
cd c:\Users\Radonohariana\Desktop\EmitHack\backend
npm start
# → Serveur sur http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd c:\Users\Radonohariana\Desktop\EmitHack\frontend\frontend-app
npm run dev
# → App sur http://localhost:5173
```

### Navigateur
Ouvrir: **http://localhost:5173**

---

## 🎮 Scénario de Test 1: Recommandation Fluide

### Actions:
1. Attendre le chargement de la page
2. Sélectionner: **Antananarivo** (déjà sélectionnée)
3. **Cliquer sur la carte** à environ: **-18.88, 47.51** (Centre-ville)
   - Vous verrez marqueur 🟢
   - Message: "Étape 1: Cliquez pour fixer votre point de départ"
4. **Cliquer à nouveau** à environ: **-18.87, 47.52** (3-4 km away)
   - Vous verrez marqueur 🔴

### Observations Attendues:
```
✅ 3 polylines apparaissent:
   - Route A: Vert (sélectionnée par défaut) ÉPAISSES
   - Route B: Gris clair (fine)
   - Route C: Gris clair (fine)

✅ Panel RouteOptions affiche:
   Route A: 4.5 km | 12 min | 🟢 Faible | ⭐ Recommandée
   Route B: 5.2 km | 15 min | 🟠 Moyen
   Route C: 6.1 km | 20 min | 🟢 Faible

✅ AlertCard:
   (Vide car pas d'incidents sur Route A)

✅ Advice Box:
   ✅ "Route A recommandée. Circulation fluide..."
```

### Actions Suivantes:
5. **Cliquer sur Route B** dans le panel
   - Polyline B devient ORANGE et ÉPAISSE
   - A et C deviennent gris clair
   - Advice se met à jour
   - Alertes changent

6. **Cliquer sur Route C** dans le panel
   - Polyline C devient selon son trafic (vert/orange/rouge)
   - Peut voir plus d'incidents

---

## 🎯 Scénario de Test 2: Embouteillage Majeur

### Actions:
1. Sélectionner: **Antananarivo**
2. Placer départ: Centre-ville **[-18.88, 47.51]**
3. Placer arrivée: **8-10 km away [-18.85, 47.54]**

### Observations Attendues:
```
✅ RouteOptions affiche variations:
   Route A: 8.0 km | 24 min | 🔴 Élevé
   Route B: 8.5 km | 25 min | 🟠 Moyen | ⭐ Recommandée
   Route C: 9.2 km | 28 min | 🟢 Faible

✅ Route A:
   - Polyline ROUGE
   - Est POINTILLÉE (dashed) car trafic élevé
   - AlertCard affiche incidents
   - 🚨 "Embouteillage détecté..."

✅ Route B:
   - Recommandée car meilleur équilibre
   - Trafic moyen acceptable
   - Pas trop de détour

✅ Route C:
   - Plus longue (+8 min)
   - Mais trafic fluide
   - Passe par itinéraire alternatif
```

---

## 🗺️ Scénario de Test 3: Navigation Multi-Routes

### Actions:
1. Placer 2 points sur la carte (départ + arrivée)
2. **Cliquer successivement** sur chaque route (A → B → C)

### Observations Attendues:
```
✅ À chaque clic, la sélection change:

   Sélection Route A:
   • Polyline A: ÉPAISSES, COLORÉE (vert/orange/rouge)
   • Polylines B, C: FINES, GRIS clair
   • AlertCard: Affiche alertes Route A
   • Advice: Conseil adapté Route A
   • RouteOptions: Carte A entourée bleu

   Sélection Route B:
   • Polyline B: ÉPAISSES, COLORÉE
   • Polylines A, C: FINES, GRIS
   • AlertCard: Maj à alertes Route B (si exists)
   • Advice: Conseil adapté Route B
   • RouteOptions: Carte B entourée bleu

   Sélection Route C:
   • Polyline C: ÉPAISSES, COLORÉE
   • Polylines A, B: FINES, GRIS
   • Etc.
```

### Vérifications:
- ✅ Sélection persiste jusqu'à nouveau clic
- ✅ Polylines se mettent à jour instantanément
- ✅ Alerts et Advice se regénèrent
- ✅ Marqueurs restent visibles
- ✅ Cercles incidents visibles

---

## 📊 Checklist Visuels

Après avoir placé départ et arrivée, vérifier:

```
ROUTES DISPLAY:
☑ 3 polylines visibles sur la carte
☑ 1 est épaise (sélectionnée)
☑ 2 sont fines (non-sélectionnées)
☑ Polyline épaisse est colorée (vert/orange/rouge)
☑ Polylines fines sont gris clair
☑ Si embouteillage, polyline est pointillée

PANEL LEFT:
☑ RouteOptions affiche 3 cartes (A, B, C)
☑ Chaque carte a: ID, nom, distance, temps, trafic
☑ 1 route a badge "⭐ Recommandée"
☑ Route sélectionnée a fond bleu et bordure bleu
☑ AlertCard affiche incidents (si any)
☑ Advice Box affiche conseil intelligent
☑ Bouton "Obtenir les conseils" ABSENT (pas nécessaire)

MARKERS:
☑ Marqueur vert 🟢 (départ)
☑ Marqueur rouge 🔴 (destination)
☑ Popups au survol

INCIDENTS:
☑ Cercles rouges sur incidents
☑ Cercles visibles sur les 3 routes
☑ Popups au clic (type + description)
```

---

## 🔴 Si Quelque Chose Manque

### "Les routes ne s'affichent pas"
→ Vérifier console browser (F12)
→ Vérifier Backend running (port 3000)
→ Vérifier signalements chargés

### "Toutes les polylines même couleur"
→ Rafraîchir page (Ctrl+R)
→ Vérifier CSS chargé (F12 → Network)

### "Pas de recommendations"
→ Vérifier signalements existent
→ Vérifier `recommendBestRoute()` appelée
→ Chercher erreurs console

### "Polyline ne change pas lors de clic"
→ Vérifier `handleSelectRoute()` appelée
→ Vérifier state `selectedRouteId` mis à jour
→ Vérifier rendu polylines utilise state

---

## 🎯 Performance Test

### Charger plusieurs villes rapidement:
```
1. Antananarivo → Route A/B/C apparaissent (< 1s)
2. Sélectionner Toamasina → Carte bouge, routes reset
3. Placer 2 points → Routes apparaissent (< 1s)
4. Cliquer 10 fois entre routes → Smooth transitions
```

**Attendu:** Pas de lag, transitions smooth

---

## 📸 Screenshots à Faire

Pour présentation, créer screenshots:

1. **Multiple Routes View**
   - 3 polylines visibles
   - RouteOptions panel avec 3 cartes

2. **Route Selected**
   - 1 polyline épaise/colorée
   - 2 polylines fines/gris

3. **Embouteillage Case**
   - Route rouge pointillée
   - AlertCard avec incidents
   - Badge recommandée sur autre route

4. **Mobile Responsive**
   - Panel stacked vertically
   - Routes toujours visibles

---

## 🚀 Bonus: Performance Metrics

Ouvrir Developer Tools (F12) et vérifier:

### Network Tab:
- API calls pour signalements
- Temps réponse < 500ms

### Performance Tab:
- Page load < 2s
- Route generation < 100ms
- Re-render au clic < 50ms

### Console:
- Zéro erreurs rouges
- Zéro warnings

---

## ✅ Succès Criteria

**L'implémentation est réussie si:**

- [x] 3 polylines apparaissent après click départ+arrivée
- [x] Sélection une route change sa couleur/épaisseur
- [x] RouteOptions affiche distance/temps/trafic
- [x] Recommendation badge apparaît sur meilleure route
- [x] AlertCard affiche incidents pour route sélectionnée
- [x] Polyline pointillée si embouteillage détecté
- [x] Autres polylines restent gris clair
- [x] Clic route change sélection instantanément
- [x] Zéro erreurs console
- [x] Responsive sur mobile

---

## 🎬 Cas Real-World

### Utilisateur Real Scenario:

```
1. Ouverture app
2. "Je dois aller du Centre au Port"
3. Clique 2 points sur map
4. Voit 3 options:
   - Route A: 12 min (recommandée, rapide)
   - Route B: 15 min (trafic moyen)
   - Route C: 25 min (longue détour)
5. À cause embouteillage, clique Route C
6. Conseil change: "Route C: 25 min mais trafic fluide"
7. Prend Route C car moins stressant
```

**Notre app = comme Google Maps! ✨**

---

**Amusez-vous à tester ! 🎮**

Si vous trouvez des bugs, vérifier:
1. Browser console (F12)
2. Backend logs
3. Erreurs de compilation

Sinon,tout fonctionne! 🎉

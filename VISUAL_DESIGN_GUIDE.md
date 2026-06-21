# 🎨 Visual Guide - Multiple Routes Interface

## 📱 Application Layout

### Desktop View (1920x1200)
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Smart Traffic Assistant                         │
│                 Trouvez le meilleur itinéraire selon le trafic         │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┬─────────────────────────────────────────────┐
│                          │                                             │
│   SIDE PANEL (360px)     │          MAP CONTAINER                      │
│   ───────────────────    │     (OpenStreetMap + 3 Polylines)          │
│                          │                                             │
│  🏙️ Ville               │  ┌─────────────────────────────────────────┐│
│  ┌──────────────────┐   │  │  Route A (sélectionnée):                ││
│  │ Antananarivo  ▼ │   │  │  ━━━━━━━ Vert/Orange/Rouge épais       ││
│  └──────────────────┘   │  │                                          ││
│                          │  │  Route B:                                 ││
│  📍 Itinéraires         │  │  ─ ─ ─ ─  Gris clair fin              ││
│  ┌──────────────────┐   │  │                                          ││
│  │ A │ rapide │ ⭐ │   │  │  Route C:                                 ││
│  │ 4.5km 12min 🟢  │   │  │  ─ ─ ─ ─  Gris clair fin              ││
│  │                 │   │  │                                          ││
│  │ [✓ Sélectionnée]│   │  │  Incidents: ⭕ ⭕ ⭕                    ││
│  └──────────────────┘   │  │                                          ││
│                          │  │  🟢 Départ (lat, lng)                  ││
│  ┌──────────────────┐   │  │                                          ││
│  │ B │ équilibrée  │   │  │  🔴 Destination (lat, lng)             ││
│  │ 5.2km 15min 🟠  │   │  │                                          ││
│  │                 │   │  │  Zoom: 12 | Contrôles pan/zoom         ││
│  │                 │   │  └─────────────────────────────────────────┘│
│  └──────────────────┘   │                                             │
│                          │                                             │
│  ┌──────────────────┐   │                                             │
│  │ C │ alternative  │   │                                             │
│  │ 6.1km 25min 🔴  │   │                                             │
│  │ ⚠️ 3 incidents  │   │                                             │
│  │                 │   │                                             │
│  └──────────────────┘   │                                             │
│                          │                                             │
│  ⚠️ Alertes (Route A)   │                                             │
│  ┌──────────────────┐   │                                             │
│  │ • Accident       │   │                                             │
│  │   0.8 km        │   │                                             │
│  │                 │   │                                             │
│  └──────────────────┘   │                                             │
│                          │                                             │
│  💡 Conseil             │                                             │
│  ┌──────────────────┐   │                                             │
│  │ ✅ Route A       │   │                                             │
│  │ recommandée.    │   │                                             │
│  │ Circulation      │   │                                             │
│  │ fluide, temps    │   │                                             │
│  │ estimé: 12 min. │   │                                             │
│  │                 │   │                                             │
│  └──────────────────┘   │                                             │
│                          │                                             │
│  📋 Instructions        │                                             │
│  ┌──────────────────┐   │                                             │
│  │ ✅ Itinéraire   │   │                                             │
│  │ tracé           │   │                                             │
│  │                 │   │                                             │
│  │ Cliquez une     │   │                                             │
│  │ route pour      │   │                                             │
│  │ la sélectionner │   │                                             │
│  └──────────────────┘   │                                             │
│                          │                                             │
└──────────────────────────┴─────────────────────────────────────────────┘
```

---

## 🎯 RouteOptions Card States

### État Normal (Non-sélectionnée)
```
┌────────────────────────────────┐
│ B │ Route équilibrée          │
├────────────────────────────────┤
│ Distance: 5.2 km               │
│ Temps: 15 min                  │
│ Trafic: 🟠 Moyen              │
└────────────────────────────────┘
```

### État Sélectionnée (Bordure + Fond)
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ A │ Route rapide   │ ⭐ Rec. ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ Distance: 4.5 km               │
│ Temps: 12 min                  │
│ Trafic: 🟢 Faible             │
├────────────────────────────────┤
│         ✓ Sélectionnée         │
└────────────────────────────────┘
```
**Fond:** Bleu clair (#eff6ff)
**Bordure:** Bleu foncé (#2563eb)

### État Recommandée (Badge)
```
┌────────────────────────────────┐
│ ┌──────────────────────────┐   │
│ │ C │ Route alternative    │   │
│ │         ⭐ Recommandée    │   │
│ └──────────────────────────┘   │
├────────────────────────────────┤
│ Distance: 6.1 km               │
│ Temps: 25 min                  │
│ Trafic: 🟢 Fluide             │
└────────────────────────────────┘
```
**Badge:** Orange (#f59e0b) avec "⭐ Recommandée"

### État Avec Alertes
```
┌────────────────────────────────┐
│ C │ Route alternative          │
├────────────────────────────────┤
│ Distance: 6.1 km               │
│ Temps: 25 min                  │
│ Trafic: 🔴 Élevé             │
├────────────────────────────────┤
│ ⚠️ Alertes:                    │
│ • Accident (0.8 km)            │
│ • Embouteillage (1.2 km)       │
│ • Route bloquée (2.0 km)       │
└────────────────────────────────┘
```
**Fond alertes:** Rouge clair (#fff5f5)
**Bordure alertes:** Rouge (#ef4444)

---

## 🗺️ Polyline States

### Route A Sélectionnée
```
Propriétés:
├─ Color: Selon trafic
│  ├─ Vert: #22c55e (fluide)
│  ├─ Orange: #f97316 (moyen)
│  └─ Rouge: #ef4444 (élevé)
├─ Weight: 5 (épais)
├─ Opacity: 1.0 (opaque)
└─ DashArray: '5,5' si embouteillage

Visuel:
━━━━━━━━━━━ (épais, couleur vive)
```

### Route B Non-sélectionnée
```
Propriétés:
├─ Color: #cbd5e1 (gris)
├─ Weight: 2 (fin)
├─ Opacity: 0.5 (semi-transparent)
└─ DashArray: none (solide)

Visuel:
─ ─ ─ ─ ─ ─ (fin, gris clair, semi-transparent)
```

### Embouteillage Détecté
```
Sélectionnée:
━━╱╱━━━━━━ (épais, rouge, pointillé)

Non-sélectionnée:
─ ─ ─ ─ ─ (fin, gris, pointillé)
```

---

## 💬 Alert Card Variations

### Sans Alertes
```
┌──────────────────────────────────┐
│  (Vide - pas d'incidents)        │
└──────────────────────────────────┘
```

### Avec 1 Alerte
```
┌──────────────────────────────────┐
│ ⚠️ Alertes (1)                   │
├──────────────────────────────────┤
│ • Accident                        │
│   0.8 km de votre route          │
│   Intersection Carrefour         │
└──────────────────────────────────┘
```

### Avec 3 Alertes
```
┌──────────────────────────────────┐
│ ⚠️ Alertes (3)                   │
├──────────────────────────────────┤
│ • Accident                        │
│   0.8 km de votre route          │
│                                   │
│ • Embouteillage                  │
│   1.2 km de votre route          │
│   Marché informel                │
│                                   │
│ • Route bloquée                  │
│   2.0 km de votre route          │
│   Travaux en cours              │
└──────────────────────────────────┘
```

**Couleur:** #fff5f5 (fond rouge clair)
**Bordure:** #ef4444 (rouge foncé)

---

## 💡 Advice Box Styles

### Circulation Fluide ✅
```
┌──────────────────────────────────┐
│ 💡 Conseil Intelligent           │
├──────────────────────────────────┤
│ ✅ Route A recommandée.          │
│ Circulation fluide, temps:       │
│ 12 min. Vous pouvez partir       │
│ immédiatement!                   │
└──────────────────────────────────┘
```
**Fond:** #f0f9ff (bleu clair)
**Bordure:** #0ea5e9 (cyan)

### Trafic Moyen ⚠️
```
┌──────────────────────────────────┐
│ 💡 Conseil Intelligent           │
├──────────────────────────────────┤
│ ⚠️ Route B recommandée.          │
│ Trafic modéré détecté,           │
│ 1 incident sur votre trajet.     │
│ Temps estimé: 15 minutes.        │
│ Départ conseillé dans 10 min.    │
└──────────────────────────────────┘
```
**Fond:** #fef3c7 (jaune clair)
**Bordure:** #f59e0b (orange)

### Embouteillage 🚨
```
┌──────────────────────────────────┐
│ 💡 Conseil Intelligent           │
├──────────────────────────────────┤
│ 🚨 Route C : Embouteillage!     │
│ Plusieurs incidents détectés.    │
│ Temps estimé: 25 minutes.        │
│ Il est recommandé d'attendre     │
│ 30 minutes ou de choisir route   │
│ alternative.                     │
└──────────────────────────────────┘
```
**Fond:** #fee2e2 (rouge clair)
**Bordure:** #ef4444 (rouge)

---

## 🎬 User Interaction Sequence

### Scenario: Utilisateur change de route

**État Initial:**
```
Map: Route A (vert épais), B et C (gris fin)
Panel: Route A sélectionnée (bleue), Badge ⭐
Alertes: Vides
Conseil: "Route A recommandée..."
```

**Clic Route C:**
```
Animation: Bordure Route C devient bleu
```

**Nouvelle Affichage:**
```
Map: 
  - Route A → gris fin, polyline se redessine
  - Route B → gris fin (inchangée)
  - Route C → rouge épais, redessine

Panel:
  - Route A → bordure gris (désélectionnée)
  - Route C → bordure bleu (sélectionnée)

Alertes:
  - Affiche 3 incidents de Route C
  - Fond rouge clair

Conseil:
  - "🚨 Route C : Embouteillage détecté..."
```

---

## 📱 Mobile View (< 768px)

```
┌─────────────────────────────────┐
│ Smart Traffic Assistant         │
│ Trouvez le meilleur itinéraire  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🏙️ Antananarivo              ▼ │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 📍 Itinéraires                  │
│ ┌─────────────────────────────┐ │
│ │ A | rapide | ⭐            │ │
│ │ 4.5km | 12min | 🟢         │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ B | équilibrée              │ │
│ │ 5.2km | 15min | 🟠         │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ C | alternative             │ │
│ │ 6.1km | 25min | 🔴         │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ⚠️ Alertes (Route A)            │
│ • Aucun incident détecté        │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 💡 Conseil                      │
│ Route A recommandée...          │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│         MAP (100% width)        │
│  ━━━ Route A (vert épais)      │
│  ─── Route B (gris fin)        │
│  ─── Route C (gris fin)        │
│  ⭕ Incidents                  │
└─────────────────────────────────┘
```

---

## 🎨 Couleur Palette Complète

```
Primary Colors:
├─ Vert (fluide): #22c55e
├─ Orange (moyen): #f97316
└─ Rouge (élevé): #ef4444

UI Colors:
├─ Bleu primaire: #2563eb
├─ Gris route: #cbd5e1
├─ Gris text: #475569
└─ Blanc surface: #ffffff

Background Colors:
├─ Bleu clair (advice): #f0f9ff
├─ Jaune clair (warning): #fef3c7
├─ Rouge clair (alert): #fff5f5
├─ Vert clair (success): #f0fdf4
└─ Gris clair (surface): #f8fafc

Gradients (optionnel):
├─ Fluide: rgba(34, 197, 94, 0.1)
├─ Moyen: rgba(249, 115, 22, 0.1)
└─ Élevé: rgba(239, 68, 68, 0.1)
```

---

## 🎪 Animation Details (CSS Transitions)

### Route Card Hover
```css
transition: all 0.2s ease;
/* Border color change */
/* Box shadow add */
/* Transform Y-2px */
```

### Polyline Change (Map)
```
Route A sélection → B: ~50ms redraw
Fluide redraw opacity/color/weight
Pas de lag perceptible
```

### Panel Scroll
```
RouteOptions scrollable (max-height: 400px)
Smooth scroll behavior
Mobile swipe-friendly
```

---

**Design complètement type Google Maps/Waze! 🗺️✨**

Pour voir en action: Lancez l'app et testez les scénarios de TEST_MULTIPLE_ROUTES.md

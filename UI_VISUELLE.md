# 🎨 UI/UX Visuelle - Smart Traffic Assistant

## 🖼️ Vue d'Ensemble Complète

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Smart Traffic Assistant                             │
│                  Une logique de circulation urbaine intelligente             │
│                        pour la gestion des embouteillages                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────────────────────────────────────┐
│                      │                                                      │
│  PANEL GAUCHE        │           MAP CONTAINER - OPENSTREETMAP              │
│  (360px)             │                                                      │
│                      │                                                      │
│  ┌────────────────┐  │  ┌──────────────────────────────────────────────┐   │
│  │ 🏙️ Ville      │  │  │                                              │   │
│  │ ┌────────────┐│  │  │      🟢 Marqueur Départ                      │   │
│  │ │Antananarivo││  │  │      (Drag sur carte)                        │   │
│  │ └────────────┘│  │  │                                              │   │
│  └────────────────┘  │  │                                              │   │
│                      │  │    Itinéraire polyline colorée:              │   │
│  ┌────────────────┐  │  │    🟢 Fluide (30 km/h)                      │   │
│  │ 📍 Infos Trafic│  │  │    🟠 Moyen (20 km/h)                       │   │
│  │ Distance: 5.2km│  │  │    🔴 Embouteillage (10 km/h, pointillé)   │   │
│  │ Temps: 16 min │  │  │                                              │   │
│  │ Trafic: 🟠    │  │  │              🔴 Marqueur Destination         │   │
│  │ Vitesse: 20km/│  │  │                                              │   │
│  │ h             │  │  │    ⭕ Incident circles (popups au hover)    │   │
│  └────────────────┘  │  │                                              │   │
│                      │  │                                              │   │
│  ┌────────────────┐  │  │  Zoom: 12 (zoom urbain)                     │   │
│  │ ⚠️ Alertes    │  │  │                                              │   │
│  │ • Accident     │  │  │  Contrôles zoom/pan                         │   │
│  │   0.8 km      │  │  │                                              │   │
│  │ • Embouteillage│  │  └──────────────────────────────────────────────┘   │
│  │   1.2 km      │  │                                                      │
│  └────────────────┘  │                                                      │
│                      │                                                      │
│  [📍 Obtenir les]  │                                                      │
│  [   conseils    ]  │                                                      │
│                      │                                                      │
│  ┌────────────────┐  │                                                      │
│  │ 💡 Conseil     │  │                                                      │
│  │ Trafic modéré  │  │                                                      │
│  │ détecté. 1     │  │                                                      │
│  │ incident sur   │  │                                                      │
│  │ votre trajet.  │  │                                                      │
│  │ Temps estimé:  │  │                                                      │
│  │ 16 minutes.    │  │                                                      │
│  │ Départ conseillé│  │                                                      │
│  │ dans 10 min.   │  │                                                      │
│  └────────────────┘  │                                                      │
│                      │                                                      │
│  ┌────────────────┐  │                                                      │
│  │ 📋 Instructions│  │                                                      │
│  │ 1. Cliquez sur │  │                                                      │
│  │    la carte    │  │                                                      │
│  │ 2. Marquer     │  │                                                      │
│  │    départ/arri │  │                                                      │
│  │ 3. Vérifier    │  │                                                      │
│  │    trafic      │  │                                                      │
│  │ 4. Cliquer     │  │                                                      │
│  │    conseillers │  │                                                      │
│  └────────────────┘  │                                                      │
│                      │                                                      │
└──────────────────────┴──────────────────────────────────────────────────────┘
```

---

## 🎨 Palette Couleurs

### Trafic Levels
```
🟢 FLUIDE (score < 40)
   Color: #22c55e (green-500)
   Vitesse: 30 km/h
   Polyline: Solid, weight=5
   Message: ✅ "Vous pouvez partir maintenant"

🟠 MOYEN (40 ≤ score < 65)
   Color: #f97316 (orange-500)
   Vitesse: 20 km/h
   Polyline: Solid, weight=5
   Message: ⚠️ "Trafic modéré, attendre 10 min"

🔴 EMBOUTEILLAGE (score ≥ 65)
   Color: #ef4444 (red-500)
   Vitesse: 10 km/h
   Polyline: Dashed (5,5), weight=5
   Message: 🚨 "Embouteillage, attendre 30 min"
```

### UI Elements
```
Text: #0f172a (slate-900) - Principal
Muted: #475569 (slate-600) - Secondary
Border: #cbd5e1 (slate-300) - Lines
Surface: #ffffff - Backgrounds
Soft BG: #f8fafc (slate-50) - Cards
```

### Alert Box
```
Background: #fff5f5 (red-50)
Border-Left: 4px solid #ef4444
Text: #1f2937 (gray-800)
Second: #64748b (slate-500)
```

---

## 📱 Responsive Breakpoints

### Desktop (> 1060px)
```
Layout: Side-by-side
Panel Width: 360px (fixed)
Map: Flex grow 1
Heights: Both 100vh
```

### Tablet/Mobile (≤ 1060px)
```
Layout: Stacked (vertical)
Panel: Full width, max-height 520px
Map: calc(100vh - 520px)
Panel: Scrollable content
```

---

## 🎯 Interactive Elements

### Marqueurs
```
🟢 Départ
   - Icône verte
   - Draggable
   - Affiche popup au hover

🔴 Destination  
   - Icône rouge
   - Draggable
   - Affiche popup au hover

⭕ Incident Zone
   - Cercle semi-transparent
   - Couleur selon type
   - Popup au click:
     * Type incident
     * Description
     * Distance itinéraire
```

### Polyline Route
```
Color: Dynamique selon trafic
  - Green (#22c55e) si fluide
  - Orange (#f97316) si moyen
  - Red (#ef4444) si embouteillage

Pattern: Dynamique
  - Solid normal
  - Dashed si embouteillage majeur

Hover: Surlignage
Weight: 5px (standard)
```

### Buttons
```
Style: Filled
Color: #2563eb (blue-600)
Hover: #1d4ed8 (blue-700)
Disabled: Opacity 0.6, cursor not-allowed
Padding: 12px 14px
Border-radius: 12px

States:
  Default: Blue
  Hover: Darker blue, slight shadow
  Active: Pressed look
  Disabled: Grayed out
```

### Dropdowns & Fields
```
Border: 1px #cbd5e1
Padding: 12px 14px
Border-radius: 12px
Focus: 2px solid rgba(37,99,235,0.3)

Background: #ffffff
Text: #0f172a
Placeholder: #94a3b8

Hover: Subtle shadow
```

---

## 📊 Card Components

### TrafficInfo Card
```
┌─────────────────────────┐
│ 📍 Infos Trafic         │ ← Title h2
│                         │
│ Distance: 5.2 km        │ ← Grid 3 colonnes
│ Temps: 16 minutes       │
│ Niveau: Moyen 🟠       │
│ Vitesse: 20 km/h        │
└─────────────────────────┘
Background: #f8fafc
Padding: 18px
Border: 1px #cbd5e1
Border-radius: 18px
```

### AlertCard
```
┌─────────────────────────┐
│ ⚠️ Alertes (2)         │ ← Title
├─────────────────────────┤
│ • Accident              │
│   À 0.8 km de route    │
│   Intersection Carrefour│
│                         │
│ • Embouteillage         │
│   À 1.2 km de route    │
│   Marché informel       │
└─────────────────────────┘
Background: #fff5f5
Border-Left: 4px #ef4444
Padding: 12px
Font-size: 13px
```

### AdviceCard
```
┌─────────────────────────────────────────┐
│ 💡 Conseil                              │
│                                         │
│ ⚠️ Trafic modéré détecté. 1 incident  │
│ sur votre trajet. Temps estimé: 16     │
│ minutes. Départ conseillé dans 10      │
│ minutes.                                │
└─────────────────────────────────────────┘
Background: #f8fafc
Padding: 18px
Border: 1px #cbd5e1
Border-radius: 18px
Line-height: 1.6
```

---

## 🎬 Animation & Feedback

### Loading States
```
Carte chargement: Tile gris temporaire
Signalements: Spinner implicite
Data fetching: Pas de loading bar (rapide)
```

### Hover Effects
```
Cards: Légère translation Y-1px + shadow
Buttons: Couleur plus foncée
Markers: Popup affichage
Route cards: Surlignage + shadow
```

### Click Feedback
```
Marqueurs: Drag feedback visuel
Buttons: Instant response
Cards: Hover state persiste
```

---

## ♿ Accessibilité

### Contraste
```
Text on Background: 4.5:1 ratio (WCAG AA)
Buttons: 4.5:1 text contrast
Elements cliquables: Visible focus outline
```

### Keyboard Navigation
```
Tab through buttons
Enter to activate
Dropdown accessible avec arrow keys
```

### Screen Reader
```
Alt text sur images
Semantic HTML (h1, h2, button, etc)
Form labels explicites
ARIA labels si needed
```

---

## 📐 Spacing & Layout

### Grid System
```
Gap between elements: 12px, 20px, 28px
Padding in cards: 12px (small), 18px (medium)
Component margin: 20px (large gaps)
```

### Typography
```
H1: 26px, bold, color-text
H2: 18px, bold, color-text
H3: 14px, bold, color-muted
P: 14px, color-text, line-height 1.6
Small: 13px, color-muted
```

---

## 🎨 CSS Classes

```css
.map-app              /* Container principal */
.panel                /* Panel gauche (360px) */
.map-container        /* Container carte */
.map-view             /* Leaflet container */

.panel-header         /* Titre panel */
.field-group          /* Input wrapper */
.select-field         /* Dropdowns */
.action-button        /* Buttons */

.panel-status         /* Status sections */
.trip-info            /* Trip info card */
.advice-box           /* Advice card */
.instructions         /* Instructions section */
.route-list           /* Route cards list */
.route-card           /* Carte route individuelle */

.traffic-info         /* Traffic stats panel */
.alert-card           /* Alertes container */
```

---

## 🖱️ Interactions Principales

### 1. Sélection Ville
```
Click → Dropdown ouvre
Select → Carte recentre
Effect → Carte zoom out légèrement
```

### 2. Placement Marqueurs
```
Click 1 → Marqueur 🟢 apparaît
Click 2 → Marqueur 🔴 apparaît
Drag → Repositionner marqueur
Effect → Route s'actualise immédiatement
```

### 3. Évaluation Trafic
```
Automatic → À chaque changement route
Display → Polyline couleur change
Update → Infos trafic se mettent à jour
Alert → Alertes apparaissent si incidents
```

### 4. Obtenir Conseils
```
Click → "Obtenir les conseils"
Fetch → Récupère conseil assistant
Display → Affiche dans advice-box
Effect → Smooth transition
```

---

## 📸 Captures d'Écran Attendues

### État 1: Sélection Uniquement
```
Panel:
  ✓ Titre app
  ✓ Description
  ✓ Dropdown ville
  ✓ Message "Cliquez sur la carte..."

Map:
  ✓ Carte centrée ville
  ✓ Zoom 12
  ✓ Pas de marqueurs
```

### État 2: Route Fluide
```
Panel:
  ✓ Infos trafic (distance, temps, VERT)
  ✓ Pas d'alertes
  ✓ Conseil fluide

Map:
  ✓ Marqueur 🟢 et 🔴
  ✓ Polyline VERTE
  ✓ Pas de cercles incidents
```

### État 3: Trafic Moyen
```
Panel:
  ✓ Infos trafic (ORANGE)
  ✓ Alertes 1-2 incidents
  ✓ Conseil modéré

Map:
  ✓ Marqueurs présents
  ✓ Polyline ORANGE
  ✓ Cercles incidents visibles
```

### État 4: Embouteillage
```
Panel:
  ✓ Infos trafic (ROUGE)
  ✓ Alertes 3+ incidents
  ✓ Conseil "attendre"

Map:
  ✓ Marqueurs présents
  ✓ Polyline ROUGE POINTILLÉE
  ✓ Plusieurs cercles incidents
```

---

## 🌐 Responsive Visuelle

### Desktop (1920x1080)
```
Panel: 360px fixed left
Content: Crisp, bien espacé
Font: Lisible sans zoom
```

### Laptop (1366x768)
```
Panel: 360px fixed left
Map: Reste ~1000px
Proportions: Équilibrées
```

### Tablet (768x1024)
```
Layout: Stacked (vertical)
Panel: Full width, 520px height
Map: calc(100vh - 520px)
Panel: Scrollable
```

### Mobile (375x667)
```
Layout: Stacked (full stack)
Panel: Full width
Map: Full width
Overflow: Scrollable
Font: Lisible sur petit écran
```

---

**Visuels finalisés et prêts pour présentation! 🎨✨**

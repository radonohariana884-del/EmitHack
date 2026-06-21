import { motion } from "framer-motion";
import { Activity, AlertTriangle, Clock, MapPin, Map, Zap, Shield, Users, TrendingDown, Route } from "lucide-react";

const stats = [
  { title: "Couverture en temps réel", value: "98%", desc: "Données de trafic mises à jour en continu", icon: Activity, color: "from-blue-500 to-cyan-400" },
  { title: "Signalements actifs", value: "24", desc: "Incidents détectés dans votre région", icon: AlertTriangle, color: "from-orange-500 to-red-400" },
  { title: "Itinéraires disponibles", value: "3", desc: "Options optimisées par route", icon: Route, color: "from-green-500 to-emerald-400" },
  { title: "Économies moyennes", value: "15 min", desc: "Par trajet avec SmartTraffic", icon: TrendingDown, color: "from-purple-500 to-pink-400" },
];

const features = [
  { icon: Map, title: "Navigation Optimisée", desc: "Trouvez les meilleurs itinéraires en temps réel" },
  { icon: Zap, title: "Alertes Instantanées", desc: "Recevez les signalements de trafic en direct" },
  { icon: Shield, title: "Données Sécurisées", desc: "Vos données restent confidentielles" },
];

export default function HomePage({ onStart }) {
  return (
    <div className="home-page-container">
      {/* Navigation */}
      <nav className="home-navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Map className="logo-icon" />
            <span className="logo-text">SmartTraffic</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-copy"
          >
            <div className="hero-badge">
              <Zap className="badge-icon" />
              <span>Solution Intelligente de Trafic</span>
            </div>

            <h1 className="hero-title">
              Naviguez intelligemment<br />
              à Madagascar
            </h1>

            <p className="hero-subtitle">
              SmartTraffic vous guide avec des itinéraires optimisés, des alertes en temps réel et une visibilité trafic instantanée.
            </p>

            <button onClick={onStart} className="hero-cta-primary">
              Commencer la navigation
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-visual"
          >
            <div className="visual-card">
              <div className="visual-top">
                <span className="visual-chip">Trafic en direct</span>
                <span className="visual-status">Antananarivo</span>
              </div>
              <div className="visual-map">
                <div className="map-dot map-dot-start" />
                <div className="map-dot map-dot-end" />
                <div className="map-line" />
                <div className="map-line map-line-alt" />
                <div className="map-card-small">
                  <MapPin className="map-icon" />
                  <div>
                    <p>Trajet recommandé</p>
                    <strong>12 min</strong>
                  </div>
                </div>
              </div>
              <div className="visual-footer">
                <div>
                  <p>Trafic fluide</p>
                  <strong>98% routes claires</strong>
                </div>
                <div>
                  <p>Signalements</p>
                  <strong>24 actifs</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="stats-header"
        >
          <h2 className="stats-title">Performance et Fiabilité</h2>
          <p className="stats-subtitle">Des chiffres qui inspirent confiance</p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(56, 189, 248, 0.3)" }}
                className="stat-card-premium"
              >
                <div className={`stat-icon-wrapper bg-gradient-to-br ${stat.color}`}>
                  <Icon className="stat-icon" />
                </div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.title}</p>
                <p className="stat-desc">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="features-header"
        >
          <h2 className="features-title">Fonctionnalités Principales</h2>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="feature-card"
              >
                <div className="feature-icon-box">
                  <Icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

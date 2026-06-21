import "./App.css";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import MapView from "./MapView";

function App() {
  const [page, setPage] = useState("home"); // home | map

  const goToStart = () => {
    setPage("map");
  };

  const goToHome = () => {
    setPage("home");
  };

  return (
    <div className="app-shell">
      {page === "home" && <HomePage onStart={goToStart} />}
      {page === "map" && <MapView onBackToHome={goToHome} />}
    </div>
  );
}

export default App;
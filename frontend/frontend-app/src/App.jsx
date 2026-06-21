import "./App.css";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import MapView from "./MapView";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-shell">
      {started ? <MapView /> : <HomePage onStart={() => setStarted(true)} />}
    </div>
  );
}

export default App;
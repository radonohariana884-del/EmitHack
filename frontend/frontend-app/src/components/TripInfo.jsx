export default function TripInfo({ depart, arrivee, distance }) {
  return (
    <div className="trip-info">
      <h2>Informations trajet</h2>
      <p>Départ : {depart ? `${depart[0].toFixed(5)}, ${depart[1].toFixed(5)}` : "Non défini"}</p>
      <p>Arrivée : {arrivee ? `${arrivee[0].toFixed(5)}, ${arrivee[1].toFixed(5)}` : "Non défini"}</p>
      <p>Distance estimée : {depart && arrivee ? `${distance.toFixed(2)} km` : "N/A"}</p>
    </div>
  );
}

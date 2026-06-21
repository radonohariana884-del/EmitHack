export default function CitySelect({ villes, selectedVille, onChange }) {
  return (
    <div className="field-group">
      <label htmlFor="city-select">Ville</label>
      <select id="city-select" value={selectedVille} onChange={onChange} className="select-field">
        {villes.map((ville) => (
          <option key={ville} value={ville}>
            {ville}
          </option>
        ))}
      </select>
    </div>
  );
}

import React, { useState } from "react";
import { api } from "../services/api";

export default function RegisterPage({ onRegister, onCancel }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (motDePasse !== confirm) return setError("Les mots de passe ne correspondent pas");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { nom, email, mot_de_passe: motDePasse });
      onRegister(res.data.user, res.data.token);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || (err.message ? err.message : "Échec de l'inscription"));
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Inscription</h2>
        <p className="login-sub">Créez votre compte pour accéder au tableau de bord Smart Traffic</p>
        <form onSubmit={submit}>
          <label>Nom</label>
          <input value={nom} onChange={(e) => setNom(e.target.value)} required />
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Mot de passe</label>
          <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
          <label>Confirmation mot de passe</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          {error && <div className="form-error">{error}</div>}
          <div className="login-actions">
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? "Inscription..." : "S'inscrire"}</button>
            <button type="button" className="btn-secondary" onClick={onCancel}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}

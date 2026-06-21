import React, { useState } from "react";
import { api } from "../services/api";

export default function LoginPage({ onLogin, onCancel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      onLogin(res.data.user, res.data.token);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || (err.message ? err.message : "Échec de la connexion"));
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Connexion</h2>
        <p className="login-sub">Accédez au tableau de bord Smart Traffic</p>
        <form onSubmit={submit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <div className="form-error">{error}</div>}
          <div className="login-actions">
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
            <button type="button" className="btn-secondary" onClick={onCancel}>Retour</button>
          </div>
        </form>
      </div>
    </div>
  );
}

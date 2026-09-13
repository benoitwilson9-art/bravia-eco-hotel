import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{ padding: "60px 20px", display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 20,
          width: "100%",
          maxWidth: 380,
          boxShadow: "0 10px 30px rgba(42,33,27,0.08)",
        }}
      >
        <h1 style={{ fontSize: 26, marginBottom: 24 }}>Connexion</h1>

        {error && <p style={{ color: "var(--bordeaux)", fontSize: 14, marginBottom: 12 }}>{error}</p>}

        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 16, border: "1px solid #ddd" }}
        />

        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 24, border: "1px solid #ddd" }}
        />

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Se connecter
        </button>

        <p style={{ fontSize: 14, marginTop: 18, color: "var(--taupe)" }}>
          Pas de compte ? <Link to="/inscription" style={{ color: "var(--bordeaux)" }}>Créer un compte</Link>
        </p>
      </form>
    </div>
  );
}
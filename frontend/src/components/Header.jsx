import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, padding: "16px 20px" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          borderRadius: 999,
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          boxShadow: "0 8px 32px rgba(42,33,27,0.08)",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "'Fraunces', serif",
            fontSize: 19,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--bordeaux), var(--gold))",
            }}
          />
          Bravia Eco Hotel
        </Link>

                <nav style={{ display: "flex", gap: 20, fontSize: 14, fontWeight: 500, flexWrap: "wrap" }}>
          <Link to="/chambres">Chambres</Link>
          <a href="/#reunions">Salles de réunion</a>
          <a href="/#confort">Confort</a>
          <a href="/#contact">Contact</a>
          {user && <Link to="/mes-reservations">Mes réservations</Link>}
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        </nav>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14 }}>Bonjour, {user.name.split(" ")[0]}</span>
            <button onClick={logout} className="btn btn-ghost">
              Déconnexion
            </button>
          </div>
        ) : (
          <Link to="/connexion" className="btn btn-primary">
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
}
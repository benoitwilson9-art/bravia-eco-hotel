import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ padding: 40 }}>Chargement...</p>;
  if (!user) return <Navigate to="/connexion" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
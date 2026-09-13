import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/reservations")
      .then((res) => setReservations(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Chargement...</p>;

  return (
    <div style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 30, marginBottom: 24 }}>Mes réservations</h1>

        {reservations.length === 0 && (
          <p style={{ color: "var(--taupe)" }}>Tu n'as pas encore de réservation.</p>
        )}

        {reservations.map((r) => (
          <div
            key={r.id}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 6px 20px rgba(42,33,27,0.06)",
            }}
          >
            <div>
              <h3 style={{ fontSize: 18, marginBottom: 4 }}>{r.room?.name}</h3>
              <p style={{ fontSize: 14, color: "var(--taupe)" }}>
                Du {new Date(r.check_in_date).toLocaleDateString("fr-FR")} au{" "}
                {new Date(r.check_out_date).toLocaleDateString("fr-FR")} — {r.number_of_guests} pers.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: r.payment_status === "payé" ? "#2E5A3E" : "var(--bordeaux)",
                }}
              >
                {r.payment_status === "payé" ? "Payé" : "En attente"}
              </span>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  color: r.reservation_status === "confirmée" ? "#2E5A3E" : "var(--bordeaux)",
                }}
              >
                {r.reservation_status === "confirmée" ? "Confirmée" : "Annulée"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
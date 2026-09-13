import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.get("/rooms", { params: { per_page: 50 } }),
      api.get("/admin/reservations"),
    ])
      .then(([roomsRes, resRes]) => {
        setRooms(roomsRes.data.data || roomsRes.data);
        setReservations(resRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateRoomStatus = async (room, status) => {
    await api.put(`/rooms/${room.id}`, { status });
    loadData();
  };

  const updateReservation = async (reservation, reservation_status) => {
    await api.put(`/admin/reservations/${reservation.id}`, { reservation_status });
    loadData();
  };

  if (loading) return <p style={{ padding: 40 }}>Chargement...</p>;

  return (
    <div style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 30, marginBottom: 32 }}>Tableau de bord administrateur</h1>

        {/* CHAMBRES */}
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Chambres</h2>
        <div style={{ background: "#fff", borderRadius: 16, padding: 8, marginBottom: 40 }}>
          {rooms.map((room) => (
            <div
              key={room.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderBottom: "1px solid #f0ede7",
              }}
            >
              <div>
                <strong>{room.name}</strong>{" "}
                <span style={{ color: "var(--taupe)", fontSize: 13 }}>({room.type})</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--taupe)" }}>Statut :</span>
                <select
                  value={room.status}
                  onChange={(e) => updateRoomStatus(room, e.target.value)}
                  style={{ padding: 6, borderRadius: 8 }}
                >
                  <option value="libre">Libre</option>
                  <option value="occupée">Occupée</option>
                  <option value="nettoyage">Nettoyage</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* RÉSERVATIONS */}
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>Réservations</h2>
        <div style={{ background: "#fff", borderRadius: 16, padding: 8 }}>
          {reservations.length === 0 && (
            <p style={{ padding: 16, color: "var(--taupe)" }}>Aucune réservation pour le moment.</p>
          )}
          {reservations.map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderBottom: "1px solid #f0ede7",
              }}
            >
              <div>
                <strong>{r.room?.name}</strong> — {r.user?.name}
                <p style={{ fontSize: 13, color: "var(--taupe)", margin: "2px 0 0" }}>
                  Du {new Date(r.check_in_date).toLocaleDateString("fr-FR")} au{" "}
                  {new Date(r.check_out_date).toLocaleDateString("fr-FR")} —{" "}
                  {r.payment_status === "payé" ? "Payé" : "En attente"} —{" "}
                  <strong style={{ color: r.reservation_status === "confirmée" ? "#2E5A3E" : "var(--bordeaux)" }}>
                    {r.reservation_status === "confirmée" ? "Confirmée" : "Annulée"}
                  </strong>
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {r.reservation_status !== "confirmée" && (
                  <button
                    onClick={() => updateReservation(r, "confirmée")}
                    className="btn btn-ghost"
                    style={{ padding: "8px 16px", fontSize: 13 }}
                  >
                    Confirmer
                  </button>
                )}
                {r.reservation_status !== "annulée" && (
                  <button
                    onClick={() => updateReservation(r, "annulée")}
                    className="btn btn-ghost"
                    style={{ padding: "8px 16px", fontSize: 13 }}
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
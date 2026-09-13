import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ReservationForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/reservations", {
        room_id: roomId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        number_of_guests: guests,
      });

      // Simulation du paiement juste après la création
      await api.put(`/reservations/${res.data.id}/pay`);

      setSuccess(true);
      setTimeout(() => navigate("/mes-reservations"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Impossible de réserver cette chambre."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <h1 style={{ fontSize: 26 }}>Réservation confirmée !</h1>
        <p style={{ color: "var(--taupe)" }}>Redirection vers tes réservations...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "60px 20px", display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 20,
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 10px 30px rgba(42,33,27,0.08)",
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 24 }}>Réserver la chambre</h1>

        {error && <p style={{ color: "var(--bordeaux)", fontSize: 14, marginBottom: 12 }}>{error}</p>}

        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Date d'arrivée</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
          style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 16, border: "1px solid #ddd" }}
        />

        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Date de départ</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
          style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 16, border: "1px solid #ddd" }}
        />

        <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Nombre de personnes</label>
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
          style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 24, border: "1px solid #ddd" }}
        />

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Traitement..." : "Confirmer et payer (simulation)"}
        </button>
      </form>
    </div>
  );
}
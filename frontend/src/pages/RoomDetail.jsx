import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const roomImages = {
  "Chambre Classique": "/images/room-classic.jpg",
  "Suite Lounge": "/images/room-suite.jpg",
  "Chambre Supérieure": "/images/room-superior.jpg",
};

export default function RoomDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const loadRoom = () => {
    api
      .get(`/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRoom();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");
    setSubmitting(true);
    try {
      await api.post("/reviews", { room_id: id, rating, comment });
      setComment("");
      setRating(5);
      loadRoom();
    } catch (err) {
      setReviewError("Impossible d'envoyer l'avis pour le moment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Chargement...</p>;
  if (!room) return <p style={{ padding: 40 }}>Chambre introuvable.</p>;

  return (
    <div style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 40 }}>
        <img
          src={roomImages[room.name] || "/images/room-classic.jpg"}
          alt={room.name}
          style={{ flex: "1 1 440px", width: "100%", borderRadius: 20, objectFit: "cover", maxHeight: 420 }}
        />

        <div style={{ flex: "1 1 360px" }}>
          <h1 style={{ fontSize: 30, marginBottom: 8 }}>{room.name}</h1>
          <div style={{ color: "var(--bordeaux)", fontWeight: 600, marginBottom: 12 }}>
            {Number(room.price).toLocaleString("fr-FR")} FCFA / nuit
          </div>
          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: room.status === "libre" ? "#2E5A3E" : "var(--bordeaux)",
              marginBottom: 18,
            }}
          >
            Statut : {room.status === "libre" ? "Libre" : room.status}
          </span>
          <p style={{ color: "var(--taupe)", marginBottom: 24, lineHeight: 1.6 }}>
            {room.description}
          </p>
          <Link to={`/reservation/${room.id}`} className="btn btn-primary">
            Réserver cette chambre
          </Link>

          <h2 style={{ fontSize: 20, marginTop: 40, marginBottom: 16 }}>Avis clients</h2>
          {room.reviews && room.reviews.length > 0 ? (
            room.reviews.map((review) => (
              <div
                key={review.id}
                style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12 }}
              >
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} — {review.user?.name}
                </div>
                {review.comment && (
                  <p style={{ fontSize: 14, color: "var(--taupe)", marginTop: 6 }}>{review.comment}</p>
                )}
              </div>
            ))
          ) : (
            <p style={{ fontSize: 14, color: "var(--taupe)" }}>Aucun avis pour le moment.</p>
          )}

          {/* FORMULAIRE D'AVIS */}
          {user ? (
            <form
              onSubmit={handleReviewSubmit}
              style={{ background: "#fff", borderRadius: 16, padding: 20, marginTop: 20 }}
            >
              <h3 style={{ fontSize: 16, marginBottom: 12 }}>Laisser un avis</h3>

              {reviewError && (
                <p style={{ color: "var(--bordeaux)", fontSize: 13, marginBottom: 10 }}>{reviewError}</p>
              )}

              <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Note</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ padding: 8, borderRadius: 8, marginBottom: 14 }}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} — {"★".repeat(n)}
                  </option>
                ))}
              </select>

              <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Commentaire</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 14, border: "1px solid #ddd", fontFamily: "inherit" }}
              />

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "Envoi..." : "Publier l'avis"}
              </button>
            </form>
          ) : (
            <p style={{ fontSize: 14, color: "var(--taupe)", marginTop: 16 }}>
              <Link to="/connexion" style={{ color: "var(--bordeaux)" }}>Connecte-toi</Link> pour laisser un avis.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
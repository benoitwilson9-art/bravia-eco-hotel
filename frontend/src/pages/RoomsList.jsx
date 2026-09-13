import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const roomImages = {
  "Chambre Classique": "/images/room-classic.jpg",
  "Suite Lounge": "/images/room-suite.jpg",
  "Chambre Supérieure": "/images/room-superior.jpg",
};

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    price_min: "",
    price_max: "",
    check_in: "",
    check_out: "",
  });

  const fetchRooms = (params = {}) => {
    setLoading(true);
    api
      .get("/rooms", { params })
      .then((res) => setRooms(res.data.data || res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleaned = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== "")
    );
    fetchRooms(cleaned);
  };

  return (
    <div style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34, marginBottom: 24 }}>Nos chambres</h1>

        {/* FILTRES */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            background: "#fff",
            padding: 16,
            borderRadius: 16,
            marginBottom: 32,
            boxShadow: "0 4px 16px rgba(42,33,27,0.06)",
          }}
        >
          <select name="type" value={filters.type} onChange={handleChange} style={{ padding: 10, borderRadius: 8 }}>
            <option value="">Tous les types</option>
            <option value="Classique">Classique</option>
            <option value="Suite">Suite</option>
            <option value="Supérieure">Supérieure</option>
          </select>

          <input
            type="number"
            name="price_min"
            placeholder="Prix min"
            value={filters.price_min}
            onChange={handleChange}
            style={{ padding: 10, borderRadius: 8, width: 110 }}
          />
          <input
            type="number"
            name="price_max"
            placeholder="Prix max"
            value={filters.price_max}
            onChange={handleChange}
            style={{ padding: 10, borderRadius: 8, width: 110 }}
          />

          <label style={{ fontSize: 13, color: "var(--taupe)" }}>
            Arrivée
            <input
              type="date"
              name="check_in"
              value={filters.check_in}
              onChange={handleChange}
              style={{ padding: 10, borderRadius: 8, display: "block" }}
            />
          </label>
          <label style={{ fontSize: 13, color: "var(--taupe)" }}>
            Départ
            <input
              type="date"
              name="check_out"
              value={filters.check_out}
              onChange={handleChange}
              style={{ padding: 10, borderRadius: 8, display: "block" }}
            />
          </label>

          <button type="submit" className="btn btn-primary">Rechercher</button>
        </form>

        {loading && <p>Chargement...</p>}
        {!loading && rooms.length === 0 && <p>Aucune chambre ne correspond à cette recherche.</p>}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {rooms.map((room) => (
            <div
              key={room.id}
              style={{
                flex: "1 1 300px",
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(42,33,27,0.08)",
              }}
            >
              <div style={{ position: "relative", height: 220 }}>
                <img
                  src={roomImages[room.name] || "/images/room-classic.jpg"}
                  alt={room.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    backdropFilter: "blur(10px)",
                    color: room.status === "libre" ? "#2E5A3E" : "var(--bordeaux)",
                  }}
                >
                  {room.status === "libre" ? "Libre" : room.status}
                </span>
              </div>
              <div style={{ padding: 22 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>{room.name}</h3>
                <div style={{ color: "var(--bordeaux)", fontWeight: 600, fontSize: 14, marginBottom: 12 }}>
                  À partir de {Number(room.price).toLocaleString("fr-FR")} FCFA / nuit
                </div>
                <p style={{ fontSize: 14, color: "var(--taupe)", marginBottom: 18 }}>
                  {room.description}
                </p>
                <Link to={`/chambres/${room.id}`} className="btn btn-ghost">
                  Voir la chambre
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
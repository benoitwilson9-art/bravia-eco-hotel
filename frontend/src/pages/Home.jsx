import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const roomImages = {
  "Chambre Classique": "/images/room-classic.jpg",
  "Suite Lounge": "/images/room-suite.jpg",
  "Chambre Supérieure": "/images/room-superior.jpg",
};

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/rooms")
      .then((res) => setRooms(res.data.data || res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: "40px 0 90px" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 48 }}>
          <div style={{ flex: "1 1 420px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
              <span style={{ width: 28, height: 2, background: "var(--gold)", marginRight: 10 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--bordeaux)" }}>Lomé, Togo</span>
            </div>
            <h1 style={{ fontSize: 44, lineHeight: 1.12, marginBottom: 20 }}>
              Un séjour posé, <em style={{ color: "var(--bordeaux)", fontStyle: "italic" }}>au cœur</em> de Lomé.
            </h1>
            <p style={{ maxWidth: 440, marginBottom: 28, fontSize: 16 }}>
              Bravia Eco Hotel réunit chambres climatisées, espaces de travail et un accueil attentif — à
              réserver en quelques clics, avec une disponibilité mise à jour en temps réel.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/chambres" className="btn btn-primary">Voir les chambres</Link>
              <a href="#reunions" className="btn btn-ghost">Espaces de réunion</a>
            </div>
          </div>
          <div style={{ flex: "1 1 360px", position: "relative" }}>
            <img
              src="/images/hero.jpg"
              alt="Façade de Bravia Eco Hotel Lomé"
              style={{ width: "100%", borderRadius: 18, boxShadow: "0 30px 60px rgba(42,33,27,0.25)" }}
            />
            <div
              style={{
                position: "absolute", left: -16, bottom: 24,
                background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
                backdropFilter: "blur(16px)", borderRadius: 16, padding: "14px 18px",
                boxShadow: "0 12px 30px rgba(42,33,27,0.18)", maxWidth: 190,
              }}
            >
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "var(--bordeaux)" }}>7</div>
              <div style={{ fontSize: 12, color: "var(--taupe)" }}>étages, chambres climatisées avec balcon</div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAMBRES */}
      <section className="section" id="chambres">
        <div className="wrap">
          <div className="section-head">
            <h2>Trois ambiances, un même confort</h2>
            <p>Chaque chambre est pensée pour le repos comme pour le travail, avec une literie soignée.</p>
          </div>

          {loading && <p>Chargement des chambres...</p>}

          <div className="card-row">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="photo">
                  <img src={roomImages[room.name] || "/images/room-classic.jpg"} alt={room.name} />
                  <span className={`status-badge ${room.status === "libre" ? "free" : "busy"}`}>
                    {room.status === "libre" ? "Libre" : room.status}
                  </span>
                </div>
                <div className="room-body">
                  <h3>{room.name}</h3>
                  <div className="price">À partir de {Number(room.price).toLocaleString("fr-FR")} FCFA / nuit</div>
                  <p>{room.description}</p>
                  <Link to={`/chambres/${room.id}`} className="btn btn-ghost btn-small">Voir la chambre</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALLES DE RÉUNION */}
      <section className="section section-dark" id="reunions">
        <div className="wrap">
          <div className="section-head light">
            <h2>Des espaces pour recevoir et travailler</h2>
            <p>Trois configurations de salles, équipées pour vos formations, réunions et séminaires.</p>
          </div>
          <div className="card-row">
            <div className="amenity">
              <img src="/images/meeting-classroom.jpg" alt="Salle de formation" />
              <div className="cap"><h4>Salle de formation</h4><span>Disposition classe, jusqu'à 30 personnes</span></div>
            </div>
            <div className="amenity">
              <img src="/images/meeting-theatre.jpg" alt="Salle de conférence" />
              <div className="cap"><h4>Salle de conférence</h4><span>Disposition théâtre, jusqu'à 50 personnes</span></div>
            </div>
            <div className="amenity">
              <img src="/images/meeting-board.jpg" alt="Salle de réunion" />
              <div className="cap"><h4>Salle de réunion</h4><span>Table de conseil, jusqu'à 16 personnes</span></div>
            </div>
          </div>
        </div>
      </section>

           {/* CONFORT */}
      <section className="section" id="confort">
        <div className="wrap" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 48 }}>
          <img
            src="/images/bathroom.jpg"
            alt="Salle de bain moderne"
            style={{ flex: "1 1 360px", minWidth: 0, width: "100%", borderRadius: 20, boxShadow: "0 20px 50px rgba(42,33,27,0.15)" }}
          />
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            <h2 style={{ fontSize: 30, marginBottom: 16 }}>Le détail qui change le séjour</h2>
            <p style={{ marginBottom: 16 }}>
              Douche à l'italienne, eau chaude constante et amenities de bain fournies dans chaque chambre.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              {["Douche à l'italienne et baignoire selon la chambre", "Serviettes et kit de toilette fournis", "Ménage quotidien"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", fontSize: 14 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", marginRight: 12 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div>
          <h2>Prêt à réserver votre chambre ?</h2>
          <p>Vérifiez la disponibilité en temps réel et confirmez votre séjour en quelques minutes.</p>
        </div>
        <Link to="/chambres" className="btn btn-ghost-dark">Réserver maintenant</Link>
      </div>
    </div>
  );
}
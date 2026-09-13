export default function Footer() {
  return (
       <footer id="contact" style={{ padding: "70px 20px 40px" }}>
      <div className="wrap">
        <div
          style={{
            background: "var(--cream-2)",
            borderRadius: 24,
            padding: 40,
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1 1 280px", maxWidth: 320 }}>
            <h3 style={{ fontSize: 20, marginBottom: 10 }}>Bravia Eco Hotel</h3>
            <p style={{ fontSize: 14 }}>
              Lomé, Togo — un accueil chaleureux, des chambres climatisées et
              des espaces pensés pour le travail comme pour le repos.
            </p>
          </div>

          <div style={{ flex: "1 1 160px" }}>
            <h4 style={{ fontSize: 13, marginBottom: 14, fontWeight: 600 }}>Navigation</h4>
            <a href="/chambres" style={{ display: "block", fontSize: 14, color: "var(--taupe)", marginBottom: 10 }}>
              Chambres
            </a>
            <a href="/#reunions" style={{ display: "block", fontSize: 14, color: "var(--taupe)", marginBottom: 10 }}>
              Salles de réunion
            </a>
            <a href="/#confort" style={{ display: "block", fontSize: 14, color: "var(--taupe)" }}>
              Confort
            </a>
          </div>

          <div style={{ flex: "1 1 160px" }}>
            <h4 style={{ fontSize: 13, marginBottom: 14, fontWeight: 600 }}>Contact</h4>
            <p style={{ fontSize: 14, marginBottom: 10 }}>Lomé, Togo</p>
            <p style={{ fontSize: 14, marginBottom: 10 }}>contact@braviaecohotel.tg</p>
            <p style={{ fontSize: 14 }}>+228 00 00 00 00</p>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--taupe)", marginTop: 24 }}>
          © 2026 Bravia Eco Hotel Lomé — projet D-CLIC, septembre 2026
        </p>
      </div>
    </footer>
  );
}
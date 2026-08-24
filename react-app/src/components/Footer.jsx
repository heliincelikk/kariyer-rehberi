export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            Engineers<span style={{ color: '#22d3ee' }}>Path</span>
          </div>
          <p>
            Mühendislik kariyer yolculuğunuzdaki en güvenilir rehberiniz. Liseden mezuniyete, stajdan ilk işe uzanan yol arkadaşınız.
          </p>
        </div>

        <ul className="footer-links">
          <li><a href="/kesfet">Keşfet & Disiplinler</a></li>
          <li><a href="/quiz">Kariyer Analiz Testi</a></li>
          <li><a href="/kesfet?tab=mentorship">Mentorlar</a></li>
          <li><a href="/kayit">Ücretsiz Kayıt Ol</a></li>
        </ul>

        <div className="footer-socials">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github" /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><i className="fa-brands fa-x-twitter" /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 EngineersPath Platformu. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

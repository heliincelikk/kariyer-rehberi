import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo" style={{ fontSize: '26px', marginBottom: '8px', color: '#06b6d4', fontWeight: 'bold' }}>
            EngineersPath
          </div>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Mühendislik Kariyer Yolculuğunuzdaki Güvenilir Rehberiniz.
          </p>
        </div>
        <ul className="footer-links" style={{ display: 'flex', gap: '25px', listStyle: 'none' }}>
          <li><Link to="/kesfet" style={{ color: '#94a3b8', textDecoration: 'none' }}>Keşfet</Link></li>
          <li><Link to="/kesfet?tab=disciplines" style={{ color: '#94a3b8', textDecoration: 'none' }}>Disiplinler</Link></li>
          <li><Link to="/register" style={{ color: '#94a3b8', textDecoration: 'none' }}>Kayıt Ol</Link></li>
        </ul>
        <div className="footer-socials" style={{ display: 'flex', gap: '15px' }}>
          <a href="#" style={socialStyle}><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="#" style={socialStyle}><i className="fa-brands fa-github"></i></a>
          <a href="#" style={socialStyle}><i className="fa-brands fa-x-twitter"></i></a>
          <a href="#" style={socialStyle}><i className="fa-brands fa-instagram"></i></a>
        </div>
      </div>
      <div className="footer-bottom-line" style={{ maxWidth: '1200px', margin: '30px auto 0 auto', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
        &copy; 2026 EngineersPath. Tüm hakları saklıdır. Mühendislik tutkusuyla tasarlandı. ⚙️✨
      </div>
    </footer>
  );
}

const socialStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(30, 41, 59, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#06b6d4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none'
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenLoginModal }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.rol === 'mentor') return '/dashboard-mentor';
    if (user.durum === 'lise_ogrenci') return '/dashboard-aday';
    return '/dashboard-ogrenci';
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>EngineersPath</Link>
      <nav style={styles.navLinks}>
        <Link to="/kesfet" style={styles.navLink}>Keşfet</Link>
        {user && (
          <Link to={getDashboardPath()} style={styles.navLink}>Panelim</Link>
        )}
      </nav>
      <div className="auth-buttons" style={styles.authButtons}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#06b6d4', fontWeight: '600' }}>
              <i className="fa-solid fa-user" style={{ marginRight: '6px' }}></i>
              {user.kullaniciAdi}
            </span>
            <button 
              onClick={() => { logout(); navigate('/'); }}
              style={styles.logoutBtn}
            >
              Çıkış Yap
            </button>
          </div>
        ) : (
          <>
            <button className="login-btn" style={styles.loginBtn} onClick={onOpenLoginModal}>
              Giriş Yap
            </button>
            <button className="register-btn" style={styles.registerBtn} onClick={() => navigate('/register')}>
              Kayıt Ol
            </button>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    zIndex: 10
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#06b6d4',
    textShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
    textDecoration: 'none'
  },
  navLinks: {
    display: 'flex',
    gap: '20px'
  },
  navLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'color 0.3s ease'
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center'
  },
  loginBtn: {
    padding: '10px 24px',
    marginLeft: '10px',
    border: '2px solid #06b6d4',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 600,
    backgroundColor: 'transparent',
    color: '#06b6d4',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  registerBtn: {
    padding: '10px 24px',
    marginLeft: '10px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 600,
    backgroundColor: '#06b6d4',
    color: '#0f172a',
    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  logoutBtn: {
    padding: '8px 18px',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    borderRadius: '20px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    cursor: 'pointer',
    fontWeight: 600
  }
};

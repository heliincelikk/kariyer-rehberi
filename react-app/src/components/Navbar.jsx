import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import NotificationPanel from './NotificationPanel';

export default function Navbar({ onOpenLogin, scrolled = false }) {
  const { user, logout } = useAuth();
  const { notifications } = useDashboard();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getDashboardPath = () => {
    if (!user) return '/kayit';
    if (user.role === 'mentor') return '/panel/mentor';
    if (user.status === 'lise_ogrenci') return '/panel/aday';
    return '/panel/ogrenci';
  };

  return (
    <>
      <nav className={'navbar' + (scrolled ? ' scrolled' : '')} aria-label="Ana navigasyon">
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="/" className="nav-logo" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            Engineers<span style={{ color: '#22d3ee' }}>Path</span>
          </a>

          <div className="nav-links desktop-only" style={{ display: 'flex', gap: 20 }}>
            <a href="/kesfet" className="nav-link">Keşfet</a>
            <a href="/quiz" className="nav-link">Kariyer Testi</a>
            <a href="/kesfet?tab=disciplines" className="nav-link">Disiplinler</a>
            <a href="/kesfet?tab=mentorship" className="nav-link">Mentorlar</a>
          </div>
        </div>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {user ? (
            <>
              <button
                className="icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  color: '#22d3ee',
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                title="Bildirimler"
              >
                <i className="fa-solid fa-bell" />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: '#ef4444',
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 'bold',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.15))',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#f8fafc',
                    padding: '8px 16px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#06b6d4',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 13
                  }}>
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span>{user.name || 'Hesabım'}</span>
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: 11, opacity: 0.7 }} />
                </button>

                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '115%',
                    width: 220,
                    background: '#0f172a',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: 14,
                    padding: '10px 0',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                    zIndex: 100,
                    backdropFilter: 'blur(20px)'
                  }}>
                    <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: 14 }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{user.department || user.school}</div>
                    </div>
                    <a
                      href={getDashboardPath()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 16px',
                        color: '#cbd5e1',
                        textDecoration: 'none',
                        fontSize: 14,
                        transition: 'background 0.2s'
                      }}
                    >
                      <i className="fa-solid fa-gauge-high" style={{ color: '#06b6d4' }} /> Panelime Git
                    </a>
                    <button
                      onClick={logout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 16px',
                        color: '#ef4444',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: 14,
                        cursor: 'pointer',
                        borderTop: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket" /> Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button className="nav-btn nav-btn-outline" onClick={onOpenLogin}>
                Giriş Yap
              </button>
              <a href="/kayit" className="nav-btn nav-btn-solid" style={{ textDecoration: 'none' }}>
                Kayıt Ol
              </a>
            </>
          )}
        </div>
      </nav>

      {showNotifications && (
        <NotificationPanel close={() => setShowNotifications(false)} />
      )}
    </>
  );
}

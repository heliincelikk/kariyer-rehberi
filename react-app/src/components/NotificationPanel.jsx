import { useDashboard } from '../context/DashboardContext';

export default function NotificationPanel({ close, navigate }) {
  const { notifications, markAllAsRead } = useDashboard();

  return (
    <div
      style={{
        position: 'fixed',
        top: 80,
        right: 24,
        width: 380,
        maxWidth: 'calc(100vw - 48px)',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(6, 182, 212, 0.4)',
        borderRadius: 20,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(20px)',
        zIndex: 1050,
        overflow: 'hidden',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(30, 41, 59, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-bell" style={{ color: '#06b6d4' }} />
          <strong style={{ color: '#fff', fontSize: 16 }}>Bildirimler</strong>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={markAllAsRead}
            style={{
              background: 'none',
              border: 'none',
              color: '#06b6d4',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Tümünü Okundu Say
          </button>
          <button
            onClick={close}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
      </div>

      <div style={{ maxHeight: 380, overflowY: 'auto', padding: '12px' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#94a3b8', fontSize: 14 }}>
            Henüz bildiriminiz yok.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (navigate && n.tab) navigate(n.tab);
                close();
              }}
              style={{
                padding: 12,
                borderRadius: 12,
                marginBottom: 8,
                background: n.read ? 'rgba(30, 41, 59, 0.3)' : 'rgba(6, 182, 212, 0.12)',
                border: n.read ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(6, 182, 212, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <strong style={{ color: n.read ? '#cbd5e1' : '#22d3ee', fontSize: 13 }}>
                  {n.title}
                </strong>
                <span style={{ fontSize: 11, color: '#64748b' }}>{n.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>
                {n.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

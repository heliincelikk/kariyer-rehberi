import { useEffect } from 'react';

export default function Modal({ title, children, onClose, maxWidth = 600 }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        overflowY: 'auto'
      }}
    >
      <div
        className="modal-box"
        style={{
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          borderRadius: 24,
          padding: 32,
          width: '100%',
          maxWidth,
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          animation: 'fadeIn 0.3s ease'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Kapat"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#94a3b8',
            fontSize: 22,
            width: 38,
            height: 38,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          ×
        </button>

        {title && (
          <h2 style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: 20,
            paddingRight: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            {title}
          </h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}

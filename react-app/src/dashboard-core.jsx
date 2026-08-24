import { createContext, useContext, useEffect, useRef, useState } from 'react';

const DashboardState = createContext(null);
const storageKey = 'engineerspath-dashboard-v2';

export function DashboardProvider({ children }) {
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || { notifications: [], chats: {}, requests: [], saved: [], applications: [] }; }
    catch { return { notifications: [], chats: {}, requests: [], saved: [], applications: [] }; }
  });
  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(state)), [state]);
  const value = {
    state,
    notify: (text, target) => setState((current) => ({ ...current, notifications: [{ id: crypto.randomUUID(), text, target, read: false, time: new Date().toISOString() }, ...current.notifications] })),
    markRead: (id) => setState((current) => ({ ...current, notifications: current.notifications.map((item) => item.id === id ? { ...item, read: true } : item) })),
    markAllRead: () => setState((current) => ({ ...current, notifications: current.notifications.map((item) => ({ ...item, read: true })) })),
    sendMessage: (thread, text) => setState((current) => ({ ...current, chats: { ...current.chats, [thread]: [...(current.chats[thread] || []), { id: crypto.randomUUID(), by: 'Sen', text, time: new Date().toISOString() }] } })),
    toggleSaved: (id) => setState((current) => ({ ...current, saved: current.saved.includes(id) ? current.saved.filter((item) => item !== id) : [...current.saved, id] })),
  };
  return <DashboardState.Provider value={value}>{children}</DashboardState.Provider>;
}

export function useDashboardState() {
  const value = useContext(DashboardState);
  if (!value) throw new Error('DashboardProvider gerekli.');
  return value;
}

export function Modal({ title, children, onClose }) {
  const closeButton = useRef(null);
  useEffect(() => { closeButton.current?.focus(); const escape = (event) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [onClose]);
  return <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="dialog surface" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="button-row"><h2 id="modal-title">{title}</h2><button ref={closeButton} className="button" onClick={onClose}>Kapat</button></div>{children}</section></div>;
}

export function NotificationPanel({ navigate, close }) {
  const { state, markAllRead, markRead } = useDashboardState();
  return <section className="surface dashboard-card" aria-label="Bildirimler"><div className="button-row"><h2>Bildirimler</h2><button className="button" onClick={markAllRead}>Tümünü okundu say</button><button className="button" onClick={close}>Kapat</button></div>{state.notifications.length ? state.notifications.map((item) => <button className="nav-button" key={item.id} onClick={() => { markRead(item.id); navigate(item.target || 'overview'); close(); }}>{item.read ? '✓ ' : '• '}{item.text}</button>) : <p className="muted">Yeni bildirimin yok.</p>}</section>;
}

export function Conversation({ thread, title }) {
  const { state, sendMessage } = useDashboardState(); const [draft, setDraft] = useState(''); const entries = state.chats[thread] || [];
  const submit = (event) => { event.preventDefault(); if (!draft.trim()) return; sendMessage(thread, draft.trim()); setDraft(''); };
  return <section className="surface dashboard-card"><h2>{title}</h2><div className="muted" aria-live="polite">{entries.length ? entries.map((entry) => <p key={entry.id}><strong>{entry.by}: </strong>{entry.text}</p>) : <p>Henüz mesaj yok. Sohbeti sen başlatabilirsin.</p>}</div><form className="button-row" onSubmit={submit}><label className="field" style={{ flex: 1 }}><span className="sr-only">Mesaj</span><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Mesajını yaz" /></label><button className="button primary">Gönder</button></form></section>;
}

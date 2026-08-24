import { useState } from 'react';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';

export default function MentorDashboardPage() {
  const { user, updateProfile } = useAuth();
  const { notify } = useDashboard();

  const [currentTab, setCurrentTab] = useState('panel'); // panel | network | company | news | ai | profile
  const [notifOpen, setNotifOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Ayşe Demir mentörlük isteği gönderdi', text: 'Frontend mimarisi hakkında danışmanlık talep ediyor.', time: '15 dk önce', unread: true },
    { id: 2, title: 'Bora Akın mentörlük isteği gönderdi', text: 'YKS tercihleri ve İTÜ Bilgisayar hakkında soruları var.', time: '1 saat önce', unread: true },
    { id: 3, title: 'Kaan Arda yeni bir mesaj gönderdi', text: 'React hooks ile ilgili projemi paylaştım.', time: 'Dün', unread: false },
    { id: 4, title: 'Şirketinizden: 2026 Yaz Staj Takvimi', text: 'Başvurular haftaya açılıyor.', time: '2 gün önce', unread: true }
  ]);

  // Mentee Requests
  const [requests, setRequests] = useState([
    { id: 'r1', name: 'Ayşe Demir', dept: 'İTÜ Bilgisayar Müh. (3. Sınıf)', topic: 'Frontend Mimarisi & React İncelemesi', note: 'Bitirme projemde Next.js ve mimari kurmak istiyorum. Tecrübelerinizden faydalanmak isterim.' },
    { id: 'r2', name: 'Bora Akın', dept: 'Kadıköy Anadolu Lisesi (12. Sınıf)', topic: 'YKS Tercihleri ve Mühendislik', note: 'İTÜ ve ODTÜ Bilgisayar arasında kararsızım, sektör temposu hakkında sorularım var.' }
  ]);

  // Active Mentees & Chat
  const [mentees, setMentees] = useState([
    { name: 'Kaan Arda', dept: 'Boğaziçi Bilgisayar (2. Sınıf)', university: 'Boğaziçi Üni.', lastMsg: 'React hooks ile ilgili projemi paylaştım.' },
    { name: 'Zeynep Demir', dept: 'İzmir Fen Lisesi (12. Sınıf)', university: 'İzmir Fen', lastMsg: 'Tavsiyeleriniz için çok teşekkürler!' }
  ]);
  const [activeMentee, setActiveMentee] = useState('Kaan Arda');
  const [chatMessages, setChatMessages] = useState({
    'Kaan Arda': [
      { sender: 'mentee', text: 'Hocam merhaba, hazırladığım portföy projesinin kodlarını GitHub linki olarak ilettim.' },
      { sender: 'mentor', text: 'Merhaba Kaan! Harika bir proje olmuş. State management kısmında custom hook kullanımını artırabilirsin.' }
    ],
    'Zeynep Demir': [
      { sender: 'mentee', text: 'YKS sayısal çalışma programı öneriniz çok yardımcı oldu, teşekkür ederim!' }
    ]
  });
  const [directInput, setDirectInput] = useState('');

  // AI Chat
  const [aiChat, setAiChat] = useState([
    { sender: 'ai', text: 'Merhaba! Ben AI Mentörlük & Mülakat Danışmanıyım. 🤖 Menteelerinize vereceğiniz geri bildirimler, teknik mülakat soru setleri ve kariyer rehberliği konularında size yardımcı olabilirim.' }
  ]);
  const [aiInput, setAiInput] = useState('');

  // Schedule Modal
  const [scheduleModal, setScheduleModal] = useState(false);
  const [meetingForm, setMeetingForm] = useState({ date: '', time: '19:30', topic: '' });
  const [scheduledMeetings, setScheduledMeetings] = useState([
    { mentee: 'Kaan Arda', date: '26 Ağustos 2026 - 19:30', topic: 'React Custom Hooks & Mimari İnceleme', link: 'https://meet.google.com/eng-path-demo' }
  ]);

  // Mentor Profile
  const [profile, setProfile] = useState({
    name: user?.name || 'Değerli Mentör',
    title: user?.workplace || 'Senior Software Engineer',
    company: 'Teknoloji Şirketi',
    expertise: 'React, TypeScript, Node.js, Kariyer Koçluğu',
    bio: user?.bio || '6 yıldır yazılım mimarisi üzerine çalışıyorum. Genç mühendis adaylarına mentörlük yapmaktan mutluluk duyuyorum.',
    availability: 'Hafta içi 19:00 - 21:00'
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleAcceptRequest = (req) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setMentees((prev) => [
      ...prev,
      { name: req.name, dept: req.dept, university: req.dept.split(' ')[0], lastMsg: 'Mentörlük talebi kabul edildi.' }
    ]);
    notify(`${req.name} mentörlük ağınıza eklendi!`, 'mentees');
  };

  const handleRejectRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    notify('İstek yanıtlandı.', 'requests');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!directInput.trim()) return;
    const msg = { sender: 'mentor', text: directInput.trim() };
    setChatMessages((prev) => ({
      ...prev,
      [activeMentee]: [...(prev[activeMentee] || []), msg]
    }));
    setDirectInput('');

    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [activeMentee]: [
          ...(prev[activeMentee] || []),
          { sender: 'mentee', text: 'Çok teşekkür ederim hocam, notlarımı aldım ve üzerinde çalışıyorum.' }
        ]
      }));
    }, 900);
  };

  const handleSendAiMessage = (customText) => {
    const text = customText || aiInput;
    if (!text.trim()) return;
    setAiChat((prev) => [...prev, { sender: 'user', text }]);
    if (!customText) setAiInput('');

    setTimeout(() => {
      let reply = 'Mentee görüşmelerinde öğrencinin güçlü yönlerini vurgulayıp ardından spesifik 1-2 gelişim alanı belirlemek motivasyonunu en üst seviyede tutar.';
      if (text.includes('Mülakat')) {
        reply = 'Teknik mülakat için: 1) Veri yapıları & karmaşıklık analizi, 2) Asenkron programlama ve hata yönetimi, 3) Gerçek dünya sistem tasarım senaryosu soruları yöneltebilirsiniz.';
      }
      setAiChat((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setScheduledMeetings((prev) => [
      {
        mentee: activeMentee,
        date: `${meetingForm.date} - ${meetingForm.time}`,
        topic: meetingForm.topic || 'Genel Mentörlük Görüşmesi',
        link: 'https://meet.google.com/eng-' + Math.random().toString(36).substring(7)
      },
      ...prev
    ]);
    setScheduleModal(false);
    notify(`${activeMentee} ile görüşme planlandı!`, 'meetings');
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#ffffff', display: 'flex', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" style={{ fontSize: 18, color: '#06b6d4', fontWeight: 900, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-compass" /> EngineersPath
        </div>

        <div className="menu-items" style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div className="menu-group-label" style={{ fontSize: 11, color: '#64748b', fontWeight: 800, padding: '4px 12px' }}>GENEL</div>
          <div className={`menu-item ${currentTab === 'panel' ? 'active' : ''}`} onClick={() => setCurrentTab('panel')}>
            <i className="fa-solid fa-chart-pie" /> Mentör Paneli
          </div>

          <div className="menu-group-label" style={{ fontSize: 11, color: '#64748b', fontWeight: 800, padding: '12px 12px 4px' }}>AĞIM & İLETİŞİM</div>
          <div className={`menu-item ${currentTab === 'network' ? 'active' : ''}`} onClick={() => setCurrentTab('network')}>
            <i className="fa-solid fa-users-rectangle" /> Mentörlük Ağım & Mesajlar 🤝
            <span className="nav-dot" style={{ display: requests.length > 0 ? 'inline-block' : 'none', marginLeft: 'auto' }} />
          </div>
          <div className={`menu-item ${currentTab === 'company' ? 'active' : ''}`} onClick={() => setCurrentTab('company')}>
            <i className="fa-solid fa-building" /> Şirketinizden 💼
          </div>
          <div className={`menu-item ${currentTab === 'news' ? 'active' : ''}`} onClick={() => setCurrentTab('news')}>
            <i className="fa-solid fa-newspaper" /> Haberler & Mentörler 📰
          </div>

          <div className="menu-group-label" style={{ fontSize: 11, color: '#64748b', fontWeight: 800, padding: '12px 12px 4px' }}>REHBER & ARAÇLAR</div>
          <div className={`menu-item ${currentTab === 'ai' ? 'active' : ''}`} onClick={() => setCurrentTab('ai')}>
            <i className="fa-solid fa-robot" /> AI Mentör Danışmanı 🤖
          </div>

          <div
            className="profile-section"
            style={{ marginTop: 'auto', marginBottom: 10, padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 12, cursor: 'pointer' }}
            onClick={() => setCurrentTab('profile')}
          >
            <h4 style={{ fontSize: 14, color: '#fff', margin: '0 0 3px 0' }}><i className="fa-solid fa-id-badge" /> Profilim</h4>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Okul & Deneyim Bilgilerim</p>
          </div>

          <a
            href="/"
            className="menu-item logout-btn"
            style={{ color: '#ef4444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.2)' }}
            onClick={() => localStorage.clear()}
          >
            <i className="fa-solid fa-right-from-bracket" /> Çıkış Yap
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content" style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Welcome Bar with Notifications */}
        <div className="welcome-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: 20 }}>
          <h1 style={{ fontSize: 28, color: '#fff', margin: 0 }}>
            Hoş Geldin, <span style={{ color: '#06b6d4' }}>{profile.name}!</span> 👋
          </h1>

          <div className="mentor-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <button
              className="mentor-notification-button"
              onClick={() => setNotifOpen(!notifOpen)}
              style={{ width: 44, height: 44, position: 'relative', borderRadius: 12, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(15,23,42,0.72)', color: '#cbd5e1', cursor: 'pointer' }}
            >
              <i className="fa-solid fa-bell" />
              {unreadCount > 0 && (
                <span className="mentor-notification-count" style={{ position: 'absolute', top: -7, right: -7, minWidth: 20, height: 20, borderRadius: 999, background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div
                className="mentor-notification-panel open"
                style={{ position: 'absolute', top: 54, right: 0, zIndex: 100, width: 360, padding: 14, border: '1px solid rgba(6,182,212,0.3)', borderRadius: 16, background: '#0f172a', boxShadow: '0 18px 48px rgba(0,0,0,0.5)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 8 }}>
                  <strong style={{ fontSize: 14, color: '#fff' }}>Bildirimler ({unreadCount})</strong>
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                    Tümünü okundu say
                  </button>
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {notifications.map((n) => (
                    <div key={n.id} onClick={() => { setCurrentTab('network'); setNotifOpen(false); }} style={{ padding: 10, borderRadius: 10, background: n.unread ? 'rgba(6,182,212,0.12)' : 'transparent', border: n.unread ? '1px solid rgba(6,182,212,0.3)' : 'none', marginBottom: 6, cursor: 'pointer' }}>
                      <strong style={{ color: '#fff', fontSize: 13, display: 'block' }}>{n.title}</strong>
                      <p style={{ margin: '3px 0 0 0', color: '#94a3b8', fontSize: 12 }}>{n.text}</p>
                      <span style={{ fontSize: 10, color: '#64748b', marginTop: 4, display: 'block' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="user-badge" style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, color: '#06b6d4' }}>
              Mentör Modu
            </div>
          </div>
        </div>

        {/* TAB 1: PANEL OVERVIEW */}
        {currentTab === 'panel' && (
          <div>
            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 30 }}>
              <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 26 }}>
                <div className="card-icon" style={{ width: 46, height: 46, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 22, marginBottom: 16 }}>
                  <i className="fa-solid fa-robot" />
                </div>
                <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>AI Mentörlük & Mülakat Danışmanı 🤖</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                  Mülakat soruları hazırlama, öğrencilere etkili geri bildirim verme ve kariyer tavsiyeleri için yapay zeka ile danış.
                </p>
                <button onClick={() => setCurrentTab('ai')} className="card-link" style={{ background: 'none', border: 'none', color: '#06b6d4', fontWeight: 'bold', fontSize: 13, cursor: 'pointer', padding: 0 }}>
                  Danışmana Sor ➔
                </button>
              </div>

              <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 26 }}>
                <div className="card-icon" style={{ width: 46, height: 46, background: 'rgba(245, 158, 11, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', fontSize: 22, marginBottom: 16 }}>
                  <i className="fa-solid fa-inbox" />
                </div>
                <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>Gelen Mentörlük İstekleri 📥</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                  Senden mentörlük almak isteyen üniversite ve aday öğrencilerin başvurularını incele ve onaylaş.
                </p>
                <button onClick={() => setCurrentTab('network')} className="card-link" style={{ background: 'none', border: 'none', color: '#06b6d4', fontWeight: 'bold', fontSize: 13, cursor: 'pointer', padding: 0 }}>
                  İstekleri İncele ({requests.length}) ➔
                </button>
              </div>

              <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 26 }}>
                <div className="card-icon" style={{ width: 46, height: 46, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: 22, marginBottom: 16 }}>
                  <i className="fa-solid fa-users-rectangle" />
                </div>
                <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>Mentörlük Ağım 🤝</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                  Aktif mentörlük yaptığın öğrencilerin listesini yönet, birebir mesajlaş ve görüşme randevusu planla.
                </p>
                <button onClick={() => setCurrentTab('network')} className="card-link" style={{ background: 'none', border: 'none', color: '#06b6d4', fontWeight: 'bold', fontSize: 13, cursor: 'pointer', padding: 0 }}>
                  Mentörlük Ağım ➔
                </button>
              </div>

              <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 26 }}>
                <div className="card-icon" style={{ width: 46, height: 46, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 22, marginBottom: 16 }}>
                  <i className="fa-solid fa-newspaper" />
                </div>
                <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>Sektör Akışı & Haberler 📰</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>
                  Platformdaki yeni staj ilanları, popüler mühendislik alanları ve şirket duyurularını takip et.
                </p>
                <button onClick={() => setCurrentTab('news')} className="card-link" style={{ background: 'none', border: 'none', color: '#06b6d4', fontWeight: 'bold', fontSize: 13, cursor: 'pointer', padding: 0 }}>
                  Haberleri Gör ➔
                </button>
              </div>
            </div>

            {/* Upcoming Session Banner */}
            {scheduledMeetings.length > 0 && (
              <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(15, 23, 42, 0.9))', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 18, padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <span style={{ fontSize: 11, color: '#10b981', fontWeight: 'bold' }}>📅 YAKLAŞAN GÖRÜŞME</span>
                  <h4 style={{ fontSize: 17, color: '#fff', margin: '4px 0 2px 0' }}>{scheduledMeetings[0].mentee} — {scheduledMeetings[0].topic}</h4>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>🕒 {scheduledMeetings[0].date}</span>
                </div>
                <a href={scheduledMeetings[0].link} target="_blank" rel="noreferrer" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #0891b2, #0f766e)', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 'bold', fontSize: 13 }}>
                  <i className="fa-solid fa-video" /> Google Meet Odasına Katıl
                </a>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NETWORK & CHAT & REQUESTS */}
        {currentTab === 'network' && (
          <div>
            {/* Pending Requests Section */}
            <div style={{ marginBottom: 30 }}>
              <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 14 }}>
                <i className="fa-solid fa-inbox" style={{ color: '#f59e0b' }} /> Bekleyen Mentörlük Talepleri ({requests.length})
              </h3>

              {requests.length === 0 ? (
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: 20, borderRadius: 14, color: '#94a3b8', fontSize: 13 }}>
                  🎉 Bekleyen yeni mentorluk talebi yok!
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                  {requests.map((r) => (
                    <div key={r.id} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 16, padding: 20 }}>
                      <span style={{ fontSize: 12, color: '#06b6d4', fontWeight: 'bold' }}>{r.dept}</span>
                      <h4 style={{ fontSize: 17, color: '#fff', margin: '4px 0 4px 0' }}>{r.name}</h4>
                      <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.4, margin: '0 0 14px 0' }}>"{r.note}"</p>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => handleRejectRequest(r.id)} style={{ flex: 1, padding: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', borderRadius: 8, fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }}>
                          Reddet
                        </button>
                        <button onClick={() => handleAcceptRequest(r)} style={{ flex: 2, padding: 8, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }}>
                          ✅ Kabul Et
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Mentees Chat & Session Scheduler */}
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: 500, background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ padding: 18, background: 'rgba(30, 41, 59, 0.4)', borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ fontSize: 14, color: '#06b6d4', margin: '0 0 12px 0' }}>
                  <i className="fa-solid fa-comments" /> Aktif Menteelerim
                </h4>
                {mentees.map((m) => (
                  <div
                    key={m.name}
                    onClick={() => setActiveMentee(m.name)}
                    style={{
                      padding: 12,
                      borderRadius: 10,
                      background: activeMentee === m.name ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.02)',
                      borderLeft: activeMentee === m.name ? '3px solid #06b6d4' : '3px solid transparent',
                      cursor: 'pointer',
                      marginBottom: 6
                    }}
                  >
                    <strong style={{ color: '#fff', fontSize: 13, display: 'block' }}>{m.name}</strong>
                    <span style={{ color: '#94a3b8', fontSize: 11 }}>{m.dept}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 10, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, color: '#fff' }}>{activeMentee}</h3>
                    <span style={{ fontSize: 12, color: '#10b981' }}>● Çevrimiçi</span>
                  </div>
                  <button
                    onClick={() => setScheduleModal(true)}
                    style={{ padding: '6px 14px', background: 'rgba(6,182,212,0.15)', border: '1px solid #06b6d4', color: '#22d3ee', borderRadius: 8, fontSize: 12, fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    📅 Randevu Ekle
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(chatMessages[activeMentee] || []).map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.sender === 'mentor' ? 'flex-end' : 'flex-start',
                        background: msg.sender === 'mentor' ? '#0891b2' : 'rgba(30, 41, 59, 0.85)',
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: 12,
                        fontSize: 13,
                        maxWidth: '75%'
                      }}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <input
                    value={directInput}
                    onChange={(e) => setDirectInput(e.target.value)}
                    placeholder="Mesajını yaz..."
                    style={{ flex: 1, padding: 12, background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 10, color: '#fff', outline: 'none', fontSize: 13 }}
                  />
                  <button type="submit" style={{ padding: '0 20px', background: '#06b6d4', border: 'none', borderRadius: 10, color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>
                    Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPANY */}
        {currentTab === 'company' && (
          <div>
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 20, padding: 26, marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, color: '#fff', margin: '0 0 8px 0' }}>🏢 {profile.company} — Şirket İlan ve Yetenek Havuzu</h3>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 18px 0' }}>
                Şirketinizin açık staj pozisyonlarını inceleyin, platformdaki yetenekli öğrencilere doğrudan staj daveti iletin.
              </p>
              <button onClick={() => notify('Şirket staj havuzuna erişim sağlandı.', 'company')} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #0891b2, #0f766e)', border: 'none', color: '#fff', borderRadius: 10, fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }}>
                Yetenek Havuzunu Filtrele
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: NEWS */}
        {currentTab === 'news' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { title: '2026 Mühendislik İstihdam Trendleri Raporu Yayınlandı', time: 'Bugün', desc: 'Yapay zeka, otonom sistemler ve bulut mimarisi pozisyonlarında talep %40 artış gösterdi.' },
              { title: 'Üniversite-Sanayi İş Birliği Webinarı', time: 'Dün', desc: 'Kıdemli mühendislerin lisans öğrencilerine mentorluk yapmasının kariyer gelişimine etkileri tartışıldı.' }
            ].map((n) => (
              <div key={n.title} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 16, padding: 20 }}>
                <span style={{ fontSize: 11, color: '#06b6d4', fontWeight: 'bold' }}>{n.time}</span>
                <h4 style={{ fontSize: 17, color: '#fff', margin: '4px 0 4px 0' }}>{n.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{n.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: AI ADVISOR */}
        {currentTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: 850, margin: '0 auto', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20 }}>
              <div className="card-icon" style={{ width: 44, height: 44, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 22 }}>
                <i className="fa-solid fa-robot" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: 18, color: '#fff' }}>AI Mentör Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>Mülakat hazırlama ve öğrenci geribildirim asistanı</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              <button onClick={() => handleSendAiMessage('Frontend stajyeri için teknik mülakat soruları önerir misin?')} className="subnav-btn" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', padding: '8px 14px', borderRadius: 10, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                💡 Frontend Mülakat Soruları
              </button>
              <button onClick={() => handleSendAiMessage('Motivasyonu düşmüş bir mentee için nasıl geri bildirim verebilirim?')} className="subnav-btn" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', padding: '8px 14px', borderRadius: 10, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                🎯 Yapıcı Geri Bildirim Taktikleri
              </button>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 16, padding: 20, minHeight: 260, maxHeight: 380, overflowY: 'auto', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {aiChat.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    background: m.sender === 'user' ? '#0891b2' : 'rgba(6, 182, 212, 0.1)',
                    borderLeft: m.sender === 'user' ? 'none' : '3px solid #06b6d4',
                    padding: '12px 16px',
                    borderRadius: 12,
                    fontSize: 14,
                    lineHeight: 1.6,
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%'
                  }}
                >
                  <strong style={{ color: m.sender === 'user' ? '#fff' : '#06b6d4', display: 'block', marginBottom: 4 }}>
                    {m.sender === 'user' ? 'Sen:' : '🤖 AI Asistan:'}
                  </strong>
                  {m.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                placeholder="Mentörlük süreci veya teknik mülakatlar hakkında bir soru sor..."
                style={{ flex: 1, padding: '12px 18px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 12, color: '#fff', fontSize: 14, outline: 'none' }}
              />
              <button
                onClick={() => handleSendAiMessage()}
                style={{ padding: '12px 24px', background: '#06b6d4', color: '#0f172a', border: 'none', borderRadius: 12, fontWeight: 'bold', cursor: 'pointer' }}
              >
                Sor
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: PROFILE */}
        {currentTab === 'profile' && (
          <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 30 }}>
            <h3 style={{ fontSize: 20, color: '#fff', marginBottom: 20 }}>Mentörlük Profil ve Müsaitlik Ayarları</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>UNVAN</label>
                <input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>ŞİRKET</label>
                <input
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>MÜSAİTLİK SAATLERİ</label>
                <input
                  value={profile.availability}
                  onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                  style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>BİYOGRAFİ</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                />
              </div>
              <button
                onClick={() => notify('Profil bilgileriniz güncellendi!', 'profile')}
                style={{ padding: 12, background: 'linear-gradient(135deg, #0891b2, #0f766e)', border: 'none', color: '#fff', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
              >
                💾 Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Schedule Meeting Modal */}
      {scheduleModal && (
        <Modal title={`${activeMentee} ile Randevu Planla`} onClose={() => setScheduleModal(false)}>
          <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Tarih</label>
              <input required type="date" value={meetingForm.date} onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Saat</label>
              <input required type="time" value={meetingForm.time} onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Konu</label>
              <input required value={meetingForm.topic} onChange={(e) => setMeetingForm({ ...meetingForm, topic: e.target.value })} placeholder="Örn: Portföy ve Kod İncelemesi" style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff' }} />
            </div>
            <button className="submit-btn" style={{ width: '100%', marginTop: 8 }}>
              Randevuyu Onayla ve Link Oluştur
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

import { useState } from 'react';
import Modal from '../components/Modal';
import { disciplinesData } from '../data/disciplinesData';
import { universitiesData } from '../data/universitiesData';
import { mentorsData } from '../data/mentorsData';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';

export default function CandidateDashboardPage() {
  const { user, updateProfile } = useAuth();
  const { notify } = useDashboard();

  const [currentTab, setCurrentTab] = useState('panel'); // panel | school | discover | uni | mentors | ai | profile
  const [schoolSubTab, setSchoolSubTab] = useState('peers'); // peers | announcements | clubs | chat
  const [mentorSubTab, setMentorSubTab] = useState('all'); // all | accepted | messages
  const [mentorDeptFilter, setMentorDeptFilter] = useState('hepsi');
  const [uniDeptFilter, setUniDeptFilter] = useState('bilgisayar');

  // Notifications
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Ege Yılmaz yeni bir mesaj gönderdi', text: 'Tercih dönemi için notlarını gönderdim.', time: '10 dakika önce', unread: true, group: 'mentor-messages' },
    { id: 2, title: 'Ege Yılmaz yeni bir mesaj gönderdi', text: 'Koç ve İTÜ’yü birlikte karşılaştıralım.', time: '8 dakika önce', unread: true, group: 'mentor-messages' },
    { id: 3, title: 'Mentörlük talebin kabul edildi', text: 'Nil Yıldız ile artık sohbet başlatabilirsin.', time: 'Bugün', unread: false, group: 'mentor-acceptance' },
    { id: 4, title: 'Yeni duyuru: YKS Tercih Semineri', text: '22 Ağustos’ta konferans salonunda.', time: 'Bugün', unread: true, group: 'school-announcements' },
    { id: 5, title: 'Yeni duyuru: Python Atölyesi', text: '26 Ağustos’ta bilgisayar laboratuvarında.', time: 'Bugün', unread: true, group: 'school-announcements' }
  ]);

  // Mentor Requests & Chat
  const [requestedMentors, setRequestedMentors] = useState(['Ege Yılmaz']);
  const [acceptedMentors, setAcceptedMentors] = useState([
    { name: 'Ege Yılmaz', university: 'Koç Üniversitesi', dept: 'Bilgisayar Mühendisliği 4. Sınıf', avatar: '👨‍🎓' },
    { name: 'Nil Yıldız', university: 'Boğaziçi Üniversitesi', dept: 'Bilgisayar Mühendisliği 4. Sınıf', avatar: '👩‍🎓' }
  ]);

  const [activeChatMentor, setActiveChatMentor] = useState('Ege Yılmaz');
  const [chatMessages, setChatMessages] = useState({
    'Ege Yılmaz': [
      { sender: 'mentor', text: 'Merhaba! Koç ve İTÜ Bilgisayar arasında kaldığını gördüm. Sana yardımcı olmak isterim.' },
      { sender: 'mentor', text: 'Tercih dönemi için notlarını gönderdim.' }
    ],
    'Nil Yıldız': [
      { sender: 'mentor', text: 'Selam! Boğaziçi Üniversitesi Bilgisayar Müh. ders yoğunluğu ve kampüs hayatı hakkında her şeyi sorabilirsin.' }
    ]
  });
  const [directInput, setDirectInput] = useState('');

  // AI Chat
  const [aiChat, setAiChat] = useState([
    { sender: 'ai', text: 'Merhaba! Ben geleceğin mühendisleri için özel tasarlanmış AI Kariyer Danışmanıyım. 🎯 Sevdiğin dersleri, ilgi alanlarını veya merak ettiğin mühendislik bölümlerini bana sorabilirsin!' }
  ]);
  const [aiInput, setAiInput] = useState('');

  // Modal State
  const [selectedDisciplineModal, setSelectedDisciplineModal] = useState(null);
  const [selectedUniModal, setSelectedUniModal] = useState(null);

  // Profile Form
  const [profile, setProfile] = useState({
    name: user?.name || 'Geleceğin Mühendisi',
    school: user?.school || 'Kadıköy Anadolu Lisesi',
    target: user?.department || 'İTÜ Bilgisayar Mühendisliği',
    bio: user?.bio || 'YKS sayısal öğrencisiyim. Yazılım ve yapay zeka alanında ilerlemek istiyorum.',
    tyt: '85.5',
    ayt: '68.0'
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleSendDirectMessage = (e) => {
    e?.preventDefault();
    if (!directInput.trim()) return;
    const msg = { sender: 'user', text: directInput.trim() };
    setChatMessages((prev) => ({
      ...prev,
      [activeChatMentor]: [...(prev[activeChatMentor] || []), msg]
    }));
    setDirectInput('');

    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [activeChatMentor]: [
          ...(prev[activeChatMentor] || []),
          { sender: 'mentor', text: 'Harika bir soru! Üniversitemizin mühendislik fakültesi bu konuda çok güçlü imkanlar sunuyor. Kesinlikle listene yazmalısın.' }
        ]
      }));
    }, 800);
  };

  const handleSendAiMessage = (customText) => {
    const text = customText || aiInput;
    if (!text.trim()) return;
    setAiChat((prev) => [...prev, { sender: 'user', text }]);
    if (!customText) setAiInput('');

    setTimeout(() => {
      let reply = 'Mühendislik tercihinde ilgi duyduğun dersler ve problem çözme yaklaşımın en belirleyici faktördür. EngineersPath üzerindeki bölümleri detaylıca inceleyebilirsin!';
      if (text.includes('Yazılım vs Bilgisayar')) {
        reply = 'Bilgisayar Mühendisliği donanım, mikroişlemciler ve yazılım teorisini birlikte ele alırken; Yazılım Mühendisliği daha çok büyük ölçekli yazılım mimarileri, test süreçleri ve kod kalitesine odaklanır.';
      } else if (text.includes('Lisede Kodlama')) {
        reply = 'Lisede başlamak için en ideal dil Python’dur. Temel algoritmaları öğrendikten sonra web geliştirme (HTML/CSS/JS) veya robotik (C++/Arduino) projelerine yönelebilirsin.';
      }
      setAiChat((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  const candidatePeers = [
    { name: 'Kaan Arda', school: profile.school, grade: '12. Sınıf • Sayısal', target: 'Yazılım / Bilgisayar Müh.' },
    { name: 'Zeynep Demir', school: profile.school, grade: '12. Sınıf • Sayısal', target: 'Elektrik-Elektronik Müh.' },
    { name: 'Deniz Ekin', school: profile.school, grade: '12. Sınıf • Sayısal', target: 'Endüstri Müh.' },
    { name: 'Sena Ak', school: profile.school, grade: '11. Sınıf • Sayısal', target: 'Yapay Zeka Müh.' }
  ];

  const mentorsList = [
    { name: 'Ege Yılmaz', university: 'Koç Üniversitesi', dept: 'Bilgisayar Mühendisliği 4. Sınıf', tag: 'Yazılım & Web', code: 'bilgisayar' },
    { name: 'Nil Yıldız', university: 'Boğaziçi Üniversitesi', dept: 'Bilgisayar Mühendisliği 4. Sınıf', tag: 'AI & Veri', code: 'bilgisayar' },
    { name: 'Mert Aksoy', university: 'İTÜ', dept: 'Makine Mühendisliği 3. Sınıf', tag: 'CAD & Robotik', code: 'makine' },
    { name: 'Selin Kaya', university: 'ODTÜ', dept: 'Elektrik-Elektronik Müh. 4. Sınıf', tag: 'Gömülü Sistemler', code: 'elektrik' },
    { name: 'Canberk Aydın', university: 'Bilkent Üniversitesi', dept: 'Endüstri Mühendisliği 3. Sınıf', tag: 'Optimizasyon & Danışmanlık', code: 'endustri' }
  ];

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#ffffff', display: 'flex', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" style={{ fontSize: 20, color: '#06b6d4', fontWeight: 900, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="fa-solid fa-compass" /> EngineersPath
        </div>

        <div className="menu-items" style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <div
            className={`menu-item ${currentTab === 'panel' ? 'active' : ''}`}
            onClick={() => setCurrentTab('panel')}
          >
            <i className="fa-solid fa-chart-pie" /> Aday Paneli
          </div>

          <div
            className={`menu-item ${currentTab === 'school' ? 'active' : ''}`}
            onClick={() => setCurrentTab('school')}
          >
            <i className="fa-solid fa-school" /> Okulunuzdan 🎓
            <span className="sidebar-message-dot" id="schoolMenuUnreadDot" />
          </div>

          <div
            className={`menu-item ${currentTab === 'discover' ? 'active' : ''}`}
            onClick={() => setCurrentTab('discover')}
          >
            <i className="fa-solid fa-graduation-cap" /> Mühendislik Bölümleri
          </div>

          <div
            className={`menu-item ${currentTab === 'uni' ? 'active' : ''}`}
            onClick={() => setCurrentTab('uni')}
          >
            <i className="fa-solid fa-building-columns" /> Üniversiteler & Sıralamalar 🏫
          </div>

          <div
            className={`menu-item ${currentTab === 'mentors' ? 'active' : ''}`}
            onClick={() => setCurrentTab('mentors')}
          >
            <i className="fa-solid fa-user-graduate" /> Üniversiteli Mentörler 🎓
            <span className="sidebar-message-dot" id="mentorMenuUnreadDot" />
          </div>

          <div
            className={`menu-item ${currentTab === 'ai' ? 'active' : ''}`}
            onClick={() => setCurrentTab('ai')}
          >
            <i className="fa-solid fa-robot" /> AI Mühendislik Danışmanı 🤖
          </div>

          <div
            className="profile-section"
            style={{ marginTop: 'auto', marginBottom: 10, padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 12, cursor: 'pointer' }}
            onClick={() => setCurrentTab('profile')}
          >
            <h4 style={{ fontSize: 14, color: '#fff', margin: '0 0 3px 0' }}><i className="fa-solid fa-user" /> Profilim</h4>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Lise & Hedef Bilgilerim</p>
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

          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <button
              className="notification-button"
              onClick={() => setNotifOpen(!notifOpen)}
              style={{
                width: 44,
                height: 44,
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: 12,
                background: 'rgba(15, 23, 42, 0.72)',
                color: '#cbd5e1',
                cursor: 'pointer'
              }}
            >
              <i className="fa-regular fa-bell" />
              {unreadCount > 0 && (
                <span className="notification-count" style={{ position: 'absolute', top: -7, right: -7, minWidth: 20, height: 20, borderRadius: 999, background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notifOpen && (
              <div
                className="notification-panel open"
                style={{
                  position: 'absolute',
                  top: 54,
                  right: 0,
                  zIndex: 100,
                  width: 360,
                  padding: 14,
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: 16,
                  background: '#0f172a',
                  boxShadow: '0 18px 48px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 8 }}>
                  <strong style={{ fontSize: 14, color: '#fff' }}>Bildirimler ({unreadCount})</strong>
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                    Tümünü okundu say
                  </button>
                </div>

                <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.group.includes('mentor')) {
                          setCurrentTab('mentors');
                          setMentorSubTab('messages');
                        } else if (n.group.includes('school')) {
                          setCurrentTab('school');
                        }
                        setNotifOpen(false);
                      }}
                      style={{
                        padding: 10,
                        borderRadius: 10,
                        background: n.unread ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                        border: n.unread ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                        marginBottom: 6,
                        cursor: 'pointer'
                      }}
                    >
                      <strong style={{ color: '#fff', fontSize: 13, display: 'block' }}>{n.title}</strong>
                      <p style={{ margin: '3px 0 0 0', color: '#94a3b8', fontSize: 12 }}>{n.text}</p>
                      <span style={{ fontSize: 10, color: '#64748b', marginTop: 4, display: 'block' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="user-badge" style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, color: '#06b6d4' }}>
              Aday Modu
            </div>
          </div>
        </div>

        {/* SEKME 1: KİŞİSELLEŞTİRİLMİŞ ADAY PANELİ */}
        {currentTab === 'panel' && (
          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 25 }}>
            <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 30 }}>
              <div className="card-icon" style={{ width: 50, height: 50, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 24, marginBottom: 20 }}>
                <i className="fa-solid fa-robot" />
              </div>
              <h3 style={{ fontSize: 20, color: '#fff', marginBottom: 12 }}>AI Mühendislik Danışmanı 🤖</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Hangi mühendislik dalının ilgi alanlarına ve hedeflerine uygun olduğunu yapay zeka ile sohbet ederek keşfet.
              </p>
              <button onClick={() => setCurrentTab('ai')} className="card-link" style={{ background: 'none', border: 'none', color: '#06b6d4', fontWeight: 'bold', fontSize: 14, cursor: 'pointer', padding: 0 }}>
                Danışmana Sor ➔
              </button>
            </div>

            <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 30 }}>
              <div className="card-icon" style={{ width: 50, height: 50, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 24, marginBottom: 20 }}>
                <i className="fa-solid fa-graduation-cap" />
              </div>
              <h3 style={{ fontSize: 20, color: '#fff', marginBottom: 12 }}>Mühendislik Dallarını İncele</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Yazılım, Bilgisayar, Elektrik-Elektronik, Makine ve Endüstri gibi tüm mühendislik dallarını detaylıca keşfet.
              </p>
              <button onClick={() => setCurrentTab('discover')} className="card-link" style={{ background: 'none', border: 'none', color: '#06b6d4', fontWeight: 'bold', fontSize: 14, cursor: 'pointer', padding: 0 }}>
                Bölümleri Keşfet ➔
              </button>
            </div>

            <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 30 }}>
              <div className="card-icon" style={{ width: 50, height: 50, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 24, marginBottom: 20 }}>
                <i className="fa-solid fa-user-graduate" />
              </div>
              <h3 style={{ fontSize: 20, color: '#fff', marginBottom: 12 }}>Üniversiteli Öğrenciler ile Konuş 🎓</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Üniversite tercihi, YKS süreci ve kampüs hayatı hakkında mühendislik öğrencilerinden tavsiyeler al.
              </p>
              <button onClick={() => setCurrentTab('mentors')} className="card-link" style={{ background: 'none', border: 'none', color: '#06b6d4', fontWeight: 'bold', fontSize: 14, cursor: 'pointer', padding: 0 }}>
                Öğrencilere Ulaş ➔
              </button>
            </div>
          </div>
        )}

        {/* SEKME: OKULUNUZDAN */}
        {currentTab === 'school' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
              <div>
                <h2 style={{ fontSize: 26, color: '#fff', margin: 0 }}>
                  <i className="fa-solid fa-school" style={{ color: '#06b6d4' }} /> <span>{profile.school}</span> Aday Öğrencileri 🎓
                </h2>
                <p style={{ color: '#94a3b8', fontSize: 15, marginTop: 5 }}>
                  Aynı liseden mühendislik hedefleyen aday arkadaşlarınla tanış ve bağlantı kur.
                </p>
              </div>
            </div>

            <div className="subnav" style={{ display: 'flex', gap: 12, marginBottom: 25 }}>
              {[
                ['peers', 'fa-users', 'Aday Arkadaşlar'],
                ['announcements', 'fa-bullhorn', 'Duyurular (2)'],
                ['clubs', 'fa-people-group', 'Çalışma Kulüpleri'],
                ['chat', 'fa-comments', 'Sohbetler (1)']
              ].map(([id, icon, label]) => (
                <button
                  key={id}
                  onClick={() => setSchoolSubTab(id)}
                  className={`subnav-btn ${schoolSubTab === id ? 'active' : ''}`}
                  style={{
                    background: schoolSubTab === id ? '#06b6d4' : 'transparent',
                    color: schoolSubTab === id ? '#0f172a' : '#94a3b8',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    padding: '10px 20px',
                    borderRadius: 12,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <i className={`fa-solid ${icon}`} style={{ marginRight: 6 }} /> {label}
                </button>
              ))}
            </div>

            {schoolSubTab === 'peers' && (
              <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {candidatePeers.map((p) => (
                  <div key={p.name} className="mentor-card" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 20, padding: 25, textAlign: 'center' }}>
                    <div className="mentor-avatar" style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #1e1b4b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff', margin: '0 auto 12px auto' }}>
                      🎓
                    </div>
                    <h3 style={{ fontSize: 18, color: '#fff', margin: '0 0 4px 0' }}>{p.name}</h3>
                    <span style={{ fontSize: 12, color: '#06b6d4', fontWeight: 'bold', display: 'block', marginBottom: 8 }}>{p.grade}</span>
                    <p style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 16 }}>Hedef: {p.target}</p>
                    <button
                      onClick={() => setSchoolSubTab('chat')}
                      className="request-btn"
                      style={{ padding: '8px 16px', background: 'transparent', color: '#06b6d4', border: '2px solid #06b6d4', borderRadius: 12, fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
                    >
                      Sohbet Başlat
                    </button>
                  </div>
                ))}
              </div>
            )}

            {schoolSubTab === 'announcements' && (
              <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                {[
                  { title: 'YKS Tercih Semineri', desc: '22 Ağustos saat 14:00’te okul konferans salonunda üniversite mühendislik öğrencileriyle buluşma.', date: '22 Ağustos' },
                  { title: 'Python ile Kodlamaya Giriş Atölyesi', desc: 'Lise bilişim kulübü tarafından düzenlenen 4 haftalık temel yazılım kampı.', date: '26 Ağustos' }
                ].map((ann) => (
                  <div key={ann.title} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 18, padding: 22 }}>
                    <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 'bold' }}>📢 ETKİNLİK / DUYURU</span>
                    <h4 style={{ fontSize: 17, color: '#fff', margin: '6px 0 4px 0' }}>{ann.title}</h4>
                    <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{ann.desc}</p>
                    <button onClick={() => notify(`${ann.title} takviminize kaydedildi!`, 'school')} style={{ padding: '8px 16px', background: 'rgba(6,182,212,0.15)', border: '1px solid #06b6d4', color: '#22d3ee', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      Hatırlatıcı Ekle
                    </button>
                  </div>
                ))}
              </div>
            )}

            {schoolSubTab === 'clubs' && (
              <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                {[
                  { name: 'YKS Sayısal Soru Çözüm Grubu', count: '48 Aday', desc: 'Matematik, Fizik ve Kimya yapamadığımız soruları tartıştığımız ortak etüt odası.' },
                  { name: 'Robotik & Arduino Kulübü', count: '32 Üye', desc: 'Lisede temel robotik projeleri geliştiren ve TEKNOFEST hazırlığı yapan grup.' }
                ].map((club) => (
                  <div key={club.name} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 18, padding: 22 }}>
                    <span style={{ fontSize: 11, color: '#10b981', fontWeight: 'bold' }}>👥 {club.count}</span>
                    <h4 style={{ fontSize: 17, color: '#fff', margin: '6px 0 4px 0' }}>{club.name}</h4>
                    <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{club.desc}</p>
                    <button onClick={() => notify(`${club.name} kulübüne katıldınız!`, 'school')} style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #0891b2, #0f766e)', border: 'none', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      Kulübe Katıl
                    </button>
                  </div>
                ))}
              </div>
            )}

            {schoolSubTab === 'chat' && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: 480, background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ padding: 18, background: 'rgba(30, 41, 59, 0.4)', borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <h4 style={{ fontSize: 14, color: '#06b6d4', margin: '0 0 12px 0' }}><i className="fa-solid fa-comments" /> Sohbetler</h4>
                  <div style={{ padding: 12, background: 'rgba(6,182,212,0.15)', borderRadius: 10, border: '1px solid #06b6d4', cursor: 'pointer' }}>
                    <strong style={{ color: '#fff', fontSize: 13, display: 'block' }}>Kaan Arda</strong>
                    <span style={{ color: '#94a3b8', fontSize: 11 }}>12. Sınıf • Sayısal</span>
                  </div>
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ alignSelf: 'flex-start', background: 'rgba(30, 41, 59, 0.85)', padding: '10px 14px', borderRadius: 12, fontSize: 13, color: '#fff' }}>
                      Selam! Python atölyesine katılacak mısın?
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <input placeholder="Mesajını yaz..." style={{ flex: 1, padding: 12, background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 10, color: '#fff', outline: 'none', fontSize: 13 }} />
                    <button style={{ padding: '0 18px', background: '#06b6d4', border: 'none', borderRadius: 10, color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>
                      <i className="fa-solid fa-paper-plane" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEKME 2: TÜM ALANLARI KEŞFET */}
        {currentTab === 'discover' && (
          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {disciplinesData.map((d) => (
              <div
                key={d.id}
                className="premium-card"
                onClick={() => setSelectedDisciplineModal(d)}
                style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, padding: 26, cursor: 'pointer' }}
              >
                <div className="card-icon" style={{ width: 46, height: 46, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 20, marginBottom: 14 }}>
                  <i className={`fa-solid ${d.icon}`} />
                </div>
                <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>{d.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{d.tagline}</p>
              </div>
            ))}
          </div>
        )}

        {/* SEKME 3: ÜNİVERSİTELER & YKS SIRALAMALARI */}
        {currentTab === 'uni' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(30, 41, 59, 0.6)', padding: '20px 25px', borderRadius: 20, border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: 25, flexWrap: 'wrap', gap: 15 }}>
              <div>
                <h2 style={{ fontSize: 20, color: '#fff', margin: '0 0 4px 0' }}>
                  <i className="fa-solid fa-building-columns" style={{ color: '#06b6d4' }} /> Mühendislik Bölüm & Üniversite Sıralamaları 🏫
                </h2>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
                  ÖSYM & YÖK Atlas verilerine göre Türkiye'nin en çok tercih edilen üniversiteleri başarı sıralamasıyla listelenmektedir.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label style={{ color: '#06b6d4', fontWeight: 'bold', fontSize: 13 }}>Bölüm Seç:</label>
                <select
                  value={uniDeptFilter}
                  onChange={(e) => setUniDeptFilter(e.target.value)}
                  style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid #06b6d4', borderRadius: 12, color: '#fff', fontWeight: 600, fontSize: 14, outline: 'none' }}
                >
                  <option value="bilgisayar">💻 Bilgisayar Mühendisliği</option>
                  <option value="yazilim">⚡ Yazılım Mühendisliği</option>
                  <option value="endustri">📊 Endüstri Mühendisliği</option>
                  <option value="elektrik">🔌 Elektrik-Elektronik Müh.</option>
                  <option value="makine">🏎️ Makine Mühendisliği</option>
                  <option value="insaat">🏗️ İnşaat Mühendisliği</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {universitiesData.map((uni, idx) => (
                <div key={uni.id} style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 16, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#06b6d4', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16 }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 17, color: '#fff', margin: '0 0 2px 0' }}>{uni.name}</h4>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{uni.city} • {uni.type}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>Başarı Sıralaması:</span>
                      <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: 14 }}>{uni.popularFields[0]?.rank || 'Top 5.000'}</div>
                    </div>
                    <button
                      onClick={() => setSelectedUniModal(uni)}
                      style={{ padding: '8px 16px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid #06b6d4', color: '#22d3ee', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    >
                      Bölüm Detayları
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEKME: MENTORLAR */}
        {currentTab === 'mentors' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(30, 41, 59, 0.6)', padding: '20px 25px', borderRadius: 20, border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: 25, flexWrap: 'wrap', gap: 15 }}>
              <div>
                <h2 style={{ fontSize: 20, color: '#fff', margin: '0 0 4px 0' }}>
                  <i className="fa-solid fa-user-graduate" style={{ color: '#06b6d4' }} /> Üniversiteli Mentör Öğrenciler 🎓
                </h2>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
                  Hedeflediğin üniversitelerde okuyan üst sınıf öğrencilerinin profillerini incele, rehberlik isteği gönder.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setMentorSubTab('all')}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: mentorSubTab === 'all' ? '#06b6d4' : 'transparent', color: mentorSubTab === 'all' ? '#0f172a' : '#94a3b8', fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }}
                >
                  🌐 Tüm Mentörler
                </button>
                <button
                  onClick={() => setMentorSubTab('accepted')}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: mentorSubTab === 'accepted' ? '#06b6d4' : 'transparent', color: mentorSubTab === 'accepted' ? '#0f172a' : '#94a3b8', fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }}
                >
                  ✅ Eşleşilen Mentörler ({acceptedMentors.length})
                </button>
                <button
                  onClick={() => setMentorSubTab('messages')}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: mentorSubTab === 'messages' ? '#06b6d4' : 'transparent', color: mentorSubTab === 'messages' ? '#0f172a' : '#94a3b8', fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }}
                >
                  💬 Mesajlar <span style={{ background: '#ef4444', color: '#fff', padding: '1px 6px', borderRadius: 10, fontSize: 10, marginLeft: 4 }}>2</span>
                </button>
              </div>
            </div>

            {mentorSubTab === 'all' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {mentorsList.map((m) => {
                  const isRequested = requestedMentors.includes(m.name);
                  return (
                    <div key={m.name} className="mentor-card" style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 20, padding: 25, textAlign: 'center' }}>
                      <div className="mentor-avatar" style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #1e1b4b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#fff', margin: '0 auto 15px auto' }}>
                        🎓
                      </div>
                      <h3 style={{ fontSize: 18, color: '#fff', margin: '0 0 5px 0' }}>{m.name}</h3>
                      <span style={{ fontSize: 13, color: '#06b6d4', fontWeight: 'bold', display: 'block', marginBottom: 6 }}>{m.university}</span>
                      <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 14 }}>{m.dept}</p>
                      <button
                        onClick={() => {
                          if (!isRequested) {
                            setRequestedMentors([...requestedMentors, m.name]);
                            notify(`${m.name} için mentorluk talebiniz iletildi.`, 'mentors');
                          }
                        }}
                        disabled={isRequested}
                        className={`request-btn ${isRequested ? 'sent' : ''}`}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: 12,
                          fontWeight: 'bold',
                          cursor: isRequested ? 'default' : 'pointer',
                          background: isRequested ? '#10b981' : 'transparent',
                          color: isRequested ? '#fff' : '#06b6d4',
                          border: isRequested ? '2px solid #10b981' : '2px solid #06b6d4'
                        }}
                      >
                        {isRequested ? '✅ İstek Gönderildi' : 'Rehberlik İsteği Gönder'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {mentorSubTab === 'accepted' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {acceptedMentors.map((m) => (
                  <div key={m.name} style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 18, padding: 22, textAlign: 'center' }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>{m.avatar}</div>
                    <h4 style={{ fontSize: 17, color: '#fff', margin: '0 0 4px 0' }}>{m.name}</h4>
                    <span style={{ fontSize: 12, color: '#10b981', fontWeight: 'bold', display: 'block', marginBottom: 12 }}>{m.university} • {m.dept}</span>
                    <button
                      onClick={() => {
                        setActiveChatMentor(m.name);
                        setMentorSubTab('messages');
                      }}
                      style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #0891b2, #0f766e)', border: 'none', color: '#fff', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      💬 Sohbeti Aç
                    </button>
                  </div>
                ))}
              </div>
            )}

            {mentorSubTab === 'messages' && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: 480, background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ padding: 18, background: 'rgba(30, 41, 59, 0.4)', borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <h4 style={{ fontSize: 14, color: '#06b6d4', margin: '0 0 12px 0' }}><i className="fa-solid fa-comments" /> Mentör Sohbetleri</h4>
                  {acceptedMentors.map((m) => (
                    <div
                      key={m.name}
                      onClick={() => setActiveChatMentor(m.name)}
                      style={{
                        padding: 12,
                        borderRadius: 10,
                        background: activeChatMentor === m.name ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.02)',
                        borderLeft: activeChatMentor === m.name ? '3px solid #06b6d4' : '3px solid transparent',
                        cursor: 'pointer',
                        marginBottom: 6
                      }}
                    >
                      <strong style={{ color: '#fff', fontSize: 13, display: 'block' }}>{m.name}</strong>
                      <span style={{ color: '#94a3b8', fontSize: 11 }}>{m.university}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 10, marginBottom: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 16, color: '#fff' }}>{activeChatMentor}</h3>
                    <span style={{ fontSize: 12, color: '#10b981' }}>● Çevrimiçi</span>
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(chatMessages[activeChatMentor] || []).map((msg, i) => (
                      <div
                        key={i}
                        style={{
                          alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                          background: msg.sender === 'user' ? '#0891b2' : 'rgba(30, 41, 59, 0.85)',
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

                  <form onSubmit={handleSendDirectMessage} style={{ display: 'flex', gap: 10, marginTop: 12 }}>
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
            )}
          </div>
        )}

        {/* SEKME: AI DANIŞMAN */}
        {currentTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: 850, margin: '0 auto', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20 }}>
              <div className="card-icon" style={{ width: 44, height: 44, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 22 }}>
                <i className="fa-solid fa-robot" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: 18, color: '#fff' }}>AI Mühendislik Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>Lise & YKS mühendis adaylarına özel akıllı kariyer rehberi</p>
              </div>
            </div>

            {/* Quick Question Pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              <button onClick={() => handleSendAiMessage('Hangi mühendislik dalı benim için en uygun?')} className="subnav-btn" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', padding: '8px 14px', borderRadius: 10, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                💡 Hangi mühendislik bana uygun?
              </button>
              <button onClick={() => handleSendAiMessage('Yazılım Mühendisliği ile Bilgisayar Mühendisliği arasındaki fark nedir?')} className="subnav-btn" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', padding: '8px 14px', borderRadius: 10, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                💻 Yazılım vs Bilgisayar Farkı?
              </button>
              <button onClick={() => handleSendAiMessage('Lisede yazılım öğrenmek için nereden başlamalıyım?')} className="subnav-btn" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', padding: '8px 14px', borderRadius: 10, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                🚀 Lisede Kodlama Öğrenmek
              </button>
            </div>

            {/* Chat Box */}
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
                    {m.sender === 'user' ? 'Sen:' : '🤖 AI Danışman:'}
                  </strong>
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                placeholder="Mühendislik ve üniversite hakkında merak ettiğin her şeyi sor..."
                style={{ flex: 1, padding: '12px 18px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 12, color: '#fff', fontSize: 14, outline: 'none' }}
              />
              <button
                onClick={() => handleSendAiMessage()}
                style={{ padding: '12px 24px', background: '#06b6d4', color: '#0f172a', border: 'none', borderRadius: 12, fontWeight: 'bold', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-paper-plane" /> Sor
              </button>
            </div>
          </div>
        )}

        {/* SEKME 5: PROFİLİM */}
        {currentTab === 'profile' && (
          <div style={{ maxWidth: 950, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(0, 1.4fr)', gap: 22 }}>
            <div className="premium-card" style={{ textAlign: 'center', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 30 }}>
              <div style={{ width: 105, height: 105, margin: '0 auto 18px auto', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, color: '#fff', border: '3px solid rgba(6, 182, 212, 0.5)' }}>
                👤
              </div>
              <h3 style={{ fontSize: 20, color: '#fff', margin: '0 0 4px 0' }}>{profile.name}</h3>
              <span style={{ fontSize: 13, color: '#06b6d4', fontWeight: 'bold' }}>{profile.school}</span>
              <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>"{profile.bio}"</p>
            </div>

            <div className="premium-card" style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 30 }}>
              <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 18 }}>Lise ve YKS Hedef Bilgileri</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>LİSE ADI</label>
                  <input
                    value={profile.school}
                    onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                    style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>HEDEF MÜHENDİSLİK BÖLÜMÜ</label>
                  <input
                    value={profile.target}
                    onChange={(e) => setProfile({ ...profile, target: e.target.value })}
                    style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>SON TYT NETİ</label>
                    <input
                      value={profile.tyt}
                      onChange={(e) => setProfile({ ...profile, tyt: e.target.value })}
                      style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>SON AYT NETİ</label>
                    <input
                      value={profile.ayt}
                      onChange={(e) => setProfile({ ...profile, ayt: e.target.value })}
                      style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => notify('Profil ve YKS hedefleriniz kaydedildi!', 'profile')}
                  style={{ marginTop: 10, padding: 12, background: 'linear-gradient(135deg, #0891b2, #0f766e)', border: 'none', color: '#fff', borderRadius: 10, fontWeight: 'bold', cursor: 'pointer' }}
                >
                  💾 Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Discipline Detail Modal */}
      {selectedDisciplineModal && (
        <Modal title={selectedDisciplineModal.name} onClose={() => setSelectedDisciplineModal(null)}>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{selectedDisciplineModal.overview}</p>
          <strong style={{ color: '#22d3ee', display: 'block', marginBottom: 8, fontSize: 13 }}>📚 Kritik Dersler:</strong>
          <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 18, marginBottom: 16 }}>
            {selectedDisciplineModal.courses.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <strong style={{ color: '#10b981', display: 'block', marginBottom: 4, fontSize: 13 }}>💰 Ortalama Maaş Skalası:</strong>
          <span style={{ fontSize: 14, color: '#fff' }}>{selectedDisciplineModal.salaryRange}</span>
        </Modal>
      )}

      {/* University Detail Modal */}
      {selectedUniModal && (
        <Modal title={selectedUniModal.name} onClose={() => setSelectedUniModal(null)}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>{selectedUniModal.campusLife}</p>
          <strong style={{ color: '#22d3ee', display: 'block', marginBottom: 8, fontSize: 13 }}>Bölüm Başarı Sıralamaları:</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {selectedUniModal.popularFields.map((f) => (
              <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(30,41,59,0.6)', padding: '8px 12px', borderRadius: 8, fontSize: 13 }}>
                <span>{f.name}</span>
                <strong style={{ color: '#10b981' }}>{f.rank} (Taban: {f.baseScore})</strong>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

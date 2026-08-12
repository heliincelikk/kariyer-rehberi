import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const companyPeersData = [
  { id: 1, isim: "Selin Çelik", unvan: "Kıdemli Yazılım Mimarı", şirket: "Tech Company", avatar: "SÇ" },
  { id: 2, isim: "Barış Arslan", unvan: "Yapay Zeka Ar-Ge Lideri", şirket: "Tech Company", avatar: "BA" },
  { id: 3, isim: "Zeynep Yılmaz", unvan: "DevOps & Cloud Lead", şirket: "Tech Company", avatar: "ZY" }
];

export default function DashboardMentor() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('panel');
  const [companyView, setCompanyView] = useState('peers');
  const [networkView, setNetworkView] = useState('pending');

  // Mentee Requests state
  const [pendingRequests, setPendingRequests] = useState([
    { id: 101, isim: "Ahmet Kaya", okul: "Boğaziçi Üni - Bilgisayar Müh. 2. Sınıf", not: "Yazılım stajı ve kariyer yol haritası konusunda tavsiye almak istiyorum.", avatar: "AK" },
    { id: 102, isim: "Elif Demir", okul: "İTÜ - Endüstri Müh. 3. Sınıf", not: "Veri analitiği alanında çalışmak istiyorum, mentörlüğünüzü rica ediyorum.", avatar: "ED" }
  ]);
  const [acceptedMentees, setAcceptedMentees] = useState([
    { id: 201, isim: "Can Aksoy", okul: "ODTÜ Makine Müh. 4. Sınıf", avatar: "CA" }
  ]);

  // AI Chat state
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'Merhaba! Ben mentör danışmanınız AI rehberiyim. Mülakat soruları hazırlama veya öğrencilere tavsiyeler vermek için sorularınızı bekliyorum.' }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  const kullaniciAdi = user?.kullaniciAdi || 'Değerli Mentör';
  const kullaniciIsYeri = user?.isYeri || 'Tech Company';

  const handleAcceptRequest = (req) => {
    setPendingRequests(prev => prev.filter(r => r.id !== req.id));
    setAcceptedMentees(prev => [...prev, req]);
    alert(`${req.isim} isimli öğrencinin mentörlük isteği kabul edildi! 🎉`);
  };

  const handleAiSend = (query) => {
    const text = query || aiInputText;
    if (!text.trim()) return;

    setAiChatMessages(prev => [...prev, { sender: 'user', text }]);
    setAiInputText('');

    setTimeout(() => {
      setAiChatMessages(prev => [...prev, {
        sender: 'ai',
        text: 'Öğrencinize teknik staj mülakatlarında veri yapıları, nesne yönelimli programlama ve açık kaynak projelere katılım konularına odaklanmasını önerebilirsiniz.'
      }]);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#ffffff', position: 'relative' }}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <i className="fa-solid fa-compass"></i> EngineersPath
        </div>
        <div className="menu-items">
          <div className="menu-group-label" style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px', marginTop: '10px' }}>GENEL</div>
          <div className={`menu-item ${activeTab === 'panel' ? 'active' : ''}`} onClick={() => setActiveTab('panel')}>
            <i className="fa-solid fa-chart-pie"></i> Mentör Paneli
          </div>

          <div className="menu-group-label" style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px', marginTop: '15px' }}>AĞIM & İLETİŞİM</div>
          <div className={`menu-item ${activeTab === 'network' ? 'active' : ''}`} onClick={() => setActiveTab('network')}>
            <i className="fa-solid fa-users-rectangle"></i> Mentörlük Ağım 🤝
          </div>
          <div className={`menu-item ${activeTab === 'company' ? 'active' : ''}`} onClick={() => setActiveTab('company')}>
            <i className="fa-solid fa-building"></i> Şirketinizden 💼
          </div>

          <div className="menu-group-label" style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px', marginTop: '15px' }}>REHBER & ARAÇLAR</div>
          <div className={`menu-item ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <i className="fa-solid fa-robot"></i> AI Mentör Danışmanı 🤖
          </div>

          <div className="profile-section" style={{ marginTop: 'auto', marginBottom: '10px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('profile')}>
            <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '3px' }}><i className="fa-solid fa-id-badge"></i> Profilim</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Okul & Deneyim Bilgilerim</p>
          </div>

          <button onClick={() => { logout(); navigate('/'); }} className="menu-item logout-btn" style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
            <i className="fa-solid fa-right-from-bracket"></i> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="welcome-bar">
          <h1>Hoş Geldin, <span style={{ color: '#06b6d4' }}>{kullaniciAdi}</span>! 🎓</h1>
          <div className="user-badge">Mentör Modu</div>
        </div>

        {/* TAB 1: MENTÖR PANENELİ OVERVIEW */}
        {activeTab === 'panel' && (
          <div className="dashboard-grid">
            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-robot"></i></div>
              <h3>AI Mentörlük & Mülakat Danışmanı 🤖</h3>
              <p>Mülakat soruları hazırlama ve öğrencilere etkili geri bildirim verme konusunda yapay zeka ile sohbet et.</p>
              <button onClick={() => setActiveTab('ai')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>Danışmana Sor &rarr;</button>
            </div>

            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-inbox"></i></div>
              <h3>Gelen Mentörlük İstekleri 📥</h3>
              <p>Senden mentörlük almak isteyen {pendingRequests.length} öğrencinin başvurusunu incele.</p>
              <button onClick={() => { setActiveTab('network'); setNetworkView('pending'); }} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>İstekleri İncele &rarr;</button>
            </div>

            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-users-rectangle"></i></div>
              <h3>Mentörlük Ağım 🤝</h3>
              <p>Aktif mentörlük yaptığın {acceptedMentees.length} öğrencinin listesini yönet.</p>
              <button onClick={() => { setActiveTab('network'); setNetworkView('accepted'); }} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>Ağımı Yönet &rarr;</button>
            </div>
          </div>
        )}

        {/* TAB: ŞİRKETİNİZDEN */}
        {activeTab === 'company' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', color: '#fff' }}>
                <i className="fa-solid fa-building" style={{ color: '#06b6d4', marginRight: '10px' }}></i>
                <span>{kullaniciIsYeri}</span> Ağınız 💼
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Şirketinizin açtığı staj ilanları ve mentör meslektaşlarınız.</p>
            </div>

            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${companyView === 'peers' ? 'active' : ''}`} onClick={() => setCompanyView('peers')}>Şirket Meslektaşları 💼</button>
              <button className={`tab-btn ${companyView === 'news' ? 'active' : ''}`} onClick={() => setCompanyView('news')}>Duyurular & İlanlar 📢</button>
            </div>

            {companyView === 'peers' && (
              <div className="dashboard-grid">
                {companyPeersData.map(peer => (
                  <div key={peer.id} className="premium-card" style={{ textAlign: 'center' }}>
                    <div style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', color: '#fff', fontSize: '22px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>{peer.avatar}</div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{peer.isim}</h3>
                    <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', margin: '4px 0 10px 0' }}>{peer.unvan}</span>
                    <button className="submit-btn" style={{ marginTop: 0, padding: '8px 16px', fontSize: '13px' }}>Mesaj Gönder</button>
                  </div>
                ))}
              </div>
            )}

            {companyView === 'news' && (
              <div className="premium-card">
                <h3 style={{ color: '#06b6d4', marginBottom: '15px' }}><i className="fa-solid fa-bullhorn"></i> Şirketinizden Haberler & İlanlar 📢</h3>
                <div style={{ background: 'rgba(15,23,42,0.6)', borderLeft: '4px solid #06b6d4', padding: '16px', borderRadius: '12px', marginBottom: '15px' }}>
                  <strong style={{ color: '#fff', fontSize: '15px', display: 'block', marginBottom: '6px' }}>🚀 2026 Yazılım & Yapay Zeka Staj İlanı Açıldı!</strong>
                  <p style={{ color: '#cbd5e1', fontSize: '13.5px', margin: 0 }}>Uzun dönem yazılım stajyer alımları başladı. Öğrencilerinizi yönlendirebilirsiniz.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: MENTÖRLÜK AĞIM */}
        {activeTab === 'network' && (
          <div>
            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${networkView === 'pending' ? 'active' : ''}`} onClick={() => setNetworkView('pending')}>Gelen İstekler ({pendingRequests.length})</button>
              <button className={`tab-btn ${networkView === 'accepted' ? 'active' : ''}`} onClick={() => setNetworkView('accepted')}>Kabul Edilenler ({acceptedMentees.length})</button>
            </div>

            {networkView === 'pending' && (
              <div className="dashboard-grid">
                {pendingRequests.length === 0 ? (
                  <p style={{ color: '#94a3b8' }}>Bekleyen yeni mentörlük isteğiniz bulunmuyor.</p>
                ) : (
                  pendingRequests.map(req => (
                    <div key={req.id} className="premium-card">
                      <h3>{req.isim}</h3>
                      <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>{req.okul}</span>
                      <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>"{req.not}"</p>
                      <button onClick={() => handleAcceptRequest(req)} className="submit-btn" style={{ marginTop: 0, padding: '10px' }}>İsteği Onayla & Kabul Et ✅</button>
                    </div>
                  ))
                )}
              </div>
            )}

            {networkView === 'accepted' && (
              <div className="dashboard-grid">
                {acceptedMentees.map(mentee => (
                  <div key={mentee.id} className="premium-card">
                    <h3>{mentee.isim}</h3>
                    <span style={{ color: '#10b981', fontSize: '13px', display: 'block', marginBottom: '10px' }}>Aktif Mentee</span>
                    <p style={{ fontSize: '14px', color: '#cbd5e1' }}>{mentee.okul}</p>
                    <button className="subnav-btn" style={{ marginTop: '15px', width: '100%' }}>Mesajlaşmayı Başlat 💬</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: AI MENTÖR DANIŞMANI */}
        {activeTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div className="card-icon" style={{ margin: 0 }}><i className="fa-solid fa-robot"></i></div>
              <div>
                <h3 style={{ margin: 0 }}>AI Mentör & Mülakat Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Mentörlük ve mülakat soru bankası rehberi</p>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '20px', minHeight: '260px', maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {aiChatMessages.map((msg, i) => (
                <div key={i} style={{ background: msg.sender === 'user' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)', borderLeft: msg.sender === 'ai' ? '3px solid #06b6d4' : 'none', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>{msg.sender === 'ai' ? '🤖 AI Mentör Danışman:' : '👤 Sen:'}</strong>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" value={aiInputText} onChange={(e) => setAiInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiSend()} placeholder="Mülakat ve mentörlük rehberliği hakkında sor..." style={{ flex: 1, padding: '12px 18px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }} />
              <button onClick={() => handleAiSend()} className="submit-btn" style={{ marginTop: 0, padding: '12px 24px' }}><i className="fa-solid fa-paper-plane"></i> Sor</button>
            </div>
          </div>
        )}

        {/* TAB: PROFİLİM */}
        {activeTab === 'profile' && (
          <div className="premium-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '32px', fontWeight: 'bold' }}>
              🎓
            </div>
            <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '4px' }}>{kullaniciAdi}</h3>
            <span className="user-badge" style={{ display: 'inline-block', marginBottom: '25px' }}>Kıdemli Mentör Modu</span>

            <div style={{ textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Çalışılan Kurum / Şirket</label>
                <p style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: '500' }}>{kullaniciIsYeri}</p>
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Mentörlük Alanı</label>
                <p style={{ color: '#06b6d4', fontSize: '15px', fontWeight: '500' }}>Yazılım Mimarisi & Mülakat Danışmanlığı</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

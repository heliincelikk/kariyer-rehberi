import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schoolPeersData = [
  { id: 1, isim: "Can Aksoy", bolum: "Bilgisayar Müh. 3. Sınıf", avatar: "CA", bio: "React ve Python projelerinde çalışıyor." },
  { id: 2, isim: "Selin Yılmaz", bolum: "Endüstri Müh. 2. Sınıf", avatar: "SY", bio: "Tedarik zinciri ve veri analitiği ile ilgileniyor." },
  { id: 3, isim: "Mert Tunç", bolum: "Elektrik-Elektronik Müh. 4. Sınıf", avatar: "MT", bio: "Gömülü sistemler ve haberleşme projeleri yapıyor." }
];

const jobsData = [
  { id: 1, baslik: "Yazılım & Yapay Zeka Stajyeri", şirket: "Aselsan", sehir: "Ankara / Hibrit", detay: "Python, PyTorch ve C++ ile görüntü işleme projelerinde yer alma imkanı." },
  { id: 2, baslik: "Frontend & React Staj Programı", şirket: "Trendyol Tech", sehir: "İstanbul / Remote", detay: "React.js ve TypeScript kullanarak e-ticaret mikro önyüz mimarisinde çalışma." },
  { id: 3, baslik: "Otonom Sistemler Proje Takımı", şirket: "Baykar Teknoloji", sehir: "İstanbul", detay: "İHA ve SİHA otonom uçuş kontrol yazılımları geliştirme projesi." }
];

export default function DashboardOgrenci() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('panel');
  const [schoolSubtab, setSchoolSubtab] = useState('peers');
  const [jobsSubtab, setJobsSubtab] = useState('all');

  // AI Chat state
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'Merhaba! Ben mühendislik öğrencilerine özel tasarlanmış AI Kariyer ve Ders Danışmanıyım. 🚀 Staj başvuruları, CV hazırlama, GitHub projeleri veya ders notları hakkında sorabilirsin!' }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  // Active chat state
  const [activeSchoolChat, setActiveSchoolChat] = useState(null);
  const [schoolMessages, setSchoolMessages] = useState([
    { sender: 'them', text: 'Selam! Proje grubu için görüşmek ister misin?' }
  ]);
  const [schoolMsgInput, setSchoolMsgInput] = useState('');

  const userName = user?.kullaniciAdi || 'Mühendis Adayı';
  const userSchool = user?.okul || 'Boğaziçi Üniversitesi';
  const userDept = user?.bolum || 'Bilgisayar Mühendisliği';

  const handleAiSend = (query) => {
    const text = query || aiInputText;
    if (!text.trim()) return;

    setAiChatMessages(prev => [...prev, { sender: 'user', text }]);
    setAiInputText('');

    setTimeout(() => {
      setAiChatMessages(prev => [...prev, {
        sender: 'ai',
        text: 'Mühendislik kariyerinizde öne çıkmak için GitHub hesabınızda tamamlanmış README dosyaları olan en az 2 özgün proje bulundurmanızı tavsiye ederim.'
      }]);
    }, 600);
  };

  const handleSchoolMsgSend = () => {
    if (!schoolMsgInput.trim()) return;
    setSchoolMessages(prev => [...prev, { sender: 'me', text: schoolMsgInput }]);
    setSchoolMsgInput('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020617', color: '#ffffff' }}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <i className="fa-solid fa-compass"></i> EngineersPath
        </div>
        <div className="menu-items">
          <div className={`menu-item ${activeTab === 'panel' ? 'active' : ''}`} onClick={() => setActiveTab('panel')}>
            <i className="fa-solid fa-chart-pie"></i> Kişiselleştirilmiş Panel
          </div>
          <div className={`menu-item ${activeTab === 'school' ? 'active' : ''}`} onClick={() => setActiveTab('school')}>
            <i className="fa-solid fa-graduation-cap"></i> Okulunuzdan 🎓
          </div>

          <div className="menu-group-label" style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px', marginTop: '15px' }}>MENTÖRLÜK & SÖKTÖR AĞI</div>
          <div className={`menu-item ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            <i className="fa-solid fa-rocket" style={{ color: '#38bdf8' }}></i> Staj & Proje İlanları 🚀
          </div>
          <div className={`menu-item ${activeTab === 'discover' ? 'active' : ''}`} onClick={() => setActiveTab('discover')}>
            <i className="fa-solid fa-globe"></i> Bölümleri Keşfet 🌐
          </div>
          <div className={`menu-item ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <i className="fa-solid fa-robot"></i> AI Öğrenci Danışmanı 🤖
          </div>

          <div className="profile-section" style={{ marginTop: 'auto', marginBottom: '10px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('profile')}>
            <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '3px' }}><i className="fa-solid fa-user-graduate"></i> Profilim</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>{userDept}</p>
          </div>

          <button onClick={() => { logout(); navigate('/'); }} className="menu-item logout-btn" style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
            <i className="fa-solid fa-right-from-bracket"></i> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="welcome-bar">
          <h1>Hoş Geldin, <span style={{ color: '#06b6d4' }}>{userName}</span>! 👋</h1>
          <div className="user-badge">Öğrenci Modu</div>
        </div>

        {/* TAB 1: KİŞİSELLEŞTİRİLMİŞ PANEL */}
        {activeTab === 'panel' && (
          <div className="dashboard-grid">
            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-robot"></i></div>
              <h3>AI Öğrenci & Kariyer Danışmanı 🤖</h3>
              <p>Staj mülakatları, CV hazırlama, GitHub projeleri ve ders tavsiyeleri için yapay zeka ile sohbet et.</p>
              <button onClick={() => setActiveTab('ai')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>Danışmana Sor &rarr;</button>
            </div>

            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-bullhorn"></i></div>
              <h3>Önerilen Staj Fırsatları 💼</h3>
              <p>Kendi mühendislik alanında aktif olan staj ve yetenek programı (Aselsan, Baykar, Trendyol vb.) ilanlarını incele.</p>
              <button onClick={() => setActiveTab('jobs')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>İlanları Gör &rarr;</button>
            </div>

            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-graduation-cap"></i></div>
              <h3>Okulunuz Ağı & Dönem Arkadaşların 🎓</h3>
              <p>Okulundaki diğer öğrencilerle doğrudan sohbet et, kampüs kulüplerine ve projelerine katıl.</p>
              <button onClick={() => setActiveTab('school')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>Okul Ağına Git &rarr;</button>
            </div>
          </div>
        )}

        {/* TAB 2: OKULUNUZDAN */}
        {activeTab === 'school' && (
          <div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '10px' }}>
              <i className="fa-solid fa-graduation-cap" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
              <span>{userSchool}</span> Ağı & Toplulukları 🎓
            </h2>

            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${schoolSubtab === 'peers' ? 'active' : ''}`} onClick={() => setSchoolSubtab('peers')}>👥 Öğrenci Arkadaşların</button>
              <button className={`tab-btn ${schoolSubtab === 'announcements' ? 'active' : ''}`} onClick={() => setSchoolSubtab('announcements')}>📢 Duyurular & Etkinlikler</button>
            </div>

            {schoolSubtab === 'peers' && (
              <div className="dashboard-grid">
                {schoolPeersData.map(peer => (
                  <div key={peer.id} className="premium-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#06b6d4', color: '#0f172a', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{peer.avatar}</div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '17px' }}>{peer.isim}</h3>
                        <span style={{ color: '#06b6d4', fontSize: '13px' }}>{peer.bolum}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#cbd5e1' }}>{peer.bio}</p>
                    <button onClick={() => setActiveSchoolChat(peer)} className="submit-btn" style={{ marginTop: '10px', padding: '8px 16px', fontSize: '13px' }}>Sohbet Başlat 💬</button>
                  </div>
                ))}
              </div>
            )}

            {schoolSubtab === 'announcements' && (
              <div className="premium-card">
                <h3 style={{ color: '#06b6d4', marginBottom: '15px' }}><i className="fa-solid fa-bullhorn"></i> Kampüs Duyuruları</h3>
                <div style={{ background: 'rgba(15,23,42,0.6)', borderLeft: '4px solid #06b6d4', padding: '16px', borderRadius: '12px' }}>
                  <strong style={{ color: '#fff', fontSize: '15px' }}>🏆 Mühendislik Proje Yarışması Başvuruları Başladı!</strong>
                  <p style={{ color: '#cbd5e1', fontSize: '13.5px', marginTop: '6px' }}>Öğrenci kulüplerinin ortaklığında düzenlenen hackathon için takımlar kuruluyor.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STAJ & PROJE İLANLARI */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', color: '#fff' }}>
                <i className="fa-solid fa-briefcase" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                Staj & Proje Takımı İlanları 🚀
              </h2>
            </div>

            <div className="dashboard-grid">
              {jobsData.map(job => (
                <div key={job.id} className="premium-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{job.baslik}</h3>
                    <span className="user-badge">{job.şirket}</span>
                  </div>
                  <p style={{ color: '#06b6d4', fontSize: '13px', marginBottom: '10px' }}>📍 {job.sehir}</p>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>{job.detay}</p>
                  <button onClick={() => alert(`${job.baslik} ilanına başvurunuz iletildi! 🚀`)} className="submit-btn" style={{ marginTop: 0, padding: '10px' }}>Başvur & Özgeçmiş İlet 🚀</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DISCOVER / BÖLÜMLERİ KEŞFET */}
        {activeTab === 'discover' && (
          <div>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>Mühendislik Dallarını Keşfet 🌐</h2>
            <div className="dashboard-grid">
              <div className="premium-card" onClick={() => navigate('/kesfet')} style={{ cursor: 'pointer' }}>
                <div className="card-icon"><i className="fa-solid fa-laptop-code"></i></div>
                <h3>Tüm Mühendislik Rehberleri</h3>
                <p>Boğaziçi, İTÜ ve ODTÜ onaylı mühendislik rehberlerine eriş.</p>
                <span className="discipline-btn">Keşfet Sayfasına Git &rarr;</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AI ÖĞRENCİ DANIŞMANI */}
        {activeTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div className="card-icon" style={{ margin: 0 }}><i className="fa-solid fa-robot"></i></div>
              <div>
                <h3 style={{ margin: 0 }}>AI Öğrenci & Kariyer Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Staj mülakatı, CV ve teknik rehber asistanı</p>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '20px', minHeight: '260px', maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {aiChatMessages.map((msg, i) => (
                <div key={i} style={{ background: msg.sender === 'user' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)', borderLeft: msg.sender === 'ai' ? '3px solid #06b6d4' : 'none', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>{msg.sender === 'ai' ? '🤖 AI Öğrenci Danışman:' : '👤 Sen:'}</strong>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" value={aiInputText} onChange={(e) => setAiInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiSend()} placeholder="Staj, dersler veya GitHub projeleri hakkında sor..." style={{ flex: 1, padding: '12px 18px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }} />
              <button onClick={() => handleAiSend()} className="submit-btn" style={{ marginTop: 0, padding: '12px 24px' }}><i className="fa-solid fa-paper-plane"></i> Sor</button>
            </div>
          </div>
        )}

        {/* TAB 6: PROFİLİM */}
        {activeTab === 'profile' && (
          <div className="premium-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '32px', fontWeight: 'bold' }}>
              🎓
            </div>
            <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '4px' }}>{userName}</h3>
            <span className="user-badge" style={{ display: 'inline-block', marginBottom: '25px' }}>Mühendislik Öğrencisi</span>

            <div style={{ textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Okul</label>
                <p style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: '500' }}>{userSchool}</p>
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Bölüm</label>
                <p style={{ color: '#06b6d4', fontSize: '15px', fontWeight: '500' }}>{userDept}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SCHOOL ACTIVE CHAT MODAL */}
      {activeSchoolChat && (
        <div className="modal-overlay active" onClick={() => setActiveSchoolChat(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <span className="close-modal" onClick={() => setActiveSchoolChat(null)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#06b6d4', marginBottom: '5px' }}>{activeSchoolChat.isim}</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '15px' }}>{activeSchoolChat.bolum}</p>

            <div style={{ background: '#0f172a', padding: '15px', borderRadius: '12px', minHeight: '200px', maxHeight: '300px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {schoolMessages.map((m, idx) => (
                <div key={idx} style={{ alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start', background: m.sender === 'me' ? '#06b6d4' : 'rgba(30, 41, 59, 0.8)', color: m.sender === 'me' ? '#0f172a' : '#fff', padding: '8px 14px', borderRadius: '12px', fontSize: '14px' }}>
                  {m.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" value={schoolMsgInput} onChange={(e) => setSchoolMsgInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSchoolMsgSend()} placeholder="Mesaj yaz..." style={{ flex: 1, padding: '10px 14px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
              <button onClick={handleSchoolMsgSend} className="submit-btn" style={{ marginTop: 0, padding: '10px 20px' }}>Gönder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const univeriteVerileri = {
  bilgisayar: [
    { siralama: 420, okul: "Koç Üniversitesi", bolum: "Bilgisayar Mühendisliği (İngilizce - Burslu)", sehir: "İstanbul", tur: "Vakıf (Burslu)", puan: "542.1", kontenjan: "15 Öğrenci", hazirlik: "Zorunlu 1 Yıl Yoğun İngilizce (KUEPE Muafiyeti)", isBulmaOrani: "%99.2 (İlk 3 Ayda İşe Yerleşme)", maas: "45.000 - 75.000 TL / Ay", akreditasyon: "ABET Akrediteli • 45+ Dünya Üniversitesi ile Erasmus/Exchange", mentorSayisi: 2, mentorler: [{ isim: "Ege Yılmaz", detay: "4. Sınıf • AI Lab", avatar: "EY" }] },
    { siralama: 850, okul: "Sabancı Üniversitesi", bolum: "Bilgisayar Bilimi ve Mühendisliği (Burslu)", sehir: "İstanbul", tur: "Vakıf (Burslu)", puan: "538.4", kontenjan: "20 Öğrenci", hazirlik: "Zorunlu 1 Yıl İngilizce (ELAE Muafiyeti)", isBulmaOrani: "%99.0 (İlk 3 Ayda İşe Yerleşme)", maas: "44.000 - 72.000 TL / Ay", akreditasyon: "ABET Akrediteli • Serbest Program Seçimi & Global Şirket Stajları", mentorSayisi: 2, mentorler: [{ isim: "Mete Karaca", detay: "3. Sınıf • Microservices", avatar: "MK" }] },
    { siralama: 1200, okul: "Boğaziçi Üniversitesi", bolum: "Bilgisayar Mühendisliği (İngilizce)", sehir: "İstanbul", tur: "Devlet", puan: "534.5", kontenjan: "90 Öğrenci", hazirlik: "Zorunlu 1 Yıl İngilizce (BUEPT Muafiyeti)", isBulmaOrani: "%98.8 (İlk 6 Ayda İşe Yerleşme)", maas: "40.000 - 70.000 TL / Ay", akreditasyon: "ABET Akrediteli • Avrupa ve ABD Araştırma Ortaklıkları", mentorSayisi: 3, mentorler: [{ isim: "Nil Yıldız", detay: "4. Sınıf • Software Eng.", avatar: "NY" }, { isim: "Can Aksoy", detay: "2. Sınıf • Cyber Club", avatar: "CA" }] },
    { siralama: 2400, okul: "İstanbul Teknik Üniversitesi (İTÜ)", bolum: "Bilgisayar Mühendisliği (İngilizce)", sehir: "İstanbul", tur: "Devlet", puan: "528.2", kontenjan: "110 Öğrenci", hazirlik: "Zorunlu %100 İngilizce (İTÜ PROF)", isBulmaOrani: "%98.1 (İlk 6 Ayda İşe Yerleşme)", maas: "38.000 - 65.000 TL / Ay", akreditasyon: "ABET Akrediteli • Teknokent İçi 300+ Yazılım Firmasında Staj", mentorSayisi: 4, mentorler: [{ isim: "Ceren Bulut", detay: "3. Sınıf • Frontend Dev", avatar: "CB" }, { isim: "Deniz Arslan", detay: "2. Sınıf • Game Dev", avatar: "DA" }] },
    { siralama: 3100, okul: "Orta Doğu Teknik Üniversitesi (ODTÜ)", bolum: "Bilgisayar Mühendisliği (İngilizce)", sehir: "Ankara", tur: "Devlet", puan: "525.8", kontenjan: "100 Öğrenci", hazirlik: "Zorunlu 1 Yıl İngilizce (EPE Muafiyeti)", isBulmaOrani: "%98.5 (İlk 6 Ayda İşe Yerleşme)", maas: "38.000 - 68.000 TL / Ay", akreditasyon: "ABET Akrediteli • ODTÜ Teknokent Savunma & Yazılım Ekosistemi", mentorSayisi: 3, mentorler: [{ isim: "Kaan Şahin", detay: "3. Sınıf • Data Science", avatar: "KŞ" }] },
    { siralama: 6500, okul: "Bilkent Üniversitesi", bolum: "Bilgisayar Mühendisliği (%50 Burslu)", sehir: "Ankara", tur: "Vakıf", puan: "512.4", kontenjan: "60 Öğrenci", hazirlik: "Zorunlu 1 Yıl Yoğun İngilizce (PAE)", isBulmaOrani: "%97.5 (İlk 6 Ayda İşe Yerleşme)", maas: "35.000 - 60.000 TL / Ay", akreditasyon: "ABET Akrediteli • Silicon Valley ve Avrupa Yüksek Lisans Kabulleri", mentorSayisi: 2, mentorler: [{ isim: "Selin Çetin", detay: "2. Sınıf", avatar: "SÇ" }] }
  ],
  yazilim: [
    { siralama: 3500, okul: "Yıldız Teknik Üniversitesi (YTÜ)", bolum: "Yazılım Mühendisliği (İngilizce)", sehir: "İstanbul", tur: "Devlet", puan: "520.1", kontenjan: "80 Öğrenci", hazirlik: "Zorunlu 1 Yıl İngilizce", isBulmaOrani: "%98.0 (İlk 3 Ayda İşe Yerleşme)", maas: "38.000 - 65.000 TL / Ay", akreditasyon: "MÜDEK & ABET Akrediteli • YTÜ Teknopark", mentorSayisi: 2, mentorler: [{ isim: "Mert Tunç", detay: "3. Sınıf • Mobile Dev", avatar: "MT" }] }
  ]
};

const alanlarData = {
  yazilim: { baslik: "Yazılım / Bilgisayar Mühendisliği", icerik: "Yazılım sistemlerinin tasarımı, geliştirilmesi ve yapay zeka algoritmaları üzerine odaklanan disiplindir.", beceriler: "Problem Çözme, Veri Yapıları, Java, Python, C++, SQL, Git", isImkanlari: "Yazılım Geliştirici, Veri Bilimci, Yapay Zeka Mühendisi, DevOps Uzmanı", maas: "35.000 - 90.000 TL / Ay", istihdam: "%98 (İlk 6 ayda işe yerleşme)" },
  elektrik: { baslik: "Elektrik-Elektronik Mühendisliği", icerik: "Elektronik devreler, haberleşme sistemleri, gömülü yazılımlar ve güç elektroniği geliştiren mühendislik dalı.", beceriler: "Devre Analizi, C/C++, PCB Tasarımı, Sinyal İşleme, MATLAB", isImkanlari: "Gömülü Sistemler Mühendisi, Haberleşme Uzmanı, Savunma Sanayi Ar-Ge", maas: "38.000 - 85.000 TL / Ay", istihdam: "%96" },
  makine: { baslik: "Makine Mühendisliği", icerik: "Mekanik sistemler, termodinamik, CAD/CAM simülasyonları ve otomotiv üretimi yapan köklü disiplin.", beceriler: "CAD, SolidWorks, Termodinamik, Akışkanlar Mekaniği, Ansys", isImkanlari: "Otomotiv Tasarım Mühendisi, Ar-Ge Uzmanı, Üretim Şefi", maas: "32.000 - 80.000 TL / Ay", istihdam: "%94" }
};

export default function DashboardAday() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('panel');
  const [selectedBolum, setSelectedBolum] = useState('bilgisayar');
  const [selectedAlan, setSelectedAlan] = useState(null);
  const [selectedUniDetail, setSelectedUniDetail] = useState(null);
  const [selectedUniMentors, setSelectedUniMentors] = useState(null);

  // AI Chat State
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'Merhaba! Ben geleceğin mühendisleri için özel tasarlanmış AI Kariyer Danışmanıyım. 🎯 Sevdiğin dersleri, ilgi alanlarını veya merak ettiğin mühendislik bölümlerini bana sorabilirsin!' }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  // Direct Message State
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [directMessages, setDirectMessages] = useState([
    { sender: 'them', text: 'Merhaba! YKS tercihleri ve mühendislik dersleri hakkında sorun varsa memnuniyetle yardımcı olurum.' }
  ]);
  const [directInputText, setDirectInputText] = useState('');

  const userName = user?.kullaniciAdi || 'Geleceğin Mühendisi';
  const userSchool = user?.okul || 'Lise / Mezun';

  const handleAiSend = (queryText) => {
    const textToSend = queryText || aiInputText;
    if (!textToSend.trim()) return;

    const newMsgs = [...aiChatMessages, { sender: 'user', text: textToSend }];
    setAiChatMessages(newMsgs);
    setAiInputText('');

    setTimeout(() => {
      let botReply = "Mühendislik kariyerinizde başarılar dilerim! Detaylı sorularınız için üniversiteli mentörlerimizle de iletişime geçebilirsiniz.";
      const lower = textToSend.toLowerCase();
      if (lower.includes('yazılım') || lower.includes('bilgisayar')) {
        botReply = "Yazılım ve Bilgisayar Mühendisliği alanları algoritma, yapay zeka ve web/mobil geliştirme üzerine odaklanır. Matematik ve analitik düşünme yeteneği çok önemlidir.";
      } else if (lower.includes('uygun') || lower.includes('hangi')) {
        botReply = "Sanal dünyada kod yazmayı ve mantık kurmayı seviyorsan Yazılım/Bilgisayar; fiziksel nesneleri tasarlamayı seviyorsan Makine veya Elektrik-Elektronik Mühendisliği sana çok uygun!";
      }

      setAiChatMessages(prev => [...prev, { sender: 'ai', text: botReply }]);
    }, 600);
  };

  const handleDirectSend = () => {
    if (!directInputText.trim()) return;
    setDirectMessages(prev => [...prev, { sender: 'me', text: directInputText }]);
    setDirectInputText('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#ffffff', position: 'relative' }}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <i className="fa-solid fa-compass"></i> EngineersPath
        </div>
        <div className="menu-items">
          <div className={`menu-item ${activeTab === 'panel' ? 'active' : ''}`} onClick={() => setActiveTab('panel')}>
            <i className="fa-solid fa-chart-pie"></i> Aday Paneli
          </div>
          <div className={`menu-item ${activeTab === 'school' ? 'active' : ''}`} onClick={() => setActiveTab('school')}>
            <i className="fa-solid fa-school"></i> Okulunuzdan 🎓
          </div>
          <div className={`menu-item ${activeTab === 'discover' ? 'active' : ''}`} onClick={() => setActiveTab('discover')}>
            <i className="fa-solid fa-graduation-cap"></i> Mühendislik Bölümleri
          </div>
          <div className={`menu-item ${activeTab === 'uni' ? 'active' : ''}`} onClick={() => setActiveTab('uni')}>
            <i className="fa-solid fa-building-columns"></i> Üniversiteler & Sıralamalar 🏫
          </div>
          <div className={`menu-item ${activeTab === 'mentors' ? 'active' : ''}`} onClick={() => setActiveTab('mentors')}>
            <i className="fa-solid fa-user-graduate"></i> Üniversiteli Mentörler 🎓
          </div>
          <div className={`menu-item ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
            <i className="fa-solid fa-comments"></i> Mesajlar 💬
          </div>
          <div className={`menu-item ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <i className="fa-solid fa-robot"></i> AI Mühendislik Danışmanı 🤖
          </div>

          <div className="profile-section" style={{ marginTop: 'auto', marginBottom: '10px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('profile')}>
            <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '3px' }}><i className="fa-solid fa-user"></i> Profilim</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Lise & Hedef Bilgilerim</p>
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
          <div className="user-badge">Aday Modu</div>
        </div>

        {/* TAB 1: ADAY PANENELİ OVERVIEW */}
        {activeTab === 'panel' && (
          <div className="dashboard-grid">
            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-robot"></i></div>
              <h3>AI Mühendislik Danışmanı 🤖</h3>
              <p>Hangi mühendislik dalının ilgi alanlarına uygun olduğunu yapay zeka ile sohbet ederek keşfet.</p>
              <button onClick={() => setActiveTab('ai')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>
                Danışmana Sor &rarr;
              </button>
            </div>

            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-graduation-cap"></i></div>
              <h3>Mühendislik Dallarını İncele</h3>
              <p>Yazılım, Bilgisayar, Elektrik-Elektronik, Makine ve Endüstri gibi tüm mühendislik dallarını detaylıca keşfet.</p>
              <button onClick={() => setActiveTab('discover')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>
                Bölümleri Keşfet &rarr;
              </button>
            </div>

            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-user-graduate"></i></div>
              <h3>Üniversiteli Öğrenciler ile Konuş 🎓</h3>
              <p>Üniversite tercihi, YKS süreci ve kampüs hayatı hakkında mühendislik öğrencilerinden tavsiyeler al.</p>
              <button onClick={() => setActiveTab('uni')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>
                Öğrencilere Ulaş &rarr;
              </button>
            </div>
          </div>
        )}

        {/* TAB: OKULUNUZDAN */}
        {activeTab === 'school' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '15px' }}>
              <i className="fa-solid fa-school" style={{ color: '#06b6d4', marginRight: '10px' }}></i>
              <span>{userSchool}</span> Aday Öğrencileri 🎓
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '25px' }}>Aynı liseden veya bölgeden mühendislik hedefleyen aday arkadaşlarınla tanış ve bağlantı kur.</p>
            <div className="dashboard-grid">
              <div className="premium-card">
                <h3>Ali Yılmaz</h3>
                <span className="user-badge" style={{ marginTop: '5px' }}>Hedef: İTÜ Bilgisayar</span>
                <p style={{ marginTop: '10px' }}>YKS 2026 Sayısal hazırlanıyor. Kodlama ile ilgileniyor.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TÜM ALANLARI KEŞFET */}
        {activeTab === 'discover' && (
          <div className="dashboard-grid">
            {Object.keys(alanlarData).map(key => (
              <div key={key} className="premium-card" onClick={() => setSelectedAlan(alanlarData[key])} style={{ cursor: 'pointer' }}>
                <div className="card-icon"><i className="fa-solid fa-laptop-code"></i></div>
                <h3>{alanlarData[key].baslik}</h3>
                <p>{alanlarData[key].icerik}</p>
                <span className="discipline-btn">Detaylı İncele &rarr;</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ÜNİVERSİTELER & YKS SIRALAMALARI */}
        {activeTab === 'uni' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(30, 41, 59, 0.6)', padding: '20px 25px', borderRadius: '20px', border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h2 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>
                  <i className="fa-solid fa-building-columns" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                  Mühendislik Bölüm & Üniversite Sıralamaları 🏫
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>ÖSYM & YÖK Atlas verilerine göre Türkiye'nin en çok tercih edilen üniversiteleri listelenmektedir.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ color: '#06b6d4', fontWeight: 'bold', fontSize: '13px' }}>Bölüm Seç:</label>
                <select value={selectedBolum} onChange={(e) => setSelectedBolum(e.target.value)} style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid #06b6d4', borderRadius: '12px', color: '#fff', fontWeight: 600, outline: 'none', cursor: 'pointer' }}>
                  <option value="bilgisayar">💻 Bilgisayar Mühendisliği</option>
                  <option value="yazilim">⚡ Yazılım Mühendisliği</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {(univeriteVerileri[selectedBolum] || []).map((uni, idx) => (
                <div key={idx} className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 25px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>#{uni.siralama} - {uni.okul}</h3>
                    <p style={{ margin: '4px 0 0 0', color: '#06b6d4', fontSize: '14px' }}>{uni.bolum}</p>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{uni.sehir} | {uni.tur} | Taban Puan: {uni.puan}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setSelectedUniDetail(uni)} className="subnav-btn" style={{ padding: '8px 16px', borderRadius: '10px' }}>Akademik Detay</button>
                    <button onClick={() => setSelectedUniMentors(uni)} className="submit-btn" style={{ padding: '8px 16px', borderRadius: '10px', marginTop: 0, fontSize: '13px' }}>Mentörler ({uni.mentorSayisi})</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MESAJLAR */}
        {activeTab === 'chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', height: '500px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(30, 41, 59, 0.4)' }}>
              <h4 style={{ fontSize: '14px', color: '#06b6d4', marginBottom: '10px' }}><i className="fa-solid fa-comments"></i> Üniversiteli Mentörler</h4>
              <div onClick={() => setActiveChatUser('Ceren Bulut (İTÜ Bilgisayar)')} style={{ padding: '14px', background: activeChatUser?.includes('Ceren') ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', cursor: 'pointer' }}>
                <strong style={{ color: '#fff', fontSize: '14px', display: 'block' }}>Ceren Bulut</strong>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>İTÜ Bilgisayar Müh. 3. Sınıf</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
              {!activeChatUser ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlignment: 'center', color: '#94a3b8' }}>
                  <i className="fa-solid fa-comments" style={{ fontSize: '48px', color: '#06b6d4', marginBottom: '16px', opacity: 0.6 }}></i>
                  <h3 style={{ color: '#ffffff', marginBottom: '8px' }}>Sohbet Başlatmak İçin Bir Kişi Seçin</h3>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '15px' }}>{activeChatUser}</h3>
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
                    {directMessages.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start', background: msg.sender === 'me' ? '#06b6d4' : 'rgba(30, 41, 59, 0.8)', color: msg.sender === 'me' ? '#0f172a' : '#fff', padding: '10px 16px', borderRadius: '14px', maxWidth: '70%', fontWeight: msg.sender === 'me' ? '600' : 'normal' }}>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" value={directInputText} onChange={(e) => setDirectInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleDirectSend()} placeholder="Mesajını yaz..." style={{ flex: 1, padding: '12px 16px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                    <button onClick={handleDirectSend} className="submit-btn" style={{ marginTop: 0, padding: '12px 20px' }}>Gönder</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AI MÜHENDİSLİK DANIŞMANI */}
        {activeTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div className="card-icon" style={{ margin: 0 }}><i className="fa-solid fa-robot"></i></div>
              <div>
                <h3 style={{ margin: 0 }}>AI Mühendislik Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Akıllı YKS ve mühendislik tercih danışmanı</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <button className="subnav-btn" onClick={() => handleAiSend('Hangi mühendislik dalı benim için en uygun?')}>💡 Hangi mühendislik bana uygun?</button>
              <button className="subnav-btn" onClick={() => handleAiSend('Yazılım Mühendisliği ile Bilgisayar Mühendisliği arasındaki fark nedir?')}>💻 Yazılım vs Bilgisayar Farkı?</button>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '20px', minHeight: '260px', maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {aiChatMessages.map((msg, i) => (
                <div key={i} style={{ background: msg.sender === 'user' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)', borderLeft: msg.sender === 'ai' ? '3px solid #06b6d4' : 'none', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>{msg.sender === 'ai' ? '🤖 AI Danışman:' : '👤 Sen:'}</strong>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" value={aiInputText} onChange={(e) => setAiInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiSend()} placeholder="Mühendislik ve üniversite hakkında merak ettiğin her şeyi sor..." style={{ flex: 1, padding: '12px 18px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }} />
              <button onClick={() => handleAiSend()} className="submit-btn" style={{ marginTop: 0, padding: '12px 24px' }}><i className="fa-solid fa-paper-plane"></i> Sor</button>
            </div>
          </div>
        )}

        {/* TAB 5: PROFİLİM */}
        {activeTab === 'profile' && (
          <div className="premium-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '32px', fontWeight: 'bold' }}>
              👤
            </div>
            <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '4px' }}>{userName}</h3>
            <span className="user-badge" style={{ display: 'inline-block', marginBottom: '25px' }}>Aday Öğrenci Modu</span>

            <div style={{ textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Lise / Okul</label>
                <p style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: '500' }}>{userSchool}</p>
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Hedeflenen Mühendislik Alanı</label>
                <p style={{ color: '#06b6d4', fontSize: '15px', fontWeight: '500' }}>Yazılım & Bilgisayar Mühendisliği</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ALAN MODAL */}
      {selectedAlan && (
        <div className="modal-overlay active" onClick={() => setSelectedAlan(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <span className="close-modal" onClick={() => setSelectedAlan(null)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#06b6d4' }}>{selectedAlan.baslik}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '20px' }}>{selectedAlan.icerik}</p>
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#38bdf8' }}>Aranan Beceriler: </strong>
              <span style={{ color: '#e2e8f0' }}>{selectedAlan.beceriler}</span>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#10b981' }}>İş İmkanları: </strong>
              <span style={{ color: '#e2e8f0' }}>{selectedAlan.isImkanlari}</span>
            </div>
            <div>
              <strong style={{ color: '#f59e0b' }}>Maaş Aralığı: </strong>
              <span style={{ color: '#e2e8f0' }}>{selectedAlan.maas}</span>
            </div>
          </div>
        </div>
      )}

      {/* UNI DETAIL MODAL */}
      {selectedUniDetail && (
        <div className="modal-overlay active" onClick={() => setSelectedUniDetail(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <span className="close-modal" onClick={() => setSelectedUniDetail(null)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#06b6d4', marginBottom: '5px' }}>{selectedUniDetail.okul}</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>{selectedUniDetail.bolum}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '14px', borderRadius: '12px' }}>
                <span style={{ color: '#06b6d4', fontSize: '12px', display: 'block' }}>YKS Sıralama</span>
                <strong style={{ color: '#f59e0b', fontSize: '18px' }}>#{selectedUniDetail.siralama}</strong>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '14px', borderRadius: '12px' }}>
                <span style={{ color: '#06b6d4', fontSize: '12px', display: 'block' }}>İş Bulma Oranı</span>
                <strong style={{ color: '#10b981', fontSize: '18px' }}>{selectedUniDetail.isBulmaOrani}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
